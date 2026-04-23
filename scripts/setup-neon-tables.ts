import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function setup() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL not found');
  
  const sql = neon(dbUrl);
  
  console.log("Creating tables for Neon-based Auth and Emotional Tracking...");

  // 1. Users table
  await sql`
    CREATE TABLE IF NOT EXISTS users (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      email text UNIQUE NOT NULL,
      full_name text,
      mbti_type text,
      created_at timestamptz DEFAULT now(),
      last_login timestamptz DEFAULT now()
    )
  `;

  // 2. Emotional History (Vectorized)
  await sql`
    CREATE TABLE IF NOT EXISTS emotional_history (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      content text NOT NULL,
      sentiment jsonb DEFAULT '{}'::jsonb,
      archetype_state text,
      embedding vector(768),
      created_at timestamptz DEFAULT now()
    )
  `;

  // 3. User Sessions
  await sql`
    CREATE TABLE IF NOT EXISTS user_sessions (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      session_token text UNIQUE NOT NULL,
      expires_at timestamptz NOT NULL,
      created_at timestamptz DEFAULT now()
    )
  `;

  console.log("Neon tables setup complete.");
}

setup().catch(console.error);
