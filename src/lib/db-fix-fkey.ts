import { neon } from '@neondatabase/serverless';
import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.local' });

async function fixConstraint() {
  const sql = neon(process.env.DATABASE_URL!);
  console.log('Dropping foreign key constraint on reports...');

  try {
    await sql`
      ALTER TABLE reports DROP CONSTRAINT IF EXISTS reports_session_id_fkey;
    `;
    console.log('✅ Constraint dropped successfully.');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  }
}

fixConstraint();
