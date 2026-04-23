"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Calendar, Mic, MicOff, Radio, X } from 'lucide-react';
import { playOmSound } from '../utils/audio';
import styles from './HeroCTA.module.css';
import HeroTitle from './HeroTitle';
import PretextWrapper from './home/PretextWrapper';
import AuthGate from './AuthGate';
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
const SacredStatus = () => {
    const [statusIdx, setStatusIdx] = useState(0);
    const statuses = [
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
    shadowPattern: null,
    activeArchetype: null,
    personaMask: null,
    complexIdentified: null,
    patternConfidence: 0,
    decodingProgress: 0,
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
    hidePopup = false,
    lastReadArchitecture = null
}: { 
    onGlassChange?: (active: boolean) => void,
    onRoundChange?: (round: number) => void,
    onComplete?: (state: any) => void,
    onChatActive?: (active: boolean) => void,
    onGeneratingReport?: (active: boolean) => void,
    hidePopup?: boolean,
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
    const [showAuthGate, setShowAuthGate] = useState(false);

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
    const [soundPlayed, setSoundPlayed] = useState(false);
    const [showPromptPopup, setShowPromptPopup] = useState(false);
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [isAiTalking, setIsAiTalking] = useState(false);
    const lastActivityRef = useRef<number>(Date.now());

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

    useEffect(() => {
        const handleScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (showChat || isConvoComplete || showPromptPopup) return;
        const timer = setInterval(() => {
            const now = Date.now();
            // Only show popup if user is inactive AND on Page 1 (scrollY < 300)
            if (now - lastActivityRef.current > 15000 && window.scrollY < 300) { 
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
        if (showPromptPopup && scrollY > 300) {
            setShowPromptPopup(false);
        }
    }, [scrollY, showPromptPopup]);

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
        if (!showChat) {
            setShowChat(true);
            if (messages.length === 0) {
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
                setMessages([{ role: 'ai', content: "", options: greetingOptions }]);
                setCurrentQuestion(greeting);
                
                const initialContext = lastReadArchitecture 
                    ? `[CONTEXT: User was just reading about "${lastReadArchitecture}"] ${greeting}`
                    : greeting;
                    
                setConversationHistory([{ role: 'ai', content: initialContext }]);
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

                // Map state extraction to UserState (Moved after typing to prevent UI jumps)
                setUserState(prev => {
                    const updated = { ...prev, ...aiData };
                    if (aiData.mbtiSignals) updated.mbtiSignals = aiData.mbtiSignals;
                    if (aiData.detectedPattern) updated.detectedPattern = aiData.detectedPattern;
                    if (aiData.activeArchetype) updated.activeArchetype = aiData.activeArchetype;
                    
                    if (aiData.type === 'final_share') {
                        updated.decodingProgress = 100;
                    } else if (aiData.decodingProgress === undefined) {
                        const floorProgress = Math.min(nextRound * 15, 92);
                        updated.decodingProgress = floorProgress;
                    } else {
                        updated.decodingProgress = aiData.decodingProgress;
                    }
                    return updated;
                });

                if (aiData.type === 'final_share' || aiData.decodingProgress >= 100) {
                    setIsConvoComplete(true);
                    setTimeout(() => {
                        // Re-fetch latest userState for the pause
                        setUserState(s => {
                            triggerSacredPause(s, newHistory);
                            return s;
                        });
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

    const triggerSacredPause = (state: UserState, history: any[]) => {
        setSacredPause(true);
        setIsConvoComplete(true);
        if (onGlassChange) onGlassChange(false);
        // Do NOT set onChatActive(false) yet, we want to keep the UI for the sacred pause
        if (onGeneratingReport) onGeneratingReport(true);
        
        const reportPromise = fetch('/api/spiritual', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action: 'generate_report', userState: state, conversationHistory: history }),
        }).then(async r => {
            if (r.status === 401) {
                // Return success false but unauthorized to handle blurring on Page 2
                return { success: false, error: 'Unauthorized' };
            }
            return r.json();
        }).catch(e => { console.error('Report failed', e); return { success: false }; });
        
        setTimeout(async () => {
            const res = await reportPromise;

            const finalStateData = { 
                ...state, 
                report: res?.data?.report || null, 
                recommendedProducts: res?.data?.products || [], 
                exchangeHistory: history,
                decodingProgress: 100,
                isUnauthorized: res?.error === 'Unauthorized'
            };
            
            setUserState(finalStateData);
            try { localStorage.setItem('spiritualAiState', JSON.stringify(finalStateData)); } catch (_) { }
            
            if (onGeneratingReport) onGeneratingReport(false);
            
            // Final state sync
            setIsConvoComplete(true);
            
            // Start transition
            setIsTransitioning(true);
            setTimeout(() => {
                setShowChat(false);
                if (onChatActive) onChatActive(false);
                if (onComplete) onComplete(finalStateData);
                
                // Clear local typing/chat state
                setRound(0);
                setMessages([]);
                
                // Scroll to report
                const page2 = document.getElementById('report-section');
                if (page2) {
                    page2.scrollIntoView({ behavior: 'smooth', block: 'start' });
                } else {
                    // Fallback scroll
                    window.scrollTo({ top: window.innerHeight * 1.05, behavior: 'smooth' });
                }
            }, 800);
        }, 3000);
    };

    // Watch for sign-in during the process - Logic removed, now handled by report component
    useEffect(() => {
        if (isConvoComplete && !sacredPause && !showChat) {
            // Flow complete
        }
    }, [isConvoComplete, sacredPause, showChat]);

    const updateStateWithTracking = (answer: string, currentState: UserState): UserState => {
        const now = Date.now();
        const responseTime = now - (currentState.tracking?.lastMessageTimestamp || now);
        
        return {
            ...currentState,
            tracking: {
                ...currentState.tracking,
                responseTimeMillis: [...(currentState.tracking?.responseTimeMillis || []), responseTime],
                lastMessageTimestamp: now,
                // These metrics are now handled by the server response in handleResponse
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
            // Just use isTyping for visual feedback instead of adding a dummy message
            setIsTyping(true);
            await new Promise(r => setTimeout(r, 500));
        }
        const updatedHistory = [...conversationHistory, { role: 'user', content: text }];
        await sendToAI(text, newState.chipSelected, newState, updatedHistory, round);
        // Note: round and completion check are handled inside sendToAI
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
        // Note: completion check is handled inside sendToAI
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
            
            // SMOOTH TYPING: First AI message
            setMessages(prev => [...prev, { role: 'ai', content: "", options: [] }]);
            for (let j = 0; j <= q.length; j++) {
                const cur = q.substring(0, j);
                setMessages(prev => { 
                    const n = [...prev]; 
                    if (n.length > 0) n[n.length - 1].content = cur; 
                    return n; 
                });
                await new Promise(r => setTimeout(r, 15)); // Fast, smooth 60fps-like cadence
            }
            setIsTyping(false);

            // Show options after typing
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
        
        // --- PREMIUM VOICE SELECTION ---
        const voices = window.speechSynthesis.getVoices();
        // Priority list for high-quality, human-sounding free voices
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
        u.rate = 0.95; // Slightly slower for "Spiritual Intelligence" feel
        u.volume = 1.0;

        u.onstart = () => setIsAiTalking(true);
        u.onend = () => { 
            setIsAiTalking(false); 
            if (isLiveMode && !isConvoComplete) {
                // Short delay before listening again to avoid AI hearing itself
                setTimeout(() => toggleListening(), 400); 
            }
        };
        window.speechSynthesis.speak(u);
    };

    return (
        <div className={`${styles.mbtiContainer} ${showChat ? styles.chatActive : ''}`}>

            <AnimatePresence>
                {showAuthGate && (
                    <AuthGate 
                        onClose={() => setShowAuthGate(false)} 
                        mode="signup"
                    />
                )}
            </AnimatePresence>

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
                    {showPromptPopup && !hidePopup && (
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
                                    <span>{userState.decodingProgress}% IDENTIFIED</span>
                                </div>
                                <div className={styles.progressBarTrack}>
                                    <div 
                                        className={styles.progressBarFill} 
                                        style={{ width: `${userState.decodingProgress}%` }}
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
                                        <SacredStatus />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </AnimatePresence>

                {!isTransitioning && (
                    <form 
                        className={`${styles.gradientFlowBtn} cta-message-box`} 
                        onSubmit={handleSubmit} 
                        onClick={() => { if (!showChat) handleInputFocus(); }}
                        style={{ position: 'relative', pointerEvents: 'auto', zIndex: 2000 }}
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
                                    if (val && userState.birthTime && userState.birthPlace) {
                                        // Auto-submit if all 3 are filled
                                    }
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
                    ) : isConvoComplete ? (<div style={{ flex: 1, display: 'flex', alignItems: 'center' }}><SacredStatus /></div>) : (
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
