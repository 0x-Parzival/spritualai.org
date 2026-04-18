"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, Mic, MicOff, Radio, X } from 'lucide-react';
import { playOmSound } from '../utils/audio';
import styles from './HeroCTA.module.css';
import HeroTitle from './HeroTitle';
import { analyzeWordChoice, detectEnergyLevel, isTopicShift, UserState } from '../lib/spiritual-conversation-engine';
import { DECODE_PROMPT } from '../lib/decodePrompt';

// ─── Types ───────────────────────────────────────────────────
interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    contextLine?: string;
    options?: { text: string; subLabel: string }[];
    type?: 'question' | 'final_share';
}

const SacredStatus = () => {
    const [statusIdx, setStatusIdx] = useState(0);
    const statuses = [
        "Identifying the thread in the fabric...",
        "Witnessing the version of you that stays...",
        "Sealing the vision across timelines...",
        "Tracing the architecture of your soul...",
        "Observing the pattern without judgment...",
        "Holding space for your liberation...",
        "Finalizing your reflection..."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStatusIdx(prev => (prev + 1) % statuses.length);
        }, 800);
        return () => clearInterval(timer);
    }, [statuses.length]);

    return (
        <motion.div 
            key={statusIdx}
            className={styles.sacredText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {statuses[statusIdx]}
        </motion.div>
    );
};

const AudioVisualizer = ({ isActive }: { isActive: boolean }) => {
    const [volumes, setVolumes] = useState<number[]>(new Array(12).fill(0));
    
    useEffect(() => {
        if (!isActive) return;
        
        let audioContext: AudioContext;
        let analyser: AnalyserNode;
        let dataArray: Uint8Array;
        let animationFrame: number;

        const startAudio = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
                audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
                analyser = audioContext.createAnalyser();
                const source = audioContext.createMediaStreamSource(stream);
                source.connect(analyser);
                analyser.fftSize = 64;
                dataArray = new Uint8Array(analyser.frequencyBinCount);

                const update = () => {
                    analyser.getByteFrequencyData(dataArray as any);
                    const newVolumes = Array.from({ length: 12 }, (_, i) => {
                        const val = dataArray[i * 2] || 0;
                        return (val / 255) * 100;
                    });
                    setVolumes(newVolumes);
                    animationFrame = requestAnimationFrame(update);
                };
                update();
            } catch (err) {
                console.error("Visualizer failed", err);
            }
        };

        startAudio();
        return () => {
            if (animationFrame) cancelAnimationFrame(animationFrame);
            if (audioContext) audioContext.close();
        };
    }, [isActive]);

    if (!isActive) return null;

    return (
        <div style={{ 
            position: 'absolute', 
            inset: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            gap: '4px',
            pointerEvents: 'none',
            zIndex: 5,
            padding: '0 60px'
        }}>
            {volumes.map((vol, i) => (
                <motion.div
                    key={i}
                    animate={{ height: `${Math.max(4, vol)}%` }}
                    style={{
                        width: '4px',
                        background: 'linear-gradient(to top, #00f2ff, #ff00ea)',
                        borderRadius: '2px',
                        opacity: 0.6
                    }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15 }}
                />
            ))}
        </div>
    );
};

const LiveAIBlob = ({ isTalking, isListening, isThinking, isActive, lastAiMessage, thinkingStatus, onClick }: { isTalking: boolean, isListening: boolean, isThinking: boolean, isActive: boolean, lastAiMessage?: string, thinkingStatus?: string, onClick?: () => void }) => {
    if (!isActive) return null;

    let state: 'speaking' | 'listening' | 'thinking' | 'idle' = 'idle';
    if (isTalking) state = 'speaking';
    else if (isListening) state = 'listening';
    else if (isThinking) state = 'thinking';

    const colors = {
        speaking: 'linear-gradient(135deg, #ff3cf5, #7000ff)',
        listening: 'linear-gradient(135deg, #b8ff5a, #35f8ff)',
        thinking: 'linear-gradient(135deg, #35f8ff, #ffffff)',
        idle: 'linear-gradient(135deg, rgba(255,255,255,0.2), rgba(255,255,255,0.1))'
    };

    const glowColors = {
        speaking: 'rgba(255, 60, 245, 0.4)',
        listening: 'rgba(184, 255, 90, 0.4)',
        thinking: 'rgba(53, 248, 255, 0.4)',
        idle: 'rgba(255, 255, 255, 0.1)'
    };

    return (
        <motion.div
            className={styles.aiBlobContainer}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
        >
            <div className={styles.blobCanvas} onClick={onClick} style={{ cursor: 'pointer' }}>
                <motion.div 
                    className={styles.blobGlow}
                    animate={{
                        scale: state !== 'idle' ? [1, 1.3, 1] : [1, 1.05, 1],
                        opacity: state !== 'idle' ? [0.4, 0.8, 0.4] : [0.2, 0.4, 0.2],
                        background: `radial-gradient(circle, ${glowColors[state]} 0%, transparent 70%)`
                    }}
                    transition={{ duration: state === 'speaking' ? 0.4 : 3, repeat: Infinity }}
                />
                
                <motion.div 
                    className={styles.blobCore}
                    style={{ background: colors[state] }}
                    animate={{
                        borderRadius: state === 'speaking' || state === 'listening'
                            ? ["40% 60% 60% 40% / 60% 30% 70% 40%", "30% 70% 40% 60% / 50% 60% 30% 50%", "40% 60% 60% 40% / 60% 30% 70% 40%"]
                            : ["50% 50% 50% 50% / 50% 50% 50% 50%", "45% 55% 55% 45% / 55% 45% 45% 55%", "50% 50% 50% 50% / 50% 50% 50% 50%"],
                        scale: state === 'speaking' ? [1, 1.15, 0.95, 1.1, 1] : state === 'listening' ? [1, 1.08, 1] : [1, 1.02, 1],
                        rotate: state === 'thinking' ? [0, 360] : 0
                    }}
                    transition={{ 
                        duration: state === 'speaking' ? 0.35 : state === 'thinking' ? 10 : 4, 
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />

                <motion.div 
                    className={styles.blobPulsar}
                    animate={{
                        opacity: state !== 'idle' ? [0.6, 1, 0.6] : [0.3, 0.6, 0.3],
                        scale: state === 'speaking' ? [1, 1.5, 1] : 1
                    }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />
            </div>

            <AnimatePresence>
                {(state === 'speaking' || state === 'thinking' || state === 'listening') && lastAiMessage && (
                    <motion.div 
                        className={styles.blobSpeechBubble}
                        initial={{ opacity: 0, y: 10, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.9 }}
                    >
                        <div className={styles.blobStateLabel}>{state === 'thinking' ? thinkingStatus : state}</div>
                        <div className={styles.blobSpeechText}>
                            {state === 'listening' ? "I'm listening..." : lastAiMessage}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const DEFAULT_USER_STATE: UserState = {
    chipSelected: 'typed',
    firstAnswer: '',
    gender: 'unknown',
    ageRange: 'unknown',
    lifeStage: 'THE AWAKENING',
    birthDate: 'unknown',
    birthTime: 'unknown',
    birthPlace: 'unknown',
    mbtiSignals: {
        E_I: { signal: null, confidence: 0 },
        N_S: { signal: null, confidence: 0 },
        T_F: { signal: null, confidence: 0 },
        J_P: { signal: null, confidence: 0 },
    },
    confirmedMBTI: null,
    detectedPattern: null,
    patternConfidence: 0,
    unconsciousPatterns: [],
    triggerWords: [],
    budget: 'unknown',
    questionCount: 0,
    exchangeHistory: [],
    finalShare: null,
    tracking: {
        responseTimeMillis: [],
        wordChoice: { emotional: 0, analytical: 0 },
        topicShifts: 0,
        energyLevel: 'neutral',
        lastMessageTimestamp: Date.now(),
        engagementScore: 100,
        isFatigued: false,
        sessionStartTime: Date.now(),
    },
    sessionConfig: {
        targetQuestions: 5,
        maxQuestions: 8,
        pacingMode: 'deep',
    },
    report: null,
    recommendedProducts: [],
};

const STRUGGLES = [
    "I don't even know",
    "Feeling lost",
    "Relationship pain",
    "Spiritual disconnection",
    "Career confusion",
    "Inner emptiness",
    "Anxiety & overthinking",
];

const FIRST_QUESTIONS: Record<string, { question: string; options: { text: string; subLabel: string }[] }> = {
    "Spiritual disconnection": {
        question: "Does your practice feel like performing a script that no longer has any life in it?",
        options: [
            { text: "Yes, it's just habit now", subLabel: "" },
            { text: "I've stopped entirely", subLabel: "" },
            { text: "I feel like a ghost in the room", subLabel: "" }
        ]
    },
    "Feeling lost": {
        question: "Does this 'lost' feeling feel like you're in the wrong place, or like you've lost the map entirely?",
        options: [
            { text: "I'm in the wrong place", subLabel: "" },
            { text: "I've lost the map", subLabel: "" },
            { text: "It's both", subLabel: "" }
        ]
    },
    "Relationship pain": {
        question: "Is the pain coming from the presence of someone who shouldn't be there, or the absence of someone you actually need?",
        options: [
            { text: "Presence of someone", subLabel: "" },
            { text: "Absence of someone", subLabel: "" },
            { text: "It's complicated", subLabel: "" }
        ]
    },
    "Career confusion": {
        question: "Are you mourning a path you didn't take, or are you suffocating on the one you're currently on?",
        options: [
            { text: "Mourning a path", subLabel: "" },
            { text: "Suffocating here", subLabel: "" },
            { text: "Just feeling stuck", subLabel: "" }
        ]
    },
    "Inner emptiness": {
        question: "Does the emptiness feel like a hollow space that needs filling, or a heavy weight that you're tired of carrying?",
        options: [
            { text: "A hollow space", subLabel: "" },
            { text: "A heavy weight", subLabel: "" },
            { text: "Something else", subLabel: "" }
        ]
    },
    "Anxiety & overthinking": {
        question: "Is your mind trying to solve a problem that exists, or is it creating problems so it has something to solve?",
        options: [
            { text: "Solving a real problem", subLabel: "" },
            { text: "Creating problems", subLabel: "" },
            { text: "I can't tell anymore", subLabel: "" }
        ]
    },
    "I don't even know": {
        question: "If your silence could speak for ten seconds without you judging it — what's the first word it would say?",
        options: [
            { text: "Tired", subLabel: "" },
            { text: "Scared", subLabel: "" },
            { text: "Numb", subLabel: "" },
            { text: "Waiting", subLabel: "" }
        ]
    }
};

export default function HeroCTA({ 
    onGlassChange,
    onRoundChange,
    onComplete,
    onChatActive,
    onGeneratingReport
}: { 
    onGlassChange?: (active: boolean) => void,
    onRoundChange?: (round: number) => void,
    onComplete?: (state: any) => void,
    onChatActive?: (active: boolean) => void,
    onGeneratingReport?: (active: boolean) => void
}) {
    const router = useRouter();

    const originalText = "Your pattern brought you here. Which loop are we breaking tonight?";
    const [ctaText, setCtaText] = useState(originalText);
    const [inputValue, setInputValue] = useState("");
    const [isListening, setIsListening] = useState(false);
    const [decodedCount, setDecodedCount] = useState(8247);

    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (onChatActive) {
            onChatActive(showChat);
        }
    }, [showChat, onChatActive]);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [round, setRound] = useState(0);
    const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([]);
    const [userState, setUserState] = useState<UserState>(DEFAULT_USER_STATE);
    const [currentQuestion, setCurrentQuestion] = useState<string | null>(null);
    const [currentAiResponse, setCurrentAiResponse] = useState<any>(null);
    const [sacredPause, setSacredPause] = useState(false);
    const [engineReady, setEngineReady] = useState(false);
    const [copySuccess, setCopySuccess] = useState(false);
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
    const [canShowCalendar, setCanShowCalendar] = useState(false);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [isConvoComplete, setIsConvoComplete] = useState(false);
    const [soundPlayed, setSoundPlayed] = useState(false);
    const [showPromptPopup, setShowPromptPopup] = useState(false);
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [isAiTalking, setIsAiTalking] = useState(false);
    const lastActivityRef = useRef<number>(Date.now());
    
    const [thinkingStatus, setThinkingStatus] = useState("Thinking");
    
    useEffect(() => {
        if (isTyping) {
            const statuses = [
                "ISOLATING COGNITIVE BIAS...",
                "MAPPING RECURSIVE LOOPS...",
                "STRATIFYING MBTI LAYERS...",
                "DECODING ARCHITECTURE..."
            ];
            let i = 0;
            const interval = setInterval(() => {
                setThinkingStatus(statuses[i % statuses.length]);
                i++;
            }, 800);
            return () => clearInterval(interval);
        } else {
            setThinkingStatus("Thinking");
        }
    }, [isTyping]);

    useEffect(() => {
        if (showChat || isConvoComplete || showPromptPopup) return;
        const timer = setInterval(() => {
            const now = Date.now();
            if (now - lastActivityRef.current > 15000) { 
                setShowPromptPopup(true);
            }
        }, 1000);
        const resetTimer = () => {
            lastActivityRef.current = Date.now();
        };
        window.addEventListener('mousemove', resetTimer);
        window.addEventListener('keypress', resetTimer);
        window.addEventListener('touchstart', resetTimer);
        return () => {
            clearInterval(timer);
            window.removeEventListener('mousemove', resetTimer);
            window.removeEventListener('keypress', resetTimer);
            window.removeEventListener('touchstart', resetTimer);
        };
    }, [showChat, isConvoComplete, showPromptPopup]);

    useEffect(() => {
        if (showChat && showPromptPopup) {
            setShowPromptPopup(false);
        }
    }, [showChat, showPromptPopup]);

    const maybePlaySound = () => {
        if (!soundPlayed) {
            playOmSound();
            setSoundPlayed(true);
        }
    };

    const copyDecoderPrompt = () => {
        navigator.clipboard.writeText(DECODE_PROMPT);
        setCopySuccess(true);
        maybePlaySound();
        setTimeout(() => setCopySuccess(false), 3000);
    };

    useEffect(() => {
        const warmup = async () => {
            try {
                const res = await fetch('/api/spiritual', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ action: 'warmup' }),
                });
                if (res.ok) setEngineReady(true);
            } catch (_) { }
        };
        warmup();
    }, []);

    const handleInputFocus = async () => {
        if (!showChat && messages.length === 0) {
            const quizResult = localStorage.getItem('mbti_quiz_result');
            if (quizResult) {
                setUserState(prev => ({ ...prev, confirmedMBTI: quizResult }));
            }

            const greeting = "Your pattern brought you here. Which loop are we breaking tonight?";

            setMessages([{ role: 'ai', content: "" }]);
            setShowChat(true);
            setCurrentQuestion(greeting);
            setConversationHistory([{ role: 'ai', content: greeting }]);
            setRound(0);

            for (let j = 0; j <= greeting.length; j++) {
                const currentText = greeting.substring(0, j);
                setMessages(prev => {
                    const next = [...prev];
                    if (next.length > 0) {
                        next[0] = { ...next[0], content: currentText };
                    }
                    return next;
                });
                await new Promise(r => setTimeout(r, 10));
            }
        }
    };

    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const recognitionRef = useRef<any>(null);
    const chatThreadRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (showChat && chatThreadRef.current) {
            const container = chatThreadRef.current;
            container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
        }
    }, [messages, isTyping, showChat, sacredPause]);

    useEffect(() => {
        if (onRoundChange) onRoundChange(round);
    }, [round, onRoundChange]);

    useEffect(() => {
        let isCancelled = false;
        const typeWriterSequence = async () => {
            await new Promise(r => setTimeout(r, 3000));
            if (isCancelled) return;
            const typingText = "Your pattern brought you here. Which loop are we breaking tonight?";
            setCtaText("");
            for (let i = 0; i <= typingText.length; i++) {
                if (isCancelled) return;
                setCtaText(typingText.substring(0, i));
                await new Promise(r => setTimeout(r, 60));
            }
            await new Promise(r => setTimeout(r, 5000));
            if (isCancelled) return;
            setCtaText(originalText);
        };
        if (!showChat) typeWriterSequence();
        return () => {
            isCancelled = true;
            if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
            if (recognitionRef.current) recognitionRef.current.stop();
        };
    }, [showChat]);

    const sendToAI = async (userAnswer: string, chipSelected: string, state: UserState, history: { role: string; content: string }[], qCount: number) => {
        setIsTyping(true);
        try {
            const res = await fetch('/api/spiritual', {
                method: 'POST',
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'text/event-stream'
                },
                body: JSON.stringify({
                    action: 'process_answer',
                    userState: state,
                    conversationHistory: history,
                    currentQuestion: currentQuestion,
                    userAnswer,
                }),
            });

            if (res.headers.get('Content-Type')?.includes('text/event-stream')) {
                const reader = res.body?.getReader();
                const decoder = new TextDecoder();
                let fullText = '';
                
                setMessages(prev => [...prev, { role: 'ai', content: "" }]);

                while (reader) {
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value);
                    fullText += chunk;
                    setMessages(prev => {
                        const n = [...prev];
                        if (n.length > 0) n[n.length - 1].content = fullText;
                        return n;
                    });
                }

                const parsed = extractJSONFromStream(fullText);
                if (parsed) {
                    setCurrentAiResponse(parsed);
                    const updatedState = { ...state };
                    if (parsed.updatedTracking) updatedState.tracking = { ...updatedState.tracking, ...parsed.updatedTracking };
                    if (parsed.inferredMBTI) updatedState.confirmedMBTI = parsed.inferredMBTI;
                    setUserState(updatedState);

                    setMessages(prev => {
                        const n = [...prev];
                        if (n.length > 0) {
                            n[n.length - 1].content = parsed.question || fullText;
                            n[n.length - 1].options = parsed.options;
                            n[n.length - 1].contextLine = parsed.contextLine;
                        }
                        return n;
                    });
                    
                    const lowerQ = (parsed.question || "").toLowerCase();
                    const needsDOB = (lowerQ.includes('date of birth') || lowerQ.includes('born on')) && !state.birthDate;
                    if (needsDOB) setCanShowCalendar(true);
                    setConversationHistory([...history, { role: 'user', content: userAnswer }, { role: 'ai', content: parsed.question || fullText }]);
                    setRound(qCount + 1);
                }
            } else {
                const data = await res.json();
                if (data.success && data.data) {
                    const aiData = data.data;
                    setMessages(prev => [...prev, { role: 'ai', content: aiData.question, options: aiData.options, contextLine: aiData.contextLine }]);
                    setConversationHistory([...history, { role: 'user', content: userAnswer }, { role: 'ai', content: aiData.question }]);
                    setRound(qCount + 1);
                }
            }
        } catch (err) {
            console.error('AI error:', err);
            setMessages(prev => [...prev, { role: 'ai', content: "Disturbance in the neural link." }]);
        } finally { setIsTyping(false); }
    };

    const extractJSONFromStream = (text: string) => {
        try {
            const matches = text.match(/\{[\s\S]*\}/g);
            if (matches) return JSON.parse(matches[matches.length - 1]);
        } catch (e) {}
        return null;
    };

    const triggerSacredPause = (state: UserState, history: any[]) => {
        setSacredPause(true);
        setIsConvoComplete(true);
        if (onGlassChange) onGlassChange(false);
        if (onChatActive) onChatActive(false); 
        if (onGeneratingReport) onGeneratingReport(true);
        
        const reportPromise = fetch('/api/spiritual', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'generate_report', userState: state, conversationHistory: history }),
        }).then(r => r.json()).catch(e => { console.error('Report failed', e); return {}; });
        
        setTimeout(async () => {
            const res = await reportPromise;
            const finalState = { ...state, report: res?.data?.report, recommendedProducts: res?.data?.products || [], exchangeHistory: history };
            try { localStorage.setItem('spiritualAiState', JSON.stringify(finalState)); } catch (_) { }
            if (onGlassChange) onGlassChange(false);
            if (onGeneratingReport) onGeneratingReport(false);
            setIsTransitioning(true);
            setTimeout(() => {
                if (onComplete) onComplete(finalState);
                const page2 = document.getElementById('report-section');
                if (page2) page2.scrollIntoView({ behavior: 'smooth', block: 'start' });
                else window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
            }, 500);
        }, 2500);
    };

    const updateStateWithTracking = (answer: string, currentState: UserState): UserState => {
        const now = Date.now();
        const responseTime = now - (currentState.tracking?.lastMessageTimestamp || now);
        const words = analyzeWordChoice(answer);
        const energy = detectEnergyLevel(answer, messages[messages.length - 1]?.content);
        const shifted = isTopicShift(answer, messages[messages.length - 2]?.content);
        return {
            ...currentState,
            tracking: {
                ...currentState.tracking,
                responseTimeMillis: [...(currentState.tracking?.responseTimeMillis || []), responseTime],
                wordChoice: {
                    emotional: (currentState.tracking?.wordChoice?.emotional || 0) + words.emotional,
                    analytical: (currentState.tracking?.wordChoice?.analytical || 0) + words.analytical,
                },
                topicShifts: (currentState.tracking?.topicShifts || 0) + (shifted ? 1 : 0),
                energyLevel: energy,
                lastMessageTimestamp: now,
            }
        };
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping || sacredPause) return;
        maybePlaySound();
        setDecodedCount(prev => prev + 1);
        const text = inputValue.trim();
        setInputValue("");
        setShowChat(true);
        if (text.includes('---SPIRITUAL AI REPORT START---')) {
            setIsTyping(true);
            try {
                const res = await fetch('/api/spiritual', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'parse_ai_paste', userAnswer: text }) });
                const data = await res.json();
                if (data.success && data.data) {
                    setMessages(prev => [...prev, { role: 'user', content: "Report pasted." }]);
                    if (data.missingFields && data.missingFields.length > 0) {
                        const missingNames = data.missingFields.join(", ").replace(/_/g, " ").toLowerCase();
                        setMessages(prev => [...prev, { role: 'ai', content: `Decryption partial. The external AI identified your architecture, but some fragments are still missing: ${missingNames}. Shall we fill these in, or would you like to proceed with the partial report?` }]);
                        
                        // Use messages as the source of truth for the options
                        setMessages(prev => {
                            const n = [...prev];
                            n[n.length - 1].options = [
                                { text: "Finish Report Now", subLabel: "Proceed with partial data" },
                                { text: "Fill the fragments", subLabel: "Deepen the analysis" }
                            ];
                            return n;
                        });
                        
                        // Update state to be aware of the external report context
                        const newState = { ...userState, ...data.data, isExternalReport: true, missingFields: data.missingFields };
                        setUserState(newState);
                    } else {
                        setMessages(prev => [...prev, { role: 'ai', content: "Decryption received. Pattern locked. Preparing your blueprint." }]);
                        setTimeout(() => triggerSacredPause(data.data, [...conversationHistory, { role: 'user', content: 'External Report' }]), 1500);
                    }
                    return;
                }
            } catch (err) { console.error("Parse failed", err); } finally { setIsTyping(false); }
        }
        setMessages(prev => [...prev, { role: 'user', content: text }]);
        const trackedState = updateStateWithTracking(text, userState);
        const newState = round === 0 ? { ...trackedState, chipSelected: 'typed', firstAnswer: text } : trackedState;
        setUserState(newState);
        if (round === 0) {
            const initialMsgs = ["CONNECTION ESTABLISHED.", "PATTERN DETECTED.", "SIGNAL LOCKED.", "LINK ACTIVE."];
            const msg = initialMsgs[Math.floor(Math.random() * initialMsgs.length)];
            setMessages(prev => [...prev, { role: 'ai', content: "" }]);
            for (let j = 0; j <= msg.length; j++) {
                const cur = msg.substring(0, j);
                setMessages(prev => { const n = [...prev]; if (n.length > 0) n[n.length - 1].content = cur; return n; });
                await new Promise(r => setTimeout(r, 10));
            }
        }
        await sendToAI(text, newState.chipSelected, newState, conversationHistory, round);
        if (currentAiResponse?.type === 'final_share') setTimeout(() => triggerSacredPause(newState, [...conversationHistory, { role: 'user', content: text }]), 1500);
    };

    const handleOptionClick = async (optionText: string) => {
        if (isTyping || sacredPause) return;
        maybePlaySound();
        setMessages(prev => [...prev, { role: 'user', content: optionText }]);
        const tracked = updateStateWithTracking(optionText, userState);
        setUserState(tracked);
        
        if (optionText === "Finish Report Now") {
            setTimeout(() => triggerSacredPause(tracked, [...conversationHistory, { role: 'user', content: optionText }]), 1000);
            return;
        }

        await sendToAI(optionText, tracked.chipSelected, tracked, conversationHistory, round);
        if (currentAiResponse?.type === 'final_share') setTimeout(() => triggerSacredPause(tracked, [...conversationHistory, { role: 'user', content: optionText }]), 1500);
    };

    const handleStruggleClick = async (struggle: string) => {
        if (isTyping || sacredPause) return;
        maybePlaySound();
        const data = FIRST_QUESTIONS[struggle];
        const q = data?.question || "What's weighing on you today?";
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        let i = 0; setInputValue("");
        const next = () => { if (i <= struggle.length) { setInputValue(struggle.substring(0, i)); i++; typingIntervalRef.current = setTimeout(next, 40); } };
        next();
        setTimeout(async () => {
            setInputValue(""); setShowChat(true); setDecodedCount(prev => prev + 1);
            if (isLiveMode) speakText(q);
            const newState = { ...DEFAULT_USER_STATE, chipSelected: struggle, firstAnswer: struggle, tracking: { ...DEFAULT_USER_STATE.tracking, lastMessageTimestamp: Date.now() } };
            setUserState(newState);
            setMessages([{ role: 'user', content: struggle }]);
            setIsTyping(true); await new Promise(r => setTimeout(r, 800)); setIsTyping(false);
            setMessages(prev => [...prev, { role: 'ai', content: "" }]);
            for (let j = 0; j <= q.length; j++) {
                const cur = q.substring(0, j);
                setMessages(prev => { const n = [...prev]; if (n.length > 0) n[n.length - 1].content = cur; return n; });
                await new Promise(r => setTimeout(r, 10));
            }
            if (data?.options) setMessages(prev => { const n = [...prev]; if (n.length > 0) n[n.length - 1].options = data.options; return n; });
            setCurrentQuestion(q); setConversationHistory([{ role: 'user', content: struggle }, { role: 'ai', content: q }]); setRound(1);
        }, struggle.length * 40 + 300);
    };

    const toggleListening = () => {
        if (isListening) { recognitionRef.current?.stop(); setIsListening(false); return; }
        const SR = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
        if (!SR) { alert("Unsupported."); return; }
        if (!recognitionRef.current) {
            recognitionRef.current = new SR(); recognitionRef.current.continuous = true; recognitionRef.current.interimResults = true;
            recognitionRef.current.onresult = (e: any) => {
                let f = ''; for (let i = e.resultIndex; i < e.results.length; ++i) if (e.results[i].isFinal) f += e.results[i][0].transcript;
                if (f) setInputValue(p => p + " " + f);
            };
            recognitionRef.current.onerror = () => setIsListening(false);
            recognitionRef.current.onend = () => { if (isListening) setIsListening(false); };
        }
        recognitionRef.current.start(); setIsListening(true); maybePlaySound();
    };

    const speakText = (text: string) => {
        if (!isLiveMode) return;
        window.speechSynthesis.cancel();
        const u = new SpeechSynthesisUtterance(text);
        u.onstart = () => setIsAiTalking(true);
        u.onend = () => { setIsAiTalking(false); if (isLiveMode && !isConvoComplete) setTimeout(() => toggleListening(), 500); };
        window.speechSynthesis.speak(u);
    };

    return (
        <div className={`${styles.mbtiContainer} ${showChat ? styles.chatActive : ''}`}>
            {/* Full Height Glass Background when chat is active */}
            {showChat && !isTransitioning && !isConvoComplete && (
                <div className={styles.glassEffect} />
            )}

            <AnimatePresence>
                {isLiveMode && showChat && (
                    <LiveAIBlob 
                        isActive={true} 
                        isTalking={isAiTalking} 
                        isListening={isListening}
                        isThinking={isTyping}
                        thinkingStatus={thinkingStatus}
                        lastAiMessage={messages.filter(m => m.role === 'ai').pop()?.content}
                        onClick={() => { setIsLiveMode(false); window.speechSynthesis.cancel(); }}
                    />
                )}
            </AnimatePresence>

            <div className={styles.buttonGroup}>
                {!showChat && (
                    <div style={{ width: '100%', position: 'relative' }}>
                        <div className={styles.ctaPromptText}>
                            Talk to Spiritual AI below ↓ It will guide you step-by-step
                        </div>
                        <div className={styles.staticCounter}>
                            <span className={styles.counterHighlight}>{decodedCount.toLocaleString()}</span> patterns decoded. Yours is next.
                        </div>
                        <div className={styles.struggleBubbles}>
                            {STRUGGLES.map((s, idx) => (
                                <button key={idx} className={styles.bubble} onClick={() => handleStruggleClick(s)}>{s}</button>
                            ))}
                        </div>
                    </div>
                )}

                <AnimatePresence>
                    {showPromptPopup && (
                        <motion.div className={styles.promptPopup} initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}>
                            <button className={styles.closePopup} onClick={() => setShowPromptPopup(false)}>✕</button>
                            <h2 className={styles.popupTitle}>Unlock Your Blueprint</h2>
                            <p className={styles.popupText}>
                                1. Copy this neural prompt.<br />
                                2. Paste it in your preferred AI.<br />
                                3. Paste the AI's response in the box below.
                            </p>
                            <button className={styles.copyMainBtn} onClick={copyDecoderPrompt}>{copySuccess ? "✓ PROMPT COPIED" : "COPY NEURAL PROMPT"}</button>
                            <div className={styles.platformGrid}>
                                <a href="https://chatgpt.com" target="_blank" className={styles.platformBtn}>ChatGPT</a>
                                <a href="https://claude.ai" target="_blank" className={styles.platformBtn}>Claude</a>
                                <a href="https://gemini.google.com" target="_blank" className={styles.platformBtn}>Gemini</a>
                                <a href="https://grok.com" target="_blank" className={styles.platformBtn}>Grok</a>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                <AnimatePresence>
                    {showChat && !isTransitioning && !isConvoComplete && (
                        <motion.div ref={chatThreadRef} className={styles.chatThread} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                            {/* Close Chat Button */}
                            <button 
                                className={styles.closeChatBtn} 
                                onClick={() => {
                                    setShowChat(false);
                                    if (onGlassChange) onGlassChange(false);
                                    if (onChatActive) onChatActive(false);
                                }}
                                title="Exit Decoding"
                            >
                                <X size={20} />
                            </button>

                            {/* Decoding Progress Bar */}
                            <div className={styles.decodingProgressContainer}>
                                <div className={styles.progressLabel}>
                                    <span>CONSCIOUSNESS DECODING IN PROGRESS</span>
                                    <span>{Math.min(round, 5)} / 5 FRAGMENTS</span>
                                </div>
                                <div className={styles.progressBarTrack}>
                                    <div 
                                        className={styles.progressBarFill} 
                                        style={{ width: `${(Math.min(round, 5) / 5) * 100}%` }}
                                    />
                                </div>
                            </div>

                            <div className={styles.chatHeaderTitle}>
                                {/* Redundant HeroTitle removed for cleaner chat interface */}
                            </div>
                            {messages.map((msg, idx) => (
                                <motion.div key={idx} className={`${styles.messageRow} ${msg.role === 'ai' ? styles.aiRow : styles.userRow}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: (idx + 1) / messages.length, y: 0 }}>
                                    <div className={`${styles.chatBubble} ${msg.role === 'ai' ? styles.aiBubble : styles.userBubble}`}>
                                        {msg.role === 'ai' && msg.contextLine && <div style={{ fontSize: '0.8rem', opacity: 0.7, fontStyle: 'italic', marginBottom: '8px', color: '#00f2ff' }}>{msg.contextLine}</div>}
                                        {msg.content}
                                    </div>
                                    {msg.role === 'ai' && msg.options && idx === messages.length - 1 && !isTyping && !sacredPause && !isConvoComplete && (
                                        <div className={styles.optionBubbles}>{msg.options.map((opt, oi) => <button key={oi} className={styles.optionBubble} onClick={() => handleOptionClick(opt.text)}>{opt.text}</button>)}</div>
                                    )}
                                </motion.div>
                            ))}
                            {isTyping && <div className={`${styles.messageRow} ${styles.aiRow}`}><div className={styles.typingDots}><span /><span /><span /></div></div>}
                            <div ref={chatEndRef} />

                            <AnimatePresence>
                                {sacredPause && (
                                    <motion.div className={styles.sacredPauseOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className={styles.sacredLotus}>🪷</div>
                                        <SacredStatus />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isTransitioning && (
                    <form className={`${styles.gradientFlowBtn} cta-message-box`} onSubmit={handleSubmit} style={{ position: 'relative' }}>
                    <AudioVisualizer isActive={isListening} />
                    <div className={styles.inputLeftIcon}><img src="/images/logo.png" alt="Logo" /></div>
                    {showDatePicker ? (
                        <div style={{ display: 'flex', gap: '10px', width: '100%', alignItems: 'center' }}>
                            <input type="date" className={styles.messageInput} onChange={(e) => setUserState(s => ({...s, birthDate: e.target.value}))}/>
                            <input type="time" className={styles.messageInput} onChange={(e) => setUserState(s => ({...s, birthTime: e.target.value}))}/>
                            <input type="text" className={styles.messageInput} placeholder="City" onChange={(e) => setUserState(s => ({...s, birthPlace: e.target.value}))}/>
                            <button type="button" style={{ background: '#00f2ff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }} onClick={async () => {
                                const answer = `Born: ${userState.birthDate} at ${userState.birthTime} in ${userState.birthPlace}.`; setShowDatePicker(false); setMessages(p => [...p, { role: 'user', content: answer }]);
                                const tracked = updateStateWithTracking(answer, userState); setUserState(tracked); await sendToAI(answer, tracked.chipSelected, tracked, conversationHistory, round);
                            }}>SET</button>
                        </div>
                    ) : showTimePicker ? (
                        <div style={{ display: 'flex', gap: '10px', width: '100%', alignItems: 'center' }}>
                            <input type="time" className={styles.messageInput} onChange={(e) => setInputValue(e.target.value)} autoFocus/>
                            <button type="button" style={{ background: '#00f2ff', color: '#000', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 'bold' }} onClick={async () => {
                                if (!inputValue) return; const answer = `Time: ${inputValue}`; setShowTimePicker(false); setInputValue(""); setMessages(p => [...p, { role: 'user', content: answer }]);
                                const tracked = updateStateWithTracking(answer, userState); const ns = { ...tracked, birthTime: inputValue }; setUserState(ns); await sendToAI(answer, ns.chipSelected, ns, conversationHistory, round);
                            }}>OK</button>
                        </div>
                    ) : isConvoComplete ? (<div style={{ flex: 1, display: 'flex', alignItems: 'center' }}><SacredStatus /></div>) : (
                        <input type="text" value={inputValue} onChange={e => setInputValue(e.target.value)} onFocus={handleInputFocus} className={styles.messageInput} placeholder={showChat ? "Speak or type your truth..." : "What keeps showing up in your life no matter how many times you think you've fixed it?"} disabled={isTyping || sacredPause}/>
                    )}
                    <div className={styles.neuralStatus}>
                        {canShowCalendar && (<button type="button" className={styles.micButton} onClick={() => setShowDatePicker(!showDatePicker)} style={{ borderColor: showDatePicker ? '#00f2ff' : 'rgba(255,255,255,0.2)', background: showDatePicker ? 'rgba(0, 242, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)' }}><Calendar size={18} /></button>)}
                        {engineReady && !inputValue && (<span className={styles.neuralText}>NEURAL LINK READY</span>)}
                        <button type="button" className={`${styles.micButton} ${isLiveMode ? styles.liveActive : ''}`} onClick={() => { if (isLiveMode) { setIsLiveMode(false); window.speechSynthesis.cancel(); } else { setIsLiveMode(true); if (showChat && currentQuestion) speakText(currentQuestion); } }} title="Live Vocal Interaction"><Radio size={18} /></button>
                        <button type="button" className={`${styles.micButton} ${isListening ? styles.micActive : ''}`} onClick={toggleListening}><Mic size={18} /></button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}
