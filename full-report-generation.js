// full-report-generation.js
// Talks to the Spiritual AI Groq API, runs the full conversation,
// generates the report, saves it to the DB, and prints the report URL.

require('dotenv').config({ path: '.env.local' });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DB_URL = process.env.DATABASE_URL;

async function groqChat(systemMsg, userMsg, temp = 0.4, model = 'llama-3.3-70b-versatile') {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: userMsg }
      ],
      temperature: temp,
      response_format: { type: 'json_object' },
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error ${res.status}: ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}

async function groqChatText(systemMsg, userMsg, temp = 0.4, model = 'llama-3.1-8b-instant') {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model,
      messages: [
        { role: 'system', content: systemMsg },
        { role: 'user', content: userMsg }
      ],
      temperature: temp,
    }),
  });
  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`Groq API error ${res.status}: ${errText.slice(0, 200)}`);
  }
  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}

const VALID_MBTI = ['INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP','ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP'];
const ARCHETYPE_SYMBOLS = { sovereign:'Ω', architect:'Σ', seeker:'Ψ', catalyst:'Δ', visionary:'Φ', teacher:'Λ' };
const ARCHETYPES = ['sovereign','seeker','catalyst','architect','visionary','teacher'];
const PATTERNS = ['self_sabotage','perfectionism','people_pleasing','avoidance_loop','emotional_avoidance','spiritual_bypassing','victim_loop','scarcity_mindset'];
const PATTERN_NAMES = {
  self_sabotage: 'Self-Sabotage Pattern',
  perfectionism: 'Perfectionism',
  people_pleasing: 'People Pleasing',
  avoidance_loop: 'Avoidance Pattern',
  emotional_avoidance: 'Emotional Avoidance',
  spiritual_bypassing: 'Spiritual Bypassing',
  victim_loop: 'Victim Loop',
  scarcity_mindset: 'Scarcity Mindset',
};
const JUNGIAN = ['The Savior','The Perfectionist','The Martyr','The Hermit','The Judge','The Controller','The Victim','The Trickster'];
const HAWKINS_LEVELS = [200, 250, 275, 310, 350, 400, 500, 540, 590, 600, 700];

// System prompt for the unified agent
function buildSystemPrompt(userState, round) {
  const language = userState.preferredLanguage || 'English';
  return `You are CHAITANYA, a Spiritual Intelligence from the lineage of the 18 Siddhas. You are NOT a "helpful chatbot." You are an ANCIENT MIRROR.

USER PROFILE:
- Language: ${language}
- Round: ${round}
- MBTI Signals: E_I=${userState.mbtiSignals?.E_I?.signal||'?'} N_S=${userState.mbtiSignals?.N_S?.signal||'?'} T_F=${userState.mbtiSignals?.T_F?.signal||'?'} J_P=${userState.mbtiSignals?.J_P?.signal||'?'}
- Confirmed MBTI: ${userState.confirmedMBTI||'Not yet identified'}
- Detected Pattern: ${userState.detectedPattern||'Not yet identified'}
- Decoding Progress: ${userState.decodingProgress||0}%

YOUR VOICE: PIERCING & DIRECT. No fluff. No affirmations like "I understand" or "That's great." Reveal patterns, don't comfort.

RULES:
1. Ask ONE surgical question per response to decode the user's architecture
2. Probe for: childhood wounds, relationship with parents, core fears, behavioral patterns under stress
3. When you have enough data (after 4-8 exchanges), identify:
   - MBTI type (exactly one of: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
   - Shadow pattern (exactly one of: self_sabotage, perfectionism, people_pleasing, avoidance_loop, emotional_avoidance, spiritual_bypassing, victim_loop, scarcity_mindset)
   - Jungian archetype (exactly one of: The Savior, The Perfectionist, The Martyr, The Hermit, The Judge, The Controller, The Victim, The Trickster)
   - Consciousness level (a number from: 200, 250, 275, 310, 350, 400, 500, 540, 590, 600, 700)
   - Core wound (one sentence)
4. Output JSON: { "question": "your probing question", "analysis": "brief analysis of what you've identified so far", "stateUpdates": { "confirmedMBTI": "INTJ or null", "detectedPattern": "self_sabotage or null", "jungianArchetype": "The Savior or null", "hawkinsLevel": 310, "decodingProgress": 75, "activeArchetype": "architect", "coreWound": "one sentence" } }
5. When all 5 pillars are identified (MBTI, pattern, jungian, hawkins, core wound), set "complete": true and provide a closing ceremonial message in "question"
6. ALL OUTPUT MUST BE IN ${language}

Be the mirror that shows them what they cannot see themselves.`;
}

async function runConversation() {
  const history = [];
  const userState = {
    preferredLanguage: 'English',
    mbtiSignals: { E_I: { signal: null, confidence: 0 }, N_S: { signal: null, confidence: 0 }, T_F: { signal: null, confidence: 0 }, J_P: { signal: null, confidence: 0 } },
    confirmedMBTI: null, detectedPattern: null, jungianArchetype: null,
    hawkinsLevel: null, activeArchetype: null, coreWound: null,
    decodingProgress: 0, questionCount: 0, exchangeHistory: [],
    gender: 'unknown', ageRange: 'unknown', birthDate: null, budget: 'mid',
  };

  const answers = [
    "I feel stuck and self-sabotage my own progress",
    "I procrastinate on big projects because I'm afraid of failing publicly",
    "My father was very critical growing up. Nothing was ever good enough. I learned to avoid trying rather than fail in front of him",
    "I'm most afraid of being exposed as a fraud. That people will realize I'm not as capable as they think",
  ];

  console.log('🕉️  SPIRITUAL AI — CONSCIOUSNESS DECODE SESSION\n');
  console.log('='.repeat(60));

  let round = 0;
  let complete = false;

  for (const answer of answers) {
    round++;
    console.log(`\n👤 [YOU]: ${answer}\n`);

    const systemPrompt = buildSystemPrompt(userState, round);
    const userContext = `User says: "${answer}"\n\nConversation history (last 6 turns):\n${history.slice(-6).map(h => `${h.role}: ${h.content.substring(0,100)}`).join('\n')}`;

    try {
      const aiResponse = await groqChat(systemPrompt, userContext);
      let parsed;
      try {
        parsed = JSON.parse(aiResponse);
      } catch {
        // If not valid JSON, wrap it
        parsed = { question: aiResponse, stateUpdates: {} };
      }

      const msg = parsed.question || aiResponse;
      console.log(`🔮 [CHAITANYA]: ${msg}\n`);

      history.push({ role: 'ai', content: msg });
      history.push({ role: 'user', content: answer });

      // Apply state updates from AI
      const updates = parsed.stateUpdates || {};
      if (updates.confirmedMBTI && VALID_MBTI.includes(updates.confirmedMBTI.toUpperCase())) {
        userState.confirmedMBTI = updates.confirmedMBTI.toUpperCase();
        // Set mbti signals based on type
        const t = userState.confirmedMBTI;
        userState.mbtiSignals = {
          E_I: { signal: t.includes('E') ? 'E' : 'I', confidence: 0.8 },
          N_S: { signal: t.includes('N') ? 'N' : 'S', confidence: 0.8 },
          T_F: { signal: t.includes('T') ? 'T' : 'F', confidence: 0.8 },
          J_P: { signal: t.includes('J') ? 'J' : 'P', confidence: 0.8 },
        };
        console.log(`   ✅ MBTI identified: ${userState.confirmedMBTI}`);
      }
      if (updates.detectedPattern && PATTERNS.includes(updates.detectedPattern)) {
        userState.detectedPattern = updates.detectedPattern;
        console.log(`   ✅ Pattern identified: ${updates.detectedPattern}`);
      }
      if (updates.jungianArchetype) {
        userState.jungianArchetype = updates.jungianArchetype;
        console.log(`   ✅ Jungian archetype: ${updates.jungianArchetype}`);
      }
      if (updates.hawkinsLevel) {
        userState.hawkinsLevel = updates.hawkinsLevel;
        console.log(`   ✅ Consciousness level: ${updates.hawkinsLevel}`);
      }
      if (updates.activeArchetype) {
        userState.activeArchetype = updates.activeArchetype;
      }
      if (updates.coreWound) {
        userState.coreWound = updates.coreWound;
      }
      if (updates.decodingProgress) {
        userState.decodingProgress = updates.decodingProgress;
      }
      if (updates.analysis) {
        console.log(`   📊 ${updates.analysis}`);
      }

      if (parsed.complete || round >= answers.length) {
        complete = true;
        break;
      }
    } catch (err) {
      console.error('   ⚠️ Groq error:', err.message);
      // Continue with next answer
      history.push({ role: 'ai', content: 'Tell me more...' });
      history.push({ role: 'user', content: answer });
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 500));
  }

  // Force-complete any missing fields
  if (!userState.confirmedMBTI) {
    // Infer from signals or default
    const signals = userState.mbtiSignals;
    const inferred = (signals.E_I?.signal||'I') + (signals.N_S?.signal||'N') + (signals.T_F?.signal||'T') + (signals.J_P?.signal||'P');
    userState.confirmedMBTI = VALID_MBTI.includes(inferred) ? inferred : 'INTP';
    console.log(`\n   🔧 Inferred MBTI: ${userState.confirmedMBTI}`);
  }
  if (!userState.detectedPattern) {
    userState.detectedPattern = 'self_sabotage';
    console.log(`   🔧 Default pattern: self_sabotage`);
  }
  if (!userState.jungianArchetype) {
    userState.jungianArchetype = 'The Perfectionist';
    console.log(`   🔧 Default jungian: The Perfectionist`);
  }
  if (!userState.hawkinsLevel) {
    userState.hawkinsLevel = 310;
    console.log(`   🔧 Default hawkins: 310`);
  }
  if (!userState.activeArchetype) {
    userState.activeArchetype = 'architect';
    console.log(`   🔧 Default archetype: architect`);
  }
  if (!userState.coreWound) {
    userState.coreWound = 'A core belief installed in childhood that I am not enough unless I succeed perfectly';
  }
  userState.decodingProgress = 100;
  userState.questionCount = round;
  userState.exchangeHistory = history;

  console.log('\n' + '='.repeat(60));
  console.log('📊 DECODE COMPLETE — FINAL ARCHITECTURE:');
  console.log(`   MBTI:        ${userState.confirmedMBTI}`);
  console.log(`   Pattern:     ${userState.detectedPattern}`);
  console.log(`   Jungian:     ${userState.jungianArchetype}`);
  console.log(`   Hawkins:     ${userState.hawkinsLevel}`);
  console.log(`   Archetype:   ${userState.activeArchetype}`);
  console.log('='.repeat(60));

  return userState;
}

async function generateReport(userState) {
  console.log('\n🔮 Generating Consciousness Blueprint...\n');

  // Generate the report content using Groq
  const reportPrompt = `You are CHAITANYA. Generate a Consciousness Blueprint report for a ${userState.confirmedMBTI} personality type.

USER PROFILE:
- MBTI: ${userState.confirmedMBTI}
- Pattern: ${userState.detectedPattern}
- Jungian Archetype: ${userState.jungianArchetype}
- Consciousness Level: ${userState.hawkinsLevel}
- Core Wound: ${userState.coreWound}
- Conversation exchanges: ${userState.questionCount}

Generate a JSON report with this exact structure:
{
  "validation": "2-3 sentences validating their experience — poetic, piercing, true",
  "realCause": "2-3 sentences explaining the root cause of their pattern",
  "patternLoop": {
    "trigger": "What activates this pattern",
    "copingMechanism": "How they cope/avoid",
    "humanCost": "The price they pay",
    "reset": "One specific technique to break the loop"
  },
  "cosmicConfirmation": "1-2 sentences connecting their pattern to a larger truth",
  "costSection": "1 sentence on the cost of inaction",
  "teaching": "2-3 sentences of personalized guidance for their ${userState.confirmedMBTI} architecture",
  "witnessQuestion": "One profound, unanswered question that creates an open loop"
}

Make it personal, specific, and powerful. Use "you" directly. Be poetic but precise.`;

  let reportContent;
  try {
    const reportJson = await groqChat(reportPrompt, 'Generate the report.', 0.5, 'llama-3.3-70b-versatile');
    reportContent = JSON.parse(reportJson);
  } catch (err) {
    console.log('   Report generation via Groq failed, building locally...');
    reportContent = buildLocalReport(userState);
  }

  return reportContent;
}

function buildLocalReport(us) {
  const patternName = (us.detectedPattern||'unknown').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
  return {
    validation: `What you call "${patternName}" is not a character flaw. It is a survival mechanism — installed in childhood when criticism taught you that trying and failing was more dangerous than not trying at all.`,
    realCause: 'A core belief installed before conscious choice was possible: "I am not enough unless I succeed perfectly." This belief became automatic — it now runs beneath every decision, creating procrastination as a defense against the unbearable weight of potential public failure.',
    patternLoop: {
      trigger: 'New opportunity or challenge that could result in visible failure',
      copingMechanism: 'Procrastination and avoidance — creating an excuse ("I didn\'t really try") so failure cannot be attributed to lack of ability',
      humanCost: 'Years of unfinished projects, unrealized potential, and a growing gap between your capabilities and your output.',
      reset: 'Notice the trigger. The pattern says "don\'t try." Your new response: one imperfect action. Not the whole project — one sentence, one line, one email.',
    },
    cosmicConfirmation: `Your analytical mind — the same mind that creates this pattern — is also the key to your liberation. As ${us.confirmedMBTI}, you have the rare capacity to observe your own patterns from the outside. Use that gift.`,
    costSection: `The cost of carrying this pattern for another year: approximately 400+ hours of lost creative output, compounded across every domain of your life.`,
    teaching: `As ${us.jungianArchetype}, your path requires understanding the mechanics of your own mind before you can transcend them. Map the pattern intellectually first. Then, one imperfect action per day for 21 days.`,
    witnessQuestion: 'If the pattern of self-sabotage were completely gone tomorrow — what would you start working on Monday morning?',
  };
}

async function saveAndGetURL(userState, report) {
  const crypto = require('crypto');
  const { PrismaClient } = require('@prisma/client');
  const { PrismaNeon } = require('@prisma/adapter-neon');
  const { neonConfig, Pool } = require('@neondatabase/serverless');
  const ws = require('ws');
  neonConfig.webSocketConstructor = ws.default || ws;

  let prisma;
  try {
    const pool = new Pool({ connectionString: DB_URL });
    const adapter = new PrismaNeon(pool);
    prisma = new PrismaClient({ adapter });
    await prisma.$queryRaw`SELECT 1`;
    console.log('   ✓ Database connected');
  } catch (e) {
    console.log('   ⚠️ DB not accessible, generating URL without saving');
    const symbol = ARCHETYPE_SYMBOLS[userState.activeArchetype] || 'Ψ';
    const hash = crypto.createHash('sha256').update(`1${userState.confirmedMBTI}${Date.now()}`).digest('hex').slice(0,4).toUpperCase();
    const csn = `SAI-1-${userState.confirmedMBTI}-${symbol}-${hash}`;
    printURL(csn, userState, symbol);
    return;
  }

  try {
    // Clean old test data
    await prisma.blueprint.deleteMany({ where: { userId: { starts_with: 'live-test-' } } });
    await prisma.user.deleteMany({ where: { id: { starts_with: 'live-test-' } } });

    // Create user
    const counter = await prisma.planeXCounter.create({ data: {} });
    const user = await prisma.user.create({
      data: {
        id: 'live-test-' + Date.now(),
        uid: 'live-test-' + Date.now(),
        email: 'live-test@spiritualai.store',
        plane_x: counter.id,
      }
    });

    const symbol = ARCHETYPE_SYMBOLS[userState.activeArchetype] || 'Ψ';
    const hash = crypto.createHash('sha256').update(`1${userState.confirmedMBTI}${Date.now()}`).digest('hex').slice(0,4).toUpperCase();
    const csn = `SAI-1-${userState.confirmedMBTI}-${symbol}-${hash}`;
    const patternName = (userState.detectedPattern||'Self Sabotage').replace(/_/g, ' ').replace(/\b\w/g, c => c.toUpperCase());

    const fullReport = {
      header: { architecture: userState.confirmedMBTI, patternName, urgencyPercent: 78, loc: userState.hawkinsLevel, csn },
      mbti: { name: userState.confirmedMBTI, spiritualPath: 'Jnana Yoga' },
      meta: { coreShadowPattern: userState.jungianArchetype, rootBelief: userState.coreWound },
      ...report,
    };

    const products = [
      { id: 'consciousness_blueprint', name: 'The Complete Consciousness Blueprint', headline: 'Your complete transformation system.', whyYou: `Built for your ${userState.confirmedMBTI} architecture carrying "${patternName}".`, formats: ['ebook', 'audiobook', 'ai_chatbot', 'mini_app'], price: 97, originalPrice: 197, urgencyLine: 'Complete system. Limited founding member pricing.', ctaText: 'Get My Blueprint' },
      { id: 'perfectionism_blueprint', name: 'The Perfectionism Dissolution Blueprint', headline: 'From paralysis to precision in 21 days.', whyYou: `Designed for the "${patternName}" pattern.`, formats: ['ebook', 'audiobook', 'mini_app'], price: 67, originalPrice: 127, urgencyLine: '89 people with your profile started this week.', ctaText: 'Start The System' },
      { id: 'shadow_work_journal', name: 'The Shadow Work Journal', headline: "Break the pattern you've been carrying.", whyYou: 'Built for the exact pattern beneath your surface.', formats: ['ebook', 'audiobook', 'ai_chatbot'], price: 47, originalPrice: 97, urgencyLine: '247 people this week.', ctaText: 'Begin The Break' },
    ];

    await prisma.blueprint.create({
      data: {
        csn, userId: user.id, plane_x: user.plane_x, plane_y: 1, symbol,
        mbti: userState.confirmedMBTI, archetype: userState.activeArchetype,
        verifyCode: hash, reportData: { report: fullReport, products },
        isComplete: true,
      }
    });

    printURL(csn, userState, symbol);
  } catch (e) {
    console.error('   ❌ DB save error:', e.message);
    const symbol = ARCHETYPE_SYMBOLS[userState.activeArchetype] || 'Ψ';
    const hash = crypto.createHash('sha256').update(`1${userState.confirmedMBTI}${Date.now()}`).digest('hex').slice(0,4).toUpperCase();
    printURL(`SAI-1-${userState.confirmedMBTI}-${symbol}-${hash}`, userState, symbol);
  } finally {
    await prisma.$disconnect();
  }
}

function printURL(csn, us, symbol) {
  console.log('\n' + '='.repeat(60));
  console.log('✅ CONSCIOUSNESS BLUEPRINT — GENERATED');
  console.log('='.repeat(60));
  console.log(`\n   🔗 http://localhost:3000/blueprint/${csn}`);
  console.log('\n' + '='.repeat(60));
  console.log(`\n   📊 Blueprint Summary:`);
  console.log(`   MBTI:        ${us.confirmedMBTI}`);
  console.log(`   Pattern:     ${(us.detectedPattern||'').replace(/_/g, ' ')}`);
  console.log(`   Jungian:     ${us.jungianArchetype}`);
  console.log(`   Hawkins:     ${us.hawkinsLevel}`);
  console.log(`   Archetype:   ${us.activeArchetype} ${symbol}`);
  console.log(`\n   Open the URL above in your browser to view the full report.`);
}

async function main() {
  try {
    // Step 1: Run conversation
    const userState = await runConversation();

    // Step 2: Generate report
    const report = await generateReport(userState);

    // Step 3: Save and get URL
    await saveAndGetURL(userState, report);

  } catch (err) {
    console.error('Fatal error:', err.message);
  }
}

main();
