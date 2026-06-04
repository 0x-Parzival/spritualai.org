import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { sql } from '@/lib/db';

/**
 * POST /api/blueprint/feedback
 * Submit additional feedback/message from the user about their blueprint
 */
export async function POST(req: NextRequest) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Authentication required' }, { status: 401 });
    }

    const body = await req.json();
    const { csn, message } = body;

    if (!csn || typeof csn !== 'string') {
      return NextResponse.json({ error: 'CSN is required' }, { status: 400 });
    }

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    // Verify the blueprint belongs to this user
    const blueprints = await sql`SELECT csn FROM "Blueprint" WHERE csn = ${csn} AND "userId" = ${userId} LIMIT 1`;

    if (!blueprints || blueprints.length === 0) {
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
    }

    // Store the feedback as an event
    await sql`
      INSERT INTO "Event" (id, "userId", "eventType", "eventData")
      VALUES (${crypto.randomUUID()}, ${userId}, 'blueprint_feedback', ${JSON.stringify({ csn, message: message.trim() })}::jsonb)
    `;

    // Also update the session summary if a session exists
    const sessions = await sql`
      SELECT id FROM "Session" 
      WHERE "blueprintCsn" = ${csn} 
      ORDER BY "lastActiveAt" DESC 
      LIMIT 1
    `;

    if (sessions && sessions.length > 0) {
      await sql`
        UPDATE "Session"
        SET "newProblemFound" = ${message.trim().slice(0, 200)}
        WHERE id = ${sessions[0].id}
      `;
    }

    return NextResponse.json({ success: true, message: 'Feedback recorded' });
  } catch (error: any) {
    console.error('Blueprint feedback error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to save feedback' },
      { status: 500 }
    );
  }
}
