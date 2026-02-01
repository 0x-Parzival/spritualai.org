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
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 100, opacity: 0 }}
                className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:right-8 md:w-96"
            >
                <div className="bg-zinc-900/95 backdrop-blur-md border border-cyan-500/20 p-4 rounded-xl shadow-2xl flex flex-col gap-3">
                    <div className="flex items-start justify-between">
                        <div className="flex gap-3">
                            <img src="/favicon.png" alt="App Icon" className="w-10 h-10 rounded-lg" />
                            <div>
                                <h3 className="text-white font-bold text-sm">Install Spiritual AI</h3>
                                <p className="text-zinc-400 text-xs mt-1">Add to home screen for better experience</p>
                            </div>
                        </div>
                        <button onClick={handleDismiss} className="text-zinc-500 hover:text-white">
                            <X size={18} />
                        </button>
                    </div>

                    {showIOSPrompt ? (
                        <div className="text-xs text-zinc-300 bg-black/40 p-3 rounded-lg border border-zinc-800">
                            <p className="flex items-center gap-2 mb-2">
                                1. Tap the <Share size={14} className="text-blue-500" /> Share button
                            </p>
                            <p className="flex items-center gap-2">
                                2. Select <PlusSquare size={14} /> Add to Home Screen
                            </p>
                        </div>
                    ) : (
                        <button
                            onClick={handleInstallClick}
                            className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg text-sm font-bold transition-all shadow-lg hover:shadow-cyan-500/25"
                        >
                            Install App
                        </button>
                    )}
                </div>
            </motion.div>
        </AnimatePresence>
    );
}
