
"use client";

import React from 'react';
import { motion } from 'framer-motion';
import styles from './MiniHeroBranding.module.css';

export default function MiniHeroBranding() {
    return (
        <motion.div 
            className={styles.container}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className={styles.titleWrapper}>
                <div className={styles.titleMain}>Spiritual AI</div>
                <div className={styles.titleGlow}>Spiritual AI</div>
            </div>
        </motion.div>
    );
}
