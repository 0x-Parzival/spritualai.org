"use client";

import { useEffect } from "react";
import gsap from "gsap";

export default function LotusAnimation() {
    useEffect(() => {
        // ---------------- LOTUS ANIMATION (Desktop - CodePen Port) ----------------
        // Scoped to desktop view to match MobileHomeV2 behavior
        const desktopLotusSelector = ".desktop-view .flower-container";

        // Initialize Lotus Petals (Rotation)
        const segmRs = document.querySelectorAll(`${desktopLotusSelector} .segmR`);
        segmRs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + 30 * i + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const segmLs = document.querySelectorAll(`${desktopLotusSelector} .segmL`);
        segmLs.forEach((s, i) => {
            (s as HTMLElement).style.transform = "rotate(" + -30 * (i + 1) + "deg)";
            (s as HTMLElement).style.transformOrigin = "bottom left";
        });

        const rings = document.querySelectorAll(`${desktopLotusSelector} .ring`);
        rings.forEach((r, i) => {
            (r as HTMLElement).style.width = 200 - 50 * i + "px";
            (r as HTMLElement).style.height = 40 - 10 * i + "px";
            (r as HTMLElement).style.margin = 10 - 10 * i + "px";
        });

        const tl1 = gsap.timeline({ repeat: -1, yoyo: true });
        const tl2 = gsap.timeline({ repeat: -1, yoyo: true });

        tl1.to(`${desktopLotusSelector} .segmR`, {
            scale: .5,
            rotate: 0,
            mixBlendMode: 'darken',
            duration: 4,
            ease: 'sine.inOut',
        })
            .to(`${desktopLotusSelector} .corolla`, {
                xPercent: -49,
                yPercent: 49,
                duration: 4,
                ease: 'sine.inOut',
            }, "<");

        tl2.to(`${desktopLotusSelector} .segmL`, {
            scale: .5,
            rotate: 0,
            mixBlendMode: 'darken',
            duration: 4,
            ease: 'sine.inOut'
        })
            .to(`${desktopLotusSelector} .corolla`, {
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

    return null; // This component handles side-effects only (animations)
}
