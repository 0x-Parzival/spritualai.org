"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function SpaceBackground() {
    const containerRef = useRef<HTMLDivElement>(null);
    const planetRef = useRef<HTMLImageElement>(null);

    useEffect(() => {
        if (!containerRef.current) return;

        let camera: THREE.PerspectiveCamera;
        let scene: THREE.Scene;
        let renderer: THREE.WebGLRenderer;
        let isUserInteracting = false;
        let onPointerDownPointerX = 0;
        let onPointerDownPointerY = 0;
        let lon = 90;
        let onPointerDownLon = 0;
        let lat = 0;
        let onPointerDownLat = 0;
        let phi = 0;
        let theta = 0;
        const target = new THREE.Vector3();

        function init() {
            const container = containerRef.current;
            if (!container) return;

            camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1100);
            scene = new THREE.Scene();

            // Create space skybox
            const materials = [
                loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space4.jpg'), // right
                loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space2.jpg'), // left
                loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space1.jpg'), // top
                loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space6.jpg'), // bottom
                loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space3.jpg'), // back
                loadTexture('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/space5.jpg')  // front
            ];

            const geometry = new THREE.BoxGeometry(300, 300, 300, 7, 7, 7);
            const mesh = new THREE.Mesh(geometry, materials);
            mesh.scale.x = -1;
            scene.add(mesh);

            // Normalize vertices
            const vertices = geometry.attributes.position;
            for (let i = 0; i < vertices.count; i++) {
                const vertex = new THREE.Vector3(
                    vertices.getX(i),
                    vertices.getY(i),
                    vertices.getZ(i)
                );
                vertex.normalize();
                vertex.multiplyScalar(550);
                vertices.setXYZ(i, vertex.x, vertex.y, vertex.z);
            }

            renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
            renderer.setPixelRatio(window.devicePixelRatio);
            renderer.setSize(window.innerWidth, window.innerHeight);
            container.appendChild(renderer.domElement);

            // Event listeners
            document.addEventListener('mousedown', onDocumentMouseDown);
            document.addEventListener('mousemove', onDocumentMouseMove);
            document.addEventListener('mouseup', onDocumentMouseUp);
            document.addEventListener('touchstart', onDocumentTouchStart);
            document.addEventListener('touchmove', onDocumentTouchMove);
            window.addEventListener('resize', onWindowResize);
        }

        function loadTexture(path: string) {
            const texture = new THREE.TextureLoader().load(path);
            return new THREE.MeshBasicMaterial({ map: texture, side: THREE.BackSide });
        }

        function onWindowResize() {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        }

        function onDocumentMouseDown(event: MouseEvent) {
            event.preventDefault();
            isUserInteracting = true;
            onPointerDownPointerX = event.clientX;
            onPointerDownPointerY = event.clientY;
            onPointerDownLon = lon;
            onPointerDownLat = lat;
        }

        function onDocumentMouseMove(event: MouseEvent) {
            if (isUserInteracting === true) {
                lon = (onPointerDownPointerX - event.clientX) * 0.1 + onPointerDownLon;
                lat = (event.clientY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
            }
        }

        function onDocumentMouseUp() {
            isUserInteracting = false;
        }

        function onDocumentTouchStart(event: TouchEvent) {
            if (event.touches.length === 1) {
                event.preventDefault();
                onPointerDownPointerX = event.touches[0].pageX;
                onPointerDownPointerY = event.touches[0].pageY;
                onPointerDownLon = lon;
                onPointerDownLat = lat;
            }
        }

        function onDocumentTouchMove(event: TouchEvent) {
            if (event.touches.length === 1) {
                event.preventDefault();
                lon = (onPointerDownPointerX - event.touches[0].pageX) * 0.1 + onPointerDownLon;
                lat = (event.touches[0].pageY - onPointerDownPointerY) * 0.1 + onPointerDownLat;
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            update();
        }

        function update() {
            if (isUserInteracting === false) {
                lon += 0.1;
            }

            lat = Math.max(-85, Math.min(85, lat));
            phi = THREE.MathUtils.degToRad(90 - lat);
            theta = THREE.MathUtils.degToRad(lon);

            target.x = 500 * Math.sin(phi) * Math.cos(theta);
            target.y = 500 * Math.cos(phi);
            target.z = 500 * Math.sin(phi) * Math.sin(theta);

            camera.position.copy(target).negate();
            camera.lookAt(target);

            renderer.render(scene, camera);
        }

        init();
        animate();

        // Cleanup
        return () => {
            document.removeEventListener('mousedown', onDocumentMouseDown);
            document.removeEventListener('mousemove', onDocumentMouseMove);
            document.removeEventListener('mouseup', onDocumentMouseUp);
            document.removeEventListener('touchstart', onDocumentTouchStart);
            document.removeEventListener('touchmove', onDocumentTouchMove);
            window.removeEventListener('resize', onWindowResize);
            if (containerRef.current && renderer.domElement) {
                containerRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return (
        <>
            <div
                ref={containerRef}
                style={{
                    position: 'fixed',
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: 'auto'
                }}
            />
            {/* Dark overlay for better text readability */}
            <div
                style={{
                    position: 'fixed',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.7)',
                    zIndex: 0,
                    pointerEvents: 'none'
                }}
            />
            <img
                ref={planetRef}
                src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1037366/planet2.png"
                alt="Planet"
                style={{
                    width: '8vw',
                    position: 'fixed',
                    top: 0,
                    right: 0,
                    left: 0,
                    bottom: 0,
                    margin: 'auto',
                    zIndex: 1,
                    pointerEvents: 'none'
                }}
            />
        </>
    );
}
