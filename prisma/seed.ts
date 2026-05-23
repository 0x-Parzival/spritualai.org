import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Blockplain data...');

  // 1. Clear existing data (order matters for FK constraints)
  await prisma.session.deleteMany({});
  await prisma.blueprint.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.planeXCounter.deleteMany({});

  // Reset sequences
  await prisma.$executeRaw`ALTER SEQUENCE "PlaneXCounter_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Blueprint_sequenceNumber_seq" RESTART WITH 1`;

  // ── User 1: INTJ Sovereign (plane_x=1, 2 blueprints) ──
  const x1 = await prisma.planeXCounter.create({ data: {} });
  const user1 = await prisma.user.create({
    data: {
      uid: 'browser-uid-1',
      email: 'user1@example.com',
      plane_x: x1.id,
    },
  });

  const r1_1 = {
    mbti_analysis: 'INTJ — The Architect. Strategic, independent, future-oriented. Sees systems where others see chaos. Your dominant Ni function creates relentless pattern recognition, but theinferior Se means the physical world often feels like an afterthought.',
    vedic_summary: 'Capricorn Sun, Aquarius Moon. Saturn-ruled — discipline is your native language. Current Dasha: Rahu Mahadasha (2023-2041) — the period of radical restructuring. Pluto transiting Aquarius is dismantling old authority structures in your 10th house of career.',
    jungian_archetype: 'The Sovereign — one who knows their worth but waits for external permission that never comes. The shadow is Tyranny: the fear that if you fully claim your power, you\'ll destroy what you love.',
    shadow_pattern: 'Perfectionism masquerading as standards. You reject 90% of your own ideas before anyone else can see them. The shadow believes: "If I don\'t try, I can\'t fail."',
    dharma_direction: 'Saturn in the 10th house demands you build something real. Not another plan. Not another strategy. A thing that exists in the world. Your dharma is execution, not ideation.',
    consciousness_score: 85,
    patternLoop: {
      trigger: 'New project or creative opportunity',
      copingMechanism: 'Intense initial excitement → over-planning → difficulty arises → loss of interest → abandonment → guilt',
      humanCost: '20+ unfinished projects. A growing list of abandoned dreams.',
    },
    frequencyDoorway: 'The shift happens when you ship before you feel ready. Ship at 70%. Polish after delivery.',
    witnessQuestion: 'What would you do if you knew you could not fail?',
    teaching: 'As an INTJ Sovereign, your core pattern is the Perfectionism Trap. Your spiritual path is Jnana Yoga — knowledge through direct experience. The dissolution protocol is: one imperfect deliverable per week.',
    scriptureOfTheSelf: 'There was an architect who could see the perfect building in their mind — every beam, every angle, every shadow at noon. They drew 47 versions of the blueprint. None were perfect enough to build. One day they realized: the building in their mind was a prison. The real building, the imperfect one, the one with the crooked window on the third floor — that was the one where people actually lived.',
  };

  const b1_1 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-1001-INTJ-Ω-A1B2',
      userId: user1.id,
      plane_x: user1.plane_x!,
      plane_y: 1,
      mbti: 'INTJ',
      archetype: 'sovereign',
      symbol: 'Ω',
      verifyCode: 'A1B2',
      reportData: r1_1,
      isComplete: true,
      createdAt: new Date(Date.now() - 86400000 * 7),
    },
  });

  // Blueprint 2 (update): INTJ Sovereign, deeper level
  const r1_2 = {
    ...r1_1,
    mbti_analysis: 'INTJ — Level 2. You\'ve named the pattern. Now you\'re seeing it activate in real-time. This is the hardest phase: awareness without the new neural pathway fully formed yet.',
    jungian_archetype: 'The Sovereign (integrating). The shadow is shifting from Tyranny to Inner Authority. You\'re learning that claiming your power doesn\'t destroy what you love — it protects it.',
    shadow_pattern: 'The pattern is weakening. You shipped something. It wasn\'t perfect. The world didn\'t end. Your nervous system is recalibrating.',
    consciousness_score: 95,
    dharma_direction: 'Build in public. Let your work be seen before it\'s ready. Saturn rewards courage, not caution.',
  };
  const h1 = createHash('sha256').update(JSON.stringify(r1_1)).digest('hex');
  await prisma.blueprint.create({
    data: {
      csn: 'SAI-1002-INTJ-Ω-C3D4',
      userId: user1.id,
      plane_x: user1.plane_x!,
      plane_y: 2,
      prev_block_hash: h1,
      mbti: 'INTJ',
      archetype: 'sovereign',
      symbol: 'Ω',
      verifyCode: 'C3D4',
      reportData: r1_2,
      isComplete: true,
      createdAt: new Date(Date.now() - 86400000 * 2),
    },
  });

  // ── User 2: ENFP Seeker (plane_x=2, 1 blueprint) ──
  const x2 = await prisma.planeXCounter.create({ data: {} });
  const user2 = await prisma.user.create({
    data: {
      uid: 'browser-uid-2',
      email: 'user2@example.com',
      plane_x: x2.id,
    },
  });

  const r2_1 = {
    mbti_analysis: 'ENFP — The Catalyst. Enthusiastic, imaginative, people-centered. Your dominant Ne explodes with possibilities, but the inferior Si means practical follow-through feels like wading through mud. You don\'t lack discipline — you lack a system that matches your cognitive architecture.',
    vedic_summary: 'Pisces Sun, Sagittarius Moon. Jupiter-ruled boundlessness. Current Dasha: Jupiter Mahadasha (2021-2037) — the expansion period. Venus transiting Pisces is activating your 1st house of identity.',
    jungian_archetype: 'The Seeker — one who feels everything and hides it perfectly. The shadow is the Martyr: "If I help everyone else, maybe someone will finally see me."',
    shadow_pattern: 'Scattering energy across 15 projects and calling it "multi-passionate." The shadow believes: "If I commit to one thing, I\'ll lose all the others."',
    dharma_direction: 'Jupiter in the 11th house points to impact through community, not individual achievement. Your dharma is connection, not isolation.',
    consciousness_score: 78,
    patternLoop: {
      trigger: 'New connection or idea that sparks excitement',
      copingMechanism: 'Immediate enthusiasm → over-commitment → overwhelm → withdrawal from everything → guilt cycle',
      humanCost: 'Brilliant relationships half-formed. Projects started with fireworks, abandoned in silence.',
    },
    frequencyDoorway: 'One focus. Ninety days. No new commitments until the 90th day. Depth is your dissolution.',
    witnessQuestion: 'If you could only do one thing for the rest of your life, what would it be? You just answered your dharma.',
    teaching: 'As an ENFP Seeker, your core pattern is Possibility Paralysis. Your spiritual path is Bhakti Yoga — devotion channeled into disciplined action. The dissolution protocol is: one project, 90 days, full commitment.',
    scriptureOfTheSelf: 'There was a river that tried to flow in every direction at once. It reached the sea nowhere. One day it chose a single channel. The water that once spread thin enough to see through now carved a canyon. The canyon became a home. Not because the river stopped being wild — but because the wildness had a direction.',
  };

  await prisma.blueprint.create({
    data: {
      csn: 'SAI-2001-ENFP-Ψ-E5F6',
      userId: user2.id,
      plane_x: user2.plane_x!,
      plane_y: 1,
      mbti: 'ENFP',
      archetype: 'seeker',
      symbol: 'Ψ',
      verifyCode: 'E5F6',
      reportData: r2_1,
      isComplete: true,
      createdAt: new Date(Date.now() - 86400000 * 3),
    },
  });

  // ── User 3: INTP Architect (plane_x=3, 3 blueprints) ──
  const x3 = await prisma.planeXCounter.create({ data: {} });
  const user3 = await prisma.user.create({
    data: {
      uid: 'browser-uid-3',
      email: 'user3@example.com',
      plane_x: x3.id,
    },
  });

  const r3_1 = {
    mbti_analysis: 'INTP — The Logician. Analytical, abstract, internally relentless. Your dominant Ti builds perfect mental models, but the inferior Fe means the human world often feels like a language you studied but never spoke natively.',
    vedic_summary: 'Virgo Sun, Gemini Moon. Mercury-ruled precision. Current Dasha: Saturn Mahadasha (2024-2043) — the long reckoning. Mars transiting Gemini is activating your 3rd house of communication.',
    jungian_archetype: 'The Architect — one who builds perfect systems except for themselves. The shadow is the Analyzer: "Once I understand it fully, I\'ll act." Understanding becomes the excuse to never begin.',
    shadow_pattern: 'Analysis paralysis dressed as thoroughness. You research every angle before committing. The shadow believes: "One more piece of data and I\'ll be ready."',
    dharma_direction: 'Saturn in the 6th house demands daily practice over grand strategy. Not the perfect system — the small, consistent action.',
    consciousness_score: 82,
    patternLoop: {
      trigger: 'Complex problem or system to optimize',
      copingMechanism: 'Deep research → elegant plan → delay execution → new information makes the plan obsolete → restart the cycle',
      humanCost: 'A library of perfect plans. Zero executions. Growing quiet desperation.',
    },
    frequencyDoorway: 'Ship the plan at 60% completeness. The remaining 40% reveals itself only through action. Theory is the enemy.',
    witnessQuestion: 'What have you been researching for over a year without acting on? That\'s your answer. That\'s your prison. Leave it.',
    teaching: 'As an INTP Architect, your core pattern is Existential Analysis Paralysis. Your spiritual path is Raja Yoga — mastery through disciplined practice, not understanding. The dissolution protocol is: one imperfect action per day for 21 days.',
    scriptureOfTheSelf: 'There was a cartographer who spent their life drawing maps of a land they never visited. The maps were beautiful. Perfect scale. Perfect detail. The land, when they finally arrived, looked nothing like the maps. The map was never the territory. The walking was the territory. They burned the maps and charted new ground with their feet.',
  };

  const b3_1 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-3001-INTP-Σ-G7H8',
      userId: user3.id,
      plane_x: user3.plane_x!,
      plane_y: 1,
      mbti: 'INTP',
      archetype: 'architect',
      symbol: 'Σ',
      verifyCode: 'G7H8',
      reportData: r3_1,
      isComplete: true,
      createdAt: new Date(Date.now() - 86400000 * 14),
    },
  });

  // Blueprint 2: update
  const r3_2 = {
    ...r3_1,
    mbti_analysis: 'INTP — Integration Phase. You\'ve identified the analysis paralysis loop. Mercury retrograde in your 3rd house is forcing you to communicate before you\'re ready.',
    jungian_archetype: 'The Architect (in transition). The Analyzer shadow is losing power. You shipped something. It was imperfect and the world didn\'t end.',
    consciousness_score: 88,
    dharma_direction: 'The small daily action is working. Saturn rewards consistency. Keep going.',
  };
  const h3_1 = createHash('sha256').update(JSON.stringify(r3_1)).digest('hex');
  const b3_2 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-3002-INTP-Σ-I9J0',
      userId: user3.id,
      plane_x: user3.plane_x!,
      plane_y: 2,
      prev_block_hash: h3_1,
      mbti: 'INTP',
      archetype: 'architect',
      symbol: 'Σ',
      verifyCode: 'I9J0',
      reportData: r3_2,
      isComplete: true,
      createdAt: new Date(Date.now() - 86400000 * 5),
    },
  });

  // Blueprint 3: update
  const r3_3 = {
    ...r3_1,
    mbti_analysis: 'INTP — Mastery Emerging. The analysis loop has been interrupted consistently for 40+ days. New neural pathway forming.',
    jungian_archetype: 'The Architect (integrated). You are becoming the bridge between the perfectly imagined world and the imperfectly executed one.',
    shadow_pattern: 'The old pattern still activates under stress but no longer controls the outcome. You recognize it. You name it. You choose differently.',
    consciousness_score: 95,
    dharma_direction: 'Your next blueprint will be written by the person you\'re becoming, not the person you were.',
  };
  const h3_2 = createHash('sha256').update(JSON.stringify(r3_2)).digest('hex');
  await prisma.blueprint.create({
    data: {
      csn: 'SAI-3003-INTP-Σ-K1L2',
      userId: user3.id,
      plane_x: user3.plane_x!,
      plane_y: 3,
      prev_block_hash: h3_2,
      mbti: 'INTP',
      archetype: 'architect',
      symbol: 'Σ',
      verifyCode: 'K1L2',
      reportData: r3_3,
      isComplete: true,
      createdAt: new Date(),
    },
  });

  console.log('Seed complete: 3 users, 6 blueprints across 3 chains.');
  console.log('  User 1 (SAI-INTJ): 2 blueprints');
  console.log('  User 2 (SAI-ENFP): 1 blueprint');
  console.log('  User 3 (SAI-INTP): 3 blueprints');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
