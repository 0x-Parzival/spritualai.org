import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: '*',
                allow: '/',
                disallow: ['/admin/', '/profile/', '/api/', '/complete/'],
            },
            {
                // Allow GPTBot (OpenAI) — important for GEO
                userAgent: 'GPTBot',
                allow: '/',
                disallow: ['/admin/', '/profile/', '/api/'],
            },
            {
                // Allow Claude (Anthropic) web crawler
                userAgent: 'anthropic-ai',
                allow: '/',
                disallow: ['/admin/', '/profile/', '/api/'],
            },
            {
                // Allow Perplexity AI crawler
                userAgent: 'PerplexityBot',
                allow: '/',
                disallow: ['/admin/', '/profile/', '/api/'],
            },
            {
                // Allow Google Extended (AI training)
                userAgent: 'Google-Extended',
                allow: '/',
                disallow: ['/admin/', '/profile/', '/api/'],
            },
            {
                // Allow Bingbot (Copilot)
                userAgent: 'bingbot',
                allow: '/',
                disallow: ['/admin/', '/profile/', '/api/'],
            },
        ],
        sitemap: 'https://spiritualai.store/sitemap.xml',
    };
}
