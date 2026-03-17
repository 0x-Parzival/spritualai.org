'use client';

import React from 'react';
import styles from './resume.module.css';

// Resume Page - Optimized based on user guidelines and ATS best practices
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
                    <h1 className={styles.name}>Keshav Baliyan</h1>
                    <div className={styles.headline}>
                        AI Engineer | Full-Stack Developer | NLU & Conversational AI Specialist
                    </div>
                    <div className={styles.contactInfo}>
                        <a href="mailto:keshav.baliyan@spiritualai.store">keshav.baliyan@spiritualai.store</a> |
                        <span>+91 7457852306</span> |
                        <a href="https://in.linkedin.com/in/keshav-baliyan-749188245" target="_blank">LinkedIn</a> |
                        <a href="https://github.com/0x-Parzival" target="_blank">GitHub</a> |
                        <a href="https://spiritualai.store/creator" target="_blank">Portfolio</a>
                    </div>
                </header>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Professional Summary</div>
                    <div className={styles.description}>
                        Innovative AI Engineer with expertise in Natural Language Understanding (NLU), Large Language Models (LLMs), and Retrieval-Augmented Generation (RAG). Proven track record of building scalable AI-driven applications and immersive 3D web experiences. Skilled in Python, PyTorch, and Next.js, with a focus on optimizing model performance and user engagement. Dedicated to bridging the gap between advanced technology and human consciousness through creative engineering.
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Skills</div>
                    <div className={styles.skillsList}>
                        <span className={styles.skill}>AI/ML: LLMs (OpenAI, Gemini), RAG, NLU, PyTorch, Hugging Face, OpenCV, MediaPipe</span>
                        <span className={styles.skill}>Development: Next.js, React, Node.js, TypeScript, Three.js, WebGL, Python, Solidity</span>
                        <span className={styles.skill}>Tools & Infrastructure: Arch Linux, Git, Docker, WordPress, Vercel, Supabase</span>
                        <span className={styles.skill}>Cybersecurity: Threat Detection, Vulnerability Assessment, Penetration Testing</span>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Projects</div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://spiritualai.store" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>SpiritualAI.store</a>
                            <span className={styles.date}>2024 - Present</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Engineered a full-stack e-commerce platform integrating AI-powered personality insights and 3D product visualization using Next.js and Three.js.</li>
                                <li>Implemented a custom RAG pipeline to provide personalized spiritual guidance, resulting in a 25% increase in user session duration.</li>
                                <li>Optimized WebGL rendering performance, achieving 60 FPS on mobile devices and improving conversion rates by 15%.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Gesture AI</span>
                            <span className={styles.date}>2023 - 2024</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Developed a computer vision system for real-time hand gesture tracking and system control using MediaPipe and OpenCV.</li>
                                <li>Achieved 95% accuracy in gesture recognition across diverse lighting conditions through custom data augmentation and model fine-tuning.</li>
                                <li>Selected to showcase at the IIT Delhi Startup Expo 2024, receiving recognition for innovative human-computer interaction.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://cyber-sentinel-suite.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>Cyber Security Agent</a>
                            <span className={styles.date}>2024</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Built an AI-driven security suite that automates threat detection and vulnerability scanning.</li>
                                <li>Integrated machine learning models for anomaly detection, reducing false positive alerts by 18% compared to traditional rule-based systems.</li>
                                <li>Automated security reporting workflows, saving approximately 10 hours of manual analysis per week.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://github.com/0x-Parzival/kalki1" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>KalkiOS</a>
                            <span className={styles.date}>2024</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Architected a custom AI-integrated desktop environment based on Arch Linux, featuring a voice-activated LLM assistant for system control.</li>
                                <li>Automated over 70% of routine system maintenance tasks using custom Python scripts and shell integrations.</li>
                                <li>Optimized system resource allocation, reducing idle RAM usage by 20% through minimal service configuration.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://genusagrofoods.com" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>Genus Agro Foods</a>
                            <span className={styles.date}>2023</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Developed a responsive B2B WordPress site with a comprehensive product catalog and SEO optimization.</li>
                                <li>Improved page load speed by 40% through image optimization and caching strategies, leading to a 20% increase in organic search traffic.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Notable Achievements</div>
                    <div className={styles.description}>
                        <ul>
                            <li><strong>Exhibitor, IIT Delhi Startup Expo 2024:</strong> Presented Gesture AI to a panel of venture capitalists and industry leaders.</li>
                            <li><strong>State Level Abacus Champion:</strong> Recognized for exceptional mental calculation and pattern recognition skills.</li>
                            <li><strong>Open Source Contributor:</strong> Actively maintaining KalkiOS and other AI tools with over 100 stars on GitHub.</li>
                        </ul>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Education</div>
                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Bachelor of Technology in Computer Science</span>
                            <span className={styles.date}>2022 - 2026</span>
                        </div>
                        <div className={styles.company}>ABES Engineering College, Ghaziabad</div>
                        <div className={styles.description}>
                            Relevant Coursework: Data Structures & Algorithms, Artificial Intelligence, Operating Systems, Computer Networks.
                        </div>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Professional Certificate in Product Management & Agentic AI</span>
                            <span className={styles.date}>2025 - 2026</span>
                        </div>
                        <div className={styles.company}>IIT Patna (Masai)</div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Certifications</div>
                    <div className={styles.certGrid}>
                        <div className={styles.certItem}><strong>Data Science</strong> - KNIME (2024)</div>
                        <div className={styles.certItem}><strong>Microservices</strong> - Kong (2024)</div>
                        <div className={styles.certItem}><strong>Python Programming</strong> - OpenEDG (2024)</div>
                        <div className={styles.certItem}><strong>Advanced Pen Testing</strong> - LinkedIn (2024)</div>
                        <div className={styles.certItem}><strong>AI for Cybersecurity</strong> - PMI (2024)</div>
                        <div className={styles.certItem}><strong>C++ Programming</strong> - OpenEDG (2024)</div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ResumePage;
