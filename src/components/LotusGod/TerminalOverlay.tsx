"use client";
import React, { useEffect, useState } from "react";

type Props = {
    clickCount: number;
};

export default function TerminalOverlay({ clickCount }: Props) {
    const [displayCount, setDisplayCount] = useState(clickCount);

    // Handle delayed final reward reveal
    useEffect(() => {
        if (clickCount === 33) {
            const timer = setTimeout(() => {
                setDisplayCount(33);
            }, 800); // 0.8s delay for psychological impact
            return () => clearTimeout(timer);
        } else {
            setDisplayCount(clickCount);
        }
    }, [clickCount]);

    const getMessage = (count: number) => {
        if (count <= 0) return null;

        // 🌑 Phase 1 — Curiosity
        if (count <= 5) {
            return [
                "You sent energy.",
                "It responds.",
                "Each pulse strengthens the circuit."
            ];
        }

        // 🌊 Phase 2 — Participation
        if (count <= 15) {
            return [
                "It feels attention.",
                "Most stop too early.",
                "You stayed."
            ];
        }

        // 🔥 Phase 3 — Commitment
        if (count <= 25) {
            return [
                "You are consistent.",
                "Something is forming.",
                "Attention transforms."
            ];
        }

        // ✨ Phase 4 — Reward Framing
        if (count < 33) {
            return [
                "Almost awakened.",
                "The circuit is closing.",
                "Clarity approaches."
            ];
        }

        // 🏆 Final Unlock
        return [
            "You gave attention.",
            "Attention returns clarity.",
            "33% activated."
        ];
    };

    const message = getMessage(displayCount);
    if (!message) return null;

    return (
        <main
            className="prompt terminal-overlay"
            style={{
                position: "absolute",
                right: "5%",
                top: "50%",
                transform: "translateY(-50%)",
                textAlign: "left",
                color: "rgba(255,255,255,0.7)",
                fontFamily: "Orbitron, sans-serif",
                fontSize: "1rem",
                letterSpacing: "1px",
                zIndex: 1000,
                transition: "opacity 0.3s ease",
                animation: "fadeIn 0.3s ease"
            }}
        >
            {message.map((line, index) => (
                <p key={index} style={{ margin: "6px 0" }}>
                    {line}
                </p>
            ))}

            <style dangerouslySetInnerHTML={{
                __html: `
                    @keyframes fadeIn {
                      from {
                        opacity: 0;
                        transform: translateY(-45%);
                      }
                      to {
                        opacity: 1;
                        transform: translateY(-50%);
                      }
                    }

                    @media (max-width: 768px) {
                        .terminal-overlay {
                            right: 0 !important;
                            left: 0 !important;
                            top: auto !important;
                            bottom: 120px !important;
                            transform: none !important;
                            text-align: center !important;
                            font-size: 0.7rem !important;
                            max-width: 100% !important;
                            padding: 0 20px;
                            background: rgba(0,0,0,0.3);
                            backdrop-filter: blur(5px);
                        }
                        .terminal-overlay p {
                            margin: 2px 0 !important;
                        }
                    }
                `}} />
        </main>
    );
}
