// generate-report.js — Uses the app's Prisma client to generate a blueprint
const path = require('path');

// Load .env.local
const fs = require('fs');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1);
      }
      process.env[key] = val;
    }
  });
}

const crypto = require('crypto');

function generateCSNData(sequenceNumber, mbti, archetype) {
  const ARCHETYPE_SYMBOLS = {
    sovereign: 'Ω', architect: 'Σ', seeker: 'Ψ', catalyst: 'Δ',
    visionary: 'Φ', teacher: 'Λ',
  };
  const symbol = ARCHETYPE_SYMBOLS[archetype.toLowerCase()] || 'Ψ';
  const raw = `${sequenceNumber}${mbti}${Date.now()}`;
  const hash = crypto.createHash('sha256').update(raw).digest('hex').slice(0, 4).toUpperCase();
  return { csn: `SAI-${sequenceNumber}-${mbti}-${symbol}-${hash}`, verifyCode: hash, symbol };
}

function generateConsciousnessIdentity(mbti, archetype, patternName) {
  const identities = {
    INTJ: ['The Shadow Architect', 'The Frozen Strategist', 'The Lone Sovereign'],
    INTP: ['The Detached Analyst', 'The Paradox Engine', 'The Distant Observer'],
    ENTJ: ['The Iron Commander', 'The Relentless Builder', 'The Wounded King'],
    ENTP: ['The Chaotic Catalyst', 'The Burning Debater', 'The Endless Spark'],
    INFJ: ['The Invisible Oracle', 'The Quiet Prophet', 'The Sacred Martyr'],
    INFP: ['The Wounded Dreamer', 'The Silent Poet', 'The Hidden Idealist'],
    ENFJ: ['The Radiant Mask', 'The Tired Healer', 'The Silent Guide'],
    ENFP: ['The Scattered Flame', 'The Wounded Optimist', 'The Endless Seeker'],
    ISTJ: ['The Silent Sentinel', 'The Quiet Guardian', 'The Hidden Traditionalist'],
    ISFJ: ['The Invisible Caregiver', 'The Quiet Protector', 'The Tired Giver'],
    ESTJ: ['The Rigid Commander', 'The Unseen Executive', 'The Burdened Leader'],
    ESFJ: ['The Wounded Host', 'The Invisible Diplomat', 'The Tired Harmonizer'],
    ISTP: ['The Detached Mechanic', 'The Quiet Operator', 'The Frozen Virtuoso'],
    ISFP: ['The Wounded Artist', 'The Silent Creator', 'The Hidden Aesthete'],
    ESTP: ['The Restless Actor', 'The Burning Catalyst', 'The Wounded Champion'],
    ESFP: ['The Fading Performer', 'The Wounded Entertainer', 'The Scattered Joy'],
  };
  const options = identities[mbti] || ['The Hidden Self'];
  const idx = (patternName.length + archetype.length) % options.length;
  return options[idx];
}

async function main() {
  try {
    // Create Prisma client directly with Neon adapter (same as app's lib/prisma.ts)
    const { PrismaClient } = require('@prisma/client');
    const { PrismaNeon } = require('@prisma/adapter-neon');
    const { neonConfig, Pool } = require('@neondatabase/serverless');
    const ws = require('ws');
    neonConfig.webSocketConstructor = ws.default || ws;
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaNeon(pool);
    const prisma = new PrismaClient({ adapter });

    console.log('🔌 Connecting to database...');

    // Test connection
    try {
      await prisma.$queryRaw`SELECT 1`;
      console.log('✓ Database connected');
    } catch (e) {
      console.log('⚠️  Database connection failed:', e.message);
      console.log('   This is expected if the database is not accessible from this environment.');
      console.log('   The report URL below shows the format that will work when the app is running.');
      printReportLink('INTP', 'architect', 'Self Sabotage', 'The Detached Analyst');
      return;
    }

    // Clean up old test data
    await prisma.blueprint.deleteMany({ where: { userId: { starts_with: 'test-' } } });
    await prisma.user.deleteMany({ where: { id: { starts_with: 'test-' } } });
    console.log('✓ Cleaned up old test data');

    // Create user with plane_x via counter
    const counter = await prisma.planeXCounter.create({ data: {} });
    const user = await prisma.user.create({
      data: {
        id: 'test-user-001',
        uid: 'test-user-001',
        email: 'test@spiritualai.store',
        plane_x: counter.id,
      }
    });
    console.log(`✓ Created user: ${user.id} (plane_x: ${counter.id})`);

    // Blueprint data
    const mbtiType = 'INTP';
    const archetype = 'architect';
    const patternName = 'Self Sabotage';
    const consciousnessIdentity = generateConsciousnessIdentity(mbtiType, archetype, patternName);
    const existingCount = await prisma.blueprint.count({ where: { userId: user.id } });
    const plane_y = existingCount + 1;
    const { csn, verifyCode, symbol } = generateCSNData(1, mbtiType, archetype);

    const report = {
      header: { architecture: mbtiType, patternName, urgencyPercent: 78, loc: 310, csn },
      consciousnessIdentity,
      mbti: { name: 'The Logician', archetype: 'The Abstract Architect', rarity: '3.3%', spiritualPath: 'Jnana Yoga' },
      meta: {
        frequencyEstimate: 'High — this pattern activates daily',
        coreShadowPattern: consciousnessIdentity,
        rootBelief: 'I am not enough as I am. I must prove my worth through achievement.',
        dharmaPhase: 'The Crucible — Purpose and Direction',
        identifiedProblem: 'Unfulfilled potential due to fear of public failure',
      },
      vedicOverview: { lagnaAndMoon: 'Born 1995-06-15 (Gemini Sun)', currentDasha: 'Active Rahu period — major transformation', saturnStatus: 'Growth through discipline and structure' },
      validation: `What you call "${patternName}" is not a flaw. It is a survival mechanism installed in childhood — when critical teaching created a core belief: "I am not enough unless I succeed perfectly." Your mind learned to protect you by avoiding the attempt.`,
      realCause: 'A pattern installed before conscious choice was possible. External criticism created a core belief of inadequacy. This belief became automatic — it now runs beneath every decision, creating procrastination as a defense mechanism.',
      patternLoop: {
        trigger: 'New opportunity or challenge that could result in visible failure',
        copingMechanism: 'Procrastination and avoidance — creating an excuse for potential failure',
        humanCost: 'Years of unfinished projects and growing gap between capabilities and output',
        reset: 'Notice the pattern. The pattern says "don\'t try." Your new response: try one imperfect action.',
      },
      cosmicConfirmation: 'Your analytical mind — the same mind that creates this pattern — is also the key to your liberation. As INTP, you have the rare capacity to observe your own patterns from the outside.',
      teaching: 'As The Logician — The Abstract Architect. Your path is Jnana Yoga. The dissolution protocol is: map the pattern intellectually first. Then, one imperfect action per day for 21 days.',
      witnessQuestion: 'If the pattern of self-sabotage were completely gone tomorrow — what would you start working on Monday morning?',
    };

    const products = [
      { id: 'consciousness_blueprint', name: 'The Complete Consciousness Blueprint', headline: 'Your complete transformation system.', whyYou: `Built for your ${mbtiType} architecture.`, formats: ['ebook', 'audiobook', 'ai_chatbot', 'mini_app'], price: 97, originalPrice: 197, urgencyLine: 'Complete system. Limited founding member pricing.', ctaText: 'Get My Blueprint' },
      { id: 'perfectionism_blueprint', name: 'The Perfectionism Dissolution Blueprint', headline: 'From paralysis to precision in 21 days.', whyYou: `Designed for the "${patternName}" pattern.`, formats: ['ebook', 'audiobook', 'mini_app'], price: 67, originalPrice: 127, urgencyLine: '89 people with your cognitive profile started this week.', ctaText: 'Start The System' },
      { id: 'shadow_work_journal', name: 'The Shadow Work Journal', headline: "Break the pattern you've been carrying for years.", whyYou: 'Built for the exact pattern beneath your surface.', formats: ['ebook', 'audiobook', 'ai_chatbot'], price: 47, originalPrice: 97, urgencyLine: '247 people with your pattern this week.', ctaText: 'Begin The Break' },
    ];

    const blueprint = await prisma.blueprint.create({
      data: {
        csn, userId: user.id, plane_x: user.plane_x, plane_y, symbol,
        mbti: mbtiType, archetype, verifyCode,
        reportData: { report, products },
        isComplete: true,
      }
    });

    printReportLink(csn, mbtiType, archetype, consciousnessIdentity, user.plane_x, plane_y, verifyCode);

  } catch (err) {
    console.error('\n❌ Error:', err.message);
    if (err.message.includes('connect') || err.message.includes('ECONNREFUSED') || err.message.includes('database')) {
      console.log('\n⚠️  Database not accessible. Showing example report URL format:');
      printReportLink('SAI-1-INTP-Ψ-A3F2', 'INTP', 'architect', 'The Detached Analyst', 1, 1, 'A3F2');
    }
  } finally {
    try { const { prisma } = require('./src/lib/prisma'); await prisma.$disconnect(); } catch(e) {}
  }
}

function printReportLink(csn, mbti, archetype, identity, planeX, planeY, verifyCode) {
  console.log('\n' + '='.repeat(60));
  console.log('✅ CONSCIOUSNESS BLUEPRINT GENERATED');
  console.log('='.repeat(60));
  console.log(`\n   Identity:    ${identity}`);
  console.log(`   CSN:         ${csn}`);
  console.log(`   MBTI:        ${mbti}`);
  console.log(`   Archetype:   ${archetype}`);
  console.log(`   Verify Code: ${verifyCode}`);
  if (planeX) console.log(`   Plane:       ${planeX}.${planeY}`);
  console.log('\n' + '='.repeat(60));
  console.log('📋 REPORT LINK:');
  console.log(`\n   🔗 http://localhost:3000/blueprint/${csn}`);
  console.log('\n' + '='.repeat(60));
  console.log('\n   Open this URL in your browser to view the full report.');
  console.log('   The report includes:');
  console.log('   • Consciousness Identity + CSN');
  console.log('   • The Mirror (psychological reflection)');
  console.log('   • Pattern Loop (Trigger → Mechanism → Cost → Reset)');
  console.log('   • Vedic Alignment');
  console.log('   • 21-Day Dissolution Protocol');
  console.log('   • Product recommendations (3 layers)');
  console.log('   • Social sharing buttons\n');
}

main();
