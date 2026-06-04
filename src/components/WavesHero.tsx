"use client";

import { useId } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

interface WavesHeroProps {
    mouseX?: any;
    mouseY?: any;
    mousePos?: { x: number; y: number };
    variant?: 'default' | 'dark' | 'black' | 'spiritual';
    isMobile?: boolean | null;
}

export default function WavesHero({ mouseX, mouseY, mousePos = { x: 0, y: 0 }, variant = 'default', isMobile: isMobileProp }: WavesHeroProps) {
    const id = useId().replace(/:/g, "");
    const fallbackX = useMotionValue(mousePos.x);
    const fallbackY = useMotionValue(mousePos.y);

    const xBase = mouseX || fallbackX;
    const yBase = mouseY || fallbackY;

    const xOffset = useTransform(xBase as any, (x: number) => x * 10);
    const yOffset = useTransform(yBase as any, (y: number) => y * 10);

    // Use prop if provided, otherwise fallback to window check
    const isMobile = isMobileProp ?? (typeof window !== 'undefined' && window.innerWidth <= 768);

    const themeColors = {
        white: 'rgba(255, 255, 255, 0.75)',
        cyan: 'rgba(53, 248, 255, 0.55)',
        magenta: 'rgba(255, 60, 245, 0.45)'
    };

    const colors = {
        default: {
            back: ['#ff3cf5', '#b8ff5a', '#240046', '#1a1a2e'],
            mid: ['#35f8ff', '#ff3cf5', '#240046', '#1a1a2e'],
            front: ['#ffffff', '#35f8ff', '#ff3cf5', '#b8ff5a', '#240046'],
        },
        dark: {
            back: ['#333333', '#444444', '#111111', '#000000'],
            mid: ['#555555', '#333333', '#111111', '#000000'],
            front: ['#888888', '#555555', '#333333', '#111111', '#000000'],
        },
        black: {
            back: ['#030303', '#030303', '#030303'],
            mid: ['#030303', '#030303', '#030303'],
            front: ['#030303', '#030303', '#030303'],
        },
        spiritual: {
            back: [themeColors.magenta, themeColors.cyan, themeColors.white],
            mid: [themeColors.magenta, themeColors.cyan, themeColors.white],
            front: [themeColors.magenta, themeColors.cyan, themeColors.white],
        }
    };

    const activeColors = colors[variant];

    // Reference values from 0x-Parzival/spritualai.org
    const pathDDesktop = "M-363.852,50 c0,0,236.988-40.498,505.475,0 s371.981,39.499,575.971,0 s293.985-39.639,505.474,2.929 s493.475,44.184,716.963-2.497 v5000 H-363.852 V50 z";
    const pathDMobile = "M 0 2000 0 500 Q 120 420 300 500 t 300 0 300 0 300 0 300 0 300 0 v700 z";

    const pathD = isMobile ? pathDMobile : pathDDesktop;
    const viewBox = isMobile ? "0 0 1000 700" : "0 0 1600 5200";
    const preserveAspectRatio = isMobile ? "none" : "xMidYMin slice";

    return (
        <motion.div style={{
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: '0',
            zIndex: 'inherit',
            pointerEvents: 'none',
            translateX: xOffset,
            translateY: yOffset,
            scale: isMobile ? 1.5 : 1.1,
        }}>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox={viewBox}
                preserveAspectRatio={preserveAspectRatio}
                style={{
                    position: 'absolute',
                    top: isMobile ? '0px' : '50px',
                    left: '0',
                    display: 'block',
                }}
            >
                <defs>
                    <linearGradient id={`waveBackGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <animate attributeName="y1" values="0%;-100%" dur="16s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="100%;0%" dur="16s" repeatCount="indefinite" />
                        <stop offset="0%" style={{ stopColor: activeColors.back[0], stopOpacity: 1 }}></stop>
                        <stop offset="35%" style={{ stopColor: activeColors.back[1], stopOpacity: 1 }}></stop>
                        <stop offset="70%" style={{ stopColor: activeColors.back[2], stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: activeColors.back[0], stopOpacity: 1 }}></stop>
                    </linearGradient>
                    <linearGradient id={`waveMidGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <animate attributeName="y1" values="0%;-100%" dur="20s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="100%;0%" dur="20s" repeatCount="indefinite" />
                        <stop offset="0%" style={{ stopColor: activeColors.mid[0], stopOpacity: 1 }}></stop>
                        <stop offset="35%" style={{ stopColor: activeColors.mid[1], stopOpacity: 1 }}></stop>
                        <stop offset="70%" style={{ stopColor: activeColors.mid[2], stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: activeColors.mid[0], stopOpacity: 1 }}></stop>
                    </linearGradient>
                    <linearGradient id={`waveFrontGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <animate attributeName="y1" values="0%;-100%" dur="24s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="100%;0%" dur="24s" repeatCount="indefinite" />
                        <stop offset="0%" style={{ stopColor: activeColors.front[0], stopOpacity: 1 }}></stop>
                        <stop offset="35%" style={{ stopColor: activeColors.front[1], stopOpacity: 1 }}></stop>
                        <stop offset="70%" style={{ stopColor: activeColors.front[2], stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: activeColors.front[0], stopOpacity: 1 }}></stop>
                    </linearGradient>
                    <path id={`waveShape-${id}`} d={pathD} />
                    {variant === 'black' && (
                        <mask id={`fadeMask-${id}`}>
                            <rect x="0" y="0" width="100%" height="100%" fill={`url(#maskGradient-${id})`} />
                            <linearGradient id={`maskGradient-${id}`} x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" stopColor="white" stopOpacity="1" />
                                <stop offset="60%" stopColor="white" stopOpacity="1" />
                                <stop offset="85%" stopColor="white" stopOpacity="0.5" />
                                <stop offset="100%" stopColor="white" stopOpacity="0" />
                            </linearGradient>
                        </mask>
                    )}
                </defs>
                <g mask={variant === 'black' ? `url(#fadeMask-${id})` : undefined}>
                    <use 
                        xlinkHref={`#waveShape-${id}`} 
                        fill={`url(#waveBackGradient-${id})`} 
                        opacity={variant === 'black' ? ".6" : ".24"}
                        style={{
                            animation: isMobile ? 'none' : 'waveFloat1 12s ease-in-out infinite'
                        }}
                    >
                        {isMobile && (
                            <animateMotion dur="10s" repeatCount="indefinite">
                                <mpath xlinkHref={`#wave-path-${id}`} />
                            </animateMotion>
                        )}
                    </use>
                    <use 
                        xlinkHref={`#waveShape-${id}`} 
                        fill={`url(#waveMidGradient-${id})`} 
                        opacity={variant === 'black' ? ".8" : ".42"}
                        style={{
                            animation: isMobile ? 'none' : 'waveFloat2 10s ease-in-out infinite'
                        }}
                    >
                        {isMobile && (
                            <animateMotion dur="6s" repeatCount="indefinite">
                                <mpath xlinkHref={`#wave-path-${id}`} />
                            </animateMotion>
                        )}
                    </use>
                    <use 
                        xlinkHref={`#waveShape-${id}`} 
                        fill={`url(#waveFrontGradient-${id})`} 
                        opacity={variant === 'black' ? ".95" : ".58"}
                        style={{
                            animation: isMobile ? 'none' : 'waveFloat3 8s ease-in-out infinite'
                        }}
                    >
                        {isMobile && (
                            <animateMotion dur="14s" repeatCount="indefinite">
                                <mpath xlinkHref={`#wave-path-${id}`} />
                            </animateMotion>
                        )}
                    </use>
                </g>
                <path id={`wave-path-${id}`} d="M -600 0 0 0" style={{ display: 'none' }} />
                <style>{`
                    @keyframes waveFloat1 {
                        0%, 100% { transform: translate(270px, 25px); }
                        50% { transform: translate(-334px, 15px); }
                    }
                    @keyframes waveFloat2 {
                        0%, 100% { transform: translate(-270px, 25px); }
                        60% { transform: translate(243px, 15px); }
                    }
                    @keyframes waveFloat3 {
                        0%, 100% { transform: translate(0px, 25px); }
                        40% { transform: translate(-140px, 15px); }
                    }
                `}</style>
            </svg>
        </motion.div>
    );
}
