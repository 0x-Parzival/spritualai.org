"use client";

import { useAuth } from "@/context/AuthContext";
import { supabase } from "@/lib/supabase/client";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PriceDisplay from "@/components/Currency/PriceDisplay";

interface Order {
    id: string;
    product_name: string;
    amount_paid: string;
    status: string;
    created_at: string;
    currency: string;
}

export default function ProfilePage() {
    const { user, profile, loading, signInWithGoogle, signOut, refreshProfile } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editForm, setEditForm] = useState({ bio: '', mbti_type: '' });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        if (profile) {
            setEditForm({ bio: profile.bio || '', mbti_type: profile.mbti_type || '' });
            fetchOrders();
        }
    }, [profile]);

    const fetchOrders = async () => {
        const { data } = await supabase
            .from('orders')
            .select('*')
            .order('created_at', { ascending: false });
        if (data) setOrders(data);
    };

    const handleSave = async () => {
        setSaving(true);
        if (!user) return;

        try {
            const { error } = await supabase
                .from('profiles')
                .update({ bio: editForm.bio, mbti_type: editForm.mbti_type })
                .eq('id', user.id);

            if (!error) {
                await refreshProfile();
                setIsEditing(false);
            }
        } catch (e) {
            console.error(e);
        } finally {
            setSaving(false);
        }
    };

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center text-white/50">
            Loading profile...
        </div>
    );

    if (!user) return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white space-y-6">
            <h1 className="text-2xl font-bold">Access Restricted</h1>
            <p className="text-gray-400">Please login to view your profile and orders.</p>
            <button
                onClick={signInWithGoogle}
                className="bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
            >
                <i className="fab fa-google"></i> Login with Google
            </button>
            <Link href="/" className="text-sm text-gray-500 hover:text-white">Return Home</Link>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#050505] text-gray-100 font-sans">
            {/* Header */}
            <nav className="border-b border-white/10 bg-black/50 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
                    <Link href="/" className="font-bold text-lg tracking-wider text-white">SPIRITUAL AI</Link>
                    <button onClick={signOut} className="text-sm text-gray-400 hover:text-white transition-colors">
                        Sign Out
                    </button>
                </div>
            </nav>

            <main className="max-w-4xl mx-auto px-4 py-12">

                {/* Profile Header */}
                <div className="bg-[#0f0f15] border border-white/5 rounded-2xl p-8 mb-8 flex flex-col md:flex-row gap-8 items-start md:items-center">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-white/10">
                        {profile?.avatar_url ? (
                            <Image
                                src={profile.avatar_url}
                                alt="User"
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-2xl">
                                {profile?.full_name?.charAt(0) || user.email?.charAt(0)}
                            </div>
                        )}
                    </div>

                    <div className="flex-1">
                        <h1 className="text-3xl font-bold text-white mb-2">{profile?.full_name || "Traveler"}</h1>
                        <p className="text-gray-400 font-mono text-sm">{user.email}</p>

                        {!isEditing && (
                            <div className="mt-4 flex flex-wrap gap-4">
                                {profile?.mbti_type && (
                                    <span className="px-3 py-1 bg-cyan-900/30 border border-cyan-500/30 text-cyan-400 text-xs rounded-full uppercase tracking-wider font-bold">
                                        {profile.mbti_type}
                                    </span>
                                )}
                                {profile?.bio && (
                                    <p className="w-full text-gray-300 italic border-l-2 border-white/20 pl-4 py-1 text-sm leading-relaxed">
                                        "{profile.bio}"
                                    </p>
                                )}
                            </div>
                        )}

                        {isEditing && (
                            <div className="mt-6 space-y-4 max-w-md bg-black/20 p-4 rounded-lg">
                                <div>
                                    <label className="text-xs uppercase text-gray-500 mb-1 block">Personality Type (MBTI)</label>
                                    <select
                                        className="w-full bg-[#1a1a20] border border-white/10 rounded p-2 text-sm focus:border-cyan-500/50 outline-none"
                                        value={editForm.mbti_type}
                                        onChange={(e) => setEditForm({ ...editForm, mbti_type: e.target.value })}
                                    >
                                        <option value="">Select Type</option>
                                        {['INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'].map(t => (
                                            <option key={t} value={t}>{t}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="text-xs uppercase text-gray-500 mb-1 block">Your Bio / Manifesto</label>
                                    <textarea
                                        className="w-full bg-[#1a1a20] border border-white/10 rounded p-2 text-sm focus:border-cyan-500/50 outline-none h-24 resize-none"
                                        placeholder="What brings you here?"
                                        value={editForm.bio}
                                        onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => {
                            if (isEditing) handleSave();
                            else setIsEditing(true);
                        }}
                        disabled={saving}
                        className={`px-5 py-2 rounded-lg text-sm font-bold border transition-colors ${isEditing
                                ? 'bg-white text-black border-white hover:bg-gray-200'
                                : 'bg-transparent text-white border-white/20 hover:border-white'
                            }`}
                    >
                        {saving ? 'Saving...' : (isEditing ? 'Save Profile' : 'Edit Profile')}
                    </button>
                    {isEditing && (
                        <button
                            onClick={() => setIsEditing(false)}
                            className="text-sm text-gray-500 hover:text-white px-3"
                        >
                            Cancel
                        </button>
                    )}
                </div>

                {/* Orders Section */}
                <div>
                    <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                        <i className="fas fa-history text-cyan-500"></i> Purchase History
                    </h2>

                    {orders.length === 0 ? (
                        <div className="bg-[#0f0f15] border border-white/5 rounded-2xl p-12 text-center text-gray-500">
                            <i className="fas fa-box-open text-4xl mb-4 opacity-50"></i>
                            <p>No active protocols found.</p>
                            <Link href="/" className="inline-block mt-4 text-cyan-400 hover:text-cyan-300 text-sm">
                                Explore Products
                            </Link>
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {orders.map((order) => (
                                <div key={order.id} className="bg-[#0f0f15] border border-white/5 rounded-xl p-5 flex items-center justify-between group hover:border-white/20 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-cyan-900/10 rounded-lg flex items-center justify-center text-cyan-500">
                                            <i className="fas fa-file-code"></i>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-white">{order.product_name}</h4>
                                            <p className="text-xs text-gray-500">{new Date(order.created_at).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-sm font-mono text-gray-300">
                                            <PriceDisplay amountUSD={order.amount_paid} />
                                        </div>
                                        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${order.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                                                order.status === 'FAILED' ? 'bg-red-500/20 text-red-400' :
                                                    'bg-yellow-500/20 text-yellow-400'
                                            }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}
