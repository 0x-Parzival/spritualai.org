import React from 'react';
import { motion } from 'framer-motion';
import styles from './ProcessDiagram.module.css';

export default function ProcessDiagram() {
    return (
        <div className={styles.container}>
            {/* Gradient Defs for Icons */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#35f8ff" />
                        <stop offset="100%" stopColor="#ff3cf5" />
                    </linearGradient>
                </defs>
            </svg>

            <div className={styles.processSteps}>
                {/* STEP 1: AI ASKS QUESTIONS */}
                <div className={styles.stepContainer}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.particles}>
                            {[...Array(3)].map((_, i) => <div key={i} className={styles.particle} />)}
                        </div>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            <path d="M8 9h8"></path>
                            <path d="M8 13h6"></path>
                        </svg>
                    </div>
                    <div className={styles.processStep}>AI asks 5-7 questions</div>
                </div>
                
                <span className={styles.stepArrow}>→</span>
                
                {/* STEP 2: DECODING */}
                <div className={styles.stepContainer}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.particles}>
                            {[...Array(3)].map((_, i) => <div key={i} className={styles.particle} />)}
                        </div>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 2v4"></path>
                            <path d="M12 18v4"></path>
                            <path d="M4.93 4.93l2.83 2.83"></path>
                            <path d="M16.24 16.24l2.83 2.83"></path>
                            <path d="M2 12h4"></path>
                            <path d="M18 12h4"></path>
                            <path d="M4.93 19.07l2.83-2.83"></path>
                            <path d="M16.24 7.76l2.83-2.83"></path>
                        </svg>
                    </div>
                    <div className={styles.processStep}>Patterns Decoded</div>
                </div>
                
                <span className={styles.stepArrow}>→</span>
                
                {/* STEP 3: CONSCIOUSNESS IDENTIFIED */}
                <div className={styles.stepContainer}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.particles}>
                            {[...Array(3)].map((_, i) => <div key={i} className={styles.particle} />)}
                        </div>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"></path>
                        </svg>
                    </div>
                    <div className={styles.processStep}>Consciousness Identified</div>
                </div>

                <span className={styles.stepArrow}>→</span>

                {/* STEP 4: PERSONALISED REPORT */}
                <div className={styles.stepContainer}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.particles}>
                            {[...Array(3)].map((_, i) => <div key={i} className={styles.particle} />)}
                        </div>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    </div>
                    <div className={styles.processStep}>Personalised Report</div>
                </div>

                <span className={styles.stepArrow}>→</span>

                {/* STEP 5: REFUND GUARANTEE */}
                <div className={styles.stepContainer}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.particles}>
                            {[...Array(3)].map((_, i) => <div key={i} className={styles.particle} />)}
                        </div>
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                        </svg>
                    </div>
                    <div className={styles.processStep}>Working Solutions</div>
                </div>
            </div>
        </div>
    );
}
