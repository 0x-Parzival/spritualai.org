"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./mobile-home-v2.module.css";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function MobileHomeV2() {
    const { user, signInWithGoogle } = useAuth();
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const starsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Star Generation
        const stars = [];
        for (let i = 0; i < 60; i++) {
            const x = Math.floor(Math.random() * window.innerWidth);
            const y = Math.floor(Math.random() * window.innerHeight);
            stars.push(`${x}px ${y}px #FFF`);
        }
        if (starsRef.current) {
            starsRef.current.style.boxShadow = stars.join(",");
        }

        // Initialize Lotus Petals (Rotation)
        // Initialize Lotus Petals (Rotation)
        const lotusSelector = ".mobile-v2-lotus";

        const segmRs = document.querySelectorAll(`${lotusSelector} .segmR`);
        segmRs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + 30 * i + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const segmLs = document.querySelectorAll(`${lotusSelector} .segmL`);
        segmLs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + -30 * (i + 1) + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const rings = document.querySelectorAll(`${lotusSelector} .ring`);
        rings.forEach((r, i) => {
            (r as HTMLElement).style.width = 200 - 50 * i + "px";
            (r as HTMLElement).style.height = 40 - 10 * i + "px";
            (r as HTMLElement).style.margin = 10 - 10 * i + "px";
        });

        // Reveal Lotus after setup
        const container = document.querySelector('.mobile-v2-lotus') as HTMLElement;
        if (container) {
            // Small delay ensures the browser has painted the transforms first
            requestAnimationFrame(() => {
                container.style.opacity = '1';
            });
        }

        // GSAP Animation (CodePen Port)
        const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
        const tl2 = gsap.timeline({ repeat: -1, yoyo: true });

        tl1.to(`${lotusSelector} .segmR`, {
            scale: .5,
            rotate: 0,
            mixBlendMode: 'darken',
            duration: 4,
            ease: 'sine.inOut',
        })
            .to(`${lotusSelector} .corolla`, {
                xPercent: -49,
                yPercent: 49,
                duration: 4,
                ease: 'sine.inOut',
            }, "<");

        tl2.to(`${lotusSelector} .segmL`, {
            scale: .5,
            rotate: 0,
            mixBlendMode: 'darken',
            duration: 4,
            ease: 'sine.inOut'
        })
            .to(`${lotusSelector} .corolla`, {
                xPercent: -49,
                yPercent: 49,
                duration: 4,
                ease: 'sine.inOut'
            }, "<");

        return () => {
            tl1.kill();
            tl2.kill();
        };
    }, []);

    return (
        <div className={styles.wrapper}>
            {/* 🌌 Background */}
            <div className={styles.bg}>
                <Image
                    src="/images/shiva_bg.png"
                    alt="Background"
                    fill
                    style={{ objectFit: 'cover', filter: 'brightness(0.2)' }}
                    quality={70}
                    priority
                />
            </div>
            <div ref={starsRef} className={styles.stars}></div>

            {/* 📱 Top Nav */}
            <nav className={styles.topNav}>
                <a href="/creator" className={styles.navLink}>
                    <Image src="/images/moon.png" width={24} height={24} alt="Creator" />
                    <span>Creator</span>
                </a>
                <button className={styles.navLink} onClick={() => setIsSidebarOpen(true)}>
                    <Image src="/images/logo.png" width={24} height={24} alt="Menu" />
                    <span>Menu</span>
                </button>
            </nav>

            {/* 🏛️ Header */}
            <header className={styles.header}>
                <div className="neon" style={{ transform: 'scale(1.35)', transformOrigin: 'top center', marginTop: '20px', marginBottom: '5px' }}>
                    <div className="title">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <h1>Spiritual AI</h1>
                            <h1>Spiritual AI</h1>
                        </div>
                    </div>
                </div>
                <div className={styles.subtitle}>YOUR FIRST STEP TOWARDS TRANSFORMATION</div>
            </header>

            {/* 🔮 Center Content */}
            <main className={styles.main}>
                {/* Lotus */}
                <div className={styles.lotusBox}>
                    <a href="/lotus-god" style={{ display: 'block', textDecoration: 'none' }}>
                        <div className="flower-container mobile-v2-lotus" style={{
                            transform: 'scale(0.7)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            height: '150px',
                            width: '200px',
                            opacity: 0,
                            transition: 'opacity 0.5s ease-in-out'
                        }}>
                            <div className="corolla">
                                <div className="segmL"></div>
                                <div className="segmR"></div>
                                <div className="segmR"></div>
                                <div className="segmR"></div>
                                <div className="segmR"></div>
                                <div className="segmL"></div>
                                <div className="segmL"></div>
                            </div>
                            <div className="rings">
                                <div className="ring"></div>
                                <div className="ring"></div>
                                <div className="ring"></div>
                            </div>
                        </div>
                    </a>
                </div>

                {/* Question */}
                <div className={styles.questionBox}>
                    <h2>DO YOU KNOW YOUR<br />PERSONALITY TYPE?</h2>
                    <div className={styles.btnGroup}>
                        <a href="/MBTI" className={styles.btnYes}>YES</a>
                        <a href="/login" className={styles.btnNo}>NO</a>
                    </div>

                    <a href="/lotus-god" className={styles.lotusLink}>click to see lotus god</a>
                </div>
            </main>



            {/* Sidebar */}
            {isSidebarOpen && (
                <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)}>
                    <div className={styles.sidebar} onClick={e => e.stopPropagation()}>
                        <div className={styles.sidebarHeader}>
                            <h3>Menu</h3>
                            <button onClick={() => setIsSidebarOpen(false)}>×</button>
                        </div>

                        <div className={styles.sidebarLinks}>
                            {/* PROFILE SECTION MOBILE */}
                            <div style={{ marginBottom: '20px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '15px' }}>
                                {user ? (
                                    <Link href="/profile" className={styles.sidebarLink} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', justifyContent: 'center' }}>
                                        <span>👤</span> My Profile
                                    </Link>
                                ) : (
                                    <button onClick={() => signInWithGoogle('/')} className={styles.sidebarLink} style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '8px', width: '100%', justifyContent: 'center' }}>
                                        <span>👤</span> MY PROFILE
                                    </button>
                                )}
                            </div>

                            <Link href="/mission" className={styles.sidebarLink} style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)', justifyContent: 'center', color: '#FCD34D' }}>
                                <span>🚀</span> Our Mission
                            </Link>

                            <h4 style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: '#6b7280', marginBottom: '10px', textAlign: 'center' }}>Contact Us</h4>

                            <a href="https://wa.me/7457852306" target="_blank" className={styles.sidebarLink}>
                                <span>💬</span> WhatsApp
                            </a>
                            <a href="mailto:admin@spiritualai.store" className={styles.sidebarLink}>
                                <span>✉️</span> Email
                            </a>
                            <a href="https://discord.gg/sF9V5rX3bH" target="_blank" className={styles.sidebarLink}>
                                <span>🎮</span> Discord
                            </a>
                            <a href="https://www.instagram.com/spiritual_ai.official/" target="_blank" className={styles.sidebarLink}>
                                <span>📸</span> Instagram
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
