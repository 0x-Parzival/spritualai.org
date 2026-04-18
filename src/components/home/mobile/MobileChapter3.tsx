"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';

export default function MobileChapter3() {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #0d0d20 0%, #001a10 50%, #0d0d20 100%)',
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
        style={{ borderColor: '#00ffa3', color: '#00ffa3', marginBottom: '32px' }}
      >
        CHAPTER 03 — EVOLUTION
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.4rem, 5.5vw, 2.5rem)',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '32px',
          background: 'linear-gradient(135deg, #00ffa3, #00e5ff)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          lineHeight: 1.2,
        }}
      >
        Your Digital Evolution, Engineered
      </motion.h2>

      {/* Evolution Image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        style={{
          width: '100%',
          maxWidth: '360px',
          borderRadius: '24px',
          overflow: 'hidden',
          border: '1px solid rgba(0, 255, 163, 0.3)',
          marginBottom: '40px',
        }}
      >
        <img 
          src="/images/home/delivery-evolution.gif" 
          alt="Digital Evolution"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </motion.div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.gradientFlowBtn}
        style={{ 
          padding: '16px 40px', 
          fontSize: '0.85rem',
          background: 'linear-gradient(135deg, #0E1B1A, #00ffa3, #00e5ff, #0E1B1A)',
        }}
      >
        START EVOLVING →
      </motion.button>
    </div>
  );
}
