"use client";

import React from 'react';
import styles from '../app/quiz/quiz.module.css';

interface CosmicBackgroundProps {
    archetype?: string;
}

export const ARCHETYPE_THEMES: Record<string, any> = {
    sovereign: {
        primary: '#FFD700', // Gold
        secondary: '#DAA520',
        glow: 'rgba(255, 215, 0, 0.4)',
        background: 'radial-gradient(circle at 50% 50%, rgba(40, 30, 10, 0.7) 0%, rgba(5, 5, 5, 1) 100%)'
    },
    seeker: {
        primary: '#7c4dff', // Violet
        secondary: '#00e5ff',
        glow: 'rgba(124, 77, 255, 0.4)',
        background: 'radial-gradient(circle at 50% 50%, rgba(20, 10, 40, 0.7) 0%, rgba(5, 5, 5, 1) 100%)'
    },
    architect: {
        primary: '#00e5ff', // Cyan
        secondary: '#4169e1',
        glow: 'rgba(0, 229, 255, 0.4)',
        background: 'radial-gradient(circle at 50% 50%, rgba(10, 20, 40, 0.7) 0%, rgba(5, 5, 5, 1) 100%)'
    },
    catalyst: {
        primary: '#ff00ea', // Magenta
        secondary: '#ff4d4d',
        glow: 'rgba(255, 0, 234, 0.4)',
        background: 'radial-gradient(circle at 50% 50%, rgba(40, 10, 30, 0.7) 0%, rgba(5, 5, 5, 1) 100%)'
    },
    visionary: {
        primary: '#00ff7f', // Spring Green
        secondary: '#00e5ff',
        glow: 'rgba(0, 255, 127, 0.4)',
        background: 'radial-gradient(circle at 50% 50%, rgba(10, 40, 20, 0.7) 0%, rgba(5, 5, 5, 1) 100%)'
    },
    teacher: {
        primary: '#FCD34D', // Amber
        secondary: '#FF8C00',
        glow: 'rgba(252, 211, 77, 0.4)',
        background: 'radial-gradient(circle at 50% 50%, rgba(40, 35, 10, 0.7) 0%, rgba(5, 5, 5, 1) 100%)'
    }
};

export default function CosmicBackground({ archetype }: CosmicBackgroundProps) {
    const theme = archetype ? ARCHETYPE_THEMES[archetype.toLowerCase()] : null;
    
    // Inject CSS variables for the theme
    const style = theme ? {
        '--archetype-primary': theme.primary,
        '--archetype-glow': theme.glow,
        background: theme.background
    } as React.CSSProperties : {};

    return (
        <div className={styles.cosmicBackground} style={style}></div>
    );
}
