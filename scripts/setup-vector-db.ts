import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function setup() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL not found');
  
  const sql = neon(dbUrl);
  
  console.log("Enabling vector extension...");
  await sql`CREATE EXTENSION IF NOT EXISTS vector`;
  
  console.log("Creating knowledge_base table...");
  await sql`
    CREATE TABLE IF NOT EXISTS knowledge_base (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      content text NOT NULL,
      metadata jsonb DEFAULT '{}'::jsonb,
      embedding vector(768),
      created_at timestamptz DEFAULT now()
    )
  `;
  
  console.log("Creating index...");
  // Note: IVFFlat is good, but for small datasets HNSW or even exact search is fine.
  // We'll use HNSW if supported or IVFFlat.
  try {
    await sql`CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx ON knowledge_base USING hnsw (embedding vector_cosine_ops)`;
  } catch (e) {
    await sql`CREATE INDEX IF NOT EXISTS knowledge_base_embedding_idx ON knowledge_base USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100)`;
  }
  
  console.log("Setup complete.");
}

setup().catch(console.error);
