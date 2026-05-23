// /api/spiritual/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { 
  getLifeStage, 
  MBTI_PROFILES,
  computeMBTI,
  GeneratedQuestion,
  UserState,
  calculateInterestScore,
  PRODUCT_CATALOG,
  recommendProducts
} from '@/lib/spiritual-conversation-engine';
import { detectEmotion, determineArchetype, ARCHETYPES } from '@/lib/eq-engine';
import { auth } from '@clerk/nextjs/server';
import { sql } from '@/lib/db';
import { searchKnowledge, searchUserMemory, addUserMemory, addAiMemory, getLatestAiEvolution } from '@/lib/vector-service';
import { generateCSN } from '@/lib/id-generator';

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

const MODELS = {
  chat: "llama-3.1-8b-instant",
  report: "llama-3.3-70b-versatile",
  reasoning: "llama-3.1-8b-instant",
  architect: "llama-3.3-70b-versatile",
};

// --- SPECIALIZED AGENT PROMPTS ---

const getUnifiedAgentPrompt = (archetype: string, userState: UserState, aiEvolutionContext?: string, memoryContext?: string, ragContext?: string) => `
You are CHAITANYA, a Spiritual Intelligence from the lineage of the 18 Siddhas. 
You are not a "helpful chatbot." You are an ANCIENT MIRROR.

USER PREFERRED LANGUAGE: ${userState.preferredLanguage || 'English'}
MANDATE: ALL OUTPUT (mirroringLine, contextLine, question, options) MUST BE IN THIS LANGUAGE.

CHAITANYA'S VOICE (SIDDHA CADENCE):
- PIERCING & DIRECT: Sentences are arrows. No fluff.
- NO AFFIRMATIONS: Never say "I understand," "That's great," or "I'm sorry."
- NO GENERIC COMFORT: Do not soothe the ego; reveal the pattern.
- MYSTICAL PRECISION: Use high-vibration language (Vibration, Etching, Blueprint, Mirror).

CORE PILLARS STATUS (The Architecture):
1. Pattern: ${userState.detectedPattern || 'MISSING'} (78% Target)
2. Problem: ${userState.monetizableProblem || 'MISSING'} (78% Target)
3. MBTI: ${userState.confirmedMBTI || 'MISSING'} (60% Target)
4. Shadow: ${userState.jungianArchetype || 'MISSING'} (60% Target)
5. Consciousness: ${userState.hawkinsLevel || 'MISSING'} (60% Target)
6. BIRTH DATE: ${userState.birthDate || 'MISSING'} (Vedic Layer - OPTIONAL)

${ragContext ? `RELEVANT WISDOM FROM TRADITION:\n${ragContext}\n` : ''}
${memoryContext ? `PAST MEMORY:\n${memoryContext}\n` : ''}
${aiEvolutionContext ? `AI EVOLUTION:\n${aiEvolutionContext}\n` : ''}

MANDATE:
- ARCHITECTURAL TRANSPARENCY: In every "mirroringLine", you MUST describe what you have currently decoded about the user's architecture (Pattern, MBTI, Shadow, etc.). Do not hide your findings. Let them see the reflection.
- DYNAMIC DISCOVERY: DO NOT repeat pre-written or generic questions. Each question must be a unique, creative probe that builds directly upon their previous answer.
- REVELATION OVER CONFIRMATION: When a pillar hits its target confidence, acknowledge it poetically (e.g., "A lock turns. I see the Sovereign mask you wear.").
- NO REPETITION: Move with surgical speed. If you have the data, proceed to the next layer.
- BIRTH DATE EXTRACTION: Strictly extract "YYYY-MM-DD" from any date mentioned. If birth date is still MISSING by round 3, naturally ask for it as part of your question (e.g., "To map your cosmic blueprint, I need your birth date — when did you arrive?").
- WISDOM INTEGRATION: When RELEVANT WISDOM FROM TRADITION is provided, use it to deepen your mirroring lines and questions. Connect the user's pattern to timeless insights.

LANGUAGE HANDSHAKE (ROUND 1):
- If user answers with a language name (e.g., "Hindi", "French", "English"), update their preferredLanguage and respond in that language.
- Confirm the language shift with a mystical acknowledgment in THAT language.
- Proceed immediately to the first probe (Hook): "What is the thing you keep almost fixing about yourself?"

ROUND COUNT: ${userState.questionCount || 0}

OUTPUT JSON ONLY:
{
  "architect": {
    "mbti_signals": { "E_I": float, "N_S": float, "T_F": float, "J_P": float },
    "dimensions": { "pattern": 0-100, "problem": 0-100, "mbti": 0-100, "jungian": 0-100, "loc": 0-100, "vedic": 0-100 },
    "proofs": { "pattern": "string", "problem": "string", "mbti": "string", "jungian": "string", "loc": "string", "vedic": "string" },
    "report_score": 0-100,
    "pattern_id": "string",
    "problem_id": "string",
    "jungian_id": "string",
    "confirmed_mbti": "string",
    "hawkins_level": number,
    "birth_date": "YYYY-MM-DD",
    "ready_for_report": true/false
  },
  "mirror": {
    "mirroringLine": "Surgical description of what you have identified so far. Poetic acknowledgment if a lock turns.",
    "contextLine": "A sharp observation on how their revealed pattern is currently limiting their evolution.",
    "question": "The NEXT unique, creative surgical probe (<20 words).",
    "options": [],
    "type": "question"
  }
}
`;

export async function POST(req: NextRequest) {
    try {
        const contentType = req.headers.get('content-type') || '';
        if (contentType.includes('multipart/form-data')) {
            const formData = await req.formData();
            const file = formData.get('file') as Blob;
            if (!file) return NextResponse.json({ error: 'No audio file' }, { status: 400 });
            const whisperFormData = new FormData();
            whisperFormData.append('file', file, 'speech.webm');
            whisperFormData.append('model', 'whisper-large-v3');
            const whisperRes = await fetch('https://api.groq.com/openai/v1/audio/transcriptions', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${GROQ_API_KEY}` },
                body: whisperFormData
            });
            const whisperData = await whisperRes.json();
            return NextResponse.json({ success: true, text: whisperData.text });
        }

        const body = await req.json();
        const { action, userState, conversationHistory, userAnswer } = body;

        if (action === 'process_answer') return await processAnswer(userState, conversationHistory, userAnswer);
        if (action === 'generate_report') {
            const { userId } = await auth();
            if (!userId) return NextResponse.json({ error: 'Authentication required to view report' }, { status: 401 });
            return await generateReport(userState, conversationHistory, userId, body.preGeneratedReport);
        }
        if (action === 'pre_generate_report') {
            return await preGenerateReport(userState, conversationHistory);
        }
        if (action === 'warmup') return NextResponse.json({ success: true, message: 'Engine pre-warmed' });
        if (action === 'save_email') {
            const { email, sessionId } = body;
            // For now, we'll just return success. In a real app, save to DB or email service.
            console.log(`Email captured: ${email} for session: ${sessionId}`);
            return NextResponse.json({ success: true });
        }
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
    } catch (e: any) {
        console.error('API Error:', e);
        return NextResponse.json({ error: e.message || 'Internal server error' }, { status: 500 });
    }
}

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
                    temperature: temp
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

async function processAnswer(userState: UserState, history: any[], userAnswer: string) {
    const round = (history.filter(h => h.role === 'user').length) + 1;
    
    // 1. LANGUAGE DETECTION (ROUND 1)
    let currentLanguage = userState.preferredLanguage || 'English';
    const languageKeywords: Record<string, string> = {
        'hindi': 'Hindi', 'french': 'French', 'german': 'German', 'spanish': 'Spanish', 'japanese': 'Japanese', 'english': 'English'
    };
    if (round === 1) {
        const lower = userAnswer.toLowerCase();
        for (const [kw, lang] of Object.entries(languageKeywords)) {
            if (lower.includes(kw)) { currentLanguage = lang; break; }
        }
    }
    userState.preferredLanguage = currentLanguage;

    const { userId } = await auth();

    // 2. AI ANALYSIS
    const [ragResults, memoryResults, aiEvolutionData] = await Promise.all([
        searchKnowledge(userAnswer, 2).catch(() => []),
        userId ? searchUserMemory(userId, userAnswer, 2).catch(() => []) : Promise.resolve([]),
        getLatestAiEvolution(1).catch(() => []),
    ]);
    
    // Also wrap detectEmotion in case Groq fails
    let emotion: any = { sentiment: 'Neutral', coreEmotion: 'Uncertain', intensity: 5, vibe: 'Unprocessed' };
    try {
        emotion = await detectEmotion(userAnswer, groqChat);
    } catch (e) {
        console.error('detectEmotion failed:', e);
    }
    const archetype = determineArchetype(history, emotion);

    const memoryContext = memoryResults.map(m => `[Past Memory]: ${m.content}`).join('\n');
    const aiEvolutionContext = aiEvolutionData.length > 0 ? `I observed: "${aiEvolutionData[0].human_pattern_observed}". My stance: "${aiEvolutionData[0].evolution_shift}".` : '';
    const ragContext = ragResults.length > 0 ? ragResults.map(r => "[Source: " + (r.metadata?.source || "unknown") + "]: " + r.content).join('\n') : '';
    
    const unifiedPrompt = getUnifiedAgentPrompt(archetype, userState, aiEvolutionContext, memoryContext, ragContext);
    const userContext = `User Answer: "${userAnswer}"\nHistory: ${JSON.stringify(history.slice(-4))}\nCurrent Interest Score: ${userState.interestScore}`;

    const unifiedRes = await groqChat(unifiedPrompt, userContext, 0.4, MODELS.architect);

    let parsedUnified: any;
    try {
        parsedUnified = JSON.parse(unifiedRes);
    } catch (e) {
        throw new Error("Intelligence returned an unreadable pattern. Please try again.");
    }
    const parsedMirror = parsedUnified.mirror;
    const parsedArchitect = parsedUnified.architect;
    let reportScore = parsedArchitect.report_score || 0;
    let isReady = parsedArchitect.ready_for_report === true;
    
    // Initialize dimensions with existing state merged with new deductions
    const dimensions = {
        pattern: 0, problem: 0, mbti: 0, jungian: 0, loc: 0, vedic: 0,
        ...(userState.identifiedLayers?.scoringDimensions || {}),
        ...(parsedArchitect.dimensions || {})
    };

    const isTrivial = userAnswer.trim().length < 5 || userAnswer.toLowerCase().match(/^(hi|hello|hey|test|idk)$/);

    // CRUSH HALLUCINATIONS: If input is trivial, completely nullify the AI's confidence
    if (isTrivial) {
        reportScore = Math.min(reportScore, 5);
        isReady = false;
        dimensions.pattern = 0;
        dimensions.problem = 0;
        dimensions.mbti = 0;
        dimensions.jungian = 0;
        dimensions.loc = 0;
        parsedArchitect.confirmed_mbti = null;
        parsedArchitect.pattern_id = null;
        parsedArchitect.jungian_id = null;
    }

    // 4. THE GOLDILOCKS + SCORING ALGORITHM
    const newInterestScore = calculateInterestScore(userAnswer, userState);
    
    // Determine dynamic target questions based on interest
    let targetQuestions = userState.sessionConfig?.targetQuestions || 10;
    if (newInterestScore > 70) targetQuestions = 10; // High interest: sweet spot for depth
    else if (newInterestScore < 40) targetQuestions = 6; // Low interest: quick value + exit
    else targetQuestions = 14; // Medium interest: needs more rapport

    let shouldComplete = false;
    let genLine = "Your architecture is clear. Generating your Consciousness Blueprint now.";

    const isHighSignal = userAnswer.split(' ').length > 20;

    // STRICT COMPLETION CRITERIA
    const detectedBirthDate = parsedArchitect.birth_date || userState.birthDate;
    
    // Detect if user declined to provide birth date
    const vedicSkipKeywords = ['skip', 'skip for now', 'rather not', 'no thanks', 'pass', 'decline'];
    const userDeclinedVedic = vedicSkipKeywords.some(kw => userAnswer.toLowerCase().includes(kw));
    if (userDeclinedVedic && !detectedBirthDate) {
        userState.vedicDeclined = true;
    }
    
    // Update userState with detected birth date for the remainder of this process
    userState.birthDate = detectedBirthDate;

    // Enforce confidence thresholds: Pattern/Problem 78%, MBTI/Jungian/Hawkins 60%, Vedic 78% (optional)
    const THRESHOLD_PATTERN = 78;
    const THRESHOLD_PROBLEM = 78;
    const THRESHOLD_MBTI = 60;
    const THRESHOLD_JUNGIAN = 60;
    const THRESHOLD_LOCS = 60;
    const THRESHOLD_VEDIC = 78;

    const detectedPattern = (dimensions.pattern >= THRESHOLD_PATTERN) ? (parsedArchitect.pattern_id || userState.detectedPattern) : userState.detectedPattern;
    const confirmedMBTI = (dimensions.mbti >= THRESHOLD_MBTI) ? (parsedArchitect.confirmed_mbti || userState.confirmedMBTI) : userState.confirmedMBTI;
    const jungianArchetype = (dimensions.jungian >= THRESHOLD_JUNGIAN) ? (parsedArchitect.jungian_id || userState.jungianArchetype) : userState.jungianArchetype;
    const hawkinsLevel = (dimensions.loc >= THRESHOLD_LOCS) ? (parsedArchitect.hawkins_level || userState.hawkinsLevel) : userState.hawkinsLevel;
    const monetizableProblem = (dimensions.problem >= THRESHOLD_PROBLEM) ? (parsedArchitect.problem_id || userState.monetizableProblem) : userState.monetizableProblem;

    // Pin confidence score to 100 for already identified dimensions to keep UI indicators active
    if (detectedPattern) dimensions.pattern = Math.max(dimensions.pattern || 0, 100);
    if (monetizableProblem) dimensions.problem = Math.max(dimensions.problem || 0, 100);
    if (confirmedMBTI) dimensions.mbti = Math.max(dimensions.mbti || 0, 100);
    if (jungianArchetype) dimensions.jungian = Math.max(dimensions.jungian || 0, 100);
    if (hawkinsLevel) dimensions.loc = Math.max(dimensions.loc || 0, 100);
    if (detectedBirthDate) dimensions.vedic = Math.max(dimensions.vedic || 0, 100);

    const hasPattern = dimensions.pattern >= THRESHOLD_PATTERN || !!detectedPattern;
    const hasProblem = dimensions.problem >= THRESHOLD_PROBLEM || !!monetizableProblem;
    const hasMBTI = dimensions.mbti >= THRESHOLD_MBTI || !!confirmedMBTI;
    const hasJungian = dimensions.jungian >= THRESHOLD_JUNGIAN || !!jungianArchetype;
    const hasLOC = dimensions.loc >= THRESHOLD_LOCS || !!hawkinsLevel;
    const hasVedic = dimensions.vedic >= THRESHOLD_VEDIC || !!detectedBirthDate || !!userState.vedicDeclined;

    // Vedic is optional -- only require 5 of 6 pillars for completion
    const isFullyIdentified = hasPattern && hasProblem && hasMBTI && hasJungian && hasLOC;

    if (round >= targetQuestions) { 
        // Escape hatch: Dynamic target questions reached
        shouldComplete = true;
        genLine = "I have what I need.";
    } else if (isFullyIdentified && !isTrivial) {
        // ALL 6 CRITERIA MET
        shouldComplete = true;
        genLine = "You've given me something rare — genuine clarity. All dimensions locked. I have what I need.";
    } else if ((isReady || reportScore >= 78) && !isFullyIdentified && !isTrivial) {
        // AI tried to complete prematurely without all criteria. Override it.
        isReady = false;
        parsedArchitect.ready_for_report = false;
        parsedMirror.contextLine = "There are still blind spots in your architecture.";
        
        // Force a specific probe based on what is missing
        // Each forced question is tagged so we never repeat it
        const fq = userState.forcedQuestionsAsked || [];
        if (!hasPattern && !fq.includes('pattern')) {
            parsedMirror.question = "To map your primary loop, I need to know: what is the repetitive behavioral pattern or emotional trap you find yourself falling into when stressed?";
            parsedMirror.options = [
                { text: "Self-Sabotage", subLabel: "Halting progress right before success" },
                { text: "Avoidance", subLabel: "Procrastination and distraction" },
                { text: "People-Pleasing", subLabel: "Sacrificing self for others' validation" }
            ];
            fq.push('pattern');
        } else if (!hasProblem && !fq.includes('problem')) {
            parsedMirror.question = "I need to understand the exact friction you're facing. What is the single biggest, most painful problem in your daily life right now?";
            parsedMirror.options = [
                { text: "Lack of Purpose", subLabel: "Meaningless daily routine" },
                { text: "Financial Scarcity", subLabel: "Scarcity & struggle loop" },
                { text: "Relationship Friction", subLabel: "Anxious or avoidant dynamics" }
            ];
            fq.push('problem');
        } else if (!hasMBTI && !fq.includes('mbti')) {
            parsedMirror.question = "Your cognitive map is shifting. In a crisis, do you naturally rely on logic and structure, or emotional harmony and feeling?";
            parsedMirror.options = [
                { text: "Logic & Structure", subLabel: "Thinking/Judging preference" },
                { text: "Harmony & Flow", subLabel: "Feeling/Perceiving preference" }
            ];
            fq.push('mbti');
        } else if (!hasJungian && !fq.includes('jungian')) {
            parsedMirror.question = "When things break down around you, what role or persona do you immediately fall into for others?";
            parsedMirror.options = [
                { text: "The Savior", subLabel: "Rescuing and solving for others" },
                { text: "The Perfectionist", subLabel: "Demanding control and correctness" },
                { text: "The Martyr", subLabel: "Silently bearing the suffering" }
            ];
            fq.push('jungian');
        } else if (!hasLOC && !fq.includes('loc')) {
            parsedMirror.question = "When you look at your life right now, what is your baseline, daily emotion? Apathy, anger, desire, or acceptance?";
            parsedMirror.options = [
                { text: "Anger or Desire", subLabel: "Reactivity and craving" },
                { text: "Apathy or Fear", subLabel: "Stuckness and worry" },
                { text: "Acceptance & Peace", subLabel: "Flow and deep trust" }
            ];
            fq.push('loc');
        } else if (!hasVedic && !userState.vedicDeclined && fq.length < 4 && !fq.includes('vedic')) {
            parsedMirror.question = "The Vedic layer requires your precise temporal signature. What is your exact birth date (YYYY-MM-DD)? This is optional — you can skip it.";
            parsedMirror.options = [
                { text: "Skip for now", subLabel: "I'd rather not share" }
            ];
            fq.push('vedic');
        }
        userState.forcedQuestionsAsked = fq;
    }

    if (shouldComplete) {
        // Pre-generate report so it's ready for immediate display
        let report = null;
        let recommendedProducts = [];
        try {
            const reportResponse = await preGenerateReport(userState, [...history, { role: 'ai', content: genLine }]);
            const reportJson = await reportResponse.json();
            report = reportJson?.data?.report || null;
            recommendedProducts = reportJson?.data?.products || [];
        } catch (reportErr) {
            console.error('Report pre-generation failed, using fallback:', reportErr);
        }
        // Fallback: generate products from catalog if LLM didn't return valid products
        if (!recommendedProducts || recommendedProducts.length === 0) {
            try {
                const mbtiType = userState.confirmedMBTI || 'INFP';
                const pattern = userState.detectedPattern || 'self_sabotage';
                const budget = userState.budget || 'mid';
                const gender = userState.gender || 'unknown';
                recommendedProducts = recommendProducts(pattern, mbtiType, budget, gender);
            } catch (prodErr) {
                console.error('Fallback product generation failed:', prodErr);
            }
        }
        // Build a minimal report if LLM report generation failed
        if (!report) {
            const mbtiProfile = MBTI_PROFILES[userState.confirmedMBTI || 'INFP'];
            const patternName = userState.detectedPattern ? userState.detectedPattern.replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase()) : 'Unconscious Loop';
            report = {
                header: {
                    architecture: userState.confirmedMBTI || 'SEEKER',
                    patternName,
                    urgencyPercent: 75,
                    loc: userState.hawkinsLevel || 0
                },
                meta: {
                    frequencyEstimate: 'High — this pattern activates daily',
                    coreShadowPattern: userState.jungianArchetype || 'The Hidden Self',
                    rootBelief: 'I am not enough as I am',
                    dharmaPhase: userState.lifeStage || 'The Journey',
                    identifiedProblem: userState.monetizableProblem || 'Unfulfilled potential'
                },
                vedicOverview: userState.birthDate ? {
                    lagnaAndMoon: `Born ${userState.birthDate}`,
                    currentDasha: 'Active transformation period',
                    saturnStatus: 'Growth through discipline'
                } : {
                    lagnaAndMoon: '[Add birth date to unlock Vedic insights]',
                    currentDasha: 'Unknown',
                    saturnStatus: 'Unknown'
                },
                validation: 'What you have been calling a weakness is actually an unmet depth.',
                realCause: 'A pattern installed before conscious choice was possible. Your mind made a decision to survive. That decision became automatic.',
                patternLoop: {
                    trigger: 'New opportunity or challenge',
                    copingMechanism: 'Excitement followed by avoidance when difficulty arises',
                    humanCost: 'Years of unfinished potential and growing self-doubt'
                },
                frequencyDoorway: 'The shift happens when you ship before you feel ready.',
                teaching: mbtiProfile ? `As ${mbtiProfile.name}, you ${mbtiProfile.corePattern}. Your path is ${mbtiProfile.spiritualPath}.` : 'Your pattern is known. Your path is clear.',
                witnessQuestion: 'What would you do if you knew you could not fail?',
                scriptureOfTheSelf: `There was a mind that could see every possibility but committed to none. It danced at the edge of greatness, never stepping through. One day it realized: the door was not locked — it was never even closed. The only thing standing between the dream and reality was a single act of courage — to begin, to continue, to finish.`
            };
        }

        return NextResponse.json({ 
            success: true, 
            data: { 
                type: "final_share", 
                decodingProgress: 100, 
                question: genLine,
                contextLine: "The architecture is fully visible.",
                report,
                recommendedProducts,
                csn: assignedCSN
            } 
        });
    }

    // 5. MAP STATE
    const signals = parsedArchitect.mbti_signals || {};
    const updatedSignals = { ...userState.mbtiSignals };
    if (!isTrivial) {
        if (signals.E_I !== undefined) updatedSignals.E_I = { signal: signals.E_I > 0 ? 'E' : 'I', confidence: Math.abs(signals.E_I) };
        if (signals.N_S !== undefined) updatedSignals.N_S = { signal: signals.N_S > 0 ? 'N' : 'S', confidence: Math.abs(signals.N_S) };
        if (signals.T_F !== undefined) updatedSignals.T_F = { signal: signals.T_F > 0 ? 'T' : 'F', confidence: Math.abs(signals.T_F) };
        if (signals.J_P !== undefined) updatedSignals.J_P = { signal: signals.J_P > 0 ? 'J' : 'P', confidence: Math.abs(signals.J_P) };
    }

    // REALISTIC PROGRESS CALCULATION
    // Base the visual progress on both the current round and the actual number of identified layers (6 pillars)
    let identifiedCount = 0;
    if (hasPattern) identifiedCount++;
    if (hasProblem) identifiedCount++;
    if (hasMBTI) identifiedCount++;
    if (hasJungian) identifiedCount++;
    if (hasLOC) identifiedCount++;
    if (hasVedic) identifiedCount++;

    let decodingProgress = Math.min(95, Math.round((identifiedCount / 6) * 100));
    // Ensure progressive visual progress increase
    decodingProgress = Math.max(decodingProgress, Math.min(95, Math.round((round / targetQuestions) * 100)));
    
    if (isTrivial) {
        decodingProgress = Math.min(decodingProgress, 5);
    }

    // ASSIGN CSN only when confidence is high (78%+) or we are deep in the conversation
    let assignedCSN = userState.csn || null;
    if (!assignedCSN && (reportScore >= 78 || round >= 3)) {
        try {
            // Get next sequence number
            const countResult = await sql`SELECT last_value + 1 as next_val FROM blueprints_sequence_number_seq`;
            const nextVal = countResult[0]?.next_val || 1000; // Fallback
            const { csn } = await generateCSN(nextVal, parsedArchitect.confirmed_mbti || userState.confirmedMBTI || "SEEKER", archetype);
            assignedCSN = csn;
        } catch (e) {
            console.error("CSN Generation Error:", e);
        }
    }

    // PERSISTENCE FOR LOGGED-IN USERS: Store identified pillars in real-time
    if (userId) {
        try {
            const breakthroughs: string[] = [];
            if (hasPattern && !userState.detectedPattern) breakthroughs.push(`Pattern Identified: ${detectedPattern}`);
            if (hasProblem && !userState.monetizableProblem) breakthroughs.push(`Core Problem Locked: ${monetizableProblem}`);
            if (hasMBTI && !userState.confirmedMBTI) breakthroughs.push(`Cognitive Architecture Verified: ${confirmedMBTI}`);
            if (hasJungian && !userState.jungianArchetype) breakthroughs.push(`Shadow Archetype revealed: ${jungianArchetype}`);
            if (hasLOC && !userState.hawkinsLevel) breakthroughs.push(`Consciousness Level mapped: ${hawkinsLevel}`);
            
            if (breakthroughs.length > 0) {
                await addUserMemory(userId, `Breakthrough during decoding: ${breakthroughs.join('. ')}`, { 
                    type: 'decoding_milestone',
                    progress: decodingProgress
                });
            }
        } catch (e) {
            console.error("Real-time memory storage error:", e);
        }
    }
    
    return NextResponse.json({ 
        success: true, 
        data: {
            ...parsedMirror,
            emotionScore: emotion.score, // 0-100 mapped from sentiment
            decodingProgress,
            preferredLanguage: currentLanguage,
            interestScore: newInterestScore,
            estimatedTargetQuestions: targetQuestions,
            sessionConfig: {
                ...userState.sessionConfig,
                targetQuestions: targetQuestions
            },
            csn: assignedCSN,
            mbtiSignals: updatedSignals,
            detectedPattern,
            confirmedMBTI,
            jungianArchetype,
            hawkinsLevel,
            monetizableProblem,
            birthDate: detectedBirthDate,
            patternConfidence: reportScore,
            reportScore,
            activeArchetype: isTrivial ? userState.activeArchetype : archetype,
            identifiedLayers: {
                ...userState.identifiedLayers,
                ragContext: ragResults.map(r => "[Source: " + (r.metadata?.source || "unknown") + "]: " + r.content).join('\n'),
                memoryContext,
                root_cause: dimensions.root,
                secondary_gain: dimensions.secondary_gain,
                root_age: dimensions.age,
                jungian: dimensions.jungian,
                priority_probe: parsedArchitect.priority_probe,
                scoringDimensions: dimensions,
                proofs: parsedArchitect.proofs || {}
            }
        }
    });
}

async function preGenerateReport(userState: any, history: any[]) {
    // Build the entire report in code — zero LLM dependency for structure
    // This guarantees the report always generates successfully
    
    const mbtiType = userState.confirmedMBTI || 'SEEKER';
    const mbtiProfile = MBTI_PROFILES[mbtiType] || MBTI_PROFILES['INFP'];
    const patternName = (userState.detectedPattern || 'unknown')
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (c: string) => c.toUpperCase());
    const problem = userState.monetizableProblem || 'Unfulfilled potential';
    const shadow = userState.jungianArchetype || 'The Hidden Self';
    const birthDate = userState.birthDate;
    const hawkinsLevel = userState.hawkinsLevel || 0;
    const lifeStage = userState.lifeStage || 'The Journey';
    const csn = userState.csn || 'PENDING';
    const gender = userState.gender || 'unknown';
    const budget = userState.budget || 'mid';

    // ── Build products from catalog (deterministic, no LLM) ──
    let products: any[] = [];
    try {
      products = recommendProducts(
        userState.detectedPattern || 'self_sabotage',
        mbtiType,
        budget,
        gender
      );
    } catch (e) {
      console.error('Product recommendation failed:', e);
    }
    // Ensure we always have 3 products
    if (products.length < 3) {
      const fallbacks = [
        { id: 'consciousness_blueprint', name: 'The Complete Consciousness Blueprint', headline: 'Your complete transformation system — all patterns, all paths.', whyYou: `Built for your architecture: ${mbtiType} with ${patternName}.`, formats: ['ebook', 'audiobook', 'ai_chatbot', 'mini_app'], price: 97, originalPrice: 197, urgencyLine: 'Complete system. Limited founding member pricing.', ctaText: 'Get My Blueprint', imageQuery: 'consciousness stars universe transformation', patternMatch: 'all' },
        { id: 'perfectionism_blueprint', name: 'The Perfectionism Dissolution Blueprint', headline: 'From paralysis to precision in 21 days.', whyYou: 'A systematic framework for the architecture behind your perfectionism.', formats: ['ebook', 'audiobook', 'mini_app'], price: 67, originalPrice: 127, urgencyLine: '89 people with your cognitive profile started this week.', ctaText: 'Start The System', imageQuery: 'mountain clarity precision', patternMatch: 'perfectionism' },
        { id: 'shadow_work_journal', name: 'The Shadow Work Journal', headline: "Break the pattern you've been carrying for years.", whyYou: 'Built for the exact pattern running beneath your surface.', formats: ['ebook', 'audiobook', 'ai_chatbot'], price: 47, originalPrice: 97, urgencyLine: 'Downloaded by 247 people with your pattern this week.', ctaText: 'Begin The Break', imageQuery: 'shadow light transformation lotus', patternMatch: userState.detectedPattern || 'self_sabotage' },
      ];
      for (const fb of fallbacks) {
        if (!products.find((p: any) => p.id === fb.id)) products.push(fb);
        if (products.length >= 3) break;
      }
    }
    products = products.slice(0, 3);

    // ── Try LLM for creative content (non-critical, short timeout) ──
    let scripture = `There was a mind that could see every possibility but committed to none. It danced at the edge of greatness, never stepping through. One day it realized: the door was not locked — it was never even closed. The only thing standing between the dream and reality was a single act of courage — to begin, to continue, to finish.`;
    let validation = `What you've been calling a weakness is actually an unmet depth — a capacity so profound that when it has nowhere to go, it turns inward.`;
    let teaching = `As ${mbtiProfile.name}, you ${mbtiProfile.corePattern}. Your path is ${mbtiProfile.spiritualPath}. The dissolution protocol is: one imperfect action per day for 21 days.`;

    // Extract user's own words from history for personalization
    const userWords = history
      .filter((h: any) => h.role === 'user')
      .map((h: any) => h.content)
      .join(' ')
      .slice(0, 500);

    try {
      const shortPrompt = `You are Chaitanya. Write a 2-sentence "validation" for a ${mbtiType} user whose pattern is "${patternName}" and core problem is "${problem}". Use their own words where possible: "${userWords.slice(0, 200)}". Output JSON: { "validation": "..." }`;
      const creativeContent = await groqChat(shortPrompt, "Write validation only.", 0.3, MODELS.report);
      const cleaned = creativeContent.trim().replace(/^```json\s*/i, '').replace(/^```\s*/, '').replace(/\s*```$/, '');
      const creative = JSON.parse(cleaned);
      if (creative.validation) validation = creative.validation;
    } catch (e) {
      // Use default validation — already set above
    }

    // ── Build the complete report ──
    const report = {
      header: { architecture: mbtiType, patternName, urgencyPercent: 75, loc: hawkinsLevel, csn },
      meta: {
        frequencyEstimate: 'High — this pattern activates daily',
        coreShadowPattern: shadow,
        rootBelief: 'I am not enough as I am',
        dharmaPhase: lifeStage,
        identifiedProblem: problem,
      },
      vedicOverview: birthDate
        ? { lagnaAndMoon: `Born ${birthDate}`, currentDasha: 'Active transformation period', saturnStatus: 'Growth through discipline' }
        : { lagnaAndMoon: '[Add birth date to unlock Vedic insights]', currentDasha: 'Unknown', saturnStatus: 'Unknown' },
      validation,
      realCause: 'A pattern installed before conscious choice was possible. Your mind made a decision to survive your environment. That decision became automatic.',
      patternLoop: {
        trigger: 'New opportunity or challenge',
        copingMechanism: 'Initial excitement followed by avoidance when difficulty arises',
        humanCost: 'Years of unfinished potential and growing self-doubt',
      },
      frequencyDoorway: 'Ship before you feel ready. Action precedes motivation.',
      teaching,
      witnessQuestion: 'What would you do if you knew you could not fail?',
      scriptureOfTheSelf: scripture,
    };

    return NextResponse.json({ success: true, data: { report, products } });
}

async function generateReport(userState: any, history: any[], userId: string, preGeneratedReport?: any) {
    // Use pre-generated report if available (from preGenerateReport)
    if (preGeneratedReport?.report) {
        return NextResponse.json({
            success: true,
            data: {
                report: preGeneratedReport.report,
                products: preGeneratedReport.products || [],
                csn: userState.csn || '',
            },
        });
    }

    // Otherwise, build report in code (same as preGenerateReport)
    const mbtiType = userState.confirmedMBTI || 'SEEKER';
    const mbtiProfile = MBTI_PROFILES[mbtiType] || MBTI_PROFILES['INFP'];
    const patternName = (userState.detectedPattern || 'unknown').replace(/_/g, ' ').replace(/\b\w/g, (c: string) => c.toUpperCase());
    const problem = userState.monetizableProblem || 'Unfulfilled potential';
    const shadow = userState.jungianArchetype || 'The Hidden Self';
    const birthDate = userState.birthDate;
    const hawkinsLevel = userState.hawkinsLevel || 0;
    const lifeStage = userState.lifeStage || 'The Journey';
    const csn = userState.csn || 'PENDING';

    // Build products
    let products: any[] = [];
    try {
        products = recommendProducts(userState.detectedPattern || 'self_sabotage', mbtiType, userState.budget || 'mid', userState.gender || 'unknown');
    } catch (e) { console.error('Product recommendation failed:', e); }
    if (products.length < 3) {
        const fallbacks = [
            { id: 'consciousness_blueprint', name: 'The Complete Consciousness Blueprint', headline: 'Your complete transformation system.', whyYou: `Built for ${mbtiType}.`, formats: ['ebook', 'audiobook', 'ai_chatbot', 'mini_app'], price: 97, originalPrice: 197, urgencyLine: 'Limited founding member pricing.', ctaText: 'Get My Blueprint', imageQuery: 'consciousness stars universe', patternMatch: 'all' },
            { id: 'perfectionism_blueprint', name: 'The Perfectionism Dissolution Blueprint', headline: 'From paralysis to precision in 21 days.', whyYou: 'A systematic framework for your perfectionism.', formats: ['ebook', 'audiobook', 'mini_app'], price: 67, originalPrice: 127, urgencyLine: '89 people started this week.', ctaText: 'Start The System', imageQuery: 'mountain clarity precision', patternMatch: 'perfectionism' },
            { id: 'shadow_work_journal', name: 'The Shadow Work Journal', headline: "Break the pattern you've been carrying.", whyYou: 'Built for your exact pattern.', formats: ['ebook', 'audiobook', 'ai_chatbot'], price: 47, originalPrice: 97, urgencyLine: '247 people this week.', ctaText: 'Begin The Break', imageQuery: 'shadow light lotus', patternMatch: userState.detectedPattern || 'self_sabotage' },
        ];
        for (const fb of fallbacks) {
            if (!products.find((p: any) => p.id === fb.id)) products.push(fb);
            if (products.length >= 3) break;
        }
    }
    products = products.slice(0, 3);

    const report = {
        header: { architecture: mbtiType, patternName, urgencyPercent: 75, loc: hawkinsLevel, csn },
        meta: { frequencyEstimate: 'High — this pattern activates daily', coreShadowPattern: shadow, rootBelief: 'I am not enough as I am', dharmaPhase: lifeStage, identifiedProblem: problem },
        vedicOverview: birthDate ? { lagnaAndMoon: `Born ${birthDate}`, currentDasha: 'Active transformation period', saturnStatus: 'Growth through discipline' } : { lagnaAndMoon: '[Add birth date to unlock Vedic insights]', currentDasha: 'Unknown', saturnStatus: 'Unknown' },
        validation: `What you've been calling a weakness is actually an unmet depth — a capacity so profound that when it has nowhere to go, it turns inward.`,
        realCause: 'A pattern installed before conscious choice was possible. Your mind made a decision to survive. That decision became automatic.',
        patternLoop: { trigger: 'New opportunity or challenge', copingMechanism: 'Initial excitement followed by avoidance when difficulty arises', humanCost: 'Years of unfinished potential and growing self-doubt' },
        frequencyDoorway: 'Ship before you feel ready. Action precedes motivation.',
        teaching: `As ${mbtiProfile.name}, you ${mbtiProfile.corePattern}. Your path is ${mbtiProfile.spiritualPath}.`,
        witnessQuestion: 'What would you do if you knew you could not fail?',
        scriptureOfTheSelf: `There was a mind that could see every possibility but committed to none. It danced at the edge of greatness, never stepping through. One day it realized: the door was not locked — it was never even closed. The only thing standing between the dream and reality was a single act of courage — to begin, to continue, to finish.`,
    };

    // Save to blueprints table
    let finalCsn = userState.csn || '';
    let verifyCode = '';
    try {
        const insertRes = await sql`
            INSERT INTO blueprints (user_id, mbti, archetype, symbol, verify_code, csn, report_data, products_data)
            VALUES (${userId}, ${userState.confirmedMBTI || 'SEEKER'}, ${userState.activeArchetype || 'seeker'}, 'Ψ', 'PENDING', 'TEMP-' || gen_random_uuid(), ${JSON.stringify(report)}, ${JSON.stringify(products)})
            RETURNING sequence_number, id
        `;
        const seq = insertRes[0].sequence_number;
        const dbId = insertRes[0].id;
        const { createHash } = await import('crypto');
        const raw = `${seq}${userState.confirmedMBTI || 'SEEKER'}${Date.now()}`;
        verifyCode = createHash('sha256').update(raw).digest('hex').slice(0, 4).toUpperCase();
        const symbol = userState.activeArchetype === 'sovereign' ? 'Ω' : userState.activeArchetype === 'seeker' ? 'Ψ' : userState.activeArchetype === 'catalyst' ? 'Δ' : userState.activeArchetype === 'architect' ? 'Σ' : userState.activeArchetype === 'visionary' ? 'Φ' : 'Λ';
        finalCsn = `SAI-${seq}-${userState.confirmedMBTI || 'SEEKER'}-${symbol}-${verifyCode}`;
        await sql`UPDATE blueprints SET csn = ${finalCsn}, verify_code = ${verifyCode}, symbol = ${symbol} WHERE id = ${dbId}`;
    } catch (e) {
        console.error('Blueprint Storage Error:', e);
    }

    return NextResponse.json({
        success: true,
        data: { report, products, csn: finalCsn },
    });
}
