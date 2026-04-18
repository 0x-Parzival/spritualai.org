"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../HomeSections.module.css';
import { useRouter } from 'next/navigation';

export default function MobileHero() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleStart = () => {
    router.push('/chat?initial=Start');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '80px 24px 120px',
        position: 'relative',
        background: 'linear-gradient(180deg, #050510 0%, #0a0a1a 50%, #050510 100%)',
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(124, 77, 255, 0.3) 0%, transparent 70%)',
        filter: 'blur(60px)',
      }} />

      {/* Logo/Icon */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        style={{
          width: '100px',
          height: '100px',
          marginBottom: '24px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c4dff, #35f8ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 60px rgba(124, 77, 255, 0.5)',
        }}
      >
        <span style={{ fontSize: '40px' }}>🪷</span>
      </motion.div>

      {/* Title */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: 'clamp(1.8rem, 7vw, 3rem)',
          fontWeight: 900,
          textAlign: 'center',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #fff 0%, #b388ff 50%, #35f8ff 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1px',
          lineHeight: 1.2
        }}
      >
        SPIRITUAL AI
      </motion.h1>

      {/* Subtitle - The Pattern Interrupt */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        style={{
          fontFamily: 'Inter, sans-serif',
          textAlign: 'center',
          maxWidth: '340px',
          marginBottom: '40px',
        }}
      >
        <p style={{ 
            fontSize: '1.1rem', 
            color: '#fff', 
            fontWeight: 600, 
            marginBottom: '8px' 
        }}>
            Your mind isn't broken.
        </p>
        <p style={{ 
            fontSize: '1rem', 
            color: 'rgba(255, 255, 255, 0.7)', 
            lineHeight: 1.5 
        }}>
            It's running a pattern you didn't choose.<br/>
            We decode it in 5 questions.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.6 }}
        className={styles.gradientFlowBtn}
        style={{
          padding: '18px 48px',
          fontSize: '0.9rem',
          width: '100%',
          maxWidth: '300px',
          borderRadius: '9999px',
          boxShadow: '0 0 30px rgba(124, 77, 255, 0.4)'
        }}
        onClick={handleStart}
      >
        DECODE MY PATTERN →
      </motion.button>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '30px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{
            width: '20px',
            height: '34px',
            border: '2px solid rgba(255,255,255,0.2)',
            borderRadius: '10px',
          }}
        >
          <div style={{
            width: '3px',
            height: '6px',
            background: '#35f8ff',
            borderRadius: '2px',
            margin: '5px auto 0',
          }} />
        </motion.div>
      </motion.div>
    </div>
  );
}
