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
  getLifeStageData
} from '@/lib/spiritual-conversation-engine';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const GROQ_MODEL = 'llama-3.1-8b-instant';
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434/api/chat';
const OLLAMA_MODEL = 'gemma4:31b-cloud';
const GOOGLE_AI_STUDIO_KEY = process.env.GOOGLE_AI_STUDIO_KEY;
const GOOGLE_ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

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
    const body = await req.json();
    const { action, userState, conversationHistory, currentQuestion, userAnswer } = body;

    switch (action) {
      case 'warmup':
        await Promise.allSettled([groqChat("ping", "ping", 0), localOllamaChat("ping", "ping")]);
        return NextResponse.json({ success: true });

      case 'process_answer':
        return await processAnswer(userState, conversationHistory, currentQuestion, userAnswer);

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

async function groqChat(systemPrompt: string, userMessage: string, retries = 2, model = GROQ_MODEL): Promise<string> {
  if (!GROQ_API_KEY) return localOllamaChat(systemPrompt, userMessage, model);

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
      body: JSON.stringify({
        model: model,
        messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
        temperature: 0.7,
        max_tokens: 1500,
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
async function groqStream(systemPrompt: string, userMessage: string, model = GROQ_MODEL) {
    const response = await fetch(GROQ_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
        body: JSON.stringify({
            model,
            messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
            stream: true,
            temperature: 0.7,
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
                    if (line.includes('[DONE]')) continue;
                    try {
                        const json = JSON.parse(line.replace('data: ', ''));
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
      } catch (e) {
        return null;
      }
    }
    return null;
  }
}

function formatConversation(history: any[]): string {
  if (!history || history.length === 0) return '(no previous exchanges)';
  return history
    .map((h) => `  [${h.role.toUpperCase()}]: ${h.content}`)
    .join('\n');
}

// ============================================================
// ACTION: PROCESS ANSWER
// ============================================================
async function processAnswer(
  userState: any,
  conversationHistory: any[],
  currentQuestion: string | null,
  userAnswer: string
) {
  const round = conversationHistory.filter(h => h.role === 'user').length + 1;
  const now = Date.now();
  const lastTs = userState.tracking?.lastMessageTimestamp || now;
  const responseTime = now - lastTs;
  
  let engagementScore = userState.tracking?.engagementScore || 100;
  const wordCount = userAnswer.split(/\s+/).length;
  if (wordCount > 20) engagementScore += 5;
  if (wordCount < 5) engagementScore -= 10;
  engagementScore = Math.max(0, Math.min(100, engagementScore));

  const isFatigued = engagementScore < 40 || round >= (userState.sessionConfig?.maxQuestions || 10);
  const isExternal = !!userState.isExternalReport;
  const missingFields = userState.missingFields || [];

  const systemPrompt = SPIRITUAL_IDENTITY_RULES + `

${isExternal ? `
═══════════════════════════════════════════
SPECIAL CONTEXT: MASTER COGNITIVE ARCHITECT
═══════════════════════════════════════════
The user has provided a report from an external Master Cognitive Architect AI.
Current Extracted Data Summary: ${JSON.stringify(userState.report)}
MISSING FRAGMENTS: ${missingFields.join(', ')}

YOUR MISSION:
You are "The Architect" acting as the closer. The external AI has identified the core, but some fragments are missing.
1. FOCUS ONLY ON MISSING FIELDS: Ask questions to fill in: ${missingFields.join(', ')}.
2. NO PRODUCTS: Do not mention any product names or shop links yet.
3. ACKNOWLEDGE: Briefly acknowledge their input and how it relates to the cognitive architecture.
4. STOP OPTION: If you sense the user is done or they selected a "Finish" option, transition to "final_share".
` : ''}

YOUR PSYCHOLOGIST STRATEGY:
1. THE BRIDGE: Reflect their answer ("${userAnswer}").
2. NO GENERIC QUESTIONS: Each question must feel like a logical consequence of their answer.
3. OUTPUT FORMAT — JSON ONLY:
{
  "contextLine": "...",
  "question": "...",
  "options": [{"text": "...", "subLabel": "..."}],
  "type": "question"
}
`;

  const userMessage = `Conversation History:
${formatConversation(conversationHistory)}
User's latest answer: ${userAnswer}
${isExternal ? "Current Task: Fill the missing report fragments." : ""}`;

  // Check for streaming header
  if (req.headers.get('accept') === 'text/event-stream') {
    const stream = await groqStream(systemPrompt, userMessage);
    return new Response(stream, { headers: { 'Content-Type': 'text/event-stream' } });
  }

  let text: string;
  try {
    text = await groqChat(systemPrompt, userMessage);
  } catch (err) {
    return NextResponse.json({ success: true, data: { question: "Tell me more about your journey...", type: 'question', options: [] } });
  }

  const parsed = extractJSON(text);
  if (!parsed) return NextResponse.json({ success: true, data: { question: "I'm tracking. How has this impacted your daily peace?", type: 'question', options: [] } });
  
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
  const systemPrompt = SPIRITUAL_IDENTITY_RULES + `
YOUR TASK: GENERATE FULL CONSCIOUSNESS BLUEPRINT.
NO PLACEHOLDERS. NO "MISSING". Use all conversation context to build the report.
OUTPUT FORMAT: JSON ONLY.
{
  "report": {
    "header": { "architecture": "...", "patternName": "...", "urgencyPercent": 85 },
    "sections": [
       { "id": "mirror", "title": "The Mirror", "content": "... (Every report includes your Consciousness Identity — a precise name for how your mind is uniquely wired. Nobody else has the same one.)" },
       { "id": "root", "title": "The Root", "content": "..." },
       { "id": "loop", "title": "The Loop", "content": "..." },
       { "id": "path", "title": "The Path", "content": "..." }
    ]
  },
  "products": [...]
}
`;

  const userMessage = `History: ${formatConversation(conversationHistory)}`;
  let text = await groqChat(systemPrompt, userMessage);
  const parsed = extractJSON(text);
  
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
