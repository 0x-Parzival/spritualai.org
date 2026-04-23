import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function setup() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL not found');
  
  const sql = neon(dbUrl);
  
  console.log("Creating response_cache table...");
  await sql`
    CREATE TABLE IF NOT EXISTS response_cache (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      query_text text UNIQUE NOT NULL,
      response_json jsonb NOT NULL,
      embedding vector(768),
      hit_count integer DEFAULT 1,
      created_at timestamptz DEFAULT now(),
      last_hit_at timestamptz DEFAULT now()
    )
  `;
  
  try {
    await sql`CREATE INDEX IF NOT EXISTS response_cache_embedding_idx ON response_cache USING hnsw (embedding vector_cosine_ops)`;
  } catch (e) {
    await sql`CREATE INDEX IF NOT EXISTS response_cache_embedding_idx ON response_cache USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)`;
  }
  
  console.log("Setup complete.");
}

setup().catch(console.error);
