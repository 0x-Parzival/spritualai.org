
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

export default function IntjStrategic({ product, theme, mbtiType }: Props) {
    const { script } = product;
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    const scrollToOffer = () => {
        const offerSection = document.querySelector('.offer-section');
        if (offerSection) {
            offerSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="product-page layout-intj-strategic" style={{ position: 'relative', background: '#000', color: '#fff', minHeight: '100vh', fontFamily: '"JetBrains Mono", monospace' }}>
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: '#4FD1C5', textDecoration: 'none',
                    background: 'rgba(11, 15, 20, 0.8)', padding: '5px 16px',
                    border: '1px solid #4FD1C5', borderRadius: '4px',
                    fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem'
                }}>
                    <span>{'<'}</span>
                    <span>BACK</span>
                </Link>
            </div>
            <nav style={{ padding: '20px 40px', fontSize: '0.9rem', color: '#6b7280', display: 'flex', gap: '20px', alignItems: 'center', borderBottom: '1px solid #1a202c', justifyContent: 'flex-end' }}>
                <Link href="/" style={{ color: '#6b7280', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem' }}>Home</Link>
                <span style={{ opacity: 0.3 }}>/</span>
                <span style={{ color: '#4FD1C5', textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.8rem', border: '1px solid #4FD1C5', padding: '2px 8px', borderRadius: '4px' }}>The Architect (INTJ)</span>
            </nav>

            <main className="sales-container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px 20px' }}>

                {/* 1. HERO SECTION */}
                <header className="intj-hero-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '100px', alignItems: 'center' }}>
                    <div>
                        <span style={{ color: '#4FD1C5', fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', display: 'block', marginBottom: '16px' }}>INTJ EXCLUSIVE</span>
                        {/* SEO H1 */}
                        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: '1.2', fontWeight: '300', marginBottom: '24px', color: '#fff' }}>
                            {product.title}
                        </h1>
                        <p style={{ fontSize: '1.4rem', color: '#888', fontWeight: '300', letterSpacing: '0.5px', marginBottom: '32px' }}>
                            {script.headline}
                        </p>
                        <button
                            onClick={scrollToOffer}
                            className="cta-button"
                            style={{ padding: '16px 32px', fontSize: '1rem', border: '1px solid #4FD1C5', background: 'transparent', cursor: 'pointer', color: '#4FD1C5' }}
                        >
                            {'>'} EXECUTE PROTOCOL
                        </button>
                    </div>
                    <div className="intj-visual-anchor">
                        {product.script.image_url ? (
                            <img src={product.script.image_url} alt="Visual Anchor" style={{ width: '100%', border: '1px solid #1a202c' }} />
                        ) : (
                            <div style={{ padding: '40px', border: '1px solid #4FD1C5', color: '#4FD1C5' }}>Generating Visual: {script.hook_image_prompt}</div>
                        )}
                    </div>
                </header>

                {/* 2. INTERNAL BOTTLENECK (The Core Problem) */}
                <section style={{ maxWidth: '680px', margin: '100px auto' }}>
                    {/* Mandatory SEO H2 */}
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '20px', color: '#4FD1C5', borderBottom: '1px solid #1a202c', paddingBottom: '10px' }}>
                        The Core Problem
                    </h2>

                    <div className="scroll-signal" style={{ textAlign: 'center', margin: '40px 0', opacity: 0.5 }}>
                        <span style={{ fontSize: '1.5rem', animation: 'bounce 2s infinite' }}>↓</span>
                    </div>
                    <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#d1d5db' }}>
                        {script.pain_story}
                    </p>
                    <ul className="agitation-list" style={{ marginTop: '40px', listStyle: 'none', padding: 0 }}>
                        {script.agitation_bullets.map((bullet: string | { title: string, analysis: string }, i: number) => (
                            <li key={i} style={{ marginBottom: '15px', paddingLeft: '20px', borderLeft: '2px solid #4FD1C5', color: '#9ca3af' }}>
                                {typeof bullet === 'string' ? bullet : bullet.title}
                            </li>
                        ))}
                    </ul>
                </section>

                {/* 3. PARADIGM SHIFT (Spiritual AI Approach) */}
                <section className="intj-paradigm-shift" style={{ textAlign: 'center', marginBottom: '120px' }}>
                    {/* Mandatory SEO H2 */}
                    <div style={{ color: '#4FD1C5', fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>THE PARADIGM SHIFT</div>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '16px', color: '#fff', textTransform: 'uppercase' }}>
                        {script.transition_mechanism}
                    </h2>
                    <h2 style={{ fontSize: '1rem', color: '#6b7280', marginTop: '20px', fontWeight: 'normal' }}>The Spiritual AI Approach</h2>
                </section>

                {/* 4. LifeOS ARCHITECTURE (Product Breakdown) */}
                <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '100px' }}>
                    <div>
                        {/* Mandatory SEO H2 */}
                        <h2 style={{ fontSize: '2rem', marginBottom: '20px' }}>{script.product_name}</h2>
                        <h3 style={{ fontSize: '1rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '10px' }}>Product Breakdown</h3>
                        <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>{script.product_description}</p>
                    </div>
                    <div className="intj-code-block" style={{ background: '#111', padding: '30px', border: '1px solid #333' }}>
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} style={{ marginBottom: '12px', fontFamily: 'monospace' }}>
                                <span style={{ color: '#c678dd' }}>const</span> feature_{i} = <span style={{ color: '#98c379' }}>"{feature}"</span>;
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. CTA + PRICING */}
                <section className="offer-section" style={{ background: 'transparent', padding: '0', marginTop: '100px', borderTop: '1px solid #1a202c', paddingTop: '60px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="price-container" style={{ marginTop: '30px', display: 'flex', alignItems: 'baseline', gap: '20px' }}>
                            <span className="price-original" style={{ color: '#4b5563', fontSize: '1.5rem', textDecoration: 'line-through' }}>
                                <PriceDisplay amountUSD={script.price_original} />
                            </span>
                            <span className="price-discounted" style={{ color: '#fff', fontSize: '3rem', fontFamily: 'IBM Plex Sans' }}>
                                <PriceDisplay amountUSD={script.price_discounted} showBadge />
                            </span>
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="cta-button"
                            style={{ padding: '24px 60px', fontSize: '1.2rem', background: 'rgba(79, 209, 197, 0.1)', marginTop: '30px', color: '#4FD1C5', border: '1px solid #4FD1C5', cursor: 'pointer' }}
                        >
                            {script.cta_text}
                        </button>

                        {script.bonuses.map((bonus: any, i: number) => (
                            <div key={i} style={{ marginTop: '20px', textAlign: 'center' }}>
                                <span style={{ color: '#4FD1C5', fontWeight: 'bold' }}>BONUS:</span> <span style={{ color: '#d1d5db' }}>{bonus.title}</span>
                                <span style={{ display: 'block', fontSize: '0.9rem', color: '#6b7280' }}>{bonus.description} ({bonus.value} Value)</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 6. INTJ PROMISE */}
                <div className="intj-promise" style={{ marginTop: '80px', border: '1px solid #4FD1C5', padding: '40px', textAlign: 'center' }}>
                    <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '10px', color: '#4FD1C5' }}>🛡️ THE INTJ PROMISE:</span>
                    <h2 style={{ fontSize: '1rem', color: '#6b7280', marginBottom: '20px', fontWeight: 'normal' }}>Growth Path Guarantee</h2>
                    <code style={{ color: '#d1d5db', display: 'block', lineHeight: '1.6' }}>
                        {script.guarantee_text}
                    </code>
                </div>

                {/* Creator Attribution (SEO Requirement) */}
                <section style={{ marginTop: '100px', textAlign: 'center', borderTop: '1px solid #1a202c', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#4FD1C5' }}>Architected by Keshav Baliyan</h2>
                    <p style={{ color: '#9ca3af', maxWidth: '600px', margin: '0 auto', fontSize: '0.9rem' }}>
                        This system was designed by Keshav Baliyan, combining cognitive architecture with spiritual intelligence.
                        <Link href="/creator" style={{ color: '#4FD1C5', marginLeft: '10px' }}>View Creator Profile</Link>
                    </p>
                </section>

                {/* FOOTER TRUST */}
                <div style={{ textAlign: 'center', marginTop: '80px', color: '#4b5563', fontSize: '0.9rem' }}>
                    <p>{script.scarcity_text}</p>
                    <p>Secure Payment • Instant Digital Delivery • Lifetime Access</p>
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
