"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import styles from "./mobile-home.module.css";

export default function MobileHome() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const starsRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // 1. Star Generation
        const stars = [];
        for (let i = 0; i < 80; i++) { // Reduced count for mobile
            const x = Math.floor(Math.random() * window.innerWidth);
            const y = Math.floor(Math.random() * window.innerHeight);
            stars.push(`${x}px ${y}px #FFF`);
        }
        if (starsRef.current) {
            starsRef.current.style.boxShadow = stars.join(",");
        }

        // 2. Lotus Animation (GSAP)
        // Targeting .mobile-lotus scoped elements
        const tl = gsap.timeline({ repeat: -1, yoyo: true });
        tl.to(".mobile-lotus .segmR", { scale: 0.5, rotate: 0, duration: 4, ease: "sine.inOut" });
        tl.to(".mobile-lotus .segmL", { scale: 0.5, rotate: 0, duration: 4, ease: "sine.inOut" });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div className={styles.mobileWrapper}>
            {/* 🌌 Backgrounds */}
            <div className={styles.bgLayer}>
                <Image src="/images/shiva_bg.png" alt="bg" fill style={{ objectFit: 'cover', filter: 'brightness(0.25)' }} quality={65} priority />
            </div>

            {/* 🌊 Ocean Removed as requested */}

            {/* ✨ Stars */}
            <div ref={starsRef} className={styles.stars}></div>

            {/* 🏛️ Header (Wavy Text) */}
            <header className={styles.header}>
                <div className="neon" style={{ transform: 'scale(1.1)', transformOrigin: 'center top', margin: '15px 0 0 0' }}>
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
            <main className={styles.mainContent}>
                <div className={styles.mbtiContainer}>
                    <h2 className={styles.mbtiQuestion}>
                        DO YOU KNOW YOUR<br />PERSONALITY TYPE?
                    </h2>
                    <div className={styles.neonActionGroup}>
                        <a href="/lotus-god" className={styles.neonActionBtn}>YES</a>
                        <a href="/login" className={styles.neonActionBtn}>NO</a>
                    </div>
                </div>

                {/* 🌸 Lotus Section */}
                <div className={styles.lotusWrapper}>
                    {/* Wrapped in specific class for mobile GSAP targeting */}
                    <div className="flower-container mobile-lotus" style={{ transform: 'scale(0.6)' }}>
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
                    <a href="/lotus-god" className={styles.lotusLink}>click to see lotus god</a>
                </div>
            </main>

            {/* 📱 Bottom Navigation */}
            <footer className={styles.bottomNav}>
                <a href="/creator" className={styles.navItem}>
                    <div className={styles.iconBox}>
                        <Image src="/images/moon.png" width={28} height={28} alt="Creator" />
                    </div>
                    <span>Creator</span>
                </a>

                <button className={styles.navItem} onClick={() => setIsSidebarOpen(true)}>
                    <div className={styles.iconBox}>
                        <Image src="/images/logo.png" width={28} height={28} alt="Menu" />
                    </div>
                    <span>Menu</span>
                </button>
            </footer>

            {/* 📨 Sidebar Overlay (Self-Contained) */}
            <div className={`${styles.sidebarOverlay} ${isSidebarOpen ? styles.active : ''}`} onClick={() => setIsSidebarOpen(false)}>
                <aside className={`${styles.sidebarPanel} ${isSidebarOpen ? styles.panelActive : ''}`} onClick={e => e.stopPropagation()}>
                    <div className={styles.sidebarHeader}>
                        <h3>Main Menu</h3>
                        <button onClick={() => setIsSidebarOpen(false)}>×</button>
                    </div>

                    <div className={styles.sidebarLinks} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '20px' }}>
                        <a href="/" className={styles.contactLink}>
                            <span>🏠</span> <div><strong>Home</strong><small>Return to roots</small></div>
                        </a>
                        <a href="/profile" className={styles.contactLink}>
                            <span>👤</span> <div><strong>Profile</strong><small>Your journey</small></div>
                        </a>
                        <a href="/mission" className={styles.contactLink}>
                            <span>🚀</span> <div><strong>Our Mission</strong><small>The vision</small></div>
                        </a>
                        <a href="/creator" className={styles.contactLink}>
                            <span>🎨</span> <div><strong>Creator</strong><small>Meet the mind</small></div>
                        </a>
                        <a href="/lotus-god" className={styles.contactLink}>
                            <span>🕉️</span> <div><strong>Lotus God</strong><small> Divine Connection</small></div>
                        </a>
                    </div>

                    <h4 style={{ color: 'rgba(255,255,255,0.4)', fontSize: '12px', textTransform: 'uppercase', letterSpacing: '2px', padding: '0 20px 15px' }}>Contact Us</h4>
                    <div className={styles.sidebarLinks}>
                        <a href="https://wa.me/7457852306" target="_blank" className={styles.contactLink}>
                            <span>💬</span> <div><strong>WhatsApp</strong><small>+7457852306</small></div>
                        </a>
                        <a href="mailto:admin@spiritualai.store" className={styles.contactLink}>
                            <span>✉️</span> <div><strong>Email</strong><small>admin@spiritualai.store</small></div>
                        </a>
                        <a href="https://discord.gg/sF9V5rX3bH" target="_blank" className={styles.contactLink}>
                            <span>🎮</span> <div><strong>Discord</strong><small>Join Community</small></div>
                        </a>
                        <a href="https://www.instagram.com/spiritual_ai.official/" target="_blank" className={styles.contactLink}>
                            <span>📸</span> <div><strong>Instagram</strong><small>@spiritual_ai.official</small></div>
                        </a>
                    </div>
                </aside>
            </div>
        </div>
    );
}
