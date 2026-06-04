// create-test-blueprint.js
const fs = require('fs');
const path = require('path');
const envPath = path.join(__dirname, '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      const key = match[1].trim();
      let val = match[2].trim();
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) val = val.slice(1, -1);
      if (!process.env[key]) process.env[key] = val;
    }
  });
}

async function main() {
  require('ts-node').register({ transpileOnly: true, compilerOptions: { module: 'commonjs', moduleResolution: 'node', esModuleInterop: true } });
  const { prisma } = require('./src/lib/prisma');
  console.log('✓ Prisma loaded');

  try {
    await prisma.$queryRaw`SELECT 1`;
    console.log('✓ DB connected');
  } catch(e) {
    console.error('❌ DB:', e.message);
    process.exit(1);
  }

  try { await prisma.blueprint.deleteMany({ where: { userId: { startsWith: 'demo-' } } }); } catch(e) {}
  try { await prisma.user.deleteMany({ where: { id: { startsWith: 'demo-' } } }); } catch(e) {}

  const crypto = require('crypto');
  const counter = await prisma.planeXCounter.create({ data: {} });
  const user = await prisma.user.create({
    data: { id: 'demo-user', uid: 'demo-user', email: 'demo@spiritualai.store', plane_x: counter.id }
  });

  const mbti = 'INTJ';
  const symbol = 'Σ';
  const hash = crypto.createHash('sha256').update(`1${mbti}${Date.now()}`).digest('hex').slice(0,4).toUpperCase();
  const csn = `SAI-1-${mbti}-${symbol}-${hash}`;

  const report = {
    header: { architecture: mbti, patternName: 'Self Sabotage', urgencyPercent: 82, loc: 350, csn },
    mbti: { name: 'The Architect', archetype: 'The one who builds perfect systems — except for themselves', rarity: '2.1%', spiritualPath: 'Jnana Yoga' },
    meta: { coreShadowPattern: 'The Shadow Architect', rootBelief: 'I am not enough unless I succeed perfectly', dharmaPhase: 'The Crucible', identifiedProblem: 'Unfulfilled potential due to fear of public failure' },
    vedicOverview: { lagnaAndMoon: 'Capricorn Lagna, Saturn in 10th', currentDasha: 'Saturn Mahadasha', saturnStatus: 'Growth through discipline' },
    validation: 'What you call "self-sabotage" is not a flaw. It is a survival mechanism — installed when a critical father taught you that trying and failing was more dangerous than not trying at all.',
    realCause: 'A core belief installed before conscious choice: "I am not enough unless I succeed perfectly." Your father\'s criticism fused your worth with achievement.',
    patternLoop: { trigger: 'New high-stakes opportunity', copingMechanism: 'Endless planning — perfecting strategy rather than executing', humanCost: 'Projects live forever in your mind but die before reaching the world', reset: 'Ship before ready. Done beats perfect.' },
    cosmicConfirmation: 'Your architect mind — the same mind that creates this perfectionism — is the blueprint for your liberation.',
    costSection: 'Every month this pattern runs, you lose ~40 hours of creative output.',
    teaching: 'As The Architect, your path is Jnana Yoga. The protocol: analyze the pattern intellectually, then execute one imperfect ship per day for 21 days.',
    witnessQuestion: 'If the need for perfection were gone tomorrow — what would you ship by Friday?',
  };

  const products = [
    { id: 'consciousness_blueprint', name: 'The Complete Consciousness Blueprint', headline: 'Your complete transformation system.', whyYou: `Built for your ${mbti} architecture.`, formats: ['ebook', 'audiobook', 'ai_chatbot', 'mini_app'], price: 97, originalPrice: 197, urgencyLine: 'Limited founding member pricing.', ctaText: 'Get My Blueprint' },
    { id: 'perfectionism_blueprint', name: 'The Perfectionism Dissolution Blueprint', headline: 'From paralysis to precision in 21 days.', whyYou: 'Designed for your perfectionism pattern.', formats: ['ebook', 'audiobook', 'mini_app'], price: 67, originalPrice: 127, urgencyLine: '89 people started this week.', ctaText: 'Start The System' },
    { id: 'shadow_work_journal', name: 'The Shadow Work Journal', headline: "Break the pattern you've been carrying.", whyYou: 'Built for your exact pattern.', formats: ['ebook', 'audiobook', 'ai_chatbot'], price: 47, originalPrice: 97, urgencyLine: '247 people this week.', ctaText: 'Begin The Break' },
  ];

  await prisma.blueprint.create({
    data: {
      csn, userId: user.id, plane_x: user.plane_x, plane_y: 1, symbol,
      mbti, archetype: 'architect', verifyCode: hash,
      reportData: { report, products },
      isComplete: true,
    }
  });

  console.log('\n' + '='.repeat(60));
  console.log('✅ BLUEPRINT CREATED');
  console.log('='.repeat(60));
  console.log(`\n   🔗 👉  http://localhost:3000/blueprint/${csn}  👈`);
  console.log('\n' + '='.repeat(60));
  console.log(`\n   INTJ — The Shadow Architect`);
  console.log(`   CSN: ${csn}`);
  console.log(`   Verify: ${hash}`);
  console.log(`\n   Open the URL in your browser!`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e.message); process.exit(1); });
