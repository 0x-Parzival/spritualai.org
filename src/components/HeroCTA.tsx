"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './HeroCTA.module.css';

export default function HeroCTA() {
    const [showHint, setShowHint] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 10) {
                setShowHint(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div className={styles.mbtiContainer}>
                <div className={styles.buttonGroup}>
                    {/* Primary CTA - Discovery Quiz */}
                    <Link
                        href="/discover"
                        className={styles.gradientFlowBtn}
                        data-cursor-target="true"
                    >
                        Upgrade Your Consciousness -&gt;
                    </Link>
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
