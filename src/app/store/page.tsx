"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ArrowRight, Sparkles, BookOpen, Headphones, Brain } from 'lucide-react';
import { useCurrency } from '@/context/CurrencyContext';
import { productsData } from '@/data/products';

type ProductType = 'ebook' | 'audiobook' | 'guide' | 'all';

interface CatalogProduct {
  id: string;
  mbti: string;
  mbtiName: string;
  title: string;
  slug: string;
  price: number;
  originalPrice: number;
  ctaText: string;
  description: string;
  imageUrl: string;
  formats: string[];
}

function flattenProducts(): CatalogProduct[] {
  const result: CatalogProduct[] = [];
  for (const [mbtiKey, profile] of Object.entries(productsData)) {
    for (const product of profile.products) {
      const script = product.script;
      result.push({
        id: product.id,
        mbti: mbtiKey,
        mbtiName: profile.name,
        title: script.headline || product.title,
        slug: product.semantic_slug || product.id,
        price: parseInt(String(script.price_discounted || '$67').replace(/[^0-9]/g, '')) || 67,
        originalPrice: parseInt(String(script.price_original || '$97').replace(/[^0-9]/g, '')) || 97,
        ctaText: script.cta_text || 'GET IT',
        description: script.subheadline || script.product_name || '',
        imageUrl: script.image_url || '/images/titleimage.png',
        formats: ['PDF', 'Audiobook', 'AI Guide'],
      });
    }
  }
  return result;
}

const ALL_PRODUCTS = flattenProducts();

const MBTI_TYPES = ['ALL', 'INTJ', 'INTP', 'ENTJ', 'ENTP', 'INFJ', 'INFP', 'ENFJ', 'ENFP', 'ISTJ', 'ISFJ', 'ESTJ', 'ESFJ', 'ISTP', 'ISFP', 'ESTP', 'ESFP'];

export default function StorePage() {
  const [selectedType, setSelectedType] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<CatalogProduct[]>(ALL_PRODUCTS);
  const { convertPrice, currency, loading: currencyLoading } = useCurrency();

  useEffect(() => {
    let filtered = ALL_PRODUCTS;

    if (selectedType !== 'all') {
      filtered = filtered.filter(p => p.mbti === selectedType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.mbti.toLowerCase().includes(q) ||
        p.mbtiName.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q)
      );
    }

    setFilteredProducts(filtered);
  }, [selectedType, searchQuery]);

  const formatPrice = (priceUSD: number) => {
    if (currencyLoading) return `$${priceUSD}`;
    return convertPrice(priceUSD);
  };

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans overflow-x-hidden">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-[60] p-6 md:p-8 flex justify-between items-center bg-gradient-to-b from-black/90 to-transparent">
        <div className="flex items-center gap-4">
          <a href="/" className="font-black tracking-[0.4em] uppercase text-xs hover:text-cyan-500 transition-colors">
            Spiritual AI <span className="text-cyan-500">Store</span>
          </a>
        </div>
        <a href="/" className="text-[10px] font-bold uppercase tracking-widest text-white/40 hover:text-white/70 transition-colors">
          ← Back to Home
        </a>
      </header>

      <main className="relative pt-28 md:pt-32 px-4 md:px-8 max-w-7xl mx-auto pb-40 z-10">
        {/* Hero */}
        <div className="text-center mb-12 md:mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl lg:text-7xl font-black italic uppercase tracking-tighter leading-tight mb-4"
          >
            Digital Instruments
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto"
          >
            Personalized consciousness products — ebooks, audiobooks, and AI guides — each built for your specific psychological type.
          </motion.p>
        </div>

        {/* Search + Filter */}
        <div className="mb-10 space-y-4">
          {/* Search */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
            <input
              type="text"
              placeholder="Search by type, title, or keyword..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-sm text-white placeholder-white/30 focus:outline-none focus:border-cyan-500/50 focus:bg-white/8 transition-all"
            />
          </div>

          {/* MBTI Filter */}
          <div className="flex flex-wrap justify-center gap-2">
            {MBTI_TYPES.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type === 'ALL' ? 'all' : type)}
                className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest transition-all ${
                  (selectedType === 'all' && type === 'ALL') || selectedType === type
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'bg-white/5 text-white/40 border border-white/10 hover:border-white/20 hover:text-white/60'
                }`}
              >
                {type === 'ALL' ? 'All Types' : type}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ delay: i * 0.03 }}
                className="group"
              >
                <a
                  href={`/blueprint/demo/product/${product.id}`}
                  className="block bg-white/[0.02] border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-500/30 transition-all hover:bg-white/[0.04]"
                >
                  {/* Product Image */}
                  <div className="relative h-48 bg-gradient-to-br from-white/5 to-white/[0.02] overflow-hidden">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-90 group-hover:scale-105 transition-all duration-500"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = 'none';
                      }}
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[9px] font-bold uppercase tracking-widest text-cyan-400 border border-cyan-500/20">
                        {product.mbti}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span className="px-2 py-1 bg-black/60 backdrop-blur-sm rounded-full text-[9px] font-bold uppercase tracking-widest text-white/50 border border-white/10">
                        {product.mbtiName}
                      </span>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-sm font-bold leading-snug line-clamp-2 group-hover:text-cyan-400 transition-colors">
                      {product.title}
                    </h3>
                    <p className="text-xs text-white/40 line-clamp-2">
                      {product.description}
                    </p>

                    {/* Format badges */}
                    <div className="flex gap-2">
                      {product.formats.slice(0, 3).map((fmt, j) => (
                        <span key={j} className="text-[9px] px-2 py-0.5 bg-white/5 rounded-full text-white/30 border border-white/5">
                          {fmt}
                        </span>
                      ))}
                    </div>

                    {/* Price + CTA */}
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <div>
                        <span className="text-xs text-white/20 line-through mr-2">
                          {formatPrice(product.originalPrice)}
                        </span>
                        <span className="text-lg font-black text-cyan-400" style={{ fontFamily: 'Orbitron, sans-serif' }}>
                          {formatPrice(product.price)}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-cyan-400 transition-colors flex items-center gap-1">
                        View <ArrowRight className="w-3 h-3" />
                      </span>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-white/30 text-lg">No products found for this filter.</p>
            <button
              onClick={() => { setSelectedType('all'); setSearchQuery(''); }}
              className="mt-4 text-cyan-500 text-sm hover:underline"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-20 space-y-6">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 rounded-full border border-white/10">
            <Sparkles className="w-4 h-4 text-cyan-500" />
            <span className="text-xs text-white/50">Want a product built specifically for YOUR type?</span>
          </div>
          <div>
            <a
              href="/"
              className="inline-flex items-center gap-3 px-10 py-5 bg-white text-black rounded-full font-black uppercase tracking-widest hover:bg-cyan-500 hover:text-white transition-all text-sm"
            >
              Take the Free Assessment
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
          <p className="text-xs text-white/20">
            Get your personalized Consciousness Blueprint first — then browse products tailored to your exact type.
          </p>
        </div>
      </main>

      {/* Footer Trust */}
      <footer className="fixed bottom-0 left-0 right-0 p-6 flex justify-center gap-8 bg-gradient-to-t from-black to-transparent z-[60] opacity-40">
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest">Secure Protocol</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest">Instant Activation</span>
        </div>
      </footer>
    </div>
  );
}
