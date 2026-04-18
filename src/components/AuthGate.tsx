"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, ArrowRight, Chrome, Apple } from 'lucide-react';
import styles from './AuthGate.module.css';

interface AuthGateProps {
  onAuthenticated: (email: string) => void;
  mbtiType: string;
}

export default function AuthGate({ onAuthenticated, mbtiType }: AuthGateProps) {
  const [email, setEmail] = useState('');
  const [isSending, setIsSending] = useState(false);

  const getCustomMessage = () => {
    return "Your full blueprint will be sent to your email — including your pattern name, your consciousness identity, and your personalised product list. Where should we send it?";
  };

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSending(true);
    // Simulate Blueprint Delivery
    setTimeout(() => {
      onAuthenticated(email);
      setIsSending(false);
    }, 1500);
  };

  return (
    <div className={styles.overlay}>
      <motion.div 
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <div className={styles.lotus}>✉️</div>
        <h2 className={styles.title}>Deliver Your Blueprint</h2>
        <p className={styles.subtitle}>{getCustomMessage()}</p>

        <div className={styles.portalGrid}>
          {/* 1. GOOGLE PORTAL */}
          <button className={styles.portalBtn} onClick={() => onAuthenticated('google-user@gmail.com')}>
            <Chrome size={18} className={styles.icon} />
            Receive via Google
          </button>

          {/* 2. APPLE PORTAL */}
          <button className={styles.portalBtn} onClick={() => onAuthenticated('apple-user@icloud.com')}>
            <Apple size={18} className={styles.icon} />
            Receive via Apple
          </button>
        </div>

        <div className={styles.divider}>
          <span>OR</span>
        </div>

        {/* 3. MAGIC LINK PORTAL */}
        <form onSubmit={handleMagicLink} className={styles.magicForm}>
          <div className={styles.inputWrapper}>
            <Mail size={18} className={styles.mailIcon} />
            <input 
              type="email" 
              placeholder="Enter your best email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              required
            />
          </div>
          <button type="submit" className={styles.submitBtn} disabled={isSending}>
            {isSending ? "SENDING..." : "Deliver My Blueprint"}
            <ArrowRight size={18} className={styles.arrow} />
          </button>
        </form>

        <p className={styles.disclaimer}>
          Your data is encrypted. Your blueprint is private. 
          Expect its arrival in your inbox instantly.
        </p>
      </motion.div>
    </div>
  );
}
