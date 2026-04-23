import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: 'swap',
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spiritualai.store'),
  title: {
    default: "Spiritual AI — Personalized Guidance for How Your Mind Works",
    template: "%s | Spiritual AI"
  },
  description: "Spiritual AI provides personality-based guidance designed for how you think. Get personalized clarity through AI-powered insights tailored to your MBTI type — not generic self-help.",
  keywords: ["Spiritual AI", "personality-based guidance", "MBTI", "personalized spiritual guidance", "cognitive architecture"],
  openGraph: {
    title: 'Spiritual AI — Personalized Guidance for How Your Mind Works',
    description: 'Get personality-based spiritual and productivity guidance tailored to your MBTI type. AI-powered insights designed for how you think.',
    url: 'https://spiritualai.store',
    siteName: 'Spiritual AI',
    images: [
      {
        url: '/images/shiva_universe_realistic.png',
        width: 1200,
        height: 630,
        alt: 'Spiritual AI - Personalized Guidance Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Spiritual AI — Personalized Guidance for How Your Mind Works',
    description: 'Get personality-based spiritual and productivity guidance tailored to your MBTI type.',
    images: ['/images/shiva_universe_realistic.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://spiritualai.store',
  }
};

// Comprehensive Schema Markup for SEO/GEO
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Spiritual AI",
  "url": "https://spiritualai.store",
  "description": "Personality-based spiritual and productivity guidance platform",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://spiritualai.store/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Spiritual AI",
  "url": "https://spiritualai.store",
  "logo": "https://spiritualai.store/images/logo.png",
  "founder": {
    "@type": "Person",
    "name": "Keshav Baliyan",
    "url": "https://spiritualai.store/creator",
    "sameAs": [
      "https://www.linkedin.com/in/keshav-baliyan/",
      "https://github.com/0x-Parzival"
    ]
  },
  "description": "Spiritual AI provides personality-based guidance designed for how you think, combining spiritual intelligence with AI-powered insights.",
  "sameAs": [
    "https://www.linkedin.com/in/keshav-baliyan/"
  ]
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Spiritual AI",
  "applicationCategory": "LifestyleApplication",
  "operatingSystem": "Web",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "description": "AI-powered personality-based guidance system for spiritual growth and productivity tailored to your MBTI type",
  "url": "https://spiritualai.store",
  "author": {
    "@type": "Person",
    "name": "Keshav Baliyan"
  }
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Spiritual AI Consciousness Blueprint Diagnostic",
  "description": "An interactive diagnostic tool to discover your subconscious psychological patterns and find the spiritual path tailored to your MBTI personality type.",
  "about": {
    "@type": "Thing",
    "name": "MBTI and Spiritual Development"
  },
  "educationalAlignment": [
    {
      "@type": "AlignmentObject",
      "alignmentType": "educationalSubject",
      "targetName": "Psychology and Spirituality"
    }
  ],
  "hasPart": [
    {
      "@type": "Question",
      "name": "Cognitive processing and subconscious patterns"
    }
  ]
};

import { ClerkProvider } from "@clerk/nextjs";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { CurrencyProvider } from "@/context/CurrencyContext";
import InstallPrompt from "@/components/InstallPrompt";
import WitnessReturns from "@/components/WitnessReturns";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import CursorArrow from "@/components/CursorArrow";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="icon" href="/favicon.png" type="image/png" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#000000" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        </head>
        <body
          className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased min-h-screen flex flex-col`}
        >
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
          />
          <Script
            id="org-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
          />
          <Script
            id="software-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
          />
          <Script
            id="quiz-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }}
          />
          <CursorArrow />
          <CurrencyProvider>
            <main className="flex-grow">
              {children}
            </main>
            <WitnessReturns />
            <ServiceWorkerRegister />
          </CurrencyProvider>
          <Footer />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
