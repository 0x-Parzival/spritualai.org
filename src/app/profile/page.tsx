"use client";

import { useUser, useClerk, UserButton, SignInButton } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PriceDisplay from "@/components/Currency/PriceDisplay";
import { motion, AnimatePresence } from "framer-motion";

interface Order {
    id: string;
    product_name: string;
    amount_paid: string;
    status: string;
    created_at: string;
    currency: string;
}

export default function ProfilePage() {
    const { isLoaded, isSignedIn, user: clerkUser } = useUser();
    const { signOut } = useClerk();
    
    const [orders, setOrders] = useState<Order[]>([]);
    const [blueprints, setBlueprints] = useState<any[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ bio: '', mbti_type: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (isSignedIn && clerkUser) {
            fetchOrders();
            fetchBlueprints();
        }
    }, [isSignedIn, clerkUser]);

    const fetchOrders = async () => {
        if (!clerkUser) return;
        const { data } = await supabase
            .from('orders')
            .select('*')
            .eq('user_id', clerkUser.id)
            .order('created_at', { ascending: false });
        if (data) setOrders(data);
    };

    const fetchBlueprints = async () => {
        if (!clerkUser) return;
        try {
            const res = await fetch('/api/spiritual/list-reports');
            const data = await res.json();
            if (data.success) {
                setBlueprints(data.data);
            }
        } catch (e) {
            console.error("Failed to fetch blueprints", e);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        if (!clerkUser) return;

        try {
            // Update metadata in Clerk or our own DB
            // For now, let's assume we store bio/mbti in Clerk public metadata
            // Note: This requires Clerk Secret Key on server, so we'd need an API route
            // For now, we just simulate or skip this part if we don't have the API set up
            setIsEditing(false);
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    if (!isLoaded) return (
        <div className="min-h-screen bg-[#050505] flex items-center justify-center">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
            >
                <div className="w-12 h-12 border-t-2 border-cyan-500 rounded-full animate-spin"></div>
                <span className="text-white/30 font-mono text-xs uppercase tracking-widest">Synchronizing...</span>
            </motion.div>
        </div>
    );

    if (!isSignedIn) return (
        <div className="min-h-screen bg-[#050505] flex flex-col items-center justify-center p-4 md:p-6 text-center">
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full glass-card p-6 md:p-10 rounded-3xl border border-white/5 bg-white/5 backdrop-blur-2xl"
            >
                <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 md:mb-8 border border-white/10">
                    <i className="fas fa-lock text-2xl md:text-3xl text-white/50"></i>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white mb-3 md:mb-4 tracking-tight">Access Restricted</h1>
                <p className="text-sm md:text-base text-gray-400 mb-8 md:mb-10 leading-relaxed">Unlock your personalized spiritual journey and access your transformation protocols.</p>

                <SignInButton mode="modal">
                    <button
                        className="w-full bg-white text-black h-12 md:h-14 rounded-2xl font-bold hover:bg-cyan-400 transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-cyan-500/20 group text-sm md:text-base"
                    >
                        Initialize Membership
                    </button>
                </SignInButton>

                <Link href="/" className="inline-block mt-6 md:mt-8 text-xs md:text-sm text-white/30 hover:text-white transition-colors duration-300">
                    Return to Terminal
                </Link>
            </motion.div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans selection:bg-cyan-500/30">
            {/* Background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-cyan-500/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/5 blur-[120px] rounded-full"></div>
            </div>

            {/* Header */}
            <nav className="border-b border-white/5 bg-black/40 backdrop-blur-xl sticky top-0 z-50">
                <div className="max-w-6xl mx-auto px-6 py-5 flex justify-between items-center">
                    <Link href="/" className="font-black text-xl tracking-[0.2em] text-white hover:text-cyan-400 transition-colors duration-500">
                        SPIRITUAL <span className="text-cyan-500">AI</span>
                    </Link>
                    <div className="flex items-center gap-6">
                        <UserButton />
                        <button onClick={() => signOut()} className="text-xs uppercase tracking-widest text-white/40 hover:text-red-400 transition-colors duration-300 font-bold">
                            Terminate Session
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-6xl mx-auto px-6 py-8 md:py-16 relative z-10">
                <div className="grid lg:grid-cols-[1fr_350px] gap-12 items-start">

                    <div className="space-y-12">
                        {/* Profile Hero Section */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/[0.02] border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-12 backdrop-blur-sm relative overflow-hidden group"
                        >
                            <div className="flex flex-col md:flex-row gap-10 items-center md:items-start text-center md:text-left relative z-10">
                                <div className="shrink-0">
                                    <div className="relative w-24 h-24 md:w-40 md:h-40 p-1 bg-gradient-to-tr from-cyan-500 to-purple-600 rounded-full shadow-2xl overflow-hidden group-hover:scale-105 transition-transform duration-700">
                                        <div className="w-full h-full rounded-full overflow-hidden bg-[#0a0a0f] relative">
                                            {clerkUser?.imageUrl ? (
                                                <Image
                                                    src={clerkUser.imageUrl}
                                                    alt="User Identity"
                                                    fill
                                                    className="object-cover opacity-90 hover:opacity-100 transition-opacity"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-4xl font-bold bg-white/5 text-white/20">
                                                    {clerkUser?.firstName?.charAt(0) || clerkUser?.primaryEmailAddress?.emailAddress.charAt(0)}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 space-y-6">
                                    <div>
                                        <div className="flex flex-wrap items-center gap-3 mb-2 justify-center md:justify-start">
                                            <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                                                {clerkUser?.fullName || "Initiate"}
                                            </h1>
                                            {editForm.mbti_type && (
                                                <span className="px-4 py-1.5 bg-cyan-500 text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.4)]">
                                                    {editForm.mbti_type}
                                                </span>
                                            )}
                                        </div>
                                        <p className="text-white/40 font-mono text-sm tracking-tighter flex items-center gap-2 justify-center md:justify-start">
                                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                                            {clerkUser?.primaryEmailAddress?.emailAddress}
                                        </p>
                                    </div>

                                    {!isEditing && (
                                        <AnimatePresence mode="wait">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                className="space-y-4"
                                            >
                                                {editForm.bio ? (
                                                    <p className="text-lg text-gray-400 leading-relaxed font-light italic">
                                                        "{editForm.bio}"
                                                    </p>
                                                ) : (
                                                    <p className="text-sm text-white/20 uppercase tracking-widest italic">User profile pending configuration...</p>
                                                )}
                                                <button
                                                    onClick={() => setIsEditing(true)}
                                                    className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors group/btn"
                                                >
                                                    Modify Identity <i className="fas fa-arrow-right transition-transform group-hover/btn:translate-x-1"></i>
                                                </button>
                                            </motion.div>
                                        </AnimatePresence>
                                    )}

                                    {isEditing && (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            className="grid gap-6 p-6 bg-white/[0.03] border border-white/5 rounded-3xl"
                                        >
                                            <div className="grid md:grid-cols-2 gap-6">
                                                <div className="space-y-2">
                                                    <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Psychometric Profile</label>
                                                    <select
                                                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 outline-none transition-all appearance-none cursor-pointer"
                                                        value={editForm.mbti_type}
                                                        onChange={(e) => setEditForm({ ...editForm, mbti_type: e.target.value })}
                                                    >
                                                        <option value="" className="bg-black">Unspecified</option>
                                                        {['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'].map(t => (
                                                            <option key={t} value={t} className="bg-black">{t}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-[10px] uppercase font-black text-white/30 tracking-widest">Cognitive Manifesto</label>
                                                <textarea
                                                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-cyan-500/50 outline-none h-28 resize-none transition-all"
                                                    placeholder="Define your purpose..."
                                                    value={editForm.bio}
                                                    onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                                />
                                            </div>
                                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                                                <button
                                                    onClick={handleSave}
                                                    disabled={saving}
                                                    className="flex-1 bg-white text-black h-12 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-cyan-400 transition-all disabled:opacity-50"
                                                >
                                                    {saving ? 'Synchronizing...' : 'Save Configuration'}
                                                </button>
                                                <button
                                                    onClick={() => setIsEditing(false)}
                                                    className="px-6 h-12 text-xs font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors"
                                                >
                                                    Discard
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </div>
                            </div>

                            {/* Decorative grid pattern */}
                            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>
                        </motion.section>

                        {/* Blueprints Section */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white px-2 border-l-4 border-purple-500">
                                    CONSCIOUSNESS BLUEPRINTS
                                </h2>
                            </div>

                            {blueprints.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white/[0.01] border border-dashed border-white/10 rounded-[32px] p-12 text-center"
                                >
                                    <p className="text-white/30 font-mono text-sm">NO SAVED BLUEPRINTS FOUND</p>
                                </motion.div>
                            ) : (
                                <div className="grid gap-4">
                                    {blueprints.map((bp, idx) => (
                                        <motion.div
                                            key={bp.id}
                                            className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-2xl p-6 flex flex-col md:flex-row items-center justify-between transition-all"
                                        >
                                            <div className="flex items-center gap-6">
                                                <div className="w-14 h-14 bg-purple-500/10 border border-purple-500/20 rounded-xl flex items-center justify-center text-purple-400">
                                                    <i className="fas fa-brain text-xl"></i>
                                                </div>
                                                <div>
                                                    <h4 className="font-bold text-lg text-white group-hover:text-purple-400 transition-colors uppercase">
                                                        {bp.report_json?.architecture || "Spiritual Report"}
                                                    </h4>
                                                    <p className="text-[10px] font-mono text-white/30">{new Date(bp.created_at).toLocaleDateString()}</p>
                                                </div>
                                            </div>
                                            <Link 
                                                href={`/blueprint?id=${bp.id}`}
                                                className="mt-4 md:mt-0 px-6 py-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-widest transition-all"
                                            >
                                                View Analysis
                                            </Link>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </section>

                        {/* Activity / Protocols Section */}
                        <section className="space-y-8">
                            <div className="flex items-center justify-between">
                                <h2 className="text-2xl font-black text-white px-2 border-l-4 border-cyan-500">
                                    DEPLOYED PROTOCOLS
                                </h2>
                                <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest bg-white/5 px-3 py-1 rounded-full">
                                    {orders.length} ACTIVE SESSIONS
                                </span>
                            </div>

                            {orders.length === 0 ? (
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="bg-white/[0.01] border border-dashed border-white/10 rounded-[32px] p-20 text-center"
                                >
                                    <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                        <i className="fas fa-terminal text-2xl text-white/20"></i>
                                    </div>
                                    <p className="text-white/30 font-mono text-sm mb-8">NO ACTIVE PROTOCOLS DETECTED IN CLOUD REGISTRY</p>
                                    <Link href="/" className="inline-flex items-center gap-2 bg-white/5 border border-white/10 px-8 py-3 rounded-full text-xs font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all">
                                        Initialize Protocol
                                    </Link>
                                </motion.div>
                            ) : (
                                <div className="grid gap-4">
                                    {orders.map((order, idx) => (
                                        <motion.div
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: idx * 0.1 }}
                                            key={order.id}
                                            className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/5 hover:border-white/10 rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center justify-between transition-all duration-500"
                                        >
                                            <div className="flex items-center gap-6 mb-4 md:mb-0">
                                                <div className="w-14 h-14 bg-black/40 border border-white/10 rounded-xl flex items-center justify-center text-cyan-500 group-hover:shadow-[0_0_15px_rgba(6,182,212,0.2)] transition-all">
                                                    <i className="fas fa-code-branch text-xl"></i>
                                                </div>
                                                <div className="text-center md:text-left">
                                                    <h4 className="font-bold text-lg text-white group-hover:text-cyan-400 transition-colors uppercase tracking-tight">{order.product_name}</h4>
                                                    <div className="flex items-center gap-4 mt-1 justify-center md:justify-start">
                                                        <p className="text-[10px] font-mono text-white/30 uppercase">ID: {order.id.split('-')[0]}</p>
                                                        <span className="w-1 h-1 rounded-full bg-white/10"></span>
                                                        <p className="text-[10px] font-mono text-white/30">{new Date(order.created_at).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="flex items-center gap-8 w-full md:w-auto justify-between md:justify-end border-t border-white/5 md:border-0 pt-4 md:pt-0">
                                                <div className="text-right">
                                                    <div className="text-lg font-black text-white mb-1">
                                                        <PriceDisplay amountUSD={order.amount_paid} />
                                                    </div>
                                                    <span className={`text-[9px] uppercase font-black tracking-widest px-3 py-1 rounded-full ${order.status === 'COMPLETED' ? 'bg-green-500/10 text-green-400 border border-green-500/20' :
                                                        order.status === 'FAILED' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                            'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20'
                                                        }`}>
                                                        {order.status}
                                                    </span>
                                                </div>
                                                <button className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-all">
                                                    <i className="fas fa-arrow-up-right-from-square text-xs"></i>
                                                </button>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            )}
                        </section>
                    </div>

                    {/* Sidebar / Stats */}
                    <aside className="space-y-6 lg:sticky lg:top-32">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="bg-white/[0.02] border border-white/5 rounded-[32px] p-8 text-center"
                        >
                            <h3 className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-8 px-4 py-1.5 bg-white/5 rounded-full inline-block">
                                EVOLUTION METRICS
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="text-2xl font-black text-white mb-1">{orders.length}</div>
                                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-wider">Acquired</div>
                                </div>
                                <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                    <div className="text-2xl font-black text-white mb-1">0%</div>
                                    <div className="text-[9px] font-bold text-white/20 uppercase tracking-wider">Mastery</div>
                                </div>
                            </div>
                        </motion.div>

                        <div className="bg-gradient-to-br from-cyan-500/10 to-transparent p-[1px] rounded-[32px]">
                            <div className="bg-[#0f0f15] rounded-[32px] p-8 space-y-6">
                                <h3 className="font-bold text-white flex items-center gap-2">
                                    <i className="fas fa-shield-alt text-cyan-500"></i> Terminal Security
                                </h3>
                                <div className="space-y-4">
                                    <p className="text-xs text-white/40 leading-relaxed italic">
                                        Your neural interface data is encrypted and persistent across planetary nodes.
                                    </p>
                                    <div className="pt-4 border-t border-white/5">
                                        <Link href="/settings" className="block text-[10px] font-black uppercase tracking-widest text-cyan-400 hover:text-white transition-colors">
                                            Universal Settings <i className="fas fa-chevron-right ml-1"></i>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                </div>
            </main>

            <footer className="max-w-6xl mx-auto px-6 py-12 border-t border-white/5 text-center">
                <p className="text-[10px] uppercase font-black tracking-[0.4em] text-white/10">
                    Neural Synchronization Active &copy; 2026 SPIRITUAL AI
                </p>
            </footer>
        </div>
    );
}
