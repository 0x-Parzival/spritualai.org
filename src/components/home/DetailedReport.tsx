"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DetailedReport.module.css';
import { UserState } from '@/lib/spiritual-conversation-engine';
import PretextWrapper from './PretextWrapper';
import { Skeleton } from 'boneyard-js/react';
import { Share2, MessageCircle, Twitter } from 'lucide-react';

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
    const { header, meta, vedicOverview, validation, realCause, cosmicAlignment, frequencyDoorway, teaching, witnessQuestion } = report;
    const originPoint = userState?.originPoint;
    const products = userState.recommendedProducts || report.products || [];

    const userName = userState.name || "Seeker";
    const patternName = header?.patternName || meta?.corePattern || "Unconscious Pattern";
    const architecture = header?.architecture || userState.confirmedMBTI || "Decoding...";
    const urgencyPercent = header?.urgencyPercent || 85;

    return (
        <div className={styles.reportContainer} id="report-section" ref={reportRef}>
            <div className={styles.reportContent}>
                {/* 1. HEADER */}
                <header className={styles.reportHeader}>
                    <div className={styles.headerTop}>
                        <div>
                            <div className={styles.originBadge}>ORIGIN POINT ETCHED • CSN #{originPoint?.csn?.split('-').pop()}</div>
                            <h1 className={styles.blueprintTitle}>{userName.toUpperCase()}'S CONSCIOUSNESS BLUEPRINT</h1>
                            <div className={styles.metadataRow}>
                                <span>ARCH: {architecture}</span>
                                <span>PATTERN: {patternName}</span>
                            </div>
                        </div>
                        <div className={styles.urgencySection}>
                            <div className={styles.urgencyLabel}>DECODING CONFIDENCE</div>
                            <div className={styles.urgencyBar}>
                                <div className={styles.urgencyFill} style={{ width: `${urgencyPercent}%` }}></div>
                            </div>
                        </div>
                    </div>
                </header>

                {/* 2. META GRID (The Layers) */}
                <div className={styles.metaGrid}>
                    <div className={styles.metaItem}>
                        <label>FREQUENCY ESTIMATE</label>
                        <div className={styles.metaValue}>{meta?.frequencyEstimate}</div>
                    </div>
                    <div className={styles.metaItem}>
                        <label>CORE PATTERN</label>
                        <div className={styles.metaValue}>{meta?.corePattern}</div>
                    </div>
                    <div className={styles.metaItem}>
                        <label>ROOT BELIEF</label>
                        <div className={styles.metaValue}>{meta?.rootBelief}</div>
                    </div>
                    <div className={styles.metaItem}>
                        <label>LIFE PHASE</label>
                        <div className={styles.metaValue}>{meta?.lifePhase}</div>
                    </div>
                </div>

                {/* 3. VEDIC OVERVIEW */}
                <div className={styles.vedicSection}>
                    <h2 className={styles.sectionTitle}>VEDIC BLUEPRINT</h2>
                    <div className={styles.vedicGrid}>
                        <div className={styles.vedicItem}>
                            <strong>LAGNA</strong>
                            <p>{vedicOverview?.lagna}</p>
                        </div>
                        <div className={styles.vedicItem}>
                            <strong>MOON</strong>
                            <p>{vedicOverview?.moon}</p>
                        </div>
                        <div className={styles.vedicItem}>
                            <strong>NAKSHATRA</strong>
                            <p>{vedicOverview?.nakshatra}</p>
                        </div>
                        <div className={styles.vedicItem}>
                            <strong>CURRENT DASHA</strong>
                            <p>{vedicOverview?.currentDasha}</p>
                        </div>
                    </div>
                    {vedicOverview?.saturnReturn && (
                        <div className={styles.saturnAlert}>
                            ⚠️ {vedicOverview.saturnReturn}
                        </div>
                    )}
                </div>

                {/* 4. CONTENT SECTIONS */}
                <div className={styles.sectionsGrid}>
                    <section className={styles.fullWidthSection}>
                        <h2 className={styles.smallHeading}>THE VALIDATION</h2>
                        <PretextWrapper 
                            text={validation || ""}
                            font="300 1.2rem 'Inter', sans-serif"
                            lineHeight={36}
                            width={containerWidth}
                            className={styles.pretextBody}
                            centerExclusion={true}
                        />
                    </section>

                    <section className={styles.textSection}>
                        <h2 className={styles.smallHeading}>THE REAL CAUSE</h2>
                        <PretextWrapper 
                            text={realCause || ""}
                            font="300 1.1rem 'Inter', sans-serif"
                            lineHeight={32}
                            width={containerWidth}
                            className={styles.pretextBody}
                            centerExclusion={true}
                        />
                    </section>

                    <section className={styles.textSection}>
                        <h2 className={styles.smallHeading}>COSMIC ALIGNMENT</h2>
                        <PretextWrapper 
                            text={cosmicAlignment || ""}
                            font="300 1.1rem 'Inter', sans-serif"
                            lineHeight={32}
                            width={containerWidth}
                            className={styles.pretextBody}
                            centerExclusion={true}
                        />
                    </section>

                    <section className={styles.fullWidthSection}>
                        <h2 className={styles.smallHeading}>THE FREQUENCY DOORWAY</h2>
                        <div className={styles.doorwayBox}>
                            <PretextWrapper 
                                text={frequencyDoorway || ""}
                                font="400 1.3rem 'Orbitron', sans-serif"
                                lineHeight={40}
                                width={containerWidth}
                                className={styles.pretextBody}
                                centerExclusion={true}
                                style={{ color: '#00f2ff' }}
                            />
                        </div>
                    </section>

                    <section className={styles.textSection}>
                        <h2 className={styles.smallHeading}>THE TEACHING</h2>
                        <blockquote className={styles.teachingQuote}>
                            <PretextWrapper 
                                text={teaching || ""}
                                font="italic 300 1.2rem 'Inter', sans-serif"
                                lineHeight={34}
                                width={containerWidth}
                                className={styles.pretextBody}
                                centerExclusion={true}
                            />
                        </blockquote>
                    </section>

                    <section className={styles.textSection}>
                        <h2 className={styles.smallHeading}>THE WITNESS QUESTION</h2>
                        <div className={styles.witnessBox}>
                            <p className={styles.witnessQuestion}>{witnessQuestion}</p>
                        </div>
                    </section>
                </div>

                {/* 5. SHARE ACTIONS */}
                <div className={styles.shareSection}>
                    <div className={styles.shareCard}>
                        <div className={styles.shareIdentity}>{architecture} · {patternName}</div>
                        <div className={styles.shareActions}>
                            <button className={styles.shareBtn}>
                                <Share2 size={16} /> Share Blueprint
                            </button>
                            <a href="#" className={styles.shareBtn}>
                                <MessageCircle size={16} /> WhatsApp
                            </a>
                            <a href="#" className={styles.shareBtn}>
                                <Twitter size={16} /> Twitter
                            </a>
                        </div>
                    </div>
                </div>

                {/* 6. PRODUCTS */}
                <div className={styles.productsHeader}>
                    <h2 className={styles.productsTitle}>NEURAL INSTRUMENTS</h2>
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
                                <button className={styles.prodCta}>{prod.ctaText || 'Acquire Instrument'}</button>
                            </motion.div>
                        ))}
                    </div>
                </Skeleton>
            </div>
        </div>
    );
}
