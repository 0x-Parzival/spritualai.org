"use client";

import React from 'react';
import { TextAnimate } from '../ui/TextAnimate';
import styles from './MissionStatement.module.css';

const wavyVariants = {
    hidden: {
        opacity: 0,
        y: 30,
        rotate: 45,
        scale: 0.5,
    },
    show: (i: number) => ({
        opacity: 1,
        y: 0,
        rotate: 0,
        scale: 1,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
            y: {
                type: "spring",
                damping: 12,
                stiffness: 200,
                mass: 0.8,
            },
            rotate: {
                type: "spring",
                damping: 8,
                stiffness: 150,
            },
            scale: {
                type: "spring",
                damping: 10,
                stiffness: 300,
            },
        },
    }),
    exit: (i: number) => ({
        opacity: 0,
        y: 30,
        rotate: 45,
        scale: 0.5,
        transition: {
            delay: i * 0.05,
            duration: 0.4,
        },
    }),
};

interface MissionSectionProps {
    text: string;
}

const MissionSection = ({ text }: MissionSectionProps) => {
    return (
        <section className={styles.section}>
            <div className={styles.titleContainer}>
                <div className={styles.headline}>
                    <div style={{ position: 'relative', width: '100%' }}>
                        {/* Layer 1: Stroke */}
                        <TextAnimate variants={wavyVariants} by="character">
                            {text}
                        </TextAnimate>

                        {/* Layer 2: Final Fluid Wave Sync */}
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
                            <TextAnimate
                                variants={wavyVariants}
                                by="character"
                                className={styles.headlineWave}
                                aria-hidden="true"
                            >
                                {text}
                            </TextAnimate>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default function MissionStatement() {
    return (
        <>
            <MissionSection text="At Spiritual AI, we revolutionize your journey by" />
            <MissionSection text="categorizing users into 16 distinct personality types" />
            <MissionSection text="unlocking tailored paths to consciousness evolution" />
        </>
    );
}
