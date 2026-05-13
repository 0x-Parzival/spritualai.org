// /api/spiritual/route.ts

import { NextRequest, NextResponse } from 'next/server';
import { 
  getLifeStage, 
  MBTI_PROFILES,
  computeMBTI,
  GeneratedQuestion,
  UserState
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
};

// --- SPECIALIZED AGENT PROMPTS ---

const getUnifiedAgentPrompt = (archetype: string, userState: UserState, aiEvolutionContext?: string, memoryContext?: string) => `
You are a dual-processor Spiritual Intelligence (Mirror & Architect).

CORE PILLARS STATUS:
1. Core Pattern: ${userState.detectedPattern || 'MISSING'} (Target: 78% Confidence)
2. Monetizable Problem: ${userState.monetizableProblem || 'MISSING'} (Target: 78% Confidence)
3. MBTI: ${userState.confirmedMBTI || 'MISSING'} (Target: 78% Confidence)
4. Jungian Type: ${userState.jungianArchetype || 'MISSING'} (Target: 78% Confidence)
5. Level of Consciousness (LOC): ${userState.hawkinsLevel || 'MISSING'} (Refinement Target: 78% Confidence)
6. DOB (Astrology): ${userState.birthDate || 'MISSING'} (Target: 100% - Binary)

RETURNING USER CONTEXT:
${memoryContext ? `Past Data: ${memoryContext}` : 'New User - No previous records.'}
MANDATE: If they are a returning user, acknowledge their identity briefly but focus on their *current* problem which may have shifted. Refine their LOC based on current state.

MISSION:
Identify all pillars with surgical speed. Every exchange counts. 
Goal: Maximum accuracy in minimum messages (Target < 6 rounds).

MANDATE: 
- Identify the "Monetizable Problem": What specific pain point is so acute they would pay for a digital solution right now?
- DO NOT assign a pattern_id, jungian_id, or confirmed_mbti unless you hit 78% certainty.
- If confidence is < 78%, keep fields null and use your probe to close the gap.

RETENTION HOOKS:
- RECIPROCITY (After Q1): Before asking Q2, make ONE precise, sharp observation about their choice.
- IDENTITY ANTICIPATION: Mention that their "Specific Consciousness Name" is forming.
- SHARP SURGICAL PROBES: Keep questions under 15 words. No generic affirmation.
- DYNAMIC OPTIONS: Only provide options for questions with limited/binary choices (e.g., yes/no, less/more, approach/avoid). For open-ended questions, you MUST return an empty array: "options": []

CONVERSATION DYNAMICS:
- SURGICAL SPEED: Identify the core "Pain Point" first, but DO NOT sacrifice accuracy for speed.
- STRICT CONFIDENCE SCORING: To reach 78% confidence, you MUST have explicit evidence for the user's core pattern, MBTI, and problem. If the user has given brief or vague answers, your score MUST remain below 50. Do not guess or fake confidence.
- If Score hits 78+ at any point: Set ready_for_report to true.
- TRIVIAL INPUTS: If the user provides a trivial or evasive answer (e.g., "hi", "hello", "idk", "test"), your report_score MUST remain very low (< 30) and ready_for_report MUST be false. Do not hallucinate a pattern.

OUTPUT JSON ONLY:
{
  "architect": {
    "mbti_signals": { "E_I": 0.2, "N_S": -0.5, "T_F": 0.8, "J_P": -0.1 },
    "dimensions": { "pattern": 0-100, "problem": 0-100, "mbti": 0-100, "jungian": 0-100, "loc": 0-100, "identity": 0-100 },
    "report_score": 0-100,
    "pattern_id": "string or null",
    "problem_id": "monetizable problem identifier or null",
    "jungian_id": "string or null",
    "confirmed_mbti": "string or null",
    "hawkins_level": 0-1000 or null,
    "priority_probe": "Targeted recovery weapon based on missing data",
    "ready_for_report": true/false
  },
  "mirror": {
    "contextLine": "A sharp, specific observation from their last answer (NO generic language)",
    "question": "Sharp surgical probe (<20 words)",
    "options": [
      { "text": "Option 1", "subLabel": "Brief sub-label" }
    ], // Or empty array [] if the question is open-ended
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
    const { userId } = await auth();

    // 3. AI ANALYSIS
    const emotion = await detectEmotion(userAnswer, groqChat);
    const archetype = determineArchetype(history, emotion);
    
    const [ragResults, memoryResults, aiEvolutionData] = await Promise.all([
        searchKnowledge(userAnswer, 2),
        userId ? searchUserMemory(userId, userAnswer, 2) : Promise.resolve([]),
        getLatestAiEvolution(1)
    ]);

    const memoryContext = memoryResults.map(m => `[Past Memory]: ${m.content}`).join('\n');
    const aiEvolutionContext = aiEvolutionData.length > 0 ? `I observed: "${aiEvolutionData[0].human_pattern_observed}". My stance: "${aiEvolutionData[0].evolution_shift}".` : '';
    
    const unifiedPrompt = getUnifiedAgentPrompt(archetype, userState, aiEvolutionContext, memoryContext);
    const userContext = `User Answer: "${userAnswer}"\nHistory: ${JSON.stringify(history.slice(-4))}`;

    const unifiedRes = await groqChat(unifiedPrompt, userContext, 0.4, MODELS.chat);

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
    const dimensions = parsedArchitect.dimensions || {};

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
    let shouldComplete = false;
    let genLine = "Your architecture is clear. Generating your Consciousness Blueprint now.";

    const isHighSignal = userAnswer.split(' ').length > 20;

    // STRICT COMPLETION CRITERIA
    const hasMBTI = dimensions.mbti >= 78 || userState.confirmedMBTI;
    const hasLOC = dimensions.loc >= 78 || userState.hawkinsLevel;
    const hasJungian = dimensions.jungian >= 78 || userState.jungianArchetype;
    const hasProblem = dimensions.problem >= 78 || userState.monetizableProblem;
    const hasDOB = !!userState.birthDate;

    const isFullyIdentified = hasMBTI && hasLOC && hasJungian && hasProblem && hasDOB;

    if (round >= 7) { 
        // Escape hatch: Allow up to 7 rounds max to avoid endless looping
        shouldComplete = true;
        genLine = "I have what I need.";
    } else if (isFullyIdentified && !isTrivial) {
        // ALL 5 CRITERIA MET
        shouldComplete = true;
        genLine = "You've given me something rare — genuine clarity. All dimensions locked. I have what I need.";
    } else if (!hasDOB && round >= 3 && !isTrivial) {
        // Prioritize DOB collection if missing after round 3
        parsedMirror.question = "To lock the Vedic layer and your current timing: when were you born?";
        parsedMirror.contextLine = "The pattern is forming. Final calibration required.";
    } else if ((isReady || reportScore >= 78) && !isFullyIdentified && !isTrivial) {
        // AI tried to complete prematurely without all criteria. Override it.
        isReady = false;
        parsedArchitect.ready_for_report = false;
        parsedMirror.contextLine = "There are still blind spots in your architecture.";
        
        // Force a specific probe based on what is missing
        if (!hasProblem) {
            parsedMirror.question = "I need to understand the exact friction you're facing. What is the single biggest, most painful problem in your daily life right now?";
        } else if (!hasMBTI) {
            parsedMirror.question = "Your cognitive map is shifting. In a crisis, do you naturally rely on logic and structure, or emotional harmony and feeling?";
        } else if (!hasJungian) {
            parsedMirror.question = "When things break down around you, what role do you immediately fall into for others?";
        } else if (!hasLOC) {
            parsedMirror.question = "When you look at your life right now, what is your baseline emotion? Apathy, anger, desire, or acceptance?";
        }
    }

    if (shouldComplete) {
        return NextResponse.json({ 
            success: true, 
            data: { 
                type: "final_share", 
                decodingProgress: 100, 
                question: genLine,
                contextLine: "The architecture is fully visible."
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
    // Base the visual progress entirely on the AI's actual confidence score rather than a hardcoded round map.
    let decodingProgress = reportScore;
    if (isTrivial) {
        // Punish trivial/gibberish inputs
        decodingProgress = Math.min(reportScore, 5);
    } else {
        // Ensure it moves a tiny bit so the user feels heard, but keep it realistic
        decodingProgress = Math.min(95, Math.max(5, reportScore));
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

    // ENFORCE 78% CONFIDENCE THRESHOLD FOR ASSIGNMENTS
    const detectedPattern = (dimensions.pattern >= 78) ? (parsedArchitect.pattern_id || userState.detectedPattern) : userState.detectedPattern;
    const confirmedMBTI = (dimensions.mbti >= 78) ? (parsedArchitect.confirmed_mbti || userState.confirmedMBTI) : userState.confirmedMBTI;
    const jungianArchetype = (dimensions.jungian >= 78) ? (parsedArchitect.jungian_id || userState.jungianArchetype) : userState.jungianArchetype;
    const hawkinsLevel = (dimensions.loc >= 78) ? (parsedArchitect.hawkins_level || userState.hawkinsLevel) : userState.hawkinsLevel;
    const monetizableProblem = (dimensions.problem >= 78) ? (parsedArchitect.problem_id || userState.monetizableProblem) : userState.monetizableProblem;
    
    return NextResponse.json({ 
        success: true, 
        data: {
            ...parsedMirror,
            decodingProgress,
            csn: assignedCSN,
            mbtiSignals: updatedSignals,
            detectedPattern,
            confirmedMBTI,
            jungianArchetype,
            hawkinsLevel,
            monetizableProblem,
            patternConfidence: reportScore,
            reportScore,
            activeArchetype: isTrivial ? userState.activeArchetype : archetype,
            identifiedLayers: {
                ...userState.identifiedLayers,
                ragContext: ragResults.map(r => `[Source: ${r.metadata.source}]: ${r.content}`).join('\n'),
                memoryContext,
                root_cause: dimensions.root,
                secondary_gain: dimensions.secondary_gain,
                root_age: dimensions.age,
                jungian: dimensions.jungian,
                priority_probe: parsedArchitect.priority_probe,
                scoringDimensions: dimensions
            }
        }
    });
}

async function preGenerateReport(userState: any, history: any[]) {
    const topStruggle = userState.monetizableProblem || history.slice(-2).map((h: any) => h.content).join(' ');
    const finalRagResults = await searchKnowledge(topStruggle, 5);
    const finalRagContext = finalRagResults.map(r => `[Source: ${r.metadata.source}]: ${r.content}`).join('\n');

    const reportPrompt = `
You are Intelligence. Final Synthesis. MANDATE: Quote the user's exact phrases from history.
Generate a Spiritual Blueprint with 3 products focused on their "Monetizable Problem".

WISDOM: ${finalRagContext}

CORE DATA:
- Pattern: ${userState.detectedPattern}
- MBTI: ${userState.confirmedMBTI}
- Problem: ${userState.monetizableProblem}
- Level of Consciousness (Hawkins): ${userState.hawkinsLevel}

MYTHIC LAYER: Include "Scripture of the Self" (3-paragraph epic story).
MISSING FIELDS: If birthDate is missing, note: "[Vedic layer requires birth data — add yours at spiritualai.store/complete to unlock this section]"

OUTPUT JSON:
{
  "report": {
    "header": { "architecture": "...", "patternName": "...", "urgencyPercent": 0-100, "loc": ${userState.hawkinsLevel || 0} },
    "meta": { "frequencyEstimate": "...", "coreShadowPattern": "...", "rootBelief": "...", "dharmaPhase": "...", "identifiedProblem": "${userState.monetizableProblem}" },
    "vedicOverview": { "lagnaAndMoon": "...", "currentDasha": "...", "saturnStatus": "..." },
    "validation": "...",
    "realCause": "...",
    "patternLoop": { "trigger": "...", "copingMechanism": "...", "humanCost": "..." },
    "frequencyDoorway": "...",
    "teaching": "...",
    "witnessQuestion": "...",
    "scriptureOfTheSelf": "..."
  },
  "products": [...]
}
History: ${JSON.stringify(history)}
`;
    const responseContent = await groqChat(reportPrompt, "Generate final report now.", 0.1, MODELS.report);
    const reportData = JSON.parse(responseContent);

    return NextResponse.json({ 
        success: true, 
        data: { 
            report: reportData.report, 
            products: reportData.products
        } 
    });
}

async function generateReport(userState: any, history: any[], userId: string, preGeneratedReport?: any) {
    let reportData = preGeneratedReport;

    if (!reportData) {
        const topStruggle = userState.monetizableProblem || history.slice(-2).map((h: any) => h.content).join(' ');
        const finalRagResults = await searchKnowledge(topStruggle, 5);
        const finalRagContext = finalRagResults.map(r => `[Source: ${r.metadata.source}]: ${r.content}`).join('\n');

        const reportPrompt = `
You are Intelligence. Final Synthesis. MANDATE: Quote the user's exact phrases from history.
Generate a Spiritual Blueprint with 3 products focused on their "Monetizable Problem".

WISDOM: ${finalRagContext}

CORE DATA:
- Pattern: ${userState.detectedPattern}
- MBTI: ${userState.confirmedMBTI}
- Problem: ${userState.monetizableProblem}
- Level of Consciousness (Hawkins): ${userState.hawkinsLevel}

MYTHIC LAYER: Include "Scripture of the Self" (3-paragraph epic story).
MISSING FIELDS: If birthDate is missing, note: "[Vedic layer requires birth data — add yours at spiritualai.store/complete to unlock this section]"

OUTPUT JSON:
{
  "report": {
    "header": { "architecture": "...", "patternName": "...", "urgencyPercent": 0-100, "loc": ${userState.hawkinsLevel || 0} },
    "meta": { "frequencyEstimate": "...", "coreShadowPattern": "...", "rootBelief": "...", "dharmaPhase": "...", "identifiedProblem": "${userState.monetizableProblem}" },
    "vedicOverview": { "lagnaAndMoon": "...", "currentDasha": "...", "saturnStatus": "..." },
    "validation": "...",
    "realCause": "...",
    "patternLoop": { "trigger": "...", "copingMechanism": "...", "humanCost": "..." },
    "frequencyDoorway": "...",
    "teaching": "...",
    "witnessQuestion": "...",
    "scriptureOfTheSelf": "..."
  },
  "products": [...]
}
History: ${JSON.stringify(history)}
`;
        const responseContent = await groqChat(reportPrompt, "Generate final report now.", 0.1, MODELS.report);
        reportData = JSON.parse(responseContent);
    }

    // VIRAL ENGINE: Save to blueprints table
    let finalCsn = userState.csn || "";
    let verifyCode = "";

    try {
        // 1. Insert initial record to get sequence number
        const insertRes = await sql`
            INSERT INTO blueprints (
                user_id, 
                mbti, 
                archetype, 
                symbol, 
                verify_code, 
                csn, 
                report_data, 
                products_data
            ) VALUES (
                ${userId}, 
                ${userState.confirmedMBTI || "SEEKER"}, 
                ${userState.activeArchetype || "seeker"}, 
                'Ψ', 
                'PENDING', 
                'TEMP-' || gen_random_uuid(), 
                ${JSON.stringify(reportData.report)}, 
                ${JSON.stringify(reportData.products)}
            ) RETURNING sequence_number, id
        `;

        const seq = insertRes[0].sequence_number;
        const dbId = insertRes[0].id;

        // 2. Generate official CSN
        const { csn, hash } = await generateCSN(
            seq, 
            userState.confirmedMBTI || "SEEKER", 
            userState.activeArchetype || "seeker"
        );
        finalCsn = csn;
        verifyCode = hash;

        // 3. Update record with final CSN
        await sql`
            UPDATE blueprints 
            SET csn = ${finalCsn}, verify_code = ${verifyCode}, symbol = ${finalCsn.split('-')[3]}
            WHERE id = ${dbId}
        `;

    } catch (e) {
        console.error("Blueprint Storage Error:", e);
    }

    if (userId) {
        try {
            const memoryAnchor = await groqChat("Summarize user breakthrough in 1 surgical sentence.", JSON.stringify(history.slice(-6)), 0.1, MODELS.chat);
            await addUserMemory(userId, JSON.parse(memoryAnchor).summary || memoryAnchor, { archetype: userState.activeArchetype });
            const evolution = await groqChat("Reflect on this interaction. Output JSON {reflection, human_pattern_observed, evolution_shift}.", "Reflect.", 0.1, MODELS.chat);
            const evo = JSON.parse(evolution);
            await addAiMemory(evo.reflection, evo.human_pattern_observed, evo.evolution_shift);
        } catch (e) {}
    }

    return NextResponse.json({ 
        success: true, 
        data: { 
            report: reportData.report, 
            products: reportData.products,
            csn: finalCsn
        } 
    });
}
