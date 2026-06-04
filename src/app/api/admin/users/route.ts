// src/app/api/admin/users/route.ts
// Admin users list with filtering

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
    const mbti = searchParams.get("mbti") || ""
    const status = searchParams.get("status") || ""
    const limit = parseInt(searchParams.get("limit") || "50")
    const offset = parseInt(searchParams.get("offset") || "0")

    // Build dynamic query
    let query = `
      SELECT u.id, u.email, u."createdAt", u."lastSeen",
        COUNT(DISTINCT s.id) as "totalSessions",
        COUNT(DISTINCT b.csn) as "totalReports",
        COALESCE(SUM(p.amount), 0) as "totalRevenue",
        MAX(b.mbti) as "lastMbti",
        MAX(b."consciousnessIdentity") as "lastArchitecture"
      FROM "User" u
      LEFT JOIN "Session" s ON s."userId" = u.id
      LEFT JOIN "Blueprint" b ON b."userId" = u.id
      LEFT JOIN "Purchase" p ON p."userId" = u.id AND p.status = 'completed'
    `
    const conditions: string[] = []
    const params: any[] = []
    let paramIdx = 1

    if (search) {
      conditions.push(`(u.email ILIKE $${paramIdx} OR u.id ILIKE $${paramIdx})`)
      params.push(`%${search}%`)
      paramIdx++
    }

    if (conditions.length > 0) {
      query += " WHERE " + conditions.join(" AND ")
    }

    query += ` GROUP BY u.id, u.email, u."createdAt", u."lastSeen"`

    if (mbti) {
      query += ` HAVING MAX(b.mbti) = $${paramIdx}`
      params.push(mbti)
      paramIdx++
    }

    query += ` ORDER BY u."createdAt" DESC LIMIT $${paramIdx} OFFSET $${paramIdx + 1}`
    params.push(limit, offset)

    const users = await sql.unsafe(query, params)

    return NextResponse.json({
      success: true,
      users: users || [],
      pagination: { limit, offset, hasMore: (users?.length || 0) === limit },
    })
  } catch (error: any) {
    console.error("Admin users error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
