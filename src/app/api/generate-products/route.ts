import { NextRequest, NextResponse } from 'next/server';
import { MBTI_PROFILES, PATTERNS } from '@/lib/spiritual-conversation-engine';
import { generateFallbackProducts } from '@/lib/product-generator';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const MODELS = {
  report: "llama-3.3-70b-versatile",
};

async function groqChat(prompt: string, userMsg: string, temp: number, model: string, retries = 2) {
  let lastError: any;
  for (let i = 0; i <= retries; i++) {
    try {
      const res = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
          model,
          messages: [{ role: 'system', content: prompt }, { role: 'user', content: userMsg }],
          response_format: { type: 'json_object' },
          temperature: temp,
        }),
      });
      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(`Groq API error (${res.status}): ${errorData.error?.message || res.statusText}`);
      }
      const data = await res.json();
      return data.choices[0].message.content;
    } catch (e: any) {
      lastError = e;
      if (i < retries) await new Promise(r => setTimeout(r, Math.pow(2, i) * 1000));
    }
  }
  throw lastError;
}

/**
 * POST /api/generate-products
 *
 * Generates personalized product recommendations based on the full conversation report.
 * Uses the LLM to create conversion-engineered product copy that is unique to this user's
 * detected pattern, MBTI, shadow, root cause, and own words from the conversation.
 *
 * Body: { report, userState, conversationHistory }
 * Returns: { success, data: { products: GeneratedProduct[] } }
 */
export async function POST(req: NextRequest) {
  try {
    const { report, userState, conversationHistory } = await req.json();

    if (!report || !userState) {
      return NextResponse.json({ error: 'report and userState are required' }, { status: 400 });
    }

    // ── Extract key data for personalization ──
    const mbtiType = userState.confirmedMBTI || 'INFP';
    const mbtiProfile = MBTI_PROFILES[mbtiType] || MBTI_PROFILES['INFP'];
    const patternId = userState.detectedPattern || 'self_sabotage';
    const patternData = PATTERNS[patternId] || PATTERNS['self_sabotage'];
    const patternName = patternData.name;
    const problem = userState.monetizableProblem || 'Unfulfilled potential';
    const shadow = userState.jungianArchetype || 'The Hidden Self';
    const birthDate = userState.birthDate || null;
    const hawkinsLevel = userState.hawkinsLevel || 200;
    const lifeStage = userState.lifeStage || 'The Journey';
    const gender = userState.gender || 'unknown';
    const budget = userState.budget || 'mid';
    const archetype = userState.activeArchetype || 'seeker';

    // Extract user's own words from conversation for personalization
    const userWords = (conversationHistory || [])
      .filter((h: any) => h.role === 'user')
      .map((h: any) => h.content)
      .join(' ')
      .slice(0, 800);

    // ── Build the product generation prompt ──
    const systemPrompt = `You are the Product Architect for Spiritual AI — a platform that synthesizes Vedic astrology, Jungian psychology, and MBTI into personalized consciousness intelligence.

Your job is to generate 3 personalized, conversion-engineered product recommendations for a specific user based on their consciousness blueprint report.

PRODUCT NAMING FORMULA (strict):
"How to [achieve specific desired outcome] without [frustrating common obstacle] in [specific short timeframe]"

RULES:
- Products must target problems that are: Desperate (tried other things, failed), Payable (would spend money today), AI-solvable (Spiritual AI's cross-framework synthesis produces better answers than any human)
- Write as if you have lived inside this person's exact struggle
- Never say "many people feel..." — speak directly: "You know the moment..."
- No spiritual bypassing — acknowledge real pain before offering real solutions
- No generic affirmations — every sentence must be specific, earned, and surprising
- The reader should feel: understood first, offered to second
- Each product must be DISTINCT — different problem, different mechanism, different outcome
- Use the user's own words from the conversation to make it feel personally written for them

OUTPUT: Return a JSON object with a "products" array. Each product must have this exact structure:

{
  "products": [
    {
      "id": "unique-kebab-id",
      "name": "The [Archetypal Name] [System/Blueprint/Protocol]",
      "tagline": "One-line hook using the naming formula",
      "targetProblem": "The specific problem this product solves (1 sentence)",
      "desperateReason": "Why this person specifically would pay money today to fix this (2-3 sentences, speak directly to them)",
      "realCause": "The true root cause — Jungian shadow mechanism + Vedic karmic imprint + MBTI cognitive stack distortion (3-4 sentences)",
      "solutionMechanism": "How Spiritual AI solves this specifically — name the exact process, what data is extracted, which frameworks are cross-referenced, what the AI produces (3-4 sentences)",
      "speedSpecificityConsistency": {
        "speed": "How fast they get results (e.g., 'First shift within 7 days')",
        "specific": "What makes this specific to them (e.g., 'Named to your exact Self-Sabotage pattern running since age 9')",
        "consistent": "Why the AI delivers consistent results (e.g., 'Same rigorous analysis every time, no therapist off-days')"
      },
      "damagingAdmission": "Honestly what this product cannot do — who it's NOT for, what it won't replace (2-3 sentences)",
      "transition": "Single paragraph pivoting from problem to offer — emotional beat: 'You've carried this long enough. Here's the door.'",
      "whatYouGet": [
        "Item 1 — what it is — format/delivery method",
        "Item 2 — what it is — format/delivery method",
        "Item 3 — what it is — format/delivery method"
      ],
      "valueStack": [
        { "item": "Item name", "value": "₹X", "reason": "Why it's included" }
      ],
      "price": { "original": 197, "discounted": 97 },
      "ctaText": "Initiation-style CTA (never 'Buy Now' or 'Add to Cart')",
      "security": {
        "personalization": "Why this will work for them specifically (address their exact pattern + MBTI)",
        "differentiation": "Why this is not generic AI (address the multi-framework synthesis)",
        "privacy": "Data handling assurance"
      },
      "bonuses": [
        { "name": "Bonus name", "description": "What it solves", "value": "₹X" }
      ],
      "guarantee": "Precision guarantee — specific outcome, specific timeframe, what happens if it doesn't work",
      "urgency": "Real urgency only — cohort-based, price increase, or relevance window",
      "tiers": [
        {
          "name": "Tier name (feels like initiation level)",
          "includes": ["item1", "item2"],
          "price": "₹X",
          "forWho": "One sentence on who this tier is for"
        }
      ],
      "imageBrief": "Visual description for the cover image — dark, sacred, modern, single visual anchor symbolizing the product"
    }
  ]
}

Generate exactly 3 products. Each must be for a DIFFERENT aspect of the user's struggle.
Product 1: Primary pattern dissolution (the core detected pattern)
Product 2: Secondary layer (shadow archetype or cognitive distortion)
Product 3: Complete transformation (the full system — highest value)

IMPORTANT: Return ONLY valid JSON. No markdown, no code fences, no explanation.`;

    const userPrompt = `Generate 3 personalized products for this user:

USER PROFILE:
- MBTI: ${mbtiType} — ${mbtiProfile.name}. ${mbtiProfile.archetype}
- Core Pattern: ${patternName} (${patternId})
- Root Cause: ${patternData.rootCause}
- Pattern running since: ${patternData.runningSince}
- Core Problem: ${problem}
- Shadow Archetype: ${shadow}
- Consciousness Level (Hawkins): ${hawkinsLevel}
- Life Stage: ${lifeStage}
- Gender: ${gender}
- Budget: ${budget}
- Archetype: ${archetype}
${birthDate ? `- Birth Date: ${birthDate}` : ''}

REPORT DATA:
- Validation: ${report.validation || 'N/A'}
- Real Cause: ${report.realCause || 'N/A'}
- Pattern Loop Trigger: ${report.patternLoop?.trigger || 'N/A'}
- Pattern Loop Coping: ${report.patternLoop?.copingMechanism || 'N/A'}
- Pattern Loop Cost: ${report.patternLoop?.humanCost || 'N/A'}
- Teaching: ${report.teaching || 'N/A'}
- Witness Question: ${report.witnessQuestion || 'N/A'}

USER'S OWN WORDS FROM CONVERSATION:
"${userWords.slice(0, 600)}"

MBTI-SPECIFIC BUYING BEHAVIOR:
- Learning Style: ${mbtiProfile.learningStyle}
- Buying Pattern: ${mbtiProfile.buyingPattern}
- Language Tone: ${mbtiProfile.languageTone}
- CTA Style: ${mbtiProfile.ctaStyle}
- Design Mode: ${mbtiProfile.designMode}

Generate the 3 products now. Make each product feel like it was written by someone who has lived inside this person's exact struggle. Use their own words. Reference their specific pattern, their specific root cause, their specific cognitive architecture.`;

    // ── Call LLM to generate products ──
    let products: any[] = [];
    try {
      const llmResponse = await groqChat(systemPrompt, userPrompt, 0.7, MODELS.report);
      const cleaned = llmResponse.trim()
        .replace(/^```json\s*/i, '')
        .replace(/^```\s*/, '')
        .replace(/\s*```$/, '');
      const parsed = JSON.parse(cleaned);
      products = parsed.products || [];
    } catch (llmError) {
      console.error('Product generation LLM error:', llmError);
      // Fallback to static products if LLM fails
      products = generateFallbackProducts(patternId, mbtiType, mbtiProfile, patternData, problem, shadow);
    }

    return NextResponse.json({
      success: true,
      data: { products },
    });
  } catch (error: any) {
    console.error('Generate products error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to generate products' },
      { status: 500 }
    );
  }
}
