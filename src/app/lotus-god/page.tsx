"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";

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
uniform vec3 uPulsePositions[3];
uniform float uPulseTimes[3];
uniform float uPulseSpeed;
uniform float uBaseNodeSize;
// Lotus addition:
uniform float uBloom;

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
    
    float petalFactor = smoothstep(0.2, 1.0, distanceFromRoot / 14.0);
    float openAngle = petalFactor * uBloom * 1.4;
    
    float s = sin(openAngle);
    float c = cos(openAngle);
    
    // Rotate around X/Z relative to center?
    // The snippet provided: modifiedPosition.xz = mat2(c, -s, s, c) * modifiedPosition.xz;
    // This is a 2D rotation on the XZ plane.
    modifiedPosition.xz = mat2(c, -s, s, c) * modifiedPosition.xz;


    vec3 worldPos = (modelMatrix * vec4(modifiedPosition, 1.0)).xyz;
    vPosition = worldPos;
    
    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 3; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);
    
    float breathe = sin(uTime * 0.7 + distanceFromRoot * 0.15) * 0.15 + 0.85;
    float baseSize = nodeSize * breathe;
    float pulseSize = baseSize * (1.0 + vPulseIntensity * 2.5);
    
    vGlow = 0.5 + 0.5 * sin(uTime * 0.5 + distanceFromRoot * 0.2);
    
    if (nodeType > 0.5) {
        float noise = snoise(modifiedPosition * 0.08 + uTime * 0.08);
        modifiedPosition += normal * noise * 0.15;
    }
    
    vec4 mvPosition = modelViewMatrix * vec4(modifiedPosition, 1.0);
    gl_PointSize = pulseSize * uBaseNodeSize * (1000.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
}`,
    fragmentShader: `
uniform float uTime;
uniform vec3 uPulseColors[3];

varying vec3 vColor;
varying float vNodeType;
varying vec3 vPosition;
varying float vPulseIntensity;
varying float vDistanceFromRoot;
varying float vGlow;

void main() {
    vec2 center = 2.0 * gl_PointCoord - 1.0;
    float dist = length(center);
    if (dist > 1.0) discard;
    
    float glow1 = 1.0 - smoothstep(0.0, 0.5, dist);
    float glow2 = 1.0 - smoothstep(0.0, 1.0, dist);
    float glowStrength = pow(glow1, 1.2) + glow2 * 0.3;
    
    float breatheColor = 0.9 + 0.1 * sin(uTime * 0.6 + vDistanceFromRoot * 0.25);
    vec3 baseColor = vColor * breatheColor * 0.7; // Lowered intensity multiplier
    
    vec3 finalColor = baseColor;
    
    if (vPulseIntensity > 0.0) {
        vec3 pulseColor = mix(vec3(0.5), uPulseColors[0], 0.2); // Start darker, mix less white
        finalColor = mix(baseColor, pulseColor, vPulseIntensity * 0.3); // Mix less pulse color (0.8->0.3)
        finalColor *= (1.0 + vPulseIntensity * 0.4); // Less brightness boost (1.2->0.4)
        glowStrength *= (1.0 + vPulseIntensity * 0.3); // Less glow boost
    }
    
    float coreBrightness = smoothstep(0.4, 0.0, dist);
    finalColor += vec3(1.0) * coreBrightness * 0.3;
    
    float alpha = glowStrength * (0.95 - 0.3 * dist);
    float camDistance = length(vPosition - cameraPosition);
    float distanceFade = smoothstep(100.0, 15.0, camDistance);
    
    if (vNodeType > 0.5) {
        finalColor *= 1.1;
        alpha *= 0.9;
    }
    
    finalColor *= (1.0 + vGlow * 0.1);
    gl_FragColor = vec4(finalColor, alpha * distanceFade);
}`
};

const connectionShader = {
    vertexShader: `
${noiseFunctions}
attribute vec3 startPoint;
attribute vec3 endPoint;
attribute float connectionStrength;
attribute float pathIndex;
attribute vec3 connectionColor;

uniform float uTime;
uniform vec3 uPulsePositions[3];
uniform float uPulseTimes[3];
uniform float uPulseSpeed;
uniform float uBloom;

varying vec3 vColor;
varying float vConnectionStrength;
varying float vPulseIntensity;
varying float vPathPosition;
varying float vDistanceFromCamera;

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

// Helper to apply Bloom rotation
vec3 applyBloom(vec3 pos, float distFromRoot) {
    float petalFactor = smoothstep(0.2, 1.0, distFromRoot / 14.0);
    float openAngle = petalFactor * uBloom * 1.4;
    float s = sin(openAngle);
    float c = cos(openAngle);
    vec3 p = pos;
    float x = p.x;
    float z = p.z;
    p.x = x * c - z * s;
    p.z = x * s + z * c;
    return p;
}

void main() {
    float t = position.x;
    vPathPosition = t;
    
    // Apply bloom to start and end points before interpolation ideally, 
    // but the geometry is static. We can try to approximate distance.
    float startDist = length(startPoint);
    float endDist = length(endPoint);
    
    vec3 animatedStart = applyBloom(startPoint, startDist);
    vec3 animatedEnd = applyBloom(endPoint, endDist);
    
    vec3 midPoint = mix(animatedStart, animatedEnd, 0.5);
    float pathOffset = sin(t * 3.14159) * 0.15;
    
    // Perpendicular calculation needs to be dynamic too if points move a lot
    vec3 dir = normalize(animatedEnd - animatedStart);
    vec3 perpendicular = normalize(cross(dir, vec3(0.0, 1.0, 0.0)));
    if (length(perpendicular) < 0.1) perpendicular = vec3(1.0, 0.0, 0.0);
    midPoint += perpendicular * pathOffset;
    
    vec3 p0 = mix(animatedStart, midPoint, t);
    vec3 p1 = mix(midPoint, animatedEnd, t);
    vec3 finalPos = mix(p0, p1, t);
    
    float noiseTime = uTime * 0.15;
    float noise = snoise(vec3(pathIndex * 0.08, t * 0.6, noiseTime));
    finalPos += perpendicular * noise * 0.12;
    
    vec3 worldPos = (modelMatrix * vec4(finalPos, 1.0)).xyz;
    
    float totalPulseIntensity = 0.0;
    for (int i = 0; i < 3; i++) {
        totalPulseIntensity += getPulseIntensity(worldPos, uPulsePositions[i], uPulseTimes[i]);
    }
    vPulseIntensity = min(totalPulseIntensity, 1.0);
    
    vColor = connectionColor;
    vConnectionStrength = connectionStrength;
    
    vDistanceFromCamera = length(worldPos - cameraPosition);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPos, 1.0);
}`,
    fragmentShader: `
uniform float uTime;
uniform vec3 uPulseColors[3];

varying vec3 vColor;
varying float vConnectionStrength;
varying float vPulseIntensity;
varying float vPathPosition;
varying float vDistanceFromCamera;

void main() {
    float flowPattern1 = sin(vPathPosition * 25.0 - uTime * 4.0) * 0.5 + 0.5;
    float flowPattern2 = sin(vPathPosition * 15.0 - uTime * 2.5 + 1.57) * 0.5 + 0.5;
    float combinedFlow = (flowPattern1 + flowPattern2 * 0.5) / 1.5;
    
    vec3 baseColor = vColor * (0.8 + 0.2 * sin(uTime * 0.6 + vPathPosition * 12.0));
    float flowIntensity = 0.4 * combinedFlow * vConnectionStrength;
    
    vec3 finalColor = baseColor;
    if (vPulseIntensity > 0.0) {
        vec3 pulseColor = mix(vec3(1.0), uPulseColors[0], 0.3);
        finalColor = mix(baseColor, pulseColor * 1.2, vPulseIntensity * 0.7);
        flowIntensity += vPulseIntensity * 0.8;
    }
    
    finalColor *= (0.7 + flowIntensity + vConnectionStrength * 0.5);
    
    float baseAlpha = 0.7 * vConnectionStrength;
    float flowAlpha = combinedFlow * 0.3; 
    float alpha = baseAlpha + flowAlpha;
    alpha = mix(alpha, min(1.0, alpha * 2.5), vPulseIntensity);
    
    float distanceFade = smoothstep(100.0, 15.0, vDistanceFromCamera);
    gl_FragColor = vec4(finalColor, alpha * distanceFade);
}`
};

interface Connection {
    node: Node;
    strength: number;
}

class Node {
    position: THREE.Vector3;
    connections: Connection[];
    level: number;
    type: number;
    size: number;
    distanceFromRoot: number;

    constructor(position: THREE.Vector3, level: number = 0, type: number = 0) {
        this.position = position;
        this.connections = [];
        this.level = level;
        this.type = type;
        this.size = type === 0 ? THREE.MathUtils.randFloat(0.8, 1.4) : THREE.MathUtils.randFloat(0.5, 1.0);
        this.distanceFromRoot = 0;
    }
    addConnection(node: Node, strength: number = 1.0) {
        // Simple object reference check, could be optimized
        if (!this.isConnectedTo(node)) {
            this.connections.push({ node, strength });
            node.connections.push({ node: this, strength });
        }
    }
    isConnectedTo(node: Node) {
        return this.connections.some(conn => conn.node === node);
    }
}

interface NeuralNetwork {
    nodes: Node[];
    rootNode: Node;
}

// ----------------- COMPONENT ----------------- //

export default function LotusGod() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const configRef = useRef({
        paused: false,
        activePaletteIndex: 0,
        currentFormation: 3, // Start with Lotus by default
        numFormations: 4,
        densityFactor: 1
    });

    useEffect(() => {
        if (!canvasRef.current) return;

        // Setup Three.js
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x000000, 0.002);

        const camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 8, 28);

        const renderer = new THREE.WebGLRenderer({
            canvas: canvasRef.current,
            antialias: true,
            powerPreference: "high-performance"
        });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
        controls.maxDistance = 80;
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.2;
        controls.enablePan = false;

        const composer = new EffectComposer(renderer);
        composer.addPass(new RenderPass(scene, camera));
        const bloomPass = new UnrealBloomPass(
            new THREE.Vector2(window.innerWidth, window.innerHeight),
            0.8, 0.4, 0.85 // Reduced strength (1.8->0.8), adjusted radius/threshold
        );
        composer.addPass(bloomPass);
        composer.addPass(new OutputPass());

        // Uniforms for shaders
        const pulseUniforms = {
            uTime: { value: 0.0 },
            uPulsePositions: {
                value: [
                    new THREE.Vector3(1e3, 1e3, 1e3),
                    new THREE.Vector3(1e3, 1e3, 1e3),
                    new THREE.Vector3(1e3, 1e3, 1e3)
                ]
            },
            uPulseTimes: { value: [-1e3, -1e3, -1e3] },
            uPulseColors: {
                value: [
                    new THREE.Color(1, 1, 1),
                    new THREE.Color(1, 1, 1),
                    new THREE.Color(1, 1, 1)
                ]
            },
            uPulseSpeed: { value: 18.0 },
            uBaseNodeSize: { value: 1.5 }, // Increased from 0.6
            uBloom: { value: 0.0 }
        };

        const colorPalettes = [
            [
                new THREE.Color(0x667eea),
                new THREE.Color(0x764ba2),
                new THREE.Color(0xf093fb),
                new THREE.Color(0x9d50bb),
                new THREE.Color(0x6e48aa)
            ],
            // ... add more if needed
        ];

        let neuralNetwork: NeuralNetwork | null = null;
        let nodesMesh: THREE.Points | null = null;
        let connectionsMesh: THREE.LineSegments | null = null;

        function generateLotusBloom(): NeuralNetwork {
            let nodes: Node[] = [];
            // Lower root to center the flower better
            let rootNode = new Node(new THREE.Vector3(0, -6, 0), 0, 0);
            rootNode.size = 2.0;
            nodes.push(rootNode);

            const createPetalStrand = (tipX: number, tipY: number, ctrlX: number, ctrlY: number, type: number) => {
                const layers = 10;
                let prev = rootNode;

                // Variation for volume
                const offsetX = Math.random() * 0.5 - 0.25;
                const offsetZ = Math.random() * 2.0 - 1.0;

                for (let i = 1; i <= layers; i++) {
                    const t = i / layers;

                    // Quadratic Bezier
                    // P0 = root (0,-5), P1 = ctrl, P2 = tip
                    const start = { x: 0, y: -5 };

                    const x = (1 - t) * (1 - t) * start.x + 2 * (1 - t) * t * (ctrlX + offsetX) + t * t * tipX;
                    const y = (1 - t) * (1 - t) * start.y + 2 * (1 - t) * t * (ctrlY) + t * t * tipY;
                    const z = offsetZ * (1 - t); // Taper z towards tip

                    const pos = new THREE.Vector3(x, y, z);
                    const node = new Node(pos, i, type);
                    node.distanceFromRoot = pos.length();

                    nodes.push(node);
                    prev.addConnection(node, 0.9);
                    prev = node;
                }
            };

            // TYPE 0 = Petal, TYPE 2 = Leaf (Green)

            // --- Center Petal (Pink) ---
            // A cluster of strands going up
            for (let i = 0; i < 12; i++) {
                // vary width slightly
                let w = (Math.random() - 0.5) * 4;
                createPetalStrand(0, 10 + Math.random(), w, 4, 0);
            }

            // --- Inner Side Petals (Pink) ---
            for (let i = 0; i < 8; i++) {
                // Left
                let w = -5 + (Math.random() - 0.5) * 2;
                createPetalStrand(-5, 7 + Math.random(), w, 2, 0);
                // Right
                createPetalStrand(5, 7 + Math.random(), -w, 2, 0);
            }

            // --- Outer Side Petals (Pink) ---
            for (let i = 0; i < 8; i++) {
                // Left
                let w = -8 + (Math.random() - 0.5) * 2;
                createPetalStrand(-8, 3 + Math.random(), w, -1, 0);
                // Right
                createPetalStrand(8, 3 + Math.random(), -w, -1, 0);
            }

            // --- Leaves (Green) ---
            for (let i = 0; i < 10; i++) {
                // Left Leaf
                let w = -9 + (Math.random() - 0.5) * 3;
                createPetalStrand(-9, -3 + Math.random(), w, -5, 2);
                // Right Leaf
                createPetalStrand(9, -3 + Math.random(), -w, -5, 2);
                // Center/Bottom Leaf?
                if (i < 4) createPetalStrand((Math.random() - 0.5) * 4, -5, (Math.random() - 0.5) * 4, -6, 2);
            }

            return { nodes, rootNode };
        }

        function createNetworkVisualization(formationIndex: number, densityFactor = 1.0) {
            if (nodesMesh) {
                scene.remove(nodesMesh);
                nodesMesh.geometry.dispose();
                (nodesMesh.material as THREE.Material).dispose();
            }
            if (connectionsMesh) {
                scene.remove(connectionsMesh);
                connectionsMesh.geometry.dispose();
                (connectionsMesh.material as THREE.Material).dispose();
            }

            neuralNetwork = generateLotusBloom();

            if (!neuralNetwork || neuralNetwork.nodes.length === 0) return;

            const nodesGeometry = new THREE.BufferGeometry();
            const nodePositions: number[] = [];
            const nodeTypes: number[] = [];
            const nodeSizes: number[] = [];
            const nodeColors: number[] = [];
            const distancesFromRoot: number[] = [];

            const palette = colorPalettes[0];
            const greenColor = new THREE.Color(0x4caf50); // Nice green for leaves

            neuralNetwork.nodes.forEach((node) => {
                nodePositions.push(node.position.x, node.position.y, node.position.z);
                nodeTypes.push(node.type); // type 0 = petal, 2 = leaf
                nodeSizes.push(node.size);
                distancesFromRoot.push(node.distanceFromRoot);

                if (node.type === 2) {
                    // Green Leaf
                    const c = greenColor.clone();
                    c.offsetHSL(THREE.MathUtils.randFloatSpread(0.1), THREE.MathUtils.randFloatSpread(0.1), THREE.MathUtils.randFloatSpread(0.1));
                    nodeColors.push(c.r, c.g, c.b);
                } else {
                    // Petal
                    const colorIndex = Math.min(node.level, palette.length - 1);
                    const baseColor = palette[colorIndex % palette.length].clone();
                    baseColor.offsetHSL(
                        THREE.MathUtils.randFloatSpread(0.03),
                        THREE.MathUtils.randFloatSpread(0.08),
                        THREE.MathUtils.randFloatSpread(0.08)
                    );
                    nodeColors.push(baseColor.r, baseColor.g, baseColor.b);
                }
            });

            nodesGeometry.setAttribute('position', new THREE.Float32BufferAttribute(nodePositions, 3));
            nodesGeometry.setAttribute('nodeType', new THREE.Float32BufferAttribute(nodeTypes, 1));
            nodesGeometry.setAttribute('nodeSize', new THREE.Float32BufferAttribute(nodeSizes, 1));
            nodesGeometry.setAttribute('nodeColor', new THREE.Float32BufferAttribute(nodeColors, 3));
            nodesGeometry.setAttribute('distanceFromRoot', new THREE.Float32BufferAttribute(distancesFromRoot, 1));

            const nodesMaterial = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                vertexShader: nodeShader.vertexShader,
                fragmentShader: nodeShader.fragmentShader,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            nodesMesh = new THREE.Points(nodesGeometry, nodesMaterial);
            scene.add(nodesMesh);

            // Connections
            const connectionsGeometry = new THREE.BufferGeometry();
            const connectionColors: number[] = [];
            const connectionStrengths: number[] = [];
            const connectionPositions: number[] = [];
            const startPoints: number[] = [];
            const endPoints: number[] = [];
            const pathIndices: number[] = [];

            const processedConnections = new Set();
            let pathIndex = 0;

            neuralNetwork.nodes.forEach((node, nodeIndex) => {
                node.connections.forEach(connection => {
                    const connectedNode = connection.node;
                    // Skip leaf-to-petal connections if we want cleaner separation? No, connect them.

                    // Check if neuralNetwork is not null before using it
                    if (!neuralNetwork) return;

                    const connectedIndex = neuralNetwork.nodes.indexOf(connectedNode);
                    if (connectedIndex === -1) return;

                    const key = [Math.min(nodeIndex, connectedIndex), Math.max(nodeIndex, connectedIndex)].join('-');
                    if (!processedConnections.has(key)) {
                        processedConnections.add(key);
                        const startPoint = node.position;
                        const endPoint = connectedNode.position;
                        const numSegments = 20;

                        for (let i = 0; i < numSegments; i++) {
                            const t = i / (numSegments - 1);
                            connectionPositions.push(t, 0, 0);
                            startPoints.push(startPoint.x, startPoint.y, startPoint.z);
                            endPoints.push(endPoint.x, endPoint.y, endPoint.z);
                            pathIndices.push(pathIndex);
                            connectionStrengths.push(connection.strength);

                            // Coloring Logic for connections
                            let cR, cG, cB;
                            if (node.type === 2 || connectedNode.type === 2) {
                                // If either is leaf, lean towards green or mix?
                                // Let's make connections green if both are leaves, else gradient?
                                // Simple: if target is leaf, use green.
                                const c = greenColor.clone();
                                cR = c.r; cG = c.g; cB = c.b;
                            } else {
                                const avgLevel = Math.min(Math.floor((node.level + connectedNode.level) / 2), palette.length - 1);
                                const baseColor = palette[avgLevel % palette.length].clone();
                                baseColor.offsetHSL(THREE.MathUtils.randFloatSpread(0.03), THREE.MathUtils.randFloatSpread(0.08), THREE.MathUtils.randFloatSpread(0.08));
                                cR = baseColor.r; cG = baseColor.g; cB = baseColor.b;
                            }

                            connectionColors.push(cR, cG, cB);
                        }
                        pathIndex++;
                    }
                });
            });
            connectionsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(connectionPositions, 3));
            connectionsGeometry.setAttribute('startPoint', new THREE.Float32BufferAttribute(startPoints, 3));
            connectionsGeometry.setAttribute('endPoint', new THREE.Float32BufferAttribute(endPoints, 3));
            connectionsGeometry.setAttribute('connectionStrength', new THREE.Float32BufferAttribute(connectionStrengths, 1));
            connectionsGeometry.setAttribute('connectionColor', new THREE.Float32BufferAttribute(connectionColors, 3));
            connectionsGeometry.setAttribute('pathIndex', new THREE.Float32BufferAttribute(pathIndices, 1));

            const connectionsMaterial = new THREE.ShaderMaterial({
                uniforms: THREE.UniformsUtils.clone(pulseUniforms),
                vertexShader: connectionShader.vertexShader,
                fragmentShader: connectionShader.fragmentShader,
                transparent: true,
                depthWrite: false,
                blending: THREE.AdditiveBlending
            });
            connectionsMesh = new THREE.LineSegments(connectionsGeometry, connectionsMaterial);
            scene.add(connectionsMesh);

            // Set initial uniforms
            for (let i = 0; i < 3; i++) {
                connectionsMaterial.uniforms.uPulseColors.value[i].copy(palette[i]);
                nodesMaterial.uniforms.uPulseColors.value[i].copy(palette[i]);
            }
        }

        createNetworkVisualization(3); // 3 is Lotus

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
                if (nodesMesh && connectionsMesh) {
                    lastPulseIndex = (lastPulseIndex + 1) % 3;
                    // Type assertion or check needed if Material doesn't have uniforms (it does for ShaderMaterial)
                    const nodeMat = nodesMesh.material as THREE.ShaderMaterial;
                    const connMat = connectionsMesh.material as THREE.ShaderMaterial;

                    nodeMat.uniforms.uPulsePositions.value[lastPulseIndex].copy(interactionPoint);
                    nodeMat.uniforms.uPulseTimes.value[lastPulseIndex] = time;
                    connMat.uniforms.uPulsePositions.value[lastPulseIndex].copy(interactionPoint);
                    connMat.uniforms.uPulseTimes.value[lastPulseIndex] = time;
                }
            }
        }

        // Animation Loop
        const clock = new THREE.Clock();
        let bloomTime = 0;

        function animate() {
            requestAnimationFrame(animate);
            const t = clock.getElapsedTime();

            // Bloom logic
            if (!configRef.current.paused) {
                bloomTime += 0.0025;
                bloomTime = Math.min(bloomTime, 1.0);

                if (nodesMesh) {
                    const mat = nodesMesh.material as THREE.ShaderMaterial;
                    mat.uniforms.uTime.value = t;
                    mat.uniforms.uBloom.value = bloomTime;
                    nodesMesh.rotation.y = Math.sin(t * 0.04) * 0.05;
                }
                if (connectionsMesh) {
                    const mat = connectionsMesh.material as THREE.ShaderMaterial;
                    mat.uniforms.uTime.value = t;
                    mat.uniforms.uBloom.value = bloomTime;
                    connectionsMesh.rotation.y = Math.sin(t * 0.04) * 0.05;
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
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
            composer.setSize(window.innerWidth, window.innerHeight);
            bloomPass.resolution.set(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onResize);

        // Interaction
        const onClick = (e: MouseEvent) => {
            if (!configRef.current.paused) triggerPulse(e.clientX, e.clientY);
        };
        window.addEventListener('click', onClick);

        return () => {
            window.removeEventListener('resize', onResize);
            window.removeEventListener('click', onClick);
            // Cleanup
            if (nodesMesh) {
                nodesMesh.geometry.dispose();
                (nodesMesh.material as THREE.Material).dispose();
            }
            if (connectionsMesh) {
                connectionsMesh.geometry.dispose();
                (connectionsMesh.material as THREE.Material).dispose();
            }
            renderer.dispose();
        }
    }, []);

    return (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: '#000', zIndex: 9999 }}>
            <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />

            {/* Logo in top right */}
            <div style={{ position: 'absolute', top: '20px', right: '140px', zIndex: 1000, pointerEvents: 'none' }}>
                <img src="/images/logo.png" alt="Spiritual AI Logo" style={{ width: '60px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.3))' }} />
            </div>

            <div style={{
                position: 'absolute',
                top: 20,
                left: 20,
                color: 'rgba(255,255,255,0.7)',
                fontFamily: 'sans-serif',
                pointerEvents: 'none'
            }}>
                <h1>Lotus God</h1>
                <p>Click to send energy pulses.</p>
            </div>

            <a href="/" style={{
                position: 'absolute',
                top: 20,
                right: 20,
                color: 'white',
                textDecoration: 'none',
                padding: '10px 20px',
                border: '1px solid rgba(255,255,255,0.3)',
                borderRadius: '20px',
                backdropFilter: 'blur(10px)',
                fontFamily: 'sans-serif'
            }}>
                Back Home
            </a>
        </div>
    );
}
