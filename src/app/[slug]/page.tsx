
import React from 'react';
import { productsData } from '@/data/products';
import { mbtiThemes } from '@/data/themes';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';

// Import Layouts
import IntjStrategic from '@/components/layouts/IntjStrategic';
import InfpMediator from '@/components/layouts/InfpMediator';
import EntjCommand from '@/components/layouts/EntjCommand';
import IntpLogic from '@/components/layouts/IntpLogic';
import EntpDynamic from '@/components/layouts/EntpDynamic';
import EstjExecutive from '@/components/layouts/EstjExecutive';
import IstpVirtuoso from '@/components/layouts/IstpVirtuoso';
// We will import others as we create them. For now, fallback to a basic message or 404 if incomplete.

// Helper to find product by slug
function getProductBySlug(slug: string) {
    for (const [mbti, profile] of Object.entries(productsData)) {
        const product = profile.products.find(p => p.semantic_slug === slug || p.id === slug);
        if (product) {
            return { product, profile, mbtiType: mbti };
        }
    }
    return null;
}

export async function generateStaticParams() {
    const params = [];
    for (const profile of Object.values(productsData)) {
        for (const product of profile.products) {
            if (product.semantic_slug) {
                params.push({ slug: product.semantic_slug });
            }
        }
    }
    return params;
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const result = getProductBySlug(slug);
    if (!result) return {};

    const { product, profile, mbtiType } = result;

    return {
        title: `${product.title} for ${profile.name} (${mbtiType})`,
        description: product.script.subheadline || product.script.pain_story.substring(0, 160),
        openGraph: {
            title: product.script.product_name,
            description: product.script.subheadline,
            images: product.script.image_url ? [product.script.image_url] : [],
        }
    };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const result = getProductBySlug(slug);

    if (!result) {
        notFound();
    }

    const { product, profile, mbtiType } = result;
    const theme = mbtiThemes[mbtiType as keyof typeof mbtiThemes];

    // Schema Markup
    const productSchema = {
        "@context": "https://schema.org/",
        "@type": "Product",
        "name": product.title,
        "description": product.script.product_description,
        "brand": {
            "@type": "Brand",
            "name": "Spiritual AI"
        },
        "offers": {
            "@type": "Offer",
            "priceCurrency": "USD",
            "price": product.script.price_discounted.replace('$', ''),
            "availability": "https://schema.org/InStock"
        }
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
            />
            {renderLayout(theme.layoutType, product, theme, mbtiType)}
        </>
    );
}

function renderLayout(layoutType: string, product: any, theme: any, mbtiType: string) {
    switch (layoutType) {
        case 'INTJ_STRATEGIC':
            return <IntjStrategic product={product} theme={theme} mbtiType={mbtiType} />;
        case 'ENTJ_COMMAND':
            return <EntjCommand product={product} theme={theme} mbtiType={mbtiType} />;
        case 'INFP_MEDIATOR':
            return <InfpMediator product={product} theme={theme} mbtiType={mbtiType} />;
        case 'INTP_CURIOSITY':
            return <IntpLogic product={product} theme={theme} mbtiType={mbtiType} />;
        case 'ENTP_DYNAMIC':
            return <EntpDynamic product={product} theme={theme} mbtiType={mbtiType} />;
        case 'ISTP_VIRTUOSO':
            return <IstpVirtuoso product={product} theme={theme} mbtiType={mbtiType} />;
        case 'ESTJ_EXECUTIVE':
            return <EstjExecutive product={product} theme={theme} mbtiType={mbtiType} />;
        // Add other cases as we extract them
        default:
            // Fallback for now if layout not extracted yet
            return (
                <div style={{ padding: '50px', color: '#fff', textAlign: 'center' }}>
                    <h1>{product.title}</h1>
                    <p>Layout optimization in progress for {layoutType}...</p>
                    <a href={`/products/${mbtiType.toLowerCase()}/${product.id}`} style={{ color: 'cyan' }}>View Original Page</a>
                </div>
            )
    }
}
