import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function migrate() {
  const sql = neon(process.env.DATABASE_URL!);
  console.log('Migrating Reports table for Origin Point verification...');

  try {
    await sql`
      ALTER TABLE reports 
      ADD COLUMN IF NOT EXISTS cosmic_serial_number TEXT UNIQUE,
      ADD COLUMN IF NOT EXISTS verification_hash TEXT;
    `;
    console.log('✅ Migration successful.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

migrate();
