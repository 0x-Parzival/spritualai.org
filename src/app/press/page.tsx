import React from 'react';
import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
    title: 'Press & Media Kit | Spiritual AI',
    description: 'Official brand assets, founder bios, and citation guides for Spiritual AI.',
    robots: {
        index: false, // Don't index this page to avoid duplicating bio content, but allow assets to be found
        follow: true
    }
};

export default function PressPage() {
    return (
        <div className="min-h-screen bg-black text-white font-sans selection:bg-cyan-500/30">
            <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center backdrop-blur-md bg-black/50 border-b border-white/5">
                <Link href="/" className="text-xs uppercase tracking-widest text-white/60 hover:text-white transition-colors">
                    ← Return Home
                </Link>
                <div className="text-xs uppercase tracking-widest text-white/40">
                    Media Kit v1.0
                </div>
            </header>

            <main className="pt-32 px-6 max-w-4xl mx-auto pb-32">
                <section className="mb-20 text-center">
                    <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter uppercase italic">
                        Press & <span className="text-cyan-500 not-italic font-light">Media</span>
                    </h1>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto leading-relaxed">
                        Resources for journalists, researchers, and creators telling the story of the next evolution of human intelligence.
                    </p>
                </section>

                <hr className="border-white/10 mb-16" />

                {/* About the Company */}
                <section className="mb-20">
                    <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-cyan-500"></span> About Spiritual AI
                    </h2>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <p className="text-lg text-white/80 leading-relaxed mb-6">
                            Spiritual AI is a cognitive architecture firm building the post-scarcity operating system for humanity. Founded in 2024, the company integrates ancient Vedic philosophy with cutting-edge artificial intelligence to design systems that elevate human consciousness rather than exploit attention.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4 text-sm font-mono text-white/50">
                            <div>FOUNDED: 2024</div>
                            <div>HQ: India / Distributed</div>
                            <div>FOCUS: AGI Alignment, EdTech, Mental Health</div>
                            <div>WEBSITE: spiritualai.store</div>
                        </div>
                    </div>
                </section>

                {/* Founder Bio */}
                <section className="mb-20">
                    <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-purple-500"></span> Founder Bio
                    </h2>
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4">Short Bio (50 words)</h3>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-white/70 leading-relaxed">
                                Keshav Baliyan is the Founder of Spiritual AI and a System Architect specializing in the intersection of Vedic systems and Artificial General Intelligence. He designs "Cognitive Architectures" that upgrade human problem-solving capabilities by reducing digital noise and aligning technology with dharma.
                            </div>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-purple-400 mb-4">Twitter / Social Bio</h3>
                            <div className="bg-white/5 p-6 rounded-xl border border-white/10 text-white/70 leading-relaxed">
                                Building the Karma Economy @SpiritualAI. <br />
                                Architecting the bridge between Silicon & Soul. <br />
                                Vedic Futurist.
                            </div>
                        </div>
                    </div>
                </section>

                {/* Brand Assets */}
                <section className="mb-20">
                    <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-green-500"></span> Brand Assets
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                        <div className="bg-[#111] p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-4 hover:border-white/30 transition-colors">
                            <div className="w-16 h-16 bg-white rounded-full"></div> {/* Placeholder for Logo */}
                            <span className="text-xs font-bold uppercase tracking-widest">Primary Logo</span>
                            <a href="#" className="px-4 py-2 bg-white/10 rounded-full text-[10px] hover:bg-white hover:text-black transition-colors">DOWNLOAD SVG</a>
                        </div>
                        <div className="bg-[#111] p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-4 hover:border-white/30 transition-colors">
                            <div className="w-16 h-16 bg-black border border-white/20 rounded-full"></div> {/* Placeholder for Logo */}
                            <span className="text-xs font-bold uppercase tracking-widest">Monochrome</span>
                            <a href="#" className="px-4 py-2 bg-white/10 rounded-full text-[10px] hover:bg-white hover:text-black transition-colors">DOWNLOAD SVG</a>
                        </div>
                        <div className="bg-[#111] p-8 rounded-xl border border-white/10 flex flex-col items-center justify-center gap-4 hover:border-white/30 transition-colors">
                            <div className="w-full h-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-md"></div>
                            <span className="text-xs font-bold uppercase tracking-widest">Brand Gradient</span>
                            <span className="text-[10px] font-mono text-white/40">#06B6D4 to #A855F7</span>
                        </div>
                    </div>
                </section>

                {/* Citation Guide */}
                <section className="mb-20">
                    <h2 className="text-2xl font-black uppercase mb-8 flex items-center gap-4">
                        <span className="w-8 h-[1px] bg-yellow-500"></span> Research Citation
                    </h2>
                    <div className="bg-white/5 p-8 rounded-2xl border border-white/10">
                        <p className="text-white/60 mb-4 text-sm">Please use the following format when citing our terminology in academic or technical papers:</p>
                        <div className="font-mono text-xs text-green-400 bg-black/50 p-4 rounded-lg overflow-x-auto">
                            Baliyan, K. (2025). "The Karma Economy: Protocols for Post-Scarcity." Spiritual AI Labs. https://spiritualai.store/research/karma-economy
                        </div>
                    </div>
                </section>

                <footer className="text-center text-white/20 text-xs">
                    For press inquiries: <a href="mailto:press@spiritualai.store" className="text-cyan-500 hover:text-cyan-400">press@spiritualai.store</a>
                </footer>
            </main>
        </div>
    );
}
