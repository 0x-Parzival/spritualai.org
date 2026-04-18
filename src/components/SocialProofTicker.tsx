"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './SocialProofTicker.module.css';

const notifications = [
    "14,847 seekers decoded across 12 countries",
    "INTJ from Vienna — 4 years of searching ended tonight",
    "12 seekers active right now in the decoding chamber",
    "INFJ from London — finally understood their loop",
    "4,200+ blueprints delivered this month",
    "ENFP from Tokyo — spiritual resonance found",
    "31 people joining the society in the last hour",
    "INTP from Seattle — logic meets ancient wisdom",
    "ENTJ from Sydney — strategic blueprint etched",
    "Someone just wept reading their consciousness report",
    "ISTP from Berlin — precision path unlocked",
    "847 seekers discovered their true architecture this week",
    "ENFJ from Paris — generational cycle broken",
    "44 people found their path while you were reading this",
    "ISFP from Seoul — artistic frequency stabilized",
    "ESTJ from Chicago — structural alignment complete",
    "ISTJ from Dubai — legacy pattern decoded"
];

export default function SocialProofTicker() {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        // Randomize the first index on load so it's different for every user
        setCurrentIndex(Math.floor(Math.random() * notifications.length));

        const interval = setInterval(() => {
            setCurrentIndex((prev) => {
                // Pick a random next index that is different from the current one
                let next;
                do {
                    next = Math.floor(Math.random() * notifications.length);
                } while (next === prev);
                return next;
            });
        }, 5000); // Rotates every 5 seconds (middle of 4-6s request)

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.tickerContainer}>
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentIndex}
                    initial={{ opacity: 0, rotateX: -90, transformPerspective: 800 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    exit={{ opacity: 0, rotateX: 90 }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                    className={styles.tickerText}
                    style={{ transformOrigin: 'center center' }}
                >
                    <span className={styles.dot}></span>
                    {notifications[currentIndex]}
                </motion.div>
            </AnimatePresence>
        </div>
    );
}
