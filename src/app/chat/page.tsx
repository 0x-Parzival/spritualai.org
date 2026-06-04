"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';
import { motion, AnimatePresence } from 'framer-motion';
import { playOmSound } from '../../utils/audio';
import styles from './chat.module.css';

const PAUSE_TEXTS = [
    "Reading your pattern...",
    "Mapping your architecture...",
    "Your path is forming..."
];

function ChatContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { isLoaded, isSignedIn } = useAuth();
    const initialMessage = searchParams.get('initial');
    
    const [messages, setMessages] = useState<{role: 'user' | 'ai', content: string}[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [questionCount, setQuestionCount] = useState(1);
    const [sacredPause, setSacredPause] = useState(false);
    const [pauseTextIndex, setPauseTextIndex] = useState(0);
    
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const recognitionRef = useRef<any>(null);

    // Initial state matching our backend interface
    const [userState, setUserState] = useState<any>({
        chip_selected: initialMessage || "Unknown",
        current_question: "If you woke up tomorrow with one thing resolved, what would it be?",
        mbti_probability: {},
        confirmed_mbti: null,
        gender: null,
        age: null,
        life_stage: null,
        pain_pattern: null,
        urgency_score: 0,
        budget: null,
        tried_before: [],
        core_wound: null,
        question_count: 0,
        exchange_history: [],
        recommended_products: [],
        final_summary: null,
        price_point: null,
        // Fields from the spiritual engine
        confirmedMBTI: null,
        detectedPattern: null,
        jungianArchetype: null,
        hawkinsLevel: null,
        monetizableProblem: null,
        birthDate: null,
        preferredLanguage: 'English',
        activeArchetype: 'seeker',
        interestScore: 0,
        sessionConfig: {},
        identifiedLayers: {},
        csn: null,
    });

    useEffect(() => {
        if (initialMessage && messages.length === 0) {
            handleSendMessage(initialMessage, true);
        }
    }, [initialMessage]);

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const handleSendMessage = async (text: string, isInitial = false) => {
        if (!text.trim() || isTyping) return;

        playOmSound();
        const userMsg = { role: 'user' as const, content: text };
        setMessages(prev => [...prev, userMsg]);
        if (!isInitial) setInputValue("");
        setIsTyping(true);

        try {
            // Try the spiritual API first (Groq-powered), fallback to Gemini chat API
            let response;
            let data;
            
            try {
                response = await fetch('/api/spiritual', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        action: 'process_answer',
                        userState,
                        conversationHistory: [...messages, userMsg],
                        userAnswer: text,
                    }),
                });
                data = await response.json();
                
                if (data.success && data.data) {
                    const d = data.data;
                    
                    // Update userState with the spiritual engine's analysis
                    setUserState((prev: any) => ({
                        ...prev,
                        confirmed_mbti: d.confirmedMBTI || prev.confirmed_mbti,
                        confirmedMBTI: d.confirmedMBTI || prev.confirmedMBTI,
                        detectedPattern: d.detectedPattern || prev.detectedPattern,
                        pain_pattern: d.detectedPattern || prev.pain_pattern,
                        jungianArchetype: d.jungianArchetype || prev.jungianArchetype,
                        hawkinsLevel: d.hawkinsLevel || prev.hawkinsLevel,
                        monetizableProblem: d.monetizableProblem || prev.monetizableProblem,
                        birthDate: d.birthDate || prev.birthDate,
                        activeArchetype: d.activeArchetype || prev.activeArchetype,
                        question_count: (prev.question_count || 0) + 1,
                        interestScore: d.interestScore || prev.interestScore,
                        exchange_history: [...(prev.exchange_history || []), userMsg, { role: 'ai', content: d.question || d.mirroringLine }],
                        csn: d.csn || prev.csn,
                    }));
                    
                    setMessages(prev => [...prev, { role: 'ai', content: d.question || d.mirroringLine || d.contextLine }]);
                    
                    // Check if the AI has completed the decoding (final_share type)
                    if (d.type === 'final_share' || d.decodingProgress >= 100) {
                        // Update state with final data including report and products
                        const finalState = {
                            ...userState,
                            confirmed_mbti: d.confirmedMBTI || userState.confirmed_mbti,
                            confirmedMBTI: d.confirmedMBTI || userState.confirmedMBTI,
                            detectedPattern: d.detectedPattern || userState.detectedPattern,
                            pain_pattern: d.detectedPattern || userState.pain_pattern,
                            jungianArchetype: d.jungianArchetype || userState.jungianArchetype,
                            hawkinsLevel: d.hawkinsLevel || userState.hawkinsLevel,
                            monetizableProblem: d.monetizableProblem || userState.monetizableProblem,
                            birthDate: d.birthDate || userState.birthDate,
                            activeArchetype: d.activeArchetype || userState.activeArchetype,
                            report: d.report,
                            recommended_products: d.recommendedProducts || [],
                            csn: d.csn || userState.csn,
                            question_count: questionCount + 1,
                        };
                        
                        localStorage.setItem('spiritualAiState', JSON.stringify(finalState));
                        
                        setTimeout(() => {
                            triggerSacredPause(finalState, d.report, d.recommendedProducts);
                        }, 2000);
                    }
                    
                    setIsTyping(false);
                    return;
                }
            } catch (spiritualErr) {
                console.error('Spiritual API error, falling back to chat API:', spiritualErr);
            }

            // Fallback to Gemini chat API
            response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    state: userState
                })
            });

            data = await response.json();
            
            if (data.state) {
                setUserState(data.state);
                setQuestionCount(data.state.question_count);
            }

            if (data.message) {
                setMessages(prev => [...prev, { role: 'ai', content: data.message }]);
                
                // If we've reached Q5 (or summary phase), trigger sacred pause
                if (data.state && data.state.question_count >= 5) {
                    setTimeout(() => {
                        triggerSacredPause(data.state, null, null);
                    }, 2000);
                }
            }
        } catch (error) {
            console.error("Chat error:", error);
            setMessages(prev => [...prev, { role: 'ai', content: "There was a disturbance in the signal. Please try again." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const triggerSacredPause = async (finalState: any, preGeneratedReport: any, preGeneratedProducts: any) => {
        setSacredPause(true);
        
        // Save state to localStorage
        const stateToSave = { ...finalState };
        if (preGeneratedReport) stateToSave.report = preGeneratedReport;
        if (preGeneratedProducts) stateToSave.recommended_products = preGeneratedProducts;
        localStorage.setItem('spiritualAiState', JSON.stringify(stateToSave));
        
        // Trigger report generation (Blockplain Save)
        const savePromise = fetch('/api/blockplain/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ userState: finalState, report: preGeneratedReport, products: preGeneratedProducts }),
        }).then(res => res.json()).catch(err => {
            console.error("Save error:", err);
            return { success: false };
        });

        // Pre-generate quiz in background
        try {
            fetch('/api/quiz/generate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ state: finalState })
            }).then(res => res.json()).then(data => {
                if (data.questions) {
                    localStorage.setItem('dynamicQuizQuestions', JSON.stringify(data.questions));
                }
            });
        } catch (e) {
            console.error("Error pre-generating quiz", e);
        }
        
        let cycle = 0;
        const interval = setInterval(async () => {
            cycle++;
            if (cycle < PAUSE_TEXTS.length) {
                setPauseTextIndex(cycle);
            } else {
                clearInterval(interval);
                
                // Wait for save to complete if it hasn't already
                const saveResult = await savePromise;
                
                // Check auth status
                if (isLoaded && !isSignedIn) {
                    const redirectPath = saveResult.success 
                        ? `/blueprint/${saveResult.data.csn}` 
                        : '/blueprint';
                    router.push(`/login?redirect=${encodeURIComponent(redirectPath)}`);
                } else {
                    if (saveResult.success) {
                        router.push(`/blueprint/${saveResult.data.csn}`);
                    } else {
                        router.push('/blueprint');
                    }
                }
            }
        }, 3000);
    };

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
            setIsListening(false);
            return;
        }

        const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SpeechRecognition) {
            alert("Voice recognition is not supported in this browser.");
            return;
        }

        if (!recognitionRef.current) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = false;
            recognitionRef.current.interimResults = false;
            recognitionRef.current.lang = 'en-US';

            recognitionRef.current.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                handleSendMessage(transcript);
                setIsListening(false);
            };

            recognitionRef.current.onerror = (event: any) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => {
                setIsListening(false);
            };
        }

        recognitionRef.current.start();
        setIsListening(true);
        playOmSound();
    };

    return (
        <div className={styles.container}>
            <div className={styles.cosmicBackground}></div>

            {/* Sacred Pause Overlay */}
            <AnimatePresence>
                {sacredPause && (
                    <motion.div 
                        className={styles.sacredPause}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1 }}
                    >
                        <div className={styles.lotus}>🪷</div>
                        <motion.div 
                            key={pauseTextIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className={styles.pauseText}
                        >
                            {PAUSE_TEXTS[pauseTextIndex]}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Decoding Progress Bar */}
            <div className={styles.progressContainer}>
                <div className={styles.progressLabel}>
                    <span>CONSCIOUSNESS DECODING IN PROGRESS</span>
                    <span>{Math.min(100, questionCount * 20)}% IDENTIFIED</span>
                </div>
                <div className={styles.progressBarTrack}>
                    <div 
                        className={styles.progressBarFill} 
                        style={{ width: `${Math.min(100, questionCount * 20)}%` }}
                    />
                </div>
            </div>

            {/* Progress Dots */}
            <div className={styles.dotsContainer}>
                {[1, 2, 3, 4, 5].map((num) => (
                    <div 
                        key={num} 
                        className={`${styles.dot} ${num <= questionCount ? styles.dotActive : ''}`}
                    />
                ))}
            </div>

            {/* Chat Area */}
            <div className={styles.chatArea}>
                {messages.length === 0 && !isTyping && (
                    <div style={{ textAlign: 'center', opacity: 0.5, marginTop: '20vh' }}>
                        Establishing connection...
                    </div>
                )}
                
                {messages.map((msg, idx) => (
                    <motion.div 
                        key={idx}
                        className={`${styles.messageRow} ${msg.role === 'ai' ? styles.aiRow : styles.userRow}`}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={`${styles.bubble} ${msg.role === 'ai' ? styles.aiBubble : styles.userBubble}`}>
                            {msg.content}
                        </div>
                    </motion.div>
                ))}

                {isTyping && (
                    <motion.div 
                        className={`${styles.messageRow} ${styles.aiRow}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className={`${styles.bubble} ${styles.aiBubble}`}>
                            <div className={styles.typingIndicator}>
                                <div className={styles.typingDot}></div>
                                <div className={styles.typingDot}></div>
                                <div className={styles.typingDot}></div>
                            </div>
                        </div>
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className={styles.inputArea}>
                <form 
                    className={styles.inputContainer}
                    onSubmit={(e) => { e.preventDefault(); handleSendMessage(inputValue); }}
                >
                    <button 
                        type="button" 
                        className={`${styles.micBtn} ${isListening ? styles.micBtnActive : ''}`}
                        onClick={toggleListening}
                    >
                        {isListening ? '⏹' : '🎤'}
                    </button>
                    
                    <input 
                        type="text" 
                        className={styles.inputField}
                        placeholder="Type your response..."
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        disabled={isTyping || sacredPause}
                    />
                    
                    <button 
                        type="submit" 
                        className={styles.sendBtn}
                        disabled={!inputValue.trim() || isTyping || sacredPause}
                    >
                        →
                    </button>
                </form>
            </div>
        </div>
    );
}

export default function ChatPage() {
    return (
        <Suspense fallback={<div style={{ width: '100vw', height: '100vh', background: '#050505' }}></div>}>
            <ChatContent />
        </Suspense>
    );
}
