"use client";

import React, { useEffect, useRef } from 'react';
import styles from './CursorArrow.module.css';

interface CursorArrowProps {
    targetSelector?: string;
    arrowColor?: string; 
}

export default function CursorArrow({
    targetSelector = '[data-cursor-target]',
}: CursorArrowProps) {
    const arrowPathRef = useRef<SVGPathElement>(null);
    const arrowHeadRef = useRef<SVGPathElement>(null);
    const sparkRef = useRef<HTMLDivElement>(null);
    const shocksCanvasRef = useRef<HTMLCanvasElement>(null);
    const requestRef = useRef<number>(null);

    useEffect(() => {
        const config = {
            targetSelector: targetSelector,
            arrowWidth: 3,
            easeSpeed: 0.12,
            showWhenNoTarget: true,
            dimmedOpacity: 0.4, 
            activeOpacity: 0.6,
            hideDistance: 20
        };

        let mouseX = window.innerWidth / 2;
        let mouseY = window.innerHeight / 2;
        let lastMouseX = mouseX;
        let lastMouseY = mouseY;
        let currentPointerX = mouseX;
        let currentPointerY = mouseY;
        
        let targetButton: Element | null = null;
        let isButtonFound = false;
        let buttonRect: DOMRect | null = null;
        let buttonRectCache: DOMRect | null = null;
        let buttonRectCacheTime = 0;

        let shocks: any[] = [];
        const maxShocks = 12;

        const findTargetButton = () => {
            const elements = document.querySelectorAll(config.targetSelector);
            for (let element of elements) {
                const rect = element.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    targetButton = element;
                    isButtonFound = true;
                    return true;
                }
            }
            isButtonFound = false;
            targetButton = null;
            return false;
        };

        const updateButtonRect = () => {
            if (!targetButton || !isButtonFound) return false;
            const now = performance.now();
            if (buttonRectCache && (now - buttonRectCacheTime) < 150) {
                buttonRect = buttonRectCache;
                return true;
            }
            try {
                const rect = targetButton.getBoundingClientRect();
                if (rect.width === 0 || rect.height === 0) {
                    isButtonFound = false;
                    return false;
                }
                buttonRect = rect;
                buttonRectCache = rect;
                buttonRectCacheTime = now;
                return true;
            } catch (error) {
                isButtonFound = false;
                return false;
            }
        };

        const calculateTargetPosition = () => {
            if (!buttonRect) return { x: mouseX, y: mouseY };
            const { left, right, top, bottom } = buttonRect;
            const centerX = left + (right - left) / 2;
            const centerY = top + (bottom - top) / 2;

            let targetX, targetY;
            const horizontalDistance = Math.min(Math.abs(mouseX - left), Math.abs(mouseX - right));
            const verticalDistance = Math.min(Math.abs(mouseY - top), Math.abs(mouseY - bottom));

            if (horizontalDistance < verticalDistance) {
                targetX = mouseX < centerX ? left : right;
                targetY = Math.max(top + 5, Math.min(bottom - 5, mouseY));
            } else {
                targetX = Math.max(left + 5, Math.min(right - 5, mouseX));
                targetY = mouseY < centerY ? top : bottom;
            }
            return { x: targetX, y: targetY };
        };

        const createWavyPath = (x1: number, y1: number, x2: number, y2: number, isStatic: boolean) => {
            const dx = x2 - x1;
            const dy = y2 - y1;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const angle = Math.atan2(dy, dx);
            const steps = 15;
            const time = isStatic ? 0 : performance.now() * 0.008;
            const amp = Math.min(15, dist * 0.12);
            
            let path = `M ${x1} ${y1}`;
            for (let i = 1; i <= steps; i++) {
                const t = i / steps;
                const tx = x1 + dx * t;
                const ty = y1 + dy * t;
                const wave = Math.sin(t * Math.PI * 3 - time) * amp;
                const ox = tx + Math.cos(angle + Math.PI / 2) * wave;
                const oy = ty + Math.sin(angle + Math.PI / 2) * wave;
                path += ` L ${ox} ${oy}`;
            }
            return path;
        };

        const createShock = (x: number, y: number) => {
            const angle = Math.random() * Math.PI * 2;
            const dist = Math.random() * 25 + 15;
            return {
                x, y, targetX: x + Math.cos(angle) * dist, targetY: y + Math.sin(angle) * dist,
                life: 1.0, decay: Math.random() * 0.15 + 0.08,
                color: Math.random() > 0.5 ? '#35f8ff' : '#ff3cf5'
            };
        };

        const animate = () => {
            const sy = window.scrollY;
            const wh = window.innerHeight;
            const isOnPage1 = sy < wh;
            const isOnPage2 = sy >= wh && sy < wh * 2;

            // 1. SHOCKS CANVAS
            const ctx = shocksCanvasRef.current?.getContext('2d');
            if (ctx && shocksCanvasRef.current) {
                ctx.clearRect(0, 0, shocksCanvasRef.current.width, shocksCanvasRef.current.height);
                if (isOnPage2) {
                    if (Math.abs(mouseX - lastMouseX) > 3 || Math.abs(mouseY - lastMouseY) > 3) {
                        if (shocks.length < maxShocks) shocks.push(createShock(mouseX, mouseY));
                        lastMouseX = mouseX;
                        lastMouseY = mouseY;
                    }
                    shocks.forEach((s, i) => {
                        s.life -= s.decay;
                        if (s.life <= 0) { shocks.splice(i, 1); return; }
                        ctx.beginPath();
                        ctx.moveTo(s.x, s.y);
                        const midX = (s.x + s.targetX) / 2 + (Math.random() - 0.5) * 15;
                        const midY = (s.y + s.targetY) / 2 + (Math.random() - 0.5) * 15;
                        ctx.lineTo(midX, midY);
                        ctx.lineTo(s.targetX, s.targetY);
                        ctx.strokeStyle = s.color;
                        ctx.lineWidth = 2 * s.life;
                        ctx.shadowBlur = 8;
                        ctx.shadowColor = s.color;
                        ctx.globalAlpha = s.life * 0.5;
                        ctx.stroke();
                    });
                } else { shocks = []; }
            }

            // 2. SPARK
            if (sparkRef.current) {
                if (isOnPage2) {
                    sparkRef.current.style.opacity = '0.5';
                    sparkRef.current.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
                } else { sparkRef.current.style.opacity = '0'; }
            }

            // 3. ARROW LOGIC
            let targetX = mouseX;
            let targetY = mouseY;
            let showButtonArrow = false;

            if (!isButtonFound) findTargetButton();
            if (isButtonFound && updateButtonRect()) {
                const buttonTarget = calculateTargetPosition();
                targetX = buttonTarget.x;
                targetY = buttonTarget.y;
                showButtonArrow = true;
            }

            const deltaX = targetX - currentPointerX;
            const deltaY = targetY - currentPointerY;
            currentPointerX += deltaX * config.easeSpeed;
            currentPointerY += deltaY * config.easeSpeed;

            if (arrowPathRef.current && arrowHeadRef.current) {
                if (isOnPage1) {
                    const pathData = createWavyPath(mouseX, mouseY, currentPointerX, currentPointerY, true);
                    arrowPathRef.current.setAttribute('d', pathData);
                    
                    const angle = Math.atan2(currentPointerY - mouseY, currentPointerX - mouseX);
                    const headLength = 16;
                    const wingAngle = Math.PI / 5;
                    const h1x = currentPointerX - headLength * Math.cos(angle - wingAngle);
                    const h1y = currentPointerY - headLength * Math.sin(angle - wingAngle);
                    const h2x = currentPointerX - headLength * Math.cos(angle + wingAngle);
                    const h2y = currentPointerY - headLength * Math.sin(angle + wingAngle);
                    const backX = currentPointerX - (headLength * 0.6) * Math.cos(angle);
                    const backY = currentPointerY - (headLength * 0.6) * Math.sin(angle);
                    
                    arrowHeadRef.current.setAttribute('d', `M${currentPointerX},${currentPointerY} L${h1x},${h1y} L${backX},${backY} L${h2x},${h2y} Z`);
                    
                    const finalOpacity = showButtonArrow ? config.activeOpacity : config.dimmedOpacity;
                    arrowPathRef.current.style.opacity = String(finalOpacity);
                    arrowHeadRef.current.style.opacity = String(finalOpacity);
                } else {
                    arrowPathRef.current.style.opacity = '0';
                    arrowHeadRef.current.style.opacity = '0';
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleResize = () => {
            if (shocksCanvasRef.current) {
                shocksCanvasRef.current.width = window.innerWidth;
                shocksCanvasRef.current.height = window.innerHeight;
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('resize', handleResize);
        handleResize();
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        };
    }, [targetSelector]);

    return (
        <div className={styles.cursorArrowContainer}>
            <canvas ref={shocksCanvasRef} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none' }} />
            <div ref={sparkRef} className={styles.spark}>
                <div className={styles.sparkInner} />
            </div>
            <svg className={styles.cursorArrowSvg}>
                <defs>
                    <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#35f8ff" />
                        <stop offset="50%" stopColor="#ff3cf5" />
                        <stop offset="100%" stopColor="#b8ff5a" />
                    </linearGradient>
                </defs>
                <path ref={arrowPathRef} className={styles.cursorArrowPath} />
                <path ref={arrowHeadRef} className={styles.cursorArrowHead} />
            </svg>
        </div>
    );
}
