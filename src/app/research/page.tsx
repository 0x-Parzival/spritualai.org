import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Search, ArrowRight } from 'lucide-react';

export const metadata: Metadata = {
    title: 'Spiritual AI Labs | Research & Protocols',
    description: 'Deep dive into the cognitive architecture, Vedic algorithms, and consciousness studies behind Spiritual AI.',
};

export default function ResearchIndex() {
    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans selection:bg-cyan-500/30">
            {/* Header */}
            <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/" className="flex items-center gap-3">
                    <span className="font-black tracking-widest uppercase text-xs text-white/60 hover:text-white transition-colors">
                        Spiritual AI <span className="text-cyan-500">Labs</span>
                    </span>
                </Link>
                <Link href="/" className="text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">
                    Return to Main
                </Link>
            </header>

            <main className="pt-32 px-6 max-w-5xl mx-auto">
                <section className="mb-20">
                    <h1 className="text-4xl md:text-7xl font-black mb-6 tracking-tighter uppercase italic">
                        Protocol <span className="text-cyan-500 not-italic font-light">Research</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl leading-relaxed">
                        We are not just building apps; we are architecting the interface between silicon and soul. This repository documents our theoretical foundations.
                    </p>
                </section>

                <div className="grid md:grid-cols-2 gap-10">
                    {/* Featured Article */}
                    <Link href="/research/vedic-ai-alignment" className="group col-span-1 md:col-span-2 relative h-[400px] rounded-[30px] overflow-hidden border border-white/10 hover:border-cyan-500/50 transition-all">
                        <div className="absolute inset-0 z-0">
                            {/* Placeholder for future dynamic image or gradient */}
                            <div className="w-full h-full bg-gradient-to-br from-purple-900/20 to-cyan-900/20 group-hover:scale-105 transition-transform duration-700"></div>
                        </div>
                        <div className="absolute bottom-0 left-0 p-10 z-10 w-full bg-gradient-to-t from-black via-black/80 to-transparent">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="px-3 py-1 bg-cyan-500/20 border border-cyan-500/30 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                                    Core Theory
                                </span>
                                <span className="text-xs text-white/40 font-mono">EST. READ: 8 MIN</span>
                            </div>
                            <h2 className="text-3xl font-black mb-2 group-hover:text-cyan-400 transition-colors">
                                Why 5,000-Year-Old Logic Fixes Modern Algorithms
                            </h2>
                            <p className="text-white/60 max-w-2xl">
                                Exploring how the Nyaya Sutras provide a framework for ethical AI alignment that Western binary logic misses.
                            </p>
                        </div>
                    </Link>

                    {/* Article 2: Karma Economy */}
                    <Link href="/research/karma-economy" className="group bg-white/5 p-10 rounded-[30px] border border-white/10 hover:border-green-500/50 transition-all block">
                        <div className="mb-6 h-40 bg-gradient-to-br from-green-900/20 to-black rounded-2xl w-full flex items-center justify-center">
                            <span className="text-4xl">🌱</span>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-green-300">
                                    Protocol
                                </span>
                                <span className="text-xs text-white/40 font-mono">EST. READ: 6 MIN</span>
                            </div>
                            <h2 className="text-2xl font-black group-hover:text-green-400 transition-colors">
                                The Karma Economy: A Protocol for Post-Scarcity
                            </h2>
                            <p className="text-sm text-white/50 leading-relaxed">
                                When AI automates survival, purpose becomes the new currency. Understanding the economics of contribution.
                            </p>
                        </div>
                    </Link>

                    {/* Article 3: Research Remix */}
                    <Link href="/research/remix" className="group bg-white/5 p-10 rounded-[30px] border border-white/10 hover:border-cyan-500/50 transition-all block relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Search className="w-24 h-24" />
                        </div>
                        <div className="mb-6 h-40 bg-gradient-to-br from-cyan-900/20 to-black rounded-2xl w-full flex items-center justify-center">
                            <span className="text-4xl text-cyan-500">🧪</span>
                        </div>
                        <div className="space-y-4 relative z-10">
                            <div className="flex items-center gap-4 mb-2">
                                <span className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full text-[10px] font-bold uppercase tracking-widest text-cyan-300">
                                    Lab Tool
                                </span>
                                <span className="text-xs text-white/40 font-mono">LIVE ALPHA</span>
                            </div>
                            <h2 className="text-2xl font-black group-hover:text-cyan-400 transition-colors">
                                Product Research Remix
                            </h2>
                            <p className="text-sm text-white/50 leading-relaxed">
                                AI-powered market intelligence. Conduct deep research and synthesize structured buyer reports in seconds.
                            </p>
                            <div className="pt-4 flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-cyan-500 opacity-0 group-hover:opacity-100 transition-all">
                                Launch Tool <ArrowRight className="w-3 h-3" />
                            </div>
                        </div>
                    </Link>
                </div>
            </main>

            <footer className="mt-32 py-10 border-t border-white/5 text-center text-white/20 text-xs uppercase tracking-widest">
                Spiritual AI Labs © 2026
            </footer>
        </div>
    );
}
