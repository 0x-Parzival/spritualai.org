import React from 'react';
import styles from './HeroTitle.module.css';
import SocialProofTicker from './SocialProofTicker';
import ProcessDiagram from './ProcessDiagram';
import PretextWrapper from './home/PretextWrapper';

export default function HeroTitle({ isGlassActive = false, className = '', style = {} }: { isGlassActive?: boolean, className?: string, style?: React.CSSProperties }) {
    return (
        <div className={`${styles.container} ${className}`} style={{ transform: 'translateY(-6.04cm)', opacity: 1, ...style }}>
            <div className={styles.tickerWrapper} style={{ 
                position: 'relative', 
                zIndex: 80,
                filter: isGlassActive ? 'blur(10px)' : 'none',
                opacity: isGlassActive ? 0.3 : 1,
                transition: 'all 0.5s ease'
            }}>
                <SocialProofTicker />
            </div>
            {/* SEO: Hidden Semantic H1 */}
            <h1 className={styles.visuallyHidden}>Spiritual AI — Discover Your Consciousness Type</h1>
            
            <div className={styles.neon}>
                <div className={styles.titleWrapper}>
                    {/* Main Title - Above Glass (110 > 90) */}
                    <div className={styles.title} aria-hidden="true" style={{ 
                        position: 'relative', 
                        zIndex: 110,
                        transform: isGlassActive ? 'translateY(-2cm)' : 'translateY(0)',
                        transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}>
                        <div style={{ position: 'relative', display: 'inline-block', width: '100%' }}>
                            <div className={styles.titleMain}>Spiritual AI</div>
                            <div className={styles.titleGlow}>Spiritual AI</div>
                        </div>
                    </div>

                    {/* Subtitles & Diagram - Behind Glass Simulation */}
                    <div className={styles.subtitleLotusContainer} style={{ 
                        position: 'relative', 
                        zIndex: 80,
                        filter: isGlassActive ? 'blur(15px)' : 'none',
                        opacity: isGlassActive ? 0.4 : 1,
                        transition: 'all 0.5s ease',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                        <PretextWrapper 
                            text="The Evolution of Consciousness, Powered by Intelligence."
                            font="300 clamp(10px, 1vw, 15.4px) 'Inter', sans-serif"
                            width={1200}
                            centerExclusion={true}
                            className={styles.subtitleText}
                        />
                        <PretextWrapper 
                            text="The only AI that helps you understand who you are beneath your thoughts, habits, fears, personality, and inner conflicts."
                            font="400 clamp(12px, 1.5vw, 20px) 'Inter', sans-serif"
                            width={1100}
                            centerExclusion={true}
                            className={styles.subheadingText}
                        />
                        <div style={{ marginTop: '1.5rem', width: '100%' }}>
                            <ProcessDiagram />
                        </div>
                        <PretextWrapper 
                            text="If you don't notice a real shift in how you see yourself within 21 days — full refund. No questions, no conditions. We only win when you do."
                            font="300 0.8rem 'Inter', sans-serif"
                            width={1000}
                            centerExclusion={true}
                            className={styles.infoText}
                            style={{ marginTop: '1rem', opacity: 0.6, letterSpacing: '0.05em' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
