import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ClerkProvider } from "@clerk/nextjs";
import { CurrencyProvider } from "@/context/CurrencyContext";
import InstallPrompt from "@/components/InstallPrompt";
import WitnessReturns from "@/components/WitnessReturns";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import CursorArrow from "@/components/CursorArrow";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

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
    default: "Decode Your Consciousness — Spiritual AI Blueprint",
    template: "%s | Spiritual AI",
  },
  description: "Get your permanent Consciousness Blueprint. Spiritual AI combines Vedic, Jungian, and MBTI analysis to decode your unique cognitive architecture.",
  keywords: [
    "Spiritual AI", "Consciousness Blueprint", "MBTI", "Vedic astrology",
    "Jungian psychology", "personality test", "cosmic serial number", "CSN",
    "Hawkins Scale", "spiritual guidance", "AI personality analysis",
    "self-discovery", "cognitive architecture", "personality-based guidance",
    "Vedic AI", "consciousness mapping", "MBTI test", "archetype identification",
  ],
  authors: [{ name: "Keshav Baliyan", url: "https://spiritualai.store/creator" }],
  creator: "Keshav Baliyan",
  publisher: "Spiritual AI",
  alternates: {
    canonical: 'https://spiritualai.store',
  },
  openGraph: {
    title: 'Decode Your Consciousness — Spiritual AI',
    description: 'Get your unique cognitive architecture. Combining Vedic, Jungian, and MBTI to decode your permanent identity.',
    url: 'https://spiritualai.store',
    siteName: 'Spiritual AI',
    images: [
      {
        url: 'https://spiritualai.store/images/titleimage.png',
        width: 1200,
        height: 630,
        alt: 'Spiritual AI - Consciousness Blueprint Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Decode Your Consciousness — Spiritual AI',
    description: 'Get your permanent identity artifact combining Vedic, Jungian, and MBTI analysis.',
    images: ['https://spiritualai.store/images/titleimage.png'],
    creator: '@spiritualai',
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
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  category: 'Technology',
  classification: 'Spiritual AI, Personality Analysis, Self-Discovery',
  icons: {
    icon: '/images/logo.png',
    shortcut: '/images/logo.png',
    apple: '/images/logo.png',
  },
};

// Comprehensive Schema Markup for SEO/GEO
const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Spiritual AI",
  "alternateName": "SpiritualAI",
  "url": "https://spiritualai.store",
  "description": "Consciousness Blueprint Platform combining Vedic astrology, Jungian psychology, MBTI, and AI",
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
  "sameAs": [
    "https://www.linkedin.com/in/keshav-baliyan/",
    "https://twitter.com/spiritualai",
    "https://github.com/0x-Parzival"
  ],
  "founder": {
    "@type": "Person",
    "name": "Keshav Baliyan"
  },
  "description": "Spiritual AI provides personality-based guidance designed for how you think, combining spiritual intelligence with AI-powered insights."
};

const softwareSchema = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  "name": "Spiritual AI",
  "applicationCategory": "LifestyleApplication, HealthApplication",
  "operatingSystem": "Web",
  "url": "https://spiritualai.store",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "USD"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "ratingCount": "14847"
  },
  "description": "AI-powered personality-based spiritual guidance system for self-discovery and cognitive architecture mapping"
};

const quizSchema = {
  "@context": "https://schema.org",
  "@type": "Quiz",
  "name": "Spiritual AI Consciousness Blueprint Diagnostic",
  "description": "An interactive AI-powered diagnostic tool to discover your subconscious psychological patterns and find the spiritual path tailored to your MBTI personality type.",
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
  ],
  "isPartOf": {
    "@type": "WebSite",
    "name": "Spiritual AI",
    "url": "https://spiritualai.store"
  }
};

// FAQ Schema for GEO (AI Overview optimization)
const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What is Spiritual AI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spiritual AI is a consciousness mapping platform that combines Vedic astrology, Jungian psychology, MBTI personality typing, and the Hawkins Scale of Consciousness to decode your unique cognitive architecture. It generates a permanent Consciousness Blueprint with a unique Cosmic Serial Number (CSN)."
      }
    },
    {
      "@type": "Question",
      "name": "What is a Consciousness Blueprint?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A Consciousness Blueprint is your permanent identity artifact generated by Spiritual AI. It includes your Consciousness Identity name (e.g., 'The Invisible Architect'), your Cosmic Serial Number (CSN), your MBTI architecture, Jungian shadow pattern, Vedic astrological coordinates, and a personalized 21-day dissolution protocol."
      }
    },
    {
      "@type": "Question",
      "name": "What is a CSN (Cosmic Serial Number)?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "A CSN is your unique, database-verified identifier in the Blockplain system. Format: SAI-[Sequence]-[MBTI]-[Symbol]-[Hash], e.g., SAI-2847-INTJ-Ψ-7A3F. It serves as your permanent consciousness identity that can be publicly verified."
      }
    },
    {
      "@type": "Question",
      "name": "How does Spiritual AI combine Vedic astrology with MBTI?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Spiritual AI maps your Vedic birth chart (Lagna, Nakshatra, planetary positions) onto your MBTI cognitive functions and Jungian shadow patterns. This creates a multi-layered consciousness profile that identifies not just how you think (MBTI), but your soul's evolutionary trajectory (Vedic) and your hidden psychological patterns (Jungian)."
      }
    },
    {
      "@type": "Question",
      "name": "What is the Blockplain system?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Blockplain is a blockchain-inspired identity chain where every Consciousness Blueprint is a permanent, verifiable block. Each user gets a unique plane_x coordinate, and each new blueprint adds a plane_y depth to their individual chain. Every block references the hash of the previous one, creating an immutable consciousness record."
      }
    }
  ]
};

// Speakable schema for voice search / AI assistants
const speakableSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "name": "Spiritual AI — Consciousness Blueprint",
  "speakable": {
    "@type": "SpeakableSpecification",
    "cssSelector": [".hero-title", ".hero-subtitle", ".validation-quote"]
  },
  "url": "https://spiritualai.store"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          <link rel="icon" href="/images/logo.png" type="image/png" />
          <link rel="manifest" href="/manifest.json" />
          <link rel="preload" href="/images/titleimage.png" as="image" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
          {/* Geographic targeting */}
          <meta name="geo.region" content="US" />
          <meta name="geo.placename" content="Global" />
          <meta name="ICBM" content="global" />
          {/* Content language for AI crawlers */}
          <meta httpEquiv="Content-Language" content="en" />
          {/* Bingbot specific (Copilot) */}
          <meta name="bingbot" content="index, follow" />
          
          {/* Structured Data */}
          <script id="website-schema" type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
          <script id="org-schema" type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
          <script id="software-schema" type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
          <script id="quiz-schema" type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(quizSchema) }} />
          <script id="faq-schema" type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
          <script id="speakable-schema" type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }} />
        </head>
        <body
          suppressHydrationWarning
          className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased min-h-screen flex flex-col`}
          role="document"
        >
          <CursorArrow />
          <CurrencyProvider>
            <main id="main-content" className="flex-grow" role="main">
              {children}
            </main>
            <WitnessReturns />
            <ServiceWorkerRegister />
          </CurrencyProvider>
          <Footer role="contentinfo" />
          <SpeedInsights />
        </body>
      </html>
    </ClerkProvider>
  );
}
