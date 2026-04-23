import { neon } from '@neondatabase/serverless';

const dbUrl = process.env.DATABASE_URL;

// We avoid throwing at the module level to prevent build-time crashes in environments 
// where the URL is only available at runtime.
if (!dbUrl) {
  console.warn('DATABASE_URL is not set. Database features will be unavailable.');
}

export const sql = dbUrl ? neon(dbUrl) : ((...args: any[]) => {
  throw new Error('Database is not initialized. Check DATABASE_URL.');
}) as any;
