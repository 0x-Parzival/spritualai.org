import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ code: string }> }
) {
    try {
        const { code } = await params;

        // Fetch blueprint by Verify Code OR CSN
        const result = await sql`
            SELECT * FROM "Blueprint" WHERE "verifyCode" = ${code.toUpperCase()} OR csn = ${code}
        `;

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'Verification failed' }, { status: 404 });
        }

        const blueprint = result[0];

        return NextResponse.json({ 
            success: true, 
            data: {
                csn: blueprint.csn,
                mbti: blueprint.mbti,
                archetype: blueprint.archetype,
                createdAt: blueprint.createdAt,
                patternName: blueprint.reportData?.report?.header?.patternName || blueprint.reportData?.header?.patternName || "The Pattern"
            } 
        });
    } catch (e) {
        console.error('Verify Blueprint Error:', e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
