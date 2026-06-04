// src/lib/sheets/excel-client.ts
// Client to talk to the local Python Excel service

const EXCEL_SERVICE_URL = process.env.EXCEL_SERVICE_URL || "http://127.0.0.1:8765"

async function post(path: string, data: any): Promise<any> {
  try {
    const res = await fetch(`${EXCEL_SERVICE_URL}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    return await res.json()
  } catch (e: any) {
    console.error(`[ExcelClient] POST ${path} failed:`, e.message)
    return null
  }
}

async function get(path: string): Promise<any> {
  try {
    const res = await fetch(`${EXCEL_SERVICE_URL}${path}`)
    return await res.json()
  } catch (e: any) {
    console.error(`[ExcelClient] GET ${path} failed:`, e.message)
    return null
  }
}

export const excelClient = {
  health: () => get("/health"),
  summary: () => get("/summary"),
  getAll: (sheetType: string) => get(`/sheet/${sheetType}`),
  getUser: (userId: string) => get(`/user/${userId}`),

  upsertUser: (data: any) => post("/upsert/user", data),
  upsertSession: (data: any) => post("/upsert/session", data),
  upsertReport: (data: any) => post("/upsert/report", data),
  appendProduct: (data: any) => post("/append/product", data),
  appendEvent: (data: any) => post("/append/event", data),
}
