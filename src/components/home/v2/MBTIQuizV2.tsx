"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../MBTIQuiz.module.css';

interface Question {
    id: number;
    focus: string;
    text: string;
    options: {
        label: string;
        text: string;
        value: string;
    }[];
}

const questions: Question[] = [
    {
        id: 1,
        focus: "Extraversion (E) vs. Introversion (I)",
        text: "After a long, exhausting week of work or responsibilities, which of these sounds more like a \"relief\" to you?",
        options: [
            {
                label: "Option A",
                text: "Going out to a social gathering, a dinner with friends, or being active in the world to \"wake yourself up.\"",
                value: "E",
            },
            {
                label: "Option B",
                text: "Staying at home, reading, watching a movie, or doing a solo hobby to \"decompress\" and recover.",
                value: "I",
            }
        ]
    },
    {
        id: 2,
        focus: "Sensing (S) vs. Intuition (N)",
        text: "When you are being introduced to a brand-new, complex project, what do you need to hear first to feel like you truly \"understand\" it?",
        options: [
            {
                label: "Option A",
                text: "The specific, practical steps, the facts involved, and exactly what needs to be done right now.",
                value: "S",
            },
            {
                label: "Option B",
                text: "The \"big picture\" goal, the underlying theory, and the future possibilities of where it could go.",
                value: "N",
            }
        ]
    },
    {
        id: 3,
        focus: "Thinking (T) vs. Feeling (F)",
        text: "When you are resolving a conflict between two people, which approach feels more \"right\" to you?",
        options: [
            {
                label: "Option A",
                text: "Analyzing the situation objectively, looking for the logical truth, and applying the same rules to everyone fairly.",
                value: "T",
            },
            {
                label: "Option B",
                text: "Looking at the unique circumstances of the individuals and finding a solution that creates harmony and respects feelings.",
                value: "F",
            }
        ]
    },
    {
        id: 4,
        focus: "Judging (J) vs. Perceiving (P)",
        text: "It’s Saturday morning. Which of these scenarios makes you feel more relaxed and \"at peace\"?",
        options: [
            {
                label: "Option A",
                text: "Having a clear plan or list of things to do, knowing exactly what is happening and when.",
                value: "J",
            },
            {
                label: "Option B",
                text: "Having a completely blank slate where you can do whatever you feel like in the moment, with no schedule.",
                value: "P",
            }
        ]
    }
];

export default function MBTIQuizV2({ onComplete }: { onComplete: (result: string) => void }) {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);

    const handleOptionSelect = (index: number) => {
        setSelectedOption(index);
        const newAnswers = [...answers];
        newAnswers[currentStep] = questions[currentStep].options[index].value;
        setAnswers(newAnswers);
        
        setTimeout(() => {
            setSelectedOption(null);
            if (currentStep < questions.length - 1) {
                setCurrentStep(currentStep + 1);
            } else {
                onComplete(newAnswers.join(''));
            }
        }, 600);
    };

    const currentQuestion = questions[currentStep];

    return (
        <section className={styles.quizContainer} style={{ height: '100vh', scrollSnapAlign: 'start' }}>
            <div className={styles.backgroundGlow} />
            
            <div className={styles.statusDots}>
                {questions.map((_, idx) => (
                    <div 
                        key={idx} 
                        className={`${styles.dot} ${answers[idx] ? styles.dotActive : ''} ${currentStep === idx ? styles.dotCurrent : ''}`}
                    />
                ))}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={styles.questionCard}
            >
                <span className={styles.stepCounter} style={{ marginBottom: '20px' }}>
                    {currentQuestion.focus}
                </span>
                <h2 className={styles.questionText} style={{ fontSize: 'clamp(1.5rem, 3vw, 2.5rem)', minHeight: 'auto', marginBottom: '40px' }}>
                    {currentQuestion.text}
                </h2>
                
                <div className={styles.optionsGrid}>
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            className={`${styles.optionBtn} ${selectedOption === index ? styles.selected : ''}`}
                            onClick={() => handleOptionSelect(index)}
                            style={{ padding: '2rem' }}
                        >
                            <span className={styles.optionLabel}>{option.label}</span>
                            <span className={styles.optionContent} style={{ fontSize: '1.2rem', textTransform: 'none' }}>
                                {option.text}
                            </span>
                        </button>
                    ))}
                </div>
            </motion.div>
        </section>
    );
}
