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

    // Scale: Remains 1.0 for the first inch (96px), then halves every inch after
    const scale = useTransform(
        smoothScrollY,
        [0, 96, 192, 288, 384, 480],
        [1.0, 1.0, 0.5, 0.25, 0.125, 0.0625]
    );

    // Rotation: Rotate by 10 degrees after one inch of downward movement
    const rotationDeg = useTransform(smoothScrollY, [0, 96], [0, 10]);

    // Opacity: Slow fade out over 2000px
    const opacity = useTransform(smoothScrollY, [0, 2000], [1, 0]);

    // Parallax effect: little bit motion based on cursor
    const xOffset = useTransform(mouseX, (x: number) => x * 20);
    const yOffset = useTransform(mouseY, (y: number) => y * 20);

    return (
        <motion.div
            style={{
                position: 'fixed',
                top: 'calc(50% - 57px)',
                left: '50%',
                x: '-50%',
                y: '-50%',
                translateX: xOffset,
                translateY: yOffset,
                scale,
                rotate: rotationDeg,
                zIndex: 30,
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
                    style={{ objectFit: 'contain' }}
                    priority
                />
            </div>
        </motion.div>
    );
}
