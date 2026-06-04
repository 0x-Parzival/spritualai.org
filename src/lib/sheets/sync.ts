// src/lib/sheets/sync.ts
// High-level sync functions: Prisma DB + local Excel file
// Call these after DB mutations to keep the Excel sheet in sync.

import { prisma } from "@/lib/prisma"
import { excelClient } from "@/lib/sheets/excel-client"

/**
 * Sync a user to Excel (upsert).
 * Pass partial data to update, or auto-fetches from DB if only userId given.
 */
export async function syncUserToExcel(userId: string, overrides: Record<string, any> = {}) {
  try {
    let user: any
    if (Object.keys(overrides).length <= 1) {
      // Fetch fresh from DB
      user = await prisma.user.findUnique({ where: { id: userId } })
    } else {
      // Build from overrides + minimal DB fetch
      const dbUser = await prisma.user.findUnique({ where: { id: userId } })
      user = { ...dbUser, ...overrides }
    }
    if (!user) return

    await excelClient.upsertUser({
      user_id: user.id,
      first_seen: user.createdAt,
      last_seen: user.lastSeen || user.updatedAt,
      email: user.email || "",
      name: user.name || "",
      country: user.country || "",
      city: user.city || "",
      device_type: user.deviceType || "",
      browser: user.browser || "",
      referral_source: user.referralSource || "",
      referral_csn: user.referralCsn || "",
      entry_tag: user.entryTag || "",
      total_sessions: user.totalSessions || 0,
      total_reports: user.totalReports || 0,
      total_revenue: user.totalRevenue || 0,
      subscription_active: user.subscriptionActive ? "TRUE" : "FALSE",
      opted_in_email: user.optedInEmail ? "TRUE" : "FALSE",
      ...overrides,
    })
  } catch (e: any) {
    console.error("[syncUserToExcel]", e.message)
  }
}

/**
 * Sync a session to Excel (upsert).
 */
export async function syncSessionToExcel(sessionId: string, overrides: Record<string, any> = {}) {
  try {
    let session: any
    if (Object.keys(overrides).length <= 1) {
      session = await prisma.session.findUnique({
        where: { id: sessionId },
        include: { blueprint: { select: { csn: true } } },
      })
    } else {
      const dbSession = await prisma.session.findUnique({ where: { id: sessionId } })
      session = { ...dbSession, ...overrides }
    }
    if (!session) return

    await excelClient.upsertSession({
      session_id: session.id,
      user_id: session.userId,
      started_at: session.startedAt,
      ended_at: session.endedAt || "",
      duration_seconds: session.durationSeconds || 0,
      exchange_count: session.exchangeCount || 0,
      drop_off_exchange: session.dropOffExchange || "",
      completion_status: session.completionStatus || "in_progress",
      entry_emotion_tag: session.entryEmotionTag || "",
      detected_emotions: session.detectedEmotions || "",
      dominant_emotion: session.dominantEmotion || "",
      confidence_score_final: session.confidenceScoreFinal || "",
      trigger_reason: session.triggerReason || "",
      input_mode: session.inputMode || "text",
      report_generated: session.reportGenerated ? "TRUE" : "FALSE",
      email_captured_at_exchange: session.emailCapturedAtExchange || "",
      raw_transcript_url: session.rawTranscriptUrl || "",
      ...overrides,
    })
  } catch (e: any) {
    console.error("[syncSessionToExcel]", e.message)
  }
}

/**
 * Sync a blueprint/report to Excel (upsert).
 */
export async function syncReportToExcel(csn: string, overrides: Record<string, any> = {}) {
  try {
    let bp: any
    if (Object.keys(overrides).length <= 1) {
      bp = await prisma.blueprint.findUnique({
        where: { csn },
        include: { sessions: { select: { id: true }, take: 1 } },
      })
    } else {
      const dbBp = await prisma.blueprint.findUnique({ where: { csn } })
      bp = { ...dbBp, ...overrides }
    }
    if (!bp) return

    await excelClient.upsertReport({
      csn: bp.csn,
      sequence_number: bp.sequenceNumber,
      user_id: bp.userId,
      session_id: bp.sessions?.[0]?.id || "",
      generated_at: bp.createdAt,
      mbti_type: bp.mbti,
      mbti_confidence: 85,
      consciousness_identity: bp.consciousnessIdentity || "",
      archetype_symbol: bp.symbol || "",
      core_pattern: bp.corePattern || "",
      jungian_complex: bp.jungianComplex || "",
      root_belief: bp.rootBelief || "",
      root_age: bp.rootAge || "",
      secondary_gain: bp.secondaryGain || "",
      spiritual_path: bp.spiritualPath || "",
      hawkins_level_current: bp.hawkinsLevelCurrent || "",
      hawkins_level_target: bp.hawkinsLevelTarget || "",
      urgency_percent: bp.urgencyPercent || "",
      dharma_phase: bp.dharmaPhase || "",
      dob: bp.dob || "",
      birth_time_approx: bp.birthTimeApprox || "",
      birth_place: bp.birthPlace || "",
      lagna_sign: bp.lagnaSign || "",
      moon_sign: bp.moonSign || "",
      current_dasha: bp.currentDasha || "",
      witness_level: bp.witnessLevel || "",
      report_url: `https://spiritualai.store/blueprint/${bp.csn}`,
      times_shared: bp.timesShared || 0,
      referrals_generated: bp.referralsGenerated || 0,
      ...overrides,
    })
  } catch (e: any) {
    console.error("[syncReportToExcel]", e.message)
  }
}

/**
 * Append an event to Excel.
 */
export async function syncEventToExcel(event: {
  user_id: string
  session_id?: string
  event_type: string
  exchange_number?: string
  event_value?: string
  confidence?: string
  emotion?: string
}) {
  try {
    await excelClient.appendEvent(event)
  } catch (e: any) {
    console.error("[syncEventToExcel]", e.message)
  }
}

/**
 * Append a product purchase to Excel.
 */
export async function syncPurchaseToExcel(data: Record<string, any>) {
  try {
    await excelClient.appendProduct(data)
  } catch (e: any) {
    console.error("[syncPurchaseToExcel]", e.message)
  }
}

/**
 * Full sync: send all DB data to Excel.
 */
export async function fullSyncToExcel(batchSize = 100) {
  const results: Record<string, any> = {}

  try {
    // Users
    const users = await prisma.user.findMany({ take: batchSize, orderBy: { updatedAt: "desc" } })
    for (const u of users) {
      await syncUserToExcel(u.id)
    }
    results.users = users.length

    // Sessions
    const sessions = await prisma.session.findMany({ take: batchSize, orderBy: { startedAt: "desc" } })
    for (const s of sessions) {
      await syncSessionToExcel(s.id)
    }
    results.sessions = sessions.length

    // Reports
    const blueprints = await prisma.blueprint.findMany({
      take: batchSize,
      orderBy: { createdAt: "desc" },
      include: { sessions: { select: { id: true }, take: 1 } },
    })
    for (const bp of blueprints) {
      await syncReportToExcel(bp.csn)
    }
    results.reports = blueprints.length

    // Products
    const purchases = await prisma.purchase.findMany({ take: batchSize, orderBy: { purchasedAt: "desc" } })
    results.products = purchases.length

    // Events
    const events = await prisma.event.findMany({ take: batchSize, orderBy: { createdAt: "desc" } })
    for (const e of events) {
      await syncEventToExcel({
        user_id: e.userId,
        session_id: e.sessionId || "",
        event_type: e.eventType,
        event_value: JSON.stringify(e.eventData || {}),
      })
    }
    results.events = events.length
  } catch (e: any) {
    results.error = e.message
  }

  return results
}
