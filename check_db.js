const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  const csn = 'SAI-1-INTJ-Σ-3F13';
  const blueprint = await prisma.blueprint.findUnique({
    where: { csn },
  });
  console.log('CSN:', csn);
  console.log('Blueprint found:', !!blueprint);
  if (blueprint) {
    console.log(JSON.stringify(blueprint, null, 2));
  } else {
    const allBlueprints = await prisma.blueprint.findMany({ take: 5 });
    console.log('All Blueprints count:', await prisma.blueprint.count());
    console.log('Sample Blueprints:', allBlueprints.map(b => b.csn));
  }
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
