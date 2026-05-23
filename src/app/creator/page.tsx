'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './creator.module.css';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';

import ElevatorBackground from '@/components/artistic/ElevatorBackground';

const ParallaxCard = () => {
    const cardRef = useRef<HTMLDivElement>(null);
    const layersRef = useRef<(HTMLDivElement | null)[]>([]);

    const applyParallax = (x: number, y: number) => {
        const tiltY = (x - 0.5) * 60;
        const rotateZ = (x - 0.5) * 20; // Increased rotation range

        layersRef.current.forEach((layer, index) => {
            if (!layer) return;
            // Background moves less than foreground for depth
            const depthX = index === 0 ? 25 : 65;
            const depthY = index === 0 ? 15 : 35;
            const moveX = (x - 0.5) * depthX;
            const moveY = (y - 0.5) * depthY;
            
            // Background (0) does not rotate. Character (1) gets both Y-tilt and Z-rotation.
            const rotation = index === 1 
                ? `rotateY(${tiltY}deg) rotateZ(${rotateZ}deg)` 
                : '';
            
            layer.style.transform = `translate(${moveX}px, ${moveY}px) ${rotation}`;
        });
    };

    useEffect(() => {
        const handleGlobalMouseMove = (e: MouseEvent) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            applyParallax(x, y);
        };

        window.addEventListener('mousemove', handleGlobalMouseMove);
        return () => window.removeEventListener('mousemove', handleGlobalMouseMove);
    }, []);

    return (
        <div className={styles.card} ref={cardRef}>
            <div className={styles.parallaxLayer} ref={el => { layersRef.current[0] = el }} style={{ zIndex: 0 }}>
                <img src="/creator_assets/bg_absolute_final.png" alt="background" />
            </div>
            <div className={styles.parallaxLayer} ref={el => { layersRef.current[1] = el }} style={{ zIndex: 1 }}>
                <img src="/creator_assets/character.png" alt="character" />
            </div>
            <div className={styles.cardContent}>
                <h1>Patronus</h1>
            </div>
        </div>
    );
};

const CreatorPage = () => {
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [maximized, setMaximized] = useState(false);
    const [currentMeImage, setCurrentMeImage] = useState("/images/me.png");
    const [glitchActive, setGlitchActive] = useState(false);

    useEffect(() => {
        if (activePopup !== 'about') {
            setGlitchActive(false);
            setCurrentMeImage("/images/me.png");
            return;
        }

        const images = ["/images/me.png", "/images/me_krishna.png", "/images/me_shiv.png", "/images/me_ai.png", "/images/me_buddha.png", "/images/me_confucius.png", "/images/me_jesus.png", "/images/me_mahavira.png", "/images/me_nanak.png", "/images/me_zoroaster.png"];
        let currentIndex = 0;
        const initialDelay = setTimeout(() => {
            const interval = setInterval(() => {
                setGlitchActive(true);
                setTimeout(() => {
                    currentIndex = (currentIndex + 1) % images.length;
                    setCurrentMeImage(images[currentIndex]);
                }, 150);
                setTimeout(() => setGlitchActive(false), 300);
            }, 3000);
            return () => clearInterval(interval);
        }, 3000);
        return () => {
            clearTimeout(initialDelay);
            setGlitchActive(false);
            setCurrentMeImage("/images/me.png");
        };
    }, [activePopup]);

    const togglePopup = (modal: string) => {
        setActivePopup(activePopup === modal ? null : modal);
        setMaximized(false);
    };

    const closePopup = () => setActivePopup(null);

    const timelineEvents = [
        { date: "Childhood - 2014", title: "Kid with a Calculator Brain", desc: "Long before I wrote code, I was obsessed with patterns. At age 10, I won a State Level Abacus Competition." },
        { date: "2020 - 2021", title: "The Internet Woke Me Up", desc: "While the world was locked down, I went online. I got my first Google certification and started doing graphic design." },
        { date: "2021 - 2022", title: "Cybersecurity & Fast Cars", desc: "I dive into cybersecurity to learn trust and vulnerability. Later, I helped IIT Delhi students build a Formula 1 car." },
        { date: "2022 - 2023", title: "Trying Literally Everything", desc: "Designed shoes. Made a web series. Learned chess, sketching, and beatboxing. Triple check." },
        { date: "2023", title: "Upgrading the Hardware", desc: "I realized my brain needed a better vessel, so I focused on my body. Less motivation, more discipline." },
        { date: "Era of Rhythm", title: "Flute Beatboxing", desc: "I discovered I could play the flute and beatbox at the same time. Music became my meditation." },
        { date: "2023 - 2024", title: "Jedi Mind Tricks (Gesture AI)", desc: "I built Gesture AI. Now I can control laptops and write in the air just by waving my hands." },
        { date: "2024", title: "The Year Life Hit Hard", desc: "Faced personal loss and illness. Losing my grandmother forced me to slow down and heal." },
        { date: "2024 - 2026", title: "Spiritual Intelligence Meets AI", desc: "Meditation as an upgrade. Realized AI is a mirror for consciousness. Built Spiritual AI." },
        { date: "2026", title: "Right Now", desc: "A conscious creator building cool systems. My goal isn't just efficiency, it's evolution." }
    ];

    return (
        <>
            <ElevatorBackground />
            <div className={styles.container}>
                <Link href="/" className={styles.backLink}>⬅ Back to Home</Link>
                <div className={styles.logoContainer}>
                    <img src="/images/logo.png" alt="Spiritual AI Logo" className={styles.logoImg} />
                </div>

                <section className={styles.section}>
                    <ParallaxCard />
                    <div style={{ width: '200px', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(0, 229, 255, 0.5), transparent)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '8px', height: '8px', border: '1px solid #00e5ff', rotate: '45deg', background: '#0a0a14' }}></div>
                    </div>
                    <div className={styles.iconContainer}>
                        <div className={styles.iconWrapper} onClick={() => togglePopup('about')}>
                            <div className={`${styles.iconBox} ${styles.aboutIcon}`} title="About Me">👤</div>
                            <span className={styles.buttonLabel}>WHO AM I?</span>
                        </div>
                        <Link href="/images/portfolio/index.html" target="_blank" className={styles.resumeLinkWrapper}>
                            <div className={styles.iconWrapper}>
                                <div className={`${styles.iconBox} ${styles.portfolioIcon}`} title="Portfolio">🌐</div>
                                <span className={styles.buttonLabel}>PORTFOLIO</span>
                            </div>
                        </Link>
                        <div className={styles.iconWrapper} onClick={() => togglePopup('projects')}>
                            <div className={`${styles.iconBox} ${styles.projectsIcon}`} title="Projects">💻</div>
                            <span className={styles.buttonLabel}>CREATIONS</span>
                        </div>
                        <div className={styles.iconWrapper} onClick={() => togglePopup('testimonial')}>
                            <div className={`${styles.iconBox} ${styles.testimonialIcon}`} title="Highlights">📜</div>
                            <span className={styles.buttonLabel}>HIGHLIGHTS</span>
                        </div>
                        <div className={styles.iconWrapper} onClick={() => togglePopup('contact')}>
                            <div className={`${styles.iconBox} ${styles.contactIcon}`} title="Contact">📧</div>
                            <span className={styles.buttonLabel}>CONNECT</span>
                        </div>
                        <Link href="/resume" target="_blank" className={styles.resumeLinkWrapper}>
                            <div className={styles.iconWrapper}>
                                <div className={`${styles.iconBox} ${styles.resumeIcon}`} title="Resume">📄</div>
                                <span className={styles.buttonLabel}>DOSSIER</span>
                            </div>
                        </Link>
                    </div>
                </section>

                <AnimatePresence>
                    {activePopup === 'about' && (
                        <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className={styles.popupContainer}>
                                <div className={styles.popupHeader}>
                                    <span>Who Am I?</span>
                                    <div className={styles.buttonContainer}>
                                        <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                        <button className={`${styles.circleBtn} ${styles.yellow}`} onClick={() => setMaximized(false)}></button>
                                        <button className={`${styles.circleBtn} ${styles.green}`} onClick={() => setMaximized(!maximized)}></button>
                                    </div>
                                </div>
                                <div className={styles.popupBody}>
                                    <div className={styles.aboutContainer}>
                                        <div className={`${styles.imgFrame} ${glitchActive ? styles.glitchActive : ''}`}><img src={currentMeImage} alt="Keshav" /></div>
                                        <div className={styles.aboutContent}>
                                            <h1 className={styles.aboutTitle}>Keshav Baliyan</h1>
                                            <div className={styles.timeline}>
                                                {timelineEvents.map((ev, i) => (
                                                    <div key={i} className={styles.timelineItem}>
                                                        <div className={styles.timelineDate}>{ev.date}</div>
                                                        <div className={styles.timelineContent}><strong>{ev.title}</strong>: {ev.desc}</div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {activePopup === 'projects' && (
                        <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className={styles.popupContainer}>
                                <div className={styles.popupHeader}>
                                    <span>Creations</span>
                                    <div className={styles.buttonContainer}>
                                        <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                        <button className={`${styles.circleBtn} ${styles.green}`} onClick={() => setMaximized(!maximized)}></button>
                                    </div>
                                </div>
                                <div className={styles.popupBody}>
                                    <div className={styles.projectsGrid}>
                                        <a href="https://spritualai.org" target="_blank" className={styles.projectCard}>
                                            <img src="/creator_assets/spiritualai.png" alt="Spiritual AI" />
                                            <div className={styles.projectTitle}>Spiritual AI</div>
                                            <div className={styles.projectDesc}>Bridging spirituality and AI.</div>
                                        </a>
                                        <a href="https://github.com/0x-Parzival/kalki1" target="_blank" className={styles.projectCard}>
                                            <img src="/creator_assets/kalkios.png" alt="KalkiOS" />
                                            <div className={styles.projectTitle}>KalkiOS</div>
                                            <div className={styles.projectDesc}>AI Operating System for Satya Yuga.</div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {activePopup === 'testimonial' && (
                        <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className={styles.popupContainer}>
                                <div className={styles.popupHeader}>
                                    <span>Highlights</span>
                                    <div className={styles.buttonContainer}>
                                        <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                    </div>
                                </div>
                                <div className={styles.popupBody}>
                                    <h1>Vibe Stories</h1>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        <li style={{ marginBottom: '10px' }}><a href="https://www.instagram.com/stories/highlights/18015614864520376/" target="_blank" style={{ color: '#a2ea37' }}>✨ Vibes Story Vol. 1</a></li>
                                        <li style={{ marginBottom: '10px' }}><a href="https://www.instagram.com/stories/highlights/18077547250593664/" target="_blank" style={{ color: '#a2ea37' }}>📖 Comic Book Short Stories</a></li>
                                    </ul>
                                </div>
                            </div>
                        </motion.div>
                    )}
                    {activePopup === 'contact' && (
                        <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <div className={styles.popupContainer}>
                                <div className={styles.popupHeader}>
                                    <span>Contact</span>
                                    <div className={styles.buttonContainer}>
                                        <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                    </div>
                                </div>
                                <div className={styles.popupBody} style={{ textAlign: 'center' }}>
                                    <h1>Get in Touch</h1>
                                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px', fontSize: '2rem' }}>
                                        <a href="https://github.com/0x-Parzival" target="_blank">🐙</a>
                                        <a href="https://www.instagram.com/heyyy_keshav/" target="_blank">📸</a>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default CreatorPage;
