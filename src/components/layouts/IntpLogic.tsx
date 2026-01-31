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

export default function IntpLogic({ product, theme, mbtiType }: Props) {
    const { script } = product;
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    return (
        <div className="product-page layout-intp-logic" style={{
            background: '#0F1115',
            color: '#B0B5C1', // Soft grey text
            fontFamily: '"Fira Code", monospace',
            minHeight: '100vh',
            lineHeight: '1.6'
        }}>
            {/* Back Button */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: '#64748B', textDecoration: 'none',
                    padding: '5px 16px',
                    border: '1px solid #1E293B',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    background: '#0F1115'
                }}>
                    <span>{'<..'}</span>
                    <span>BACK</span>
                </Link>
            </div>

            <main style={{ maxWidth: '800px', margin: '0 auto', padding: '80px 20px' }}>

                {/* SEO H1 */}
                <header style={{ marginBottom: '100px', borderLeft: '2px solid #3B82F6', paddingLeft: '40px' }}>
                    <div style={{ color: '#3B82F6', fontSize: '0.8rem', marginBottom: '16px' }}>
                        // SYSTEM: INTP_OPTIMIZATION
                    </div>
                    <h1 style={{ fontSize: '2.5rem', color: '#E2E8F0', marginBottom: '24px', fontWeight: '500' }}>
                        {product.title}
                    </h1>
                    <div style={{ fontSize: '1.2rem', color: '#94A3B8' }}>
                        {/* Using Pre tag for code-like feel */}
                        <pre style={{ whiteSpace: 'pre-wrap', fontFamily: 'inherit' }}>
                            {`> ${script.headline}`}
                        </pre>
                    </div>
                </header>

                {/* VISUAL COMPONENT */}
                <section style={{ marginBottom: '100px', background: '#171A21', border: '1px solid #1E293B', borderRadius: '4px', overflow: 'hidden' }}>
                    <div style={{ background: '#1E293B', padding: '8px 16px', fontSize: '0.75rem', color: '#64748B', display: 'flex', gap: '10px' }}>
                        <span>visual_context.png</span>
                        <span>1280x720</span>
                        <span>RGBA</span>
                    </div>
                    <div style={{ position: 'relative', aspectRatio: '16/9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {product.script.image_url ? (
                            <img src={product.script.image_url} alt="Logic Visual" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                        ) : (
                            <div style={{ color: '#334155' }}>// RENDER_PENDING: {script.hook_image_prompt}</div>
                        )}
                    </div>
                </section>

                {/* CORE PROBLEM */}
                <section style={{ marginBottom: '100px' }}>
                    {/* SEO H2 */}
                    <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '30px', fontWeight: '500' }}>
                        <span style={{ color: '#3B82F6' }}>function</span> analyzeBottleneck() {'{'}
                    </h2>
                    <div style={{ paddingLeft: '40px', borderLeft: '1px dashed #334155' }}>
                        <p style={{ marginBottom: '20px', color: '#94A3B8' }}>{script.pain_story}</p>

                        <div style={{ background: '#171A21', padding: '20px', border: '1px solid #1E293B' }}>
                            <code style={{ display: 'block', color: '#EF596F', marginBottom: '10px' }}>// Runtime Errors:</code>
                            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                    <li key={i} style={{ marginBottom: '8px', color: '#94A3B8' }}>
                                        <span style={{ color: '#64748B', marginRight: '10px' }}>{i} |</span>
                                        {typeof bullet === 'string' ? bullet : bullet.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div style={{ marginTop: '10px', fontSize: '1.5rem', color: '#E2E8F0' }}>{'}'}</div>
                </section>

                {/* PARADIGM SHIFT */}
                <section style={{ marginBottom: '100px', textAlign: 'center' }}>
                    {/* SEO H2 */}
                    <div style={{ display: 'inline-block', background: '#1E293B', padding: '4px 12px', borderRadius: '4px', fontSize: '0.8rem', color: '#3B82F6', marginBottom: '20px' }}>
                        PATCH_AVAILABLE (v2.0)
                    </div>
                    <h2 style={{ fontSize: '2rem', color: '#E2E8F0', fontWeight: '500' }}>
                        {script.transition_mechanism}
                    </h2>
                    <p style={{ marginTop: '20px', color: '#64748B' }}>The Spiritual AI Approach</p>
                </section>

                {/* SOLUTION ARCHITECTURE */}
                <section style={{ marginBottom: '100px' }}>
                    {/* SEO H2 */}
                    <h2 style={{ fontSize: '1.5rem', color: '#E2E8F0', marginBottom: '40px', textAlign: 'center' }}>
                        System Architecture
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} style={{ background: '#171A21', border: '1px solid #1E293B', padding: '24px' }}>
                                <div style={{ color: '#3B82F6', fontSize: '1.2rem', marginBottom: '16px', fontWeight: 'bold' }}>0{i + 1}</div>
                                <div style={{ color: '#94A3B8' }}>{feature}</div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* CTA - TERMINAL STYLE */}
                <section style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '100px' }}>
                    <div style={{ marginBottom: '40px', fontSize: '1.1rem', color: '#94A3B8' }}>
                        {script.cta_text}
                    </div>

                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="intp-cta-button"
                        style={{
                            background: '#3B82F6',
                            color: '#FFF',
                            border: 'none',
                            padding: '16px 32px',
                            fontSize: '1rem',
                            fontFamily: 'inherit',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            boxShadow: '0 4px 0 #1D4ED8',
                            transition: 'all 0.1s'
                        }}
                    >
                        INITIALIZE_DOWNLOAD()
                    </button>

                    <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '20px', alignItems: 'center', fontSize: '0.9rem' }}>
                        <span style={{ textDecoration: 'line-through', color: '#475569' }}><PriceDisplay amountUSD={script.price_original} /></span>
                        <span style={{ color: '#E2E8F0', fontWeight: 'bold' }}><PriceDisplay amountUSD={script.price_discounted} showBadge /></span>
                    </div>
                </section>

                {/* GUARANTEE */}
                <section style={{ border: '1px dashed #334155', padding: '30px', background: '#0F1115' }}>
                    {/* SEO H2 */}
                    <h2 style={{ fontSize: '1rem', color: '#64748B', marginBottom: '10px' }}>Logic Guarantee</h2>
                    <code style={{ color: '#94A3B8', display: 'block' }}>
                        {script.guarantee_text}
                    </code>
                </section>

                {/* Creator Attribution */}
                <section style={{ marginTop: '80px', textAlign: 'center', borderTop: '1px solid #1E293B', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '1.1rem', marginBottom: '10px', color: '#3B82F6' }}>Architect: Keshav Baliyan</h2>
                    <p style={{ fontSize: '0.8rem', color: '#64748B' }}>
                        System designed for cognitive harmony.
                        <Link href="/creator" style={{ color: '#3B82F6', marginLeft: '5px' }}>verify_credentials()</Link>
                    </p>
                </section>

                {/* FOOTER */}
                <footer style={{ marginTop: '60px', paddingBottom: '60px', textAlign: 'center', fontSize: '0.75rem', color: '#475569' }}>
                    <p>{script.scarcity_text}</p>
                    <p>Secure • Digital • Lifetime</p>
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
