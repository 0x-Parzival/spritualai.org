"use client";

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { quizQuestions, calculateMBTI } from '@/data/quiz-questions';
import styles from './discover.module.css';
import resultStyles from './result-screen.module.css';
import './atmosphere.css';
import SpaceBackground from '@/components/SpaceBackground';
import PortalResult from '@/components/PortalResult/PortalResult';
import {
    User, Users, Eye, Sparkles, Brain, Heart, ListChecks, Compass,
    LucideIcon
} from 'lucide-react';

const IconMap: Record<string, LucideIcon> = {
    User, Users, Eye, Sparkles, Brain, Heart, ListChecks, Compass
};

interface QuizState {
    currentStep: number; // 0=intro, 1-4=questions
    answers: {
        q1: 'A' | 'B' | null;
        q2: 'A' | 'B' | null;
        q3: 'A' | 'B' | null;
        q4: 'A' | 'B' | null;
    };
    showAffirmation: boolean;
    selectedOption: 'A' | 'B' | null;
    mounted: boolean; // Added for hydration check
}

export default function DiscoverPage() {
    const router = useRouter();
    const stars2Ref = useRef<HTMLDivElement>(null);
    const stars3Ref = useRef<HTMLDivElement>(null);

    const [state, setState] = useState<QuizState>({
        currentStep: 0,
        answers: { q1: null, q2: null, q3: null, q4: null },
        selectedOption: null,
        showAffirmation: false,
        mounted: false
    });

    // Generate stars (matching homepage)
    useEffect(() => {
        function generateStars(element: HTMLDivElement | null, count: number, maxSize = 2000) {
            if (!element) return;

            const stars = [];
            for (let i = 0; i < count; i++) {
                const x = Math.floor(Math.random() * maxSize);
                const y = Math.floor(Math.random() * maxSize);
                stars.push(`${x}px ${y}px #FFF`);
            }

            const boxShadowValue = stars.join(",");
            element.style.boxShadow = boxShadowValue;

            if (!element.querySelector(".star-clone")) {
                const after = document.createElement("div");
                after.className = "star-clone";
                after.style.cssText = `position:absolute;top:2000px;width:inherit;height:inherit;box-shadow:${boxShadowValue};`;
                element.appendChild(after);
            }
        }

        generateStars(stars2Ref.current, 700);
        generateStars(stars3Ref.current, 200);

        setState(prev => ({ ...prev, mounted: true }));
    }, []); // Run only once on mount

    // Load saved progress from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('quiz_progress');
        if (saved) {
            try {
                const parsed = JSON.parse(saved);
                setState(prev => ({ ...prev, ...parsed }));
            } catch (e) {
                // Invalid saved data, ignore
            }
        }
    }, []);

    // Save progress to localStorage
    useEffect(() => {
        if (state.currentStep > 0) {
            localStorage.setItem('quiz_progress', JSON.stringify({
                currentStep: state.currentStep,
                answers: state.answers
            }));
        }
    }, [state.currentStep, state.answers]);

    const handleBegin = () => {
        setState(prev => ({ ...prev, currentStep: 1 }));
    };

    const handleOptionSelect = (option: 'A' | 'B') => {
        setState(prev => ({ ...prev, selectedOption: option, showAffirmation: true }));

        // Immediate transition after brief affirmation (only during quiz, not intro)
        if (state.currentStep >= 1) {
            setTimeout(() => {
                handleNext(option);
            }, 1000);
        }
    };

    const handleNext = (explicitOption?: 'A' | 'B') => {
        const selected = explicitOption || state.selectedOption;
        if (!selected) return;

        const currentQuestionKey = `q${state.currentStep}` as keyof typeof state.answers;
        const newAnswers = { ...state.answers, [currentQuestionKey]: selected };

        if (state.currentStep === 4) {
            // Calculate MBTI
            const mbtiType = calculateMBTI(newAnswers as any);
            localStorage.removeItem('quiz_progress'); // Clear progress

            // Set to result screen (step 5) for Portal Effect
            setState(prev => ({
                ...prev,
                currentStep: 5,
                answers: newAnswers
            }));

            // Redirect handled by PortalResult component
        } else {
            setState(prev => ({
                ...prev,
                currentStep: prev.currentStep + 1,
                selectedOption: null,
                showAffirmation: false,
                answers: newAnswers
            }));
        }
    };

    const handleExit = () => {
        if (confirm('Are you sure you want to exit the assessment?')) {
            localStorage.removeItem('quiz_progress');
            router.push('/');
        }
    };

    if (!state.mounted) return null;

    // Intro Screen
    if (state.currentStep === 0) {
        return (
            <div className={styles.container}>
                {/* 3D Space Background */}
                <SpaceBackground />

                {/* Fog Container */}
                <div className="fog-container">
                    <div className="fog-layer-horizon"></div>
                    <div className="fog-layer-mid"></div>
                    <div className="fog-layer-upper"></div>
                </div>

                {/* Vignette */}
                <div className="vignette"></div>

                {/* Film Grain */}
                <div className="film-grain"></div>

                <div className={styles.intro}>
                    <h1 className={styles.heading}>
                        There are no right answers here.
                    </h1>
                    <p className={styles.subtext}>
                        Only what feels true — even if you've never said it out loud.
                    </p>
                    <p className={styles.microCopy}>
                        This is not a personality label.<br />
                        It's a snapshot of how your mind prefers to operate right now.
                    </p>
                    <button className={styles.beginButton} onClick={handleBegin}>
                        Begin
                    </button>
                    <a href="/" className={styles.exitLink}>
                        Not ready? Come back anytime
                    </a>
                </div>
            </div>
        );
    }

    // Result Screen (Step 5)
    if (state.currentStep === 5) {
        const mbtiType = calculateMBTI(state.answers as any).toUpperCase();

        return (
            <div className={styles.container}>
                {/* 3D Space Background */}
                <SpaceBackground />

                {/* Fog Container */}
                <div className="fog-container">
                    <div className="fog-layer-horizon"></div>
                    <div className="fog-layer-mid"></div>
                    <div className="fog-layer-upper"></div>
                </div>

                <PortalResult mbtiType={mbtiType} />
            </div>
        );
    }

    // Question Screen
    const currentQuestion = quizQuestions[state.currentStep - 1];
    if (!currentQuestion) return null; // Safety check

    return (
        <div className={styles.container}>
            {/* 3D Space Background */}
            <SpaceBackground />

            {/* Fog Container */}
            <div className="fog-container">
                <div className="fog-layer-horizon"></div>
                <div className="fog-layer-mid"></div>
                <div className="fog-layer-upper"></div>
            </div>

            {/* Vignette */}
            <div className="vignette"></div>

            {/* Film Grain */}
            <div className="film-grain"></div>

            <div className={styles.questionContainer}>
                <div className={styles.progress}>
                    Step {state.currentStep} of 4
                </div>

                <h2 className={styles.question}>
                    {currentQuestion.question}
                </h2>

                <div className={styles.options}>
                    <div
                        className={`${styles.option} ${state.selectedOption === 'A' ? styles.selected : ''}`}
                        onClick={() => handleOptionSelect('A')}
                    >
                        <div className={styles.optionContent}>
                            <div className={styles.optionTitle}>
                                {currentQuestion.optionA.text}
                            </div>
                            <div className={styles.optionDescription}>
                                {currentQuestion.optionA.description}
                            </div>
                        </div>
                        {currentQuestion.optionA.icon && IconMap[currentQuestion.optionA.icon] && (
                            <div className={styles.optionIcon}>
                                {(() => {
                                    const Icon = IconMap[currentQuestion.optionA.icon];
                                    return <Icon size={32} strokeWidth={1.5} />;
                                })()}
                            </div>
                        )}
                    </div>

                    <div
                        className={`${styles.option} ${state.selectedOption === 'B' ? styles.selected : ''}`}
                        onClick={() => handleOptionSelect('B')}
                    >
                        <div className={styles.optionContent}>
                            <div className={styles.optionTitle}>
                                {currentQuestion.optionB.text}
                            </div>
                            <div className={styles.optionDescription}>
                                {currentQuestion.optionB.description}
                            </div>
                        </div>
                        {currentQuestion.optionB.icon && IconMap[currentQuestion.optionB.icon] && (
                            <div className={styles.optionIcon}>
                                {(() => {
                                    const Icon = IconMap[currentQuestion.optionB.icon];
                                    return <Icon size={32} strokeWidth={1.5} />;
                                })()}
                            </div>
                        )}
                    </div>
                </div>

                {state.showAffirmation && (
                    <div className={styles.affirmation}>
                        {currentQuestion.affirmation}
                    </div>
                )}

                {state.currentStep > 1 && (
                    <button
                        className={styles.backButton}
                        onClick={() => {
                            setState(prev => ({
                                ...prev,
                                currentStep: prev.currentStep - 1,
                                selectedOption: null,
                                showAffirmation: false,
                                mounted: false
                            }));
                        }}
                    >
                        ← Back
                    </button>
                )}

                <a href="#" className={styles.exitLink} onClick={(e) => { e.preventDefault(); handleExit(); }}>
                    Exit assessment
                </a>
            </div>
        </div>
    );
}
