import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: false,
  compress: true, // Enable Gzip/Brotli compression
  // Using false here ensures we don't have unnecessary redirects interfering with local file serving
  trailingSlash: false,
  /*turbopack: {
    root: path.resolve(__dirname),
  },*/
  experimental: {
    optimizePackageImports: ["gsap", "three", "framer-motion", "lucide-react"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [60, 70, 75, 90], // Added 60 and 70 to fix warnings
    minimumCacheTTL: 31536000, // Cache images for 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'img.clerk.com',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'images.clerk.dev',
        pathname: '**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|png|webp|avif|woff2)",
        locale: false,
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      // 1. Rewrite the root of the compass to its index.html
      {
        source: "/cosmic-compass",
        destination: "/cosmic-compass/index.html",
      },
      // 2. Rewrite for MBTI index
      {
        source: "/MBTI",
        destination: "/MBTI/index.html",
      },
      {
        source: "/MBTI/",
        destination: "/MBTI/index.html",
      },
      {
        source: "/cosmic-compass/",
        destination: "/cosmic-compass/index.html",
      },
      // 2. Rewrite all internal routes (quiz, result, etc.) to the SPA index
      // We use a negative lookahead to avoid rewriting static assets
      {
        source: "/cosmic-compass/:path((?!assets/|favicon.ico|placeholder.svg|robots.txt).*)",
        destination: "/cosmic-compass/index.html",
      },
    ];
  },
};

export default nextConfig;
