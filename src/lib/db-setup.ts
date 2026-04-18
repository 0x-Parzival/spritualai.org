import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function setup() {
  const sql = neon(process.env.DATABASE_URL!);

  console.log('Creating tables in Neon...');

  try {
    // 1. Users Table
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        ip_hash TEXT,
        country TEXT,
        city TEXT,
        gender TEXT,
        age_range TEXT,
        mbti_type TEXT,
        core_pattern TEXT,
        urgency_percent INTEGER,
        budget_signal TEXT,
        session_id TEXT UNIQUE
      );
    `;

    // 2. Conversations Table
    await sql`
      CREATE TABLE IF NOT EXISTS conversations (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        session_id TEXT REFERENCES users(session_id),
        question_count INTEGER,
        exchange_history JSONB,
        patterns_detected TEXT[],
        mbti_signals JSONB,
        completed BOOLEAN DEFAULT FALSE
      );
    `;

    // 3. Reports Table
    await sql`
      CREATE TABLE IF NOT EXISTS reports (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        session_id TEXT REFERENCES users(session_id),
        report_json JSONB,
        products_json JSONB,
        sun_sign TEXT,
        nakshatra TEXT,
        dasha TEXT,
        life_phase TEXT
      );
    `;

    // 4. Emails Table
    await sql`
      CREATE TABLE IF NOT EXISTS emails (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        email TEXT UNIQUE,
        session_id TEXT,
        source TEXT
      );
    `;

    // 5. Outcomes Table
    await sql`
      CREATE TABLE IF NOT EXISTS outcomes (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        session_id TEXT,
        pattern_name TEXT,
        mbti_type TEXT,
        intervention_path TEXT,
        success_rating INTEGER,
        user_narrative TEXT,
        days_elapsed INTEGER DEFAULT 7,
        shift_detected BOOLEAN DEFAULT FALSE
      );
    `;

    console.log('✅ All tables created successfully.');
  } catch (error) {
    console.error('❌ Error creating tables:', error);
  }
}

setup();
