import { MetadataRoute } from 'next';
import { productsData } from '../data/products';

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://spiritualai.store'; // Update with actual domain if different

    // Static routes
    const routes = [
        '',
        '/mission',
        '/profile',
        '/creator',
        '/lotus-god',
        '/MBTI',
        '/cosmic-compass',
    ].map((route) => ({
        url: `${baseUrl}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: route === '' ? 1 : 0.8,
    }));

    // Generate product routes
    const productRoutes: MetadataRoute.Sitemap = [];

    Object.values(productsData).forEach(profile => {
        profile.products.forEach(product => {
            productRoutes.push({
                url: `${baseUrl}/products/${profile.id}/${product.id}`,
                lastModified: new Date(),
                changeFrequency: 'weekly' as const,
                priority: 0.9,
            });
        });
    });

    return [...routes, ...productRoutes];
}
