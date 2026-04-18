"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface ProductsKitProps {
    userState: any;
}

const calculatePPP = (basePrice: number, country: string = 'US') => {
    const multipliers: Record<string, number> = {
        'IN': 0.3,
        'BR': 0.4,
        'MX': 0.5,
        'US': 1.0,
        'UK': 0.9,
    };
    return (basePrice * (multipliers[country] || 1.0)).toFixed(0);
};

export default function ProductsKit({ userState }: ProductsKitProps) {
    const [isLoading, setIsLoading] = useState(true);
    const { mbti, pattern, country = 'US' } = userState || {};

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2000);
        return () => clearTimeout(timer);
    }, []);

    const basePrices = {
        core: 97,
        tracker: 27,
        guide: 47,
        bundle: 147
    };

    return (
        <div style={{
            position: 'relative',
            width: '100%',
            minHeight: '100vh',
            background: 'linear-gradient(180deg, #0b1022 0%, #1a0b2e 100%)',
            color: 'white',
            fontFamily: 'system-ui, -apple-system, sans-serif',
            padding: '60px 20px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            zIndex: 50,
        }}>
            {/* HEADER */}
            <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: 'clamp(28px, 6vw, 48px)', marginBottom: '10px', fontWeight: 'bold' }}>
                    Your Pattern Dissolution Kit
                </h1>
                <p style={{ fontSize: '20px', color: 'rgba(255,255,255,0.6)' }}>
                    Built for <span style={{ color: '#b8ff5a' }}>{mbti}</span> who carries <span style={{ color: '#ff3cf5' }}>{pattern}</span>
                </p>
            </header>

            <div style={{ width: '100%', maxWidth: '1000px', display: 'flex', flexDirection: 'column', gap: '80px' }}>

                {/* FREE PRODUCTS */}
                <section>
                    <h2 style={{ textAlign: 'center', fontSize: '24px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', marginBottom: '30px' }}>Free Resources</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
                        <ProductCard
                            type="free"
                            image="https://images.pexels.com/photos/37482/pexels-photo-orig.jpg?auto=compress&cs=tinysrgb&w=400"
                            title="Your Pattern Decoded — 1-Page Guide"
                            desc="The one page that explains more than most books."
                            format="PDF + Audio (5 mins)"
                            cta="Unlock Free →"
                            gate="Follow on Instagram/WhatsApp/Discord"
                        />
                        <ProductCard
                            type="free"
                            image="https://images.pexels.com/photos/171463/pexels-photo-orig.jpg?auto=compress&cs=tinysrgb&w=400"
                            title="7-Minute Morning Pattern Reset"
                            desc="Interrupt the pattern before it runs today."
                            format="Audio (7 mins)"
                            cta="Get Free →"
                            gate="Email capture"
                        />
                    </div>
                </section>

                {/* PAID PRODUCTS */}
                <section>
                    <h2 style={{ textAlign: 'center', fontSize: '24px', textTransform: 'uppercase', letterSpacing: '3px', color: 'rgba(255,255,255,0.4)', marginBottom: '30px' }}>The Dissolution System</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                        <PaidProductCard
                            isLoading={isLoading}
                            image="https://images.pexels.com/photos/160108/pexels-photo-orig.jpg?auto=compress&cs=tinysrgb&w=400"
                            name="The Dissolution System"
                            headline={`For the ${mbti} who struggles with ${pattern}`}
                            why="Precision-engineered to break the recursive loop."
                            price={`$${calculatePPP(basePrices.core, country)}`}
                            cta="Begin Your Return →"
                            formats={['Ebook', 'Audiobook', 'AI Guide']}
                        />
                        <PaidProductCard
                            isLoading={isLoading}
                            image="https://images.pexels.com/photos/62031/pexels-photo-orig.jpg?auto=compress&cs=tinysrgb&w=400"
                            name="21-Day Pattern Tracker"
                            headline="Consistency is where patterns break."
                            why="See your activation frequency drop in real-time."
                            price={`$${calculatePPP(basePrices.tracker, country)}`}
                            cta="Get The Tracker →"
                            formats={['Mini App']}
                        />
                        <PaidProductCard
                            isLoading={isLoading}
                            image="https://images.pexels.com/photos/355948/pexels-photo-orig.jpg?auto=compress&cs=tinysrgb&w=400"
                            name="Consciousness AI Guide"
                            headline="Available at 3am when pattern fires."
                            why="Knows your MBTI. Knows your pattern. Speaks your language."
                            price={`$${calculatePPP(basePrices.guide, country)}`}
                            cta="Get The Guide →"
                            formats={['AI Chatbot']}
                        />
                    </div>
                </section>

                {/* THE BUNDLE */}
                <section style={{
                    background: 'rgba(255, 60, 245, 0.05)',
                    border: '2px solid rgba(184, 255, 90, 0.3)',
                    borderRadius: '40px',
                    padding: '40px',
                    textAlign: 'center',
                    boxShadow: '0 0 30px rgba(184, 255, 90, 0.1)',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '2px', background: 'linear-gradient(90deg, transparent, #b8ff5a, transparent)' }} />
                    <h2 style={{ fontSize: '32px', marginBottom: '30px', fontWeight: 'bold' }}>
                        COMPLETE DISSOLUTION KIT
                    </h2>
                    <div style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '18px', opacity: 0.8 }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Ebook + Audiobook</span><span>${calculatePPP(97, country)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>21-Day Tracker App</span><span>${calculatePPP(27, country)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Consciousness AI Guide</span><span>${calculatePPP(47, country)}</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Bonus: Shadow Map</span><span>FREE</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Bonus: MBTI Path Guide</span><span>FREE</span></div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Bonus: Morning Reset</span><span>FREE</span></div>
                        <div style={{ height: '1px', background: 'rgba(255,255,255,0.2)', margin: '15px 0' }} />
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '24px', fontWeight: 'bold' }}>
                            <span>Today's Price:</span>
                            <span style={{ color: '#b8ff5a' }}>${calculatePPP(basePrices.bundle, country)}</span>
                        </div>
                    </div>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        style={{
                            marginTop: '40px',
                            padding: '20px 40px',
                            fontSize: '20px',
                            fontWeight: 'bold',
                            background: 'linear-gradient(90deg, #ff3cf5, #b8ff5a)',
                            border: 'none',
                            borderRadius: '50px',
                            color: 'black',
                            cursor: 'pointer',
                            boxShadow: '0 10px 20px rgba(184, 255, 90, 0.3)'
                        }}
                    >
                        Get Everything →
                    </motion.button>
                </section>

                {/* GUARANTEE */}
                <section style={{
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '30px',
                    padding: '30px',
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.3)',
                    position: 'relative'
                }}>
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        width: '40px',
                        height: '40px',
                        background: '#b8ff5a',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '12px',
                        color: 'black',
                        fontWeight: 'bold',
                        boxShadow: '0 0 15px #b8ff5a'
                    }}>SEAL</div>
                    <p style={{ fontSize: '18px', lineHeight: '1.6', fontStyle: 'italic' }}>
                        "If after 21 days of genuine practice you haven't noticed a single shift — not a transformation, just one moment of clarity you didn't have before — we return every rupee. No questions. No forms. One message. Done."
                    </p>
                </section>

                {/* SCARCITY & HESITATOR */}
                <section style={{ textAlign: 'center', marginBottom: '100px' }}>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '14px', marginBottom: '20px' }}>
                        This price is locked to your session. Offer expires when you close this page.
                    </div>
                    <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ff3cf5', marginBottom: '40px' }}>
                        Session Timer: <span id="timer">14:32</span>
                    </div>

                    <div style={{ maxWidth: '600px', margin: '0 auto', fontSize: '18px', lineHeight: '1.8', opacity: 0.8 }}>
                        <h3 style={{ fontSize: '24px', marginBottom: '20px' }}>Still here?</h3>
                        <p>
                            The pattern you came here to dissolve — it shows up as hesitation at moments exactly like this one.
                            Not because the decision is wrong. Because the pattern's job is to keep things the same.
                        </p>
                        <p style={{ marginTop: '10px', color: '#b8ff5a' }}>
                            Notice that. That noticing? That's already the beginning of the break.
                        </p>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '40px', flexWrap: 'wrap' }}>
                        <button style={{ padding: '15px 30px', borderRadius: '30px', border: '1px solid #b8ff5a', background: 'transparent', color: 'white', cursor: 'pointer' }}>Get Everything — ${calculatePPP(basePrices.bundle, country)}</button>
                        <button style={{ padding: '15px 30px', borderRadius: '30px', border: '1px solid #fff', background: 'transparent', color: 'white', cursor: 'pointer' }}>Just the Core — ${calculatePPP(basePrices.core, country)}</button>
                        <button style={{ padding: '15px 30px', borderRadius: '30px', background: '#fff', color: 'black', fontWeight: 'bold', cursor: 'pointer' }}>Not Ready — Get Free Guide →</button>
                    </div>
                </section>
            </div>
        </div>
    );
}

function ProductCard({ image, title, desc, format, cta, gate, type }: any) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.03)',
            borderRadius: '30px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.08)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px'
        }}>
            <img src={image} alt={title} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '20px' }} />
            <h3 style={{ fontSize: '20px', margin: 0 }}>{title}</h3>
            <p style={{ fontSize: '16px', opacity: 0.7, margin: 0 }}>{desc}</p>
            <div style={{ fontSize: '14px', color: '#b8ff5a' }}>{format}</div>
            <div style={{ fontSize: '12px', opacity: 0.4, fontStyle: 'italic' }}>{gate}</div>
            <button style={{
                padding: '12px',
                borderRadius: '15px',
                background: 'white',
                color: 'black',
                fontWeight: 'bold',
                border: 'none',
                cursor: 'pointer'
            }}>{cta}</button>
        </div>
    );
}

function PaidProductCard({ isLoading, image, name, headline, why, price, cta, formats }: any) {
    return (
        <div style={{
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '30px',
            padding: '20px',
            border: '1px solid rgba(255,255,255,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            transition: 'transform 0.3s ease',
            cursor: 'pointer'
        }}>
            {isLoading ? (
                <div style={{
                    width: '100%',
                    height: '200px',
                    background: 'linear-gradient(90deg, rgba(255,255,255,0.05) 25%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.05) 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 2s infinite linear',
                    borderRadius: '20px'
                }} />
            ) : (
                <img src={image} alt={name} style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '20px' }} />
            )}
            <h3 style={{ fontSize: '20px', margin: 0 }}>{name}</h3>
            <div style={{ display: 'flex', gap: '5px', flexWrap: 'wrap' }}>
                {formats.map((f: string) => <span key={f} style={{ fontSize: '10px', padding: '2px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', color: 'rgba(255,255,255,0.6)' }}>{f}</span>)}
            </div>
            <p style={{ fontSize: '18px', fontWeight: 'bold', margin: '10px 0' }}>"{headline}"</p>
            <p style={{ fontSize: '14px', opacity: 0.7, margin: 0 }}>{why}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#b8ff5a' }}>{price}</span>
                <button style={{
                    padding: '10px 20px',
                    borderRadius: '15px',
                    background: '#ff3cf5',
                    color: 'white',
                    fontWeight: 'bold',
                    border: 'none',
                    cursor: 'pointer'
                }}>{cta}</button>
            </div>
            <style>{`
                @keyframes shimmer {
                    0% { background-position: -200% 0; }
                    100% { background-position: 200% 0; }
                }
            `}</style>
        </div>
    );
}
