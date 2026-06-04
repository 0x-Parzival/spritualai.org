// src/app/api/sheets/sync/route.ts
// Full sync: push all pending changes from DB to Google Sheets

import { NextRequest, NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { sheetsService } from '@/lib/sheets/service';

export async function POST(req: NextRequest) {
  try {
    const { sheetType, batchSize = 100 } = await req.json().catch(() => ({}));
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;

    if (!spreadsheetId) {
      return NextResponse.json({ error: 'GOOGLE_SHEETS_SPREADSHEET_ID not set' }, { status: 500 });
    }

    const typesToSync = sheetType ? [sheetType] : ['users', 'sessions', 'reports', 'products', 'events'];
    const results: Record<string, any> = {};

    for (const type of typesToSync) {
      try {
        let count = 0;

        switch (type) {
          case 'users': {
            const users = await sql`
              SELECT * FROM "User"
              ORDER BY "updatedAt" DESC
              LIMIT ${batchSize}
            `;
            const rows = users.map(u => sheetsService.buildUserRow(u));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'users', rows);
            }
            count = rows.length;
            break;
          }
          case 'sessions': {
            const sessions = await sql`
              SELECT s.*, b.csn as "blueprint_csn"
              FROM "Session" s
              LEFT JOIN "Blueprint" b ON s."blueprintCsn" = b.csn
              ORDER BY s."startedAt" DESC
              LIMIT ${batchSize}
            `;
            // Map the flat row to the expected structure for buildSessionRow
            const rows = sessions.map((s: any) => sheetsService.buildSessionRow({
              ...s,
              blueprint: s.blueprint_csn ? { csn: s.blueprint_csn } : null
            }));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'sessions', rows);
            }
            count = rows.length;
            break;
          }
          case 'reports': {
            const blueprints = await sql`
              SELECT * FROM "Blueprint"
              ORDER BY "createdAt" DESC
              LIMIT ${batchSize}
            `;
            const rows = blueprints.map(bp => sheetsService.buildReportRow(bp));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'reports', rows);
            }
            count = rows.length;
            break;
          }
          case 'products': {
            const purchases = await sql`
              SELECT * FROM "Purchase"
              ORDER BY "purchasedAt" DESC
              LIMIT ${batchSize}
            `;
            const rows = purchases.map(p => sheetsService.buildPurchaseRow(p));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'products', rows);
            }
            count = rows.length;
            break;
          }
          case 'events': {
            const events = await sql`
              SELECT * FROM "Event"
              ORDER BY "createdAt" DESC
              LIMIT ${batchSize}
            `;
            const rows = events.map(e => sheetsService.buildEventRow(e));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'events', rows);
            }
            count = rows.length;
            break;
          }
        }

        results[type] = { synced: count };
      } catch (e: any) {
        results[type] = { error: e.message };
      }
    }

    return NextResponse.json({ success: true, results });
  } catch (error: any) {
    console.error('Sheets sync error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
