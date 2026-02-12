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
                        <a href="mailto:admin@spiritualai.store">admin@spiritualai.store</a> |
                        <a href="https://in.linkedin.com/in/keshav-baliyan-749188245">LinkedIn</a> |
                        <a href="https://github.com/0x-Parzival">GitHub</a> |
                        <a href="https://spiritualai.store/creator">Portfolio</a>
                    </div>
                </header>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Core Skills</div>
                    <div className={styles.skillsList}>
                        <span className={styles.skill}>AI / LLMs</span>
                        <span className={styles.skill}>Computer Vision</span>
                        <span className={styles.skill}>Frontend Development</span>
                        <span className={styles.skill}>WordPress</span>
                        <span className={styles.skill}>Cybersecurity</span>
                        <span className={styles.skill}>Product Management</span>
                        <span className={styles.skill}>Three.js / WebGL</span>
                        <span className={styles.skill}>Python</span>
                        <span className={styles.skill}>React / Next.js</span>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Key Projects</div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://spiritualai.store" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>SpiritualAI.store</a>
                            <span className={styles.date}>2025 - Present</span>
                        </div>
                        <div className={styles.description}>
                            Full-stack e-commerce platform integrating AI-powered spiritual products with interactive 3D experiences using Next.js, Three.js, and WebGL. Features personality-based product recommendations and immersive user journeys.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://genusagrofoods.com" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>Genus Agro Foods</a>
                            <span className={styles.date}>2025</span>
                        </div>
                        <div className={styles.description}>
                            Commercial website for food products (genusagrofoods.com). Developed responsive WordPress site with product catalog, SEO optimization, and integrated contact forms for B2B inquiries.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Gesture AI</span>
                            <span className={styles.date}>2023 - 2024</span>
                        </div>
                        <div className={styles.description}>
                            Computer vision system for gesture-based laptop control. Selected for IIT Delhi Startup Expo 2024. Built using MediaPipe and OpenCV for real-time hand tracking and gesture recognition.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://cyber-sentinel-suite.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>Cyber Security Agent</a>
                            <span className={styles.date}>2024</span>
                        </div>
                        <div className={styles.description}>
                            AI-powered cybersecurity monitoring suite (cyber-sentinel-suite.vercel.app). Implements threat detection, vulnerability scanning, and automated security reporting using machine learning algorithms.
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://github.com/0x-Parzival/kalki1" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>KalkiOS</a>
                            <span className={styles.date}>2024</span>
                        </div>
                        <div className={styles.description}>
                            AI-powered operating system based on Arch Linux (github.com/0x-Parzival/kalki1). Custom desktop environment with integrated AI assistant for system automation and intelligent workflow optimization.
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
                            <li><strong>Data Science Professional Certificate</strong> - KNIME (Nov 2024)</li>
                            <li><strong>Microservices Foundations Professional Certificate</strong> - Kong (Nov 2024)</li>
                            <li><strong>Kali Linux for Advanced Pen Testing and Ethical Hacking</strong> - LinkedIn (Nov 2024)</li>
                            <li><strong>Ethical Hacking: Evading IDS, Firewalls, and Honeypots</strong> - Coursera (Nov 2024)</li>
                            <li><strong>Penetration Testing Professional Certificate</strong> - Cybrary (Oct 2024)</li>
                            <li><strong>Artificial Intelligence for Cybersecurity</strong> - Project Management Institute (Oct 2024)</li>
                            <li><strong>Career Essentials in Cybersecurity</strong> - Microsoft and LinkedIn (Oct 2024)</li>
                            <li><strong>Introduction to Artificial Intelligence</strong> - NASBA (Oct 2024)</li>
                            <li><strong>Programming with Python Professional Certificate</strong> - OpenEDG Python Institute (Nov 2024)</li>
                            <li><strong>C++ Programming Professional Certificate</strong> - OpenEDG C++ Institute (Oct 2024)</li>
                        </ul>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ResumePage;
