// src/app/api/sheets/db-check/route.ts
// Diagnostic: check what columns exist in the users table

import { NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const cols = await sql`
      SELECT column_name, data_type 
      FROM information_schema.columns 
      WHERE table_name = 'User' 
      ORDER BY ordinal_position
    `
    return NextResponse.json({ columns: cols })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 })
  }
}
