import { NextRequest, NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { sql } from '@/lib/db';

export async function GET(req: NextRequest) {
    try {
        const { userId } = await auth();
        if (!userId) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const data = await sql`
            SELECT id, session_id, report_json, products_json, created_at 
            FROM reports 
            WHERE session_id = ${userId} 
            ORDER BY created_at DESC
        `;

        return NextResponse.json({ success: true, data });
    } catch (e) {
        console.error('List Reports Error:', e);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
