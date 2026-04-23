"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { SignIn, SignUp } from '@clerk/nextjs';
import styles from './AuthGate.module.css';

interface AuthGateProps {
  mode?: 'signin' | 'signup';
  onClose?: () => void;
}

export default function AuthGate({ mode = 'signup', onClose }: AuthGateProps) {
  return (
    <div className={styles.overlay}>
      <motion.div 
        className={styles.modal}
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
      >
        <button className={styles.closeBtn} onClick={onClose}>✕</button>
        
        <div className={styles.authWrapper}>
          {mode === 'signup' ? (
            <SignUp 
              appearance={{
                elements: {
                  rootBox: styles.clerkRoot,
                  card: styles.clerkCard,
                }
              }}
              signInUrl="/login"
              routing="hash"
            />
          ) : (
            <SignIn 
              appearance={{
                elements: {
                  rootBox: styles.clerkRoot,
                  card: styles.clerkCard,
                }
              }}
              signUpUrl="/signup"
              routing="hash"
            />
          )}
        </div>

        <p className={styles.disclaimer}>
          Your consciousness blueprint is private and encrypted. 
          Login to secure your data across all timelines.
        </p>
      </motion.div>
    </div>
  );
}
