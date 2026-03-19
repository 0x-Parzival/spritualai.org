"use client";

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const PetalShape = ({ className, style }: { className?: string; style?: React.CSSProperties }) => (
    <svg viewBox="0 0 72 200" className={className} style={style}>
        <path
            d="M0,100 C0,66.6666667 12,33.3333333 36,0
               C60,33.3333333 72,66.6666667 72,100
               C72,133.333333 60,166.666667 36,200
               C12,166.666667 0,133.333333 0,100 Z"
            fill="currentColor"
        />
    </svg>
);

export default function InfinitePetals() {
    const { scrollYProgress } = useScroll();
    
    // Parallax movement for the petals
    const leftY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
    const rightY = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);

    const petalCount = 8;
    const petals = Array.from({ length: petalCount });

    const frostedStyle: React.CSSProperties = {
        color: 'rgba(255, 255, 255, 0.15)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        width: '12vw',
        height: 'auto',
        maxWidth: '180px',
        position: 'absolute',
    };

    return (
        <div style={{
            position: 'fixed',
            inset: 0,
            pointerEvents: 'none',
            zIndex: 5, // Behind main content
            overflow: 'hidden',
        }}>
            {/* Left Side Petals */}
            <motion.div style={{
                position: 'absolute',
                left: '-4vw',
                top: '10vh',
                width: '20vw',
                height: '200vh',
                y: leftY,
            }}>
                {petals.map((_, i) => (
                    <PetalShape
                        key={`left-${i}`}
                        style={{
                            ...frostedStyle,
                            top: `${i * 25}vh`,
                            left: i % 2 === 0 ? '0' : '2vw',
                            transform: `rotate(${15 + i * 10}deg)`,
                            opacity: 0.6 - (i * 0.05),
                        }}
                    />
                ))}
            </motion.div>

            {/* Right Side Petals */}
            <motion.div style={{
                position: 'absolute',
                right: '-4vw',
                top: '15vh',
                width: '20vw',
                height: '200vh',
                y: rightY,
            }}>
                {petals.map((_, i) => (
                    <PetalShape
                        key={`right-${i}`}
                        style={{
                            ...frostedStyle,
                            top: `${i * 25}vh`,
                            right: i % 2 === 0 ? '0' : '2vw',
                            transform: `rotate(${-15 - i * 10}deg)`,
                            opacity: 0.6 - (i * 0.05),
                        }}
                    />
                ))}
            </motion.div>
        </div>
    );
}
