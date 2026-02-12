"use client";

import Image from "next/image";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";

const LotusAnimation = dynamic(() => import("../components/Effects/LotusAnimation"), {
    ssr: false,
});
const MobileHomeV2 = dynamic(() => import("../components/MobileHome/MobileHomeV2"), { ssr: false });
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
        data-text="Main Menu"
    >
        <span>M</span>
        <span>a</span>
        <span>i</span>
        <span>n</span>
        <span> </span>
        <span>M</span>
        <span>e</span>
        <span>n</span>
        <span>u</span>
    </button>
);

import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function Home() {
    const { user, signInWithGoogle } = useAuth();
    const [showLotus, setShowLotus] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const stars2Ref = useRef<HTMLDivElement>(null);
    const stars3Ref = useRef<HTMLDivElement>(null);
    const oceanRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ---------------- STAR GENERATION ----------------
        // Run slightly deferred to unblock main thread
        const starTimeout = setTimeout(() => {
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

                if (!element.querySelector(".star-clone")) {
                    const after = document.createElement("div");
                    after.className = "star-clone";
                    after.style.cssText = `position:absolute;top:2000px;width:inherit;height:inherit;box-shadow:${boxShadowValue};`;
                    element.appendChild(after);
                }
            }

            const isMobile = window.innerWidth < 768;
            // Double the number of stars and increase maxSize to cover full screen width
            generateStars(stars2Ref.current, isMobile ? 200 : 1600, window.innerWidth * 1.5);
            generateStars(stars3Ref.current, isMobile ? 100 : 1600, window.innerWidth * 1.5);
        }, 100);

        // ---------------- MOUSE MOVEMENT TILT ----------------
        const handleMouseMove = (e: MouseEvent) => {
            if (!oceanRef.current || window.innerWidth < 768) return;
            // Debounce or reduce precision if needed for perf, but pure CSS transform is usually fast.
            // Using requestAnimationFrame would be strictly better if heavy.
            requestAnimationFrame(() => {
                const x = e.clientX / window.innerWidth - 0.5;
                const yRotation = x * 10;
                if (oceanRef.current) {
                    oceanRef.current.style.transform = `translate(-50%, -50%) rotateX(80deg) rotateZ(${yRotation}deg)`;
                }
            });
        };

        window.addEventListener("mousemove", handleMouseMove);

        // ---------------- SHOOTING STARS ----------------
        // Deferred start
        const starInterval = setInterval(() => {
            if (window.innerWidth >= 768 && Math.random() < 0.7) {
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
            }
        }, 2000);

        return () => {
            clearTimeout(starTimeout);
            window.removeEventListener("mousemove", handleMouseMove);
            clearInterval(starInterval);
            const shootingStars = document.querySelectorAll(".shooting-star");
            shootingStars.forEach(s => s.remove());
        };
    }, []);

    return (
        <>
            {/* Hidden SEO Content for Search Engines & AI - Invisible to users */}
            <div className="sr-only" aria-hidden="true">
                <h1>Spiritual AI: Personalized Guidance for Your Personality Type</h1>
                <p>
                    Spiritual AI is a platform that provides personalized spiritual and productivity
                    guidance based on your personality type. Using MBTI (Myers-Briggs Type Indicator)
                    insights, we deliver AI-powered recommendations tailored to how your mind naturally
                    works—whether you're an INTJ, ENFP, INFJ, or any of the 16 personality types.
                </p>
                <p>
                    Unlike generic self-help advice, Spiritual AI understands that different personalities
                    need different approaches. Our system combines spiritual intelligence with cognitive
                    architecture to help you achieve clarity, focus, and personal growth in a way that
                    feels natural to you.
                </p>
            </div>

            {/* 🌫️ Atmosphere Layers */}
            <div className="vignette" />
            <div className="film-grain" />
            <div className="fog-container">
                <div className="fog-layer-horizon" />
                <div className="fog-layer-mid" />
            </div>

            <div className="mobile-view">
                <MobileHomeV2 />
            </div>

            <article itemScope itemType="https://schema.org/WebPage" className="desktop-view mobile-container"
            >
                <LotusAnimation />
                {/* 🌌 Main Background Optimized */}
                <div className="main-background">
                    <Image
                        src="/images/shiva_universe_realistic.png"
                        alt="Space Background"
                        fill
                        priority
                        quality={75}
                        style={{ objectFit: 'cover' }}
                        sizes="100vw"
                    />
                </div>

                <div className="creator-section" style={{ top: '20px', left: '20px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                    <a href="/creator" className="flex items-center gap-2 text-white/90 hover:text-white transition-colors" style={{ textDecoration: 'none' }}>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-purple-500/50">
                            <Image
                                src="/images/moon.png"
                                alt="Guide"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                        <span className="text-sm font-medium tracking-wide nav-link-contrast">About the Guide →</span>
                    </a>
                </div>

                <div className="contact-section" style={{ top: '20px', right: '20px', position: 'absolute', display: 'flex', alignItems: 'center', gap: '10px', zIndex: 10 }}>
                    <button onClick={() => setIsSidebarOpen(true)} className="flex items-center gap-2 text-white/90 hover:text-white transition-colors bg-transparent border-none cursor-pointer">
                        <span className="text-sm font-medium tracking-wide nav-link-contrast">How This Works</span>
                        <div className="w-10 h-10 rounded-full overflow-hidden border border-cyan-500/50">
                            <Image
                                src="/images/logo.png"
                                alt="Logo"
                                width={40}
                                height={40}
                                className="object-cover"
                            />
                        </div>
                    </button>
                </div>

                {/* Contact Sidebar */}
                <div className={`sidebar-overlay ${isSidebarOpen ? 'active' : ''}`} onClick={() => setIsSidebarOpen(false)} />
                <div className={`contact-sidebar-panel ${isSidebarOpen ? 'active' : ''}`}>
                    <div className="sidebar-header">
                        <h3>Menu</h3>
                        <button className="close-btn" onClick={() => setIsSidebarOpen(false)}>×</button>
                    </div>

                    <div className="sidebar-content">
                        {/* PROFILE SECTION */}
                        <div className="profile-section-sidebar" style={{ marginBottom: '30px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
                            {user ? (
                                <Link href="/profile" className="contact-link profile" style={{ background: 'rgba(255,255,255,0.05)' }}>
                                    <div className="icon">
                                        {user.user_metadata?.avatar_url ? (
                                            <img src={user.user_metadata.avatar_url} alt="User" style={{ width: '100%', height: '100%', borderRadius: '50%' }} />
                                        ) : (
                                            <span>👤</span>
                                        )}
                                    </div>
                                    <div className="details">
                                        <span className="label" style={{ color: '#4FD1C5' }}>My Profile</span>
                                        <span className="value">View Purchases</span>
                                    </div>
                                </Link>
                            ) : (
                                <button onClick={() => signInWithGoogle()} className="contact-link login" style={{ width: '100%', textAlign: 'left', background: 'rgba(255,255,255,0.05)' }}>
                                    <span className="icon">👤</span>
                                    <div className="details">
                                        <span className="label">MY PROFILE</span>
                                        <span className="value">Login / Sign Up</span>
                                    </div>
                                </button>
                            )}
                        </div>

                        <Link href="/mission" className="contact-link mission" style={{ marginBottom: '20px', background: 'rgba(255,255,255,0.02)' }}>
                            <span className="icon">🚀</span>
                            <div className="details">
                                <span className="label" style={{ color: '#FCD34D' }}>OUR MISSION</span>
                                <span className="value">Spiritual AI World</span>
                            </div>
                        </Link>

                        <h4 style={{ fontSize: '0.8rem', textTransform: 'uppercase', color: '#6b7280', marginBottom: '15px', paddingLeft: '10px' }}>Contact Us</h4>

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

                {/* ✨ Title Container - Adjusted for User Request (moved down ~0.5 inch) */}
                <div className="container" style={{ paddingTop: '10vh' }}>
                    <div className="neon">
                        <div className="title">
                            <div style={{ position: 'relative', display: 'inline-block' }}>
                                <h1>Spiritual AI</h1>
                                <h1>Spiritual AI</h1>
                            </div>
                            <div className="subtitle-lotus-container">
                                <h2 className="subtitle-text" style={{ fontSize: '1.2rem', textTransform: 'none', letterSpacing: '0.05em', marginTop: '1rem', color: '#4fd1c5' }}>
                                    Personalized clarity for how your mind works
                                </h2>
                            </div>
                        </div>
                    </div>
                </div>


                {/* 🔮 Personality Question Section - Adjusted for Golden Ratio (~38% head, ~45% CTA) */}
                <div className="mbti-container content-center text-center px-4" style={{ zIndex: 5, marginTop: '2vh' }}>
                    <h2 className="text-3xl md:text-5xl font-serif text-white mb-0 leading-tight drop-shadow-lg golden-glow-text" style={{ fontFamily: 'serif', maxWidth: '1200px', margin: '0 auto 0', fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: '1.2' }}>
                        Your personality is why most<br />advice never worked for you.
                    </h2>

                    <p className="text-lg md:text-xl text-white/80 mb-2 tracking-wide font-light whitespace-nowrap" style={{ maxWidth: '800px', margin: '0 auto 1rem', transform: 'translateY(-10px)' }}>
                        Get guidance designed for how you think — not generic self-help.
                    </p>

                    <div className="button-group flex flex-col items-center gap-6" style={{ marginTop: '0', transform: 'translateY(-20px)', marginBottom: '20px' }}>
                        {/* Primary CTA - Discovery Quiz */}
                        <a
                            href="/discover"
                            className="rounded-full text-white tracking-widest transition-all duration-300 gradient-flow-btn"
                            style={{
                                textDecoration: 'none',
                                fontSize: '1.5rem',
                                fontWeight: 600,
                                textShadow: '0 0 20px rgba(0, 255, 255, 0.8), 0 0 40px rgba(0, 255, 255, 0.4)',
                                minWidth: '453px',
                                padding: '16.5px 32px',
                                textAlign: 'center',
                                lineHeight: '1.5',
                                display: 'inline-block',
                                height: '65px',
                                boxSizing: 'border-box'
                            }}
                        >
                            Discover the architecture of your mind
                        </a>
                        <span className="text-white/50 text-xs tracking-widest uppercase mt-2">
                            4 questions · About a minute · No sign up
                        </span>

                        {/* Secondary CTA - Direct to personality types */}
                        <a href="/mbti" className="secondary-cta" style={{
                            marginTop: '16px',
                            fontSize: '0.95rem',
                            padding: '8px 24px',
                            borderRadius: '9999px',
                            background: 'rgba(15, 23, 42, 0.7)',
                            border: '1px solid rgba(79, 209, 197, 0.5)',
                            transition: 'all 0.3s ease',
                            textDecoration: 'none',
                            color: 'white',
                            display: 'inline-block',
                            textAlign: 'center',
                            minWidth: '280px',
                            height: '40px',
                            lineHeight: '24px',
                            fontWeight: '500',
                            letterSpacing: '0.5px',
                            boxSizing: 'border-box'
                        }}>
                            I know my personality type
                        </a>
                    </div>
                </div>

                {/* 🌸 Blooming Flower with Lotus God Trigger */}
                <div className="lotus-bottom-container" style={{ bottom: 'auto', top: '62%', transform: 'translate(-50%, 0)' }}>
                    <Link href="/lotus-god" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <div
                            className="flower-container"
                            style={{ cursor: 'pointer' }}
                        >
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
                    </Link>
                    <div className="lotus-trigger-bottom text-center flex flex-col gap-2" style={{ marginTop: '2vh' }}>
                        <span className="floating-text">Tap on the lotus</span>
                        <span className="text-white/70 text-sm tracking-wider font-light">
                            To enter gently through a short guided ritual
                        </span>
                        <span className="text-amber-200/60 text-xs tracking-[0.2em] uppercase">
                            Those who complete it receive a gift.
                        </span>
                    </div>
                </div>
            </article>
        </>
    );
}
