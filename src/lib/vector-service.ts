import { sql } from './db';

const OLLAMA_URL = process.env.OLLAMA_URL || 'http://localhost:11434';
const EMBEDDING_MODEL = 'nomic-embed-text';

export interface KnowledgeFragment {
  id?: string;
  content: string;
  metadata: any;
  embedding?: number[];
}

export async function embedText(text: string): Promise<number[]> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 1000); // 1s timeout for embeddings

    const res = await fetch(`${OLLAMA_URL}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      signal: controller.signal,
      body: JSON.stringify({
        model: EMBEDDING_MODEL,
        prompt: text.substring(0, 500) // Truncate for speed/efficiency
      })
    });
    clearTimeout(timeout);
    if (!res.ok) throw new Error(`Ollama failed: ${res.status}`);
    const data = await res.json();
    return data.embedding;
  } catch (e) {
    return new Array(768).fill(0); // Fallback to zero vector
  }
}

/**
 * TWO-TIER COMPRESSED CACHE
 * Tier 1: Exact Match (O(1) speed, 0 tokens)
 * Tier 2: Semantic Match (pgvector)
 */
export async function getSemanticCache(query: string, threshold: number = 0.12): Promise<any | null> {
  const cleanQuery = query.trim().toLowerCase();
  
  try {
    // Tier 1: Exact Match
    const exact = await sql`SELECT response_json FROM response_cache WHERE query_text = ${cleanQuery} LIMIT 1`;
    if (exact.length > 0) {
      sql`UPDATE response_cache SET hit_count = hit_count + 1 WHERE query_text = ${cleanQuery}`.catch(() => {});
      return exact[0].response_json;
    }

    // Tier 2: Semantic Match
    const embedding = await embedText(cleanQuery);
    const embeddingSql = `[${embedding.join(',')}]`;

    const results = await sql`
      SELECT response_json, query_text, (embedding <=> ${embeddingSql}::vector) as distance
      FROM response_cache
      WHERE (embedding <=> ${embeddingSql}::vector) < ${threshold}
      ORDER BY distance ASC
      LIMIT 1
    `;

    if (results.length > 0) {
      const match = results[0] as any;
      sql`UPDATE response_cache SET hit_count = hit_count + 1 WHERE query_text = ${match.query_text}`.catch(() => {});
      return match.response_json;
    }
    return null;
  } catch (e) {
    return null;
  }
}

export async function setSemanticCache(query: string, response: any) {
  const cleanQuery = query.trim().toLowerCase();
  try {
    const embedding = await embedText(cleanQuery);
    const embeddingSql = `[${embedding.join(',')}]`;
    
    // We store the COMPACT version only
    await sql`
      INSERT INTO response_cache (query_text, response_json, embedding)
      VALUES (${cleanQuery}, ${JSON.stringify(response)}, ${embeddingSql}::vector)
      ON CONFLICT (query_text) DO UPDATE 
      SET response_json = EXCLUDED.response_json, embedding = EXCLUDED.embedding
    `;
  } catch (e) {}
}

export async function searchKnowledge(query: string, limit: number = 2): Promise<KnowledgeFragment[]> {
  try {
    const embedding = await embedText(query);
    const embeddingSql = `[${embedding.join(',')}]`;
    return await sql`
      SELECT id, content, metadata FROM knowledge_base
      ORDER BY embedding <=> ${embeddingSql}::vector LIMIT ${limit}
    ` as any;
  } catch (e) { return []; }
}

export async function searchUserMemory(userId: string, query: string, limit: number = 3): Promise<any[]> {
    try {
        const embedding = await embedText(query);
        const embeddingSql = `[${embedding.join(',')}]`;
        return await sql`
            SELECT content, emotional_state, created_at 
            FROM user_memory 
            WHERE user_id = ${userId}
            ORDER BY embedding <=> ${embeddingSql}::vector 
            LIMIT ${limit}
        `;
    } catch (e) { return []; }
}

export async function addUserMemory(userId: string, content: string, emotionalState: any) {
    try {
        const embedding = await embedText(content);
        const embeddingSql = `[${embedding.join(',')}]`;
        await sql`
            INSERT INTO user_memory (user_id, content, emotional_state, embedding)
            VALUES (${userId}, ${content}, ${JSON.stringify(emotionalState)}, ${embeddingSql}::vector)
        `;
    } catch (e) { console.error("Failed to add user memory", e); }
}

export async function addAiMemory(reflection: string, humanPattern: string, evolutionShift: string) {
    try {
        const embedding = await embedText(reflection + " " + evolutionShift);
        const embeddingSql = `[${embedding.join(',')}]`;
        await sql`
            INSERT INTO ai_memory (reflection, human_pattern_observed, evolution_shift, embedding)
            VALUES (${reflection}, ${humanPattern}, ${evolutionShift}, ${embeddingSql}::vector)
        `;
    } catch (e) { console.error("Failed to add AI memory", e); }
}

export async function getLatestAiEvolution(limit: number = 2): Promise<any[]> {
    try {
        return await sql`
            SELECT reflection, evolution_shift, created_at 
            FROM ai_memory 
            ORDER BY created_at DESC 
            LIMIT ${limit}
        `;
    } catch (e) { return []; }
}
