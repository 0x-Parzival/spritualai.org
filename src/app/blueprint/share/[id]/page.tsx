"use client";

import React, { useEffect, useState, use } from 'react';
import DetailedReport from '@/components/home/DetailedReport';
import { UserState } from '@/lib/spiritual-conversation-engine';
import styles from '@/app/quiz/quiz.module.css';
import CosmicBackground from '@/components/CosmicBackground';
import NavButtons from '@/components/NavButtons';
import { motion, AnimatePresence } from 'framer-motion';

export default function PublicBlueprintPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const [blueprintData, setBlueprintData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/blueprint/${id}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setBlueprintData(data.data);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [id]);

    if (error) {
        return (
            <div className={styles.container}>
                <NavButtons />
                <CosmicBackground />
                <div className={styles.quizContent}>
                    <h1 className={styles.title}>IDENTITY NOT FOUND</h1>
                    <p className={styles.subtitle}>This Cosmic Serial Number has not been etched into the Akasha.</p>
                </div>
            </div>
        );
    }

    const mockState: UserState | null = blueprintData ? {
        name: "Seeker",
        confirmedMBTI: blueprintData.mbti,
        activeArchetype: blueprintData.archetype,
        csn: blueprintData.csn,
        report: blueprintData.report,
        recommendedProducts: blueprintData.products,
        decodingProgress: 100,
        mbtiSignals: {},
        tracking: {},
        identifiedLayers: {}
    } : null;

    return (
        <div style={{ background: '#030303', minHeight: '100vh', position: 'relative' }}>
            <NavButtons />
            
            <AnimatePresence>
                {loading ? (
                    <motion.div 
                        key="loader"
                        initial={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        className={styles.container}
                        style={{ position: 'fixed', inset: 0, zIndex: 100 }}
                    >
                        <CosmicBackground archetype={blueprintData?.archetype} />
                        <div style={{ textAlign: 'center' }}>
                            <motion.div 
                                animate={{ scale: [1, 1.1, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                style={{ color: '#00f2ff', fontFamily: 'Orbitron', letterSpacing: '0.5em' }}
                            >
                                SYNCHRONIZING WITH AKASHA
                            </motion.div>
                        </div>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="content"
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                        style={{ paddingTop: '100px', position: 'relative' }}
                    >
                        <CosmicBackground archetype={blueprintData?.archetype} />
                        <div style={{ position: 'relative', zIndex: 10 }}>
                            <DetailedReport userState={mockState} />
                        </div>
                        
                        <div style={{ 
                            position: 'relative',
                            zIndex: 10,
                            padding: '60px 20px', 
                            textAlign: 'center', 
                            background: 'linear-gradient(to bottom, transparent, rgba(124, 77, 255, 0.1))' 
                        }}>
                            <h2 style={{ fontFamily: 'Orbitron', color: '#fff', fontSize: '1.5rem', marginBottom: '20px' }}>
                                WHAT IS YOUR ARCHITECTURE?
                            </h2>
                            <p style={{ color: 'rgba(255,255,255,0.6)', marginBottom: '30px', maxWidth: '500px', margin: '0 auto 30px' }}>
                                This blueprint was generated through real-time consciousness decoding. 
                                Find out who you are at the core.
                            </p>
                            <a 
                                href="/" 
                                style={{ 
                                    display: 'inline-block',
                                    padding: '16px 32px',
                                    background: '#00f2ff',
                                    color: '#000',
                                    fontWeight: '700',
                                    fontFamily: 'Orbitron',
                                    borderRadius: '12px',
                                    textDecoration: 'none'
                                }}
                            >
                                BEGIN MY DECODE →
                            </a>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
