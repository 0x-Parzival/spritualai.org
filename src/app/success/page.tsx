"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../blueprint/blueprint.module.css';

export default function SuccessPage() {
    const [mbti, setMbti] = useState("INFP");

    useEffect(() => {
        const savedState = localStorage.getItem('spiritualAiState');
        if (savedState) {
            try {
                const state = JSON.parse(savedState);
                if (state.confirmed_mbti) setMbti(state.confirmed_mbti);
            } catch (e) {
                console.error("Failed to parse state", e);
            }
        }
    }, []);

    const shareUrl = `https://twitter.com/intent/tweet?text=I'm%20an%20${mbti}%20%E2%80%94%20just%20decoded%20my%20subconscious%20pattern%20on%20SpiritualAI.store`;

    return (
        <div className={styles.container}>
            <div className={styles.cosmicBackground}></div>

            <div className={styles.contentWrapper} style={{ gap: '60px', textAlign: 'center', maxWidth: '600px' }}>
                
                <section>
                    <h1 className={styles.headline} style={{ color: '#00e5ff' }}>Your pattern just met its match.</h1>
                    <p className={styles.paragraph} style={{ marginTop: '20px' }}>
                        Everything is in your inbox.<br/>
                        Check it now — the first insight usually lands within 60 seconds of opening the ebook.
                    </p>
                </section>

                <div className={styles.blueprintCard}>
                    <h2 style={{ fontFamily: 'Orbitron', marginBottom: '20px', color: '#ff00ea' }}>WHAT TO DO FIRST</h2>
                    <p className={styles.paragraph} style={{ marginBottom: 0 }}>
                        {mbti === 'INFP' || mbti === 'INFJ' || mbti === 'ENFP' || mbti === 'ENFJ' 
                            ? "Start with the audiobook. Chapter 2 is where most people first say 'that's exactly me.'" 
                            : "Start with the framework map on page 3 of the ebook. The full system becomes clear from there."}
                    </p>
                </div>

                <section>
                    <h2 className={styles.sectionTitle}>The Society Invitation</h2>
                    <p className={styles.paragraph}>
                        You just did something most people never do. You looked directly at your pattern without running.<br/><br/>
                        There's a community of people who did exactly this. They don't talk about spirituality. They practice it together — AI-guided, accountable to each other, moving through the same 21-day dissolution.<br/><br/>
                        Someone there broke your exact pattern 6 months ago. They're waiting to show you the shortcut.
                    </p>
                    <button className={styles.ctaButton} style={{ marginTop: '20px' }}>
                        Join The Society (7 Days Free) →
                    </button>
                </section>

                <section style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                    <p className={styles.paragraph}>
                        Your blueprint is rare. 1 in 16 people share your exact architecture. Share your type and find your people:
                    </p>
                    <button 
                        className={styles.secondaryCta} 
                        onClick={() => window.open(shareUrl, '_blank')}
                    >
                        Share on X (Twitter)
                    </button>
                </section>

                <footer style={{ marginTop: '40px', opacity: 0.5 }}>
                    <p>Welcome to the other side of your old pattern.<br/>The Spiritual AI Guide is already learning your specific triggers.<br/>Day 1 starts now.</p>
                </footer>
            </div>
        </div>
    );
}
