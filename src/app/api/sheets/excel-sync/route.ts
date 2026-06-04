// src/app/api/sheets/excel-sync/route.ts
// Sync local DB data to the Excel file via the Python service

import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { userId, mbti, sessionId, eventType, eventData } = body

    // If userId + mbti provided, update user's MBTI in DB and sync to Excel
    if (userId && mbti) {
      const userResult = await sql`SELECT * FROM "User" WHERE id = ${userId} LIMIT 1`;
      const user = userResult[0];
      
      if (!user) {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }

      // Log the MBTI change event
      await sql`
        INSERT INTO "Event" (id, "userId", "eventType", "eventData", "sessionId")
        VALUES (${crypto.randomUUID()}, ${userId}, 'mbti_change', ${JSON.stringify({ mbti, previousMbti: user })}::jsonb, ${sessionId || null})
      `;

      // Sync to Excel via the Python service
      const excelRes = await fetch("http://127.0.0.1:8765/upsert/user", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          last_seen: new Date().toISOString(),
        }),
      }).catch(() => null)

      return NextResponse.json({
        success: true,
        message: `MBTI change logged for user ${userId}`,
        excelSync: excelRes?.ok || false,
      })
    }

    // If eventType provided, log event to Excel
    if (eventType && userId) {
      await sql`
        INSERT INTO "Event" (id, "userId", "eventType", "eventData", "sessionId")
        VALUES (${crypto.randomUUID()}, ${userId}, ${eventType}, ${JSON.stringify(eventData || {})}::jsonb, ${sessionId || null})
      `;

      await fetch("http://127.0.0.1:8765/append/event", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: userId,
          session_id: sessionId || "",
          event_type: eventType,
          event_value: eventData ? JSON.stringify(eventData) : "",
          timestamp: new Date().toISOString(),
        }),
      }).catch(() => null)

      return NextResponse.json({ success: true, message: "Event logged" })
    }

    return NextResponse.json({ error: "userId and mbti, or eventType required" }, { status: 400 })
  } catch (error: any) {
    console.error("Excel sync error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

// GET: check Excel service health and get summary
export async function GET() {
  try {
    const health = await fetch("http://127.0.0.1:8765/health").then(r => r.json()).catch(() => null)
    const summary = await fetch("http://127.0.0.1:8765/summary").then(r => r.json()).catch(() => null)

    return NextResponse.json({
      excelService: health ? "connected" : "disconnected",
      health,
      summary,
    })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
