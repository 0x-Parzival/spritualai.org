"use client";

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';

export default function ThankYouPage() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let maxx: number, maxy: number;
        let radiush: number;
        let radius: number;
        let evolHue: number, dHue: number;
        let reachable: Group[];
        let messages: { message: string }[] = [];
        let animationFrameId: number;

        const RADIUS_MINI = 0.003;
        const RADIUS_MAXI = 0.006;
        const DHUE = 1;

        const mrandom = Math.random;
        const mfloor = Math.floor;
        const mabs = Math.abs;
        const mmin = Math.min;
        const mmax = Math.max;
        const mPI = Math.PI;
        const m2PI = Math.PI * 2;
        const msin = Math.sin;
        const mcos = Math.cos;
        const mhypot = Math.hypot;
        const msqrt = Math.sqrt;
        const rac3 = msqrt(3);
        const rac3s2 = rac3 / 2;

        function alea(min: number, max?: number) {
            if (typeof max == "undefined") return min * mrandom();
            return min + (max - min) * mrandom();
        }

        function intAlea(min: number, max?: number) {
            if (typeof max == "undefined") {
                max = min;
                min = 0;
            }
            return mfloor(min + (max - min) * mrandom());
        }

        function arrayShuffle<T>(array: T[]): T[] {
            let k1, temp;
            for (let k = array.length - 1; k >= 1; --k) {
                k1 = intAlea(0, k + 1);
                temp = array[k];
                array[k] = array[k1];
                array[k1] = temp;
            }
            return array;
        }

        function getKey(kx: number, ky: number) {
            return `${kx}:${ky}`;
        }

        class Hexagon {
            static dneighbors = [
                { dx: 1, dy: 1 },
                { dx: -1, dy: 2 },
                { dx: -2, dy: 1 },
                { dx: -1, dy: -1 },
                { dx: 1, dy: -2 },
                { dx: 2, dy: -1 }
            ];
            static rot60(k: { kx: number; ky: number }) {
                return { kx: -k.ky, ky: k.kx + k.ky };
            }
            static symm(k: { kx: number; ky: number }) {
                return { kx: k.kx + k.ky, ky: -k.ky };
            }
            kx: number;
            ky: number;
            key: string;
            c: { x: number; y: number };
            isVisible: boolean;

            constructor(kx: number, ky: number) {
                this.kx = kx;
                this.ky = ky;
                this.key = getKey(kx, ky);
                this.c = {
                    x: maxx / 2 + this.ky * radiush * rac3s2,
                    y: maxy / 2 - (this.kx + 0.5 * this.ky) * radiush
                };
                this.isVisible =
                    this.c.x >= -radius &&
                    this.c.x <= maxx + radius &&
                    this.c.y >= -radius &&
                    this.c.y <= maxy + radius;
            }

            draw() {
                if (!ctx) return;
                let color = ctx.createRadialGradient(
                    this.c.x + 0.4 * radius,
                    this.c.y - 0.4 * radius,
                    0,
                    this.c.x,
                    this.c.y,
                    radius
                );
                color.addColorStop(0, `hsl(${evolHue} 100% 80%)`);
                color.addColorStop(0.5, `hsl(${evolHue} 100% 50%)`);
                color.addColorStop(1.0, `hsl(${evolHue} 100% 30%)`);
                ctx.beginPath();
                ctx.arc(this.c.x, this.c.y, radius, 0, m2PI);
                ctx.fillStyle = color;
                ctx.fill();
            }
        }

        class Group extends Map<string, Hexagon> {
            key: string;
            constructor(kx: number, ky: number) {
                super();
                let key = "z";
                let addhex = (h: Hexagon) => {
                    if (h.key < key) key = h.key;
                    if (h.isVisible) this.set(h.key, h);
                };
                let h1 = new Hexagon(kx, ky);
                addhex(h1);
                let nh = Hexagon.rot60(h1);
                let h2 = new Hexagon(nh.kx, nh.ky);
                addhex(h2);
                nh = Hexagon.rot60(nh);
                let h3 = new Hexagon(nh.kx, nh.ky);
                addhex(h3);
                nh = Hexagon.rot60(nh);
                let h4 = new Hexagon(nh.kx, nh.ky);
                addhex(h4);
                nh = Hexagon.rot60(nh);
                let h5 = new Hexagon(nh.kx, nh.ky);
                addhex(h5);
                nh = Hexagon.rot60(nh);
                let h6 = new Hexagon(nh.kx, nh.ky);
                addhex(h6);
                nh = Hexagon.symm(h1);
                let h7 = new Hexagon(nh.kx, nh.ky);
                addhex(h7);
                nh = Hexagon.symm(h2);
                h7 = new Hexagon(nh.kx, nh.ky);
                addhex(h7);
                nh = Hexagon.symm(h3);
                h7 = new Hexagon(nh.kx, nh.ky);
                addhex(h7);
                nh = Hexagon.symm(h4);
                h7 = new Hexagon(nh.kx, nh.ky);
                addhex(h7);
                nh = Hexagon.symm(h5);
                h7 = new Hexagon(nh.kx, nh.ky);
                addhex(h7);
                nh = Hexagon.symm(h6);
                h7 = new Hexagon(nh.kx, nh.ky);
                addhex(h7);
                this.key = key;
            }
        }

        function startOver() {
            if (!canvas || !ctx) return false;
            maxx = window.innerWidth;
            maxy = window.innerHeight;
            canvas.width = maxx;
            canvas.height = maxy;
            ctx.lineJoin = "round";
            ctx.lineCap = "round";
            ctx.fillStyle = "#000";
            ctx.fillRect(0, 0, maxx, maxy);

            radiush = mhypot(maxx, maxy) * alea(RADIUS_MINI, RADIUS_MAXI);
            radius = radiush * rac3s2;
            evolHue = intAlea(360);
            dHue = intAlea(2) ? DHUE : -DHUE;
            return true;
        }

        let animState = 0;
        let tEndw: number;
        let visitedGroups: string[];
        let currGroup: Group | undefined;

        const animate = (tStamp: number) => {
            let message = messages.shift();
            if (message && (message.message === "reset" || message.message === "click")) {
                animState = 0;
            }

            animationFrameId = window.requestAnimationFrame(animate);
            let tEnd = performance.now() + 16; // targeting ~60fps logic chunks

            do {
                switch (animState) {
                    case 0:
                        if (startOver()) {
                            animState = 1;
                        }
                        break;

                    case 1:
                        visitedGroups = [];
                        reachable = [new Group(15, 0)];
                        animState = 2;
                        break;

                    case 2:
                        if (reachable.length == 0) {
                            animState = 10;
                            tEndw = tStamp + 8000;
                            break;
                        }
                        currGroup = reachable.shift();
                        if (currGroup && currGroup.size > 0 && !visitedGroups.includes(currGroup.key)) {
                            animState = 3;
                        } else {
                            break;
                        }
                        break;

                    case 3:
                        if (!currGroup || !ctx) break;
                        visitedGroups.push(currGroup.key);
                        evolHue = (evolHue + dHue) % 360;
                        currGroup.forEach((hex) => hex.draw());

                        let neighGroups = new Set<Group>();
                        let repr = currGroup.values().next().value;
                        if (!repr) break;
                        Hexagon.dneighbors.forEach((dk) => {
                            let ng = new Group(repr.kx + dk.dx, repr.ky + dk.dy);
                            if (ng.size == 0) return;
                            if (visitedGroups.includes(ng.key)) return;
                            if (reachable.find((r) => r.key == ng.key)) return;
                            neighGroups.add(ng);
                        });

                        if (neighGroups.size == 0) {
                            animState = 2;
                            break;
                        }
                        let neighGroupsArray = arrayShuffle(Array.from(neighGroups));
                        currGroup = neighGroupsArray.pop();
                        reachable.push(...neighGroupsArray);
                        break;

                    case 10:
                        if (tStamp > tEndw) animState = 0;
                        break;
                }
            } while ((animState == 2 || animState == 3) && performance.now() < tEnd);
        };

        messages = [{ message: "reset" }];
        animationFrameId = window.requestAnimationFrame(animate);

        const handleResize = () => {
            messages.push({ message: "reset" });
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.cancelAnimationFrame(animationFrameId);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black flex items-center justify-center font-sans">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 w-full h-full cursor-pointer"
                onClick={() => { }} // The original code had a click listener on canvas
            />

            {/* Premium Overlay */}
            <div className="relative z-10 max-w-2xl w-[90%] p-8 md:p-12 rounded-3xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in duration-1000">
                <div className="space-y-6 text-center">
                    <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-white font-orbitron">
                        WELCOME TO THE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">AWAKENING</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 font-light leading-relaxed">
                        Your journey toward personalized clarity has begun. We&apos;ve sent a confirmation to your email. Your digital assets are now being prepared for your specific cognitive architecture.
                    </p>

                    <div className="pt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <Link
                            href="/creator"
                            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 text-center"
                        >
                            Meet the Creator
                        </Link>
                        <Link
                            href="/mission"
                            className="w-full sm:w-auto px-8 py-4 bg-transparent text-white border border-white/30 rounded-full hover:bg-white/10 transition-all duration-300 transform hover:scale-105 text-center"
                        >
                            Our Mission
                        </Link>
                    </div>
                </div>

                {/* Subtle decorative elements */}
                <div className="absolute -top-12 -left-12 w-24 h-24 bg-blue-500/20 blur-3xl rounded-full" />
                <div className="absolute -bottom-12 -right-12 w-24 h-24 bg-purple-500/20 blur-3xl rounded-full" />
            </div>

            <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@400;700;900&display=swap');
        
        .font-orbitron {
          font-family: 'Orbitron', sans-serif;
        }
      `}</style>
        </main>
    );
}
