"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';

const themes = [
    { name: 'Cyber', primary: 0x00d2ff, secondary: 0xff00aa, bloomStr: 0.8, uiBorder: '#00d2ff', grad: 'radial-gradient(circle at center, #1a1a2e 0%, #000000 100%)' },
    { name: 'Solar', primary: 0xffaa00, secondary: 0xff4400, bloomStr: 1.0, uiBorder: '#ffaa00', grad: 'radial-gradient(circle at center, #2e1a1a 0%, #000000 100%)' },
    { name: 'Venom', primary: 0x55ff55, secondary: 0x00aa00, bloomStr: 0.6, uiBorder: '#55ff55', grad: 'radial-gradient(circle at center, #1a2e1a 0%, #000000 100%)' }
];

export default function SynapseBrain() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [activeTheme, setActiveTheme] = useState(0);
    const lineMatRef = useRef<THREE.ShaderMaterial | null>(null);
    const particlesMatRef = useRef<THREE.ShaderMaterial | null>(null);
    const bloomPassRef = useRef<UnrealBloomPass | null>(null);
    const lineGeoRef = useRef<THREE.BufferGeometry | null>(null);
    const particlesGeoRef = useRef<THREE.BufferGeometry | null>(null);
    const bgRef = useRef<HTMLDivElement>(null);

    // Initial setup
    useEffect(() => {
        if (!containerRef.current) return;
        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const CONFIG = { points: 150000, dt: 0.008, scale: 9.0, a: 1.0, b: 3.0, c: 1.0, d: 5.0, r: 0.006, s: 4.0, x1: -1.6, I: 3.0 };

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x050505, 0.012);

        const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
        camera.position.set(40, 15, 60);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(width, height);
        renderer.toneMapping = THREE.ReinhardToneMapping;
        container.appendChild(renderer.domElement);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.enableZoom = false;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.8;
        controls.maxDistance = 150;
        controls.minDistance = 10;

        const renderScene = new RenderPass(scene, camera);
        const bloomPass = new UnrealBloomPass(new THREE.Vector2(width, height), 1.5, 0.4, 0.85);
        bloomPass.threshold = 0.15;
        bloomPass.strength = 0.8;
        bloomPass.radius = 0.4;
        bloomPassRef.current = bloomPass;

        const outputPass = new OutputPass();
        const composer = new EffectComposer(renderer);
        composer.addPass(renderScene);
        composer.addPass(bloomPass);
        composer.addPass(outputPass);

        function createAttractorData() {
            const positions = []; const colors = []; const lineDistances = []; const particleOffsets = []; const particleSizes = [];
            let x = -1, y = 0, z = 0; const color = new THREE.Color(); let totalDist = 0;
            for (let i = 0; i < CONFIG.points; i++) {
                const dx = y - CONFIG.a * Math.pow(x, 3) + CONFIG.b * Math.pow(x, 2) - z + CONFIG.I;
                const dy = CONFIG.c - CONFIG.d * Math.pow(x, 2) - y;
                const dz = CONFIG.r * (CONFIG.s * (x - CONFIG.x1) - z);
                const prevX = x * CONFIG.scale; const prevY = y * CONFIG.scale * 0.6; const prevZ = z * CONFIG.scale * 2.0;
                x += dx * CONFIG.dt; y += dy * CONFIG.dt; z += dz * CONFIG.dt;
                const vx = y * CONFIG.scale * 0.6; const vy = x * CONFIG.scale; const vz = z * CONFIG.scale * 2.0;
                positions.push(vx, vy, vz);
                if (i > 0) {
                    const dist = Math.sqrt(Math.pow(vx - prevY, 2) + Math.pow(vy - prevX, 2) + Math.pow(vz - prevZ, 2));
                    totalDist += dist * 0.05;
                }
                lineDistances.push(totalDist);
                const normalizedHeight = (x + 2.0) / 4.0;
                color.setHSL(0.6 - (normalizedHeight * 0.4), 0.8, 0.5);
                colors.push(color.r, color.g, color.b);
                particleOffsets.push(Math.random() * 100);
                if (Math.random() > 0.95 || normalizedHeight > 0.6) {
                    particleSizes.push(Math.random() * 1.5 + (normalizedHeight * 2.0));
                } else {
                    particleSizes.push(0.0);
                }
            }
            return { positions, colors, lineDistances, particleOffsets, particleSizes };
        }

        const data = createAttractorData();
        const lineGeo = new THREE.BufferGeometry();
        lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(data.positions, 3));
        lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(data.colors, 3));
        lineGeo.setAttribute('lineDistance', new THREE.Float32BufferAttribute(data.lineDistances, 1));
        lineGeo.computeBoundingSphere();
        const center = lineGeo.boundingSphere!.center;
        lineGeo.translate(-center.x, -center.y, -center.z);
        lineGeoRef.current = lineGeo;

        const lineMat = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0.0 }, uEnergyColor: { value: new THREE.Color(0x00d2ff) } },
            vertexShader: `
                attribute float lineDistance; attribute vec3 color; varying vec3 vColor; varying float vDistance; varying float vHeight;
                void main() { vColor = color; vDistance = lineDistance; vHeight = (position.y + 15.0) / 30.0; vec4 mvPosition = modelViewMatrix * vec4(position, 1.0); gl_Position = projectionMatrix * mvPosition; }
            `,
            fragmentShader: `
                uniform float time; uniform vec3 uEnergyColor; varying vec3 vColor; varying float vDistance; varying float vHeight;
                void main() {
                    float flow1 = sin(vDistance * 50.0 - time * 15.0);
                    float flow2 = sin(vDistance * 150.0 - time * 40.0);
                    float pulse = smoothstep(0.6, 1.0, flow1) * 0.9 + smoothstep(0.8, 1.0, flow2) * 0.6;
                    float burst = smoothstep(0.4, 0.9, vHeight) * 2.0;
                    vec3 finalColor = mix(vColor * 0.1, uEnergyColor, pulse + burst * 0.2);
                    float brightness = 1.0 + (pulse * 2.5) + (burst * 1.5);
                    float alpha = 0.6 + pulse * 0.4;
                    gl_FragColor = vec4(finalColor * brightness, alpha);
                }
            `,
            transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
        });
        lineMatRef.current = lineMat;

        const lineMesh = new THREE.Line(lineGeo, lineMat);
        scene.add(lineMesh);

        const particlesGeo = new THREE.BufferGeometry();
        particlesGeo.setAttribute('position', lineGeo.getAttribute('position'));
        particlesGeo.setAttribute('color', lineGeo.getAttribute('color'));
        particlesGeo.setAttribute('size', new THREE.Float32BufferAttribute(data.particleSizes, 1));
        particlesGeo.setAttribute('offset', new THREE.Float32BufferAttribute(data.particleOffsets, 1));
        particlesGeoRef.current = particlesGeo;

        const particlesMat = new THREE.ShaderMaterial({
            uniforms: { time: { value: 0.0 } },
            vertexShader: `
                attribute float size; attribute float offset; uniform float time; varying float vOpacity; varying vec3 vColor; attribute vec3 color;
                void main() {
                    vColor = color; vec3 pos = position; float breathe = sin(time * 2.0 + offset) * 0.5; pos += normal * breathe;
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0); gl_PointSize = size * (300.0 / -mvPosition.z); vOpacity = 0.6 + 0.4 * sin(time * 5.0 + offset); gl_Position = projectionMatrix * mvPosition;
                }
            `,
            fragmentShader: `
                varying float vOpacity; varying vec3 vColor;
                void main() {
                    vec2 center = gl_PointCoord - 0.5; float dist = length(center); if (dist > 0.5) discard;
                    float glow = 1.0 - (dist * 2.0); glow = pow(glow, 2.0); gl_FragColor = vec4(vColor, vOpacity * glow);
                }
            `,
            transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
        });
        particlesMatRef.current = particlesMat;

        const particleSystem = new THREE.Points(particlesGeo, particlesMat);
        scene.add(particleSystem);

        function createStarfield() {
            const starGeo = new THREE.BufferGeometry(); const starCount = 3000; const pos = []; const cols = []; const c = new THREE.Color();
            for (let i = 0; i < starCount; i++) {
                const r = 200 + Math.random() * 300; const theta = Math.random() * Math.PI * 2; const phi = Math.acos(2 * Math.random() - 1);
                pos.push(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
                const type = Math.random();
                if (type > 0.9) c.setHex(0xaaaaaa); else if (type > 0.6) c.setHex(0x4444ff); else c.setHex(0x221144);
                cols.push(c.r, c.g, c.b);
            }
            starGeo.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
            starGeo.setAttribute('color', new THREE.Float32BufferAttribute(cols, 3));
            const starMat = new THREE.PointsMaterial({ size: 1.5, vertexColors: true, transparent: true, opacity: 0.6, sizeAttenuation: true, blending: THREE.AdditiveBlending });
            return new THREE.Points(starGeo, starMat);
        }
        const stars = createStarfield();
        scene.add(stars);

        const clock = new THREE.Clock();
        let animationId: number;

        function animate() {
            animationId = requestAnimationFrame(animate);
            const delta = clock.getDelta();
            lineMat.uniforms.time.value += delta;
            particlesMat.uniforms.time.value += delta;
            stars.rotation.y -= delta * 0.05;
            controls.update();
            composer.render();
        }

        animate();

        const handleResize = () => {
            if (!container) return;
            const newWidth = container.clientWidth;
            const newHeight = container.clientHeight;
            camera.aspect = newWidth / newHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(newWidth, newHeight);
            composer.setSize(newWidth, newHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    // Theme Switcher Effect
    useEffect(() => {
        const t = themes[activeTheme];
        if (bgRef.current) bgRef.current.style.background = t.grad;
        if (lineMatRef.current) lineMatRef.current.uniforms.uEnergyColor.value.setHex(t.primary);
        if (bloomPassRef.current) bloomPassRef.current.strength = t.bloomStr;
        
        // Update line colors if geometry exists
        if (lineGeoRef.current && particlesGeoRef.current) {
            const colors = lineGeoRef.current.attributes.color.array;
            const tempColor = new THREE.Color();
            const positions = lineGeoRef.current.attributes.position.array;
            const count = 150000; // CONFIG.points

            for(let i=0; i < count; i++) {
                const yVal = positions[i*3 + 1];
                const h = (yVal/9.0 + 2.0)/4.0;
                tempColor.setHex(t.secondary).lerp(new THREE.Color(t.primary), h);
                // @ts-ignore
                colors[i*3] = tempColor.r; 
                // @ts-ignore
                colors[i*3+1] = tempColor.g; 
                // @ts-ignore
                colors[i*3+2] = tempColor.b;
            }
            lineGeoRef.current.attributes.color.needsUpdate = true;
            particlesGeoRef.current.attributes.color.needsUpdate = true;
        }

    }, [activeTheme]);

    return (
        <div ref={bgRef} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0, background: themes[0].grad, transition: 'background 0.5s ease' }}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
        </div>
    );
}
