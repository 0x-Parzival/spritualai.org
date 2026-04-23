import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { sql } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Missing ID' }, { status: 400 });
        }

        const data = await sql`
            SELECT * FROM reports 
            WHERE id = ${id} AND session_id = ${userId}
            LIMIT 1
        `;

        if (!data || data.length === 0) {
            return NextResponse.json({ error: 'Report not found' }, { status: 404 });
        }

        const report = data[0];
        
        // Construct a UserState-like object for the frontend
        const responseData = {
            confirmedMBTI: report.report_json?.architecture || "Seeker",
            detectedPattern: report.report_json?.patternName || "The Pattern",
            report: report.report_json,
            recommendedProducts: report.products_json || []
        };

        return NextResponse.json({ success: true, data: responseData });
    } catch (e) {
        console.error('Fetch Report Error:', e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
