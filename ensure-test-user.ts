import { prisma } from './src/lib/prisma';

async function main() {
  console.log('Ensuring test user exists...');
  try {
    const user = await prisma.user.upsert({
      where: { id: 'test-user-id' },
      update: {},
      create: {
        id: 'test-user-id',
        uid: 'test-user-id',
        email: 'test@example.com',
      },
    });
    console.log('Test user ready:', user.id);
  } catch (err) {
    console.error('Failed to ensure test user:', err);
  } finally {
    await prisma.$disconnect();
  }
}

main();
