"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';

const lokas = [
  { name: 'Tapoloka', desc: 'Dense Matter', color: '#ff5252' },
  { name: 'Janaloka', desc: 'Born of Penance', color: '#ff6f00' },
  { name: 'Maharloka', desc: 'Great World', color: '#ffab00' },
  { name: 'Janaloka', desc: 'Born of Truth', color: '#ffd740' },
  { name: 'Tapoloka', desc: 'Experience', color: '#ffff00' },
  { name: 'Satyaloka', desc: 'Truth', color: '#c6ff00' },
  { name: 'Maharloka', desc: 'Great Truth', color: '#00e676' },
  { name: 'Janaloka', desc: 'Birth', color: '#00f2ff' },
  { name: 'Tapoloka', desc: 'Form', color: '#2979ff' },
  { name: 'Satyaloka', desc: 'Wisdom', color: '#651fff' },
  { name: 'Maharloka', desc: 'Light', color: '#aa00ff' },
  { name: 'Janaloka', desc: 'Creation', color: '#ff4081' },
  { name: 'Tapoloka', desc: 'Essence', color: '#ff1744' },
  { name: 'Satyaloka', desc: 'Liberation', color: '#ffffff' },
];

export default function MobileChapter5() {
  return (
    <div
      style={{
        minHeight: '100vh',
        padding: '80px 24px',
        background: 'linear-gradient(180deg, #0d0d20 0%, #050510 50%, #0d0d20 100%)',
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
        style={{ borderColor: '#fff', color: '#fff', marginBottom: '32px' }}
      >
        THE 14 LOKAS
      </motion.span>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className={styles.sectionTitle}
        style={{ textAlign: 'center', marginBottom: '40px', fontSize: 'clamp(1.4rem, 5.5vw, 2.2rem)' }}
      >
        Journey Through <span style={{ color: '#fff' }}>Consciousness</span>
      </motion.h2>

      {/* Loka Spiral */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: '10px',
        maxWidth: '400px',
        marginBottom: '40px',
      }}>
        {lokas.map((loka, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            style={{
              background: `rgba(${hexToRgb(loka.color)}, 0.15)`,
              border: `1px solid ${loka.color}`,
              borderRadius: '12px',
              padding: '12px 16px',
              textAlign: 'center',
              minWidth: '100px',
            }}
          >
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.85rem',
              color: loka.color,
              marginBottom: '4px',
            }}>
              {loka.name}
            </div>
            <div style={{
              fontFamily: 'Inter, sans-serif',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.6)',
            }}>
              {loka.desc}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Vishnu Image */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        style={{ marginTop: '20px' }}
      >
        <img 
          src="/images/home/vishnu.png" 
          alt="Lord Vishnu"
          style={{ 
            width: '100%', 
            maxWidth: '300px', 
            height: 'auto',
            filter: 'drop-shadow(0 0 20px rgba(255,255,255,0.2))',
          }}
        />
      </motion.div>
    </div>
  );
}

function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result 
    ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`
    : '255, 255, 255';
}
