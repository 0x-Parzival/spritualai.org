import { NextRequest, NextResponse } from 'next/server';
import { getBlock, verifyBlock } from '@/lib/blockplain';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const csn = searchParams.get('csn');
    const verifyCode = searchParams.get('code');

    if (!csn && !verifyCode) {
      return NextResponse.json(
        { error: 'Provide a CSN (?csn=...) or verification code (?code=...)' },
        { status: 400 }
      );
    }

    if (csn) {
      const result = await getBlock(csn);
      if (!result) {
        return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
      }
      const reportData = result.reportData as any;
      return NextResponse.json({
        success: true,
        data: {
          csn: result.csn,
          verifyCode: result.verifyCode,
          sequenceNumber: result.sequenceNumber,
          planeX: result.plane_x,
          planeY: result.plane_y,
          mbti: result.mbti,
          archetype: result.archetype,
          symbol: result.symbol,
          report: reportData?.report || {},
          products: reportData?.products || [],
          metadata: {
            patternName: reportData?.patternName || '',
            gender: reportData?.gender || 'unknown',
            birthDate: reportData?.birthDate || null,
            hawkinsLevel: reportData?.hawkinsLevel || 0,
            problem: reportData?.problem || '',
            shadow: reportData?.shadow || '',
          },
          createdAt: result.createdAt,
          isComplete: result.isComplete,
        },
      });
    }

    if (verifyCode) {
      const result = await verifyBlock(verifyCode);
      if (!result.valid || !result.blueprint) {
        return NextResponse.json({ error: 'Invalid verification code' }, { status: 404 });
      }
      const bp = result.blueprint;
      const reportData = bp.reportData as any;
      return NextResponse.json({
        success: true,
        data: {
          csn: bp.csn,
          verifyCode: bp.verifyCode,
          mbti: bp.mbti,
          archetype: bp.archetype,
          symbol: bp.symbol,
          report: reportData?.report || {},
          products: reportData?.products || [],
          createdAt: bp.createdAt,
        },
      });
    }

    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  } catch (error: any) {
    console.error('Blockplain fetch error:', error);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch blueprint' },
      { status: 500 }
    );
  }
}
