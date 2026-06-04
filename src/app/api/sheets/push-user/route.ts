// src/app/api/sheets/push-user/route.ts
// Push user data to Excel file directly (works with current DB schema)
// Does sheet-sync fields -> Excel, core fields -> Neon DB

import { NextRequest, NextResponse } from "next/server"
import { sql } from "@/lib/db"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const {
      user_id, mbti_type, session_id,
      email, name, country, city, device_type, browser,
      referral_source, referral_csn, entry_tag,
      total_sessions, total_reports, total_revenue,
      subscription_active, opted_in_email,
      ...extra
    } = body

    if (!user_id) {
      return NextResponse.json({ error: "user_id required" }, { status: 400 })
    }

    // 1. Upsert user in Neon DB (only columns that exist: id, email, uid, plane_x, createdAt)
    try {
      await sql`
        INSERT INTO "User" (id, email, "createdAt")
        VALUES (${user_id}, ${email || null}, NOW())
        ON CONFLICT (id) DO UPDATE SET
          email = COALESCE(EXCLUDED.email, "User".email)
      `
    } catch (dbErr: any) {
      console.error("DB upsert warning:", dbErr.message)
      // Continue — Excel sync is the priority
    }

    // 2. Log MBTI change event to DB if possible
    if (mbti_type) {
      try {
        const eventId = `evt_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`
        await sql`
          INSERT INTO "Event" (id, "userId", "eventType", "eventData", "createdAt")
          VALUES (${eventId}, ${user_id}, 'mbti_change', ${JSON.stringify({ mbti: mbti_type })}, NOW())
        `
      } catch {
        // Event table might not have the right schema, skip silently
      }
    }

    // 3. Push to Excel via Python service — this is the main feature
    const now = new Date()
    const excelPayload: Record<string, any> = {
      user_id,
      first_seen: extra.first_seen || now.toISOString(),
      last_seen: now.toISOString(),
      email: email || "",
      name: name || "",
      country: country || "",
      city: city || "",
      device_type: device_type || "",
      browser: browser || "",
      referral_source: referral_source || "",
      referral_csn: referral_csn || "",
      entry_tag: entry_tag || "",
      total_sessions: total_sessions ?? 0,
      total_reports: total_reports ?? 0,
      total_revenue: total_revenue ?? 0,
      subscription_active: subscription_active ? "TRUE" : "FALSE",
      opted_in_email: opted_in_email ? "TRUE" : "FALSE",
    }

    const excelRes = await fetch("http://127.0.0.1:8765/upsert/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(excelPayload),
    }).catch((e) => {
      console.error("Excel push failed:", e.message)
      return null
    })

    return NextResponse.json({
      success: true,
      user_id,
      mbti_type: mbti_type || null,
      excelSynced: excelRes?.ok || false,
      timestamp: now.toISOString(),
    })
  } catch (error: any) {
    console.error("push-user error:", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
