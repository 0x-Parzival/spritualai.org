"use client";

import { useState, useEffect } from "react";
import { X, Share, PlusSquare } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function InstallPrompt() {
    const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
    const [showIOSPrompt, setShowIOSPrompt] = useState(false);
    const [isDismissed, setIsDismissed] = useState(false);

    useEffect(() => {
        // Check if running in standalone mode (already installed)
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone;
        if (isStandalone) return;

        // Check if dismissed previously in this session
        if (sessionStorage.getItem('installPromptDismissed')) {
            setIsDismissed(true);
            return;
        }

        // Android / Desktop logic
        const handleBeforeInstallPrompt = (e: Event) => {
            e.preventDefault();
            setDeferredPrompt(e);
        };

        window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

        // iOS logic detection
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
        if (isIOS) {
            setShowIOSPrompt(true);
        }

        return () => {
            window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
        };
    }, []);

    const handleInstallClick = async () => {
        if (!deferredPrompt) return;

        deferredPrompt.prompt();
        const { outcome } = await deferredPrompt.userChoice;

        if (outcome === 'accepted') {
            setDeferredPrompt(null);
        }
    };

    const handleDismiss = () => {
        setIsDismissed(true);
        sessionStorage.setItem('installPromptDismissed', 'true');
        setDeferredPrompt(null);
        setShowIOSPrompt(false);
    };

    if (isDismissed || (!deferredPrompt && !showIOSPrompt)) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ x: 100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 100, opacity: 0 }}
                className="absolute top-24 right-[-1.5rem] z-[600] md:top-24 md:right-[-1rem] md:w-96"
                >                <div className="bg-black/80 backdrop-blur-2xl border border-cyan-500/30 p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.5),0_0_20px_rgba(53,248,255,0.1)] flex flex-col gap-4">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-4">
                            <div className="p-2 bg-gradient-to-br from-cyan-500/20 to-magenta-500/20 rounded-xl border border-white/10">
                                <img src="/favicon.png" alt="App Icon" className="w-10 h-10 rounded-lg filter brightness-110" />
                            </div>
                            <div>
                                <h3 className="text-white font-light text-base tracking-[0.2em] uppercase font-sans">Install Spiritual AI</h3>
                                <p className="text-cyan-400/60 text-[10px] uppercase tracking-widest mt-1">Activate Your Personal Guide</p>
                            </div>
                        </div>
                        <button onClick={handleDismiss} className="text-white/30 hover:text-white transition-colors p-1">
                            <X size={18} />
                        </button>
                    </div>

                    {showIOSPrompt ? (
                        <div className="text-[11px] text-zinc-300 bg-white/5 p-4 rounded-2xl border border-white/10 leading-relaxed tracking-wide">
                            <p className="flex items-center gap-3 mb-3">
                                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">1</span>
                                Tap the <Share size={14} className="text-cyan-400" /> Share button
                            </p>
                            <p className="flex items-center gap-3">
                                <span className="w-5 h-5 flex items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">2</span>
                                Select <PlusSquare size={14} className="text-cyan-400" /> Add to Home Screen
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstallClick}
                            className="w-full py-4 bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white rounded-2xl text-xs font-light tracking-[0.3em] uppercase transition-all shadow-[0_10px_20px_rgba(0,242,255,0.2)] hover:shadow-[0_15px_30px_rgba(0,242,255,0.3)] active:scale-[0.98]"
                        >
                            Initialize Installation
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
