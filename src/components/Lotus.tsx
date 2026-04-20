"use client";

import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import styles from './Lotus.module.css';
import PretextWrapper from './home/PretextWrapper';

interface LotusProps {
    quizMode?: boolean;
    lotusOffset?: number;
    isChatActive?: boolean;
    forceClose?: boolean;
}

const RINGS_CONFIG = [
    { cls: 'r1', count: 12 },
    { cls: 'r2', count: 10 },
    { cls: 'r3', count: 9 },
];

const PETAL_PATH = 'M0,100 C0,66.6666667 12,33.3333333 36,0 C60,33.3333333 72,66.6666667 72,100 C72,133.333333 60,166.666667 36,200 C12,166.666667 0,133.333333 0,100 Z';

export default function Lotus({ quizMode = false, lotusOffset = 0, isChatActive = false, forceClose = false }: LotusProps) {
    const router = useRouter();
    const [closed, setClosed] = useState(forceClose);
    const [isBubbleVisible, setIsBubbleVisible] = useState(false);
    const [hintFade, setHintFade] = useState(false);
    const [page, setPage] = useState(1);

    useEffect(() => {
        if (forceClose) setClosed(true);
    }, [forceClose]);

    useEffect(() => {
        const handleScroll = () => {
            const sy = window.scrollY;
            const wh = window.innerHeight;
            // Page 3 officially starts at 200vh. 
            // Using 1.9vh as a safe threshold to account for the -2vh pullup.
            if (sy < wh * 0.8) setPage(1);
            else if (sy < wh * 1.9) setPage(2);
            else setPage(3);
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll(); // Trigger immediately on mount
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    // Refs for animation values (high frequency updates)
    const containerRef = useRef<HTMLDivElement>(null);
    const lotusWrapRef = useRef<HTMLDivElement>(null);
    const coreRef = useRef<HTMLDivElement>(null);
    const shimRef = useRef<HTMLDivElement>(null);
    const shim2Ref = useRef<HTMLDivElement>(null);
    const ring1Ref = useRef<HTMLDivElement>(null);
    const ring2Ref = useRef<HTMLDivElement>(null);
    const hintRef = useRef<HTMLDivElement>(null);
    
    const petalsRef = useRef<any[]>([]);
    const stateRef = useRef({
        spinAngle: 0,
        aliveTime: 0,
        bPhase: 0,
        gPhase: Math.random() * Math.PI * 2,
        proximity: 0,
        awareness: 0,
        mousePos: { x: 0, y: 0 },
        thoughtTimer: 2000 + Math.random() * 4500,
        globalTimer: 4000 + Math.random() * 6000,
        lastTs: 0,
        shimBusy: false,
        shim2Busy: false
    });

    useEffect(() => {
        const hintTimer = setTimeout(() => setHintFade(true), 7000);
        const bubbleTimer = setTimeout(() => setIsBubbleVisible(true), 33000);
        return () => {
            clearTimeout(hintTimer);
            clearTimeout(bubbleTimer);
        };
    }, []);

    // Math helpers
    const breathNoise = (t: number) => Math.sin(t) * 0.50 + Math.sin(t * 1.73) * 0.30 + Math.sin(t * 3.11) * 0.20;
    const heartbeat = (t: number) => 0.60 + Math.sin(t * 1.30) * 0.22 + Math.sin(t * 2.93 + 1.10) * 0.12 + Math.sin(t * 5.27 + 2.30) * 0.06;

    const emitRipple = (big = true) => {
        const s = stateRef.current;
        if (big && s.shimBusy) return;
        if (!big && s.shim2Busy) return;
        if (big) s.shimBusy = true; else s.shim2Busy = true;
        
        const el = big ? shimRef.current : shim2Ref.current;
        if (!el) return;

        const dur = big ? 2200 : 1500;
        const sc = big ? 24 : 13;
        
        el.style.transition = 'none';
        el.style.opacity = big ? '0.85' : '0.55';
        el.style.transform = 'translate(-50%,-50%) scale(1)';
        
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                el.style.transition = `transform ${dur}ms cubic-bezier(0,.5,.4,1), opacity ${dur}ms ease-out`;
                el.style.transform = `translate(-50%,-50%) scale(${sc})`;
                el.style.opacity = '0';
                setTimeout(() => { if (big) s.shimBusy = false; else s.shim2Busy = false; }, dur + 100);
            });
        });
    };

    const triggerWave = (originIdx: number, magnitude = 1.0) => {
        const total = petalsRef.current.length;
        petalsRef.current.forEach((p, i) => {
            const dist = Math.min(Math.abs(i - originIdx), total - Math.abs(i - originIdx));
            setTimeout(() => {
                if (p) p.waveLift = Math.max(p.waveLift, magnitude * (1 - dist / (total * 0.5)));
            }, dist * 55);
        });
    };

    const startPetalEvent = (p: any) => {
        const roll = Math.random();
        if (roll < 0.25) { p.eventType = 'flutter'; p.eventDur = 500 + Math.random() * 700; p.eventMag = 3 + Math.random() * 5; }
        else if (roll < 0.48) { p.eventType = 'surge'; p.eventDur = 1100 + Math.random() * 900; p.eventMag = 1; }
        else if (roll < 0.66) { p.eventType = 'shy'; p.eventDur = 800 + Math.random() * 600; p.eventMag = 1; }
        else if (roll < 0.82) { p.eventType = 'spiral'; p.eventDur = 1500 + Math.random() * 1000; p.eventMag = 1; }
        else { p.eventType = 'breathhold'; p.eventDur = 350 + Math.random() * 500; p.eventMag = 1; }
        p.eventT = 0;
    };

    const petalEventDelta = (p: any) => {
        const t = p.eventT;
        const bell = Math.sin(t * Math.PI);
        switch (p.eventType) {
            case 'flutter': return Math.sin(t * Math.PI * 16) * p.eventMag * (1 - t) * (1 - t);
            case 'surge': return bell * 14;
            case 'shy': return -bell * 8;
            case 'spiral': return Math.sin(t * Math.PI * 4) * bell * 6;
            case 'breathhold': return (t < 0.4 ? t / 0.4 : 1 - (t - 0.4) / 0.6) * 3;
            default: return 0;
        }
    };

    const triggerGlobalEvent = () => {
        const roll = Math.random();
        const petals = petalsRef.current;
        if (roll < 0.35) {
            triggerWave(Math.floor(Math.random() * petals.length), 0.7 + Math.random() * 0.4);
            emitRipple(true);
        } else if (roll < 0.60) {
            emitRipple(true);
            setTimeout(() => emitRipple(false), 280);
        } else if (roll < 0.80) {
            petals.forEach(p => { if (p) p.waveLift = 0.6 + Math.random() * 0.4; });
            setTimeout(() => emitRipple(false), 200);
        } else {
            const picks = [...petals].sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3));
            picks.forEach((p, i) => setTimeout(() => {
                if (p) { p.eventType = 'flutter'; p.eventDur = 600; p.eventMag = 4; p.eventT = 0; }
            }, i * 180));
        }
        stateRef.current.globalTimer = 3500 + Math.random() * 7000;
    };

    const toggle = (e: React.MouseEvent | React.KeyboardEvent) => {
        if (isChatActive) return;
        e.stopPropagation();
        // Navigate immediately as requested
        router.push('/lotus-god');
        
        // Keep the visual feedback for the click moment
        const s = stateRef.current;
        if (coreRef.current) {
            coreRef.current.style.boxShadow = '0 0 55px rgba(255,60,245,.95), 0 0 65px rgba(53,248,255,.8)';
        }
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const r = containerRef.current?.getBoundingClientRect();
            if (!r) return;
            const cx = r.left + r.width / 2;
            const cy = r.top + r.height / 2;
            // Increased radius from 300 to 600 for 'early' detection
            stateRef.current.proximity = Math.max(0, 1 - Math.hypot(e.clientX - cx, e.clientY - cy) / 600);
            stateRef.current.mousePos = { 
                x: (e.clientX - window.innerWidth / 2) / (window.innerWidth / 2),
                y: (e.clientY - window.innerHeight / 2) / (window.innerHeight / 2)
            };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        let frameId: number;
        const s = stateRef.current;

        const loop = (ts: number) => {
            if (!s.lastTs) s.lastTs = ts;
            const dt = Math.min(ts - s.lastTs, 50);
            s.lastTs = ts;
            s.aliveTime += dt;

            // Breath
            s.bPhase += (0.00060 + 0.00009 * Math.sin(s.aliveTime * 0.00016)) * dt;
            const breathVal = breathNoise(s.bPhase);
            const breathScale = 1 + breathVal * 0.022;

            // Awareness
            s.awareness += (s.proximity - s.awareness) * 0.04;
            if (ring1Ref.current) ring1Ref.current.classList.toggle(styles.alive, s.awareness > 0.18);
            if (ring2Ref.current) ring2Ref.current.classList.toggle(styles.alive, s.awareness > 0.18);

            // Spin & Dynamic Tilt - Visible slow rotation
            s.spinAngle += (0.4 + s.awareness * 0.2) * (dt / 16.6);
            const baseTiltX = 70 - s.awareness * 5;
            const cursorTiltX = baseTiltX + (s.mousePos.y * 4);
            const cursorTiltY = s.mousePos.x * 6;

            if (lotusWrapRef.current) {
                lotusWrapRef.current.style.transform = `rotateX(${cursorTiltX}deg) rotateY(${cursorTiltY}deg) rotateZ(${s.spinAngle}deg)`;
            }

            // Core Heartbeat
            s.gPhase += 0.0013 * dt;
            const gv = heartbeat(s.gPhase);
            const gb = s.awareness * 14;
            if (coreRef.current) {
                coreRef.current.style.boxShadow =
                    `0 0 ${(14 + gv * 11 + gb).toFixed(1)}px rgba(255,60,245,${(0.28 + gv * 0.28).toFixed(2)}),` +
                    `0 0 ${(18 + gv * 14 + gb).toFixed(1)}px rgba(53,248,255,${(0.22 + gv * 0.22).toFixed(2)})`;
                coreRef.current.style.transform = `translate(-50%,-50%) scale(${(1 + gv * 0.09 + s.awareness * 0.12).toFixed(4)})`;
            }

            // Thought ripple
            s.thoughtTimer -= dt;
            if (s.thoughtTimer <= 0) {
                emitRipple(Math.random() > 0.45);
                s.thoughtTimer = 2500 + Math.random() * 5500;
            }

            // Global event
            s.globalTimer -= dt;
            if (s.globalTimer <= 0) triggerGlobalEvent();

            // Petals
            petalsRef.current.forEach(p => {
                if (!p) return;
                p.trembleTimer -= dt;
                if (p.trembleTimer <= 0) {
                    p.trembleGoal = (Math.random() - 0.5) * 1.5; // Reduced tremble (4.2 -> 1.5)
                    p.trembleTimer = 500 + Math.random() * 3200;
                }
                p.tremble = 0; // Completely disable lateral tremble
                p.hoverLift += (p.hoverGoal - p.hoverLift) * 0.06;
                p.waveLift *= 0.85;
                if (p.waveLift < 0.001) p.waveLift = 0;
                
                p.eventTimer -= dt;
                if (p.eventType) {
                    p.eventT += dt / p.eventDur;
                    if (p.eventT >= 1) {
                        p.eventType = null;
                        p.eventTimer = 800 + Math.random() * 7000;
                    }
                } else if (p.eventTimer <= 0) {
                    startPetalEvent(p);
                }

                const ps = breathScale + Math.sin(s.bPhase + p.phase) * 0.008;
                const extraX = 0; // Hard disabled horizontal wiggle
                let riseZ = p.hoverLift * 15 + p.waveLift * 15; // Reduced multipliers (30/35 -> 15/15)
                const MAX_RISE = 25; // Tightened limit (50 -> 25)
                if (riseZ > MAX_RISE) riseZ = MAX_RISE;
                
                const trZ = 0; // Hard disabled wobble
                const isOpen = closed ? 0 : 1;

                p.el.style.transform =
                    `translate3d(-50%, -50%, ${riseZ.toFixed(2)}px)` +
                    ` rotateZ(calc(${p.baseAngle}deg + ${trZ}deg))` +
                    ` rotateX(calc(var(--baseX) * ${isOpen} + ${extraX.toFixed(3)}deg))` +
                    ` rotateY(calc(var(--baseY) * ${isOpen}))` +
                    ` scaleX(${ps.toFixed(4)})`;

                const svgTiltBase = `rotateX(calc(var(--svgTilt) * (1 - ${isOpen})))`;
                const svgScale = 1 + p.hoverLift * 0.04;
                p.svg.style.transform = `${svgTiltBase} scale(${svgScale.toFixed(4)})`;
            });

            frameId = requestAnimationFrame(loop);
        };

        frameId = requestAnimationFrame(loop);
        return () => cancelAnimationFrame(frameId);
    }, [closed]);

    const cssVars = {
        '--lotus-offset': `${lotusOffset}px`,
        '--speed': '1800ms'
    } as React.CSSProperties;

    return (
        <>
        <div style={{ ...cssVars, opacity: quizMode ? 0.2 : 0.83, transition: 'opacity 0.8s ease', pointerEvents: isChatActive ? 'none' : 'auto' }} className={styles.stage} ref={containerRef}>
            <div className={styles.lightWash}></div>
            <svg width="0" height="0" style={{ position: 'absolute', opacity: 0, pointerEvents: 'none' }}>
                <defs>
                    <radialGradient id="neonGrad" cx="50%" cy="10%" r="110%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                        <stop offset="30%" stopColor="#35f8ff" stopOpacity="0.85" />
                        <stop offset="70%" stopColor="#ff00ea" stopOpacity="0.8" />
                        <stop offset="100%" stopColor="#7000ff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="neonGradHot" cx="50%" cy="10%" r="110%">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                        <stop offset="25%" stopColor="#35f8ff" stopOpacity="1" />
                        <stop offset="65%" stopColor="#ff00ea" stopOpacity="1" />
                        <stop offset="100%" stopColor="#7000ff" stopOpacity="0.5" />
                    </radialGradient>
                </defs>
            </svg>

            <div className={`${styles.awarenessRing} ${styles.a1}`} ref={ring1Ref}></div>
            <div className={`${styles.awarenessRing} ${styles.a2}`} ref={ring2Ref}></div>

            <div 
                className={`${styles.lotusWrap} ${closed ? styles.closed : ''}`} 
                ref={lotusWrapRef} 
                onClick={toggle}
                tabIndex={0}
                role="button"
                aria-label="Toggle lotus bloom"
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        toggle(e);
                    }
                }}
            >
                <div className={styles.core} ref={coreRef}></div>
                <div className={styles.shimmer} ref={shimRef}></div>
                <div className={styles.shimmer2} ref={shim2Ref}></div>
                <div className={styles.lotus}>
                    {RINGS_CONFIG.map((ring, rIndex) => {
                        const step = 360 / ring.count;
                        return (
                            <ul key={rIndex} className={`${styles.ring} ${styles[ring.cls]}`}>
                                {Array.from({ length: ring.count }).map((_, i) => {
                                    const baseAngle = (i + 1) * step;
                                    return (
                                        <li 
                                            key={i} 
                                            className={styles.petal}
                                            ref={(el) => {
                                                if (el) {
                                                    const existing = petalsRef.current.find(p => p.el === el);
                                                    if (!existing) {
                                                        const svg = el.querySelector('svg');
                                                        const path = el.querySelector('path');
                                                        petalsRef.current.push({
                                                            el,
                                                            svg,
                                                            path,
                                                            baseAngle,
                                                            phase: Math.random() * Math.PI * 2,
                                                            tremble: 0,
                                                            trembleGoal: 0,
                                                            trembleTimer: 400 + Math.random() * 3000,
                                                            hoverLift: 0,
                                                            hoverGoal: 0,
                                                            hovered: false,
                                                            waveLift: 0,
                                                            eventTimer: 800 + i * 120 + Math.random() * 5000,
                                                            eventType: null,
                                                            eventT: 0,
                                                            eventDur: 0,
                                                            eventMag: 0
                                                        });
                                                    }
                                                }
                                            }}
                                        >
                                            <svg 
                                                className={styles.petalSvg} 
                                                viewBox="0 0 72 200" 
                                                aria-hidden="true"
                                                onMouseEnter={(e) => {
                                                    const p = petalsRef.current.find(petal => petal.svg === e.currentTarget);
                                                    if (p && !p.hovered) {
                                                        p.hovered = true;
                                                        p.hoverGoal = 1;
                                                        p.svg.classList.add(styles.hovered);
                                                        p.path.setAttribute('fill', 'url(#neonGradHot)');
                                                        emitRipple(false);
                                                        triggerWave(petalsRef.current.indexOf(p), 0.2); // Reduced from 0.4
                                                    }
                                                }}
                                                onMouseLeave={(e) => {
                                                    const p = petalsRef.current.find(petal => petal.svg === e.currentTarget);
                                                    if (p) {
                                                        p.hovered = false;
                                                        p.hoverGoal = 0;
                                                        p.svg.classList.remove(styles.hovered);
                                                        p.path.setAttribute('fill', 'url(#neonGrad)');
                                                    }
                                                }}
                                            >
                                                <path className={styles.petalPath} d={PETAL_PATH}></path>
                                            </svg>
                                        </li>
                                    );
                                })}
                            </ul>
                        );
                    })}
                </div>
            </div>

            {isBubbleVisible && (
                <div className={`${styles.lotusMessage} ${styles.readyToBurst}`}>
                                <PretextWrapper 
                                    text={"The lotus holds a secret.\nThose who seek, find."}
                                    font="300 0.9rem 'Inter', sans-serif"
                                    width={240}
                                    centerExclusion={false}
                                    style={{ fontWeight: 300, lineHeight: 1.6 }}
                                />
                </div>
            )}
            <div className={`${styles.hint} ${hintFade ? styles.fade : ''}`} ref={hintRef}>
                Hover a petal &nbsp;·&nbsp; Click to open &nbsp;·&nbsp; Feel it breathe
            </div>
        </div>

        <div className={styles.stemWrapper} style={{ ...cssVars, opacity: quizMode ? 0.2 : 0.83, transition: 'opacity 0.8s ease' }}>
            <div className={styles.stemContainer}>
                <svg className={styles.stemSvg} preserveAspectRatio="none" viewBox="0 0 200 1000">
                    <defs>
                        <filter id="stemWater" x="-50%" y="-10%" width="200%" height="120%">
                            <feTurbulence type="fractalNoise" baseFrequency="0.05 0.1" numOctaves="2" result="noise">
                                <animate attributeName="seed" dur="10s" values="1; 100; 1" repeatCount="indefinite" />
                            </feTurbulence>
                            <feDisplacementMap in="SourceGraphic" in2="noise" scale="25" />
                        </filter>
                    </defs>
                    {/* Primary Thread (Magenta) */}
                    <path
                        d="M 100,0 C 115,50 85,100 100,150 S 115,250 100,300 S 85,400 100,450 S 115,550 100,600 S 85,700 100,750 S 115,850 100,900 S 85,950 100,1000"
                        className={styles.stemLine}
                        filter="url(#stemWater)"
                        fill="none"
                    />
                    {/* Secondary Thread (Cyan) - Visible primarily on Page 3 */}
                    <path
                        d="M 100,0 C 85,50 115,100 100,150 S 85,250 100,300 S 115,400 100,450 S 85,550 100,600 S 115,700 100,750 S 85,850 100,900 S 115,950 100,1000"
                        className={styles.stemLine}
                        style={{ 
                            display: page === 3 ? 'block' : 'none',
                            opacity: page === 3 ? 0.9 : 0,
                            stroke: '#35f8ff',
                            transition: 'opacity 0.8s ease'
                        }}
                        filter="url(#stemWater)"
                        fill="none"
                    />
                </svg>
            </div>
        </div>
        </>
    );
}
