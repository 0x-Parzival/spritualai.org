
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

export default function EntjCommand({ product, theme, mbtiType }: Props) {
    const { script } = product;
    const [isCheckoutOpen, setIsCheckoutOpen] = React.useState(false);

    return (
        <div className="product-page layout-entj-command" style={{ background: '#0C0F14', minHeight: '100vh', color: '#fff', fontFamily: '"Inter", sans-serif' }}>
            {/* Back Button */}
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
                    <div style={{ fontFamily: '"SF Pro Display", "Inter", sans-serif', lineHeight: 1 }}>
                        <span style={{ fontSize: '1.2rem', fontWeight: '900', letterSpacing: '-0.5px' }}>ENTJ</span>
                        <span style={{ fontSize: '1.2rem', margin: '0 10px', color: '#334155' }}>//</span>
                        <span style={{ fontSize: '0.9rem', color: '#C1121F', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>The Commander</span>
                    </div>
                </div>
            </nav>

            <main className="sales-container" style={{ maxWidth: '1000px', margin: '60px auto 0', padding: '0 20px' }}>

                {/* HERO */}
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 0.8fr)', gap: '60px', alignItems: 'center', marginBottom: '100px' }}>
                    <div>
                        <div style={{ fontSize: '0.8rem', color: '#6b7280', marginBottom: '16px', letterSpacing: '2px', textTransform: 'uppercase' }}>ENTJ EXCLUSIVE</div>
                        {/* SEO H1 */}
                        <h1 className="sales-heading" style={{ fontSize: '3.5rem', lineHeight: '1.1', marginBottom: '24px', letterSpacing: '-1px' }}>
                            {product.title}
                        </h1>
                        <div className="sales-subheading" style={{ borderLeft: '2px solid #C1121F', paddingLeft: '20px', color: '#E2E8F0', fontSize: '1.25rem' }}>
                            {script.headline}
                        </div>
                    </div>

                    <div style={{ position: 'relative' }}>
                        {script.image_url ? (
                            <img src={script.image_url} alt="Empire Execution" style={{ width: '100%', border: '1px solid #141923', display: 'block' }} />
                        ) : (
                            <div style={{ width: '100%', aspectRatio: '4/3', background: '#141923', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#334155' }}>NO_SIGNAL</div>
                        )}
                        <div className="entj-signal-line" style={{ position: 'absolute', bottom: '0', left: '0', width: '100%', height: '2px', background: '#C1121F' }}></div>
                    </div>
                </div>


                {/* THE BOTTLENECK: Internal */}
                <div style={{ marginBottom: '120px' }}>
                    <div style={{ borderTop: '1px solid #C1121F', width: '60px', marginBottom: '20px' }}></div>
                    {/* SEO H2 */}
                    <h2 className="sales-heading" style={{ fontSize: '2rem', marginBottom: '40px' }}>The Core Problem</h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
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
                    {/* SEO H2 */}
                    <div style={{ fontSize: '1rem', letterSpacing: '4px', opacity: 0.6, marginBottom: '20px', textTransform: 'uppercase' }}>The Spiritual AI Approach</div>
                    <h2 className="sales-heading" style={{ fontSize: '2.5rem', maxWidth: '800px', margin: '0 auto' }}>{script.transition_mechanism}</h2>
                </div>


                {/* THE PROTOCOL: Grid */}
                <div style={{ marginBottom: '100px' }}>
                    {/* SEO H2 */}
                    <h2 className="sales-heading" style={{ fontSize: '2rem', marginBottom: '10px' }}>{script.product_name}</h2>
                    <h3 style={{ fontSize: '1.2rem', color: '#6b7280', textTransform: 'uppercase', marginBottom: '60px' }}>Product Breakdown</h3>

                    <p style={{ fontSize: '1.2rem', marginBottom: '60px', color: '#94a3b8' }}>{script.product_description}</p>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1px', background: '#141923', border: '1px solid #141923' }}>
                        {script.features_bullets.map((feature: string, i: number) => {
                            const parts = feature.split(':');
                            const title = parts[0];
                            const desc = parts.slice(1).join(':') || "Optimized for maximum leverage.";

                            return (
                                <div key={i} className="entj-grid-module" style={{ background: '#0E1116', padding: '30px', display: 'flex', flexDirection: 'column' }}>
                                    <div style={{ color: '#C1121F', display: 'block', width: '20px', height: '20px', background: '#C1121F', marginBottom: '20px' }}></div>
                                    <h4 style={{ color: '#fff', fontWeight: 'bold', marginBottom: '12px', fontSize: '1.1rem', textTransform: 'uppercase' }}>{title}</h4>
                                    <div style={{ fontSize: '0.9rem', color: '#6b7280', lineHeight: '1.6', marginBottom: '20px' }}>{desc}</div>
                                    <div className="entj-metric-badge" style={{ marginTop: 'auto', alignSelf: 'flex-start', border: '1px solid #333', padding: '4px 8px', fontSize: '0.7rem' }}>
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
                    {/* SEO H2 */}
                    <h2 style={{ position: 'absolute', top: '-10px', left: '20px', background: '#0C0F14', padding: '0 10px', color: '#C1121F', fontSize: '0.8rem', fontWeight: 'bold', margin: 0 }}>Growth Path</h2>
                    <p style={{ margin: 0, lineHeight: '1.6', fontFamily: '"JetBrains Mono", monospace', color: '#e2e8f0' }}>
                        {script.guarantee_text}
                    </p>
                </div>

                {/* Creator Attribution */}
                <section style={{ marginTop: '100px', textAlign: 'center', borderTop: '1px solid #141923', paddingTop: '40px' }}>
                    <h2 style={{ fontSize: '1.2rem', marginBottom: '20px', color: '#C1121F' }}>System Architect: Keshav Baliyan</h2>
                    <p style={{ fontSize: '0.9rem', color: '#6b7280' }}>
                        This command protocol was engineered by Keshav Baliyan.
                        <Link href="/creator" style={{ color: '#C1121F', marginLeft: '5px', textDecoration: 'none' }}>View Credentials</Link>
                    </p>
                </section>


                {/* FOOTER */}
                <footer style={{ marginTop: '60px', paddingTop: '40px', fontSize: '0.8rem', color: '#4b5563', textAlign: 'center', paddingBottom: '40px' }}>
                    <p style={{ marginBottom: '10px' }}>{script.scarcity_text}</p>
                    <p>Secure Payment • Instant Digital Delivery • Lifetime Access</p>
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
