"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import "./landing.css";
import "./mobile.css";

const NeonButton = () => (
    <a
        href="/creator"
        className="neon-button"
        data-text="Connect with Creator"
    >
        <span>C</span>
        <span>o</span>
        <span>n</span>
        <span>n</span>
        <span>e</span>
        <span>c</span>
        <span>t</span>
        <span> </span>
        <span>w</span>
        <span>i</span>
        <span>t</span>
        <span>h</span>
        <span> </span>
        <span>C</span>
        <span>r</span>
        <span>e</span>
        <span>a</span>
        <span>t</span>
        <span>o</span>
        <span>r</span>
    </a>
);

interface ContactButtonProps {
    onClick: () => void;
}

const ContactButton = ({ onClick }: ContactButtonProps) => (
    <button
        onClick={onClick}
        className="neon-button"
        style={{ cursor: 'pointer', background: 'transparent' }} // Ensure button look
        data-text="Contact Us"
    >
        <span>C</span>
        <span>o</span>
        <span>n</span>
        <span>t</span>
        <span>a</span>
        <span>c</span>
        <span>t</span>
        <span> </span>
        <span>U</span>
        <span>s</span>
    </button>
);

export default function Home() {
    const [showLotus, setShowLotus] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const stars2Ref = useRef<HTMLDivElement>(null);
    const stars3Ref = useRef<HTMLDivElement>(null);
    const oceanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ---------------- STAR GENERATION ----------------
        function generateStars(element: HTMLDivElement | null, count: number, maxSize = 2000) {
            if (!element) return;

            const stars = [];
            for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * maxSize);
                const y = Math.floor(Math.random() * maxSize);
                stars.push(`${x}px ${y}px #FFF`);
            }

            const boxShadowValue = stars.join(",");
            element.style.boxShadow = boxShadowValue;

            // Create the 'after' equivalent element for the animation loop
            // We check if it already exists to avoid duplicates on re-renders
            if (!element.querySelector(".star-clone")) {
                const after = document.createElement("div");
                after.className = "star-clone";
                after.style.cssText = `position:absolute;top:2000px;width:inherit;height:inherit;box-shadow:${boxShadowValue};`;
                element.appendChild(after);
            }
        }

        generateStars(stars2Ref.current, 800);
        generateStars(stars3Ref.current, 800);

        // ---------------- MOUSE MOVEMENT TILT ----------------
        const handleMouseMove = (e: MouseEvent) => {
            if (!oceanRef.current) return;
            const x = e.clientX / window.innerWidth - 0.5;
            const yRotation = x * 10;
            oceanRef.current.style.transform = `translate(-50%, -50%) rotateX(80deg) rotateZ(${yRotation}deg)`;
        };

        window.addEventListener("mousemove", handleMouseMove);

        // ---------------- SHOOTING STARS ----------------
        const createShootingStar = () => {
            const star = document.createElement("div");
            star.className = "shooting-star";
            document.body.appendChild(star);

            const startX = Math.random() * window.innerWidth;
            const startY = Math.random() * (window.innerHeight / 2);

            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            star.style.opacity = "1";

            const travelX = 300 + Math.random() * 300;
            const travelY = 300 + Math.random() * 300;
            const duration = 1000 + Math.random() * 1000;

            star.animate([
                { transform: "translate(0,0) rotate(45deg)", opacity: 1 },
                { transform: `translate(${travelX}px,${travelY}px) rotate(45deg)`, opacity: 0 }
            ], { duration, easing: "ease-out" });

            setTimeout(() => {
                if (star.parentNode) star.parentNode.removeChild(star);
            }, duration);
        };

        const starInterval = setInterval(() => {
            if (Math.random() < 0.7) createShootingStar();
        }, 2000);

        // ---------------- FLOWER ANIMATION ----------------
        // Setup initial states
        const segmRs = document.querySelectorAll(".segmR");
        segmRs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + 30 * i + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const segmLs = document.querySelectorAll(".segmL");
        segmLs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + -30 * (i + 1) + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const rings = document.querySelectorAll(".ring");
        rings.forEach((r, i) => {
            (r as HTMLElement).style.width = 200 - 50 * i + "px";
            (r as HTMLElement).style.height = 40 - 10 * i + "px";
            (r as HTMLElement).style.margin = 10 - 10 * i + "px";
        });

        const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
        const tl2 = gsap.timeline({ repeat: -1, yoyo: true });

        tl1.to(".segmR", { scale: 0.5, rotate: 0, duration: 4, ease: "sine.inOut" });
        tl2.to(".segmL", { scale: 0.5, rotate: 0, duration: 4, ease: "sine.inOut" });

        // Cleanup
        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(starInterval);
            tl1.kill();
            tl2.kill();
            // Optional: remove shooting stars that might still be valid
            const shootingStars = document.querySelectorAll(".shooting-star");
            shootingStars.forEach(s => s.remove());
        };
    }, []);

    return (
        <div className="mobile-container">
            {/* 🌌 Main Background Optimized */}
            <div className="main-background">
                <Image
                    src="/images/shiva_universe_realistic.png"
                    alt="Space Background"
                    fill
                    priority
                    quality={85}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            <div className="creator-section">
                <a href="/creator">
                    <Image
                        src="/images/moon.png"
                        alt="Moon"
                        className="moon-img"
                        width={180}
                        height={180}
                        priority
                        quality={90}
                        style={{ cursor: 'pointer' }}
                    />
                </a>
                <NeonButton />
            </div>

            <div className="contact-section">
                <div onClick={() => setIsSidebarOpen(true)} style={{ cursor: 'pointer' }}>
                    <Image
                        src="/images/logo.png"
                        alt="Logo"
                        className="logo-img"
                        width={180}
                        height={180}
                        priority
                        quality={90}
                    />
                </div>
                <ContactButton onClick={() => setIsSidebarOpen(true)} />
            </div>

            {/* Contact Sidebar */}
            <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
            <div className={`contact-sidebar-panel ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-header">
                    <h3>Contact Us</h3>
                    <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>×</button>
                </div>
                <div className="sidebar-content">
                    <a href="https://wa.me/7457852306" target="_blank" rel="noopener noreferrer" className="contact-link whatsapp">
                        <span className="icon">💬</span>
                        <div className="details">
                            <span className="label">WhatsApp</span>
                            <span className="value">+7457852306</span>
                        </div>
                    </a>

                    <a href="mailto:admin@spiritualai.store" className="contact-link email">
                        <span className="icon">✉️</span>
                        <div className="details">
                            <span className="label">Email</span>
                            <span className="value">admin@spiritualai.store</span>
                        </div>
                    </a>

                    <a href="https://discord.gg/sF9V5rX3bH" target="_blank" rel="noopener noreferrer" className="contact-link discord">
                        <span className="icon">🎮</span>
                        <div className="details">
                            <span className="label">Discord</span>
                            <span className="value">Join Community</span>
                        </div>
                    </a>

                    <a href="https://www.instagram.com/spiritual_ai.official/" target="_blank" rel="noopener noreferrer" className="contact-link instagram">
                        <span className="icon">📸</span>
                        <div className="details">
                            <span className="label">Instagram</span>
                            <span className="value">@spiritual_ai.official</span>
                        </div>
                    </a>
                </div>
            </div>

            {/* 🕉️ Shiva Background Optimized */}
            <div className="shiva-background">
                <Image
                    src="/images/shiva_bg.png"
                    alt="Shiva Background"
                    fill
                    quality={60}
                    style={{ objectFit: 'cover' }}
                />
            </div>

            {/* 🌌 Starry Background */}
            <div id="stars2" ref={stars2Ref}></div>
            <div id="stars3" ref={stars3Ref}></div>

            {/* 🌊 Ocean */}
            <main className="ocean-main">
                <div className="ocean" ref={oceanRef}>
                    <div className="chunks"></div>
                </div>
            </main>

            {/* ✨ Title */}
            <div className="container">
                <div className="neon">
                    <div className="title">
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                            <h1>Spiritual AI</h1>
                            <h1>Spiritual AI</h1>
                        </div>
                        <div className="subtitle-lotus-container">
                            <h2 className="subtitle-text">
                                YOUR FIRST STEP TOWARDS TRANSFORMATION
                            </h2>
                        </div>
                    </div>
                </div>
            </div>

            {/* 🔮 Personality Question Section */}
            <div className="mbti-container">
                <h2 className="matrix-text" style={{ whiteSpace: 'nowrap' }}>DO YOU KNOW YOUR PERSONALITY TYPE?</h2>

                <div className="button-group">
                    <a href="/MBTI/mbti.html" className="neon-btn" data-text="YES">YES</a>
                    <a href="/cosmic-compass/" className="neon-btn" data-text="NO">NO</a>
                </div>
            </div>

            {/* 🌸 Blooming Flower with Lotus God Trigger */}
            <a href="/lotus-god" className="lotus-link-wrapper">
                <div className="lotus-bottom-container">
                    <div className="flower-container">
                        <main>
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
                        </main>
                    </div>
                    <div className="lotus-trigger-bottom">
                        <span className="lotus-trigger-link">
                            click to see lotus god
                        </span>
                    </div>
                </div>
            </a>
        </div>
    );
}
