"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import "./landing.css";

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
        <>
            {/* 🕉️ Shiva Background */}
            <div className="shiva-background"></div>

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
                        <h1>SpritualAI.org</h1>
                        <h1>SpritualAI.org</h1>
                        <h2 style={{
                            color: "#00bcd4",
                            textAlign: "center",
                            margin: "10px 0 0",
                            fontSize: "24px",
                            textTransform: "uppercase",
                            fontWeight: 300,
                            letterSpacing: "2px",
                            width: "100%",
                            textShadow: "0 0 10px rgba(0, 188, 212, 0.8)"
                        }}>
                            YOUR FIRST STEP TOWARDS TRANSFORMATION
                        </h2>
                    </div>
                </div>
            </div>

            {/* 🔮 MBTI Question Section */}
            <div className="mbti-container">
                <h2 className="matrix-text">DO YOU KNOW YOUR MBTI TYPE?</h2>

                <div className="button-group">
                    <a href="/MBTI/mbti.html" className="neon-btn" data-text="YES">YES</a>
                    <a href="/MBTI/test.html" className="neon-btn" data-text="NO">NO</a>
                </div>
            </div>

            {/* 🌸 Blooming Flower */}
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

            {/* 🪷 Lotus God Trigger */}
            <div style={{
                position: 'fixed',
                bottom: '20px',
                right: '20px',
                zIndex: 100
            }}>
                <a
                    href="/lotus-god"
                    style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'rgba(255, 255, 255, 0.7)',
                        fontFamily: "'Orbitron', sans-serif",
                        fontSize: '14px',
                        cursor: 'pointer',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        textShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
                        padding: '10px',
                        textDecoration: 'none'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.color = '#fff'}
                    onMouseLeave={(e) => e.currentTarget.style.color = 'rgba(255, 255, 255, 0.7)'}
                >
                    click to see lotus god
                </a>
            </div>
        </>
    );
}
