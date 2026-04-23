import { sql } from '../db';

/**
 * MOCK SUPABASE CLIENT using Neon SQL
 * This maintains compatibility with existing UI components while shifting data to Neon.
 */
export const supabase: any = {
  auth: {
    getUser: async () => ({ data: { user: null }, error: null }),
    getSession: async () => ({ data: { session: null }, error: null }),
    onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    signInWithOAuth: async () => ({ error: new Error("Auth currently being migrated to Neon.") }),
    signOut: async () => ({ error: null }),
  },
  from: (table: string) => ({
    select: (columns: string) => ({
      eq: (col: string, val: any) => ({
        single: async () => {
           const results = await sql`SELECT * FROM ${sql(table)} WHERE ${sql(col)} = ${val} LIMIT 1`;
           return { data: results[0], error: null };
        },
        maybeSingle: async () => {
           const results = await sql`SELECT * FROM ${sql(table)} WHERE ${sql(col)} = ${val} LIMIT 1`;
           return { data: results[0], error: null };
        },
        then: (cb: any) => sql`SELECT * FROM ${sql(table)} WHERE ${sql(col)} = ${val}`.then((r: any) => cb({data: r, error: null}))
      }),
      order: () => ({
        then: (cb: any) => sql`SELECT * FROM ${sql(table)}`.then((r: any) => cb({data: r, error: null}))
      })
    }),
    insert: (data: any) => ({
      then: (cb: any) => {
          const keys = Object.keys(data);
          const vals = Object.values(data);
          // Simple insert - in reality would need a more robust query builder
          return sql`INSERT INTO ${sql(table)} (${sql(keys.join(','))}) VALUES (${vals.join(',')})`.then((r: any) => cb({data: r, error: null}));
      }
    }),
    update: (data: any) => ({
      eq: (col: string, val: any) => ({
          then: (cb: any) => cb({data: null, error: null})
      })
    })
  })
};
