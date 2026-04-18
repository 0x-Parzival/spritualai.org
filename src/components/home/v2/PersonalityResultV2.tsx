"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';

interface ResultProps {
    personality: string;
    onChatClick: () => void;
}

export default function PersonalityResultV2({ personality, onChatClick }: ResultProps) {
    const [htmlContent, setHtmlContent] = useState<string>("");

    useEffect(() => {
        const fetchContent = async () => {
            try {
                const response = await fetch(`/MBTI/personality/${personality.toLowerCase()}.html`);
                const text = await response.text();
                // Extract main content from html
                const parser = new DOMParser();
                const doc = parser.parseFromString(text, 'text/html');
                const mainContent = doc.querySelector('.container') || doc.body;
                setHtmlContent(mainContent.innerHTML);
            } catch (e) {
                console.error("Failed to load personality content", e);
            }
        };
        if (personality) fetchContent();
    }, [personality]);

    return (
        <section className={styles.section} style={{ height: '100vh', scrollSnapAlign: 'start', overflow: 'hidden', padding: '40px' }}>
            <div style={{ display: 'flex', width: '100%', height: '100%', gap: '40px' }}>
                {/* Left side: Analysis */}
                <div style={{ flex: 3, overflowY: 'auto', paddingRight: '20px', background: 'rgba(0,0,0,0.3)', borderRadius: '20px', border: '1px solid rgba(255,255,255,0.1)', padding: '30px' }}>
                    <h2 style={{ fontFamily: 'Orbitron', fontSize: '3rem', color: '#00f2ff', marginBottom: '20px' }}>{personality}</h2>
                    <div className="personality-html-content" dangerouslySetInnerHTML={{ __html: htmlContent }} style={{ color: '#fff', fontSize: '1.1rem', lineHeight: '1.6' }} />
                </div>

                {/* Right side: Action Buttons */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
                    <button className={styles.gradientFlowBtn} style={{ width: '100%' }}>Download Full Guide</button>
                    <button className={styles.gradientFlowBtn} style={{ width: '100%', borderColor: '#ff3cf5' }}>Get Premium Toolkit</button>
                    <button className={styles.gradientFlowBtn} style={{ width: '100%', borderColor: '#35f8ff' }}>Join Community</button>
                </div>
            </div>

            {/* Bottom Chat Box Entry */}
            <motion.div 
                onClick={onChatClick}
                whileHover={{ scale: 1.02 }}
                style={{ 
                    position: 'absolute', 
                    bottom: '40px', 
                    left: '50%', 
                    transform: 'translateX(-50%)',
                    width: '80%',
                    height: '100px',
                    background: 'rgba(53, 248, 255, 0.1)',
                    border: '1px solid #35f8ff',
                    borderRadius: '15px',
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0 30px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(10px)'
                }}
            >
                <p style={{ fontFamily: 'Inter', color: '#35f8ff', fontSize: '1.2rem', fontWeight: 600 }}>
                    Click here to chat with your {personality} AI Guide and find your ideal products...
                </p>
            </motion.div>
        </section>
    );
}
