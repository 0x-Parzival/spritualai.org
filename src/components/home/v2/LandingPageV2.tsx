"use client";

import React from 'react';
import { motion } from 'framer-motion';
import HeroTitle from '../../HeroTitle';
import HeroCTA from '../../HeroCTA';
import styles from '../HomeSections.module.css';

interface LandingProps {
    onStart: () => void;
}

export default function LandingPageV2({ onStart }: LandingProps) {
    return (
        <section className={styles.section} style={{ height: '100vh', scrollSnapAlign: 'start', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                style={{ textAlign: 'center', zIndex: 10 }}
            >
                <HeroTitle />
                <div style={{ marginTop: '40px' }}>
                    <p style={{ fontFamily: 'Inter', fontSize: '1.5rem', color: 'rgba(255,255,255,0.8)', maxWidth: '800px', margin: '0 auto 40px', lineHeight: 1.6 }}>
                        The world's first AI-powered personality optimization engine. 
                        Bridge the gap between your biological architecture and your digital evolution.
                    </p>
                    <motion.button 
                        onClick={onStart}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={styles.gradientFlowBtn}
                        style={{ padding: '20px 60px', fontSize: '1.2rem', fontWeight: 900, letterSpacing: '2px' }}
                    >
                        BEGIN YOUR ARCHITECTURAL AUDIT →
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
}
