// ============================================================
// SPIRITUAL AI — API ROUTES
// /api/spiritual/route.ts
// ============================================================

import { NextRequest, NextResponse } from 'next/server';
import crypto from 'crypto';
import { sql } from '@/lib/db';
import { SPIRITUAL_IDENTITY_RULES } from '@/lib/spiritual-identity';
import { 
  getLifeStage, 
  recommendProducts, 
  MBTI_PROFILES,
  PATTERNS,
  detectPattern,
  calculateProblemWorth,
  getLifeStageData,
  analyzeLinguistics
} from '@/lib/spiritual-conversation-engine';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_WHISPER_URL = 'https://api.groq.com/openai/v1/audio/transcriptions';

const MODELS = {
  // Layer 1 — Groq primary
  question:   "llama-3.1-8b-instant",      // fast exchanges
  report:     "llama-3.3-70b-versatile",   // deep report gen
  voice:      "whisper-large-v3-turbo",    // voice transcription

  // Layer 2 — Gemini failover (Fixed: 1.5-flash is decommissioned)
  failover1:  "gemini-2.0-flash",          

  // Layer 3 — Local Ollama (Upgraded: 256K context)
  failover2:  "gemma4:27b",               
};

const WHISPER_MODEL = MODELS.voice;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/chat';
const OLLAMA_MODEL = MODELS.failover2;
const GOOGLE_AI_STUDIO_KEY = process.env.GOOGLE_AI_STUDIO_KEY;
const GOOGLE_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODELS.failover1}:generateContent`;

// ─── Origin Point Helpers ─────────────────────────────────────
function generateCSN() {
  const year = new Date().getFullYear();
  const random = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `SAI-${year}-ORIGIN-${random}`;
}

function generateVerificationHash(data: any) {
  const salt = process.env.DATABASE_URL || 'spiritual-ai-2026';
  return crypto
    .createHash('sha256')
    .update(JSON.stringify(data) + salt)
    .digest('hex');
}

// ============================================================
// HELPERS FOR FALLBACKS
// ============================================================

function getStaticQuizQuestions() {
  return [
    {
      id: "quiz_q1",
      contextLine: "This reveals how your mind recharges.",
      question: "After a demanding week, you naturally restore yourself by…",
      mbtiDimension: 'E_I',
      options: [
        { text: 'Retreating into solitude and processing alone', subLabel: 'Internal Integration', mbtiSignal: 'I' },
        { text: 'Connecting with others and sharing energy', subLabel: 'External Expansion', mbtiSignal: 'E' },
      ]
    },
    {
      id: "quiz_q2",
      contextLine: "This shows how your mind naturally processes.",
      question: "When facing a complex problem, you first look for…",
      mbtiDimension: 'N_S',
      options: [
        { text: 'The underlying pattern and what it means', subLabel: 'Abstract Architecture', mbtiSignal: 'N' },
        { text: 'Concrete facts and practical applications', subLabel: 'Grounded Reality', mbtiSignal: 'S' },
      ]
    }
  ];
}

function getFallbackReport(mbtiType: string) {
  const profile = MBTI_PROFILES[mbtiType] || MBTI_PROFILES['INFP'];
  return {
    header: {
      architecture: `${mbtiType} · Seeker`,
      patternName: profile.corePattern,
      urgencyPercent: 72
    },
    mirror: profile.learningStyle + " " + profile.buyingPattern,
    root: profile.corePattern,
    loop: {
      trigger: "Unconscious reactivity",
      copingMechanism: "Automatic pattern repetition",
      cost: "Stagnation and repeated cycles",
      reset: "Momentary relief through distraction"
    },
    cosmicConfirmation: `As a ${mbtiType}, your path to dissolution is through ${profile.spiritualPath}.`,
    costSection: "The cost of maintaining this pattern is the deferral of your true architecture.",
    path: `Begin your journey through ${profile.spiritualPath}. Precision, not motivation.`
  };
}

// ============================================================
// THE INTELLIGENT ROUTER
// ============================================================

export const maxDuration = 60; 

export async function POST(req: NextRequest) {
  try {
    const contentType = req.headers.get('content-type') || '';

    if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData();
      const file = formData.get('file') as File;
      if (!file) return NextResponse.json({ error: 'No file provided' }, { status: 400 });

      const groqFormData = new FormData();
      groqFormData.append('file', file);
      groqFormData.append('model', WHISPER_MODEL);

      const res = await fetch(GROQ_WHISPER_URL, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: groqFormData
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: 'Unknown error' }));
        return NextResponse.json({ error: 'Whisper failed', details: err }, { status: res.status });
      }

      const data = await res.json();
      return NextResponse.json({ success: true, text: data.text });
    }

    const body = await req.json();
    const { action, userState, conversationHistory, currentQuestion, userAnswer } = body;

    switch (action) {
      case 'warmup':
        await Promise.allSettled([groqChat("ping", "ping", 0), localOllamaChat("ping", "ping")]);
        return NextResponse.json({ success: true });

      case 'process_answer':
        return await processAnswer(req, userState, conversationHistory, currentQuestion, userAnswer);

      case 'parse_ai_paste':
        return await parseAIPaste(userAnswer);

      case 'generate_quiz':
      case 'generate_report':
        if (action === 'generate_quiz') return await generateQuizQuestions(userState, conversationHistory);
        return await generateReport(userState, conversationHistory);

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    }
  } catch (error) {
    console.error('Spiritual AI Hybrid Router error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// ============================================================
// GROQ HELPER
// ============================================================

async function groqChat(systemPrompt: string, userMessage: string, retries = 2, model = MODELS.question): Promise<string> {
  if (!GROQ_API_KEY) return localOllamaChat(systemPrompt, userMessage, model);

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
        temperature: 0.7,
        max_tokens: 120,
        response_format: { type: 'json_object' }
      }),
    });

    if (!res.ok) {
      if (retries > 0) return groqChat(systemPrompt, userMessage, retries - 1, model);
      throw new Error(`Groq returned ${res.status}`);
    }

    const data = await res.json();
    return data.choices[0]?.message?.content || '';
  } catch (err: any) {
    return googleGeminiChat(systemPrompt, userMessage);
  }
}

// ─── STREAMING HELPER ───────────────────────────────────────
async function groqStream(systemPrompt: string, userMessage: string, model = MODELS.question) {
    const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
            model,
            messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
            stream: true,
            temperature: 0.7,
            max_tokens: 120,
            response_format: { type: 'json_object' }
        }),
    });

    const encoder = new TextEncoder();
    const decoder = new TextDecoder();

    return new ReadableStream({
        async start(controller) {
            const reader = response.body?.getReader();
            if (!reader) return controller.close();

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                const chunk = decoder.decode(value);
                const lines = chunk.split('\n').filter(l => l.trim() !== '');
                for (const line of lines) {
                    const cleanLine = line.replace('data: ', '').trim();
                    if (cleanLine === '[DONE]') continue;
                    try {
                        const json = JSON.parse(cleanLine);
                        const text = json.choices[0]?.delta?.content || '';
                        if (text) controller.enqueue(encoder.encode(text));
                    } catch (e) {}
                }
            }
            controller.close();
        },
    });
}

async function googleGeminiChat(systemPrompt: string, userMessage: string): Promise<string> {
  if (!GOOGLE_AI_STUDIO_KEY) return localOllamaChat(systemPrompt, userMessage);
  try {
    const res = await fetch(`${GOOGLE_ENDPOINT}?key=${GOOGLE_AI_STUDIO_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: 'user', parts: [{ text: userMessage }] }],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1500 },
      })
    });
    if (!res.ok) throw new Error(`Google Gemini returned ${res.status}`);
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  } catch (e) {
    return localOllamaChat(systemPrompt, userMessage);
  }
}

async function localOllamaChat(systemPrompt: string, userMessage: string, model = OLLAMA_MODEL): Promise<string> {
  try {
    const res = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
        stream: false,
        options: { temperature: 0.7 }
      }),
    });
    const data = await res.json();
    return data.message?.content || '';
  } catch (e) {
    return ""; 
  }
}

function extractJSON(text: string): any {
  if (!text) return null;
  let cleanText = text.replace(/<thought>[\s\S]*?<\/thought>/gi, '').trim();
  try {
    return JSON.parse(cleanText);
  } catch {
    const matches = cleanText.match(/\{[\s\S]*\}/g);
    if (matches) {
      const lastMatch = matches[matches.length - 1];
      try {
        return JSON.parse(lastMatch.replace(/```json|```/g, '').trim());
      } catch (e) {}
    }
    
    // Fallback: If it's malformed JSON, try to extract just the question
    if (cleanText.includes('"question"')) {
        const qMatch = cleanText.match(/"question"\s*:?\s*"?([^",}]+)/);
        if (qMatch && qMatch[1]) {
            return { question: qMatch[1].trim(), options: [], type: "question", contextLine: "" };
        }
    }
    return null;
  }
}

function formatConversation(history: any[]): string {
  if (!history || history.length === 0) return '(no previous exchanges)';
  return history
    .map((h, i) => `  [ROUND ${Math.floor(i/2) + 1} - ${h.role.toUpperCase()}]: ${h.content}`)
    .join('\n');
}

// ============================================================
// ACTION: PROCESS ANSWER
// ============================================================
async function processAnswer(
  req: NextRequest,
  userState: any,
  conversationHistory: any[],
  currentQuestion: string | null,
  userAnswer: string
) {
  const round = conversationHistory.filter(h => h.role === 'user').length + 1;
  const now = Date.now();
  const lastTs = userState.tracking?.lastMessageTimestamp || now;
  
  // ─── ENGAGEMENT SCORE CALCULATION ─────────────────────────
  const wordCount = userAnswer.trim().split(/\s+/).length;
  const emotionalKeywords = ['feel', 'hurt', 'sad', 'happy', 'love', 'pain', 'heart', 'soul', 'empty', 'lonely', 'anxiety', 'fear', 'joy', 'scared', 'tired'];
  const emotionalCount = emotionalKeywords.filter(w => userAnswer.toLowerCase().includes(w)).length;
  
  // ─── LINGUISTIC & HESITATION ANALYSIS ────────────────────
  const responseTimeMillis = now - lastTs;
  const isHighHesitation = responseTimeMillis > 25000 && wordCount < 15;
  const linguisticFlags = analyzeLinguistics(userAnswer);
  
  let hesitationPrompt = "";
  if (isHighHesitation) {
    hesitationPrompt = `DELETED DRAFT DETECTED: It took the user ${Math.floor(responseTimeMillis/1000)} seconds to type ${wordCount} words. Their brain gave them the truth in 2 seconds, and they spent the rest of the time sanitizing it. MANDATE: Call this out directly. Ask them exactly what thought they deleted before typing this.`;
  }

  let linguisticPrompt = "";
  if (linguisticFlags.length > 0) {
    linguisticPrompt = `NEURO-LINGUISTIC FINGERPRINT DETECTED: ${linguisticFlags.join(' | ')}. MANDATE: Confront this language choice directly. Point out how they structure their sentence to avoid the truth.`;
  }

  const wordWeight = Math.min(wordCount, 60);
  const emotionalWeight = Math.min(emotionalCount * 10, 40);
  const engagementScore = wordWeight + emotionalWeight;

  const questionMode = 
    engagementScore > 70 ? 'DEEP' :
    engagementScore > 30 ? 'MAINTAIN' : 
    'REENTRY';

  const isFatigued = engagementScore < 20 && round >= 5;
  const isExternal = !!userState.isExternalReport;
  
  // ─── DYNAMIC MODE INSTRUCTIONS ────────────────────────────
  const modeInstructions = {
    DEEP: "USER IS HIGHLY ENGAGED. Go one layer deeper immediately. Target the core identity, secondary gain, and root cause.",
    MAINTAIN: "USER IS MODERATELY ENGAGED. Stay at this depth, rephrase their truth to show you're tracking.",
    REENTRY: "USER IS DEFLECTING OR DISENGAGED. USE A SOMATIC INTERRUPTION: Command them to stop typing, look away from the screen, and locate the physical sensation (stomach, throat, chest) trying to protect them."
  }[questionMode];

  const missingDataPoints = [];
  if (!userState.birthDate || !userState.birthPlace) missingDataPoints.push("Birth Details");
  if (!userState.corePattern) missingDataPoints.push("Core Pattern");
  if (!userState.rootCause) missingDataPoints.push("Root Cause");
  if (!userState.confirmedMBTI) missingDataPoints.push("MBTI Type");

  const dataCollectionHeader = `
═══════════════════════════════════════════
MODE: ${questionMode} | ROUND ${round} OF 5
═══════════════════════════════════════════
ENGAGEMENT STATUS: ${modeInstructions}
UNLOCKED FIELDS NEEDED: ${missingDataPoints.join(', ')}.
${hesitationPrompt ? `\n🔥 ${hesitationPrompt}` : ""}
${linguisticPrompt ? `\n🔥 ${linguisticPrompt}` : ""}

YOUR MANDATE:
1. ANTI-REPETITION: DO NOT repeat questions, themes, or Completion Leads.
2. OPTIONS MANDATORY: You MUST provide exactly 2 to 4 interactive "options". Never provide only one option.
3. USE THE 8 LAWS: Rotate techniques (Bypass, Contradiction, Inverse, Somatic Pause, etc.) to deepen the decoding.
4. ADAPT TO MODE: ${modeInstructions}
5. 75% CONFIDENCE RULE: After this, score confidence. If avg > 75, set "type": "final_share".
`;

  const contextHeader = isExternal ? `
═══════════════════════════════════════════
SPECIAL CONTEXT: MASTER COGNITIVE ARCHITECT
═══════════════════════════════════════════
The user has provided a report from an external Master Cognitive Architect AI.
Current Extracted Data Summary: ${JSON.stringify(userState.report)}
MISSING FRAGMENTS: ${userState.missingFields?.join(', ') || 'All'}

YOUR MISSION:
You are "The Architect" acting as the closer. The external AI has identified the core, but some fragments are missing.
1. FOCUS ONLY ON MISSING FIELDS.
2. USE THE 6 LAWS to get high-quality data.
` : dataCollectionHeader;

  const PATTERNS_CONTEXT = `
═══════════════════════════════════════════
PSYCHOLOGICAL SIGNALS FOR INITIAL CHOICES
═══════════════════════════════════════════
- "I keep starting things I don't finish": Avoidance pattern, fear of completion, fear of being truly judged.
- "I finish things but they don't satisfy me": Achievement-emptiness loop, external validation seeker, identity not connected to success.
- "I know what I want but can't make myself do it": Self-sabotage pattern, secondary gain (the pattern protects something unnamed).
- "I don't know what I want anymore": Identity dissolution, deep existential layer shift, burnout or post-achievement depression.
`;

  const systemPrompt = SPIRITUAL_IDENTITY_RULES + contextHeader + PATTERNS_CONTEXT + 
    `
STRICT OUTPUT FORMAT:
Return ONLY a valid JSON object. NEVER output raw text outside the JSON.
REQUIRED KEYS: "contextLine", "question", "options", "type", "decodingProgress".

{
  "contextLine": "Mirror their exact words back as the bridge. No affirmations.",
  "question": "Apply one of the 6 Laws of Architectural Inquiry here.",
  "options": [
    {"text": "Option 1 (reveals pattern A)", "subLabel": "..."}, 
    {"text": "Option 2 (reveals pattern B)", "subLabel": "..."}, 
    {"text": "Something else entirely", "subLabel": "Describe your own truth"}
  ],
  "type": "question" | "final_share",
  "decodingProgress": number (0-100, representing your average confidence across the 4 core fields)
} ` + "}";

  const userMessage = `Conversation History:
${formatConversation(conversationHistory)}
User's latest answer: ${userAnswer}
${isExternal ? "Current Task: Fill the missing report fragments." : ""}`;

  // ─── STREAMING RESPONSE (Primary) ──────────────────────────
  if (req.headers.get('accept') === 'text/event-stream') {
    const stream = await groqStream(systemPrompt, userMessage, MODELS.question);
    return new Response(stream, { 
      headers: { 
        'Content-Type': 'text/event-stream',
        'Cache-Control': 'no-cache',
        'Connection': 'keep-alive'
      } 
    });
  }

  let text: string;
  try {
    text = await groqChat(systemPrompt, userMessage);
  } catch (err) {
    return NextResponse.json({ success: true, data: { question: "Tell me more about your journey...", type: 'question', options: [] } });
  }

  const parsed = extractJSON(text);
  if (!parsed || !parsed.question) {
    const fallbackBank = [
        { q: "Your silence speaks more than words. What were you about to write before you stopped yourself?", opts: [{ text: "I'm not ready to see it yet", subLabel: "Defense pattern" }, { text: "It's too heavy to name", subLabel: "Overwhelm pattern" }] },
        { q: "The logic breaks here. What is the one thing you refuse to admit about this situation?", opts: [{ text: "It's my fault", subLabel: "Responsibility loop" }, { text: "I enjoy the safety of the pain", subLabel: "Secondary gain" }] },
        { q: "Just one word — what does the core of this feeling actually taste like in your mind?", opts: [{ text: "Bitter", subLabel: "Resentment" }, { text: "Metallic", subLabel: "Fear" }, { text: "Empty", subLabel: "Dissociation" }] }
    ];
    const selected = fallbackBank[Math.floor(Math.random() * fallbackBank.length)];
    return NextResponse.json({ 
      success: true, 
      data: { 
        question: selected.q, 
        type: 'question', 
        options: [...selected.opts, { text: "Something else entirely", subLabel: "Direct truth" }],
        decodingProgress: userState.decodingProgress || 10
      } 
    });
  }
  
  parsed.updatedTracking = { engagementScore, isFatigued, lastMessageTimestamp: now };
  return NextResponse.json({ success: true, data: parsed });
}

// ============================================================
// ACTION: GENERATE REPORT
// ============================================================
async function generateReport(
  userState: any,
  conversationHistory: any[]
) {
  const systemPrompt = SPIRITUAL_IDENTITY_RULES + 
    "\n\n" +
    "═══════════════════════════════════════════\n" +
    "MODE: ARCHITECTURAL BRUTALISM (REPORT GEN)\n" +
    "═══════════════════════════════════════════\n" +
    "YOUR TASK: GENERATE A CONSCIOUSNESS BLUEPRINT.\n" +
    "MANDATORY: YOU MUST FILL EVERY SINGLE FIELD. NO 'UNKNOWN'. NO 'NULL'.\n" +
    "If information is missing, infer the most likely pattern from the user's analytical framing and word choices.\n\n" +
    "OUTPUT FORMAT: JSON ONLY.\n\n" +
    "{\n" +
    "  \"report\": {\n" +
    "    \"header\": { \"architecture\": \"MBTI / Cosmic Axis\", \"patternName\": \"VISCERAL IDENTITY NAME\", \"urgencyPercent\": 95 },\n" +
    "    \"mirror\": \"Hold up the mirror. Name the shadow pattern directly.\",\n" +
    "    \"root\": \"The childhood installation / root cause.\",\n" +
    "    \"loop\": { \"trigger\": \"...\", \"copingMechanism\": \"...\", \"cost\": \"...\", \"reset\": \"...\" },\n" +
    "    \"cosmicConfirmation\": \"How their astrology confirms this peek moment.\",\n" +
    "    \"costSection\": \"The brutal price of inaction.\",\n" +
    "    \"path\": \"One precise actionable shift.\"\n" +
    "  },\n" +
    "  \"products\": [\n" +
    "    { \"name\": \"...\", \"description\": \"...\", \"price\": \"...\", \"link\": \"...\" }\n" +
    "  ]\n" +
    "}";

  const userMessage = `History: ${formatConversation(conversationHistory)}`;
  let text = await groqChat(systemPrompt, userMessage, 2, MODELS.report);
  const parsed = extractJSON(text);
  
  if (!parsed || !parsed.report) {
      // Emergency fallback for report generation
      return NextResponse.json({ 
          success: true, 
          data: { 
              report: getFallbackReport(userState.confirmedMBTI || 'INFP'),
              products: recommendProducts(userState.confirmedMBTI || 'INFP', userState.budget || 'mid')
          } 
      });
  }
  
  const csn = generateCSN();
  const hash = generateVerificationHash({ ...parsed, sessionId: userState.session_id });
  
  try {
    await sql`INSERT INTO reports (session_id, report_json, products_json, cosmic_serial_number, verification_hash) 
              VALUES (${userState.session_id || 'anon'}, ${JSON.stringify(parsed.report)}, ${JSON.stringify(parsed.products)}, ${csn}, ${hash})`;
  } catch (e) {}

  return NextResponse.json({ success: true, data: { ...parsed, originPoint: { csn, hash, etchedAt: new Date().toISOString() } } });
}

// ============================================================
// ACTION: PARSE AI PASTE
// ============================================================
async function parseAIPaste(text: string) {
  const startMarker = "---SPIRITUAL AI REPORT START---";
  const endMarker = "---SPIRITUAL AI REPORT END---";
  const startIndex = text.indexOf(startMarker);
  const endIndex = text.indexOf(endMarker);
  
  if (startIndex === -1 || endIndex === -1) {
    return NextResponse.json({ success: false, error: "Markers not found." }, { status: 400 });
  }
  
  const reportText = text.substring(startIndex + startMarker.length, endIndex).trim();
  const lines = reportText.split('\n');
  const data: Record<string, string> = {};
  
  lines.forEach(line => {
    const colonIndex = line.indexOf(':');
    if (colonIndex !== -1) {
      data[line.substring(0, colonIndex).trim()] = line.substring(colonIndex + 1).trim();
    }
  });

  const missingFields: string[] = [];
  const check = (key: string, val: string | undefined) => {
    if (!val || val.toUpperCase().includes('MISSING') || val === 'Unknown') {
      missingFields.push(key);
      return false;
    }
    return true;
  };

  check('MBTI_TYPE', data.MBTI_TYPE);
  check('CONSCIOUSNESS_IDENTITY', data.CONSCIOUSNESS_IDENTITY);
  check('CORE_PATTERN', data.CORE_PATTERN);
  check('ROOT_CAUSE', data.ROOT_CAUSE);
  check('WHAT_IT_COSTS', data.WHAT_IT_COSTS);
  check('SPIRITUAL_PATH', data.SPIRITUAL_PATH);

  const report: any = {
    mbtiType: data.MBTI_TYPE || "Unknown",
    archetype: data.CONSCIOUSNESS_IDENTITY || data.CORE_PATTERN || "The Seeker",
    corePattern: data.CORE_PATTERN || "Unknown",
    rootCause: data.ROOT_CAUSE || "",
    spiritualPath: data.SPIRITUAL_PATH || "Jnana",
    headlineText: "Your Consciousness Blueprint",
    subText: data.CONSCIOUSNESS_IDENTITY || data.CORE_PATTERN || "",
  };

  const userState = {
    confirmedMBTI: data.MBTI_TYPE,
    detectedPattern: data.CORE_PATTERN,
    report: report,
    isExternalReport: true,
    missingFields
  };

  return NextResponse.json({ success: true, data: userState, missingFields });
}

async function generateQuizQuestions(userState: any, history: any[]) {
  return NextResponse.json({ success: true, data: getStaticQuizQuestions() });
}
