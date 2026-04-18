"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './Page2Landing.module.css';

export default function Page2Landing() {
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
          <div className={styles.frameworkBadge}>THE 7 UNCONSCIOUS ARCHITECTURES</div>
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
      <section className={styles.section}>
        <motion.p 
          className={styles.preExampleText}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          You may already know your pattern. You just don't have a name for it yet.
        </motion.p>
        <motion.div
          className={styles.exampleCard}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
        >          <div className={styles.exampleLabel}>Signature Architecture #04</div>
          <h3 className={styles.exampleTitle}>The Invisible Architect</h3>
          <p className={styles.exampleDescription}>
            A mind that builds complex systems and success for everyone else while systematically dismantling its own.
          </p>
          <div className={styles.exampleImpact}>
            Result: High external achievement + Deep internal exhaustion.
          </div>
        </motion.div>
      </section>

      {/* SECTION 3 — THE 3-STEP FLOW */}
      <section className={styles.section}>
        <div className={styles.mechanismGrid}>
          <div className={styles.mechanismItem}>
            <span className={styles.stepNum}>01</span>
            <h3>IDENTIFY</h3>
            <p>We name the specific cognitive loop running your life.</p>
          </div>
          <div className={styles.mechanismItem}>
            <span className={styles.stepNum}>02</span>
            <h3>MATCH</h3>
            <p>We pair your architecture with tools you actually respond to.</p>
          </div>
          <div className={styles.mechanismItem}>
            <span className={styles.stepNum}>03</span>
            <h3>DISSOLVE</h3>
            <p>21 days of precision practice to clear the source code.</p>
          </div>
        </div>
      </section>

      {/* SECTION 4 — SOCIAL PROOF OF SCALE */}
      <section className={styles.section}>
        <div className={styles.socialProof}>
          <div className={styles.scaleCounter}>47,000+</div>
          <p className={styles.scaleText}>Patterns decoded this month across 12 countries.</p>
          <div className={styles.liveSignal}>
            <span className={styles.pulseDot}></span>
            <span>342 people currently decoding their architecture</span>
          </div>
        </div>
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
            Secure My Architectural Blueprint
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
}
