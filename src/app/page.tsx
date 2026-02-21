"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import NextImage from 'next/image';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
const StarfieldHero = dynamic(() => import('../components/StarfieldHero'), { ssr: false });
const WavesHero = dynamic(() => import('../components/WavesHero'), { ssr: false });
const FallingMan = dynamic(() => import('../components/FallingMan'), { ssr: false });
const Lotus = dynamic(() => import('../components/Lotus'), { ssr: false });
const HeroTitle = dynamic(() => import('../components/HeroTitle'), { ssr: true });
const NavButtons = dynamic(() => import('../components/NavButtons'), { ssr: false });
const HeroCTA = dynamic(() => import('../components/HeroCTA'), { ssr: true });
const PersonalitySelector = dynamic(() => import('../components/home/PersonalitySelector'), { ssr: false });
const MissionStatement = dynamic(() => import('../components/home/MissionStatement'), { ssr: false });

import CursorArrow from '../components/CursorArrow';

function Page2Layer3({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
    const { scrollY } = useScroll();

    // Page 2 Layer Threshold Refinement
    // Positioned at the transition from Page 2 to Page 3 (200vh)
    const [windowHeight, setWindowHeight] = useState(1000);
    useEffect(() => {
        setWindowHeight(window.innerHeight);
    }, []);

    const transitionThreshold = windowHeight * 2 - 480;

    // Smooth the scroll input for "mechanical" feel
    const smoothScrollY = useSpring(scrollY, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    const layer3Diff = useTransform(smoothScrollY, (latest) => latest - transitionThreshold);

    // "reduce in half every inch (96px) in size when we move upward"
    // "stop when it reaches it original size (1.0)"
    const layer3Scale = useTransform(
        layer3Diff,
        [-192, -96, 0, 96],
        [4.0, 2.0, 1.0, 1.0]
    );

    // "should also move upward when we scrool upward"
    // "also stop motion" when reaching original size (offset 0)
    const layer3YScrollOffset = useTransform(
        layer3Diff,
        (val) => Math.min(0, val * 1.5)
    );

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: 'calc(200vh - 480px)', // Moved 5 inches upward
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 26,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflow: 'hidden',
                // Combined transform: Mouse Parallax + Scroll Scale + Scroll Movement
                x: useTransform(mouseX, (x: number) => x * 25),
                y: useTransform([mouseY, layer3YScrollOffset], (latest) => {
                    const [mY, sY] = latest as [number, number];
                    return mY * 25 + sY;
                }),
                scale: layer3Scale,
                transformOrigin: 'top center',
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <NextImage
                    src="/images/home/page 2 layer 3.png"
                    alt="Page 2 Layer 3"
                    fill
                    style={{ objectFit: 'contain', objectPosition: 'top' }}
                />
            </div>
        </motion.div>
    );
}

export default function Home() {
    const [hasMounted, setHasMounted] = useState(false);
    const [scrollProgress, setScrollProgress] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    useEffect(() => {
        setHasMounted(true);
        // Force scrollable body for this page and reset height to allow window scrolling
        const originalBodyOverflow = document.body.style.overflowY;
        const originalHtmlOverflow = document.documentElement.style.overflowY;
        const originalBodyHeight = document.body.style.height;
        const originalHtmlHeight = document.documentElement.style.height;

        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
        document.body.style.height = 'auto';
        document.documentElement.style.height = 'auto';

        const handleScroll = () => {
            const scrollY = window.scrollY;
            const windowHeight = window.innerHeight;
            // Calculate progress based on first screen height (approx)
            // Clamped between 0 and 1
            const progress = Math.min(Math.max(scrollY / windowHeight, 0), 1);
            setScrollProgress(progress);
            setScrollY(scrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
            // Normalize mouse position from -1 to 1
            mouseX.set((e.clientX / window.innerWidth) * 2 - 1);
            mouseY.set((e.clientY / window.innerHeight) * 2 - 1);
        };

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            document.body.style.overflowY = originalBodyOverflow;
            document.documentElement.style.overflowY = originalHtmlOverflow;
            document.body.style.height = originalBodyHeight;
            document.documentElement.style.height = originalHtmlHeight;
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);

    // Page 2 Layer Threshold Refinement
    // Now positioned at the transition to Page 3 (200vh)
    const windowHeight = hasMounted && typeof window !== 'undefined' ? window.innerHeight : 1000;
    const transitionThreshold = windowHeight * 2 - 480;
    const layer3Diff = hasMounted ? (scrollY - transitionThreshold) : 0;

    // "reduce in half every inch (96px) in size when we move upward"
    // "stop when it reaches it original size (1.0)"
    const layer3Scale = hasMounted ? Math.min(1.0, Math.pow(2, layer3Diff / 96)) : 0;

    // "should also move upward when we scrool upward"
    // "also stop motion" when reaching original size (offset 0)
    const layer3YScrollOffset = hasMounted ? Math.min(0, layer3Diff * 1.5) : 0;

    return (
        <main style={{
            position: 'relative',
            width: '100%',
            minHeight: '1400vh', // 14 pages stacked
            background: 'black',
            overflow: 'hidden'
        }}>
            <CursorArrow targetSelector="[data-cursor-target]" />
            {/* 
                Layer 1: Background Gradient 
                Sky Blue -> Ocean -> Deep Ocean -> Black
            */}
            {/* 
                Layer 1: Backgrounds
            */}

            {/* Page 1 Background: Pure Black */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                background: '#000000',
                zIndex: 0,
            }} />

            {/* Page 2-14 Background: Wave Gradient with Fade to Black */}
            <div style={{
                position: 'absolute',
                top: hasMounted && typeof window !== 'undefined'
                    ? (window.innerWidth <= 768 ? 'calc(90vh + 20px)' : 'calc(90vh + 96px)')
                    : '100vh',
                left: 0,
                width: '100%',
                height: '1310vh', // Extended to cover the overlap
                zIndex: 0,
            }}>
                {/* Visual Base: Horizontal Wave Gradient */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to right, rgba(130, 158, 249, 1), rgba(76, 190, 255, 1), rgba(115, 209, 72, 1))',
                }} />

                {/* Overlay: Fade to Black */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: 'linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,1) 100%)',
                }} />
            </div>

            {/* 
                Layer 2: Starfield Effect 
                Canvas-based particle system
            */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 10,
                pointerEvents: 'none',
            }}>
                <StarfieldHero />
            </div>

            {/* 
                Layer 3: Waves Hero (3D Tilt Effect)
                Top layer
            */}
            {/* 
                Layer 3: Waves Hero (3D Tilt Effect)
                Top layer
            */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 20,
            }}>
                {/* Pass MotionValues to WavesHero */}
                <WavesHero mouseX={mouseX} mouseY={mouseY} />
            </div>

            {/* Layer 3.5: User Interface (Title & CTA) */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 35,
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}>
                {/* Header at Top */}
                <div style={{ paddingTop: '5vh' }}>
                    <HeroTitle />
                </div>

                {/* CTA at Center */}
                <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <HeroCTA />
                </div>
            </div>

            {/* Layer 4: Falling Man */}
            <FallingMan mouseX={mouseX} mouseY={mouseY} />

            {/*
                Layer 5: Lotus
            */}
            <div style={{
                position: 'absolute',
                top: '100vh',
                left: '50%',
                transform: 'translate(-50%, calc(-100% + 115px))',
                zIndex: 20, // Put behind Layer 2 (25) and Layer 3 (26)
                pointerEvents: 'auto'
            }}>
                <Lotus forceClose={scrollY > (typeof window !== 'undefined' ? (window.innerHeight / 2 - 95) : 99999)} />
            </div>

            {/*
                Layer 6: Navigation Buttons & Sidebar
            */}
            <NavButtons />

            {/* 
                Page 2 Layer 2: Transition Image
                Now at the bottom of Page 2 (200vh).
            */}
            <motion.div style={{
                position: 'absolute',
                top: 'calc(200vh - 480px)',
                left: 0,
                width: '100%',
                height: '100vh',
                zIndex: 25,
                pointerEvents: 'none',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                overflow: 'hidden',
                x: useTransform(mouseX, (x: number) => x * 15),
                y: useTransform(mouseY, (y: number) => y * 15),
            }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <NextImage
                        src="/images/home/page 2 layer 2.png"
                        alt="Page 2 Layer 2"
                        fill
                        style={{ objectFit: 'contain', objectPosition: 'top' }}
                        priority
                    />
                </div>
            </motion.div>

            {/* 
                Page 2 Layer 3: Secondary Transition Image
                Now at the bottom of Page 2 (200vh).
            */}
            <Page2Layer3 mouseX={mouseX} mouseY={mouseY} />

            {/* 
                Page 2 Content: Personality Selector
                At the top of Page 2 (100vh).
            */}
            <div style={{
                position: 'absolute',
                top: '100vh',
                left: 0,
                width: '100%',
                minHeight: '100vh',
                zIndex: 60, // Above Lotus (20) and its thread
                paddingTop: '40px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <MissionStatement />
                <PersonalitySelector />
            </div>

        </main>
    );
}
