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
            minHeight: '400vh', 
            background: '#000',
            overflowX: 'clip',
            overflowY: isChatActive ? 'hidden' : 'auto',
            height: isChatActive ? '100vh' : 'auto'
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

            {/* Background Waves */}
            <div style={{
                position: 'absolute',
                top: 'calc(65vh + 3.04cm)', 
                left: 0,
                width: '100%',
                height: '400vh', 
                zIndex: 2, 
                pointerEvents: 'none',
                opacity: 0.77,
                overflow: 'visible'
            }}>
                <WavesHero mouseX={mouseX} mouseY={mouseY} variant="spiritual" />
            </div>

            {/* Fish Tank (Page 2 Context) */}
            <div style={{ 
                position: 'absolute', 
                top: '100vh', 
                left: 0, 
                width: '100%', 
                height: '100vh', 
                zIndex: 5, 
                pointerEvents: 'none',
                opacity: 0.6
            }}>
                <FishTank />
            </div>

            {/* CONTENT SECTIONS */}
            <div style={{ position: 'relative', zIndex: 1000, overflow: 'visible' }}>
                {/* PAGE 1: AI INTERACTION */}
                <section style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative' }}>
                    <AnimatePresence>
                        {!isChatActive && (
                            <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
                                <HeroTitle isGlassActive={isGlassActive} />
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div style={{
                        position: 'absolute', bottom: '0', left: 0, width: '100%',
                        display: 'flex', justifyContent: 'center', pointerEvents: 'none'
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
                <section id="report-section" style={{ minHeight: '100vh' }}>
                    {!finalState ? (
                        <Page2Landing />
                    ) : (
                        <FullBlueprint userState={finalState} />
                    )}
                </section>
            </div>

            {/* Fixed Floating Elements */}
            <FallingMan mouseX={mouseX} mouseY={mouseY} />
            <Lotus quizMode={isChatActive} lotusOffset={lotusOffset} isChatActive={isChatActive} />
        </main>
    );
}
