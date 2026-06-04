// src/app/api/admin/referrals/route.ts
// Admin referral codes — CRUD

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

function genRefId() {
  return `ref_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const codes = await sql`
      SELECT rc.id, rc.code, rc."discountPercentage", rc."discountType",
        rc."maxUses", rc."currentUses", rc."isActive", rc."createdAt",
        COALESCE(SUM(p.amount), 0) as "revenueGenerated",
        COUNT(p.id) as "transactionCount"
      FROM "ReferralCode" rc
      LEFT JOIN "Purchase" p ON p."referralCode" = rc.code AND p.status = 'completed'
      GROUP BY rc.id, rc.code, rc."discountPercentage", rc."discountType",
        rc."maxUses", rc."currentUses", rc."isActive", rc."createdAt"
      ORDER BY rc."createdAt" DESC
    `.then((r: any) => r || [])

    return NextResponse.json({ success: true, codes })
  } catch (error: any) {
    console.error("Admin referrals error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { code, discountPercentage, discountType, maxUses, owner } = body

    if (!code || !discountPercentage) {
      return NextResponse.json({ error: "code and discountPercentage required" }, { status: 400 })
    }

    const id = genRefId()
    await sql`
      INSERT INTO "ReferralCode" (id, code, "discountPercentage", "discountType", "maxUses", "currentUses", "isActive", "owner", "createdAt")
      VALUES (${id}, ${code.toUpperCase()}, ${discountPercentage}, ${discountType || 'percentage'}, ${maxUses || null}, 0, true, ${owner || 'admin'}, NOW())
    `

    return NextResponse.json({ success: true, id, code: code.toUpperCase() })
  } catch (error: any) {
    console.error("Admin create referral error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PATCH(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const body = await req.json()
    const { id, isActive } = body

    if (!id || isActive === undefined) {
      return NextResponse.json({ error: "id and isActive required" }, { status: 400 })
    }

    await sql`UPDATE "ReferralCode" SET "isActive" = ${isActive} WHERE id = ${id}`

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
