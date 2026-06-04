// fetch-blueprint.js
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

  // Simulate what the fetch API does
  const { getBlock } = require('./src/lib/blockplain');

  const result = await getBlock('SAI-1-INTJ-Σ-3F13');
  if (!result) {
    console.log('❌ Not found');
    process.exit(1);
  }

  const rd = result.reportData;
  console.log('✅ Fetch route works!');
  console.log(`   CSN: ${result.csn}`);
  console.log(`   MBTI: ${result.mbti}`);
  console.log(`   Archetype: ${result.archetype}`);
  console.log(`   Symbol: ${result.symbol}`);
  console.log(`   Report validation: ${rd?.report?.validation?.substring(0, 80)}...`);
  console.log(`   Products: ${rd?.products?.length}`);
  console.log(`\n   🔗 http://localhost:3000/blueprint/${result.csn}`);

  await prisma.$disconnect();
}

main().catch(e => { console.error(e.message); process.exit(1); });
