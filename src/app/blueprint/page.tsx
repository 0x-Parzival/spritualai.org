"use client";

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { playOmSound } from '../../utils/audio';
import styles from './blueprint.module.css';
import { useUser } from '@clerk/nextjs';

export default function BlueprintPage() {
    return (
        <Suspense fallback={<div className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>Synchronizing architecture...</div>}>
            <BlueprintContent />
        </Suspense>
    );
}

function BlueprintContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { isLoaded, isSignedIn, user: clerkUser } = useUser();
    
    const [userState, setUserState] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [timeLeft, setTimeLeft] = useState(14 * 60 + 32);

    useEffect(() => {
        const blueprintId = searchParams.get('id');

        const loadData = async () => {
            if (blueprintId && isLoaded) {
                try {
                    const res = await fetch(`/api/spiritual/fetch-report?id=${blueprintId}`);
                    const data = await res.json();
                    if (data.success) {
                        setUserState(data.data);
                        setLoading(false);
                        return;
                    }
                } catch (e) {
                    console.error("DB Fetch failed", e);
                }
            }

            // Fallback to local storage
            const savedState = localStorage.getItem('spiritualAiState');
            if (savedState) {
                try {
                    setUserState(JSON.parse(savedState));
                } catch (e) {
                    console.error("Failed to parse state", e);
                }
            }
            setLoading(false);
        };

        loadData();

        const timer = setInterval(() => {
            setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, [searchParams, isLoaded]);

    if (loading) {
        return <div className={styles.container} style={{ justifyContent: 'center', alignItems: 'center' }}>Synchronizing architecture...</div>;
    }

    const mbti = userState.confirmed_mbti || userState.confirmedMBTI || "INFP";
    const pattern = userState.pain_pattern || userState.detectedPattern || "The Unconscious Loop";
    const report = userState.report || {};
    const header = report.header || { architecture: "Seeker", patternName: pattern, urgencyPercent: 72 };

    const formatTime = (seconds: number) => {
        const m = Math.floor(seconds / 60);
        const s = seconds % 60;
        return `${m}:${s.toString().padStart(2, '0')}`;
    };

    const handlePurchase = () => {
        // Play sound and redirect to checkout/store
        playOmSound();
        router.push('/store');
    };

    return (
        <div className={styles.container}>
            <div className={styles.cosmicBackground}></div>

            <div className={styles.contentWrapper}>
                
                {/* PAGE 4: THE MIRROR (INTELLIGENCE SYNTHESIS) */}
                <section className={styles.mirrorSection}>
                    <h1 className={styles.headline}>Your Consciousness Blueprint</h1>
                    
                    <motion.div 
                        className={styles.blueprintCard}
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className={styles.blueprintGrid}>
                            <div className={styles.blueprintLabel}>Architecture:</div>
                            <div className={styles.blueprintValue}>{header.architecture || mbti}</div>
                            
                            <div className={styles.blueprintLabel}>Core Pattern:</div>
                            <div className={styles.blueprintValue} style={{ color: '#ff00ea' }}>{(header.patternName || pattern).toUpperCase()}</div>
                            
                            <div className={styles.blueprintLabel}>MBTI Frequency:</div>
                            <div className={styles.blueprintValue}>{mbti}</div>
                            
                            <div className={styles.blueprintLabel}>Urgency Level:</div>
                            <div className={styles.blueprintValue} style={{ color: '#ff0000' }}>{header.urgencyPercent}% Critical</div>
                        </div>
                    </motion.div>

                    <div style={{ marginTop: '40px' }}>
                        <h2 className={styles.sectionTitle}>The Mirror</h2>
                        <p className={styles.paragraph}>
                            <span className={styles.highlight}>{report.empathy || "We see the thread you have been following."}</span>
                        </p>

                        {report.scriptureOfTheSelf && (
                            <>
                                <h2 className={styles.sectionTitle} style={{ marginTop: '40px' }}>Scripture of the Self</h2>
                                <div className={styles.paragraph} style={{ 
                                    whiteSpace: 'pre-wrap', 
                                    fontStyle: 'italic', 
                                    lineHeight: '1.8',
                                    borderLeft: '2px solid #00f2ff',
                                    paddingLeft: '20px',
                                    marginTop: '20px'
                                }}>
                                    {report.scriptureOfTheSelf}
                                </div>
                            </>
                        )}
                        
                        <h2 className={styles.sectionTitle} style={{ marginTop: '40px' }}>Cosmic Alignment</h2>
                        <p className={styles.paragraph}>
                            {report.astroInsight || "The stars reflect the same architecture we see in your mind."}
                        </p>

                        <h2 className={styles.sectionTitle} style={{ marginTop: '40px' }}>Psychological Mapping</h2>
                        <p className={styles.paragraph}>
                            {report.psychMbtiLink || "Your patterns and personality are perfectly aligned with this moment."}
                        </p>

                        <div className={styles.damagingAdmission}>
                            <strong>Actionable Practice:</strong><br/><br/>
                            {report.actionablePractice || "Observe the gap between trigger and response."}<br/><br/>
                            <strong>Reflective Question:</strong><br/><br/>
                            {report.reflectiveQuestion || "What would you be without this story?"}
                        </div>

                        <div style={{ textAlign: 'center', marginTop: '40px', fontStyle: 'italic', color: 'rgba(255,255,255,0.7)' }}>
                            "{report.cosmicConfirmation || "You are not the pattern. You are the space in which it appears."}"
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

                        <button className={styles.tertiaryCta} onClick={() => window.open('https://instagram.com/spiritualai', '_blank')}>
                            Not ready? Follow us for a free pattern guide →
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}
