// src/app/api/admin/blueprints/route.ts
// Admin blueprints list

import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

async function isAdmin() {
  const { userId } = await auth()
  if (!userId) return false
  try {
    const result = await sql`SELECT role FROM "User" WHERE id = ${userId}`
    return result?.[0]?.role === 'admin'
  } catch {
    return false
  }
}

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const search = searchParams.get("search") || ""
    const architecture = searchParams.get("architecture") || ""
    const path = searchParams.get("path") || ""
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    let query = `
      SELECT b.csn, b.mbti, b.archetype,
        b.symbol, b."sequenceNumber", b.plane_x, b.plane_y,
        b."createdAt",
        u.id as "userId", u.email
      FROM "Blueprint" b
      JOIN "User" u ON u.id = b."userId"
    `
    const conditions: string[] = []
    const params: any[] = []
    let paramIdx = 1

    if (search) {
      conditions.push(`(b.csn ILIKE $${paramIdx} OR b.mbti ILIKE $${paramIdx} OR b.archetype ILIKE $${paramIdx})`)
      params.push(`%${search}%`)
      paramIdx++
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ")
    }

    query += ` ORDER BY b."createdAt" DESC LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`
    params.push(limit, offset)

    const blueprints = await sql.unsafe(query, params)

    return NextResponse.json({
      success: true,
      blueprints: blueprints || [],
      pagination: { limit, offset, hasMore: (blueprints?.length || 0) === limit },
    })
  } catch (error: any) {
    console.error("Admin blueprints error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
