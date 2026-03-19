"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './MBTIQuiz.module.css';

interface Question {
    id: number;
    text: string;
    options: {
        label: string;
        text: string;
        value: string;
        explanation: string;
    }[];
}

const CharRevealedText = ({ text, delay = 0 }: { text: string; delay?: number }) => {
    const chars = useMemo(() => text.split(""), [text]);
    
    return (
        <h2 className={styles.questionText}>
            {chars.map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0.5 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.4,
                        delay: delay + (i * 0.03), // Character by character delay
                        ease: "linear"
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </h2>
    );
};

const TypewriterText = ({ text, onComplete }: { text: string; onComplete?: () => void }) => {
    const [displayedText, setDisplayedText] = useState("");
    const chars = useMemo(() => text.split(""), [text]);
    
    useEffect(() => {
        let i = 0;
        const timer = setInterval(() => {
            setDisplayedText(text.substring(0, i));
            i++;
            if (i > text.length) {
                clearInterval(timer);
                if (onComplete) setTimeout(onComplete, 2000); 
            }
        }, 25); 
        return () => clearInterval(timer);
    }, [text, onComplete]);

    return (
        <p className={styles.explanationText}>
            {displayedText}
            <motion.span 
                animate={{ opacity: [1, 0] }}
                transition={{ repeat: Infinity, duration: 0.8 }}
                className={styles.cursor}
            >
                _
            </motion.span>
        </p>
    );
};

const questions: Question[] = [
    {
        id: 1,
        text: "After a long, exhausting week of work or responsibilities, which of these sounds more like a 'relief' to you?",
        options: [
            {
                label: "Option A",
                text: "Going out to a social gathering, a dinner with friends, or being active in the world to 'wake yourself up' and feel alive again.",
                value: "E",
                explanation: "You are an Extrovert (E). You are like a solar panel; you need the 'sunlight' of external stimulation and people to charge your internal battery."
            },
            {
                label: "Option B",
                text: "Staying at home, reading, watching a movie, or doing a solo hobby to 'decompress' and recover from the world.",
                value: "I",
                explanation: "You are an Introvert (I). You are like a rechargeable battery; you need to 'plug into a wall' (quiet, solo time) to regain the energy you spent while being out in the world."
            }
        ]
    },
    {
        id: 2,
        text: "When you are being introduced to a brand-new, complex project at work or school, what do you need to hear first to feel like you truly 'understand' it?",
        options: [
            {
                label: "Option A",
                text: "The specific, practical steps, the facts involved, and exactly what needs to be done right now.",
                value: "S",
                explanation: "You are a Sensing (S) type. You trust your five senses. You are a 'bottom-up' thinker—you gather all the small, concrete blocks first to build the wall. You prefer the 'Real.'"
            },
            {
                label: "Option B",
                text: "The 'big picture' goal, the underlying theory or 'why,' and the future possibilities of where the project could go.",
                value: "N",
                explanation: "You are an Intuition (N) type. You trust your 'sixth sense' or patterns. You are a 'top-down' thinker—you need to see the photo on the puzzle box before you can start putting the pieces together. You prefer the 'Ideal.'"
            }
        ]
    },
    {
        id: 3,
        text: "When you are resolving a conflict between two people, which approach feels more 'right' to you?",
        options: [
            {
                label: "Option A",
                text: "Analyzing the situation objectively, looking for the logical truth, and applying the same rules to everyone fairly.",
                value: "T",
                explanation: "You are a Thinking (T) type. You believe the 'truth' is the most important thing. You make decisions with your head and value being thick-skinned and impartial."
            },
            {
                label: "Option B",
                text: "Looking at the unique circumstances of the individuals involved and trying to find a solution that creates harmony and respects everyone's feelings.",
                value: "F",
                explanation: "You are a Feeling (F) type. You believe 'impact' is the most important thing. You make decisions with your heart and value being tactful, empathetic, and compassionate."
            }
        ]
    },
    {
        id: 4,
        text: "It’s Saturday morning. Which of these scenarios makes you feel more relaxed and 'at peace'?",
        options: [
            {
                label: "Option A",
                text: "Having a clear plan or list of things to do, knowing exactly what is happening and when.",
                value: "J",
                explanation: "You are a Judging (J) type. For you, 'order' is freedom. You feel stressed when things are up in the air and you get a 'high' from crossing things off a to-do list."
            },
            {
                label: "Option B",
                text: "Having a completely blank slate where you can do whatever you feel like in the moment, without any set schedule.",
                value: "P",
                explanation: "You are a Perceiving (P) type. For you, 'flexibility' is freedom. You feel trapped by rigid schedules and prefer to wait until the last minute to see what the best opportunity is."
            }
        ]
    }
];

export default function MBTIQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);

    const handleOptionSelect = (index: number) => {
        if (selectedOption !== null) return;
        setSelectedOption(index);
    };

    const handleAutoNext = () => {
        const newAnswers = [...answers, questions[currentStep].options[selectedOption!].value];
        setAnswers(newAnswers);
        
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
            setSelectedOption(null);
        } else {
            setShowResult(true);
        }
    };

    const personalityType = answers.join('');

    if (showResult) {
        return (
            <div className={styles.quizContainer} id="mbti-quiz-section">
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.resultCard}
                >
                    <h2 className={styles.resultTitle}>Cognitive Blueprint Decoded</h2>
                    <div className={styles.resultType}>{personalityType}</div>
                    
                    <div className={styles.imageContainer}>
                        <Image 
                            src={`/MBTI/personality/assets/${personalityType.toLowerCase()}_header.png`}
                            alt={personalityType}
                            width={600}
                            height={400}
                            className={styles.resultImage}
                        />
                    </div>

                    <button 
                        className={styles.continueBtn}
                        onClick={() => window.scrollTo({ top: window.innerHeight * 3, behavior: 'smooth' })}
                    >
                        Synchronize Core
                    </button>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];

    return (
        <div className={styles.quizContainer} id="mbti-quiz-section">
            <div className={styles.backgroundGlow} />
            
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className={styles.questionCard}
                >
                    <CharRevealedText text={currentQuestion.text} />

                    <div className={styles.optionsGrid}>
                        {currentQuestion.options.map((option, index) => (
                            <button
                                key={index}
                                className={`${styles.optionBtn} ${selectedOption === index ? styles.selected : ''} ${selectedOption !== null && selectedOption !== index ? styles.disabled : ''}`}
                                onClick={() => handleOptionSelect(index)}
                            >
                                <span className={styles.optionLabel}>{option.label}</span>
                                <span className={styles.optionContent}>{option.text}</span>
                            </button>
                        ))}
                    </div>

                    <div className={styles.explanationWrapper}>
                        {selectedOption !== null && (
                            <TypewriterText 
                                text={currentQuestion.options[selectedOption].explanation} 
                                onComplete={handleAutoNext}
                            />
                        )}
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className={styles.progressBar}>
                <div 
                    className={styles.progressFill} 
                    style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                />
            </div>
        </div>
    );
}
