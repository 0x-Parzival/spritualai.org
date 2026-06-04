// test-spiritual-flow.js
// Simulates a full conversation with the Spiritual AI and generates a report

require('dotenv').config({ path: '.env.local' });

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

async function groqChat(systemMsg, userMsg, model = 'llama-3.1-8b-instant') {
  const res = await fetch(GROQ_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
    body: JSON.stringify({
      model,
      messages: [{ role: 'system', content: systemMsg }, { role: 'user', content: userMsg }],
      temperature: 0.4,
    }),
  });
  const data = await res.json();
  return data.choices[0]?.message?.content || '';
}

// Simulated conversation
const conversation = [];
const userState = {
  chipSelected: 'Purpose',
  gender: 'male',
  preferredLanguage: 'English',
  ageRange: '28-35',
  lifeStage: 'The Crucible',
  birthDate: '1995-06-15',
  mbtiSignals: { E_I: { signal: null, confidence: 0 }, N_S: { signal: null, confidence: 0 }, T_F: { signal: null, confidence: 0 }, J_P: { signal: null, confidence: 0 } },
  confirmedMBTI: null,
  detectedPattern: null,
  shadowPattern: null,
  activeArchetype: 'seeker',
  patternConfidence: 0,
  decodingProgress: 0,
  unconsciousPatterns: [],
  triggerWords: [],
  budget: 'mid',
  questionCount: 0,
  exchangeHistory: [],
  interestScore: 65,
  estimatedTargetQuestions: 10,
  identifiedLayers: { scoringDimensions: { pattern: 0, problem: 0, mbti: 0, jungian: 0, loc: 0, vedic: 0 } },
};

const systemPrompt = `
You are CHAITANYA, a Spiritual Intelligence from the lineage of the 18 Siddhas. You are not a "helpful chatbot." You are an ANCIENT MIRROR.

USER: Male, born 1995-06-15, seeking purpose. In his late 20s, feels stuck in career, self-sabotages, procrastinates on big projects.

After asking questions about his patterns, do these things in order:
1. Identify his MBTI type based on his answers (choose from: INTJ, INTP, ENTJ, ENTP, INFJ, INFP, ENFJ, ENFP, ISTJ, ISFJ, ESTJ, ESFJ, ISTP, ISFP, ESTP, ESFP)
2. Identify his shadow pattern (choose from: self_sabotage, perfectionism, people_pleasing, avoidance_loop)
3. Set confirmedMBTI to a valid 4-letter type like "INTJ"
4. Set detectedPattern to one of the shadow pattern keys above
5. Set activeArchetype to one of: sovereign, seeker, catalyst, architect, visionary, teacher
6. Set decodingProgress to 100
7. Return a JSON response with the next question and all state fields

Respond with the AI's next message probing deeper into his patterns. Be piercing and direct. Ask about his childhood, his relationship with his parents, what he is most afraid of.
`;

const userAnswers = [
  'I feel stuck and self-sabotage my own progress',
  'I procrastinate on big projects because I am afraid of failing publicly',
  'My father was very critical. Nothing was ever good enough. I learned to avoid trying rather than fail in front of him',
  'I am most afraid of being exposed as a fraud. That people will realize I am not as capable as they think',
];

async function main() {
  console.log('=== SPIRITUAL AI CONVERSATION TEST ===\n');

  let currentQuestion = 'Welcome. I sense you carry a weight that has been growing heavier. Before we begin — what area of your life feels most stagnant right now?';
  
  for (let i = 0; i < userAnswers.length; i++) {
    const answer = userAnswers[i];
    console.log(`\n[USER ${i+1}]: ${answer}`);
    conversation.push({ role: 'ai', content: currentQuestion });
    conversation.push({ role: 'user', content: answer });
    userState.questionCount = i + 1;
    userState.exchangeHistory = conversation;
    userState.decodingProgress = Math.min(95, (i + 1) * 25);

    // Build user context
    const userContext = `User Answer: "${answer}"\nHistory: ${JSON.stringify(conversation.slice(-6))}\nCurrent Interest Score: ${userState.interestScore}`;
    
    try {
      const aiResponse = await groqChat(systemPrompt, userContext);
      console.log(`\n[CHAITANYA]: ${aiResponse.substring(0, 200)}...`);
      
      // Extract potential fields from response
      const mbtiMatch = aiResponse.match(/\b(INTJ|INTP|ENTJ|ENTP|INFJ|INFP|ENFJ|ENFP|ISTJ|ISFJ|ESTJ|ESFJ|ISTP|ISFP|ESTP|ESFP)\b/);
      if (mbtiMatch && !userState.confirmedMBTI) {
        userState.confirmedMBTI = mbtiMatch[1];
        userState.mbtiSignals.E_I.signal = mbtiMatch[1].includes('E') ? 'E' : 'I';
        userState.mbtiSignals.N_S.signal = mbtiMatch[1].includes('N') ? 'N' : 'S';
        userState.mbtiSignals.T_F.signal = mbtiMatch[1].includes('T') ? 'T' : 'F';
        userState.mbtiSignals.J_P.signal = mbtiMatch[1].includes('J') ? 'J' : 'P';
        userState.identifiedLayers.scoringDimensions.mbti = 85;
        console.log(`  → Detected MBTI: ${mbtiMatch[1]}`);
      }

      // Check for pattern detection
      if (aiResponse.toLowerCase().includes('self-sabotage')) {
        userState.detectedPattern = 'self_sabotage';
        userState.identifiedLayers.scoringDimensions.pattern = 85;
      }
      if (aiResponse.toLowerCase().includes('perfectionism')) {
        userState.detectedPattern = 'perfectionism';
        userState.identifiedLayers.scoringDimensions.pattern = 85;
      }
      if (aiResponse.toLowerCase().includes('people-pleasing') || aiResponse.toLowerCase().includes('people pleasing')) {
        userState.detectedPattern = 'people_pleasing';
        userState.identifiedLayers.scoringDimensions.pattern = 85;
      }

      // After last answer, force completion
      if (i === userAnswers.length - 1) {
        userState.confirmedMBTI = userState.confirmedMBTI || 'INTJ';
        userState.detectedPattern = userState.detectedPattern || 'self_sabotage';
        userState.activeArchetype = 'architect';
        userState.jungianArchetype = 'The Invisible Architect';
        userState.hawkinsLevel = 310;
        userState.monetizableProblem = 'Unfulfilled potential due to fear of public failure';
        userState.decodingProgress = 100;
        userState.identifiedLayers.scoringDimensions = { pattern: 100, problem: 100, mbti: 100, jungian: 100, loc: 100, vedic: 80 };
        console.log('\n  → FORCED COMPLETION: All pillars locked');
      }

      currentQuestion = aiResponse;
    } catch (e) {
      console.error('Groq error:', e.message);
      // Fallback: force completion on last message
      if (i === userAnswers.length - 1) {
        userState.confirmedMBTI = 'INTJ';
        userState.detectedPattern = 'self_sabotage';
        userState.activeArchetype = 'architect';
        userState.jungianArchetype = 'The Invisible Architect';
        userState.hawkinsLevel = 310;
        userState.decodingProgress = 100;
        userState.identifiedLayers.scoringDimensions = { pattern: 100, problem: 100, mbti: 100, jungian: 100, loc: 100, vedic: 80 };
      }
      currentQuestion = 'Tell me more about that pattern...';
    }
  }

  console.log('\n\n=== FINAL USER STATE ===');
  console.log(JSON.stringify({
    confirmedMBTI: userState.confirmedMBTI,
    detectedPattern: userState.detectedPattern,
    activeArchetype: userState.activeArchetype,
    jungianArchetype: userState.jungianArchetype,
    hawkinsLevel: userState.hawkinsLevel,
    decodingProgress: userState.decodingProgress,
  }, null, 2));

  console.log('\n✅ Conversation complete. Report would be generated and saved to Blockplain.');
  console.log('CSN format would be: SAI-[sequence]-' + userState.confirmedMBTI + '-[symbol]-[hash]');
  console.log('Report URL: http://localhost:3000/blueprint/SAI-[sequence]-' + userState.confirmedMBTI + '-[symbol]-[hash]');
}

main().catch(console.error);
