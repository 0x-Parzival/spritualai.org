"use client";

import React from 'react';
import Link from 'next/link';
import { Product, MBTITheme } from '@/data/types';
import PriceDisplay from '../Currency/PriceDisplay';
import CheckoutModal from '../CheckoutModal';

interface Props {
    product: Product;
    theme: MBTITheme;
    mbtiType: string;
}

export default function EntpDynamic({ product, theme, mbtiType }: Props) {
    const { script } = product;
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    return (
        <div className="product-page layout-entp-dynamic" style={{
            background: '#0B1020', // Deep Electric Blue/Black
            color: '#fff',
            fontFamily: '"Space Grotesk", sans-serif',
            minHeight: '100vh',
            overflowX: 'hidden'
        }}>
            {/* Back Button */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: '#3DF5FF', textDecoration: 'none',
                    background: 'rgba(61, 245, 255, 0.1)', padding: '8px 20px',
                    borderRadius: '4px', border: '1px solid #3DF5FF',
                    fontWeight: 'bold', fontSize: '0.9rem',
                    transform: 'skew(-10deg)'
                }}>
                    <span style={{ transform: 'skew(10deg)' }}>← ABORT</span>
                </Link>
            </div>

            <main className="sales-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '80px 20px' }}>

                {/* SEO H1 */}
                <header style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div style={{
                        color: '#FF4ECD',
                        fontWeight: 'bold',
                        fontSize: '1.2rem',
                        marginBottom: '10px',
                        letterSpacing: '5px',
                        textTransform: 'uppercase',
                        textShadow: '0 0 10px #FF4ECD'
                    }}>
                        ENTP_UNLOCKED
                    </div>
                    <h1 className="sales-heading" style={{
                        fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                        lineHeight: '1.1',
                        marginBottom: '30px',
                        background: 'linear-gradient(90deg, #fff, #3DF5FF)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent'
                    }}>
                        {product.title}
                    </h1>
                    <div style={{
                        fontSize: '1.5rem',
                        color: '#cbd5e1',
                        border: '2px solid #3DF5FF',
                        padding: '20px',
                        boxShadow: '10px 10px 0 #3DF5FF',
                        transform: 'rotate(-1deg)',
                        background: '#0B1020'
                    }}>
                        {script.headline}
                    </div>
                </header>

                {/* CHAOTIC IMAGE */}
                <div style={{ marginBottom: '100px', position: 'relative' }}>
                    <div style={{
                        position: 'absolute',
                        top: '-20px',
                        left: '-20px',
                        width: '100%',
                        height: '100%',
                        border: '2px dashed #FF4ECD',
                        zIndex: 0
                    }}></div>
                    <div style={{ position: 'relative', zIndex: 1, border: '2px solid #fff', background: '#000' }}>
                        {product.script.image_url ? (
                            <img src={product.script.image_url} alt="Chaos Visual" style={{ width: '100%', display: 'block' }} />
                        ) : (
                            <div style={{ padding: '60px', textAlign: 'center', color: '#3DF5FF', fontFamily: 'monospace' }}>
                                [ VISUAL_OVERLOAD: {script.hook_image_prompt} ]
                            </div>
                        )}
                    </div>
                </div>

                {/* THE PROBLEM (Boredom) */}
                <section style={{ marginBottom: '100px' }}>
                    {/* SEO H2 */}
                    <h2 style={{ fontSize: '2.5rem', marginBottom: '30px', color: '#fff', textTransform: 'uppercase', fontStyle: 'italic' }}>
                        The "Boredom" Loop
                    </h2>
                    <p style={{ fontSize: '1.2rem', lineHeight: '1.6', marginBottom: '30px', color: '#94a3b8' }}>
                        {script.pain_story}
                    </p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
                        {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                            <div key={i} style={{
                                background: 'rgba(255, 78, 205, 0.1)',
                                padding: '20px',
                                borderLeft: '4px solid #FF4ECD'
                            }}>
                                <span style={{ fontWeight: 'bold', color: '#FF4ECD', display: 'block', marginBottom: '8px' }}>ERROR {400 + i}</span>
                                {typeof bullet === 'string' ? bullet : bullet.title}
                            </div>
                        ))}
                    </div>
                </section>

                {/* THE HACK (Solution) */}
                <section style={{ marginBottom: '120px', textAlign: 'center' }}>
                    {/* SEO H2 */}
                    <div style={{ fontSize: '4rem', lineHeight: 1, marginBottom: '20px' }}>💊</div>
                    <h2 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#3DF5FF', textTransform: 'uppercase', textShadow: '0 0 20px rgba(61, 245, 255, 0.5)' }}>
                        {script.transition_mechanism}
                    </h2>
                    <p style={{ marginTop: '20px', fontSize: '1.2rem', color: '#fff' }}>The Spiritual AI Approach</p>
                </section>

                {/* THE TOOLKIT */}
                <section style={{ marginBottom: '100px' }}>
                    {/* SEO H2 */}
                    <h2 style={{ fontSize: '2rem', marginBottom: '40px', borderBottom: '2px solid #fff', paddingBottom: '10px' }}>{script.product_name}</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '20px',
                                background: '#111827',
                                padding: '20px',
                                borderRadius: '8px',
                                border: '1px solid #374151'
                            }}>
                                <div style={{
                                    minWidth: '50px',
                                    height: '50px',
                                    background: '#3DF5FF',
                                    color: '#000',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 'bold',
                                    fontSize: '1.5rem'
                                }}>
                                    {i + 1}
                                </div>
                                <div style={{ fontSize: '1.1rem', color: '#e2e8f0' }}>{feature}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA */}
                <section className="offer-section" style={{ textAlign: 'center', marginBottom: '100px' }}>
                    <h3 style={{ fontSize: '2rem', marginBottom: '40px', fontFamily: '"Space Grotesk"' }}>SHOW ME THE SHORTCUTS</h3>

                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="cta-button"
                        style={{
                            background: '#3DF5FF',
                            color: '#0B1020',
                            border: 'none',
                            padding: '20px 40px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            borderRadius: '4px',
                            boxShadow: '0 0 20px rgba(61, 245, 255, 0.4)',
                            marginBottom: '20px'
                        }}
                    >
                        {script.cta_text}
                    </button>

                    <div style={{ fontSize: '0.9rem', color: '#94a3b8' }}>No grind. No fluff.</div>

                    <div className="entp-pricing" style={{ marginTop: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
                        <span style={{ textDecoration: 'line-through', color: '#64748b', fontSize: '1.5rem' }}><PriceDisplay amountUSD={script.price_original} /></span>
                        <span style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}><PriceDisplay amountUSD={script.price_discounted} showBadge /></span>
                    </div>
                    <p style={{ color: '#FF4ECD', marginTop: '10px', fontSize: '1rem' }}>Cheap compared to waiting ten years.</p>

                    {/* Bonuses */}
                    {script.bonuses.map((bonus, i) => (
                        <div key={i} style={{ marginTop: '40px', background: 'rgba(255, 78, 205, 0.05)', padding: '20px', borderRadius: '8px', border: '1px dashed #FF4ECD', display: 'inline-block', textAlign: 'left' }}>
                            <div style={{ fontSize: '0.9rem', color: '#FF4ECD', fontWeight: 'bold', marginBottom: '5px' }}>BONUS: {bonus.title}</div>
                            <div style={{ color: '#fff' }}>{bonus.description}</div>
                        </div>
                    ))}
                </section>

                {/* GUARANTEE */}
                <section style={{ margin: '80px 0', textAlign: 'center', opacity: 0.8 }}>
                    {/* SEO H2 */}
                    <div style={{ fontFamily: 'monospace', color: '#94a3b8', background: '#0F1629', display: 'inline-block', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3DF5FF', textAlign: 'left' }}>
                        <div style={{ color: '#3DF5FF', marginBottom: '10px', fontWeight: 'bold' }}>🛡️ THE SHORTCUT PROMISE</div>
                        <div>
                            {script.guarantee_text}
                        </div>
                    </div>
                </section>

                {/* Creator Attribution */}
                <section style={{ marginTop: '100px', textAlign: 'center', borderTop: '1px solid #141923', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#FF4ECD' }}>Hacked by Keshav Baliyan</h2>
                    <p style={{ color: '#94a3b8', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
                        This cheat code was developed by Keshav Baliyan.
                        <Link href="/creator" style={{ color: '#FF4ECD', marginLeft: '10px' }}>Who is this guy?</Link>
                    </p>
                </section>

                {/* FOOTER */}
                <footer style={{ textAlign: 'center', color: '#475569', fontSize: '0.9rem', paddingBottom: '40px' }}>
                    <p>&gt; Exploit patching soon.</p>
                    <p style={{ marginTop: '10px' }}>Secure Payment • Instant Digital Delivery • Lifetime Access</p>
                </footer>

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
    )
}
