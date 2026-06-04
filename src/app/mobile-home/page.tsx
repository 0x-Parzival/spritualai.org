"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import "./mobile-home.css";
import dynamic from 'next/dynamic';

const WavesHero = dynamic(() => import('@/components/WavesHero'), { ssr: false });

export default function MobileHome() {
    const stars2Ref = useRef<HTMLDivElement>(null);
    const stars3Ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // ---------------- STAR GENERATION ----------------
        function generateStars(element: HTMLDivElement | null, count: number, maxSize = 2000) {
            if (!element) return;
            const stars = [];
            // Reduced count for mobile performance
            const safeCount = Math.min(count, 150); 
            for (let i = 0; i < safeCount; i++) {
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

        generateStars(stars2Ref.current, 150);
        generateStars(stars3Ref.current, 150);

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

        // ---------------- LOTUS ANIMATION ----------------
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
            clearInterval(starInterval);
            tl1.kill();
            tl2.kill();
            const shootingStars = document.querySelectorAll(".shooting-star");
            shootingStars.forEach(s => s.remove());
        };
    }, []);

    return (
        <div className="mobile-home-wrapper">
            {/* 🌌 Background Elements */}
            <div className="main-background">
                <Image
                    src="/images/titleimage.png"
                    alt="Space Background"
                    fill
                    priority
                    quality={85}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div className="shiva-background">
                <Image
                    src="/images/shiva_bg.png"
                    alt="Shiva Background"
                    fill
                    quality={60}
                    style={{ objectFit: 'cover' }}
                />
            </div>
            <div id="stars2" ref={stars2Ref}></div>
            <div id="stars3" ref={stars3Ref}></div>

            {/* 🌊 Background Waves */}
            <div style={{
                position: 'fixed',
                bottom: '0',
                left: '0',
                width: '100%',
                height: '50vh',
                zIndex: -1,
                opacity: 0.8,
                pointerEvents: 'none'
            }}>
                <WavesHero variant="spiritual" />
            </div>

            {/* 🏛️ Glass Header */}
            <header className="glass-header">
                <div className="title-group">
                    <div className="wavy-title">
                        <h1>Spiritual AI</h1>
                        <h1>Spiritual AI</h1>
                    </div>
                    <p className="subtitle">YOUR FIRST STEP TOWARDS TRANSFORMATION</p>
                </div>
                <div className="moon-container">
                    <Image
                        src="/images/moon.png"
                        alt="Moon"
                        className="moon-img"
                        width={60}
                        height={60}
                        priority
                        quality={90}
                    />
                </div>
            </header>

            {/* 🔮 Question Section */}
            <main className="question-section">
                <h2 className="matrix-question">
                    <span>DO YOU KNOW YOUR</span>
                    <span>PERSONALITY TYPE?</span>
                </h2>
                <div className="button-group">
                    <a href="/MBTI/mbti.html" className="neon-btn">YES</a>
                    <a href="/cosmic-compass/" className="neon-btn">NO</a>
                </div>
            </main>

            {/* 🌸 Lotus Section */}
            <footer className="lotus-section">
                <div className="flower-container">
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
                <a href="/lotus-god" className="lotus-god-link">
                    click to see lotus god
                </a>
            </footer>
        </div>
    );
}
