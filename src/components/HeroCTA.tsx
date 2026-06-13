"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';
import { X, Volume2 } from 'lucide-react';
import { playOmSound } from '../utils/audio';
import styles from './HeroCTA.module.css';
import dynamic from 'next/dynamic';
import VoiceVisualizer from './artistic/VoiceVisualizer';

const EyeComponent = dynamic(() => import('./artistic/EyeComponent'), { ssr: false });
import { useUser } from '@clerk/nextjs';
import { UserState } from '../lib/spiritual-conversation-engine';

// ─── Types ───────────────────────────────────────────────────
interface ChatMessage {
    role: 'user' | 'ai';
    content: string;
    contextLine?: string;
    options?: { text: string; subLabel: string; whisper?: string }[];
    type?: 'question' | 'final_share';
    inputType?: 'options' | 'freetext' | 'date';
}

const DEFAULT_USER_STATE: UserState = {
    chipSelected: 'typed',
    firstAnswer: '',
    gender: 'unknown',
    ageRange: 'unknown',
    lifeStage: 'THE AWAKENING',
    birthDate: undefined,
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
    monetizableProblem: null,
    jungianArchetype: undefined,
    hawkinsLevel: undefined,
    patternConfidence: 0,
    decodingProgress: 0,
    unconsciousPatterns: [],
    triggerWords: [],
    budget: 'unknown',
    questionCount: 0,
    exchangeHistory: [],
    finalShare: null,
    interestScore: 50,
    estimatedTargetQuestions: 10,
    sessionConfig: {
      targetQuestions: 10,
      maxQuestions: 18,
      pacingMode: 'deep',
    },
    identifiedLayers: {
        scoringDimensions: { pattern: 0, problem: 0, mbti: 0, jungian: 0, loc: 0, vedic: 0 }
    },
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
    report: null,
    recommendedProducts: [],
    csn: undefined,
    vedicDeclined: undefined,
    forcedQuestionsAsked: [],
};

const STRUGGLES = ["Peace", "Abundance", "Love", "Energy", "Purpose", "Clarity"];

const LANGUAGE_MAP: Record<string, { label: string; sub: string; q: string; autoSkip?: boolean }> = {
    'Asia/Kolkata': { label: 'Hindi', sub: 'हिंदी', q: 'किस भाषा में वार्तालाप करें?' },
    'Asia/Shanghai': { label: 'Chinese', sub: '中文', q: '您想使用哪种语言？' },
    'Asia/Hong_Kong': { label: 'Chinese', sub: '中文', q: '您想使用哪种语言？' },
    'Europe/Paris': { label: 'French', sub: 'Français', q: 'Quelle langue préférez-vous?' },
    'Europe/Berlin': { label: 'German', sub: 'Deutsch', q: 'Welche Sprache bevorzugen Sie?' },
    'Europe/Madrid': { label: 'Spanish', sub: 'Español', q: '¿Qué idioma prefiere?' },
    'Asia/Tokyo': { label: 'Japanese', sub: '日本語', q: 'どの言語でデコードしますか？' },
    'America/New_York': { label: 'English', sub: 'Default', q: '', autoSkip: true },
    'America/Chicago': { label: 'English', sub: 'Default', q: '', autoSkip: true },
    'America/Denver': { label: 'English', sub: 'Default', q: '', autoSkip: true },
    'America/Los_Angeles': { label: 'English', sub: 'Default', q: '', autoSkip: true },
    'Europe/London': { label: 'English', sub: 'Default', q: '', autoSkip: true },
    'Australia/Sydney': { label: 'English', sub: 'Default', q: '', autoSkip: true },
    'default': { label: 'English', sub: 'Default', q: '', autoSkip: true }
};

export default function HeroCTA({ 
    onComplete, 
    onChatActive, 
    onRoundChange,
    onGeneratingReport,
    lastReadArchitecture,
    onGlassChange
}: { 
    onComplete?: (state: any) => void, 
    onChatActive?: (active: boolean) => void, 
    onRoundChange?: (round: number) => void,
    onGeneratingReport?: (generating: boolean) => void,
    lastReadArchitecture?: string | null,
    onGlassChange?: (active: boolean) => void
}) {
    const { isSignedIn } = useUser();
    const [inputValue, setInputValue] = useState("");
    const [showChat, setShowChat] = useState(false);
    const [messages, setMessages] = useState<ChatMessage[]>([]);
    const [isTyping, setIsTyping] = useState(false);
    const [round, setRound] = useState(0);
    const [conversationHistory, setConversationHistory] = useState<{ role: string; content: string }[]>([]);
    const [userState, setUserState] = useState<UserState>(DEFAULT_USER_STATE);
    const [sacredPause, setSacredPause] = useState(false);
    const [isHandover, setIsHandover] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [insightTrigger, setInsightTrigger] = useState(0);
    const [isInteractiveMode, setIsInteractiveMode] = useState(false);
    const [userEmotion, setUserEmotion] = useState(50); // 0 (Red) to 100 (Green)
    const [showExitWarning, setShowExitWarning] = useState(false);
    const [emailCaptured, setEmailCaptured] = useState(false);
    const [showEmailCapture, setShowEmailCapture] = useState(false);
    const [emailValue, setEmailValue] = useState("");
    const [reportGenerated, setReportGenerated] = useState(false);
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
    const decodedCount = 14847;
    void decodedCount;
    const [placeholderText, setPlaceholderText] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);
    const chatThreadRef = useRef<HTMLDivElement>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);
    const hasPlayedSoundRef = useRef(false);

    const playOnce = () => {
        if (!hasPlayedSoundRef.current) {
            playOmSound();
            hasPlayedSoundRef.current = true;
        }
    };

    // Initial greeting typing effect for placeholder
    useEffect(() => {
        if (showChat) {
            setPlaceholderText("Ask anything...");
            return;
        }

        const getGreeting = () => {
            const hour = new Date().getHours();
            if (hour < 5) return "Good night";
            if (hour < 12) return "Good morning";
            if (hour < 17) return "Good afternoon";
            if (hour < 21) return "Good evening";
            return "Good night";
        };

        const greeting = `${getGreeting()}, Welcome to Spiritual AI. Click here to begin chat...`;
        let currentIndex = 0;
        let isCancelled = false;

        const typeWriter = () => {
            if (isCancelled) return;
            if (currentIndex <= greeting.length) {
                setPlaceholderText(greeting.substring(0, currentIndex));
                currentIndex++;
                setTimeout(typeWriter, 50);
            } else {
                // Blink cursor effect at the end
                setTimeout(() => {
                    if (!isCancelled) setPlaceholderText(greeting + "|");
                }, 400);
                setTimeout(() => {
                    if (!isCancelled) setPlaceholderText(greeting);
                }, 800);
            }
        };

        const startTimeout = setTimeout(typeWriter, 800);

        return () => {
            isCancelled = true;
            clearTimeout(startTimeout);
        };
    }, [showChat]);

    // Initialize TTS voices
    useEffect(() => {
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            if (voices.length > 0) setAvailableVoices(voices);
        };
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }, []);

    // Auto-scroll to bottom
    useEffect(() => {
        if (chatThreadRef.current) chatThreadRef.current.scrollTop = chatThreadRef.current.scrollHeight;
    }, [messages, isTyping]);

    // Parallax for Background Eye
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const eyeX = useTransform(mouseX, [0, 1920], [-40, 40]);
    const eyeY = useTransform(mouseY, [0, 1080], [-30, 30]);

    useEffect(() => {
        setMounted(true);
        if (onChatActive) onChatActive(showChat);
        const handleMove = (e: MouseEvent) => { mouseX.set(e.clientX); mouseY.set(e.clientY); };
        
        // Global focus listener: Auto-focus message box when typing anywhere
        const handleGlobalKeyDown = (e: KeyboardEvent) => {
            if (showChat && document.activeElement?.tagName !== 'INPUT' && document.activeElement?.tagName !== 'TEXTAREA') {
                if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
                    inputRef.current?.focus();
                }
            }
        };

        window.addEventListener('mousemove', handleMove);
        window.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            window.removeEventListener('mousemove', handleMove);
            window.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [showChat, onChatActive, mouseX, mouseY]);

    const getMagicalOpening = () => {
        const hour = new Date().getHours();
        const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        const langInfo = LANGUAGE_MAP[timeZone] || LANGUAGE_MAP['default'];
        
        let timeDesc = "at this exact moment";
        let cultureVibe = "Welcome.";
        
        if (hour >= 5 && hour < 12) {
            timeDesc = "morning";
            cultureVibe = "Good morning.";
        } else if (hour >= 12 && hour < 17) {
            timeDesc = "afternoon";
            cultureVibe = "Good afternoon.";
        } else if (hour >= 17 && hour < 21) {
            timeDesc = "evening";
            cultureVibe = "Good evening.";
        } else {
            timeDesc = "night";
            cultureVibe = "The night reveals what the day hides.";
        }

        const greeting = langInfo.autoSkip 
            ? `${cultureVibe} Tell me what's blocking you — and I'll help you break through it. To give you the most accurate reading, what's your date of birth?`
            : `${cultureVibe} Tell me what's blocking you — and I'll help you break through it. To give you the most accurate reading, what's your date of birth?\n\nChoose your language to begin.`;
        
        const options = langInfo.autoSkip ? [] : [
            { text: "English", subLabel: "Universal vibration" },
            { text: langInfo.label, subLabel: langInfo.sub }
        ].filter((o, i, a) => o.text !== "English" || a.findIndex(t => t.text === "English") === i);

        if (!langInfo.autoSkip && options.length === 1) {
             options.push({ text: "Hindi", subLabel: "हिंदी" }, { text: "Spanish", subLabel: "Español" });
        }

        return { greeting, options, autoSkip: langInfo.autoSkip };
    };

    const CHALLENGES = [
        { id: "purpose", label: "Purpose & Direction", subLabel: "Feeling lost or stuck" },
        { id: "love", label: "Love & Relationships", subLabel: "Connection struggles" },
        { id: "career", label: "Career & Money", subLabel: "Financial or work blocks" },
        { id: "self", label: "Self-Worth & Identity", subLabel: "Not feeling enough" },
        { id: "energy", label: "Energy & Health", subLabel: "Burnout or exhaustion" },
        { id: "peace", label: "Inner Peace", subLabel: "Anxiety or overthinking" },
    ];

    const CHALLENGE_SUBOPTIONS: Record<string, { text: string; subLabel: string }[]> = {
        purpose: [
            { text: "I feel lost", subLabel: "No clear direction in life" },
            { text: "I don't know what I should do next", subLabel: "Paralyzed by choices" },
            { text: "I have goals but no clarity", subLabel: "Can't see the path forward" },
            { text: "I feel disconnected from myself", subLabel: "Lost touch with who I am" },
        ],
        love: [
            { text: "I can't find the right person", subLabel: "Dating feels hopeless" },
            { text: "I keep attracting the wrong people", subLabel: "Same toxic patterns repeat" },
            { text: "I feel alone even in a relationship", subLabel: "Emotionally disconnected" },
            { text: "I'm afraid of being vulnerable", subLabel: "Walls up, can't let anyone in" },
        ],
        career: [
            { text: "I hate my job but I'm stuck", subLabel: "Fear keeps me trapped" },
            { text: "I don't know what I'm good at", subLabel: "No confidence in my skills" },
            { text: "I'm not making enough money", subLabel: "Financial stress is constant" },
            { text: "I procrastinate everything", subLabel: "Can't seem to take action" },
        ],
        self: [
            { text: "I never feel good enough", subLabel: "Constant self-doubt" },
            { text: "I compare myself to everyone", subLabel: "Never measure up" },
            { text: "I don't know who I really am", subLabel: "Lost my sense of self" },
            { text: "I seek approval from others", subLabel: "Can't validate myself" },
        ],
        energy: [
            { text: "I'm always exhausted", subLabel: "No energy for anything" },
            { text: "I can't sleep properly", subLabel: "Mind won't shut off" },
            { text: "I've lost motivation for everything", subLabel: "Nothing excites me anymore" },
            { text: "My body feels heavy and slow", subLabel: "Physical fatigue won't go away" },
        ],
        peace: [
            { text: "My mind never stops racing", subLabel: "Constant overthinking" },
            { text: "I feel anxious all the time", subLabel: "Can't relax or feel safe" },
            { text: "I'm haunted by my past", subLabel: "Old wounds still hurt" },
            { text: "I can't control my emotions", subLabel: "Everything feels overwhelming" },
        ],
    };

    // Track which screen we're on: 'challenge' | 'suboptions' | 'conversation'
    const [ritualScreen, setRitualScreen] = useState<'challenge' | 'suboptions' | 'conversation'>('challenge');
    const [selectedChallenge, setSelectedChallenge] = useState<string | null>(null);

    const startRitual = async (struggle?: string) => {
        playOnce();
        setShowChat(true);
        setRitualScreen('challenge');
        setSelectedChallenge(null);

        // Screen 1: Ask the biggest challenge question
        const screen1Question = "What is the biggest challenge in your life right now?";
        const challengeOptions = CHALLENGES.map(c => ({ text: c.label, subLabel: c.subLabel }));

        setIsTyping(true);
        setMessages([{ role: 'ai', content: '' }]);

        // Type out the question
        for (let i = 0; i <= screen1Question.length; i++) {
            setMessages([{ role: 'ai', content: screen1Question.substring(0, i) }]);
            await new Promise(r => setTimeout(r, 12));
        }

        // Show options
        setMessages([{ role: 'ai', content: screen1Question, options: challengeOptions, inputType: 'options' }]);
        setConversationHistory([{ role: 'ai', content: screen1Question }]);
        setIsTyping(false);
    };

    const handleChallengeSelect = async (challengeId: string, challengeLabel: string) => {
        if (isTyping || sacredPause) return;
        playOnce();

        setSelectedChallenge(challengeId);
        setRitualScreen('suboptions');

        // Show user's selection
        const currentMsgs = [...messages, { role: 'user' as const, content: challengeLabel }];
        setMessages(currentMsgs);

        // Screen 2: Ask "Which describes you best?"
        const screen2Question = "Which describes you best?";
        const subOptions = CHALLENGE_SUBOPTIONS[challengeId] || [];

        await new Promise(r => setTimeout(r, 400));
        setIsTyping(true);

        // Type out the question
        const msgsWithQuestion = [...currentMsgs, { role: 'ai' as const, content: '' }];
        setMessages(msgsWithQuestion);
        for (let i = 0; i <= screen2Question.length; i++) {
            setMessages([...currentMsgs, { role: 'ai' as const, content: screen2Question.substring(0, i) }]);
            await new Promise(r => setTimeout(r, 12));
        }

        // Show sub-options
        setMessages([...currentMsgs, { role: 'ai', content: screen2Question, options: subOptions, inputType: 'options' }]);
        setConversationHistory([...currentMsgs, { role: 'ai', content: screen2Question }]);
        setIsTyping(false);
    };

    const handleSuboptionSelect = async (suboptionText: string) => {
        if (isTyping || sacredPause) return;
        playOnce();

        setRitualScreen('conversation');

        // Show user's selection
        const currentMsgs = [...messages, { role: 'user' as const, content: suboptionText }];
        setMessages(currentMsgs);
        setConversationHistory([...currentMsgs]);

        // Now start the real conversation with the API
        const updatedState = {
            ...DEFAULT_USER_STATE,
            chipSelected: selectedChallenge || 'unknown',
            firstAnswer: suboptionText,
            questionCount: 0,
        };
        setUserState(updatedState);

        // Send to API for deep analysis
        await sendToAI(suboptionText, currentMsgs, updatedState);
    };

    const getProgressLabel = (progress: number): string => {
        if (progress >= 75) return "Generating your blueprint now...";
        if (progress >= 50) return "Architecture locked. Almost there.";
        if (progress >= 25) return "Shadow detected — keep going";
        return "Pattern emerging...";
    };

    const handleStruggleClick = async (struggle: string) => {
        if (isTyping || sacredPause) return;
        playOnce();
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
        let i = 0; setInputValue("");
        const nextChar = () => {
            if (i <= struggle.length) {
                setInputValue(struggle.substring(0, i));
                i++;
                typingIntervalRef.current = setTimeout(nextChar, 30);
            } else {
                setTimeout(() => { setInputValue(""); startRitual(struggle); }, 300);
            }
        };
        nextChar();
    };

    const handleOptionClick = async (optionText: string) => {
        if (isTyping || sacredPause) return;
        
        // Specific handling for Auth Redirection
        if (optionText === "Sign In to Claim Blueprint") {
            window.location.href = `/login?redirect_url=${encodeURIComponent(window.location.href)}`;
            return;
        }

        // Retry saving blueprint — re-call saveAndRedirect with the last known state
        if (optionText === "Retry Saving Blueprint") {
            playOnce();
            setMessages(prev => [...prev, { role: 'user', content: optionText }]);
            setTimeout(() => saveAndRedirect(userState), 500);
            return;
        }

        // Route based on current ritual screen
        if (ritualScreen === 'challenge') {
            const challenge = CHALLENGES.find(c => c.label === optionText);
            if (challenge) {
                await handleChallengeSelect(challenge.id, challenge.label);
            }
            return;
        }

        if (ritualScreen === 'suboptions') {
            await handleSuboptionSelect(optionText);
            return;
        }

        // Conversation mode — normal API flow
        playOnce();
        const updatedHistory = [...conversationHistory, { role: 'user', content: optionText }];
        setMessages(prev => [...prev, { role: 'user', content: optionText }]);
        setConversationHistory(updatedHistory);
        await sendToAI(optionText, updatedHistory);
    };

    const speakChaitanya = (text: string) => {
        if (!isInteractiveMode || typeof window === 'undefined') return;
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        if (availableVoices[selectedVoiceIndex]) utterance.voice = availableVoices[selectedVoiceIndex];
        utterance.rate = 0.95;
        utterance.pitch = 1.0;
        window.speechSynthesis.speak(utterance);
    };

    const sendToAI = async (text: string, history: any[], stateOverride?: UserState) => {
        setIsTyping(true);
        const currentState = stateOverride || userState;
        try {
            // Retry logic for rate limits (429) — up to 3 retries with server-specified wait
            let res: Response | null = null;
            let data: any = null;
            const maxRetries = 3;
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                res = await fetch('/api/spiritual', { 
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' }, 
                    body: JSON.stringify({ 
                        action: 'process_answer', 
                        userState: currentState, 
                        conversationHistory: history, 
                        userAnswer: text 
                    }) 
                });
                data = await res.json();
                if (res.status === 429 && data.isRateLimit && attempt < maxRetries) {
                    const waitMs = data.retryAfterMs || 5000;
                    console.warn(`[HeroCTA] Rate limited. Waiting ${Math.ceil(waitMs/1000)}s before retry ${attempt+1}/${maxRetries}...`);
                    // Show user-facing "waiting" message
                    setMessages(prev => [...prev, { role: 'ai', content: `⏳ High demand — reconnecting in ${Math.ceil(waitMs/1000)}s...`, options: [] }]);
                    await new Promise(r => setTimeout(r, waitMs + 500));
                    // Remove the waiting message before retrying
                    setMessages(prev => prev.slice(0, -1));
                    continue;
                }
                break;
            }
            if (!data || !data.success || !data.data) {
                throw new Error(data?.error || 'AI response failed');
            }
            const aiData = data.data;
            if (aiData.emotionScore !== undefined) setUserEmotion(aiData.emotionScore);
            
            const transmission = aiData.mirroringLine ? `${aiData.mirroringLine}\n\n${aiData.question}` : (aiData.question || "Continue...");
            const prevPillars = Object.values(currentState.identifiedLayers?.scoringDimensions || {}).filter((v: any) => v >= 78).length;
            const nextPillars = Object.values(aiData.identifiedLayers?.scoringDimensions || {}).filter((v: any) => (v as number) >= 78).length;
            if (nextPillars > prevPillars) setInsightTrigger(prev => prev + 1);
            
            setMessages(prev => [...prev, { role: 'ai', content: "", options: [], inputType: aiData.inputType || 'options' }]);
            
            // Speak if in interactive mode
            speakChaitanya(transmission);

            for (let j = 0; j <= transmission.length; j++) {
                setMessages(prev => { const n = [...prev]; n[n.length - 1].content = transmission.substring(0, j); return n; });
                await new Promise(r => setTimeout(r, 15));
            }
            setMessages(prev => { const n = [...prev]; n[n.length - 1].options = aiData.options || []; n[n.length - 1].inputType = aiData.inputType || 'options'; return n; });
            setConversationHistory([...history, { role: 'ai', content: transmission }]);
            const responseRound = aiData.questionCount || (currentState.questionCount || 0) + 1;
            setRound(responseRound);
            if (onRoundChange) onRoundChange(responseRound);
            setUserState(prev => ({ ...prev, ...aiData, questionCount: responseRound }));

            // Trigger email capture at 50% progress
            if (aiData.decodingProgress >= 50 && !emailCaptured && !showEmailCapture) {
                setShowEmailCapture(true);
            }

            if (aiData.decodingProgress >= 100) {
                if (onGeneratingReport) onGeneratingReport(true);
                // Capture aiData in a local variable so the setTimeout callback
                // uses the fresh API response, not the stale userState
                const finalState = aiData;
                console.log('[HeroCTA] Conversation complete. Report present:', !!finalState.report, 'Products:', finalState.recommendedProducts?.length || 0);
                setTimeout(() => {
                    setIsHandover(true);
                    // Save to blockplain and redirect to report page
                    saveAndRedirect(finalState);
                }, 2000);
            }
        } catch (err) { console.error(err); } finally { setIsTyping(false); }
    };

    const saveAndRedirect = async (state: any) => {
        try {
            console.log('[HeroCTA] Initiating blueprint save. Signed in:', isSignedIn);
            console.log('[HeroCTA] State has report:', !!state.report, 'products:', state.recommendedProducts?.length || 0, 'csn:', state.csn);
            
            // The report and products are already generated by the spiritual engine
            // in the last sendToAI response (when decodingProgress hit 100)
            const report = state.report || null;
            const products = state.recommendedProducts || [];

            if (!report) {
                console.error('[HeroCTA] No report in state — cannot save blueprint');
            }

            // Save to blockplain
            const saveRes = await fetch('/api/blockplain/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userState: state,
                    report,
                    products,
                }),
            });
            
            const saveData = await saveRes.json();
            console.log('[HeroCTA] Save API response status:', saveRes.status, 'success:', saveData.success);
            
            if (saveData.success && saveData.data?.csn) {
                const csn = saveData.data.csn;
                console.log('[HeroCTA] Save successful. Redirecting to:', `/blueprint/${csn}`);
                // Redirect to the standalone blueprint report page
                window.location.href = `/blueprint/${encodeURIComponent(csn)}`;
            } else {
                console.error('[HeroCTA] Blockplain save failed. Full response:', JSON.stringify(saveData));
                
                // Show error in chat — do NOT fall back to inline report scroll
                const errorMsg = saveData.error || 'An unknown error occurred while saving your blueprint.';
                setMessages(prev => [...prev, { 
                    role: 'ai', 
                    content: `⚠️ Could not save your Consciousness Blueprint: ${errorMsg}. Would you like to try again?`,
                    options: [{ text: "Retry Saving Blueprint", subLabel: "Attempt to save again" }]
                }]);
                
                setIsHandover(false);
                if (onGeneratingReport) onGeneratingReport(false);
            }
        } catch (err: any) {
            console.error('[HeroCTA] Save and redirect error:', err.message, err);
            // Show error in chat — do NOT fall back to inline report scroll
            setMessages(prev => [...prev, { 
                role: 'ai', 
                content: `⚠️ Connection error while saving your blueprint: ${err.message}. Please check your connection and try again.`,
                options: [{ text: "Retry Saving Blueprint", subLabel: "Attempt to save again" }]
            }]);
            setIsHandover(false);
            if (onGeneratingReport) onGeneratingReport(false);
        }
    };

    const handleEarlyReport = async () => {
        if ((userState.decodingProgress || 0) < 33) return;
        
        // Check if there is "something to show" (at least one dimension has some confidence)
        const dimensions = userState.identifiedLayers?.scoringDimensions || {};
        const hasData = Object.values(dimensions).some((v: any) => v > 20);
        
        if (!hasData) {
            setMessages(prev => [...prev, { role: 'ai', content: "I'm still forming the initial patterns of your consciousness. Answer a few more questions so I have a solid foundation for your report." }]);
            return;
        }

        setIsTyping(true);
        if (onGeneratingReport) onGeneratingReport(true);
        
        try {
            const res = await fetch('/api/spiritual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    action: 'generate_report',
                    userState: userState,
                    conversationHistory: conversationHistory,
                })
            });
            const data = await res.json();
            if (data.success && data.data) {
                const finalState = {
                    ...userState,
                    ...data.data,
                    recommendedProducts: data.data.products || []
                };
                setIsHandover(true);
                saveAndRedirect(finalState);
            } else {
                throw new Error(data.error || 'Early report generation failed');
            }
        } catch (err) {
            console.error(err);
            setIsTyping(false);
            if (onGeneratingReport) onGeneratingReport(false);
            setMessages(prev => [...prev, { role: 'ai', content: "I need a few more answers before I can finalize your blueprint. Let's continue." }]);
        }
    };

    const handleContainerClick = () => {
        if (!showChat) {
            startRitual();
        } else if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    if (!mounted) return null;

    return (
        <div className={`${styles.mbtiContainer} ${showChat ? styles.chatActive : ''}`}>
            <AnimatePresence>
                {isHandover && (
                    <div className={styles.handoverOverlay}>
                        <div className={styles.handoverText}>The decoding is complete. Your Blueprint has been etched.</div>
                    </div>
                )}
            </AnimatePresence>

            <div className={styles.buttonGroup}>
              {!showChat && (
                <div style={{ width: '100%', position: 'relative', minHeight: '40px' }}>
                  <div className={styles.topMetaContainer}>
                    <div className={styles.ctaPromptText}>Talk to Intelligence below ↓<br/>It will guide you step-by-step</div>
                    <div className={styles.staticCounter}>
                      No real shift in 21 days? Full refund.<br/>No questions asked. We only win when you do.
                    </div>
                  </div>
                </div>
              )}

              <AnimatePresence>
                {showChat && (                        <div className={isHandover ? styles.handoverActive : ''}>
                            <div className={styles.topHeader}>
                                <div className={styles.progressModule}>
                                    <div className={styles.progressLabel}>
                                        <span>CONSCIOUSNESS DECODING</span>
                                        <span>{Math.round(userState.decodingProgress || 0)}% {getProgressLabel(userState.decodingProgress || 0)}</span>
                                    </div>
                                    <div className={styles.progressBarTrack}><div className={styles.progressBarFill} style={{ width: `${userState.decodingProgress || 0}%` }} /></div>
                                </div>
                                <div className={styles.pillarsModule} style={{ position: 'relative' }}>
                                    <div className={styles.pillarsContainer}>
                                        {[
                                            { id: 'pattern', label: 'Pattern' },
                                            { id: 'problem', label: 'Problem' },
                                            { id: 'mbti', label: 'MBTI' },
                                            { id: 'jungian', label: 'Shadow' },
                                            { id: 'loc', label: 'Consciousness' },
                                            { id: 'vedic', label: 'Vedic' }
                                        ].map((pillar) => {
                                            const confidence = (userState.identifiedLayers?.scoringDimensions as any)?.[pillar.id] || 0;
                                            const isActive = confidence >= 78;
                                            return (
                                                <div key={pillar.id} className={styles.pillarWrapper}>
                                                    <div className={styles.confidenceMiniBar}>
                                                        <div className={styles.confidenceMiniFill} style={{ width: `${confidence}%`, background: '#35f8ff' }} />
                                                    </div>
                                                    <span className={styles.pillarLabel}>{pillar.label}</span>
                                                    {isActive && userState.identifiedLayers?.proofs?.[pillar.id] && (
                                                        <div className={styles.proofTooltip}>
                                                            <div style={{ color: '#35f8ff', fontSize: '0.6rem', fontWeight: 700, marginBottom: '4px' }}>IDENTIFIED VIA:</div>
                                                            {userState.identifiedLayers.proofs[pillar.id]}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                    
                                    <button 
                                        className={styles.earlyReportBtn}
                                        onClick={handleEarlyReport}
                                        disabled={(userState.decodingProgress || 0) < 33 || isTyping}
                                        style={{ 
                                            opacity: (userState.decodingProgress || 0) < 33 ? 0.3 : 1,
                                            cursor: (userState.decodingProgress || 0) < 33 ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {(userState.decodingProgress || 0) < 33 ? "MIN. 33% NEEDED" : "GENERATE REPORT NOW"}
                                    </button>
                                </div>
                            </div>

                            <motion.div ref={chatThreadRef} className={styles.chatThread} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                                <motion.div 
                                    className={styles.backgroundEye} 
                                    style={{ 
                                        x: eyeX, y: eyeY,
                                        opacity: isInteractiveMode ? 1 : 0.4,
                                        scale: isInteractiveMode ? 1.2 : 1
                                    }}
                                >
                                    <EyeComponent isThinking={isTyping} insight={insightTrigger} emotion={userEmotion} />
                                    
                                    {/* Emotion Spectrum Bar (Red to Green) */}
                                    <div style={{
                                        position: 'absolute',
                                        bottom: '-40px',
                                        left: '50%',
                                        transform: 'translateX(-50%)',
                                        width: '140px',
                                        height: '8px',
                                        background: 'linear-gradient(90deg, #ff3333 0%, #ffcc00 50%, #33ff77 100%)',
                                        borderRadius: '4px', // Sharper corners
                                        border: '1px solid rgba(255,255,255,0.3)',
                                        overflow: 'hidden',
                                        boxShadow: '0 2px 10px rgba(0,0,0,0.8)'
                                    }}>
                                        <motion.div 
                                            animate={{ left: `${userEmotion}%` }}
                                            transition={{ type: 'spring', stiffness: 50 }}
                                            style={{
                                                position: 'absolute',
                                                top: 0,
                                                width: '6px',
                                                height: '100%',
                                                background: '#fff',
                                                boxShadow: '0 0 10px #fff',
                                                zIndex: 2
                                            }}
                                        />
                                    </div>
                                    <div style={{ position: 'absolute', bottom: '-60px', left: '50%', transform: 'translateX(-50%)', fontSize: '0.6rem', color: 'rgba(255,255,255,0.6)', textTransform: 'uppercase', letterSpacing: '2px', fontWeight: 700 }}>
                                        Vibration Sync
                                    </div>
                                </motion.div>
                                <button className={styles.closeChatBtn} onClick={() => {
                                    if (userState.decodingProgress > 20 && !reportGenerated && !emailCaptured) {
                                        setShowExitWarning(true);
                                    } else {
                                        setShowChat(false);
                                    }
                                }}><X size={20} /></button>
                                
                                {/* Voice Selector Dropdown (Fixed during chat) */}
                                {isInteractiveMode && (
                                    <div style={{ position: 'fixed', top: '100px', right: '40px', zIndex: 9999, display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(5,5,10,0.8)', padding: '8px 12px', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                                        <Volume2 size={14} color="#00e5ff" />
                                        <select 
                                            value={selectedVoiceIndex} 
                                            onChange={(e) => setSelectedVoiceIndex(parseInt(e.target.value))}
                                            style={{ background: 'transparent', border: 'none', color: '#fff', fontSize: '0.7rem', outline: 'none', maxWidth: '120px' }}
                                        >
                                            {availableVoices.map((v, i) => (
                                                <option key={i} value={i} style={{ background: '#111' }}>{v.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                )}

                                {messages.map((msg, idx) => (
                                    <motion.div key={idx} className={`${styles.messageRow} ${msg.role === 'ai' ? styles.aiRow : styles.userRow}`} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                                        <div className={`${styles.chatBubble} ${msg.role === 'ai' ? styles.aiBubble : styles.userBubble}`}>{msg.content}</div>
                                        {/* Show option buttons only for inputType="options" */}
                                        {msg.options && msg.inputType !== 'freetext' && msg.inputType !== 'date' && idx === messages.length - 1 && !isTyping && (
                                            <div className={(round === 0) ? styles.verticalOptions : styles.optionsMarqueeContainer}>
                                                <div className={(round === 0) ? "" : styles.optionsMarqueeTrack}>
                                                    {msg.options.map((opt, oi) => (
                                                        <motion.button 
                                                            key={oi} 
                                                            className={(round === 0) ? styles.optionCard : styles.optionBubble} 
                                                            onClick={() => handleOptionClick(opt.text)} 
                                                            initial={{ opacity: 0, y: 15 }} 
                                                            animate={{ opacity: 1, y: 0 }} 
                                                            transition={{ delay: (oi % msg.options!.length) * 0.1, duration: 0.6 }}
                                                        >
                                                            {(round === 0) ? (
                                                                <>
                                                                    <div className={styles.optionTitle}>{opt.text}</div>
                                                                    {opt.subLabel && <div className={styles.optionSublabel}>{opt.subLabel}</div>}
                                                                </>
                                                            ) : (
                                                                <span style={{ fontWeight: 500 }}>{opt.text}</span>
                                                            )}
                                                        </motion.button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                        {/* Show date picker for inputType="date" */}
                                        {msg.inputType === 'date' && idx === messages.length - 1 && !isTyping && (
                                            <div style={{ marginTop: '12px', display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                                                <input
                                                    type="date"
                                                    ref={inputRef}
                                                    className={styles.dateInput}
                                                    style={{
                                                        background: 'rgba(255,255,255,0.05)',
                                                        border: '1px solid rgba(53, 248, 255, 0.3)',
                                                        borderRadius: '8px',
                                                        padding: '8px 12px',
                                                        color: '#fff',
                                                        fontSize: '0.85rem',
                                                        fontFamily: 'JetBrains Mono, monospace',
                                                        colorScheme: 'dark',
                                                    }}
                                                    onChange={(e) => {
                                                        if (e.target.value) {
                                                            handleOptionClick(e.target.value);
                                                        }
                                                    }}
                                                />
                                                <button
                                                    onClick={() => handleOptionClick('skip')}
                                                    style={{
                                                        background: 'transparent',
                                                        border: '1px solid rgba(255,255,255,0.15)',
                                                        borderRadius: '8px',
                                                        padding: '8px 16px',
                                                        color: 'rgba(255,255,255,0.5)',
                                                        fontSize: '0.75rem',
                                                        cursor: 'pointer',
                                                    }}
                                                >
                                                    Skip for now
                                                </button>
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                                {isTyping && (
                                    <motion.div className={`${styles.messageRow} ${styles.aiRow}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                                        <div className={`${styles.chatBubble} ${styles.aiBubble}`}><div className={styles.typingIndicator}><div className={styles.typingDot}></div><div className={styles.typingDot}></div><div className={styles.typingDot}></div></div></div>
                                    </motion.div>
                                )}
                                <div style={{ height: '20px' }} />
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                <div className={`${styles.gradientFlowBtn} cta-message-box`} onClick={handleContainerClick}>
                    <div className={styles.inputLayout} style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }}>
                        {isInteractiveMode ? (
                            <VoiceVisualizer 
                                isActive={true} 
                                onTranscript={(text, isFinal) => {
                                    setInputValue(text);
                                    if (isFinal && text.trim().length > 2) {
                                        if (!showChat) startRitual(text.trim());
                                        else handleOptionClick(text);
                                        setInputValue("");
                                    }
                                }}
                            />
                        ) : (
                            <form style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }} onSubmit={(e) => {
                                e.preventDefault();
                                const text = inputValue.trim();
                                if (!text) return;
                                setInputValue("");
                                // Before the chat is open, typed text must start the ritual —
                                // handleOptionClick alone appends to a thread that isn't visible yet.
                                if (!showChat) startRitual(text);
                                else handleOptionClick(text);
                            }}>
                                <div className={styles.inputInner}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', paddingLeft: '8px' }}>
                                        <div className={styles.nIcon}>N</div>
                                        <input 
                                            ref={inputRef} 
                                            type="text" 
                                            className={styles.messageInput} 
                                            placeholder={placeholderText || "Ask anything..."}
                                            value={inputValue} 
                                            onChange={(e) => setInputValue(e.target.value)} 
                                            disabled={showChat && (isTyping || sacredPause)} 
                                        />
                                    </div>
                                </div>
                            </form>
                        )}
                        
                        <button 
                            type="button"
                            className={styles.startInteractiveBtn} 
                            style={{ 
                                background: isInteractiveMode ? 'linear-gradient(90deg, #ff4d4d, #9e0091)' : undefined,
                                boxShadow: isInteractiveMode ? '0 0 20px rgba(255, 77, 77, 0.4)' : undefined
                            }}
                            onClick={(e) => { e.stopPropagation(); if(!showChat) startRitual(); setIsInteractiveMode(!isInteractiveMode); }}
                        >
                            <span>{isInteractiveMode ? "Exit Voice Mode" : "Start Interactive Mode"}</span>
                        </button>
                    </div>
                </div>

                {!showChat && (
                  <div className={styles.struggleBubbles} style={{ marginTop: '20px' }}>
                    {STRUGGLES.map((s, idx) => (
                      <button key={idx} className={styles.bubble} onClick={() => handleStruggleClick(s)}>{s}</button>
                    ))}
                  </div>
                )}
            </div>

            {/* Exit Warning Overlay */}
            {showExitWarning && (
                <div style={{
                    position: 'absolute', inset: 0, zIndex: 10001,
                    background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '24px', textAlign: 'center', borderRadius: '16px',
                }}>
                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>⚠️</div>
                    <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, marginBottom: '8px', color: '#fff' }}>
                        Your blueprint will be lost
                    </h3>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '20px', maxWidth: '280px', lineHeight: 1.5 }}>
                        You're {Math.round(userState.decodingProgress)}% through your consciousness blueprint. If you leave now, this progress cannot be recovered.
                    </p>
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
                        <button
                            onClick={() => setShowExitWarning(false)}
                            style={{
                                padding: '10px 24px', background: 'linear-gradient(135deg, #35f8ff, #0080ff)',
                                color: '#0a0a1a', border: 'none', borderRadius: '8px',
                                fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', fontWeight: 700,
                                letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                            }}
                        >
                            Continue Blueprint
                        </button>
                        <button
                            onClick={() => { setShowExitWarning(false); setShowChat(false); }}
                            style={{
                                padding: '10px 24px', background: 'transparent',
                                color: 'rgba(255,255,255,0.5)', border: '1px solid rgba(255,255,255,0.2)',
                                borderRadius: '8px', fontSize: '0.7rem', cursor: 'pointer',
                            }}
                        >
                            Leave Anyway
                        </button>
                    </div>
                </div>
            )}

            {/* Email Capture Overlay at 50% progress */}
            {showEmailCapture && !emailCaptured && (
                <div style={{
                    position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 11000,
                    width: 'min(calc(100vw - 40px), 400px)',
                    background: 'rgba(10, 15, 30, 0.95)', backdropFilter: 'blur(40px)',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    padding: '40px 32px', textAlign: 'center', borderRadius: '24px',
                    border: '1px solid rgba(53, 248, 255, 0.2)',
                    boxShadow: '0 20px 80px rgba(0, 0, 0, 0.8), 0 0 40px rgba(53, 248, 255, 0.1)',
                    pointerEvents: 'auto'
                }}>
                    <div style={{ fontSize: '3rem', marginBottom: '20px', filter: 'drop-shadow(0 0 15px rgba(53, 248, 255, 0.4))' }}>📧</div>
                    <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.2rem', fontWeight: 700, marginBottom: '12px', color: '#fff', letterSpacing: '1px' }}>
                        YOUR BLUEPRINT IS ALMOST READY
                    </h3>
                    <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.7)', marginBottom: '32px', maxWidth: '300px', lineHeight: 1.6 }}>
                        Where should we send your copy? We'll notify you the moment your personalized protocol is etched.
                    </p>
                    <form
                        onSubmit={async (e) => {
                            e.preventDefault();
                            if (!emailValue.trim()) return;
                            try {
                                await fetch('/api/user/profile', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ email: emailValue.trim() }),
                                });
                            } catch { /* non-blocking */ }
                            setEmailCaptured(true);
                            setShowEmailCapture(false);
                        }}
                        style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', justifyContent: 'center', maxWidth: '320px' }}
                    >
                        <input
                            type="email"
                            placeholder="your@email.com"
                            value={emailValue}
                            onChange={(e) => setEmailValue(e.target.value)}
                            required
                            style={{
                                flex: 1, minWidth: '180px', padding: '10px 16px',
                                background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(53, 248, 255, 0.3)',
                                borderRadius: '8px', color: '#fff', fontSize: '0.85rem',
                                outline: 'none',
                            }}
                        />
                        <button
                            type="submit"
                            style={{
                                padding: '10px 20px', background: 'linear-gradient(135deg, #35f8ff, #0080ff)',
                                color: '#0a0a1a', border: 'none', borderRadius: '8px',
                                fontFamily: 'Orbitron, sans-serif', fontSize: '0.7rem', fontWeight: 700,
                                letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer',
                            }}
                        >
                            Save
                        </button>
                    </form>
                    <button
                        onClick={() => setShowEmailCapture(false)}
                        style={{ marginTop: '12px', background: 'none', border: 'none', color: 'rgba(255,255,255,0.3)', fontSize: '0.7rem', cursor: 'pointer' }}
                    >
                        Skip for now
                    </button>
                </div>
            )}
        </div>
    );
}
