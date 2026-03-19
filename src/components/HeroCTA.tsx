"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { playOmSound } from '../utils/audio';
import styles from './HeroCTA.module.css';

export default function HeroCTA() {
    const [showHint, setShowHint] = useState(true);
    const [ctaText, setCtaText] = useState("Upgrade Your Consciousness");
    const [isGlitching, setIsGlitching] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setShowHint(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Text alternating logic
        const interval = setInterval(() => {
            setIsGlitching(true);
            setTimeout(() => {
                setCtaText(prev =>
                    prev === "Upgrade Your Consciousness"
                        ? "Start 60 second quiz"
                        : "Upgrade Your Consciousness"
                );
                // Keep glitching for a bit after text change for effect
                setTimeout(() => setIsGlitching(false), 300);
            }, 100); // Trigger text change quickly after glitch start
        }, 3000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearInterval(interval);
        };
    }, []);

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        playOmSound();
        
        const targetPosition = window.innerHeight;
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        const duration = 2500; // 2.5 seconds for a cinematic feel
        let start: number | null = null;

        const animation = (currentTime: number) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        // Cubic easing function
        const ease = (t: number, b: number, c: number, d: number) => {
            t /= d / 2;
            if (t < 1) return c / 2 * t * t * t + b;
            t -= 2;
            return c / 2 * (t * t * t + 2) + b;
        };

        requestAnimationFrame(animation);
    };

    return (
        <>
            <div className={styles.mbtiContainer}>
                <div className={styles.buttonGroup}>
                    {/* Primary CTA - Discovery Quiz */}
                    <div
                        className={styles.gradientFlowBtn}
                        style={{ cursor: 'pointer' }}
                        data-cursor-target="true"
                        onClick={handleClick}
                    >
                        <span className={isGlitching ? styles.glitch : ''} data-text={ctaText}>
                            {ctaText}
                        </span>
                        <span className={styles.ctaArrow}>→</span>
                    </div>
                    <span className={styles.freeSubtext}>Free. No login required.</span>
                </div>

                {/* Scroll Hint */}
                <div className={`${styles.scrollHintContainer} ${!showHint ? styles.hidden : ''}`}>
                    <div className={styles.mouse}>
                        <div className={styles.wheel}></div>
                    </div>
                    <span className={styles.scrollText}>Scroll down to know more</span>
                </div>
            </div>
        </>
    );
}
