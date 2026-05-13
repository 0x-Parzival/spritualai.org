import { PrismaClient } from '@prisma/client'
import { createHash } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  console.log('Seeding Blockplain data...')

  // 1. Clear existing data (Order matters for FKs)
  await prisma.session.deleteMany({})
  await prisma.blueprint.deleteMany({})
  await prisma.user.deleteMany({})
  await prisma.planeXCounter.deleteMany({})

  // Reset Serial sequence (using raw query since deleteMany doesn't reset it)
  await prisma.$executeRaw`ALTER SEQUENCE "PlaneXCounter_id_seq" RESTART WITH 1`
  await prisma.$executeRaw`ALTER SEQUENCE "Blueprint_sequenceNumber_seq" RESTART WITH 1`

  // 2. Create Users (Atomic plane_x via PlaneXCounter)
  
  // User 1
  const x1 = await prisma.planeXCounter.create({ data: {} })
  const user1 = await prisma.user.create({
    data: {
      uid: 'browser-uid-1',
      email: 'user1@example.com',
      plane_x: x1.id,
    }
  })

  // User 2
  const x2 = await prisma.planeXCounter.create({ data: {} })
  const user2 = await prisma.user.create({
    data: {
      uid: 'browser-uid-2',
      email: 'user2@example.com',
      plane_x: x2.id,
    }
  })

  // User 3
  const x3 = await prisma.planeXCounter.create({ data: {} })
  const user3 = await prisma.user.create({
    data: {
      uid: 'browser-uid-3',
      email: 'user3@example.com',
      plane_x: x3.id,
    }
  })

  // 3. Create Blueprints
  
  // User 1: INTJ Sovereign, 2 blueprints
  const r1 = { mbti_analysis: 'INTJ Deep Dive', consciousness_score: 85 }
  const b1_1 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-1-INTJ-Ω-A1B2',
      userId: user1.id,
      plane_x: user1.plane_x!,
      plane_y: 1,
      mbti: 'INTJ',
      archetype: 'sovereign',
      symbol: 'Ω',
      verifyCode: 'A1B2',
      reportData: r1,
      createdAt: new Date(Date.now() - 86400000 * 2) // 2 days ago
    }
  })

  const r2 = { mbti_analysis: 'INTJ Level 2', consciousness_score: 92 }
  const h1 = createHash('sha256').update(JSON.stringify(r1)).digest('hex')
  await prisma.blueprint.create({
    data: {
      csn: 'SAI-4-INTJ-Ω-C3D4',
      userId: user1.id,
      plane_x: user1.plane_x!,
      plane_y: 2,
      prev_block_hash: h1,
      mbti: 'INTJ',
      archetype: 'sovereign',
      symbol: 'Ω',
      verifyCode: 'C3D4',
      reportData: r2,
      createdAt: new Date(Date.now() - 86400000) // 1 day ago
    }
  })

  // User 2: ENFP Seeker, 1 blueprint
  await prisma.blueprint.create({
    data: {
      csn: 'SAI-2-ENFP-Ψ-E5F6',
      userId: user2.id,
      plane_x: user2.plane_x!,
      plane_y: 1,
      mbti: 'ENFP',
      archetype: 'seeker',
      symbol: 'Ψ',
      verifyCode: 'E5F6',
      reportData: { mbti_analysis: 'ENFP Spirit', consciousness_score: 78 },
    }
  })

  // User 3: INTP Architect, 3 blueprints
  const r3_1 = { mbti_analysis: 'INTP Logic', consciousness_score: 82 }
  const b3_1 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-3-INTP-Σ-G7H8',
      userId: user3.id,
      plane_x: user3.plane_x!,
      plane_y: 1,
      mbti: 'INTP',
      archetype: 'architect',
      symbol: 'Σ',
      verifyCode: 'G7H8',
      reportData: r3_1,
      createdAt: new Date(Date.now() - 86400000 * 5)
    }
  })

  const r3_2 = { mbti_analysis: 'INTP Systems', consciousness_score: 88 }
  const h3_1 = createHash('sha256').update(JSON.stringify(r3_1)).digest('hex')
  const b3_2 = await prisma.blueprint.create({
    data: {
      csn: 'SAI-5-INTP-Σ-I9J0',
      userId: user3.id,
      plane_x: user3.plane_x!,
      plane_y: 2,
      prev_block_hash: h3_1,
      mbti: 'INTP',
      archetype: 'architect',
      symbol: 'Σ',
      verifyCode: 'I9J0',
      reportData: r3_2,
      createdAt: new Date(Date.now() - 86400000 * 3)
    }
  })

  const r3_3 = { mbti_analysis: 'INTP Mastery', consciousness_score: 95 }
  const h3_2 = createHash('sha256').update(JSON.stringify(r3_2)).digest('hex')
  await prisma.blueprint.create({
    data: {
      csn: 'SAI-6-INTP-Σ-K1L2',
      userId: user3.id,
      plane_x: user3.plane_x!,
      plane_y: 3,
      prev_block_hash: h3_2,
      mbti: 'INTP',
      archetype: 'architect',
      symbol: 'Σ',
      verifyCode: 'K1L2',
      reportData: r3_3,
      createdAt: new Date()
    }
  })

  console.log('Seed complete.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
