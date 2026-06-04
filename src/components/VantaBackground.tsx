'use client';

import { useEffect, useRef } from 'react';

interface VantaBackgroundProps {
    effectName: string;
    config: Record<string, any>;
}

export default function VantaBackground({ effectName, config }: VantaBackgroundProps) {
    const vantaRef = useRef<HTMLDivElement>(null);
    const vantaEffect = useRef<any>(null);

    useEffect(() => {
        let effect: any = null;

        const initVanta = async () => {
            if (!vantaRef.current) return;

            // Prevent multiple initializations (optional check)
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }

            try {
                let VantaModule;

                // Dynamic import based on effect name
                switch (effectName) {
                    case 'net':
                        VantaModule = await import('vanta/dist/vanta.net.min');
                        break;
                    case 'fog':
                        VantaModule = await import('vanta/dist/vanta.fog.min');
                        break;
                    case 'waves':
                        VantaModule = await import('vanta/dist/vanta.waves.min');
                        break;
                    case 'clouds':
                        VantaModule = await import('vanta/dist/vanta.clouds.min');
                        break;
                    case 'clouds2':
                        VantaModule = await import('vanta/dist/vanta.clouds2.min');
                        break;
                    case 'rings':
                        VantaModule = await import('vanta/dist/vanta.rings.min');
                        break;
                    case 'globe':
                        VantaModule = await import('vanta/dist/vanta.globe.min');
                        break;
                    case 'dots':
                        VantaModule = await import('vanta/dist/vanta.dots.min');
                        break;
                    case 'cells':
                    default:
                        VantaModule = await import('vanta/dist/vanta.cells.min');
                        break;
                }

                // Dynamically import THREE
                const THREE_MOD = await import('three');
                const three = (THREE_MOD as any).default || THREE_MOD;

                const vanta = VantaModule.default || VantaModule;

                // Handle different export structures (some might export on .default, others direct, others on .effectName)
                // We try a few common patterns or fallback to the module itself if it's a function
                const effectFn = typeof vanta === 'function' ? vanta : (vanta[effectName] || vanta.default || vanta);

                if (vantaRef.current && typeof effectFn === 'function') {
                    effect = effectFn({
                        el: vantaRef.current,
                        THREE: three,
                        mouseControls: true,
                        touchControls: true,
                        gyroControls: false,
                        minHeight: 200.00,
                        minWidth: 200.00,
                        scale: 1.00,
                        ...config
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
            if (vantaEffect.current) {
                vantaEffect.current.destroy();
                vantaEffect.current = null;
            }
        };
    }, [effectName, config]);

    return (
        <div
            ref={vantaRef}
            className="w-full h-full"
            style={{ pointerEvents: 'none' }}
        />
    );
}
