"use client";

import React, { useRef } from 'react';
import Link from 'next/link';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';
import styles from './HomeSections.module.css';
import pStyles from './PersonalitySelector.module.css';
import { playOmSound } from '../../utils/audio';
import Image from 'next/image';
import dynamic from 'next/dynamic';

const Solaris = dynamic(() => import('../artistic/Solaris'), { ssr: false });
const FlowingParticles = dynamic(() => import('../artistic/FlowingParticles'), { ssr: false });
const SynapseBrain = dynamic(() => import('../artistic/SynapseBrain'), { ssr: false });
const CyberGrid = dynamic(() => import('../artistic/CyberGrid'), { ssr: false });

interface PersonalityType {
    type: string;
    role: string;
}

const personalityData: PersonalityType[] = [
    { type: 'INTJ', role: 'Architect' },
    { type: 'INTP', role: 'Logician' },
    { type: 'ENTJ', role: 'Commander' },
    { type: 'ENTP', role: 'Debater' },
    { type: 'INFJ', role: 'Advocate' },
    { type: 'INFP', role: 'Mediator' },
    { type: 'ENFJ', role: 'Protagonist' },
    { type: 'ENFP', role: 'Campaigner' },
    { type: 'ISTJ', role: 'Logistician' },
    { type: 'ISFJ', role: 'Defender' },
    { type: 'ESTJ', role: 'Executive' },
    { type: 'ESFJ', role: 'Consul' },
    { type: 'ISTP', role: 'Virtuoso' },
    { type: 'ISFP', role: 'Adventurer' },
    { type: 'ESTP', role: 'Entrepreneur' },
    { type: 'ESFP', role: 'Entertainer' }
];

// ─── Shared animations ──────────────────────────────────────────────────────
const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5, ease: 'easeOut' as const }
    },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
};

function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, margin: '0px' });
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

// ─── Word-by-word scroll animation component ───────────────────────────────
function Word({ word, progress, range }: { word: string; progress: any; range: [number, number] }) {
    const opacity = useTransform(progress, range, [0.5, 1]);
    return (
        <motion.span style={{ opacity, marginRight: '0.3em' }}>
            {word}
        </motion.span>
    );
}

function ScrollRevealedText({ text, className, style, element: Element = "h3" }: { text: string; className?: string; style?: React.CSSProperties, element?: any }) {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start 0.9", "start 0.25"]
    });

    const words = text.split(" ");
    return (
        <Element ref={ref} className={className} style={{ ...style, display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {words.map((word, i) => {
                const start = i / words.length;
                const end = start + (1 / words.length);
                return <Word key={i} range={[start, end]} progress={scrollYProgress} word={word} />;
            })}
        </Element>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 01 — SYSTEM AUDIT (TAPOLOKA + JANALOKA)
// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 02 — THE AI GUIDE (MAHARLOKA)
// ────────────────────────────────────────────────────────────────────────────
function ChapterAiGuide() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.8, pointerEvents: 'none' }}>
                <SynapseBrain />
            </div>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#ff6f00', color: '#ffcc80', margin: 0 }}>
                    CHAPTER 02 — THE AI GUIDE
                </span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '80px' }}>
                        Your AI Guide Knows <span style={{ color: '#ffd700' }}>How You Think.</span>
                    </motion.h2>
                    <div className={styles.loka4Layout}>
                        <div className={styles.textSide}>
                            <motion.p variants={fadeUp} style={{ fontSize: 'clamp(1.2rem, 2vw, 1.5rem)', color: '#fff', lineHeight: 1.5 }}>
                                You connect with an intelligence designed specifically for your personality type. It identifies the root of your challenge — not just the surface symptoms.
                            </motion.p>
                            <motion.div variants={fadeUp} style={{ marginTop: '32px' }}>
                                <button className={styles.gradientFlowBtn} onClick={() => playOmSound()}>
                                    Activate My AI Guide
                                    <span className={styles.ctaArrow} style={{ marginLeft: '16px' }}>→</span>
                                </button>
                            </motion.div>
                        </div>
                        <div className={styles.previewSide}>
                            <motion.div variants={fadeUp} style={{ width: '100%', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(255, 111, 0, 0.2)', background: 'rgba(0,0,0,0.4)' }}>
                                <picture>
                                    <source srcSet="/images/home/lab-guide.webp" type="image/webp" />
                                    <img src="/images/home/lab-guide.gif" alt="Personalized AI Guide" style={{ width: '100%', height: 'auto', display: 'block' }} />
                                </picture>
                            </motion.div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 03 — DIGITAL EVOLUTION (SATYALOKA)
// ────────────────────────────────────────────────────────────────────────────
function ChapterEvolution() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.7, pointerEvents: 'none' }}>
                <CyberGrid />
            </div>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#00ffa3', color: '#00ffa3', margin: 0 }}>
                    CHAPTER 03 — EVOLUTION
                </span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '40px' }}>
                        Your Digital Evolution, <em style={{ background: 'linear-gradient(135deg, #00ffa3, #00e5ff)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'normal' }}>Engineered.</em>
                    </motion.h2>
                    <motion.div variants={fadeUp} style={{ width: '100%', maxWidth: '1000px', margin: '0 auto 60px', borderRadius: '32px', overflow: 'hidden', border: '1px solid rgba(0, 255, 163, 0.2)', background: 'rgba(0,0,0,0.4)' }}>
                        <picture>
                            <source srcSet="/images/home/delivery-evolution.webp" type="image/webp" />
                            <img src="/images/home/delivery-evolution.gif" alt="Digital Delivery Evolution" style={{ width: '100%', height: 'auto', display: 'block' }} />
                        </picture>
                    </motion.div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 01 — SYSTEM AUDIT (TAPOLOKA + JANALOKA)
// ────────────────────────────────────────────────────────────────────────────
function ChapterSystemAudit() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative', paddingBottom: '160px' }}>
            {/* Background Layer */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.6, pointerEvents: 'auto' }}>
                <FlowingParticles />
            </div>

            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#7c4dff', color: '#b388ff', margin: 0 }}>
                    CHAPTER 01 — SYSTEM AUDIT
                </span>
            </div>

            <div className={styles.sectionInner} style={{ maxWidth: '1600px', position: 'relative', zIndex: 1 }}>
                <AnimatedSection>
                    <ScrollRevealedText
                        element="h2"
                        text="The Architecture of Individual Intelligence."
                        className={styles.loka2Title}
                        style={{ color: '#fff', textShadow: '0 0 30px rgba(124, 77, 255, 0.6)', textAlign: 'center', marginBottom: '80px' }}
                    />

                    <div className={styles.loka2Layout}>
                        {/* LEFT: Text + Big Quiz Button */}
                        <div className={styles.contentSide}>
                            <div style={{ maxWidth: '650px', marginBottom: '40px' }}>
                                <ScrollRevealedText
                                    text="Cognitive hardware is not uniform. Your processing speed and logic filters are unique."
                                    style={{
                                        fontFamily: 'Orbitron, sans-serif',
                                        fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                                        fontWeight: 900,
                                        color: '#fff',
                                        lineHeight: 1.2,
                                        marginBottom: '24px',
                                        textTransform: 'uppercase',
                                        letterSpacing: '1.5px',
                                        textShadow: '0 4px 20px rgba(0,0,0,0.8)'
                                    }}
                                />

                                <motion.p variants={fadeUp} style={{
                                    fontFamily: 'Inter, sans-serif',
                                    fontSize: '1.3rem',
                                    color: '#fff',
                                    lineHeight: 1.6,
                                    fontWeight: 500,
                                    marginBottom: '32px',
                                    textShadow: '0 2px 10px rgba(0,0,0,0.8)'
                                }}>
                                    We map your personality architecture to a precise <span style={{ color: '#ff3cf5', fontWeight: 800, textShadow: '0 0 15px rgba(255, 60, 245, 0.5)' }}>Cognitive Operating System</span>.
                                </motion.p>

                                <div style={{
                                    borderLeft: '3px solid #35f8ff',
                                    paddingLeft: '28px',
                                    marginBottom: '32px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    gap: '16px',
                                    background: 'rgba(0,0,0,0.2)',
                                    borderRadius: '0 12px 12px 0'
                                }}>
                                    {[
                                        'MBTI-Optimized Protocols',
                                        'Neural-Sync AI Guidance',
                                        'Shadow-Patch Behavioral Frameworks'
                                    ].map((item, idx) => (
                                        <motion.div key={idx} variants={fadeUp} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                            <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff3cf5', boxShadow: '0 0 12px #ff3cf5' }} />
                                            <span style={{ fontFamily: 'Inter', fontSize: '1.2rem', fontWeight: 600, color: '#fff' }}>{item}</span>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>

                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                                <Link href="/discover" className={styles.bigQuizBtn} onClick={() => playOmSound()} style={{ height: '110px', width: 'auto', minWidth: '550px' }}>
                                    <div className={pStyles.cardBg} style={{
                                        background: 'rgba(53, 248, 255, 0.15)',
                                        border: '2px solid #35f8ff',
                                        clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)',
                                        borderRadius: '0',
                                        boxShadow: '0 0 40px rgba(53, 248, 255, 0.2)'
                                    }}></div>
                                    <div style={{
                                        position: 'relative',
                                        zIndex: 10,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '24px',
                                        width: '100%',
                                        padding: '0 60px 0 40px'
                                    }}>
                                        <span style={{
                                            fontFamily: 'Orbitron',
                                            fontSize: '1.4rem',
                                            fontWeight: 900,
                                            color: '#fff',
                                            textShadow: '0 0 15px rgba(53, 248, 255, 0.5)',
                                            letterSpacing: '2px'
                                        }}>
                                            INITIALIZE COGNITIVE AUDIT
                                        </span>
                                        <span className={styles.ctaArrow}>→</span>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        {/* CENTER: Vertical Divider */}
                        <div className={styles.vDivider} />

                        {/* RIGHT: 16 Personality Buttons */}
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            <div className={styles.gridSide} style={{ pointerEvents: 'auto' }}>
                                {personalityData.map((p) => (
                                    <Link
                                        key={p.type}
                                        href={`/MBTI/personality/${p.type.toLowerCase()}.html`}
                                        className={`${pStyles.card} ${pStyles.analyst}`}
                                        style={{ height: '85px', minWidth: '200px' }}
                                    >
                                        <div className={pStyles.cardBg} style={{ clipPath: 'polygon(5% 0, 100% 0, 100% 70%, 95% 100%, 0 100%, 0 30%)' }}></div>
                                        <div className={pStyles.textContent} style={{ flexDirection: 'row', gap: '12px', alignItems: 'center', justifyContent: 'flex-start', width: '100%', paddingLeft: '20px' }}>
                                            <span className={pStyles.typeCode} style={{ fontSize: '1.6rem', fontWeight: 900 }}>{p.type}</span>
                                            <span className={pStyles.roleLabel} style={{ fontSize: '0.75rem', fontWeight: 600, opacity: 0.9 }}>{p.role}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// LOKA 2 — TAPOLOKA (Split Layout)
// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 04 — ACTION & REALITY (BHULOKA + ATALA)
// ────────────────────────────────────────────────────────────────────────────
function ChapterActionReality() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#2196f3', color: '#90caf9', margin: 0 }}>
                    CHAPTER 04 — ACTION & REALITY
                </span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '80px' }}>
                        Your Karma, <span style={{ color: '#2196f3' }}>Optimized.</span>
                    </motion.h2>
                    <div className={styles.loka3Layout}>
                        <div className={styles.textSide}>
                            <motion.p variants={fadeUp} style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1.6, marginBottom: '30px' }}>
                                Transformation isn't just theory. It's about the precision of your actions in the material realm.
                                We help you align your daily inputs with your architectural vision.
                            </motion.p>
                        </div>
                        <div className={styles.previewSide}>
                            <motion.div variants={fadeUp} style={{ width: '100%', borderRadius: '24px', overflow: 'hidden', border: '1px solid rgba(33, 150, 243, 0.2)', background: 'rgba(0,0,0,0.5)' }}>
                                <img src="/images/home/delivery-evolution.gif" alt="Reality Calibration" style={{ width: '100%', height: 'auto', display: 'block' }} />
                            </motion.div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 05 — REFINING NATURE (VITALA + SUTALA)
// ────────────────────────────────────────────────────────────────────────────
function ChapterRefiningNature() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#00e676', color: '#b9f6ca', margin: 0 }}>
                    CHAPTER 05 — REFINING NATURE
                </span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '80px' }}>
                        Refining the <span style={{ color: '#00e676' }}>Internal Engine.</span>
                    </motion.h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '40px', width: '100%' }}>
                        <motion.div variants={fadeUp} className={styles.protocolStep} style={{ background: 'rgba(0,230,118,0.05)' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>Neural Patching</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Identify and overwrite behavioral glitches that stall your evolution.</p>
                        </motion.div>
                        <motion.div variants={fadeUp} className={styles.protocolStep} style={{ background: 'rgba(0,229,255,0.05)' }}>
                            <h3 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '15px' }}>Energy Optimization</h3>
                            <p style={{ color: 'rgba(255,255,255,0.7)' }}>Sync your biology with your digital mission for sustained output.</p>
                        </motion.div>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 06 — SCIENTIFIC MASTERY (TALATALA + MAHATALA)
// ────────────────────────────────────────────────────────────────────────────
function ChapterScientificMastery() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#ff3d00', color: '#ff9e80', margin: 0 }}>
                    CHAPTER 06 — SCIENTIFIC MASTERY
                </span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '80px' }}>
                        The Science of <span style={{ color: '#ff3d00' }}>Self-Evolution.</span>
                    </motion.h2>
                    <div className={styles.loka3Layout}>
                        <div className={styles.textSide}>
                            <motion.p variants={fadeUp} style={{ fontSize: '1.4rem', color: '#fff', lineHeight: 1.6 }}>
                                We bridge ancient wisdom with modern neural science.
                                Our protocols are engineered for maximum cognitive throughput.
                            </motion.p>
                        </div>
                        <div className={styles.previewSide}>
                            <div style={{ background: 'rgba(255,255,255,0.02)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(255, 61, 0, 0.1)' }}>
                                <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🔭</div>
                                <h3 style={{ color: '#fff', fontFamily: 'Orbitron' }}>NEURAL ARCHITECTURE</h3>
                                <p style={{ color: 'rgba(255,255,255,0.5)' }}>Analyzing the logic gates of your specific personality kernel.</p>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// CHAPTER 07 — THE RESET (RASATALA + PATALA)
// ────────────────────────────────────────────────────────────────────────────
function ChapterTheReset() {
    return (
        <section className={styles.section} style={{ background: '#000', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#f44336', color: '#ef9a9a', margin: 0 }}>
                    CHAPTER 07 — THE RESET
                </span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <motion.h2 variants={fadeUp} className={styles.sectionTitle} style={{ textAlign: 'center', marginBottom: '60px' }}>
                        The End of Your <span style={{ color: '#f44336' }}>Old System.</span>
                    </motion.h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                        <p style={{ fontSize: '1.2rem', color: 'rgba(255,255,255,0.6)', maxWidth: '800px', textAlign: 'center' }}>
                            You have reached the bottom of the old architecture. From here, there is only one path: Up.
                            Become a founding member and architect the new logic of your life.
                        </p>
                        <button className={styles.gradientFlowBtn} onClick={() => playOmSound()}>
                            SECURE FOUNDING MEMBER ACCESS
                            <span className={styles.ctaArrow} style={{ marginLeft: '16px' }}>→</span>
                        </button>
                    </div>
                </AnimatedSection>
            </div>
            <div className={styles.sectionDivider} />
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ────────────────────────────────────────────────────────────────────────────
export default function HomeSections() {
    return (
        <>
            <ChapterSystemAudit />
            <ChapterAiGuide />
            <ChapterEvolution />
            <ChapterActionReality />
            <ChapterRefiningNature />
            <ChapterScientificMastery />
            <ChapterTheReset />
        </>
    );
}
