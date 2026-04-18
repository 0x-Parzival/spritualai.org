"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styles from './HomeSections.module.css';
import dynamic from 'next/dynamic';

const MobileHero = dynamic(() => import('./mobile/MobileHero'), { ssr: false });
const MobileChapter1 = dynamic(() => import('./mobile/MobileChapter1'), { ssr: false });
const MobileChapter2 = dynamic(() => import('./mobile/MobileChapter2'), { ssr: false });
const MobileChapter3 = dynamic(() => import('./mobile/MobileChapter3'), { ssr: false });
const MobileChapter4 = dynamic(() => import('./mobile/MobileChapter4'), { ssr: false });
const MobileChapter5 = dynamic(() => import('./mobile/MobileChapter5'), { ssr: false });
const MobileQuiz = dynamic(() => import('./mobile/MobileQuiz'), { ssr: false });
const MobileNav = dynamic(() => import('./mobile/MobileNav'), { ssr: false });
const MobileFooter = dynamic(() => import('./mobile/MobileFooter'), { ssr: false });

interface MobileHomeProps {
  onQuizComplete?: (mbti: string) => void;
}

export default function MobileHome({ onQuizComplete }: MobileHomeProps) {
  const [activeSection, setActiveSection] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
  });

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const section = Math.floor(latest * 7);
      setActiveSection(Math.min(section, 6));
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  const handleQuizComplete = (mbti: string) => {
    if (onQuizComplete) onQuizComplete(mbti);
  };

  return (
    <div 
      ref={containerRef}
      className="mobile-home-container"
      style={{
        height: '100vh',
        overflow: 'auto',
        scrollSnapType: 'y mandatory',
        scrollBehavior: 'smooth',
        background: '#050510',
      }}
    >
      {/* Hero Section */}
      <section style={{ scrollSnapAlign: 'start' }}>
        <MobileHero />
      </section>

      {/* Chapter 1 - System Audit */}
      <section style={{ scrollSnapAlign: 'start' }}>
        <MobileChapter1 />
      </section>

      {/* Chapter 2 - AI Guide */}
      <section style={{ scrollSnapAlign: 'start' }}>
        <MobileChapter2 />
      </section>

      {/* Chapter 3 - Evolution */}
      <section style={{ scrollSnapAlign: 'start' }}>
        <MobileChapter3 />
      </section>

      {/* Chapter 4 - Personality */}
      <section style={{ scrollSnapAlign: 'start' }}>
        <MobileChapter4 />
      </section>

      {/* Chapter 5 - 14 Lokas */}
      <section style={{ scrollSnapAlign: 'start' }}>
        <MobileChapter5 />
      </section>

      {/* MBTI Quiz */}
      <section style={{ scrollSnapAlign: 'start' }}>
        <MobileQuiz onComplete={handleQuizComplete} />
      </section>

      {/* Footer */}
      <MobileFooter />

      {/* Fixed Navigation */}
      <MobileNav activeSection={activeSection} totalSections={7} />
    </div>
  );
}
