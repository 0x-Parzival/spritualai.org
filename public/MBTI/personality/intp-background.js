import * as THREE from 'three';
import { createNoise2D } from "https://esm.sh/simplex-noise";

class Effect {
    constructor() {
        this.textures = {};
        this.mouseX = 0;
        this.mouseY = 0;
        this.planets = [];
    }

    async init() {
        this.initThree();
        await this.loadTextures();
        this.createScene();
        this.animate();
        this.addMouseControl();
        window.addEventListener("resize", () => this.onResize());
    }

    initThree() {
        const container = document.querySelector(".webgl");

        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            55,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        this.camera.position.set(0, 0, 12);

        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(this.renderer.domElement);

        const directionalLight = new THREE.DirectionalLight("#ffffff", 2);
        directionalLight.position.set(5, 5, 5);
        this.scene.add(directionalLight);

        const ambientLight = new THREE.AmbientLight("#ffffff", 0.8);
        this.scene.add(ambientLight);
    }

    async loadTextures() {
        const loader = new THREE.TextureLoader();
        loader.crossOrigin = "anonymous";

        const textureMap = {
            sky: "https://i.ibb.co/HC0vxMw/sky2.jpg",
            star: "https://i.ibb.co/NpJzwns/star.jpg",
            flare1: "https://i.ibb.co/TRsJ1tm/p1.png",
            flare2: "https://i.ibb.co/YQcTCRG/p2.png",
            planet1: "https://i.ibb.co/s1cZDnM/planet1.webp",
            planet2: "https://i.ibb.co/Lt5Kn7y/planet2.webp",
            planet3: "https://i.ibb.co/T8V57p4/planet3.webp"
        };

        const promises = Object.entries(textureMap).map(([key, path]) => {
            return new Promise((resolve) => {
                loader.load(path, texture => {
                    texture.colorSpace = THREE.SRGBColorSpace;
                    this.textures[key] = texture;
                    resolve();
                });
            });
        });

        await Promise.all(promises);
    }

    createScene() {

        // 🔵 Smaller nucleus
        const geometry = new THREE.IcosahedronGeometry(2.5, 20);
        const material = new THREE.MeshPhongMaterial({
            map: this.textures.star
        });

        this.nucleus = new THREE.Mesh(geometry, material);

        // Move sphere to RIGHT
        this.nucleus.position.x = 4;
        this.scene.add(this.nucleus);

        this.originalPositions = geometry.attributes.position.array.slice();
        this.noise = createNoise2D();

        // 🌌 Background sphere (KEEPING YOUR STYLE)
        const bgGeo = new THREE.SphereGeometry(30, 40, 40);
        const bgMat = new THREE.MeshBasicMaterial({
            map: this.textures.sky,
            side: THREE.BackSide
        });

        this.bgSphere = new THREE.Mesh(bgGeo, bgMat);
        this.bgSphere.position.x = 4;
        this.scene.add(this.bgSphere);

        // ✨ Floating Stars
        const starGeo = new THREE.BufferGeometry();
        const starCount = 1000;
        const positions = new Float32Array(starCount * 3);

        for (let i = 0; i < starCount; i++) {
            const radius = 10 + Math.random() * 15;
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.random() * Math.PI;

            positions[i * 3] = 4 + radius * Math.sin(phi) * Math.cos(theta);
            positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
            positions[i * 3 + 2] = radius * Math.cos(phi);
        }

        starGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));

        const starMat = new THREE.PointsMaterial({
            size: 0.3,
            map: this.textures.flare1,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.stars = new THREE.Points(starGeo, starMat);
        this.scene.add(this.stars);

        // 🪐 Orbiting Planets
        const planetTextures = [this.textures.planet1, this.textures.planet2, this.textures.planet3];
        const planetSizes = [0.08, 0.12, 0.06];

        for (let i = 0; i < 3; i++) {
            const planetGeo = new THREE.SphereGeometry(planetSizes[i], 32, 32);
            const planetMat = new THREE.MeshPhongMaterial({
                map: planetTextures[i],
                emissive: 0x222222,
                shininess: 50
            });
            const planet = new THREE.Mesh(planetGeo, planetMat);

            planet.orbitRadius = 8 + i * 4;
            planet.orbitSpeed = 0.001 + Math.random() * 0.002;
            planet.orbitOffset = Math.random() * Math.PI * 2;
            planet.position.x = 4; // Start near nucleus center

            this.scene.add(planet);
            this.planets.push(planet);
        }
    }

    addMouseControl() {
        window.addEventListener("mousemove", (e) => {
            this.mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
            this.mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
        });
    }

    updateNucleus() {
        const pos = this.nucleus.geometry.attributes.position;

        for (let i = 0; i < pos.count; i++) {
            const ix = i * 3;
            const x = this.originalPositions[ix];
            const y = this.originalPositions[ix + 1];
            const z = this.originalPositions[ix + 2];

            const length = Math.sqrt(x * x + y * y + z * z);
            const nx = x / length;
            const ny = y / length;

            const displacement = 2.5 + this.noise(nx + Date.now() * 0.0003, ny) * 0.6;

            pos.array[ix] = nx * displacement;
            pos.array[ix + 1] = ny * displacement;
            pos.array[ix + 2] = (z / length) * displacement;
        }

        pos.needsUpdate = true;
        this.nucleus.geometry.computeVertexNormals();
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.updateNucleus();

        // Cursor-based smooth rotation
        this.nucleus.rotation.y += (this.mouseX * 1.5 - this.nucleus.rotation.y) * 0.05;
        this.nucleus.rotation.x += (this.mouseY * 1.2 - this.nucleus.rotation.x) * 0.05;

        this.stars.rotation.y += 0.0005;

        // Update Planets
        this.planets.forEach((planet, i) => {
            const angle = Date.now() * planet.orbitSpeed + planet.orbitOffset;
            planet.position.x = 4 + Math.cos(angle) * planet.orbitRadius;
            planet.position.z = Math.sin(angle) * planet.orbitRadius;
            planet.rotation.y += 0.01;
        });

        this.renderer.render(this.scene, this.camera);
    }

    onResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}

const effect = new Effect();
effect.init();
