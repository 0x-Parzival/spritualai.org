'use client';

import React, { useState, useEffect, useRef } from 'react';
import styles from './creator.module.css';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Script from 'next/script';

// Helper for loading textures safely
const loadTexture = (url: string) => {
    return new THREE.TextureLoader().load(url);
}

const CreatorPage = () => {
    const [activePopup, setActivePopup] = useState<string | null>(null);
    const [maximized, setMaximized] = useState(false);
    const canvasRef = useRef<HTMLDivElement>(null);

    // --- Cosmic Anomaly 3D Logic ---
    useEffect(() => {
        if (!canvasRef.current || typeof window === 'undefined') return;

        // Dynamic imports for Three.js addons to avoid SSR issues
        let OrbitControls: any, EffectComposer: any, RenderPass: any, UnrealBloomPass: any, RGBELoader: any, Lensflare: any, LensflareElement: any;

        const initThree = async () => {
            const THREE = await import('three');
            const OrbitControlsModule = await import('three/examples/jsm/controls/OrbitControls.js');
            const EffectComposerModule = await import('three/examples/jsm/postprocessing/EffectComposer.js');
            const RenderPassModule = await import('three/examples/jsm/postprocessing/RenderPass.js');
            const UnrealBloomPassModule = await import('three/examples/jsm/postprocessing/UnrealBloomPass.js');
            const RGBELoaderModule = await import('three/examples/jsm/loaders/RGBELoader.js');
            const LensflareModule = await import('three/examples/jsm/objects/Lensflare.js');

            OrbitControls = OrbitControlsModule.OrbitControls;
            EffectComposer = EffectComposerModule.EffectComposer;
            RenderPass = RenderPassModule.RenderPass;
            UnrealBloomPass = UnrealBloomPassModule.UnrealBloomPass;
            RGBELoader = RGBELoaderModule.RGBELoader;
            Lensflare = LensflareModule.Lensflare;
            LensflareElement = LensflareModule.LensflareElement;

            setupScene(THREE);
        };

        let scene: THREE.Scene, camera: THREE.PerspectiveCamera, renderer: THREE.WebGLRenderer, composer: any, controls: any;
        let coreSphere: THREE.Points, orbitRings: THREE.Group, starfield: THREE.Points, centralLight: THREE.PointLight;
        let clock: THREE.Clock, mainGroup: THREE.Group;
        let mouse = new THREE.Vector2(-10, -10);
        let currentHdrTexture: THREE.Texture | null = null;
        let isExplosionActive = false;
        let explosionStartTime = 0;
        const explosionDuration = 2000;
        let frameId: number;

        // Shaders
        const pointMaterialShader = {
            vertexShader: `
                attribute float size;
                attribute vec3 randomDir;
                varying vec3 vColor;
                varying float vDistance;
                varying float vMouseEffect;
                uniform float time;
                uniform vec2 uMouse;
                uniform float uExplode;
                
                vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
                vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
                vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }
                
                float snoise(vec3 v) {
                    const vec2 C = vec2(1.0/6.0, 1.0/3.0);
                    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
                    vec3 i = floor(v + dot(v, C.yyy));
                    vec3 x0 = v - i + dot(i, C.xxx);
                    vec3 g = step(x0.yzx, x0.xyz);
                    vec3 l = 1.0 - g;
                    vec3 i1 = min(g.xyz, l.zxy);
                    vec3 i2 = max(g.xyz, l.zxy);
                    vec3 x1 = x0 - i1 + C.xxx;
                    vec3 x2 = x0 - i2 + C.yyy;
                    vec3 x3 = x0 - D.yyy;
                    i = mod289(i);
                    vec4 p = permute(permute(permute(i.z + vec4(0.0, i1.z, i2.z, 1.0)) + i.y + vec4(0.0, i1.y, i2.y, 1.0)) + i.x + vec4(0.0, i1.x, i2.x, 1.0));
                    float n_ = 0.142857142857;
                    vec3 ns = n_ * D.wyz - D.xzx;
                    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
                    vec4 x_ = floor(j * ns.z);
                    vec4 y_ = floor(j - 7.0 * x_);
                    vec4 x = x_ * ns.x + ns.yyyy;
                    vec4 y = y_ * ns.x + ns.yyyy;
                    vec4 h = 1.0 - abs(x) - abs(y);
                    vec4 b0 = vec4(x.xy, y.xy);
                    vec4 b1 = vec4(x.zw, y.zw);
                    vec4 s0 = floor(b0)*2.0 + 1.0;
                    vec4 s1 = floor(b1)*2.0 + 1.0;
                    vec4 sh = -step(h, vec4(0.0));
                    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
                    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;
                    vec3 p0 = vec3(a0.xy,h.x);
                    vec3 p1 = vec3(a0.zw,h.y);
                    vec3 p2 = vec3(a1.xy,h.z);
                    vec3 p3 = vec3(a1.zw,h.w);
                    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
                    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;
                    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
                    m = m * m;
                    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
                }
                void main() {
                    vColor = color;
                    float explodeAmount = uExplode * 35.0;
                    float turbulence = snoise(position * 0.4 + randomDir * 2.0 + time * 0.8) * 10.0 * uExplode;
                    vec3 explodedPos = position + randomDir * (explodeAmount + turbulence);
                    vec3 mixedPos = mix(position, explodedPos, uExplode);
                    vec4 projectedVertex = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
                    vec2 screenPos = projectedVertex.xy / projectedVertex.w;
                    float mouseDist = distance(screenPos, uMouse);
                    float mouseEffect = 1.0 - smoothstep(0.0, 0.25, mouseDist);
                    vMouseEffect = mouseEffect;
                    float noiseFrequency = 0.4;
                    float noiseAmplitude = (0.8 + mouseEffect * 3.5) * (1.0 - uExplode);
                    vec3 noiseInput = mixedPos * noiseFrequency + time * 0.5;
                    vec3 displacement = vec3(snoise(noiseInput), snoise(noiseInput + vec3(10.0)), snoise(noiseInput + vec3(20.0)));
                    vec3 finalPos = mixedPos + displacement * noiseAmplitude;
                    float pulse = sin(time + length(position)) * 0.1 + 1.0;
                    vec4 mvPosition = modelViewMatrix * vec4(finalPos, 1.0);
                    vDistance = -mvPosition.z;
                    gl_PointSize = size * (400.0 / -mvPosition.z) * pulse * (1.0 + vMouseEffect * 0.5);
                    gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying vec3 vColor;
                varying float vMouseEffect;
                uniform float time;
                uniform float uExplode;
                float rand(vec2 co){ return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453); }
                void main() {
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0;
                    float r = dot(cxy, cxy);
                    if (r > 1.0) discard;
                    float glow = exp(-r * 3.5) + vMouseEffect * 0.5;
                    float twinkle = rand(gl_PointCoord + time) * 0.5 + 0.5;
                    vec3 explosionColor = vec3(2.0, 3.0, 3.5); 
                    vec3 mixedColor = mix(vColor, explosionColor, uExplode * 0.8);
                    mixedColor *= (1.0 + uExplode * 6.0); 
                    vec3 finalColor = mixedColor * (1.1 + sin(time * 0.8) * 0.2 + vMouseEffect * 0.5) * glow * twinkle;
                    gl_FragColor = vec4(finalColor, smoothstep(0.0, 1.0, glow));
                }
            `
        };

        const starShader = {
            vertexShader: `
                attribute float size; varying vec3 vColor; uniform float time;
                void main() {
                    vColor = color; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                    float twinkle = sin(time * 3.0 + position.x * 0.1 + position.y * 0.2) * 0.3 + 0.7;
                    gl_PointSize = size * twinkle * (1000.0 / -mvPosition.z);
                    gl_Position = projectionMatrix * mvPosition;
                }`,
            fragmentShader: `
                varying vec3 vColor;
                void main() {
                    vec2 cxy = 2.0 * gl_PointCoord - 1.0; float r = dot(cxy, cxy); if (r > 1.0) discard;
                    float glow = exp(-r * 4.0); gl_FragColor = vec4(vColor, glow * 0.8);
                }`
        };

        const setupScene = (THREE: any) => {
            const container = canvasRef.current!;
            clock = new THREE.Clock();
            scene = new THREE.Scene();
            scene.fog = new THREE.FogExp2(0x000000, 0.008);
            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 50000);
            camera.position.set(0, 5, 14);

            renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: "high-performance" });
            renderer.setSize(container.clientWidth, container.clientHeight);
            renderer.setClearColor(0x000000);
            renderer.setPixelRatio(window.devicePixelRatio);

            // Clear previous canvas
            if (container.children.length > 0) container.innerHTML = '';
            container.appendChild(renderer.domElement);

            controls = new OrbitControls(camera, renderer.domElement);
            controls.enableDamping = true;
            controls.dampingFactor = 0.04;
            controls.rotateSpeed = 0.6;
            controls.minDistance = 10;
            controls.maxDistance = 50;
            controls.target.set(0, 0, 0);

            const renderScene = new RenderPass(scene, camera);
            const bloomPass = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 1.5, 0.4, 0.85);
            bloomPass.threshold = 0;
            bloomPass.strength = 1.2;
            bloomPass.radius = 0.5;

            composer = new EffectComposer(renderer);
            composer.addPass(renderScene);
            composer.addPass(bloomPass);

            // Objects
            coreSphere = createSpiralSphere(THREE, 5, 40000);
            orbitRings = createOrbitRings(THREE, 7.5, 8, 0.6);
            starfield = createStarfield(THREE, 10000, 50000);

            mainGroup = new THREE.Group();
            mainGroup.add(coreSphere);
            mainGroup.add(orbitRings);
            scene.add(mainGroup);
            scene.add(starfield);

            // Light & Lensflare
            centralLight = new THREE.PointLight(0xffffff, 2, 0);
            scene.add(centralLight);

            const textureLoader = new THREE.TextureLoader();
            const textureFlare0 = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare0.png');
            const textureFlare3 = textureLoader.load('https://threejs.org/examples/textures/lensflare/lensflare3.png');
            const lensflare = new Lensflare();
            lensflare.addElement(new LensflareElement(textureFlare0, 500, 0, centralLight.color));
            lensflare.addElement(new LensflareElement(textureFlare3, 60, 0.6));
            lensflare.addElement(new LensflareElement(textureFlare3, 70, 0.7));
            lensflare.addElement(new LensflareElement(textureFlare3, 120, 0.9));
            lensflare.addElement(new LensflareElement(textureFlare3, 70, 1));
            centralLight.add(lensflare);

            // Default Theme
            changeTheme(THREE, 'nebula');

            // Listeners
            window.addEventListener('resize', handleResize);
            window.addEventListener('mousemove', onMouseMove);

            animate();
        };

        const createSpiralSphere = (THREE: any, radius: number, particleCount: number) => {
            const geometry = new THREE.BufferGeometry();
            const positions = new Float32Array(particleCount * 3);
            const colors = new Float32Array(particleCount * 3);
            const sizes = new Float32Array(particleCount);
            const randomDirs = new Float32Array(particleCount * 3).fill(0);
            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                const phi = Math.acos(-1 + (2 * i) / particleCount);
                const theta = Math.sqrt(particleCount * Math.PI) * phi;
                positions[i3] = radius * Math.cos(theta) * Math.sin(phi);
                positions[i3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
                positions[i3 + 2] = radius * Math.cos(phi);
                sizes[i] = Math.random() * 0.2 + 0.1;
            }
            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
            geometry.setAttribute('randomDir', new THREE.BufferAttribute(randomDirs, 3));
            const material = new THREE.ShaderMaterial({
                uniforms: {
                    time: { value: 0 }, uMouse: { value: mouse }, uExplode: { value: 0.0 }
                },
                vertexShader: pointMaterialShader.vertexShader, fragmentShader: pointMaterialShader.fragmentShader,
                vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
            });
            return new THREE.Points(geometry, material);
        };

        const createOrbitRings = (THREE: any, radius: number, count: number, thickness: number) => {
            const group = new THREE.Group();
            for (let i = 0; i < count; i++) {
                const particleCount = 4000;
                const ringGeometry = new THREE.BufferGeometry();
                const positions = new Float32Array(particleCount * 3);
                const colors = new Float32Array(particleCount * 3);
                const sizes = new Float32Array(particleCount);
                const randomDirs = new Float32Array(particleCount * 3);
                const randomVec = new THREE.Vector3();
                for (let j = 0; j < particleCount; j++) {
                    const j3 = j * 3;
                    const angle = (j / particleCount) * Math.PI * 2;
                    const radiusVariation = radius + (Math.random() - 0.5) * thickness;
                    positions[j3] = Math.cos(angle) * radiusVariation;
                    positions[j3 + 1] = (Math.random() - 0.5) * (thickness * 0.5);
                    positions[j3 + 2] = Math.sin(angle) * radiusVariation;
                    sizes[j] = Math.random() * 0.15 + 0.08;
                    randomVec.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
                    randomDirs[j3] = randomVec.x; randomDirs[j3 + 1] = randomVec.y; randomDirs[j3 + 2] = randomVec.z;
                }
                ringGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
                ringGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
                ringGeometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
                ringGeometry.setAttribute('randomDir', new THREE.BufferAttribute(randomDirs, 3));
                const material = new THREE.ShaderMaterial({
                    uniforms: {
                        time: { value: 0 }, uMouse: { value: mouse }, uExplode: { value: 0.0 }
                    },
                    vertexShader: pointMaterialShader.vertexShader, fragmentShader: pointMaterialShader.fragmentShader,
                    vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
                });
                const ring = new THREE.Points(ringGeometry, material);
                ring.rotation.x = Math.random() * Math.PI;
                ring.rotation.y = Math.random() * Math.PI;
                group.add(ring);
            }
            return group;
        };

        const createStarfield = (THREE: any, count: number, spread: number) => {
            const geometry = new THREE.BufferGeometry();
            const positions = []; const colors = []; const sizes = [];
            for (let i = 0; i < count; i++) {
                positions.push((Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread, (Math.random() - 0.5) * spread);
                const color = new THREE.Color();
                color.setHSL(Math.random() * 0.1 - 0.05, 0.2, 0.5 + Math.random() * 0.5);
                colors.push(color.r, color.g, color.b);
                sizes.push(0.5 + Math.random() * 1.0);
            }
            geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            geometry.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));
            const material = new THREE.ShaderMaterial({
                uniforms: { time: { value: 0 } }, vertexShader: starShader.vertexShader, fragmentShader: starShader.fragmentShader,
                vertexColors: true, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending
            });
            return new THREE.Points(geometry, material);
        };

        const changeTheme = (THREE: any, themeName: string) => {
            if (!coreSphere) return; // Guard
            const themes: any = {
                nebula: {
                    sphere: [new THREE.Color(0x00ffff), new THREE.Color(0xff1493), new THREE.Color(0x4169e1), new THREE.Color(0xff69b4), new THREE.Color(0x00bfff)],
                    rings: (i: number, count: number, j: number, pCount: number) => new THREE.Color().setHSL((i / count) * 0.6 + (j / pCount) * 0.2 + 0.5, 0.8, 0.6),
                    hdr: 'https://www.spacespheremaps.com/wp-content/uploads/HDR_blue_nebulae-1.hdr'
                },
                sunset: {
                    sphere: [new THREE.Color(0xff4500), new THREE.Color(0xff8c00), new THREE.Color(0xffd700), new THREE.Color(0xff0080), new THREE.Color(0xda70d6)],
                    rings: (i: number, count: number, j: number, pCount: number) => new THREE.Color().setHSL((i / count) * 0.1 + (j / pCount) * 0.1 + 0.0, 0.9, 0.7),
                    hdr: 'https://www.spacespheremaps.com/wp-content/uploads/HDR_silver_and_gold_nebulae.hdr'
                },
                forest: {
                    sphere: [new THREE.Color(0x228b22), new THREE.Color(0x00ff7f), new THREE.Color(0x3cb371), new THREE.Color(0x1e90ff), new THREE.Color(0x87cefa)],
                    rings: (i: number, count: number, j: number, pCount: number) => new THREE.Color().setHSL((i / count) * 0.2 + (j / pCount) * 0.1 + 0.25, 0.8, 0.55),
                    hdr: 'https://www.spacespheremaps.com/wp-content/uploads/HDR_subdued_multi_nebulae.hdr'
                },
                aurora: {
                    sphere: [new THREE.Color(0x00ff7f), new THREE.Color(0x40e0d0), new THREE.Color(0x483d8b), new THREE.Color(0x9932cc), new THREE.Color(0x00fa9a)],
                    rings: (i: number, count: number, j: number, pCount: number) => new THREE.Color().setHSL((i / count) * 0.3 + (j / pCount) * 0.1 + 0.45, 0.9, 0.65),
                    hdr: 'https://www.spacespheremaps.com/wp-content/uploads/HDR_multi_nebulae.hdr'
                }
            };
            const theme = themes[themeName];
            if (!theme) return;

            const sphereColorsAttr = coreSphere.geometry.attributes.color;
            for (let i = 0; i < sphereColorsAttr.count; i++) {
                const colorPos = (i / sphereColorsAttr.count) * (theme.sphere.length - 1);
                const c1 = theme.sphere[Math.floor(colorPos)];
                const c2 = theme.sphere[Math.min(Math.floor(colorPos) + 1, theme.sphere.length - 1)];
                const newColor = new THREE.Color().copy(c1).lerp(c2, colorPos - Math.floor(colorPos));
                sphereColorsAttr.setXYZ(i, newColor.r, newColor.g, newColor.b);
            }
            sphereColorsAttr.needsUpdate = true;

            orbitRings.children.forEach((ring: any, i: number) => {
                const ringColorsAttr = ring.geometry.attributes.color;
                for (let j = 0; j < ringColorsAttr.count; j++) {
                    const newColor = theme.rings(i, orbitRings.children.length, j, ringColorsAttr.count);
                    ringColorsAttr.setXYZ(j, newColor.r, newColor.g, newColor.b);
                }
                ringColorsAttr.needsUpdate = true;
            });

            const rgbeLoader = new RGBELoader();
            rgbeLoader.load(theme.hdr, (texture: any) => {
                texture.mapping = THREE.EquirectangularReflectionMapping;
                if (currentHdrTexture) currentHdrTexture.dispose();
                scene.background = texture;
                scene.environment = texture;
                currentHdrTexture = texture;
            });
        };

        const onMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        };

        const handleResize = () => {
            if (!canvasRef.current) return;
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
        };

        const easeInOutCubic = (x: number) => {
            return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
        }

        const animate = () => {
            frameId = requestAnimationFrame(animate);
            if (!clock) return;

            const elapsedTime = clock.getElapsedTime();

            // Check custom window property for explosion (hack to bridge UI)
            const explodeActive = (window as any).isExplosionActive;

            if (explodeActive) {
                if (!isExplosionActive) { // Start
                    isExplosionActive = true;
                    explosionStartTime = elapsedTime;
                }
                const explosionTime = (elapsedTime - explosionStartTime) * 1000;
                const progress = Math.min(explosionTime / explosionDuration, 1.0);
                const pulseProgress = Math.sin(progress * Math.PI);
                const easedProgress = easeInOutCubic(pulseProgress);

                orbitRings.children.forEach((ring: any) => {
                    if (ring.material.uniforms) ring.material.uniforms.uExplode.value = easedProgress;
                });
                (coreSphere.material as any).uniforms.uExplode.value = easedProgress;

                if (progress >= 1.0) {
                    isExplosionActive = false;
                    (window as any).isExplosionActive = false; // Reset
                    const btn = document.getElementById('explode-btn');
                    if (btn) btn.classList.remove(styles.active);
                }
            }

            if (coreSphere && coreSphere.material) {
                (coreSphere.material as any).uniforms.time.value = elapsedTime;
                (coreSphere.material as any).uniforms.uMouse.value.copy(mouse);
            }

            if (orbitRings) {
                orbitRings.children.forEach((ring: any, index: number) => {
                    ring.material.uniforms.time.value = elapsedTime;
                    ring.material.uniforms.uMouse.value.copy(mouse);

                    const speed = 0.0005 * (index + 1);
                    ring.rotation.z += speed;
                    ring.rotation.x += speed * 0.3;
                    ring.rotation.y += speed * 0.2;
                    ring.scale.y = 1.0 + Math.sin(elapsedTime * 3.0 + index * 0.5) * 0.2;
                });
            }

            if (starfield) (starfield.material as any).uniforms.time.value = elapsedTime;

            if (mainGroup) mainGroup.rotation.y += 0.0005;

            controls.update();
            composer.render();
        };

        // Bridge for React UI to call 3D functions
        (window as any).changeCosmicTheme = (theme: string) => {
            // We need to pass the THREE instance or have it captured
            // A bit tricky with dynamic import. We can store it globally or use a ref.
            // For simplicity in this complex refactor, we rely on closure if initThree finished.
            // But initThree is async.
            // Let's re-import THREE or just capture it from initThree scope?
            import('three').then((T) => changeTheme(T, theme));
        };
        (window as any).triggerCosmicExplosion = () => {
            if (!(window as any).isExplosionActive) {
                (window as any).isExplosionActive = true;
            }
        };

        initThree();

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', onMouseMove);
            if (renderer) renderer.dispose();
            if (canvasRef.current && renderer) canvasRef.current.removeChild(renderer.domElement);
            // Cleanup textures, geoms...
        };
    }, []);

    const togglePopup = (modal: string) => {
        setActivePopup(activePopup === modal ? null : modal);
        setMaximized(false);
    };

    const closePopup = () => setActivePopup(null);

    const timelineEvents = [
        {
            date: "Childhood - 2014",
            title: "Kid with a Calculator Brain",
            desc: "Long before I wrote code, I was obsessed with patterns. At age X, I won a State Level Abacus Competition because evidently, I liked being a human calculator. I also joined a world record dance event at Khalsa College, proving that even nerds have rhythm.",
            images: ["/images/portfolio/abacus certificate.jpeg", "/images/portfolio/abacus award winning.jpeg", "/images/portfolio/star kalakar.jpeg"]
        },
        {
            date: "2020 - 2021",
            title: "The Internet Woke Me Up",
            desc: "While the world was locked down, I went online. I got my first Google certification and started doing graphic design because making things look cool is a superpower. This is also when I read my first non academic book. Yes, I actually started reading for fun.",
            images: ["/images/portfolio/can.jpeg", "/images/portfolio/first printed card.jpeg", "/images/portfolio/reading book became habit.jpeg", "/images/portfolio/book summaries.jpeg"],
            link: "https://www.instagram.com/booklyn01/"
        },
        {
            date: "2021 - 2022",
            title: "Cybersecurity & Fast Cars",
            desc: "I dive into cybersecurity to learn trust and vulnerability, basically hacker school but ethical. Later, I helped IIT Delhi students build a Formula 1 car. And I earned my first income in crypto, which felt incredibly futuristic.",
            images: ["/images/portfolio/f1 car iitd.jpeg", "/images/portfolio/finsihed f1 car iitd.jpeg", "/images/portfolio/81$ first income cyber security.jpeg"]
        },
        {
            date: "2022 - 2023",
            title: "Trying Literally Everything",
            desc: "I entered my experimental phase. Designed shoes? Checked. Made a web series? Checked. Learned chess, sketching, and beatboxing? Triple check. I was a jack of all trades and having a blast doing it.",
            images: ["/images/portfolio/logo kb.jpeg", "/images/portfolio/shoe design.jpeg", "/images/portfolio/first website keshav bruh.jpeg", "/images/portfolio/my drawings.jpeg", "/images/portfolio/progress in chess.jpeg"]
        },
        {
            date: "2023",
            title: "Upgrading the Hardware",
            desc: "I realized my brain needed a better vessel, so I focused on my body. Less motivation, more discipline. I turned into a gym person and actually liked it.",
            images: ["/images/portfolio/started focusing on body.jpeg", "/images/portfolio/body at janam astami.jpeg", "/images/portfolio/motor skaates.jpeg"]
        },
        {
            date: "Era of Rhythm",
            title: "Flute Beatboxing is a Thing",
            desc: "I discovered I could play the flute and beatbox at the same time. It sounds crazy, but it’s basically breathing with style. Music became my meditation.",
            images: ["/images/portfolio/first try with flute beatboxing.jpeg", "/images/portfolio/performance at rkgit.jpeg", "/images/portfolio/got the new flute.jpeg"],
            video: "https://www.youtube.com/watch?v=wZObKU02jcY"
        },
        {
            date: "2023 - 2024",
            title: "Jedi Mind Tricks (Gesture AI)",
            desc: "I got tired of keyboards, so I built Gesture AI. Now I can control laptops and write in the air just by waving my hands. It got me into the IIT Delhi Startup Expo, and I feel like a wizard using it.",
            images: ["/images/portfolio/creating gesture ai project.jpeg", "/images/portfolio/using finger to write gesture ai.jpeg", "/images/portfolio/iitd startup expo.jpeg"],
            video: "/images/portfolio/controling car with hand gestures.mp4",
            link: "https://www.instagram.com/gesture_ai/"
        },
        {
            date: "2024",
            title: "The Year Life Hit Hard",
            desc: "Not all growth happens on a screen. I faced personal loss and illness this year. Losing my grandmother and dealing with jaundice forced me to slow down. I went to the hills to heal, and nature did its work.",
            images: ["/images/portfolio/grand mother death.jpeg", "/images/portfolio/jaundice.jpeg", "/images/portfolio/harshil.jpeg"]
        },
        {
            date: "2024 - 2026",
            title: "Spiritual Intelligence Meets AI",
            desc: "Meditation wasn’t just an escape, it was an upgrade. I started reading Osho and realized AI is a mirror for consciousness. So I built this platform, SpiritualAI, to bridge the gap. Plus, making AI comics is really fun.",
            images: ["/images/portfolio/spritual ai geneated comic stories.jpeg", "/images/portfolio/realation of spritualty and ai.jpeg", "/images/portfolio/osho library.jpeg", "/images/portfolio/future society.jpeg"],
            video: "/images/portfolio/first ai generated video for client, video is in landscape more.mp4",
            link: "https://spiritualai.org"
        },
        {
            date: "2026",
            title: "Right Now",
            desc: "I am just a conscious creator building cool systems. My goal isn't just efficiency, it's evolution. And making sure the future is human friendly.",
            images: ["/images/portfolio/consious creator.jpeg"]
        }
    ];

    return (
        <div className={styles.container}>
            {/* 3D Background */}
            <div ref={canvasRef} className={styles.canvasContainer}></div>

            {/* Back Button */}
            {/* Back Button */}
            <Link href="/" className={styles.backLink}>
                ⬅ Back to Home
            </Link>

            {/* Site Logo */}
            <div className={styles.logoContainer}>
                <img src="/images/logo.png" alt="Spiritual AI Logo" className={styles.logoImg} />
            </div>

            {/* Cosmic Controls */}
            <div className={styles.themeSelector}>
                <div className={`${styles.themeSwatch}`} onClick={() => (window as any).changeCosmicTheme?.('nebula')} style={{ background: 'linear-gradient(45deg, #00ffff, #ff1493)' }}></div>
                <div className={`${styles.themeSwatch}`} onClick={() => (window as any).changeCosmicTheme?.('sunset')} style={{ background: 'linear-gradient(45deg, #ff8c00, #ff0080)' }}></div>
                <div className={`${styles.themeSwatch}`} onClick={() => (window as any).changeCosmicTheme?.('forest')} style={{ background: 'linear-gradient(45deg, #00ff7f, #1e90ff)' }}></div>
                <div className={`${styles.themeSwatch}`} onClick={() => (window as any).changeCosmicTheme?.('aurora')} style={{ background: 'linear-gradient(45deg, #00ff7f, #9932cc)' }}></div>

                <div id="explode-btn" className={`${styles.controlBtn} ${styles.explodeBtn}`} title="Trigger Explosion" onClick={() => (window as any).triggerCosmicExplosion?.()}>
                    💥
                </div>
            </div>

            {/* Bottom Icon Bar */}
            <section className={styles.section}>
                <div className={styles.iconContainer}>
                    <div className={styles.iconWrapper} onClick={() => togglePopup('about')}>
                        <div className={`${styles.iconBox} ${styles.aboutIcon}`} title="About Me">
                            <i className="fa-regular fa-address-card"></i> 👤
                            <span className={styles.tooltipText}>About Me</span>
                        </div>
                        <span className={styles.buttonLabel}>WHO AM I?</span>
                    </div>

                    <div className={styles.iconWrapper} onClick={() => togglePopup('projects')}>
                        <div className={`${styles.iconBox} ${styles.projectsIcon}`} title="Projects">
                            <i className="fa-solid fa-laptop-code"></i> 💻
                            <span className={styles.tooltipText}>Projects</span>
                        </div>
                        <span className={styles.buttonLabel}>CREATIONS</span>
                    </div>

                    <div className={styles.iconWrapper} onClick={() => togglePopup('testimonial')}>
                        <div className={`${styles.iconBox} ${styles.testimonialIcon}`} title="Highlights">
                            <i className="fa-solid fa-users-rectangle"></i> 📜
                            <span className={styles.tooltipText}>Highlights</span>
                        </div>
                        <span className={styles.buttonLabel}>HIGHLIGHTS</span>
                    </div>

                    <div className={styles.iconWrapper} onClick={() => togglePopup('contact')}>
                        <div className={`${styles.iconBox} ${styles.contactIcon}`} title="Contact">
                            <i className="fa-solid fa-envelope"></i> 📧
                            <span className={styles.tooltipText}>Contact</span>
                        </div>
                        <span className={styles.buttonLabel}>CONNECT</span>
                    </div>

                    <Link href="/resume" target="_blank" className={styles.resumeLinkWrapper}>
                        <div className={styles.iconWrapper}>
                            <div className={`${styles.iconBox} ${styles.resumeIcon}`} title="Resume">
                                📄
                                <span className={styles.tooltipText}>Resume</span>
                            </div>
                            <span className={styles.buttonLabel}>DOSSIER</span>
                        </div>
                    </Link>
                </div>
            </section>

            {/* Popups */}
            <AnimatePresence>
                {activePopup === 'about' && (
                    <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={styles.popupContainer}>
                            <div className={styles.popupHeader}>
                                <div className={styles.buttonContainer}>
                                    <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                    <button className={`${styles.circleBtn} ${styles.yellow}`} onClick={() => setMaximized(false)}></button>
                                    <button className={`${styles.circleBtn} ${styles.green}`} onClick={() => setMaximized(!maximized)}></button>
                                </div>
                                <span style={{ marginLeft: '10px' }}>Who Am I?</span>
                            </div>
                            <div className={styles.popupBody}>
                                <div className={styles.aboutContainer}>
                                    <div className={styles.imgFrame}>
                                        <img src="/creator_assets/me.jpeg" alt="Keshav Baliyan" />
                                    </div>
                                    <div className={styles.aboutContent}>
                                        <h1 className={styles.aboutTitle}>OPERATOR: Keshav Baliyan (0xPARZIVAL)</h1>
                                        <p style={{ fontFamily: 'Orbitron, monospace', color: '#00e5ff', fontSize: '0.8rem', marginBottom: '15px' }}>
                                            <strong>SYSTEM IDENTITY:</strong> Code Architect of Consciousness<br />
                                            <strong>MISSION:</strong> Integrating Artificial Intelligence with Vedic Systems<br />
                                            <strong>ORIGIN:</strong> Sector 2014 [Abacus Logic Initialization]
                                        </p>
                                        <p style={{ marginTop: '10px' }}>
                                            Building systems that go beyond just ones and zeros. Mixing <span style={{ color: '#a2ea37' }}>Gesture AI</span>, <span style={{ color: '#00e5ff' }}>KalkiOS</span>, and <span style={{ color: '#ff9e80' }}>Spiritual AI</span> to help us evolve a little faster.
                                        </p>

                                        <div className={styles.timeline}>
                                            {timelineEvents.map((ev: any, i) => (
                                                <div key={i} className={styles.timelineItem}>
                                                    <div className={styles.timelineDate}>{ev.date}</div>
                                                    <div className={styles.timelineContent}>
                                                        <strong>{ev.title}</strong>: {ev.desc}

                                                        {/* Images Grid */}
                                                        {ev.images && ev.images.length > 0 && (
                                                            <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', gap: '8px' }}>
                                                                {ev.images.map((img: string, idx: number) => (
                                                                    <div key={idx} style={{ borderRadius: '6px', overflow: 'hidden', height: '80px', background: '#222' }}>
                                                                        <img src={img} alt={`${ev.title} ${idx}`} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        {/* Video Embed or Link */}
                                                        {ev.video && (
                                                            <div style={{ marginTop: '10px' }}>
                                                                {ev.video.endsWith('.mp4') ? (
                                                                    <video
                                                                        src={ev.video}
                                                                        controls
                                                                        style={{ width: '100%', borderRadius: '8px', marginTop: '5px', border: '1px solid #333' }}
                                                                    />
                                                                ) : (
                                                                    <a href={ev.video} target="_blank" style={{ color: '#00e5ff', fontSize: '0.9rem' }}>▶ Watch Video</a>
                                                                )}
                                                            </div>
                                                        )}

                                                        {/* External Link */}
                                                        {ev.link && (
                                                            <div style={{ marginTop: '5px' }}>
                                                                <a href={ev.link} target="_blank" style={{ color: '#a2ea37', fontSize: '0.9rem' }}>🔗 Learn More</a>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            ))}
                                        </div>

                                        <div style={{ marginTop: '30px', textAlign: 'center' }}>
                                            <Link href="/resume" target="_blank" style={{
                                                display: 'inline-block',
                                                padding: '12px 24px',
                                                background: 'linear-gradient(45deg, #00c6ff, #0072ff)',
                                                color: 'white',
                                                textDecoration: 'none',
                                                borderRadius: '30px',
                                                fontWeight: 'bold',
                                                boxShadow: '0 4px 15px rgba(0, 114, 255, 0.4)',
                                                transition: 'transform 0.2s'
                                            }}>
                                                View & Download CV 📄
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activePopup === 'projects' && (
                    <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={styles.popupContainer}>
                            <div className={styles.popupHeader}>
                                <div className={styles.buttonContainer}>
                                    <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                    <button className={`${styles.circleBtn} ${styles.yellow}`} onClick={() => setMaximized(false)}></button>
                                    <button className={`${styles.circleBtn} ${styles.green}`} onClick={() => setMaximized(!maximized)}></button>
                                </div>
                                <span style={{ marginLeft: '10px' }}>Creations</span>
                            </div>
                            <div className={styles.popupBody}>
                                <div className={styles.skillList}>
                                    <h1>Tech Stack</h1>
                                    <div className={styles.skillTags}>
                                        {['HTML5', 'CSS3', 'Javascript', 'React', 'Next.js', 'Three.js', 'Python', 'AI/ML', 'Solidity'].map(skill => (
                                            <span key={skill} className={styles.skillTag}>{skill}</span>
                                        ))}
                                    </div>
                                </div>

                                <div className={styles.projectsGrid}>
                                    <a href="https://spritualai.org" target="_blank" className={styles.projectCard}>
                                        <img src="/creator_assets/spiritualai.png" alt="Spiritual AI" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                                        <div className={styles.projectTitle}>Spiritual AI</div>
                                        <div className={styles.projectDesc}>
                                            A platform bridging spirituality and artificial intelligence. Digital products for the soul.
                                        </div>
                                        <span className={styles.projectLink}>Visit Site</span>
                                    </a>
                                    <a href="https://www.instagram.com/gesture_ai/" target="_blank" className={styles.projectCard}>
                                        <img src="/creator_assets/gesture.png" alt="Gesture AI" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                                        <div className={styles.projectTitle}>Gesture AI</div>
                                        <div className={styles.projectDesc}>
                                            Controlling digital environments with hand gestures. Featured at IITD Startup Expo.
                                        </div>
                                        <span className={styles.projectLink}>Instagram</span>
                                    </a>
                                    <a href="https://github.com/0x-Parzival/kalki1" target="_blank" className={styles.projectCard}>
                                        <img src="/creator_assets/kalkios.png" alt="KalkiOS" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                                        <div className={styles.projectTitle}>KalkiOS</div>
                                        <div className={styles.projectDesc}>
                                            An AI Operating System designed for the Satya Yuga. Conscious computing.
                                        </div>
                                        <span className={styles.projectLink}>GitHub</span>
                                    </a>
                                    <a href="https://cyber-sentinel-suite.vercel.app/" target="_blank" className={styles.projectCard}>
                                        <img src="/creator_assets/cyber_ai.png" alt="Cyber AI" style={{ width: '100%', borderRadius: '8px', marginBottom: '10px' }} />
                                        <div className={styles.projectTitle}>Cyber AI</div>
                                        <div className={styles.projectDesc}>
                                            The Cyber Sentinel Suite. Next-gen cybersecurity solutions.
                                        </div>
                                        <span className={styles.projectLink}>Visit App</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activePopup === 'testimonial' && (
                    <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={styles.popupContainer}>
                            <div className={styles.popupHeader}>
                                <div className={styles.buttonContainer}>
                                    <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                    <button className={`${styles.circleBtn} ${styles.yellow}`} onClick={() => setMaximized(false)}></button>
                                    <button className={`${styles.circleBtn} ${styles.green}`} onClick={() => setMaximized(!maximized)}></button>
                                </div>
                                <span style={{ marginLeft: '10px' }}>Highlights & Vibes</span>
                            </div>
                            <div className={styles.popupBody}>
                                <div className={styles.aboutContent}>
                                    <h1>Vibe Stories</h1>
                                    <p>Check out my journey and vibe stories on Instagram:</p>
                                    <ul style={{ listStyle: 'none', padding: 0 }}>
                                        <li style={{ marginBottom: '10px' }}>
                                            <a href="https://www.instagram.com/stories/highlights/18015614864520376/" target="_blank" style={{ color: '#a2ea37', textDecoration: 'none' }}>✨ Vibes Story Vol. 1</a>
                                        </li>
                                        <li style={{ marginBottom: '10px' }}>
                                            <a href="https://www.instagram.com/stories/highlights/17879756100232027/" target="_blank" style={{ color: '#a2ea37', textDecoration: 'none' }}>✨ Vibes Story Vol. 2 (2025)</a>
                                        </li>
                                        <li style={{ marginBottom: '10px' }}>
                                            <a href="https://www.instagram.com/stories/highlights/18077547250593664/" target="_blank" style={{ color: '#a2ea37', textDecoration: 'none' }}>📖 Comic Book Short Stories</a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {activePopup === 'contact' && (
                    <motion.div className={`${styles.popup} ${maximized ? styles.maximized : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className={styles.popupContainer}>
                            <div className={styles.popupHeader}>
                                <div className={styles.buttonContainer}>
                                    <button className={`${styles.circleBtn} ${styles.red}`} onClick={closePopup}></button>
                                    <button className={`${styles.circleBtn} ${styles.yellow}`} onClick={() => setMaximized(false)}></button>
                                    <button className={`${styles.circleBtn} ${styles.green}`} onClick={() => setMaximized(!maximized)}></button>
                                </div>
                                <span style={{ marginLeft: '10px' }}>Contact</span>
                            </div>
                            <div className={styles.popupBody}>
                                <div className={styles.aboutContent} style={{ textAlign: 'center' }}>
                                    <h1>Get in Touch</h1>
                                    <p>Connect with me on social media:</p>
                                    <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', marginTop: '20px', fontSize: '2rem' }}>
                                        <a href="https://in.linkedin.com/in/keshav-baliyan-749188245" target="_blank" title="LinkedIn">🔗</a>
                                        <a href="https://github.com/0x-Parzival" target="_blank" title="GitHub">🐙</a>
                                        <a href="https://www.instagram.com/heyyy_keshav/" target="_blank" title="Instagram">📸</a>
                                        <a href="https://wa.me/7457852306" target="_blank" title="WhatsApp">💬</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* SEO & Authority Section */}
            <section className={styles.seoSection}>
                <div className={styles.seoContent}>
                    <Script
                        id="person-schema"
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "Person",
                                "name": "Keshav Baliyan",
                                "jobTitle": "Founder & System Architect",
                                "worksFor": {
                                    "@type": "Organization",
                                    "name": "Spiritual AI"
                                },
                                "url": "https://spiritualai.store/creator",
                                "sameAs": [
                                    "https://www.linkedin.com/in/keshav-baliyan/",
                                    "https://github.com/0x-Parzival",
                                    "https://www.instagram.com/heyyy_keshav/"
                                ],
                                "description": "Keshav Baliyan is the creator of Spiritual AI, an architect of cognitive systems blending Vedic philosophy with artificial intelligence."
                            })
                        }}
                    />
                    <h1 className={styles.seoTitle}>The Architect Behind the System</h1>
                    <div className={styles.seoText}>
                        <p>
                            <strong>Keshav Baliyan</strong> is not just a developer; he is a <em>System Architect of Consciousness</em>.
                            Founded on the principles of <strong>Spiritual Intelligence</strong> and <strong>Cognitive Architecture</strong>,
                            his work bridges the gap between ancient Vedic wisdom and modern Artificial Intelligence.
                        </p>
                        <p>
                            As the creator of <strong>Spiritual AI</strong> and <strong>KalkiOS</strong>, Keshav designs digital environments that do not just optimize workflow,
                            but evolve the user's state of mind. His systems are built for those who refuse to choose between efficiency and enlightenment.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CreatorPage;
