"use client";

import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion';
import styles from './Page2Landing.module.css';
import { DECODE_PROMPT } from '../lib/decodePrompt';

const SIGNATURE_ARCHITECTURES = [
  { id: "01", title: "The Theoretical Titan", description: "Generates brilliant ideas but creates complexity to avoid launching them." },
  { id: "02", title: "The Sovereign in Exile", description: "Knows its worth but waits for external permission that never comes." },
  { id: "03", title: "The Sacred Giver", description: "Deeply compassionate but gives so much that their own identity vanishes." },
  { id: "04", title: "The Analytical Ghost", description: "Solves every problem except the one that would make them happy." },
  { id: "05", title: "The Untethered Visionary", description: "A vision that could change everything, but stays theoretical to avoid judgment." },
  { id: "06", title: "The Chaos Catalyst", description: "Installs chaos the moment things get too peaceful or successful." },
  { id: "07", title: "The Logic Shield", description: "Uses logic as a shield to avoid feeling the weight of their own existence." },
  { id: "08", title: "The Underperformer", description: "Possesses elite skills but performs at 20% to avoid the burden of greatness." },
  { id: "09", title: "The Pattern Prophet", description: "Expert at identifying everyone else's patterns while staying blind to their own." },
  { id: "10", title: "The Chronic Student", description: "Constantly preparing, never arriving. The loop of one more course." },
];

export default function Page2Landing({ onArchitectureView }: { onArchitectureView?: (title: string) => void }) {
  const mouseX = useSpring(useMotionValue(0), { stiffness: 50, damping: 20 });
  const [copySuccess, setCopySuccess] = useState(false);

  const copyDecoderPrompt = () => {
    navigator.clipboard.writeText(DECODE_PROMPT);
    setCopySuccess(true);
    setTimeout(() => setCopySuccess(false), 3000);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) - 0.5);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX]);

  const translateX = useTransform(mouseX, (x) => x * -200);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
        const input = document.querySelector('.cta-message-box input') as HTMLInputElement;
        if (input) input.focus();
    }, 800);
  };

  return (
    <div className={styles.container}>
      <div className={styles.lightnessOverlay}></div>
      
      {/* SECTION 1 — AUTHORITY & FRAMEWORK */}
      <section className={styles.section}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className={styles.contentCenter}
        >
          <h2 className={styles.headline}>
            "The reason nothing has worked has nothing to do with effort."
          </h2>
          <p className={styles.bodyText}>
            You've read the books. Done the courses. Tried therapy. The same patterns still show up.
          </p>
          <p className={styles.bodyText}>
            You are not broken. Most solutions fail because they were designed for an average mind that does not exist.
          </p>
        </motion.div>
      </section>

      {/* SECTION 2 — THE CONCRETE EXAMPLE (THE SKEPTIC'S BRIDGE) */}
      <section className={styles.section} style={{ width: '100vw', maxWidth: 'none', overflowX: 'hidden', left: 0, alignItems: 'flex-start' }}>
        <motion.p 
          className={styles.preExampleText}
          style={{ width: '100%', textAlign: 'center' }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          You may already know your pattern. You just don't have a name for it yet.
        </motion.p>
        
        <motion.div className={styles.marqueeSection} style={{ x: translateX, left: 0 }}>
          <div className={styles.marqueeTrack}>
            {[...SIGNATURE_ARCHITECTURES, ...SIGNATURE_ARCHITECTURES, ...SIGNATURE_ARCHITECTURES, ...SIGNATURE_ARCHITECTURES].map((arch, i) => (
              <motion.div 
                key={i} 
                className={styles.smallExampleCard}
                whileHover={{ scale: 1.05, y: -10, zIndex: 100 }}
                onViewportEnter={() => onArchitectureView?.(arch.title)}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              >
                <div className={styles.smallLabel}>Signature Architecture #{arch.id}</div>
                <h4 className={styles.smallTitle}>{arch.title}</h4>
                <p className={styles.smallDescription}>{arch.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className={styles.section} style={{ marginTop: '4vh', marginBottom: '4vh' }}>
        <motion.div 
          className={styles.blueprintBanner}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >
          <div className={styles.bannerGlow} />
          <div className={styles.bannerContent}>
            <div className={styles.bannerLeft}>
              <h3 className={styles.bannerTitle}>Unlock Your Consciousness Blueprint</h3>
              <p className={styles.bannerText}>
                Copy this neural prompt and paste it into your preferred AI (ChatGPT, Claude, Gemini, or Grok).
                Then, paste the AI's analysis back into the decoder at the bottom of the page.
              </p>
            </div>
            <div className={styles.bannerRight}>
              <button className={styles.bannerCopyBtn} onClick={copyDecoderPrompt}>
                {copySuccess ? "✓ PROMPT COPIED" : "COPY NEURAL PROMPT"}
              </button>
              <div className={styles.bannerLinks}>
                <a href="https://chatgpt.com" target="_blank">ChatGPT</a>
                <a href="https://claude.ai" target="_blank">Claude</a>
                <a href="https://gemini.google.com" target="_blank">Gemini</a>
                <a href="https://grok.com" target="_blank">Grok</a>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* SECTION 5 — THE INVITATION (Absolute Bottom) */}
      <motion.div 
        className={styles.invitationContainer}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className={styles.invitationText}>
          <p>Your architecture is unique. It runs a profound pattern that requires a specific key to unlock and dissolve.</p>
          <p>Generic wisdom cannot see you. <strong>We do.</strong></p>
        </div>
        
        <div className={styles.invitationCtaWrapper}>
          <motion.button
            onClick={scrollToTop}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={styles.ctaButton}
          >
            Chat with AI
          </motion.button>        </div>
      </motion.div>
    </div>
  );
}
