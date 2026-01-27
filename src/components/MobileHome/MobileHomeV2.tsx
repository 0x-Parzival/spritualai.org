"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
// We reuse global effects from landing.css if needed, but defining our own structure for safety
import styles from "./mobile-home-v2.module.css";

export default function MobileHomeV2() {
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

        // Initialize Lotus Petals (Rotation) - Critical for shape
        const segmRs = document.querySelectorAll(".mobile-v2-lotus .segmR");
        segmRs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + 30 * i + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const segmLs = document.querySelectorAll(".mobile-v2-lotus .segmL");
        segmLs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + -30 * (i + 1) + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const rings = document.querySelectorAll(".mobile-v2-lotus .ring");
        rings.forEach((r, i) => {
            (r as HTMLElement).style.width = 200 - 50 * i + "px";
            (r as HTMLElement).style.height = 40 - 10 * i + "px";
            (r as HTMLElement).style.margin = 10 - 10 * i + "px";
        });

        // GSAP for Lotus (Scoped to .mobile-v2-lotus)
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(".mobile-v2-lotus .segmR", { scale: 0.5, rotate: 0, duration: 4, ease: "sine.inOut" });
        tl.to(".mobile-v2-lotus .segmL", { scale: 0.5, rotate: 0, duration: 4, ease: "sine.inOut" });

        return () => {
            tl.kill();
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

            {/* 🏛️ Header */}
            <header className={styles.header}>
                <div className="neon" style={{ transform: 'scale(0.8)', transformOrigin: 'top center', marginTop: '10px' }}>
                    <div className="title">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <h1>Spiritual AI</h1>
                            <h1>Spiritual AI</h1>
                        </div>
                    </div>
                </div>
                {/* Removed subtitle as per 'clean' design or keep small? User said 'keep wave effect on spiritual ai' - focusing on that. */}
                <div className={styles.subtitle}>YOUR FIRST STEP TOWARDS TRANSFORMATION</div>
            </header>

            {/* 🔮 Center Content */}
            <main className={styles.main}>
                {/* Lotus - Centered primarily */}
                <div className={styles.lotusBox}>
                    <a href="/lotus-god" style={{ display: 'block', textDecoration: 'none' }}>
                        <div className="flower-container mobile-v2-lotus" style={{
                            transform: 'scale(0.7)',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative', // Keep it relative to flow
                            height: '150px', // Explicit height
                            width: '200px'
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
                    <div className={styles.actions}>
                        <a href="/MBTI" className={styles.btnYes}>YES</a>
                        <a href="/cosmic-compass/" className={styles.btnNo}>NO</a>
                    </div>

                    <a href="/lotus-god" className={styles.lotusLink}>click to see lotus god</a>
                </div>
            </main>

            {/* 📱 Footer Nav */}
            <footer className={styles.footer}>
                <a href="/creator" className={styles.navLink}>
                    <Image src="/images/moon.png" width={24} height={24} alt="Creator" />
                    <span>Creator</span>
                </a>
                <button className={styles.navLink} onClick={() => setIsSidebarOpen(true)}>
                    <Image src="/images/logo.png" width={24} height={24} alt="Contact" />
                    <span>Contact</span>
                </button>
            </footer>

            {/* Sidebar (Same Functional Implementation) */}
            {isSidebarOpen && (
                <div className={styles.overlay} onClick={() => setIsSidebarOpen(false)}>
                    <div className={styles.sidebar} onClick={e => e.stopPropagation()}>
                        <div className={styles.sidebarHeader}>
                            <h3>Contact Us</h3>
                            <button onClick={() => setIsSidebarOpen(false)}>×</button>
                        </div>
                        <div className={styles.sidebarLinks}>
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
