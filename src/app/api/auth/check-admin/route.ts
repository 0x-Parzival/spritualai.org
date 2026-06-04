// src/app/api/auth/check-admin/route.ts
// Check if current user is admin

import { NextResponse } from "next/server"
import { auth } from "@clerk/nextjs/server"
import { sql } from "@/lib/db"

export async function GET() {
  try {
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json({ isAdmin: false }, { status: 401 })
    }

    // Check if user has admin role in Clerk metadata or DB
    const result = await sql`SELECT role FROM "User" WHERE id = ${userId}`
    const isAdmin = result?.[0]?.role === 'admin'

    return NextResponse.json({ isAdmin })
  } catch {
    return NextResponse.json({ isAdmin: false })
  }
}
