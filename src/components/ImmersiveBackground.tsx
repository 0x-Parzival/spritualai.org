/* src/components/ImmersiveBackground.tsx */
/* Shared cinematic background matching the home page aesthetic */
/* Layers: 1) Ocean bubble canvas 2) Starfield warp 3) Noise grain 4) Vignette */

"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export default function ImmersiveBackground({ variant = "default" }: { variant?: "default" | "profile" | "admin" }) {
  const { scrollYProgress } = useScroll();
  const oceanRef = useRef<HTMLCanvasElement>(null);
  const starRef = useRef<HTMLCanvasElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  /* ── Ocean Bubbles Layer ── */
  useEffect(() => {
    if (!mounted) return;
    const canvas = oceanRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const bubbles: { x: number; y: number; r: number; speed: number; opacity: number }[] = [];
    for (let i = 0; i < 60; i++) {
      bubbles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 2.5 + 0.5,
        speed: Math.random() * 0.4 + 0.1,
        opacity: Math.random() * 0.35 + 0.05,
      });
    }

    let frame: number;
    const render = () => {
      ctx.clearRect(0, 0, w, h);
      for (const b of bubbles) {
        b.y -= b.speed;
        b.x += Math.sin(b.y * 0.008) * 0.3;
        if (b.y < -10) { b.y = h + 10; b.x = Math.random() * w; }
        ctx.beginPath();
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(render);
    };
    render();

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [mounted]);

  /* ── Starfield Layer ── */
  useEffect(() => {
    if (!mounted) return;
    const canvas = starRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = window.innerWidth;
    let h = window.innerHeight;
    let cx = w * 0.5;
    let h2 = h * 0.5;
    canvas.width = w;
    canvas.height = h;

    const NUM = 100;
    const SPEED = 1.8;
    const FL = 500;
    class P { x: number; y: number; z: number; pz: number;
      constructor() { this.x = Math.random() * w; this.y = Math.random() * h; this.z = Math.random() * 1500 + 500; this.pz = this.z; }
      reset() { this.x = Math.random() * w; this.y = Math.random() * h; this.z = Math.random() * 1500 + 500; this.pz = this.z; }
    }
    const ps: P[] = Array.from({ length: NUM }, () => { const p = new P(); p.z -= 500 * Math.random(); return p; });

    let frame: number;
    const loop = () => {
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = "#fff";
      ctx.beginPath();
      for (const p of ps) {
        p.pz = p.z;
        p.z -= SPEED;
        if (p.z <= 0) { p.reset(); continue; }
        const rx = p.x - cx, ry = p.y - h2;
        const f = FL / p.z, pf = FL / p.pz;
        const x = cx + rx * f, y = h2 + ry * f;
        const px = cx + rx * pf, py = h2 + ry * pf;
        const r = 0.4 * f, pr = 0.4 * pf;
        const a = Math.atan2(py - y, px - x);
        const hp = Math.PI * 0.5;
        ctx.moveTo(px + pr * Math.cos(a + hp), py + pr * Math.sin(a + hp));
        ctx.arc(px, py, pr, a + hp, a - hp, true);
        ctx.lineTo(x + r * Math.cos(a - hp), y + r * Math.sin(a - hp));
        ctx.arc(x, y, r, a - hp, a + hp, true);
        ctx.closePath();
      }
      ctx.fill();
      frame = requestAnimationFrame(loop);
    };
    loop();

    const resize = () => { w = canvas.width = window.innerWidth; h = canvas.height = window.innerHeight; cx = w * 0.5; h2 = h * 0.5; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(frame); window.removeEventListener("resize", resize); };
  }, [mounted]);

  /* ── Scroll-responsive gradient ── */
  const bgGrad = useTransform(scrollYProgress, [0, 1],
    variant === "admin"
      ? ["#030308", "#060612"]
      : variant === "profile"
      ? ["#03030a", "#0a0a1f"]
      : ["#050510", "#0a0a1f"]
  );

  if (!mounted) return <div style={{ position: "fixed", inset: 0, background: "#030303", zIndex: 0 }} />;

  return (
    <motion.div
      style={{ position: "fixed", inset: 0, zIndex: 0, background: bgGrad as any }}
    >
      {/* Layer 1: Ocean bubbles */}
      <canvas ref={oceanRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.6 }} />

      {/* Layer 2: Starfield */}
      <canvas ref={starRef} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.15 }} />

      {/* Layer 3: Radial vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at 50% 30%, transparent 0%, rgba(0,0,0,0.35) 60%, rgba(0,0,0,0.7) 100%)",
        pointerEvents: "none",
      }} />

      {/* Layer 4: Noise grain */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.04, pointerEvents: "none",
        background: 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27200%27 height=%27200%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.65%27 numOctaves=%273%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27100%25%27 height=%27100%25%27 filter=%27url(%23n)%27/%3E%3C/svg%3E")',
        backgroundSize: "200px 200px",
      }} />

      {/* Layer 5: Subtle color accent orbs */}
      <div style={{
        position: "absolute", top: "-15%", left: "-10%", width: "50%", height: "50%",
        background: variant === "admin"
          ? "radial-gradient(circle, rgba(53,248,255,0.04) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
      <div style={{
        position: "absolute", bottom: "-10%", right: "-5%", width: "40%", height: "40%",
        background: variant === "admin"
          ? "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)"
          : "radial-gradient(circle, rgba(53,248,255,0.05) 0%, transparent 70%)",
        borderRadius: "50%", pointerEvents: "none",
      }} />
    </motion.div>
  );
}
