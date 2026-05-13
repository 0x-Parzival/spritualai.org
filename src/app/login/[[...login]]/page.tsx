"use client";

import React, { useState, useEffect } from 'react';
import { useSignIn } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../quiz/quiz.module.css';
import NavButtons from '@/components/NavButtons';
import CosmicBackground from '@/components/CosmicBackground';

export default function MBTILoginPage() {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Pre-fill email from localStorage if available (from mid-convo capture)
    const savedState = localStorage.getItem('spiritualAiState');
    if (savedState) {
        try {
            const parsed = JSON.parse(savedState);
            if (parsed.email) setEmail(parsed.email);
        } catch (e) {}
    }
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    
    if (!isLoaded) return;
    setIsLoggingIn(true);
    
    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        
        // Check for MBTI in localStorage to show transition
        let mbti = "";
        const savedState = localStorage.getItem('spiritualAiState');
        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                mbti = parsed.confirmedMBTI || parsed.confirmed_mbti || "";
            } catch (e) {}
        }

        if (mbti) {
            router.push(`/mbti-transition?mbti=${mbti}&redirect=/profile`);
        } else {
            router.push("/profile"); 
        }
      } else {
        setError(`Login status: ${result.status}. Additional steps may be required.`);
      }
    } catch (err: any) {
      console.error("Login Error:", err);
      const message = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Something went wrong.";
      setError(message);
    } finally {
      setIsLoggingIn(false);
    }
  }

  return (
    <div className={styles.container}>
      <NavButtons />
      <CosmicBackground />

      <div className={styles.quizContent} style={{ maxWidth: '450px' }}>
        <div className={styles.header}>
            <h1 className={styles.title}>Secure Your Blueprint</h1>
            <p className={styles.subtitle}>Enter your coordinates to access your reserved Consciousness Identity.</p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.questionCard}
            style={{ animation: 'none' }} // Remove levitation for better form UX
        >
            {error && <div className={styles.error} style={{ 
                color: '#ff4d4d', 
                fontSize: '0.8rem', 
                marginBottom: '20px', 
                textAlign: 'center',
                background: 'rgba(255, 77, 77, 0.1)',
                padding: '10px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 77, 77, 0.2)'
            }}>{error}</div>}

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Orbitron' }}>Email</label>
                    <input 
                        type="text" 
                        placeholder="your@email.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '15px',
                            color: '#fff',
                            outline: 'none',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', fontFamily: 'Orbitron' }}>Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ 
                            background: 'rgba(255,255,255,0.05)', 
                            border: '1px solid rgba(255,255,255,0.1)',
                            borderRadius: '12px',
                            padding: '15px',
                            color: '#fff',
                            outline: 'none',
                            fontFamily: 'Inter, sans-serif'
                        }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={!isLoaded || isLoggingIn}
                    className={styles.optionBtn}
                    style={{ 
                        marginTop: '10px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        background: '#00e5ff',
                        color: '#000',
                        fontWeight: '700',
                        fontFamily: 'Orbitron'
                    }}
                >
                    {isLoggingIn ? "SYNCHRONIZING..." : "ACCESS IDENTITY"}
                </button>
            </form>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                    Don't have an account? 
                    <span 
                        onClick={() => router.push('/signup')}
                        style={{ color: '#ff00ea', marginLeft: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Initialize New Pattern
                    </span>
                </p>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
