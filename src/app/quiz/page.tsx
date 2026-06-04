"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { playOmSound } from '../../utils/audio';
import styles from './quiz.module.css';

interface QuizOption {
    text: string;
    sub_label: string;
    mbti_signal: string;
}

interface QuizQuestion {
    question: string;
    context_line: string;
    options: QuizOption[];
}

const TONE_MATRIX: any = {
    female_18_24: { style: "warm, identity-exploring", color: "#ff80ab" },
    female_25_34: { style: "depth, transformation-focused", color: "#ce93d8" },
    female_35_plus: { style: "wisdom, integration-focused", color: "#ba68c8" },
    male_18_24: { style: "direction, identity-focused", color: "#80d8ff" },
    male_25_34: { style: "results, gap-focused", color: "#4fc3f7" },
    male_35_plus: { style: "legacy, mastery-focused", color: "#039be5" }
};

const DEFAULT_QUESTIONS: QuizQuestion[] = [
    {
        context_line: "To understand how you recharge your internal battery...",
        question: "After a long day, what feels more like 'coming home' to yourself?",
        options: [
            { text: "Connecting with the world and people around you", sub_label: "External Expansion", mbti_signal: "E" },
            { text: "Sinking into your own private space and thoughts", sub_label: "Internal Integration", mbti_signal: "I" }
        ]
    },
    {
        context_line: "Regarding how you process information and see the world...",
        question: "When you look at a new situation, what do you notice first?",
        options: [
            { text: "The concrete facts and practical details right in front of you", sub_label: "Grounded Reality", mbti_signal: "S" },
            { text: "The hidden patterns and future possibilities they represent", sub_label: "Abstract Architecture", mbti_signal: "N" }
        ]
    },
    {
        context_line: "When it comes to making decisions that matter...",
        question: "What is your ultimate 'north star' for a correct choice?",
        options: [
            { text: "Logic, consistency, and the objective truth of the situation", sub_label: "Logical Consistency", mbti_signal: "T" },
            { text: "How it aligns with your values and its impact on people", sub_label: "Relational Harmony", mbti_signal: "F" }
        ]
    },
    {
        context_line: "About how you navigate your life's path...",
        question: "Which way of moving through the world feels more natural?",
        options: [
            { text: "Having a clear plan and the relief of a decision made", sub_label: "Structured Command", mbti_signal: "J" },
            { text: "Keeping your options open and adapting as you go", sub_label: "Fluid Adaptation", mbti_signal: "P" }
        ]
    }
];

export default function QuizPage() {
    const router = useRouter();
    const [questions, setQuestions] = useState<QuizQuestion[]>(DEFAULT_QUESTIONS);
    const [currentStep, setCurrentStep] = useState(0);
    const [signals, setSignals] = useState<string[]>([]);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [userState, setUserState] = useState<any>(null);
    const [tone, setTone] = useState<any>(null);

    useEffect(() => {
        // Load state and dynamic questions
        const savedState = localStorage.getItem('spiritualAiState');
        const dynamicQuestions = localStorage.getItem('dynamicQuizQuestions');
        
        if (savedState) {
            const parsed = JSON.parse(savedState);
            setUserState(parsed);
            
            // Determine tone
            let toneKey = 'neutral';
            if (parsed.gender === 'female') {
                if (parsed.life_stage === '18-24') toneKey = 'female_18_24';
                else if (parsed.life_stage === '25-34') toneKey = 'female_25_34';
                else toneKey = 'female_35_plus';
            } else if (parsed.gender === 'male') {
                if (parsed.life_stage === '18-24') toneKey = 'male_18_24';
                else if (parsed.life_stage === '25-34') toneKey = 'male_25_34';
                else toneKey = 'male_35_plus';
            }
            setTone(TONE_MATRIX[toneKey] || { color: '#00e5ff' });
        }

        if (dynamicQuestions) {
            try {
                setQuestions(JSON.parse(dynamicQuestions));
            } catch (e) {
                console.error("Error parsing dynamic questions", e);
            }
        }
    }, []);

    const handleOptionClick = (option: QuizOption) => {
        playOmSound();
        const newSignals = [...signals, option.mbti_signal];
        setSignals(newSignals);

        if (currentStep < questions.length - 1) {
            setCurrentStep(prev => prev + 1);
        } else {
            // Quiz complete
            setIsTransitioning(true);
            
            // Calculate Final MBTI
            const quizMbti = calculateMBTI(newSignals);
            
            // Update state in localStorage
            let finalState;
            if (userState) {
                userState.confirmed_mbti = quizMbti;
                userState.quiz_signals = newSignals;
                finalState = userState;
            } else {
                finalState = { confirmed_mbti: quizMbti, quiz_signals: newSignals };
            }
            localStorage.setItem('spiritualAiState', JSON.stringify(finalState));

            // Trigger report generation (Blockplain Save)
            fetch('/api/blockplain/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userState: finalState }),
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    router.push(`/blueprint/${data.data.csn}`);
                } else {
                    router.push('/blueprint');
                }
            })
            .catch(err => {
                console.error("Save error:", err);
                router.push('/blueprint');
            });
        }
    };

    const calculateMBTI = (quizSignals: string[]) => {
        // Simplified: map signals to dimensions
        const dims: any = { E: 0, I: 0, N: 0, S: 0, T: 0, F: 0, J: 0, P: 0 };
        quizSignals.forEach(s => {
            if (dims[s] !== undefined) dims[s]++;
        });

        // Resolve dimensions
        const res = [
            dims.E >= dims.I ? 'E' : 'I',
            dims.N >= dims.S ? 'N' : 'S',
            dims.T >= dims.F ? 'T' : 'F',
            dims.J >= dims.P ? 'J' : 'P'
        ];
        
        return res.join('');
    };

    if (isTransitioning) {
        return (
            <div className={styles.container}>
                <div className={styles.cosmicBackground}></div>
                <div className={styles.transitionOverlay}>
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className={styles.transitionContent}
                    >
                        <div style={{ fontSize: '3rem', marginBottom: '20px' }}>🪷</div>
                        <div className={styles.transitionText}>
                            Cross-referencing your conversation pattern <br/>
                            with your cognitive architecture...
                        </div>
                    </motion.div>
                </div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];

    return (
        <div className={styles.container}>
            <div className={styles.cosmicBackground}></div>

            <div className={styles.quizContent}>
                <div className={styles.header}>
                    <h1 className={styles.title}>4 Choices. Your Cognitive Pattern Revealed.</h1>
                    <p className={styles.subtitle}>These come from what you've already told me. No right answers. Only precise ones.</p>
                </div>

                <div className={styles.progressBar}>
                    <div 
                        className={styles.progressFill} 
                        style={{ 
                            width: `${((currentStep) / questions.length) * 100}%`,
                            background: tone ? `linear-gradient(90deg, #00e5ff, ${tone.color}, #ff00ea)` : undefined
                        }}
                    />
                    <div className={styles.stepIndicator}>
                        Step {currentStep + 1} of {questions.length}
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.4, ease: "easeOut" }}
                        className={styles.questionCard}
                    >
                        <div style={{ 
                            fontSize: '0.85rem', 
                            color: tone?.color || 'rgba(0, 229, 255, 0.7)', 
                            fontStyle: 'italic',
                            marginBottom: '15px',
                            fontFamily: 'Inter, sans-serif'
                        }}>
                            "{currentQuestion.context_line}"
                        </div>
                        
                        <h2 className={styles.questionText}>{currentQuestion.question}</h2>
                        
                        <div className={styles.optionsContainer}>
                            {currentQuestion.options.map((option, idx) => (
                                <button
                                    key={idx}
                                    className={styles.optionBtn}
                                    onClick={() => handleOptionClick(option)}
                                >
                                    <span style={{ display: 'block', marginBottom: '4px' }}>{option.text}</span>
                                    <span className={styles.optionLabel}>[{option.sub_label}]</span>
                                </button>
                            ))}
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
