// src/app/api/admin/export/route.ts
// Export data to Excel-compatible CSV

import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"
import { auth } from "@clerk/nextjs/server"
import { excelClient } from "@/lib/sheets/excel-client"

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

function toCSV(rows: any[], columns: string[]): string {
  const header = columns.join(",")
  const lines = rows.map(row =>
    columns.map(col => {
      const val = row[col]
      if (val === null || val === undefined) return ""
      const str = String(val)
      if (str.includes(",") || str.includes('"') || str.includes("\n")) {
        return `"${str.replace(/"/g, '""')}"`
      }
      return str
    }).join(",")
  )
  return [header, ...lines].join("\n")
}

export async function GET(req: NextRequest) {
  try {
    if (!(await isAdmin())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 })
    }

    const { searchParams } = new URL(req.url)
    const type = searchParams.get("type") || "users"

    let csv = ""
    let filename = ""

    switch (type) {
      case "users": {
        filename = "spiritual_ai_users.csv"
        const users = await sql`SELECT id, email, "createdAt", "lastSeen" FROM "User" ORDER BY "createdAt" DESC LIMIT 500`
        csv = toCSV(users || [], ["id", "email", "createdAt", "lastSeen"])
        break
      }
      case "blueprints": {
        filename = "spiritual_ai_blueprints.csv"
        const bps = await sql`SELECT csn, mbti, "consciousnessIdentity", "corePattern", "spiritualPath", "createdAt" FROM "Blueprint" ORDER BY "createdAt" DESC LIMIT 500`
        csv = toCSV(bps || [], ["csn", "mbti", "consciousnessIdentity", "corePattern", "spiritualPath", "createdAt"])
        break
      }
      case "revenue": {
        filename = "spiritual_ai_revenue.csv"
        const purchases = await sql`SELECT id, "userId", "productName", amount, currency, status, "purchasedAt" FROM "Purchase" ORDER BY "purchasedAt" DESC LIMIT 500`
        csv = toCSV(purchases || [], ["id", "userId", "productName", "amount", "currency", "status", "purchasedAt"])
        break
      }
      case "excel-sync": {
        // Sync all DB data to local Excel file via Python service
        const users = await sql`SELECT id, email, "createdAt", "lastSeen" FROM "User" ORDER BY "createdAt" DESC LIMIT 500`
        for (const u of (users || [])) {
          await excelClient.upsertUser({
            user_id: u.id,
            email: u.email || "",
            first_seen: u.createdAt?.toISOString() || "",
            last_seen: u.lastSeen?.toISOString() || new Date().toISOString(),
          })
        }
        return NextResponse.json({ success: true, message: `Synced ${users?.length || 0} users to Excel` })
      }
      default:
        return NextResponse.json({ error: "Invalid export type" }, { status: 400 })
    }

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    })
  } catch (error: any) {
    console.error("Admin export error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
