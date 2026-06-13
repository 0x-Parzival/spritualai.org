import React from 'react';
import styles from './HeroTitle.module.css';
import SocialProofTicker from './SocialProofTicker';
import ProcessDiagram from './ProcessDiagram';

export default function HeroTitle({ isGlassActive = false, isMobile = false, className = '', style = {} }: { isGlassActive?: boolean, isMobile?: boolean, className?: string, style?: React.CSSProperties }) {
    return (
        <div className={`${styles.container} ${className}`} style={{ opacity: 1, ...style }}>
            <div className={styles.tickerWrapper} style={{
                position: 'relative',
                zIndex: 80,
                filter: isGlassActive ? 'blur(10px)' : 'none',
                opacity: isGlassActive ? 0.3 : 1,
                transition: 'all 0.5s ease'
            }}>
                <SocialProofTicker />
            </div>
            <h1 className={styles.visuallyHidden}>Spiritual AI — Discover Your Consciousness Type</h1>

            <div className={styles.neon}>
                <div className={styles.titleWrapper}>
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
                        <p className={styles.eyebrowText}>
                            the evolution of consciousness, powered by intelligence
                        </p>
                        <p className={styles.leadText}>
                            Click the message box below to begin. The AI will talk with you<br />
                            to understand your problem and find the hidden pattern causing it.
                        </p>
                        <p className={styles.subheadingText}>
                            A personal report is generated — with digital products <span className={styles.formatAccent}>(ebook, audiobook, or AI guide)</span> built specifically to solve your exact problem.
                        </p>

                        <div style={{ marginTop: '1.5rem', width: '100%' }}>
                            <ProcessDiagram />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
