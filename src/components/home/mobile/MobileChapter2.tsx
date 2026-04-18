"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';

export default function MobileChapter2() {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #0d0d20 0%, #1a0a00 50%, #0d0d20 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* Section Tag */}
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.sectionTag}
        style={{ borderColor: '#ff6f00', color: '#ffcc80', marginBottom: '32px' }}
      >
        CHAPTER 02 — THE AI GUIDE
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.sectionTitle}
        style={{ textAlign: 'center', marginBottom: '24px', fontSize: 'clamp(1.4rem, 5.5vw, 2.2rem)' }}
      >
        Your AI Guide Knows <span style={{ color: '#ffd700' }}>How You Think</span>
      </motion.h2>

      {/* Image Preview */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          width: '100%',
          maxWidth: '320px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(255, 111, 0, 0.3)',
          marginBottom: '32px',
        }}
      >
        <img 
          src="/images/home/lab-guide.gif" 
          alt="AI Guide Preview"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </motion.div>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.85)',
          textAlign: 'center',
          maxWidth: '320px',
          lineHeight: 1.7,
          marginBottom: '40px',
        }}
      >
        Connect with an intelligence designed specifically for your personality type. 
        It identifies the root of your challenge — not just the surface symptoms.
      </motion.p>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.gradientFlowBtn}
        style={{ padding: '16px 40px', fontSize: '0.85rem' }}
      >
        ACTIVATE MY AI GUIDE →
      </motion.button>
    </div>
  );
}
