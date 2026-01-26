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

export default function Home() {
    const [showLotus, setShowLotus] = useState(false);
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
                <Image
                    src="/images/moon.png"
                    alt="Moon"
                    className="moon-img"
                    width={120}
                    height={120}
                    priority
                    quality={90}
                />
                <NeonButton />
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
                        <Image
                            src="/images/logo.png"
                            alt="Spiritual AI Logo"
                            width={150}
                            height={150}
                            className="main-logo"
                            priority
                            style={{ marginBottom: '20px', filter: 'drop-shadow(0 0 20px rgba(0, 188, 255, 0.8))' }}
                        />
                        <h1>Spiritual AI</h1>
                        <h1>Spiritual AI</h1>
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
                    <a href="/lotus-god" className="lotus-trigger-link">
                        click to see lotus god
                    </a>
                </div>
            </div>
        </div>
    );
}
