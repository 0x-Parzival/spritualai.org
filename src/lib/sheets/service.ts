// src/lib/sheets/service.ts
// Google Sheets API integration for dynamic Excel sheet sync

const GOOGLE_SHEETS_API = 'https://sheets.googleapis.com/v4/spreadsheets';

interface SheetColumn {
  name: string;
  type: 'text' | 'number' | 'date' | 'bool' | 'enum';
  description: string;
}

// Column definitions matching the HTML schema exactly
export const SHEET_SCHEMAS: Record<string, SheetColumn[]> = {
  users: [
    { name: 'user_id', type: 'text', description: 'Unique browser-generated ID' },
    { name: 'first_seen', type: 'date', description: 'Timestamp of first ever visit' },
    { name: 'last_seen', type: 'date', description: 'Timestamp of most recent activity' },
    { name: 'email', type: 'text', description: 'Captured mid-conversation' },
    { name: 'name', type: 'text', description: 'First name if shared' },
    { name: 'country', type: 'text', description: 'Geolocated from IP' },
    { name: 'city', type: 'text', description: 'City-level location' },
    { name: 'device_type', type: 'enum', description: 'mobile / desktop / tablet' },
    { name: 'browser', type: 'text', description: 'Chrome / Safari / Firefox / Edge' },
    { name: 'referral_source', type: 'text', description: 'UTM source or referrer' },
    { name: 'referral_csn', type: 'text', description: 'CSN of shared blueprint that referred user' },
    { name: 'entry_tag', type: 'text', description: 'Emotion tag clicked first' },
    { name: 'total_sessions', type: 'number', description: 'Count of total conversation sessions' },
    { name: 'total_reports', type: 'number', description: 'Count of completed blueprints' },
    { name: 'total_revenue', type: 'number', description: 'Cumulative revenue' },
    { name: 'subscription_active', type: 'bool', description: 'TRUE if on Architect Sessions' },
    { name: 'opted_in_email', type: 'bool', description: 'TRUE if email captured' },
  ],
  sessions: [
    { name: 'session_id', type: 'text', description: 'Unique conversation ID' },
    { name: 'user_id', type: 'text', description: 'Foreign key to Users' },
    { name: 'started_at', type: 'date', description: 'First message timestamp' },
    { name: 'ended_at', type: 'date', description: 'Session end timestamp' },
    { name: 'duration_seconds', type: 'number', description: 'Total conversation time' },
    { name: 'exchange_count', type: 'number', description: 'Back-and-forth count' },
    { name: 'drop_off_exchange', type: 'number', description: 'Exchange where user abandoned' },
    { name: 'completion_status', type: 'enum', description: 'completed / abandoned / resumed / partial_reveal' },
    { name: 'entry_emotion_tag', type: 'text', description: 'Starting emotion tag' },
    { name: 'detected_emotions', type: 'text', description: 'Comma-separated emotions' },
    { name: 'dominant_emotion', type: 'text', description: 'Most frequent emotion' },
    { name: 'confidence_score_final', type: 'number', description: 'Final report confidence' },
    { name: 'trigger_reason', type: 'enum', description: 'Why report was generated' },
    { name: 'input_mode', type: 'enum', description: 'voice / text / mixed' },
    { name: 'report_generated', type: 'bool', description: 'TRUE if blueprint produced' },
    { name: 'email_captured_at_exchange', type: 'number', description: 'Exchange where email captured' },
    { name: 'raw_transcript_url', type: 'text', description: 'Link to full conversation' },
  ],
  reports: [
    { name: 'csn', type: 'text', description: 'Cosmic Serial Number' },
    { name: 'sequence_number', type: 'number', description: 'Auto-incrementing decode count' },
    { name: 'user_id', type: 'text', description: 'Foreign key to Users' },
    { name: 'session_id', type: 'text', description: 'Foreign key to Sessions' },
    { name: 'generated_at', type: 'date', description: 'Report creation timestamp' },
    { name: 'mbti_type', type: 'text', description: '4-letter MBTI type' },
    { name: 'mbti_confidence', type: 'number', description: 'MBTI inference confidence' },
    { name: 'consciousness_identity', type: 'text', description: 'Named architecture' },
    { name: 'archetype_symbol', type: 'text', description: 'Greek letter' },
    { name: 'core_pattern', type: 'text', description: 'Shadow pattern name' },
    { name: 'jungian_complex', type: 'text', description: 'Named complex' },
    { name: 'root_belief', type: 'text', description: 'Core false belief' },
    { name: 'root_age', type: 'number', description: 'Age when pattern installed' },
    { name: 'secondary_gain', type: 'text', description: 'What pattern gives user' },
    { name: 'spiritual_path', type: 'enum', description: 'Bhakti / Jnana / Karma / Raja' },
    { name: 'hawkins_level_current', type: 'number', description: 'Current consciousness level' },
    { name: 'hawkins_level_target', type: 'number', description: 'Next consciousness level' },
    { name: 'urgency_percent', type: 'number', description: '0-100 urgency score' },
    { name: 'dharma_phase', type: 'text', description: 'Current life stage' },
    { name: 'dob', type: 'date', description: 'Date of birth' },
    { name: 'birth_time_approx', type: 'text', description: 'morning / afternoon / evening / night' },
    { name: 'birth_place', type: 'text', description: 'Birth city/country' },
    { name: 'lagna_sign', type: 'text', description: 'Vedic Ascendant' },
    { name: 'moon_sign', type: 'text', description: 'Vedic Moon sign' },
    { name: 'current_dasha', type: 'text', description: 'Active planetary period' },
    { name: 'witness_level', type: 'enum', description: 'low / medium / high' },
    { name: 'report_url', type: 'text', description: 'Full permanent URL' },
    { name: 'times_shared', type: 'number', description: 'Share button clicks' },
    { name: 'referrals_generated', type: 'number', description: 'Users arrived via this URL' },
  ],
  products: [
    { name: 'transaction_id', type: 'text', description: 'Unique purchase ID' },
    { name: 'user_id', type: 'text', description: 'Foreign key to Users' },
    { name: 'csn', type: 'text', description: 'Linked blueprint CSN' },
    { name: 'purchased_at', type: 'date', description: 'Transaction timestamp' },
    { name: 'product_id', type: 'text', description: 'Product identifier' },
    { name: 'product_name', type: 'text', description: 'Product display name' },
    { name: 'layer', type: 'number', description: '1=free, 2=$37, 3=$97, 4=$147/mo' },
    { name: 'amount_usd', type: 'number', description: 'Purchase amount' },
    { name: 'payment_method', type: 'text', description: 'stripe / upi / paypal' },
    { name: 'mbti_at_purchase', type: 'text', description: 'User MBTI when purchased' },
    { name: 'days_from_report', type: 'number', description: 'Days between report and purchase' },
  ],
  events: [
    { name: 'event_id', type: 'text', description: 'Unique event ID' },
    { name: 'user_id', type: 'text', description: 'Foreign key to Users' },
    { name: 'session_id', type: 'text', description: 'Foreign key to Sessions' },
    { name: 'event_type', type: 'text', description: 'Type of event' },
    { name: 'event_data', type: 'text', description: 'JSON event details' },
    { name: 'created_at', type: 'date', description: 'Event timestamp' },
    { name: 'page_url', type: 'text', description: 'Page where event occurred' },
    { name: 'element_id', type: 'text', description: 'DOM element that triggered' },
  ],
};

export class SheetsService {
  private accessToken: string;

  constructor() {
    // In production, use OAuth2 service account
    // For now, use API key from env
    this.accessToken = process.env.GOOGLE_SHEETS_ACCESS_TOKEN || '';
  }

  // ---- Helper: Format value for Google Sheets ----
  private formatValue(value: any, type: string): any {
    if (value === null || value === undefined) return '';
    switch (type) {
      case 'date':
        if (value instanceof Date) return value.toISOString();
        return String(value);
      case 'bool':
        return value ? 'TRUE' : 'FALSE';
      case 'number':
        return typeof value === 'number' ? value : parseFloat(value) || 0;
      default:
        return String(value);
    }
  }

  // ---- Create a new spreadsheet with all 5 sheets ----
  async createSpreadsheet(title: string = 'Spiritual AI — Live Data'): Promise<string> {
    // This would use the Google Sheets API to create a new spreadsheet
    // For now, return the spreadsheet ID from env
    const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID;
    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEETS_SPREADSHEET_ID not set in environment');
    }
    return spreadsheetId;
  }

  // ---- Get or create headers for a sheet ----
  async ensureSheetHeaders(spreadsheetId: string, sheetType: string): Promise<void> {
    const columns = SHEET_SCHEMAS[sheetType];
    if (!columns) throw new Error(`Unknown sheet type: ${sheetType}`);

    const sheetName = this.getSheetName(sheetType);
    const headerRow = columns.map(c => c.name);

    // Write headers using Google Sheets API
    const range = `${sheetName}!A1:${String.fromCharCode(64 + columns.length)}1`;
    await this.writeRange(spreadsheetId, range, [headerRow]);
  }

  // ---- Write data to a specific range ----
  private async writeRange(spreadsheetId: string, range: string, values: any[][]): Promise<void> {
    const url = `${GOOGLE_SHEETS_API}/${spreadsheetId}/values/${range}?valueInputOption=USER_ENTERED`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets API error: ${err}`);
    }
  }

  // ---- Append rows to a sheet ----
  async appendRows(spreadsheetId: string, sheetType: string, rows: any[][]): Promise<void> {
    const columns = SHEET_SCHEMAS[sheetType];
    const sheetName = this.getSheetName(sheetType);

    // Format values according to column types
    const formattedRows = rows.map(row =>
      row.map((val, i) => this.formatValue(val, columns[i]?.type || 'text'))
    );

    const range = `${sheetName}!A:${String.fromCharCode(64 + columns.length)}`;
    const url = `${GOOGLE_SHEETS_API}/${spreadsheetId}/values/${range}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.accessToken}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ values: formattedRows }),
    });

    if (!res.ok) {
      const err = await res.text();
      throw new Error(`Sheets append error: ${err}`);
    }
  }

  // ---- Update a specific row (find by primary key) ----
  async updateRow(spreadsheetId: string, sheetType: string, primaryKey: string, data: Record<string, any>): Promise<void> {
    const columns = SHEET_SCHEMAS[sheetType];
    const sheetName = this.getSheetName(sheetType);

    // Find the row with the primary key
    const pkColumn = columns[0].name; // First column is always PK
    const pkColIndex = 0;

    // Read all data to find the row
    const readRange = `${sheetName}!A:Z`;
    const readUrl = `${GOOGLE_SHEETS_API}/${spreadsheetId}/values/${readRange}`;
    const readRes = await fetch(readUrl, {
      headers: { 'Authorization': `Bearer ${this.accessToken}` },
    });

    if (!readRes.ok) {
      throw new Error(`Cannot read sheet for update`);
    }

    const readData = await readRes.json();
    const rows = readData.values || [];

    // Find row index (skip header)
    let rowIndex = -1;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][pkColIndex] === primaryKey) {
        rowIndex = i;
        break;
      }
    }

    if (rowIndex === -1) {
      // Row not found, append it
      const newRow = columns.map(c => this.formatValue(data[c.name], c.type));
      await this.appendRows(spreadsheetId, sheetType, [newRow]);
      return;
    }

    // Build update row from data
    const updateRow = columns.map(c => {
      if (data[c.name] !== undefined) {
        return this.formatValue(data[c.name], c.type);
      }
      return rows[rowIndex][columns.indexOf(c)] || '';
    });

    const updateRange = `${sheetName}!A${rowIndex + 1}:${String.fromCharCode(64 + columns.length)}${rowIndex + 1}`;
    await this.writeRange(spreadsheetId, updateRange, [updateRow]);
  }

  // ---- Delete a row ----
  async deleteRow(spreadsheetId: string, sheetType: string, rowIndex: number): Promise<void> {
    // Google Sheets API delete requires sheet ID and row index
    // This is a simplified version
    const sheetName = this.getSheetName(sheetType);
    // Implementation would use batchUpdate API
    console.log(`Would delete row ${rowIndex + 2} from ${sheetName}`);
  }

  // ---- Helper: Get sheet tab name ----
  private getSheetName(sheetType: string): string {
    const names: Record<string, string> = {
      users: 'Users',
      sessions: 'Sessions',
      reports: 'Reports',
      products: 'Products',
      events: 'Events',
    };
    return names[sheetType] || sheetType;
  }

  // ---- Build sheet row from database entity ----

  buildUserRow(user: any): any[] {
    const columns = SHEET_SCHEMAS.users;
    return columns.map(c => {
      switch (c.name) {
        case 'user_id': return user.id;
        case 'first_seen': return user.createdAt;
        case 'last_seen': return user.lastSeen || user.updatedAt;
        case 'email': return user.email || '';
        case 'name': return user.name || '';
        case 'country': return user.country || '';
        case 'city': return user.city || '';
        case 'device_type': return user.deviceType || '';
        case 'browser': return user.browser || '';
        case 'referral_source': return user.referralSource || '';
        case 'referral_csn': return user.referralCsn || '';
        case 'entry_tag': return user.entryTag || '';
        case 'total_sessions': return user.totalSessions || 0;
        case 'total_reports': return user.totalReports || 0;
        case 'total_revenue': return user.totalRevenue || 0;
        case 'subscription_active': return user.subscriptionActive || false;
        case 'opted_in_email': return user.optedInEmail || false;
        default: return '';
      }
    });
  }

  buildSessionRow(session: any): any[] {
    const columns = SHEET_SCHEMAS.sessions;
    return columns.map(c => {
      switch (c.name) {
        case 'session_id': return session.id;
        case 'user_id': return session.userId;
        case 'started_at': return session.startedAt;
        case 'ended_at': return session.endedAt || '';
        case 'duration_seconds': return session.durationSeconds || '';
        case 'exchange_count': return session.exchangeCount || 0;
        case 'drop_off_exchange': return session.dropOffExchange || '';
        case 'completion_status': return session.completionStatus || '';
        case 'entry_emotion_tag': return session.entryEmotionTag || '';
        case 'detected_emotions': return session.detectedEmotions || '';
        case 'dominant_emotion': return session.dominantEmotion || '';
        case 'confidence_score_final': return session.confidenceScoreFinal || '';
        case 'trigger_reason': return session.triggerReason || '';
        case 'input_mode': return session.inputMode || 'text';
        case 'report_generated': return session.reportGenerated || false;
        case 'email_captured_at_exchange': return session.emailCapturedAtExchange || '';
        case 'raw_transcript_url': return session.rawTranscriptUrl || '';
        default: return '';
      }
    });
  }

  buildReportRow(bp: any): any[] {
    const columns = SHEET_SCHEMAS.reports;
    return columns.map(c => {
      switch (c.name) {
        case 'csn': return bp.csn;
        case 'sequence_number': return bp.sequenceNumber;
        case 'user_id': return bp.userId;
        case 'session_id': return bp.sessions?.[0]?.id || '';
        case 'generated_at': return bp.createdAt;
        case 'mbti_type': return bp.mbti;
        case 'mbti_confidence': return 85; // From report generation
        case 'consciousness_identity': return bp.consciousnessIdentity || '';
        case 'archetype_symbol': return bp.symbol || '';
        case 'core_pattern': return bp.corePattern || '';
        case 'jungian_complex': return bp.jungianComplex || '';
        case 'root_belief': return bp.rootBelief || '';
        case 'root_age': return bp.rootAge || '';
        case 'secondary_gain': return bp.secondaryGain || '';
        case 'spiritual_path': return bp.spiritualPath || '';
        case 'hawkins_level_current': return bp.hawkinsLevelCurrent || '';
        case 'hawkins_level_target': return bp.hawkinsLevelTarget || '';
        case 'urgency_percent': return bp.urgencyPercent || '';
        case 'dharma_phase': return bp.dharmaPhase || '';
        case 'dob': return bp.dob || '';
        case 'birth_time_approx': return bp.birthTimeApprox || '';
        case 'birth_place': return bp.birthPlace || '';
        case 'lagna_sign': return bp.lagnaSign || '';
        case 'moon_sign': return bp.moonSign || '';
        case 'current_dasha': return bp.currentDasha || '';
        case 'witness_level': return bp.witnessLevel || '';
        case 'report_url': return `https://spiritualai.store/blueprint/${bp.csn}`;
        case 'times_shared': return bp.timesShared || 0;
        case 'referrals_generated': return bp.referralsGenerated || 0;
        default: return '';
      }
    });
  }

  buildPurchaseRow(p: any): any[] {
    const columns = SHEET_SCHEMAS.products;
    return columns.map(c => {
      switch (c.name) {
        case 'transaction_id': return p.id;
        case 'user_id': return p.userId;
        case 'csn': return p.csn || '';
        case 'purchased_at': return p.purchasedAt;
        case 'product_id': return p.productId;
        case 'product_name': return p.productName;
        case 'layer': return p.layer || '';
        case 'amount_usd': return p.amount;
        case 'payment_method': return p.paymentMethod || '';
        case 'mbti_at_purchase': return p.mbtiAtPurchase || '';
        case 'days_from_report': return p.daysFromReport || '';
        default: return '';
      }
    });
  }

  buildEventRow(e: any): any[] {
    const columns = SHEET_SCHEMAS.events;
    return columns.map(c => {
      switch (c.name) {
        case 'event_id': return e.id;
        case 'user_id': return e.userId;
        case 'session_id': return e.sessionId || '';
        case 'event_type': return e.eventType;
        case 'event_data': return JSON.stringify(e.eventData || {});
        case 'created_at': return e.createdAt;
        case 'page_url': return e.pageUrl || '';
        case 'element_id': return e.elementId || '';
        default: return '';
      }
    });
  }
}

// Singleton
export const sheetsService = new SheetsService();
