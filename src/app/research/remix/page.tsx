"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Loader2, BookOpen, Settings, ArrowRight, Download, Share2 } from 'lucide-react';

export default function ResearchRemixPage() {
    const [product, setProduct] = useState('');
    const [preferences, setPreferences] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<any>(null);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!product) return;

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const response = await fetch('/api/research-remix', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ product, preferences }),
            });

            if (!response.ok) throw new Error('Failed to generate report');

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError('Something went wrong. Please try again.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/research" className="flex items-center gap-3 group">
                    <span className="font-black tracking-widest uppercase text-xs text-white/60 group-hover:text-white transition-colors">
                        Spiritual AI <span className="text-cyan-500">Labs</span>
                    </span>
                    <span className="text-[10px] px-2 py-0.5 border border-cyan-500/30 rounded text-cyan-400 bg-cyan-500/10 uppercase tracking-tighter">Research Remix</span>
                </Link>
                <Link href="/research" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                    Back to Protocols
                </Link>
            </header>

            <main className="pt-32 px-6 max-w-4xl mx-auto pb-32">
                <section className="mb-12">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
                        Product <span className="text-cyan-500 not-italic font-light">Researcher</span>
                    </h1>
                    <p className="text-lg text-white/60 max-w-2xl leading-relaxed">
                        Automated, in-depth research synthesized into spiritual-grade market intelligence. Input your target product and specific constraints.
                    </p>
                </section>

                <div className="space-y-12">
                    {/* Input Section */}
                    <div className="bg-white/5 border border-white/10 rounded-[30px] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Settings className="w-24 h-24" />
                        </div>

                        <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-cyan-500">Target Product</label>
                                <div className="relative">
                                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
                                    <input
                                        type="text"
                                        value={product}
                                        onChange={(e) => setProduct(e.target.value)}
                                        placeholder="e.g., High-end Espresso Makers, Wearable Biosensors..."
                                        className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-12 pr-6 focus:outline-none focus:border-cyan-500/50 transition-all text-lg placeholder:text-white/20"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">Optional Preferences</label>
                                <textarea
                                    value={preferences}
                                    onChange={(e) => setPreferences(e.target.value)}
                                    placeholder="Budget under $2k, focus on sustainability, portable options only..."
                                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 px-6 focus:outline-none focus:border-cyan-500/50 transition-all min-h-[120px] placeholder:text-white/20"
                                />
                            </div>

                            <button
                                disabled={loading || !product}
                                className="w-full md:w-auto bg-white text-black font-black uppercase tracking-widest px-10 py-5 rounded-full hover:bg-cyan-500 hover:text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3 group"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Conducting Research...
                                    </>
                                ) : (
                                    <>
                                        Synthesize Report
                                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    {/* Error State */}
                    {error && (
                        <div className="p-6 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-400 text-center">
                            {error}
                        </div>
                    )}

                    {/* Result Section */}
                    {result && (
                        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
                            <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                <h2 className="text-2xl font-black uppercase italic tracking-tighter">
                                    Market <span className="text-cyan-500">Analysis</span>
                                </h2>
                                <div className="flex gap-4">
                                    <button className="p-2 text-white/40 hover:text-white transition-colors">
                                        <Download className="w-5 h-5" />
                                    </button>
                                    <button className="p-2 text-white/40 hover:text-white transition-colors">
                                        <Share2 className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>

                            <div className="prose prose-invert prose-cyan max-w-none bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16">
                                <div className="mb-12 flex flex-wrap gap-3">
                                    <span className="px-4 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-400 flex items-center gap-2">
                                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                                        Analysis Complete
                                    </span>
                                    {preferences && (
                                        <span className="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40">
                                            Custom Parameters Active
                                        </span>
                                    )}
                                </div>

                                <div className="report-content text-white/80 leading-relaxed space-y-8">
                                    {result.report.split('\n').map((line: string, i: number) => {
                                        if (line.startsWith('# ')) return <h1 key={i} className="text-4xl font-black tracking-tighter uppercase italic mt-12 first:mt-0 text-white">{line.replace('# ', '')}</h1>;
                                        if (line.startsWith('## ')) return <h2 key={i} className="text-2xl font-black tracking-tight mt-10 text-cyan-500">{line.replace('## ', '')}</h2>;
                                        if (line.startsWith('### ')) return <h3 key={i} className="text-xl font-bold mt-8 text-white/90">{line.replace('### ', '')}</h3>;
                                        if (line.trim() === '') return <br key={i} />;
                                        return <p key={i} className="text-lg text-white/60">{line}</p>;
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </main>

            {/* Background elements */}
            <div className="fixed inset-0 pointer-events-none -z-10">
                <div className="absolute top-1/4 -right-1/4 w-1/2 h-1/2 bg-cyan-500/5 blur-[120px] rounded-full" />
                <div className="absolute bottom-1/4 -left-1/4 w-1/2 h-1/2 bg-purple-500/5 blur-[120px] rounded-full" />
            </div>
        </div>
    );
}
