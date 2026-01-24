import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// Configuration
const PARTICLE_COUNT = 700;
const PARTICLE_SIZE = 0.02;
const FLOW_SPEED = 0.2;
const MOUSE_INFLUENCE = 0.05;

class SpiritualBackground {
    constructor() {
        this.container = document.body;
        this.canvas = document.querySelector('#webgl-canvas');
        if (!this.canvas) {
            this.canvas = document.createElement('canvas');
            this.canvas.id = 'webgl-canvas';
            this.canvas.style.position = 'fixed';
            this.canvas.style.top = '0';
            this.canvas.style.left = '0';
            this.canvas.style.width = '100%';
            this.canvas.style.height = '100%';
            this.canvas.style.zIndex = '-1';
            this.canvas.style.pointerEvents = 'none';
            this.container.appendChild(this.canvas);
        }

        this.width = window.innerWidth;
        this.height = window.innerHeight;

        this.mouseX = 0;
        this.mouseY = 0;
        this.targetMouseX = 0;
        this.targetMouseY = 0;

        this.init();
        this.animate();
        this.addEventListeners();
    }

    init() {
        // Scene
        this.scene = new THREE.Scene();
        // this.scene.background = new THREE.Color(0x050510); // Very dark blue/black
        // Transparent background

        // Camera
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 2;

        // Renderer
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        // Particles
        this.createParticles();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const sizes = new Float32Array(PARTICLE_COUNT);

        const color1 = new THREE.Color(0x9154ff); // Purple
        const color2 = new THREE.Color(0x4fd1c5); // Teal

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Position
            positions[i * 3] = (Math.random() - 0.5) * 5;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 2;

            // Color
            const mixedColor = color1.clone().lerp(color2, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;

            // Size
            sizes[i] = Math.random();
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));

        // Shader Material for round glowing particles
        const vertexShader = `
            attribute float size;
            attribute vec3 color;
            varying vec3 vColor;
            void main() {
                vColor = color;
                vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
                gl_PointSize = size * (300.0 / -mvPosition.z);
                gl_Position = projectionMatrix * mvPosition;
            }
        `;

        const fragmentShader = `
            varying vec3 vColor;
            void main() {
                float r = distance(gl_PointCoord, vec2(0.5));
                if (r > 0.5) discard;
                float alpha = 1.0 - (r * 2.0);
                alpha = pow(alpha, 1.5);
                gl_FragColor = vec4(vColor, alpha);
            }
        `;

        this.material = new THREE.ShaderMaterial({
            uniforms: {
                time: { value: 0 },
            },
            vertexShader,
            fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending
        });

        this.points = new THREE.Points(geometry, this.material);
        this.scene.add(this.points);
    }

    addEventListeners() {
        window.addEventListener('resize', () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.camera.aspect = this.width / this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        });

        window.addEventListener('mousemove', (e) => {
            this.targetMouseX = (e.clientX - this.width / 2) * 0.001;
            this.targetMouseY = (e.clientY - this.height / 2) * 0.001;
        });
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Physics/Movement
        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        this.points.rotation.y += 0.001;
        this.points.rotation.x += 0.0005;

        this.points.rotation.x += this.mouseY * MOUSE_INFLUENCE;
        this.points.rotation.y += this.mouseX * MOUSE_INFLUENCE;

        // Wave effect
        const positions = this.points.geometry.attributes.position.array;
        const time = Date.now() * 0.001;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            // Subtle flowing movement can be added here if needed
        }

        this.renderer.render(this.scene, this.camera);
    }
}

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => new SpiritualBackground());
} else {
    new SpiritualBackground();
}
