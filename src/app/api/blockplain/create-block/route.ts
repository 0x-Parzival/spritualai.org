import { NextRequest, NextResponse } from 'next/server';
import { createBlock } from '@/lib/blockplain';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { userId, mbti, archetype, reportData } = body;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId.' }, { status: 400 });
    }
    if (!mbti || typeof mbti !== 'string' || mbti.length !== 4) {
      return NextResponse.json(
        { error: 'Invalid mbti. Must be a 4-character string (e.g. "INTJ").' },
        { status: 400 }
      );
    }
    if (!archetype || typeof archetype !== 'string') {
      return NextResponse.json(
        { error: 'Missing archetype.' },
        { status: 400 }
      );
    }
    if (!reportData || typeof reportData !== 'object') {
      return NextResponse.json(
        { error: 'Missing or invalid reportData.' },
        { status: 400 }
      );
    }

    const blueprint = await createBlock({ userId, mbti, archetype, reportData });

    return NextResponse.json(
      {
        csn: blueprint.csn,
        plane_x: blueprint.plane_x,
        plane_y: blueprint.plane_y,
        sequenceNumber: blueprint.sequenceNumber,
        verifyCode: blueprint.verifyCode,
      },
      { status: 201 }
    );
  } catch (e: any) {
    console.error('create-block error:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to create block.' },
      { status: 500 }
    );
  }
}
