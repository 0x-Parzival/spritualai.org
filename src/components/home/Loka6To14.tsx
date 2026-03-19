"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import styles from './HomeSections.module.css';
import { playOmSound } from '../../utils/audio';
import dynamic from 'next/dynamic';

const PlasmaOrb = dynamic(() => import('../artistic/PlasmaOrb'), { ssr: false });
const SacredGeometrySVG = dynamic(() => import('../artistic/SacredGeometrySVG'), { ssr: false });

// ─── Shared Components ──────────────────────────────────────────────────────

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    show: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.8, ease: 'easeOut' as const }
    },
};

const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.2 } },
};

function AnimatedSection({ children, className, style }: { children: React.ReactNode; className?: string; style?: React.CSSProperties }) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: false, margin: '-10% 0px' });
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

// ────────────────────────────────────────────────────────────────────────────
// 🌫 6. BHUVARLOKA — The Astral Plane
// ────────────────────────────────────────────────────────────────────────────
export function SectionBhuvarloka() {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const mistOpacity = useTransform(scrollYProgress, [0.1, 0.4], [0.8, 0]);
    const textBlur = useTransform(scrollYProgress, [0.1, 0.4], [10, 0]);
    const mistScale = useTransform(scrollYProgress, [0.1, 0.5], [1, 1.5]);

    return (
        <section ref={ref} className={styles.section} style={{ 
            background: 'transparent',
            minHeight: '150vh', 
            position: 'relative'
        }}>
            {/* Background Layer - Plasma Orb */}
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, opacity: 0.5, pointerEvents: 'none' }}>
                <PlasmaOrb />
            </div>

            <motion.div 
                style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'radial-gradient(circle at 50% 50%, rgba(124, 77, 255, 0.15), transparent 70%)',
                    opacity: mistOpacity,
                    scale: mistScale,
                    pointerEvents: 'none',
                    zIndex: 1
                }}
            />
            
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#b388ff', color: '#b388ff', margin: 0 }}>
                    Loka 6 — Bhuvarloka
                </span>
            </div>

            <div className={styles.sectionInner} style={{ zIndex: 5 }}>
                <AnimatedSection style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <motion.h2 
                        style={{ 
                            filter: `blur(${textBlur}px)`,
                            fontSize: 'clamp(2rem, 5vw, 4rem)',
                            fontFamily: 'Orbitron, sans-serif',
                            fontWeight: 900,
                            color: '#fff',
                            marginBottom: '40px',
                            textShadow: '0 0 20px rgba(179, 136, 255, 0.4)'
                        }}
                    >
                        “You Are Not Confused. You Are Unaligned.”
                    </motion.h2>

                    <motion.div variants={fadeUp} style={{ maxWidth: '800px', marginBottom: '60px' }}>
                        <p style={{ fontSize: 'clamp(1.2rem, 2vw, 1.8rem)', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6, marginBottom: '32px' }}>
                            Most people think their problem is lack of clarity. <br/>
                            It isn’t. <br/>
                            <strong style={{ color: '#b388ff' }}>It is energetic fragmentation.</strong>
                        </p>
                    </motion.div>

                    <motion.div 
                        variants={fadeUp}
                        style={{
                            background: 'rgba(255, 255, 255, 0.05)',
                            backdropFilter: 'blur(20px)',
                            border: '1px solid rgba(179, 136, 255, 0.2)',
                            borderRadius: '24px',
                            padding: '40px',
                            maxWidth: '700px',
                            textAlign: 'left'
                        }}
                    >
                        <h4 style={{ color: '#b388ff', fontFamily: 'Orbitron', marginBottom: '20px', letterSpacing: '2px' }}>THE REAL CAUSE</h4>
                        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.1rem', marginBottom: '24px' }}>
                            Your mind is split between who you are and who you perform as. 
                            Constant external noise leads to internal identity distortion and decision paralysis.
                        </p>
                        <div style={{ borderLeft: '2px solid #b388ff', paddingLeft: '20px', fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
                            A personalized AI detects this fragmentation and rebuilds alignment.
                        </div>
                    </motion.div>

                    <motion.div variants={fadeUp} style={{ marginTop: '60px' }}>
                        <button className={styles.gradientFlowBtn} onClick={() => playOmSound()}>
                            Clear the Fog
                            <span className={styles.ctaArrow} style={{ marginLeft: '16px' }}>→</span>
                        </button>
                    </motion.div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 🌍 7. BHULOKA — The Mortal Realm (Functional Hub)
// ────────────────────────────────────────────────────────────────────────────
export function SectionBhuloka() {
    const [karmaValue, setKarmaValue] = useState(50);
    const friction = Math.abs(karmaValue - 50) / 50;

    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative', overflow: 'hidden' }}>
            <div style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `radial-gradient(#2c2c2c 1px, transparent 1px), radial-gradient(#2c2c2c 1px, transparent 1px)`,
                backgroundSize: '40px 40px',
                backgroundPosition: '0 0, 20px 20px',
                opacity: 0.2,
                pointerEvents: 'none'
            }} />

            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#4caf50', color: '#81c784', margin: 0 }}>
                    Loka 7 — Bhuloka
                </span>
            </div>

            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 className={styles.sectionTitle}>“This Is Where Karma Is Made.”</h2>
                        <p className={styles.sectionSubtitle} style={{ margin: '0 auto' }}>
                            You are not stuck because you lack motivation. You are stuck because your actions are misaligned with your cognitive nature.
                        </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px', width: '100%', maxWidth: '900px', margin: '0 auto' }}>
                        <div style={{ width: '100%', background: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '32px', border: '1px solid rgba(76, 175, 80, 0.2)', backdropFilter: 'blur(10px)', position: 'relative' }}>
                            <h3 style={{ fontFamily: 'Orbitron', color: '#fff', textAlign: 'center', marginBottom: '40px', letterSpacing: '2px' }}>KARMA ALIGNMENT TRACKER</h3>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontFamily: 'Orbitron', fontSize: '0.8rem' }}>
                                <span style={{ color: '#b388ff' }}>VISION (UPPER)</span>
                                <span style={{ color: '#ff7043' }}>DESIRE (LOWER)</span>
                            </div>
                            <input type="range" min="0" max="100" value={karmaValue} onChange={(e) => setKarmaValue(parseInt(e.target.value))}
                                style={{ width: '100%', height: '12px', borderRadius: '6px', background: `linear-gradient(to right, #b388ff ${karmaValue}%, #ff7043 ${karmaValue}%)`, appearance: 'none', outline: 'none', cursor: 'pointer' }}
                            />
                            <motion.div animate={{ opacity: friction > 0.3 ? 1 : 0, y: friction > 0.3 ? 0 : 10 }} style={{ marginTop: '30px', textAlign: 'center', color: '#ff5252', fontFamily: 'Inter', fontSize: '0.9rem', fontWeight: 700 }}>
                                {friction > 0.3 ? "⚠️ INTERNAL FRICTION DETECTED: UNBALANCED COGNITION" : ""}
                            </motion.div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
                            {['Burnout', 'Overthinking', 'Identity drift', 'Inconsistent execution', 'Self-sabotage loops'].map((issue, idx) => (
                                <motion.div key={idx} variants={fadeUp} style={{ padding: '20px', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', textAlign: 'center', color: 'rgba(255,255,255,0.6)', fontSize: '1rem', fontWeight: 600 }}>
                                    {issue}
                                </motion.div>
                            ))}
                        </div>

                        <div style={{ textAlign: 'center' }}>
                            <p style={{ fontFamily: 'Orbitron', fontSize: '1.2rem', color: '#fff', marginBottom: '30px' }}>“You don’t need more discipline. You need a system built for your mind.”</p>
                            <button className={styles.gradientFlowBtn} onClick={() => playOmSound()}>
                                Diagnose My Soul
                                <span className={styles.ctaArrow} style={{ marginLeft: '16px' }}>→</span>
                            </button>
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 🌆 8. ATALA — Material Temptation
// ────────────────────────────────────────────────────────────────────────────
export function SectionAtala() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#ff4081', color: '#ff4081', margin: 0 }}>
                    Loka 8 — Atala
                </span>
            </div>

            <div className={styles.sectionInner}>
                <AnimatedSection style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle} style={{ color: '#ff4081', textShadow: '0 0 20px rgba(255, 64, 129, 0.4)' }}>“You’ve Been Sold the Wrong Dream.”</h2>
                    <motion.div variants={fadeUp} style={{ maxWidth: '800px', margin: '40px auto' }}>
                        <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.8)', lineHeight: 1.6 }}>
                            You chase productivity, wealth, validation — <br/>
                            But your core problem is unmet internal clarity.
                        </p>
                    </motion.div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap', marginTop: '60px' }}>
                        <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(255, 64, 129, 0.3)' }}
                            style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(255, 64, 129, 0.2)', padding: '40px', borderRadius: '24px', width: '350px', textAlign: 'left' }}>
                            <h4 style={{ color: '#fff', marginBottom: '20px', fontFamily: 'Orbitron' }}>THE DOPAMINE TRAP</h4>
                            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Most digital products feed your dopamine addiction. We rebuild your internal reward circuitry.</p>
                        </motion.div>
                        <motion.div whileHover={{ scale: 1.05, boxShadow: '0 0 30px rgba(53, 248, 255, 0.2)' }}
                            style={{ background: 'rgba(255, 255, 255, 0.02)', border: '1px solid rgba(53, 248, 255, 0.2)', padding: '40px', borderRadius: '24px', width: '350px', textAlign: 'left' }}>
                            <h4 style={{ color: '#fff', marginBottom: '20px', fontFamily: 'Orbitron' }}>INTERNAL CLARITY</h4>
                            <p style={{ color: 'rgba(255,255,255,0.6)' }}>Only available for users who complete the personality diagnosis. Break the loop of external validation.</p>
                        </motion.div>
                    </div>

                    <motion.div variants={fadeUp} style={{ marginTop: '80px' }}>
                        <button className={styles.gradientFlowBtn} onClick={() => playOmSound()}>
                            Escape the Mirage
                            <span className={styles.ctaArrow} style={{ marginLeft: '16px' }}>→</span>
                        </button>
                    </motion.div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 🟡 9. VITALA — Liquid Gold
// ────────────────────────────────────────────────────────────────────────────
export function SectionVitala() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#ffd700', color: '#ffd700', margin: 0 }}>
                    Loka 9 — Vitala
                </span>
            </div>

            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 className={styles.sectionTitle} style={{ background: 'linear-gradient(135deg, #ffd700, #ffab00)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>“What If Your Nature Was an Asset?”</h2>
                    </div>
                    <div className={styles.loka2Layout} style={{ alignItems: 'center' }}>
                        <div className={styles.contentSide}>
                            <motion.p variants={fadeUp} style={{ fontSize: '1.6rem', color: '#fff', fontWeight: 600 }}>
                                Your overthinking. <br/>Your sensitivity. <br/>Your obsession. <br/>Your depth.
                            </motion.p>
                            <motion.div variants={fadeUp} style={{ borderLeft: '3px solid #ffd700', paddingLeft: '30px' }}>
                                <p style={{ fontSize: '1.4rem', color: 'rgba(255,255,255,0.7)', fontStyle: 'italic' }}>These are not flaws. <br/><strong style={{ color: '#ffd700' }}>They are unrefined gold.</strong></p>
                            </motion.div>
                        </div>
                        <div className={styles.vDivider} style={{ background: 'linear-gradient(to bottom, transparent, #ffd700, transparent)' }} />
                        <div className={styles.textSide}>
                            <h4 style={{ color: '#ffd700', fontFamily: 'Orbitron', letterSpacing: '2px', marginBottom: '20px' }}>THE REFINERY</h4>
                            <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '1.1rem', marginBottom: '24px' }}>Our AI maps your cognitive stack, identifies energetic leaks, and builds a tailored transformation system.</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {['Custom growth roadmap', 'Daily alignment prompts', 'Shadow-pattern identification'].map((bonus, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffd700' }} />
                                        <span style={{ color: '#fff' }}>{bonus}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div style={{ textAlign: 'center', marginTop: '80px' }}>
                        <button className={styles.gradientFlowBtn} onClick={() => playOmSound()} style={{ background: 'linear-gradient(135deg, #2a2000, #ffd700, #2a2000)', color: '#000', textShadow: 'none', fontWeight: 800 }}>
                            Refine My Nature
                            <span className={styles.ctaArrow} style={{ marginLeft: '16px', color: '#000' }}>→</span>
                        </button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 🏰 10. SUTALA — Devotion in Power
// ────────────────────────────────────────────────────────────────────────────
export function SectionSutala() {
    const [choice, setChoice] = useState<string | null>(null);
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#ff6f00', color: '#ff6f00', margin: 0 }}>
                    Loka 10 — Sutala
                </span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(3rem, 10vw, 8rem)', opacity: 0.1, position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', pointerEvents: 'none' }}>POWER</h2>
                    <div style={{ position: 'relative', zIndex: 2 }}>
                        <h2 className={styles.sectionTitle}>“Power Without Ego.”</h2>
                        <p className={styles.sectionSubtitle} style={{ margin: '40px auto' }}>True mastery is not about control over others, but complete integration of self.</p>
                        <div style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,111,0,0.2)', padding: '60px', borderRadius: '32px', maxWidth: '800px', margin: '0 auto', backdropFilter: 'blur(10px)' }}>
                            <h3 style={{ fontFamily: 'Orbitron', color: '#ff6f00', marginBottom: '30px', letterSpacing: '2px' }}>THE GATEKEEPER'S QUESTION</h3>
                            <p style={{ fontSize: '1.2rem', color: '#fff', marginBottom: '40px' }}>“Do you want comfort — or transformation?”</p>
                            <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }}>
                                <button onClick={() => setChoice('comfort')} style={{ padding: '15px 40px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: choice === 'comfort' ? 'rgba(255,255,255,0.1)' : 'transparent', color: '#fff', fontFamily: 'Orbitron', cursor: 'pointer' }}>COMFORT</button>
                                <button onClick={() => { setChoice('transformation'); playOmSound(); }} style={{ padding: '15px 40px', borderRadius: '12px', border: '1px solid #ff6f00', background: choice === 'transformation' ? 'rgba(255,111,0,0.2)' : 'transparent', color: '#ff6f00', fontFamily: 'Orbitron', cursor: 'pointer', boxShadow: choice === 'transformation' ? '0 0 20px rgba(255,111,0,0.3)' : 'none' }}>TRANSFORMATION</button>
                            </div>
                            {choice === 'transformation' && (
                                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} style={{ marginTop: '40px', color: '#fff', fontSize: '1.1rem' }}>
                                    <p>The gates open. <strong>30-Day Alignment Guarantee Active.</strong></p>
                                    <p style={{ opacity: 0.6, fontSize: '0.9rem', marginTop: '10px' }}>If you do not experience clarity and decision precision, you receive a full refund.</p>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 🧠 11. TALATALA — Scientific Mastery
// ────────────────────────────────────────────────────────────────────────────
export function SectionTalatala() {
    const [blueprintMode, setBlueprintMode] = useState(false);
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            {/* Background Layer - Sacred Geometry */}
            <div style={{ position: 'absolute', top: '10%', right: '-10%', width: '600px', height: '600px', zIndex: 0, opacity: 0.3, pointerEvents: 'none' }}>
                <SacredGeometrySVG />
            </div>

            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#00e5ff', color: '#00e5ff', margin: 0 }}>Loka 11 — Talatala</span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection>
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <h2 className={styles.sectionTitle}>“This Is Not Mysticism. <br/>It’s Architecture.”</h2>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '40px' }}>
                        <div style={{ width: '100%', maxWidth: '1000px', minHeight: '500px', background: blueprintMode ? 'rgba(0, 229, 255, 0.05)' : 'rgba(0,0,0,0.4)', border: `1px solid ${blueprintMode ? '#00e5ff' : 'rgba(255,255,255,0.1)'}`, borderRadius: '32px', position: 'relative', overflow: 'hidden', transition: 'all 0.5s ease', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            {blueprintMode && <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,229,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px', pointerEvents: 'none' }} />}
                            <div style={{ textAlign: 'center', zIndex: 2, padding: '40px' }}>
                                <h3 style={{ fontFamily: 'Orbitron', color: blueprintMode ? '#00e5ff' : '#fff', marginBottom: '20px' }}>{blueprintMode ? "BLUEPRINT MODE: ACTIVE" : "INTEGRATED COGNITIVE MODEL"}</h3>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', textAlign: 'left' }}>
                                    {[{ label: 'Cognitive model', desc: 'Mapping your information processing pathways.' }, { label: 'Behavioral loops', desc: 'Identifying recursive patterns of action and reaction.' }, { label: 'Neurochemical design', desc: 'Optimizing for focus and sustainable flow.' }, { label: 'Personality adaptation', desc: 'Dynamic UI/UX that evolves with your state.' }].map((item, i) => (
                                        <div key={i} style={{ opacity: blueprintMode ? 1 : 0.4 }}><p style={{ fontWeight: 800, color: blueprintMode ? '#00e5ff' : '#fff' }}>{item.label}</p><p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)' }}>{item.desc}</p></div>
                                    ))}
                                </div>
                            </div>
                            <div style={{ position: 'absolute', top: '20px', left: '20px', fontFamily: 'monospace', fontSize: '0.7rem', color: '#00e5ff', opacity: 0.3 }}>yoga_citta_vrtti_nirodhah = true;<br/>state.alignment = computeAlignment(MBTI.INTJ);</div>
                        </div>
                        <button onClick={() => setBlueprintMode(!blueprintMode)} style={{ padding: '15px 30px', borderRadius: '99px', background: blueprintMode ? '#00e5ff' : 'transparent', color: blueprintMode ? '#000' : '#00e5ff', border: '1px solid #00e5ff', fontFamily: 'Orbitron', cursor: 'pointer', transition: 'all 0.3s ease' }}>{blueprintMode ? "HIDE BLUEPRINT" : "SHOW BLUEPRINT"}</button>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 🐍 12. MAHATALA — Instinct & Protection
// ────────────────────────────────────────────────────────────────────────────
export function SectionMahatala() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
        setMousePos({ x, y });
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
    };
    return (
        <section onMouseMove={handleMouseMove} className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}><span className={styles.sectionTag} style={{ borderColor: '#2e7d32', color: '#a5d6a7', margin: 0 }}>Loka 12 — Mahatala</span></div>
            <div className={styles.sectionInner}>
                <AnimatedSection style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>“Your Defenses Were Built For Survival. <br/>Not Growth.”</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', marginTop: '80px', textAlign: 'left' }}>
                        {[{ title: 'Avoidance disguised as logic', desc: 'Rationalizing your way out of uncomfortable growth.' }, { title: 'Hyper-analysis as fear response', desc: 'Thinking instead of doing to maintain control.' }, { title: 'Isolation as control', desc: 'Separating yourself to avoid being influenced.' }].map((shadow, i) => (
                            <motion.div key={i} variants={fadeUp} style={{ background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(46, 125, 50, 0.2)', padding: '30px', borderRadius: '20px' }}><h4 style={{ color: '#a5d6a7', marginBottom: '15px' }}>{shadow.title}</h4><p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.95rem' }}>{shadow.desc}</p></motion.div>
                        ))}
                    </div>
                    <p style={{ marginTop: '60px', fontStyle: 'italic', color: 'rgba(255,255,255,0.4)' }}>We speak truths they rarely admit.</p>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 💎 13. RASATALA — Primal Strength
// ────────────────────────────────────────────────────────────────────────────
export function SectionRasatala() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}>
                <span className={styles.sectionTag} style={{ borderColor: '#8d6e63', color: '#d7ccc8', margin: 0 }}>Loka 13 — Rasatala</span>
            </div>
            <div className={styles.sectionInner}>
                <AnimatedSection style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle}>“Underneath the Noise — <br/>You Are Powerful.”</h2>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '60px', marginTop: '80px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', width: '100%' }}>
                            {[{ title: 'Personalized AI', icon: '🤖' }, { title: 'Tailored system', icon: '⚙️' }, { title: 'Adaptive growth engine', icon: '🚀' }, { title: 'Spiritual + Psychological integration', icon: '🧘' }].map((item, i) => (
                                <motion.div key={i} variants={fadeUp} style={{ background: 'rgba(141, 110, 99, 0.05)', border: '1px solid rgba(141, 110, 99, 0.2)', padding: '30px', borderRadius: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}><span style={{ fontSize: '2rem' }}>{item.icon}</span><span style={{ fontWeight: 800, color: '#fff' }}>{item.title}</span></motion.div>
                            ))}
                        </div>
                        <div style={{ background: 'rgba(255, 82, 82, 0.1)', border: '1px solid rgba(255, 82, 82, 0.3)', padding: '20px 40px', borderRadius: '12px', color: '#ff5252', fontFamily: 'Orbitron', fontSize: '0.9rem', letterSpacing: '1px' }}>URGENCY: LIMITED ONBOARDING CAPACITY (AI CALIBRATION SLOTS PER WEEK)</div>
                    </div>
                </AnimatedSection>
            </div>
        </section>
    );
}

// ────────────────────────────────────────────────────────────────────────────
// 🌌 14. PATALA — Universal Support
// ────────────────────────────────────────────────────────────────────────────
export function SectionPatala() {
    return (
        <section className={styles.section} style={{ background: 'transparent', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', bottom: '-200px', left: '50%', transform: 'translateX(-50%)', width: '120%', height: '800px', background: 'radial-gradient(ellipse at center, rgba(124, 77, 255, 0.1) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 1 }} />
            <div style={{ position: 'absolute', top: '40px', left: '40px', zIndex: 10 }}><span className={styles.sectionTag} style={{ borderColor: '#7c4dff', color: '#b388ff', margin: 0 }}>Loka 14 — Patala</span></div>
            <div className={styles.sectionInner} style={{ zIndex: 5 }}>
                <AnimatedSection style={{ textAlign: 'center' }}>
                    <h2 className={styles.sectionTitle} style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>“You Were Never Broken.”</h2>
                    <div style={{ background: 'rgba(255, 255, 255, 0.03)', backdropFilter: 'blur(30px)', border: '1px solid rgba(124, 77, 255, 0.2)', borderRadius: '40px', padding: '60px', maxWidth: '1000px', margin: '60px auto', textAlign: 'left' }}>
                        <h3 style={{ fontFamily: 'Orbitron', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>FINAL OFFER STACK</h3>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                            {['Personality-Specific AI', 'Personalized Growth Architecture', 'Daily Adaptive Guidance', 'Shadow Integration System', 'Alignment Tracker', '30-Day Guarantee'].map((item, i) => (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '15px' }}><span style={{ color: '#00ffa3' }}>✔</span><span style={{ color: 'rgba(255,255,255,0.9)', fontWeight: 600 }}>{item}</span></div>
                            ))}
                        </div>
                        <div style={{ marginTop: '40px', padding: '30px', background: 'rgba(255, 215, 0, 0.05)', borderRadius: '20px', border: '1px solid rgba(255, 215, 0, 0.2)' }}><p style={{ color: '#ffd700', fontWeight: 800, textAlign: 'center' }}>BONUS: FOUNDING MEMBER ACCESS (PRICE LOCKED FOREVER)</p></div>
                    </div>
                    <div style={{ marginTop: '40px' }}><button className={styles.gradientFlowBtn} onClick={() => playOmSound()} style={{ padding: '30px 80px', fontSize: '1.8rem', boxShadow: '0 0 50px rgba(124, 77, 255, 0.4)' }}>THE SHESHA RESET<span className={styles.ctaArrow} style={{ marginLeft: '24px' }}>→</span></button></div>
                    <p style={{ marginTop: '40px', color: 'rgba(255,255,255,0.4)', fontSize: '0.9rem' }}>Enrollment closes when calibration capacity fills.</p>
                </AnimatedSection>
            </div>
        </section>
    );
}
