"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from './EyeComponent.module.css';

export default function EyeComponent() {
    const eyeRef = useRef<HTMLDivElement>(null);
    const lidsRef = useRef<HTMLDivElement>(null);
    const irisRef = useRef<HTMLDivElement>(null);
    const pupilRef = useRef<HTMLDivElement>(null);

    const stateRef = useRef({
        anger: 0,
        boredom: 0,
        blinkFlag: false,
        lidMax: 76,
        skinColor: '#0a0a1a',
        eyeColor: [220, 245, 255], // Cooler white
        lidTop: { pos: 25, goalPos: 25, relaxed: 25, surprised: 10, angry: 70, bored: 55, modifier: 1 },
        lidBottom: { pos: 25, goalPos: 25, relaxed: 25, surprised: 10, angry: 30, bored: 15, modifier: 1 },
        iris: { x: 45, y: 55, w: 60, h: 60, color: '#35f8ff' },
        pupil: { size: 30, sizeGoal: 30 },
        blinkTimer: 120,
        distractionTimer: 60,
        distractedFlag: true,
        mouse: { x: 50, y: 50, oldX: 50, oldY: 50 },
        center: { x: 45, y: 45 },
        distanceThreshold: 45,
        xp: 45,
        yp: 55
    });

    const randomInt = (min: number, max: number) => Math.floor(Math.random() * (max - min + 1)) + min;
    const lerp = (x: number, t: number, y: number) => x * (1 - t) + y * t;
    const interpolate = (part: number, goalPos: number, lerpSpeed: number) => {
        return lerp(part, lerpSpeed, goalPos);
    };

    useEffect(() => {
        let frameId: number;

        const animate = () => {
            const s = stateRef.current;
            
            // Blink Logic
            s.blinkTimer -= 1 + s.anger / 50;
            if (s.blinkTimer <= 0) {
                s.blinkTimer = randomInt(120, 600);
                s.blinkFlag = true;
            }

            // Distraction Logic
            s.distractionTimer -= 1;
            if (s.distractionTimer <= 0) {
                s.distractionTimer = randomInt(60, 120);
                if (s.distractedFlag) {
                    const rect = eyeRef.current?.getBoundingClientRect();
                    if (rect) {
                        const tempX = randomInt((s.mouse.x + rect.left + 30) - 200, (s.mouse.x + rect.left + 30) + 200);
                        const tempY = randomInt((s.mouse.y + rect.top + 30) - 200, (s.mouse.y + rect.top + 30) + 100);
                        const d = {
                            x: tempX - 30 - rect.left - s.center.x,
                            y: tempY - 30 - rect.top - s.center.y
                        };
                        const distance = Math.sqrt(d.x * d.x + d.y * d.y);
                        if (distance < s.distanceThreshold) {
                            s.mouse.x = tempX - rect.left - 30;
                            s.mouse.y = tempY - rect.top - 30;
                        } else {
                            s.mouse.x = d.x / distance * s.distanceThreshold + s.center.x;
                            s.mouse.y = d.y / distance * s.distanceThreshold + s.center.y;
                        }
                    }
                }
                s.distractedFlag = true;
            }

            // Follow Mouse Interpolation
            const lerpSpeed = 0.12;
            s.xp = interpolate(s.xp, s.mouse.x, lerpSpeed);
            s.yp = interpolate(s.yp, s.mouse.y, lerpSpeed);
            s.iris.x = s.xp;
            s.iris.y = s.yp;

            // Update Emotions (Internal to ref)
            s.boredom = Math.min(170, s.boredom + 0.1);
            s.anger = Math.max(0, s.anger - 0.15);

            // Interpolate Eyelids
            if (s.blinkFlag) {
                s.lidTop.pos = interpolate(s.lidTop.pos, s.lidMax, 0.6);
                s.lidBottom.pos = interpolate(s.lidBottom.pos, s.lidMax, 0.6);
                if (s.lidTop.pos >= s.lidMax - 1 && s.lidBottom.pos >= s.lidMax - 1) {
                    s.blinkFlag = false;
                }
            } else {
                if (s.anger >= 50) {
                    s.lidTop.goalPos = s.lidTop.angry / s.lidTop.modifier;
                    s.lidBottom.goalPos = s.lidBottom.angry / s.lidBottom.modifier;
                } else if (s.boredom >= 50) {
                    s.lidTop.goalPos = s.lidTop.bored / s.lidTop.modifier;
                    s.lidBottom.goalPos = s.lidBottom.bored / s.lidBottom.modifier;
                } else {
                    s.lidTop.goalPos = s.lidTop.relaxed / s.lidTop.modifier;
                    s.lidBottom.goalPos = s.lidBottom.relaxed / s.lidBottom.modifier;
                }
                s.lidTop.pos = interpolate(s.lidTop.pos, s.lidTop.goalPos, 0.3);
                s.lidBottom.pos = interpolate(s.lidBottom.pos, s.lidBottom.goalPos, 0.3);
            }

            // Update DOM via refs
            if (lidsRef.current) {
                lidsRef.current.style.borderTop = `${s.lidTop.pos}px solid ${s.skinColor}`;
                lidsRef.current.style.borderBottom = `${s.lidBottom.pos}px solid ${s.skinColor}`;
            }
            if (irisRef.current) {
                irisRef.current.style.left = `${s.iris.x}px`;
                irisRef.current.style.top = `${s.iris.y}px`;
            }
            if (pupilRef.current) {
                s.pupil.size = interpolate(s.pupil.size, s.pupil.sizeGoal, 0.03);
                pupilRef.current.style.width = `${s.pupil.size}px`;
                pupilRef.current.style.height = `${s.pupil.size}px`;
            }

            s.mouse.oldX = s.mouse.x;
            s.mouse.oldY = s.mouse.y;

            frameId = requestAnimationFrame(animate);
        };

        frameId = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameId);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const s = stateRef.current;
            s.distractedFlag = false;
            const rect = eyeRef.current?.getBoundingClientRect();
            if (!rect) return;

            const d = {
                x: e.pageX - 30 - rect.left - s.center.x,
                y: e.pageY - 30 - rect.top - s.center.y
            };
            const distance = Math.sqrt(d.x * d.x + d.y * d.y);
            if (distance < s.distanceThreshold) {
                s.mouse.x = e.pageX - rect.left - 30;
                s.mouse.y = e.pageY - rect.top - 30;
            } else {
                s.mouse.x = d.x / distance * s.distanceThreshold + s.center.x;
                s.mouse.y = d.y / distance * s.distanceThreshold + s.center.y;
            }

            const lidMod = Math.max(0.8, Math.min(1, distance / 50));
            s.lidTop.modifier = lidMod;
            s.lidBottom.modifier = lidMod;
            s.pupil.sizeGoal = distance < 100 ? lidMod * 30 : 30;
            s.boredom -= 1;
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const handlePoke = () => {
        stateRef.current.anger += 100;
        stateRef.current.blinkTimer = 1;
        // Audio omitted to keep it clean, but logic is here
    };

    return (
        <div className={styles.eyeContainer}>
            <div className={styles.eye} ref={eyeRef}>
                <div className={styles.iris} ref={irisRef}>
                    <div className={styles.pupil} ref={pupilRef}>
                        <div className={styles.pupilShine} />
                    </div>
                </div>
                <div className={styles.lids} ref={lidsRef} onClick={handlePoke} />
            </div>
        </div>
    );
}
