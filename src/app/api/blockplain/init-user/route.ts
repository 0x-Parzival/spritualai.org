import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
    const existing = await prisma.user.findUnique({ where: { uid } });
    if (existing) {
      return NextResponse.json(
        {
          userId: existing.id,
          plane_x: existing.plane_x,
          uid: existing.uid,
          message: 'User already exists.',
        },
        { status: 200 }
      );
    }

    // Create user and assign plane_x atomically
    const user = await prisma.user.create({
      data: {
        uid,
        email: email || null,
        plane_x: 0, // temporary, will be overwritten by assignPlaneX
      },
    });

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
