"use client";

import React from 'react';
import Link from 'next/link';
import { Product, MBTITheme } from '@/data/types';
import PriceDisplay from '../Currency/PriceDisplay';
import CheckoutModal from '../CheckoutModal';
import VantaBackground from '../VantaBackground';

interface Props {
    product: Product;
    theme: MBTITheme;
    mbtiType: string;
}

export default function IstpVirtuoso({ product, theme, mbtiType }: Props) {
    const { script } = product;
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    const scrollToOffer = () => {
        const offerSection = document.querySelector('.offer-section');
        if (offerSection) {
            offerSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="product-page layout-istp-virtuoso" style={{
            position: 'relative',
            background: theme.colors.background,
            color: theme.colors.text,
            minHeight: '100vh',
            fontFamily: theme.fonts.body
        }}>
            <VantaBackground effectName={theme.vantaEffect} config={theme.vantaConfig} />

            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: theme.colors.primary, textDecoration: 'none',
                    background: 'rgba(15, 17, 21, 0.8)', padding: '5px 16px',
                    border: `1px solid ${theme.colors.primary}`, borderRadius: '4px',
                    fontFamily: theme.fonts.heading, fontSize: '0.8rem'
                }}>
                    <span>{'<'}</span>
                    <span>BACK</span>
                </Link>
            </div>

            <nav style={{
                padding: '20px 40px',
                fontSize: '0.9rem',
                color: theme.colors.muted,
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                borderBottom: '1px solid rgba(255,255,255,0.1)',
                justifyContent: 'flex-end',
                position: 'relative',
                zIndex: 10
            }}>
                <Link href="/" style={{ color: theme.colors.muted, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Home</Link>
                <span style={{ opacity: 0.3 }}>/</span>
                <span style={{
                    color: theme.colors.primary,
                    textTransform: 'uppercase',
                    letterSpacing: '1px',
                    fontSize: '0.8rem',
                    border: `1px solid ${theme.colors.primary}`,
                    padding: '2px 8px',
                    borderRadius: '4px'
                }}>The Virtuoso (ISTP)</span>
            </nav>

            <main className="sales-container" style={{
                maxWidth: '1000px',
                margin: '0 auto',
                padding: '40px 20px',
                position: 'relative',
                zIndex: 10
            }}>

                {/* 1. HERO SECTION */}
                <header className="istp-hero-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: '40px',
                    marginBottom: '100px',
                    alignItems: 'center'
                }}>
                    <div>
                        <span style={{
                            color: theme.colors.primary,
                            fontSize: '0.9rem',
                            letterSpacing: '2px',
                            fontWeight: 'bold',
                            display: 'block',
                            marginBottom: '16px'
                        }}>ISTP EXCLUSIVE</span>
                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3rem)',
                            lineHeight: '1.2',
                            fontWeight: '300',
                            marginBottom: '24px',
                            fontFamily: theme.fonts.heading
                        }}>
                            {product.title}
                        </h1>
                        <p style={{
                            fontSize: '1.4rem',
                            color: theme.colors.muted,
                            fontWeight: '300',
                            letterSpacing: '0.5px',
                            marginBottom: '32px'
                        }}>
                            {script.headline}
                        </p>
                        <button
                            onClick={scrollToOffer}
                            className="cta-button"
                            style={{
                                padding: '16px 32px',
                                fontSize: '1rem',
                                border: `1px solid ${theme.colors.primary}`,
                                background: 'transparent',
                                cursor: 'pointer',
                                color: theme.colors.primary,
                                fontFamily: theme.fonts.heading
                            }}
                        >
                            {'>'} {theme.ctaLabel}
                        </button>
                    </div>
                    <div className="istp-visual-anchor">
                        {product.script.image_url ? (
                            <img src={product.script.image_url} alt="Visual Anchor" style={{ width: '100%', border: '1px solid rgba(255,255,255,0.1)' }} />
                        ) : (
                            <div style={{ padding: '40px', border: `1px solid ${theme.colors.primary}`, color: theme.colors.primary }}>
                                Generating Visual: {script.hook_image_prompt}
                            </div>
                        )}
                    </div>
                </header>

                {/* 2. CORE PROBLEM */}
                <section style={{ maxWidth: '680px', margin: '100px auto' }}>
                    <h2 style={{
                        fontSize: '1.5rem',
                        marginBottom: '20px',
                        color: theme.colors.primary,
                        borderBottom: '1px solid rgba(255,255,255,0.1)',
                        paddingBottom: '10px',
                        fontFamily: theme.fonts.heading
                    }}>
                        The Mechanic's Diagnosis
                    </h2>

                    <div className="scroll-signal" style={{ textAlign: 'center', margin: '40px 0', opacity: 0.5 }}>
                        <span style={{ fontSize: '1.5rem' }}>↓</span>
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#d1d5db' }}>
                        {script.pain_story}
                    </p>
                    <ul className="agitation-list" style={{ marginTop: '40px', listStyle: 'none', padding: 0 }}>
                        {script.agitation_bullets.map((bullet: any, i: number) => (
                            <li key={i} style={{
                                marginBottom: '15px',
                                paddingLeft: '20px',
                                borderLeft: `2px solid ${theme.colors.primary}`,
                                color: theme.colors.muted
                            }}>
                                {typeof bullet === 'string' ? bullet : bullet.title}
                                {bullet.analysis && <span style={{ display: 'block', fontSize: '0.9rem', marginTop: '4px', opacity: 0.8 }}>{bullet.analysis}</span>}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 3. PARADIGM SHIFT */}
                <section className="istp-paradigm-shift" style={{ textAlign: 'center', marginBottom: '120px' }}>
                    <div style={{ color: theme.colors.primary, fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>THE SYSTEM BYPASS</div>
                    <h2 style={{
                        fontSize: '2.5rem',
                        fontWeight: '800',
                        marginTop: '16px',
                        textTransform: 'uppercase',
                        fontFamily: theme.fonts.heading
                    }}>
                        {script.transition_mechanism}
                    </h2>
                    <h2 style={{ fontSize: '1rem', color: theme.colors.muted, marginTop: '20px', fontWeight: 'normal' }}>The Virtuoso Protocol</h2>
                </section>

                {/* 4. PRODUCT BREAKDOWN */}
                <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '100px' }}>
                    <div>
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px', fontFamily: theme.fonts.heading }}>{script.product_name}</h2>
                        <h3 style={{ fontSize: '1rem', color: theme.colors.muted, textTransform: 'uppercase', marginBottom: '10px' }}>Tool Specification</h3>
                        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>{script.product_description}</p>
                    </div>
                    <div className="istp-code-block" style={{ background: '#0a0a0a', padding: '30px', border: `1px solid ${theme.colors.secondary}` }}>
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} style={{ marginBottom: '12px', fontFamily: 'monospace', fontSize: '0.9rem' }}>
                                <span style={{ color: '#00E5FF' }}>{'>'}</span> {feature}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CTA + PRICING */}
                <section className="offer-section" style={{
                    background: 'transparent',
                    padding: '0',
                    marginTop: '100px',
                    borderTop: '1px solid rgba(255,255,255,0.1)',
                    paddingTop: '60px'
                }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="price-container" style={{ marginTop: '30px', display: 'flex', alignItems: 'baseline', gap: '20px' }}>
                            <span className="price-original" style={{ color: theme.colors.muted, fontSize: '1.5rem', textDecoration: 'line-through' }}>
                                <PriceDisplay amountUSD={script.price_original} />
                            </span>
                            <span className="price-discounted" style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>
                                <PriceDisplay amountUSD={script.price_discounted} showBadge />
                            </span>
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="cta-button"
                            style={{
                                padding: '24px 60px',
                                fontSize: '1.2rem',
                                background: `rgba(${theme.vantaColor}, 0.1)`,
                                marginTop: '30px',
                                color: theme.colors.primary,
                                border: `1px solid ${theme.colors.primary}`,
                                cursor: 'pointer',
                                fontFamily: theme.fonts.heading
                            }}
                        >
                            {script.cta_text}
                        </button>

                        {script.bonuses.map((bonus: any, i: number) => (
                            <div key={i} style={{ marginTop: '20px', textAlign: 'center' }}>
                                <span style={{ color: theme.colors.primary, fontWeight: 'bold' }}>BONUS:</span> <span style={{ color: '#d1d5db' }}>{bonus.title}</span>
                                <span style={{ display: 'block', fontSize: '0.9rem', color: theme.colors.muted }}>{bonus.description} ({bonus.value} Value)</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. GUARANTEE */}
                <div className="istp-promise" style={{
                    marginTop: '80px',
                    border: `1px solid ${theme.colors.primary}`,
                    padding: '40px',
                    textAlign: 'center',
                    background: 'rgba(0,0,0,0.3)'
                }}>
                    <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '10px', color: theme.colors.primary }}>🛠️ {mbtiType} PROTOCOL GUARANTEE:</span>
                    <code style={{ color: '#d1d5db', display: 'block', lineHeight: '1.6', fontSize: '0.9rem', marginTop: '20px' }}>
                        {script.guarantee_text}
                    </code>
                </div>

                {/* Creator Attribution */}
                <section style={{ marginTop: '100px', textAlign: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: theme.colors.primary }}>Architected by Keshav Baliyan</h2>
                    <p style={{ color: theme.colors.muted, maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
                        This system was designed by Keshav Baliyan, combining industrial logic with spiritual intelligence.
                        <Link href="/creator" style={{ color: theme.colors.primary, marginLeft: '10px' }}>View Creator Profile</Link>
                    </p>
                </section>

                {/* FOOTER */}
                <div style={{ textAlign: 'center', marginTop: '80px', color: theme.colors.muted, fontSize: '0.9rem' }}>
                    <p>{script.scarcity_text}</p>
                    <p>Secure Interface • Encrypted Delivery • Instant Access</p>
                </div>

            </main>
            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                productTitle={script.product_name}
                productPrice={script.price_discounted}
                productId={product.id}
                productType={mbtiType}
            />
        </div>
    );
}
