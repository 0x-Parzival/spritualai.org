"use client";

import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader.js';

export default function FlowingParticles() {
    const containerRef = useRef<HTMLDivElement>(null);
    const materialRef = useRef<THREE.ShaderMaterial | null>(null);
    const clockRef = useRef<THREE.Clock | null>(null);
    const [isEnergized, setIsEnergized] = useState(false);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;
        const width = container.clientWidth;
        const height = container.clientHeight;

        const params = {
            numParticles: 300_000,
            numThreads: 400,
            particleSize: 12.0,
            flowSpeed: 0.20,
            minY: -5.0,
            maxY: 5.0,
            neckRadius: 2.2,
            flare: 2.5,
            twistTurns: 0.5,
            goldHue: 48.0 / 360.0,
            fieryHue: 20.0 / 360.0
        };
        // @ts-ignore
        params.particlesPerThread = Math.floor(params.numParticles / params.numThreads);
        // @ts-ignore
        params.numParticles = params.numThreads * params.particlesPerThread;

        const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setSize(width, height);
        renderer.outputColorSpace = THREE.SRGBColorSpace;
        renderer.toneMapping = THREE.ACESFilmicToneMapping;
        renderer.toneMappingExposure = 1.0;
        container.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        // Transparent background
        
        const camera = new THREE.PerspectiveCamera(70, width / height, 0.1, 200);
        camera.position.set(12, 0.5, 0.001);
        camera.lookAt(0, 0, 0);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.06;
        controls.enableZoom = false;
        controls.minDistance = 3.0;
        controls.maxDistance = 28.0;
        controls.autoRotate = false;
        controls.maxPolarAngle = Math.PI;
        controls.target.set(0, 0, 0);
        controls.update();

        const composer = new EffectComposer(renderer);
        const renderPass = new RenderPass(scene, camera);
        composer.addPass(renderPass);

        const fxaaPass = new ShaderPass(FXAAShader);
        fxaaPass.material.uniforms['resolution'].value.set(1 / (width * renderer.getPixelRatio()), 1 / (height * renderer.getPixelRatio()));
        composer.addPass(fxaaPass);

        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(width, height),
            0.4,
            0.7,
            0.95
        );
        composer.addPass(bloomPass);

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array(params.numParticles * 3), 3));
        const randoms = new Float32Array(params.numParticles * 3);
        let idx = 0;
        for (let t = 0; t < params.numThreads; t++) {
            const phiFrac = t / params.numThreads;
            const layer = Math.random();
            // @ts-ignore
            for (let j = 0; j < params.particlesPerThread; j++) {
                const i3 = idx * 3;
                randoms[i3 + 0] = Math.random();
                randoms[i3 + 1] = phiFrac;
                randoms[i3 + 2] = layer;
                idx++;
            }
        }
        geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

        const particleMaterial = new THREE.ShaderMaterial({
            uniforms: {
                uTime: { value: 0.0 },
                uFlowSpeed: { value: params.flowSpeed },
                uSize: { value: params.particleSize },
                uMinY: { value: params.minY },
                uMaxY: { value: params.maxY },
                uNeck: { value: params.neckRadius },
                uFlare: { value: params.flare },
                uTwistTurns: { value: params.twistTurns },
                uAspect: { value: width / height },
                uGoldHue: { value: params.goldHue },
                uFieryHue: { value: params.fieryHue },
                uPulseTime: { value: -10.0 }
            },
            vertexShader: `
                precision highp float;
                uniform float uTime;
                uniform float uFlowSpeed;
                uniform float uSize;
                uniform float uMinY;
                uniform float uMaxY;
                uniform float uNeck;
                uniform float uFlare;
                uniform float uTwistTurns;
                uniform float uPulseTime;
                attribute vec3 aRandom;
                varying float vAlpha;
                varying float vGlow;
                varying float vHue;
                varying float vProgress;
                varying float vPulseGlow;
                varying float vRandom;
                float radiusAtY(float y, float a, float b) {
                    return a * sqrt(1.0 + (y*y) / (b*b));
                }
                void main() {
                    float speedVar = 0.8 + 0.4 * aRandom.z;
                    float progress = fract(aRandom.x + uTime * uFlowSpeed * speedVar);
                    float y = mix(uMaxY, uMinY, progress);
                    float scale = mix(0.70, 1.00, aRandom.z);
                    float r = radiusAtY(y, uNeck, uFlare) * scale;
                    float twist = 6.2831853 * uTwistTurns;
                    float phi = 6.2831853 * aRandom.y + progress * twist + uTime * 0.02;
                    vec3 pos = vec3(r * cos(phi), y, r * sin(phi));
                    vPulseGlow = 0.0;
                    float pulseAge = uTime - uPulseTime;
                    if (pulseAge > 0.0 && pulseAge < 4.0) {
                        float pulseSpeed = 0.4;
                        float pulsePosDown = mod(0.5 + pulseAge * pulseSpeed, 1.0);
                        float distDown = min(abs(progress - pulsePosDown), 1.0 - abs(progress - pulsePosDown));
                        float glowDown = smoothstep(0.1, 0.0, distDown) * (1.0 - smoothstep(3.0, 4.0, pulseAge));
                        float pulsePosUp = mod(0.5 - pulseAge * pulseSpeed + 1.0, 1.0);
                        float distUp = min(abs(progress - pulsePosUp), 1.0 - abs(progress - pulsePosUp));
                        float glowUp = smoothstep(0.1, 0.0, distUp) * (1.0 - smoothstep(3.0, 4.0, pulseAge));
                        vPulseGlow = max(glowDown, glowUp);
                        if (vPulseGlow > 0.0) {
                            float wave = pow(vPulseGlow, 2.0);
                            vec3 normal = normalize(vec3(pos.x, 0.0, pos.z));
                            pos += normal * wave * 0.6;
                        }
                    }
                    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
                    float distScale = 1.0 / max(0.0001, -mvPosition.z);
                    gl_PointSize = uSize * distScale * (1.0 + vPulseGlow * 1.5);
                    gl_Position = projectionMatrix * mvPosition;
                    float neckGlow = 1.0 - smoothstep(0.0, 1.4, abs(y));
                    vGlow = neckGlow;
                    float edgeFade = smoothstep(0.0, 0.06, progress) * (1.0 - smoothstep(0.94, 1.0, progress));
                    vAlpha = 0.23 + 0.62 * neckGlow * edgeFade;
                    vHue = ${params.goldHue.toFixed(6)} + 0.02 * (aRandom.z - 0.5);
                    vProgress = progress;
                    vRandom = aRandom.z;
                }
            `,
            fragmentShader: `
                precision highp float;
                uniform float uFieryHue;
                varying float vAlpha;
                varying float vGlow;
                varying float vHue;
                varying float vProgress;
                varying float vPulseGlow;
                varying float vRandom;
                vec3 hsv2rgb(vec3 c) {
                    vec4 K = vec4(1.0, 2.0/3.0, 1.0/3.0, 3.0);
                    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
                    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
                }
                void main() {
                    vec2 uv = gl_PointCoord * 2.0 - 1.0;
                    float r = dot(uv, uv);
                    if (r > 1.0) discard;
                    float falloff = pow(1.0 - r, 1.7);
                    float sparkle = 0.85 + 0.15 * sin(50.0 * vProgress);
                    vec3 col = hsv2rgb(vec3(vHue, 0.78, 0.95));
                    col += 0.15 * vGlow;
                    if (vPulseGlow > 0.01) {
                        float wave = pow(vPulseGlow, 1.5);
                        vec3 fieryCol = hsv2rgb(vec3(uFieryHue, 0.95, 1.0));
                        vec3 corona = fieryCol * wave * 0.6;
                        float coreIntensity = smoothstep(0.5, 0.8, wave);
                        vec3 hotCore = vec3(1.0, 0.95, 0.9) * coreIntensity * 0.5;
                        float crackle = pow(fract(vProgress * 80.0 + vRandom * 20.0), 15.0);
                        col += corona;
                        col += hotCore;
                        col += crackle * coreIntensity * vec3(1.0);
                        sparkle += wave * 0.5;
                    }
                    float alpha = (vAlpha + vPulseGlow * 0.8) * falloff * sparkle;
                    gl_FragColor = vec4(col, alpha);
                }
            `,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
            transparent: true
        });
        materialRef.current = particleMaterial;

        const particles = new THREE.Points(geometry, particleMaterial);
        scene.add(particles);

        const coreGeo = new THREE.SphereGeometry(1.2, 48, 48);
        const coreBaseSize = 0.025;
        const coreBaseOpacity = 0.9;
        const coreMat = new THREE.PointsMaterial({
            size: coreBaseSize,
            color: 0xff8800,
            blending: THREE.AdditiveBlending,
            transparent: true,
            opacity: coreBaseOpacity,
            depthWrite: false
        });
        const coreSphere = new THREE.Points(coreGeo, coreMat);
        scene.add(coreSphere);

        const clock = new THREE.Clock();
        clockRef.current = clock;
        let pulseStart = -10.0;
        let animationId: number;

        function animate() {
            animationId = requestAnimationFrame(animate);
            const t = clock.getElapsedTime();
            particleMaterial.uniforms.uTime.value = t;

            // Update pulseStart from React state if needed? 
            // Better to access current value via ref if needed, but here we can just rely on the uniform.
            
            if (coreSphere) {
                coreSphere.rotation.y = t * 0.12;
                const baseS = 1.0 + Math.sin(t * 1.6) * 0.05;
                const pulseAge = t - particleMaterial.uniforms.uPulseTime.value;
                let pulse = 0.0;
                if (pulseAge > 0 && pulseAge < 1.5) {
                    pulse = Math.sin(Math.PI * (pulseAge / 1.5));
                }
                const s = baseS + pulse * 1.0;
                coreSphere.scale.set(s, s, s);
                coreMat.size = coreBaseSize * (1.0 + pulse * 15.0);
                coreMat.opacity = Math.max(0, coreBaseOpacity - pulse * 0.5);
            }
            if (particles) particles.rotation.y = t * 0.02;
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
            fxaaPass.material.uniforms['resolution'].value.set(1 / (newWidth * renderer.getPixelRatio()), 1 / (newHeight * renderer.getPixelRatio()));
            particleMaterial.uniforms.uAspect.value = newWidth / newHeight;
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationId);
            renderer.dispose();
            container.removeChild(renderer.domElement);
        };
    }, []);

    const handleEnergize = () => {
        if (materialRef.current && clockRef.current) {
            const currentTime = clockRef.current.getElapsedTime();
            materialRef.current.uniforms.uPulseTime.value = currentTime;
            setIsEnergized(true);
            setTimeout(() => setIsEnergized(false), 200); // Reset button state visually
        }
    };

    return (
        <div style={{ width: '100%', height: '100%', position: 'absolute', top: 0, left: 0 }}>
            <div ref={containerRef} style={{ width: '100%', height: '100%' }} />
            
            {/* Glow Corners */}
            <div style={{
                position: 'absolute',
                width: '40vmax',
                height: '40vmax',
                pointerEvents: 'none',
                filter: 'blur(60px)',
                opacity: 0.25,
                mixBlendMode: 'screen',
                background: 'radial-gradient(closest-side, #ffd86b, transparent 60%)',
                left: '-20vmax',
                top: '-20vmax'
            }} />
            <div style={{
                position: 'absolute',
                width: '40vmax',
                height: '40vmax',
                pointerEvents: 'none',
                filter: 'blur(60px)',
                opacity: 0.25,
                mixBlendMode: 'screen',
                background: 'radial-gradient(closest-side, #ffd86b, transparent 60%)',
                right: '-18vmax',
                bottom: '-18vmax'
            }} />

            {/* Energize Button */}
            <button
                onClick={handleEnergize}
                style={{
                    position: 'absolute',
                    bottom: '24px',
                    left: '24px',
                    padding: '12px 24px',
                    background: isEnergized 
                        ? 'linear-gradient(45deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.15))' 
                        : 'linear-gradient(45deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.1))',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '12px',
                    color: isEnergized ? '#fff' : '#dfdfe8',
                    fontSize: '16px',
                    fontWeight: 600,
                    letterSpacing: '0.5px',
                    cursor: 'pointer',
                    backdropFilter: 'blur(8px)',
                    WebkitBackdropFilter: 'blur(8px)',
                    boxShadow: isEnergized
                        ? 'inset 0 1px 0 0 rgba(255,255,255,0.08), 0 0 25px -5px #ff8c00, 0 10px 30px rgba(0,0,0,0.4)'
                        : 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 10px 30px rgba(0,0,0,0.4)',
                    transition: 'all 0.2s ease-in-out',
                    textShadow: '0 0 10px rgba(0,0,0,0.5)',
                    transform: isEnergized ? 'translateY(0px)' : 'translateY(-2px)'
                }}
            >
                ENERGIZE
            </button>
        </div>
    );
}
