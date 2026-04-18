"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { playOmSound } from '@/utils/audio';
import styles from './BlueprintReport.module.css';
import { UserState } from '@/lib/spiritual-conversation-engine';

interface BlueprintReportProps {
    userState: UserState;
    onClose?: () => void;
}

export default function BlueprintReport({ userState, onClose }: BlueprintReportProps) {
    const [timeLeft, setTimeLeft] = useState(14 * 60 + 32);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handlePurchase = () => {
        playOmSound();
        // Here we could redirect to a payment success or checkout page
        window.open('https://buy.stripe.com/example', '_blank');
    };

    const mbti = userState.confirmedMBTI || "INFP";
    const pattern = userState.detectedPattern?.replace('_', ' ').toUpperCase() || "UNCONSCIOUS LOOP";
    const lifeStage = userState.lifeStage || "The Awakening (25-34)";
    const report = userState.report;

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    return (
        <div className={styles.container}>
            <div className={styles.contentWrapper}>
                
                {/* PAGE 4: THE MIRROR */}
                <section className={styles.mirrorSection}>
                    <h1 className={styles.headline}>
                        {report?.headlineText || "Here's what's actually happening beneath the surface."}
                    </h1>
                    
                    <motion.div 
                        className={styles.blueprintCard}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.blueprintGrid}>
                            <div className={styles.blueprintLabel}>Architecture:</div>
                            <div className={styles.blueprintValue}>{mbti}</div>
                            
                            <div className={styles.blueprintLabel}>Life Stage:</div>
                            <div className={styles.blueprintValue}>{lifeStage}</div>
                            
                            <div className={styles.blueprintLabel}>Core Pattern:</div>
                            <div className={styles.blueprintValue} style={{ color: '#ff00ea' }}>{pattern}</div>
                            
                            <div className={styles.blueprintLabel}>Root Cause:</div>
                            <div className={styles.blueprintValue}>{report?.rootCause || "A pattern installed before conscious choice was possible."}</div>
                            
                            <div className={styles.blueprintLabel}>Urgency Level:</div>
                            <div className={styles.blueprintValue} style={{ color: '#ff0000' }}>
                                {report?.urgencyPercent ? `${report.urgencyPercent}%` : "High"}
                            </div>
                        </div>
                    </motion.div>

                    <div style={{ marginTop: '20px' }}>
                        <p className={styles.paragraph}>
                            <span className={styles.highlight}>You are not the problem. You never were.</span><br/><br/>
                            {report?.validationParagraph || "What you've been calling your weakness is actually an unmet depth — a capacity for connection so profound that when it has nowhere to go, it turns inward."}
                        </p>
                        
                        <p className={styles.paragraph}>
                            {report?.realCauseParagraph || "Here's what nobody told you — this pattern wasn't created by you. It was installed before you had the cognitive capacity to reject it. Your mind made a decision to survive your environment. That decision became automatic."}
                        </p>

                        <div className={styles.damagingAdmission}>
                            <strong>We have to tell you something most platforms won't say:</strong><br/><br/>
                            No single product dissolves a pattern that took years to form. Not even ours.<br/><br/>
                            What does dissolve it: Understanding the exact pattern. Having the precise tool built for that specific architecture. 21 days of consistent application.<br/><br/>
                            We can give you the first two instantly. The third is yours.
                        </div>
                    </div>
                </section>

                {/* PAGE 5: THE SOLUTION */}
                <section>
                    <h2 className={styles.sectionTitle}>How this actually dissolves</h2>
                    <p className={styles.paragraph} style={{ textAlign: 'center' }}>
                        How to achieve pattern freedom without years of therapy in 21 days of guided AI practice.
                    </p>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '40px' }}>
                        <div>
                            <h3 style={{ color: '#00e5ff', fontFamily: 'Orbitron', marginBottom: '10px' }}>PHASE 1 — DAYS 1-7: AWARENESS</h3>
                            <p className={styles.paragraph}>The pattern can't be dissolved while it's invisible. The first week you learn to see it — in real time, as it activates. This alone changes everything.</p>
                        </div>
                        <div>
                            <h3 style={{ color: '#00e5ff', fontFamily: 'Orbitron', marginBottom: '10px' }}>PHASE 2 — DAYS 8-14: INTERRUPTION</h3>
                            <p className={styles.paragraph}>Once visible, the pattern can be interrupted. Not through willpower — through a 3-second technique that creates space between trigger and reaction.</p>
                        </div>
                        <div>
                            <h3 style={{ color: '#00e5ff', fontFamily: 'Orbitron', marginBottom: '10px' }}>PHASE 3 — DAYS 15-21: REWIRING</h3>
                            <p className={styles.paragraph}>The interruption creates a gap. The new pattern fills it. Not a generic replacement — a response specifically chosen for your {mbti} architecture.</p>
                        </div>
                    </div>
                </section>

                {/* PAGE 6: THE PRODUCT */}
                <section>
                    <h2 className={styles.sectionTitle}>Your Pattern Dissolution Kit</h2>

                    <div className={styles.productCard}>
                        <div className={styles.productHeader}>
                            <h3 className={styles.productName}>The Dissolution System</h3>
                            <span className={styles.productFormat}>Ebook + Audio</span>
                        </div>
                        <p className={styles.paragraph}>A narrative journey through your exact pattern — in the voice and pace your mind actually absorbs.</p>
                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}><span className={styles.featureIcon}>✓</span> Your pattern fully mapped and explained</li>
                            <li className={styles.featureItem}><span className={styles.featureIcon}>✓</span> The 3 trigger points specific to your architecture</li>
                            <li className={styles.featureItem}><span className={styles.featureIcon}>✓</span> The 21-day rewiring protocol</li>
                        </ul>
                        <div className={styles.priceDisplay}>
                            <span className={styles.oldPrice}>$67</span>
                            <span className={styles.newPrice}>$47</span>
                        </div>
                    </div>

                    <div className={styles.productCard}>
                        <div className={styles.productHeader}>
                            <h3 className={styles.productName}>Consciousness AI Guide</h3>
                            <span className={styles.productFormat}>AI Chatbot</span>
                        </div>
                        <p className={styles.paragraph}>Available at 3am when the pattern is loudest. Knows your MBTI. Knows your pattern. Has read your ebook. Answers questions from it.</p>
                        <ul className={styles.featureList}>
                            <li className={styles.featureItem}><span className={styles.featureIcon}>✓</span> Unlimited conversations</li>
                            <li className={styles.featureItem}><span className={styles.featureIcon}>✓</span> Real-time pattern coaching</li>
                        </ul>
                        <div className={styles.priceDisplay}>
                            <span className={styles.oldPrice}>$57</span>
                            <span className={styles.newPrice}>$37</span>
                        </div>
                    </div>
                </section>

                {/* PAGE 7: THE OFFER */}
                <section>
                    <div className={styles.bundleBox}>
                        <h2 className={styles.sectionTitle} style={{ border: 'none', marginBottom: '20px' }}>Everything in your kit today</h2>
                        
                        <ul className={styles.featureList} style={{ textAlign: 'left', maxWidth: '400px', margin: '0 auto' }}>
                            <li className={styles.featureItem}>✓ Dissolution Ebook ($47 value)</li>
                            <li className={styles.featureItem}>✓ Full Audiobook narration ($27 value)</li>
                            <li className={styles.featureItem}>✓ 21-Day Pattern Tracker App ($27 value)</li>
                            <li className={styles.featureItem}>✓ Consciousness AI Guide ($37 value)</li>
                            <li className={styles.featureItem} style={{ color: '#00e5ff', marginTop: '10px' }}>+ 3 Secret {mbti} Bonuses ($61 value)</li>
                        </ul>

                        <div className={styles.bundleTotal}>
                            <div style={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'line-through', fontSize: '1rem' }}>Total Value: $172</div>
                            <div className={styles.newPrice} style={{ fontSize: '3rem', margin: '10px 0' }}>$67</div>
                            <div style={{ color: '#00e5ff', fontSize: '0.9rem', letterSpacing: '1px' }}>⏱ Your session: {formatTime(timeLeft)}</div>
                        </div>

                        <button className={styles.ctaButton} onClick={handlePurchase}>
                            Yes — Begin My Return →
                        </button>
                        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)', marginTop: '15px' }}>
                            🔒 Secure · ⚡ Instant · 💳 All cards + UPI
                        </div>
                    </div>

                    <div className={styles.guaranteeBox}>
                        <h3 style={{ fontFamily: 'Orbitron', color: '#ff00ea', marginBottom: '15px' }}>THE SPIRITUAL AI PROMISE</h3>
                        <p className={styles.paragraph} style={{ fontSize: '1rem', marginBottom: 0 }}>
                            If after 21 days of genuine practice you haven't noticed a single shift — not a transformation, just one moment of clarity you didn't have before — we return every rupee. No questions. No forms. One message. Done.
                        </p>
                    </div>
                </section>

                {/* PAGE 8: URGENCY + OPTIONS */}
                <section style={{ textAlign: 'center', paddingBottom: '100px' }}>
                    <h2 style={{ fontFamily: 'Orbitron', fontSize: '2rem', marginBottom: '20px' }}>Still here?</h2>
                    <p className={styles.paragraph}>
                        The pattern you came here to dissolve — it shows up as hesitation at moments exactly like this. Not because the decision is wrong. Because the pattern's job is to keep things the same. Notice that. That noticing? That's already the beginning of the break.
                    </p>

                    <div className={styles.optionsGrid}>
                        <button className={styles.ctaButton} onClick={handlePurchase} style={{ padding: '16px' }}>
                            Complete Dissolution Kit — $67
                        </button>
                        
                        <button className={styles.secondaryCta} onClick={handlePurchase}>
                            Start Simple (Ebook + Audio only) — $47
                        </button>

                        <button className={styles.tertiaryCta} onClick={onClose}>
                            Not ready? Stay in the conversation →
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
