import { notFound } from "next/navigation";
import { productsData } from "../../../../data/products";
import { Product } from "../../../../data/types";
import "../../product.css";
import Link from "next/link";

// Correctly define props for Next.js 16/15 dynamic routes
type Props = {
    params: Promise<{
        type: string;
        slug: string;
    }>;
};

export default async function ProductPage(props: Props) {
    // Await params in newer Next.js versions
    const params = await props.params;
    const { type, slug } = params;

    // Case-insensitive lookup
    const mbtiType = type.toUpperCase();
    const profile = productsData[mbtiType];

    if (!profile) {
        notFound();
    }

    const product = profile.products.find((p: Product) => p.id === slug);

    if (!product) {
        notFound();
    }

    const { script } = product;

    return (
        <div className="product-page">
            {/* Nav / Breadcrumb */}
            <nav style={{ padding: '20px', fontSize: '0.9rem', color: '#666' }}>
                <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link> &gt; <span>{profile.name} ({mbtiType})</span> &gt; <span style={{ color: '#fff' }}>Product</span>
            </nav>

            <main className="sales-container">
                {/* 1. Hook */}
                <section className="hook-section">
                    <h1 className="sales-heading" style={{ fontSize: '2.5rem' }}>{script.headline}</h1>
                    <h2 className="sales-subheading">{script.subheadline}</h2>
                    <div className="hook-image">
                        <p>[ AI VISUALIZATION: {script.hook_image_prompt} ]</p>
                    </div>
                </section>

                {/* 2. Pain */}
                <section className="pain-section">
                    <h3 className="pain-title">The Real Problem</h3>
                    <p style={{ fontSize: '1.2rem', color: '#ffb3c6' }}>{script.pain_story}</p>

                    <div style={{ margin: '40px 0' }}>
                        <p>Does this sound familiar?</p>
                        <ul className="agitation-list">
                            {script.agitation_bullets.map((bullet: string, i: number) => (
                                <li key={i}>{bullet}</li>
                            ))}
                        </ul>
                    </div>
                </section>

                {/* 3. Transition */}
                <section className="transition-section">
                    <p>It's not your fault. You were just using the wrong operating system.</p>
                    <p>Introducing the new mechanism:</p>
                    <span className="mechanism-highlight">{script.transition_mechanism}</span>
                </section>

                {/* 4. Solution */}
                <section className="solution-section">
                    <div className="product-title-card">
                        <p style={{ color: '#00fff9', letterSpacing: '2px', fontSize: '0.9rem' }}>PRESENTING</p>
                        <h2 className="sales-heading" style={{ fontSize: '3rem', margin: '10px 0' }}>{script.product_name}</h2>
                        <p>{script.product_description}</p>
                    </div>

                    <div className="feature-grid">
                        {script.features_bullets.map((feature: string, i: number) => (
                            <div key={i} className="feature-item">
                                <p>{feature}</p>
                            </div>
                        ))}
                    </div>
                </section>

                {/* 5. Offer */}
                <section className="offer-section">
                    <h3>Get Immediate Access</h3>
                    <div className="price-container">
                        <span className="price-original">{script.price_original}</span>
                        <span className="price-discounted">{script.price_discounted}</span>
                    </div>

                    <div className="bonus-stack">
                        {script.bonuses.map((bonus: any, i: number) => (
                            <div key={i} className="bonus-item">
                                <div>
                                    <strong style={{ color: '#fff', display: 'block' }}>BONUS: {bonus.title}</strong>
                                    <span style={{ fontSize: '0.9rem', color: '#ccc' }}>{bonus.description}</span>
                                </div>
                                <span className="bonus-value">{bonus.value} Value</span>
                            </div>
                        ))}
                    </div>

                    <div className="guarantee-box">
                        <strong>🛡️ LOGICAL GUARANTEE:</strong> {script.guarantee_text}
                    </div>

                    <p className="scarcity">{script.scarcity_text}</p>

                    <button className="cta-button">
                        {script.cta_text}
                    </button>

                    <div style={{ marginTop: '20px', fontSize: '0.8rem', opacity: 0.6 }}>
                        Secure Payment • Instant Digital Download
                    </div>
                </section>
            </main>
        </div>
    );
}
