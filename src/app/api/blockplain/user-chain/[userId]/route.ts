import { NextRequest, NextResponse } from 'next/server';
import { getUserChain } from '@/lib/blockplain';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId.' }, { status: 400 });
    }

    const chain = await getUserChain(userId);

    return NextResponse.json(chain, { status: 200 });
  } catch (e: any) {
    console.error('user-chain error:', e);
    return NextResponse.json(
      { error: e.message || 'Failed to fetch user chain.' },
      { status: 500 }
    );
  }
}
