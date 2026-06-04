// src/lib/sheets/frontend-sync.ts
// Client-side helper to sync user data to Excel
// Call these from the browser when user actions happen

const API = "/api/sheets/push-user"

export async function pushToSheets(data: {
  user_id: string
  mbti_type?: string
  email?: string
  name?: string
  country?: string
  device_type?: string
  browser?: string
  referral_source?: string
  total_sessions?: number
  total_reports?: number
  total_revenue?: number
  subscription_active?: boolean
  opted_in_email?: boolean
  [key: string]: any
}) {
  try {
    const res = await fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch (e: any) {
    console.error("[frontend-sync] failed:", e.message)
    return null
  }
}

/**
 * Call when user's personality type is determined or changes.
 * This is the key function for the MBTI change -> Excel sync.
 */
export async function syncMBTIChange(userId: string, newMbti: string, prevMbti?: string) {
  return pushToSheets({
    user_id: userId,
    mbti_type: newMbti,
    event_type: "mbti_change",
    event_data: { from: prevMbti, to: newMbti },
  })
}

/**
 * Call when user session starts.
 */
export async function syncSessionStart(userId: string, sessionId: string, emotionTag?: string) {
  return pushToSheets({
    user_id: userId,
    session_id: sessionId,
    entry_tag: emotionTag || "",
    total_sessions: 1,  // Will be incremented server-side
  })
}

/**
 * Call when email is captured.
 */
export async function syncEmailCapture(userId: string, email: string) {
  return pushToSheets({
    user_id: userId,
    email,
    opted_in_email: true,
  })
}
