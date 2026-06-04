// src/app/api/sheets/sync/route.ts
// Full sync: push all pending changes from DB to Google Sheets

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
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
            const users = await prisma.user.findMany({
              take: batchSize,
              orderBy: { updatedAt: 'desc' },
            });
            const rows = users.map(u => sheetsService.buildUserRow(u));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'users', rows);
            }
            count = rows.length;
            break;
          }
          case 'sessions': {
            const sessions = await prisma.session.findMany({
              take: batchSize,
              orderBy: { startedAt: 'desc' },
              include: { blueprint: { select: { csn: true } } },
            });
            const rows = sessions.map(s => sheetsService.buildSessionRow(s));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'sessions', rows);
            }
            count = rows.length;
            break;
          }
          case 'reports': {
            const blueprints = await prisma.blueprint.findMany({
              take: batchSize,
              orderBy: { createdAt: 'desc' },
              include: { sessions: { select: { id: true }, take: 1 } },
            });
            const rows = blueprints.map(bp => sheetsService.buildReportRow(bp));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'reports', rows);
            }
            count = rows.length;
            break;
          }
          case 'products': {
            const purchases = await prisma.purchase.findMany({
              take: batchSize,
              orderBy: { purchasedAt: 'desc' },
            });
            const rows = purchases.map(p => sheetsService.buildPurchaseRow(p));
            if (rows.length > 0) {
              await sheetsService.appendRows(spreadsheetId, 'products', rows);
            }
            count = rows.length;
            break;
          }
          case 'events': {
            const events = await prisma.event.findMany({
              take: batchSize,
              orderBy: { createdAt: 'desc' },
            });
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
