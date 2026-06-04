// src/app/api/sheets/excel-sync/route.ts
// Sync local DB data to the Excel file via the Python service

import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}))
    const { userId, mbti, sessionId, eventType, eventData } = body

    // If userId + mbti provided, update user's MBTI in DB and sync to Excel
    if (userId && mbti) {
      const user = await prisma.user.update({
        where: { id: userId },
        data: { /* MBTI is stored on Blueprint, not User directly */ },
      })

      // Log the MBTI change event
      await prisma.event.create({
        data: {
          userId,
          eventType: "mbti_change",
          eventData: { mbti, previousMbti: user },
          sessionId: sessionId || null,
        },
      })

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
      await prisma.event.create({
        data: {
          userId,
          eventType,
          eventData: eventData || {},
          sessionId: sessionId || null,
        },
      })

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
