// src/app/api/sheets/push/route.ts
// Push data to Google Sheets. Called by sync triggers.

import { NextRequest, NextResponse } from 'next/server';
import { sheetsService } from '@/lib/sheets/service';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { sheetType, rows, mode = 'append' } = body;

    if (!sheetType || !rows || !Array.isArray(rows)) {
      return NextResponse.json({ error: 'sheetType and rows[] required' }, { status: 400 });
    }

    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      return NextResponse.json({ error: 'GOOGLE_SHEETS_SPREADSHEET_ID not set' }, { status: 500 });
    }

    if (mode === 'append') {
      await sheetsService.appendRows(spreadsheetId, sheetType, rows);
    } else if (mode === 'update') {
      const { primaryKey, data } = body;
      if (!primaryKey) {
        return NextResponse.json({ error: 'primaryKey required for update mode' }, { status: 400 });
      }
      await sheetsService.updateRow(spreadsheetId, sheetType, primaryKey, data);
    }

    return NextResponse.json({
      success: true,
      sheetType,
      rowsProcessed: rows.length,
      mode,
    });
  } catch (error: any) {
    console.error('Sheets push error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
