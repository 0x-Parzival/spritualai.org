"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, Mic, MicOff, Radio, X } from 'lucide-react';
import { playOmSound } from '../utils/audio';
import styles from './HeroCTA.module.css';
import HeroTitle from './HeroTitle';
import PretextWrapper from './home/PretextWrapper';
import { useUser } from '@clerk/nextjs';
import { UserState } from '../lib/spiritual-conversation-engine';
import { DECODE_PROMPT } from '../lib/decodePrompt';

// ─── Types ───────────────────────────────────────────────────
interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    contextLine?: string;
    options?: { text: string; subLabel: string }[];
    type?: 'question' | 'final_share';
}

const DEFAULT_USER_STATE: UserState = {
    chipSelected: 'typed',
    firstAnswer: '',
    gender: 'unknown',
    ageRange: 'unknown',
    lifeStage: 'THE AWAKENING',
    birthDate: undefined,
    birthTime: undefined,
    birthPlace: undefined,
    mbtiSignals: {
        E_I: { signal: null, confidence: 0 },
        N_S: { signal: null, confidence: 0 },
        T_F: { signal: null, confidence: 0 },
        J_P: { signal: null, confidence: 0 },
    },
    confirmedMBTI: null,
    detectedPattern: null,
    shadowPattern: null,
    activeArchetype: null,
    personaMask: null,
    complexIdentified: null,
    patternConfidence: 0,
    decodingProgress: 0,
    unconsciousPatterns: [],
    triggerWords: [],
    hawkinsLevel: undefined,
    jungianArchetype: undefined,
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

const SacredStatus = ({ stage }: { stage?: number }) => {
    const [statusIdx, setStatusIdx] = useState(0);
    
    const STAGE_MESSAGES = [
        ["Reading the frequency beneath your words...", "Neural Link Ready..."],
        ["Locating the root signal...", "Surface Pattern Detected..."],
        ["Mapping the cognitive architecture...", "Root Signal Located..."],
        ["Calculating your cosmic coordinates...", "Architecture Forming..."],
        ["Cross-referencing shadow patterns...", "Cosmic Coordinates Locked..."],
        ["Etching your Consciousness Blueprint...", "Blueprint Crystallising..."],
        ["Finalizing your reflection...", "Consciousness Identity Ready..."]
    ];

    const messages = stage !== undefined ? STAGE_MESSAGES[Math.min(stage, STAGE_MESSAGES.length - 1)] : [
        "Identifying the thread in the fabric...",
        "The Seeker is tracing your linguistic patterns...",
        "The Shadow Witness is observing the unspoken...",
        "Specialist agents are debating your architecture...",
        "Witnessing the version of you that stays...",
        "The Sage is harmonizing the findings...",
        "Sealing the vision across timelines...",
        "Tracing the architecture of your soul...",
        "Observing the pattern without judgment...",
        "Holding space for your liberation...",
        "Finalizing your reflection..."
    ];

    useEffect(() => {
        const timer = setInterval(() => {
            setStatusIdx(prev => (prev + 1) % messages.length);
        }, 1200);
        return () => clearInterval(timer);
    }, [messages.length]);

    return (
        <motion.div 
            key={statusIdx}
            className={styles.sacredText}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
        >
            {messages[statusIdx]}
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
            zIndex: '5',
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

const STRUGGLES = [
    "Feeling lost",
    "Relationship pain",
    "Spiritual disconnection",
    "Career confusion",
    "Inner emptiness",
    "Anxiety & overthinking",
];

const FIRST_QUESTIONS: Record<string, { question: string; options: { text: string; subLabel: string }[] }> = {
    "Spiritual disconnection": {
        question: "Is your disconnection a loss of faith in the practice itself, or a deeper fatigue with the version of you that is performing it?",
        options: [
            { text: "Fatigue with myself", subLabel: "Internal shift" },
            { text: "Loss of faith in the method", subLabel: "External doubt" },
            { text: "The practice feels like a mask", subLabel: "Identity crisis" }
        ]
    },
    "Feeling lost": {
        question: "Does this 'lost' feeling stem from having no destination, or from having arrived at one and realizing it wasn't yours?",
        options: [
            { text: "No destination", subLabel: "Void seeking" },
            { text: "Wrong destination", subLabel: "Success trap" },
            { text: "I've lost the map entirely", subLabel: "Total reset" }
        ]
    },
    "Relationship pain": {
        question: "Are you grieving the loss of who they were, or the version of yourself you were when you were with them?",
        options: [
            { text: "Loss of them", subLabel: "Grief/Attachment" },
            { text: "Loss of myself", subLabel: "Identity merge" },
            { text: "The weight of the unspoken", subLabel: "Hidden truth" }
        ]
    },
    "Career confusion": {
        question: "Is your confusion a lack of 'what' to do, or a terrifying clarity about the 'why' that you can no longer ignore?",
        options: [
            { text: "Lack of 'what'", subLabel: "Tactical pivot" },
            { text: "Terrifying 'why'", subLabel: "Existential shift" },
            { text: "I am suffocating here", subLabel: "Urgent exit" }
        ]
    },
    "Inner emptiness": {
        question: "Is the emptiness a hollow space waiting to be filled, or a sacred space trying to clear away what no longer belongs?",
        options: [
            { text: "Hollow space", subLabel: "Scarcity/Need" },
            { text: "Sacred space", subLabel: "Purification" },
            { text: "It feels like a heavy void", subLabel: "Depression/Wait" }
        ]
    },
    "Anxiety & overthinking": {
        question: "Is your mind frantically trying to solve a real threat, or is it creating complexity to avoid taking a simple, terrifying action?",
        options: [
            { text: "Solving a real threat", subLabel: "Survival mode" },
            { text: "Avoiding action", subLabel: "The Safe Loop" },
            { text: "I can't stop the noise", subLabel: "System overload" }
        ]
    },
    "I don't even know": {
        question: "If the confusion was a doorway instead of a wall—what is the one thing you are most afraid to find on the other side?",
        options: [
            { text: "True Responsibility", subLabel: "End of blame" },
            { text: "Total Freedom", subLabel: "End of safety" },
            { text: "Absolute Silence", subLabel: "End of self" }
        ]
    }
};

export default function HeroCTA({ 
    onGlassChange,
    onRoundChange,
    onComplete,
    onChatActive,
    onGeneratingReport,
    lastReadArchitecture = null
}: { 
    onGlassChange?: (active: boolean) => void,
    onRoundChange?: (round: number) => void,
    onComplete?: (state: any) => void,
    onChatActive?: (active: boolean) => void,
    onGeneratingReport?: (active: boolean) => void,
    lastReadArchitecture?: string | null
}) {
    const router = useRouter();
    const { isSignedIn, user: clerkUser } = useUser();

    const originalText = "Your pattern brought you here. Which loop are we breaking tonight?";
    const [ctaText, setCtaText] = useState(originalText);
    const [inputValue, setInputValue] = useState("");
    const lastValueRef = useRef("");
    const hasDeletedRef = useRef(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        if (val.length < lastValueRef.current.length && lastValueRef.current.length > 5) {
            hasDeletedRef.current = true;
        }
        lastValueRef.current = val;
        setInputValue(val);
    };

    const [isListening, setIsListening] = useState(false);
    const [decodedCount, setDecodedCount] = useState(14847);

    const [showChat, setShowChat] = useState(false);

    useEffect(() => {
        if (onChatActive) {
            onChatActive(showChat);
        }
    }, [showChat, onChatActive]);

    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [thinkingMessage, setThinkingMessage] = useState("Intelligence is observing the pattern...");
    const [thinkingStatus, setThinkingStatus] = useState("Thinking");
    
    const thinkingPhrases = [
        "Intelligence is observing the pattern...",
        "Consulting the Akasha for your soul's architecture...",
        "Navigating the Latent Mythos...",
        "Tracing the mythic thread of your response...",
        "Mirroring the depth of your unconditioned self...",
        "Identifying the Kurukshetra within...",
        "Aligning with your latent awakening...",
        "Synthesizing dharmic clarity..."
    ];

    useEffect(() => {
        let interval: NodeJS.Timeout;
        if (isTyping) {
            let i = 0;
            interval = setInterval(() => {
                const phrase = thinkingPhrases[i % thinkingPhrases.length];
                setThinkingMessage(phrase);
                setThinkingStatus(phrase.toUpperCase());
                i++;
            }, 2500);
        } else {
            setThinkingStatus("Thinking");
        }
        return () => clearInterval(interval);
    }, [isTyping]);

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
    const [showPromptPopup, setShowPromptPopup] = useState(false);
    const [soundPlayed, setSoundPlayed] = useState(false);
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [isAiTalking, setIsAiTalking] = useState(false);
    const lastActivityRef = useRef<number>(Date.now());

    // --- Predictive Generation State ---
    const [preGeneratedReport, setPreGeneratedReport] = useState<any>(null);
    const [isPreGenerating, setIsPreGenerating] = useState(false);

    // --- Intelligence Notifications ---
    const [notifications, setNotifications] = useState<{ id: string; text: string; type: string }[]>([]);
    
    const pushNotification = (text: string, type: string = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setNotifications(prev => [...prev, { id, text, type }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 4000);
    };

    // --- Retention Engine State ---
    const [csn, setCsn] = useState<string | null>(null);
    const [email, setEmail] = useState<string | null>(null);
    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const [showExitModal, setShowExitModal] = useState(false);
    const [showReturnModal, setShowReturnModal] = useState(false);
    const [savedSession, setSavedSession] = useState<any>(null);
    const [csnExpiry, setCsnExpiry] = useState<string>("24:00:00");

    const assignCSN = () => {
        const newCsn = 'CSN-' + Math.floor(Math.random() * 9000 + 1000);
        setCsn(newCsn);
        pushNotification(`${newCsn} RESERVED`, 'csn');
        localStorage.setItem('spiritual_ai_csn', newCsn);
        localStorage.setItem('spiritual_ai_csn_time', Date.now().toString());
        return newCsn;
    };

    const saveSession = (state: UserState, history: any[], completion: number) => {
        const session = {
            messages,
            history,
            userState: state,
            completion,
            csn,
            email,
            exchanges: round,
            timestamp: Date.now()
        };
        localStorage.setItem('spiritual_ai_session', JSON.stringify(session));
        localStorage.setItem('spiritualAiState', JSON.stringify(state));
    };

    // CSN Expiry Timer
    useEffect(() => {
        if (!csn) return;
        const timer = setInterval(() => {
            const startTime = parseInt(localStorage.getItem('spiritual_ai_csn_time') || Date.now().toString());
            const elapsed = Date.now() - startTime;
            const remaining = Math.max(0, (24 * 60 * 60 * 1000) - elapsed);
            
            const hours = Math.floor(remaining / 3600000);
            const minutes = Math.floor((remaining % 3600000) / 60000);
            const seconds = Math.floor((remaining % 60000) / 1000);
            
            setCsnExpiry(`${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`);
            
            if (remaining === 0) {
                localStorage.removeItem('spiritual_ai_csn');
                localStorage.removeItem('spiritual_ai_csn_time');
                setCsn(null);
            }
        }, 1000);
        return () => clearInterval(timer);
    }, [csn]);

    // Restore state and session on mount
    useEffect(() => {
        const savedState = localStorage.getItem('spiritualAiState');
        const savedCsn = localStorage.getItem('spiritual_ai_csn');
        
        if (savedCsn) setCsn(savedCsn);

        if (savedState) {
            try {
                const parsed = JSON.parse(savedState);
                setUserState(parsed);
                if (parsed.report) {
                    setIsConvoComplete(true);
                    if (onComplete) onComplete(parsed);
                }
            } catch (e) {
                console.error("Failed to parse saved state", e);
            }
        }
    }, []);

    // Idle Detection (90s)
    useEffect(() => {
        if (!showChat || isConvoComplete || isTyping) return;
        
        const idleTimer = setTimeout(() => {
            const now = Date.now();
            if (now - lastActivityRef.current >= 90000) {
                const idleMsg = { 
                    role: 'ai' as const, 
                    content: "Still there? That hesitation — whatever you're sitting with right now — is itself part of the pattern. Take your time.",
                    contextLine: "Observing the stillness."
                };
                setMessages(prev => [...prev, idleMsg]);
            }
        }, 90000);

        return () => clearTimeout(idleTimer);
    }, [showChat, isConvoComplete, isTyping, messages.length]);

    // Pre-warm next question while user types
    useEffect(() => {
        if (!showChat || isTyping || inputValue.length < 5) return;
        
        const prewarmTimer = setTimeout(async () => {
            try {
                // Send real-time awareness data to the API
                fetch('/api/spiritual', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        action: 'warmup',
                        partialInput: inputValue,
                        hasDeleted: hasDeletedRef.current,
                        responseTimeMillis: Date.now() - lastActivityRef.current
                    }),
                });
            } catch (_) {}
        }, 1200);

        return () => clearTimeout(prewarmTimer);
    }, [inputValue, showChat, isTyping]);

    const [scrollY, setScrollY] = useState(0);
    const [hasScrolled, setHasScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const currentScroll = window.scrollY;
            setScrollY(currentScroll);
            if (currentScroll > 10) {
                setHasScrolled(true);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
        if (!showChat) {
            setShowChat(true);
            if (messages.length === 0) {
                // Check if we have existing progress
                const savedSessionStr = localStorage.getItem('spiritual_ai_session');
                let existingSession: any = null;
                try {
                    if (savedSessionStr) existingSession = JSON.parse(savedSessionStr);
                } catch (e) {}

                if (existingSession && existingSession.completion > 0 && existingSession.messages?.length > 0) {
                    // Restore existing session instead of showing greeting
                    setMessages(existingSession.messages);
                    setConversationHistory(existingSession.history);
                    setUserState(existingSession.userState);
                    setRound(existingSession.exchanges);
                    setCsn(existingSession.csn);
                    setEmail(existingSession.email);
                    
                    pushNotification(`DECODE RESUMED: ${existingSession.completion}%`, 'info');
                } else {
                    const quizResult = localStorage.getItem('mbti_quiz_result');
                    if (quizResult) {
                        setUserState(prev => ({ ...prev, confirmedMBTI: quizResult }));
                    }

                    const greeting = "I see a soul in a moment of transition. Your arrival here was not an accident—it was a recognition. Which of these sounds most like the silent pattern your life is whispering right now?";
                    const greetingOptions = [
                        { text: "I know I can do more, but I keep delaying.", subLabel: "Resistance" },
                        { text: "I feel lost and unsure about my direction.", subLabel: "Uncertainty" },
                        { text: "Things look fine, but I feel empty inside.", subLabel: "Soul thirst" },
                        { text: "I’m stuck on someone or something from the past.", subLabel: "Lingering ties" },
                        { text: "I don’t feel good enough, no matter what I do.", subLabel: "Worthiness" },
                        { text: "I overthink so much that I don’t act.", subLabel: "Analysis paralysis" },
                        { text: "I feel tired, disconnected, or mentally drained.", subLabel: "Burnout" },
                        { text: "I have achieved my goals, yet I feel no fulfillment.", subLabel: "Arrival Fallacy" },
                        { text: "I feel a calling I can't name yet, a pull toward something more.", subLabel: "Awakening" },
                        { text: "I'm living someone else's life, and my own is waiting.", subLabel: "Inauthenticity" },
                        { text: "I feel like a wanderer with no home to return to.", subLabel: "Rootlessness" },
                        { text: "I'm searching for a meaning that transcends the daily grind.", subLabel: "Existential Thirst" },
                        { text: "My mind is a storm of ideas, but my hands are still.", subLabel: "Creative Blockage" },
                        { text: "I fear my best work is behind me, or perhaps it never was.", subLabel: "Imposter Syndrome" },
                        { text: "I'm obsessed with perfection to the point of stagnation.", subLabel: "Perfectionism" },
                        { text: "I have the map, but I’m terrified to take the first step.", subLabel: "Fear of Failure" },
                        { text: "The world feels too loud for my quiet thoughts to breathe.", subLabel: "Overstimulation" },
                        { text: "I give so much to others that I have nothing left for myself.", subLabel: "Self-Neglect" },
                        { text: "I'm surrounded by people, yet I feel completely alone.", subLabel: "Isolation" },
                        { text: "I’m holding onto a ghost that no longer wants to be held.", subLabel: "Grief" },
                        { text: "I fear if people saw the real me, they would leave.", subLabel: "Vulnerability" },
                        { text: "I keep repeating the same painful patterns in my heart.", subLabel: "Karmic Cycles" },
                        { text: "I feel trapped by responsibilities that no longer fit.", subLabel: "Confinement" },
                        { text: "Money and security are my anchors, but they’ve become my cage.", subLabel: "Materialism" },
                        { text: "I feel like a cog in a machine that doesn't care if I break.", subLabel: "Dehumanization" },
                        { text: "I’m hiding a part of myself that I’m too ashamed to face.", subLabel: "Shadow Work" },
                        { text: "I feel a deep, old anger that I don't know how to release.", subLabel: "Suppression" },
                        { text: "I’m constantly bracing for a blow that hasn't come yet.", subLabel: "Hypervigilance" },
                        { text: "I feel like I'm broken beyond repair, just keeping up appearances.", subLabel: "Internal Fracture" },
                        { text: "I seek distractions because I’m afraid of the silence.", subLabel: "Avoidance" },
                        { text: "I’m outgrowing my environment, and the friction is painful.", subLabel: "Expansion Pain" },
                        { text: "I’m learning to love the person I’m becoming.", subLabel: "Self-Actualization" },
                        { text: "I’m standing at a threshold, and I can’t go back.", subLabel: "Point of No Return" }
                    ];
                    setMessages([{ role: 'ai', content: greeting, options: greetingOptions }]);
                    setCurrentQuestion(greeting);
                    
                    const initialContext = lastReadArchitecture 
                        ? `[CONTEXT: User was just reading about "${lastReadArchitecture}"] ${greeting}`
                        : greeting;
                        
                    setConversationHistory([{ role: 'ai', content: initialContext }]);
                    setRound(0);
                }
            }
        }
    };

    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const recognitionRef = useRef<any>(null);
    const chatThreadRef = useRef<HTMLDivElement>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Use a ref to keep state/props accessible to the global listener without changing dependency array size
    const listenerStateRef = useRef({ showChat, sacredPause, isTyping, onGlassChange, onChatActive });
    useEffect(() => {
        listenerStateRef.current = { showChat, sacredPause, isTyping, onGlassChange, onChatActive };
    }, [showChat, sacredPause, isTyping, onGlassChange, onChatActive]);

    // Global key listener to auto-focus input when user types
    useEffect(() => {
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            const { showChat: currentShowChat, sacredPause, isTyping, onGlassChange, onChatActive } = listenerStateRef.current;
            
            if (!sacredPause && 
                !isTyping && 
                document.activeElement?.tagName !== 'INPUT' && 
                document.activeElement?.tagName !== 'TEXTAREA' &&
                !e.metaKey && !e.ctrlKey && !e.altKey &&
                e.key.length === 1) {
                
                // If chat isn't open, open it
                if (!currentShowChat) {
                    setShowChat(true);
                    if (onGlassChange) onGlassChange(true);
                    if (onChatActive) onChatActive(true);
                }
                
                // Manually focus and append the key so it's not lost
                inputRef.current?.focus();
                // We use a small timeout to let the state update if showChat was just toggled
                setTimeout(() => {
                    if (inputRef.current) {
                        inputRef.current.focus();
                        setInputValue(prev => (prev + e.key));
                    }
                }, 10);
            }
        };

        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => window.removeEventListener('keydown', handleGlobalKeyDown);
    }, []);

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

    // Thinking state moved up to main state section
    
    const sendToAI = async (userAnswer: string, chipSelected: string, state: UserState, history: { role: string; content: string }[], qCount: number) => {
        setIsTyping(true);
        try {
            const res = await fetch('/api/spiritual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'process_answer',
                    userState: state,
                    conversationHistory: history,
                    userAnswer,
                }),
            });

            const data = await res.json();
            if (data.success && data.data) {
                const aiData = data.data;
                const nextRound = qCount + 1;
                
                const questionText = aiData.question || "Continue your journey...";

                // SMOOTH TYPING: Subsequent AI messages
                setMessages(prev => [...prev, { role: 'ai', content: "", options: [], contextLine: aiData.contextLine }]);
                for (let j = 0; j <= questionText.length; j++) {
                    const cur = questionText.substring(0, j);
                    setMessages(prev => {
                        const n = [...prev];
                        if (n.length > 0) n[n.length - 1].content = cur;
                        return n;
                    });
                    await new Promise(r => setTimeout(r, 12)); // Slightly faster for long responses
                }

                // Show options after typing
                setMessages(prev => {
                    const n = [...prev];
                    if (n.length > 0) n[n.length - 1].options = aiData.options || [];
                    return n;
                });
                
                const newHistory = [...history, { role: 'ai', content: questionText }];
                setConversationHistory(newHistory);
                setRound(nextRound);

                // RETENTION HOOKS
                if (nextRound === 2 && !csn) {
                    assignCSN();
                }

                // Map state extraction to UserState (Moved after typing to prevent UI jumps)
                let latestProgress = userState.decodingProgress;
                let latestState = { ...userState };
                setUserState(prev => {
                    const updated = { ...prev, ...aiData };
                    
                    // Trigger Notifications based on discovery
                    if (!prev.detectedPattern && aiData.detectedPattern) {
                        pushNotification(`PATTERN IDENTIFIED: ${aiData.detectedPattern}`, 'success');
                    }
                    if (!prev.activeArchetype && aiData.activeArchetype) {
                        pushNotification(`ARCHETYPE ASSIGNED: ${aiData.activeArchetype}`, 'info');
                    }
                    if (JSON.stringify(prev.mbtiSignals) !== JSON.stringify(aiData.mbtiSignals)) {
                        pushNotification(`MBTI SIGNAL DETECTED`, 'pulse');
                    }

                    if (aiData.mbtiSignals) updated.mbtiSignals = aiData.mbtiSignals;
                    if (aiData.detectedPattern) updated.detectedPattern = aiData.detectedPattern;
                    if (aiData.activeArchetype) updated.activeArchetype = aiData.activeArchetype;
                    
                    if (aiData.type === 'final_share') {
                        updated.decodingProgress = 100;
                    } else if (aiData.decodingProgress === undefined) {
                        // Fallback if API doesn't return it
                        updated.decodingProgress = prev.decodingProgress;
                    } else {
                        updated.decodingProgress = aiData.decodingProgress;
                    }
                    latestProgress = updated.decodingProgress;
                    latestState = updated;
                    return updated;
                });

                // PREDICTIVE GENERATION
                if (aiData.reportScore >= 50 && !preGeneratedReport && !isPreGenerating) {
                    setIsPreGenerating(true);
                    fetch('/api/spiritual', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            action: 'pre_generate_report',
                            userState: latestState,
                            conversationHistory: newHistory,
                        }),
                    })
                    .then(res => res.json())
                    .then(result => {
                        if (result.success && result.data) {
                            // Save the {report, products} object
                            setPreGeneratedReport(result.data);
                        }
                    })
                    .catch(e => console.error("Predictive background generation failed", e));
                }

                // Small delay to ensure state is accessible or just pass calculated values
                setTimeout(() => {
                    saveSession({ ...latestState }, newHistory, latestProgress);
                }, 100);

                if (aiData.type === 'final_share' || aiData.decodingProgress >= 100) {
                    setIsConvoComplete(true);
                    // Use a delay and re-check latest state to avoid side-effects in render
                    setTimeout(() => {
                        triggerSacredPause(latestState, newHistory);
                    }, 1500);
                }
            }
        } catch (err) {
            console.error('AI error:', err);
            setMessages(prev => [...prev, { role: 'ai', content: "The connection to Intelligence was momentarily interrupted. Please repeat that." }]);
        } finally {
            setIsTyping(false);
        }
    };

    const extractJSONFromStream = (text: string) => {
        if (!text) return null;
        let parsed: any = null;
        try {
            // First try pure parse
            parsed = JSON.parse(text);
        } catch (e) {
            try {
                // Try to find JSON block
                const matches = text.match(/\{[\s\S]*\}/g);
                if (matches) {
                    parsed = JSON.parse(matches[matches.length - 1]);
                }
            } catch (e2) {}
            
            // If it's still failing but looks like it tried to be JSON,
            // let's try to manually extract the question to save the UX
            if (!parsed && text.includes('"question"')) {
                const qMatch = text.match(/"question"\s*:?\s*"?([^",}]+)/);
                if (qMatch && qMatch[1]) {
                    parsed = { question: qMatch[1].trim() };
                }
            }
        }
        
        if (parsed && Array.isArray(parsed.options)) {
            parsed.options = parsed.options.slice(0, 3);
        }

        return parsed;
    };

    const [isEtching, setIsEtching] = useState(false);

    const triggerSacredPause = (state: UserState, history: any[]) => {
        setSacredPause(true);
        setIsConvoComplete(true);
        if (onGlassChange) onGlassChange(false);
        if (onGeneratingReport) onGeneratingReport(true);
        
        const reportPromise = fetch('/api/spiritual', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                action: 'generate_report', 
                userState: state, 
                conversationHistory: history,
                preGeneratedReport // Passed in if predictive generation finished
            }),
        }).then(async r => {
            if (r.status === 401) {
                return { success: false, error: 'Unauthorized' };
            }
            return r.json();
        }).catch(e => { console.error('Report failed', e); return { success: false }; });
        
        setTimeout(async () => {
            const res = await reportPromise;

            const finalStateData = { 
                ...state, 
                csn: res?.data?.csn || csn, // Ensure final CSN is stored
                report: res?.data?.report || null, 
                recommendedProducts: res?.data?.products || [], 
                exchangeHistory: history,
                decodingProgress: 100
            };
            
            setUserState(finalStateData);
            localStorage.setItem('spiritualAiState', JSON.stringify(finalStateData));
            
            // --- BLUEPRINT CEREMONY ---
            setIsEtching(true);
            
            setTimeout(() => {
                const finalCsn = res?.data?.csn || csn || "SAI-PENDING";
                // Wait, aiData might not be defined here because we're inside triggerSacredPause. 
                // We should use state.confirmedMBTI instead.
                const mbti = state.confirmedMBTI || "";
                if (mbti) {
                    router.push(`/mbti-transition?mbti=${mbti}&redirect=/blueprint/${finalCsn}`);
                } else {
                    router.push(`/blueprint/${finalCsn}`);
                }
                
                // Cleanup after redirect (slight delay)
                setTimeout(() => {
                    setIsEtching(false);
                    setSacredPause(false);
                    setShowChat(false);
                    if (onChatActive) onChatActive(false);
                    if (onGeneratingReport) onGeneratingReport(false);
                }, 1000);
            }, 4500); // 4.5s for the horizontal etch ceremony
        }, 3000);
    };

    const updateStateWithTracking = (answer: string, currentState: UserState): UserState => {
        const now = Date.now();
        const responseTime = now - (currentState.tracking?.lastMessageTimestamp || now);
        
        return {
            ...currentState,
            tracking: {
                ...currentState.tracking,
                responseTimeMillis: [...(currentState.tracking?.responseTimeMillis || []), responseTime],
                lastMessageTimestamp: now,
            }
        };
    };

    const [messageCount, setMessageCount] = useState(0);
    const [lastReset, setLastReset] = useState(Date.now());

    const checkRateLimit = () => {
        const now = Date.now();
        if (now - lastReset > 60000) {
            setMessageCount(0);
            setLastReset(now);
            return true;
        }
        if (messageCount >= 12) {
            alert("The silence is calling. Please wait a minute before speaking again.");
            return false;
        }
        setMessageCount(prev => prev + 1);
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isTyping || sacredPause) return;
        if (!checkRateLimit()) return;
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
                        
                        setMessages(prev => {
                            const n = [...prev];
                            n[n.length - 1].options = [
                                { text: "Finish Report Now", subLabel: "Proceed with partial data" },
                                { text: "Fill the fragments", subLabel: "Deepen the analysis" }
                            ];
                            return n;
                        });
                        
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
            setIsTyping(true);
            await new Promise(r => setTimeout(r, 500));
        }
        const updatedHistory = [...conversationHistory, { role: 'user', content: text }];
        await sendToAI(text, newState.chipSelected, newState, updatedHistory, round);
    };

    const handleOptionClick = async (optionText: string) => {
        if (isTyping || sacredPause) return;
        if (!checkRateLimit()) return;
        maybePlaySound();
        setMessages(prev => [...prev, { role: 'user', content: optionText }]);
        const tracked = updateStateWithTracking(optionText, userState);
        setUserState(tracked);

        const initialAIContext = lastReadArchitecture 
            ? `[CONTEXT: User was reading "${lastReadArchitecture}" and chose option: "${optionText}"]`
            : `[CONTEXT: User chose option: "${optionText}"]`;

        const updatedHistory = [
            { role: 'ai', content: `${initialAIContext} Which of these feels most like your life right now?` },
            { role: 'user', content: optionText }
        ];

        if (optionText === "Finish Report Now") {
            setTimeout(() => triggerSacredPause(tracked, updatedHistory), 1000);
            return;
        }

        await sendToAI(optionText, tracked.chipSelected, tracked, updatedHistory, round);
    };

    const handleStruggleClick = async (struggle: string) => {
        if (isTyping || sacredPause) return;
        maybePlaySound();
        const data = FIRST_QUESTIONS[struggle];
        const q = "Recognition. Which pattern are you living right now?";
        
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        let i = 0; setInputValue("");
        const next = () => { if (i <= struggle.length) { setInputValue(struggle.substring(0, i)); i++; typingIntervalRef.current = setTimeout(next, 30); } };
        next();
        
        setTimeout(async () => {
            setInputValue(""); 
            setShowChat(true); 
            setDecodedCount(prev => prev + 1);
            if (isLiveMode) speakText(q);
            
            const newState = { ...DEFAULT_USER_STATE, chipSelected: struggle, firstAnswer: struggle, tracking: { ...DEFAULT_USER_STATE.tracking, lastMessageTimestamp: Date.now() } };
            setUserState(newState);
            setMessages([{ role: 'user', content: struggle }]);
            
            setIsTyping(true); 
            await new Promise(r => setTimeout(r, 400)); 
            
            setMessages(prev => [...prev, { role: 'ai', content: "", options: [] }]);
            for (let j = 0; j <= q.length; j++) {
                const cur = q.substring(0, j);
                setMessages(prev => { 
                    const n = [...prev]; 
                    if (n.length > 0) n[n.length - 1].content = cur; 
                    return n; 
                });
                await new Promise(r => setTimeout(r, 15));
            }
            setIsTyping(false);

            if (data?.options) {
                setMessages(prev => { 
                    const n = [...prev]; 
                    if (n.length > 0) n[n.length - 1].options = data.options; 
                    return n; 
                });
            }
            
            const initialAIContext = lastReadArchitecture 
                ? `[CONTEXT: User was reading "${lastReadArchitecture}" and chose struggle: "${struggle}"]`
                : `[CONTEXT: User chose struggle: "${struggle}"]`;
            
            setConversationHistory([
                { role: 'ai', content: initialAIContext },
                { role: 'user', content: struggle },
                { role: 'ai', content: q }
            ]);
            setRound(1);
        }, 500);
    };

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const audioChunksRef = useRef<Blob[]>([]);

    const toggleListening = async () => {
        if (isListening) {
            mediaRecorderRef.current?.stop();
            setIsListening(false);
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (e) => {
                if (e.data.size > 0) audioChunksRef.current.push(e.data);
            };

            mediaRecorder.onstop = async () => {
                const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
                const formData = new FormData();
                formData.append('file', audioBlob, 'speech.webm');

                setIsTyping(true);
                try {
                    const res = await fetch('/api/spiritual', {
                        method: 'POST',
                        body: formData
                    });
                    const data = await res.json();
                    if (data.success && data.text) {
                        setInputValue(prev => (prev + " " + data.text).trim());
                    }
                } catch (err) {
                    console.error("Transcription failed", err);
                } finally {
                    setIsTyping(false);
                    stream.getTracks().forEach(track => track.stop());
                }
            };

            mediaRecorder.start();
            setIsListening(true);
            maybePlaySound();
        } catch (err) {
            console.error("Mic access failed", err);
            alert("Microphone access is required for voice interaction.");
        }
    };

    const speakText = (text: string) => {
        if (!isLiveMode) return;
        window.speechSynthesis.cancel();
        
        const u = new SpeechSynthesisUtterance(text);
        
        const voices = window.speechSynthesis.getVoices();
        const premiumVoices = [
            "Google US English",
            "Microsoft Aria",
            "Microsoft Guy",
            "Apple Samantha",
            "English United States"
        ];

        const selectedVoice = voices.find(v => premiumVoices.some(p => v.name.includes(p))) || voices[0];
        if (selectedVoice) u.voice = selectedVoice;

        u.pitch = 1.0;
        u.rate = 0.95;
        u.volume = 1.0;

        u.onstart = () => setIsAiTalking(true);
        u.onend = () => { 
            setIsAiTalking(false); 
            if (isLiveMode && !isConvoComplete) {
                setTimeout(() => toggleListening(), 400); 
            }
        };
        window.speechSynthesis.speak(u);
    };

    return (
        <div className={`${styles.mbtiContainer} ${showChat ? styles.chatActive : ''}`}>

            <AnimatePresence>
                {isEtching && (
                    <motion.div 
                        initial={{ opacity: 0 }} 
                        animate={{ opacity: 1 }} 
                        exit={{ opacity: 0 }}
                        style={{
                            position: 'fixed',
                            inset: 0,
                            background: '#030303',
                            zIndex: 20000,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden'
                        }}
                    >
                        <motion.div 
                            initial={{ width: 0 }}
                            animate={{ width: '80%' }}
                            transition={{ duration: 3.5, ease: "easeInOut" }}
                            style={{
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, #00f2ff, transparent)',
                                boxShadow: '0 0 30px #00f2ff',
                                position: 'relative'
                            }}
                        >
                            <motion.div 
                                animate={{ opacity: [0.3, 1, 0.3] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                                style={{
                                    position: 'absolute',
                                    top: '-40px',
                                    left: 0,
                                    width: '100%',
                                    textAlign: 'center',
                                    color: '#00f2ff',
                                    fontFamily: 'Orbitron',
                                    fontSize: '0.8rem',
                                    letterSpacing: '0.3em',
                                    textTransform: 'uppercase'
                                }}
                            >
                                Etching Consciousness Blueprint
                            </motion.div>
                        </motion.div>
                        
                        <div className={styles.cosmicBackground}></div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {csn && showChat && !isConvoComplete && (
                    <motion.div className={styles.csnNotification} initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }}>
                        {csn} RESERVED · EXPIRES IN {csnExpiry}
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {csn && showChat && !isConvoComplete && (

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
                            {userState.name ? `Talk to Intelligence, ${userState.name} ↓ It will guide you step-by-step` : "Talk to Intelligence below ↓ It will guide you step-by-step"}
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
                    {showChat && !isTransitioning && !isConvoComplete && (
                        <motion.div ref={chatThreadRef} className={styles.chatThread} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}>
                            
                            {/* Intelligence Notifications Toast Container */}
                            <div className={styles.notificationStack}>
                                <AnimatePresence>
                                    {notifications.map((n) => (
                                        <motion.div 
                                            key={n.id}
                                            className={`${styles.miniNotification} ${styles[n.type]}`}
                                            initial={{ opacity: 0, x: 50, scale: 0.8 }}
                                            animate={{ opacity: 1, x: 0, scale: 1 }}
                                            exit={{ opacity: 0, x: 50, scale: 0.8 }}
                                        >
                                            <div className={styles.notificationDot} />
                                            {n.text}
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {showEmailCapture && (
                                <div className={styles.emailCaptureOverlay}>
                                    <h3 className={styles.emailCaptureTitle}>Your blueprint is being built in real time.</h3>
                                    <p className={styles.emailCaptureText}>
                                        Where should I send the complete version — 
                                        including your <span className={styles.csnBadge}>{csn || 'CSN'}</span> and full dissolution path?
                                    </p>
                                    <div className={styles.emailInputWrapper}>
                                        <input 
                                            type="email" 
                                            className={styles.emailInput} 
                                            placeholder="your@email.com"
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <button className={styles.emailSubmitBtn} onClick={async () => {
                                            if (!email || !email.includes('@')) return alert("Enter valid email");
                                            await fetch('/api/spiritual', {
                                                method: 'POST',
                                                headers: { 'Content-Type': 'application/json' },
                                                body: JSON.stringify({ action: 'save_email', email, sessionId: csn })
                                            });
                                            setUserState(prev => {
                                                const updated = { ...prev, email: email };
                                                localStorage.setItem('spiritualAiState', JSON.stringify(updated));
                                                return updated;
                                            });
                                            setShowEmailCapture(false);
                                        }}>
                                            SEND MY BLUEPRINT →
                                        </button>
                                    </div>
                                    <button className={styles.emailSkipBtn} onClick={() => setShowEmailCapture(false)}>
                                        Continue without saving
                                    </button>
                                </div>
                            )}
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

                            <div className={styles.decodingProgressContainer}>
                                <div className={styles.progressLabel}>
                                    <span>CONSCIOUSNESS DECODING IN PROGRESS</span>
                                    <span>{userState.decodingProgress}% IDENTIFIED</span>
                                </div>
                                <div className={styles.checklist}>
                                    <div className={`${styles.checkItem} ${userState.detectedPattern ? styles.checkItemActive : ''}`}>
                                        <div className={`${styles.checkIcon} ${userState.detectedPattern ? styles.checkIconActive : ''}`} />
                                        Pattern
                                    </div>
                                    <div className={`${styles.checkItem} ${userState.confirmedMBTI ? styles.checkItemActive : ''}`}>
                                        <div className={`${styles.checkIcon} ${userState.confirmedMBTI ? styles.checkIconActive : ''}`} />
                                        MBTI
                                    </div>
                                    <div className={`${styles.checkItem} ${userState.birthDate ? styles.checkItemActive : ''}`}>
                                        <div className={`${styles.checkIcon} ${userState.birthDate ? styles.checkIconActive : ''}`} />
                                        Cosmic
                                    </div>
                                    <div className={`${styles.checkItem} ${userState.hawkinsLevel ? styles.checkItemActive : ''}`}>
                                        <div className={`${styles.checkIcon} ${userState.hawkinsLevel ? styles.checkIconActive : ''}`} />
                                        Hawkins
                                    </div>
                                    <div className={`${styles.checkItem} ${userState.jungianArchetype ? styles.checkItemActive : ''}`}>
                                        <div className={`${styles.checkIcon} ${userState.jungianArchetype ? styles.checkIconActive : ''}`} />
                                        Jungian
                                    </div>
                                </div>
                                <div className={styles.progressBarTrack}>
                                    <div 
                                        className={styles.progressBarFill} 
                                        style={{ width: `${userState.decodingProgress}%` }}
                                    />
                                </div>
                            </div>
                            <div className={styles.chatHeaderTitle}>
                            </div>
                            {messages.map((msg, idx) => (
                                <motion.div key={idx} className={`${styles.messageRow} ${msg.role === 'ai' ? styles.aiRow : styles.userRow}`} initial={{ opacity: 0, y: 12 }} animate={{ opacity: (idx + 1) / messages.length, y: 0 }}>
                                    <div className={`${styles.chatBubble} ${msg.role === 'ai' ? styles.aiBubble : styles.userBubble}`}>
                                        {msg.role === 'ai' && msg.contextLine && <div style={{ fontSize: '0.8rem', opacity: 0.7, fontStyle: 'italic', marginBottom: '8px', color: '#00f2ff' }}>{msg.contextLine}</div>}
                                        {msg.content}
                                    </div>
                                    {msg.role === 'ai' && msg.options && idx === messages.length - 1 && !isTyping && !sacredPause && !isConvoComplete && (
                                        <div className={msg.options.length <= 3 ? styles.staticOptionsContainer : styles.optionsMarqueeContainer}>
                                            <div className={msg.options.length <= 3 ? styles.staticOptionsTrack : styles.optionsMarqueeTrack}>
                                                {(msg.options.length <= 3 ? msg.options : [...msg.options, ...msg.options]).map((opt, oi) => (
                                                    <button 
                                                        key={oi} 
                                                        className={styles.optionBubble} 
                                                        onClick={() => handleOptionClick(opt.text)}
                                                    >
                                                        {opt.text}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            ))}
                            {isTyping && (
                                <div className={`${styles.messageRow} ${styles.aiRow}`}>
                                    <div className={styles.chatBubble} style={{ opacity: 0.6, fontSize: '0.8rem', fontStyle: 'italic', background: 'transparent', border: '1px dashed rgba(0, 242, 255, 0.2)' }}>
                                        {thinkingMessage}
                                        <div className={styles.typingDots} style={{ marginTop: '8px' }}><span /><span /><span /></div>
                                    </div>
                                </div>
                            )}
                            <div ref={chatEndRef} />

                            <AnimatePresence>
                                {sacredPause && (
                                    <motion.div className={styles.sacredPauseOverlay} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className={styles.sacredLotus}>🪷</div>
                                        <SacredStatus stage={6} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isTransitioning && !sacredPause && (
                    <form 
                        className={`${styles.gradientFlowBtn} cta-message-box`} 
                        onSubmit={handleSubmit} 
                        onClick={() => { if (!showChat) handleInputFocus(); }}
                        style={{ position: 'relative', pointerEvents: 'auto', zIndex: '2000' }}
                    >
                    <AudioVisualizer isActive={isListening} />
                    <div className={styles.inputLeftIcon}><img src="/images/logo.png" alt="Logo" /></div>
                    {showDatePicker ? (
                        <div style={{ display: 'flex', gap: '8px', width: '100%', alignItems: 'center' }}>
                            <input 
                                type="date" 
                                className={styles.messageInput} 
                                style={{ width: 'auto', flex: 1 }}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setUserState(s => ({...s, birthDate: val}));
                                }}
                            />
                            <input 
                                type="time" 
                                className={styles.messageInput} 
                                style={{ width: 'auto', flex: 1 }}
                                onChange={(e) => setUserState(s => ({...s, birthTime: e.target.value}))}
                            />
                            <input 
                                type="text" 
                                className={styles.messageInput} 
                                placeholder="City" 
                                style={{ width: 'auto', flex: 1 }}
                                onChange={(e) => setUserState(s => ({...s, birthPlace: e.target.value}))}
                            />
                            <button type="button" className={styles.okButton} onClick={async () => {
                                if (!userState.birthDate) return alert("Select date");
                                const answer = `Born: ${userState.birthDate} at ${userState.birthTime || 'unknown time'} in ${userState.birthPlace || 'unknown place'}.`; 
                                setShowDatePicker(false); 
                                setMessages(p => [...p, { role: 'user', content: answer }]);
                                await sendToAI(answer, userState.chipSelected, userState, conversationHistory, round);
                            }}>OK</button>
                        </div>
                    ) : isConvoComplete ? (<div style={{ flex: 1, display: 'flex', alignItems: 'center' }}><SacredStatus stage={6} /></div>) : (
                      <input ref={inputRef} type="text" value={inputValue} onChange={handleInputChange} onFocus={handleInputFocus} className={styles.messageInput} placeholder={showChat ? "Speak or type your truth..." : "What keeps showing up in your life?"} disabled={isTyping || sacredPause}/>
                    )}                    <div className={styles.neuralStatus}>
                        {canShowCalendar && (<button type="button" className={styles.micButton} onClick={() => setShowDatePicker(!showDatePicker)} style={{ borderColor: showDatePicker ? '#00f2ff' : 'rgba(255,255,255,0.2)', background: showDatePicker ? 'rgba(0, 242, 255, 0.1)' : 'rgba(255, 255, 255, 0.1)' }}><Calendar size={18} /></button>)}
                        <button type="button" className={`${styles.micButton} ${isLiveMode ? styles.liveActive : ''}`} onClick={() => { if (isLiveMode) { setIsLiveMode(false); window.speechSynthesis.cancel(); } else { setIsLiveMode(true); if (showChat && currentQuestion) speakText(currentQuestion); } }} title="Live Vocal Interaction"><Radio size={18} /></button>
                        <button type="button" className={`${styles.micButton} ${isListening ? styles.micActive : ''}`} onClick={toggleListening}><Mic size={18} /></button>
                    </div>
                </form>
                )}
            </div>
        </div>
    );
}
