import { NextRequest, NextResponse } from 'next/server';
import { SynthesisManager } from '@/lib/synthesis/SynthesisManager';

export async function POST(req: NextRequest) {
  try {
    const { userProfile } = await req.json();

    if (!userProfile) {
      return NextResponse.json({ error: 'User profile is required' }, { status: 400 });
    }

    // Trigger the high-speed synthesis machine
    const product = await SynthesisManager.synthesize(userProfile);

    return NextResponse.json({
      success: true,
      product
    });

  } catch (error: any) {
    console.error('Synthesis API Error:', error);
    return NextResponse.json({ 
      success: false, 
      error: error.message || 'Failed to synthesize product' 
    }, { status: 500 });
  }
}
