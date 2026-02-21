'use client';

import React from "react";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import dynamic from "next/dynamic";
import UnicornScene from "unicornstudio-react/next";
import { productsData } from "../../../../data/products";
import { mbtiThemes } from "../../../../data/themes";
import { Product } from "../../../../data/types";
import "../../product.css";
import Link from "next/link";
import { motion } from "framer-motion";
const VantaBackground = dynamic(() => import("../../../../components/VantaBackground"), { ssr: false });
import CheckoutModal from "../../../../components/Payment/CheckoutModal";
import PriceDisplay from "../../../../components/Currency/PriceDisplay";

export default function ProductPage() {
    const params = useParams();
    const type = params.type as string;
    const slug = params.slug as string;
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    const mbtiType = type.toUpperCase();
    const profile = productsData[mbtiType];
    const theme = mbtiThemes[mbtiType];

    if (!profile || !theme) {
        notFound();
    }

    const product = profile.products.find((p: Product) => p.id === slug);

    if (!product) {
        notFound();
    }

    // Set page title
    React.useEffect(() => {
        if (product && product.script) {
            document.title = `${product.script.product_name} | Spiritual AI`;
        }
    }, [product]);

    const scrollToOffer = () => {
        const offerSection = document.querySelector('.offer-section');
        if (offerSection) {
            offerSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // --- SEO SCHEMA GENERATION ---
    const script = product?.script;
    const jsonLd = script ? {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.title,
        description: script.product_description || script.headline,
        brand: {
            '@type': 'Brand',
            name: 'Spiritual AI'
        },
        offers: {
            '@type': 'Offer',
            price: script.price_discounted,
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
            url: typeof window !== 'undefined' ? window.location.href : `https://spiritualai.store/products/${type}/${slug}`,
            validFrom: '2024-01-01',
            priceValidUntil: '2027-12-31'
        },
        image: script.image_url ? [`https://spiritualai.store${script.image_url}`] : [],
        audience: {
            '@type': 'Audience',
            audienceType: `${mbtiType} Personality Type`
        }
    } : null;

    // --- INTJ STRATEGIC LAYOUT ---
    if (theme.layoutType === 'INTJ_STRATEGIC') {
        const { script } = product;
        return (
            <div className="product-page layout-intj-strategic" style={{ position: 'relative' }}>{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
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

                <main className="sales-container" style={{ maxWidth: '1000px' }}>

                    {/* 2. HERO SECTION */}
                    <div className="intj-hero-grid">
                        <div>
                            <span style={{ color: '#4FD1C5', fontSize: '0.9rem', letterSpacing: '2px', fontWeight: 'bold', display: 'block', marginBottom: '16px' }}>INTJ EXCLUSIVE</span>
                            <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: '1.2', fontWeight: '300', marginBottom: '24px', color: '#fff' }}>
                                {product.title}
                            </h1>
                            <p style={{ fontSize: '1.4rem', color: '#888', fontWeight: '300', letterSpacing: '0.5px', marginBottom: '32px' }}>
                                {script.headline}
                            </p>
                            <button
                                onClick={scrollToOffer}
                                className="cta-button"
                                style={{ padding: '16px 32px', fontSize: '1rem', border: '1px solid #4FD1C5', background: 'transparent', cursor: 'pointer' }}
                            >
                                {'>'} EXECUTE PROTOCOL
                            </button>
                        </div>
                        <div className="intj-visual-anchor">
                            {product.script.image_url ? (
                                <img src={product.script.image_url} alt="Visual Anchor" />
                            ) : (
                                <div style={{ padding: '40px', border: '1px solid #4FD1C5', color: '#4FD1C5' }}>Generating Visual: {script.hook_image_prompt}</div>
                            )}
                        </div>
                    </div>

                    {/* 3. INTERNAL BOTTLENECK */}
                    <section style={{ maxWidth: '680px', margin: '100px 0' }}>
                        <div className="scroll-signal" style={{ textAlign: 'center', margin: '40px 0', opacity: 0.5 }}>
                            <span style={{ fontSize: '1.5rem', animation: 'bounce 2s infinite' }}>↓</span>
                        </div>
                        <h3 className="sales-heading" style={{ fontSize: '1.8rem', marginBottom: '30px' }}>The Internal Bottleneck</h3>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#d1d5db' }}>
                            {script.pain_story}
                        </p>
                        <ul className="agitation-list" style={{ marginTop: '40px' }}>
                            {script.agitation_bullets.map((bullet: string | { title: string, analysis: string }, i: number) => (
                                <li key={i}>{typeof bullet === 'string' ? bullet : bullet.title}</li>
                            ))}
                        </ul>
                    </section>

                    {/* 4. PARADIGM SHIFT */}
                    <div className="intj-paradigm-shift">
                        <span style={{ color: '#4FD1C5', fontSize: '1.2rem', letterSpacing: '4px', textTransform: 'uppercase' }}>THE PARADIGM SHIFT</span>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginTop: '16px', color: '#fff', textTransform: 'uppercase' }}>
                            {script.transition_mechanism}
                        </h2>
                    </div>

                    {/* 5. LifeOS ARCHITECTURE */}
                    <section className="intj-lifeos-grid">
                        <div>
                            <h3 className="sales-heading" style={{ fontSize: '2rem' }}>{script.product_name}</h3>
                            <p style={{ fontSize: '1.2rem', color: '#9ca3af' }}>{script.product_description}</p>
                        </div>
                        <div className="intj-code-block">
                            {script.features_bullets.map((feature: string, i: number) => (
                                <div key={i} style={{ marginBottom: '12px', fontFamily: 'monospace' }}>
                                    <span style={{ color: '#c678dd' }}>const</span> feature_{i} = <span style={{ color: '#98c379' }}>"{feature}"</span>;
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 6. CTA + PRICING */}
                    <section className="offer-section" style={{ background: 'transparent', padding: '0', marginTop: '100px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div className="price-container" style={{ marginTop: '30px' }}>
                                <span className="price-original" style={{ color: '#4b5563', fontSize: '1.5rem', textDecoration: 'line-through' }}>
                                    <PriceDisplay amountUSD={script.price_original} />
                                </span>
                                <span className="price-discounted" style={{ color: '#fff', fontSize: '3rem', fontFamily: 'IBM Plex Sans', marginLeft: '10px' }}>
                                    <PriceDisplay amountUSD={script.price_discounted} showBadge />
                                </span>
                            </div>

                            <button
                                onClick={() => setIsCheckoutOpen(true)}
                                className="cta-button"
                                style={{ padding: '24px 60px', fontSize: '1.2rem', background: 'rgba(79, 209, 197, 0.1)', marginTop: '30px' }}
                            >
                                {script.cta_text}
                            </button>

                            {script.bonuses.map((bonus: any, i: number) => (
                                <div key={i} style={{ marginTop: '20px', textAlign: 'center' }}>
                                    <span style={{ color: '#4FD1C5', fontWeight: 'bold' }}>BONUS:</span> <span style={{ color: '#d1d5db' }}>{bonus.title}</span>
                                    <span style={{ display: 'block', fontSize: '0.9rem', color: '#6b7280' }}>
                                        {bonus.description} (<PriceDisplay amountUSD={bonus.value} /> Value)
                                    </span>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 7. INTJ PROMISE */}
                    <div className="intj-promise">
                        <span style={{ display: 'block', fontSize: '1.2rem', marginBottom: '10px' }}>🛡️ THE INTJ PROMISE:</span>
                        <code>
                            {script.guarantee_text}
                        </code>
                    </div>

                    {/* 8. FOOTER TRUST */}
                    <div style={{ textAlign: 'center', marginTop: '80px', color: '#4b5563', fontSize: '0.9rem' }}>
                        <p>{script.scarcity_text}</p>
                        <p>Secure Payment • Instant Digital Delivery • Lifetime Access</p>
                    </div>

                </main>
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        );
    }

    // --- ENFP CAMPAIGNER LAYOUT ---
    if (mbtiType === 'ENFP') {
        const { script } = product;
        return (
            <div className="product-page layout-enfp" style={{
                background: '#ffffff',
                color: '#000000',
                fontFamily: '"Outfit", sans-serif',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}<style jsx>{`
                    .enfp-container {
                        max-width: 1000px;
                        margin: 0 auto;
                        padding: 0 20px;
                    }
                    .enfp-card {
                        background: #fefae0;
                        border-radius: 20px;
                        padding: 30px;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.05);
                        border: 2px solid #fff;
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        cursor: pointer;
                    }
                    .enfp-card:hover {
                        transform: translateY(-8px) rotate(1deg);
                        box-shadow: 0 20px 40px rgba(255, 0, 110, 0.15);
                        border-color: #ff006e;
                    }
                    .enfp-btn {
                        background: linear-gradient(135deg, #ff006e, #fb5607);
                        color: white !important;
                        padding: 20px 45px;
                        border-radius: 50px;
                        font-weight: 700;
                        font-size: 1.2rem;
                        border: none;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 10px 25px rgba(255, 0, 110, 0.3);
                        display: inline-block;
                        text-decoration: none;
                    }
                    .enfp-btn:hover {
                        transform: scale(1.05);
                        box-shadow: 0 15px 35px rgba(255, 0, 110, 0.5);
                    }
                    .hero-visual {
                        animation: float 6s ease-in-out infinite;
                    }
                    @keyframes float {
                        0% { transform: translateY(0px); }
                        50% { transform: translateY(-15px); }
                        100% { transform: translateY(0px); }
                    }
                `}</style>

                {/* Back Link */}
                <div style={{ padding: '20px 0' }}>
                    <div className="enfp-container">
                        <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#333', textDecoration: 'none', fontWeight: 600, fontSize: '1.1rem' }}>
                            ← Back
                        </Link>
                    </div>
                </div>

                {/* HERO SECTION */}
                <header style={{ textAlign: 'center', marginTop: '40px', marginBottom: '80px' }}>
                    <div className="enfp-container">
                        <span style={{
                            background: '#ffbe0b',
                            color: '#000',
                            padding: '8px 20px',
                            borderRadius: '30px',
                            fontWeight: '800',
                            letterSpacing: '1px',
                            marginBottom: '25px',
                            display: 'inline-block',
                            boxShadow: '0 5px 15px rgba(255, 190, 11, 0.3)'
                        }}>
                            ENFP EXCLUSIVE
                        </span>

                        <h1 style={{
                            fontSize: 'clamp(3rem, 6vw, 4.5rem)',
                            fontWeight: '800',
                            lineHeight: 1.1,
                            marginBottom: '20px',
                            background: 'linear-gradient(45deg, #ff006e, #fb5607)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {product.title}
                        </h1>

                        <p style={{
                            fontSize: '1.5rem',
                            maxWidth: '700px',
                            margin: '0 auto 40px',
                            lineHeight: 1.5,
                            color: '#444'
                        }}>
                            What if your life didn’t have to feel smaller to be stable?<br />
                            <span style={{ color: '#ff006e', fontWeight: 'bold' }}>A playful, meaningful framework for curious minds who refuse to live on autopilot.</span>
                        </p>

                        <div className="hero-visual" style={{
                            maxWidth: '900px',
                            margin: '0 auto',
                            borderRadius: '30px',
                            overflow: 'hidden',
                            boxShadow: '0 30px 60px rgba(0,0,0,0.1)',
                            border: '4px solid #fff'
                        }}>
                            {product.script.image_url ? (
                                <img src={product.script.image_url} alt={product.title} style={{ width: '100%', display: 'block' }} />
                            ) : (
                                <div style={{ height: '500px', background: 'linear-gradient(45deg, #ff9a9e 0%, #fad0c4 99%, #fad0c4 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    [ Visual: {script.hook_image_prompt} ]
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                {/* EMOTIONAL EXCITEMENT */}
                <section style={{ padding: '80px 0', background: '#fff' }}>
                    <div className="enfp-container" style={{ textAlign: 'center', maxWidth: '800px' }}>
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '30px' }}>You’re not lost. You’re exploring.</h2>
                        <div style={{ fontSize: '1.3rem', lineHeight: 1.8, color: '#555', textAlign: 'left' }}>
                            <p style={{ marginBottom: '20px' }}>
                                You get excited by ideas. You see possibilities everywhere. You feel called toward <i>more</i> — even when you can’t name it.
                            </p>
                            <p style={{ marginBottom: '20px' }}>
                                And the world keeps telling you to calm down, settle, specialize.
                            </p>
                            <p style={{ fontWeight: 'bold', fontSize: '1.5rem', color: '#000' }}>
                                But what if your curiosity is the point?
                            </p>
                        </div>
                    </div>
                </section>

                {/* WHAT THIS IS */}
                <section style={{ padding: '80px 0', background: '#fefae0' }}>
                    <div className="enfp-container" style={{ textAlign: 'center' }}>
                        <h2 style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '20px', color: '#fb5607' }}>This isn’t a plan.<br />It’s a playground.</h2>
                        <p style={{ fontSize: '1.3rem', maxWidth: '600px', margin: '0 auto 60px', color: '#666' }}>
                            It’s a flexible, creative space designed to help you follow curiosity without chaos.
                        </p>

                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '30px', textAlign: 'left' }}>
                            <div className="enfp-card">
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🌈</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Follow the Spark</h3>
                                <p style={{ color: '#555' }}>Start where curiosity feels alive. Don't force yourself into a linear path.</p>
                            </div>
                            <div className="enfp-card">
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🧭</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Connect the Dots</h3>
                                <p style={{ color: '#555' }}>Turn scattered ideas into surprising clarity. Your pattern recognition is your superpower.</p>
                            </div>
                            <div className="enfp-card">
                                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>🚀</div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '10px' }}>Move Flexibly</h3>
                                <p style={{ color: '#555' }}>Momentum without pressure. Ship things because it's fun, not because you "have to".</p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* SOCIAL HOOK */}
                <section style={{ padding: '100px 0', textAlign: 'center' }}>
                    <div className="enfp-container">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '30px' }}>Your growth doesn’t just change you.</h2>
                        <p style={{ fontSize: '1.4rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6, color: '#444' }}>
                            When you’re aligned, inspired, and alive — your energy ripples outward. ENFPs change rooms, conversations, and futures just by being fully themselves.
                        </p>
                    </div>
                </section>

                {/* CTA */}
                <section style={{ padding: '80px 0 120px', background: 'linear-gradient(180deg, #fff 0%, #fff0f5 100%)', textAlign: 'center' }}>
                    <div className="enfp-container">
                        <h2 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px' }}>Curious?</h2>
                        <p style={{ fontSize: '1.3rem', marginBottom: '40px', color: '#666' }}>You don’t have to decide anything yet.</p>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="enfp-btn"
                        >
                            Let me explore
                        </button>

                        <div style={{ marginTop: '30px', color: '#888' }}>
                            <div style={{ fontWeight: 'bold', color: '#333', fontSize: '1.2rem' }}>
                                <PriceDisplay amountUSD={script.price_discounted} showBadge /> — lifetime access
                            </div>
                            <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                                One decision. Infinite exploration.<br />
                                If it doesn't spark excitement, full refund. No awkward emails.
                            </p>
                        </div>
                    </div>
                </section>

                <footer style={{ textAlign: 'center', padding: '40px', color: '#999', fontSize: '0.9rem' }}>
                    Built for curious souls. No pressure. No urgency. Just possibility.
                </footer>
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        );
    }

    // --- ENFJ PROTAGONIST LAYOUT ---
    if (theme.layoutType === 'ENFJ_PROTAGONIST') {
        const { script } = product;
        return (
            <div className="product-page layout-enfj" style={{
                background: '#fffaf0', // Warm floral white
                color: '#4a4a4a',
                fontFamily: '"Inter", sans-serif',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}<style jsx>{`
                    .enfj-container {
                        max-width: 1000px;
                        margin: 0 auto;
                        padding: 0 20px;
                    }
                    .enfj-section {
                        margin-bottom: 100px;
                    }
                    .enfj-card {
                        background: #fff;
                        border-radius: 16px;
                        padding: 30px;
                        box-shadow: 0 10px 30px rgba(255, 140, 105, 0.1);
                        border: 1px solid rgba(255, 140, 105, 0.1);
                        transition: transform 0.3s ease;
                    }
                    .enfj-card:hover {
                        transform: translateY(-5px);
                    }
                    .enfj-btn {
                        background: #ff8c69;
                        color: white !important;
                        padding: 18px 40px;
                        border-radius: 50px;
                        font-weight: 600;
                        font-size: 1.1rem;
                        border: none;
                        cursor: pointer;
                        transition: all 0.3s ease;
                        box-shadow: 0 4px 15px rgba(255, 140, 105, 0.4);
                        display: inline-block;
                        text-decoration: none;
                    }
                    .enfj-btn:hover {
                        background: #ff7650;
                        transform: translateY(-2px);
                        box-shadow: 0 6px 20px rgba(255, 140, 105, 0.6);
                    }
                    .text-gradient {
                        background: linear-gradient(135deg, #ff8c69, #ffb347);
                        -webkit-background-clip: text;
                        -webkit-text-fill-color: transparent;
                    }
                `}</style>

                {/* Back Link */}
                <div style={{ padding: '20px 0', borderBottom: '1px solid #ffe4d1' }}>
                    <div className="enfj-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8d8d8d', textDecoration: 'none', fontWeight: 500 }}>
                            ← Back
                        </Link>
                        <Link href="/" style={{ color: '#8d8d8d', textDecoration: 'none', fontWeight: 500 }}>
                            Home
                        </Link>
                        <span style={{ color: '#8d8d8d', opacity: 0.6 }}>/ The Protagonist (ENFJ)</span>
                    </div>
                </div>

                {/* HERO SECTION */}
                <header className="enfj-section" style={{ textAlign: 'center', marginTop: '60px' }}>
                    <div className="enfj-container">
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(255, 140, 105, 0.1)',
                            color: '#ff8c69',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            letterSpacing: '1px'
                        }}>
                            ENFJ EXCLUSIVE
                        </span>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '700',
                            color: '#2d3436',
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            fontFamily: '"Outfit", sans-serif'
                        }}>
                            {product.title}
                        </h1>

                        <p style={{
                            fontSize: '1.25rem',
                            color: '#636e72',
                            maxWidth: '600px',
                            margin: '0 auto 40px',
                            lineHeight: 1.6
                        }}>
                            <span className="text-gradient">A purpose-driven framework for people who feel called<br />
                                to guide, uplift, and bring out the best in others.</span>
                        </p>

                        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            {product.script.image_url ? (
                                <img src={product.script.image_url} alt={product.title} style={{ width: '100%', display: 'block' }} />
                            ) : (
                                <div style={{ height: '400px', background: 'linear-gradient(135deg, #ffd1b3, #ffeaa7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d35400' }}>
                                    [ Warm Visual: {script.hook_image_prompt} ]
                                </div>
                            )}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '30px',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                color: 'white',
                                textAlign: 'left'
                            }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{product.title}</h2>
                            </div>
                        </div>
                    </div>
                </header>

                {/* REST OF ENFJ CONTENT (Placeholder for now, keeping existing structure if needed or just letting it flow)
                   Actually, the previous ENFJ block continued below. I need to make sure I don't break the file structure.
                   The previous view showed I was inside the return.
                   Wait, I am adding ENFP handling. I should add a check for ENFP *before* ENFJ or as a separate block.
                   But the ViewFile showed generic structure until the ENFJ block.
                   I will insert the ENFP block BEFORE the ENFJ block if possible, or replace the whole Return logic to route correctly.
                   The current file has:
                   if (mbtiType === 'INTJ') ...
                   if (mbtiType === 'ENFJ') ...
                   
                   I need to find where ENFJ starts.
                   Line 245 was start of return?
                   Let's look at the file content again to be sure where to insert ENFP.
                   I should ViewFile again to be safe.
                */}
                {/* Back Link */}
                <div style={{ padding: '20px 0', borderBottom: '1px solid #ffe4d1' }}>
                    <div className="enfj-container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#8d8d8d', textDecoration: 'none', fontWeight: 500 }}>
                            ← Back
                        </Link>
                        <Link href="/" style={{ color: '#8d8d8d', textDecoration: 'none', fontWeight: 500 }}>
                            Home
                        </Link>
                        <span style={{ color: '#8d8d8d', opacity: 0.6 }}>/ The Protagonist (ENFJ)</span>
                    </div>
                </div>

                {/* HERO SECTION */}
                <header className="enfj-section" style={{ textAlign: 'center', marginTop: '60px' }}>
                    <div className="enfj-container">
                        <span style={{
                            display: 'inline-block',
                            background: 'rgba(255, 140, 105, 0.1)',
                            color: '#ff8c69',
                            padding: '6px 16px',
                            borderRadius: '20px',
                            fontSize: '0.85rem',
                            fontWeight: 'bold',
                            marginBottom: '20px',
                            letterSpacing: '1px'
                        }}>
                            ENFJ EXCLUSIVE
                        </span>

                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '700',
                            color: '#2d3436',
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            fontFamily: '"Outfit", sans-serif'
                        }}>
                            {product.title}
                        </h1>

                        <p style={{
                            fontSize: '1.25rem',
                            color: '#636e72',
                            maxWidth: '600px',
                            margin: '0 auto 40px',
                            lineHeight: 1.6
                        }}>
                            You were never meant to walk this path alone.<br />
                            <span className="text-gradient">A purpose-driven framework for people who feel called<br />
                                to guide, uplift, and bring out the best in others.</span>
                        </p>


                        <div style={{ position: 'relative', maxWidth: '800px', margin: '0 auto', borderRadius: '24px', overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.05)' }}>
                            {product.script.image_url ? (
                                <img src={product.script.image_url} alt="Ideal Future" style={{ width: '100%', display: 'block' }} />
                            ) : (
                                <div style={{ height: '400px', background: 'linear-gradient(135deg, #ffd1b3, #ffeaa7)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d35400' }}>
                                    [ Warm Visual: {script.hook_image_prompt} ]
                                </div>
                            )}
                            <div style={{
                                position: 'absolute',
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: '30px',
                                background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)',
                                color: 'white',
                                textAlign: 'left'
                            }}>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: '600' }}>{product.title}</h2>
                            </div>
                        </div>
                    </div>
                </header >

                {/* SECTION 2: EMOTIONAL VALIDATION */}
                < section className="enfj-section" >
                    <div className="enfj-container" style={{ maxWidth: '800px', textAlign: 'center' }}>
                        <h2 style={{ fontSize: '2rem', marginBottom: '30px', color: '#2d3436', fontFamily: '"Outfit", sans-serif' }}>
                            You carry responsibility naturally.
                        </h2>
                        <div style={{ fontSize: '1.15rem', color: '#636e72', lineHeight: 1.8, textAlign: 'left' }}>
                            <p style={{ marginBottom: '20px' }}>
                                You notice when others are struggling. You instinctively step into the role of supporter, guide, or motivator. You feel fulfilled when people around you grow.
                            </p>
                            <div style={{
                                background: '#fff0e6',
                                borderLeft: '4px solid #ff8c69',
                                padding: '20px 30px',
                                borderRadius: '0 8px 8px 0',
                                marginTop: '30px'
                            }}>
                                <p style={{ margin: 0, fontStyle: 'italic', color: '#a65132' }}>
                                    But carrying everyone else can become heavy when you don’t have space to refuel or reflect.
                                </p>
                            </div>
                            <p style={{ marginTop: '30px' }}>
                                Specifically regarding: {script.pain_story}
                            </p>
                        </div>
                    </div>
                </section >

                {/* SECTION 3: WHAT THIS IS */}
                < section className="enfj-section" style={{ background: '#fff', padding: '80px 0' }
                }>
                    <div className="enfj-container">
                        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
                            <h2 style={{ fontSize: '2rem', marginBottom: '40px', color: '#2d3436' }}>
                                This isn’t about fixing yourself.
                            </h2>
                            <p style={{ fontSize: '1.2rem', marginBottom: '30px', color: '#636e72' }}>
                                It’s about strengthening your ability to:
                            </p>
                            <ul style={{
                                textAlign: 'left',
                                listStyle: 'none',
                                // padding: 0 removed in favor of padding: '40px' below
                                fontSize: '1.1rem',
                                color: '#2d3436',
                                background: '#fdfbf7',
                                display: 'inline-block',
                                borderRadius: '16px',
                                padding: '40px'
                            }}>
                                <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ color: '#ff8c69', fontSize: '1.4rem' }}>✦</span> lead with empathy without burning out
                                </li>
                                <li style={{ marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ color: '#ff8c69', fontSize: '1.4rem' }}>✦</span> communicate with clarity and heart
                                </li>
                                <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                                    <span style={{ color: '#ff8c69', fontSize: '1.4rem' }}>✦</span> create positive change that lasts
                                </li>
                            </ul>
                            <p style={{ marginTop: '40px', fontStyle: 'italic', color: '#8d8d8d' }}>
                                "{script.transition_mechanism}"
                            </p>
                        </div>
                    </div>
                </section >

                {/* SECTION 4: HOW IT EMPOWERS YOU */}
                < section className="enfj-section" >
                    <div className="enfj-container">
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
                            <div className="enfj-card">
                                <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🌱</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#2d3436' }}>Emotional Intelligence</h3>
                                <p style={{ color: '#636e72', lineHeight: 1.6 }}>Understand your own needs while supporting others. Gain clarity on where you end and others begin.</p>
                            </div>
                            <div className="enfj-card">
                                <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🌍</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#2d3436' }}>Purposeful Influence</h3>
                                <p style={{ color: '#636e72', lineHeight: 1.6 }}>Turn care and vision into meaningful action. Structure your impact so it scales without draining you.</p>
                            </div>
                            <div className="enfj-card">
                                <div style={{ fontSize: '2rem', marginBottom: '20px' }}>🤍</div>
                                <h3 style={{ fontSize: '1.4rem', marginBottom: '15px', color: '#2d3436' }}>Sustainable Leadership</h3>
                                <p style={{ color: '#636e72', lineHeight: 1.6 }}>Help others grow without losing yourself. Build systems of support that sustain everyone, including you.</p>
                            </div>
                        </div>
                    </div>
                </section >

                {/* SECTION 5: WHO THIS IS FOR */}
                < section className="enfj-section" >
                    <div className="enfj-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px' }}>
                        <div style={{ background: '#fff', borderRadius: '16px', padding: '40px', borderTop: '4px solid #81ecec' }}>
                            <h3 style={{ fontSize: '1.3rem', marginBottom: '25px', color: '#2d3436' }}>This will resonate if you:</h3>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#636e72' }}>
                                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}><span style={{ color: '#81ecec' }}>✔</span> feel called to guide others</li>
                                <li style={{ marginBottom: '12px', display: 'flex', gap: '10px' }}><span style={{ color: '#81ecec' }}>✔</span> value harmony and growth</li>
                                <li style={{ display: 'flex', gap: '10px' }}><span style={{ color: '#81ecec' }}>✔</span> want to lead with heart and clarity</li>
                            </ul>
                        </div>
                    </div>
                </section >

                {/* SECTION 6: CTA */}
                < section className="enfj-section" style={{ textAlign: 'center', padding: '80px 20px', background: 'linear-gradient(to bottom, transparent, rgba(255, 140, 105, 0.05))' }
                }>
                    <div className="enfj-container">
                        <h2 style={{ fontSize: '2.2rem', marginBottom: '20px', color: '#2d3436' }}>Average impact is not enough.</h2>
                        <p style={{ fontSize: '1.3rem', color: '#636e72', marginBottom: '40px' }}>
                            When you grow, others benefit too.
                        </p>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="enfj-btn"
                        >
                            Begin the journey
                        </button>
                    </div>
                </section >

                {/* SECTION 7: PRICING */}
                < section className="enfj-section" style={{ textAlign: 'center' }}>
                    <div className="enfj-container">
                        <div style={{ fontSize: '3rem', fontWeight: 'bold', color: '#2d3436', fontFamily: '"Outfit", sans-serif' }}>
                            <PriceDisplay amountUSD={script.price_discounted} showBadge />
                            <span style={{ fontSize: '1rem', color: '#636e72', fontWeight: 'normal', display: 'block', marginTop: '10px' }}>lifetime access</span>
                        </div>
                        <p style={{ marginTop: '20px', color: '#8d8d8d', maxWidth: '400px', margin: '20px auto 0' }}>
                            Designed to support long-term growth, not short-term hype.
                        </p>
                    </div>
                </section >

                {/* SECTION 8: PROMISE */}
                < section className="enfj-section" style={{ paddingBottom: '60px' }}>
                    <div className="enfj-container" style={{ textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
                        <div style={{ padding: '30px', background: '#fff', borderRadius: '16px', border: '1px dashed #d1ccc0' }}>
                            <p style={{ color: '#636e72', lineHeight: 1.6 }}>
                                <strong>Our Promise:</strong> If this doesn’t feel supportive, inspiring, or aligned with your values, you can request a refund — no questions asked. Trust and care matter.
                            </p>
                        </div>
                    </div>
                </section >

                {/* FOOTER */}
                < footer style={{ textAlign: 'center', padding: '40px 20px', borderTop: '1px solid #ffe4d1', color: '#b2bec3' }}>
                    <p style={{ marginBottom: '10px' }}>Created with intention.</p>
                    <p>Designed for people who uplift others.<br />No urgency. Just purpose.</p>
                </footer >

                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div >
        );
    }

    // --- INFP MEDIATOR LAYOUT ---
    if (theme.layoutType === 'INFP_MEDIATOR') {
        const { script } = product;
        return (
            <div className="product-page layout-infp" style={{
                background: '#FAF9F6', // Off-white/Paper
                color: '#5D5D5D', // Soft Charcoal
                fontFamily: '"Nunito", "Quicksand", sans-serif',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Back Button */}
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
                        {/* H1: Product Title (as requested) */}
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

                        {/* Scroll Indicator */}
                        <div style={{ marginTop: '30px', animation: 'float 3s ease-in-out infinite' }}>
                            <span style={{ fontSize: '1.5rem', color: '#D5BDAF', cursor: 'pointer' }} onClick={() => {
                                document.getElementById('infp-content-start')?.scrollIntoView({ behavior: 'smooth' });
                            }}>
                                ↓
                            </span>
                        </div>
                    </header>

                    {/* SECTION 2: EMOTIONAL MIRROR */}
                    <section id="infp-content-start" style={{ marginBottom: '100px', scrollMarginTop: '40px' }}>
                        <h2 style={{ fontSize: '1.8rem', fontWeight: '400', color: '#4A4A4A', marginBottom: '30px', fontFamily: '"Lora", serif' }}>
                            You’ve always felt a little different.
                        </h2>

                        <div style={{ fontSize: '1.1rem', lineHeight: '1.9', color: '#5D5D5D' }}>
                            <p style={{ marginBottom: '20px' }}>You feel things deeply — sometimes more than you’d like. You care about meaning when others chase outcomes. You want your life to feel <em>true</em>, not just successful.</p>
                            <p style={{ marginBottom: '20px' }}>The world keeps asking you to harden, optimize, and perform. Something in you refuses.</p>

                            {/* Product Specific Pain - Gently Woven In */}
                            <div style={{ marginTop: '40px', paddingLeft: '20px', borderLeft: '3px solid #EAE5D9' }}>
                                <p style={{ fontStyle: 'italic', marginBottom: '15px', color: '#7A7A7A' }}>Specifically regarding this:</p>
                                <p>{script.pain_story}</p>
                            </div>
                        </div>
                    </section>

                    {/* SECTION 3: WHAT THIS IS */}
                    <section style={{ marginBottom: '100px', background: '#F9F7F2', padding: '50px', borderRadius: '12px' }}>
                        <h2 style={{ fontSize: '1.6rem', fontWeight: '400', color: '#4A4A4A', marginBottom: '20px', textAlign: 'center', fontFamily: '"Lora", serif' }}>
                            This is not a system to fix you.
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

                    {/* SECTION 4: HOW IT SUPPORTS YOU (Soft Pillars) */}
                    <section style={{ marginBottom: '120px' }}>
                        <h3 style={{ textAlign: 'center', marginBottom: '60px', fontSize: '1.4rem', color: '#B0B0B0', fontWeight: '300', letterSpacing: '1px' }}>HOW IT SUPPORTS YOU</h3>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '60px' }}>
                            {script.features_bullets.map((feature, i) => (
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
                            <h4 style={{ color: '#6B8E7B', marginBottom: '20px', fontSize: '1.1rem' }}>This may be for you if:</h4>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#7A7A7A', lineHeight: '1.7' }}>
                                <li style={{ marginBottom: '10px' }}>• you value authenticity over speed</li>
                                <li style={{ marginBottom: '10px' }}>• you want to stay kind without disappearing</li>
                                <li>• you’re tired of pretending motivation works for you</li>
                            </ul>
                        </div>
                        <div style={{ padding: '30px', background: '#FDFCF9', borderRadius: '8px' }}>
                            <h4 style={{ color: '#9B6154', marginBottom: '20px', fontSize: '1.1rem' }}>It may not be for you if:</h4>
                            <ul style={{ listStyle: 'none', padding: 0, color: '#7A7A7A', lineHeight: '1.7' }}>
                                <li style={{ marginBottom: '10px' }}>• you want aggressive pushing</li>
                                <li style={{ marginBottom: '10px' }}>• you prefer rigid rules</li>
                                <li>• you enjoy being optimized</li>
                            </ul>
                        </div>
                    </section>

                    {/* CTA SECTION */}
                    <section style={{ textAlign: 'center', marginBottom: '120px' }}>
                        <p style={{ fontSize: '1.1rem', color: '#7A7A7A', marginBottom: '40px' }}>
                            There’s no rush.<br />Explore when it feels right.
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

                        <style jsx>{`
                            @keyframes float {
                                0% { transform: translateY(0px); }
                                50% { transform: translateY(10px); }
                                100% { transform: translateY(0px); }
                            }
                            .infp-cta-button {
                                background: #e8a598 !important;
                                color: #fff !important;
                                border: none !important;
                                box-shadow: 0 4px 15px rgba(232, 165, 152, 0.4);
                                font-weight: 600;
                            }
                            .infp-cta-button:hover {
                                background: #d69488 !important;
                                transform: translateY(-2px) !important;
                                box-shadow: 0 6px 20px rgba(232, 165, 152, 0.6);
                            }
                        `}</style>

                        <div style={{ marginTop: '40px' }}>
                            <div style={{ fontSize: '0.9rem', color: '#4A4A4A', marginBottom: '5px' }}>
                                <PriceDisplay amountUSD={script.price_discounted} showBadge /> — lifetime access
                            </div>
                            <p style={{ fontSize: '0.8rem', color: '#A5A5A5', fontStyle: 'italic' }}>Priced to be accessible, not to pressure you.</p>
                        </div>
                    </section>

                    {/* SECTION 8: PROMISE */}
                    <section style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '500px', margin: '0 auto 80px' }}>
                        <p style={{ color: '#7A7A7A', lineHeight: '1.6', fontStyle: 'italic', fontSize: '0.95rem' }}>
                            If this doesn’t feel supportive or grounding, you can request a refund. No explanations required.
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
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }

    // --- INTP CURIOSITY LAYOUT ---
    if (theme.layoutType === 'INTP_CURIOSITY') {
        const { script } = product;
        const [revealBonuses, setRevealBonuses] = useState(false);
        const [expandedThought, setExpandedThought] = useState<number | null>(null);

        return (
            <div className="product-page layout-intp-curiosity" style={{ position: 'relative' }}>{jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}
                {/* 🦄 Unicorn Studio Background for INTP second-brain */}
                {slug === 'second-brain' && (
                    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}>
                        <UnicornScene projectId="KlXQdwev7jAGG9TcNfm7" />
                    </div>
                )}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                        color: '#64748b', textDecoration: 'none',
                        background: 'rgba(10, 14, 26, 0.8)', padding: '5px 16px',
                        border: '1px solid #1e293b', borderRadius: '4px',
                        fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem',
                        display: 'flex', alignItems: 'center', gap: '8px'
                    }}>
                        <span>&lt;</span>
                        <span>return</span>
                    </Link>
                </div>
                <nav style={{ padding: '20px', fontSize: '0.85rem', color: '#64748b', display: 'flex', gap: '15px', fontFamily: '"JetBrains Mono", monospace', justifyContent: 'flex-end' }}>
                    <Link href="/" style={{ color: '#64748b', textDecoration: 'none' }}>~/home</Link>
                    <span>/</span>
                    <span style={{ color: '#94a3b8' }}>{profile.name}</span>
                </nav>

                <main className="sales-container" style={{ maxWidth: '800px', marginTop: '40px' }}>

                    {/* HERO: Quiet Fascination */}
                    <section style={{ marginBottom: '120px' }}>
                        <span className="intp-fade-in" style={{ color: '#7C7CFF', fontFamily: '"JetBrains Mono", monospace', fontSize: '0.8rem', display: 'block', marginBottom: '20px' }}>
                            // INTP_EXCLUSIVE
                        </span>

                        <h1 className="sales-heading intp-fade-in delay-1" style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', lineHeight: '1.3', marginBottom: '10px' }}>
                            {script.headline}
                        </h1>

                        <div className="sales-subheading intp-fade-in delay-2">
                            {script.subheadline}
                        </div>

                        <div className="intp-visual-container intp-fade-in delay-3" style={{ marginTop: '60px', position: 'relative' }}>
                            {product.script.image_url ? (
                                <img src={product.script.image_url} alt="Concept Visual" style={{ width: '100%', borderRadius: '8px', border: '1px solid #1e293b', opacity: 0.9 }} />
                            ) : null}
                            <div className="scroll-signal" style={{ textAlign: 'center', marginTop: '20px', opacity: 0.5, fontSize: '0.8rem', fontFamily: 'monospace' }}>
                                ↓ scroll_for_data
                            </div>
                        </div>
                    </section>


                    {/* THE REAL BOTTLENECK: Collapsible Insights */}
                    <section style={{ marginBottom: '100px' }}>
                        <h3 className="sales-heading" style={{ fontSize: '1.4rem', marginBottom: '30px', color: '#94a3b8' }}>
                            The Logic Gap
                        </h3>
                        <div style={{ paddingLeft: '20px', borderLeft: '2px solid #1e293b' }}>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#cbd5e1', marginBottom: '40px' }}>
                                {script.pain_story}
                            </p>

                            <div className="intp-thoughts">
                                {script.agitation_bullets.map((bullet: string | { title: string, analysis: string }, i: number) => {
                                    const title = typeof bullet === 'string' ? bullet : bullet.title;
                                    const analysis = typeof bullet === 'string' ? "Analysis: This is a recursive loop caused by undefined success criteria." : bullet.analysis;

                                    return (
                                        <div key={i}>
                                            <div
                                                className="intp-thought-trigger"
                                                onClick={() => setExpandedThought(expandedThought === i ? null : i)}
                                                style={{ cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #1e293b' }}
                                            >
                                                <span style={{ color: expandedThought === i ? '#7C7CFF' : '#cbd5e1', transition: 'color 0.3s' }}>{title}</span>
                                                <span style={{ color: expandedThought === i ? '#7C7CFF' : '#64748b', fontFamily: 'monospace', fontSize: '1.2rem' }}>
                                                    {expandedThought === i ? '[-]' : '[+]'}
                                                </span>
                                            </div>
                                            <div className={`intp-thought-content ${expandedThought === i ? 'open' : ''}`} style={{ height: expandedThought === i ? 'auto' : '0', overflow: 'hidden', transition: 'height 0.3s ease' }}>
                                                {expandedThought === i && (
                                                    <p style={{ fontSize: '0.9rem', color: '#94a3b8', padding: '10px 0', borderLeft: '2px solid #7C7CFF', paddingLeft: '15px', marginTop: '5px' }}>
                                                        <span style={{ color: '#7C7CFF' }}>Analysis:</span> {analysis}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    </section>


                    {/* THE SHIFT: Alignment Snap */}
                    <section style={{ textAlign: 'center', marginBottom: '120px' }}>
                        <div style={{ display: 'inline-block', textAlign: 'left' }}>
                            <p style={{ fontFamily: 'monospace', color: '#64748b', fontSize: '0.9rem', marginBottom: '10px' }}>&gt; RUNNING_PARADIGM_SHIFT...</p>
                            <h2 style={{ fontSize: '2rem', color: '#fff', letterSpacing: '-1px' }}>
                                {script.transition_mechanism}
                            </h2>
                        </div>
                    </section>


                    {/* CORE TOOLS: Hover Nodes */}
                    <section style={{ marginBottom: '120px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                            {script.features_bullets.map((feature: string, i: number) => {
                                const parts = feature.split(':');
                                const title = parts[0];
                                const desc = parts.slice(1).join(':');

                                return (
                                    <div key={i} className="intp-node">
                                        <span className="intp-node-title">{title}</span>
                                        <div className="intp-node-desc">
                                            {desc}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </section>


                    {/* ACCESS: De-emphasized */}
                    <section style={{
                        marginTop: '80px',
                        paddingTop: '40px',
                        borderTop: '1px solid #1e293b',
                        display: 'grid',
                        gridTemplateColumns: '1fr auto',
                        gap: '40px',
                        alignItems: 'start'
                    }}>
                        <div style={{ textAlign: 'right', gridColumn: '2' }}>
                            <div className="intp-price-reveal" style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '15px', marginBottom: '15px' }}>
                                <span className="intp-price-old" style={{
                                    textDecoration: 'line-through',
                                    color: '#64748b',
                                    fontSize: '1rem',
                                    fontFamily: 'monospace'
                                }}>{script.price_original}</span>
                                <span className="intp-price-new" style={{
                                    color: '#fff',
                                    fontSize: '2rem',
                                    fontWeight: 'bold',
                                    fontFamily: '"JetBrains Mono", monospace'
                                }}><PriceDisplay amountUSD={script.price_discounted} /></span>
                            </div>

                            <button
                                onClick={() => setIsCheckoutOpen(true)}
                                className="cta-button"
                                style={{
                                    background: '#7C7CFF',
                                    color: '#0A0E1A',
                                    border: 'none',
                                    padding: '16px 32px',
                                    fontSize: '1rem',
                                    fontFamily: '"JetBrains Mono", monospace',
                                    fontWeight: 'bold',
                                    cursor: 'pointer',
                                    borderRadius: '4px',
                                    boxShadow: '0 0 15px rgba(124, 124, 255, 0.3)',
                                    transition: 'all 0.2s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '10px'
                                }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.transform = 'translateY(-2px)';
                                    e.currentTarget.style.boxShadow = '0 0 25px rgba(124, 124, 255, 0.5)';
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.transform = 'translateY(0)';
                                    e.currentTarget.style.boxShadow = '0 0 15px rgba(124, 124, 255, 0.3)';
                                }}
                            >
                                <span>&gt; {script.cta_text}</span>
                            </button>

                            {!revealBonuses ? (
                                <div
                                    className="intp-bonus-trigger"
                                    onClick={() => setRevealBonuses(true)}
                                    style={{
                                        marginTop: '15px',
                                        fontSize: '0.8rem',
                                        color: '#64748b',
                                        cursor: 'pointer',
                                        fontFamily: 'monospace',
                                        textAlign: 'right',
                                        textDecoration: 'underline',
                                        opacity: 0.7
                                    }}
                                >
                                    View optional modules (+)
                                </div>
                            ) : (
                                <div style={{ marginTop: '20px', fontSize: '0.85rem', color: '#94a3b8', textAlign: 'right', background: 'rgba(16, 23, 42, 0.5)', padding: '15px', borderRadius: '4px', border: '1px solid #1e293b' }}>
                                    <div style={{ marginBottom: '10px', color: '#7C7CFF', fontWeight: 'bold' }}>INCLUDED MODULES:</div>
                                    {script.bonuses.map((b: any, i: number) => (
                                        <div key={i} style={{ marginBottom: '6px', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                            <span style={{ opacity: 0.5 }}>//</span>
                                            <span>{b.title}</span>
                                            <span style={{ color: '#7C7CFF', opacity: 0.8 }}>[<PriceDisplay amountUSD={b.value} />]</span>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </section>

                    {/* FOOTER */}
                    <footer style={{ borderTop: '1px solid #1e293b', paddingTop: '40px', color: '#475569', fontSize: '0.8rem', fontFamily: 'monospace' }}>
                        <p>{script.guarantee_text}</p>
                        <p style={{ marginTop: '10px' }}>{script.scarcity_text}</p>
                    </footer>

                </main>

                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }

    // --- ENTP DYNAMIC LAYOUT ---
    if (theme.layoutType === 'ENTP_DYNAMIC') {
        const { script } = product;

        return (
            <div className="product-page layout-entp-dynamic" style={{
                background: '#0B1020',
                minHeight: '100vh',
                color: '#fff',
                overflowX: 'hidden',
                '--primary': '#3DF5FF',
                '--accent-glow': '#3DF5FF'
            } as React.CSSProperties}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Back Button */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: '#3DF5FF', textDecoration: 'none',
                        background: 'rgba(11, 16, 32, 0.8)', padding: '5px 16px',
                        borderRadius: '4px', border: '1px solid rgba(61, 245, 255, 0.3)',
                        fontFamily: '"Space Grotesk", sans-serif', fontSize: '0.9rem', fontWeight: 'bold'
                    }}>
                        <span>←</span>
                        <span>BACK</span>
                    </Link>
                </div>

                {/* Logo */}
                <div style={{ position: 'absolute', top: '20px', right: '20px', zIndex: 1000 }}>
                    <img src="/images/logo.png" alt="Spiritual AI Logo" style={{ width: '60px', height: 'auto', filter: 'drop-shadow(0 0 10px rgba(255, 255, 255, 0.2))' }} />
                </div>

                {/* Header */}
                {/* Header removed to prevent overlap with Back button as per request */}


                <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 20px' }}>

                    {/* 1. HERO: CHAOS TO LEVERAGE */}
                    <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center', marginBottom: '120px' }}>
                        <div>
                            <h1 style={{ fontSize: 'clamp(2.5rem, 5vw, 4rem)', lineHeight: '1.1', fontWeight: '700', marginBottom: '20px', fontFamily: '"Space Grotesk", sans-serif' }}>
                                {script.headline}
                            </h1>
                            <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '40px', lineHeight: '1.4' }}>
                                {script.subheadline}
                            </p>

                            <div className="entp-subtext" style={{ fontSize: '1rem', color: '#3DF5FF', opacity: 0.8, fontStyle: 'italic' }}>
                                ( Subtext appears: {script.transition_mechanism} )
                            </div>
                        </div>

                        {/* Interactive Maze Visual */}
                        <div className="entp-maze-container" style={{ position: 'relative', height: '400px', border: '1px solid #3DF5FF', borderRadius: '12px', overflow: 'hidden', background: '#0B1020' }}>
                            <div style={{ position: 'absolute', inset: 0, opacity: 0.2, background: 'repeating-linear-gradient(45deg, #3DF5FF 0, #3DF5FF 1px, transparent 0, transparent 50%)', backgroundSize: '20px 20px' }}></div>

                            {product.script.image_url ? (
                                <img src={product.script.image_url} alt="Maze Glitch" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8, mixBlendMode: 'screen' }} />
                            ) : (
                                <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#3DF5FF', textAlign: 'center' }}>
                                    [ MAZE_GLITCH_VISUAL ]
                                </div>
                            )}

                            <div className="entp-glitch-overlay" style={{ position: 'absolute', bottom: '20px', right: '20px', background: '#000', padding: '10px', border: '1px solid #FF4ECD', color: '#FF4ECD', fontFamily: 'monospace', fontSize: '0.8rem' }}>
                                STATUS: SYSTEM_BROKEN
                            </div>
                        </div>
                    </section>


                    {/* 2. REAL BOTTLENECK (Collapsible) */}
                    <section style={{ marginBottom: '100px', maxWidth: '700px' }}>
                        <div style={{ cursor: 'pointer', borderBottom: '1px solid #334155', paddingBottom: '20px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.8rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                The Real Bottleneck
                                <span style={{ color: '#3DF5FF', fontSize: '1rem' }}>▼</span>
                            </h3>
                        </div>

                        <div>
                            <h4 style={{ fontSize: '1.4rem', color: '#FF4ECD', marginBottom: '20px' }}>Manuals Are for People Who Don’t Break Things</h4>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#cbd5e1', marginBottom: '30px' }}>
                                {script.pain_story}
                            </p>

                            <div style={{ background: '#131A33', padding: '30px', borderRadius: '8px', borderLeft: '4px solid #3DF5FF' }}>
                                <p style={{ color: '#94a3b8', marginBottom: '15px', fontWeight: 'bold' }}>THE SYSTEM EXPECTS YOU TO:</p>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                        <li key={i} style={{ marginBottom: '10px', color: '#fff', display: 'flex', alignItems: 'center', gap: '10px' }}>
                                            <span style={{ color: '#FF4ECD' }}>×</span> {typeof bullet === 'string' ? bullet : bullet.title}
                                        </li>
                                    ))}
                                </ul>
                                <p style={{ marginTop: '20px', fontStyle: 'italic', color: '#64748b' }}>(None of which were designed for people like you.)</p>
                            </div>
                        </div>
                    </section>


                    {/* 3. PARADIGM SHIFT */}
                    <section style={{ textAlign: 'center', margin: '120px 0' }}>
                        <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)', fontWeight: '900', color: '#fff', lineHeight: '1.1' }}>
                            YOU ARE NOT UNDISCIPLINED.<br />
                            <span style={{ color: '#3DF5FF' }}>YOU ARE IMPATIENT WITH INEFFICIENCY.</span>
                        </h2>
                        <div style={{ marginTop: '30px', fontSize: '1.2rem', color: '#94a3b8' }}>
                            &gt; Fair.
                        </div>
                    </section>


                    {/* 4. SPEEDRUNNER'S CODEX (Patch Notes) */}
                    <section style={{ marginBottom: '120px' }}>
                        <div style={{ marginBottom: '40px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontFamily: '"Space Grotesk"', marginBottom: '10px' }}>{script.product_name}</h2>
                            <p style={{ fontSize: '1.2rem', color: '#94a3b8' }}>{script.product_description}</p>
                        </div>

                        <div style={{ display: 'grid', gap: '20px' }}>
                            {script.features_bullets.map((feature, i) => {
                                const [title, desc] = feature.split(':');
                                return (
                                    <div key={i} className="entp-card" style={{ background: '#131A33', padding: '30px', borderRadius: '8px', border: '1px solid #1E293B', transition: 'transform 0.2s', cursor: 'default' }}>
                                        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '10px' }}>
                                            <h4 style={{ fontSize: '1.2rem', color: '#fff', fontWeight: 'bold' }}>⚡ {title}</h4>
                                            <span style={{ fontSize: '0.8rem', color: '#3DF5FF', background: 'rgba(61, 245, 255, 0.1)', padding: '2px 8px', borderRadius: '4px' }}>v1.{i}</span>
                                        </div>
                                        <p style={{ color: '#94a3b8', fontSize: '1rem' }}>{desc}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </section>


                    {/* 5. PRICING & CTA */}
                    <section style={{ background: '#0F1629', padding: '60px', borderRadius: '24px', textAlign: 'center', border: '1px solid #1E293B' }}>
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
                            <span style={{ textDecoration: 'line-through', color: '#64748b', fontSize: '1.5rem' }}>
                                <PriceDisplay amountUSD={script.price_original} />
                            </span>
                            <span style={{ color: '#fff', fontSize: '3rem', fontWeight: 'bold' }}>
                                <PriceDisplay amountUSD={script.price_discounted} showBadge />
                            </span>
                        </div>
                        <p style={{ color: '#FF4ECD', marginTop: '10px', fontSize: '1rem' }}>Cheap compared to waiting ten years.</p>


                        {/* Bonus */}
                        {script.bonuses.map((bonus, i) => (
                            <div key={i} style={{ marginTop: '40px', background: 'rgba(255, 78, 205, 0.05)', padding: '20px', borderRadius: '8px', border: '1px dashed #FF4ECD', display: 'inline-block', textAlign: 'left' }}>
                                <div style={{ fontSize: '0.9rem', color: '#FF4ECD', fontWeight: 'bold', marginBottom: '5px' }}>BONUS: {bonus.title}</div>
                                <div style={{ color: '#fff' }}>{bonus.description}</div>
                            </div>
                        ))}
                    </section>


                    {/* 6. PROMISE */}
                    <section style={{ margin: '80px 0', textAlign: 'center', opacity: 0.8 }}>
                        <div style={{ fontFamily: 'monospace', color: '#94a3b8', background: '#0F1629', display: 'inline-block', padding: '20px', borderRadius: '8px', borderLeft: '4px solid #3DF5FF', textAlign: 'left' }}>
                            <div style={{ color: '#3DF5FF', marginBottom: '10px', fontWeight: 'bold' }}>🛡️ THE SHORTCUT PROMISE</div>
                            <div>
                                {script.guarantee_text}
                            </div>
                        </div>
                    </section>


                    {/* 7. FOOTER */}
                    <footer style={{ textAlign: 'center', color: '#475569', fontSize: '0.9rem', paddingBottom: '40px' }}>
                        <p>&gt; Exploit patching soon.</p>
                        <p style={{ marginTop: '10px' }}>Secure Payment • Instant Digital Delivery • Lifetime Access</p>
                    </footer>

                </main>

                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }


    // --- ENTJ COMMAND LAYOUT ---
    if (theme.layoutType === 'ENTJ_COMMAND') {
        const { script } = product;

        return (
            <div className="product-page layout-entj-command" style={{ background: '#0C0F14', minHeight: '100vh', color: '#fff', fontFamily: '"Inter", sans-serif' }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Back Button */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: '#6b7280', textDecoration: 'none',
                        background: '#0C0F14', padding: '5px 16px',
                        border: '1px solid #1e293b',
                        fontFamily: '"Inter", sans-serif', fontSize: '0.75rem', fontWeight: 'bold', letterSpacing: '1px', textTransform: 'uppercase'
                    }}>
                        <span>←</span>
                        <span>Return to Command</span>
                    </Link>
                </div>

                <nav style={{ padding: '24px 40px', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #141923', alignItems: 'center', background: '#0C0F14' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                        <img src="/images/logo.png" alt="Logo" style={{ width: '30px', height: 'auto', opacity: 0.8 }} />
                        <div style={{ fontFamily: '"SF Pro Display", "Inter", sans-serif', lineHeight: 1 }}>
                            <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>ENTJ</span>
                            <span style={{ fontSize: '1.2rem', margin: '0 10px', color: '#334155' }}>//</span>
                            <span style={{ fontSize: '0.9rem', color: '#C1121F', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>The Commander</span>
                        </div>
                    </div>
                </nav>

                <main className="sales-container" style={{ maxWidth: '1000px', marginTop: '60px' }}>

                    {/* HERO */}
                    <div className="entj-hero-grid-inline">
                        <div>
                            <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>ENTJ EXCLUSIVE</div>
                            <h1 className="sales-heading" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
                                {script.headline}
                            </h1>
                            <div className="sales-subheading" style={{ borderLeft: '2px solid #C1121F', paddingLeft: '20px', color: '#E2E8F0', fontSize: '1.25rem' }}>
                                {script.subheadline}
                            </div>

                            <div className="entj-scroll-signal"></div>
                        </div>

                        <div style={{ position: 'relative' }}>
                            {script.image_url ? (
                                <img src={script.image_url} alt="Empire Execution" style={{ width: '100%', border: '1px solid #141923', display: 'block' }} />
                            ) : (
                                <div style={{ width: '100%', aspectRatio: '4/3', background: '#141923', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155' }}>NO_SIGNAL</div>
                            )}
                            <div className="entj-signal-line" style={{ position: 'absolute', bottom: '0', left: '0' }}></div>
                        </div>
                    </div>


                    {/* THE BOTTLENECK: Internal */}
                    <div style={{ marginBottom: '120px' }}>
                        <div style={{ borderTop: '1px solid #C1121F', width: '60px', marginBottom: '20px' }}></div>
                        <h2 className="sales-heading" style={{ fontSize: '2rem', marginBottom: '40px' }}>The Internal Bottleneck</h2>

                        <div className="entj-bottleneck-grid">
                            <div style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#94a3b8' }}>
                                <p style={{ marginBottom: '20px' }}>{script.pain_story}</p>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                    <div key={i} style={{ background: '#0E1116', padding: '16px', borderLeft: '2px solid #C1121F', fontSize: '0.9rem', color: '#e2e8f0' }}>
                                        {typeof bullet === 'string' ? bullet : bullet.title}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>


                    {/* PARADIGM SHIFT */}
                    <div style={{ background: '#0C0F14', borderTop: '1px solid #141923', borderBottom: '1px solid #141923', padding: '80px 0', marginBottom: '120px', textAlign: 'center' }}>
                        <div style={{ fontSize: '1rem', letterSpacing: '4px', opacity: 0.6, marginBottom: '20px', textTransform: 'uppercase' }}>Paradigm Shift</div>
                        <h2 className="sales-heading" style={{ fontSize: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>{script.transition_mechanism}</h2>
                    </div>


                    {/* THE PROTOCOL: Grid */}
                    <div style={{ marginBottom: '100px' }}>
                        <h3 className="sales-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>{product.title}</h3>
                        <p style={{ fontSize: '1.2rem', marginBottom: '60px', color: '#94a3b8' }}>{script.product_description}</p>

                        <div className="entj-protocol-grid">
                            {script.features_bullets.map((feature: string, i: number) => {
                                const parts = feature.split(':');
                                const title = parts[0];
                                const desc = parts.slice(1).join(':') || "Optimized for maximum leverage.";

                                return (
                                    <div key={i} className="entj-grid-module" style={{ background: '#0E1116', padding: '30px' }}>
                                        <div style={{ color: '#C1121F', display: 'block', width: '20px', height: '20px', background: '#C1121F', marginBottom: '20px' }}></div>
                                        <div style={{ color: '#fff', fontWeight: 'bold', marginBottom: '12px', fontSize: '1.1rem', textTransform: 'uppercase' }}>{title}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px' }}>{desc}</div>
                                        <div className="entj-metric-badge" style={{ marginTop: 'auto', alignSelf: 'flex-start' }}>
                                            {i === 0 ? '+24/7 UPTIME' : i === 1 ? 'GOD MODE' : 'AUTO-PILOT'}
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>


                    {/* DEPLOYMENT */}
                    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '100px' }}>
                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="cta-button"
                            style={{ background: '#C1121F', color: '#fff', fontSize: '1.2rem', padding: '24px 48px', fontWeight: 'bold', border: 'none', cursor: 'pointer', width: '100%', marginBottom: '30px', textTransform: 'uppercase', letterSpacing: '1px' }}
                        >
                            {script.cta_text}
                        </button>

                        <div style={{ marginBottom: '40px', fontFamily: '"JetBrains Mono", monospace' }}>
                            <span style={{ textDecoration: 'line-through', opacity: 0.5, marginRight: '15px', fontSize: '1.2rem' }}><PriceDisplay amountUSD={script.price_original} /></span>
                            <span style={{ color: '#fff', fontWeight: 'bold', fontSize: '2rem' }}><PriceDisplay amountUSD={script.price_discounted} showBadge /></span>
                        </div>

                        <div style={{ textAlign: 'left' }}>
                            {script.bonuses.map((b: any, i: number) => (
                                <div key={i} style={{ borderTop: '1px solid #1e293b', padding: '20px 0' }}>
                                    <div style={{ fontSize: '0.9rem', color: '#C1121F', fontWeight: 'bold', marginBottom: '5px' }}>BONUS</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 'bold', marginBottom: '5px' }}>{b.title}</div>
                                    <div style={{ color: '#6b7280', fontSize: '0.9rem' }}>{b.description} <span style={{ opacity: 0.6 }}>({b.value} value)</span></div>
                                </div>
                            ))}
                        </div>
                    </div>


                    {/* GUARANTEE */}
                    <div className="entj-guarantee" style={{ maxWidth: '600px', margin: '0 auto', border: '1px solid #C1121F', padding: '40px', background: 'rgba(193, 18, 31, 0.05)', position: 'relative' }}>
                        <div style={{ position: 'absolute', top: '-10px', left: '20px', background: '#0C0F14', padding: '0 10px', color: '#C1121F', fontSize: '0.8rem', fontWeight: 'bold' }}>THE EFFICIENCY THEOREM</div>
                        <p style={{ margin: 0, lineHeight: '1.6', fontFamily: '"JetBrains Mono", monospace', color: '#e2e8f0' }}>
                            {script.guarantee_text}
                        </p>
                    </div>


                    {/* FOOTER */}
                    <footer style={{ marginTop: '100px', borderTop: '1px solid #141923', paddingTop: '40px', fontSize: '0.8rem', color: '#4b5563', textAlign: 'center', paddingBottom: '40px' }}>
                        <p style={{ marginBottom: '10px' }}>{script.scarcity_text}</p>
                        <p>Secure Payment • Instant Digital Delivery • Lifetime Access</p>
                    </footer>

                </main>

                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }

    // --- ENTJ IMPERIAL LAYOUT ---
    if (theme.layoutType === 'ENTJ_IMPERIAL') {
        const { script } = product;
        return (
            <div className="product-page layout-entj-imperial" style={{
                backgroundColor: '#0B0D12',
                color: '#ffffff',
                fontFamily: '"Inter", "SF Pro Display", system-ui, sans-serif',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Back Button */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: '#6D28D9', textDecoration: 'none',
                        background: '#0B0D12', padding: '5px 16px',
                        border: '1px solid #6D28D9',
                        fontFamily: '"Inter", sans-serif', fontSize: '0.8rem', fontWeight: '600', letterSpacing: '1px', textTransform: 'uppercase'
                    }}>
                        <span>←</span>
                        <span>BACK</span>
                    </Link>
                </div>
                {/* NAV */}
                <nav style={{
                    padding: '24px 40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    borderBottom: '1px solid #141923',
                    fontSize: '0.8rem',
                    letterSpacing: '1px',
                    color: '#4B5563'
                }}>
                    <Link href="/" style={{ color: '#4B5563', textDecoration: 'none', textTransform: 'uppercase' }}>Home</Link>
                    <span style={{ margin: '0 10px' }}>/</span>
                    <span style={{ color: '#6D28D9', fontWeight: '600', textTransform: 'uppercase' }}>The Commander (ENTJ)</span>
                </nav>

                <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>

                    {/* HERO */}
                    <header style={{ marginTop: '80px', marginBottom: '120px', textAlign: 'center' }}>
                        <div style={{
                            color: '#6D28D9',
                            fontSize: '0.9rem',
                            fontWeight: '700',
                            letterSpacing: '2px',
                            marginBottom: '24px',
                            textTransform: 'uppercase'
                        }}>
                            ENTJ EXCLUSIVE
                        </div>
                        <h1 style={{
                            fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                            fontWeight: '600',
                            letterSpacing: '-1px', // Tight tracking
                            lineHeight: '1.1',
                            marginBottom: '30px',
                            color: '#fff'
                        }}>
                            {script.headline}
                        </h1>
                        <div style={{
                            fontSize: '1.25rem',
                            color: '#9CA3AF',
                            marginBottom: '60px',
                            lineHeight: '1.6',
                            maxWidth: '700px',
                            marginLeft: 'auto',
                            marginRight: 'auto'
                        }}>
                            {script.subheadline}
                        </div>

                        {/* VISUAL ANALOGUE */}
                        <div style={{
                            position: 'relative',
                            width: '100%',
                            maxWidth: '600px',
                            margin: '0 auto',
                            border: '1px solid #121520',
                            aspectRatio: '16/9',
                            background: '#0B0D12',
                            overflow: 'hidden',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}>
                            {product.script.image_url ? (
                                <img src={product.script.image_url} alt="System Visual" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} />
                            ) : (
                                <div style={{ color: '#6D28D9', /* Imperial Purple */ letterSpacing: '2px', fontSize: '0.8rem' }}>
                                    SYSTEM_VISUAL_MOUNTED
                                </div>
                            )}
                            {/* Decorative thin purple lines */}
                            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '1px', background: 'linear-gradient(90deg, transparent, #6D28D9, transparent)' }}></div>
                            <div style={{ position: 'absolute', top: '20%', left: 0, width: '100%', height: '1px', background: 'rgba(109, 40, 217, 0.2)' }}></div>
                            <div style={{ position: 'absolute', top: '80%', left: 0, width: '100%', height: '1px', background: 'rgba(109, 40, 217, 0.2)' }}></div>
                            <div style={{ position: 'absolute', top: 0, left: '50%', height: '100%', width: '1px', background: 'rgba(109, 40, 217, 0.2)' }}></div>
                        </div>
                    </header>

                    {/* INTERNAL BOTTLENECK */}
                    <section className="entj-imperial-bottleneck-grid">
                        <div>
                            <div style={{ color: '#6D28D9', fontSize: '0.9rem', marginBottom: '20px', fontWeight: 'bold' }}>THE INTERNAL BOTTLENECK</div>
                            <h2 style={{ fontSize: '2.5rem', lineHeight: '1.2', marginBottom: '30px', fontWeight: '600' }}>
                                This Is Not a People Problem.<br />
                                It Is a Systems Problem.
                            </h2>
                            <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#D1D5DB', marginBottom: '30px' }}>
                                {script.pain_story}
                            </p>
                            <div style={{ height: '1px', width: '100px', background: '#6D28D9', marginBottom: '30px' }}></div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginTop: '40px' }}>
                            {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                <div key={i} style={{
                                    borderLeft: '2px solid #1E1E2E',
                                    paddingLeft: '20px',
                                    color: '#9CA3AF',
                                    fontSize: '1rem',
                                    lineHeight: '1.6'
                                }}>
                                    {typeof bullet === 'string' ? bullet : bullet.title}
                                </div>
                            ))}
                        </div>
                    </section>

                </main>

                {/* PARADIGM SHIFT */}
                <div style={{
                    width: '100%',
                    background: '#121520',
                    borderTop: '1px solid #6D28D9', // Divider snaps in
                    borderBottom: '1px solid #141923',
                    padding: '80px 20px',
                    textAlign: 'center',
                    marginBottom: '120px'
                }}>
                    <div style={{ color: '#6D28D9', fontSize: '1rem', letterSpacing: '4px', textTransform: 'uppercase', marginBottom: '20px' }}>
                        THE PARADIGM SHIFT
                    </div>
                    <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: '700', color: '#fff' }}>
                        {script.transition_mechanism}
                    </h2>
                </div>


                <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 20px' }}>

                    {/* THE EMPIRE OF ONE PROTOCOL */}
                    <section style={{ marginBottom: '160px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontSize: '2.5rem', fontWeight: '600', marginBottom: '16px' }}>{product.title}</h2>
                            <p style={{ fontSize: '1.2rem', color: '#9CA3AF' }}>{script.product_description}</p>
                        </div>

                        {/* GRID MODULES */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                            gap: '1px',
                            background: '#1F2937', // Gap color
                            border: '1px solid #1F2937'
                        }}>
                            {script.features_bullets.map((feature: string, i: number) => {
                                // Parse badge: "Module Desc | Badge Text"
                                const splitted = feature.split('|');
                                const textPart = splitted[0].trim();
                                const badgePart = splitted[1] ? splitted[1].trim() : null;

                                const [title, desc] = textPart.includes(':') ? textPart.split(':') : [textPart, ''];

                                return (
                                    <div key={i} style={{
                                        background: '#0B0D12',
                                        padding: '40px',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        height: '100%'
                                    }}>
                                        <div style={{ width: '12px', height: '12px', background: '#6D28D9', marginBottom: '24px' }}></div>
                                        <h3 style={{ fontSize: '1.25rem', fontWeight: '700', marginBottom: '12px', color: '#E0E7FF' }}>
                                            {title}
                                        </h3>
                                        <p style={{ fontSize: '1rem', color: '#9CA3AF', lineHeight: '1.6', marginBottom: '30px', flexGrow: 1 }}>
                                            {desc}
                                        </p>
                                        {badgePart && (
                                            <div style={{
                                                alignSelf: 'flex-start',
                                                border: '1px solid #6D28D9',
                                                color: '#A78BFA',
                                                fontSize: '0.75rem',
                                                padding: '4px 12px',
                                                fontWeight: '600',
                                                textTransform: 'uppercase',
                                                letterSpacing: '1px'
                                            }}>
                                                {badgePart}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </section>


                    {/* PRIMARY ACTION ZONE */}
                    <section style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', marginBottom: '160px' }}>
                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            className="cta-button-entj"
                            style={{
                                background: '#6D28D9',
                                color: '#fff',
                                width: '100%',
                                padding: '24px',
                                fontSize: '1.25rem',
                                fontWeight: '700',
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '1px',
                                marginBottom: '40px',
                                transition: 'background 0.2s'
                            }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = '#5B21B6')}
                            onMouseLeave={(e) => (e.currentTarget.style.background = '#6D28D9')}
                        >
                            {script.cta_text}
                        </button>

                        {/* PRICING */}
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'baseline', gap: '20px', marginBottom: '10px' }}>
                            <span style={{ fontSize: '1.5rem', color: '#4B5563', textDecoration: 'line-through' }}><PriceDisplay amountUSD={script.price_original} /></span>
                            <span style={{ fontSize: '3.5rem', fontWeight: '700', color: '#fff', fontFamily: 'monospace' }}><PriceDisplay amountUSD={script.price_discounted} showBadge /></span>
                        </div>
                        <p style={{ color: '#6D28D9', fontSize: '1rem', marginBottom: '60px', fontWeight: '500' }}>
                            Priced to exclude amateurs.
                        </p>

                        {/* BONUSES */}
                        <div style={{ textAlign: 'left', borderTop: '1px solid #1F2937' }}>
                            {script.bonuses.map((bonus: any, i: number) => (
                                <div key={i} style={{
                                    padding: '24px 0',
                                    borderBottom: '1px solid #1F2937',
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center'
                                }}>
                                    <div>
                                        <div style={{ fontSize: '0.8rem', color: '#6D28D9', fontWeight: '700', textTransform: 'uppercase', marginBottom: '4px' }}>BONUS</div>
                                        <div style={{ fontSize: '1.1rem', fontWeight: '600' }}>{bonus.title}</div>
                                        <div style={{ fontSize: '0.9rem', color: '#9CA3AF' }}>{bonus.description}</div>
                                    </div>
                                    <div style={{ color: '#4B5563', fontWeight: '600' }}>
                                        <PriceDisplay amountUSD={bonus.value} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* THE ENTJ PROMISE */}
                    <section style={{ maxWidth: '600px', margin: '0 auto', marginBottom: '160px' }}>
                        <div style={{
                            border: '1px solid #6D28D9',
                            padding: '40px',
                            background: 'rgba(109, 40, 217, 0.05)',
                            position: 'relative'
                        }}>
                            <div style={{
                                position: 'absolute',
                                top: '-12px',
                                left: '30px',
                                background: '#0B0D12', // Match bg
                                padding: '0 10px',
                                color: '#6D28D9',
                                fontWeight: '700',
                                fontSize: '0.9rem'
                            }}>
                                🛡️ THE EFFICIENCY THEOREM
                            </div>
                            <p style={{
                                fontFamily: 'monospace',
                                fontSize: '1rem',
                                lineHeight: '1.6',
                                color: '#E5E7EB',
                                margin: 0
                            }}>
                                {script.guarantee_text}
                            </p>
                        </div>
                    </section>


                    {/* FOOTER */}
                    <footer style={{
                        textAlign: 'center',
                        color: '#4B5563',
                        fontSize: '0.85rem',
                        paddingBottom: '60px',
                        borderTop: '1px solid #141923',
                        paddingTop: '60px'
                    }}>
                        <p style={{ marginBottom: '12px' }}>{script.scarcity_text}</p>
                        <p>Secure Payment • Instant Digital Delivery • Lifetime Access</p>
                    </footer>

                </main>

                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        );
    }

    // --- INFJ ADVOCATE LAYOUT ---
    if (theme.layoutType === 'INFJ_ADVOCATE') {
        const { script } = product;

        return (
            <div className="product-page layout-infj-advocate" style={{
                backgroundColor: '#F4F6F0', // Sage/Paper
                color: '#2D313A', // Darker soft slate for readability
                fontFamily: '"Nunito", "Mulish", sans-serif',
                minHeight: '100vh',
                overflowX: 'hidden',
                lineHeight: '1.8'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Back Button - Gentle text link */}
                <div style={{ position: 'absolute', top: '30px', left: '30px', zIndex: 100 }}>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                        color: '#4B5563',
                        textDecoration: 'none',
                        fontFamily: '"Lora", serif',
                        fontStyle: 'italic',
                        fontSize: '1rem',
                        transition: 'all 0.3s ease',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                    }}>
                        <span>←</span>
                        <span style={{ borderBottom: '1px solid transparent' }}
                            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#4B5563'}
                            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'transparent'}>
                            return
                        </span>
                    </Link>
                </div>

                <nav style={{ padding: '30px', textAlign: 'center' }}>
                    <Link href="/" style={{ color: '#4B5563', textDecoration: 'none', textTransform: 'uppercase', letterSpacing: '2px', fontSize: '0.75rem' }}>Home</Link>
                    <span style={{ margin: '0 15px', color: '#BBD0FF' }}>•</span>
                    <span style={{ color: '#8e94f2', letterSpacing: '2px', fontSize: '0.75rem', textTransform: 'uppercase' }}>The Advocate</span>
                </nav>

                <main style={{ maxWidth: '700px', margin: '0 auto', padding: '60px 20px 120px' }}>

                    {/* 1. EMPATHY ANCHOR (Hero) */}
                    <header style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            style={{
                                color: '#8e94f2',
                                fontSize: '0.9rem',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                marginBottom: '40px',
                                fontWeight: '600'
                            }}>
                            INFJ Exclusive
                        </motion.div>
                        <motion.h1
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.3 }}
                            style={{
                                fontFamily: '"Lora", serif',
                                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', // Slightly smaller max to accommodate longer titles
                                fontWeight: '400',
                                color: '#2D313A',
                                lineHeight: '1.3',
                                marginBottom: '20px'
                            }}>
                            {product.title}
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 1, delay: 0.6 }}
                            style={{
                                fontSize: '1.3rem', // Larger for the poetic hook
                                fontStyle: 'italic',
                                color: '#4B5563',
                                maxWidth: '600px',
                                margin: '0 auto',
                                lineHeight: '1.6'
                            }}>
                            {script.headline}
                        </motion.p>
                    </header>


                    {/* 2. THE UNSPOKEN EXHAUSTION (Validation) */}
                    <section style={{ marginBottom: '120px' }}>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.2 }}
                            style={{
                                textAlign: 'center',
                                marginBottom: '60px',
                                display: 'flex',
                                justifyContent: 'center'
                            }}>
                            <motion.img
                                animate={{
                                    scale: [1, 1.02, 1],
                                    borderRadius: [
                                        "60% 40% 30% 70% / 60% 30% 70% 40%",
                                        "30% 60% 70% 40% / 50% 60% 30% 60%",
                                        "60% 40% 30% 70% / 60% 30% 70% 40%"
                                    ]
                                }}
                                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                                src={product.script.image_url}
                                alt="Symbolic Representation"
                                style={{
                                    width: '100%',
                                    maxWidth: '400px',
                                    // Transform Dark/Neon -> Light/Ink
                                    filter: 'invert(1) hue-rotate(180deg) sepia(0.2) saturate(1.5)',
                                    mixBlendMode: 'multiply',
                                    opacity: 0.85,
                                    boxShadow: 'inset 0 0 40px rgba(255,255,255,0.5)'
                                }}
                            />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            style={{ textAlign: 'left' }}>
                            <h2 style={{
                                fontFamily: '"Lora", serif',
                                fontSize: '1.8rem',
                                color: '#2D313A',
                                marginBottom: '40px',
                                textAlign: 'center'
                            }}>The Unspoken Exhaustion</h2>

                            <p style={{ fontSize: '1.15rem', color: '#2D313A', marginBottom: '40px' }}>
                                {script.pain_story}
                            </p>

                            <div style={{
                                borderLeft: '3px solid #BBD0FF',
                                paddingLeft: '30px',
                                margin: '40px 0'
                            }}>
                                <p style={{ color: '#4B5563', marginBottom: '20px', fontSize: '0.95rem', letterSpacing: '1px', textTransform: 'uppercase', fontWeight: 'bold' }}>How it feels</p>
                                {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                    <p key={i} style={{ fontSize: '1.1rem', marginBottom: '15px', color: '#4B5563' }}>
                                        {typeof bullet === 'string' ? bullet : bullet.title}
                                    </p>
                                ))}
                            </div>
                        </motion.div>
                    </section>


                    {/* 3. PARADIGM SHIFT (Gentle Reframing) */}
                    <motion.section
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -5, boxShadow: '0 20px 80px rgba(142, 148, 242, 0.15)' }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        style={{
                            backgroundColor: '#fff',
                            padding: '60px',
                            borderRadius: '4px',
                            boxShadow: '0 10px 60px rgba(0,0,0,0.03)',
                            textAlign: 'center',
                            marginBottom: '120px',
                            border: '1px solid rgba(142, 148, 242, 0.1)',
                            cursor: 'default'
                        }}>
                        <p style={{ fontSize: '1.2rem', color: '#8e94f2', fontStyle: 'italic', marginBottom: '20px' }}>The Paradigm Shift</p>
                        <h2 style={{
                            fontFamily: '"Lora", serif',
                            fontSize: '1.8rem',
                            lineHeight: '1.5',
                            color: '#2D313A'
                        }}>
                            {script.transition_mechanism}
                        </h2>
                    </motion.section>


                    {/* 4. THE GUARDIAN PROTOCOL (Solution) */}
                    <section style={{ marginBottom: '120px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <h2 style={{ fontFamily: '"Lora", serif', fontSize: '2.2rem', marginBottom: '20px', color: '#2D313A' }}>{product.title}</h2>
                            <p style={{ fontSize: '1.1rem', color: '#4B5563' }}>{script.product_description}</p>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                            {script.features_bullets.map((feature: string, i: number) => {
                                return (
                                    <motion.div
                                        key={i}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: i * 0.2, duration: 0.8 }}
                                        style={{ display: 'flex', gap: '25px', alignItems: 'baseline' }}>
                                        <span style={{ color: '#BBD0FF', fontSize: '1.8rem', fontFamily: '"Lora", serif', fontWeight: 'bold' }}>0{i + 1}</span>
                                        <p style={{ fontSize: '1.15rem', lineHeight: '1.7', color: '#2D313A' }}>{feature}</p>
                                    </motion.div>
                                )
                            })}
                        </div>
                    </section>


                    {/* 5. INVITATION (CTA) */}
                    <section style={{ textAlign: 'center', marginBottom: '100px' }}>
                        <div style={{ marginBottom: '40px' }}>
                            <p style={{ color: '#4B5563', fontStyle: 'italic', marginBottom: '20px' }}>Invitation</p>
                            <h3 style={{ fontFamily: '"Lora", serif', fontSize: '2rem', marginBottom: '10px', color: '#2D313A' }}>{script.cta_text}</h3>
                        </div>

                        <motion.button
                            onClick={() => setIsCheckoutOpen(true)}
                            whileHover={{ scale: 1.05, backgroundColor: '#8e94f2', color: '#fff' }}
                            whileTap={{ scale: 0.98 }}
                            className="cta-button-infj"
                            style={{
                                background: 'transparent',
                                color: '#2D313A',
                                border: '1px solid #8e94f2',
                                padding: '18px 48px',
                                fontSize: '1.1rem',
                                borderRadius: '50px',
                                fontFamily: '"Lora", serif',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s ease, color 0.3s ease',
                                marginBottom: '30px'
                            }}
                        >
                            {script.cta_text}
                        </motion.button>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', alignItems: 'center', color: '#4B5563', fontSize: '0.9rem' }}>
                            <span style={{ textDecoration: 'line-through', opacity: 0.6 }}>
                                <PriceDisplay amountUSD={script.price_original} />
                            </span>
                            <span>→</span>
                            <span style={{ color: '#8e94f2', fontWeight: 'bold', fontSize: '1.1rem' }}>
                                <PriceDisplay amountUSD={script.price_discounted} showBadge />
                            </span>
                        </div>

                        {/* Bonuses */}
                        <div style={{ marginTop: '40px', fontSize: '0.95rem', color: '#4B5563' }}>
                            {script.bonuses.map((b: any, i: number) => (
                                <div key={i}>
                                    Plus: <span style={{ fontWeight: '600' }}>{b.title}</span> <span style={{ opacity: 0.7 }}>({b.description})</span>
                                </div>
                            ))}
                        </div>
                    </section>


                    {/* 6. THE PEACE PROMISE (Guarantee) */}
                    <section style={{
                        textAlign: 'center',
                        maxWidth: '500px',
                        margin: '0 auto',
                        borderTop: '1px solid rgba(0,0,0,0.05)',
                        paddingTop: '60px'
                    }}>
                        <div style={{ fontSize: '1.5rem', marginBottom: '20px' }}>🕊️</div>
                        <h4 style={{ fontFamily: '"Lora", serif', fontSize: '1.1rem', marginBottom: '15px', textTransform: 'uppercase', letterSpacing: '2px', color: '#2D313A' }}>The Peace Promise</h4>
                        <p style={{ fontSize: '1rem', lineHeight: '1.7', color: '#4B5563' }}>
                            {script.guarantee_text}
                        </p>
                    </section>


                    {/* FOOTER */}
                    <footer style={{
                        textAlign: 'center',
                        color: '#6B7280',
                        fontSize: '0.8rem',
                        marginTop: '100px',
                        opacity: 0.8
                    }}>
                        <p>{script.scarcity_text}</p>
                        <p style={{ marginTop: '10px' }}>Secure Payment • Instant Delivery • Lifetime Access</p>
                    </footer>

                </main>

                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}

                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }

    // --- ISTP VIRTUOSO LAYOUT ---
    if (theme.layoutType === 'ISTP_VIRTUOSO') {
        const { script } = product;
        return (
            <div className="product-page layout-istp-virtuoso" style={{
                backgroundColor: '#000000', // Absolute Black for contrast
                color: '#E0E0E0',
                fontFamily: '"JetBrains Mono", "Consolas", monospace', // Utilitarian font
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Back Button */}
                <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{
                        display: 'flex', alignItems: 'center', gap: '8px',
                        color: '#00FF41', // Matrix Green/High Vis
                        textDecoration: 'none',
                        background: '#111', padding: '5px 16px',
                        border: '1px solid #00FF41',
                        fontSize: '0.9rem', fontWeight: 'bold'
                    }}>
                        <span>{'<'}</span>
                        <span>BACK_TO_INDEX</span>
                    </Link>
                </div>

                <nav style={{ padding: '20px', borderBottom: '1px solid #333', textAlign: 'right', fontFamily: 'monospace', color: '#666' }}>
                    <span style={{ color: '#00FF41' }}>USER:</span> GUEST // <span style={{ color: '#00FF41' }}>TYPE:</span> ISTP
                </nav>

                <main style={{ maxWidth: '900px', margin: '0 auto', padding: '60px 20px' }}>

                    {/* 1. HERO - SCHEMATIC STYLE */}
                    <div style={{
                        border: '1px solid #333',
                        padding: '40px',
                        position: 'relative',
                        marginBottom: '80px',
                        background: 'repeating-linear-gradient(45deg, #050505, #050505 10px, #0a0a0a 10px, #0a0a0a 20px)'
                    }}>
                        <div style={{ position: 'absolute', top: '-10px', left: '20px', background: '#000', padding: '0 10px', color: '#00FF41', fontSize: '0.8rem' }}>
                            PROJECT_SPECIFICATION
                        </div>

                        <h1 style={{
                            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                            fontFamily: 'monospace',
                            color: '#FFFFFF',
                            marginBottom: '20px',
                            textTransform: 'uppercase',
                            letterSpacing: '-1px'
                        }}>
                            {script.headline}
                        </h1>

                        <p style={{
                            fontSize: '1.2rem',
                            color: '#CCCCCC',
                            fontFamily: 'monospace',
                            borderLeft: '4px solid #00FF41',
                            paddingLeft: '20px',
                            marginBottom: '40px'
                        }}>
                            {script.subheadline}
                        </p>

                        <div style={{ border: '1px dashed #666', padding: '10px', display: 'inline-block', color: '#666', fontSize: '0.8rem' }}>
                            STATUS: VISUAL_RENDER_PENDING <br />
                            SRC: {product.script.image_url || "NULL"}
                        </div>
                        {product.script.image_url && (
                            <img src={product.script.image_url} alt="Schematic" style={{ marginTop: '20px', width: '100%', filter: 'grayscale(100%) contrast(1.2)', border: '1px solid #333' }} />
                        )}
                    </div>

                    {/* 2. THE PROBLEM - DIAGNOSTIC REPORT */}
                    <div style={{ marginBottom: '100px' }}>
                        <h2 style={{ color: '#00FF41', fontSize: '1.5rem', fontFamily: 'monospace', marginBottom: '30px' }}>
                            {'>'} RUNNING_DIAGNOSTIC...
                        </h2>

                        <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
                            <div style={{ border: '1px solid #333', padding: '30px' }}>
                                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px' }}>ERROR LOG (PAIN POINTS)</h3>
                                <p style={{ color: '#aaa', lineHeight: '1.6', fontFamily: 'monospace' }}>
                                    {script.pain_story}
                                </p>
                            </div>

                            <div style={{ border: '1px solid #333', padding: '30px' }}>
                                <h3 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '15px' }}>SYSTEM FAILURES</h3>
                                <ul style={{ listStyle: 'none', padding: 0 }}>
                                    {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                        <li key={i} style={{ marginBottom: '15px', color: '#ff3333', display: 'flex', gap: '10px' }}>
                                            <span>[!]</span>
                                            <span>{typeof bullet === 'string' ? bullet : bullet.title}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    {/* 3. THE FIX - TOOLKIT */}
                    <div style={{ marginBottom: '100px' }}>
                        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                            <span style={{ background: '#00FF41', color: '#000', padding: '5px 10px', fontWeight: 'bold' }}>SOLUTION_FOUND</span>
                            <h2 style={{ fontSize: '2.5rem', color: '#fff', marginTop: '20px', fontFamily: 'monospace' }}>{script.transition_mechanism}</h2>
                        </div>

                        <div style={{ borderTop: '2px solid #333', borderBottom: '2px solid #333' }}>
                            {script.features_bullets.map((feature: string, i: number) => (
                                <div key={i} style={{
                                    padding: '30px',
                                    borderBottom: '1px solid #222',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '20px'
                                }}>
                                    <div style={{ fontSize: '2rem', color: '#00FF41', opacity: 0.5 }}>0{i + 1}</div>
                                    <div style={{ fontFamily: 'monospace', color: '#ddd' }}>{feature}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* 4. ACQUISITION */}
                    <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center', border: '2px solid #00FF41', padding: '40px' }}>
                        <h3 style={{ color: '#00FF41', marginBottom: '20px' }}>READY TO DEPLOY?</h3>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '30px' }}>
                            <span style={{ textDecoration: 'line-through', color: '#666' }}>
                                <PriceDisplay amountUSD={script.price_original} />
                            </span>
                            <span style={{ fontSize: '2.5rem', color: '#fff' }}>
                                <PriceDisplay amountUSD={script.price_discounted} showBadge />
                            </span>
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            style={{
                                background: '#00FF41',
                                color: '#000',
                                border: 'none',
                                padding: '20px 40px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                fontFamily: 'monospace',
                                cursor: 'pointer',
                                width: '100%',
                                textTransform: 'uppercase'
                            }}
                        >
                            {'>'} {script.cta_text}
                        </button>

                        <div style={{ marginTop: '20px', fontSize: '0.9rem', color: '#888' }}>
                            {script.guarantee_text}
                        </div>
                    </div>

                </main>
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }

    // --- ESFJ CONSUL LAYOUT ---
    if (theme.layoutType === 'ESFJ_CONSUL') {
        const { script } = product;
        return (
            <div className="product-page layout-esfj-consul" style={{
                backgroundColor: '#FFFBF0', // Warm Cream
                color: '#4A4A4A',
                fontFamily: '"Outfit", sans-serif',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Custom Nav */}
                <div style={{ background: '#fff', padding: '20px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{ textDecoration: 'none', color: '#666', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <span>← Back to Community</span>
                    </Link>
                    <div style={{ fontWeight: 'bold', color: '#F2CC8F' }}>ESFJ • THE CONSUL</div>
                </div>

                <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px' }}>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h1 style={{ fontSize: '3rem', color: '#2C3E50', marginBottom: '20px', lineHeight: '1.2' }}>{script.headline}</h1>
                        <p style={{ fontSize: '1.3rem', color: '#7f8c8d', maxWidth: '600px', margin: '0 auto' }}>{script.subheadline}</p>
                    </div>

                    {/* Warm Image Frame */}
                    <div style={{
                        padding: '20px',
                        background: '#fff',
                        borderRadius: '20px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                        marginBottom: '80px',
                        textAlign: 'center'
                    }}>
                        {product.script.image_url && (
                            <img src={product.script.image_url} alt="Community" style={{ width: '100%', borderRadius: '12px' }} />
                        )}
                        <div style={{ marginTop: '20px', fontStyle: 'italic', color: '#95a5a6' }}>
                            "Designed with your loved ones in mind."
                        </div>
                    </div>

                    {/* Story / Connection */}
                    <div style={{ background: '#fff', padding: '40px', borderRadius: '16px', marginBottom: '60px', borderLeft: '6px solid #F2CC8F' }}>
                        <h2 style={{ fontSize: '1.8rem', marginBottom: '20px', color: '#E67E22' }}>Let's be honest...</h2>
                        <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#555' }}>
                            {script.pain_story}
                        </p>
                        <ul style={{ marginTop: '30px', listStyle: 'none', padding: 0 }}>
                            {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                <li key={i} style={{ padding: '10px 0', borderBottom: '1px solid #eee', display: 'flex', gap: '10px', alignItems: 'center' }}>
                                    <span style={{ color: '#E74C3C' }}>❤</span> {typeof bullet === 'string' ? bullet : bullet.title}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* How It Helps */}
                    <div style={{ marginBottom: '80px' }}>
                        <h2 style={{ textAlign: 'center', marginBottom: '40px', color: '#2C3E50' }}>How this supports you & yours</h2>
                        <div style={{ display: 'grid', gap: '20px' }}>
                            {script.features_bullets.map((feature: string, i: number) => (
                                <div key={i} style={{ background: '#fff', padding: '25px', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.03)' }}>
                                    <div style={{ fontWeight: 'bold', color: '#F2CC8F', marginBottom: '5px' }}>Benefit {i + 1}</div>
                                    <div style={{ color: '#555' }}>{feature}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Join Us CTA */}
                    <div style={{ background: '#2C3E50', color: '#fff', padding: '50px', borderRadius: '20px', textAlign: 'center' }}>
                        <h2 style={{ marginBottom: '20px', color: '#F2CC8F' }}>Join the Family</h2>
                        <p style={{ marginBottom: '30px', opacity: 0.8 }}>{script.guarantee_text}</p>

                        <div style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '10px' }}>
                            <PriceDisplay amountUSD={script.price_discounted} showBadge />
                        </div>
                        <div style={{ textDecoration: 'line-through', opacity: 0.6, marginBottom: '30px' }}>
                            <PriceDisplay amountUSD={script.price_original} />
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            style={{
                                background: '#F2CC8F',
                                color: '#2C3E50',
                                padding: '20px 50px',
                                fontSize: '1.2rem',
                                borderRadius: '50px',
                                border: 'none',
                                fontWeight: 'bold',
                                cursor: 'pointer',
                                boxShadow: '0 10px 20px rgba(242, 204, 143, 0.3)'
                            }}
                        >
                            {script.cta_text}
                        </button>
                    </div>

                </main>
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}
                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }

    // --- ESTJ EXECUTIVE LAYOUT ---
    if (theme.layoutType === 'ESTJ_EXECUTIVE') {
        const { script } = product;
        return (
            <div className="product-page layout-estj-executive" style={{
                backgroundColor: '#F1F5F9', // Slate-100 (Clean, Professional)
                color: '#0F172A', // Slate-900
                fontFamily: '"Inter", sans-serif',
                minHeight: '100vh',
                overflowX: 'hidden'
            }}>
                {jsonLd && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />}{/* Top Bar - Dashboard Style */}
                <div style={{ background: '#0F172A', color: '#fff', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ fontWeight: 'bold', letterSpacing: '1px' }}>ESTJ // EXECUTIVE DASHBOARD</div>
                    <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', border: '1px solid #fff', padding: '5px 15px' }}>
                        CLOSE FILE
                    </Link>
                </div>

                <main style={{ maxWidth: '1000px', margin: '0 auto', padding: '40px' }}>

                    {/* Executive Summary (Hero) */}
                    <div style={{ background: '#fff', border: '1px solid #ccc', padding: '40px', marginBottom: '40px', boxShadow: '0 2px 5px rgba(0,0,0,0.05)' }}>
                        <div style={{ textTransform: 'uppercase', color: '#64748B', fontSize: '0.8rem', fontWeight: 'bold', marginBottom: '10px' }}>EXECUTIVE SUMMARY</div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', marginBottom: '20px', color: '#0F172A' }}>{script.headline}</h1>
                        <h2 style={{ fontSize: '1.2rem', fontWeight: '600', color: '#334155', marginBottom: '30px', borderBottom: '2px solid #0F172A', paddingBottom: '20px', display: 'inline-block' }}>{script.subheadline}</h2>

                        <div style={{ display: 'flex', gap: '30px', marginTop: '20px' }}>
                            <div style={{ flex: 1 }}>
                                {product.script.image_url && (
                                    <img src={product.script.image_url} alt="Report Visual" style={{ width: '100%', border: '4px solid #0F172A' }} />
                                )}
                            </div>
                            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                                <div style={{ marginBottom: '20px' }}>
                                    <strong>CURRENT STATUS:</strong> <span style={{ color: '#DC2626' }}>INEFFICIENT</span>
                                </div>
                                <div style={{ marginBottom: '20px' }}>
                                    <strong>TARGET STATUS:</strong> <span style={{ color: '#16A34A' }}>OPTIMIZED</span>
                                </div>
                                <p style={{ color: '#475569' }}>{script.pain_story.substring(0, 150)}...</p>
                            </div>
                        </div>
                    </div>

                    {/* Operational Inefficencies */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '40px' }}>
                        <div style={{ background: '#fff', border: '1px solid #ccc', padding: '30px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid #DC2626', paddingBottom: '10px', display: 'block' }}>IDENTIFIED RISKS</h3>
                            <ul style={{ paddingLeft: '20px' }}>
                                {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                                    <li key={i} style={{ marginBottom: '10px', fontWeight: '500' }}>
                                        {typeof bullet === 'string' ? bullet : bullet.title}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ background: '#fff', border: '1px solid #ccc', padding: '30px' }}>
                            <h3 style={{ fontSize: '1.2rem', marginBottom: '20px', borderBottom: '2px solid #16A34A', paddingBottom: '10px', display: 'block' }}>PROPOSED PROTOCOL</h3>
                            <p style={{ fontWeight: 'bold', marginBottom: '15px' }}>{script.transition_mechanism}</p>
                            <p style={{ fontSize: '0.9rem', color: '#475569' }}>Implementation of this protocol is expected to yield immediate results. No experimental theories. Just proven methodology.</p>
                        </div>
                    </div>

                    {/* Deliverables */}
                    <div style={{ background: '#0F172A', color: '#fff', padding: '40px', marginBottom: '40px' }}>
                        <h3 style={{ borderBottom: '1px solid #fff', paddingBottom: '10px', marginBottom: '20px' }}>DELIVERABLES</h3>
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} style={{ display: 'flex', marginBottom: '15px', alignItems: 'center', gap: '15px' }}>
                                <div style={{ background: '#fff', color: '#0F172A', width: '25px', height: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>{i + 1}</div>
                                <div>{feature}</div>
                            </div>
                        ))}
                    </div>

                    {/* Authorization / Buy */}
                    <div style={{ background: '#fff', border: '4px solid #0F172A', padding: '40px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>AUTHORIZE PURCHASE</h3>

                        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', marginBottom: '30px', alignItems: 'center' }}>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>STANDARD PRICE</div>
                                <div style={{ textDecoration: 'line-through' }}><PriceDisplay amountUSD={script.price_original} /></div>
                            </div>
                            <div style={{ textAlign: 'left' }}>
                                <div style={{ fontSize: '0.8rem', color: '#666' }}>CORPORATE RATE</div>
                                <div style={{ fontSize: '2.5rem', fontWeight: '800', color: '#0F172A' }}><PriceDisplay amountUSD={script.price_discounted} showBadge /></div>
                            </div>
                        </div>

                        <button
                            onClick={() => setIsCheckoutOpen(true)}
                            style={{
                                background: '#1D4ED8', // Corporate Blue
                                color: '#fff',
                                padding: '20px 60px',
                                fontSize: '1.2rem',
                                fontWeight: 'bold',
                                border: 'none',
                                cursor: 'pointer',
                                textTransform: 'uppercase',
                                letterSpacing: '1px'
                            }}
                        >
                            {script.cta_text}
                        </button>

                        <div style={{ marginTop: '20px', fontSize: '0.8rem', color: '#666', maxWidth: '500px', margin: '20px auto 0' }}>
                            {script.guarantee_text}
                        </div>
                    </div>

                </main>
                <CheckoutModal
                    isOpen={isCheckoutOpen}
                    onClose={() => setIsCheckoutOpen(false)}
                    productName={script.product_name}
                    amountUSD={script.price_discounted}

                    productId={slug}
                    productType={mbtiType}
                />
            </div>
        )
    }

    // --- STANDARD LAYOUT ---
    // script is already defined above

    // Animation Variants
    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6, ease: "easeOut" }
    };

    const stagger = {
        animate: {
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div
            className={`product-page layout-${theme.layoutType.toLowerCase()}`}
            style={{
                '--primary': theme.colors.primary,
                '--secondary': theme.colors.secondary,
                '--bg-color': theme.colors.background,
                '--text-color': theme.colors.text,
                '--accent': theme.colors.accent,
                '--card-bg': theme.colors.cardBg,
                '--muted': theme.colors.muted,
                '--font-heading': theme.fonts.heading,
                '--font-body': theme.fonts.body,
            } as React.CSSProperties}
        >
            <VantaBackground effectName={theme.vantaEffect} config={theme.vantaConfig} />

            {/* Nav / Breadcrumb */}
            <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 100 }}>
                <Link href={`/MBTI/personality/${mbtiType.toLowerCase()}.html`} className="back-button" style={{
                    display: 'flex', alignItems: 'center', gap: '8px',
                    color: 'var(--text-color)', textDecoration: 'none',
                    background: 'var(--card-bg)', padding: '5px 16px',
                    borderRadius: '30px', border: '1px solid var(--primary)',
                    fontWeight: 'bold', fontSize: '0.9rem',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}>
                    <span>←</span>
                    <span>Back</span>
                </Link>
            </div>

            <nav style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link>
                <span>/</span>
                <span style={{ color: 'var(--text-color)' }}>{profile.name} ({mbtiType})</span>
            </nav>

            <main className="sales-container">
                {/* 1. Hook Section */}
                <motion.section
                    className="hook-section"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <span style={{
                        color: 'var(--secondary)',
                        fontSize: '0.9rem',
                        fontWeight: 'bold',
                        letterSpacing: '2px',
                        display: 'block',
                        marginBottom: '10px'
                    }}>
                        {mbtiType} EXCLUSIVE
                    </span>
                    <h1 className="sales-heading" style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)', marginBottom: '0.5rem' }}>
                        {product.title}
                    </h1>
                    <h2 className="sales-subheading" style={{ opacity: 0.8, fontSize: '1.2rem', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: '300' }}>
                        {script.headline}
                    </h2>

                    <button
                        onClick={scrollToOffer}
                        style={{
                            margin: '20px auto',
                            background: 'transparent',
                            color: 'var(--primary)',
                            border: '1px solid var(--primary)',
                            padding: '12px 30px',
                            fontSize: '1rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            borderRadius: '50px',
                            display: 'block',
                            transition: 'all 0.3s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--primary)';
                            e.currentTarget.style.color = 'var(--bg-color)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent';
                            e.currentTarget.style.color = 'var(--primary)';
                        }}
                    >
                        Review Solution ↓
                    </button>
                    <div className="hook-image glass-panel" style={{ overflow: 'hidden', minHeight: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {script.image_url ? (
                            <img
                                src={script.image_url}
                                alt={product.title}
                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            />
                        ) : (
                            <div style={{ padding: '40px', textAlign: 'center', opacity: 0.5 }}>
                                <p>[ {script.hook_image_prompt} ]</p>
                            </div>
                        )}
                    </div>
                </motion.section>

                {/* 2. Pain Section */}
                <motion.section
                    className="pain-section"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h3 className="sales-heading" style={{ fontSize: '1.8rem', color: 'var(--text-color)' }}>The Internal Bottleneck</h3>
                    <p style={{ fontSize: '1.3rem', color: 'var(--secondary)', fontWeight: '500' }}>
                        {script.pain_story}
                    </p>

                    <motion.ul className="agitation-list" variants={stagger}>
                        {script.agitation_bullets.map((bullet: string | { title: string }, i: number) => (
                            <motion.li key={i} variants={fadeIn}>
                                {typeof bullet === 'string' ? bullet : bullet.title}
                            </motion.li>
                        ))}
                    </motion.ul>
                </motion.section>

                {/* 3. Transition Mechanism */}
                <motion.section
                    className="transition-section glass-panel"
                    style={{ padding: '40px', textAlign: 'center' }}
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <p style={{ margin: 0, opacity: 0.6 }}>THE PARADIGM SHIFT</p>
                    <div style={{
                        fontSize: '2rem',
                        fontWeight: '800',
                        color: 'var(--primary)',
                        marginTop: '10px',
                        textTransform: theme.layoutType === 'NT' ? 'uppercase' : 'none'
                    }}>
                        {script.transition_mechanism}
                    </div>
                </motion.section>

                {/* 4. Solution Section */}
                <motion.section
                    className="solution-section"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <div className="product-title-card floating-card">
                        <h2 className="sales-heading" style={{ fontSize: '3rem' }}>{script.product_name}</h2>
                        <p style={{ fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto' }}>
                            {script.product_description}
                        </p>
                    </div>

                    <div className="feature-grid">
                        {script.features_bullets.map((feature: string, i: number) => (
                            <motion.div
                                key={i}
                                className="feature-item glass-panel"
                                whileHover={{ scale: 1.05, y: -5, boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <p style={{ margin: 0 }}>{feature}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.section>

                {/* 5. Offer Section */}
                <motion.section
                    className="offer-section glass-panel"
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true }}
                    variants={fadeIn}
                >
                    <h3 className="sales-heading" style={{ fontSize: '1.5rem', color: 'var(--text-color)' }}>GET IMMEDIATE ACCESS</h3>

                    <div className="price-container">
                        <span className="price-original"><PriceDisplay amountUSD={script.price_original} /></span>
                        <span className="price-discounted"><PriceDisplay amountUSD={script.price_discounted} showBadge /></span>
                    </div>

                    <div className="bonus-stack">
                        {script.bonuses.map((bonus: any, i: number) => (
                            <div key={i} className="bonus-item">
                                <div>
                                    <strong style={{ color: 'var(--text-color)', display: 'block' }}>BONUS: {bonus.title}</strong>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{bonus.description}</span>
                                </div>
                                <span className="bonus-value"><PriceDisplay amountUSD={bonus.value} /> Value</span>
                            </div>
                        ))}
                    </div>

                    <div className="guarantee-box">
                        <strong style={{ color: 'var(--primary)' }}>🛡️ THE {mbtiType} PROMISE:</strong> {script.guarantee_text}
                    </div>

                    <p className="scarcity" style={{ color: 'var(--secondary)', fontWeight: 'bold' }}>
                        {script.scarcity_text}
                    </p>

                    <button
                        onClick={() => setIsCheckoutOpen(true)}
                        className="cta-button"
                        style={{
                            marginTop: '20px',
                            background: 'var(--primary)',
                            color: 'black',
                            border: 'none',
                            width: '100%',
                            padding: '20px',
                            fontSize: '1.2rem',
                            fontWeight: 'bold',
                            cursor: 'pointer',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            borderRadius: '50px',
                            boxShadow: '0 0 20px var(--primary)',
                            transition: 'all 0.3s'
                        }}
                    >
                        {theme.ctaLabel}
                    </button>

                    <div style={{ marginTop: '30px', fontSize: '0.8rem', opacity: 0.5 }}>
                        Secure Payment • Instant Digital Delivery • Lifetime Access
                    </div>
                </motion.section>
            </main>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                productName={script.product_name}
                amountUSD={script.price_discounted}
                productId={slug}
                productType={mbtiType}
            />
        </div>
    );
}
