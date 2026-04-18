"use client";

import React from 'react';

interface MobileNavProps {
  activeSection: number;
  totalSections: number;
}

const sections = ['Home', 'Audit', 'AI Guide', 'Evolution', 'Personality', 'Lokas', 'Quiz'];

export default function MobileNav({ activeSection, totalSections }: MobileNavProps) {
  const scrollTo = (index: number) => {
    const container = document.querySelector('.mobile-home-container') as HTMLElement;
    if (container) {
      container.scrollTo({
        top: index * window.innerHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      background: 'rgba(5, 5, 16, 0.95)',
      backdropFilter: 'blur(20px)',
      borderTop: '1px solid rgba(255,255,255,0.1)',
      padding: '12px 16px',
      paddingBottom: 'max(12px, env(safe-area-inset-bottom))',
      zIndex: 1000,
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
    }}>
      {sections.slice(0, 5).map((label, i) => (
        <button
          key={i}
          onClick={() => scrollTo(i)}
          style={{
            background: 'none',
            border: 'none',
            color: activeSection === i ? '#35f8ff' : 'rgba(255,255,255,0.5)',
            fontSize: '0.65rem',
            fontFamily: 'Orbitron, sans-serif',
            letterSpacing: '0.5px',
            cursor: 'pointer',
            padding: '8px 4px',
            transition: 'all 0.2s ease',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            minWidth: '48px',
          }}
        >
          <div style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: activeSection === i ? '#35f8ff' : 'transparent',
            transition: 'all 0.2s ease',
          }} />
          {label}
        </button>
      ))}
      
      {/* Quiz Button - Special */}
      <button
        onClick={() => scrollTo(6)}
        style={{
          background: activeSection === 6 
            ? 'linear-gradient(135deg, #7c4dff, #35f8ff)' 
            : 'rgba(124, 77, 255, 0.3)',
          border: 'none',
          borderRadius: '20px',
          color: '#fff',
          fontSize: '0.7rem',
          fontFamily: 'Orbitron, sans-serif',
          padding: '8px 16px',
          cursor: 'pointer',
          letterSpacing: '1px',
        }}
      >
        TAKE QUIZ
      </button>
    </div>
  );
}
