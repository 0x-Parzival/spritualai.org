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
            SELECT * FROM blueprints WHERE csn = ${csn}
        `;

        if (!result || result.length === 0) {
            return NextResponse.json({ error: 'Blueprint not found' }, { status: 404 });
        }

        const blueprint = result[0];

        return NextResponse.json({ 
            success: true, 
            data: {
                csn: blueprint.csn,
                mbti: blueprint.mbti,
                archetype: blueprint.archetype,
                symbol: blueprint.symbol,
                createdAt: blueprint.created_at,
                report: blueprint.report_data,
                products: blueprint.products_data
            } 
        });
    } catch (e) {
        console.error('Fetch Blueprint Error:', e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
