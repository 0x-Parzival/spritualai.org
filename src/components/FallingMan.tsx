"use client";

import React from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

interface FallingManProps {
    mouseX: any;
    mouseY: any;
}

export default function FallingMan({ mouseX, mouseY }: FallingManProps) {
    const { scrollY } = useScroll();

    // 1 inch = 96px
    // Smooth the scroll input for a "moving machine" feel
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Fall downwards: As user scrolls 50 -> 1000px, man falls from above towards the lotus.
    const fallY = useTransform(smoothScrollY, [50, 1000], ["-100vh", "90vh"]);

    // Scale: Shrink as it falls
    const scale = useTransform(smoothScrollY, [50, 800, 1000], [1.2, 0.8, 0.0]);

    // Rotation: Spin gently
    const rotationDeg = useTransform(smoothScrollY, [50, 1000], [0, 30]);

    // Opacity: Appear at 50, disappear at 1000
    const opacity = useTransform(smoothScrollY, [50, 150, 900, 1000], [0, 1, 1, 0]);

    // Parallax effect
    const xOffset = useTransform(mouseX, (x: number) => x * 20);
    const yOffset = useTransform(mouseY, (y: number) => y * 20);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 0,
                left: '50%',
                x: '-50%',
                y: fallY, 
                translateX: xOffset,
                translateY: yOffset,
                scale,
                rotate: rotationDeg,
                zIndex: 40,
                opacity,
                pointerEvents: 'none',
                willChange: 'transform, opacity',
            }}
        >
            <div style={{ position: 'relative', width: '300px', height: '500px' }}>
                <Image
                    src="/images/home/fallingman.png"
                    alt="Falling Man"
                    fill
                    sizes="300px"
                    style={{ objectFit: 'contain' }}
                    priority
                />
            </div>
        </motion.div>
    );
}
