import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
  // Using false here ensures we don't have unnecessary redirects interfering with local file serving
  trailingSlash: false,
  experimental: {
    optimizePackageImports: ["gsap", "three"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [75, 90],
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
