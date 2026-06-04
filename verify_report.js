const { prisma } = require('./src/lib/prisma');

async function main() {
  try {
    const count = await prisma.blueprint.count();
    console.log('Total blueprints:', count);
    const latest = await prisma.blueprint.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    if (latest) {
      console.log('Latest CSN:', latest.csn);
      console.log('Report Data present:', !!latest.reportData);
    }
  } catch (e) {
    console.error('Error checking DB:', e);
  } finally {
    await prisma.$disconnect();
  }
}

// Register ts-node to handle the import in src/lib/prisma
require('ts-node').register({ 
  transpileOnly: true, 
  compilerOptions: { 
    module: 'commonjs', 
    moduleResolution: 'node', 
    esModuleInterop: true 
  } 
});

main();
