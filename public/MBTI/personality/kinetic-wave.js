// Kinetic Wave Implementation
const container = document.getElementById('canvas-container');
const width = container.offsetWidth;
const height = container.offsetHeight;

const scene = new THREE.Scene();
scene.background = null; // Transparent to see the sphere background

const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
camera.position.set(0, 30, 30);
camera.lookAt(0, 0, 0);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(width, height);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.getElementById('canvas-container').appendChild(renderer.domElement);

// Configuration
const CONFIG = {
    gridSize: 40,
    spacing: 0.9,
    boxSize: 0.6,
    waveSpeed: 1.5,
    waveHeight: 2.5,
    mouseRadius: 10,
    mouseStrength: 4,
    chaos: 0
};

// Create InstancedMesh
const geometry = new THREE.BoxGeometry(CONFIG.boxSize, CONFIG.boxSize, CONFIG.boxSize);
const material = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.2,
    metalness: 0.6,
    emissive: 0x111111,
    emissiveIntensity: 0.2,
    transparent: true,
    opacity: 0.8
});

const count = CONFIG.gridSize * CONFIG.gridSize;
const mesh = new THREE.InstancedMesh(geometry, material, count);
mesh.castShadow = true;
mesh.receiveShadow = true;

// Initialize Instance Colors
const baseColor = new THREE.Color(0x444444);
for (let i = 0; i < count; i++) {
    mesh.setColorAt(i, baseColor);
}

scene.add(mesh);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 4);
scene.add(ambientLight);

const mouseLight = new THREE.PointLight(0xffffff, 2, 15);
scene.add(mouseLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(20, 40, 20);
dirLight.castShadow = true;
scene.add(dirLight);

// Colored lights
const pointLight1 = new THREE.PointLight(0x9154ff, 5, 100); // INTP Theme Purple
pointLight1.position.set(0, 10, 0);
scene.add(pointLight1);

const dummy = new THREE.Object3D();
const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
let mousePos3D = new THREE.Vector3();
let isExploding = false;
let cameraAngle = 0;
let cameraPhi = Math.PI / 4;

// Initialize Grid Positions
const initialPositions = [];
const randomOffsets = [];
for (let x = 0; x < CONFIG.gridSize; x++) {
    for (let z = 0; z < CONFIG.gridSize; z++) {
        const posX = (x - CONFIG.gridSize / 2) * CONFIG.spacing;
        const posZ = (z - CONFIG.gridSize / 2) * CONFIG.spacing;
        initialPositions.push({ x: posX, y: 0, z: posZ, ox: posX, oz: posZ });
        randomOffsets.push({
            rx: (Math.random() - 0.5) * 2,
            ry: (Math.random() - 0.5) * 2,
            rz: (Math.random() - 0.5) * 2
        });
    }
}

window.addEventListener('mousemove', (event) => {
    const rect = container.getBoundingClientRect();
    mouse.x = ((event.clientX - rect.left) / width) * 2 - 1;
    mouse.y = -((event.clientY - rect.top) / height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const target = new THREE.Vector3();
    const intersection = raycaster.ray.intersectPlane(plane, target);

    if (intersection) {
        gsap.to(mousePos3D, {
            x: target.x,
            z: target.z,
            duration: 0.1,
            ease: "power2.out"
        });
        mouseLight.position.set(target.x, 5, target.z);
    }
});

function triggerExplosion() {
    if (isExploding) return;
    isExploding = true;
    const tl = gsap.timeline({ onComplete: () => { isExploding = false; } });
    tl.to(CONFIG, { spacing: 4, chaos: 1, duration: 0.4, ease: "power4.out" })
        .to(CONFIG, { spacing: 0.9, chaos: 0, duration: 1.2, ease: "elastic.out(1, 0.3)" });
}

// window.addEventListener('click', triggerExplosion);

const clock = new THREE.Clock();
const currentGlowColor = new THREE.Color(0x9154ff);

function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    let i = 0;
    for (let x = 0; x < CONFIG.gridSize; x++) {
        for (let z = 0; z < CONFIG.gridSize; z++) {
            const pos = initialPositions[i];
            const offset = randomOffsets[i];

            const dx = pos.ox - mousePos3D.x;
            const dz = pos.oz - mousePos3D.z;
            const dist = Math.sqrt(dx * dx + dz * dz);

            let y = Math.sin(dist * 0.4 - time * CONFIG.waveSpeed) * 0.8;

            if (dist < CONFIG.mouseRadius) {
                const force = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseStrength;
                y += Math.sin(dist * 1.5 - time * 4) * force;
            }

            const currentSpacing = CONFIG.spacing;
            const finalX = (x - CONFIG.gridSize / 2) * currentSpacing;
            const finalZ = (z - CONFIG.gridSize / 2) * currentSpacing;

            dummy.position.set(finalX, y, finalZ);
            dummy.rotation.x = (y * 0.1) + (offset.rx * CONFIG.chaos * 2);
            dummy.rotation.y = (offset.ry * CONFIG.chaos * 2);
            dummy.rotation.z = (y * 0.1) + (offset.rz * CONFIG.chaos * 2);

            const scale = 1 + y * 0.2;
            dummy.scale.set(scale, scale, scale);

            dummy.updateMatrix();
            mesh.setMatrixAt(i, dummy.matrix);

            if (dist < CONFIG.mouseRadius * 0.8) {
                const intensity = 1 - (dist / (CONFIG.mouseRadius * 0.8));
                const r = THREE.MathUtils.lerp(baseColor.r, currentGlowColor.r, intensity);
                const g = THREE.MathUtils.lerp(baseColor.g, currentGlowColor.g, intensity);
                const b = THREE.MathUtils.lerp(baseColor.b, currentGlowColor.b, intensity);
                mesh.setColorAt(i, new THREE.Color(r, g, b));
            } else {
                mesh.setColorAt(i, baseColor);
            }
            i++;
        }
    }

    mesh.instanceMatrix.needsUpdate = true;
    mesh.instanceColor.needsUpdate = true;
    renderer.render(scene, camera);
}

animate();

window.addEventListener('resize', () => {
    const newWidth = container.offsetWidth;
    const newHeight = container.offsetHeight;
    camera.aspect = newWidth / newHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(newWidth, newHeight);
});
