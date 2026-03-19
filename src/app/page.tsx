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
const HomeSections = dynamic(() => import('../components/home/HomeSections'), { ssr: false });
const OceanBackground = dynamic(() => import('../components/OceanBackground'), { ssr: false });
const InfinitePetals = dynamic(() => import('../components/InfinitePetals'), { ssr: false });
const MBTIQuiz = dynamic(() => import('../components/home/MBTIQuiz'), { ssr: false });

function Page2Layer3({ mouseX, mouseY }: { mouseX: any, mouseY: any }) {
    const { scrollY } = useScroll();
    const [windowHeight, setWindowHeight] = useState(1000);
    const [layerTop, setLayerTop] = useState('calc(350vh)');
    
    useEffect(() => {
        setWindowHeight(window.innerHeight);
        setLayerTop('calc(350vh + 300px)');
    }, []);

    const transitionThreshold = windowHeight * 3.5 - 480;
    const smoothScrollY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
    const layer3Diff = useTransform(smoothScrollY, (latest) => latest - transitionThreshold);
    const layer3Scale = useTransform(layer3Diff, [-192, -96, 0, 96], [2.0, 1.5, 1.0, 1.0]);
    const layer3YScrollOffset = useTransform(layer3Diff, (val) => Math.min(0, val * 0.5));
    
    const opacity = useTransform(smoothScrollY, [transitionThreshold - 800, transitionThreshold - 200], [0, 0.4]); // Subtle opacity

    return (
        <motion.div
            style={{
                position: 'absolute',
                top: layerTop,
                right: '2%', // Absolute edge
                width: '300px', // Smaller footprint
                height: '300px',
                zIndex: 5, // Behind sections
                pointerEvents: 'none',
                overflow: 'hidden',
                opacity,
                x: useTransform(mouseX, (x: number) => x * 10),
                y: useTransform([mouseY, layer3YScrollOffset], (latest) => {
                    const [mY, sY] = latest as [number, number];
                    return mY * 10 + sY;
                }),
                scale: layer3Scale,
            }}
        >
            <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                <NextImage
                    src="/images/home/page 2 layer 3.png"
                    alt="Decorative Transition Layer"
                    fill
                    style={{ objectFit: 'contain' }}
                />
            </div>
        </motion.div>
    );
}

export default function Home() {
    const [hasMounted, setHasMounted] = useState(false);
    const { scrollY: scrollYMotion, scrollYProgress } = useScroll();
    const [scrollY, setScrollY] = useState(0);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

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
    const isTablet = viewportWidth > 640 && viewportWidth <= 1024;
    const heroCtaTop = isMobile ? '62%' : isTablet ? '60%' : '58%';
    
    // page2Layer2Top: Shifted down by 100vh (from 150vh to 250vh)
    const page2Layer2Top = isMobile ? 'calc(250vh + 100px)' : isTablet ? 'calc(250vh + 150px)' : 'calc(250vh + 200px)';
    const personalitySectionOffset = 120; 
    // homeSectionsTop: Shifted down by 100vh (from 100vh to 200vh)
    const homeSectionsTop = `calc(200vh + ${personalitySectionOffset}px)`;

    return (
        <main style={{
            position: 'relative',
            width: '100%',
            minHeight: '1600vh', 
            background: 'transparent',
            overflow: 'hidden'
        }}>
            {/* Layer 0: Dynamic Ocean Background */}
            <OceanBackground />
            
            {/* Layer 0.5: Infinite Lotus Petals */}
            <InfinitePetals />

            {/* Layer 2: Starfield (Satyaloka) */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100vh',
                zIndex: 10, pointerEvents: 'none',
            }}>
                <StarfieldHero />
            </div>

            {/* Layer 3: Waves Hero */}
            <motion.div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '300vh',
                zIndex: 20,
                opacity: useTransform(scrollYMotion, [3000, 4000], [1, 0]), 
                pointerEvents: 'none'
            }}>
                <WavesHero mouseX={mouseX} mouseY={mouseY} />
            </motion.div>

            {/* Layer 3.5: UI (Title & CTA) */}
            <div style={{
                position: 'absolute',
                top: 0, left: 0, width: '100%', height: '100vh',
                zIndex: 35, pointerEvents: 'none',
                display: 'flex', flexDirection: 'column', alignItems: 'center',
            }}>
                <motion.div style={{ paddingTop: isMobile ? 'clamp(56px, 10vh, 140px)' : 'clamp(48px, 8vh, 120px)' }}
                    animate={{ y: [0, -15, 0] }}
                    transition={{ duration: 6, ease: 'easeInOut', repeat: Infinity }}
                >
                    <HeroTitle />
                </motion.div>

                <div style={{
                    position: 'absolute',
                    top: heroCtaTop,
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 'min(1200px, 100%)',
                    padding: isMobile ? '0 8vw' : '0 6vw',
                    display: 'flex',
                    justifyContent: 'center'
                }}>
                    <motion.div
                        animate={{ y: [0, -20, 0] }}
                        transition={{ duration: 5, ease: 'easeInOut', repeat: Infinity, delay: 1 }}
                    >
                        <HeroCTA />
                    </motion.div>
                </div>
            </div>

            {/* Layer 3.8: MBTI Quiz at 100vh (Page 2) */}
            <div style={{
                position: 'absolute',
                top: '100vh',
                left: 0,
                width: '100%',
                zIndex: 40,
            }}>
                <MBTIQuiz />
            </div>

            {/* Layer 4: Falling Man */}
            <FallingMan mouseX={mouseX} mouseY={mouseY} />

            {/* Layer 5: Lotus (Fixed Bottom) */}
            <div style={{
                position: 'fixed',
                bottom: '-67px',
                left: '50%',
                transform: 'translateX(-50%)',
                zIndex: 45,
                pointerEvents: 'auto'
            }}>
                <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 7, ease: 'easeInOut', repeat: Infinity, delay: 2 }}
                >
                    <Lotus forceClose={hasMounted && scrollY >= 1950} />
                </motion.div>
            </div>

            {/* Layer 6: Navigation */}
            <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 5.5, ease: 'easeInOut', repeat: Infinity, delay: 0.5 }}
                style={{ position: 'relative', zIndex: 65 }}
            >
                <NavButtons />
            </motion.div>

            {/* Janaloka Bottom Layer 2: Transition Image */}
            <motion.div style={{
                position: 'absolute',
                top: page2Layer2Top,
                left: '2%', // Far left
                width: '300px',
                height: '300px',
                zIndex: 5, // Behind sections
                pointerEvents: 'none',
                overflow: 'hidden',
                opacity: useTransform(scrollYMotion, [2000, 2500, 3500, 4000], [0, 0.4, 0.4, 0]),
                x: useTransform(mouseX, (x: number) => x * 10),
                y: useTransform(mouseY, (y: number) => y * 10),
            }}>
                <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                    <NextImage
                        src="/images/home/page 2 layer 2.png"
                        alt="Decorative Transition Layer"
                        fill
                        style={{ objectFit: 'contain' }}
                        priority
                    />
                </div>
            </motion.div>

            {/* Janaloka Bottom Layer 3: Secondary Transition Image */}
            <Page2Layer3 mouseX={mouseX} mouseY={mouseY} />

            {/* Sections: Scrollable Content (14 Lokas) */}
            <div style={{
                position: 'absolute',
                top: homeSectionsTop,
                left: 0,
                width: '100%',
                zIndex: 50,
            }}>
                <HomeSections />

                {/* Final Visual: Lord Vishnu */}
                <div style={{
                    position: 'relative',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    marginTop: 'clamp(18vh, 24vh, 30vh)',
                    paddingBottom: 'max(2vh, 24px)',
                    pointerEvents: 'none',
                    zIndex: 10,
                }}>
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: '-10%' }}
                        transition={{ duration: 2, ease: 'easeOut' }}
                        style={{
                            width: '100%',
                            maxWidth: '1920px',
                            display: 'flex',
                            justifyContent: 'center',
                            marginBottom: 0,
                        }}
                    >
                        <img
                            src="/images/home/vishnu.png"
                            alt="Lord Vishnu"
                            style={{
                                width: 'min(64vw, 980px)',
                                height: 'auto',
                                objectFit: 'contain',
                            }}
                        />
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
