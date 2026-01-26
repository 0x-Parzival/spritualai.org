import { notFound } from "next/navigation";
import { productsData } from "../../../data/products";
import Link from "next/link";
import "../product.css";
import VantaBackground from "../../../components/VantaBackground";

type Props = {
    params: Promise<{
        type: string;
    }>;
};

export default async function ProductHubPage(props: Props) {
    const params = await props.params;
    const { type } = params;

    const mbtiType = type.toUpperCase();
    const profile = productsData[mbtiType];

    if (!profile) {
        notFound();
    }

    const { theme } = profile;

    return (
        <div className={`product-page layout-${theme.layoutType.toLowerCase()}`} style={{
            paddingBottom: '80px',
            '--primary': theme.colors.primary,
            '--secondary': theme.colors.secondary,
            '--bg-color': theme.colors.background,
            '--text-color': theme.colors.text,
            '--accent': theme.colors.accent,
            '--card-bg': theme.colors.cardBg,
            '--muted': theme.colors.muted,
            '--font-heading': theme.fonts.heading,
            '--font-body': theme.fonts.body,
        } as React.CSSProperties}>

            <VantaBackground color1={0x000000} color2={theme.vantaColor} />

            <nav style={{ padding: '20px', fontSize: '0.9rem', color: 'var(--muted)' }}>
                <Link href="/" style={{ color: 'var(--muted)', textDecoration: 'none' }}>Home</Link> &gt; <span style={{ color: 'var(--text-color)' }}>{profile.name} ({mbtiType})</span>
            </nav>

            <main className="sales-container">
                <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 className="sales-heading" style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{profile.name}</h1>
                    <p style={{ color: 'var(--secondary)', fontSize: '1.2rem', letterSpacing: '2px', fontWeight: 'bold' }}>{mbtiType} PROTOCOL</p>
                    <div className="glass-panel" style={{
                        marginTop: '30px',
                        padding: '30px',
                        textAlign: 'center',
                        fontStyle: 'italic',
                        color: 'var(--text-color)',
                        opacity: 0.9,
                        borderLeft: `4px solid var(--primary)`
                    }}>
                        "{profile.artistic_vibe}"
                    </div>
                </header>

                <h2 className="sales-subheading" style={{ borderLeft: 'none', textAlign: 'center' }}>
                    Recommended Upgrades
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                    {profile.products.map((product) => (
                        <div key={product.id} className="glass-panel floating-card" style={{
                            padding: '30px',
                            transition: 'all 0.3s ease',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <h3 style={{
                                color: 'var(--primary)',
                                marginBottom: '10px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.8rem'
                            }}>
                                {product.title}
                            </h3>
                            <p style={{ fontSize: '1.1rem', color: 'var(--text-color)', opacity: 0.8, marginBottom: '25px', lineHeight: '1.6' }}>
                                {product.script.subheadline}
                            </p>
                            <Link href={`/products/${type.toLowerCase()}/${product.id}`} className="cta-button" style={{
                                fontSize: '1rem',
                                padding: '12px 30px'
                            }}>
                                Access Protocol &rarr;
                            </Link>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
}
