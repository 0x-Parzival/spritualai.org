'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

interface VantaBackgroundProps {
    color1?: number;
    color2?: number;
}

export default function VantaBackground({ color1 = 0x0, color2 = 0x1e00ff }: VantaBackgroundProps) {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        let effect: any = null;

        const initVanta = async () => {
            if (!vantaRef.current) return;

            try {
                // @ts-ignore
                const [THREE_MOD, VANTA_MOD] = await Promise.all([
                    import('three'),
                    import('vanta/dist/vanta.cells.min')
                ]);

                const three = THREE_MOD.default || THREE_MOD;
                // Some Vanta packages export the effect directly, others as .default or .cells
                const vanta = VANTA_MOD.default || VANTA_MOD;
                const effectFn = typeof vanta === 'function' ? vanta : (vanta.cells || vanta);

                if (vantaRef.current && !vantaEffect.current && typeof effectFn === 'function') {
                    effect = effectFn({
                        el: vantaRef.current,
                        THREE: three,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        color1: 0x000000,
                        color2: color2,
                        size: 1.5,
                        speed: 1.0
                    });
                    vantaEffect.current = effect;
                }
            } catch (err) {
                console.error("Vanta initialization error:", err);
            }
        };

        if (typeof window !== 'undefined') {
            initVanta();
        }

        return () => {
            if (effect) {
                effect.destroy();
            }
            vantaEffect.current = null;
        };
    }, [color2]);

    return (
        <div
            ref={vantaRef}
            className="fixed inset-0 -z-10 w-full h-full opacity-40"
            style={{ pointerEvents: 'none' }}
        />
    );
}
