"use client";

import { motion, useTransform } from 'framer-motion';

interface WavesHeroProps {
    mouseX?: any;
    mouseY?: any;
    mousePos?: { x: number; y: number }; // Fallback for backward compatibility
}

export default function WavesHero({ mouseX, mouseY, mousePos = { x: 0, y: 0 } }: WavesHeroProps) {
    // Parallax effect for waves
    // Move slightly based on mouse position
    const xBase = mouseX ? mouseX : { get: () => mousePos.x, set: () => { } };
    const yBase = mouseY ? mouseY : { get: () => mousePos.y, set: () => { } };

    const xOffset = useTransform(xBase as any, (x: number) => x * 10);
    const yOffset = useTransform(yBase as any, (y: number) => y * 10);

    return (
        <motion.div style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            zIndex: 1,
            pointerEvents: 'none',
            translateX: xOffset,
            translateY: useTransform(yOffset, (y: number) => y + 96),
            scale: 1.2,
        }}>
            <svg
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                width="100%"
                height="100%"
                viewBox="0 0 1600 3000"
                preserveAspectRatio="xMidYMin slice"
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: 'block',
                }}
            >
                <defs>
                    <linearGradient id="waveBackGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ff3cf5', stopOpacity: 1 }}></stop>
                        <stop offset="20%" style={{ stopColor: '#b8ff5a', stopOpacity: 1 }}></stop>
                        <stop offset="50%" style={{ stopColor: '#240046', stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: '#1a1a2e', stopOpacity: 0 }}></stop>
                    </linearGradient>
                    <linearGradient id="waveMidGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#35f8ff', stopOpacity: 1 }}></stop>
                        <stop offset="20%" style={{ stopColor: '#ff3cf5', stopOpacity: 1 }}></stop>
                        <stop offset="50%" style={{ stopColor: '#240046', stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: '#1a1a2e', stopOpacity: 0 }}></stop>
                    </linearGradient>
                    <linearGradient id="waveFrontGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style={{ stopColor: '#ffffff', stopOpacity: 1 }}></stop>
                        <stop offset="15%" style={{ stopColor: '#35f8ff', stopOpacity: 1 }}></stop>
                        <stop offset="30%" style={{ stopColor: '#ff3cf5', stopOpacity: 1 }}></stop>
                        <stop offset="45%" style={{ stopColor: '#b8ff5a', stopOpacity: 1 }}></stop>
                        <stop offset="100%" style={{ stopColor: '#240046', stopOpacity: 0 }}></stop>
                    </linearGradient>
                    <path
                        id="waveBack"
                        fill="url(#waveBackGradient)"
                        d="M-363.852,458c0,0,236.988-41.997,505.475,0
        s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v2542H-363.852V458z"
                    />
                    <path
                        id="waveMid"
                        fill="url(#waveMidGradient)"
                        d="M-363.852,458c0,0,236.988-41.997,505.475,0
        s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v2542H-363.852V458z"
                    />
                    <path
                        id="waveFront"
                        fill="url(#waveFrontGradient)"
                        d="M-363.852,458c0,0,236.988-41.997,505.475,0
        s371.981,38.998,575.971,0s293.985-39.278,505.474,5.859s493.475,48.368,716.963-4.995v2542H-363.852V458z"
                    />
                </defs>
                <g>
                    <use xlinkHref="#waveBack" opacity=".24">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="10s"
                            calcMode="spline"
                            values="270 230; -334 180; 270 230"
                            keyTimes="0; .5; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref="#waveMid" opacity=".42">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="8s"
                            calcMode="spline"
                            values="-270 230;243 220;-270 230"
                            keyTimes="0; .6; 1"
                            keySplines="0.42, 0, 0.58, 1.0;0.42, 0, 0.58, 1.0"
                            repeatCount="indefinite"
                        />
                    </use>
                    <use xlinkHref="#waveFront" opacity=".58">
                        <animateTransform
                            attributeName="transform"
                            attributeType="XML"
                            type="translate"
                            dur="6s"
                            calcMode="spline"
                            values="0 230;-140 200;0 230"
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
