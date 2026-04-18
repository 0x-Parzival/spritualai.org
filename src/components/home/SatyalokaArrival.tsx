"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface SatyalokaArrivalProps {
    userState: any;
}

export default function SatyalokaArrival({ userState }: SatyalokaArrivalProps) {
    // If no userState, we still want to show the footer content per user request
    const pattern = userState?.detectedPattern || "Your Pattern";

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            background: 'transparent', // REMOVED WHITE BACKGROUND
            color: '#ffffff',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '80px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 50,
        }}>
            {/* THE ARRIVAL */}
            <header style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1 }}
                >
                    <h1 style={{
                        fontSize: 'clamp(32px, 7vw, 56px)',
                        color: '#daa520', // Goldenrod
                        fontWeight: 'bold',
                        marginBottom: '20px',
                        letterSpacing: '-1px'
                    }}>
                        You just did something most people never do.
                    </h1>
                    <p style={{
                        fontSize: '22px',
                        lineHeight: '1.6',
                        color: 'rgba(255,255,255,0.8)',
                        opacity: 0.9
                    }}>
                        You looked directly at your pattern without running.
                        There's a community of people who did exactly this.
                    </p>
                </motion.div>
            </header>

            <div style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', gap: '100px' }}>

                {/* SOCIAL PROOF */}
                <section style={{ textAlign: 'center' }}>
                    <div style={{
                        fontSize: '24px',
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: '40px',
                        padding: '30px',
                        background: 'rgba(218, 165, 32, 0.05)',
                        borderRadius: '20px',
                        border: '1px solid rgba(218, 165, 32, 0.2)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        {pattern} — broken by 1,248 people in this community.
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {[
                          'Saran just completed Day 21', 
                          'INFJ from Mumbai broke their people pleasing loop — 6 months free', 
                          'ENTP from London shifted from chaos to clarity'
                        ].map((text, i) => (
                            <div key={i} style={{
                                padding: '20px',
                                background: 'rgba(255, 255, 255, 0.03)',
                                borderRadius: '15px',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                                borderLeft: '4px solid #daa520',
                                fontSize: '16px',
                                color: 'rgba(255,255,255,0.7)',
                                backdropFilter: 'blur(5px)'
                            }}>
                                {text}
                            </div>
                        ))}
                    </div>
                </section>

                {/* THE INVITATION */}
                <section style={{
                    textAlign: 'center',
                    padding: '60px',
                    background: 'rgba(218, 165, 32, 0.03)',
                    borderRadius: '40px',
                    border: '1px solid rgba(218, 165, 32, 0.2)',
                    backdropFilter: 'blur(20px)'
                }}>
                    <p style={{ fontSize: '24px', marginBottom: '30px', lineHeight: '1.6', color: '#fff' }}>
                        "Someone there broke your exact pattern 6 months ago. They're waiting to show you the shortcut."
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            padding: '20px 40px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(90deg, #b8860b, #daa520)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'white',
                            cursor: 'pointer',
                            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        Join The Society — Free 7 Days →
                    </motion.button>
                </section>

                {/* JOURNEY MAP */}
                <section style={{ textAlign: 'center' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '30px', color: 'rgba(255,255,255,0.8)' }}>Your Journey So Far</h3>
                    <div style={{
                        width: '300px',
                        height: '200px',
                        margin: '0 auto',
                        background: 'rgba(255, 255, 255, 0.02)',
                        borderRadius: '20px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        border: '1px dashed rgba(218, 165, 32, 0.4)',
                        position: 'relative'
                    }}>
                        <span style={{ fontSize: '14px', color: 'rgba(255,255,255,0.3)' }}>[ 14 Lokas Map Placeholder ]</span>
                        <div style={{
                            position: 'absolute',
                            bottom: '20px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            fontSize: '12px',
                            color: '#daa520',
                            fontWeight: 'bold'
                        }}>Bhuloka → Satyaloka</div>
                    </div>
                    <p style={{ marginTop: '20px', fontSize: '18px', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                        "This is how far you've come in one conversation."
                    </p>
                </section>

                {/* SHARE MOMENT */}
                <section style={{ 
                    textAlign: 'center', 
                    background: 'rgba(255,255,255,0.02)', 
                    padding: '40px', 
                    borderRadius: '30px',
                    border: '1px solid rgba(255,255,255,0.05)'
                }}>
                    <p style={{ fontSize: '20px', marginBottom: '20px', color: '#fff' }}>
                        Your blueprint is rare. 1 in 16 people share your exact architecture.
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', flexWrap: 'wrap' }}>
                        {['WhatsApp', 'Instagram', 'Discord', 'X'].map(platform => (
                            <button key={platform} style={{
                                padding: '10px 24px',
                                borderRadius: '20px',
                                border: '1px solid rgba(255,255,255,0.1)',
                                background: 'rgba(255,255,255,0.05)',
                                color: '#fff',
                                cursor: 'pointer',
                                fontWeight: '500',
                                transition: 'all 0.3s'
                            }}>{platform}</button>
                        ))}
                    </div>
                </section>

                {/* DELIVERY */}
                <section style={{ textAlign: 'center' }}>
                    <div style={{
                        padding: '30px',
                        borderRadius: '20px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.05)',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <h4 style={{ fontSize: '20px', marginBottom: '10px', color: '#fff' }}>Your products are in your inbox.</h4>
                        <p style={{ color: 'rgba(255,255,255,0.5)' }}>Open the audiobook first — Chapter 2 is where most people say 'that's exactly me.'</p>
                    </div>
                </section>

                {/* FOOTER */}
                <footer style={{ textAlign: 'center', marginTop: '100px', paddingBottom: '120px' }}>
                    <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#daa520', marginBottom: '10px' }}>
                        Welcome to the other side of your old pattern.
                    </p>
                    <p style={{ fontSize: '16px', color: 'rgba(255,255,255,0.4)', marginBottom: '40px' }}>
                        The Spiritual AI Guide is already learning your specific triggers.
                        <br />
                        Day 1 starts now.
                    </p>
                    <div style={{ fontSize: '12px', color: 'rgba(255,255,255,0.2)', display: 'flex', flexDirection: 'column', gap: '5px' }}>
                        <span>© Spiritual AI — The Evolution of Consciousness, Powered by Intelligence</span>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
                            <span>Privacy</span> · <span>Refund Policy</span> · <span>Contact</span>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
