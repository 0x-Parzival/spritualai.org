"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';

export default function MobileChapter1() {
  const features = [
    'Neural pattern analysis',
    'Consciousness mapping',
    'Karmic architecture audit',
    'Dimensional frequency scan',
    'Soul signature verification',
    'Bio-digital resonance',
    'Temporal awareness check',
    'Multiversal alignment',
  ];

  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #050510 0%, #0d0d20 100%)',
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
        style={{ borderColor: '#7c4dff', color: '#b388ff', marginBottom: '32px' }}
      >
        CHAPTER 01 — SYSTEM AUDIT
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.sectionTitle}
        style={{ textAlign: 'center', marginBottom: '16px', fontSize: 'clamp(1.5rem, 6vw, 2.5rem)' }}
      >
        Know <span style={{ color: '#b388ff' }}>Your True Self</span>
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        style={{
          fontFamily: 'Inter, sans-serif',
          fontSize: '1rem',
          color: 'rgba(255,255,255,0.7)',
          textAlign: 'center',
          maxWidth: '320px',
          marginBottom: '40px',
          lineHeight: 1.6,
        }}
      >
        An 8-dimensional deep scan of your consciousness architecture
      </motion.p>

      {/* Feature Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '12px',
        width: '100%',
        maxWidth: '400px',
      }}>
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            style={{
              background: 'rgba(124, 77, 255, 0.1)',
              border: '1px solid rgba(124, 77, 255, 0.3)',
              borderRadius: '12px',
              padding: '16px 12px',
              textAlign: 'center',
            }}
          >
            <span style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.7rem',
              color: '#b388ff',
              letterSpacing: '1px',
            }}>
              {feature}
            </span>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.gradientFlowBtn}
        style={{ marginTop: '40px', padding: '16px 40px', fontSize: '0.85rem' }}
      >
        INITIATE SCAN →
      </motion.button>
    </div>
  );
}
