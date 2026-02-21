"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, ShieldCheck, Zap, Package, Globe } from 'lucide-react';

interface ProductCardProps {
    product: {
        headline: string;
        salesScript: string;
        description: string;
        category: string;
        confidence: number;
        price: string;
    };
    onActivate: () => void;
}

export default function ProductCard({ product, onActivate }: ProductCardProps) {
    const [showFullScript, setShowFullScript] = useState(false);

    return (
        <motion.div
            layout
            className="bg-white/5 border border-white/10 rounded-[40px] overflow-hidden backdrop-blur-3xl group hover:border-cyan-500/50 transition-colors"
        >
            <div className="p-8 md:p-12 space-y-8">
                {/* Header Info */}
                <div className="flex justify-between items-start">
                    <div className="space-y-1">
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-cyan-500 flex items-center gap-2">
                            <Zap className="w-3 h-3 fill-cyan-500" />
                            {product.category}
                        </span>
                        <div className="flex items-center gap-3">
                            <h3 className="text-2xl md:text-3xl font-black italic uppercase tracking-tighter text-white">
                                {product.headline}
                            </h3>
                        </div>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 px-3 py-1.5 rounded-full flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black uppercase text-cyan-400">
                            {Math.round(product.confidence * 100)}% Match
                        </span>
                    </div>
                </div>

                <p className="text-white/60 text-lg leading-relaxed">
                    {product.description}
                </p>

                {/* Pricing Intelligence Visualizer */}
                <div className="bg-black/40 rounded-2xl p-6 border border-white/5 flex items-center justify-between">
                    <div className="space-y-1">
                        <span className="text-[9px] font-bold uppercase tracking-widest text-white/30">Dynamic Value Assignment</span>
                        <div className="text-3xl font-black text-white">${product.price}</div>
                    </div>
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                            <div key={i} className={`w-1 h-4 rounded-full ${i < 4 ? 'bg-cyan-500' : 'bg-white/10'}`} />
                        ))}
                    </div>
                </div>

                {/* Sales Script Preview / Expand */}
                <AnimatePresence>
                    {showFullScript && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="prose prose-invert prose-cyan max-w-none pt-8 border-t border-white/10 space-y-6">
                                {product.salesScript.split('\n').map((line, i) => {
                                    if (line.startsWith('# ')) return <h1 key={i} className="text-3xl font-black uppercase italic text-white mt-10">{line.replace('# ', '')}</h1>;
                                    if (line.startsWith('## ')) return <h2 key={i} className="text-xl font-bold text-cyan-500 mt-8">{line.replace('## ', '')}</h2>;
                                    return <p key={i} className="text-white/50">{line}</p>;
                                })}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Actions */}
                <div className="flex flex-col md:flex-row gap-4 pt-4">
                    <button
                        onClick={() => setShowFullScript(!showFullScript)}
                        className="flex-1 px-8 py-5 rounded-full border border-white/10 text-[11px] font-black uppercase tracking-widest text-white/60 hover:text-white hover:bg-white/5 transition-all"
                    >
                        {showFullScript ? 'Collapse Methodology' : 'Analyze Strategy'}
                    </button>
                    <button
                        onClick={onActivate}
                        className="flex-1 bg-white text-black px-8 py-5 rounded-full text-[11px] font-black uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-cyan-500 hover:text-white transition-all group"
                    >
                        Activate Upgrade
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                {/* Trust Footer */}
                <div className="flex items-center gap-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2 opacity-30">
                        <ShieldCheck className="w-4 h-4" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Global Encryption</span>
                    </div>
                    <div className="flex items-center gap-2 opacity-30">
                        <Globe className="w-4 h-4" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">Trillion-dollar Scale</span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
