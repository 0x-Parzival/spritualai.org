"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';

const personalityGroups = [
  { type: 'INTJ, INTP, ENTJ, ENTP', label: 'Architects' },
  { type: 'INFJ, INFP, ENFJ, ENFP', label: 'Visionaries' },
  { type: 'ISTJ, ISFJ, ESTJ, ESFJ', label: 'Guardians' },
  { type: 'ISTP, ISFP, ESTP, ESFP', label: 'Explorers' },
];

export default function MobileChapter4() {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #0d0d20 0%, #1a0020 50%, #0d0d20 100%)',
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
        style={{ borderColor: '#e040fb', color: '#ea80fc', marginBottom: '32px' }}
      >
        PERSONALITY OPTIMIZATION
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.sectionTitle}
        style={{ textAlign: 'center', marginBottom: '32px', fontSize: 'clamp(1.4rem, 5.5vw, 2.2rem)' }}
      >
        16 Archetypes, <span style={{ color: '#ea80fc' }}>Infinite Growth</span>
      </motion.h2>

      {/* Personality Groups */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '360px' }}>
        {personalityGroups.map((group, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            style={{
              background: 'rgba(224, 64, 251, 0.08)',
              border: '1px solid rgba(224, 64, 251, 0.2)',
              borderRadius: '16px',
              padding: '20px',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.9rem',
              color: '#ea80fc',
              marginBottom: '8px',
              letterSpacing: '1px',
            }}>
              {group.type}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '1.1rem',
              color: 'rgba(255,255,255,0.9)',
              fontWeight: 600,
            }}>
              {group.label}
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.gradientFlowBtn}
        style={{ 
          marginTop: '40px', 
          padding: '16px 40px', 
          fontSize: '0.85rem',
          background: 'linear-gradient(135deg, #1a0020, #e040fb, #7c4dff, #1a0020)',
        }}
      >
        DISCOVER YOUR TYPE →
      </motion.button>
    </div>
  );
}
