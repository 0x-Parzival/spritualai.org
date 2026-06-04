// src/app/sheets-dashboard/page.tsx
// Visual dashboard showing the Excel sheet data

import { excelClient } from "@/lib/sheets/excel-client"

export const dynamic = "force-dynamic"

export default async function SheetsDashboard() {
  const summary = await excelClient.summary()
  const users = await excelClient.getAll("users")
  const sessions = await excelClient.getAll("sessions")
  const reports = await excelClient.getAll("reports")
  const events = await excelClient.getAll("events")

  return (
    <main style={{ background: "#0a0a0f", minHeight: "100vh", color: "#e0e0e0", fontFamily: "monospace", padding: "2rem" }}>
      <h1 style={{ color: "#00ff88", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
        📊 Spiritual AI — Live Excel Dashboard
      </h1>
      <p style={{ color: "#666", marginBottom: "2rem", fontSize: "0.85rem" }}>
        Real-time data synced from website → local Excel file
      </p>

      {/* Summary */}
      <section style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {summary && Object.entries(summary).map(([name, info]: [string, any]) => (
          <div key={name} style={{
            background: "#111118", border: "1px solid #222", borderRadius: "8px",
            padding: "1rem", textAlign: "center",
          }}>
            <div style={{ color: "#888", fontSize: "0.7rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{name}</div>
            <div style={{ color: "#00ff88", fontSize: "1.5rem", fontWeight: "bold", marginTop: "0.25rem" }}>{info.rows}</div>
            <div style={{ color: "#555", fontSize: "0.65rem" }}>rows · {info.columns} cols</div>
          </div>
        ))}
      </section>

      {/* Users Table */}
      {users.data?.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#ff8844", fontSize: "1rem", marginBottom: "0.5rem" }}>👤 Users ({users.count})</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", background: "#111118" }}>
              <thead>
                <tr style={{ background: "#1a1a2e" }}>
                  {users.data.length > 0 && Object.keys(users.data[0]).map(key => (
                    <th key={key} style={{ padding: "8px 12px", textAlign: "left", color: "#00ff88", borderBottom: "1px solid #333", whiteSpace: "nowrap" }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {users.data.map((row: any, i: number) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    {Object.values(row).map((val: any, j: number) => (
                      <td key={j} style={{ padding: "6px 12px", color: val === null || val === "" ? "#333" : "#ccc", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {val === null || val === "" ? "—" : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Sessions Table */}
      {sessions.data?.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#4488ff", fontSize: "1rem", marginBottom: "0.5rem" }}>💬 Sessions ({sessions.count})</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", background: "#111118" }}>
              <thead>
                <tr style={{ background: "#16213e" }}>
                  {sessions.data.length > 0 && Object.keys(sessions.data[0]).map(key => (
                    <th key={key} style={{ padding: "8px 12px", textAlign: "left", color: "#4488ff", borderBottom: "1px solid #333", whiteSpace: "nowrap" }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {sessions.data.map((row: any, i: number) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    {Object.values(row).map((val: any, j: number) => (
                      <td key={j} style={{ padding: "6px 12px", color: val === null || val === "" ? "#333" : "#ccc", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {val === null || val === "" ? "—" : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Reports Table */}
      {reports.data?.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#aa44ff", fontSize: "1rem", marginBottom: "0.5rem" }}>🧠 Reports ({reports.count})</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", background: "#111118" }}>
              <thead>
                <tr style={{ background: "#0f3460" }}>
                  {reports.data.length > 0 && Object.keys(reports.data[0]).map(key => (
                    <th key={key} style={{ padding: "8px 12px", textAlign: "left", color: "#aa44ff", borderBottom: "1px solid #333", whiteSpace: "nowrap" }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {reports.data.map((row: any, i: number) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    {Object.values(row).map((val: any, j: number) => (
                      <td key={j} style={{ padding: "6px 12px", color: val === null || val === "" ? "#333" : "#ccc", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {val === null || val === "" ? "—" : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Events Table */}
      {events.data?.length > 0 && (
        <section style={{ marginBottom: "2rem" }}>
          <h2 style={{ color: "#ffaa00", fontSize: "1rem", marginBottom: "0.5rem" }}>📡 Events ({events.count})</h2>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem", background: "#111118" }}>
              <thead>
                <tr style={{ background: "#1a1a2e" }}>
                  {events.data.length > 0 && Object.keys(events.data[0]).map(key => (
                    <th key={key} style={{ padding: "8px 12px", textAlign: "left", color: "#ffaa00", borderBottom: "1px solid #333", whiteSpace: "nowrap" }}>
                      {key}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {events.data.map((row: any, i: number) => (
                  <tr key={i} style={{ borderBottom: "1px solid #1a1a1a" }}>
                    {Object.values(row).map((val: any, j: number) => (
                      <td key={j} style={{ padding: "6px 12px", color: val === null || val === "" ? "#333" : "#ccc", maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                        {val === null || val === "" ? "—" : String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {users.data?.length === 0 && sessions.data?.length === 0 && reports.data?.length === 0 && (
        <div style={{ textAlign: "center", color: "#444", marginTop: "4rem", fontSize: "0.9rem" }}>
          No data yet. Interact with the website to see data appear here.
        </div>
      )}

      <footer style={{ marginTop: "3rem", paddingTop: "1rem", borderTop: "1px solid #222", color: "#333", fontSize: "0.7rem", textAlign: "center" }}>
        Excel file: ~/.spiritual-ai/spiritual_ai_data.xlsx · Auto-refreshes on page load
      </footer>
    </main>
  )
}
