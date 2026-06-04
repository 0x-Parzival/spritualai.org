import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

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
    const blueprint = await prisma.blueprint.findFirst({
      where: { csn, userId },
    });

    if (!blueprint) {
      return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
    }

    // Store the feedback as an event
    await prisma.event.create({
      data: {
        userId,
        eventType: 'blueprint_feedback',
        eventData: { csn, message: message.trim() },
      },
    });

    // Also update the session summary if a session exists
    const session = await prisma.session.findFirst({
      where: { blueprintCsn: csn },
      orderBy: { lastActiveAt: 'desc' },
    });

    if (session) {
      await prisma.session.update({
        where: { id: session.id },
        data: {
          newProblemFound: message.trim().slice(0, 200),
        },
      });
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
