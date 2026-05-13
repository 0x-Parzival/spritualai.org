"use client";

import React from 'react';
import styles from './AuthGate.module.css';
import LegacyLogin from './LegacyLogin';
import LegacySignup from './LegacySignup';

interface AuthGateProps {
  mode?: 'signin' | 'signup';
  onClose?: () => void;
  noOverlay?: boolean;
}

export default function AuthGate({ mode = 'signup', onClose, noOverlay = false }: AuthGateProps) {
  return (
    <div className={noOverlay ? "" : styles.overlay}>
      {onClose && <button className={styles.closeBtn} style={{ zIndex: 10001 }} onClick={onClose}>✕</button>}
      {mode === 'signup' ? <LegacySignup isEmbedded={noOverlay} /> : <LegacyLogin isEmbedded={noOverlay} />}
    </div>
  );
}
