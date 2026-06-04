// src/app/api/admin/stats/route.ts
// Admin dashboard stats — Overview page data

import { NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"

async function isAdmin() {
  const { userId } = await auth()
  if (!userId) return false
  // Check admin in DB
  try {
    const result = await sql`SELECT role FROM "User" WHERE id = ${userId}`
    return result?.[0]?.role === 'admin'
  } catch {
    return false
  }
}

export async function GET() {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    // Aggregate stats from DB
    const [userCount, blueprintCount, revenueResult, sessionStats, recentUsers] = await Promise.all([
      sql`SELECT COUNT(*) as count FROM "User"`.then((r: any) => r?.[0]?.count || 0),
      sql`SELECT COUNT(*) as count FROM "Blueprint"`.then((r: any) => r?.[0]?.count || 0),
      sql`SELECT COALESCE(SUM(amount), 0) as total, COUNT(*) as count FROM "Purchase" WHERE status = 'completed'`.then((r: any) => r?.[0] || { total: 0, count: 0 }),
      sql`SELECT COUNT(*) as total, COUNT(CASE WHEN "completionStatus" = 'completed' THEN 1 END) as completed, AVG("exchangeCount") as avg_exchanges FROM "Session"`.then((r: any) => r?.[0] || {}),
      sql`SELECT id, email, "createdAt", "lastSeen" FROM "User" ORDER BY "createdAt" DESC LIMIT 10`.then((r: any) => r || []),
    ])

    const payingUsers = await sql`SELECT COUNT(DISTINCT "userId") as count FROM "Purchase" WHERE status = 'completed'`.then((r: any) => r?.[0]?.count || 0)

    return NextResponse.json({
      success: true,
      stats: {
        totalUsers: Number(userCount),
        totalBlueprints: Number(blueprintCount),
        totalRevenue: Number(revenueResult?.total || 0),
        totalTransactions: Number(revenueResult?.count || 0),
        payingUsers: Number(payingUsers),
        totalSessions: Number(sessionStats?.total || 0),
        completedSessions: Number(sessionStats?.completed || 0),
        avgExchanges: Math.round(Number(sessionStats?.avg_exchanges || 0)),
      },
      recentUsers,
    })
  } catch (error: any) {
    console.error("Admin stats error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
