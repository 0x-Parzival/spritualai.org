"use client";

import { motion, useTransform } from 'framer-motion';

interface WavesHeroProps {
    mouseX?: any;
    mouseY?: any;
    mousePos?: { x: number; y: number }; // Fallback for backward compatibility
    variant?: 'default' | 'dark' | 'black' | 'spiritual';
}

export default function WavesHero({ mouseX, mouseY, mousePos = { x: 0, y: 0 }, variant = 'default' }: WavesHeroProps) {
    // Parallax effect for waves
    const xBase = mouseX ? mouseX : { get: () => mousePos.x, set: () => { } };
    const yBase = mouseY ? mouseY : { get: () => mousePos.y, set: () => { } };

    const xOffset = useTransform(xBase as any, (x: number) => x * 10);
    const yOffset = useTransform(yBase as any, (y: number) => y * 10);
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 640;

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
            back: ['rgba(0, 0, 0, 0.95)', 'rgba(20, 20, 20, 0.9)', 'rgba(40, 40, 40, 0.85)'],
            mid: ['rgba(10, 10, 10, 0.95)', 'rgba(30, 30, 30, 0.9)', 'rgba(50, 50, 50, 0.85)'],
            front: ['rgba(20, 20, 20, 0.95)', 'rgba(40, 40, 40, 0.9)', 'rgba(60, 60, 60, 0.85)'],
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
            left: 0,
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
                viewBox="0 0 1600 5200"
                preserveAspectRatio="xMidYMin slice"
                style={{
                    position: 'absolute',
                    top: '50px', 
                    left: 0,
                    display: 'block',
                }}
            >
                <defs>
                    <linearGradient id={`waveBackGradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <animate attributeName="y1" values="0%;-100%" dur="16s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="100%;0%" dur="16s" repeatCount="indefinite" />
                        <stop offset="0%" style={{ stopColor: activeColors.back[0], stopOpacity: 1 }}></stop>
                        <stop offset="35%" style={{ stopColor: activeColors.back[1], stopOpacity: 1 }}></stop>
                        <stop offset="70%" style={{ stopColor: activeColors.back[2], stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: activeColors.back[0], stopOpacity: 1 }}></stop>
                    </linearGradient>
                    <linearGradient id={`waveMidGradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <animate attributeName="y1" values="0%;-100%" dur="20s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="100%;0%" dur="20s" repeatCount="indefinite" />
                        <stop offset="0%" style={{ stopColor: activeColors.mid[0], stopOpacity: 1 }}></stop>
                        <stop offset="35%" style={{ stopColor: activeColors.mid[1], stopOpacity: 1 }}></stop>
                        <stop offset="70%" style={{ stopColor: activeColors.mid[2], stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: activeColors.mid[0], stopOpacity: 1 }}></stop>
                    </linearGradient>
                    <linearGradient id={`waveFrontGradient-${variant}`} x1="0%" y1="0%" x2="0%" y2="100%">
                        <animate attributeName="y1" values="0%;-100%" dur="24s" repeatCount="indefinite" />
                        <animate attributeName="y2" values="100%;0%" dur="24s" repeatCount="indefinite" />
                        <stop offset="0%" style={{ stopColor: activeColors.front[0], stopOpacity: 1 }}></stop>
                        <stop offset="35%" style={{ stopColor: activeColors.front[1], stopOpacity: 1 }}></stop>
                        <stop offset="70%" style={{ stopColor: activeColors.front[2], stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: activeColors.front[0], stopOpacity: 1 }}></stop>
                    </linearGradient>
                    <path id={`waveShape-${variant}`} d={pathD} />
                </defs>
                <g>
                    <use xlinkHref={`#waveShape-${variant}`} fill={`url(#waveBackGradient-${variant})`} opacity=".24">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="12s"
                            calcMode="spline"
                            values="270 25; -334 15; 270 25"
                            keyTimes="0; .5; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref={`#waveShape-${variant}`} fill={`url(#waveMidGradient-${variant})`} opacity=".42">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="10s"
                            calcMode="spline"
                            values="-270 25;243 15;-270 25"
                            keyTimes="0; .6; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref={`#waveShape-${variant}`} fill={`url(#waveFrontGradient-${variant})`} opacity=".58">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="8s"
                            calcMode="spline"
                            values="0 25;-140 15;0 25"
                            keyTimes="0; .4; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                </g>
            </svg>
        </motion.div>
    );
}
