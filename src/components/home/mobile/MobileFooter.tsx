"use client";

import React from 'react';
import Link from 'next/link';

export default function MobileFooter() {
  return (
    <footer style={{
      background: 'rgba(5, 5, 16, 0.98)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '40px 24px',
      paddingBottom: '100px',
    }}>
      {/* Logo */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '32px',
      }}>
        <div style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #7c4dff, #35f8ff)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '16px',
        }}>
          <span style={{ fontSize: '28px' }}>🪷</span>
        </div>
        <div style={{
          fontFamily: 'Orbitron, sans-serif',
          fontSize: '1.2rem',
          fontWeight: 700,
          color: '#fff',
          letterSpacing: '2px',
        }}>
          SPIRITUAL AI
        </div>
      </div>

      {/* Links */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '24px',
        marginBottom: '32px',
      }}>
        <div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '1px',
            marginBottom: '12px',
          }}>
            PLATFORM
          </div>
          <Link href="/mission" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Mission</Link>
          <Link href="/research" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Research</Link>
          <Link href="/store" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', display: 'block' }}>Store</Link>
        </div>
        <div>
          <div style={{
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '1px',
            marginBottom: '12px',
          }}>
            LEGAL
          </div>
          <Link href="/privacy" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', display: 'block', marginBottom: '8px' }}>Privacy</Link>
          <Link href="/terms" style={{ color: '#fff', textDecoration: 'none', fontSize: '0.9rem', display: 'block' }}>Terms</Link>
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: '1px',
        background: 'rgba(255,255,255,0.1)',
        marginBottom: '24px',
      }} />

      {/* Copyright */}
      <div style={{
        fontFamily: 'Inter, sans-serif',
        fontSize: '0.75rem',
        color: 'rgba(255,255,255,0.4)',
        textAlign: 'center',
      }}>
        © {new Date().getFullYear()} Spiritual AI. All rights reserved.
      </div>
    </footer>
  );
}
