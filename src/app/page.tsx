"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform, AnimatePresence, useMotionValueEvent } from 'framer-motion';
import HeroTitle from '../components/HeroTitle';
import HeroCTA from '../components/HeroCTA';
import FallingMan from '../components/FallingMan';
import Lotus from '../components/Lotus';
import OceanBackground from '../components/OceanBackground';
import StarfieldHero from '../components/StarfieldHero';
import WavesHero from '../components/WavesHero';
import Page2Landing from '../components/Page2Landing';
import FullBlueprint from '../components/home/FullBlueprint';
import ProductsKit from '../components/home/ProductsKit';
import SatyalokaArrival from '../components/home/SatyalokaArrival';
import NavButtons from '../components/NavButtons';
import InfinitePetals from '../components/InfinitePetals';
import dynamic from 'next/dynamic';

const FishTank = dynamic(() => import('../components/artistic/FishTank'), { ssr: false });

export default function SpiritualAI() {
    const [isGlassActive, setIsGlassActive] = useState(false);
    const [finalState, setFinalState] = useState<any>(null);
    const [chatRound, setChatRound] = useState(0);
    const [atBottom, setAtBottom] = useState(false);
    const [isChatActive, setIsChatActive] = useState(false);
    const [isGeneratingReport, setIsGeneratingReport] = useState(false);
    const [lotusOffset, setLotusOffset] = useState(0);

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

    const handleChatComplete = (state: any) => {
        setFinalState(state);
    };

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const totalHeight = finalState ? 4 : 2;
        const currentVh = latest * totalHeight;

        if (currentVh >= 1.95 && currentVh <= 2.05) {
            setLotusOffset(0);
        } else {
            setLotusOffset(0);
        }

        if (latest >= 0.995) {
            setAtBottom(true);
        } else if (atBottom) {
            setAtBottom(false);
        }
    });

    return (
        <main style={{ 
            position: 'relative', 
            height: isChatActive ? '100vh' : '298vh', 
            background: '#0a0a1a',
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
                        style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 1000, pointerEvents: 'none' }}
                    >
                        <div style={{ pointerEvents: 'auto' }}>
                            <NavButtons />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Background Layer 0: Dynamic Ocean */}
            <OceanBackground />

            {/* Background Layer 1: Stars */}
            <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 1, pointerEvents: 'none', opacity: 0.33 }}>
                <StarfieldHero boost={!!finalState} />
            </div>
            
            <InfinitePetals />

            {/* Background Waves Layer 1: Colorful (Page 1 & 2) */}
            <div style={{
                position: 'absolute',
                top: 'calc(48vh + 3.04cm)', 
                left: 0,
                width: '100%',
                height: '152vh', 
                zIndex: 2, 
                pointerEvents: 'none',
                opacity: 0.77,
                overflow: 'hidden'
            }}>
                <WavesHero variant="spiritual" />
            </div>

            {/* Background Waves Layer 2: Matte Black (Ends at P2) */}
            <div style={{
                position: 'absolute',
                top: 'calc(148vh + 7.04cm - 2cm)', 
                left: 0,
                width: '100%',
                height: 'calc(152vh - 7.04cm)', 
                zIndex: 6, 
                pointerEvents: 'none',
                opacity: 1, 
                overflow: 'visible' 
            }}>
                <WavesHero variant="black" />
            </div>

            {/* CONTENT SECTIONS */}
            <div style={{ position: 'relative', overflow: 'visible' }}>
                {/* Transition Overlay to bring background forward over waves */}
                <div style={{
                    position: 'absolute',
                    top: '180vh',
                    left: 0,
                    width: '100%',
                    height: '18vh', // Adjusted from 22vh to end at 198vh
                    background: 'linear-gradient(to bottom, transparent, #0a0a1a)',
                    zIndex: 120, 
                    pointerEvents: 'none'
                }} />

                {/* PAGE 1: AI INTERACTION */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 3100 }}>
                    <AnimatePresence>
                        {!isChatActive && (
                            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <HeroTitle isGlassActive={isGlassActive} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div style={{
                        position: 'absolute', bottom: '0', left: 0, width: '100%',
                        display: 'flex', justifyContent: 'center', pointerEvents: 'none',
                        zIndex: 5000
                    }}>
                        <HeroCTA 
                            onGlassChange={setIsGlassActive} 
                            onRoundChange={setChatRound} 
                            onComplete={handleChatComplete}
                            onChatActive={setIsChatActive}
                            onGeneratingReport={setIsGeneratingReport}
                        />
                    </div>
                </section>

                {/* PAGE 2: REPORT / LANDING */}
                <section id="report-section" style={{ minHeight: '100vh', background: 'transparent', position: 'relative', zIndex: 3200 }}>
                    {!finalState ? (
                        <Page2Landing />
                    ) : (
                        <FullBlueprint userState={finalState} />
                    )}
                </section>

                {/* PAGE 3: EXTRA CONTEXT */}
                <section style={{ 
                    height: '100vh', 
                    background: '#0a0a1a',
                    position: 'relative',
                    zIndex: 3150,
                    overflow: 'hidden',
                    marginTop: '-2vh' // Pull up to touch the bottom of invitation container
                }}>
                    {/* Stars for Page 3 */}
                    <div style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', opacity: 0.33 }}>
                        <StarfieldHero boost={!!finalState} />
                    </div>

                    {/* Background Waves Layer 3: Colorful (Page 3 Foreground) - Moved inside to manage stacking */}
                    <div style={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        height: '60vh', 
                        zIndex: 100, 
                        pointerEvents: 'none',
                        opacity: 0.77,
                    }}>
                        <WavesHero variant="spiritual" />
                    </div>

                    <div style={{
                        position: 'absolute', bottom: '2vh', left: 0, width: '100%',
                        display: 'flex', justifyContent: 'center', pointerEvents: 'none',
                        zIndex: 5000 // Above everything
                    }}>
                        <HeroCTA 
                            onGlassChange={setIsGlassActive} 
                            onRoundChange={setChatRound} 
                            onComplete={handleChatComplete}
                            onChatActive={setIsChatActive}
                            onGeneratingReport={setIsGeneratingReport}
                            hidePopup={true}
                        />
                    </div>
                </section>
            </div>

            {/* Fixed Floating Elements */}
            <FallingMan mouseX={mouseX} mouseY={mouseY} />
            <Lotus quizMode={isChatActive} lotusOffset={lotusOffset} isChatActive={isChatActive} />
        </main>
    );
}
