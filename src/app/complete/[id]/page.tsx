"use client";

import React, { useEffect, useState, use } from 'react';
import styles from '@/app/quiz/quiz.module.css';
import CosmicBackground from '@/components/CosmicBackground';
import NavButtons from '@/components/NavButtons';
import { motion } from 'framer-motion';
import { Sparkles, Calendar } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CompleteBlueprintPage({ params }: { params: Promise<{ csn: string }> }) {
    const { csn } = use(params);
    const router = useRouter();
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    
    // Vedic Data State
    const [birthDate, setBirthDate] = useState("");
    const [birthTime, setBirthTime] = useState("");
    const [birthPlace, setBirthPlace] = useState("");

    useEffect(() => {
        fetch(`/api/blueprint/${csn}`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setData(data.data);
                }
            })
            .finally(() => setLoading(false));
    }, [csn]);

    async function handleComplete(e: React.FormEvent) {
        e.preventDefault();
        setUpdating(true);
        
        try {
            // Update blueprint with Vedic data and trigger re-generation of Vedic section
            const res = await fetch(`/api/blueprint/${csn}/complete`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ birthDate, birthTime, birthPlace })
            });
            
            if (res.ok) {
                router.push(`/blueprint/${csn}`);
            }
        } catch (e) {
            console.error("Update failed", e);
        } finally {
            setUpdating(false);
        }
    }

    if (loading) return <div className={styles.container}><CosmicBackground /><NavButtons /></div>;

    return (
        <div className={styles.container}>
            <NavButtons />
            <CosmicBackground />
            
            <div className={styles.quizContent} style={{ maxWidth: '500px' }}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Unlock Vedic Layer</h1>
                    <p className={styles.subtitle}>Your blueprint for {data?.mbti} is partially etched. Add your cosmic coordinates to unlock your Dasha timing and Saturn status.</p>
                </div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className={styles.questionCard}>
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                        <Calendar size={40} color="#00f2ff" style={{ margin: '0 auto' }} />
                    </div>

                    <form onSubmit={handleComplete} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'Orbitron' }}>Date of Birth</label>
                            <input 
                                type="date" 
                                required
                                value={birthDate}
                                onChange={(e) => setBirthDate(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px', color: '#fff', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'Orbitron' }}>Time of Birth (Optional)</label>
                            <input 
                                type="time" 
                                value={birthTime}
                                onChange={(e) => setBirthTime(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px', color: '#fff', outline: 'none' }}
                            />
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            <label style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.4)', textTransform: 'uppercase', fontFamily: 'Orbitron' }}>City of Birth</label>
                            <input 
                                type="text" 
                                placeholder="e.g. New Delhi, India"
                                value={birthPlace}
                                onChange={(e) => setBirthPlace(e.target.value)}
                                style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '15px', color: '#fff', outline: 'none' }}
                            />
                        </div>

                        <button 
                            type="submit" 
                            disabled={updating}
                            className={styles.optionBtn}
                            style={{ marginTop: '20px', textAlign: 'center', background: '#00f2ff', color: '#000', fontWeight: '700', fontFamily: 'Orbitron', justifyContent: 'center' }}
                        >
                            {updating ? "RECALIBRATING..." : "RE-ETCH BLUEPRINT"}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
