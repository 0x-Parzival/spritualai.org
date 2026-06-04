import { prisma } from './prisma';
import { sql } from './db';
import { Blueprint, Prisma } from '@prisma/client';

export const ARCHETYPE_SYMBOLS: Record<string, string> = {
  sovereign: 'Ω',
  seeker: 'Ψ',
  catalyst: 'Δ',
  architect: 'Σ',
  visionary: 'Φ',
  teacher: 'Λ',
};

/**
 * Maps archetype string to its Greek symbol.
 */
export function getArchetypeSymbol(archetype: string): string {
  return ARCHETYPE_SYMBOLS[archetype.toLowerCase()] || 'Ψ';
}

/**
 * Assigns a unique X coordinate to a user atomically.
 */
export async function assignPlaneX(userId: string): Promise<number> {
  return await prisma.$transaction(async (tx) => {
    const user = await tx.user.findUnique({
      where: { id: userId },
      select: { plane_x: true },
    });

    if (!user) throw new Error(`User ${userId} not found`);
    if (user.plane_x !== null) {
      throw new Error(`plane_x already assigned for user ${userId}`);
    }

    const counter = await tx.planeXCounter.create({
      data: {},
    });

    await tx.user.update({
      where: { id: userId },
      data: { plane_x: counter.id },
    });

    return counter.id;
  });
}

/**
 * Gets the next Y coordinate for a user's blueprint chain.
 */
export async function getNextPlaneY(userId: string, tx?: Prisma.TransactionClient): Promise<number> {
  const client = tx || prisma;
  const count = await client.blueprint.count({
    where: { userId },
  });
  return count + 1;
}

/**
 * Generates a high-fidelity Cosmic Serial Number (CSN) and verify code.
 */
export async function generateCSNData(
  sequenceNumber: number,
  mbti: string,
  archetype: string
): Promise<{ csn: string; verifyCode: string }> {
  const symbol = getArchetypeSymbol(archetype);
  const raw = `${sequenceNumber}${mbti}${Date.now()}`;
  
  // Use crypto for SHA-256
  const { createHash } = await import('crypto');
  const verifyCode = createHash('sha256')
    .update(raw)
    .digest('hex')
    .slice(0, 4)
    .toUpperCase();

  return {
    csn: `SAI-${sequenceNumber}-${mbti}-${symbol}-${verifyCode}`,
    verifyCode,
  };
}

/**
 * Gets the hash of the previous block's report data.
 */
export async function getPrevBlockHash(userId: string, tx?: Prisma.TransactionClient): Promise<string | null> {
  const client = tx || prisma;
  const lastBlock = await client.blueprint.findFirst({
    where: { userId },
    orderBy: { plane_y: 'desc' },
    select: { reportData: true },
  });

  if (!lastBlock) return null;

  const { createHash } = await import('crypto');
  return createHash('sha256')
    .update(JSON.stringify(lastBlock.reportData))
    .digest('hex');
}

/**
 * Creates a new block in the Blockplain.
 */
export async function createBlock(params: {
  userId: string;
  mbti: string;
  archetype: string;
  reportData: any;
}): Promise<Blueprint> {
  return await prisma.$transaction(async (tx) => {
    // 1. Validate user and get plane_x
    const user = await tx.user.findUnique({
      where: { id: params.userId },
      select: { plane_x: true },
    });

    if (!user || user.plane_x === null) {
      throw new Error(`plane_x not assigned for user ${params.userId}`);
    }

    // 2. Get next plane_y and previous hash
    const plane_y = await getNextPlaneY(params.userId, tx);
    const prev_block_hash = await getPrevBlockHash(params.userId, tx);
    const symbol = getArchetypeSymbol(params.archetype);

    // 3. Create with temp placeholder to get sequenceNumber
    const tempCsn = `TEMP-${params.userId}-${Date.now()}`;
    const initialBlock = await tx.blueprint.create({
      data: {
        csn: tempCsn,
        userId: params.userId,
        plane_x: user.plane_x,
        plane_y,
        prev_block_hash,
        mbti: params.mbti,
        archetype: params.archetype,
        symbol,
        verifyCode: `TEMP-${Date.now()}`,
        reportData: params.reportData,
      },
    });

    // 4. Generate final CSN and verifyCode using the real sequenceNumber
    const { csn, verifyCode } = await generateCSNData(
      initialBlock.sequenceNumber,
      params.mbti,
      params.archetype
    );

    // 5. Update the row with final data
    return await tx.blueprint.update({
      where: { csn: tempCsn },
      data: { csn, verifyCode },
    });
  });
}

/**
 * Look up a block by its CSN.
 * Uses raw SQL to avoid PrismaNeon adapter issues.
 */
export async function getBlock(csn: string) {
  const result = await sql`
    SELECT b.*, u.id as "user_id", u.uid as "user_uid", u.email as "user_email"
    FROM "Blueprint" b
    LEFT JOIN "User" u ON b."userId" = u.id
    WHERE b.csn = ${csn}
    LIMIT 1
  `;
  if (!result || result.length === 0) return null;
  const row = result[0];
  return {
    csn: row.csn,
    sequenceNumber: row.sequenceNumber,
    userId: row.userId,
    plane_x: row.plane_x,
    plane_y: row.plane_y,
    prev_block_hash: row.prev_block_hash,
    mbti: row.mbti,
    archetype: row.archetype,
    symbol: row.symbol,
    verifyCode: row.verifyCode,
    reportData: row.reportData,
    isComplete: row.isComplete,
    createdAt: row.createdAt,
    identifiers: row.identifiers || {},
    summary: row.summary || '',
    conversationDepth: row.conversationDepth || 0,
    engagementScore: row.engagementScore || 0,
    user: row.user_id ? { id: row.user_id, uid: row.user_uid, email: row.user_email } : null,
  } as any;
}

/**
 * Get a user's vertical chain.
 */
export async function getUserChain(userId: string) {
  return await prisma.blueprint.findMany({
    where: { userId },
    orderBy: { plane_y: 'asc' },
  });
}

/**
 * Get all blueprints at a given depth across all users.
 */
export async function getHorizontalSlice(plane_y: number) {
  return await prisma.blueprint.findMany({
    where: { plane_y },
    include: { user: true },
  });
}

/**
 * Get blueprints matching a cluster of attributes.
 */
export async function getCluster(params: { mbti?: string; archetype?: string; plane_y?: number }) {
  const where: Prisma.BlueprintWhereInput = {};
  if (params.mbti) where.mbti = params.mbti;
  if (params.archetype) where.archetype = params.archetype;
  if (params.plane_y) where.plane_y = params.plane_y;

  return await prisma.blueprint.findMany({
    where,
    include: { user: true },
  });
}

/**
 * Verify the authenticity of a block.
 */
export async function verifyBlock(verifyCode: string) {
  const blueprint = await prisma.blueprint.findUnique({
    where: { verifyCode: verifyCode.toUpperCase() },
  });

  return {
    valid: !!blueprint,
    blueprint: blueprint || undefined,
  };
}
