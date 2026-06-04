/**
 * lib/blockplain.ts
 * Core logic for the immutable Consciousness Chain (Blockplain).
 * Uses raw SQL to bypass Prisma type issues during build.
 */

import { sql } from './db';

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
  // Use a simple atomic counter increment via SQL
  const counterResult = await sql`INSERT INTO "PlaneXCounter" DEFAULT VALUES RETURNING id`;
  const planeX = counterResult[0].id;
  
  await sql`UPDATE "User" SET plane_x = ${planeX} WHERE id = ${userId}`;
  return planeX;
}

/**
 * Gets the next Y coordinate for a user's blueprint chain.
 */
export async function getNextPlaneY(userId: string): Promise<number> {
  const result = await sql`SELECT COUNT(*) as count FROM "Blueprint" WHERE "userId" = ${userId}`;
  return (Number(result[0]?.count) || 0) + 1;
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
export async function getPrevBlockHash(userId: string): Promise<string | null> {
  const lastBlock = await sql`
    SELECT "reportData" FROM "Blueprint" 
    WHERE "userId" = ${userId} 
    ORDER BY plane_y DESC 
    LIMIT 1
  `;

  if (!lastBlock || lastBlock.length === 0) return null;

  const { createHash } = await import('crypto');
  return createHash('sha256')
    .update(JSON.stringify(lastBlock[0].reportData))
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
}): Promise<any> {
  // 1. Get user plane_x
  const userResult = await sql`SELECT plane_x FROM "User" WHERE id = ${params.userId} LIMIT 1`;
  const user = userResult[0];

  if (!user || user.plane_x === null) {
    throw new Error(`plane_x not assigned for user ${params.userId}`);
  }

  // 2. Get next plane_y and previous hash
  const plane_y = await getNextPlaneY(params.userId);
  const prev_block_hash = await getPrevBlockHash(params.userId);
  const symbol = getArchetypeSymbol(params.archetype);

  // 3. Create with temp placeholder to get sequenceNumber
  const tempCsn = `TEMP-${params.userId}-${Date.now()}`;
  const initialBlockResult = await sql`
    INSERT INTO "Blueprint" (csn, "userId", plane_x, plane_y, prev_block_hash, mbti, archetype, symbol, "verifyCode", "reportData")
    VALUES (${tempCsn}, ${params.userId}, ${user.plane_x}, ${plane_y}, ${prev_block_hash}, ${params.mbti}, ${params.archetype}, ${symbol}, ${tempCsn}, ${JSON.stringify(params.reportData)}::jsonb)
    RETURNING "sequenceNumber"
  `;
  const sequenceNumber = initialBlockResult[0].sequenceNumber;

  // 4. Generate final CSN and verifyCode using the real sequenceNumber
  const { csn, verifyCode } = await generateCSNData(
    sequenceNumber,
    params.mbti,
    params.archetype
  );

  // 5. Update the row with final data
  const finalBlockResult = await sql`
    UPDATE "Blueprint"
    SET csn = ${csn}, "verifyCode" = ${verifyCode}
    WHERE csn = ${tempCsn}
    RETURNING *
  `;
  
  return finalBlockResult[0];
}

/**
 * Get a user's vertical chain.
 */
export async function getUserChain(userId: string) {
  return await sql`
    SELECT * FROM "Blueprint"
    WHERE "userId" = ${userId}
    ORDER BY plane_y ASC
  `;
}

/**
 * Get all blueprints at a given depth across all users.
 */
export async function getHorizontalSlice(plane_y: number) {
  return await sql`
    SELECT b.*, u.id as "user_id", u.uid as "user_uid", u.email as "user_email"
    FROM "Blueprint" b
    LEFT JOIN "User" u ON b."userId" = u.id
    WHERE b.plane_y = ${plane_y}
  `;
}

/**
 * Get blueprints matching a cluster of attributes.
 */
export async function getCluster(params: { mbti?: string; archetype?: string; plane_y?: number }) {
  let query = sql`
    SELECT b.*, u.id as "user_id", u.uid as "user_uid", u.email as "user_email"
    FROM "Blueprint" b
    LEFT JOIN "User" u ON b."userId" = u.id
    WHERE 1=1
  `;
  
  if (params.mbti) {
    query = sql`SELECT * FROM (${query}) q WHERE mbti = ${params.mbti}`;
  }
  if (params.archetype) {
    query = sql`SELECT * FROM (${query}) q WHERE archetype = ${params.archetype}`;
  }
  if (params.plane_y) {
    query = sql`SELECT * FROM (${query}) q WHERE plane_y = ${params.plane_y}`;
  }

  return await query;
}

/**
 * Verify the authenticity of a block.
 */
export async function verifyBlock(verifyCode: string) {
  const results = await sql`
    SELECT * FROM "Blueprint"
    WHERE "verifyCode" = ${verifyCode.toUpperCase()}
    LIMIT 1
  `;
  const blueprint = results[0];

  return {
    valid: !!blueprint,
    blueprint: blueprint || undefined,
  };
}

/**
 * Look up a block by its CSN.
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
