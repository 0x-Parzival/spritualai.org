import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(
    req: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id: csn } = await params;

        // Fetch blueprint by CSN
        const result = await sql`
            SELECT * FROM "Blueprint" WHERE csn = ${csn}
        `;

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
        }

        const blueprint = result[0];
        const reportDataRaw = blueprint.reportData || blueprint.report_data;
        const reportData = typeof reportDataRaw === 'string' 
            ? JSON.parse(reportDataRaw) 
            : reportDataRaw;

        if (!reportData) {
             return NextResponse.json({ error: 'Report data missing' }, { status: 404 });
        }

        return NextResponse.json({ 
            success: true, 
            data: {
                csn: blueprint.csn,
                mbti: blueprint.mbti,
                archetype: blueprint.archetype,
                symbol: blueprint.symbol,
                createdAt: blueprint.createdAt || blueprint.created_at,
                report: reportData.report || reportData, // Fallback to whole object if not nested
                products: reportData.products || blueprint.products_data || []
            } 
        });
    } catch (e) {
        console.error('Fetch Blueprint Error:', e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
