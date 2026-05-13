"use client";

import React, { useState, useEffect } from 'react';
import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import styles from '../../quiz/quiz.module.css';
import NavButtons from '@/components/NavButtons';
import CosmicBackground from '@/components/CosmicBackground';

export default function MBTISignupPage() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeConsent, setAgreeConsent] = useState(false);
  const [error, setError] = useState("");
  const [isJoining, setIsJoining] = useState(false);
  const router = useRouter();

  useEffect(() => {
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
    if (!agreeConsent) {
        setError("You must agree to the data collection policy to proceed.");
        return;
    }
    
    setIsJoining(true);
    try {
      await signUp.create({
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push("/verify-email"); 
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Something went wrong.");
    } finally {
      setIsJoining(false);
    }
  }

  return (
    <div className={styles.container}>
      <NavButtons />
      <CosmicBackground />

      <div className={styles.quizContent} style={{ maxWidth: '450px' }}>
        <div className={styles.header}>
            <h1 className={styles.title}>Join the Individuation</h1>
            <p className={styles.subtitle}>Begin your permanent record and unlock the blueprint of your unconscious life patterns.</p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.questionCard}
            style={{ animation: 'none' }}
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
                        type="email" 
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

                <div style={{ display: 'flex', gap: '12px', marginTop: '5px', padding: '0 5px' }}>
                    <input 
                        type="checkbox" 
                        id="consent" 
                        checked={agreeConsent}
                        onChange={(e) => setAgreeConsent(e.target.checked)}
                        style={{ width: '18px', height: '18px', cursor: 'pointer', flexShrink: 0 }}
                    />
                    <label htmlFor="consent" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.75rem', lineHeight: '1.4', cursor: 'pointer' }}>
                        I agree to data collection to train the model. Your data is secure and personal info remains private.
                    </label>
                </div>

                <button 
                    type="submit" 
                    disabled={!isLoaded || isJoining}
                    className={styles.optionBtn}
                    style={{ 
                        marginTop: '15px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        background: '#ff00ea',
                        color: '#fff',
                        fontWeight: '700',
                        fontFamily: 'Orbitron'
                    }}
                >
                    {isJoining ? "INITIALIZING..." : "JOIN THE SELECTION"}
                </button>
            </form>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.4)' }}>
                    Already have coordinates? 
                    <span 
                        onClick={() => router.push('/login')}
                        style={{ color: '#00e5ff', marginLeft: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Access Identity
                    </span>
                </p>
            </div>
        </motion.div>
      </div>
    </div>
  );
}
