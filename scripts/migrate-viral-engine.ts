import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../.env.local') });

async function migrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) throw new Error('DATABASE_URL not found');
  
  const sql = neon(dbUrl);
  
  console.log("Migrating database for Viral Acquisition Engine...");

  // 1. Update Users table with browser_uid
  await sql`
    ALTER TABLE users ADD COLUMN IF NOT EXISTS browser_uid text UNIQUE;
  `;

  // 2. Create Blueprints table
  // sequence_number is a SERIAL to provide the sequential decode count
  await sql`
    CREATE TABLE IF NOT EXISTS blueprints (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      csn text UNIQUE NOT NULL,
      sequence_number SERIAL,
      user_id uuid REFERENCES users(id) ON DELETE SET NULL,
      mbti text NOT NULL,
      archetype text NOT NULL,
      symbol text NOT NULL,
      verify_code text NOT NULL,
      report_data jsonb NOT NULL,
      products_data jsonb DEFAULT '[]'::jsonb,
      created_at timestamptz DEFAULT now()
    )
  `;

  // 3. Create Index for sequence_number to easily get total count
  await sql`
    CREATE INDEX IF NOT EXISTS idx_blueprints_sequence ON blueprints(sequence_number);
  `;

  // 4. Create Chat Sessions table
  await sql`
    CREATE TABLE IF NOT EXISTS chat_sessions (
      id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
      user_id uuid REFERENCES users(id) ON DELETE CASCADE,
      browser_uid text NOT NULL,
      messages jsonb DEFAULT '[]'::jsonb,
      completion_percent integer DEFAULT 0,
      is_complete boolean DEFAULT false,
      created_at timestamptz DEFAULT now(),
      updated_at timestamptz DEFAULT now()
    )
  `;

  console.log("Migration complete.");
}

migrate().catch(console.error);
