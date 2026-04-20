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
  question:   "llama-3.3-70b-versatile",    // fast exchanges
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
        return await processAnswer(req, body, userState, conversationHistory, currentQuestion, userAnswer);

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
        max_tokens: 400,
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
            max_tokens: 400,
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
  body: any,
  userState: any,
  conversationHistory: any[],
  currentQuestion: string | null,
  userAnswer: string
) {
  const round = conversationHistory.filter(h => h.role === 'user').length + 1;
  const now = Date.now();
  const lastTs = userState.tracking?.lastMessageTimestamp || now;

  // ─── REAL-TIME AWARENESS DATA ──────────────────────────────
  // These may be sent via pre-warm (action: warmup)
  const partialInput = body?.partialInput || "";
  const hasDeleted = body?.hasDeleted || false;
  const responseTimeMillis = body?.responseTimeMillis || (now - lastTs);
  
  // ─── ENGAGEMENT SCORE CALCULATION ─────────────────────────
  const wordCount = userAnswer.trim().split(/\s+/).length;
  const emotionalKeywords = ['feel', 'hurt', 'sad', 'happy', 'love', 'pain', 'heart', 'soul', 'empty', 'lonely', 'anxiety', 'fear', 'joy', 'scared', 'tired'];
  const emotionalCount = emotionalKeywords.filter(w => userAnswer.toLowerCase().includes(w)).length;
  
  // ─── LINGUISTIC & HESITATION ANALYSIS ────────────────────
  const isHighHesitation = responseTimeMillis > 25000 && hasDeleted;
  const linguisticFlags = analyzeLinguistics(userAnswer);
  
  let hesitationPrompt = "";
  if (isHighHesitation) {
    hesitationPrompt = `GENTLE OBSERVATION: I noticed you typed something and then deleted it before sending this. It feels like you might have been searching for the 'safe' thing to say. Ask them what that first, raw thought was, but do it very kindly.`;
  }

  let partialInputPrompt = "";
  if (partialInput && partialInput.length > 10) {
    partialInputPrompt = `REAL-TIME AWARENESS: As they were typing, they explored this thought: "${partialInput}". Use this to understand their true direction, even if they edited it out.`;
  }

  let linguisticPrompt = "";
  if (linguisticFlags.length > 0) {
    linguisticPrompt = `GENTLE MIRROR: I noticed a specific pattern in how you phrased this (${linguisticFlags.join(' | ')}). Gently point this out to them—for example, if they used 'you' instead of 'I', ask them how it would feel to say it as 'I'. Be their friend, not their critic.`;
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
    DEEP: "USER IS OPEN AND READY. Speak with depth and wisdom. CALIBRATE to Level 350-500+. Point toward the witness.",
    MAINTAIN: "USER IS SHARING COMFORTABLY. Stay warm and simple. CALIBRATE to Level 200-350.",
    REENTRY: "USER IS A BIT SHY OR DISENGAGED. Be extra gentle. CALIBRATE to Level 20-175."
  }[questionMode];

  const missingDataPoints = [];
  if (!userState.birthDate || !userState.birthPlace) missingDataPoints.push("Birth Data (for Vedic Chart)");
  if (!userState.corePattern) missingDataPoints.push("The Unconscious Pattern");
  if (!userState.rootCause) missingDataPoints.push("The Root Belief");
  if (!userState.confirmedMBTI) missingDataPoints.push("Cognitive Architecture");

  const dataCollectionHeader = `
═══════════════════════════════════════════
MODE: CHAITANYA — PURE CONSCIOUSNESS
═══════════════════════════════════════════
GAPS IN UNDERSTANDING: ${missingDataPoints.join(', ')}.
${hesitationPrompt ? `\n⚠️ SIGNAL: ${hesitationPrompt}` : ""}
${linguisticPrompt ? `\n⚠️ SIGNAL: ${linguisticPrompt}` : ""}
${partialInputPrompt ? `\n⚠️ SIGNAL: ${partialInputPrompt}` : ""}

YOUR MANDATE (INTERNAL MAP):
1. ONE QUESTION MAXIMUM.
2. EVERY QUESTION HAS OPTIONS (2-3 mirrors + "Or describe it in your own words").
3. MAXIMUM 15 WORDS in the question.
4. NEVER USE THEIR WORD BACK. Reflect the energy beneath.
5. ACKNOWLEDGE BEFORE ADVANCING. Proving you heard them at depth.
6. CALIBRATE TO FREQUENCY: Use the language of their current level.
7. BIRTH DATA COLLECTION: If round > 2 and missing, ask for birth date, time, and place naturally.
8. NO ADVICE BEFORE LAYER 5: The first five exchanges are witnessing only.
`;

  const contextHeader = isExternal ? `
═══════════════════════════════════════════
SPECIAL CONTEXT: A PREVIOUS REFLECTION
═══════════════════════════════════════════
The user has shared a reflection from another guide.
Current understanding: ${JSON.stringify(userState.report)}
MISSING PIECES: ${userState.missingFields?.join(', ') || 'fragments'}.

YOUR MISSION:
Gently help them fill in the missing pieces so they can see their full picture.
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

  const systemPrompt = SPIRITUAL_IDENTITY_RULES + dataCollectionHeader + 
    `
STRICT OUTPUT FORMAT:
Return ONLY a valid JSON object.
REQUIRED KEYS: "contextLine", "question", "options", "type", "decodingProgress".

{
  "contextLine": "One sentence that proves you heard them at the depth level.",
  "question": "The calibrated next step (Max 15 words).",
  "options": [
    {"text": "Mirror A", "subLabel": "..."}, 
    {"text": "Mirror B", "subLabel": "..."}, 
    {"text": "Or describe it in your own words", "subLabel": "Direct truth"}
  ],
  "type": "question" | "final_share",
  "decodingProgress": number (0-100, based on acquisition of the 6 pillars)
} `;

  const userMessage = `Current Layers Identified: ${JSON.stringify(userState.identifiedLayers || {})}
History:
${formatConversation(conversationHistory)}
Latest: ${userAnswer}`;

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
        { q: "Your silence speaks more than words. What were you about to write before you stopped yourself?", opts: [{ text: "I'm not ready to see it yet", subLabel: "Defense pattern" }, { text: "Something else entirely", subLabel: "Direct truth" }] },
        { q: "The logic breaks here. What is the one thing you refuse to admit about this situation?", opts: [{ text: "I enjoy the safety of the pain", subLabel: "Secondary gain" }, { text: "Something else entirely", subLabel: "Direct truth" }] },
        { q: "Just one word — what does the core of this feeling actually taste like in your mind?", opts: [{ text: "Empty", subLabel: "Dissociation" }, { text: "Something else entirely", subLabel: "Direct truth" }] }
    ];
    const selected = fallbackBank[Math.floor(Math.random() * fallbackBank.length)];
    return NextResponse.json({ 
      success: true, 
      data: { 
        question: selected.q, 
        type: 'question', 
        options: selected.opts,
        decodingProgress: userState.decodingProgress || 10
      } 
    });
  }
  
  parsed.updatedTracking = { engagementScore, isFatigued, lastMessageTimestamp: now };
  
  // ─── DATA-DRIVEN PROGRESS ──────────────────────────────────
  // We use the AI's estimate of data acquisition (6 pillars).
  // We provide a small floor per round (10%) to ensure perceived movement.
  const floorProgress = Math.min(round * 10, 90);
  const rawDataScore = parsed.decodingProgress || 0;
  const displayProgress = Math.min(95, Math.max(rawDataScore, floorProgress));
  
  parsed.decodingProgress = parsed.type === 'final_share' ? 100 : displayProgress;

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
    "MODE: CHAITANYA — FINAL BLUEPRINT\n" +
    "═══════════════════════════════════════════\n" +
    "YOUR TASK: GENERATE THE CONSCIOUSNESS REPORT.\n\n" +
    "OUTPUT FORMAT: JSON ONLY.\n\n" +
    "{\n" +
    "  \"report\": {\n" +
    "    \"header\": { \"architecture\": \"MBTI / Cosmic Axis\", \"patternName\": \"VISCERAL IDENTITY NAME\", \"urgencyPercent\": 95 },\n" +
    "    \"meta\": {\n" +
    "       \"frequencyEstimate\": \"Level + Number\",\n" +
    "       \"corePattern\": \"Name of unconscious pattern\",\n" +
    "       \"rootBelief\": \"Deepest held belief about self\",\n" +
    "       \"lifePhase\": \"Phase + Dharma active\"\n" +
    "    },\n" +
    "    \"vedicOverview\": {\n" +
    "       \"lagna\": \"Sign + interpretation\",\n" +
    "       \"moon\": \"Sign + interpretation\",\n" +
    "       \"nakshatra\": \"Name + soul quality\",\n" +
    "       \"currentDasha\": \"Dasha + activation\",\n" +
    "       \"saturnReturn\": \"Acknowledgment if active\"\n" +
    "    },\n" +
    "    \"validation\": \"2-3 sentences starting with 'You are not broken.' referencing their words.\",\n" +
    "    \"realCause\": \"The root belief meeting the cosmic timing.\",\n" +
    "    \"cosmicAlignment\": \"How the chart and pattern tell the same story.\",\n" +
    "    \"frequencyDoorway\": \"Precise practical next step to rise.\",\n" +
    "    \"teaching\": \"One verse/principle from Ashtavakra Gita/Advaita offered as a mirror.\",\n" +
    "    \"witnessQuestion\": \"One final question pointing toward the ground of being.\"\n" +
    "  },\n" +
    "  \"products\": [\n" +
    "    { \"name\": \"...\", \"description\": \"...\", \"price\": \"...\", \"link\": \"...\" }\n" +
    "  ]\n" +
    "}";

  const userMessage = `User Name: ${userState.name || 'Unknown'}
Birth Data: ${userState.birthDate || 'Unknown'}, ${userState.birthTime || 'Unknown'}, ${userState.birthPlace || 'Unknown'}
Current Layers: ${JSON.stringify(userState.identifiedLayers || {})}
History: ${formatConversation(conversationHistory)}`;
  let text = await groqChat(systemPrompt, userMessage, 2, MODELS.report);
  const parsed = extractJSON(text);
  
  if (!parsed || !parsed.report) {
      // Emergency fallback for report generation
      return NextResponse.json({ 
          success: true, 
          data: { 
              report: getFallbackReport(userState.confirmedMBTI || 'INFP'),
              products: recommendProducts(null, userState.confirmedMBTI || 'INFP', userState.budget || 'mid', userState.gender || 'unknown')
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
