import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { assignPlaneX } from '@/lib/blockplain';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { uid, email } = body;

    if (!uid || typeof uid !== 'string' || uid.length < 8) {
      return NextResponse.json(
        { error: 'Invalid or missing uid. Must be at least 8 characters.' },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existing = await sql`SELECT id, plane_x, uid FROM "User" WHERE uid = ${uid} LIMIT 1`;
    if (existing && existing.length > 0) {
      const user = existing[0];
      return NextResponse.json(
        {
          userId: user.id,
          plane_x: user.plane_x,
          uid: user.uid,
          message: 'User already exists.',
        },
        { status: 200 }
      );
    }

    // Create user and assign plane_x atomically
    const id = crypto.randomUUID();
    const newUserResult = await sql`
      INSERT INTO "User" (id, uid, email, plane_x)
      VALUES (${id}, ${uid}, ${email || null}, 0)
      RETURNING id, uid, plane_x
    `;
    const user = newUserResult[0];

    const plane_x = await assignPlaneX(user.id);

    return NextResponse.json(
      {
        userId: user.id,
        plane_x,
        uid: user.uid,
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.error('init-user error:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to initialize user.' },
      { status: 500 }
    );
  }
}
