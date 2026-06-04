"use client";

import React, { useState, useEffect } from 'react';
import { useSignUp } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from 'framer-motion';
import styles from '../../quiz/quiz.module.css';
import NavButtons from '@/components/NavButtons';
import LiquidBackground from '@/components/artistic/LiquidBackground';

export default function MBTISignupPage() {
  const { signUp, isLoaded: signUpLoaded } = useSignUp();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || searchParams.get('redirect_url') || '/blueprint';
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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

  const signInWith = async (strategy: string) => {
    if (!signUpLoaded || !signUp) return;
    try {
      await signUp.authenticateWithRedirect({
        strategy: strategy as any,
        redirectUrl: "/sso-callback",
        redirectUrlComplete: redirectPath,
      });
    } catch (err: any) {
      console.error("OAuth error:", err);
      setError("Failed to initialize social login.");
    }
  };

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!signUp) return;
    
    setIsJoining(true);
    try {
      const clerkSignUp: any = signUp;
      await clerkSignUp.create({
        emailAddress: email,
        password,
      });
      await clerkSignUp.prepareEmailAddressVerification({ strategy: "email_code" });
      router.push(`/verify-email?redirect=${encodeURIComponent(redirectPath)}`); 
    } catch (err: any) {
      console.error(err);
      setError(err.errors?.[0]?.message || "Something went wrong.");
    } finally {
      setIsJoining(false);
    }
  }

  const socialBtnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    padding: '12px', borderRadius: '12px', color: '#fff', cursor: 'pointer',
    fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
    position: 'relative', zIndex: 50, pointerEvents: 'auto'
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <LiquidBackground />
      <div className={styles.container} style={{ position: 'relative', zIndex: 10 }}>
        <NavButtons />

        <div className={styles.quizContent} style={{ maxWidth: '450px', position: 'relative', zIndex: 20 }}>
        <div className={styles.header}>
            <h1 className={styles.title} style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>Something in you already knows why you&apos;re here.</h1>
            <p className={styles.subtitle} style={{ marginTop: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
                The guide has been waiting for you. <br/>
                Begin the process of naming your patterns.
            </p>
        </div>

        <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.questionCard}
            style={{ animation: 'none', background: 'rgba(10, 10, 20, 0.6)', padding: '30px', position: 'relative', zIndex: 30 }}
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

            {/* Social Logins */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px', position: 'relative', zIndex: 40 }}>
                <button 
                    onClick={() => signInWith('oauth_google')}
                    style={socialBtnStyle}
                >
                    <svg width="18" height="18" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M23.5 12.2c0-.8-.1-1.6-.2-2.4h-11v4.5h6.3c-.3 1.5-1.1 2.8-2.4 3.6v3h3.9c2.3-2.1 3.6-5.2 3.6-8.7z"/>
                        <path fill="#34A853" d="M12.3 23.5c3.1 0 5.7-1 7.6-2.8l-3.9-3c-1.1.7-2.5 1.1-3.7 1.1-2.9 0-5.4-2-6.3-4.6H2.1v3c1.9 3.8 5.8 6.3 10.2 6.3z"/>
                        <path fill="#FBBC05" d="M6 14.2c-.2-.7-.4-1.4-.4-2.2 0-.8.2-1.5.4-2.2v-3H2.1c-.8 1.6-1.3 3.4-1.3 5.2 0 1.8.5 3.6 1.3 5.2l3.9-3z"/>
                        <path fill="#EA4335" d="M12.3 5.2c1.7 0 3.2.6 4.4 1.7l3.3-3.3C18 1.4 15.4 0 12.3 0 7.9 0 4 2.5 2.1 6.3l3.9 3.c.9-2.6 3.4-4.1 6.3-4.1z"/>
                    </svg>
                    Continue with Google
                </button>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button 
                        onClick={() => signInWith('oauth_apple')}
                        style={{ ...socialBtnStyle, flex: 1 }}
                    >
                        <svg width="16" height="16" viewBox="0 0 384 512" fill="currentColor">
                            <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
                        </svg>
                    </button>
                    <button 
                        onClick={() => signInWith('oauth_discord')}
                        style={{ ...socialBtnStyle, flex: 1 }}
                    >
                        <svg width="20" height="20" viewBox="0 0 127.14 96.36">
                            <path fill="#5865F2" d="M107.7,8.07A105.15,105.15,0,0,0,81.47,0a72.06,72.06,0,0,0-3.36,6.83A97.68,97.68,0,0,0,49,6.83,72.37,72.37,0,0,0,45.64,0,105.89,105.89,0,0,0,19.39,8.09C2.71,32.65-1.82,56.6.39,80.21a105.73,105.73,0,0,0,32.22,16.15,77.7,77.7,0,0,0,7.24-11.77,67.7,67.7,0,0,1-11.53-5.54c.94-.68,1.84-1.4,2.71-2.14a74.74,74.74,0,0,0,65.2,0c.88.74,1.77,1.46,2.7,2.14a67.16,67.16,0,0,1-11.53,5.54,77.34,77.34,0,0,0,7.24,11.77,105.51,105.51,0,0,0,32.25-16.15C129.58,50.49,125.13,26.8,107.7,8.07ZM42.45,65.69C36.18,65.69,31,60,31,53s5-12.74,11.43-12.74S54,46,53.89,53,48.84,65.69,42.45,65.69Zm42.24,0C78.41,65.69,73.25,60,73.25,53s5-12.74,11.44-12.74S96.23,46,96.12,53,91.08,65.69,84.69,65.69Z"/>
                        </svg>
                    </button>
                </div>
            </div>

            <div style={{ position: 'relative', textAlign: 'center', margin: '20px 0', opacity: 0.3 }}>
                <hr style={{ border: '0', borderTop: '1px solid #fff' }} />
                <span style={{ position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)', background: '#0a0a14', padding: '0 10px', fontSize: '0.7rem' }}>OR</span>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Orbitron', letterSpacing: '1px' }}>Email</label>
                    <input 
                        type="email" 
                        placeholder="your@email.com" 
                        required 
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        style={{ 
                            background: 'rgba(255,255,255,0.03)', 
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            padding: '14px',
                            color: '#fff',
                            outline: 'none',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                    <label style={{ fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', fontFamily: 'Orbitron', letterSpacing: '1px' }}>Password</label>
                    <input 
                        type="password" 
                        placeholder="••••••••" 
                        required 
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        style={{ 
                            background: 'rgba(255,255,255,0.03)', 
                            border: '1px solid rgba(255,255,255,0.08)',
                            borderRadius: '12px',
                            padding: '14px',
                            color: '#fff',
                            outline: 'none',
                            fontFamily: 'Inter, sans-serif',
                            fontSize: '0.9rem'
                        }}
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={isJoining}
                    className={styles.optionBtn}
                    style={{ 
                        marginTop: '10px',
                        textAlign: 'center',
                        justifyContent: 'center',
                        background: '#00e5ff',
                        color: '#050505',
                        fontWeight: '700',
                        fontFamily: 'Orbitron',
                        letterSpacing: '1px',
                        fontSize: '0.9rem',
                        boxShadow: '0 0 20px rgba(0, 229, 255, 0.3)'
                    }}
                >
                    {isJoining ? "PREPARING..." : "I'M READY"}
                </button>
                <p style={{ textAlign: 'center', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: '5px' }}>
                    Your data is private and never sold.
                </p>
            </form>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
                <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                    Already recognized? 
                    <span 
                        onClick={() => router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`)}
                        style={{ color: '#00e5ff', marginLeft: '8px', cursor: 'pointer', fontWeight: '600' }}
                    >
                        Access Identity
                    </span>
                </p>
                <p style={{ marginTop: '15px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>
                    3,847 souls have received their Blueprint
                </p>
            </div>
        </motion.div>
      </div>
    </div>
    </div>
  );
}
