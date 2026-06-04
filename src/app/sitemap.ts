import { MetadataRoute } from 'next';
import { productsData } from '../data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://spiritualai.store';

    // Core pages — highest priority
    const coreRoutes = [
        { url: '', priority: 1.0, changeFrequency: 'daily' as const },
        { url: '/how-it-works', priority: 0.9, changeFrequency: 'weekly' as const },
        { url: '/discover', priority: 0.8, changeFrequency: 'weekly' as const },
        { url: '/mission', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/creator', priority: 0.7, changeFrequency: 'monthly' as const },
        { url: '/press', priority: 0.6, changeFrequency: 'monthly' as const },
        { url: '/store', priority: 0.8, changeFrequency: 'weekly' as const },
    ];

    // Research/Blog pages — high priority for SEO content
    const researchRoutes = [
        { url: '/research', priority: 0.9, changeFrequency: 'weekly' as const },
        { url: '/research/vedic-ai-alignment', priority: 0.95, changeFrequency: 'monthly' as const },
        { url: '/research/karma-economy', priority: 0.9, changeFrequency: 'monthly' as const },
        { url: '/research/remix', priority: 0.7, changeFrequency: 'weekly' as const },
    ];

    // Product hub pages (16 MBTI types)
    const mbtiTypes = [
        'ENTJ', 'INTJ', 'INFJ', 'INTP', 'ENTP', 'ENFP', 'INFP', 'ISFP',
        'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ESTP', 'ESFP', 'ENFJ',
    ];
    const productHubRoutes = mbtiTypes.map(type => ({
        url: `/products/${type.toLowerCase()}`,
        priority: 0.85,
        changeFrequency: 'weekly' as const,
    }));

    // Individual product pages
    const productRoutes: MetadataRoute.Sitemap = [];
    Object.entries(productsData).forEach(([type, profile]) => {
        profile.products.forEach(product => {
            productRoutes.push({
                url: `/products/${type.toLowerCase()}/${product.id}`,
                priority: 0.75,
                changeFrequency: 'weekly' as const,
            });
        });
    });

    // Combine all routes
    const allRoutes = [...coreRoutes, ...researchRoutes, ...productHubRoutes, ...productRoutes];

    return allRoutes.map(route => ({
        url: `${baseUrl}${route.url}`,
        lastModified: new Date(),
        changeFrequency: route.changeFrequency,
        priority: route.priority,
    }));
}
