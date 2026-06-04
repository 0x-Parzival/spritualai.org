// src/app/api/user/profile/route.ts
// Get current user's full profile data

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { sql } from "@/lib/db";

export async function GET() {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get user from our DB
    const userResult = await sql`
      SELECT id, email, "createdAt", uid, "plane_x"
      FROM "User" WHERE id = ${userId}
    `;
    const dbUser = userResult?.[0] || null;

    // Get user's blueprints
    const blueprints = await sql`
      SELECT csn, mbti, symbol, archetype, "createdAt"
      FROM "Blueprint"
      WHERE "userId" = ${userId}
      ORDER BY "createdAt" DESC
    `;

    // Get user's purchases
    const purchases = await sql`
      SELECT id, "productName", amount, currency, status, "purchasedAt", "productType"
      FROM "Purchase"
      WHERE "userId" = ${userId}
      ORDER BY "purchasedAt" DESC
    `;

    // Get user's sessions
    const sessions = await sql`
      SELECT id, "startedAt", "exchangeCount", "completionStatus", "reportGenerated"
      FROM "Session"
      WHERE "userId" = ${userId}
      ORDER BY "startedAt" DESC
      LIMIT 20
    `;

    // Get user's summary (evolving identifiers + narrative)
    const summaryResult = await sql`
      SELECT narrative, identifiers, "totalSessions", "lastEngagementScore", "suggestedNextTopic", "unexploredAreas", "problemsExplored", "firstBlueprintCsn", "lastBlueprintCsn", "purchaseCount", "totalSpent", "updatedAt"
      FROM "UserSummary" WHERE "userId" = ${userId}
    `;
    const summary = summaryResult?.[0] || null;

    // Stats
    const totalRevenue = purchases?.reduce((a: number, p: any) => a + (p.status === "completed" ? Number(p.amount) || 0 : 0), 0) || 0;
    const completedSessions = sessions?.filter((s: any) => s.completionStatus === "completed").length || 0;

    return NextResponse.json({
      success: true,
      user: dbUser,
      blueprints: blueprints || [],
      purchases: purchases || [],
      sessions: sessions || [],
      summary,
      stats: {
        totalBlueprints: blueprints?.length || 0,
        totalPurchases: purchases?.length || 0,
        totalRevenue,
        totalSessions: sessions?.length || 0,
        completedSessions,
      },
    });
  } catch (e: any) {
    console.error("Profile API error:", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
