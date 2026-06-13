import React from 'react';
import styles from './ProcessDiagram.module.css';

interface StepProps {
    num: string;
    title: string;
    desc: string;
    icon: React.ReactNode;
}

const Step = ({ title, desc, icon }: StepProps) => (
    <div className={styles.stepContainer}>
        <div className={styles.iconWrapper}>
            {icon}
        </div>
        <div className={styles.processStep}>{title}</div>
        <div className={styles.stepDescription}>
            {desc}
        </div>
    </div>
);

export default function ProcessDiagram() {
    return (
        <div className={styles.container}>
            {/* Gradient Defs for Icons */}
            <svg width="0" height="0" style={{ position: 'absolute' }}>
                <defs>
                    <linearGradient id="iconGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ffffff" />
                        <stop offset="50%" stopColor="#35f8ff" />
                        <stop offset="100%" stopColor="#ff3cf5" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Background connecting line */}
            <div className={styles.workflowLine} />

            <div className={styles.processSteps}>
                <Step 
                    num="1" 
                    title="1. Start Your Scan" 
                    desc="Click the message box below to begin. Enter your struggle and birth data." 
                    icon={
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                            <path d="M8 9h8"></path>
                            <path d="M8 13h6"></path>
                        </svg>
                    } 
                />
                
                <Step 
                    num="2" 
                    title="2. Neural Analysis" 
                    desc="The AI will talk with you to understand the exact problem you are facing." 
                    icon={
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <circle cx="12" cy="12" r="3"></circle>
                            <path d="M3 12h1m8-9v1m8 8h1m-9 8v1M5.6 5.6l.7.7m12.1-.7l-.7.7m0 11.4l.7.7m-12.1-.7l-.7.7"></path>
                        </svg>
                    } 
                />
                
                <Step 
                    num="3" 
                    title="3. Get Your Solution" 
                    desc="A report is generated with products built personally to solve your specific problem." 
                    icon={
                        <svg className={styles.icon} viewBox="0 0 24 24" fill="none" stroke="url(#iconGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                    } 
                />
            </div>
        </div>
    );
}
