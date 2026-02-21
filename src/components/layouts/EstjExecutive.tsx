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

export default function EstjExecutive({ product, theme, mbtiType }: Props) {
    const { script } = product;
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    const scrollToOffer = () => {
        const offerSection = document.querySelector('.offer-section');
        if (offerSection) {
            offerSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="product-page layout-estj-executive" style={{
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
                    color: theme.colors.accent, textDecoration: 'none',
                    background: 'rgba(11, 13, 18, 0.9)', padding: '5px 16px',
                    border: `1px solid ${theme.colors.accent}`, borderRadius: '2px', // Sharper corners for ESTJ
                    fontFamily: theme.fonts.heading, fontSize: '0.8rem',
                    fontWeight: 'bold'
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
                gap: '24px',
                alignItems: 'center',
                borderBottom: `2px solid ${theme.colors.secondary}`,
                justifyContent: 'flex-end',
                position: 'relative',
                zIndex: 10,
                background: 'rgba(11, 13, 18, 0.5)'
            }}>
                <Link href="/" style={{ color: theme.colors.muted, textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem', fontWeight: 'bold' }}>Home</Link>
                <span style={{ opacity: 0.3 }}>|</span>
                <span style={{
                    color: theme.colors.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '2px',
                    fontSize: '0.75rem',
                    background: theme.colors.secondary,
                    padding: '4px 12px',
                    fontWeight: 'bold',
                    borderRadius: '0px'
                }}>THE EXECUTIVE (ESTJ)</span>
            </nav>

            <main className="sales-container" style={{
                maxWidth: '1100px',
                margin: '0 auto',
                padding: '60px 40px',
                position: 'relative',
                zIndex: 10
            }}>

                {/* 1. HERO SECTION */}
                <header className="estj-hero-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: '55% 45%',
                    gap: '60px',
                    marginBottom: '120px',
                    alignItems: 'start'
                }}>
                    <div style={{ borderLeft: `4px solid ${theme.colors.accent}`, paddingLeft: '30px' }}>
                        <span style={{
                            color: theme.colors.accent,
                            fontSize: '0.8rem',
                            letterSpacing: '3px',
                            fontWeight: '900',
                            display: 'block',
                            marginBottom: '20px',
                            textTransform: 'uppercase'
                        }}>Internal Memo: ESTJ Deployment</span>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
                            lineHeight: '1.1',
                            fontWeight: '900',
                            marginBottom: '30px',
                            fontFamily: theme.fonts.heading,
                            textTransform: 'uppercase'
                        }}>
                            {product.title}
                        </h1>
                        <p style={{
                            fontSize: '1.5rem',
                            color: theme.colors.muted,
                            fontWeight: '300',
                            letterSpacing: '0.5px',
                            marginBottom: '40px',
                            lineHeight: '1.4'
                        }}>
                            {script.headline}
                        </p>
                        <button
                            onClick={scrollToOffer}
                            className="cta-button"
                            style={{
                                padding: '20px 48px',
                                fontSize: '1.1rem',
                                background: theme.colors.accent,
                                cursor: 'pointer',
                                color: '#fff',
                                fontFamily: theme.fonts.heading,
                                border: 'none',
                                fontWeight: 'bold',
                                letterSpacing: '2px'
                            }}
                        >
                            {theme.ctaLabel}
                        </button>
                    </div>
                    <div className="estj-visual-anchor">
                        {product.script.image_url ? (
                            <img src={product.script.image_url} alt="Executive Command Center" style={{ width: '100%', boxShadow: `20px 20px 0px ${theme.colors.secondary}` }} />
                        ) : (
                            <div style={{ padding: '60px', background: theme.colors.secondary, border: `1px solid ${theme.colors.accent}`, color: theme.colors.accent, textAlign: 'center' }}>
                                <div style={{ fontSize: '0.8rem', opacity: 0.6, marginBottom: '10px' }}>ENCRYPTED VISUAL FEED</div>
                                <strong>{script.hook_image_prompt}</strong>
                            </div>
                        )}
                    </div>
                </header>

                {/* 2. CORE PROBLEM (Operational Audit) */}
                <section style={{ maxWidth: '800px', margin: '120px auto' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '30px' }}>
                        <h2 style={{
                            fontSize: '1.8rem',
                            color: theme.colors.accent,
                            fontFamily: theme.fonts.heading,
                            textTransform: 'uppercase',
                            margin: 0
                        }}>
                            Operational Audit
                        </h2>
                        <div style={{ flex: 1, height: '2px', background: `linear-gradient(to right, ${theme.colors.accent}, transparent)` }}></div>
                    </div>

                    <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#e5e7eb', marginBottom: '40px' }}>
                        {script.pain_story}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px' }}>
                        {script.agitation_bullets.map((bullet: any, i: number) => (
                            <div key={i} style={{
                                padding: '24px',
                                background: 'rgba(28, 31, 38, 0.4)',
                                borderLeft: `1px solid ${theme.colors.accent}`,
                                position: 'relative'
                            }}>
                                <span style={{ position: 'absolute', top: '10px', right: '15px', fontSize: '0.7rem', color: theme.colors.accent, opacity: 0.5 }}>STATUS: CRITICAL</span>
                                <h4 style={{ margin: '0 0 10px 0', fontSize: '1rem', color: '#fff' }}>
                                    {typeof bullet === 'string' ? bullet : bullet.title}
                                </h4>
                                {bullet.analysis && <p style={{ margin: 0, fontSize: '0.85rem', color: theme.colors.muted }}>{bullet.analysis}</p>}
                            </div>
                        ))}
                    </div>
                </section>

                {/* 3. PARADIGM SHIFT (New Directive) */}
                <section className="estj-paradigm-shift" style={{ textAlign: 'center', marginBottom: '140px', background: `linear-gradient(180deg, transparent, ${theme.colors.secondary}, transparent)`, padding: '80px 0' }}>
                    <div style={{ color: theme.colors.accent, fontSize: '1rem', letterSpacing: '6px', textTransform: 'uppercase', fontWeight: 'bold' }}>EXECUTIVE DIRECTIVE</div>
                    <h2 style={{
                        fontSize: '3rem',
                        fontWeight: '900',
                        marginTop: '20px',
                        textTransform: 'uppercase',
                        fontFamily: theme.fonts.heading,
                        color: '#fff'
                    }}>
                        {script.transition_mechanism}
                    </h2>
                </section>

                {/* 4. PRODUCT BREAKDOWN (Hierarchy of Competence) */}
                <section style={{ display: 'grid', gridTemplateColumns: '40% 60%', gap: '60px', alignItems: 'center', marginBottom: '120px' }}>
                    <div>
                        <h2 style={{ fontSize: '2.5rem', marginBottom: '24px', fontFamily: theme.fonts.heading, textTransform: 'uppercase' }}>{script.product_name}</h2>
                        <h3 style={{ fontSize: '0.9rem', color: theme.colors.accent, textTransform: 'uppercase', marginBottom: '16px', fontWeight: 'bold' }}>System Specifications</h3>
                        <p style={{ fontSize: '1.25rem', color: '#cbd5e1', lineHeight: '1.6' }}>{script.product_description}</p>
                    </div>
                    <div className="estj-specs-table" style={{ background: '#0a0a0a', border: `1px solid ${theme.colors.secondary}` }}>
                        <div style={{ padding: '15px 25px', background: theme.colors.secondary, fontSize: '0.8rem', fontWeight: 'bold', display: 'flex', justifyContent: 'space-between' }}>
                            <span>DEPLOYMENT MODULE</span>
                            <span>VERSION 4.0.1</span>
                        </div>
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} style={{
                                padding: '18px 25px',
                                borderBottom: i === script.features_bullets.length - 1 ? 'none' : `1px solid ${theme.colors.secondary}`,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px'
                            }}>
                                <div style={{ width: '8px', height: '8px', background: theme.colors.accent }}></div>
                                <span style={{ fontSize: '1rem' }}>{feature}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CTA + PRICING (Cost-Benefit Analysis) */}
                <section className="offer-section" style={{
                    background: 'rgba(28, 31, 38, 0.4)',
                    padding: '80px 40px',
                    marginTop: '100px',
                    border: `1px solid ${theme.colors.secondary}`,
                    textAlign: 'center'
                }}>
                    <h2 style={{ textTransform: 'uppercase', letterSpacing: '3px', fontSize: '1.2rem', marginBottom: '40px' }}>Authorization Required</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="price-container" style={{ display: 'flex', alignItems: 'baseline', gap: '30px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '0.7rem', color: theme.colors.muted, textTransform: 'uppercase' }}>Original Value</div>
                                <span className="price-original" style={{ color: theme.colors.muted, fontSize: '1.8rem', textDecoration: 'line-through' }}>
                                    <PriceDisplay amountUSD={script.price_original} />
                                </span>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.7rem', color: theme.colors.accent, textTransform: 'uppercase', fontWeight: 'bold' }}>Standard Fee</div>
                                <span className="price-discounted" style={{ color: '#fff', fontSize: '4rem', fontWeight: '900' }}>
                                    <PriceDisplay amountUSD={script.price_discounted} showBadge />
                                </span>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="cta-button"
                            style={{
                                padding: '26px 80px',
                                fontSize: '1.3rem',
                                background: theme.colors.accent,
                                marginTop: '50px',
                                color: '#fff',
                                border: 'none',
                                cursor: 'pointer',
                                fontFamily: theme.fonts.heading,
                                fontWeight: 'bold',
                                letterSpacing: '3px'
                            }}
                        >
                            {script.cta_text}
                        </button>

                        <div style={{ marginTop: '50px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', width: '100%' }}>
                            {script.bonuses.map((bonus: any, i: number) => (
                                <div key={i} style={{ padding: '20px', background: 'rgba(0,0,0,0.2)', border: '1px dashed rgba(255,255,255,0.1)' }}>
                                    <span style={{ color: theme.colors.accent, fontWeight: 'bold', fontSize: '0.8rem', display: 'block', marginBottom: '5px' }}>OFFER ATTACHMENT:</span>
                                    <strong style={{ display: 'block', color: '#fff' }}>{bonus.title}</strong>
                                    <span style={{ display: 'block', fontSize: '0.85rem', color: theme.colors.muted, marginTop: '8px' }}>{bonus.description}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 6. GUARANTEE (Final Assurance) */}
                <div className="estj-promise" style={{
                    marginTop: '100px',
                    border: `2px solid ${theme.colors.accent}`,
                    padding: '60px',
                    textAlign: 'left',
                    background: theme.colors.background,
                    position: 'relative'
                }}>
                    <div style={{ position: 'absolute', top: '-15px', left: '30px', background: theme.colors.background, padding: '0 20px', color: theme.colors.accent, fontWeight: 'bold', letterSpacing: '2px' }}>GUARANTEE DEED</div>
                    <p style={{ color: '#d1d5db', lineHeight: '1.8', fontSize: '1.1rem', margin: 0 }}>
                        {script.guarantee_text}
                    </p>
                </div>

                {/* Creator Attribution */}
                <section style={{ marginTop: '140px', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '1.4rem', marginBottom: '24px', color: '#fff', textTransform: 'uppercase', letterSpacing: '4px' }}>Chief Architect: Keshav Baliyan</h2>
                    <p style={{ color: theme.colors.muted, maxWidth: '700px', margin: '0 auto', fontSize: '0.95rem', lineHeight: '1.6' }}>
                        This system was architected by Keshav Baliyan for high-performance leadership. It leverages the synthesis of organizational structure and cognitive mastery.
                        <Link href="/creator" style={{ color: theme.colors.accent, marginLeft: '10px' }}>Audit Profile</Link>
                    </p>
                </section>

                {/* FOOTER */}
                <div style={{ textAlign: 'center', marginTop: '100px', paddingBottom: '60px', color: theme.colors.muted, fontSize: '0.8rem', letterSpacing: '1px' }}>
                    <p>{script.scarcity_text}</p>
                    <p>OFFICIAL DOCUMENT • PROTECTED PAYMENT GATEWAY • LIFETIME LICENSE</p>
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
