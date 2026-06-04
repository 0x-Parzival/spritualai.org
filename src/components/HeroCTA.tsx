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
    const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoiceIndex, setSelectedVoiceIndex] = useState(0);
    const decodedCount = 14847;

    const inputRef = useRef<HTMLInputElement>(null);
    const chatThreadRef = useRef<HTMLDivElement>(null);
    const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

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
            cultureVibe = "The day awakens.";
        } else if (hour >= 12 && hour < 17) {
            timeDesc = "noon";
            cultureVibe = "Clarity is here.";
        } else if (hour >= 17 && hour < 21) {
            timeDesc = "evening";
            cultureVibe = "The twilight reveals.";
        } else {
            timeDesc = "night";
            cultureVibe = "The darkness mirrors.";
        }

        const greeting = langInfo.autoSkip 
            ? `${cultureVibe} Why have you stopped running?`
            : `${cultureVibe} Why have you stopped running?\n\nChoose your language to begin.`;
        
        const options = langInfo.autoSkip ? [] : [
            { text: "English", subLabel: "Universal vibration" },
            { text: langInfo.label, subLabel: langInfo.sub }
        ].filter((o, i, a) => o.text !== "English" || a.findIndex(t => t.text === "English") === i);

        if (!langInfo.autoSkip && options.length === 1) {
             options.push({ text: "Hindi", subLabel: "हिंदी" }, { text: "Spanish", subLabel: "Español" });
        }

        return { greeting, options, autoSkip: langInfo.autoSkip };
    };

    const startRitual = async (struggle?: string) => {
        playOmSound();
        setShowChat(true);
        
        const { greeting: hook, options, autoSkip } = getMagicalOpening();
        const greeting = struggle 
            ? `You seek ${struggle.toLowerCase()}.\n\n${hook}`
            : hook;
            
        setIsTyping(true);
        setMessages([{ role: 'ai', content: "" }]);
        for (let i = 0; i <= greeting.length; i++) {
            setMessages([{ role: 'ai', content: greeting.substring(0, i) }]);
            await new Promise(r => setTimeout(r, 15));
        }

        if (autoSkip) {
            // Wait a moment then ask the first real question from conversation engine
            await new Promise(r => setTimeout(r, 800));
            const firstQuestion = "What area of your life needs transformation: peace, abundance, love, energy, purpose, or clarity?";
            setIsTyping(true);
            const currentMsgs = [{ role: 'ai' as const, content: greeting }];
            setMessages(currentMsgs);
            
            let tempMsg = "";
            for (let i = 0; i <= firstQuestion.length; i++) {
                setMessages([...currentMsgs, { role: 'ai', content: firstQuestion.substring(0, i) }]);
                await new Promise(r => setTimeout(r, 10));
            }
            setMessages([...currentMsgs, { role: 'ai', content: firstQuestion }]);
            setConversationHistory([...currentMsgs, { role: 'ai', content: firstQuestion }]);
        } else {
            setMessages([{ role: 'ai', content: greeting, options }]);
            setConversationHistory([{ role: 'ai', content: greeting }]);
        }
        setIsTyping(false);
    };

    const handleStruggleClick = async (struggle: string) => {
        if (isTyping || sacredPause) return;
        playOmSound();
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
            playOmSound();
            setMessages(prev => [...prev, { role: 'user', content: optionText }]);
            // Re-trigger save with the current userState (which was updated by setUserState)
            setTimeout(() => saveAndRedirect(userState), 500);
            return;
        }

        playOmSound();
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

    const sendToAI = async (text: string, history: any[]) => {
        setIsTyping(true);
        const nextRound = round + 1;
        try {
            // Retry logic for rate limits (429) — up to 3 retries with server-specified wait
            let res: Response | null = null;
            let data: any = null;
            const maxRetries = 3;
            for (let attempt = 0; attempt <= maxRetries; attempt++) {
                res = await fetch('/api/spiritual', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'process_answer', userState: { ...userState, questionCount: nextRound }, conversationHistory: history, userAnswer: text }) });
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
                const prevPillars = Object.values(userState.identifiedLayers?.scoringDimensions || {}).filter((v: any) => v >= 78).length;
                const nextPillars = Object.values(aiData.identifiedLayers?.scoringDimensions || {}).filter((v: any) => (v as number) >= 78).length;
                if (nextPillars > prevPillars) setInsightTrigger(prev => prev + 1);
                
                setMessages(prev => [...prev, { role: 'ai', content: "", options: [] }]);
                
                // Speak if in interactive mode
                speakChaitanya(transmission);

                for (let j = 0; j <= transmission.length; j++) {
                    setMessages(prev => { const n = [...prev]; n[n.length - 1].content = transmission.substring(0, j); return n; });
                    await new Promise(r => setTimeout(r, 15));
                }
                setMessages(prev => { const n = [...prev]; n[n.length - 1].options = aiData.options || []; return n; });
                setConversationHistory([...history, { role: 'ai', content: transmission }]);
                setRound(nextRound);
                if (onRoundChange) onRoundChange(nextRound);
                setUserState(prev => ({ ...prev, ...aiData, questionCount: nextRound }));
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
                <div style={{ width: '100%', position: 'relative' }}>
                  <div className={styles.topMetaContainer}>
                    <div className={styles.ctaPromptText}>Talk to Intelligence below ↓<br/>It will guide you step-by-step</div>
                    <div className={styles.staticCounter}>
                      <span className={styles.counterHighlight}>{decodedCount.toLocaleString()}</span> souls identified.<br/>Yours is next.
                    </div>
                  </div>

                  <div className={styles.struggleBubbles}>
                    {STRUGGLES.map((s, idx) => (
                      <button key={idx} className={styles.bubble} onClick={() => handleStruggleClick(s)}>{s}</button>
                    ))}
                  </div>
                </div>
              )}

              <AnimatePresence>
                {showChat && (                        <div className={isHandover ? styles.handoverActive : ''}>
                            <div className={styles.topHeader}>
                                <div className={styles.progressModule}>
                                    <div className={styles.progressLabel}>
                                        <span>CONSCIOUSNESS DECODING</span>
                                        <span>{userState.decodingProgress || 0}% IDENTIFIED</span>
                                    </div>
                                    <div className={styles.progressBarTrack}><div className={styles.progressBarFill} style={{ width: `${userState.decodingProgress || 0}%` }} /></div>
                                </div>
                                <div className={styles.pillarsModule}>
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
                                                    <div className={`${styles.pillarIndicator} ${isActive ? styles.pillarActive : ''}`} />
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
                                <button className={styles.closeChatBtn} onClick={() => setShowChat(false)}><X size={20} /></button>
                                
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
                                        {msg.options && idx === messages.length - 1 && !isTyping && (
                                            <div className={(idx === 0 || (idx === 1 && messages[0].role === 'user')) ? styles.verticalOptions : styles.optionsMarqueeContainer}>
                                                <div className={(idx === 0 || (idx === 1 && messages[0].role === 'user')) ? "" : styles.optionsMarqueeTrack}>
                                                    {msg.options.map((opt, oi) => (
                                                        <motion.button key={oi} className={styles.optionBubble} onClick={() => handleOptionClick(opt.text)} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: oi * 0.15, duration: 0.6 }}>
                                                            <span style={{ fontWeight: 500 }}>{opt.text}</span>
                                                            {opt.subLabel && <span style={{ fontSize: '0.65rem', opacity: 0.6, marginTop: '2px' }}>{opt.subLabel}</span>}
                                                        </motion.button>
                                                    ))}
                                                </div>
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
                                        handleOptionClick(text);
                                        setInputValue("");
                                    }
                                }} 
                            />
                        ) : (
                            <form style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center' }} onSubmit={(e) => { e.preventDefault(); if (inputValue.trim()) handleOptionClick(inputValue); setInputValue(""); }}>
                                <div className={styles.inputInner}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', paddingLeft: '8px' }}>
                                        <div className={styles.nIcon}>N</div>
                                        <input 
                                            ref={inputRef} 
                                            type="text" 
                                            className={styles.messageInput} 
                                            placeholder="Ask anything..." 
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
            </div>
        </div>
    );
}
