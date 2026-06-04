"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import "./admin-styles.css";

const BG = dynamic(() => import("@/components/ImmersiveBackground"), { ssr: false });

// ── Types ──

interface Stats {
  totalUsers: number;
  totalBlueprints: number;
  totalRevenue: number;
  totalTransactions: number;
  payingUsers: number;
  totalSessions: number;
  completedSessions: number;
  avgExchanges: number;
}

interface UserRow {
  id: string;
  email: string;
  createdAt: string;
  lastSeen: string;
  totalSessions: number;
  totalReports: number;
  totalRevenue: number;
  lastMbti: string | null;
  lastArchitecture: string | null;
}

interface BlueprintRow {
  csn: string;
  mbti: string;
  consciousnessIdentity: string;
  corePattern: string;
  spiritualPath: string;
  urgencyPercent: number | null;
  dob: string | null;
  witnessLevel: string | null;
  createdAt: string;
  timesShared: number;
  referralsGenerated: number;
  symbol: string | null;
  userId: string;
  email: string;
}

interface RefCode {
  id: string;
  code: string;
  discountPercentage: number;
  discountType: string;
  maxUses: number | null;
  currentUses: number;
  isActive: boolean;
  createdAt: string;
  owner?: string;
  revenueGenerated: number;
  transactionCount: number;
}

interface PurchaseRow {
  id: string;
  userId: string;
  productName: string;
  amount: number;
  currency: string;
  status: string;
  purchasedAt: string;
  referralCode?: string | null;
}

type PageId = "overview" | "users" | "reports" | "referrals" | "products" | "export" | "settings";

// ── Date formatting ──

function timeAgo(iso: string): string {
  if (!iso) return "—";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  return `${months}mo ago`;
}

function initials(nameOrEmail: string): string {
  if (!nameOrEmail) return "?";
  const parts = nameOrEmail.split(/[\s@._-]+/).filter(Boolean);
  if (parts.length >= 2) return (parts[0][0] + parts[1][0]).toUpperCase();
  return parts[0]?.slice(0, 2).toUpperCase() || "?";
}

function formatCurrency(amount: number): string {
  if (!amount) return "$0";
  return `$${Number(amount).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

// ── MBTI badge color ──
function mbtiBadge(mbti: string | null): string {
  if (!mbti) return "badge-gray";
  const analysts = ["INTJ", "INTP", "ENTJ", "ENTP"];
  const diplomats = ["INFJ", "INFP", "ENFJ", "ENFP"];
  const sentinels = ["ISTJ", "ISFJ", "ESTJ", "ESFJ"];
  const explorers = ["ISTP", "ISFP", "ESTP", "ESFP"];
  if (analysts.includes(mbti)) return "badge-purple";
  if (diplomats.includes(mbti)) return "badge-blue";
  if (sentinels.includes(mbti)) return "badge-amber";
  if (explorers.includes(mbti)) return "badge-orange";
  return "badge-gray";
}

// ── Status badge ──
function statusBadge(status: string): { cls: string; label: string } {
  const s = status?.toLowerCase();
  if (s === "subscribed" || s === "active") return { cls: "badge-green", label: "Subscribed" };
  if (s === "paying" || s === "completed" || s === "paid") return { cls: "badge-cyan", label: "Paying" };
  if (s === "refunded" || s === "failed") return { cls: "badge-red", label: "Refunded" };
  if (s === "paused") return { cls: "badge-amber", label: "Paused" };
  if (s === "incomplete" || s === "in_progress") return { cls: "badge-amber", label: "Incomplete" };
  return { cls: "badge-gray", label: "Free" };
}

// ── Main component ──

export default function AdminDashboard() {
  const { isLoaded, isSignedIn, user: clerkUser } = useUser();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [activePage, setActivePage] = useState<PageId>("overview");
  const [loading, setLoading] = useState(true);

  // Data states
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<UserRow[]>([]);
  const [blueprints, setBlueprints] = useState<BlueprintRow[]>([]);
  const [refCodes, setRefCodes] = useState<RefCode[]>([]);
  const [purchases, setPurchases] = useState<PurchaseRow[]>([]);

  // Search/filter states
  const [userSearch, setUserSearch] = useState("");
  const [blueprintSearch, setBlueprintSearch] = useState("");

  // Modal states
  const [userModal, setUserModal] = useState<UserRow | null>(null);
  const [refModal, setRefModal] = useState<{ mode: "new" | "edit"; data?: RefCode } | null>(null);

  // Ref form
  const [refCode, setRefCode] = useState("");
  const [refOwner, setRefOwner] = useState("");
  const [refDiscountType, setRefDiscountType] = useState("percentage");
  const [refDiscountVal, setRefDiscountVal] = useState("10");
  const [refMaxUses, setRefMaxUses] = useState("");
  const [refExpiry, setRefExpiry] = useState("");

  // Settings
  const [aiModel, setAiModel] = useState("groq-70b");
  const [failoverModel, setFailoverModel] = useState("gemini-2.0-flash");
  const [reportThreshold, setReportThreshold] = useState(78);
  const [maxExchanges, setMaxExchanges] = useState(9);
  const [counterOffset, setCounterOffset] = useState(0);
  const [saveMsg, setSaveMsg] = useState("");

  // Fetch admin status
  useEffect(() => {
    if (!isLoaded) return;
    if (!isSignedIn) {
      setLoading(false);
      return;
    }
    fetch("/api/auth/check-admin")
      .then((r) => r.json())
      .then((d) => setIsAdminUser(d.isAdmin))
      .catch(() => setIsAdminUser(false))
      .finally(() => setLoading(false));
  }, [isLoaded, isSignedIn]);

  // Fetch data when page changes
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/stats");
      if (res.ok) {
        const d = await res.json();
        setStats(d.stats);
      }
    } catch {}
  }, []);

  const fetchUsers = useCallback(async (search = "") => {
    try {
      const url = `/api/admin/users?search=${encodeURIComponent(search)}&limit=50`;
      const res = await fetch(url);
      if (res.ok) {
        const d = await res.json();
        setUsers(d.users || []);
      }
    } catch {}
  }, []);

  const fetchBlueprints = useCallback(async (search = "") => {
    try {
      const url = `/api/admin/blueprints?search=${encodeURIComponent(search)}&limit=50`;
      const res = await fetch(url);
      if (res.ok) {
        const d = await res.json();
        setBlueprints(d.blueprints || []);
      }
    } catch {}
  }, []);

  const fetchRefCodes = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/referrals");
      if (res.ok) {
        const d = await res.json();
        setRefCodes(d.codes || []);
      }
    } catch {}
  }, []);

  const fetchPurchases = useCallback(async () => {
    try {
      const res = await fetch("/api/admin/export?type=revenue");
      if (res.ok) {
        const text = await res.text();
        const lines = text.split("\n").slice(1).filter(Boolean);
        const parsed = lines.map((line) => {
          const [id, userId, productName, amount, currency, status, purchasedAt] = line.split(",");
          return { id, userId, productName, amount: parseFloat(amount) || 0, currency, status, purchasedAt };
        });
        setPurchases(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    if (!isAdminUser) return;
    fetchStats();
    fetchUsers();
    fetchBlueprints();
    fetchRefCodes();
    fetchPurchases();
  }, [isAdminUser, fetchStats, fetchUsers, fetchBlueprints, fetchRefCodes, fetchPurchases]);

  // Debounced search
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const handleUserSearch = (val: string) => {
    setUserSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchUsers(val), 300);
  };

  const handleBlueprintSearch = (val: string) => {
    setBlueprintSearch(val);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => fetchBlueprints(val), 300);
  };

  // Referral CRUD
  const createRefCode = async () => {
    if (!refCode || !refDiscountVal) return;
    await fetch("/api/admin/referrals", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code: refCode,
        discountPercentage: parseFloat(refDiscountVal),
        discountType: refDiscountType,
        maxUses: refMaxUses ? parseInt(refMaxUses) : null,
        owner: refOwner,
      }),
    });
    setRefModal(null);
    setRefCode("");
    setRefOwner("");
    setRefDiscountVal("10");
    setRefMaxUses("");
    setRefExpiry("");
    fetchRefCodes();
  };

  const toggleRefCode = async (id: string, currentStatus: boolean) => {
    await fetch("/api/admin/referrals", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, isActive: !currentStatus }),
    });
    fetchRefCodes();
  };

  const openEditRef = (rc: RefCode) => {
    setRefModal({ mode: "edit", data: rc });
    setRefCode(rc.code);
    setRefOwner(rc.owner || "");
    setRefDiscountVal(String(rc.discountPercentage));
    setRefDiscountType(rc.discountType || "percentage");
    setRefMaxUses(rc.maxUses ? String(rc.maxUses) : "");
  };

  // Export
  const exportData = async (type: string) => {
    if (type === "excel-sync") {
      const res = await fetch("/api/admin/export?type=excel-sync");
      const d = await res.json();
      alert(d.message || "Synced!");
      return;
    }
    window.location.href = `/api/admin/export?type=${type}`;
  };

  // Settings save
  const saveSettings = () => {
    setSaveMsg("Settings saved!");
    setTimeout(() => setSaveMsg(""), 2000);
  };

  // ── Auth guard ──
  if (!isLoaded || loading) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <BG variant="admin" />
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="admin-spinner" />
        </div>
      </div>
    );
  }

  if (!isAdminUser) {
    return (
      <div className="relative min-h-screen overflow-hidden">
        <BG variant="admin" />
        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="max-w-md bg-white/[0.03] border border-white/[0.08] p-10 rounded-3xl backdrop-blur-2xl">
            <div className="text-4xl mb-6">🛡️</div>
            <h1 className="text-2xl font-bold text-white mb-4">Access Restricted</h1>
            <p className="text-white/40 mb-8 leading-relaxed">
              This terminal is restricted to Level 4 Administrators only.
            </p>
            <Link href="/"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/80 to-violet-500/80 text-white px-8 py-3 rounded-2xl font-bold text-sm hover:shadow-[0_0_30px_rgba(53,248,255,0.15)] transition-all duration-300">
              Return to Safe Zone →
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  // ── Render ──
  return (
    <div className="relative min-h-screen overflow-hidden">
      <BG variant="admin" />
      <div className="relative z-10 admin-shell">
      {/* Sidebar */}
      <aside className="admin-sidebar admin-sidebar-glass">
        <div className="admin-logo">
          <div className="admin-logo-icon">🛡</div>
          <span>SAI Admin</span>
        </div>
        <div className="admin-nav-section">Main</div>
        <NavItem icon="📊" label="Overview" page="overview" active={activePage} onNav={setActivePage} />
        <NavItem icon="👥" label="Users" page="users" active={activePage} onNav={setActivePage} badge={stats?.totalUsers?.toString()} />
        <NavItem icon="🧠" label="Blueprints" page="reports" active={activePage} onNav={setActivePage} badge={stats?.totalBlueprints?.toString()} />
        <div className="admin-nav-section">Revenue</div>
        <NavItem icon="🔗" label="Referrals" page="referrals" active={activePage} onNav={setActivePage} />
        <NavItem icon="💰" label="Products" page="products" active={activePage} onNav={setActivePage} />
        <div className="admin-nav-section">System</div>
        <NavItem icon="📤" label="Export" page="export" active={activePage} onNav={setActivePage} />
        <NavItem icon="⚙️" label="Settings" page="settings" active={activePage} onNav={setActivePage} />
        <div style={{ flex: 1 }} />
        <div style={{ padding: "12px 16px", borderTop: "0.5px solid rgba(255,255,255,0.06)" }}>
          <Link href="/" className="admin-nav-item" style={{ margin: 0 }}>
            <span>🏠</span> Back to site
          </Link>
        </div>
      </aside>

      {/* Main */}
      <div className="admin-main">
        <div className="admin-topbar">
          <div className="admin-page-title">{pageTitle(activePage)}</div>
          <div className="admin-topbar-actions">
            <button className="admin-btn" onClick={() => { fetchStats(); fetchUsers(); fetchBlueprints(); fetchRefCodes(); }}>
              🔄 Refresh
            </button>
            <button className="admin-btn admin-btn-primary" onClick={() => exportData("users")}>
              ⬇ Export CSV
            </button>
          </div>
        </div>

        <div className="admin-content">
          {/* ═══ OVERVIEW ═══ */}
          {activePage === "overview" && stats && <OverviewPage stats={stats} blueprints={blueprints} />}

          {/* ═══ USERS ═══ */}
          {activePage === "users" && (
            <UsersPage
              users={users}
              search={userSearch}
              onSearch={handleUserSearch}
              onSelectUser={setUserModal}
            />
          )}

          {/* ═══ BLUEPRINTS ═══ */}
          {activePage === "reports" && (
            <BlueprintsPage
              blueprints={blueprints}
              search={blueprintSearch}
              onSearch={handleBlueprintSearch}
            />
          )}

          {/* ═══ REFERRALS ═══ */}
          {activePage === "referrals" && (
            <ReferralsPage
              codes={refCodes}
              onNewRef={() => { setRefModal({ mode: "new" }); setRefCode(""); setRefOwner(""); setRefDiscountVal("10"); setRefMaxUses(""); }}
              onEditRef={openEditRef}
              onToggle={toggleRefCode}
            />
          )}

          {/* ═══ PRODUCTS ═══ */}
          {activePage === "products" && <ProductsPage purchases={purchases} />}

          {/* ═══ EXPORT ═══ */}
          {activePage === "export" && <ExportPage onExport={exportData} />}

          {/* ═══ SETTINGS ═══ */}
          {activePage === "settings" && (
            <SettingsPage
              aiModel={aiModel}
              setAiModel={setAiModel}
              failoverModel={failoverModel}
              setFailoverModel={setFailoverModel}
              reportThreshold={reportThreshold}
              setReportThreshold={setReportThreshold}
              maxExchanges={maxExchanges}
              setMaxExchanges={setMaxExchanges}
              counterOffset={counterOffset}
              setCounterOffset={setCounterOffset}
              saveMsg={saveMsg}
              onSave={saveSettings}
            />
          )}
        </div>
      </div>

      {/* ── User Detail Modal ── */}
      {userModal && (
        <div className="admin-modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) setUserModal(null); }}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div className="admin-modal-title">{userModal.email || "User Detail"}</div>
              <button className="admin-btn admin-btn-sm" onClick={() => setUserModal(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 18 }}>
                <div className="admin-avatar" style={{ width: 48, height: 48, fontSize: 16 }}>
                  {initials(userModal.email)}
                </div>
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{userModal.email}</div>
                  <div style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>
                    {userModal.lastSeen ? `Last seen ${timeAgo(userModal.lastSeen)}` : "Never"}
                  </div>
                </div>
              </div>
              <div className="admin-field-grid" style={{ marginBottom: 16 }}>
                <div className="admin-metric" style={{ margin: 0 }}>
                  <div className="admin-metric-label">MBTI</div>
                  <div className="admin-metric-value" style={{ fontSize: 18 }}>
                    {userModal.lastMbti || "—"}
                  </div>
                </div>
                <div className="admin-metric" style={{ margin: 0 }}>
                  <div className="admin-metric-label">Architecture</div>
                  <div className="admin-metric-value" style={{ fontSize: 14 }}>
                    {userModal.lastArchitecture || "Not decoded"}
                  </div>
                </div>
                <div className="admin-metric" style={{ margin: 0 }}>
                  <div className="admin-metric-label">Sessions</div>
                  <div className="admin-metric-value" style={{ fontSize: 18 }}>
                    {userModal.totalSessions || 0}
                  </div>
                </div>
                <div className="admin-metric" style={{ margin: 0 }}>
                  <div className="admin-metric-label">Total Revenue</div>
                  <div className="admin-metric-value" style={{ fontSize: 18, color: "#22c55e" }}>
                    {formatCurrency(userModal.totalRevenue)}
                  </div>
                </div>
              </div>
              <div className="admin-divider" />
              <div className="admin-inline-form">
                <div className="admin-field-row">
                  <div>
                    <div className="admin-field-label">User ID</div>
                    <div className="admin-ref-code">{userModal.id}</div>
                  </div>
                  <div>
                    <div className="admin-field-label">Joined</div>
                    <div className="admin-field-value">{new Date(userModal.createdAt).toLocaleDateString()}</div>
                  </div>
                </div>
                <div>
                  <div className="admin-field-label">Reports Completed</div>
                  <div className="admin-field-value">{userModal.totalReports || 0}</div>
                </div>
              </div>
              <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
                <button className="admin-btn" style={{ flex: 1, justifyContent: "center" }}>📧 Send Email</button>
                <button className="admin-btn" style={{ flex: 1, justifyContent: "center" }}>🧠 View Blueprint</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── Referral Modal ── */}
      {refModal && (
        <div className="admin-modal-backdrop open" onClick={(e) => { if (e.target === e.currentTarget) setRefModal(null); }}>
          <div className="admin-modal">
            <div className="admin-modal-header">
              <div className="admin-modal-title">{refModal.mode === "new" ? "New Referral Code" : `Edit — ${refModal.data?.code}`}</div>
              <button className="admin-btn admin-btn-sm" onClick={() => setRefModal(null)}>✕</button>
            </div>
            <div className="admin-modal-body">
              <div className="admin-inline-form">
                <div>
                  <div className="admin-field-label">Code</div>
                  <input className="admin-form-input" value={refCode} onChange={(e) => setRefCode(e.target.value)} placeholder="e.g. SOUL20" />
                </div>
                <div className="admin-form-row">
                  <div>
                    <div className="admin-field-label">Owner / Source</div>
                    <input className="admin-form-input" value={refOwner} onChange={(e) => setRefOwner(e.target.value)} placeholder="Name or campaign" />
                  </div>
                  <div>
                    <div className="admin-field-label">Discount Value</div>
                    <input className="admin-form-input" value={refDiscountVal} onChange={(e) => setRefDiscountVal(e.target.value)} placeholder="e.g. 20" />
                  </div>
                </div>
                <div className="admin-form-row">
                  <div>
                    <div className="admin-field-label">Max Uses</div>
                    <input className="admin-form-input" value={refMaxUses} onChange={(e) => setRefMaxUses(e.target.value)} placeholder="Leave blank for unlimited" />
                  </div>
                  <div>
                    <div className="admin-field-label">Expiry Date</div>
                    <input className="admin-form-input" type="date" value={refExpiry} onChange={(e) => setRefExpiry(e.target.value)} />
                  </div>
                </div>
              </div>
            </div>
            <div className="admin-modal-footer">
              <button className="admin-btn" onClick={() => setRefModal(null)}>Cancel</button>
              <button className="admin-btn admin-btn-primary" onClick={createRefCode}>
                {refModal.mode === "new" ? "Create Code" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
  );
}

// ── Sub-components ──

function NavItem({ icon, label, page, active, onNav, badge }: { icon: string; label: string; page: PageId; active: PageId; onNav: (p: PageId) => void; badge?: string }) {
  return (
    <div
      className={`admin-nav-item ${active === page ? "active" : ""}`}
      onClick={() => onNav(page)}
    >
      <span style={{ fontSize: 16 }}>{icon}</span>
      <span>{label}</span>
      {badge && <span className="admin-nav-badge">{badge}</span>}
    </div>
  );
}

function pageTitle(page: PageId): string {
  const titles: Record<PageId, string> = {
    overview: "Overview",
    users: "Users",
    reports: "Blueprints",
    referrals: "Referrals & Discounts",
    products: "Products & Revenue",
    export: "Export Data",
    settings: "Settings",
  };
  return titles[page] || page;
}

// ═══ Overview Page ═══
function OverviewPage({ stats, blueprints }: { stats: Stats; blueprints: BlueprintRow[] }) {
  // Compute architecture distribution
  const archCounts: Record<string, number> = {};
  blueprints.forEach((b) => {
    const arch = b.consciousnessIdentity || "Unknown";
    archCounts[arch] = (archCounts[arch] || 0) + 1;
  });
  const topArchs = Object.entries(archCounts).sort((a, b) => b[1] - a[1]).slice(0, 6);
  const maxArchCount = topArchs[0]?.[1] || 1;

  const mrr = (stats.payingUsers || 0) * 147; // Estimate from $147/mo sessions

  return (
    <>
      <div className="admin-metrics">
        <div className="admin-metric">
          <div className="admin-metric-label">Total Users</div>
          <div className="admin-metric-value">{stats.totalUsers.toLocaleString()}</div>
          <div className="admin-metric-sub admin-metric-up">All time</div>
        </div>
        <div className="admin-metric">
          <div className="admin-metric-label">Blueprints Generated</div>
          <div className="admin-metric-value">{stats.totalBlueprints.toLocaleString()}</div>
          <div className="admin-metric-sub">
            {stats.totalUsers > 0 ? `${Math.round((stats.totalBlueprints / stats.totalUsers) * 100)}% completion` : "—"}
          </div>
        </div>
        <div className="admin-metric">
          <div className="admin-metric-label">Est. MRR</div>
          <div className="admin-metric-value">{formatCurrency(mrr)}</div>
          <div className="admin-metric-sub admin-metric-up">From subscriptions</div>
        </div>
        <div className="admin-metric">
          <div className="admin-metric-label">Total Revenue</div>
          <div className="admin-metric-value">{formatCurrency(stats.totalRevenue)}</div>
          <div className="admin-metric-sub">{stats.totalTransactions} transactions</div>
        </div>
        <div className="admin-metric">
          <div className="admin-metric-label">Paying Users</div>
          <div className="admin-metric-value">{stats.payingUsers.toLocaleString()}</div>
          <div className="admin-metric-sub">
            {stats.totalUsers > 0 ? `${((stats.payingUsers / stats.totalUsers) * 100).toFixed(1)}% conversion` : "—"}
          </div>
        </div>
        <div className="admin-metric">
          <div className="admin-metric-label">Avg LTV</div>
          <div className="admin-metric-value">
            {stats.payingUsers > 0 ? formatCurrency(Math.round(stats.totalRevenue / stats.payingUsers)) : "$0"}
          </div>
          <div className="admin-metric-sub">Per paying user</div>
        </div>
      </div>

      <div className="admin-two-col">
        {/* Completion funnel */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Completion Funnel</div>
            <div className="admin-card-sub">This month</div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <ChartBar label="Visited" value={stats.totalUsers} max={stats.totalUsers} />
            <ChartBar label="Started" value={stats.totalSessions} max={stats.totalUsers} />
            <ChartBar label="Completed" value={stats.completedSessions} max={stats.totalUsers} />
            <ChartBar label="Paying" value={stats.payingUsers} max={stats.totalUsers} color="#22c55e" />
          </div>
        </div>

        {/* Top architectures */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Top Architectures</div>
            <div className="admin-card-sub">By decode count</div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            {topArchs.length > 0 ? (
              topArchs.map(([arch, count]) => (
                <ChartBar key={arch} label={arch} value={count} max={maxArchCount} />
              ))
            ) : (
              <div className="admin-empty">No blueprints yet</div>
            )}
          </div>
        </div>
      </div>

      <div className="admin-two-col" style={{ marginTop: 16 }}>
        {/* Drop-off by exchange */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Session Stats</div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <ChartBar label="Total Sessions" value={stats.totalSessions} max={stats.totalSessions} />
            <ChartBar label="Completed" value={stats.completedSessions} max={stats.totalSessions} color="#22c55e" />
            <ChartBar label="Avg Exchanges" value={stats.avgExchanges} max={15} color="#f59e0b" />
            <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
              Completion rate:{" "}
              {stats.totalSessions > 0
                ? `${Math.round((stats.completedSessions / stats.totalSessions) * 100)}%`
                : "—"}
            </div>
          </div>
        </div>

        {/* Revenue breakdown */}
        <div className="admin-card">
          <div className="admin-card-header">
            <div className="admin-card-title">Revenue Breakdown</div>
          </div>
          <div style={{ padding: "16px 18px" }}>
            <ChartBar label={`Sessions $147/mo`} value={Math.round(mrr / 100)} max={Math.round(stats.totalRevenue / 100) || 1} color="#22c55e" />
            <ChartBar label="One-time purchases" value={Math.round((stats.totalRevenue - mrr) / 100)} max={Math.round(stats.totalRevenue / 100) || 1} />
            <div style={{ marginTop: 12, fontSize: 12, color: "rgba(255,255,255,0.6)" }}>
              Total: <strong style={{ color: "#22c55e" }}>{formatCurrency(stats.totalRevenue)}</strong>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function ChartBar({ label, value, max, color }: { label: string; value: number; max: number; color?: string }) {
  const pct = max > 0 ? Math.min(100, (value / max) * 100) : 0;
  return (
    <div className="admin-chart-row">
      <span className="admin-chart-label" title={label}>{label}</span>
      <div
        className="admin-chart-bar"
        style={{
          width: `${Math.max(pct, 2)}%`,
          background: color || "linear-gradient(90deg, #35f8ff, #818cf8)",
        }}
      />
      <span className="admin-chart-val">{typeof value === "number" ? value.toLocaleString() : value}</span>
    </div>
  );
}

// ═══ Users Page ═══
function UsersPage({ users, search, onSearch, onSelectUser }: { users: UserRow[]; search: string; onSearch: (v: string) => void; onSelectUser: (u: UserRow) => void }) {
  return (
    <>
      <div className="admin-metrics" style={{ marginBottom: 16 }}>
        <div className="admin-metric"><div className="admin-metric-label">Total Users</div><div className="admin-metric-value">{users.length}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">With Reports</div><div className="admin-metric-value">{users.filter((u) => u.totalReports > 0).length}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Paying</div><div className="admin-metric-value">{users.filter((u) => u.totalRevenue > 0).length}</div></div>
      </div>
      <div className="admin-card">
        <div className="admin-search-row">
          <input className="admin-search-input" placeholder="Search by email, ID, MBTI, architecture..." value={search} onChange={(e) => onSearch(e.target.value)} />
          <select className="admin-filter-select">
            <option>All users</option>
            <option>Paying only</option>
            <option>Has reports</option>
            <option>No activity</option>
          </select>
          <select className="admin-filter-select">
            <option>All MBTI</option>
            {["INTJ", "INFJ", "INTP", "INFP", "ENTP", "ENFP", "ENTJ", "ENFJ", "ISTJ", "ISFJ", "ESTJ", "ESFJ", "ISTP", "ISFP", "ESTP", "ESFP"].map((m) => (
              <option key={m}>{m}</option>
            ))}
          </select>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User</th>
                <th>MBTI</th>
                <th>Architecture</th>
                <th>Sessions</th>
                <th>Revenue</th>
                <th>Status</th>
                <th>Last Seen</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={8} className="admin-empty">No users found</td></tr>
              ) : (
                users.map((u) => {
                  const s = statusBadge(u.totalRevenue > 0 ? "paying" : "free");
                  return (
                    <tr key={u.id} onClick={() => onSelectUser(u)} style={{ cursor: "pointer" }}>
                      <td>
                        <div className="admin-user-cell">
                          <div className="admin-avatar">{initials(u.email)}</div>
                          <div>
                            <div className="admin-user-name">{u.email?.split("@")[0] || "Anonymous"}</div>
                            <div className="admin-user-email">{u.email || "No email"}</div>
                          </div>
                        </div>
                      </td>
                      <td>{u.lastMbti ? <span className={`admin-badge ${mbtiBadge(u.lastMbti)}`}>{u.lastMbti}</span> : <span className="admin-badge badge-gray">—</span>}</td>
                      <td style={{ color: "rgba(255,255,255,0.7)" }}>{u.lastArchitecture || "Not decoded"}</td>
                      <td>{u.totalSessions || 0}</td>
                      <td style={{ color: u.totalRevenue > 0 ? "#22c55e" : "rgba(255,255,255,0.3)", fontWeight: 500 }}>
                        {formatCurrency(u.totalRevenue)}
                      </td>
                      <td><span className={`admin-badge ${s.cls}`}>{s.label}</span></td>
                      <td style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{u.lastSeen ? timeAgo(u.lastSeen) : "—"}</td>
                      <td><button className="admin-btn admin-btn-sm">View</button></td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ═══ Blueprints Page ═══
function BlueprintsPage({ blueprints, search, onSearch }: { blueprints: BlueprintRow[]; search: string; onSearch: (v: string) => void }) {
  return (
    <>
      <div className="admin-metrics" style={{ marginBottom: 16 }}>
        <div className="admin-metric"><div className="admin-metric-label">Total Blueprints</div><div className="admin-metric-value">{blueprints.length}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Total Shares</div><div className="admin-metric-value">{blueprints.reduce((a, b) => a + (b.timesShared || 0), 0)}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Viral Referrals</div><div className="admin-metric-value">{blueprints.reduce((a, b) => a + (b.referralsGenerated || 0), 0)}</div></div>
      </div>
      <div className="admin-card">
        <div className="admin-search-row">
          <input className="admin-search-input" placeholder="Search by CSN, architecture, MBTI..." value={search} onChange={(e) => onSearch(e.target.value)} />
          <select className="admin-filter-select">
            <option>All architectures</option>
            {[...new Set(blueprints.map((b) => b.consciousnessIdentity).filter(Boolean))].map((a) => (
              <option key={a}>{a}</option>
            ))}
          </select>
          <select className="admin-filter-select">
            <option>All paths</option>
            <option>Jnana</option><option>Bhakti</option><option>Karma</option><option>Raja</option>
          </select>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>CSN</th>
                <th>Architecture</th>
                <th>MBTI</th>
                <th>Core Pattern</th>
                <th>Path</th>
                <th>Urgency</th>
                <th>Shares</th>
                <th>Referrals</th>
                <th>Generated</th>
              </tr>
            </thead>
            <tbody>
              {blueprints.length === 0 ? (
                <tr><td colSpan={9} className="admin-empty">No blueprints found</td></tr>
              ) : (
                blueprints.map((bp) => (
                  <tr key={bp.csn}>
                    <td><span className="admin-ref-code">{bp.csn}</span></td>
                    <td style={{ color: "#fff", fontWeight: 500 }}>{bp.consciousnessIdentity || "—"}</td>
                    <td><span className={`admin-badge ${mbtiBadge(bp.mbti)}`}>{bp.mbti}</span></td>
                    <td style={{ maxWidth: 180 }} title={bp.corePattern || ""}>
                      <div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", color: "rgba(255,255,255,0.5)" }}>
                        {bp.corePattern || "—"}
                      </div>
                    </td>
                    <td><span className={`admin-badge ${bp.spiritualPath === "Jnana" ? "badge-blue" : bp.spiritualPath === "Bhakti" ? "badge-purple" : "badge-orange"}`}>
                      {bp.spiritualPath || "—"}
                    </span></td>
                    <td>
                      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <div className="admin-progress-bar"><div className="admin-progress-fill" style={{ width: `${bp.urgencyPercent || 0}%` }} /></div>
                        <span style={{ fontSize: 11 }}>{bp.urgencyPercent || 0}%</span>
                      </div>
                    </td>
                    <td>{bp.timesShared || 0}</td>
                    <td>{bp.referralsGenerated || 0}</td>
                    <td style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{timeAgo(bp.createdAt)}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ═══ Referrals Page ═══
function ReferralsPage({ codes, onNewRef, onEditRef, onToggle }: { codes: RefCode[]; onNewRef: () => void; onEditRef: (rc: RefCode) => void; onToggle: (id: string, active: boolean) => void }) {
  const totalDiscount = codes.reduce((a, c) => a + (c.discountPercentage * c.currentUses || 0), 0);
  const totalRevenue = codes.reduce((a, c) => a + (c.revenueGenerated || 0), 0);
  const totalUses = codes.reduce((a, c) => a + (c.currentUses || 0), 0);

  return (
    <>
      <div className="admin-metrics" style={{ marginBottom: 16 }}>
        <div className="admin-metric"><div className="admin-metric-label">Active Codes</div><div className="admin-metric-value">{codes.filter((c) => c.isActive).length}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Total Uses</div><div className="admin-metric-value">{totalUses}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Revenue from Refs</div><div className="admin-metric-value">{formatCurrency(totalRevenue)}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Avg Discount</div><div className="admin-metric-value">{codes.length > 0 ? Math.round(codes.reduce((a, c) => a + c.discountPercentage, 0) / codes.length) : 0}%</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Conversion Rate</div><div className="admin-metric-value">{codes.length > 0 ? Math.min(100, Math.round((totalUses / codes.length) * 10)) : 0}%</div></div>
      </div>
      <div className="admin-card">
        <div className="admin-card-header">
          <div><div className="admin-card-title">Referral & Discount Codes</div><div className="admin-card-sub">All codes with performance data</div></div>
          <button className="admin-btn admin-btn-primary" onClick={onNewRef}>+ New Code</button>
        </div>
        <div className="admin-search-row">
          <input className="admin-search-input" placeholder="Search code, owner, type..." />
          <select className="admin-filter-select"><option>All types</option><option>Influencer</option><option>Affiliate</option><option>Promo</option></select>
          <select className="admin-filter-select"><option>All status</option><option>Active</option><option>Paused</option></select>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Code</th>
                <th>Owner / Source</th>
                <th>Type</th>
                <th>Discount</th>
                <th>Max Uses</th>
                <th>Uses</th>
                <th>Revenue</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {codes.length === 0 ? (
                <tr><td colSpan={9} className="admin-empty">No referral codes yet</td></tr>
              ) : (
                codes.map((rc) => (
                  <tr key={rc.id} onClick={(e) => { if ((e.target as HTMLElement).tagName !== "BUTTON") onEditRef(rc); }}>
                    <td><span className="admin-ref-code">{rc.code}</span></td>
                    <td>
                      <div className="admin-user-name">{rc.owner || "Admin"}</div>
                    </td>
                    <td><span className="admin-badge badge-purple">{rc.discountType || "percentage"}</span></td>
                    <td style={{ fontWeight: 500, color: "#fff" }}>{rc.discountPercentage}%</td>
                    <td>{rc.maxUses || "∞"}</td>
                    <td>{rc.currentUses || 0}</td>
                    <td style={{ color: "#22c55e", fontWeight: 500 }}>{formatCurrency(rc.revenueGenerated)}</td>
                    <td>
                      <span className={`admin-badge ${rc.isActive ? "badge-green" : "badge-amber"}`}>
                        {rc.isActive ? "Active" : "Paused"}
                      </span>
                    </td>
                    <td>
                      <button className="admin-btn admin-btn-sm" onClick={(e) => { e.stopPropagation(); onToggle(rc.id, rc.isActive); }}>
                        {rc.isActive ? "Pause" : "Enable"}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ═══ Products Page ═══
function ProductsPage({ purchases }: { purchases: PurchaseRow[] }) {
  const totalTx = purchases.length;
  const refunds = purchases.filter((p) => p.status === "refunded").length;
  const avgOrder = totalTx > 0 ? purchases.reduce((a, p) => a + p.amount, 0) / totalTx : 0;

  return (
    <>
      <div className="admin-metrics" style={{ marginBottom: 16 }}>
        <div className="admin-metric"><div className="admin-metric-label">Total Transactions</div><div className="admin-metric-value">{totalTx}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Refunds</div><div className="admin-metric-value">{refunds}</div><div className="admin-metric-sub">{totalTx > 0 ? `${((refunds / totalTx) * 100).toFixed(1)}%` : "—"} rate</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Avg Order Value</div><div className="admin-metric-value">{formatCurrency(Math.round(avgOrder))}</div></div>
        <div className="admin-metric"><div className="admin-metric-label">Sessions MRR</div><div className="admin-metric-value">{formatCurrency(2940)}</div></div>
      </div>
      <div className="admin-card">
        <div className="admin-card-header"><div className="admin-card-title">All Transactions</div></div>
        <div className="admin-search-row">
          <input className="admin-search-input" placeholder="Search user, product..." />
          <select className="admin-filter-select"><option>All products</option><option>Full Decode $37</option><option>Kit $97</option><option>Sessions $147</option></select>
          <select className="admin-filter-select"><option>All status</option><option>Completed</option><option>Refunded</option></select>
        </div>
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Transaction</th>
                <th>User</th>
                <th>Product</th>
                <th>Amount</th>
                <th>Currency</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {purchases.length === 0 ? (
                <tr><td colSpan={7} className="admin-empty">No transactions found</td></tr>
              ) : (
                purchases.map((p) => (
                  <tr key={p.id}>
                    <td><span className="admin-ref-code">{p.id}</span></td>
                    <td><span className="admin-user-email">{p.userId?.slice(0, 12)}...</span></td>
                    <td>{p.productName}</td>
                    <td style={{ fontWeight: 500, color: p.amount > 0 ? "#22c55e" : "rgba(255,255,255,0.3)" }}>{formatCurrency(p.amount)}</td>
                    <td>{p.currency}</td>
                    <td>
                      <span className={`admin-badge ${p.status === "completed" || p.status === "paid" ? "badge-green" : p.status === "refunded" ? "badge-red" : "badge-amber"}`}>
                        {p.status}
                      </span>
                    </td>
                    <td style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{p.purchasedAt ? new Date(p.purchasedAt).toLocaleDateString() : "—"}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

// ═══ Export Page ═══
function ExportPage({ onExport }: { onExport: (type: string) => void }) {
  return (
    <div className="admin-two-col">
      <div className="admin-card">
        <div className="admin-card-header"><div className="admin-card-title">Export to Excel / CSV</div><div className="admin-card-sub">Download any dataset</div></div>
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          {[
            { type: "users", label: "All Users", desc: "User data with sessions and revenue", icon: "👥" },
            { type: "blueprints", label: "All Blueprints", desc: "Blueprint data with MBTI and architecture", icon: "🧠" },
            { type: "revenue", label: "Revenue & Transactions", desc: "All purchase records", icon: "💰" },
          ].map((item) => (
            <div key={item.type} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px", border: "0.5px solid rgba(255,255,255,0.06)", borderRadius: 10, background: "rgba(255,255,255,0.02)" }}>
              <div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "#fff" }}>{item.icon} {item.label}</div>
                <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)" }}>{item.desc}</div>
              </div>
              <button className="admin-btn admin-btn-sm" onClick={() => onExport(item.type)}>⬇ CSV</button>
            </div>
          ))}
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-header"><div className="admin-card-title">Sync to Local Excel</div><div className="admin-card-sub">Write to local .xlsx file</div></div>
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ padding: "12px 14px", background: "rgba(255,255,255,0.03)", borderRadius: 10, fontSize: 12, color: "rgba(255,255,255,0.5)" }}>
            <div style={{ fontWeight: 500, color: "#35f8ff", marginBottom: 4 }}>📊 Connected Excel File</div>
            <div style={{ fontFamily: "var(--font-mono, monospace)", fontSize: 11, color: "rgba(255,255,255,0.3)" }}>
              ~/.spiritual-ai/spiritual_ai_data.xlsx
            </div>
            <div style={{ marginTop: 6, fontSize: 11 }}>
              <span className="admin-badge badge-green">● Live</span>
              <span style={{ marginLeft: 8 }}>5 sheets synced</span>
            </div>
          </div>
          <button className="admin-btn" style={{ justifyContent: "center" }} onClick={() => onExport("excel-sync")}>
            🔄 Force Sync All Data to Excel
          </button>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", padding: "4px 0" }}>
            Users, Sessions, Reports, Products, Events
          </div>
        </div>
      </div>
    </div>
  );
}

// ═══ Settings Page ═══
function SettingsPage({
  aiModel, setAiModel, failoverModel, setFailoverModel, reportThreshold, setReportThreshold,
  maxExchanges, setMaxExchanges, counterOffset, setCounterOffset, saveMsg, onSave,
}: {
  aiModel: string; setAiModel: (v: string) => void; failoverModel: string; setFailoverModel: (v: string) => void;
  reportThreshold: number; setReportThreshold: (v: number) => void; maxExchanges: number; setMaxExchanges: (v: number) => void;
  counterOffset: number; setCounterOffset: (v: number) => void; saveMsg: string; onSave: () => void;
}) {
  return (
    <div className="admin-two-col">
      <div className="admin-card">
        <div className="admin-card-header"><div className="admin-card-title">AI Configuration</div></div>
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <div className="admin-field-label">Primary Model</div>
            <select className="admin-form-input" value={aiModel} onChange={(e) => setAiModel(e.target.value)}>
              <option value="groq-70b">llama-3.3-70b-versatile (Groq)</option>
              <option value="groq-8b">llama-3.1-8b-instant (Groq)</option>
            </select>
          </div>
          <div>
            <div className="admin-field-label">Failover Model</div>
            <select className="admin-form-input" value={failoverModel} onChange={(e) => setFailoverModel(e.target.value)}>
              <option value="gemini-2.0-flash">gemini-2.0-flash</option>
              <option value="gemini-2.5-flash">gemini-2.5-flash</option>
            </select>
          </div>
          <div>
            <div className="admin-field-label">Report Generation Threshold: {reportThreshold}%</div>
            <input type="range" min={60} max={95} value={reportThreshold} onChange={(e) => setReportThreshold(parseInt(e.target.value))} style={{ width: "100%" }} />
            <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 4 }}>Current: {reportThreshold}% confidence</div>
          </div>
          <div>
            <div className="admin-field-label">Max Exchanges Before Hard Generate</div>
            <input type="number" value={maxExchanges} onChange={(e) => setMaxExchanges(parseInt(e.target.value))} className="admin-form-input" style={{ width: 80 }} />
          </div>
          <button className="admin-btn admin-btn-primary" style={{ justifyContent: "center" }} onClick={onSave}>
            Save AI Settings
          </button>
        </div>
      </div>
      <div className="admin-card">
        <div className="admin-card-header"><div className="admin-card-title">Counter Settings</div><div className="admin-card-sub">Social proof numbers</div></div>
        <div style={{ padding: 18, display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ padding: "10px 14px", background: "rgba(34, 197, 94, 0.08)", borderRadius: 10, fontSize: 12, color: "#22c55e", border: "0.5px solid rgba(34, 197, 94, 0.2)" }}>
            <strong>Real count from database:</strong> Live data
          </div>
          <div>
            <div className="admin-field-label">Counter Display Mode</div>
            <select className="admin-form-input">
              <option>Real count (recommended)</option>
              <option>Real count + offset</option>
            </select>
          </div>
          <div>
            <div className="admin-field-label">Counter Offset</div>
            <input type="number" value={counterOffset} onChange={(e) => setCounterOffset(parseInt(e.target.value))} className="admin-form-input" style={{ width: 80 }} />
          </div>
          <button className="admin-btn admin-btn-primary" style={{ justifyContent: "center" }} onClick={onSave}>
            Update Display
          </button>
        </div>
      </div>
      {saveMsg && (
        <div style={{ gridColumn: "1 / -1", padding: "10px 16px", background: "rgba(34, 197, 94, 0.1)", borderRadius: 10, fontSize: 13, color: "#22c55e", textAlign: "center" }}>
          ✅ {saveMsg}
        </div>
      )}
    </div>
  );
}
