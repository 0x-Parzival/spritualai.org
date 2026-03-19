"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function OceanBackground() {
    const { scrollYProgress } = useScroll();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

    // Dynamic Gradient based on scroll depth (Lokas)
    // 0.0 - 0.1: Satyaloka (White/Pearlescent)
    // 0.1 - 0.2: Tapoloka (Indigo/Violet)
    // 0.2 - 0.3: Janaloka (Gold)
    // ... down to Patala (Deep Dark)
    const backgroundGradient = useTransform(
        scrollYProgress,
        [0, 0.15, 0.22, 0.29, 0.36, 0.43, 0.5, 0.57, 0.64, 0.71, 0.78, 0.85, 0.92, 1],
        [
            'linear-gradient(to bottom, #000000, #1a1a2e)', // Hero (Fixed Dark Blue)
            'linear-gradient(to bottom, #000000, #1a1a2e)', // Hero (Keep Dark longer)
            'linear-gradient(to bottom, #1a1a2e, #240046)', // Page 2 - Deep Violet
            'linear-gradient(to bottom, #240046, #1a1a2e)', // Page 3 - Electric Indigo
            'linear-gradient(to bottom, #1a1a2e, #3e2723)', // Maharloka
            'linear-gradient(to bottom, #3e2723, #002171)', // Svarloka
            'linear-gradient(to bottom, #002171, #4a148c)', // Bhuvarloka
            'linear-gradient(to bottom, #4a148c, #1b5e20)', // Bhuloka
            'linear-gradient(to bottom, #1b5e20, #000000)', // Atala
            'linear-gradient(to bottom, #000000, #ffca28)', // Vitala
            'linear-gradient(to bottom, #ffca28, #3e2723)', // Sutala
            'linear-gradient(to bottom, #3e2723, #006064)', // Talatala
            'linear-gradient(to bottom, #006064, #1b5e20)', // Mahatala
            'linear-gradient(to bottom, #1b5e20, #000000)', // Patala
        ]
    );

    // Bubble System
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
        setDimensions({ width, height });

        const bubbles: any[] = [];
        const bubbleCount = 50;

        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 3 + 1,
                speed: Math.random() * 0.5 + 0.2,
                swing: Math.random() * 2,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        let animationFrameId: number;

        const render = () => {
            ctx.clearRect(0, 0, width, height);
            
            bubbles.forEach(b => {
                b.y -= b.speed;
                b.x += Math.sin(b.y * 0.01) * 0.5; // Gentle sway

                if (b.y < -10) {
                    b.y = height + 10;
                    b.x = Math.random() * width;
                }

                ctx.beginPath();
                ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
                ctx.fill();
            });

            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleResize = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <motion.div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100vh',
            background: backgroundGradient,
            zIndex: 0,
            transition: 'background 1s ease' // Smooth color transition
        }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            
            {/* Overlay for "Deep Ocean" vignette feel */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none'
            }} />
        </motion.div>
    );
}
