"use client";

import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface OceanRisingProps {
    isRising: boolean;
    onComplete?: () => void;
}

export default function OceanRising({ isRising, onComplete }: OceanRisingProps) {
    const [phase, setPhase] = useState<'idle' | 'rising' | 'full' | 'falling'>('idle');

    useEffect(() => {
        if (isRising) {
            setPhase('rising');
            const timer = setTimeout(() => {
                setPhase('full');
                if (onComplete) onComplete();
            }, 2000); // 2 seconds for full rise
            return () => clearTimeout(timer);
        } else if (phase === 'full') {
            setPhase('falling');
            const timer = setTimeout(() => {
                setPhase('idle');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isRising, phase, onComplete]);

    return (
        <div className="fixed inset-0 pointer-events-none z-[100] overflow-hidden">
            <AnimatePresence>
                {(phase === 'rising' || phase === 'full' || phase === 'falling') && (
                    <motion.div
                        initial={{ y: '100%' }}
                        animate={{
                            y: phase === 'full' ? '0%' : (phase === 'falling' ? '-100%' : '0%'),
                            opacity: phase === 'full' ? 1 : 0.9
                        }}
                        exit={{ y: '-100%', opacity: 0 }}
                        transition={{
                            duration: 2,
                            ease: [0.23, 1, 0.32, 1], // Custom premium ease
                        }}
                        className="absolute inset-x-0 bottom-0 h-[200vh] w-full"
                        style={{
                            background: `linear-gradient(to bottom, 
                                transparent 0%, 
                                rgba(0, 163, 255, 0.4) 10%, 
                                rgba(0, 255, 170, 0.8) 50%, 
                                #050505 100%)`,
                            backdropFilter: 'blur(20px)',
                        }}
                    >
                        {/* Fluid Wave Texture Overlay */}
                        <div className="absolute inset-0 opacity-30 mix-blend-overlay overflow-hidden">
                            <svg className="w-full h-full" viewBox="0 0 1000 1000" preserveAspectRatio="none">
                                <filter id="fluid-noise">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.015" numOctaves="3" result="noise" />
                                    <feDisplacementMap in="SourceGraphic" in2="noise" scale="50" />
                                </filter>
                                <motion.rect
                                    width="100%"
                                    height="100%"
                                    filter="url(#fluid-noise)"
                                    animate={{
                                        x: [0, -20, 0],
                                        y: [0, 40, 0]
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        ease: "linear"
                                    }}
                                />
                            </svg>
                        </div>

                        {/* Particle Bubbles */}
                        <div className="absolute inset-0">
                            {[...Array(20)].map((_, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ y: '100%', opacity: 0 }}
                                    animate={{
                                        y: '-100%',
                                        opacity: [0, 1, 0],
                                        x: Math.random() * 100 - 50
                                    }}
                                    transition={{
                                        duration: Math.random() * 3 + 2,
                                        repeat: Infinity,
                                        delay: Math.random() * 2,
                                    }}
                                    className="absolute w-2 h-2 rounded-full bg-white/40 blur-[2px]"
                                    style={{ left: `${Math.random() * 100}%` }}
                                />
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Ocean reset to original aesthetic above textbox (simulated) */}
            <AnimatePresence>
                {phase === 'full' && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute bottom-0 w-full h-[30vh] bg-gradient-to-t from-[#050505] to-transparent z-[110]"
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
