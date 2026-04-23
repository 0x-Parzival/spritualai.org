"use client";

import React, { useState, useEffect, useRef, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
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
        price_point: null
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
            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: text,
                    state: userState
                })
            });

            const data = await response.json();
            
            if (data.state) {
                setUserState(data.state);
                setQuestionCount(data.state.question_count);
            }

            if (data.message) {
                setMessages(prev => [...prev, { role: 'ai', content: data.message }]);
                
                // If we've reached Q5 (or summary phase), trigger sacred pause
                if (data.state && data.state.question_count >= 5) {
                    setTimeout(() => {
                        triggerSacredPause(data.state);
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

    const triggerSacredPause = async (finalState: any) => {
        setSacredPause(true);
        // Save state to localStorage to pass to the next page
        localStorage.setItem('spiritualAiState', JSON.stringify(finalState));
        
        // Start generating questions in background
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
        const interval = setInterval(() => {
            cycle++;
            if (cycle < PAUSE_TEXTS.length) {
                setPauseTextIndex(cycle);
            } else {
                clearInterval(interval);
                router.push('/quiz');
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

            {/* Progress Dots (Optional, keeping them for now but moving below) */}
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
                        {isListening ? '⏺' : '🎤'}
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
