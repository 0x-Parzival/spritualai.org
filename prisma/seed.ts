import { PrismaClient } from '@prisma/client';
import { createHash } from 'crypto';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding Blockplain data...');

  await prisma.session.deleteMany({});
  await prisma.blueprint.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.planeXCounter.deleteMany({});
  await prisma.$executeRaw`ALTER SEQUENCE "PlaneXCounter_id_seq" RESTART WITH 1`;
  await prisma.$executeRaw`ALTER SEQUENCE "Blueprint_sequenceNumber_seq" RESTART WITH 1`;

  // ── User 1: INTJ Sovereign (plane_x=1, 2 blueprints) ──
  const x1 = await prisma.planeXCounter.create({ data: {} });
  const user1 = await prisma.user.create({ data: { uid: 'browser-uid-1', email: 'user1@example.com', plane_x: x1.id } });

  const r1_1 = {
    header: { architecture: 'INTJ', patternName: 'The Sovereign In Exile', urgencyPercent: 82, loc: 180, csn: 'SAI-1001-INTJ-Ω-A1B2' },
    meta: { frequencyEstimate: 'High — activates daily around new projects', coreShadowPattern: 'The Tyrant — fears that claiming power destroys what it loves', rootBelief: 'I am not enough as I am', dharmaPhase: 'The Crucible (28-35)', identifiedProblem: 'Unfinished potential — 20+ projects started, zero shipped' },
    vedicOverview: { lagnaAndMoon: 'Born 1992-12-15', currentDasha: 'Rahu Mahadasha (2023-2041) — radical restructuring', saturnStatus: 'Saturn in 10th house demands real-world execution' },
    validation: 'You can see the perfect building in your mind — every beam, every angle. You have drawn 47 versions of the blueprint. None were perfect enough to build. The building in your mind is a prison.',
    realCause: 'A pattern installed before conscious choice was possible. Your mind made a decision to survive: if I don\'t try, I can\'t fail. That decision became automatic.',
    patternLoop: { trigger: 'New creative opportunity or ambitious project', copingMechanism: 'Intense initial excitement → over-planning → difficulty arises → loss of interest → abandonment → guilt', humanCost: '20+ unfinished projects. A growing list of abandoned dreams. The quiet desperation of potential unrealized.' },
    frequencyDoorway: 'Ship before you feel ready. Ship at 70%. Polish after delivery. The remaining 30% reveals itself only through action.',
    teaching: 'As an INTJ Sovereign, your core pattern is the Perfectionism Trap. Your spiritual path is Jnana Yoga — knowledge through direct experience, not planning. The dissolution protocol is: one imperfect deliverable per week.',
    scriptureOfTheSelf: 'There was an architect who could see the perfect building in their mind — every beam, every angle, every shadow at noon. They drew 47 versions of the blueprint. None were perfect enough to build. One day they realized: the building in their mind was a prison. The real building, the imperfect one, the one with the crooked window on the third floor — that was the one where people actually lived.',
  };

  const b1_1 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-1001-INTJ-Ω-A1B2', userId: user1.id, plane_x: user1.plane_x!, plane_y: 1,
      mbti: 'INTJ', archetype: 'sovereign', symbol: 'Ω', verifyCode: 'A1B2',
      reportData: r1_1, isComplete: true, createdAt: new Date(Date.now() - 86400000 * 7),
    },
  });

  const r1_2 = { ...r1_1, header: { ...r1_1.header, csn: 'SAI-1002-INTJ-Ω-C3D4' }, validation: 'You shipped something. It wasn\'t perfect. The world didn\'t end. Your nervous system is recalibrating. The pattern is weakening.', teaching: 'As an INTJ Sovereign (integrating), the shadow is shifting from Tyranny to Inner Authority. Your path is Jnana Yoga. Keep shipping.' };
  const h1 = createHash('sha256').update(JSON.stringify(r1_1)).digest('hex');
  await prisma.blueprint.create({
    data: {
      csn: 'SAI-1002-INTJ-Ω-C3D4', userId: user1.id, plane_x: user1.plane_x!, plane_y: 2,
      prev_block_hash: h1, mbti: 'INTJ', archetype: 'sovereign', symbol: 'Ω', verifyCode: 'C3D4',
      reportData: r1_2, isComplete: true, createdAt: new Date(Date.now() - 86400000 * 2),
    },
  });

  // ── User 2: ENFP Seeker (plane_x=2, 1 blueprint) ──
  const x2 = await prisma.planeXCounter.create({ data: {} });
  const user2 = await prisma.user.create({ data: { uid: 'browser-uid-2', email: 'user2@example.com', plane_x: x2.id } });

  const r2_1 = {
    header: { architecture: 'ENFP', patternName: 'The Untethered Visionary', urgencyPercent: 72, loc: 150, csn: 'SAI-2001-ENFP-Ψ-E5F6' },
    meta: { frequencyEstimate: 'High — activates with every new connection or idea', coreShadowPattern: 'The Martyr — if I help everyone else, maybe someone will finally see me', rootBelief: 'If I commit to one thing, I\'ll lose all the others', dharmaPhase: 'The Awakening (22-28)', identifiedProblem: 'Scattered energy — brilliant relationships half-formed, projects started with fireworks and abandoned in silence' },
    vedicOverview: { lagnaAndMoon: 'Born 1998-03-22', currentDasha: 'Jupiter Mahadasha (2021-2037) — expansion period', saturnStatus: 'Saturn in 11th house points to impact through community' },
    validation: 'You feel everything and hide it perfectly. You scatter your energy across 15 projects and call it multi-passionate. But depth is your superpower — and you\'ve been running from it.',
    realCause: 'A pattern installed before conscious choice was possible. Your mind made a decision: if I help everyone, someone will finally choose me. That decision became automatic.',
    patternLoop: { trigger: 'New connection or idea that sparks excitement', copingMechanism: 'Immediate enthusiasm → over-commitment → overwhelm → withdrawal from everything → guilt cycle', humanCost: 'Brilliant relationships half-formed. Projects started with fireworks, abandoned in silence.' },
    frequencyDoorway: 'One focus. Ninety days. No new commitments until the 90th day. Depth is your dissolution.',
    teaching: 'As an ENFP Seeker, your core pattern is Possibility Paralysis. Your spiritual path is Bhakti Yoga — devotion channeled into disciplined action. The dissolution protocol is: one project, 90 days, full commitment.',
    scriptureOfTheSelf: 'There was a river that tried to flow in every direction at once. It reached the sea nowhere. One day it chose a single channel. The water that once spread thin enough to see through now carved a canyon. The canyon became a home. Not because the river stopped being wild — but because the wildness had a direction.',
  };

  await prisma.blueprint.create({
    data: {
      csn: 'SAI-2001-ENFP-Ψ-E5F6', userId: user2.id, plane_x: user2.plane_x!, plane_y: 1,
      mbti: 'ENFP', archetype: 'seeker', symbol: 'Ψ', verifyCode: 'E5F6',
      reportData: r2_1, isComplete: true, createdAt: new Date(Date.now() - 86400000 * 3),
    },
  });

  // ── User 3: INTP Architect (plane_x=3, 3 blueprints) ──
  const x3 = await prisma.planeXCounter.create({ data: {} });
  const user3 = await prisma.user.create({ data: { uid: 'browser-uid-3', email: 'user3@example.com', plane_x: x3.id } });

  const r3_1 = {
    header: { architecture: 'INTP', patternName: 'The Invisible Architect', urgencyPercent: 78, loc: 160, csn: 'SAI-3001-INTP-Σ-G7H8' },
    meta: { frequencyEstimate: 'High — activates with every complex problem', coreShadowPattern: 'The Analyzer — once I understand it fully, I\'ll act. Understanding becomes the excuse to never begin.', rootBelief: 'One more piece of data and I\'ll be ready', dharmaPhase: 'The Reckoning (35-42)', identifiedProblem: 'Analysis paralysis — a library of perfect plans, zero executions' },
    vedicOverview: { lagnaAndMoon: 'Born 1994-09-08', currentDasha: 'Saturn Mahadasha (2024-2043) — the long reckoning', saturnStatus: 'Saturn in 6th house demands daily practice over grand strategy' },
    validation: 'You build perfect systems except for yourself. You research every angle before committing. The map is not the territory. The walking is the territory.',
    realCause: 'A pattern installed before conscious choice was possible. Your mind made a decision: if I understand it fully, I\'ll be safe. That decision became automatic.',
    patternLoop: { trigger: 'Complex problem or system to optimize', copingMechanism: 'Deep research → elegant plan → delay execution → new information makes the plan obsolete → restart the cycle', humanCost: 'A library of perfect plans. Zero executions. Growing quiet desperation.' },
    frequencyDoorway: 'Ship the plan at 60% completeness. The remaining 40% reveals itself only through action. Theory is the enemy.',
    teaching: 'As an INTP Architect, your core pattern is Existential Analysis Paralysis. Your spiritual path is Raja Yoga — mastery through disciplined practice, not understanding. The dissolution protocol is: one imperfect action per day for 21 days.',
    scriptureOfTheSelf: 'There was a cartographer who spent their life drawing maps of a land they never visited. The maps were beautiful. Perfect scale. Perfect detail. The land, when they finally arrived, looked nothing like the maps. The map was never the territory. The walking was the territory. They burned the maps and charted new ground with their feet.',
  };

  const b3_1 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-3001-INTP-Σ-G7H8', userId: user3.id, plane_x: user3.plane_x!, plane_y: 1,
      mbti: 'INTP', archetype: 'architect', symbol: 'Σ', verifyCode: 'G7H8',
      reportData: r3_1, isComplete: true, createdAt: new Date(Date.now() - 86400000 * 14),
    },
  });

  const r3_2 = { ...r3_1, header: { ...r3_1.header, csn: 'SAI-3002-INTP-Σ-I9J0' }, validation: 'You\'ve identified the analysis paralysis loop. Mercury retrograde in your 3rd house is forcing you to communicate before you\'re ready.', teaching: 'As an INTP Architect (in transition), the Analyzer shadow is losing power. You shipped something. It was imperfect and the world didn\'t end.' };
  const h3_1 = createHash('sha256').update(JSON.stringify(r3_1)).digest('hex');
  const b3_2 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-3002-INTP-Σ-I9J0', userId: user3.id, plane_x: user3.plane_x!, plane_y: 2,
      prev_block_hash: h3_1, mbti: 'INTP', archetype: 'architect', symbol: 'Σ', verifyCode: 'I9J0',
      reportData: r3_2, isComplete: true, createdAt: new Date(Date.now() - 86400000 * 5),
    },
  });

  const r3_3 = { ...r3_1, header: { ...r3_1.header, csn: 'SAI-3003-INTP-Σ-K1L2' }, validation: 'The analysis loop has been interrupted consistently for 40+ days. New neural pathway forming. You are becoming the bridge between the perfectly imagined world and the imperfectly executed one.', teaching: 'As an INTP Architect (integrated), the old pattern still activates under stress but no longer controls the outcome. Your next blueprint will be written by the person you\'re becoming.' };
  const h3_2 = createHash('sha256').update(JSON.stringify(r3_2)).digest('hex');
  await prisma.blueprint.create({
    data: {
      csn: 'SAI-3003-INTP-Σ-K1L2', userId: user3.id, plane_x: user3.plane_x!, plane_y: 3,
      prev_block_hash: h3_2, mbti: 'INTP', archetype: 'architect', symbol: 'Σ', verifyCode: 'K1L2',
      reportData: r3_3, isComplete: true, createdAt: new Date(),
    },
  });

  console.log('Seed complete: 3 users, 6 blueprints across 3 chains.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
