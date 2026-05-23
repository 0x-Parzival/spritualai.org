"use client";

import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './DetailedReport.module.css';
import { UserState } from '@/lib/spiritual-conversation-engine';
import PretextWrapper from './PretextWrapper';
import { Skeleton } from 'boneyard-js/react';
import { Share2, MessageCircle, Twitter, Lock } from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import LegacyLogin from '../LegacyLogin';
import { ARCHETYPE_THEMES } from '../CosmicBackground';

interface DetailedReportProps {
    userState: UserState | null;
    onClose?: () => void;
}

export default function DetailedReport({ userState, onClose }: DetailedReportProps) {
    const { isLoaded, isSignedIn } = useUser();
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

    if (!userState) return null;

    // Report is considered "Locked" if user is not signed in OR if the API explicitly said Unauthorized
    // We wait for isLoaded to be true before deciding if it's locked
    const isLocked = isLoaded && (!isSignedIn || (userState as any).isUnauthorized);

    if (isLocked) {
        return (
            <div id="report-section" style={{ width: '100vw', height: '100vh', position: 'relative', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <LegacyLogin isEmbedded={true} />
            </div>
        );
    }

    const report: any = userState.report || {};
    const { header, meta, vedicOverview, validation, realCause, patternLoop, frequencyDoorway, teaching, witnessQuestion } = report;
    const originPoint = userState?.originPoint;
    const products = userState.recommendedProducts || report.products || [];

    const userName = userState.name || "Seeker";
    const patternName = header?.patternName || meta?.coreShadowPattern || "Unconscious Pattern";
    const architecture = header?.architecture || userState.confirmedMBTI || "Decoding...";
    const urgencyPercent = header?.urgencyPercent || 87;
    const archetype = userState.activeArchetype?.toLowerCase() || 'seeker';

    return (
        <div className={`${styles.reportContainer}`} id="report-section" ref={reportRef} style={{
            '--archetype-primary': ARCHETYPE_THEMES[archetype]?.primary || '#7c4dff',
            '--archetype-glow': ARCHETYPE_THEMES[archetype]?.glow || 'rgba(124, 77, 255, 0.4)'
        } as React.CSSProperties}>

            <div className={`${styles.reportContent}`}>
                {/* I. ARCHITECTURAL IDENTITY */}
                <motion.header 
                    className={styles.reportHeader}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                >
                    <div className={styles.headerTop}>
                        <div>
                            <div className={styles.originBadge}>ORIGIN POINT ETCHED • {userState.csn || (userState as any).originPoint?.csn ? `CSN #${userState.csn || (userState as any).originPoint?.csn}` : 'CSN PENDING'}</div>
                            <h1 className={styles.blueprintTitle}>{userName.toUpperCase()}'S INDIVIDUATION BLUEPRINT</h1>
                            <div className={styles.metadataRow}>
                                <span>ARCH: {architecture}</span>
                            </div>
                        </div>
                        <div className={styles.urgencySection}>
                            <div className={styles.urgencyLabel}>URGENCY PROTOCOL</div>
                            <div className={styles.urgencyBar}>
                                <motion.div 
                                    className={styles.urgencyFill} 
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${urgencyPercent}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1.5, delay: 0.5, ease: "easeInOut" }}
                                ></motion.div>
                            </div>
                        </div>
                    </div>
                </motion.header>

                {/* II. THE PSYCHIC MAP */}
                <motion.div 
                    className={styles.metaGrid}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ staggerChildren: 0.2, delayChildren: 1 }}
                >
                    {[
                        { label: "FREQUENCY ESTIMATE", value: meta?.frequencyEstimate },
                        { label: "CORE SHADOW PATTERN", value: meta?.coreShadowPattern },
                        { label: "ROOT BELIEF", value: meta?.rootBelief },
                        { label: "DHARMA PHASE", value: meta?.dharmaPhase }
                    ].map((item, i) => (
                        <motion.div 
                            key={i} 
                            className={styles.metaItem}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 1 + i * 0.2 }}
                        >
                            <label>{item.label}</label>
                            <div className={styles.metaValue}>{item.value}</div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* III. VEDIC BLUEPRINT */}
                <motion.div 
                    className={styles.vedicSection}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 1.8 }}
                >
                    <h2 className={styles.sectionTitle}>III. VEDIC BLUEPRINT</h2>
                    <div className={styles.vedicGrid}>
                        <div className={styles.vedicItem}>
                            <strong>LAGNA & MOON</strong>
                            <p>{vedicOverview?.lagnaAndMoon}</p>
                        </div>
                        <div className={styles.vedicItem}>
                            <strong>CURRENT DASHA</strong>
                            <p>{vedicOverview?.currentDasha}</p>
                        </div>
                    </div>
                    {vedicOverview?.saturnStatus && (
                        <div className={styles.saturnAlert}>
                            ⚠️ SATURN STATUS: {vedicOverview.saturnStatus}
                        </div>
                    )}
                </motion.div>

                {/* IV. CONTENT SECTIONS */}
                <div className={styles.sectionsGrid}>
                    <motion.section 
                        className={styles.fullWidthSection}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 2.2 }}
                    >
                        <h2 className={styles.smallHeading}>IV. THE VALIDATION</h2>
                        <PretextWrapper 
                            text={validation || ""}
                            font="300 1.2rem 'Inter', sans-serif"
                            lineHeight={36}
                            width={containerWidth}
                            className={styles.pretextBody}
                            centerExclusion={true}
                        />
                    </motion.section>

                    <motion.section 
                        className={styles.textSection}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 2.6 }}
                    >
                        <h2 className={styles.smallHeading}>V. THE REAL CAUSE</h2>
                        <PretextWrapper 
                            text={realCause || ""}
                            font="300 1.1rem 'Inter', sans-serif"
                            lineHeight={32}
                            width={containerWidth}
                            className={styles.pretextBody}
                            centerExclusion={true}
                        />
                    </motion.section>

                    {/* VI. THE PATTERN LOOP */}
                    <motion.section 
                        className={styles.fullWidthSection}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 3 }}
                    >
                        <h2 className={styles.smallHeading}>VI. THE PATTERN LOOP</h2>
                        <div className={styles.loopVisual}>
                            <div className={styles.loopItem}>
                                <div className={styles.loopLabel}>TRIGGER</div>
                                <div className={styles.loopValue}>{patternLoop?.trigger}</div>
                            </div>
                            <div className={styles.loopArrow}>→</div>
                            <div className={styles.loopItem}>
                                <div className={styles.loopLabel}>COPING MECHANISM</div>
                                <div className={styles.loopValue}>{patternLoop?.copingMechanism}</div>
                            </div>
                            <div className={styles.loopArrow}>→</div>
                            <div className={styles.loopItem}>
                                <div className={styles.loopLabel}>HUMAN COST</div>
                                <div className={styles.loopValue}>{patternLoop?.humanCost}</div>
                            </div>
                        </div>
                    </motion.section>

                    <motion.section 
                        className={styles.fullWidthSection}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 3.4 }}
                    >
                        <h2 className={styles.smallHeading}>VII. THE FREQUENCY DOORWAY</h2>
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
                        <blockquote className={styles.teachingQuote} style={{ marginTop: '40px' }}>
                            <PretextWrapper 
                                text={teaching || ""}
                                font="italic 300 1.2rem 'Inter', sans-serif"
                                lineHeight={34}
                                width={containerWidth}
                                className={styles.pretextBody}
                                centerExclusion={true}
                            />
                        </blockquote>
                    </motion.section>

                    <motion.section 
                        className={styles.fullWidthSection}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, delay: 3.8 }}
                    >
                        <h2 className={styles.smallHeading}>VIII. THE WITNESS QUESTION</h2>
                        <div className={styles.witnessBox}>
                            <p className={styles.witnessQuestion}>{witnessQuestion}</p>
                        </div>
                    </motion.section>
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
