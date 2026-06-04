/* src/app/profile/page.tsx */
/* Immersive user profile — cinematic dark aesthetic with floating cards, glowing borders, animated background */

"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState, useCallback, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";

const BG = dynamic(() => import("@/components/ImmersiveBackground"), { ssr: false });

/* ── Types ── */
interface Blueprint { csn: string; mbti: string; consciousnessIdentity: string; corePattern: string; spiritualPath: string; urgencyPercent: number | null; createdAt: string; timesShared: number; symbol: string | null; jungianComplex: string | null; rootBelief: string | null; witnessLevel: string | null; }
interface Purchase { id: string; productName: string; amount: number; currency: string; status: string; purchasedAt: string; }
interface Session { id: string; startedAt: string; exchangeCount: number; completionStatus: string | null; reportGenerated: boolean; }
interface UserSummary { narrative: string; identifiers: any; totalSessions: number; lastEngagementScore: number; suggestedNextTopic: string; unexploredAreas: string[]; problemsExplored: any[]; firstBlueprintCsn: string | null; lastBlueprintCsn: string | null; purchaseCount: number; totalSpent: number; updatedAt: string; }
interface ProfileData { blueprints: Blueprint[]; purchases: Purchase[]; sessions: Session[]; stats: { totalBlueprints: number; totalPurchases: number; totalRevenue: number; totalSessions: number; completedSessions: number; }; summary: UserSummary | null; }

/* ── Helpers ── */
const ini = (n: string) => { if (!n) return "?"; const p = n.split(/[\s@._-]+/).filter(Boolean); return p.length >= 2 ? (p[0][0] + p[1][0]).toUpperCase() : p[0]?.slice(0, 2).toUpperCase() || "?"; };
const ago = (iso: string) => { if (!iso) return "—"; const d = Date.now() - new Date(iso).getTime(); const m = Math.floor(d / 6e4); if (m < 60) return `${m}m ago`; const h = Math.floor(m / 60); if (h < 24) return `${h}h ago`; const dd = Math.floor(h / 24); return dd < 30 ? `${dd}d ago` : `${Math.floor(dd / 30)}mo ago`; };
const $ = (n: number) => !n ? "$0" : `$${Number(n).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
const mbtiClr = (m: string) => !m ? "from-gray-500/20 to-gray-600/10 text-gray-400 border-gray-500/30" : ["INTJ","INTP","ENTJ","ENTP"].includes(m) ? "from-violet-500/20 to-purple-600/10 text-violet-300 border-violet-500/30" : ["INFJ","INFP","ENFJ","ENFP"].includes(m) ? "from-sky-500/20 to-blue-600/10 text-sky-300 border-sky-500/30" : ["ISTJ","ISFJ","ESTJ","ESFJ"].includes(m) ? "from-amber-500/20 to-orange-600/10 text-amber-300 border-amber-500/30" : "from-emerald-500/20 to-teal-600/10 text-emerald-300 border-emerald-500/30";
const statusClr = (s: string) => { const l = s?.toLowerCase(); return l === "completed" || l === "paid" || l === "active" ? "from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30" : l === "refunded" || l === "failed" ? "from-red-500/20 to-red-600/10 text-red-400 border-red-500/30" : "from-amber-500/20 to-amber-600/10 text-amber-400 border-amber-500/30"; };
const confBar = (c: number) => c >= 0.85 ? "from-emerald-500 to-emerald-400" : c >= 0.6 ? "from-amber-500 to-amber-400" : "from-red-500 to-red-400";

/* ── Main ── */
export default function ProfilePage() {
  const { isLoaded, isSignedIn, user: cu } = useUser();
  const [data, setData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<"identity" | "blueprints" | "purchases" | "activity">("identity");
  const [selBp, setSelBp] = useState<Blueprint | null>(null);

  const fetchP = useCallback(async () => { try { const r = await fetch("/api/user/profile"); if (r.ok) setData(await r.json()); } catch {} finally { setLoading(false); } }, []);
  useEffect(() => { if (isLoaded && isSignedIn) fetchP(); }, [isLoaded, isSignedIn, fetchP]);

  /* Loading */
  if (!isLoaded || loading) return (
    <div className="relative min-h-screen overflow-hidden"><BG variant="profile" />
      <div className="relative z-10 min-h-screen flex items-center justify-center">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-5">
          <div className="w-14 h-14 rounded-full border-2 border-white/10 border-t-cyan-400 animate-spin" />
          <span className="text-white/30 font-mono text-xs uppercase tracking-[0.3em]">Synchronizing neural link...</span>
        </motion.div>
      </div>
    </div>
  );

  /* Not signed in */
  if (!isSignedIn) return (
    <div className="relative min-h-screen overflow-hidden"><BG variant="profile" />
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-lg w-full">
          <div className="relative rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-2xl p-12 text-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/[0.03] to-purple-500/[0.03] pointer-events-none" />
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="w-20 h-20 mx-auto mb-8 rounded-full border border-white/10 bg-white/[0.03] flex items-center justify-center text-4xl">🔮</motion.div>
            <h1 className="text-3xl font-bold text-white mb-3 tracking-tight">Access Restricted</h1>
            <p className="text-white/40 mb-10 leading-relaxed">Unlock your personalized spiritual journey and access your consciousness blueprints.</p>
            <Link href="/login" className="inline-flex items-center justify-center gap-3 bg-gradient-to-r from-cyan-500 to-violet-500 text-white px-10 py-4 rounded-2xl font-bold text-sm hover:shadow-[0_0_40px_rgba(53,248,255,0.15)] transition-all duration-300 hover:scale-[1.02]">
              Initialize Membership <span className="text-lg">→</span>
            </Link>
            <Link href="/" className="block mt-8 text-sm text-white/25 hover:text-white/60 transition-colors">← Return to Terminal</Link>
          </div>
        </motion.div>
      </div>
    </div>
  );

  const bp0 = data?.blueprints?.[0];
  const rev = data?.stats?.totalRevenue || 0;

  return (
    <div className="relative min-h-screen overflow-hidden">
      <BG variant="profile" />

      <div className="relative z-10">
        {/* ── Nav ── */}
        <nav className="sticky top-0 z-50 border-b border-white/[0.06] bg-black/30 backdrop-blur-2xl">
          <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="font-black text-lg tracking-[0.15em] text-white/90 hover:text-cyan-400 transition-colors duration-300">
              SPIRITUAL <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">AI</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/admin" className="text-xs font-semibold uppercase tracking-widest text-white/25 hover:text-cyan-400 transition-colors">Admin</Link>
              <Link href="/" className="text-xs font-semibold uppercase tracking-widest text-white/25 hover:text-white transition-colors">Home</Link>
            </div>
          </div>
        </nav>

        {/* ── Content ── */}
        <main className="max-w-6xl mx-auto px-6 py-10 md:py-16 grid lg:grid-cols-[1fr_320px] gap-10 items-start">

          {/* ═══ Left ═══ */}
          <div className="space-y-8">

            {/* Hero Card */}
            <motion.section initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="relative rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl overflow-hidden">
              {/* Glow */}
              <div className="absolute -top-20 -right-20 w-60 h-60 bg-gradient-to-br from-violet-500/10 to-cyan-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-gradient-to-tr from-cyan-500/8 to-transparent rounded-full blur-3xl pointer-events-none" />

              <div className="relative p-8 md:p-10 flex flex-col md:flex-row gap-8 items-center md:items-start text-center md:text-left">
                {/* Avatar */}
                <div className="shrink-0">
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-tr from-cyan-500 via-violet-500 to-purple-500 opacity-60 blur-sm" />
                    <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden bg-[#0a0a0f] border-2 border-white/10">
                      {cu?.imageUrl ? <Image src={cu.imageUrl} alt="Profile" fill className="object-cover" /> : (
                        <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-white/20">{ini(cu?.fullName || cu?.primaryEmailAddress?.emailAddress || "?")}</div>
                      )}
                    </div>
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-[#0a0a0f] animate-pulse" />
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-3 mb-2 justify-center md:justify-start">
                      <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight">{cu?.fullName || "Initiate"}</h1>
                      {bp0?.mbti && <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border bg-gradient-to-r ${mbtiClr(bp0.mbti)}`}>{bp0.mbti}</span>}
                      {rev > 0 && <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest border from-emerald-500/20 to-emerald-600/10 text-emerald-400 border-emerald-500/30">Premium</span>}
                    </div>
                    <p className="text-white/35 font-mono text-sm flex items-center gap-2 justify-center md:justify-start">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />{cu?.primaryEmailAddress?.emailAddress}
                    </p>
                    {bp0?.csn && (
                      <div className="mt-3 flex items-center gap-2 justify-center md:justify-start">
                        <span className="font-mono text-xs text-cyan-400/80 bg-cyan-500/5 border border-cyan-500/15 px-3 py-1 rounded-lg">{bp0.csn}</span>
                        {bp0.consciousnessIdentity && <span className="text-xs text-white/30">{bp0.consciousnessIdentity}</span>}
                      </div>
                    )}
                  </div>
                  {/* Stats pills */}
                  <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                    {[{ l: "Blueprints", v: data?.stats?.totalBlueprints || 0 }, { l: "Sessions", v: data?.stats?.totalSessions || 0 }, { l: "Revenue: ", v: $(rev), r: true }].map((s, i) => (
                      <div key={i} className="px-4 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-sm">
                        <div className={`text-lg font-bold ${s.r ? "text-emerald-400" : "text-white"}`}>{s.v}</div>
                        <div className="text-[9px] uppercase tracking-wider text-white/25 font-semibold">{s.l}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.section>

            {/* Tabs */}
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.5 }}
              className="flex bg-white/[0.03] p-1.5 rounded-2xl border border-white/[0.06] backdrop-blur-xl">
              {([
                { id: "identity" as const, l: "Identity", c: data?.summary ? 1 : 0, i: "🔮" },
                { id: "blueprints" as const, l: "Blueprints", c: data?.stats?.totalBlueprints || 0, i: "🧠" },
                { id: "purchases" as const, l: "Purchases", c: data?.stats?.totalPurchases || 0, i: "🛒" },
                { id: "activity" as const, l: "Activity", c: data?.stats?.totalSessions || 0, i: "📊" },
              ]).map((t) => (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className={`flex-1 px-3 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                    tab === t.id ? "bg-gradient-to-r from-white/[0.08] to-white/[0.04] text-white shadow-lg shadow-black/20 border border-white/[0.08]" : "text-white/30 hover:text-white/60 hover:bg-white/[0.02]"
                  }`}>
                  {t.i} {t.l} {t.c > 0 && <span className={`ml-1.5 text-[9px] ${tab === t.id ? "text-cyan-400" : "text-white/20"}`}>({t.c})</span>}
                </button>
              ))}
            </motion.div>

            {/* Tab Content */}
            <AnimatePresence mode="wait">
              {/* ═══ IDENTITY TAB ═══ */}
              {tab === "identity" && (
                <motion.div key="id" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                  {(!data?.summary || !data.summary.narrative) ? (
                    <div className="rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.01] p-16 text-center">
                      <div className="text-5xl mb-5">🔮</div>
                      <p className="text-white/25 font-mono text-sm mb-3">NO IDENTITY PROFILE YET</p>
                      <p className="text-white/15 text-xs mb-8">Complete a conversation with Chaitanya to build your consciousness profile.</p>
                      <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-cyan-400 hover:shadow-[0_0_30px_rgba(53,248,255,0.1)] transition-all duration-300">Begin Decode →</Link>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {/* Narrative */}
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Consciousness Summary</h3>
                        <p className="text-white/70 text-sm leading-relaxed">{data.summary.narrative}</p>
                        <div className="mt-3 text-[10px] text-white/20">Last refined: {ago(data.summary.updatedAt)}</div>
                      </div>

                      {/* Identifiers Grid */}
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6">
                        <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-4">Identifier Confidence</h3>
                        <div className="space-y-3">
                          {([
                            { key: 'mbti', label: 'MBTI Type', icon: '🧬' },
                            { key: 'shadow', label: 'Shadow Pattern', icon: '🌑' },
                            { key: 'coreProblem', label: 'Core Problem', icon: '🔥' },
                            { key: 'blindspot', label: 'Blindspot', icon: '👁️' },
                            { key: 'astrology', label: 'Astrology', icon: '✨' },
                            { key: 'productVector', label: 'Product Resonance', icon: '🎯' },
                          ]).map((id) => {
                            const idData = data.summary?.identifiers?.[id.key];
                            const conf = idData?.confidence || 0;
                            const val = id.key === 'mbti' ? idData?.type : id.key === 'astrology' ? `${idData?.sunSign} / ${idData?.vedicRashi}` : idData?.pattern || idData?.problem || idData?.category || '—';
                            return (
                              <div key={id.key} className="flex items-center gap-3">
                                <span className="text-sm w-5">{id.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-[10px] uppercase tracking-wider text-white/30 font-semibold">{id.label}</span>
                                    <span className="text-[10px] text-white/40">{Math.round(conf * 100)}%</span>
                                  </div>
                                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div className={`h-full bg-gradient-to-r ${confBar(conf)} rounded-full transition-all`} style={{ width: `${conf * 100}%` }} />
                                  </div>
                                  <div className="text-[10px] text-white/50 mt-0.5 truncate">{val}</div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Suggested Next + Unexplored */}
                      {(data.summary.suggestedNextTopic || (data.summary.unexploredAreas && data.summary.unexploredAreas.length > 0)) && (
                        <div className="rounded-2xl border border-cyan-500/10 bg-cyan-500/[0.02] backdrop-blur-xl p-6">
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-400/50 mb-3">Next Exploration</h3>
                          {data.summary.suggestedNextTopic && (
                            <p className="text-white/60 text-sm mb-3">{data.summary.suggestedNextTopic}</p>
                          )}
                          {data.summary.unexploredAreas && data.summary.unexploredAreas.length > 0 && (
                            <div className="flex flex-wrap gap-2">
                              {data.summary.unexploredAreas.slice(0, 5).map((area: string, i: number) => (
                                <span key={i} className="px-3 py-1 rounded-lg border border-white/[0.06] bg-white/[0.02] text-[10px] text-white/40 uppercase tracking-wider">{area}</span>
                              ))}
                            </div>
                          )}
                          <Link href="/" className="inline-flex items-center gap-2 mt-4 px-5 py-2 bg-cyan-500/10 border border-cyan-500/20 rounded-xl text-xs font-bold text-cyan-400 hover:bg-cyan-500/20 transition-all">
                            Continue Exploration →
                          </Link>
                        </div>
                      )}

                      {/* Problems Explored */}
                      {data.summary.problemsExplored && data.summary.problemsExplored.length > 0 && (
                        <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6">
                          <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-3">Patterns Explored</h3>
                          <div className="flex flex-wrap gap-2">
                            {data.summary.problemsExplored.map((p: any, i: number) => (
                              <span key={i} className={`px-3 py-1 rounded-lg border text-[10px] uppercase tracking-wider ${p.resolved ? 'border-emerald-500/20 bg-emerald-500/[0.05] text-emerald-400/70' : 'border-white/[0.06] bg-white/[0.02] text-white/40'}`}>
                                {p.problem} {p.resolved ? '✓' : ''}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Blueprints */}
              {tab === "blueprints" && (
                <motion.div key="bp" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                  {(!data?.blueprints || !data.blueprints.length) ? (
                    <div className="rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.01] p-16 text-center">
                      <div className="text-5xl mb-5">🧠</div>
                      <p className="text-white/25 font-mono text-sm mb-8">NO SAVED BLUEPRINTS FOUND</p>
                      <Link href="/" className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-cyan-400 hover:shadow-[0_0_30px_rgba(53,248,255,0.1)] transition-all duration-300">Start Your Decode →</Link>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {data.blueprints.map((bp, i) => (
                        <motion.div key={bp.csn} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}
                          onClick={() => setSelBp(selBp?.csn === bp.csn ? null : bp)}
                          className="group relative rounded-2xl border border-white/[0.06] hover:border-violet-500/30 bg-white/[0.015] hover:bg-white/[0.03] backdrop-blur-sm p-5 flex items-center justify-between cursor-pointer transition-all duration-300">
                          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-violet-500/[0.03] to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                          <div className="flex items-center gap-4 relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-500/10 to-purple-600/5 border border-violet-500/15 flex items-center justify-center text-violet-400 text-lg font-bold">{bp.symbol || "Ψ"}</div>
                            <div>
                              <h4 className="font-semibold text-white group-hover:text-violet-300 transition-colors">{bp.consciousnessIdentity || "Unknown"}</h4>
                              <div className="flex items-center gap-2.5 mt-1">
                                <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold uppercase tracking-wider border bg-gradient-to-r ${mbtiClr(bp.mbti)}`}>{bp.mbti}</span>
                                <span className="text-[10px] font-mono text-white/20">{new Date(bp.createdAt).toLocaleDateString()}</span>
                                <span className="text-[10px] text-white/15">· {bp.timesShared || 0} shares</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 relative">
                            <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold bg-gradient-to-r ${bp.spiritualPath === "Jnana" ? "from-sky-500/15 to-blue-600/10 text-sky-400 border-sky-500/25" : bp.spiritualPath === "Bhakti" ? "from-violet-500/15 to-purple-600/10 text-violet-400 border-violet-500/25" : "from-amber-500/15 to-orange-600/10 text-amber-400 border-amber-500/25"} border`}>{bp.spiritualPath || "—"}</span>
                            <span className="text-white/15 group-hover:text-white/40 transition-colors text-sm">›</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {/* Expanded detail */}
                  <AnimatePresence>
                    {selBp && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}
                        className="mt-3 rounded-2xl border border-violet-500/20 bg-violet-500/[0.03] overflow-hidden">
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-5">
                            <h3 className="text-lg font-bold text-white">{selBp.consciousnessIdentity}</h3>
                            <button onClick={() => setSelBp(null)} className="text-white/25 hover:text-white/60 transition-colors text-sm">✕</button>
                          </div>
                          <div className="grid md:grid-cols-2 gap-4 text-sm">
                            {[
                              { l: "CSN", v: selBp.csn, m: true }, { l: "MBTI", v: selBp.mbti },
                              { l: "Core Pattern", v: selBp.corePattern || "—" }, { l: "Jungian Complex", v: selBp.jungianComplex || "—" },
                              { l: "Root Belief", v: selBp.rootBelief || "—", q: true }, { l: "Witness Level", v: selBp.witnessLevel || "—" },
                            ].map((f, i) => (
                              <div key={i}>
                                <div className="text-[10px] uppercase text-white/25 tracking-wider mb-1.5 font-semibold">{f.l}</div>
                                <div className={`${f.m ? "font-mono text-cyan-400/80 text-xs" : f.q ? "text-white/50 text-xs leading-relaxed italic" : "text-white/60 text-xs leading-relaxed"}`}>{f.v}</div>
                              </div>
                            ))}
                            <div>
                              <div className="text-[10px] uppercase text-white/25 tracking-wider mb-1.5 font-semibold">Urgency</div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-1.5 bg-white/5 rounded-full overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-violet-500 rounded-full transition-all" style={{ width: `${selBp.urgencyPercent || 0}%` }} /></div>
                                <span className="text-xs text-white/40">{selBp.urgencyPercent || 0}%</span>
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] uppercase text-white/25 tracking-wider mb-1.5 font-semibold">Impact</div>
                              <div className="text-white/50 text-xs">{selBp.timesShared || 0} shares · {(selBp as any).referralsGenerated || 0} referrals</div>
                            </div>
                          </div>
                          <div className="mt-5 pt-5 border-t border-white/5">
                            <Link href={`/blueprint/${selBp.csn}`} className="inline-flex items-center gap-2 px-5 py-2.5 bg-violet-500/10 border border-violet-500/20 rounded-xl text-xs font-bold text-violet-400 hover:bg-violet-500/20 transition-all">View Full Blueprint →</Link>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )}

              {/* Purchases */}
              {tab === "purchases" && (
                <motion.div key="pur" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                  {(!data?.purchases || !data.purchases.length) ? (
                    <div className="rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.01] p-16 text-center">
                      <div className="text-5xl mb-5">🛒</div><p className="text-white/25 font-mono text-sm mb-8">NO ACTIVE PROTOCOLS DETECTED</p>
                      <Link href="/" className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white hover:bg-white/[0.08] transition-all">Browse Products →</Link>
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      {data.purchases.map((o, i) => (
                        <motion.div key={o.id} initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04, duration: 0.3 }}
                          className="group rounded-2xl border border-white/[0.06] hover:border-white/[0.1] bg-white/[0.015] hover:bg-white/[0.03] backdrop-blur-sm p-5 flex items-center justify-between transition-all duration-300">
                          <div className="flex items-center gap-4">
                            <div className="w-11 h-11 rounded-xl bg-cyan-500/5 border border-cyan-500/10 flex items-center justify-center text-cyan-400 text-base">📦</div>
                            <div>
                              <h4 className="font-semibold text-white group-hover:text-cyan-300 transition-colors text-sm">{o.productName}</h4>
                              <div className="flex items-center gap-2 mt-0.5">
                                <span className="text-[10px] font-mono text-white/20">ID: {o.id.slice(0, 10)}...</span>
                                <span className="text-[10px] font-mono text-white/15">{new Date(o.purchasedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-base font-bold ${o.status === "refunded" ? "text-red-400/60 line-through" : "text-white"}`}>${(o.amount)}</div>
                            <span className={`inline-block mt-1 px-2 py-0.5 rounded-md text-[8px] font-bold uppercase tracking-wider border bg-gradient-to-r ${statusClr(o.status)}`}>{o.status}</span>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              )}

              {/* Activity */}
              {tab === "activity" && (
                <motion.div key="act" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.35 }}>
                  {(!data?.sessions || !data.sessions.length) ? (
                    <div className="rounded-3xl border border-dashed border-white/[0.08] bg-white/[0.01] p-16 text-center">
                      <div className="text-5xl mb-5">📊</div><p className="text-white/25 font-mono text-sm mb-8">NO SESSION ACTIVITY RECORDED</p>
                      <Link href="/" className="inline-flex items-center gap-2 bg-white/[0.04] border border-white/[0.08] px-8 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-all">Start Session →</Link>
                    </div>
                  ) : (
                    <div className="rounded-2xl border border-white/[0.06] bg-white/[0.015] backdrop-blur-sm overflow-hidden">
                      <table className="w-full text-sm">
                        <thead><tr className="border-b border-white/[0.06] bg-white/[0.02]">
                          {["Session", "Date", "Exchanges", "Status", "Report"].map((h) => <th key={h} className="px-5 py-3.5 text-left text-[10px] uppercase tracking-wider text-white/25 font-semibold">{h}</th>)}
                        </tr></thead>
                        <tbody>{data.sessions.map((s) => (
                          <tr key={s.id} className="border-b border-white/[0.03] hover:bg-white/[0.02] transition-colors">
                            <td className="px-5 py-3.5 font-mono text-xs text-white/40">{s.id.slice(0, 16)}...</td>
                            <td className="px-5 py-3.5 text-xs text-white/35">{new Date(s.startedAt).toLocaleDateString()}</td>
                            <td className="px-5 py-3.5 text-xs text-white/50">{s.exchangeCount || 0}</td>
                            <td className="px-5 py-3.5"><span className={`px-2 py-0.5 rounded-md text-[9px] font-bold bg-gradient-to-r ${statusClr(s.completionStatus || "in_progress")}`}>{s.completionStatus || "in_progress"}</span></td>
                            <td className="px-5 py-3.5 text-xs">{s.reportGenerated ? <span className="text-emerald-400">✓</span> : <span className="text-white/15">—</span>}</td>
                          </tr>
                        ))}</tbody>
                      </table>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ═══ Right Sidebar ═══ */}
          <aside className="space-y-6 lg:sticky lg:top-24">
            {/* Metrics */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.5 }}
              className="rounded-3xl border border-white/[0.07] bg-white/[0.02] backdrop-blur-xl p-6">
              <h3 className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 mb-5 text-center">EVOLUTION METRICS</h3>
              <div className="grid grid-cols-2 gap-3">
                {[{ l: "Blueprints", v: data?.stats?.totalBlueprints || 0 }, { l: "Sessions", v: data?.stats?.totalSessions || 0 }, { l: "Purchases", v: data?.stats?.totalPurchases || 0 }, { l: "Revenue", v: $(rev) }].map((m, i) => (
                  <div key={i} className="p-3.5 rounded-xl border border-white/[0.05] bg-white/[0.02] text-center">
                    <div className={`text-xl font-bold ${i === 3 ? "text-emerald-400" : "text-white"}`}>{m.v}</div>
                    <div className="text-[8px] font-bold text-white/20 uppercase tracking-wider mt-0.5">{m.l}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Identity Card */}
            {bp0 && (
              <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.5 }}
                className="relative p-[1px] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 via-transparent to-cyan-500/10" />
                <div className="relative rounded-3xl bg-[#0a0a0f]/90 backdrop-blur-xl p-6 space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-violet-500/10 border border-violet-500/15 flex items-center justify-center text-violet-400 text-xs">🪪</span>
                    Identity Card
                  </h3>
                  <div className="space-y-3 text-xs">
                    {[{ l: "Type", v: bp0.mbti }, { l: "Architecture", v: bp0.consciousnessIdentity }, { l: "Path", v: bp0.spiritualPath || "—" }, { l: "Symbol", v: bp0.symbol || "Ψ" }].map((f, i) => (
                      <div key={i} className="flex justify-between items-center">
                        <span className="text-white/25">{f.l}</span>
                        <span className={`${i === 3 ? "text-violet-400 text-lg" : i === 0 ? "text-white font-bold" : "text-white/60"} text-right max-w-[150px] truncate`}>{f.v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Links */}
            <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.5 }}
              className="relative p-[1px] rounded-3xl overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/15 via-transparent to-transparent" />
                <div className="relative rounded-3xl bg-[#0a0a0f]/90 backdrop-blur-xl p-6 space-y-4">
                  <h3 className="font-semibold text-white flex items-center gap-2 text-sm">
                    <span className="w-8 h-8 rounded-lg bg-cyan-500/10 border border-cyan-500/15 flex items-center justify-center text-cyan-400 text-xs">🛡️</span>
                    Account
                  </h3>
                  <p className="text-xs text-white/30 leading-relaxed italic">Your consciousness data is encrypted across planetary nodes.</p>
                  <div className="pt-4 border-t border-white/[0.06] space-y-2.5">
                    <Link href="/admin" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-400/70 hover:text-cyan-400 transition-colors">⚙ Admin Panel →</Link>
                    <Link href="/sheets-dashboard" className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-white/25 hover:text-white/60 transition-colors">📊 Excel Dashboard →</Link>
                  </div>
                </div>
              </motion.div>
          </aside>
        </main>

        <footer className="max-w-6xl mx-auto px-6 py-10 border-t border-white/[0.04] text-center">
          <p className="text-[10px] uppercase font-bold tracking-[0.4em] text-white/10">Neural Synchronization Active · © 2026 SPIRITUAL AI</p>
        </footer>
      </div>
    </div>
  );
}
