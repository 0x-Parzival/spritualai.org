"use client";

import React, { useEffect, useRef } from 'react';

export default function StarfieldHero({ boost = false }: { boost?: boolean }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const context = canvas.getContext('2d');
        if (!context) return;

        let canvasWidth = window.innerWidth;
        let canvasHeight = window.innerHeight;
        let centerX = canvasWidth * 0.5;
        let centerY = canvasHeight * 0.5;

        // Configuration
        const PARTICLE_NUM = 120;
        const PARTICLE_BASE_RADIUS = 0.5;
        const FL = 500;
        const DEFAULT_SPEED = 2;
        const BOOST_SPEED = 300;

        // State
        let speed = DEFAULT_SPEED;
        let targetSpeed = DEFAULT_SPEED;
        let particles: any[] = [];
        let mouseX = centerX;
        let mouseY = centerY;
        let requestRef: number;

        // Particle Helper
        class Particle {
            x: number;
            y: number;
            z: number;
            pastZ: number;

            constructor(x?: number, y?: number, z?: number) {
                this.x = x || 0;
                this.y = y || 0;
                this.z = z || 0;
                this.pastZ = 0;
            }
        }

        function randomizeParticle(p: Particle) {
            p.x = Math.random() * canvasWidth;
            p.y = Math.random() * canvasHeight;
            p.z = Math.random() * 1500 + 500;
            return p;
        }

        // Init
        const resize = () => {
            canvasWidth = canvas!.width = window.innerWidth;
            canvasHeight = canvas!.height = window.innerHeight;
            centerX = canvasWidth * 0.5;
            centerY = canvasHeight * 0.5;
        };

        window.addEventListener('resize', resize);
        resize();

        for (let i = 0; i < PARTICLE_NUM; i++) {
            particles[i] = randomizeParticle(new Particle());
            particles[i].z -= 500 * Math.random();
        }

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };
        const handleMouseDown = () => {
            targetSpeed = BOOST_SPEED;
        };
        const handleMouseUp = () => {
            targetSpeed = DEFAULT_SPEED;
        };

        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);

        // Loop
        const loop = () => {
            if (!context || !canvas) return;

            // Clear with transparency to show Layer 1
            context.clearRect(0, 0, canvasWidth, canvasHeight);

            const activeBoost = boost || targetSpeed === BOOST_SPEED;
            const currentTarget = activeBoost ? BOOST_SPEED : DEFAULT_SPEED;
            speed += (currentTarget - speed) * (activeBoost ? 0.05 : 0.01);

            let p: Particle;
            let cx, cy;
            let rx, ry;
            let f, x, y, r;
            let pf, px, py, pr;
            let a, a1, a2;

            const halfPi = Math.PI * 0.5;
            const atan2 = Math.atan2;
            const cos = Math.cos;
            const sin = Math.sin;

            context.beginPath();
            context.fillStyle = 'rgb(255, 255, 255)';

            for (let i = 0; i < PARTICLE_NUM; i++) {
                p = particles[i];

                p.pastZ = p.z;
                p.z -= speed;

                if (p.z <= 0) {
                    randomizeParticle(p);
                    continue;
                }

                cx = centerX - (mouseX - centerX) * 1.25;
                cy = centerY - (mouseY - centerY) * 1.25;

                rx = p.x - cx;
                ry = p.y - cy;

                f = FL / p.z;
                x = cx + rx * f;
                y = cy + ry * f;
                r = PARTICLE_BASE_RADIUS * f;

                pf = FL / p.pastZ;
                px = cx + rx * pf;
                py = cy + ry * pf;
                pr = PARTICLE_BASE_RADIUS * pf;

                a = atan2(py - y, px - x);
                a1 = a + halfPi;
                a2 = a - halfPi;

                context.moveTo(px + pr * cos(a1), py + pr * sin(a1));
                context.arc(px, py, pr, a1, a2, true);
                context.lineTo(x + r * cos(a2), y + r * sin(a2));
                context.arc(x, y, r, a2, a1, true);
                context.closePath();
            }
            context.fill();
            requestRef = requestAnimationFrame(loop);
        };

        requestRef = requestAnimationFrame(loop);

        return () => {
            cancelAnimationFrame(requestRef);
            window.removeEventListener('resize', resize);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="starfield-canvas"
            style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 1 // Managed by parent
            }}
        />
    );
}
