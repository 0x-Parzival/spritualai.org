"use client";

import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function OceanBackground() {
    const { scrollYProgress } = useScroll();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Dynamic Gradient based on scroll depth
    const backgroundGradient = useTransform(
        scrollYProgress,
        [0, 1],
        ['#050510', '#0a0a1f'] // Darker blue/purple for better visibility
    );

    useEffect(() => {
        if (!mounted) return;
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let width = window.innerWidth;
        let height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;

        const bubbles: any[] = [];
        const bubbleCount = 50;

        for (let i = 0; i < bubbleCount; i++) {
            bubbles.push({
                x: Math.random() * width,
                y: Math.random() * height,
                r: Math.random() * 3 + 1,
                speed: Math.random() * 0.5 + 0.2,
                opacity: Math.random() * 0.5 + 0.1
            });
        }

        let animationFrameId: number;
        const render = () => {
            ctx.clearRect(0, 0, width, height);
            bubbles.forEach(b => {
                b.y -= b.speed;
                b.x += Math.sin(b.y * 0.01) * 0.5;
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
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        };

        window.addEventListener('resize', handleResize);
        return () => {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [mounted]);

    if (!mounted) return <div style={{ position: 'fixed', inset: 0, background: '#030303', zIndex: 0 }} />;

    return (
        <motion.div style={{
            position: 'fixed',
            top: 0,
            left: '-1%', // Shift slightly left
            width: '102%', // Overfill both sides
            height: '100vh',
            background: backgroundGradient,
            zIndex: 0,
        }}>
            <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }} />
            <div style={{
                position: 'absolute',
                inset: 0,
                background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.4) 100%)',
                pointerEvents: 'none'
            }} />
            <div style={{
                position: 'absolute',
                inset: 0,
                opacity: 0.05,
                pointerEvents: 'none',
                background: 'url("https://grainy-gradients.vercel.app/noise.svg")',
                backgroundSize: '200px 200px',
            }} />
        </motion.div>
    );
}
