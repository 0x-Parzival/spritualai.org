"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useRouter } from 'next/navigation';
import styles from './portal.module.css';

interface PortalResultProps {
    mbtiType: string;
}

export default function PortalResult({ mbtiType }: PortalResultProps) {
    const router = useRouter();
    const cardRef = useRef<HTMLDivElement>(null);
    const cardBgCanvasRef = useRef<HTMLCanvasElement>(null);
    const tunnelCanvasRef = useRef<HTMLCanvasElement>(null);
    const tunnelContainerRef = useRef<HTMLDivElement>(null);
    const [isActive, setIsActive] = useState(false);

    // Background particles effect
    useEffect(() => {
        const canvas = cardBgCanvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        let animationId: number;
        let particles: any[] = [];
        const particleCount = 50;

        const resize = () => {
            if (!canvas.parentElement) return;
            canvas.width = canvas.parentElement.offsetWidth;
            canvas.height = canvas.parentElement.offsetHeight;
        };

        resize();
        window.addEventListener('resize', resize);

        for (let i = 0; i < particleCount; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2 + 1,
                vx: Math.random() * 2 - 1,
                vy: Math.random() * 2 - 1,
                color: `rgba(0, ${Math.floor(Math.random() * 150 + 150)}, ${Math.floor(Math.random() * 100 + 180)}, 0.7)`
            });
        }

        const animate = () => {
            animationId = requestAnimationFrame(animate);
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < particleCount; i++) {
                const p = particles[i];
                p.x += p.vx;
                p.y += p.vy;

                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2);
                gradient.addColorStop(0, "rgba(255,255,255,1)");
                gradient.addColorStop(1, "rgba(255,255,255,0)");

                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fill();

                for (let j = i + 1; j < particleCount; j++) {
                    const p2 = particles[j];
                    const distance = Math.sqrt(Math.pow(p.x - p2.x, 2) + Math.pow(p.y - p2.y, 2));
                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.strokeStyle = `rgba(0, 220, 180, ${0.1 * (1 - distance / 100)})`;
                        ctx.lineWidth = 0.5;
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.stroke();
                    }
                }
            }
        };

        animate();

        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(animationId);
        };
    }, []);

    // Three.js Tunnel effect
    useEffect(() => {
        if (!tunnelCanvasRef.current || !isActive) return;

        let renderer: THREE.WebGLRenderer;
        let scene: THREE.Scene;
        let camera: THREE.PerspectiveCamera;
        let tube: THREE.Mesh;
        let lights: THREE.PointLight[] = [];
        let path: THREE.CatmullRomCurve3;
        let renderFrameId: number;
        let pct = 0;
        let pct2 = 0;

        // Config
        const cameraSpeed = 0.00015;
        const lightSpeed = 0.001;
        const tubularSegments = 1200;
        const radialSegments = 12;
        const tubeRadius = 3;

        function initTunnel() {
            if (!tunnelCanvasRef.current) return;

            renderer = new THREE.WebGLRenderer({
                canvas: tunnelCanvasRef.current,
                antialias: true,
                alpha: true
            });
            renderer.setSize(window.innerWidth, window.innerHeight);

            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.005);

            camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);

            // Stars/Particles
            const starsCount = 2000;
            const starsPositions = new Float32Array(starsCount * 3);
            for (let i = 0; i < starsCount; i++) {
                starsPositions[i * 3] = THREE.MathUtils.randFloatSpread(1500);
                starsPositions[i * 3 + 1] = THREE.MathUtils.randFloatSpread(1500);
                starsPositions[i * 3 + 2] = THREE.MathUtils.randFloatSpread(1500);
            }

            const starsGeometry = new THREE.BufferGeometry();
            starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3));

            const starsMaterial = new THREE.PointsMaterial({
                color: 0xffffff,
                size: 1,
                transparent: true
            });

            const starField = new THREE.Points(starsGeometry, starsMaterial);
            scene.add(starField);

            // Tunnel Logic
            const points: THREE.Vector3[] = [];
            const totalPoints = 200;
            // User provided curve control points
            const controlPoints = [
                new THREE.Vector3(0, 0, 0),
                new THREE.Vector3(20, 10, -50),
                new THREE.Vector3(40, -10, -100),
                new THREE.Vector3(60, 15, -150),
                new THREE.Vector3(50, -5, -200),
                new THREE.Vector3(0, 0, -250),
                new THREE.Vector3(-100, 0, -200),
                new THREE.Vector3(-150, 0, -100),
                new THREE.Vector3(-100, 0, 0),
                new THREE.Vector3(-50, 10, 100),
                new THREE.Vector3(-20, -10, 150),
                new THREE.Vector3(0, 0, 200)
            ];

            const curve = new THREE.CatmullRomCurve3(controlPoints);
            curve.tension = 0.1;
            path = curve;

            // Create Tube
            // Using TubeGeometry instead of TubeBufferGeometry (Buffer is default in newer Three.js)
            const tubeGeometry = new THREE.TubeGeometry(path, tubularSegments, tubeRadius, radialSegments, false);
            const colors = [];
            const count = tubeGeometry.attributes.position.count;

            for (let i = 0; i < count; i++) {
                // User colors: #00a3ff and #00ffaa
                const color = new THREE.Color(i % 2 === 0 ? "#00a3ff" : "#00ffaa");
                colors.push(color.r, color.g, color.b);
            }

            tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            tubeGeometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));

            const material = new THREE.MeshLambertMaterial({
                side: THREE.BackSide,
                vertexColors: true,
                wireframe: true,
                emissive: 0x333333,
                emissiveIntensity: 0.4
            });

            tube = new THREE.Mesh(tubeGeometry, material);
            scene.add(tube);

            // Lights
            const mainLight = new THREE.PointLight(0xffffff, 1, 50);
            scene.add(mainLight);
            scene.add(new THREE.AmbientLight(0x555555));

            const lightColors = [0x00a3ff, 0x00ffaa, 0x00a3ff, 0x00ffaa, 0xffffff];
            for (let i = 0; i < 5; i++) {
                const l = new THREE.PointLight(lightColors[i], 1.2, 20);
                lights.push(l);
                scene.add(l);
            }

            // Add code sprites (Generic ones for visual effect)
            const snippets = [
                "const type = 'MBTI';",
                "function discover() {",
                "  return self;",
                "}",
                "return true;"
            ];

            // Helper to create text sprite
            function createCodeSnippetSprite(text: string) {
                const canvas = document.createElement('canvas');
                canvas.width = 300;
                canvas.height = 100;
                const ctx = canvas.getContext('2d');
                if (ctx) {
                    ctx.fillStyle = '#2d2d2d'; // Optional background
                    // ctx.fillRect(0, 0, canvas.width, canvas.height); // Use transparent for better effect maybe?
                    ctx.clearRect(0, 0, canvas.width, canvas.height);

                    ctx.font = '20px monospace';
                    ctx.fillStyle = '#8be9fd';
                    ctx.fillText(text, 10, 50);
                }
                const texture = new THREE.CanvasTexture(canvas);
                const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
                const sprite = new THREE.Sprite(mat);
                sprite.scale.set(15, 5, 1);
                return sprite;
            }

            for (let i = 0; i < 50; i++) {
                const snippet = snippets[Math.floor(Math.random() * snippets.length)];
                const sprite = createCodeSnippetSprite(snippet);
                sprite.position.set(
                    (Math.random() - 0.5) * 400,
                    (Math.random() - 0.5) * 400,
                    (Math.random() - 0.5) * 400
                );
                scene.add(sprite);
            }
        }

        function render() {
            pct += cameraSpeed;
            if (pct >= 0.995) pct = 0;

            pct2 += lightSpeed;
            if (pct2 >= 0.995) pct2 = 0;

            const pt1 = path.getPointAt(pct);
            const lookAheadPct = Math.min(pct + 0.01, 0.995);
            const pt2 = path.getPointAt(lookAheadPct);

            camera.position.set(pt1.x, pt1.y, pt1.z);
            camera.lookAt(pt2);

            // Move lights
            lights.forEach((light, i) => {
                // Just some movement along the path
                const offset = ((i * 13) % 17) / 20;
                const lightPct = (pct2 + offset) % 0.995;
                const pos = path.getPointAt(lightPct);
                light.position.set(pos.x, pos.y, pos.z);
            });

            renderer.render(scene, camera);
            renderFrameId = requestAnimationFrame(render);
        }

        initTunnel();
        render();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(renderFrameId);
            if (renderer) renderer.dispose();
        };
    }, [isActive]);


    // Tunnel Logic - Updated to 15 seconds
    // Descriptions for each type
    const descriptions: Record<string, string> = {
        INTJ: "You naturally think in systems and long timelines, often seeing inefficiencies others overlook.",
        INTP: "You live in ideas, questioning how things really work and refusing answers that feel incomplete.",
        INFJ: "You sense patterns in people and meaning beneath events, often feeling things before they’re spoken.",
        INFP: "You navigate life guided by inner values, quietly seeking what feels deeply authentic.",
        ISTJ: "You rely on logic, consistency, and proven methods to bring order to complex situations.",
        ISFJ: "You pay attention to details others miss, driven by a quiet sense of responsibility and care.",
        ISTP: "You understand things by taking them apart, trusting direct experience over theory.",
        ISFP: "You move through life attuned to what feels right, expressing yourself through action more than words.",
        ENTJ: "You instinctively organize people and systems, focused on outcomes and long-term impact.",
        ENTP: "You explore possibilities rapidly, energized by ideas, connections, and what could be improved.",
        ENFJ: "You naturally tune into others, often guiding people toward growth without forcing it.",
        ENFP: "You see potential everywhere, driven by curiosity, meaning, and human connection.",
        ESTJ: "You prefer clarity and structure, stepping in quickly when systems need direction.",
        ESFJ: "You notice social dynamics instantly, working to create harmony and shared momentum.",
        ESTP: "You act decisively in the moment, adapting fast and trusting what’s happening right now.",
        ESFP: "You engage fully with life as it unfolds, bringing energy, realism, and presence into every space."
    };

    const microCopyOptions = [
        "Analyzing your cognitive pattern...",
        "Mapping your decision architecture...",
        "Resolving your dominant mental framework..."
    ];

    const [showText, setShowText] = useState(false);
    const [showMicro, setShowMicro] = useState(false);
    const [showSkip, setShowSkip] = useState(false);

    // Redirect function
    const proceedToResult = () => {
        router.push(`/MBTI/personality/${mbtiType.toLowerCase()}.html`);
    };

    const startPortal = () => {
        setIsActive(true);

        if (tunnelCanvasRef.current && tunnelContainerRef.current) {
            tunnelCanvasRef.current.style.display = 'block';
            tunnelContainerRef.current.style.display = 'flex';

            setTimeout(() => {
                if (tunnelCanvasRef.current) tunnelCanvasRef.current.classList.add(styles.active);
                if (cardRef.current) cardRef.current.classList.add(styles.zoomIn);

                setTimeout(() => {
                    if (cardRef.current) cardRef.current.style.display = 'none';
                }, 2000);

                // Show Text Sequence
                setTimeout(() => {
                    setShowText(true);

                    // Show Micro-copy slightly after
                    setTimeout(() => {
                        setShowMicro(true);
                    }, 500);

                }, 1800);

                // Show Skip Button after a few seconds
                setTimeout(() => {
                    setShowSkip(true);
                }, 4000);

                // Hide text before redirect
                setTimeout(() => {
                    setShowText(false);
                    setShowMicro(false);
                    setShowSkip(false);
                }, 13000);

                // Redirect after 15 seconds
                setTimeout(() => {
                    proceedToResult();
                }, 15000);

            }, 100);
        }
    };

    // Use the hover image from the new assets folder
    const imagePath = `/MBTI/HOVER/${mbtiType.toUpperCase()}.png`;
    const description = descriptions[mbtiType] || "Your unique perspective shapes your world.";
    const microText = (mbtiType === 'INTJ' || mbtiType === 'INTP')
        ? "Resolving your dominant mental framework..."
        : "Mapping your decision architecture...";

    const handleRetake = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (confirm('Start over?')) {
            localStorage.removeItem('quiz_progress');
            router.push('/');
        }
    };

    // Helper to get color by type group
    const getTypeColor = (type: string) => {
        const t = type.toUpperCase();
        if (['INTJ', 'INTP', 'ENTJ', 'ENTP'].includes(t)) return '#884DFF'; // Analysts: Purple
        if (['INFJ', 'INFP', 'ENFJ', 'ENFP'].includes(t)) return '#00E6CC'; // Diplomats: Teal/Green
        if (['ISTJ', 'ISFJ', 'ESTJ', 'ESFJ'].includes(t)) return '#4298B5'; // Sentinels: Blue
        if (['ISTP', 'ISFP', 'ESTP', 'ESFP'].includes(t)) return '#FFD700'; // Explorers: Gold
        return '#00ffaa';
    };

    const typeColor = getTypeColor(mbtiType);

    const roleMap: Record<string, string> = {
        INTJ: "Architect", INTP: "Logician", ENTJ: "Commander", ENTP: "Debater",
        INFJ: "Advocate", INFP: "Mediator", ENFJ: "Protagonist", ENFP: "Campaigner",
        ISTJ: "Logistician", ISFJ: "Defender", ESTJ: "Executive", ESFJ: "Consul",
        ISTP: "Virtuoso", ISFP: "Adventurer", ESTP: "Entrepreneur", ESFP: "Entertainer"
    };

    const role = roleMap[mbtiType] || "Mind";

    return (
        <div className={styles.container}>
            <div id="portalCard" className={styles.portalCard} ref={cardRef}>
                <div className={styles.gooeyEffect}>
                    <div className={styles.gooeyBlob}></div>
                    <div className={styles.gooeyBlob}></div>
                    <div className={styles.gooeyBlob}></div>
                    <div className={styles.gooeyBlob}></div>
                </div>
                <div className={styles.portalContent}>

                    <h2>Your pattern aligns with</h2>
                    <h1>{mbtiType}</h1>
                    <p style={{
                        fontSize: '1rem',
                        color: 'rgba(0, 255, 238, 0.5)',
                        textShadow: '0 0 10px rgba(0, 255, 238, 0.3)',
                        textTransform: 'uppercase',
                        letterSpacing: '3px',
                        marginTop: '-10px',
                        marginBottom: '20px',
                        fontFamily: 'Orbitron, sans-serif'
                    }}>
                        [{role}]
                    </p>
                    <p className={styles.reframeText}>
                        This describes how your mind naturally seeks clarity, truth, and direction — not your limits.
                    </p>
                    <button id="portalButton" className={styles.portalButton} onClick={startPortal}>GO</button>

                    <button className={styles.retakeButton} onClick={handleRetake}>
                        Retake Quiz
                    </button>
                </div>
                <canvas className={styles.cardBg} ref={cardBgCanvasRef}></canvas>
            </div>

            <div id="tunnelContainer" className={styles.tunnelContainer} ref={tunnelContainerRef}>
                <canvas id="tunnelCanvas" className={styles.tunnelCanvas} ref={tunnelCanvasRef}></canvas>

                {/* Tunnel Text Overlay */}
                <div className={styles.tunnelOverlay}>
                    <div className={`${styles.tunnelText} ${showText ? styles.visible : ''}`}>
                        {description}
                    </div>
                    <div className={`${styles.microCopy} ${showMicro ? styles.visible : ''}`}>
                        {showText && microText}
                    </div>

                    {/* Skip Button */}
                    {showSkip && (
                        <button
                            className={styles.skipButton}
                            onClick={proceedToResult}
                            style={{
                                pointerEvents: 'auto',
                                '--type-color': typeColor
                            } as React.CSSProperties}
                        >
                            Begin Your Transformation →
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
