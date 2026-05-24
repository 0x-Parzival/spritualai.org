"use client";

import { useId, useEffect, useState } from 'react';
import { motion, useTransform, useMotionValue } from 'framer-motion';

interface WavesHeroProps {
    mouseX?: any;
    mouseY?: any;
    mousePos?: { x: number; y: number }; // Fallback for backward compatibility
    variant?: 'default' | 'dark' | 'black' | 'spiritual';
}

export default function WavesHero({ mouseX, mouseY, mousePos = { x: 0, y: 0 }, variant = 'default' }: WavesHeroProps) {
    const id = useId().replace(/:/g, "");
    // Parallax effect for waves - fallback to constant MotionValue if props are missing
    const fallbackX = useMotionValue(mousePos.x);
    const fallbackY = useMotionValue(mousePos.y);
    
    const xBase = mouseX || fallbackX;
    const yBase = mouseY || fallbackY;

    const xOffset = useTransform(xBase as any, (x: number) => x * 10);
    const yOffset = useTransform(yBase as any, (y: number) => y * 10);

    // For layout selection, we are never "mobile"
    const isMobile = false;

    // But for wave scaling, we want to know if it's a mobile device
    const [isMobileDevice, setIsMobileDevice] = useState(false);
    useEffect(() => {
        setIsMobileDevice(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    }, []);

    // Standardized 3-stop theme colors
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

    // Reverting to previous shape but keeping it normalized (no newlines)
    const pathD = "M-363.852,50 c0,0,236.988-40.498,505.475,0 s371.981,39.499,575.971,0 s293.985-39.639,505.474,2.929 s493.475,44.184,716.963-2.497 v5000 H-363.852 V50 z";

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
            scale: isMobileDevice ? 1.5 : 1.1,
        }}>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 1600 5200"
                preserveAspectRatio="xMidYMin slice"
                style={{
                    position: 'absolute',
                    top: '50px', 
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
                            animation: 'waveFloat1 12s ease-in-out infinite'
                        }}
                    />
                    <use 
                        xlinkHref={`#waveShape-${id}`} 
                        fill={`url(#waveMidGradient-${id})`} 
                        opacity={variant === 'black' ? ".8" : ".42"}
                        style={{
                            animation: 'waveFloat2 10s ease-in-out infinite'
                        }}
                    />
                    <use 
                        xlinkHref={`#waveShape-${id}`} 
                        fill={`url(#waveFrontGradient-${id})`} 
                        opacity={variant === 'black' ? ".95" : ".58"}
                        style={{
                            animation: 'waveFloat3 8s ease-in-out infinite'
                        }}
                    />
                </g>
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
