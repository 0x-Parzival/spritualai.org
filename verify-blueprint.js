// verify-blueprint.js
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

  const bp = await prisma.blueprint.findUnique({ where: { csn: 'SAI-1-INTJ-Σ-3F13' } });
  if (!bp) {
    console.log('❌ Blueprint not found');
    process.exit(1);
  }

  const rd = bp.reportData;
  console.log('✅ Blueprint found in database:');
  console.log(`   CSN: ${bp.csn}`);
  console.log(`   MBTI: ${bp.mbti}`);
  console.log(`   Archetype: ${bp.archetype}`);
  console.log(`   Symbol: ${bp.symbol}`);
  console.log(`   Verify: ${bp.verifyCode}`);
  console.log(`   Plane: ${bp.plane_x}.${bp.plane_y}`);
  console.log(`   Report has validation: ${!!rd?.report?.validation}`);
  console.log(`   Report has patternLoop: ${!!rd?.report?.patternLoop}`);
  console.log(`   Products count: ${rd?.products?.length || 0}`);
  console.log(`\n   🔗 Report URL: http://localhost:3000/blueprint/${bp.csn}`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e.message); process.exit(1); });
