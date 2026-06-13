"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import HeroTitle from './HeroTitle';
import NavButtons from './NavButtons';
import Page2Landing from './Page2Landing';
import SocialLinks from './home/SocialLinks';
import MiniHeroBranding from './home/MiniHeroBranding';
import dynamic from 'next/dynamic';
import { useUser } from '@clerk/nextjs';
import { useIsMobile } from '@/lib/useIsMobile';

// Skeleton input bar so the primary CTA never looks missing while the chunk loads
const HeroCTA = dynamic(() => import('./HeroCTA'), {
    ssr: false,
    loading: () => (
        <div aria-hidden="true" style={{
            width: 'min(calc(100vw - 76px), 1180px)',
            height: '75px',
            marginBottom: '25px',
            borderRadius: '50px',
            border: '2px solid rgba(112, 0, 255, 0.4)',
            background: 'rgba(0, 0, 0, 0.6)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 25px',
            color: 'rgba(255, 255, 255, 0.3)',
            fontSize: '0.75rem',
            letterSpacing: '2px',
            textTransform: 'uppercase',
            fontFamily: "'Inter', sans-serif"
        }}>
            Ask anything...
        </div>
    )
});
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
        // Sink the lotus behind the black waves as page 3 approaches.
        // Quantized to 20px steps to keep re-renders cheap; .stage smooths via its bottom transition.
        const sink = latest <= 0.5 ? 0 : Math.min(340, Math.round(((latest - 0.5) / 0.25) * 340 / 20) * 20);
        setLotusOffset(prev => (prev === sink ? prev : sink));
    });

    // Fade the lotus out in the same scroll window (motion value: no re-renders)
    const lotusFade = useTransform(scrollYProgress, [0.52, 0.72], [1, 0]);
    const lotusVisibility = useTransform(lotusFade, (v) => (v < 0.03 ? 'hidden' : 'visible'));

    // Determine if we should show the CTA
    const showHeroCTA = (!finalState || isSignedIn);

    return (
        <main style={{
            position: 'relative',
            height: isChatActive ? '100vh' : 'auto',
            minHeight: isChatActive ? undefined : '300vh',
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
                <section style={{ height: (mounted && isMobile) ? 'auto' : '100vh', minHeight: (mounted && isMobile) ? '80vh' : undefined, width: '100%', display: 'flex', flexDirection: 'column', justifyContent: (mounted && isMobile) ? 'flex-start' : 'center', paddingTop: (mounted && isMobile) ? '10vh' : '0', paddingBottom: (mounted && isMobile) ? '2rem' : '0', position: 'relative', zIndex: '3100' }}>
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
                    minHeight: '100vh',
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

                    {/* Page 3 content — normal flow so nothing overlaps; capped for ultrawide */}
                    <div style={{
                        position: 'relative',
                        zIndex: 8000,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: '100%',
                        maxWidth: '1900px',
                        margin: '0 auto',
                        minHeight: '100vh',
                        padding: isMobile ? '14vh 5vw 40vh' : '8vh 5vw 24vh',
                        textAlign: 'center',
                        pointerEvents: 'none'
                    }}>
                        <div style={{ transform: isMobile ? 'scale(0.9)' : 'scale(0.72)', transformOrigin: 'center' }}>
                            <MiniHeroBranding />
                        </div>
                        <p style={{
                            margin: '0.6rem 0 0',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 300,
                            fontSize: 'clamp(0.7rem, 0.4rem + 0.7vw, 0.95rem)',
                            color: 'rgba(53, 248, 255, 0.85)',
                            letterSpacing: '0.18em',
                            textIndent: '0.18em',
                            textTransform: 'uppercase',
                            maxWidth: '90vw',
                            filter: 'drop-shadow(0 0 10px rgba(53, 248, 255, 0.3))'
                        }}>
                            Your pattern is not the problem. The way you&apos;re trying to solve it is.
                        </p>
                        <p style={{
                            margin: '0.9rem 0 0',
                            fontFamily: "'Inter', sans-serif",
                            fontWeight: 400,
                            fontSize: 'clamp(0.85rem, 0.6rem + 0.6vw, 1.05rem)',
                            color: 'rgba(222, 235, 255, 0.75)',
                            maxWidth: '100%',
                            whiteSpace: isMobile ? 'normal' : 'nowrap',
                            lineHeight: 1.55
                        }}>
                            Every protocol below was bought by a real member after their diagnosis — here&apos;s what they paid, and what it fixed.
                        </p>

                        {/* Member protocol cards */}
                        <div style={{
                            marginTop: isMobile ? '1.6rem' : '2.4rem',
                            width: '100%',
                            display: 'flex',
                            flexDirection: isMobile ? 'column' : 'row',
                            gap: isMobile ? '14px' : 'clamp(16px, 2vw, 48px)',
                            alignItems: isMobile ? 'center' : 'stretch',
                            justifyContent: 'center',
                            pointerEvents: 'auto'
                        }}>
                            <div style={{ width: isMobile ? '100%' : 'min(43vw, 890px)' }}>
                                {mounted && <PatternDeconstruction startIndex={0} initialDelay={5000} randomize={false} />}
                            </div>
                            <div style={{ width: isMobile ? '100%' : 'min(43vw, 890px)' }}>
                                {mounted && <PatternDeconstruction startIndex={2} initialDelay={10000} randomize={false} />}
                            </div>
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

            {/* Fixed Floating Elements — lotus sinks behind the black waves on scroll */}
            {(mounted && !isGeneratingReport && (!finalState || isSignedIn)) && (
                <motion.div style={{ opacity: isChatActive ? 1 : lotusFade, visibility: isChatActive ? 'visible' : lotusVisibility }}>
                    <Lotus quizMode={isChatActive} lotusOffset={isChatActive ? 0 : lotusOffset} isChatActive={isChatActive} />
                </motion.div>
            )}
        </main>
    );
}
