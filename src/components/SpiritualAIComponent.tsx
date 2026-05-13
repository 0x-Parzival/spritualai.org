"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import HeroTitle from './HeroTitle';
import HeroCTA from './HeroCTA';
import NavButtons from './NavButtons';
import Page2Landing from './Page2Landing';
import SocialLinks from './home/SocialLinks';
import MiniHeroBranding from './home/MiniHeroBranding';
import PretextWrapper from './home/PretextWrapper';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';

const FishTank = dynamic(() => import('./artistic/FishTank'), { ssr: false });
const Lotus = dynamic(() => import('./Lotus'), { ssr: false });
const OceanBackground = dynamic(() => import('./OceanBackground'), { ssr: false });
const StarfieldHero = dynamic(() => import('./StarfieldHero'), { ssr: false });
const WavesHero = dynamic(() => import('./WavesHero'), { ssr: false });
const FallingMan = dynamic(() => import('./FallingMan'), { ssr: false });
const InfinitePetals = dynamic(() => import('./InfinitePetals'), { ssr: false });
const PatternDeconstruction = dynamic(() => import('./home/PatternDeconstruction'), { ssr: false });
const EyeComponent = dynamic(() => import('./artistic/EyeComponent'), { ssr: false });
const DetailedReport = dynamic(() => import('./home/DetailedReport'), { ssr: false });
const ProductsKit = dynamic(() => import('./home/ProductsKit'), { ssr: false });
const SatyalokaArrival = dynamic(() => import('./home/SatyalokaArrival'), { ssr: false });

export default function SpiritualAIComponent() {
    const { isSignedIn } = useUser();
    const [isGlassActive, setIsGlassActive] = useState(false);
    const [finalState, setFinalState] = useState<any>(null);
    const [chatRound, setChatRound] = useState(0);
    const [atBottom, setAtBottom] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [lotusOffset, setLotusOffset] = useState(0);
    const [lastReadArchitecture, setLastReadArchitecture] = useState<string | null>(null);

    const { scrollYProgress } = useScroll();
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        // We no longer restore state on mount to keep the home page fresh as per user request.
        // The report is accessible via the "My Profile" section for logged-in users.
        localStorage.removeItem('spiritualAiState'); 
    }, []);

    useEffect(() => {
        if (isChatActive) {
            document.body.style.overflow = 'hidden';
            document.body.style.height = '100vh';
        } else {
            document.body.style.overflow = '';
            document.body.style.height = '';
        }
        return () => {
            document.body.style.overflow = '';
            document.body.style.height = '';
        };
    }, [isChatActive]);

    const handleChatComplete = React.useCallback((state: any) => {
        setFinalState(state);
        setIsChatActive(false);
        setTimeout(() => {
            const reportSection = document.getElementById('report-section');
            if (reportSection) {
                reportSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 800);
    }, []);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const totalHeight = finalState ? 4 : 3;
        const currentVh = latest * totalHeight;

        // Optimized state updates
        if (latest >= 0.995) {
            if (!atBottom) setAtBottom(true);
        } else {
            if (atBottom) setAtBottom(false);
        }
    });

    const handleArchitectureView = React.useCallback((title: string) => {
        setLastReadArchitecture(title);
    }, []);

    return (
        <main style={{ 
            position: 'relative', 
            height: isChatActive ? '100vh' : '300vh', 
            width: '100%',
            maxWidth: '100%',
            background: '#030303',
            overflowX: 'clip',
            overflowY: isChatActive ? 'hidden' : 'clip'
        }}>
            {/* Nav Buttons (Absolute at top) */}
            <AnimatePresence>
                {!isChatActive && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        style={{ position: 'absolute', top: 0, left: '0', width: '100%', zIndex: '1000', pointerEvents: 'none' }}
                    >
                        <div style={{ pointerEvents: 'auto' }}>
                            <NavButtons />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Layer 0: Dynamic Ocean */}
            <OceanBackground />

            {/* Background Layer 1: Stars (Single fixed instance) */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: '3500', pointerEvents: 'none', opacity: 0.8 }}>
                <StarfieldHero boost={!!finalState} />
            </div>

            {/* Shared HeroCTA (Persistent across pages) */}
            {(!finalState || isSignedIn) && (
                <div style={{
                    position: 'fixed', 
                    bottom: 0, 
                    left: '0', 
                    width: '100%',
                    display: 'flex', 
                    justifyContent: 'center', 
                    pointerEvents: 'none',
                    zIndex: isChatActive ? '9500' : '9000' // Move above EVERYTHING during chat
                }}>
                    <HeroCTA 
                        onGlassChange={setIsGlassActive} 
                        onRoundChange={setChatRound} 
                        onComplete={handleChatComplete}
                        onChatActive={setIsChatActive}
                        onGeneratingReport={setIsGeneratingReport}
                        lastReadArchitecture={lastReadArchitecture}
                    />
                </div>
            )}
            
            <AnimatePresence>
                {!isChatActive && <InfinitePetals />}
            </AnimatePresence>

            {/* Background Waves Layer 1: Colorful (Page 1 & 2) */}
            <AnimatePresence>
                {!isChatActive && (
                    <motion.div 
                        initial={{ opacity: 0.77 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: 'calc(48vh + 3.04cm)', 
                            left: '0',
                            width: '100%', 
                            height: '152vh', 
                            zIndex: '2', 
                            pointerEvents: 'none',
                            overflow: 'hidden'
                        }}
                    >
                        <WavesHero variant="spiritual" />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Waves Layer 2: Matte Black (Ends at P2) */}
            <div style={{
                position: 'absolute',
                top: 'calc(148vh + 7.04cm - 2cm)', 
                left: '0',
                width: '100%', 
                height: 'calc(152vh - 7.04cm)', 
                zIndex: '6', 
                pointerEvents: 'none',
                opacity: 1, 
                overflow: 'visible' 
            }}>
                <WavesHero variant="black" />
            </div>

            {/* CONTENT SECTIONS */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '100%', overflow: 'visible' }}>
                {/* Transition Overlay to bring background forward over waves */}
                <div style={{
                    position: 'absolute',
                    top: '180vh',
                    left: '0',
                    width: '100%',
                    height: '18vh', 
                    backgroundImage: 'linear-gradient(to bottom, transparent, #030303)',
                    zIndex: '120', 
                    pointerEvents: 'none'
                }} />

                {/* PAGE 1: AI INTERACTION */}
                <section style={{ height: '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: '3100' }}>
                    <AnimatePresence>
                        {!isChatActive && (
                            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <HeroTitle isGlassActive={isGlassActive} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                <section id="report-section" style={{ minHeight: '100vh', width: '100%', background: 'transparent', position: 'relative', zIndex: '3200' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', opacity: 0.6 }}>
                        <FishTank />
                    </div>
                    {!finalState ? (
                        <Page2Landing onArchitectureView={handleArchitectureView} />
                    ) : (
                        <DetailedReport userState={finalState} />
                    )}
                </section>

                {/* PAGE 3: EXTRA CONTEXT */}
                <section style={{ 
                    height: '100vh', 
                    width: '100%',
                    background: '#030303',
                    position: 'relative',
                    zIndex: '3150',
                    overflow: 'hidden',
                    marginTop: '-2vh' // Pull up to touch the bottom of invitation container
                    }}>
                    {/* Background Waves Layer 3: Colorful (Page 3 Foreground) - Moved inside to manage stacking */}
                    <div style={{
                        position: 'absolute',
                        top: 'calc(48vh + 3.04cm)', // Same as page 1
                        left: '0',
                        width: '100%',
                        height: '152vh', // Same as page 1
                        zIndex: '100',
 
                        pointerEvents: 'none',
                        opacity: 0.77,
                        overflow: 'hidden'
                    }}>
                        <WavesHero variant="spiritual" />
                    </div>

                    {/* Branding (Centered on Page 3) */}
                    <div style={{
                        position: 'absolute',
                        top: '60px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: '8000',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        textAlign: 'center'
                    }}>
                        <MiniHeroBranding />
                        <div style={{ marginTop: '-0.5cm', width: '100%' }}>
                            <PretextWrapper
                                text="Your pattern is not the problem. The way you’re trying to solve it is."
                                font="300 clamp(10px, 1vw, 15.4px) 'Inter', sans-serif"
                                width={1200}
                                align="center"
                                style={{
                                    color: 'rgba(53, 248, 255, 0.85)',
                                    letterSpacing: '0.4em',
                                    textTransform: 'uppercase',
                                    opacity: 0.9,
                                    filter: 'drop-shadow(0 0 10px rgba(53, 248, 255, 0.3))'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ position: 'absolute', bottom: 'calc(15vh + 3cm)', left: '1vw', width: '43vw', zIndex: '8000', pointerEvents: 'auto' }}>
                        <PatternDeconstruction startIndex={0} initialDelay={5000} />
                    </div>

                    <div style={{ position: 'absolute', bottom: 'calc(15vh + 3cm)', right: '1vw', width: '43vw', zIndex: '8000', pointerEvents: 'auto' }}>
                        <PatternDeconstruction startIndex={2} initialDelay={10000} />
                    </div>

                    <EyeComponent />

                    {/* Social Links (Top Right on Page 3) */}
                    <div style={{
                        position: 'absolute',
                        top: '60px',
                        right: '40px', 
                        zIndex: '8000' 
                    }}>
                        <SocialLinks />
                    </div>
                </section>
            </div>

            {/* Fixed Floating Elements */}
            <FallingMan mouseX={mouseX} mouseY={mouseY} />
            {!isGeneratingReport && (!finalState || isSignedIn) && (
                <Lotus quizMode={isChatActive} lotusOffset={lotusOffset} isChatActive={isChatActive} />
            )}
        </main>
    );
}
