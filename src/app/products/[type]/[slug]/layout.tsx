import { Metadata } from "next";
import { productsData } from "../../../../data/products";

type Props = {
    params: Promise<{
        type: string;
        slug: string;
    }>;
    children: React.ReactNode;
};

export async function generateMetadata(props: { params: Promise<{ type: string; slug: string }> }): Promise<Metadata> {
    const params = await props.params;
    const { type, slug } = params;
    const mbtiType = type.toUpperCase();
    const profile = productsData[mbtiType];

    if (!profile) return {};

    const product = profile.products.find((p) => p.id === slug);
    if (!product) return {
        title: `Product Not Found | Spiritual AI`
    };

    return {
        title: `${product.title} | ${mbtiType} Personality Protocol`,
        description: product.script?.subheadline || `Access the ${product.title} for ${mbtiType} personality types. Optimized for your unique cognitive architecture.`,
        keywords: `${mbtiType}, ${product.title}, spiritual ai, mbti, personality type, personal growth, cognitive optimization`,
    };
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
    return <>{children}</>;
}
