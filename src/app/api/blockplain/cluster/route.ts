import { NextRequest, NextResponse } from 'next/server';
import { getCluster } from '@/lib/blockplain';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);

    const mbti = searchParams.get('mbti') || undefined;
    const archetype = searchParams.get('archetype') || undefined;
    const planeY = searchParams.get('plane_y');
    const plane_y = planeY ? parseInt(planeY, 10) : undefined;

    if (planeY && (isNaN(plane_y as number) || plane_y! < 1)) {
      return NextResponse.json(
        { error: 'plane_y must be a positive integer.' },
        { status: 400 }
      );
    }

    const results = await getCluster({
      mbti,
      archetype,
      plane_y,
    });

    return NextResponse.json(results, { status: 200 });
  } catch (e: any) {
    console.error('cluster error:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to fetch cluster.' },
      { status: 500 }
    );
  }
}
