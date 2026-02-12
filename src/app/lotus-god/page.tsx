"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { SoundManager } from "./SoundManager";

import TerminalOverlay from "../../components/LotusGod/TerminalOverlay";

// Shader code blocks
const noiseFunctions = `
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec4 permute(vec4 x) { return mod289(((x * 34.0) + 1.0) * x); }
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
    vec4 p = permute(permute(permute(
        i.z + vec4(0.0, i1.z, i2.z, 1.0))
        + i.y + vec4(0.0, i1.y, i2.y, 1.0))
        + i.x + vec4(0.0, i1.x, i2.x, 1.0));
        
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
    
    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));
    
    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
    
    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);
    
    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;
    
    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
}
`;

const nodeShader = {
    vertexShader: `
${noiseFunctions}
attribute float nodeSize;
attribute float nodeType;
attribute vec3 nodeColor;
attribute float distanceFromRoot;

uniform float uTime;
uniform vec3 uPulsePositions[5];
uniform float uPulseTimes[5];
uniform float uPulseSpeed;
uniform float uBaseNodeSize;
// Lotus addition:
// Lotus addition:
uniform float uBloom;
uniform float uGoddessAppear;
uniform float uClickCount; // New uniform for color transition
uniform vec3 uLotusColor; // Base color (redundant if we calculate in shader, but we'll use a mix)

varying vec3 vColor;
varying float vNodeType;
varying vec3 vPosition;
varying float vPulseIntensity;
varying float vDistanceFromRoot;
varying float vGlow;

float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
    if (pulseTime < 0.0) return 0.0;
    float timeSinceClick = uTime - pulseTime;
    if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
    float pulseRadius = timeSinceClick * uPulseSpeed;
    float distToClick = distance(worldPos, pulsePos);
    float pulseThickness = 3.0;
    float waveProximity = abs(distToClick - pulseRadius);
    return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
}

void main() {
    vNodeType = nodeType;
    vColor = nodeColor;
    vDistanceFromRoot = distanceFromRoot;
    
    // Lotus blooming logic
    vec3 modifiedPosition = position;
    
    // Adapted Bloom logic for STL:
    // Use distanceFromRoot (which we'll calculate as distance from center) to control "opening"
    float petalFactor = smoothstep(2.0, 15.0, distanceFromRoot); // Adjust range based on model size
    float openAngle = petalFactor * uBloom * 0.5; // Reduced angle for STL structure
    
    float s = sin(openAngle);
    float c = cos(openAngle);
    
    // Rotate around X/Z relative to center
    // This simple rotation might distort complex meshes, but for a lotus it should look like opening petals
    modifiedPosition.xz = mat2(c, -s, s, c) * modifiedPosition.xz;


    vec3 worldPos = (modelMatrix * vec4(modifiedPosition, 1.0)).xyz;
    vPosition = worldPos;
    
    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 5; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);
    vNodeType = nodeType;
    vDistanceFromRoot = distanceFromRoot;
    
    // Goddess Color Bypass
    if (abs(nodeType - 3.0) < 0.1) {
        vColor = nodeColor;
    } else {
        vColor = nodeColor; // Petals handled in fragment
    }
    
    // We will handle color in fragment shader based on uClickCount for petals
    // But passing original nodeColor is fine for now
    
    // Sentient Breathing: Slower, deeper, more organic
    // 0.5 frequency = ~12s cycle (too slow?) -> try 0.4 for deep meditative state
    // Added 0.85 base + 0.15 variation -> range 0.7 to 1.0
    float breathe = sin(uTime * 0.5 + distanceFromRoot * 0.2) * 0.1 + 0.9;
    float baseSize = nodeSize * breathe;
    float pulseSize = baseSize * (1.0 + vPulseIntensity * 0.5); // Reduced pulse size expansion (4.0 -> 0.5) to prevent "blooming orbs"
    
    
    // Ambient flicker
    float n_noise = snoise(vec3(vPosition * 0.1 + uTime * 0.1));
    vGlow = 0.5 + 0.5 * sin(uTime * 0.3 + distanceFromRoot * 0.1 + n_noise * 2.0);
    
    
    
    vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
    gl_PointSize = pulseSize * uBaseNodeSize * (1000.0 / -mvPosition.z);
    
    // Adjusted size for base/stem (nodeType 2) - reduced to match petals
    if (nodeType > 1.5) {
        gl_PointSize *= 0.7; // Reduced significantly (1.1 -> 0.7) to match red particles
    } else {
        // Also slightly reduce lower petals based on height/distance if needed
        // For now, let's keep petals consistent but maybe slightly smaller at bottom
        float heightFactor = smoothstep(0.0, 10.0, modifiedPosition.y + 2.0); // Map -2..8 to 0..1
        gl_PointSize *= (0.9 + 0.2 * heightFactor); // Reduced base size (1.0 -> 0.9)
    }
    
    gl_Position = projectionMatrix * mvPosition;
}`,
    fragmentShader: `
uniform float uTime;
uniform vec3 uPulseColors[5];
uniform float uGoddessAppear;
uniform float uClickCount; // New uniform

varying vec3 vColor;
varying float vNodeType;
varying vec3 vPosition;
varying float vPulseIntensity;
varying float vGlow;
varying float vDistanceFromRoot;

void main() {
    vec2 center = 2.0 * gl_PointCoord - 1.0;
    float dist = length(center);
    if (dist > 1.0) discard;
    
    float glow1 = 1.0 - smoothstep(0.0, 0.5, dist);
    float glow2 = 1.0 - smoothstep(0.0, 1.0, dist);
    float glowStrength = pow(glow1, 1.2) + glow2 * 0.3;
    
    float breatheColor = 0.5 + 0.1 * sin(uTime * 0.6 + vDistanceFromRoot * 0.25);
    
    vec3 targetColor = vColor;
    
    // Click-based Chakra Color Transition for Petals (nodeType 0 or 1)
    if (vNodeType < 1.5) {
        // Defines colors directly in shader or mix based on uClickCount
        // 0-5: Red, 5-10: Orange, 10-15: Yellow, 15-20: Pink, 20-25: Blue, 25-30: Purple, 30+: White
        // Smooth transition over 5 clicks
        
        vec3 cRed = vec3(1.0, 0.0, 0.0);
        vec3 cOrange = vec3(1.0, 0.5, 0.0);
        vec3 cYellow = vec3(1.0, 1.0, 0.0);
        vec3 cPink = vec3(1.0, 0.41, 0.71);
        vec3 cBlue = vec3(0.0, 0.0, 1.0);
        vec3 cPurple = vec3(0.54, 0.17, 0.89);
        vec3 cWhite = vec3(0.20, 0.20, 0.20); // Further reduced white brightness (0.4 -> 0.2) to fix "too bright" end state
        
        float t = uClickCount;
        
        if (t < 5.0) {
            targetColor = mix(cRed, cOrange, t / 5.0);
        } else if (t < 10.0) {
            targetColor = mix(cOrange, cYellow, (t - 5.0) / 5.0);
        } else if (t < 15.0) {
            targetColor = mix(cYellow, cPink, (t - 10.0) / 5.0);
        } else if (t < 20.0) {
            targetColor = mix(cPink, cBlue, (t - 15.0) / 5.0);
        } else if (t < 25.0) {
            targetColor = mix(cBlue, cPurple, (t - 20.0) / 5.0);
        } else if (t < 30.0) {
            targetColor = mix(cPurple, cWhite, (t - 25.0) / 5.0);
        } else {
            targetColor = cWhite;
        }
    }

    vec3 baseColor = targetColor * breatheColor * 0.038; // Reduced for petals
    if (abs(vNodeType - 3.0) < 0.1) {
        baseColor = vColor * (0.4 + 0.2 * vGlow); // Reduced brightness for Goddess nodes
    }
    
    vec3 finalColor = baseColor;
    
    vec3 purplePulseColor = vec3(0.24, 0.0, 0.4); // Reduced brightness by 60% (0.6->0.24, 1.0->0.4)
    if (vPulseIntensity > 0.0) {
        // Reduced brightness boost, but INCREASED color mix to make it "purple"
        finalColor = mix(baseColor, purplePulseColor, vPulseIntensity * 0.4); // slightly boosted mix for color visibility
        // REMOVED additive brightness boost to fix visibility issue
    if (abs(vNodeType - 3.0) < 0.1) {
        finalColor = vColor * (0.4 + 0.2 * vGlow); // Reduced brightness for Goddess nodes (was 0.8 + 0.3)
    } 
        // glowStrength *= (1.0 + vPulseIntensity * 0.006); 
    }
    
    float coreBrightness = smoothstep(0.4, 0.0, dist);
    finalColor += vec3(1.0) * coreBrightness * 0.02; // Drastically reduced core brightness (0.1 -> 0.02)
    
    float alpha = glowStrength * (0.6 - 0.3 * dist); 
    float camDistance = length(vPosition - cameraPosition);
    float distanceFade = smoothstep(200.0, 30.0, camDistance);
    
    // Disable distance fade for stem/base
    if (vNodeType > 1.5) {
        distanceFade = 1.0;
        finalColor *= 0.45; // Adjusted brightness (0.38 -> 0.45) for smaller size
        // Revert "Solid" alpha to match red region style (Soft Sprite)
        // alpha = 1.0; 
        alpha = glowStrength * (0.8 - 0.2 * dist); // Slightly stronger core than petals but still soft edge
    } else {
        // Gradient darkening for lower petals (Red/Orange) to match "lower area" request
        // Map Y from approx -2 to 10. 
        float heightBias = smoothstep(-5.0, 5.0, vPosition.y);
        finalColor *= (0.45 + 0.19 * heightBias); // Reduced by 20% (0.56 -> 0.45, 0.24 -> 0.19)
        
        // Standard soft alpha for petals
        alpha = glowStrength * (0.6 - 0.3 * dist); 
    }

    if (vNodeType > 0.5) {
        finalColor *= 0.67; // Reduced by 20% (0.84 -> 0.67)
        alpha *= 0.9;
    }
    
    // Selective fade: make pink petals invisible when goddess appears
    if (uGoddessAppear > 0.0) {
        // Check if this is a petal (nodeType == 0) vs green base/stem (nodeType == 2)
        if (vNodeType < 1.0) {
            // Pink/purple petals - fade to invisible
            alpha *= (1.0 - uGoddessAppear);
        } else {
            // Cyan/Green base - fade to 40% and turn WHITE
            alpha *= mix(1.0, 0.4, uGoddessAppear);
            // Reduced max white brightness for goddess appear as well
            finalColor = mix(finalColor, vec3(0.20, 0.20, 0.20), uGoddessAppear);  // 0.4 -> 0.2
        }
    }
    
    finalColor *= (1.0 + vGlow * 0.05); // Reduced glow flicker
    gl_FragColor = vec4(finalColor, alpha * distanceFade);
}`
};

const lineShader = {
    vertexShader: `
${noiseFunctions}
attribute vec3 nodeColor;
attribute float distanceFromRoot;
attribute float nodeType;

uniform float uTime;
uniform vec3 uPulsePositions[5];
uniform float uPulseTimes[5];
uniform float uPulseSpeed;
// Lotus addition:
uniform float uBaseNodeSize;
// Lotus addition:
uniform float uBloom;
uniform float uGoddessAppear;
uniform float uClickCount; // New uniform
uniform vec3 uLotusColor;

varying vec3 vColor;
varying vec3 vPosition;
varying float vPulseIntensity;
varying float vGlow;
varying float vNodeType;
varying float vDistanceFromRoot;

float getPulseIntensity(vec3 worldPos, vec3 pulsePos, float pulseTime) {
    if (pulseTime < 0.0) return 0.0;
    float timeSinceClick = uTime - pulseTime;
    if (timeSinceClick < 0.0 || timeSinceClick > 4.0) return 0.0;
    float pulseRadius = timeSinceClick * uPulseSpeed;
    float distToClick = distance(worldPos, pulsePos);
    float pulseThickness = 3.0;
    float waveProximity = abs(distToClick - pulseRadius);
    return smoothstep(pulseThickness, 0.0, waveProximity) * smoothstep(4.0, 0.0, timeSinceClick);
}

void main() {
    vColor = nodeColor;
    vDistanceFromRoot = distanceFromRoot;
    
    // Lotus blooming logic
    vec3 modifiedPosition = position;
    vNodeType = nodeType; // Assign nodeType for lines too
    // Specific base detection for lines is handled in fragment but we can pass color here
    // However, we want to override petal lines too
    float greenness = nodeColor.g / max(nodeColor.r + nodeColor.b, 0.01);
    bool isBase = greenness > 1.0 && (nodeColor.r < 0.2);
    
    // Goddess addition: bypass for Goddess (nodeColor is gold)
    if (abs(nodeType - 3.0) < 0.1) {
        vColor = nodeColor;
    } else if (!isBase) {
        vColor = uLotusColor;
    }    
    float petalFactor = smoothstep(2.0, 15.0, distanceFromRoot);
    float openAngle = petalFactor * uBloom * 0.5;
    
    float s = sin(openAngle);
    float c = cos(openAngle);
    
    modifiedPosition.xz = mat2(c, -s, s, c) * modifiedPosition.xz;

    vec3 worldPos = (modelMatrix * vec4(modifiedPosition, 1.0)).xyz;
    vPosition = worldPos;
    
    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 5; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);
    
    float breathe = sin(uTime * 0.7 + distanceFromRoot * 0.15) * 0.15 + 0.85;
    
    // Ambient flicker
    float n_noise = snoise(vec3(vPosition * 0.1 + uTime * 0.1));
    vGlow = 0.5 + 0.5 * sin(uTime * 0.3 + distanceFromRoot * 0.1 + n_noise * 2.0);
    
    vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
    gl_Position = projectionMatrix * mvPosition;
}`,
    fragmentShader: `
uniform float uTime;
uniform vec3 uPulseColors[5];
uniform float uGoddessAppear;
uniform float uClickCount; // New uniform

varying vec3 vColor;
varying vec3 vPosition;
varying float vPulseIntensity;
varying float vGlow;
varying float vNodeType;
varying float vDistanceFromRoot;

void main() {
    float breatheColor = 0.5 + 0.1 * sin(uTime * 0.6 + vDistanceFromRoot * 0.25);
    
    vec3 targetColor = vColor;
    
    // Click-based Chakra Color Transition for Petals (implied by lack of green base check here initially, but we check isBase later)
    // We need to apply this to lines that are NOT base lines
    // Base detection logic is below, but we can pre-calculate targetColor
    
    // Simplified: we will apply color transition to EVERYTHING first, then override for base
    // 0-5: Red, 5-10: Orange, 10-15: Yellow, 15-20: Pink, 20-25: Blue, 25-30: Purple, 30+: White
    
    vec3 cRed = vec3(1.0, 0.0, 0.0);
    vec3 cOrange = vec3(1.0, 0.5, 0.0);
    vec3 cYellow = vec3(1.0, 1.0, 0.0);
    vec3 cPink = vec3(1.0, 0.41, 0.71);
    vec3 cBlue = vec3(0.0, 0.0, 1.0);
    vec3 cPurple = vec3(0.54, 0.17, 0.89);
    vec3 cWhite = vec3(0.20, 0.20, 0.20); // Further reduced white brightness (0.4 -> 0.2)
    
    float t = uClickCount;
    if (t < 5.0) targetColor = mix(cRed, cOrange, t / 5.0);
    else if (t < 10.0) targetColor = mix(cOrange, cYellow, (t - 5.0) / 5.0);
    else if (t < 15.0) targetColor = mix(cYellow, cPink, (t - 10.0) / 5.0);
    else if (t < 20.0) targetColor = mix(cPink, cBlue, (t - 15.0) / 5.0);
    else if (t < 25.0) targetColor = mix(cBlue, cPurple, (t - 20.0) / 5.0);
    else if (t < 30.0) targetColor = mix(cPurple, cWhite, (t - 25.0) / 5.0);
    else targetColor = cWhite;

    // Goddess Preservation: Use original Gold color, ignore rainbow
    if (abs(vNodeType - 3.0) < 0.1) {
        targetColor = vColor;
    }

    vec3 baseColor = targetColor * breatheColor * 0.038; // Reduced by another 20% (0.048 -> 0.038)
    
    vec3 finalColor = baseColor;
    float glowStrength = 1.0;

    vec3 purplePulse = vec3(0.24, 0.0, 0.4); // Reduced brightness by 60%
    if (vPulseIntensity > 0.0) {
        // Mix color but remove additive brightness boost
        finalColor = mix(baseColor, purplePulse, vPulseIntensity * 0.4); 
    }
    
    float camDistance = length(vPosition - cameraPosition);
    float distanceFade = smoothstep(200.0, 30.0, camDistance);
    
    // Detect if this is a cyan base/stem line vs petal line
    float greenness = vColor.g / max(vColor.r + vColor.b, 0.01);
    bool isBase = greenness > 1.0 && (vColor.r < 0.2); // Simplified base detection

    if (isBase) {
        distanceFade = 1.0;
        // Restore original base color for base lines, ignore targetColor transition
        baseColor = vColor * breatheColor * 0.038; // Reduced (0.048 -> 0.038)
        finalColor = baseColor; // Reset to base color
    }

    finalColor *= (1.0 + vGlow * 0.05);
    
    // Base alpha for lines
    float alpha = 0.5 * distanceFade * glowStrength;

    // Goddess brightness reduction for lines
    if (abs(vNodeType - 3.0) < 0.1) {
        finalColor = targetColor * 0.6; // Reduce line brightness
        alpha = 0.8;
    }

    if (isBase) {
         finalColor *= 0.38; // Reduced brightness for base lines (0.48 -> 0.38)
         alpha = 1.0; // Force solid alpha for lines
    }

    // Selective fade for lines based on color
    if (uGoddessAppear > 0.0) {
        if (isBase) {
            // Base lines - keep visible and turn WHITE
            alpha *= mix(1.0, 0.4, uGoddessAppear);
            // Reduced max white brightness
            finalColor = mix(finalColor, vec3(0.20, 0.20, 0.20), uGoddessAppear); // 0.4 -> 0.2
        } else {
            // Pink/purple petal lines - fade to invisible
            alpha *= (1.0 - uGoddessAppear);
        }
    }

    gl_FragColor = vec4(finalColor, alpha);
}`
};

// ----------------- COMPONENT ----------------- //

const cyanColor = new THREE.Color(0x00ffa2); // More green than cyan
const purplePulse = new THREE.Color(0x9900ff);
const goldColor = new THREE.Color(0xffd700);

const chakraColors = [
    new THREE.Color(0xff0000), // 0-5: Red
    new THREE.Color(0xff7f00), // 6-10: Orange
    new THREE.Color(0xffff00), // 11-15: Yellow
    new THREE.Color(0xff69b4), // 16-20: Pink (HotPink)
    new THREE.Color(0x0000ff), // 21-25: Blue
    new THREE.Color(0x8a2be2), // 26-30: Purple (BlueViolet)
    new THREE.Color(0xffffff), // 31+: White
];

function getChakraColor(t: number) {
    t = THREE.MathUtils.clamp(t, 0, 1);
    const count = chakraColors.length;
    const i = t * (count - 1);
    const idx1 = Math.floor(i);
    const idx2 = Math.min(idx1 + 1, count - 1);
    const factor = i - idx1;
    return chakraColors[idx1].clone().lerp(chakraColors[idx2], factor);
}

function getEmotionalState(count: number) {
    if (count <= 5) return "Dormant";
    if (count <= 12) return "Stirring";
    if (count <= 20) return "Awakening";
    if (count <= 28) return "Forming Presence";
    if (count <= 32) return <>Almost<br />Alive</>;
    return <span style={{ color: '#ffd700', textShadow: '0 0 10px #ffd700' }}>Fully Awakened</span>;
}

export default function LotusGod() {
    const router = useRouter();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [clickCount, setClickCount] = useState(0);
    const [showCTA, setShowCTA] = useState(false);
    const [copied, setCopied] = useState(false);
    const clickCountRef = useRef(0);

    const configRef = useRef({
        paused: false,
        activePaletteIndex: 0,
        densityFactor: 1
    });

    const [showReward, setShowReward] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);

    // Mouse Interaction for Ambience
    const mouseRef = useRef({ x: 0, y: 0 });
    const targetRotationRef = useRef({ x: 0, y: 0 }); // Smooth damping

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            // Normalize -1 to 1
            mouseRef.current = {
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            };
        };
        window.addEventListener('mousemove', onMouseMove);
        return () => window.removeEventListener('mousemove', onMouseMove);
    }, []);



    useEffect(() => {
        // Check if user has already onboarded
        const hasOnboarded = localStorage.getItem('lotus_onboarded');
        if (!hasOnboarded) {
            setShowOverlay(true);
        }
    }, []);



    useEffect(() => {
        if (clickCount >= 33) {
            const timer = setTimeout(() => {
                setShowReward(true);
                SoundManager.playRewardSound();
                setTimeout(() => setShowCTA(true), 2500);
            }, 15000); // 15s delay for deep immersion after completion
            return () => clearTimeout(timer);
        }
    }, [clickCount]);

    useEffect(() => {
        if (!canvasRef.current) return;

        // Setup Three.js
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.002);

        const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 12, 60); // Increased distance (45 -> 60)

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            powerPreference: "high-performance"
        });

        const updateSize = () => {
            if (!canvasRef.current || !canvasRef.current.parentElement) return;
            const width = canvasRef.current.parentElement.clientWidth;
            const height = canvasRef.current.parentElement.clientHeight;
            renderer.setSize(width, height);
            renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
            camera.aspect = width / height;
            camera.updateProjectionMatrix();
            if (composer) composer.setSize(width, height);
            if (bloomPass) bloomPass.resolution.set(width, height);
        };

        renderer.setClearColor(0x000000);
        renderer.outputColorSpace = THREE.SRGBColorSpace;

        // Starfield
        function createStarfield() {
            const count = 8000;
            const positions = [];
            const colors = [];
            const sizes = [];
            for (let i = 0; i < count; i++) {
                const r = THREE.MathUtils.randFloat(50, 150);
                const phi = Math.acos(THREE.MathUtils.randFloatSpread(2));
                const theta = THREE.MathUtils.randFloat(0, Math.PI * 2);
                positions.push(
                    r * Math.sin(phi) * Math.cos(theta),
                    r * Math.sin(phi) * Math.sin(theta),
                    r * Math.cos(phi)
                );
                const colorChoice = Math.random();
                if (colorChoice < 0.7) {
                    colors.push(1, 1, 1);
                } else if (colorChoice < 0.85) {
                    colors.push(0.7, 0.8, 1);
                } else {
                    colors.push(1, 0.9, 0.8);
                }
                sizes.push(THREE.MathUtils.randFloat(0.1, 0.3));
            }
            const geo = new THREE.BufferGeometry();
            geo.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
            geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
            geo.setAttribute('size', new THREE.Float32BufferAttribute(sizes, 1));

            const mat = new THREE.ShaderMaterial({
                uniforms: { uTime: { value: 0 } },
                vertexShader: `
                    attribute float size;
                    attribute vec3 color;
                    varying vec3 vColor;
                    uniform float uTime;
                    void main() {
                        vColor = color;
                        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                        float twinkle = sin(uTime * 2.0 + position.x * 100.0) * 0.3 + 0.7;
                        gl_PointSize = size * twinkle * (300.0 / -mvPosition.z);
                        gl_Position = projectionMatrix * mvPosition;
                    }`,
                fragmentShader: `
                    varying vec3 vColor;
                    void main() {
                        vec2 center = gl_PointCoord - 0.5;
                        float dist = length(center);
                        if (dist > 0.5) discard;
                        float alpha = 1.0 - smoothstep(0.0, 0.5, dist);
                        gl_FragColor = vec4(vColor, alpha * 0.8);
                    }`,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            return new THREE.Points(geo, mat);
        }

        const starField = createStarfield();
        scene.add(starField);

        // Post-processing
        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;
        controls.rotateSpeed = 0.6;
        controls.minDistance = 8;
        controls.maxDistance = 120; // Allow zooming out further (80 -> 120)
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.2;
        controls.enablePan = false;

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.3, 0.4, 0.85
        );
        composer.addPass(bloomPass);
        composer.addPass(new OutputPass());

        updateSize();

        // Uniforms for shaders
        const pulseUniforms = {
            uTime: { value: 0.0 },
            uPulsePositions: {
                value: [
                    new THREE.Vector3(1e3, 1e3, 1e3),
                    new THREE.Vector3(1e3, 1e3, 1e3),
                    new THREE.Vector3(1e3, 1e3, 1e3),
                    new THREE.Vector3(1e3, 1e3, 1e3),
                    new THREE.Vector3(1e3, 1e3, 1e3)
                ]
            },
            uPulseTimes: { value: [-1e3, -1e3, -1e3, -1e3, -1e3] },
            uPulseColors: {
                value: [
                    new THREE.Color(0x9900ff),
                    new THREE.Color(0x9900ff),
                    new THREE.Color(0x9900ff),
                    new THREE.Color(0x9900ff),
                    new THREE.Color(0x9900ff)
                ]
            },
            uPulseSpeed: { value: 18.0 },
            uBaseNodeSize: { value: 1.0 },
            uBloom: { value: 0.0 },
            uGoddessAppear: { value: 0.0 },
            uClickCount: { value: 0.0 }, // Initialize new uniform
            uLotusColor: { value: new THREE.Color(0xff0000) },
            uIntake: { value: 0.0 }
        };

        const colorPalettes = [
            [
                new THREE.Color(0x667eea),
                new THREE.Color(0x764ba2),
                new THREE.Color(0xf093fb),
                new THREE.Color(0x9d50bb),
                new THREE.Color(0x6e48aa)
            ],
        ];

        let nodesMesh: THREE.Points | null = null;
        let linesMesh: THREE.LineSegments | null = null;

        // Goddess meshes
        let goddessNodesMesh: THREE.Points | null = null;
        let goddessLinesMesh: THREE.LineSegments | null = null;
        const activeMeshes: THREE.Object3D[] = [];

        // Load Lotus STL
        const loaderPromise = import('three/examples/jsm/loaders/STLLoader.js').then(({ STLLoader }) => {
            const loader = new STLLoader();

            // 1. Load Lotus
            loader.load('/models/lotus.stl', (geometry) => {
                if (!canvasRef.current) return;

                geometry.center();
                geometry.scale(0.5, 0.5, 0.5);
                geometry.rotateX(-Math.PI / 2);

                const palette = colorPalettes[0];

                // --- Lotus Points ---
                const positionAttribute = geometry.getAttribute('position');
                const vertexCount = positionAttribute.count;

                const nodeTypes: number[] = [];
                const nodeSizes: number[] = [];
                const nodeColors: number[] = [];
                const distancesFromRoot: number[] = [];

                geometry.computeBoundingBox();
                const minY = -2;
                const maxY = geometry.boundingBox?.max.y || 10;
                const height = maxY - minY;

                for (let i = 0; i < vertexCount; i++) {
                    const x = positionAttribute.getX(i);
                    const y = positionAttribute.getY(i);
                    const z = positionAttribute.getZ(i);
                    const pos = new THREE.Vector3(x, y, z);
                    const dist = pos.length();

                    distancesFromRoot.push(dist);
                    nodeSizes.push(THREE.MathUtils.randFloat(0.5, 1.2));

                    if (y < minY) {
                        nodeTypes.push(2);
                        const c = cyanColor.clone();
                        nodeColors.push(c.r, c.g, c.b);
                    } else {
                        nodeTypes.push(0);
                        const t = (y - minY) / height;
                        const chakraColor = getChakraColor(t);
                        chakraColor.offsetHSL(
                            THREE.MathUtils.randFloatSpread(0.01),
                            THREE.MathUtils.randFloatSpread(0.02),
                            THREE.MathUtils.randFloatSpread(0.05)
                        );
                        nodeColors.push(chakraColor.r, chakraColor.g, chakraColor.b);
                    }
                }

                geometry.setAttribute('nodeType', new THREE.Float32BufferAttribute(nodeTypes, 1));
                geometry.setAttribute('nodeSize', new THREE.Float32BufferAttribute(nodeSizes, 1));
                geometry.setAttribute('nodeColor', new THREE.Float32BufferAttribute(nodeColors, 3));
                geometry.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(distancesFromRoot, 1));

                const nodesMaterial = new THREE.ShaderMaterial({
                    uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                    vertexShader: nodeShader.vertexShader,
                    fragmentShader: nodeShader.fragmentShader,
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending
                });

                for (let i = 0; i < 5; i++) {
                    nodesMaterial.uniforms.uPulseColors.value[i].copy(purplePulse);
                }

                nodesMesh = new THREE.Points(geometry, nodesMaterial);
                scene.add(nodesMesh);
                activeMeshes.push(nodesMesh);

                // --- Lotus Lines ---
                const edgesGeometry = new THREE.EdgesGeometry(geometry, 25);
                const linePositions = edgesGeometry.getAttribute('position');
                const lineCount = linePositions.count;

                const lineColors: number[] = [];
                const lineDistances: number[] = [];
                const lineNodeTypes: number[] = [];

                for (let i = 0; i < lineCount; i++) {
                    const x = linePositions.getX(i);
                    const y = linePositions.getY(i);
                    const z = linePositions.getZ(i);
                    const pos = new THREE.Vector3(x, y, z);
                    const dist = pos.length();
                    lineDistances.push(dist);

                    if (y < minY) {
                        lineNodeTypes.push(2);
                        const c = cyanColor.clone();
                        lineColors.push(c.r, c.g, c.b);
                    } else {
                        lineNodeTypes.push(0);
                        const t = (y - minY) / height;
                        const chakraColor = getChakraColor(t);
                        lineColors.push(chakraColor.r, chakraColor.g, chakraColor.b);
                    }
                }

                edgesGeometry.setAttribute('nodeColor', new THREE.Float32BufferAttribute(lineColors, 3));
                edgesGeometry.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(lineDistances, 1));
                edgesGeometry.setAttribute('nodeType', new THREE.Float32BufferAttribute(lineNodeTypes, 1));

                const linesMaterial = new THREE.ShaderMaterial({
                    uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                    vertexShader: lineShader.vertexShader,
                    fragmentShader: lineShader.fragmentShader,
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide
                });

                for (let i = 0; i < 5; i++) {
                    linesMaterial.uniforms.uPulseColors.value[i].copy(purplePulse);
                }

                linesMesh = new THREE.LineSegments(edgesGeometry, linesMaterial);
                scene.add(linesMesh);
                activeMeshes.push(linesMesh);

                // --- 3. Add Infinite Stem ---
                const stemCount = 2500;
                const stemPosArr = [];
                const stemColArr = [];
                const stemTypeArr = [];
                const stemSizeArr = [];
                const stemDistArr = [];

                const sStartY = -4.0;
                const sEndY = -3000.0;

                for (let i = 0; i < stemCount; i++) {
                    const ratio = i / (stemCount - 1);
                    const y = THREE.MathUtils.lerp(sStartY, sEndY, ratio);
                    const spread = 0.2; // Thicker cylinder
                    stemPosArr.push(THREE.MathUtils.randFloatSpread(spread), y, THREE.MathUtils.randFloatSpread(spread));

                    stemColArr.push(cyanColor.r, cyanColor.g, cyanColor.b);
                    stemTypeArr.push(2);
                    stemSizeArr.push(THREE.MathUtils.randFloat(0.5, 1.2)); // Normal size
                    stemDistArr.push(Math.abs(y));
                }

                const stemGeo = new THREE.BufferGeometry();
                stemGeo.setAttribute('position', new THREE.Float32BufferAttribute(stemPosArr, 3));
                stemGeo.setAttribute('nodeColor', new THREE.Float32BufferAttribute(stemColArr, 3));
                stemGeo.setAttribute('nodeType', new THREE.Float32BufferAttribute(stemTypeArr, 1));
                stemGeo.setAttribute('nodeSize', new THREE.Float32BufferAttribute(stemSizeArr, 1));
                stemGeo.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(stemDistArr, 1));

                const stemPoints = new THREE.Points(stemGeo, nodesMaterial);
                scene.add(stemPoints);

                const stemIndices = [];
                for (let i = 0; i < stemCount - 1; i++) {
                    stemIndices.push(i, i + 1);
                }
                const sLineGeo = stemGeo.clone();
                sLineGeo.setIndex(stemIndices);
                const stemLines = new THREE.LineSegments(sLineGeo, linesMaterial);
                scene.add(stemLines);
                activeMeshes.push(stemPoints, stemLines);
            });

            // 2. Load Goddess Lakshmi
            loader.load('/models/lotusgod.stl', (geometry) => {
                if (!canvasRef.current) return;

                geometry.center();
                geometry.scale(0.5, 0.5, 0.5); // increased base scale
                geometry.rotateX(-Math.PI / 2);
                geometry.translate(0, 10, 0); // move her higher up to justify "above lotus" position

                const positionAttribute = geometry.getAttribute('position');
                const vertexCount = positionAttribute.count;

                const nodeColors: number[] = [];
                const distancesFromRoot: number[] = [];
                const nodeSizes: number[] = []; // Reuse for goddess
                const nodeTypes: number[] = []; // Dummy

                const goldColor = new THREE.Color(0xffd700);

                // Calculate bounds for coloring
                geometry.computeBoundingBox();
                const gMinY = geometry.boundingBox!.min.y;
                const gMaxY = geometry.boundingBox!.max.y;
                const gHeight = gMaxY - gMinY;
                const gMinX = geometry.boundingBox!.min.x;
                const gMaxX = geometry.boundingBox!.max.x;
                const gWidth = gMaxX - gMinX;

                for (let i = 0; i < vertexCount; i++) {
                    const x = positionAttribute.getX(i);
                    const y = positionAttribute.getY(i);
                    const z = positionAttribute.getZ(i);
                    const pos = new THREE.Vector3(x, y, z);
                    const dist = pos.length();

                    distancesFromRoot.push(dist);
                    nodeSizes.push(THREE.MathUtils.randFloat(0.5, 1.0));
                    nodeTypes.push(3); // Treat as GODDESS type for shader logic

                    // Coloring Logic
                    let c = goldColor.clone();

                    // 1. Crown (Top 15%)
                    if (y > gMaxY - gHeight * 0.15) {
                        c = new THREE.Color(0xffaa00); // Deep Orange-Gold
                        c.offsetHSL(0, 0, 0.1); // Brighter
                    }
                    // 2. Hand Lotuses (Side 20% and Upper Mid Height)
                    else if (y > gMinY + gHeight * 0.45 && y < gMaxY - gHeight * 0.25) {
                        if (x < gMinX + gWidth * 0.20 || x > gMaxX - gWidth * 0.20) {
                            c = new THREE.Color(0xff69b4); // HotPink
                        }
                    }

                    // Gold gradient for body (only if still default gold)
                    if (c.r === goldColor.r && c.g === goldColor.g && c.b === goldColor.b) {
                        c.offsetHSL(0, 0, THREE.MathUtils.randFloatSpread(0.2));
                    }

                    nodeColors.push(c.r, c.g, c.b);
                }

                geometry.setAttribute('nodeType', new THREE.Float32BufferAttribute(nodeTypes, 1));
                geometry.setAttribute('nodeSize', new THREE.Float32BufferAttribute(nodeSizes, 1));
                geometry.setAttribute('nodeColor', new THREE.Float32BufferAttribute(nodeColors, 3));
                geometry.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(distancesFromRoot, 1));

                const goddessMaterial = new THREE.ShaderMaterial({
                    uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                    vertexShader: nodeShader.vertexShader,
                    fragmentShader: nodeShader.fragmentShader, // Reuse same shader
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending
                });

                // Customize goddess material
                goddessMaterial.uniforms.uBaseNodeSize.value = 1.2; // Slightly larger points

                goddessNodesMesh = new THREE.Points(geometry, goddessMaterial);
                goddessNodesMesh.scale.set(0, 0, 0); // Start hidden
                scene.add(goddessNodesMesh);
                activeMeshes.push(goddessNodesMesh);

                // Goddess Lines
                const edgesGeometry = new THREE.EdgesGeometry(geometry, 30);
                const linePositions = edgesGeometry.getAttribute('position');
                const lineCount = linePositions.count;
                const lineColors: number[] = [];
                const lineDistances: number[] = [];
                const lineNodeTypes: number[] = [];

                for (let i = 0; i < lineCount; i++) {
                    const x = linePositions.getX(i);
                    const y = linePositions.getY(i);
                    const z = linePositions.getZ(i);
                    const pos = new THREE.Vector3(x, y, z);
                    lineDistances.push(pos.length());
                    lineColors.push(goldColor.r, goldColor.g, goldColor.b);
                    lineNodeTypes.push(3);
                }

                edgesGeometry.setAttribute('nodeColor', new THREE.Float32BufferAttribute(lineColors, 3));
                edgesGeometry.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(lineDistances, 1));
                edgesGeometry.setAttribute('nodeType', new THREE.Float32BufferAttribute(lineNodeTypes, 1));

                const goddessLinesMaterial = new THREE.ShaderMaterial({
                    uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                    vertexShader: lineShader.vertexShader,
                    fragmentShader: lineShader.fragmentShader,
                    transparent: true,
                    depthWrite: false,
                    blending: THREE.AdditiveBlending,
                    side: THREE.DoubleSide
                });

                goddessLinesMesh = new THREE.LineSegments(edgesGeometry, goddessLinesMaterial);
                goddessLinesMesh.scale.set(0, 0, 0);
                scene.add(goddessLinesMesh);
                activeMeshes.push(goddessLinesMesh);
            });
        });

        // Raycaster for interaction
        const raycaster = new THREE.Raycaster();
        const pointer = new THREE.Vector2();
        const interactionPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const interactionPoint = new THREE.Vector3();
        let lastPulseIndex = 0;

        function triggerPulse(clientX: number, clientY: number) {
            pointer.x = (clientX / window.innerWidth) * 2 - 1;
            pointer.y = -(clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(pointer, camera);
            interactionPlane.normal.copy(camera.position).normalize();
            interactionPlane.constant = -interactionPlane.normal.dot(camera.position) + camera.position.length() * 0.5;

            if (raycaster.ray.intersectPlane(interactionPlane, interactionPoint)) {
                const time = clock.getElapsedTime();
                lastPulseIndex = (lastPulseIndex + 1) % 5;

                activeMeshes.forEach(mesh => {
                    const mat = (mesh as any).material;
                    if (mat && mat.uniforms) {
                        mat.uniforms.uPulsePositions.value[lastPulseIndex].copy(interactionPoint);
                        mat.uniforms.uPulseTimes.value[lastPulseIndex] = time;
                    }
                });
            }
        }

        // Animation Loop
        const clock = new THREE.Clock();
        let bloomTime = 0;
        let goddessAppearTime = 0;
        let smoothedClickCount = 0; // For smooth transition

        function animate() {
            requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Smooth click count
            smoothedClickCount += (clickCountRef.current - smoothedClickCount) * 0.05;

            // Bloom logic
            if (!configRef.current.paused) {
                bloomTime += 0.0025;
                bloomTime = Math.min(bloomTime, 1.0);

                // Goddess appearance logic
                if (clickCountRef.current >= 33) {
                    goddessAppearTime += 0.005; // Fade in speed
                    goddessAppearTime = Math.min(goddessAppearTime, 1.0);

                    if (goddessNodesMesh) {
                        const scale = goddessAppearTime * 0.5; // Majestic size (was 0.5, then 1.5, now 0.5)
                        goddessNodesMesh.scale.set(scale, scale, scale);
                    }
                    if (goddessLinesMesh) {
                        const scale = goddessAppearTime * 0.5;
                        goddessLinesMesh.scale.set(scale, scale, scale);
                    }
                }

                // Update all active meshes
                activeMeshes.forEach(mesh => {
                    const mat = (mesh as any).material;
                    if (mat && mat.uniforms) {
                        mat.uniforms.uTime.value = t;
                        mat.uniforms.uBloom.value = bloomTime;
                        mat.uniforms.uGoddessAppear.value = goddessAppearTime;
                        if (mat.uniforms.uClickCount) {
                            // Dim original lotus nodes/lines after 33 clicks
                            const isOriginal = mesh === nodesMesh || mesh === linesMesh;
                            const targetClickVal = (isOriginal && clickCountRef.current >= 33)
                                ? smoothedClickCount * (1.0 - goddessAppearTime) // Full 100% Vanish
                                : smoothedClickCount;
                            mat.uniforms.uClickCount.value = targetClickVal;
                        }
                    }
                });

                // Ambience: Mouse Interaction
                // Smoothly interpolate target rotation
                targetRotationRef.current.x += (mouseRef.current.y * 0.05 - targetRotationRef.current.x) * 0.05; // Tilt X based on Mouse Y
                targetRotationRef.current.y += (mouseRef.current.x * 0.05 - targetRotationRef.current.y) * 0.05; // Tilt Y based on Mouse X

                // Apply to meshes
                if (nodesMesh) {
                    nodesMesh.rotation.x = targetRotationRef.current.x;
                    nodesMesh.rotation.y = Math.sin(t * 0.05) * 0.05 + targetRotationRef.current.y; // Combine with breathe
                }
                if (linesMesh) {
                    linesMesh.rotation.x = targetRotationRef.current.x;
                    linesMesh.rotation.y = Math.sin(t * 0.05) * 0.05 + targetRotationRef.current.y;
                }
                if (goddessNodesMesh) goddessNodesMesh.rotation.y = Math.sin(t * 0.05) * 0.02; // Goddess stays mostly still

                // Bloom intensity shift based on mouse center proximity
                if (bloomPass) {
                    const dist = Math.sqrt(mouseRef.current.x ** 2 + mouseRef.current.y ** 2);
                    // Slight increase when mouse is near center
                    const proximityGlow = Math.max(0, (1.0 - dist) * 0.1);
                    bloomPass.strength = 0.3 + proximityGlow + clickCountRef.current * 0.01;

                    // Glow boost at pulse 10
                    if (clickCountRef.current >= 10) {
                        bloomPass.strength += 0.15; // Subtle but noticeable boost
                    }
                }

                // Automatic pulse on bloom completion
                if (bloomTime > 0.95 && bloomTime < 0.96) {
                    // Simulate center click
                    triggerPulse(window.innerWidth / 2, window.innerHeight / 2);
                }
            }

            starField.rotation.y += 0.0002;
            (starField.material as THREE.ShaderMaterial).uniforms.uTime.value = t;

            controls.update();
            composer.render();
        }

        animate();

        // Resize
        const onResize = () => {
            updateSize();
        };
        window.addEventListener('resize', onResize);

        // Interaction
        const onClick = (e: MouseEvent) => {
            if (!configRef.current.paused) {
                // Initialize Audio on first interaction
                SoundManager.init();
                if (clickCountRef.current === 0) SoundManager.playAmbientHum();

                // 2. Biological Delay (150ms)
                setTimeout(() => {
                    triggerPulse(e.clientX, e.clientY);

                    setClickCount(prev => {
                        const newCount = Math.min(prev + 1, 33);
                        clickCountRef.current = newCount;

                        // Audio Feedback
                        if (newCount === 33) {
                            SoundManager.playDeepDrone();
                        } else {
                            SoundManager.playHarmonicPulse(newCount);
                        }

                        return newCount;
                    });
                }, 150);

                // Dismiss overlay on first interaction (immediate)
                setShowOverlay(false);
                localStorage.setItem('lotus_onboarded', 'true');
            }
        };
        window.addEventListener('click', onClick);

        // Lifecycle Resize Fix: Force update on mount
        onResize();
        // Handle late layout shifts (e.g. scrollbar disappearance)
        const resizeTimeout = setTimeout(onResize, 100);

        return () => {
            clearTimeout(resizeTimeout);
            window.removeEventListener('resize', onResize);
            window.removeEventListener('click', onClick);
            // Cleanup
            activeMeshes.forEach(mesh => {
                const geometry = (mesh as any).geometry;
                const material = (mesh as any).material;
                if (geometry) geometry.dispose();
                if (material) material.dispose();
            });
            renderer.dispose();
        }
    }, []);

    // Effect to handle initial resize
    useEffect(() => {
        // Force a resize after a short delay to ensure layout is settled
        const timer = setTimeout(() => {
            window.dispatchEvent(new Event('resize'));
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999, userSelect: 'none', overflow: 'hidden' }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />



            {showReward && (
                <div style={{
                    position: 'absolute',
                    top: '60px',
                    right: '40px',
                    zIndex: 2005,
                    textAlign: 'right',
                    animation: 'fadeIn 1s ease-out'
                }}>
                    <div style={{
                        color: '#ffd700',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '1rem',
                        letterSpacing: '1px',
                        textShadow: '0 0 10px rgba(0,0,0,0.8)'
                    }}>
                        YOUR REWARD
                    </div>
                    <div style={{
                        color: '#fff',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '1.2rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
                    }}>
                        33% OFF YOUR FIRST TRANSFORMATION
                    </div>
                </div>
            )}

            {showReward && (
                <>
                    {/* Top Right Reward */}
                    <div className="reward-notification" style={{
                        position: 'absolute',
                        top: '60px',
                        right: '40px',
                        zIndex: 2005,
                        textAlign: 'right',
                        animation: 'fadeIn 1s ease-out'
                    }}>
                        <div className="reward-title" style={{
                            color: '#ffd700',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '1px',
                            textShadow: '0 0 10px rgba(0,0,0,0.8)'
                        }}>
                            YOUR REWARD
                        </div>
                        <div className="reward-code" style={{
                            color: '#fff',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            letterSpacing: '1px',
                            textShadow: '0 0 15px rgba(255, 215, 0, 0.4)'
                        }}>
                            33% OFF YOUR FIRST TRANSFORMATION
                        </div>
                    </div>

                    {/* Above Goddess Message */}
                    <div style={{
                        position: 'absolute',
                        top: '22%',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        zIndex: 2004,
                        textAlign: 'center',
                        animation: 'smoothAwaken 1.8s cubic-bezier(0.4, 0, 0.2, 1) forwards',
                        width: '100%',
                        padding: '0 20px'
                    }}>
                        <h2 className="awakened-title" style={{
                            color: '#ffd700',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '2.2rem',
                            letterSpacing: '6px',
                            textTransform: 'uppercase',
                            marginBottom: '10px',
                            textShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
                        }}>
                            THE LOTUS GOD HAS AWAKENED
                        </h2>
                        <p className="awakened-subtext" style={{
                            color: 'rgba(255, 255, 255, 0.9)',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '1rem',
                            letterSpacing: '2px',
                            textShadow: '0 0 10px rgba(0, 0, 0, 0.8)'
                        }}>
                            You completed the circuit of attention.
                        </p>
                    </div>
                </>
            )}

            {showCTA && (
                <div className="cta-container" style={{
                    position: 'absolute',
                    bottom: '60px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    zIndex: 2002,
                    textAlign: 'center',
                    animation: 'fadeIn 2s ease-out'
                }}>
                    <a href="/discover" style={{
                        display: 'inline-block',
                        padding: '15px 45px',
                        background: 'rgba(0, 229, 255, 0.1)',
                        color: '#fff',
                        textDecoration: 'none',
                        borderRadius: '40px',
                        border: '1px solid #00e5ff',
                        fontFamily: 'Orbitron, sans-serif',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        transition: 'all 0.4s ease',
                        boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)',
                        backdropFilter: 'blur(10px)',
                        marginBottom: '15px'
                    }}>
                        ENTER YOUR PATH →
                    </a>
                    <div className="cta-journey-text" style={{
                        color: '#ffffff',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.9rem',
                        letterSpacing: '1px',
                        marginBottom: '5px',
                        textShadow: '0 0 10px rgba(0,0,0,0.8)'
                    }}>
                        Your clarity journey begins now.
                    </div>
                    <div className="cta-time-limit" style={{
                        color: '#ff4444',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.8rem',
                        fontWeight: 'bold',
                        letterSpacing: '1px',
                        textShadow: '0 0 8px rgba(0,0,0,0.8)'
                    }}>
                        ONLY AVAILABLE FOR THE NEXT 24 HOURS
                    </div>
                </div>
            )}

            {/* Sacred HUD: Circular Arc of Dots */}
            <div className="sacred-hud" style={{
                position: 'absolute',
                top: '100px',
                left: '40px',
                zIndex: 1000,
                pointerEvents: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
            }}>
                <div style={{ position: 'relative', width: '240px', height: '240px' }}>
                    <svg width="240" height="240" viewBox="0 0 200 200" style={{ transform: 'rotate(-90deg)' }}>
                        {/* Background Ring (Optional, implied by dots) */}
                        {Array.from({ length: 33 }).map((_, i) => {
                            const angle = (i / 33) * Math.PI * 2;
                            const r = 80;
                            const cx = 100 + r * Math.cos(angle);
                            const cy = 100 + r * Math.sin(angle);
                            const active = i < clickCount;

                            return (
                                <circle
                                    key={i}
                                    cx={cx}
                                    cy={cy}
                                    r={active ? 5 : 3}
                                    fill={active ? '#00e5ff' : 'rgba(255, 255, 255, 0.1)'}
                                    style={{
                                        transition: 'all 0.3s ease',
                                        filter: active ? 'drop-shadow(0 0 8px #00e5ff)' : 'none'
                                    }}
                                />
                            );
                        })}
                    </svg>
                    {/* Center Emotional State */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        textAlign: 'center',
                        width: '100%'
                    }}>
                        <div style={{
                            fontSize: '1.4rem',
                            color: 'rgba(255, 255, 255, 0.9)',
                            letterSpacing: '2px',
                            fontFamily: 'Orbitron, sans-serif',
                            textTransform: 'uppercase',
                            textShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
                            lineHeight: '1.4'
                        }}>
                            {getEmotionalState(clickCount)}
                        </div>
                    </div>
                </div>
            </div>

            {/* Subtle Hint */}
            <div style={{
                position: 'absolute',
                bottom: '30px',
                left: '50%',
                transform: 'translateX(-50%)',
                color: 'rgba(255, 255, 255, 0.3)',
                fontSize: '0.8rem',
                fontFamily: 'Orbitron, sans-serif',
                letterSpacing: '2px',
                pointerEvents: 'none',
                textTransform: 'uppercase'
            }}>
                33 pulses complete the circuit
            </div>

            {/* Onboarding Overlay */}
            <div style={{
                position: 'fixed',
                inset: 0,
                zIndex: 2000,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none', // Allow clicks to pass through to start interaction
                transition: 'opacity 1s ease-out',
                opacity: showOverlay ? 1 : 0,
            }}>
                <div style={{
                    textAlign: 'center',
                    fontFamily: 'Orbitron, sans-serif',
                    color: '#fff',
                    textShadow: '0 0 20px rgba(0, 229, 255, 0.5)',
                }}>
                    <h1 style={{
                        fontSize: '2.5rem',
                        marginBottom: '10px',
                        letterSpacing: '4px',
                        animation: 'fadeIn 2s ease-out'
                    }}>
                        Awaken the Lotus through your connection with the divine.
                    </h1>
                    <p style={{
                        fontSize: '1.2rem',
                        color: 'rgba(255, 255, 255, 0.8)',
                        marginBottom: '40px',
                        animation: 'fadeIn 2.5s ease-out'
                    }}>
                        Send 33 pulses of attention. Each pulse strengthens the being.
                    </p>

                    <div style={{
                        marginTop: '20px',
                        animation: 'pulse 2s infinite ease-in-out',
                        color: '#00e5ff',
                        fontSize: '1rem',
                        letterSpacing: '2px'
                    }}>
                        Tap anywhere to begin
                    </div>
                </div>

                {/* CSS for animations & responsiveness */}
                <style dangerouslySetInnerHTML={{
                    __html: `
                    @keyframes fadeIn {
                        from { opacity: 0; transform: translateY(20px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    @keyframes smoothAwaken {
                        0% { opacity: 0; transform: translate(-50%, 10px) scale(0.95); }
                        100% { opacity: 1; transform: translate(-50%, 0) scale(1); }
                    }
                    @keyframes pulse {
                        0% { opacity: 0.6; transform: scale(0.95); }
                        50% { opacity: 1; transform: scale(1.05); }
                        100% { opacity: 0.6; transform: scale(0.95); }
                    }
                    @keyframes fadeInOut {
                        0% { opacity: 0; transform: translate(-50%, -40%); }
                        20% { opacity: 1; transform: translate(-50%, -50%); }
                        80% { opacity: 1; transform: translate(-50%, -50%); }
                        100% { opacity: 0; transform: translate(-50%, -60%); }
                    }
                    @keyframes pulseHint {
                        0% { opacity: 0.3; transform: translateX(-50%) translateY(5px); }
                        50% { opacity: 0.7; transform: translateX(-50%) translateY(0); }
                        100% { opacity: 0.3; transform: translateX(-50%) translateY(5px); }
                    }

                    /* Mobile Responsiveness */
                    @media (max-width: 768px) {
                        .sacred-hud {
                            top: 40px !important;
                            left: 50% !important;
                            transform: translateX(-50%) scale(0.7);
                        }
                        .awakened-title {
                            font-size: 1.2rem !important;
                            letter-spacing: 2px !important;
                        }
                        .awakened-subtext {
                            font-size: 0.8rem !important;
                        }
                        .reward-notification {
                            top: 140px !important;
                            right: 0 !important;
                            left: 0 !important;
                            text-align: center !important;
                            padding: 0 10px !important;
                        }
                        .reward-notification .reward-title {
                            font-size: 0.8rem !important;
                        }
                        .reward-notification .reward-code {
                            font-size: 1rem !important;
                        }
                        .cta-container {
                            bottom: 40px !important;
                            width: 100%;
                            padding: 0 20px;
                        }
                        .cta-container a {
                            padding: 12px 30px !important;
                            font-size: 0.9rem !important;
                        }
                        .cta-journey-text {
                            font-size: 0.75rem !important;
                        }
                        .cta-time-limit {
                            font-size: 0.7rem !important;
                        }
                    }
                `}} />
            </div>

            {clickCount < 33 && !showOverlay && (
                <div style={{
                    position: 'absolute',
                    top: '25%',
                    width: '100%',
                    textAlign: 'center',
                    pointerEvents: 'none',
                    zIndex: 500,
                    animation: 'pulseHint 3s infinite ease-in-out'
                }}>
                    <div style={{
                        display: 'inline-block',
                        padding: '10px 20px',
                        background: 'rgba(255,255,255,0.05)',
                        backdropFilter: 'blur(4px)',
                        borderRadius: '30px',
                        border: '1px solid rgba(255,255,255,0.1)',
                        color: 'rgba(255,255,255,0.6)',
                        fontFamily: 'Orbitron, sans-serif',
                        fontSize: '0.8rem',
                        letterSpacing: '1px'
                    }}>
                        Tap to send energy pulse • Drag to rotate
                    </div>
                    <style dangerouslySetInnerHTML={{
                        __html: `
                            @keyframes pulseHint {
                                0% { opacity: 0.3; transform: translateY(5px); }
                                50% { opacity: 0.7; transform: translateY(0); }
                                100% { opacity: 0.3; transform: translateY(5px); }
                            }
                        `}} />
                </div>
            )}

            {/* Pulse Messages & Terminal */}
            <TerminalOverlay clickCount={clickCount} />

            {/* Logo in top right */}
            <div style={{ position: 'absolute', top: '22px', right: '140px', zIndex: 1000, pointerEvents: 'none' }}>
                <img src="/images/logo.png" alt="Spiritual AI Logo" draggable="false" style={{ width: '50px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' }} />
            </div>

            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Orbitron, sans-serif',
                pointerEvents: 'none'
            }}>
                <h1 style={{ margin: 0, fontSize: '1.5rem', fontWeight: 500, letterSpacing: '2px' }}>The Lotus</h1>
                <p style={{ margin: '5px 0 0', fontSize: '0.8rem', opacity: 0.8 }}>Responds to attention</p>
            </div>

            <a href="/" style={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: 'white',
                textDecoration: 'none',
                padding: '10px 25px',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: '30px',
                backdropFilter: 'blur(10px)',
                fontFamily: 'Orbitron, sans-serif',
                fontSize: '0.8rem',
                letterSpacing: '1px',
                background: 'rgba(255,255,255,0.05)',
                transition: 'all 0.3s'
            }}>
                BACK HOME
            </a>
        </div>
    );
}