"use client";

import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/navigation';
import { motion, useInView } from 'framer-motion';
import styles from './HomeSections.module.css';
import { playOmSound } from '../../utils/audio';
import dynamic from 'next/dynamic';

const Solaris = dynamic(() => import('../artistic/Solaris'), { ssr: false });
const FlowingParticles = dynamic(() => import('../artistic/FlowingParticles'), { ssr: false });
const SynapseBrain = dynamic(() => import('../artistic/SynapseBrain'), { ssr: false });
const CyberGrid = dynamic(() => import('../artistic/CyberGrid'), { ssr: false });

// ─── Shared animations ──────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: 'easeOut' as const }
    },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
};

function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '-100px' });
    return (
        <motion.div
            ref={ref}
            variants={stagger}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className={className}
            style={style}
        >
            {children}
        </motion.div>
    );
}

// ─── SECTION 1: THE PROBLEM ──────────────────────────────────────────────────
function SectionProblem() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.4, pointerEvents: 'none' }}>
                <FlowingParticles />
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 60px' }}>
                        The reason nothing has worked <br/>
                        has <span style={{ color: '#ff3cf5' }}>nothing to do with effort.</span>
                    </motion.h2>
                    <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
                        <motion.p variants={fadeUp} style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1.6, marginBottom: '24px' }}>
                            You've read the books. Done the courses. Maybe even tried therapy.
                        </motion.p>
                        <motion.p variants={fadeUp} style={{ fontSize: '1.4rem', color: '#fff', fontWeight: 700, marginBottom: '24px' }}>
                            The same patterns still show up.
                        </motion.p>
                        <motion.p variants={fadeUp} style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                            Not because you're broken. Because every solution was built for an average mind. Yours isn't average. It's a specific architecture — running a specific unconscious pattern — that needs a specific key.
                        </motion.p>
                        <motion.p variants={fadeUp} style={{ fontSize: '1.4rem', color: '#00e5ff', fontWeight: 600, marginTop: '32px' }}>
                            Generic advice doesn't have it. We do.
                        </motion.p>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ─── SECTION 2: THE MECHANISM ────────────────────────────────────────────────
function SectionMechanism() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.3, pointerEvents: 'none' }}>
                <SynapseBrain />
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '80px' }}>
                        How your pattern actually breaks —<br/>
                        <span style={{ fontSize: '0.6em', opacity: 0.7 }}>not how everyone else says it does</span>
                    </motion.h2>
                    
                    <div className={styles.mechanismGrid} style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
                        gap: '40px',
                        width: '100%' 
                    }}>
                        <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💧</div>
                            <h3 style={{ fontFamily: 'Orbitron', color: '#00e5ff', marginBottom: '15px' }}>IDENTIFY</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                                We decode which of the 7 unconscious patterns is running your decisions without your permission. Not the symptom. The source.
                            </p>
                        </motion.div>
                        
                        <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👁</div>
                            <h3 style={{ fontFamily: 'Orbitron', color: '#ff3cf5', marginBottom: '15px' }}>MATCH</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                                Your specific mind type determines which tools you actually respond to. We don't give everyone the same path.
                            </p>
                        </motion.div>
                        
                        <motion.div variants={fadeUp} style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem', marginBottom: '20px' }}>💎</div>
                            <h3 style={{ fontFamily: 'Orbitron', color: '#b8ff5a', marginBottom: '15px' }}>DISSOLVE</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
                                21 days. Pattern-specific practice. An AI that knows your exact cognitive wiring. Not motivation. Precision.
                            </p>
                        </motion.div>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ─── SECTION 3: SOCIAL PROOF ─────────────────────────────────────────────────
function SectionSocialProof() {
    const testimonials = [
        {
            type: "INFJ · 29 · Mumbai",
            content: "I spent 4 years in therapy understanding my patterns. I understood everything and changed nothing. Week 3 here — I finally stopped apologizing for existing."
        },
        {
            type: "INTJ · 34 · Singapore",
            content: "I needed proof before I trusted anything. The blueprint showed me exactly how my mind creates its own obstacles. I shipped the project I'd been sitting on for 2 years."
        },
        {
            type: "ENFP · 26 · London",
            content: "The AI named my pattern in the third question. I cried. Not from sadness. From relief that something finally saw it."
        }
    ];

    return (
        <section className={styles.section} style={{ background: 'transparent' }}>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '60px' }}>
                        What happens when the <br/>
                        <span style={{ color: '#ffd700' }}>right key meets the right lock</span>
                    </motion.h2>
                    
                    <div style={{ 
                        display: 'grid', 
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '30px' 
                    }}>
                        {testimonials.map((t, i) => (
                            <motion.div 
                                key={i}
                                variants={fadeUp}
                                style={{ 
                                    background: 'rgba(255,255,255,0.03)', 
                                    padding: '40px', 
                                    borderRadius: '24px',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    backdropFilter: 'blur(10px)'
                                }}
                            >
                                <p style={{ fontSize: '1.1rem', lineHeight: 1.6, color: '#fff', marginBottom: '24px', fontStyle: 'italic' }}>
                                    "{t.content}"
                                </p>
                                <p style={{ fontFamily: 'Orbitron', color: '#00e5ff', fontSize: '0.9rem' }}>
                                    {t.type}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ─── SECTION 4: THE INVITATION ──────────────────────────────────────────────
function SectionInvitation() {
    const [showPopup, setShowPopup] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 15000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <section className={styles.section} style={{ background: '#000', position: 'relative', paddingBottom: '160px' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}>
                <CyberGrid />
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '40px' }}>
                        You've reached the bottom <br/>
                        <span style={{ color: '#ff00ea' }}>of your old pattern.</span>
                    </motion.h2>
                    <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                        <motion.p variants={fadeUp} style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1.6, marginBottom: '40px' }}>
                            This is where the architecture changes. Not through motivation. Not through discipline. Through understanding exactly what's been running — and dissolving it with precision.
                        </motion.p>

                        <motion.div
                            variants={fadeUp}
                            style={{
                                marginBottom: '48px',
                                background: 'rgba(255, 255, 255, 0.05)',
                                padding: '20px 40px',
                                borderRadius: '16px',
                                backdropFilter: 'blur(10px)',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'inline-block'
                            }}
                        >
                            <p style={{ fontFamily: 'Orbitron', letterSpacing: '2px', color: 'rgba(255,255,255,0.6)', fontSize: '1.1rem', margin: 0 }}>
                                8,247 patterns decoded. Yours is next.
                            </p>
                        </motion.div>

                        <motion.button
                            variants={fadeUp}
                            className={styles.gradientFlowBtn}
                            style={{ padding: '24px 60px', fontSize: '1.2rem' }}
                            onClick={() => {
                                playOmSound();
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                            }}
                        >
                            DECODE MY PATTERN →
                        </motion.button>
                    </div>
                </AnimatedSection>
            </div>

            {showPopup && (
                <div style={{
                    position: 'fixed',
                    bottom: '40px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 1000,
                    background: 'rgba(0, 0, 0, 0.8)',
                    backdropFilter: 'blur(20px)',
                    padding: '24px',
                    borderRadius: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    color: '#fff',
                    textAlign: 'center',
                    maxWidth: '400px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
                }}>
                    <p style={{ fontSize: '1.1rem', lineHeight: 1.5, marginBottom: '16px' }}>
                        Complete your report just by copying this prompt to the AI you use the most and pasting it in the message box of spiritualai
                    </p>
                    <button
                        onClick={() => setShowPopup(false)}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            color: '#fff',
                            padding: '8px 16px',
                            borderRadius: '8px',
                            cursor: 'pointer',
                            fontSize: '0.9rem'
                        }}
                    >
                        Dismiss
                    </button>
                </div>
            )}
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────────────────────
export default function HomeSections() {
    return (
        <div style={{ background: '#050505' }}>
            <SectionProblem />
            <SectionMechanism />
            <SectionSocialProof />
            <SectionInvitation />
        </div>
    );
}
