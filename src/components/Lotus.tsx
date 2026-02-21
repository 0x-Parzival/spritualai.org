"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Lotus.module.css';

export default function Lotus({ forceClose }: { forceClose?: boolean }) {
    const [closed, setClosed] = useState(false);
    const [isBursting, setIsBursting] = useState(false);
    const [isBubbleVisible, setIsBubbleVisible] = useState(true);
    const router = useRouter();

    React.useEffect(() => {
        if (typeof forceClose === 'boolean') {
            setClosed(forceClose);
        }
    }, [forceClose]);

    React.useEffect(() => {
        const handleGlobalClick = () => {
            if (isBubbleVisible && !isBursting) {
                setIsBursting(true);
                // Animation duration should match CSS
                setTimeout(() => {
                    setIsBubbleVisible(false);
                    setIsBursting(false);
                }, 500);
            }
        };

        if (isBubbleVisible) {
            window.addEventListener('click', handleGlobalClick);
        }
        return () => window.removeEventListener('click', handleGlobalClick);
    }, [isBubbleVisible, isBursting]);

    const toggle = () => {
        router.push('/lotus-god');
        // if (typeof forceClose === 'boolean') return; // Controlled mode
        // setClosed(!closed);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
        }
    };

    const ringsConfig = [
        { cls: styles.r1, count: 12 },
        { cls: styles.r2, count: 10 },
        { cls: styles.r3, count: 9 },
    ];

    // CSS variables for neon colors defined here to apply to the SVG defs and component
    const cssVars = {
        '--bg1': '#070812',
        '--bg2': '#0b1022',
        '--neon1': '#ff3cf5',
        '--neon2': '#35f8ff',
        '--neon3': '#b8ff5a',
        '--speed': '1800ms',
    } as React.CSSProperties;

    return (
        <div style={cssVars} className={styles.stage}>
            {/* hidden gradient defs */}
            <svg width="0" height="0" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                <defs>
                    <radialGradient id="neonGrad" cx="50%" cy="10%" r="110%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                        <stop offset="35%" stopColor="var(--neon2)" stopOpacity="0.55" />
                        <stop offset="70%" stopColor="var(--neon1)" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="var(--neon3)" stopOpacity="0.25" />
                    </radialGradient>
                </defs>
            </svg>

            <div
                className={`${styles.lotusWrap} ${closed ? styles.closed : ''}`}
                id="lotus"
                tabIndex={0}
                role="button"
                aria-label="Toggle lotus bloom"
                onClick={toggle}
                onKeyDown={handleKeyDown}
            >
                <div className={styles.core}></div>
                <div className={styles.lotus} id="lotusRings">
                    {ringsConfig.map((ring, rIndex) => {
                        const step = 360 / ring.count;
                        return (
                            <ul key={rIndex} className={`${styles.ring} ${ring.cls}`}>
                                {Array.from({ length: ring.count }).map((_, i) => {
                                    const rz = (i + 1) * step;
                                    return (
                                        <li
                                            key={i}
                                            className={styles.petal}
                                            style={{ '--rz': `${rz}deg` } as React.CSSProperties}
                                        >
                                            <svg className={styles.petalSvg} viewBox="0 0 72 200" aria-hidden="true">
                                                <path
                                                    className={styles.petalPath}
                                                    d="M0,100 C0,66.6666667 12,33.3333333 36,0
                             C60,33.3333333 72,66.6666667 72,100
                             C72,133.333333 60,166.666667 36,200
                             C12,166.666667 0,133.333333 0,100 Z"
                                                ></path>
                                            </svg>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </div>
            </div>

            <div className={styles.stemContainer}>
                <svg className={styles.stemSvg} preserveAspectRatio="none" viewBox="0 0 200 1000">
                    <defs>
                        <filter id="stemWater" x="-50%" y="-10%" width="200%" height="120%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.1" numOctaves="2" result="noise">
                                <animate attributeName="seed" dur="10s" values="1; 100; 1" repeatCount="indefinite" />
                            </feTurbulence>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" />
                        </filter>
                    </defs>
                    {/* Programmatic-looking wavy path */}
                    <path
                        d="M 100,0 C 115,50 85,100 100,150 S 115,250 100,300 S 85,400 100,450 S 115,550 100,600 S 85,700 100,750 S 115,850 100,900 S 85,950 100,1000"
                        className={styles.stemLine}
                        filter="url(#stemWater)"
                        fill="none"
                    />
                </svg>
            </div>

            {isBubbleVisible && (
                <div className={`${styles.lotusSubtext} ${isBursting ? styles.bursting : styles.readyToBurst}`}>
                    <p>Tap on the lotus</p>
                    <p>To enter gently through a short guided ritual</p>
                    <p>Those who complete it receive a gift.</p>
                </div>
            )}
        </div>
    );
}
