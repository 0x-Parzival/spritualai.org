// src/app/api/sheets/init/route.ts
// Initialize all 5 sheets with headers in a Google Spreadsheet

import { NextResponse } from 'next/server';
import { sheetsService } from '@/lib/sheets/service';

export async function POST() {
  try {
    const spreadsheetId = await sheetsService.createSpreadsheet();
    const results: Record<string, string> = {};

    for (const sheetType of ['users', 'sessions', 'reports', 'products', 'events']) {
      try {
        await sheetsService.ensureSheetHeaders(spreadsheetId, sheetType);
        results[sheetType] = '✅ headers created';
      } catch (e: any) {
        results[sheetType] = `❌ ${e.message}`;
      }
    }

    return NextResponse.json({
      success: true,
      spreadsheetId,
      results,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
