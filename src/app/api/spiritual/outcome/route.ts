import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      sessionId, 
      patternName, 
      mbtiType, 
      interventionPath, 
      successRating, 
      userNarrative,
      shiftDetected 
    } = body;

    // Direct SQL insert using Neon
    await sql`
      INSERT INTO outcomes (
        session_id, 
        pattern_name, 
        mbti_type, 
        intervention_path, 
        success_rating, 
        user_narrative,
        shift_detected
      ) VALUES (
        ${sessionId}, 
        ${patternName}, 
        ${mbtiType}, 
        ${interventionPath}, 
        ${successRating}, 
        ${userNarrative},
        ${shiftDetected}
      )
    `;

    return NextResponse.json({ success: true, message: 'Outcome recorded via Neon' });
  } catch (err: any) {
    console.error('Neon Outcome recording error:', err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
