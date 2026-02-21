
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface BreathingHeroProps {
    text?: string;
}

export default function BreathingHero({ text }: BreathingHeroProps) {
    return (
        <div className="breathing-hero-container" style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
        }}>
            {/* Background Image: Man in Waves */}
            <motion.div
                initial={{ scale: 1.05 }}
                animate={{ scale: 1 }}
                transition={{ duration: 10, ease: "easeOut" }}
                style={{ position: 'absolute', width: '100%', height: '100%', zIndex: 1 }}
            >
                <Image
                    src="/images/man_in_waves_hero.png"
                    alt="Man meditating in ocean waves"
                    fill
                    style={{ objectFit: 'cover', objectPosition: 'center' }}
                    priority
                />
            </motion.div>

            {/* Subtle Breathing Overlay */}
            <motion.div
                animate={{ opacity: [0, 0.2, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    background: 'radial-gradient(circle, rgba(135, 206, 235, 0.2) 0%, transparent 60%)',
                    zIndex: 2,
                    pointerEvents: 'none'
                }}
            />

            {/* Optional Text Overlay */}
            {text && (
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    style={{
                        zIndex: 10,
                        color: 'rgba(255, 255, 255, 0.9)',
                        fontFamily: '"Orbitron", sans-serif',
                        fontSize: 'clamp(2rem, 5vw, 4rem)',
                        fontWeight: 300,
                        letterSpacing: '0.2em',
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        textShadow: '0 0 20px rgba(135, 206, 235, 0.5)',
                        marginTop: '20vh'
                    }}
                >
                    {text}
                </motion.h1>
            )}
        </div>
    );
}
