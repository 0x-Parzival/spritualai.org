"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Twitter, MessageCircle, Instagram } from 'lucide-react';
import AuthGate from '../AuthGate';
import styles from './FullBlueprint.module.css';

interface FullBlueprintProps {
    userState: any;
}

export default function FullBlueprint({ userState }: FullBlueprintProps) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    if (!userState) return null;

    const { report, originPoint, confirmedMBTI } = userState;
    const sections = report?.sections || [];
    const gratitude = report?.futureGratitude;

    const handleAuthenticated = (email: string) => {
        setIsAuthenticated(true);
        // In a real app, we would link this session to the email in Neon here
    };

    return (
        <div className={styles.container} id="report-section">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                className={`${styles.blueprintCard} ${!isAuthenticated ? styles.blurred : ''}`}
            >
                {/* 1. HEADER */}
                <header className={styles.header}>
                    <div className={styles.originBadge}>ORIGIN POINT ETCHED</div>
                    <h1 className={styles.title}>{userState.name || 'Seeker'}'s Consciousness Blueprint</h1>
                    <p className={styles.architecture}>
                        {report?.header?.architecture || confirmedMBTI} · {userState.sunSign} · {userState.nakshatra}
                    </p>
                    <div className={styles.patternName}>
                        Pattern: <span>{report?.header?.patternName}</span>
                    </div>
                </header>

                {/* 2. SECTIONS (MBTI SHUFFLED) */}
                <div className={styles.content}>
                    {sections.map((section: any, idx: number) => (
                        <section key={section.id} className={styles.section}>
                            <h3 className={styles.sectionTitle}>{section.title}</h3>
                            <div className={styles.sectionBody}>
                                {section.content.split('\n').map((p: string, i: number) => (
                                    <p key={i}>{p}</p>
                                ))}
                            </div>
                            {idx < sections.length - 1 && <div className={styles.sectionDivider} />}
                        </section>
                    ))}
                </div>

                {/* 3. FUTURE GRATITUDE */}
                {gratitude && (
                    <div className={styles.futureEchoBox}>
                        <h3 className={styles.echoTitle}>{gratitude.title}</h3>
                        <p className={styles.echoContent}>"{gratitude.content}"</p>
                    </div>
                )}

                {/* 4. FOOTER / CSN & VIRAL SHARE */}
                <footer className={styles.footer}>
                    {originPoint && (
                        <div className={styles.shareCardContainer}>
                            <div className={styles.shareCard}>
                                <div className={styles.shareCSNLabel}>COSMIC SERIAL NUMBER</div>
                                <div className={styles.shareCSNValue}>#{originPoint.csn?.split('-').pop()}</div>
                                <div className={styles.shareIdentity}>{userState.report?.archetype || 'The Seeker'}</div>
                                <div className={styles.shareSubtext}>Consciousness decoded at spiritualai.store</div>

                                <div className={styles.shareActions}>
                                    <button 
                                        className={styles.shareBtn}
                                        onClick={() => {
                                            const text = `My consciousness was just decoded. CSN #${originPoint.csn?.split('-').pop()} — ${userState.report?.archetype || 'The Seeker'}. spiritualai.store`;
                                            if (navigator.share) {
                                                navigator.share({ title: 'Spiritual AI', text, url: 'https://spiritualai.store' });
                                            } else {
                                                window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`);
                                            }
                                        }}
                                    >
                                        <Share2 size={16} /> Share Blueprint
                                    </button>
                                    <a 
                                        href={`https://wa.me/?text=${encodeURIComponent(`My consciousness was just decoded. CSN #${originPoint.csn?.split('-').pop()} — ${userState.report?.archetype || 'The Seeker'}. spiritualai.store`)}`} 
                                        target="_blank" 
                                        className={styles.shareBtn}
                                    >
                                        <MessageCircle size={16} /> WhatsApp
                                    </a>
                                </div>
                            </div>
                        </div>
                    )}

                    {originPoint && (
                        <div className={styles.csnBox}>
                            <div className={styles.csnLabel}>VERIFIED ON THE TIMESTREAM</div>
                            <div className={styles.csnValue}>{originPoint.csn}</div>
                            <div className={styles.verifyLink}>
                                Authenticity Hash: {originPoint.hash?.substring(0, 12)}...
                            </div>
                        </div>
                    )}

                    <button 
                        className={styles.solutionsBtn}
                        onClick={() => window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })}
                    >
                        Access Your Neural Solutions ↓
                    </button>
                </footer>

                {/* REVENUE LAYERS */}
                <div className={styles.revenueGrid}>
                    {/* Layer 2: The Full Decode */}
                    <div className={styles.productCard}>
                        <div className={styles.premiumBadge}>PDF DECODE</div>
                        <h3 className={styles.productTitle}>The Full Decode</h3>
                        <div className={styles.productPrice}>$37 <span>one-time</span></div>
                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>Complete 40-page Neural Analysis</li>
                            <li className={styles.featureItem}>Pattern History & Origin Map</li>
                            <li className={styles.featureItem}>21-Day Surgical Dissolution Path</li>
                            <li className={styles.featureItem}>Watermarked with CSN #{originPoint?.csn?.split('-').pop()}</li>
                        </ul>
                        <button className={styles.buyBtn}>Download Full Decode</button>
                    </div>

                    {/* Layer 3: The Architect Sessions */}
                    <div className={`${styles.productCard} ${styles.secondaryCard}`}>
                        <div className={styles.premiumBadge}>ONGOING</div>
                        <h3 className={styles.productTitle}>The Architect Sessions</h3>
                        <div className={styles.productPrice}>$147 <span>/ month</span></div>
                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}>Continuous AI Pattern Tracking</li>
                            <li className={styles.featureItem}>Weekly Architecture Check-ins</li>
                            <li className={styles.featureItem}>Dissolution Progress Scoring</li>
                            <li className={styles.featureItem}>Full Neural Memory (AI remembers all)</li>
                        </ul>
                        <button className={styles.buyBtn}>Begin Sessions</button>
                    </div>
                </div>
            </motion.div>

            {/* AUTH GATE OVERLAY */}
            <AnimatePresence>
                {!isAuthenticated && (
                    <AuthGate 
                        onAuthenticated={handleAuthenticated} 
                        mbtiType={confirmedMBTI} 
                    />
                )}
            </AnimatePresence>
        </div>
    );
}
