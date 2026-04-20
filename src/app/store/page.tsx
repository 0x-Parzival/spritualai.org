"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Loader2, ArrowRight, Sparkles, Brain, Zap, ShieldCheck, DollarSign } from 'lucide-react';
import OceanRising from '@/components/Effects/OceanRising';
import ProductCard from '@/components/ui/ProductCard';

type Step = 'init' | 'greeting' | 'aspiration' | 'products' | 'escalation';

export default function StorePage() {
    const [mbti, setMbti] = useState<string | null>(null);
    const [step, setStep] = useState<Step>('init');
    const [loading, setLoading] = useState(false);
    const [greeting, setGreeting] = useState('');
    const [behaviorIntel, setBehaviorIntel] = useState('');
    const [aspiration, setAspiration] = useState('');
    const [products, setProducts] = useState<any[]>([]);
    const [isRising, setIsRising] = useState(false);
    const [pricingValue, setPricingValue] = useState(499);
    const [affordability, setAffordability] = useState(299);
    const [error, setError] = useState<string | null>(null);

    // Retrieve MBTI from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('quiz_progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                if (parsed.mbti) setMbti(parsed.mbti.toUpperCase());
            } catch (e) { }
        }
        // Fallback or check if user came from personality page
        if (!mbti) {
            const path = window.location.pathname;
            // Simple fallback for demo if no MBTI found
            setMbti('INTJ');
        }
    }, [mbti]);

    const triggerRise = (callback: () => void) => {
        setIsRising(true);
        setTimeout(() => {
            callback();
            setIsRising(false);
        }, 2000);
    };

    const startFlow = async () => {
        setLoading(true);
        setError(null);
        try {
            const res = await fetch('/api/store', {
                method: 'POST',
                body: JSON.stringify({ step: 'intro', mbti }),
            });
            const data = await res.json();
            if (!res.ok) throw new Error(data.error || "Failed to initiate protocol");

            setGreeting(data.greeting || "");
            setBehaviorIntel(data.behaviorIntel || "");
            setStep('greeting');
        } catch (e: any) {
            console.error(e);
            setError(e.message || "Protocol initiation failed. Please check your connection or AI configuration.");
        } finally {
            setLoading(false);
        }
    };

    const handleAspirationSubmit = async (val: string) => {
        setAspiration(val);
        setLoading(true);
        setError(null);
        triggerRise(async () => {
            try {
                const res = await fetch('/api/store', {
                    method: 'POST',
                    body: JSON.stringify({ step: 'products', mbti, aspiration: val }),
                });
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || "Failed to generate products");

                setProducts(data.products || []);
                setStep('products');
            } catch (e: any) {
                console.error(e);
                setError(e.message || "Failed to generate your personalized products. Please try again.");
                setStep('init'); // Send back to start if it fails significantly
            } finally {
                setLoading(false);
            }
        });
    };

    return (
        <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
            <OceanRising isRising={isRising} />

            {/* Nav */}
            <header className="fixed top-0 left-0 right-0 z-[60] p-8 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent">
                <div className="flex items-center gap-4">
                    <span className="font-black tracking-[0.4em] uppercase text-xs">Spiritual AI <span className="text-cyan-500">Store</span></span>
                </div>
                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">
                    Engine: Llama 3.3 70b
                </div>
            </header>

            <main className="relative pt-32 px-6 max-w-5xl mx-auto pb-40 z-10">
                <AnimatePresence mode="wait">
                    {step === 'init' && (
                        <motion.div
                            key="init"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="text-center py-20 space-y-8"
                        >
                            <h1 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-tight">
                                Your Next Version <br />
                                <span className="text-cyan-500 not-italic font-light">Is Waiting.</span>
                            </h1>
                            <div className="space-y-4">
                                <p className="text-xl text-white/40 max-w-2xl mx-auto">
                                    The trillion-dollar engine for hyper-personalized digital transformation. Ready to resolve your architecture?
                                </p>
                                <p className="text-sm text-white/20 max-w-xl mx-auto leading-relaxed">
                                    Initiating the protocol will trigger a deep-layer scan of your architectural blueprint. The engine uses your cognitive data to generate the exact digital instruments required to break your current loop and stabilize your next frequency.
                                </p>
                            </div>
                            <button
                                onClick={startFlow}
                                className="bg-white text-black px-12 py-6 rounded-full font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all group mt-10"
                            >
                                {loading ? <Loader2 className="animate-spin" /> : "Initiate Protocol"}
                                <ArrowRight className="inline-block ml-3 group-hover:translate-x-1 transition-transform" />
                            </button>
                            {error && (
                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="text-red-500 font-bold text-sm uppercase tracking-widest mt-4"
                                >
                                    Error: {error}
                                </motion.p>
                            )}
                        </motion.div>
                    )}

                    {step === 'greeting' && (
                        <motion.div
                            key="greeting"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-16"
                        >
                            <div className="space-y-6">
                                <span className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-[10px]">Step 01 // Identity Resolution</span>
                                <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter leading-tight max-w-3xl">
                                    {(greeting || "").split('\n')[0] || "Architecture Resolved"}
                                </h2>
                                <p className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl">
                                    {(greeting || "").split('\n').slice(1).join('\n')}
                                </p>
                            </div>

                            <div className="bg-white/5 border border-white/10 rounded-[40px] p-10 md:p-16 space-y-10 backdrop-blur-3xl relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-10 opacity-5">
                                    <Brain className="w-32 h-32" />
                                </div>
                                <div className="space-y-4 relative z-10">
                                    <h3 className="text-xl font-bold uppercase tracking-widest text-cyan-400">Psychological Modeling</h3>
                                    <p className="text-white/50 text-lg leading-relaxed italic">
                                        "{behaviorIntel}"
                                    </p>
                                </div>

                                <div className="space-y-8 pt-10 border-t border-white/10">
                                    <h3 className="text-2xl font-black uppercase italic tracking-tighter">What transformation are you chasing right now?</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {[
                                            "Financial Freedom", "Creative Expression",
                                            "Emotional Healing", "Productivity Mastery",
                                            "Spiritual Growth", "Social Influence"
                                        ].map((opt) => (
                                            <button
                                                key={opt}
                                                onClick={() => handleAspirationSubmit(opt)}
                                                className="px-6 py-4 rounded-2xl border border-white/10 text-left hover:border-cyan-500/50 hover:bg-white/5 transition-all text-sm font-bold uppercase tracking-widest group flex justify-between items-center"
                                            >
                                                {opt}
                                                <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {step === 'products' && (
                        <motion.div
                            key="products"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="space-y-12"
                        >
                            <div className="flex flex-col md:flex-row justify-between items-end gap-6 border-b border-white/5 pb-10">
                                <div className="space-y-4">
                                    <span className="text-cyan-500 font-bold uppercase tracking-[0.3em] text-[10px]">Step 02 // Predictive Output</span>
                                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter">Hyper-Personalized <br /><span className="text-white/40 not-italic">Engine Results</span></h2>
                                </div>

                                {/* Pricing Intelligence Engine UI */}
                                <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-4 w-full md:w-80 backdrop-blur-xl">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Pricing Engine</span>
                                        <Zap className="w-3 h-3 text-cyan-500" />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] text-white/30 uppercase font-black">
                                            <span>Value Perception</span>
                                            <span>${pricingValue}</span>
                                        </div>
                                        <input
                                            type="range" min="99" max="999" step="10"
                                            value={pricingValue}
                                            onChange={(e) => setPricingValue(Number(e.target.value))}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-[10px] text-white/30 uppercase font-black">
                                            <span>Affordability</span>
                                            <span>${affordability}</span>
                                        </div>
                                        <input
                                            type="range" min="49" max="499" step="10"
                                            value={affordability}
                                            onChange={(e) => setAffordability(Number(e.target.value))}
                                            className="w-full h-1 bg-white/10 rounded-lg appearance-none cursor-pointer accent-cyan-500"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 gap-12">
                                {products.map((p, i) => (
                                    <ProductCard
                                        key={i}
                                        product={{ ...p, price: Math.round((pricingValue + affordability) / 2).toString() }}
                                        onActivate={() => alert("Redirecting to secure gateway...")}
                                    />
                                ))}
                            </div>

                            <div className="text-center pt-20 space-y-8">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter text-white/40">Not precise enough?</h3>
                                <button
                                    onClick={() => setStep('escalation')}
                                    className="px-12 py-6 rounded-full border border-white/10 text-[12px] font-black uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-all"
                                >
                                    Escalate Personalization Deeper
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {step === 'escalation' && (
                        <motion.div
                            key="escalation"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="max-w-2xl mx-auto space-y-12 py-20"
                        >
                            <div className="text-center space-y-6">
                                <span className="text-red-500 font-bold uppercase tracking-[0.3em] text-[10px]">Step 03 // Deep Architecture Mapping</span>
                                <h2 className="text-4xl font-black italic uppercase tracking-tighter">What’s blocking you <br /> from achieving this <span className="text-red-500">alone?</span></h2>
                            </div>

                            <div className="space-y-4">
                                {[
                                    "Lack of clarity/roadmap",
                                    "Emotional resistance/fear",
                                    "Technical gap/complexity",
                                    "Speed of execution",
                                    "Financial constraints"
                                ].map((opt) => (
                                    <button
                                        key={opt}
                                        onClick={() => handleAspirationSubmit(opt)}
                                        className="w-full p-8 rounded-[30px] bg-white/5 border border-white/10 text-xl font-bold uppercase italic tracking-tighter text-left hover:border-red-500/50 hover:bg-red-500/5 transition-all flex justify-between items-center group"
                                    >
                                        {opt}
                                        <ArrowRight className="w-6 h-6 text-red-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Footer Trust */}
            <footer className="fixed bottom-0 left-0 right-0 p-8 flex justify-center gap-10 bg-gradient-to-t from-black to-transparent z-[60] opacity-40">
                <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest underline decoration-cyan-500/30">Secure Protocol</span>
                </div>
                <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-cyan-500" />
                    <span className="text-[10px] font-black uppercase tracking-widest underline decoration-cyan-500/30">Instant Activation</span>
                </div>
            </footer>
        </div>
    );
}
