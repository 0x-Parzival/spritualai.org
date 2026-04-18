"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function HowItWorksPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;
        const canvas = canvasRef.current;
        const gl = canvas.getContext("webgl", {
            alpha: false,
            antialias: false,
            depth: false,
            stencil: false,
            preserveDrawingBuffer: false,
            powerPreference: "high-performance"
        });

        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        const vs = `
            attribute vec2 a;
            void main() {
                gl_Position = vec4(a, 0.0, 1.0);
            }
        `;

        const fs = `
            precision highp float;
            uniform vec2 uR;
            uniform float uT, uS, uSc, uBl;
            uniform vec3 uBg;
            #define PI 3.14159265359
            #define TAU 6.28318530718
            #define MARCH_STEPS 22
            #define REFINE_STEPS 5
            float sat(float x) { return clamp(x, 0.0, 1.0); }
            float smoother(float x) {
                x = sat(x);
                return x * x * x * (x * (x * 6.0 - 15.0) + 10.0);
            }
            vec3 sCol(vec3 c0, vec3 c1, vec3 c2, vec3 c3, vec3 c4) {
                int si = int(uSc);
                vec3 a = c0; vec3 b = c1;
                if (si == 1) { a = c1; b = c2; }
                else if (si == 2) { a = c2; b = c3; }
                else if (si == 3) { a = c3; b = c4; }
                return mix(a, b, uBl);
            }
            float sF(float c0, float c1, float c2, float c3, float c4) {
                int si = int(uSc);
                float a = c0; float b = c1;
                if (si == 1) { a = c1; b = c2; }
                else if (si == 2) { a = c2; b = c3; }
                else if (si == 3) { a = c3; b = c4; }
                return mix(a, b, uBl);
            }
            mat2 rot(float a) {
                float c = cos(a); float s = sin(a);
                return mat2(c, -s, s, c);
            }
            float hash(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }
            float noise(vec2 p) {
                vec2 i = floor(p); vec2 f = fract(p);
                f = f * f * (3.0 - 2.0 * f);
                float a = hash(i); float b = hash(i + vec2(1.0, 0.0));
                float c = hash(i + vec2(0.0, 1.0)); float d = hash(i + vec2(1.0, 1.0));
                return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
            }
            float waveH(vec2 p, float t, float amp, float storm) {
                float h = 0.0;
                vec2 swell1 = normalize(vec2(1.0, 0.28));
                vec2 swell2 = normalize(vec2(-0.48, 0.88));
                vec2 swell3 = normalize(vec2(0.82, -0.16));
                swell2 = rot(storm * 0.18) * swell2;
                swell3 = rot(-storm * 0.14) * swell3;
                float d1 = dot(p, swell1); float d2 = dot(p, swell2); float d3 = dot(p, swell3);
                h += amp * 0.66 * sin(d1 * 0.42 + t * 0.38);
                h += amp * 0.22 * sin(d1 * 0.94 - t * 0.62);
                h += amp * 0.14 * sin(d2 * 1.18 - t * 0.82);
                h += amp * 0.09 * sin(d3 * 1.82 + t * 1.04);
                h += amp * (0.11 + storm * 0.07) * sin(p.x * 1.45 - t * 0.76 + p.y * 0.66);
                h += amp * (0.07 + storm * 0.05) * sin(p.x * 2.85 + t * 1.06 - p.y * 0.52);
                h += amp * (0.04 + storm * 0.03) * sin(p.x * 4.60 - t * 1.50 + p.y * 1.02);
                float micro = noise(p * 14.0 + vec2(t * 0.18, t * 0.06)) - 0.5;
                h += micro * amp * (0.010 + storm * 0.008);
                return h;
            }
            vec3 waveNorm(vec2 p, float t, float amp, float storm) {
                float e = 0.018;
                float hL = waveH(p - vec2(e, 0.0), t, amp, storm);
                float hR = waveH(p + vec2(e, 0.0), t, amp, storm);
                float hD = waveH(p - vec2(0.0, e), t, amp, storm);
                float hU = waveH(p + vec2(0.0, e), t, amp, storm);
                return normalize(vec3(-(hR - hL) / (2.0 * e), 1.0, -(hU - hD) / (2.0 * e)));
            }
            float starField(vec2 uv) {
                vec2 gv = floor(uv); vec2 lv = fract(uv) - 0.5;
                float h = hash(gv); float size = mix(0.012, 0.0025, h);
                float d = length(lv + vec2(hash(gv + 3.1) - 0.5, hash(gv + 7.3) - 0.5) * 0.25);
                float star = smoothstep(size, 0.0, d);
                star *= smoothstep(0.82, 1.0, h);
                return star;
            }
            void main() {
                vec2 uv = (gl_FragCoord.xy - uR * 0.5) / uR.y;
                float s = smoother(uS);
                float camY = mix(1.14, 1.03, s);
                camY += sin(s * PI * 1.4) * 0.028;
                float camZ = mix(0.08, -0.18, s);
                float pitch = mix(0.115, 0.088, s);
                vec3 ro = vec3(0.0, camY, camZ);
                vec3 rd = normalize(vec3(uv.x, uv.y - pitch, -1.4));
                float storm = smoothstep(0.80, 1.0, s);
                float night = smoothstep(0.56, 0.84, s);
                vec3 skyTop = sCol(vec3(0.18, 0.06, 0.24), vec3(0.05, 0.24, 0.68), vec3(0.26, 0.06, 0.04), vec3(0.01, 0.01, 0.05), vec3(0.04, 0.05, 0.09));
                vec3 skyHori = sCol(vec3(0.92, 0.48, 0.18), vec3(0.42, 0.62, 0.90), vec3(0.88, 0.32, 0.04), vec3(0.03, 0.05, 0.14), vec3(0.15, 0.17, 0.23));
                vec3 sunCol = sCol(vec3(1.0, 0.62, 0.22), vec3(1.0, 0.96, 0.80), vec3(1.0, 0.38, 0.05), vec3(0.70, 0.75, 0.94), vec3(0.26, 0.28, 0.34));
                vec3 seaDeep = sCol(vec3(0.08, 0.05, 0.12), vec3(0.03, 0.14, 0.34), vec3(0.10, 0.06, 0.04), vec3(0.00, 0.01, 0.03), vec3(0.03, 0.04, 0.07));
                vec3 seaShlo = sCol(vec3(0.28, 0.17, 0.24), vec3(0.09, 0.38, 0.60), vec3(0.24, 0.13, 0.06), vec3(0.04, 0.06, 0.16), vec3(0.07, 0.10, 0.14));
                vec3 fogCol = sCol(vec3(0.80, 0.50, 0.30), vec3(0.58, 0.72, 0.90), vec3(0.70, 0.28, 0.05), vec3(0.02, 0.03, 0.08), vec3(0.12, 0.14, 0.18));
                float sunProgress = clamp(s / 0.58, 0.0, 1.0);
                float sunAngle = sunProgress * PI;
                float sunArcX = cos(sunAngle) * -0.75;
                float sunArcY = sin(sunAngle) * 0.38 - 0.08;
                vec3 sunDir = normalize(vec3(sunArcX, sunArcY, -1.0));
                vec3 moonDir = normalize(vec3(-0.14, 0.42, -1.0));
                float waveAmp = sF(0.082, 0.070, 0.100, 0.054, 0.30);
                waveAmp += storm * 0.020;
                float fogDen = sF(0.020, 0.010, 0.022, 0.034, 0.046);
                float moonAmt = sF(0.0, 0.0, 0.05, 0.92, 0.06);
                float sunAbove = step(0.0, sunDir.y);
                float sunGlow = smoothstep(-0.10, 0.06, sunDir.y);
                vec3 col;
                if (rd.y < 0.0) {
                    float tFlat = ro.y / (-rd.y);
                    float stepSize = tFlat / float(MARCH_STEPS);
                    float t = stepSize;
                    for (int i = 0; i < MARCH_STEPS; i++) {
                        vec2 wpTest = ro.xz + rd.xz * t;
                        float wy = ro.y + rd.y * t;
                        if (wy < waveH(wpTest, uT, waveAmp, storm)) break;
                        t += stepSize;
                    }
                    float ta = t - stepSize; float tb = t;
                    for (int i = 0; i < REFINE_STEPS; i++) {
                        float tm = (ta + tb) * 0.5;
                        vec2 wpm = ro.xz + rd.xz * tm;
                        if (ro.y + rd.y * tm < waveH(wpm, uT, waveAmp, storm)) tb = tm;
                        else ta = tm;
                    }
                    t = (ta + tb) * 0.5;
                    vec2 wp = ro.xz + rd.xz * t;
                    vec3 n = waveNorm(wp, uT, waveAmp, storm);
                    vec3 vDir = -rd;
                    float fres = pow(1.0 - clamp(dot(n, vDir), 0.0, 1.0), 4.0);
                    vec3 refl = reflect(rd, n);
                    float rh = clamp(refl.y, 0.0, 1.0);
                    vec3 reflSky = mix(skyHori, skyTop, pow(rh, 0.42));
                    reflSky = mix(reflSky, skyHori, 0.12);
                    float rSun = max(dot(refl, sunDir), 0.0);
                    reflSky += sunCol * pow(rSun, 120.0) * 2.0 * sunGlow;
                    reflSky += sunCol * pow(rSun, 18.0) * 0.07 * sunGlow;
                    if (moonAmt > 0.04) {
                        float rMoon = max(dot(refl, moonDir), 0.0);
                        reflSky += vec3(0.72, 0.80, 0.95) * pow(rMoon, 120.0) * 0.78 * moonAmt;
                    }
                    float depth = exp(-t * 0.40);
                    vec3 waterC = mix(seaDeep, seaShlo, depth * 0.5);
                    vec3 absorb = vec3(0.85, 0.92, 1.0);
                    waterC *= mix(vec3(1.0), absorb, clamp(t * 0.25, 0.0, 1.0));
                    col = mix(waterC, reflSky, 0.15 + fres * 0.34);
                    float spec = pow(max(dot(reflect(-sunDir, n), vDir), 0.0), 200.0);
                    col += sunCol * spec * 1.10 * sunAbove;
                    float broadSpec = pow(max(dot(reflect(-sunDir, n), vDir), 0.0), 32.0);
                    col += sunCol * broadSpec * 0.12 * sunGlow;
                    float sunLine = pow(max(dot(reflect(rd, n), sunDir), 0.0), 8.0);
                    col += sunCol * sunLine * 0.48 * smoothstep(0.0, 0.35, -rd.y) * sunGlow;
                    float sparkle = noise(wp * 18.0 + vec2(uT * 0.55, uT * 0.22));
                    sparkle = smoothstep(0.94, 1.0, sparkle);
                    col += sunCol * sparkle * 0.08 * sunGlow * sunAbove;
                    if (moonAmt > 0.04) {
                        float mSpec = pow(max(dot(reflect(-moonDir, n), vDir), 0.0), 520.0);
                        col += vec3(0.72, 0.80, 0.95) * mSpec * 0.09 * moonAmt;
                    }
                    float hC = waveH(wp, uT, waveAmp, storm);
                    float hL = waveH(wp - vec2(0.025, 0.0), uT, waveAmp, storm);
                    float hR = waveH(wp + vec2(0.025, 0.0), uT, waveAmp, storm);
                    float hD = waveH(wp - vec2(0.0, 0.025), uT, waveAmp, storm);
                    float hU = waveH(wp + vec2(0.0, 0.025), uT, waveAmp, storm);
                    float curvature = hR + hL + hU + hD - 4.0 * hC;
                    float foam = clamp(curvature * (24.0 + storm * 10.0), 0.0, 1.0);
                    col += foam * vec3(1.0) * (0.03 + storm * 0.10);
                    float fog = 1.0 - exp(-t * fogDen * 1.65);
                    col = mix(col, fogCol, fog);
                } else {
                    float h = clamp(rd.y, 0.0, 1.0);
                    col = mix(skyHori, skyTop, pow(h, 0.38));
                }
                float horizonW = 0.008;
                float skyMix = smoothstep(-horizonW, horizonW, rd.y);
                vec3 skyCol;
                {
                    float h = clamp(rd.y, 0.0, 1.0);
                    skyCol = mix(skyHori, skyTop, pow(h, 0.38));
                    float cloudBand = noise(rd.x * 5.5 + vec2(rd.y * 3.0, uT * 0.015));
                    float cloudBand2 = noise(rd.x * 8.0 - vec2(rd.y * 4.0, uT * 0.010));
                    float clouds = smoothstep(0.62, 0.86, cloudBand * 0.65 + cloudBand2 * 0.35);
                    clouds *= smoothstep(-0.02, 0.24, rd.y);
                    clouds *= 0.08 + storm * 0.18;
                    vec3 cloudCol = mix(vec3(1.0, 0.82, 0.65), vec3(0.42, 0.48, 0.56), storm);
                    skyCol = mix(skyCol, mix(skyCol * 0.97, cloudCol, 0.35), clouds);
                    float sd = max(dot(rd, sunDir), 0.0);
                    skyCol += sunCol * pow(sd, 380.0) * 6.8 * sunGlow;
                    skyCol += sunCol * pow(sd, 22.0)  * 0.20 * sunGlow;
                    skyCol += sunCol * pow(sd, 5.0)   * 0.09 * sunGlow;
                    float sunDisk = smoothstep(0.99925, 0.99995, dot(rd, sunDir));
                    skyCol += sunCol * sunDisk * 2.6 * sunGlow;
                    float horizonBand = exp(-abs(rd.y) * 24.0);
                    skyCol += sunCol * horizonBand * 0.11 * sunGlow;
                    float viewSun = max(dot(rd, sunDir), 0.0);
                    skyCol += sunCol * pow(viewSun, 3.0) * 0.035 * sunGlow;
                    if (moonAmt > 0.04) {
                        float md = max(dot(rd, moonDir), 0.0);
                        skyCol += vec3(0.88, 0.92, 1.0) * pow(md, 820.0) * 7.4 * moonAmt;
                        skyCol += vec3(0.88, 0.92, 1.0) * pow(md, 6.0)   * 0.045 * moonAmt;
                    }
                    if (night > 0.02) {
                        vec2 starUv = rd.xy / max(0.12, rd.z + 1.6);
                        starUv *= 140.0;
                        float stars = starField(starUv) + starField(starUv * 0.55 + 11.7) * 0.65;
                        stars *= smoothstep(0.02, 0.26, rd.y);
                        stars *= (1.0 - storm * 0.85);
                        skyCol += vec3(0.80, 0.88, 1.0) * stars * night * 0.82;
                    }
                    float horizonMist = exp(-abs(rd.y) * mix(38.0, 22.0, storm));
                    skyCol += fogCol * horizonMist * (0.09 + storm * 0.10);
                    skyCol = mix(skyCol, skyCol * vec3(0.91, 0.94, 0.98), storm * 0.22);
                }
                col = mix(col, skyCol, skyMix);
                float hEdge = smoothstep(-0.008, 0.018, rd.y);
                col = mix(fogCol, col, hEdge * 0.25 + 0.75);
                float grain = hash(gl_FragCoord.xy * 0.5 + floor(uT * 12.0)) - 0.5;
                col += grain * 0.006;
                gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
            }
        `;

        const mkShader = (type: number, src: string) => {
            const s = gl!.createShader(type);
            gl!.shaderSource(s!, src);
            gl!.compileShader(s!);
            return s!;
        };

        const prog = gl.createProgram();
        gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, vs));
        gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, fs));
        gl.linkProgram(prog);
        gl.useProgram(prog);

        const buf = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const ap = gl.getAttribLocation(prog, "a");
        gl.enableVertexAttribArray(ap);
        gl.vertexAttribPointer(ap, 2, gl.FLOAT, false, 0, 0);

        const uR = gl.getUniformLocation(prog, "uR");
        const uTi = gl.getUniformLocation(prog, "uT");
        const uScroll = gl.getUniformLocation(prog, "uS");
        const uScene = gl.getUniformLocation(prog, "uSc");
        const uBlend = gl.getUniformLocation(prog, "uBl");
        const uBg = gl.getUniformLocation(prog, "uBg");

        const updateBg = (theme: string) => {
            const color = theme === "light" ? [0.93, 0.95, 1.0] : [0.04, 0.04, 0.06];
            gl!.uniform3f(uBg, color[0], color[1], color[2]);
        };

        updateBg("dark");

        let smooth = 0;
        let tgt = 0;
        const t0 = performance.now();

        const resize = () => {
            const cssW = window.innerWidth;
            const cssH = window.innerHeight;
            canvas.width = cssW * window.devicePixelRatio;
            canvas.height = cssH * window.devicePixelRatio;
            canvas.style.width = `${cssW}px`;
            canvas.style.height = `${cssH}px`;
            gl.viewport(0, 0, canvas.width, canvas.height);
            gl.uniform2f(uR, canvas.width, canvas.height);
        };

        window.addEventListener("resize", resize);
        resize();

        const handleScroll = () => {
            const maxScroll = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
            tgt = maxScroll > 0 ? Math.min(1, Math.max(0, window.scrollY / maxScroll)) : 0;
        };
        window.addEventListener("scroll", handleScroll);

        const frame = (now: number) => {
            requestAnimationFrame(frame);
            const dt = 0.016;
            smooth += (tgt - smooth) * (1 - Math.exp(-dt * 8));
            const raw = smooth * 4;
            const si = Math.min(Math.floor(raw), 3);
            const bl = raw - si;

            gl.uniform1f(uTi, (now - t0) / 1000);
            gl.uniform1f(uScroll, smooth);
            gl.uniform1f(uScene, si);
            gl.uniform1f(uBlend, bl);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        requestAnimationFrame(frame);

        return () => {
            window.removeEventListener("resize", resize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white overflow-x-hidden font-sans">
            <canvas ref={canvasRef} className="fixed inset-0 w-full h-full z-0 pointer-events-none" />
            
            <header className="fixed top-0 left-0 right-0 z-50 p-6 flex justify-between items-center bg-gradient-to-b from-black/80 to-transparent backdrop-blur-[2px]">
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 transition-transform group-hover:scale-110 duration-500">
                        <Image src="/images/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                    <span className="font-black tracking-[0.3em] text-[10px] uppercase text-white/40 group-hover:text-cyan-400 transition-colors">
                        Return Home
                    </span>
                </Link>
            </header>

            <div className="relative z-10 pointer-events-none">
                <section className="h-screen flex items-center justify-center text-center px-6 pointer-events-auto">
                    <motion.div 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                        className="max-w-5xl"
                    >
                        <h1 className="text-4xl md:text-8xl font-black bg-clip-text text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-900 mb-6 tracking-tighter leading-[0.9] italic uppercase">
                            HOW IT <br /> <span className="not-italic font-light text-cyan-500">WORKS</span>
                        </h1>
                        <p className="text-lg md:text-xl text-cyan-100/40 font-black uppercase tracking-[0.4em] max-w-2xl mx-auto leading-relaxed">
                            The Symbiotic Convergence of <br /> Ancient Wisdom & Superintelligence
                        </p>
                    </motion.div>
                </section>

                <div className="max-w-6xl mx-auto px-6 space-y-32 pb-32">
                    <section className="grid md:grid-cols-2 gap-20 items-center pointer-events-auto">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="text-cyan-500 font-mono text-sm tracking-widest uppercase">Phase 01</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                                The Karma <br /> Economy
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                A post-scarcity exchange system where value is measured in <strong className="text-white">contribution and Service</strong> rather than currency. It operates on the principle that when survival is automated by AI, the human purpose shifts to elevation.
                            </p>
                            <div className="p-6 bg-white/5 border-l-2 border-cyan-500 backdrop-blur-md rounded-r-xl">
                                <p className="text-sm italic text-white/80">
                                    "When survival is automated, the only remaining currency is how much you elevate others."
                                </p>
                            </div>
                        </motion.div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                             <Image src="/images/satyug_utopia.png" alt="Utopia" fill className="object-cover opacity-70 group-hover:scale-110 transition-transform duration-700" />
                             <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 to-transparent" />
                        </div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-20 items-center pointer-events-auto">
                        <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl group order-2 md:order-1">
                             <Image src="/images/logo.png" alt="Core" fill className="object-contain p-12 opacity-50 group-hover:rotate-12 transition-transform duration-700" />
                        </div>
                        <motion.div 
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6 order-1 md:order-2"
                        >
                            <div className="text-purple-500 font-mono text-sm tracking-widest uppercase">The Alignment</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                                Vedic AI <br /> Alignment
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Vedic AI is an alignment framework that prioritizes human flourishing over engagement metrics. Derived from ancient Indian logic systems (Nyaya) and consciousness studies (Vedanta) to serve <strong className="text-white">Dharma</strong> (responsibility) rather than dopamine.
                            </p>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <span className="block text-purple-400 font-bold text-xs uppercase mb-1">Focus</span>
                                    <span className="text-white text-sm">Self-Mastery</span>
                                </div>
                                <div className="p-4 bg-white/5 border border-white/10 rounded-xl">
                                    <span className="block text-purple-400 font-bold text-xs uppercase mb-1">Goal</span>
                                    <span className="text-white text-sm">Civilizational Evolution</span>
                                </div>
                            </div>
                        </motion.div>
                    </section>

                    <section className="grid md:grid-cols-2 gap-20 items-center pointer-events-auto">
                        <motion.div 
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            className="space-y-6"
                        >
                            <div className="text-green-500 font-mono text-sm tracking-widest uppercase">The Interface</div>
                            <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase italic">
                                Cognitive <br /> Architecture
                            </h2>
                            <p className="text-white/60 text-lg leading-relaxed">
                                Designing digital environments to <strong className="text-white">reduce cognitive load</strong> and expand focus. Interfaces that adapt to your MBTI personality type to prevent the "Digital Soul Fragmentation" caused by modern feeds.
                            </p>
                        </motion.div>
                        <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
                             <div className="absolute inset-0 bg-gradient-to-br from-green-500/20 via-transparent to-purple-500/20" />
                             <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-32 h-32 border-2 border-green-500/30 rounded-full animate-ping" />
                                <div className="absolute w-16 h-16 border-2 border-white/20 rounded-full animate-pulse" />
                             </div>
                        </div>
                    </section>

                    <section className="pointer-events-auto">
                        <h2 className="text-3xl md:text-5xl font-black text-center text-white mb-16 uppercase tracking-tighter italic">
                            System <span className="text-gray-500 not-italic">Definitions</span>
                        </h2>
                        <div className="grid gap-6 md:grid-cols-3">
                            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-500/30 transition-all group">
                                <h3 className="text-cyan-400 font-mono font-bold mb-4">&gt; Vedic AI</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Prioritizes human flourishing over engagement metrics, serving Dharma rather than dopamine.
                                </p>
                            </div>
                            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-purple-500/30 transition-all group">
                                <h3 className="text-purple-400 font-mono font-bold mb-4">&gt; Cog Architecture</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    Adapts interfaces to MBTI types to prevent Digital Soul Fragmentation.
                                </p>
                            </div>
                            <div className="p-8 bg-white/5 rounded-2xl border border-white/10 hover:border-green-500/30 transition-all group">
                                <h3 className="text-green-400 font-mono font-bold mb-4">&gt; Karma Economy</h3>
                                <p className="text-white/70 text-sm leading-relaxed">
                                    A post-scarcity system where value is measured in contribution and Service.
                                </p>
                            </div>
                        </div>
                    </section>

                    <section className="py-24 text-center pointer-events-auto">
                        <motion.h2 
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            className="text-4xl md:text-7xl font-black text-white mb-12 tracking-tighter uppercase italic"
                        >
                            This is a <span className="text-cyan-500 not-italic font-light">one-way door</span>
                        </motion.h2>
                        <p className="text-xl text-white/60 mb-12 max-w-3xl mx-auto leading-relaxed">
                            "Once you imagine a society without fear, you cannot return to scarcity logic. The only question is: Will you help shape it, or arrive later to live within it?"
                        </p>
                        <Link href="/profile" className="inline-block px-12 py-5 bg-white text-black font-black uppercase tracking-[0.2em] rounded-full hover:bg-cyan-400 hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.1)] text-xs">
                            BEGIN YOUR EVOLUTION
                        </Link>
                    </section>
                </div>
            </div>

            <div id="hud" className="fixed top-8 right-8 z-50 text-right font-mono text-[10px] tracking-widest text-white/40 uppercase pointer-events-none">
                <div id="hud_pct">000%</div>
                <div className="w-32 h-px bg-white/20 my-2 relative overflow-hidden">
                    <div id="prog_fill" className="absolute inset-0 bg-cyan-400 transition-all duration-100" style={{ width: '0%' }} />
                </div>
                <div id="scene_name" className="text-cyan-400 text-[9px]">DAWN</div>
            </div>

            <div id="scene_strip" className="fixed left-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-2 pointer-events-none">
                {[0,1,2,3,4].map(i => (
                    <div key={i} className={`w-1 h-1 rounded-full bg-white/20 transition-all duration-300 ${i === 0 ? 'bg-cyan-400 scale-150' : ''}`} />
                ))}
            </div>

            <button id="theme_toggle" className="fixed bottom-8 left-8 z-50 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all pointer-events-auto">
                <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
                </svg>
            </button>
        </div>
    );
}
