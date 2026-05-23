import { NextRequest, NextResponse } from 'next/server';
import { verifyBlock } from '@/lib/blockplain';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ verifyCode: string }> }
) {
  try {
    const { verifyCode } = await params;

    if (!verifyCode || verifyCode.length !== 4) {
      return NextResponse.json(
        { valid: false, error: 'Invalid verify code format.' },
        { status: 400 }
      );
    }

    const result = await verifyBlock(verifyCode);

    if (!result.valid) {
      return NextResponse.json({ valid: false }, { status: 404 });
    }

    return NextResponse.json(
      {
        valid: true,
        blueprint: {
          csn: result.blueprint!.csn,
          mbti: result.blueprint!.mbti,
          archetype: result.blueprint!.archetype,
          symbol: result.blueprint!.symbol,
          plane_x: result.blueprint!.plane_x,
          plane_y: result.blueprint!.plane_y,
          isComplete: result.blueprint!.isComplete,
          createdAt: result.blueprint!.createdAt,
        },
      },
      { status: 200 }
    );
  } catch (e: any) {
    console.error('verify error:', e);
    return NextResponse.json(
      { valid: false, error: e.message || 'Verification failed.' },
      { status: 500 }
    );
  }
}
