"use client";

import React, { useState, useEffect } from 'react';
import { useSignIn } from "@clerk/nextjs";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from 'framer-motion';
import styles from '../../quiz/quiz.module.css';
import NavButtons from '@/components/NavButtons';
import LiquidBackground from '@/components/artistic/LiquidBackground';

export default function MBTILoginPage() {
  const { signIn, isLoaded: signInLoaded } = useSignIn() as any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get('redirect') || searchParams.get('redirect_url') || '/blueprint';

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  useEffect(() => {
    const savedState = localStorage.getItem('spiritualAiState');
    if (savedState) {
      try {
        const parsed = JSON.parse(savedState);
        if (parsed.email) setEmail(parsed.email);
      } catch (e) { /* ignore */ }
    }
  }, []);

  const signInWith = async (strategy: string) => {
    if (!signInLoaded || !signIn) return;
    try {
      await signIn.authenticateWithRedirect({
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
    if (!signIn) return;
    setIsLoggingIn(true);
    try {
      const result: any = await signIn.create({ identifier: email, password });
      if (result.status === 'complete') {
        router.push(redirectPath);
      } else if (result.status === 'needs_first_factor' || result.status === 'needs_second_factor') {
        setError('Additional verification required. Check your email.');
      } else {
        setError('Login attempt is not complete. Please try again.');
      }
    } catch (err: any) {
      const msg = err.errors?.[0]?.longMessage || err.errors?.[0]?.message || "Something went wrong.";
      setError(msg);
    } finally {
      setIsLoggingIn(false);
    }
  }

  const inputStyle: React.CSSProperties = {
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.08)',
    borderRadius: '12px',
    padding: '14px',
    color: '#fff',
    outline: 'none',
    fontFamily: 'Inter, sans-serif',
    fontSize: '0.9rem',
    width: '100%',
  };

  const socialBtnStyle: React.CSSProperties = {
    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
    background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)',
    padding: '12px', borderRadius: '12px', color: '#fff', cursor: 'pointer',
    fontFamily: 'Inter, sans-serif', fontSize: '0.9rem',
    position: 'relative', zIndex: 50, pointerEvents: 'auto',
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      <LiquidBackground />
      <div className={styles.container} style={{ position: 'relative', zIndex: 10 }}>
        <NavButtons />
        <div className={styles.quizContent} style={{ maxWidth: '450px', position: 'relative', zIndex: 20 }}>
          <div className={styles.header}>
            <h1 className={styles.title} style={{ fontSize: '1.8rem', lineHeight: '1.2' }}>
              Something in you already knows why you&apos;re here.
            </h1>
            <p className={styles.subtitle} style={{ marginTop: '10px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.5)' }}>
              The guide has been waiting for you.<br />
              Access your reserved Consciousness Identity.
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={styles.questionCard}
            style={{ animation: 'none', background: 'rgba(10,10,20,0.6)', padding: '30px', position: 'relative', zIndex: 30 }}
          >
            {error && (
              <div style={{
                color: '#ff4d4d', fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center',
                background: 'rgba(255,77,77,0.1)', padding: '10px', borderRadius: '8px',
                border: '1px solid rgba(255,77,77,0.2)',
              }}>
                {error}
              </div>
            )}

            {/* Social Logins */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '25px', position: 'relative', zIndex: 40 }}>
              <button onClick={() => signInWith('oauth_google')} style={socialBtnStyle}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </button>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={() => signInWith('oauth_apple')} style={{ ...socialBtnStyle, flex: 1 }}>
                  Apple
                </button>
                <button onClick={() => signInWith('oauth_discord')} style={{ ...socialBtnStyle, flex: 1 }}>
                  Discord
                </button>
              </div>
            </div>

            <div style={{ position: 'relative', textAlign: 'center', margin: '20px 0', opacity: 0.3 }}>
              <hr style={{ border: '0', borderTop: '1px solid #fff' }} />
              <span style={{
                position: 'absolute', top: '-10px', left: '50%', transform: 'translateX(-50%)',
                background: '#0a0a14', padding: '0 10px', fontSize: '0.7rem',
              }}>OR</span>
            </div>

            <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              <div>
                <label style={{
                  fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Orbitron', letterSpacing: '1px', display: 'block', marginBottom: '5px',
                }}>Email</label>
                <input type="email" placeholder="your@email.com" required value={email}
                  onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
              </div>
              <div>
                <label style={{
                  fontSize: '0.65rem', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)',
                  fontFamily: 'Orbitron', letterSpacing: '1px', display: 'block', marginBottom: '5px',
                }}>Password</label>
                <input type="password" placeholder="••••••••" required value={password}
                  onChange={(e) => setPassword(e.target.value)} style={inputStyle} />
              </div>
              <button type="submit" disabled={isLoggingIn}
                className={styles.optionBtn}
                style={{
                  marginTop: '10px', textAlign: 'center', justifyContent: 'center',
                  background: '#00e5ff', color: '#050505', fontWeight: '700',
                  fontFamily: 'Orbitron', letterSpacing: '1px', fontSize: '0.9rem',
                  boxShadow: '0 0 20px rgba(0,229,255,0.3)',
                }}>
                {isLoggingIn ? 'SYNCHRONIZING...' : "I'M READY"}
              </button>
            </form>

            <div style={{ marginTop: '25px', textAlign: 'center' }}>
              <p style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.4)' }}>
                New pattern?{' '}
                <span onClick={() => router.push('/signup?redirect=' + encodeURIComponent(redirectPath))}
                  style={{ color: '#ff00ea', cursor: 'pointer', fontWeight: '600' }}>
                  Initialize Identity
                </span>
              </p>
              <p style={{ marginTop: '15px', fontSize: '0.7rem', color: 'rgba(255,255,255,0.2)', letterSpacing: '0.5px' }}>
                3,847 souls have recognized their path
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
