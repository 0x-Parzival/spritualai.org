"use client";

import dynamic from 'next/dynamic';
import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useMotionValue } from 'framer-motion';

const StarfieldHero = dynamic(() => import('../components/StarfieldHero'), { ssr: false });
const WavesHero = dynamic(() => import('../components/WavesHero'), { ssr: false });
const Lotus = dynamic(() => import('../components/Lotus'), { ssr: false });
const HeroTitle = dynamic(() => import('../components/HeroTitle'), { ssr: true });
const MobileHome = dynamic(() => import('../components/home/MobileHome'), { ssr: false });
const HeroCTA = dynamic(() => import('../components/HeroCTA'), { ssr: true });
const NavButtons = dynamic(() => import('../components/NavButtons'), { ssr: false });
const OceanBackground = dynamic(() => import('../components/OceanBackground'), { ssr: false });
const InfinitePetals = dynamic(() => import('../components/InfinitePetals'), { ssr: false });
import heroStyles from '../components/HeroCTA.module.css';
import { AnimatePresence } from 'framer-motion';
import BlueprintReport from '../components/home/BlueprintReport';
import MBTIQuizV2 from '../components/home/v2/MBTIQuizV2';
import { UserState } from '@/lib/spiritual-conversation-engine';

export default function Home() {
    const [hasMounted, setHasMounted] = useState(false);
    const { scrollY: scrollYMotion } = useScroll();
    const [scrollY, setScrollY] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isGlassActive, setIsGlassActive] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [showBlueprint, setShowBlueprint] = useState(false);
    const [finalState, setFinalState] = useState<UserState | null>(null);
    const [chatRound, setChatRound] = useState(0);

    // Hooks MUST be called before any early returns
    const wavesOpacity = useTransform(scrollYMotion, [3000, 4000], [1, 0]);

    useEffect(() => {
        setHasMounted(true);
        const originalBodyOverflow = document.body.style.overflowY;
        const originalHtmlOverflow = document.documentElement.style.overflowY;
        const originalBodyHeight = document.body.style.height;
        const originalHtmlHeight = document.documentElement.style.height;

        document.body.style.overflowY = 'auto';
        document.documentElement.style.overflowY = 'auto';
        document.body.style.height = 'auto';
        document.documentElement.style.height = 'auto';

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        const handleMouseMove = (e: MouseEvent) => {
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

    const viewportWidth = hasMounted && typeof window !== 'undefined' ? window.innerWidth : 1200;
    const isMobile = viewportWidth <= 640;

    const handleMobileQuizComplete = (mbti: string) => {
        console.log('Mobile quiz completed:', mbti);
    };

    const handleChatComplete = (state: UserState) => {
        setFinalState(state);
        setShowBlueprint(true);
        // Scroll down to the blueprint section smoothly
        setTimeout(() => {
            window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }, 100);
    };

    // Render Mobile Home if on mobile
    if (isMobile && hasMounted && !showBlueprint) {
        return <MobileHome onQuizComplete={handleMobileQuizComplete} />;
    }

    return (
        <main style={{
            position: 'relative',
            width: '100%',
            minHeight: showBlueprint ? '200vh' : '100vh',
            background: 'transparent',
            overflow: 'hidden',
        }}>
            {/* Layer 0: Dynamic Ocean Background */}
            <OceanBackground />

            {/* Layer 0.5: Infinite Lotus Petals */}
            <InfinitePetals />

            {/* PAGE 1: Chat UI */}
            <motion.div
                key="main-ui"
                initial={{ opacity: 1 }}
                style={{ position: 'relative', width: '100%', height: '100vh', zIndex: 50 }}
            >
                {/* Starfield (Satyaloka) - Simplified */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100vh',
                    zIndex: 10, pointerEvents: 'none',
                    opacity: 0.3
                }}>
                    <StarfieldHero />
                </div>

                {/* Layer 3: Waves Hero */}
                <motion.div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100vh',
                    zIndex: 20,
                    opacity: wavesOpacity,
                    pointerEvents: 'none',
                }}>
                    <WavesHero mouseX={mouseX} mouseY={mouseY} />
                </motion.div>

                {/* Global Glass Overlay (Page 1) */}
                <AnimatePresence>
                    {isGlassActive && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            style={{
                                position: 'absolute',
                                inset: 0,
                                zIndex: 90,
                                pointerEvents: 'all',
                            }}
                            className={heroStyles.glassOverlay}
                        />
                    )}
                </AnimatePresence>

                {/* Layer 3.5: UI (Title & CTA Bar) */}
                <div style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100vh',
                    zIndex: 100, pointerEvents: 'none',
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    overflow: 'visible',
                }}>
                    {/* TOP: Title */}
                    <div style={{
                        display: 'flex', flexDirection: 'column', alignItems: 'center',
                        paddingTop: '20px',
                        width: '100%',
                        position: 'relative',
                        zIndex: 40,
                    }}>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                            style={{ width: '100%' }}
                        >
                            <HeroTitle />
                        </motion.div>
                    </div>

                    {/* BOTTOM: Counter, Chips and Chat */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        pointerEvents: 'auto',
                        paddingBottom: '24px',
                        zIndex: 110,
                    }}>
                        <HeroCTA 
                            onGlassChange={setIsGlassActive} 
                            onRoundChange={setChatRound}
                            onComplete={handleChatComplete}
                        />
                    </div>
                </div>
            </motion.div>

            {/* PAGE 2: Blueprint Report */}
            {showBlueprint && finalState && (
                <motion.div
                    key="blueprint-report"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                    style={{ position: 'relative', zIndex: 200, minHeight: '100vh' }}
                >
                    <BlueprintReport 
                        userState={finalState} 
                        onClose={() => {
                            setShowBlueprint(false);
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }} 
                    />
                </motion.div>
            )}

            {/* Desktop-Specific Fixed Elements */}
            {!isMobile && !showBlueprint && (
                <>
                    {/* Layer 5: Lotus (Fixed Middle - Lowered) */}
                    <div style={{
                        position: 'fixed',
                        top: 'calc(50% + 210px)',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 25,
                        pointerEvents: 'auto',
                    }}>
                        <motion.div
                            animate={{ y: [0, -10, 0] }}
                            transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
                        >
                            <Lotus
                                forceClose={hasMounted && scrollY >= 1950}
                                quizMode={hasMounted && scrollY > 800 && scrollY < 1800}
                            />
                        </motion.div>
                    </div>

                    {/* Layer 6: Navigation */}
                    <motion.div
                        animate={{ y: [0, -8, 0] }}
                        transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
                        style={{ position: 'fixed', top: 0, left: 0, width: '100%', zIndex: 65 }}
                    >
                        {!isGlassActive && <NavButtons />}
                    </motion.div>
                </>
            )}
        </main>
    );
}
