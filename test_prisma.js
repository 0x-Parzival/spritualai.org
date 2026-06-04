const { PrismaClient } = require('@prisma/client');
const { PrismaNeon } = require('@prisma/adapter-neon');
const { neonConfig } = require('@neondatabase/serverless');
const ws = require('ws');
const fs = require('fs');

async function main() {
  const env = fs.readFileSync(".env.local", "utf8");
  env.split("\n").forEach(line => {
    const [key, ...vals] = line.split("=");
    if (key && vals.length > 0) process.env[key.trim()] = vals.join("=").trim().replace(/^["\x27]|["\x27]$/g, "");
  });

  neonConfig.webSocketConstructor = ws;
  const connectionString = process.env.DATABASE_URL;
  const adapter = new PrismaNeon({ connectionString });
  const prisma = new PrismaClient({ adapter });

  try {
    const count = await prisma.blueprint.count();
    console.log('Blueprint count:', count);
    const users = await prisma.user.count();
    console.log('User count:', users);
  } catch (e) {
    console.error('Prisma Error:', e);
  } finally {
    await prisma.$disconnect();
  }
}

main();
