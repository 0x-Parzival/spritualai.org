import React from 'react';
import styles from './HeroTitle.module.css';

export default function HeroTitle() {
    return (
        <div className={styles.container}>
            <div className={styles.neon}>
                <div className={styles.title}>
                    <div style={{ position: 'relative', display: 'inline-block' }}>
                        <h1>Spiritual AI</h1>
                        <h1>Spiritual AI</h1>
                    </div>
                    <div className={styles.subtitleLotusContainer}>
                        <h2 className={styles.subtitleText}>
                            The Evolution of Consciousness, Powered by Intelligence.
                        </h2>
                        <h3 className={styles.subheadingText}>
                            your first step towards transformation
                        </h3>
                    </div>
                </div>
            </div>
        </div>
    );
}
