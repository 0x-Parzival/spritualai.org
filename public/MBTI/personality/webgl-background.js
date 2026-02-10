import * as THREE from 'https://unpkg.com/three@0.160.0/build/three.module.js';

// Configuration
const PARTICLE_COUNT = 1000;
const PARTICLE_SIZE = 0.02;
const MOUSE_INFLUENCE = 0.1;

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

    getThemeColors() {
        const style = getComputedStyle(document.body);
        const primary = style.getPropertyValue('--accent-primary').trim() || '#9154ff';
        const secondary = style.getPropertyValue('--accent-secondary').trim() || '#bd00ff';
        return { primary, secondary };
    }

    init() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, this.width / this.height, 0.1, 1000);
        this.camera.position.z = 3;

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.width, this.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        this.createParticles();
    }

    createParticles() {
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(PARTICLE_COUNT * 3);
        const colors = new Float32Array(PARTICLE_COUNT * 3);
        const { primary, secondary } = this.getThemeColors();

        const colorA = new THREE.Color(primary);
        const colorB = new THREE.Color(secondary);

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 5;

            const mixedColor = colorA.clone().lerp(colorB, Math.random());
            colors[i * 3] = mixedColor.r;
            colors[i * 3 + 1] = mixedColor.g;
            colors[i * 3 + 2] = mixedColor.b;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
            size: 0.03,
            vertexColors: true,
            transparent: true,
            opacity: 0.6,
            blending: THREE.AdditiveBlending,
            sizeAttenuation: true
        });

        this.points = new THREE.Points(geometry, material);
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

        this.mouseX += (this.targetMouseX - this.mouseX) * 0.05;
        this.mouseY += (this.targetMouseY - this.mouseY) * 0.05;

        this.points.rotation.y += 0.001;
        this.points.rotation.x += 0.0005;

        this.points.rotation.x += this.mouseY * MOUSE_INFLUENCE;
        this.points.rotation.y += this.mouseX * MOUSE_INFLUENCE;

        this.renderer.render(this.scene, this.camera);
    }
}

document.addEventListener('DOMContentLoaded', () => new SpiritualBackground());
