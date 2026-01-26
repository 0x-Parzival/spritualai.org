'use client';

import React from 'react';
import styles from './resume.module.css';

// Resume Page - Optimized based on user guidelines
const ResumePage = () => {
    const handlePrint = () => {
        window.print();
    };

    return (
        <div className={styles.container}>
            <button className={styles.downloadBtn} onClick={handlePrint}>
                <span>Download / Print PDF</span>
            </button>

            <div className={styles.paper}>
                <header className={styles.header}>
                    <div className={styles.name}>Keshav Baliyan (0xParzival)</div>
                    <div className={styles.headline} style={{ fontSize: '1.2rem', color: '#666', marginTop: '5px', marginBottom: '10px' }}>
                        Product-oriented AI Developer | Creative Technologist | Gesture-Based Interfaces
                    </div>
                    <div className={styles.contactInfo}>
                        <a href="mailto:contact@spritualai.org">contact@spritualai.org</a> |
                        <a href="https://in.linkedin.com/in/keshav-baliyan-749188245">LinkedIn</a> |
                        <a href="https://github.com/0x-Parzival">GitHub</a> |
                        <a href="https://spritualai.org">Portfolio</a>
                    </div>
                </header>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Core Skills</div>
                    <div className={styles.skillsList}>
                        <span className={styles.skill}>AI / LLMs</span>
                        <span className={styles.skill}>Computer Vision</span>
                        <span className={styles.skill}>Frontend + WordPress</span>
                        <span className={styles.skill}>Cybersecurity Fundamentals</span>
                        <span className={styles.skill}>Product Thinking</span>
                        <span className={styles.skill}>Three.js / WebGL</span>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Key Projects</div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Gesture AI</span>
                            <span className={styles.date}>2023 - Present</span>
                        </div>
                        <div className={styles.description}>
                            Developed a system allowing full laptop operation using only hand movements. Creating intuitive, human-centric interfaces.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>AI Gesture Writing</span>
                            <span className={styles.date}>2024</span>
                        </div>
                        <div className={styles.description}>
                            Built a desktop writing interface controlled via air gestures, bridging physical motion and digital creation.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>SpiritualAI.org</span>
                            <span className={styles.date}>2025 - Present</span>
                        </div>
                        <div className={styles.description}>
                            Founded a platform offering digital products for spiritual growth, integrating AI with conscious themes.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>AI Commercial Video</span>
                            <span className={styles.date}>2025</span>
                        </div>
                        <div className={styles.description}>
                            Produced AI-generated commercial videos and comic book short stories, exploring new media narratives.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Client Website (bhumiharamarjeet.com)</span>
                            <span className={styles.date}>2025</span>
                        </div>
                        <div className={styles.description}>
                            Delivered a comprehensive web solution for a client, handling design to deployment.
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Education</div>
                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Bachelor of Technology (B.Tech)</span>
                            <span className={styles.date}>2022 - 2026 (Expected)</span>
                        </div>
                        <div className={styles.company}>ABES Engineering College, Ghaziabad</div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Product Management & Agentic AI</span>
                            <span className={styles.date}>Aug 2025 - Jan 2026</span>
                        </div>
                        <div className={styles.company}>IIT Patna (Masai Course)</div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Certifications</div>
                    <div className={styles.description}>
                        <ul>
                            <li><strong>Google Digital Garage</strong>: Fundamentals of Digital Marketing.</li>
                            <li><strong>German A1 Level</strong>: Delhi School of Foreign Languages.</li>
                            <li><strong>Masai School</strong>: Product Management & Agentic AI.</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ResumePage;
