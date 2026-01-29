
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

export default function InfpMediator({ product, theme, mbtiType }: Props) {
    const { script } = product;
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    return (
        <div className="product-page layout-infp" style={{
            background: '#FAF9F6', // Off-white/Paper
            color: '#5D5D5D', // Soft Charcoal
            fontFamily: '"Nunito", "Quicksand", sans-serif',
            minHeight: '100vh',
            overflowX: 'hidden'
        }}>
            {/* Back Button */}
            <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 100 }}>
                <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: '#8E8E8E', textDecoration: 'none',
                    fontSize: '0.9rem', letterSpacing: '0.5px',
                    transition: 'color 0.3s ease'
                }}>
                    <span style={{ fontSize: '1.2rem' }}>←</span>
                    <span>Back</span>
                </Link>
            </div>

            <div style={{ maxWidth: '750px', margin: '0 auto', padding: '0 25px' }}>

                {/* Header / Nav */}
                <nav style={{ padding: '30px 0', textAlign: 'center', fontSize: '0.8rem', letterSpacing: '1px', color: '#B0B0B0', textTransform: 'uppercase' }}>
                    Home / The Mediator (INFP)
                </nav>

                <div style={{ textAlign: 'center', marginBottom: '80px', fontSize: '0.75rem', letterSpacing: '2px', color: '#A5A5A5' }}>
                    INFP EXCLUSIVE
                </div>

                {/* HERO SECTION */}
                <header style={{ textAlign: 'center', marginBottom: '100px' }}>
                    {/* SEO H1 */}
                    <h1 style={{
                        fontSize: 'clamp(2rem, 4vw, 3rem)',
                        fontWeight: '300',
                        color: '#4A4A4A',
                        lineHeight: '1.2',
                        marginBottom: '30px',
                        fontFamily: '"Lora", serif' // Poetic serif
                    }}>
                        {product.title}
                    </h1>

                    {/* Vibe Quote */}
                    <div style={{
                        fontSize: '1.4rem',
                        color: '#7A7A7A',
                        marginBottom: '20px',
                        fontStyle: 'italic',
                        lineHeight: '1.6'
                    }}>
                        "You don’t need to become more.<br />
                        You need space to be yourself."
                    </div>

                    {/* Subheadline */}
                    <p style={{
                        fontSize: '1rem',
                        color: '#9CA3AF',
                        maxWidth: '450px',
                        margin: '0 auto'
                    }}>
                        A gentle framework for people who feel deeply and want to live honestly.
                    </p>

                    {/* Soft Hero Image */}
                    <div style={{ marginTop: '50px', position: 'relative', overflow: 'hidden', borderRadius: '8px', boxShadow: '0 10px 30px rgba(0,0,0,0.03)' }}>
                        {product.script.image_url ? (
                            <img src={product.script.image_url} alt="Calm Visual" style={{ width: '100%', display: 'block', opacity: 0.9 }} />
                        ) : (
                            <div style={{ height: '300px', background: 'linear-gradient(to bottom, #F3F0E7, #EAE5D9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#B0B0B0' }}>
                                <span style={{ fontStyle: 'italic' }}>[ Calm Visual: {script.hook_image_prompt} ]</span>
                            </div>
                        )}
                    </div>
                </header>

                {/* SECTION 2: EMOTIONAL MIRROR (Core Problem) */}
                <section style={{ marginBottom: '100px' }}>
                    {/* SEO H2 */}
                    <h2 style={{ fontSize: '1.8rem', fontWeight: '400', color: '#4A4A4A', marginBottom: '30px', fontFamily: '"Lora", serif' }}>
                        The Core Problem
                    </h2>

                    <div style={{ fontSize: '1.1rem', lineHeight: '1.9', color: '#5D5D5D' }}>
                        <p style={{ marginBottom: '20px' }}>You feel things deeply — sometimes more than you’d like. You care about meaning when others chase outcomes. You want your life to feel <em>true</em>, not just successful.</p>
                        <p style={{ marginBottom: '20px' }}>The world keeps asking you to harden, optimize, and perform. Something in you refuses.</p>

                        {/* Product Specific Pain */}
                        <div style={{ marginTop: '40px', paddingLeft: '20px', borderLeft: '3px solid #EAE5D9' }}>
                            <p style={{ fontStyle: 'italic', marginBottom: '15px', color: '#7A7A7A' }}>Specifically regarding this:</p>
                            <p>{script.pain_story}</p>
                        </div>
                    </div>
                </section>

                {/* SECTION 3: WHAT THIS IS (Spiritual AI Approach) */}
                <section style={{ marginBottom: '100px', background: '#F9F7F2', padding: '50px', borderRadius: '12px' }}>
                    {/* SEO H2 */}
                    <h2 style={{ fontSize: '1.6rem', fontWeight: '400', color: '#4A4A4A', marginBottom: '20px', textAlign: 'center', fontFamily: '"Lora", serif' }}>
                        The Spiritual AI Approach
                    </h2>
                    <div style={{ maxWidth: '500px', margin: '0 auto', textAlign: 'center', fontSize: '1.1rem', lineHeight: '1.8', color: '#7A7A7A' }}>
                        <p style={{ marginBottom: '20px' }}>It’s a quiet space designed to help you:</p>
                        <ul style={{ listStyle: 'none', padding: 0 }}>
                            <li style={{ marginBottom: '10px' }}>– hear yourself more clearly</li>
                            <li style={{ marginBottom: '10px' }}>– act without betraying your values</li>
                            <li>– move forward without losing your softness</li>
                        </ul>

                        <p style={{ fontSize: '1rem', marginTop: '30px', fontStyle: 'italic', color: '#977A6C' }}>{script.transition_mechanism}</p>
                    </div>
                </section>

                {/* SECTION 4: HOW IT SUPPORTS YOU (Product Breakdown) */}
                <section style={{ marginBottom: '120px' }}>
                    {/* SEO H2 */}
                    <h3 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '1.4rem', color: '#B0B0B0', fontWeight: '300', letterSpacing: '1px' }}>Product Breakdown</h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '1.5rem', marginBottom: '15px' }}>{['🌱', '🌊', '🕊'][i] || '✨'}</div>
                                <h4 style={{ fontSize: '1.2rem', color: '#4A4A4A', marginBottom: '10px', fontFamily: '"Lora", serif' }}>
                                    {['Inner Clarity', 'Value Alignment', 'Gentle Momentum'][i] || 'Gentle Growth'}
                                </h4>
                                <p style={{ color: '#7A7A7A', fontSize: '1rem', lineHeight: '1.6', maxWidth: '400px', margin: '0 auto' }}>
                                    {feature}
                                </p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* SECTION 5: PERMISSION & SAFETY */}
                <section style={{ marginBottom: '100px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '40px' }}>
                    <div style={{ padding: '30px', background: '#FDFCF9', borderRadius: '8px' }}>
                        <h4 style={{ color: '#6B8E7B', marginBottom: '20px', fontSize: '1.1rem' }}>Growth Path</h4>
                        <ul style={{ listStyle: 'none', padding: 0, color: '#7A7A7A', lineHeight: '1.7' }}>
                            <li style={{ marginBottom: '10px' }}>• you value authenticity over speed</li>
                            <li style={{ marginBottom: '10px' }}>• you want to stay kind without disappearing</li>
                            <li>• you’re tired of pretending motivation works for you</li>
                        </ul>
                    </div>
                </section>

                {/* CTA SECTION */}
                <section style={{ textAlign: 'center', marginBottom: '120px' }}>
                    <p style={{ fontSize: '1.1rem', color: '#7A7A7A', marginBottom: '40px' }}>
                        {script.cta_text}
                    </p>

                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="infp-cta-button"
                        style={{
                            background: 'transparent',
                            border: '1px solid #BCAAA4', // Soft warm grey
                            color: '#8D6E63',
                            padding: '16px 40px',
                            fontSize: '1.1rem',
                            borderRadius: '50px',
                            cursor: 'pointer',
                            transition: 'all 0.3s ease',
                            fontFamily: '"Quicksand", sans-serif'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#FAF7F2';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.transform = 'translateY(0)';
                        }}
                    >
                        Explore gently
                    </button>

                    <div style={{ marginTop: '40px' }}>
                        <p style={{ fontSize: '0.9rem', color: '#4A4A4A', marginBottom: '5px' }}>
                            <PriceDisplay amountUSD={script.price_discounted} showBadge /> — lifetime access
                        </p>
                    </div>
                </section>

                {/* SECTION 8: PROMISE */}
                <section style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '500px', margin: '0 auto 80px' }}>
                    {/* SEO H2: Derived from Guarantee */}
                    <h2 style={{ fontSize: '1.2rem', color: '#B0B0B0', marginBottom: '10px', fontWeight: 'normal' }}>Our Guarantee</h2>
                    <p style={{ color: '#7A7A7A', lineHeight: '1.6', fontStyle: 'italic', fontSize: '0.95rem' }}>
                        {script.guarantee_text}
                    </p>
                </section>

                {/* Creator Attribution */}
                <section style={{ textAlign: 'center', borderTop: '1px solid #EAE5D9', paddingTop: '40px', marginBottom: '60px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#8D6E63' }}>Curated by Keshav Baliyan</h2>
                    <p style={{ fontSize: '0.9rem', color: '#9CA3AF' }}>
                        Designed to honor your sensitivity.
                        <Link href="/creator" style={{ color: '#8D6E63', marginLeft: '5px', textDecoration: 'none' }}>Meet the Creator</Link>
                    </p>
                </section>

                {/* FOOTER */}
                <footer style={{ textAlign: 'center', paddingBottom: '60px', fontSize: '0.8rem', color: '#CCC' }}>
                    Made with care. No manipulation. No urgency. Just honesty.
                </footer>

            </div>

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
