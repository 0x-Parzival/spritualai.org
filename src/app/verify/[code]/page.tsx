"use client";

import React, { useEffect, useState, use } from 'react';
import styles from '@/app/quiz/quiz.module.css';
import CosmicBackground from '@/components/CosmicBackground';
import NavButtons from '@/components/NavButtons';
import { motion } from 'framer-motion';
import { CheckCircle, XCircle } from 'lucide-react';

export default function VerificationPage({ params }: { params: Promise<{ code: string }> }) {
    const { code } = use(params);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);

    useEffect(() => {
        fetch(`/api/verify/${code}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setData(data.data);
                } else {
                    setError(true);
                }
            })
            .catch(() => setError(true))
            .finally(() => setLoading(false));
    }, [code]);

    return (
        <div className={styles.container}>
            <NavButtons />
            <CosmicBackground />
            
            <div className={styles.quizContent} style={{ maxWidth: '500px' }}>
                {loading ? (
                    <motion.div animate={{ opacity: [0.5, 1, 0.5] }} style={{ color: '#00f2ff', fontFamily: 'Orbitron' }}>
                        VERIFYING CREDENTIAL...
                    </motion.div>
                ) : error ? (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className={styles.questionCard}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <XCircle size={60} color="#ff4d4d" style={{ margin: '0 auto' }} />
                        </div>
                        <h1 className={styles.title} style={{ color: '#ff4d4d' }}>AUTHENTICITY FAILED</h1>
                        <p className={styles.subtitle}>This verification code does not match any etched identity in our records.</p>
                        <a href="/" className={styles.optionBtn} style={{ marginTop: '30px', textAlign: 'center', background: 'rgba(255,255,255,0.05)' }}>
                            RETURN TO SOURCE
                        </a>
                    </motion.div>
                ) : (
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.questionCard}>
                        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                            <CheckCircle size={60} color="#00f2ff" style={{ margin: '0 auto' }} />
                        </div>
                        <h1 className={styles.title}>IDENTITY VERIFIED</h1>
                        <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '30px', textAlign: 'left' }}>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'Orbitron' }}>Cosmic Serial Number</label>
                                <div style={{ color: '#00f2ff', fontSize: '1.1rem', fontFamily: 'Mono' }}>{data.csn}</div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'Orbitron' }}>Decoded Architecture</label>
                                <div style={{ color: '#fff', fontSize: '1.1rem' }}>{data.mbti} / {data.patternName}</div>
                            </div>
                            <div style={{ marginBottom: '15px' }}>
                                <label style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'Orbitron' }}>Timestamp</label>
                                <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem' }}>{new Date(data.createdAt).toLocaleString()}</div>
                            </div>
                        </div>
                        <a href={`/blueprint/${data.csn}`} className={styles.optionBtn} style={{ marginTop: '30px', textAlign: 'center', background: '#00f2ff', color: '#000', fontWeight: '700' }}>
                            VIEW FULL BLUEPRINT →
                        </a>
                    </motion.div>
                )}
            </div>
        </div>
    );
}
