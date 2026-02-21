
"use client";

import React, { useState, useEffect } from "react";
import "./NeonLotus.css";

// Petal SVG Component
const PetalSVG = () => (
    <svg className="nl-petalSvg" viewBox="0 0 72 200" aria-hidden="true">
        <path className="nl-petalPath"
            d="M0,100 C0,66.6666667 12,33.3333333 36,0
         C60,33.3333333 72,66.6666667 72,100
         C72,133.333333 60,166.666667 36,200
         C12,166.666667 0,133.333333 0,100 Z">
        </path>
    </svg>
);

export default function NeonLotus() {
    const [closed, setClosed] = useState(false);

    const toggle = () => {
        setClosed(!closed);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            toggle();
        }
    };

    const ringsConfig = [
        { cls: "r1", count: 12 },
        { cls: "r2", count: 10 },
        { cls: "r3", count: 9 },
    ];

    return (
        <div className="neon-lotus-wrapper">
            <div className="neon-lotus-result">
                <div className="nl-stage">
                    {/* hidden gradient defs */}
                    <svg width="0" height="0" style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}>
                        <defs>
                            <radialGradient id="neonGrad" cx="50%" cy="10%" r="110%">
                                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.75" />
                                <stop offset="35%" stopColor="var(--nl-neon2)" stopOpacity="0.55" />
                                <stop offset="70%" stopColor="var(--nl-neon1)" stopOpacity="0.45" />
                                <stop offset="100%" stopColor="var(--nl-neon3)" stopOpacity="0.25" />
                            </radialGradient>
                        </defs>
                    </svg>

                    <div
                        className={`nl-lotusWrap ${closed ? "closed" : ""}`}
                        id="lotus"
                        tabIndex={0}
                        role="button"
                        aria-label="Toggle lotus bloom"
                        onClick={toggle}
                        onKeyDown={handleKeyDown}
                    >
                        <div className="nl-core"></div>
                        <div className="nl-lotus" id="lotusRings">
                            {ringsConfig.map((ring, ringIdx) => {
                                const step = 360 / ring.count;
                                return (
                                    <ul key={ringIdx} className={`nl-ring ${ring.cls}`}>
                                        {Array.from({ length: ring.count }).map((_, i) => (
                                            <li
                                                key={i}
                                                className="nl-petal"
                                                style={{ "--rz": `${(i + 1) * step}deg` } as React.CSSProperties}
                                            >
                                                <PetalSVG />
                                            </li>
                                        ))}
                                    </ul>
                                );
                            })}
                        </div>
                    </div>
                </div>

                <div className="nl-hint">Click (or press Enter/Space) to open / close</div>
            </div>
        </div>
    );
}
