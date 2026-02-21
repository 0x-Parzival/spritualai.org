"use client";

import React, { useEffect, useRef } from 'react';
import styles from './CursorArrow.module.css';

interface CursorArrowProps {
    targetSelector?: string;
    arrowColor?: string; // Not used directly as we use gradient, but kept for compatibility
}

export default function CursorArrow({
    targetSelector = '[data-cursor-target]',
}: CursorArrowProps) {
    const arrowPathRef = useRef<SVGPathElement>(null);
    const arrowHeadRef = useRef<SVGPathElement>(null);
    const requestRef = useRef<number>(null);

    useEffect(() => {
        // Configuration
        const config = {
            targetSelector: targetSelector,
            arrowWidth: 3,
            dashPattern: '8,4',
            easeSpeed: 0.12, // More direct
            curveIntensity: 0.15, // Straighter approach
            showWhenNoTarget: true,
            dimmedOpacity: 0.3,
            activeOpacity: 1.0,
            hideDistance: 20, // Only hide when practically touching
            debug: false
        };

        // State variables
        let mouseX = -100; // Start off-screen
        let mouseY = -100;
        let currentPointerX = window.innerWidth / 2;
        let currentPointerY = window.innerHeight / 2;
        let targetButton: Element | null = null;
        let isButtonFound = false;
        let buttonRect: DOMRect | null = null;
        let buttonRectCache: DOMRect | null = null;
        let buttonRectCacheTime = 0;

        // Helper functions
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
                if (mouseX < centerX) {
                    targetX = left;
                    targetY = Math.max(top + 5, Math.min(bottom - 5, mouseY));
                } else {
                    targetX = right;
                    targetY = Math.max(top + 5, Math.min(bottom - 5, mouseY));
                }
            } else {
                if (mouseY < centerY) {
                    targetX = Math.max(left + 5, Math.min(right - 5, mouseX));
                    targetY = top;
                } else {
                    targetX = Math.max(left + 5, Math.min(right - 5, mouseX));
                    targetY = bottom;
                }
            }
            return { x: targetX, y: targetY };
        };

        const createCurvedPath = (startX: number, startY: number, endX: number, endY: number) => {
            const deltaX = endX - startX;
            const deltaY = endY - startY;
            const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

            if (distance < 50) {
                const controlX = startX + deltaX * 0.5;
                const controlY = startY + deltaY * 0.5 - 15;
                return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
            }

            const curveFactor = Math.min(distance * config.curveIntensity, 150);
            const angle = Math.atan2(deltaY, deltaX);
            const perpAngle = angle + Math.PI / 2;

            let curveDirection = 1;
            if ((deltaX > 0 && deltaY > 0) || (deltaX < 0 && deltaY < 0)) {
                curveDirection = -1;
            }

            const midX = startX + deltaX * 0.5;
            const midY = startY + deltaY * 0.5;
            const controlX = midX + curveFactor * Math.cos(perpAngle) * curveDirection;
            const controlY = midY + curveFactor * Math.sin(perpAngle) * curveDirection;

            return `M${startX},${startY} Q${controlX},${controlY} ${endX},${endY}`;
        };

        const createArrowHead = (x: number, y: number, angle: number) => {
            const headLength = 16;
            const wingAngle = Math.PI / 5;
            const x1 = x - headLength * Math.cos(angle - wingAngle);
            const y1 = y - headLength * Math.sin(angle - wingAngle);
            const x2 = x - headLength * Math.cos(angle + wingAngle);
            const y2 = y - headLength * Math.sin(angle + wingAngle);
            const backDistance = headLength * 0.6;
            const x3 = x - backDistance * Math.cos(angle);
            const y3 = y - backDistance * Math.sin(angle);
            return `M${x},${y} L${x1},${y1} L${x3},${y3} L${x2},${y2} Z`;
        };

        const isCursorNearButton = () => {
            const targets = document.querySelectorAll(config.targetSelector);
            for (let target of targets) {
                const rect = target.getBoundingClientRect();
                if (rect.width > 0 && rect.height > 0) {
                    const closestX = Math.max(rect.left, Math.min(mouseX, rect.right));
                    const closestY = Math.max(rect.top, Math.min(mouseY, rect.bottom));
                    const distance = Math.sqrt(Math.pow(mouseX - closestX, 2) + Math.pow(mouseY - closestY, 2));
                    if (distance <= config.hideDistance) return true;
                }
            }
            return false;
        };

        const animate = () => {
            let targetX = mouseX;
            let targetY = mouseY;
            let showButtonArrow = false;

            // Update button knowledge
            if (!isButtonFound) findTargetButton();

            if (isButtonFound && updateButtonRect()) {
                const buttonTarget = calculateTargetPosition();
                targetX = buttonTarget.x;
                targetY = buttonTarget.y;
                showButtonArrow = true;
            }

            // Smooth movement
            const deltaX = targetX - currentPointerX;
            const deltaY = targetY - currentPointerY;
            currentPointerX += deltaX * config.easeSpeed;
            currentPointerY += deltaY * config.easeSpeed;

            // Update DOM
            if (arrowPathRef.current && arrowHeadRef.current) {
                // POINT FROM CURSOR TO BUTTON
                // Start at mouse, end at button/pointer
                const pathData = createCurvedPath(mouseX, mouseY, currentPointerX, currentPointerY);
                arrowPathRef.current.setAttribute('d', pathData);

                // Calculate angle at the END of the path (the pointer position)
                // For a quadratic bezier M x1,y1 Q cx,cy x2,y2, the tangent at the end (t=1) 
                // is given by the vector from (cx,cy) to (x2,y2).

                // Approximate tangent by looking at the last bit of the curve
                // or just use the currentPointer - controlPoint logic.
                const angle = Math.atan2(currentPointerY - mouseY, currentPointerX - mouseX);
                const arrowHeadData = createArrowHead(currentPointerX, currentPointerY, angle);
                arrowHeadRef.current.setAttribute('d', arrowHeadData);

                // Visibility Logic
                const isNear = isCursorNearButton();
                const isOffScreen = buttonRect ? (buttonRect.bottom < 0 || buttonRect.top > window.innerHeight) : true;

                if (isNear || (isButtonFound && isOffScreen)) {
                    arrowPathRef.current.style.opacity = '0';
                    arrowHeadRef.current.style.opacity = '0';
                } else if (showButtonArrow) {
                    arrowPathRef.current.style.opacity = String(config.activeOpacity);
                    arrowHeadRef.current.style.opacity = '1';
                } else if (config.showWhenNoTarget) {
                    arrowPathRef.current.style.opacity = String(config.dimmedOpacity);
                    arrowHeadRef.current.style.opacity = '0.6';
                } else {
                    arrowPathRef.current.style.opacity = '0';
                    arrowHeadRef.current.style.opacity = '0';
                }
            }

            requestRef.current = requestAnimationFrame(animate);
        };

        // Event Listeners
        const handleMouseMove = (e: MouseEvent) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        };

        const handleScroll = () => {
            buttonRectCache = null;
        };

        const handleResize = () => {
            buttonRectCache = null;
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        window.addEventListener('resize', handleResize);

        // Start animation
        requestRef.current = requestAnimationFrame(animate);

        return () => {
            if (requestRef.current) cancelAnimationFrame(requestRef.current);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [targetSelector]);

    return (
        <div className={styles.cursorArrowContainer}>
            <svg className={styles.cursorArrowSvg}>
                <defs>
                    <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="rgba(130, 158, 249, 1)">
                            <animate attributeName="stop-color" values="rgba(130, 158, 249, 1);rgba(76, 190, 255, 1);rgba(115, 209, 72, 1);rgba(130, 158, 249, 1)" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="50%" stopColor="rgba(76, 190, 255, 1)">
                            <animate attributeName="stop-color" values="rgba(76, 190, 255, 1);rgba(115, 209, 72, 1);rgba(130, 158, 249, 1);rgba(76, 190, 255, 1)" dur="4s" repeatCount="indefinite" />
                        </stop>
                        <stop offset="100%" stopColor="rgba(115, 209, 72, 1)">
                            <animate attributeName="stop-color" values="rgba(115, 209, 72, 1);rgba(130, 158, 249, 1);rgba(76, 190, 255, 1);rgba(115, 209, 72, 1)" dur="4s" repeatCount="indefinite" />
                        </stop>
                    </linearGradient>
                </defs>
                <path ref={arrowPathRef} className={styles.cursorArrowPath} />
                <path ref={arrowHeadRef} className={styles.cursorArrowHead} />
            </svg>
        </div>
    );
}
