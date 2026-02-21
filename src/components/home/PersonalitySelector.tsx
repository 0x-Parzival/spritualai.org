"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './PersonalitySelector.module.css';

const personalityData = [
    // Analysts
    { type: 'INTJ', role: 'The Architect', cat: styles.analyst },
    { type: 'INTP', role: 'The Logician', cat: styles.analyst },
    { type: 'ENTJ', role: 'The Commander', cat: styles.analyst },
    { type: 'ENTP', role: 'The Debater', cat: styles.analyst },
    // Diplomats
    { type: 'INFJ', role: 'The Advocate', cat: styles.diplomat },
    { type: 'INFP', role: 'The Mediator', cat: styles.diplomat },
    { type: 'ENFJ', role: 'The Protagonist', cat: styles.diplomat },
    { type: 'ENFP', role: 'The Campaigner', cat: styles.diplomat },
    // Sentinels
    { type: 'ISTJ', role: 'The Logistician', cat: styles.sentinel },
    { type: 'ISFJ', role: 'The Defender', cat: styles.sentinel },
    { type: 'ESTJ', role: 'The Executive', cat: styles.sentinel },
    { type: 'ESFJ', role: 'The Consul', cat: styles.sentinel },
    // Explorers
    { type: 'ISTP', role: 'The Virtuoso', cat: styles.explorer },
    { type: 'ISFP', role: 'The Adventurer', cat: styles.explorer },
    { type: 'ESTP', role: 'The Entrepreneur', cat: styles.explorer },
    { type: 'ESFP', role: 'The Entertainer', cat: styles.explorer },
];

export default function PersonalitySelector() {
    return (
        <section className={styles.section}>

            <div className={styles.grid}>
                {personalityData.map((p) => (
                    <Link
                        key={p.type}
                        href={`/MBTI/personality/${p.type.toLowerCase()}.html`}
                        className={`${styles.card} ${p.cat}`}
                    >
                        <div className={styles.cardBg}></div>
                        <div className={styles.textContent}>
                            <span className={styles.typeCode}>{p.type}</span>
                            <span className={styles.roleLabel}>{p.role}</span>
                        </div>
                        <div className={styles.characterImg}>
                            <Image
                                src={`/MBTI/HOVER/${p.type}.png`}
                                alt={`${p.type} Character`}
                                width={200}
                                height={320}
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    );
}
