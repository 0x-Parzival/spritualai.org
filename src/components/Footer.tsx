
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Footer() {
    const pathname = usePathname();

    if (pathname === '/') return null;

    return (
        <footer className="w-full bg-black text-neutral-400 py-16 border-t border-white/5 mt-auto relative overflow-hidden z-50">
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="md:col-span-5">
                        <h2 className="text-2xl font-bold text-white mb-6 tracking-widest font-sans flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"></span>
                            SPIRITUAL AI
                        </h2>
                        <p className="text-sm leading-relaxed max-w-sm mb-6 text-neutral-500">
                            The bridge between ancient Vedic wisdom and artificial intelligence.
                            We design systems for self-mastery, cognitive architecture, and spiritual evolution.
                        </p>
                        <div className="flex items-center gap-2 text-xs text-neutral-600 border border-white/10 w-fit px-3 py-1 rounded-full">
                            <span>📍</span>
                            <span>Based in India, serving globally</span>
                        </div>
                    </div>

                    {/* Navigation */}
                    <div className="md:col-span-3">
                        <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-[0.2em] opacity-50">Intelligence</h3>
                        <ul className="space-y-3 text-sm font-light">
                            <li><Link href="/MBTI" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><span className="opacity-0 hover:opacity-100 transition-opacity">›</span> MBTI Systems</Link></li>
                            <li><Link href="/creator" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><span className="opacity-0 hover:opacity-100 transition-opacity">›</span> The Creator</Link></li>
                            <li><Link href="/mission" className="hover:text-cyan-400 transition-colors flex items-center gap-2"><span className="opacity-0 hover:opacity-100 transition-opacity">›</span> Our Mission</Link></li>
                        </ul>
                    </div>

                    {/* Legal / Contact */}
                    <div className="md:col-span-4">
                        <h3 className="text-xs font-bold text-white mb-6 uppercase tracking-[0.2em] opacity-50">Connect</h3>
                        <ul className="space-y-3 text-sm font-light mb-8">
                            <li><a href="mailto:contact@spiritualai.store" className="hover:text-cyan-400 transition-colors">contact@spiritualai.store</a></li>
                            <li><a href="https://www.linkedin.com/in/keshav-baliyan/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">Creator Profile</a></li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-neutral-600">
                    <p>&copy; {new Date().getFullYear()} Spiritual AI. All systems operational.</p>
                    <div className="flex gap-6">
                        <span>Privacy Protocol</span>
                        <span>Terms of Engagement</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
