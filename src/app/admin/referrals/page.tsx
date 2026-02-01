"use client";

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { motion, AnimatePresence } from "framer-motion";

interface Referral {
    id: string;
    code: string;
    discount_percentage: number;
    usage_count: number;
    total_revenue_generated: number;
    is_active: boolean;
    created_at: string;
}

interface Sale {
    id: string;
    created_at: string;
    product_name: string;
    amount_paid: string;
    status: string;
    referral_code: string;
    profiles: {
        full_name: string | null;
        email: string | null;
    } | null;
}

export default function ReferralsAdmin() {
    const { user, profile, loading } = useAuth();
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [sales, setSales] = useState<Sale[]>([]);
    const [newCode, setNewCode] = useState("");
    const [discount, setDiscount] = useState(10);
    const [error, setError] = useState("");
    const [creating, setCreating] = useState(false);
    const [activeTab, setActiveTab] = useState<'codes' | 'sales'>('codes');

    useEffect(() => {
        if (profile?.is_admin) {
            fetchReferrals();
            fetchSales();
        }
    }, [profile]);

    const fetchReferrals = async () => {
        const { data, error } = await supabase
            .from('referrals')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setReferrals(data);
        if (error) console.error(error);
    };

    const fetchSales = async () => {
        // Fetch orders where referral_code is not null, joining with profiles
        const { data, error } = await supabase
            .from('orders')
            .select(`
                id,
                created_at,
                product_name,
                amount_paid,
                status,
                referral_code,
                profiles:user_id (
                    full_name,
                    email
                )
            `)
            .not('referral_code', 'is', null)
            .order('created_at', { ascending: false });

        if (data) setSales(data as any);
        if (error) console.error(error);
    };

    const handleCreate = async () => {
        setError("");
        if (!newCode || newCode.length < 3) {
            setError("Code must be at least 3 characters.");
            return;
        }
        setCreating(true);

        try {
            const { error } = await supabase.from('referrals').insert({
                code: newCode.toUpperCase(),
                discount_percentage: discount,
                created_by: user?.id,
                usage_count: 0,
                total_revenue_generated: 0
            });

            if (error) throw error;

            setNewCode("");
            fetchReferrals();
        } catch (e: any) {
            setError(e.message || "Failed to create code. It might already exist.");
        } finally {
            setCreating(false);
        }
    };

    const toggleCodeStatus = async (id: string, currentStatus: boolean) => {
        const { error } = await supabase
            .from('referrals')
            .update({ is_active: !currentStatus })
            .eq('id', id);

        if (!error) fetchReferrals();
    };

    if (loading) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-cyan-500"></div>
        </div>
    );

    if (!profile?.is_admin) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
            <div className="max-w-md bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-xl">
                <i className="fas fa-shield-virus text-4xl text-red-500 mb-6"></i>
                <h1 className="text-2xl font-bold text-white mb-4">Security Lockdown</h1>
                <p className="text-white/40 mb-8 leading-relaxed">Identity verification failed. This terminal is restricted to Level 4 Administrators only.</p>
                <Link href="/" className="bg-white text-black px-6 py-2 rounded-full font-bold text-sm tracking-tighter hover:bg-cyan-400 transition-all">
                    Return to Safe Zone
                </Link>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans p-6 md:p-12 selection:bg-cyan-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-5%] right-[-5%] w-[30%] h-[30%] bg-purple-500/5 blur-[100px] rounded-full"></div>
                <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-cyan-500/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="max-w-6xl mx-auto relative z-10">
                <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <span className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_10px_rgba(6,182,212,0.8)]"></span>
                            <h1 className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Nexus Control</h1>
                        </div>
                        <h2 className="text-4xl font-black text-white tracking-tighter uppercase italic">
                            Referral <span className="text-cyan-500 font-light not-italic">Engine</span>
                        </h2>
                    </div>

                    <div className="flex bg-white/5 p-1 rounded-2xl border border-white/10 backdrop-blur-md">
                        <button
                            onClick={() => setActiveTab('codes')}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'codes' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
                        >
                            Active Protocols
                        </button>
                        <button
                            onClick={() => setActiveTab('sales')}
                            className={`px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'sales' ? 'bg-white text-black shadow-xl' : 'text-white/40 hover:text-white'}`}
                        >
                            Sales Archive
                        </button>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    {activeTab === 'codes' ? (
                        <motion.div
                            key="codes"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-10"
                        >
                            {/* Create Section */}
                            <section className="bg-white/5 border border-white/10 rounded-[40px] p-8 md:p-10 backdrop-blur-sm relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-8 text-white/[0.02] text-8xl font-black italic select-none">DEPLOY</div>
                                <h3 className="text-sm font-black text-white mb-8 tracking-widest border-l-4 border-cyan-500 pl-4 uppercase">Initialize New Protocol</h3>

                                <div className="flex flex-col lg:flex-row gap-6 items-end relative z-10">
                                    <div className="flex-1 w-full space-y-2">
                                        <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] ml-2">Protocol Identifier (3-6 chars)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-mono tracking-widest focus:border-cyan-500/50 outline-none transition-all uppercase placeholder:text-white/10"
                                            placeholder="GALAXY"
                                            maxLength={10}
                                            value={newCode}
                                            onChange={(e) => setNewCode(e.target.value)}
                                        />
                                    </div>
                                    <div className="w-full lg:w-48 space-y-2">
                                        <label className="text-[10px] uppercase font-black text-white/30 tracking-[0.2em] ml-2">Discount Magnitude %</label>
                                        <input
                                            type="number"
                                            className="w-full bg-black/40 border border-white/5 rounded-2xl px-6 py-4 text-white font-mono focus:border-cyan-500/50 outline-none transition-all"
                                            value={discount}
                                            onChange={(e) => setDiscount(Number(e.target.value))}
                                            min={1}
                                            max={100}
                                        />
                                    </div>
                                    <button
                                        onClick={handleCreate}
                                        disabled={creating}
                                        className="w-full lg:w-auto bg-white text-black font-black py-4 px-10 rounded-2xl text-[10px] uppercase tracking-[0.2em] hover:bg-cyan-400 transition-all duration-300 disabled:opacity-30 shadow-[0_10px_30px_rgba(255,255,255,0.05)] active:scale-95"
                                    >
                                        {creating ? 'Synchronizing...' : 'Deploy Protocol'}
                                    </button>
                                </div>
                                {error && (
                                    <motion.p
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="text-red-400 text-[10px] font-black uppercase mt-6 tracking-widest flex items-center gap-2"
                                    >
                                        <i className="fas fa-times-circle"></i> {error}
                                    </motion.p>
                                )}
                            </section>

                            {/* List Section */}
                            <section className="space-y-6">
                                <div className="flex items-center justify-between px-4">
                                    <h3 className="text-xs font-black text-white tracking-[0.2em] uppercase">Active Neural Links</h3>
                                    <div className="text-[10px] font-mono text-white/20">{referrals.length} REGISTERED</div>
                                </div>

                                <div className="grid gap-4">
                                    {referrals.map((ref, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.05 }}
                                            key={ref.id}
                                            className="group bg-white/[0.02] border border-white/5 hover:border-white/10 rounded-3xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-8 transition-all duration-500 backdrop-blur-xl"
                                        >
                                            <div className="flex items-center gap-8 text-center md:text-left">
                                                <div className="relative">
                                                    <div className="w-20 h-20 bg-gradient-to-br from-white/5 to-transparent rounded-2xl flex items-center justify-center border border-white/10 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.15)] transition-all overflow-hidden">
                                                        <span className="text-3xl font-black text-cyan-500 italic">-{ref.discount_percentage}%</span>
                                                        <div className="absolute inset-0 bg-cyan-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                                    </div>
                                                </div>
                                                <div>
                                                    <h3 className="text-3xl font-black font-mono tracking-tighter text-white group-hover:text-cyan-400 transition-colors">{ref.code}</h3>
                                                    <div className="flex items-center gap-4 mt-2 justify-center md:justify-start">
                                                        <span className={`text-[9px] uppercase font-black tracking-widest px-2 py-0.5 rounded ${ref.is_active ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'}`}>
                                                            {ref.is_active ? 'Online' : 'Terminated'}
                                                        </span>
                                                        <span className="text-[9px] text-white/20 font-mono">EST: {new Date(ref.created_at).toLocaleDateString()}</span>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex gap-12 text-center md:text-right w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-0 pt-6 md:pt-0">
                                                <div>
                                                    <div className="text-[9px] uppercase font-black text-white/20 mb-2 tracking-[0.2em]">Deployments</div>
                                                    <div className="text-3xl font-black text-white">{ref.usage_count}</div>
                                                </div>
                                                <div>
                                                    <div className="text-[9px] uppercase font-black text-white/20 mb-2 tracking-[0.2em]">Total Yield</div>
                                                    <div className="text-3xl font-black text-green-400">
                                                        <PriceDisplay amountUSD={ref.total_revenue_generated} />
                                                    </div>
                                                </div>
                                                <div className="flex items-center">
                                                    <button
                                                        onClick={() => toggleCodeStatus(ref.id, ref.is_active)}
                                                        className={`w-12 h-12 rounded-full border transition-all flex items-center justify-center ${ref.is_active ? 'border-red-500/20 text-red-500 hover:bg-red-500 hover:text-white' : 'border-green-500/20 text-green-500 hover:bg-green-500 hover:text-white'}`}
                                                        title={ref.is_active ? "Terminate Protocol" : "Restore Protocol"}
                                                    >
                                                        <i className={`fas ${ref.is_active ? 'fa-power-off' : 'fa-play'}`}></i>
                                                    </button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </section>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="sales"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            <div className="flex items-center justify-between px-4">
                                <h3 className="text-xs font-black text-white tracking-[0.2em] uppercase">Neural Deployment logs</h3>
                                <div className="text-[10px] font-mono text-white/20">{sales.length} COMPLETED ARCHIVES</div>
                            </div>

                            <div className="bg-white/[0.02] border border-white/5 rounded-[40px] overflow-hidden backdrop-blur-xl">
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/5 bg-white/5 uppercase font-black text-[9px] tracking-[0.3em] text-white/40">
                                                <th className="px-8 py-6">Intelligence (Buyer)</th>
                                                <th className="px-8 py-6">Acquisition</th>
                                                <th className="px-8 py-6">Agent Code</th>
                                                <th className="px-8 py-6">Yield</th>
                                                <th className="px-8 py-6">Status</th>
                                                <th className="px-8 py-6 text-right">Timestamp</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {sales.length === 0 ? (
                                                <tr>
                                                    <td colSpan={6} className="px-8 py-20 text-center text-xs font-black text-white/10 tracking-[0.5em] uppercase">No archives detected in cloud nodes</td>
                                                </tr>
                                            ) : (
                                                sales.map((sale, idx) => (
                                                    <motion.tr
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        transition={{ delay: idx * 0.03 }}
                                                        key={sale.id}
                                                        className="border-b border-white/[0.02] hover:bg-white/[0.03] transition-colors group"
                                                    >
                                                        <td className="px-8 py-6">
                                                            <div className="flex flex-col">
                                                                <span className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{sale.profiles?.full_name || "Unknown Bio"}</span>
                                                                <span className="text-[10px] font-mono text-white/30">{sale.profiles?.email || "No Email"}</span>
                                                            </div>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="text-xs font-black text-white/60 uppercase group-hover:text-white transition-colors">{sale.product_name}</span>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className="px-3 py-1 bg-white/5 border border-white/10 text-cyan-500 font-mono text-[10px] rounded-lg font-bold tracking-widest">{sale.referral_code}</span>
                                                        </td>
                                                        <td className="px-8 py-6 font-mono text-green-400 font-bold">
                                                            {sale.amount_paid}
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className={`text-[8px] uppercase font-black tracking-widest px-2 py-0.5 rounded-full ${sale.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20'}`}>
                                                                {sale.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 text-right font-mono text-[10px] text-white/20 whitespace-nowrap">
                                                            {new Date(sale.created_at).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                                                        </td>
                                                    </motion.tr>
                                                ))
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <footer className="mt-20 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="text-[10px] font-black tracking-[0.4em] text-white/10 uppercase">
                        Admin Terminal v4.0.2 &copy; Spiritual AI
                    </div>
                    <div className="flex gap-8">
                        <Link href="/profile" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Return Terminal</Link>
                        <Link href="/" className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-white transition-colors">Sector Home</Link>
                    </div>
                </footer>
            </div>
        </div>
    );
}
