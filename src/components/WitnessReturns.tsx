"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './WitnessReturns.module.css';

export default function WitnessReturns() {
    const [isVisible, setIsVisible] = useState(false);
    const [rating, setRating] = useState(0);
    const [narrative, setUserNarrative] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const stored = localStorage.getItem('spiritualAiState');
        if (!stored) return;

        const data = JSON.parse(stored);
        setUserData(data);

        const reportDate = data.reportGeneratedAt || data.created_at;
        if (!reportDate) return;

        const daysElapsed = (Date.now() - new Date(reportDate).getTime()) / (1000 * 60 * 60 * 24);
        
        // Show if 7 days have passed AND they haven't submitted yet
        const hasSubmitted = localStorage.getItem('outcome_submitted');
        if (daysElapsed >= 7 && !hasSubmitted) {
            setIsVisible(true);
        }
    }, []);

    const handleSubmit = async () => {
        if (rating === 0) return;

        try {
            const res = await fetch('/api/spiritual/outcome', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    sessionId: userData?.session_id || 'anonymous',
                    patternName: userData?.report?.header?.patternName || 'unknown',
                    mbtiType: userData?.confirmedMBTI || 'unknown',
                    interventionPath: userData?.report?.path || 'unknown',
                    successRating: rating,
                    userNarrative: narrative,
                    shiftDetected: rating >= 7
                }),
            });

            if (res.ok) {
                setIsSubmitted(true);
                localStorage.setItem('outcome_submitted', 'true');
                setTimeout(() => setIsVisible(false), 3000);
            }
        } catch (err) {
            console.error("Failed to submit outcome", err);
        }
    };

    if (!isVisible) return null;

    return (
        <AnimatePresence>
            <div className={styles.overlay}>
                <motion.div 
                    className={styles.modal}
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                >
                    {!isSubmitted ? (
                        <>
                            <h2 className={styles.title}>The Witness Returns</h2>
                            <p className={styles.subtitle}>
                                Seven suns have set since your blueprint was revealed. 
                                Has the thread of your pattern begun to shift?
                            </p>

                            <div className={styles.ratingGroup}>
                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                                    <button 
                                        key={num}
                                        className={`${styles.ratingBtn} ${rating === num ? styles.active : ''}`}
                                        onClick={() => setRating(num)}
                                    >
                                        {num}
                                    </button>
                                ))}
                            </div>

                            <textarea 
                                className={styles.textArea}
                                placeholder="Describe the shift in your own words (optional)..."
                                value={narrative}
                                onChange={(e) => setUserNarrative(e.target.value)}
                            />

                            <button className={styles.submitBtn} onClick={handleSubmit}>
                                Record My Evolution
                            </button>
                            
                            <button className={styles.closeBtn} onClick={() => setIsVisible(false)}>
                                Not now, I am still processing
                            </button>
                        </>
                    ) : (
                        <div className={styles.successState}>
                            <h2 className={styles.title}>Vision Sealed</h2>
                            <p className={styles.subtitle}>
                                Your evolution has been recorded in the cosmic fabric. 
                                Your data helps others find their way back.
                            </p>
                            <div style={{ fontSize: '3rem' }}>🪷</div>
                        </div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
