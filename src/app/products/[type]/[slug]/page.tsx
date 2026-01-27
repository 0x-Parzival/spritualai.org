'use client';

import React from "react";
import { useState } from "react";
import { notFound, useParams } from "next/navigation";
import { productsData } from "../../../../data/products";
import { mbtiThemes } from "../../../../data/themes";
import { Product } from "../../../../data/types";
import "../../product.css";
import Link from "next/link";
import { motion } from "framer-motion";
import VantaBackground from "../../../../components/VantaBackground";
import CheckoutModal from "../../../../components/CheckoutModal";

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

    const { script } = product;

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
            <nav style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--muted)', display: 'flex', gap: '10px' }}>
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
                        {script.agitation_bullets.map((bullet: string, i: number) => (
                            <motion.li key={i} variants={fadeIn}>
                                {bullet}
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
                        <span className="price-original">{script.price_original}</span>
                        <span className="price-discounted">{script.price_discounted}</span>
                    </div>

                    <div className="bonus-stack">
                        {script.bonuses.map((bonus: any, i: number) => (
                            <div key={i} className="bonus-item">
                                <div>
                                    <strong style={{ color: 'var(--text-color)', display: 'block' }}>BONUS: {bonus.title}</strong>
                                    <span style={{ fontSize: '0.9rem', color: 'var(--muted)' }}>{bonus.description}</span>
                                </div>
                                <span className="bonus-value">{bonus.value} Value</span>
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
                productTitle={script.product_name}
                productPrice={script.price_discounted}
                productId={slug}
                productType={mbtiType}
            />
        </div>
    );
}
