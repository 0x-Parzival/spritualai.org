"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import styles from './MBTIQuiz.module.css';
import dynamic from 'next/dynamic';

const FishTank = dynamic(() => import('../artistic/FishTank'), { ssr: false });

interface Question {
    id: number;
    text: string;
    options: {
        label: string;
        text: string;
        subtext?: string;
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
                    initial={{ opacity: 0.2 }}
                    animate={{ opacity: 1 }}
                    transition={{
                        duration: 0.3,
                        delay: delay + (i * 0.02),
                        ease: "linear"
                    }}
                >
                    {char}
                </motion.span>
            ))}
        </h2>
    );
};

const questions: Question[] = [
    {
        id: 1,
        text: "You've just finished a draining, high-stakes week. To feel like yourself again, your instinct is to...",
        options: [
            {
                label: "Option A",
                text: "Immerse yourself in dynamic environments and connect with others",
                subtext: "External Expansion",
                value: "E",
                explanation: "You draw energy from the external world."
            },
            {
                label: "Option B",
                text: "Retreat into your sanctuary to process and decompress alone",
                subtext: "Internal Integration",
                value: "I",
                explanation: "You draw energy from your internal world."
            }
        ]
    },
    {
        id: 2,
        text: "When learning a complex new concept, your mind immediately searches for...",
        options: [
            {
                label: "Option A",
                text: "Practical applications, concrete facts, and proven methods",
                subtext: "Grounded Reality",
                value: "S",
                explanation: "You trust tangible, sensory information."
            },
            {
                label: "Option B",
                text: "Underlying patterns, theoretical frameworks, and future possibilities",
                subtext: "Abstract Architecture",
                value: "N",
                explanation: "You trust abstract, intuitive connections."
            }
        ]
    },
    {
        id: 3,
        text: "You have to make a difficult decision that affects others. Your core filter is...",
        options: [
            {
                label: "Option A",
                text: "Objective fairness, logical consistency, and the raw truth",
                subtext: "The Architect's Edge",
                value: "T",
                explanation: "You prioritize logic over sentiment."
            },
            {
                label: "Option B",
                text: "Empathetic impact, relational harmony, and core human values",
                subtext: "The Empath's Compass",
                value: "F",
                explanation: "You prioritize feeling and harmony over raw logic."
            }
        ]
    },
    {
        id: 4,
        text: "How do you prefer to navigate the unfolding of your life?",
        options: [
            {
                label: "Option A",
                text: "With decisive structure, clear plans, and resolved closure",
                subtext: "Structured Command",
                value: "J",
                explanation: "You prefer a planned, organized approach."
            },
            {
                label: "Option B",
                text: "With fluid adaptability, keeping options open as things evolve",
                subtext: "Fluid Adaptation",
                value: "P",
                explanation: "You prefer a flexible, spontaneous approach."
            }
        ]
    }
];

export default function MBTIQuiz() {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<string[]>([]);
    const [selectedOption, setSelectedOption] = useState<number | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [feedback, setFeedback] = useState(false);

    // Keyboard support
    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (showResult) return;
            if (e.key.toLowerCase() === 'a') handleOptionSelect(0);
            if (e.key.toLowerCase() === 'b') handleOptionSelect(1);
        };
        window.addEventListener('keydown', handleKeyPress);
        return () => window.removeEventListener('keydown', handleKeyPress);
    }, [currentStep, showResult, answers]);

    // Sync selectedOption when step changes
    useEffect(() => {
        if (answers[currentStep]) {
            const val = answers[currentStep];
            const idx = questions[currentStep].options.findIndex(o => o.value === val);
            setSelectedOption(idx);
        } else {
            setSelectedOption(null);
        }
    }, [currentStep, answers]);

    const handleOptionSelect = (index: number) => {
        if (selectedOption !== null && !answers[currentStep]) return;
        
        setSelectedOption(index);
        setFeedback(true);

        if (!answers[currentStep]) {
            const newAnswers = [...answers];
            newAnswers[currentStep] = questions[currentStep].options[index].value;
            setAnswers(newAnswers);
            
            setTimeout(() => {
                setFeedback(false);
                if (currentStep <questions.length - 1) {
                    setCurrentStep(currentStep + 1);
                } else {
                    setShowResult(true);
                }
            }, 800);
        } else {
            const newAnswers = [...answers];
            newAnswers[currentStep] = questions[currentStep].options[index].value;
            setAnswers(newAnswers);
            setTimeout(() => setFeedback(false), 800);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) setCurrentStep(currentStep - 1);
    };

    const handleNext = () => {
        if (currentStep <questions.length - 1 && answers[currentStep]) {
            setCurrentStep(currentStep + 1);
        } else if (currentStep === questions.length - 1 && answers[currentStep]) {
            setShowResult(true);
        }
    };

    const personalityType = answers.join('');

    useEffect(() => {
        if (showResult && personalityType) {
            document.body.setAttribute('data-personality-result', personalityType.toLowerCase());
            try {
                localStorage.setItem('mbti_quiz_result', personalityType);
            } catch (_) {}
            return () => document.body.removeAttribute('data-personality-result');
        }
    }, [showResult, personalityType]);

    const spiritualArchetypes: Record<string, { title: string, path: string, desc: string }> = {
        'INFP': { title: 'The Seeker', path: 'Bhakti Yoga (Path of Devotion)', desc: 'Your path to enlightenment is through authentic self-expression and connecting your deep inner values to the outer world.' },
        'INFJ': { title: 'The Mystic', path: 'Raja Yoga (Path of Insight)', desc: 'You decode the collective unconscious. Your path requires protecting your energy while guiding others through complex emotional landscapes.' },
        'INTJ': { title: 'The Architect', path: 'Jnana Yoga (Path of Knowledge)', desc: 'You build systems of truth. Your spiritual growth comes from realizing which variables in life cannot be controlled, only experienced.' },
        'INTP': { title: 'The Alchemist', path: 'Jnana Yoga (Path of Knowledge)', desc: 'You transmute chaos into logical order. True alignment happens when you integrate your intellectual frameworks with your physical reality.' },
        'ENFP': { title: 'The Catalyst', path: 'Karma Yoga (Path of Action)', desc: 'You spark transformation. Your spiritual challenge is grounding your infinite possibilities into a singular, focused manifestation.' },
        'ENFJ': { title: 'The Oracle', path: 'Bhakti Yoga (Path of Devotion)', desc: 'You mirror the highest potential in others. Your path requires establishing internal boundaries so you do not lose yourself in the collective.' },
        'ENTJ': { title: 'The Commander', path: 'Karma Yoga (Path of Action)', desc: 'You manifest order from vision. True power unlocks when you learn to surrender to the flow rather than trying to steer the river.' },
        'ENTP': { title: 'The Visionary', path: 'Jnana Yoga (Path of Knowledge)', desc: 'You challenge paradigms. Your spiritual growth requires building the discipline to see one massive vision through to completion.' },
        'ISFJ': { title: 'The Guardian', path: 'Karma Yoga (Path of Action)', desc: 'You anchor the world in stability. Your true path involves recognizing your own needs are just as sacred as the ones you protect.' },
        'ISFP': { title: 'The Artisan', path: 'Bhakti Yoga (Path of Devotion)', desc: 'You create beauty from raw emotion. Alignment comes when you share your internal aesthetic without fear of external judgment.' },
        'ISTJ': { title: 'The Sentinel', path: 'Karma Yoga (Path of Action)', desc: 'You are the bedrock of structure. True spiritual expansion happens when you allow space for the unknown and unplannable.' },
        'ISTP': { title: 'The Craftsman', path: 'Raja Yoga (Path of Insight)', desc: 'You master the physical world. Your higher path opens when you apply that same tactical mastery to your internal emotional landscape.' },
        'ESFJ': { title: 'The Provider', path: 'Bhakti Yoga (Path of Devotion)', desc: 'You weave the social fabric. Enlightenment means discovering who you are when there is no one around to take care of.' },
        'ESFP': { title: 'The Performer', path: 'Karma Yoga (Path of Action)', desc: 'You are the embodiment of presence. Your deepest growth comes from sitting in silence and finding joy without external stimulation.' },
        'ESTJ': { title: 'The Director', path: 'Karma Yoga (Path of Action)', desc: 'You optimize reality. Your spiritual challenge is learning that efficiency is meaningless without an underlying foundation of purpose.' },
        'ESTP': { title: 'The Dynamo', path: 'Raja Yoga (Path of Insight)', desc: 'You navigate chaos with ease. True mastery involves slowing down enough to understand the "why" behind the action.' }
    };

    if (showResult) {
        const archetype = spiritualArchetypes[personalityType] || { title: 'The Observer', path: 'Path of Integration', desc: 'You are decoding your unique cognitive architecture to find alignment.' };
        return (
            <div className={styles.quizContainer} id="mbti-quiz-section">
                <FishTank />
                <motion.div 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={styles.resultCard}
                >
                    <h2 className={styles.resultTitle}>Cognitive Blueprint Decoded</h2>
                    
                    <div className={styles.spiritualFraming} style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
                        <div className={styles.resultType} style={{ marginBottom: '5px' }}>{personalityType} — {archetype.title}</div>
                        <div style={{ color: '#ff3cf5', fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', letterSpacing: '1px', marginBottom: '1rem' }}>
                            Optimal Alignment: {archetype.path}
                        </div>
                        <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '0.95rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
                            {archetype.desc}
                        </p>
                    </div>
                    
                    <div className={styles.imageContainer}>
                        <Image 
                            src={`/MBTI/HOVER/${personalityType.toUpperCase()}.png`}
                            alt={personalityType}
                            width={600}
                            height={400}
                            className={styles.resultImage}
                        />
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
                        <motion.div
                            animate={{ y: [0, 10, 0] }}
                            transition={{ duration: 2, ease: 'easeInOut', repeat: Infinity }}
                            style={{ color: '#35f8ff', fontSize: '2.5rem', textShadow: '0 0 15px #35f8ff', marginBottom: '10px' }}
                        >
                            ↓
                        </motion.div>
                        <button 
                            className={styles.continueBtn}
                            onClick={() => window.scrollTo({ top: window.innerHeight * 2 + 150, behavior: 'smooth' })}
                        >
                            Synchronize Core
                        </button>
                    </div>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];

    return (
        <div className={styles.quizContainer} id="mbti-quiz-section">
            <FishTank />
            <div className={styles.backgroundGlow} />

            <h1 className={styles.quizHeader}>
                4 Choices. Your Cognitive Pattern Revealed.
            </h1>
            <p className={styles.quizSubHeader}>
                Most people misidentify their personality. This doesn’t.
            </p>

            <div className={styles.stepCounter}>
                Step {currentStep + 1} of 4 — Mapping Your Mind
            </div>

            <div className={styles.navWrapper}>
                <button 
                    className={`${styles.navArrow} ${currentStep === 0 ? styles.navDisabled : ''}`}
                    onClick={handleBack}
                    disabled={currentStep === 0}
                >
                    ←
                </button>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className={styles.questionCard}
                    >
                        <CharRevealedText text={currentQuestion.text} />
                        
                        <div className={styles.optionsGrid}>
                            {currentQuestion.options.map((option, index) => (
                                <button
                                    key={index}
                                    className={`${styles.optionBtn} ${selectedOption === index ? styles.selected : ''} ${selectedOption !== null && selectedOption !== index && !answers[currentStep] ? styles.disabled : ''}`}
                                    onClick={() => handleOptionSelect(index)}
                                >
                                    <span className={styles.optionLabel}>{option.label}</span>
                                    <span className={styles.optionContent}>{option.text}</span>
                                    {option.subtext && <span className={styles.optionSubtext}>{option.subtext}</span>}
                                    {feedback && selectedOption === index && (
                                        <span className={styles.feedbackText}>Pattern detected...</span>
                                    )}
                                </button>
                            ))}
                        </div>

                        <div className={styles.keyboardHint}>
                            Press A to select Option A, Press B to select Option B
                        </div>
                    </motion.div>
                </AnimatePresence>

                <button 
                    className={`${styles.navArrow} ${!answers[currentStep] ? styles.navDisabled : ''}`}
                    onClick={handleNext}
                    disabled={!answers[currentStep]}
                >
                    →
                </button>
            </div>
        </div>
    );
}
