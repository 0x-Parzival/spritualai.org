"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import styles from './DetailedReport.module.css';
import { UserState } from '@/lib/spiritual-conversation-engine';
import PretextWrapper from './PretextWrapper';
import { Skeleton } from 'boneyard-js/react';

const FREE_PRODUCTS = [
  {
    id: 'free_pattern_guide',
    name: 'Your Pattern Decoded — 1-Page Guide',
    headline: 'The one page that explains more than most books.',
    description: 'A concise breakdown of your unconscious pattern, its root cause, and the single most important thing to understand about it.',
    format: 'PDF + Audio (5 minutes)',
    price: 0,
    gate: 'social_follow',
    gateText: 'Follow Spiritual AI to unlock',
    platforms: ['instagram', 'whatsapp', 'discord'],
    imageQuery: 'sacred geometry lotus minimal',
  },
  {
    id: 'free_morning_reset',
    name: '7-Minute Morning Pattern Reset',
    headline: 'Interrupt the pattern before it runs today.',
    description: 'A 7-minute guided audio that interrupts your specific pattern type before it activates. Works within 3 days of consistent use.',
    format: 'Audio (7 minutes)',
    price: 0,
    gate: 'email',
    gateText: 'Enter your email to unlock',
    imageQuery: 'morning sunrise meditation calm',
  }
];

interface DetailedReportProps {
    userState: UserState | null;
    onClose?: () => void;
}

export default function DetailedReport({ userState, onClose }: DetailedReportProps) {
    const [isVisible, setIsVisible] = useState(false);
    const [containerWidth, setContainerWidth] = useState(1200);
    const reportRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setIsVisible(true);
        const handleResize = () => {
            const width = Math.min(1400, window.innerWidth - 120);
            setContainerWidth(width);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!userState || !userState.report) return null;

    const report: any = userState.report;
    const header = report.header || {};
    const loop = report.loop || {};
    const products = userState.recommendedProducts || report.products || [];

    const userName = userState.name || "Your";
    const patternName = header.patternName || userState.detectedPattern?.replace('_', ' ').toUpperCase() || "Unconscious Pattern";
    const architecture = header.architecture || userState.confirmedMBTI || "Decoding...";
    const urgencyPercent = header.urgencyPercent || 85;

    // Split text sections for grid
    const textSections = [
        { title: "SECTION 01 — THE MIRROR", content: report.mirror },
        { title: "SECTION 02 — THE ROOT", content: report.root },
        { title: "SECTION 04 — COSMIC CONFIRMATION", content: report.cosmicConfirmation },
        { title: "SECTION 05 — THE HUMAN COST", content: report.costSection },
        { title: "SECTION 06 — THE PATH FORWARD", content: report.path }
    ];

    return (
        <div className={styles.reportContainer} id="report-section" ref={reportRef}>
            <div className={styles.reportContent}>
                <header className={styles.reportHeader}>
                    <div className={styles.headerTop}>
                        <div>
                            <h1 className={styles.blueprintTitle}>{userName.toUpperCase()}'S CONSCIOUSNESS BLUEPRINT</h1>
                            <div className={styles.metadataRow}>
                                <span>ARCH: {architecture}</span>
                                <span>PATTERN: {patternName}</span>
                            </div>
                        </div>
                        <div className={styles.urgencySection}>
                            <div className={styles.urgencyLabel}>URGENCY PROTOCOL</div>
                            <div className={styles.urgencyBar}>
                                <div className={styles.urgencyFill} style={{ width: `${urgencyPercent}%` }}></div>
                            </div>
                        </div>
                    </div>
                </header>

                <div className={styles.sectionsGrid}>
                    {textSections.map((section, idx) => (
                        <motion.section 
                            key={idx}
                            className={styles.textSection}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <h2 className={styles.smallHeading}>{section.title}</h2>
                            <PretextWrapper 
                                text={section.content || ""}
                                font="300 1.1rem 'Inter', sans-serif"
                                lineHeight={32}
                                width={idx % 2 === 0 ? (containerWidth / 2) - 40 : (containerWidth / 2) - 40}
                                className={styles.pretextBody}
                            />
                        </motion.section>
                    ))}

                    <motion.section 
                        className={styles.fullWidthSection}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.smallHeading}>SECTION 03 — THE PATTERN LOOP</h2>
                        <div className={styles.loopVisual}>
                            <div className={styles.loopItem}>
                                <div className={styles.loopLabel}>TRIGGER</div>
                                <div className={styles.loopValue}>{loop.trigger}</div>
                            </div>
                            <div className={styles.loopArrow}>→</div>
                            <div className={styles.loopItem}>
                                <div className={styles.loopLabel}>COPING</div>
                                <div className={styles.loopValue}>{loop.copingMechanism}</div>
                            </div>
                            <div className={styles.loopArrow}>→</div>
                            <div className={styles.loopItem}>
                                <div className={styles.loopLabel}>COST</div>
                                <div className={styles.loopValue}>{loop.cost}</div>
                            </div>
                        </div>
                    </motion.section>
                </div>

                <div className={styles.productsHeader}>
                    <h2 className={styles.productsTitle}>FREE RESOURCES</h2>
                </div>
                
                <div className={styles.productsGrid}>
                    {FREE_PRODUCTS.map((prod: any, idx: number) => (
                        <motion.div 
                            key={idx} 
                            className={styles.productCard}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                        >
                            <div className={styles.prodName}>{prod.name}</div>
                            <div style={{ fontSize: '0.8rem', opacity: 0.8, marginBottom: '10px' }}>{prod.headline}</div>
                            <div className={styles.prodPrice}>FREE</div>
                            <button className={styles.prodCta}>{prod.gateText}</button>
                        </motion.div>
                    ))}
                </div>

                <div className={styles.productsHeader}>
                    <h2 className={styles.productsTitle}>RECOMMENDED PROTOCOLS</h2>
                </div>

                <Skeleton 
                    name="product-cards"
                    loading={!products || products.length === 0}
                    color="rgba(167,139,250,0.06)"
                    darkColor="rgba(167,139,250,0.08)"
                    animate="shimmer"
                >
                    <div className={styles.productsGrid}>
                        {products.map((prod: any, idx: number) => (
                            <motion.div 
                                key={idx} 
                                className={styles.productCard}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.2 }}
                            >
                                <div className={styles.prodName}>{prod.name}</div>
                                <div className={styles.prodPrice}>${prod.price}</div>
                                <button className={styles.prodCta}>{prod.ctaText}</button>
                            </motion.div>
                        ))}
                    </div>
                </Skeleton>
            </div>
        </div>
    );
}
