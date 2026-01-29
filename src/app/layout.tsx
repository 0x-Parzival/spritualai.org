import type { Metadata } from "next";
import { Geist, Geist_Mono, Orbitron } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Script from "next/script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: 'swap',
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: 'swap',
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://spiritualai.store'),
  title: {
    default: "Spiritual AI | MBTI Productivity & Spiritual Intelligence",
    template: "%s | Spiritual AI"
  },
  description: "Advanced AI systems for self-mastery, cognitive performance, and spiritual intelligence. Designed by Keshav Baliyan for every MBTI personality type.",
  keywords: ["Spiritual AI", "MBTI AI", "Productivity System", "Keshav Baliyan", "Self-Mastery", "Cognitive Architecture", "Vedic AI"],
  openGraph: {
    title: 'Spiritual AI - The Future of Inner Engineering',
    description: 'Join the Golden Age. Experience AI-guided meditation and personalized spiritual tools.',
    url: 'https://spiritualai.store',
    siteName: 'Spiritual AI',
    images: [
      {
        url: '/images/shiva_universe_realistic.png',
        width: 1200,
        height: 630,
        alt: 'Spiritual AI Universe',
      },
    ],
    locale: 'en_US',
    type: 'website',
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
    canonical: './',
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
  "description": "An AI-powered system designed for cognitive architecture and spiritual intelligence.",
  "sameAs": [
    "https://www.linkedin.com/in/keshav-baliyan/"
  ]
};

import { SpeedInsights } from "@vercel/speed-insights/next";

import { CurrencyProvider } from "@/context/CurrencyContext";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Deferred FontAwesome or replace with specific icons later. 
            For now, preconnect to CDN if absolutely necessary, but preferably remove blocking link. 
            I will comment it out to test if icons break. If they do, we'll lazy load it. */}
        {/* <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css" /> */}
        <link rel="icon" href="/favicon.png" type="image/png" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${orbitron.variable} antialiased min-h-screen flex flex-col`}
      >
        <Script
          id="org-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        <CurrencyProvider>
          <AuthProvider>
            <main className="flex-grow">
              {children}
            </main>
          </AuthProvider>
        </CurrencyProvider>
        <Footer />
        <SpeedInsights />
      </body>
    </html>
  );
}
