"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import HeroTitle from './HeroTitle';
import NavButtons from './NavButtons';
import Page2Landing from './Page2Landing';
import SocialLinks from './home/SocialLinks';
import MiniHeroBranding from './home/MiniHeroBranding';
import PretextWrapper from './home/PretextWrapper';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import { useIsMobile } from '@/lib/useIsMobile';

const HeroCTA = dynamic(() => import('./HeroCTA'), { ssr: false });
const FishTank = dynamic(() => import('./artistic/FishTank'), { ssr: false });
const Lotus = dynamic(() => import('./Lotus'), { ssr: false });
const OceanBackground = dynamic(() => import('./OceanBackground'), { ssr: false });
const StarfieldHero = dynamic(() => import('./StarfieldHero'), { ssr: false });
const WavesHero = dynamic(() => import('./WavesHero'), { ssr: false });
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
    const isMobile = useIsMobile();
    const [mounted, setMounted] = useState(false);
    const mouseX = useSpring(0, { stiffness: 50, damping: 20 });
    const mouseY = useSpring(0, { stiffness: 50, damping: 20 });

    useEffect(() => {
        setMounted(true);
        const handleMouseMove = (e: MouseEvent) => {
            mouseX.set((e.clientX / window.innerWidth) - 0.5);
            mouseY.set((e.clientY / window.innerHeight) - 0.5);
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, [mouseX, mouseY]);

    useEffect(() => {
        // Clear state on mount to keep home page fresh
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
        if (latest >= 0.995) {
            if (!atBottom) setAtBottom(true);
        } else {
            if (atBottom) setAtBottom(false);
        }
    });

    // Determine if we should show the CTA
    const showHeroCTA = (!finalState || isSignedIn);

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
                {(mounted && !isChatActive) && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{ position: 'absolute', top: '0px', left: '0px', width: '100%', zIndex: '10000', pointerEvents: 'none' }}
                    >
                        <div style={{ pointerEvents: 'auto' }}>
                            <NavButtons />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {mounted && <OceanBackground />}

            {/* Background Starfield (Deepest Layer) */}
            <div style={{ position: 'fixed', top: '0px', left: '0px', width: '100%', height: '100vh', zIndex: '1', pointerEvents: 'none', opacity: '0.8' }}>
                {mounted && <StarfieldHero boost={!!finalState} />}
            </div>

            {/* Shared HeroCTA */}
            {(mounted && showHeroCTA) && (
                <div style={{
                    position: 'fixed', 
                    bottom: '0px', 
                    left: '0px', 
                    width: '100%',
                    display: 'flex', 
                    justifyContent: 'center', 
                    pointerEvents: 'none',
                    zIndex: isChatActive ? '9500' : '9000'
                }}>
                    <HeroCTA 
                        onGlassChange={setIsGlassActive} 
                        onRoundChange={setRound => setChatRound(setRound)} 
                        onComplete={handleChatComplete}
                        onChatActive={setIsChatActive}
                        onGeneratingReport={setIsGeneratingReport}
                        lastReadArchitecture={lastReadArchitecture}
                    />
                </div>
            )}
            
            <AnimatePresence>
                {(mounted && !isChatActive) && <InfinitePetals />}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════════
                WAVE 1 — Spiritual: page 1 → bottom of page 2
                ═══════════════════════════════════════════════════════ */}
            <AnimatePresence>
                {(mounted && !isChatActive) && (
                    <motion.div 
                        initial={{ opacity: 0.77 }}
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'absolute',
                            top: isMobile ? '0vh' : 'calc(48vh + 3.04cm)',
                            left: '0',
                            width: '100%', 
                            height: '152vh',
                            zIndex: '2', 
                            pointerEvents: 'none',
                            overflow: 'hidden'
                        }}
                    >
                        <WavesHero variant="spiritual" isMobile={isMobile} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ═══════════════════════════════════════════════════════
                WAVE 2 — Black: page 2 → bottom of page 3
                ═══════════════════════════════════════════════════════ */}
            <div style={{
                position: 'absolute',
                top: (mounted && isMobile) ? '100vh' : 'calc(148vh + 7.04cm - 2cm)',
                left: '0',
                width: '100%', 
                height: (mounted && isMobile) ? '200vh' : 'calc(152vh - 7.04cm)',
                zIndex: '6', 
                pointerEvents: 'none',
                opacity: 1, 
                overflow: 'visible' 
            }}>
                {mounted && <WavesHero variant="black" isMobile={isMobile} />}
            </div>

            {/* CONTENT SECTIONS */}
            <div style={{ position: 'relative', width: '100%', maxWidth: '100%', overflow: 'visible' }}>
                <div style={{
                    position: 'absolute',
                    top: (mounted && isMobile) ? '130vh' : '180vh',
                    left: '0',
                    width: '100%',
                    height: (mounted && isMobile) ? '10vh' : '18vh', 
                    backgroundImage: 'linear-gradient(to bottom, transparent, #030303)',
                    zIndex: '120', 
                    pointerEvents: 'none'
                }} />

                {/* ─── PAGE 1: Hero ─── */}
                <section style={{ height: (mounted && isMobile) ? '80vh' : '100vh', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: (mounted && isMobile) ? 'flex-start' : 'center', paddingTop: (mounted && isMobile) ? '10vh' : '0', position: 'relative', zIndex: '3100' }}>
                    <AnimatePresence>
                        {!isChatActive && (
                            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <HeroTitle isGlassActive={isGlassActive} isMobile={isMobile ?? false} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </section>

                {/* ─── PAGE 2: Grid/Boxes ─── */}
                <section id="report-section" style={{ minHeight: (mounted && isMobile) ? '70vh' : '100vh', width: '100%', background: 'transparent', position: 'relative', zIndex: '3200', paddingBottom: (mounted && isMobile) ? '3rem' : '0' }}>
                    <div style={{ position: 'absolute', inset: 0, zIndex: -1, pointerEvents: 'none', opacity: 0.6 }}>
                        {mounted && <FishTank />}
                    </div>
                    {!finalState ? (
                        <Page2Landing onArchitectureView={(title) => setLastReadArchitecture(title)} />
                    ) : (
                        <DetailedReport userState={finalState} />
                    )}
                </section>

                {/* ─── PAGE 3: Final Context ─── */}
                <section style={{
                    height: '100vh',
                    width: '100%',
                    backgroundColor: '#030303',
                    position: 'relative',
                    zIndex: '3300',
                    overflow: 'hidden',
                    marginTop: '-2vh'
                    }}>

                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '100vw',
                        height: '100vh',
                        background: 'radial-gradient(circle at center, rgba(53, 248, 255, 0.1) 0%, transparent 60%)',
                        zIndex: '50',
                        pointerEvents: 'none',
                    }} />

                    {/* Final Waves for Page 3 */}
                    <div style={{
                        position: 'absolute',
                        top: (mounted && isMobile) ? '25vh' : 'calc(48vh + 3.04cm)',
                        left: '0px',
                        width: '100%',
                        height: '152vh',
                        zIndex: '100',
                        pointerEvents: 'none',
                        opacity: '0.77',
                        overflow: 'hidden'
                    }}>
                        {mounted && <WavesHero variant="spiritual" isMobile={isMobile} />}
                    </div>

                    <div style={{
                        position: 'absolute',
                        top: '22px', 
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
                        <div style={{ marginTop: '0.5rem', width: '100%' }}>
                            <PretextWrapper
                                text="Your pattern is not the problem. The way you’re trying to solve it is."
                                font="300 clamp(10px, 1vw, 15.4px) 'Inter', sans-serif"
                                width={1200}
                                align="center"
                                style={{
                                    color: 'rgba(53, 248, 255, 0.85)',
                                    letterSpacing: '0.4em',
                                    textTransform: 'uppercase',
                                    opacity: '0.9',
                                    filter: 'drop-shadow(0 0 10px rgba(53, 248, 255, 0.3))'
                                }}
                            />
                        </div>
                    </div>
                    
                    {/* Social Links + Pattern Deconstruction — stacked on mobile */}
                    <div style={{
                        position: 'absolute',
                        bottom: isMobile ? 'calc(12vh + 1cm)' : 'calc(19vh + 3cm)',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: isMobile ? '90vw' : '90vw',
                        display: 'flex',
                        flexDirection: isMobile ? 'column' : 'row',
                        gap: isMobile ? '12px' : '2vw',
                        zIndex: 8000,
                        pointerEvents: 'auto',
                        alignItems: 'center',
                    }}>
                        <div style={{ width: isMobile ? '100%' : '43vw' }}>
                            {mounted && <PatternDeconstruction startIndex={0} initialDelay={5000} randomize={true} />}
                        </div>
                        <div style={{ width: isMobile ? '100%' : '43vw' }}>
                            {mounted && <PatternDeconstruction startIndex={2} initialDelay={10000} randomize={true} />}
                        </div>
                    </div>

                    {/* EGO Orb — scaled down on mobile */}
                    <div style={{
                        transform: isMobile ? 'scale(0.5)' : 'scale(1)',
                        transformOrigin: 'top left',
                        position: 'absolute',
                        left: isMobile ? '-10px' : '20px',
                        pointerEvents: 'none',
                        zIndex: 1,
                    }}>
                        {mounted && <EyeComponent />}
                    </div>

                    {/* Social Links (Top Right on Page 3) */}
                    <div style={{
                        position: 'absolute',
                        top: '60px',
                        right: isMobile ? '10px' : '40px',
                        zIndex: '8000'
                    }}>
                        <SocialLinks />
                    </div>
                </section>
            </div>

            {/* Fixed Floating Elements */}
            {(mounted && !isGeneratingReport && (!finalState || isSignedIn)) && (
                <Lotus quizMode={isChatActive} lotusOffset={lotusOffset} isChatActive={isChatActive} />
            )}
        </main>
    );
}
