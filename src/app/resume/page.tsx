'use client';

import React from 'react';
import styles from './resume.module.css';

// Resume Page - Optimized for RingCentral Staff AI Engineer Role & ATS
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
                        Senior AI/ML Engineer | NLU & Conversational AI Specialist | Full-Stack Architect
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
                        Expert AI Engineer with 8+ years of theoretical and 4+ years of hands-on experience in Natural Language Understanding (NLU), Large Language Models (LLMs), and Retrieval-Augmented Generation (RAG). Specializing in designing and deploying scalable Conversational AI pipelines at production scale. Proven track record in model optimization (TensorRT, ONNX, Quantization) and multi-provider LLM orchestration. Dedicated to building intelligent systems that integrate advanced cognitive architectures with high-performance engineering.
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Skills</div>
                    <div className={styles.skillsList}>
                        <span className={styles.skill}>AI/ML: LLMs (OpenAI, Gemini, Claude), RAG Pipelines, NLU, PyTorch, Hugging Face, FAISS, Qdrant, LlamaIndex</span>
                        <span className={styles.skill}>Optimization & Deployment: TensorRT, ONNX, Quantization, Pruning, Model Serving (MLOps), Docker, CI/CD</span>
                        <span className={styles.skill}>Full-Stack & Immersive: Next.js, React, Node.js, TypeScript, Three.js, WebGL, Python (FastAPI/Flask), Solidity</span>
                        <span className={styles.skill}>Infrastructure: Arch Linux, Git, Vector Databases (pgVector), Supabase, Vercel, AWS/GCP Deployment</span>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Projects</div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://spiritualai.store" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>SpiritualAI.store — Conversational AI & RAG Platform</a>
                            <span className={styles.date}>2024 - Present</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Architected and deployed a production-scale Conversational AI platform leveraging LLMs and a complex RAG pipeline using **Qdrant** and **LlamaIndex**.</li>
                                <li>Implemented multi-provider LLM orchestration with automated fallbacks and ensemble routing, increasing system reliability by 99.9%.</li>
                                <li>Optimized inference latency by 40% using **TensorRT** and **Quantization (INT8)**, enabling real-time 3D interaction at 60 FPS on low-power devices.</li>
                                <li>Integrated semantic search and context management using **FAISS**, resulting in a 35% improvement in response relevance and a 25% increase in user retention.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <span className={styles.position}>Gesture AI — Vision-Driven NLU Interface</span>
                            <span className={styles.date}>2023 - 2024</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Developed a high-performance computer vision system for real-time gesture-to-command translation using MediaPipe and custom PyTorch models.</li>
                                <li>Achieved 97.5% accuracy in complex gesture recognition through advanced data augmentation and transformer-based attention mechanisms.</li>
                                <li>Selected for **IIT Delhi Startup Expo 2024** for pioneering work in non-tactile human-computer interaction and multimodal NLU.</li>
                                <li>Converted models to **ONNX** format for cross-platform deployment, reducing CPU overhead by 50%.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://cyber-sentinel-suite.vercel.app" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>Cyber Security Agent — Automated Threat NLU</a>
                            <span className={styles.date}>2024</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Engineered an AI-powered security monitoring suite using LLMs for automated log analysis and threat report generation.</li>
                                <li>Reduced false-positive threat detections by 22% through the implementation of a fine-tuned BERT model for anomaly classification.</li>
                                <li>Automated 90% of vulnerability reporting, saving 15+ hours of security engineering effort per week.</li>
                            </ul>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <div className={styles.itemHeader}>
                            <a href="https://github.com/0x-Parzival/kalki1" target="_blank" rel="noopener noreferrer" className={styles.projectLink}>KalkiOS — AI-Native Operating System</a>
                            <span className={styles.date}>2024</span>
                        </div>
                        <div className={styles.description}>
                            <ul>
                                <li>Architected an AI-first desktop environment with integrated local LLMs for system-level automation and natural language shell interaction.</li>
                                <li>Developed a custom prompt engineering framework for system task execution, achieving 90% success in complex multi-step workflows.</li>
                                <li>Optimized local model inference using **llama.cpp** and hardware acceleration, enabling smooth performance on consumer hardware.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionTitle}>Notable Achievements</div>
                    <div className={styles.description}>
                        <ul>
                            <li><strong>Exhibitor, IIT Delhi Startup Expo 2024:</strong> Recognized for innovation in Gesture-Based AI systems.</li>
                            <li><strong>State Level Abacus Champion:</strong> Advanced cognitive foundation in logic and pattern recognition.</li>
                            <li><strong>Open Source Leadership:</strong> Maintaining production-ready AI tools with significant community adoption on GitHub.</li>
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
                            Core Focus: Advanced AI, Data Structures, Distributed Systems, Operating Systems.
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
