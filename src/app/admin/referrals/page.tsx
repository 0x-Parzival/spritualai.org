"use client";

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Link from "next/link";
import PriceDisplay from "@/components/Currency/PriceDisplay";

interface Referral {
    id: string;
    code: string;
    discount_percentage: number;
    usage_count: number;
    total_revenue_generated: number;
    is_active: boolean;
    created_at: string;
}

export default function ReferralsAdmin() {
    const { user, loading } = useAuth();
    const [referrals, setReferrals] = useState<Referral[]>([]);
    const [newCode, setNewCode] = useState("");
    const [discount, setDiscount] = useState(10);
    const [error, setError] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        if (user) fetchReferrals();
    }, [user]);

    const fetchReferrals = async () => {
        const { data, error } = await supabase
            .from('referrals')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setReferrals(data);
        if (error) console.error(error);
    };

    const handleCreate = async () => {
        setError("");
        if (!newCode || newCode.length !== 6) {
            setError("Code must be exactly 6 characters.");
            return;
        }
        setCreating(true);

        try {
            const { data, error } = await supabase.from('referrals').insert({
                code: newCode.toUpperCase(),
                discount_percentage: discount,
                created_by: user?.id,
                usage_count: 0,
                total_revenue_generated: 0
            }).select();

            if (error) throw error;

            setNewCode("");
            fetchReferrals();
        } catch (e: any) {
            setError(e.message || "Failed to create code. It might already exist.");
        } finally {
            setCreating(false);
        }
    };

    if (loading) return <div className="p-10 text-white">Loading...</div>;
    if (!user) return <div className="p-10 text-white">Access Denied. Please Login.</div>;

    // Optional: Real admin check here if needed in future
    // if (user.email !== 'admin@spiritualai.store') ...

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans p-8">
            <div className="max-w-5xl mx-auto">
                <div className="flex justify-between items-center mb-10">
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
                        Referral Command Center
                    </h1>
                    <Link href="/profile" className="text-gray-500 hover:text-white transition-colors">
                        ← Back to Profile
                    </Link>
                </div>

                {/* Create Section */}
                <div className="bg-[#0f0f15] border border-white/5 rounded-2xl p-6 mb-10">
                    <h2 className="text-lg font-bold text-white mb-4">Create New Protocol</h2>
                    <div className="flex gap-4 items-end flex-wrap">
                        <div className="flex-1 min-w-[200px]">
                            <label className="block text-xs uppercase text-gray-500 mb-2">Code (6 Characters)</label>
                            <input
                                type="text"
                                className="w-full bg-[#1a1a20] border border-white/10 rounded p-3 text-white focus:border-cyan-500/50 outline-none uppercase font-mono tracking-widest"
                                placeholder="SAVE10"
                                maxLength={6}
                                value={newCode}
                                onChange={(e) => setNewCode(e.target.value)}
                            />
                        </div>
                        <div className="w-32">
                            <label className="block text-xs uppercase text-gray-500 mb-2">Discount %</label>
                            <input
                                type="number"
                                className="w-full bg-[#1a1a20] border border-white/10 rounded p-3 text-white focus:border-cyan-500/50 outline-none font-mono"
                                value={discount}
                                onChange={(e) => setDiscount(Number(e.target.value))}
                                min={1}
                                max={100}
                            />
                        </div>
                        <button
                            onClick={handleCreate}
                            disabled={creating}
                            className="bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3 px-6 rounded transition-colors disabled:opacity-50 h-[50px]"
                        >
                            {creating ? 'Deploying...' : 'Deploy Code'}
                        </button>
                    </div>
                    {error && <p className="text-red-400 text-sm mt-3"><i className="fas fa-exclamation-circle mr-2"></i>{error}</p>}
                </div>

                {/* List Section */}
                <h2 className="text-xl font-bold text-white mb-6">Active Protocols ({referrals.length})</h2>

                <div className="grid gap-4">
                    {referrals.map((ref) => (
                        <div key={ref.id} className="bg-[#0f0f15] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-white/20 transition-all">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-lg flex items-center justify-center text-white font-mono text-xl font-bold border border-white/10 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
                                    {ref.discount_percentage}%
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold font-mono tracking-wider text-cyan-400">{ref.code}</h3>
                                    <p className="text-xs text-gray-500 mt-1">Deployed {new Date(ref.created_at).toLocaleDateString()}</p>
                                </div>
                            </div>

                            <div className="flex gap-8 text-right">
                                <div>
                                    <div className="text-xs uppercase text-gray-500 mb-1">Usage</div>
                                    <div className="text-xl font-bold text-white">{ref.usage_count}</div>
                                </div>
                                <div>
                                    <div className="text-xs uppercase text-gray-500 mb-1">Revenue</div>
                                    <div className="text-xl font-bold text-green-400">
                                        <PriceDisplay amountUSD={ref.total_revenue_generated} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
