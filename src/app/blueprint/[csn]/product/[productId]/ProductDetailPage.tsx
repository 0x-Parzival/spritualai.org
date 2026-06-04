'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface ProductDetailPageProps {
  product: any;
  csn: string;
  mbti: string;
  identity: string;
}

export default function ProductDetailPage({ product, csn, mbti, identity }: ProductDetailPageProps) {
  return (
    <div className="min-h-screen bg-[#0a0a1a] text-white p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        <Link 
          href={`/blueprint/${csn}`}
          className="text-[#35f8ff] hover:underline mb-8 inline-block font-mono text-sm"
        >
          &larr; Back to Blueprint
        </Link>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 border border-[#35f8ff]/20 rounded-2xl p-8 md:p-12 shadow-2xl backdrop-blur-sm"
        >
          <div className="mb-6">
            <span className="text-[#35f8ff] font-mono text-xs uppercase tracking-[0.2em]">Instrument Analysis</span>
            <h1 className="text-3xl md:text-5xl font-bold mt-2 font-display">{product.name}</h1>
            <p className="text-xl text-white/60 italic mt-4">{product.tagline || product.whyYou}</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mt-12">
            <div>
              <h3 className="text-[#35f8ff] font-mono text-sm uppercase mb-4">Target Architecture</h3>
              <p className="text-white/80 leading-relaxed">
                {product.targetProblem || product.headline || `This instrument is specifically designed for the ${mbti} cognitive architecture and the "${identity}" pattern.`}
              </p>

              <h3 className="text-[#35f8ff] font-mono text-sm uppercase mt-8 mb-4">What's Inside</h3>
              <ul className="space-y-3">
                {(product.whatYouGet || product.formats || []).map((item: string, i: number) => (
                  <li key={i} className="flex items-start gap-3 text-white/70">
                    <span className="text-[#35f8ff]">▹</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white/5 rounded-xl p-8 border border-white/10 flex flex-column justify-between">
              <div>
                <h3 className="text-white/40 text-sm uppercase font-mono mb-2">Investment</h3>
                <div className="flex items-baseline gap-4">
                  <span className="text-4xl font-bold text-[#35f8ff]">₹{product.price?.discounted || product.price}</span>
                  {product.price?.original && (
                    <span className="text-white/30 line-through text-xl">₹{product.price.original}</span>
                  )}
                </div>
                <p className="text-white/40 text-xs mt-4 uppercase tracking-wider">{product.urgencyLine || 'Limited founding member pricing'}</p>
              </div>

              <button 
                className="w-full mt-8 bg-gradient-to-r from-[#35f8ff] to-[#0080ff] text-[#0a0a1a] py-4 rounded-lg font-bold uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-lg shadow-[#35f8ff]/20"
                onClick={() => alert('Payment gateway integration coming soon.')}
              >
                {product.ctaText || 'Get My Instrument'}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
