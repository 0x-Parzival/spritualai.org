"use client";

import React, { useEffect, useRef } from 'react';

const FishTank: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const fishesRef = useRef<any[]>([]);
    const cursorRef = useRef({ x: Number.MAX_VALUE, y: Number.MAX_VALUE });
    const cursorDownRef = useRef(false);
    const keyDownRef = useRef(false);
    const speedBoostRef = useRef(0);
    const speedBoostCountdownRef = useRef(200);
    const requestRef = useRef<number>(null);

    const FOLLOW_DISTANCE = 100;
    const SPEED_BOOST = 2;

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const context = canvas.getContext('2d');
        if (!context) return;

        const fishBitmap = new Image();
        fishBitmap.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAFCAYAAABFA8wzAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjZEMjNEMUIyQjI1MTExRTM5QzhDQjczMjRDQUI3RkMwIiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjZEMjNEMUIzQjI1MTExRTM5QzhDQjczMjRDQUI3RkMwIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NkQyM0QxQjBCMjUxMTFFMzlDOENCNzMyNENBQjdGQzAiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NkQyM0QxQjFCMjUxMTFFMzlDOENCNzMyNENBQjdGQzAiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5h3qMOAAAAkUlEQVR42pyQsQrCQBBEPYkiQgSjRCvTpPf/f0OwtLIXlGAICZ5vyAhXWWTgcXCwj50NszEBCthCDitY+l8ZoIMWGniZIcY4CkLY8JQaKKH28BXOiehfZHqaHazhosEMDlDBx9tNyY1t75IdLVtMkLxdXec6Ufvxqzb32kVywyyp1pvWksZVO90QkTx7Ob4CDADGaiOnQPuXSgAAAABJRU5ErkJggg==';

        class Fish {
            id: number;
            entourage: Fish[] = [];
            dx: number;
            dy: number;
            ox: number;
            oy: number;
            x: number;
            y: number;
            following: Fish | null = null;
            angle: number = 0;
            followingDistance: number = 0;
            distanceFactor: number = 0;

            constructor(id: number) {
                this.id = id;
                this.dx = Math.random() - 0.5;
                this.dy = Math.random() - 0.5;
                this.ox = this.dx;
                this.oy = this.dy;
                if (canvas) {
                    this.x = canvas.width * Math.random();
                    this.y = canvas.height * Math.random();
                } else {
                    this.x = Math.random() * 800;
                    this.y = Math.random() * 600;
                }
            }

            angleToClosestFish(otherFish?: Fish | null) {
                const target = otherFish || this.following;
                if (target) {
                    return Math.atan2(target.y - this.y, target.x - this.x);
                }
                return Number.MAX_VALUE;
            }

            angleFromFishDirectionToClosestFish(otherFish?: Fish | null) {
                const target = otherFish || this.following;
                if (target) {
                    return Math.abs(this.deltaAngle(this.angle, this.angleToClosestFish(target)));
                }
                return Number.MAX_VALUE;
            }

            angleDirectionDifference(otherFish?: Fish | null) {
                const target = otherFish || this.following;
                if (target) {
                    return Math.abs(this.deltaAngle(this.angle, target.angle));
                }
                return Number.MAX_VALUE;
            }

            deltaAngle(f: number, o: number) {
                const r = f - o;
                return Math.atan2(Math.sin(r), Math.cos(r));
            }

            calc() {
                this.ox = this.dx;
                this.oy = this.dy;
                let maxSpeed = 1.1;

                if (this.following == null || this.py(this.x - this.following.x, this.y - this.following.y) > FOLLOW_DISTANCE) {
                    if (this.following != null) {
                        if (keyDownRef.current) this.affinityLine(this.following, this, "white");
                        const idx = this.following.entourage.indexOf(this);
                        if (idx > -1) this.following.entourage.splice(idx, 1);
                    }
                    this.following = null;

                    let closestDistance = Number.MAX_VALUE;
                    let closestFish = null;

                    for (let i = 0; i < fishesRef.current.length; i++) {
                        const fish = fishesRef.current[i];
                        if (fish !== this) {
                            const distance = this.py(this.x - fish.x, this.y - fish.y);
                            if (distance < closestDistance && fish.following !== this && distance < FOLLOW_DISTANCE && this.angleFromFishDirectionToClosestFish(fish) < Math.PI * 0.25) {
                                closestDistance = distance;
                                closestFish = fish;
                            }
                        }
                    }
                    if (closestFish != null) {
                        this.following = closestFish;
                        closestFish.entourage.push(this);
                    }
                }

                if (this.following != null) {
                    this.followingDistance = this.py(this.x - this.following.x, this.y - this.following.y);
                    this.distanceFactor = 1 - this.followingDistance / FOLLOW_DISTANCE;

                    if (this.angleDirectionDifference() > (Math.PI * 0.9) && 
                        this.angleFromFishDirectionToClosestFish() < (Math.PI * 0.2)) {
                        this.dx += this.following.x * 0.1;
                        this.dy += this.following.y * 0.1;
                        if (keyDownRef.current) this.affinityLine(this.following, this, "yellow");
                    } else if (this.followingDistance > FOLLOW_DISTANCE * 0.3) {
                        this.dx += Math.cos(this.angleToClosestFish()) * (0.05 * this.distanceFactor);
                        this.dy += Math.sin(this.angleToClosestFish()) * (0.05 * this.distanceFactor);
                    }
                    if (keyDownRef.current) this.affinityLine(this.following, this, "red");
                }

                const canvasWidth = canvas?.width ?? 800;
                const canvasHeight = canvas?.height ?? 600;

                if (this.x < canvasWidth * .1 || this.x > canvasWidth * .9 || this.y < canvasHeight * .2 || this.y > canvasHeight * .8) {
                    this.dx += (canvasWidth / 2 - this.x) / 5000;
                    this.dy += (canvasHeight / 2 - this.y) / 5000;
                }

                if (this.py(this.x - cursorRef.current.x, this.y - cursorRef.current.y) < FOLLOW_DISTANCE * 0.75) {
                    this.dx -= (cursorRef.current.x - this.x) / 500;
                    this.dy -= (cursorRef.current.y - this.y) / 500;
                    maxSpeed = 4;
                    if (keyDownRef.current) this.affinityLine(cursorRef.current, this, "green");
                }

                if (this.following != null) {
                    for (let i = 0; i < this.following.entourage.length; i++) {
                        const siblingFish = this.following.entourage[i];
                        if (siblingFish !== this) {
                            if (this.py(this.x - siblingFish.x, this.y - siblingFish.y) < FOLLOW_DISTANCE * 0.2) {
                                if (keyDownRef.current) this.affinityLine(siblingFish, this, "yellow");
                                this.dx -= (siblingFish.x - this.x) / 1000;
                                this.dy -= (siblingFish.y - this.y) / 1000;
                            }
                        }
                    }
                }

                this.angle = Math.atan2(this.dy, this.dx);
                const speed = Math.max(0.1, Math.min(maxSpeed, this.py(this.dx, this.dy)));
                this.dx = Math.cos(this.angle) * (speed + speedBoostRef.current);
                this.dy = Math.sin(this.angle) * (speed + speedBoostRef.current);
                this.x += this.dx;
                this.y += this.dy;
            }

            py(a: number, b: number) {
                return Math.sqrt(a * a + b * b);
            }

            affinityLine(f: any, o: any, c: string) {
                if (!context) return;
                const grad = context.createLinearGradient(f.x, f.y, o.x, o.y);
                grad.addColorStop(0, c);
                grad.addColorStop(1, "black");
                context.strokeStyle = grad;
                context.beginPath();
                context.moveTo(f.x, f.y);
                context.lineTo(o.x, o.y);
                context.stroke();
            }
        }

        const activateSpeedBoost = () => {
            speedBoostCountdownRef.current = 400 + Math.round(400 * Math.random());
            speedBoostRef.current = SPEED_BOOST;
        };

        const draw = (f: Fish) => {
            const r = f.angle + Math.PI;
            context.save();
            context.translate(f.x, f.y);
            context.rotate(r);
            let w = 20;
            const acc = Math.sqrt(Math.pow(f.dx - f.ox, 2) + Math.pow(f.dy - f.oy, 2)) / 0.05;
            if (acc > 1) {
                w = 10 + 10 / acc;
            }
            context.drawImage(fishBitmap, 0, 0, w, 6);
            context.restore();
        };

        const update = () => {
            if (fishesRef.current.length < 500) {
                fishesRef.current.push(new Fish(fishesRef.current.length));
            }

            if (!cursorDownRef.current) {
                if (canvas) {
                    context.clearRect(0, 0, canvas.width, canvas.height);
                }
                for (let i = 0; i < fishesRef.current.length; i++) {
                    const fish = fishesRef.current[i];
                    fish.calc();
                    draw(fish);
                }
            }

            speedBoostCountdownRef.current--;
            if (speedBoostCountdownRef.current < 0) {
                activateSpeedBoost();
            }

            if (speedBoostRef.current > 0) {
                speedBoostRef.current -= SPEED_BOOST / 80;
            } else {
                speedBoostRef.current = 0;
            }

            requestRef.current = requestAnimationFrame(update);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            cursorRef.current.x = e.clientX - rect.left;
            cursorRef.current.y = e.clientY - rect.top;
        };

        const handleMouseOut = () => {
            cursorRef.current.x = Number.MAX_VALUE;
            cursorRef.current.y = Number.MAX_VALUE;
        };

        const handleMouseDown = () => {
            activateSpeedBoost();
            cursorDownRef.current = true;
        };

        const handleMouseUp = () => {
            cursorDownRef.current = false;
        };

        const handleKeyDown = () => {
            keyDownRef.current = true;
        };

        const handleKeyUp = () => {
            keyDownRef.current = false;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);
        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        fishBitmap.onload = () => {
            requestRef.current = requestAnimationFrame(update);
        };

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            window.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mouseup', handleMouseUp);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
        };
    }, []);

    return (
        <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: -1,
            overflow: 'hidden',
            pointerEvents: 'none'
        }}>
            <canvas 
                ref={canvasRef} 
                width={1400} 
                height={600} 
                style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '100%',
                    height: '100%',
                    maxWidth: '1400px',
                    maxHeight: '600px',
                    opacity: 1.0
                }}
            />
        </div>
    );
};

export default FishTank;
