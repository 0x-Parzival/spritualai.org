import { notFound } from "next/navigation";
import { productsData } from "../../../data/products";
import Link from "next/link";
import "../product.css";

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

    return (
        <div className="product-page" style={{ paddingBottom: '80px' }}>
            <nav style={{ padding: '20px', fontSize: '0.9rem', color: '#666' }}>
                <Link href="/" style={{ color: '#888', textDecoration: 'none' }}>Home</Link> &gt; <span style={{ color: '#fff' }}>{profile.name} ({mbtiType})</span>
            </nav>

            <main className="sales-container">
                <header style={{ textAlign: 'center', marginBottom: '60px' }}>
                    <h1 className="sales-heading" style={{ fontSize: '3.5rem', marginBottom: '10px' }}>{profile.name}</h1>
                    <p style={{ color: '#00bcd4', fontSize: '1.2rem', letterSpacing: '2px' }}>{mbtiType} PROTOCOL</p>
                    <div style={{
                        margin: '30px auto',
                        padding: '20px',
                        borderLeft: '4px solid #00bcd4',
                        background: 'rgba(255,255,255,0.03)',
                        textAlign: 'left',
                        fontStyle: 'italic',
                        color: '#ccc'
                    }}>
                        "{profile.artistic_vibe}"
                    </div>
                </header>

                <h2 className="sales-subheading" style={{ borderLeft: 'none', textAlign: 'center' }}>
                    Recommended Upgrades
                </h2>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '30px' }}>
                    {profile.products.map((product) => (
                        <div key={product.id} style={{
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '10px',
                            padding: '30px',
                            background: 'linear-gradient(to right, rgba(0,0,0,0.5), rgba(20,20,30,0.5))',
                            transition: 'transform 0.2s',
                            position: 'relative',
                            overflow: 'hidden'
                        }}>
                            <h3 style={{
                                color: '#fff',
                                marginBottom: '10px',
                                fontFamily: 'var(--font-heading)',
                                fontSize: '1.4rem'
                            }}>
                                {product.title}
                            </h3>
                            <p style={{ fontSize: '0.95rem', color: '#aaa', marginBottom: '20px' }}>
                                {product.script.subheadline}
                            </p>
                            <Link href={`/products/${type.toLowerCase()}/${product.id}`} style={{
                                display: 'inline-block',
                                color: '#00fff9',
                                textDecoration: 'none',
                                border: '1px solid #00fff9',
                                padding: '10px 20px',
                                borderRadius: '4px',
                                fontSize: '0.9rem',
                                textTransform: 'uppercase',
                                fontWeight: 'bold',
                                letterSpacing: '1px'
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
