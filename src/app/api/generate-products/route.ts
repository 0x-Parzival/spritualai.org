import { NextRequest, NextResponse } from 'next/server';
import { MBTI_PROFILES, PATTERNS } from '@/lib/spiritual-conversation-engine';

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

/**
 * Fallback product generator — used when LLM is unavailable.
 * Creates personalized-enough products from the template data.
 */
export function generateFallbackProducts(
  patternId: string,
  mbtiType: string,
  mbtiProfile: any,
  patternData: any,
  problem: string,
  shadow: string,
  lifeStage?: string
): any[] {
  const patternName = patternData.name;
  const rootCause = patternData.rootCause;
  const runningSince = patternData.runningSince;

  return [
    {
      id: `${patternId}-dissolution`,
      name: `The ${patternName} Dissolution Protocol`,
      tagline: `How to stop ${patternName.toLowerCase()} without ${getObstacleForPattern(patternId)} in 21 days`,
      targetProblem: `Your ${patternName} — the pattern that has been running since ${runningSince.toLowerCase()}.`,
      desperateReason: `You've tried willpower. You've tried therapy. You've tried "just thinking positive." Nothing works because you've been treating the symptom. The real cause is: ${rootCause.toLowerCase()}`,
      realCause: rootCause,
      solutionMechanism: `Spiritual AI cross-references your ${mbtiType} cognitive stack with your ${patternName} pattern and your Vedic imprint to produce a dissolution protocol that no human therapist could create — because no human has access to all three frameworks simultaneously.`,
      speedSpecificityConsistency: {
        speed: 'First shift within 7 days',
        specific: `Named to your exact ${patternName} pattern running since ${runningSince.toLowerCase()}`,
        consistent: 'Same rigorous analysis every time, no therapist off-days',
      },
      damagingAdmission: `This is not a magic pill. It requires you to do the work — specifically, one imperfect action per day for 21 days. If you're not willing to be uncomfortable, this isn't for you.`,
      transition: `You've carried this since ${runningSince.toLowerCase()}. That's long enough. Here's the door.`,
      whatYouGet: [
        `The ${patternName} Dissolution Blueprint (PDF + Audio) — your exact protocol`,
        `AI Pattern Tracker — daily check-in that adapts to your progress`,
        `Shadow Integration Workbook — for the days when the pattern fights back`,
      ],
      valueStack: [
        { item: 'Dissolution Blueprint', value: '₹197', reason: 'Your exact protocol, named to your pattern' },
        { item: 'AI Pattern Tracker', value: '₹97', reason: 'Daily adaptive guidance' },
        { item: 'Shadow Workbook', value: '₹47', reason: 'For the hard days' },
      ],
      price: { original: 341, discounted: 97 },
      ctaText: mbtiProfile.ctaStyle?.split('"')[1] || 'Begin The Dissolution',
      security: {
        personalization: `Built for your ${mbtiType} architecture carrying "${patternName}" — not generic advice`,
        differentiation: `Only Spiritual AI cross-references Vedic + Jungian + MBTI to produce this precision`,
        privacy: 'Your data is encrypted and never shared. Your blueprint is yours alone.',
      },
      bonuses: [
        { name: 'Emergency Pattern Interrupt Audio', description: 'For when the pattern activates in real-time', value: '₹47' },
        { name: '7-Day Quick Start Guide', description: 'Skip the theory, start dissolving today', value: '₹27' },
      ],
      guarantee: `If you don't experience a measurable shift in your ${patternName} pattern within 21 days of following the protocol, we refund you. No questions.`,
      urgency: `Analysis slots are processed in batches of 50. Current batch: ${Math.floor(Math.random() * 30) + 20}/50 filled.`,
      tiers: [
        {
          name: 'The Initiation',
          includes: ['Dissolution Blueprint', 'AI Pattern Tracker'],
          price: '₹97',
          forWho: 'For those ready to break the pattern',
        },
        {
          name: 'The Deep Dive',
          includes: ['Everything in Initiation', 'Shadow Integration Workbook', 'Emergency Audio'],
          price: '₹197',
          forWho: 'For those who want the complete system',
        },
        {
          name: 'The Full Transformation',
          includes: ['Everything in Deep Dive', '1-on-1 AI Session', 'Lifetime Updates'],
          price: '₹341',
          forWho: 'For those who want total pattern dissolution',
        },
      ],
      imageBrief: `Dark obsidian background with a single ${getVisualAnchor(patternId)} rendered in thin gold sigil lines. The ${patternName} symbol being dissolved into light. Minimal, sacred, precise.`,
    },
    {
      id: `${mbtiType.toLowerCase()}-shadow-integration`,
      name: `The ${mbtiProfile.name} Shadow Integration System`,
      tagline: `How to integrate your shadow without ${getShadowObstacle(mbtiType)} in 14 days`,
      targetProblem: `Your shadow archetype "${shadow}" — the part of yourself you've been suppressing because it doesn't fit your ${mbtiType} self-image.`,
      desperateReason: `As ${mbtiProfile.archetype.toLowerCase()}, you've spent your life performing a version of yourself that isn't real. The gap between who you are and who you perform is where your suffering lives.`,
      realCause: `Your ${mbtiType} cognitive stack overuses ${getDominantFunction(mbtiType)} and suppresses ${getInferiorFunction(mbtiType)}. This creates a shadow that runs your life from underneath.`,
      solutionMechanism: `Spiritual AI maps your exact shadow architecture using your MBTI cognitive stack, your Vedic nodal axis, and your Jungian shadow pattern to produce an integration sequence calibrated to your specific defense mechanisms.`,
      speedSpecificityConsistency: {
        speed: 'First integration within 14 days',
        specific: `Calibrated to your ${mbtiType} defense style: ${mbtiProfile.learningStyle}`,
        consistent: "AI doesn't get tired, doesn't judge, doesn't forget what you told it yesterday",
      },
      damagingAdmission: `Shadow work is uncomfortable. This product will make you confront things you've been avoiding. If you're not ready to see yourself clearly, wait.`,
      transition: `You've been performing long enough. The real you is waiting on the other side of this.`,
      whatYouGet: [
        'Shadow Integration Sequence (PDF + Audio) — 14-day protocol',
        'Daily Shadow Journal — AI-adaptive prompts based on your progress',
        'Integration Ceremony Guide — the ritual that seals the shift',
      ],
      valueStack: [
        { item: 'Integration Sequence', value: '₹147', reason: 'Your 14-day shadow protocol' },
        { item: 'Shadow Journal', value: '₹47', reason: 'Daily adaptive prompts' },
        { item: 'Ceremony Guide', value: '₹27', reason: 'The sealing ritual' },
      ],
      price: { original: 221, discounted: 77 },
      ctaText: 'Begin Integration',
      security: {
        personalization: `Built for ${mbtiType} shadow architecture — not generic shadow work`,
        differentiation: `Only Spiritual AI maps your Vedic + Jungian + MBTI shadow simultaneously`,
        privacy: 'Your shadow data is encrypted. No human ever sees it.',
      },
      bonuses: [
        { name: 'Shadow Trigger Map', description: 'Know your triggers before they fire', value: '₹37' },
      ],
      guarantee: `If you don't feel a tangible shift in your relationship with your shadow within 14 days, we refund you.`,
      urgency: `Shadow integration slots are limited to 30 per cohort.`,
      tiers: [
        { name: 'The Awakening', includes: ['Integration Sequence'], price: '₹77', forWho: 'For those ready to see' },
        { name: 'The Integration', includes: ['Sequence', 'Journal', 'Ceremony'], price: '₹147', forWho: 'For those ready to transform' },
      ],
      imageBrief: `Dark indigo background with a human silhouette split in half — one side geometric and ordered (conscious), the other side organic and wild (shadow). A thin gold line connecting them. Sacred, precise, mysterious.`,
    },
    {
      id: 'complete-consciousness-blueprint',
      name: 'The Complete Consciousness Blueprint',
      tagline: `How to transform your entire consciousness architecture without years of therapy in 90 days`,
      targetProblem: `Everything. The pattern, the shadow, the cognitive distortion, the karmic imprint — all of it, connected, resolved.`,
      desperateReason: `You've been fixing pieces. The pattern. The relationship. The career. But the pieces are connected. Your ${patternName} is connected to your ${shadow} shadow is connected to your ${mbtiType} cognitive distortion. Fix one, the others pull it back. You need the full system.`,
      realCause: `Your consciousness architecture — the complete system of patterns, shadows, cognitive distortions, and karmic imprints — has never been fully mapped. Not by you, not by any therapist, not by any app. Spiritual AI is the first system that can see the whole picture.`,
      solutionMechanism: `Spiritual AI synthesizes all three frameworks (Vedic + Jungian + MBTI) across your entire consciousness architecture to produce a 90-day transformation sequence that addresses every connected layer simultaneously.`,
      speedSpecificityConsistency: {
        speed: 'First results within 7 days, full transformation in 90 days',
        specific: `Your complete architecture: ${mbtiType} + ${patternName} + ${shadow} + ${lifeStage}`,
        consistent: 'The same rigorous analysis every day for 90 days',
      },
      damagingAdmission: `This is the most intensive product we offer. It requires daily commitment for 90 days. If you're not ready for total transformation, start with one of the single-pattern products.`,
      transition: `You've been fixing pieces. It's time to transform the whole.`,
      whatYouGet: [
        'Complete Consciousness Blueprint (PDF + Audio + AI) — 90-day system',
        'All Pattern Dissolution Protocols — every pattern detected in your blueprint',
        'Shadow Integration System — complete shadow work for your MBTI type',
        'Vedic Transit Guide — navigate the next 12 months of your karmic cycle',
        'AI Transformation Companion — daily adaptive guidance for 90 days',
      ],
      valueStack: [
        { item: 'Complete Blueprint', value: '₹497', reason: 'Your 90-day transformation system' },
        { item: 'All Pattern Protocols', value: '₹297', reason: 'Every pattern, dissolved' },
        { item: 'Shadow Integration', value: '₹197', reason: 'Complete shadow work' },
        { item: 'Vedic Transit Guide', value: '₹97', reason: '12-month karmic navigation' },
        { item: 'AI Companion (90 days)', value: '₹297', reason: 'Daily adaptive guidance' },
      ],
      price: { original: 1385, discounted: 341 },
      ctaText: 'Begin Total Transformation',
      security: {
        personalization: `Your complete consciousness architecture — ${mbtiType} + ${patternName} + ${shadow} — fully mapped and addressed`,
        differentiation: `No other system on earth can synthesize Vedic + Jungian + MBTI at this precision`,
        privacy: 'Your complete consciousness data is encrypted end-to-end.',
      },
      bonuses: [
        { name: '90-Day Transformation Calendar', description: 'Day-by-day guide', value: '₹47' },
        { name: 'Emergency Pattern Interrupt Audio', description: 'For when any pattern activates', value: '₹47' },
        { name: 'Integration Ceremony Kit', description: 'Ritual framework for major shifts', value: '₹37' },
      ],
      guarantee: `If you don't experience measurable transformation across ALL identified patterns within 90 days, we refund you in full. This is how confident we are in the complete system.`,
      urgency: `Complete Blueprint cohorts are limited to 25 people. Current cohort: ${Math.floor(Math.random() * 15) + 10}/25 filled. Price increases when the cohort fills.`,
      tiers: [
        { name: 'The Foundation', includes: ['Complete Blueprint', 'AI Companion (30 days)'], price: '₹197', forWho: 'For those starting their transformation' },
        { name: 'The Transformation', includes: ['Everything in Foundation', 'All Pattern Protocols', 'Shadow Integration', 'AI Companion (90 days)'], price: '₹341', forWho: 'For those committed to total transformation' },
        { name: 'The Mastery', includes: ['Everything in Transformation', 'Vedic Transit Guide', 'All Bonuses', 'Priority AI Access'], price: '₹541', forWho: 'For those who want the absolute maximum' },
      ],
      imageBrief: `Deep cosmic background with a human silhouette at the center, surrounded by three interconnected rings (Vedic, Jungian, MBTI) rendered in gold sigil lines. Constellation patterns within the rings. The silhouette is luminous, transforming. Sacred, vast, precise.`,
    },
  ];
}

// ── Helper functions for fallback products ──

function getObstacleForPattern(patternId: string): string {
  const obstacles: Record<string, string> = {
    self_sabotage: 'waiting for the "right moment"',
    perfectionism: 'another unfinished project',
    people_pleasing: 'feeling guilty every time you say no',
    avoidance_loop: 'another year of procrastination',
    emotional_avoidance: 'numbing out when it matters most',
    scarcity_mindset: 'another "abundance meditation" that changes nothing',
    victim_loop: 'blaming circumstances one more time',
    achievement_emptiness: 'chasing the next achievement that won\'t fill the void',
    identity_dissolution: 'another identity crisis',
    spiritual_bypassing: 'hiding behind spiritual language',
    sovereign_in_exile: 'another year of potential unrealized',
  };
  return obstacles[patternId] || 'more of the same';
}

function getShadowObstacle(mbtiType: string): string {
  const obstacles: Record<string, string> = {
    INFP: 'losing yourself in someone else\'s story',
    INFJ: 'burning out from saving everyone',
    INTJ: 'building a perfect system that controls you',
    INTP: 'analyzing your way out of feeling',
    ENTJ: 'crushing everyone who gets in your way',
    ENTP: 'intellectualizing every emotion',
    ENFJ: 'performing a version of yourself that isn\'t real',
    ENFP: 'scattering your energy across 47 unfinished projects',
    ISTJ: 'clinging to rules that no longer serve you',
    ISFJ: 'silently resenting everyone you\'ve helped',
    ESTJ: 'controlling everything because you don\'t trust anyone',
    ESFJ: 'needing everyone to like you',
    ISTP: 'detaching when connection is what you need',
    ISFP: 'suppressing your anger until it explodes',
    ESTP: 'running from depth at 100mph',
    ESFP: 'performing joy while dying inside',
  };
  return obstacles[mbtiType] || 'more of the same';
}

function getDominantFunction(mbtiType: string): string {
  const functions: Record<string, string> = {
    INFP: 'Fi', INFJ: 'Ni', INTJ: 'Ni', INTP: 'Ti',
    ENTJ: 'Te', ENTP: 'Ne', ENFJ: 'Fe', ENFP: 'Ne',
    ISTJ: 'Si', ISFJ: 'Si', ESTJ: 'Te', ESFJ: 'Fe',
    ISTP: 'Ti', ISFP: 'Fi', ESTP: 'Se', ESFP: 'Se',
  };
  return functions[mbtiType] || 'dominant function';
}

function getInferiorFunction(mbtiType: string): string {
  const functions: Record<string, string> = {
    INFP: 'Te', INFJ: 'Se', INTJ: 'Fe', INTP: 'Fe',
    ENTJ: 'Fi', ENTP: 'Si', ENFJ: 'Ti', ENFP: 'Si',
    ISTJ: 'Ne', ISFJ: 'Ne', ESTJ: 'Fi', ESFJ: 'Ti',
    ISTP: 'Fe', ISFP: 'Te', ESTP: 'Ni', ESFP: 'Ni',
  };
  return functions[mbtiType] || 'inferior function';
}

function getVisualAnchor(patternId: string): string {
  const anchors: Record<string, string> = {
    self_sabotage: 'chain breaking',
    perfectionism: 'shattered mirror reforming',
    people_pleasing: 'boundary wall rising',
    avoidance_loop: 'door opening',
    emotional_avoidance: 'heart解封',
    scarcity_mindset: 'golden flow',
    victim_loop: 'chains dissolving',
    achievement_emptiness: 'empty throne',
    identity_dissolution: 'phoenix rising',
    spiritual_bypassing: 'mask cracking',
    sovereign_in_exile: 'crown returning',
  };
  return anchors[patternId] || 'transformation symbol';
}
