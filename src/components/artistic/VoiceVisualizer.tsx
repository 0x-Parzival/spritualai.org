"use client";

import React, { useEffect, useRef, useState } from 'react';
import styles from '../HeroCTA.module.css';

interface VoiceVisualizerProps {
    isActive: boolean;
    onTranscript?: (text: string, isFinal: boolean) => void;
}

const BAR_COUNT = 64;

const VoiceVisualizer: React.FC<VoiceVisualizerProps> = ({ isActive, onTranscript }) => {
    const [bars, setBars] = useState<number[]>(new Array(BAR_COUNT).fill(4));
    const audioCtxRef = useRef<AudioContext | null>(null);
    const analyserRef = useRef<AnalyserNode | null>(null);
    const recognitionRef = useRef<any>(null);
    const animationFrameRef = useRef<number | null>(null);
    const streamRef = useRef<MediaStream | null>(null);

    useEffect(() => {
        if (isActive) {
            startSystem();
        } else {
            stopSystem();
        }

        return () => stopSystem();
    }, [isActive]);

    const startSystem = async () => {
        try {
            // 1. Audio Visualizer Setup
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            streamRef.current = stream;
            
            const AudioContextClass = (window as any).AudioContext || (window as any).webkitAudioContext;
            const audioCtx = new AudioContextClass();
            const analyser = audioCtx.createAnalyser();
            analyser.fftSize = 1024; // High resolution for detail
            analyser.smoothingTimeConstant = 0.8;
            
            const source = audioCtx.createMediaStreamSource(stream);
            source.connect(analyser);
            
            audioCtxRef.current = audioCtx;
            analyserRef.current = analyser;
            
            const dataArray = new Uint8Array(analyser.frequencyBinCount);
            
            const animate = () => {
                if (!analyserRef.current) return;
                analyserRef.current.getByteFrequencyData(dataArray);
                
                // Detailed frequency mapping
                const newBars = [];
                // We focus on the vocal range (lower half of spectrum)
                const vocalRangeEnd = Math.floor(dataArray.length * 0.4); 
                const step = Math.floor(vocalRangeEnd / BAR_COUNT);
                
                for (let i = 0; i < BAR_COUNT; i++) {
                    const startIdx = i * step;
                    let sum = 0;
                    for(let j=0; j<step; j++) {
                        sum += dataArray[startIdx + j] || 0;
                    }
                    const avg = sum / step;
                    
                    // Reactive height based on volume and frequency
                    const h = Math.max(4, Math.round((avg / 255) * 55)); 
                    newBars.push(h);
                }
                setBars(newBars);
                animationFrameRef.current = requestAnimationFrame(animate);
            };
            animate();

            // 2. Speech Recognition Setup
            const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
            if (SpeechRecognition) {
                const recognition = new SpeechRecognition();
                recognition.continuous = true;
                recognition.interimResults = true;
                recognition.lang = 'en-US';
                
                recognition.onresult = (event: any) => {
                    if (!event.results) return;
                    let interimTranscript = '';
                    let finalTranscript = '';

                    for (let i = event.resultIndex; i < event.results.length; ++i) {
                        const result = event.results[i];
                        if (result && result[0]) {
                            if (result.isFinal) {
                                finalTranscript += result[0].transcript;
                            } else {
                                interimTranscript += result[0].transcript;
                            }
                        }
                    }

                    if (onTranscript) {
                        if (finalTranscript) onTranscript(finalTranscript, true);
                        else if (interimTranscript) onTranscript(interimTranscript, false);
                    }
                };

                recognition.onerror = (err: any) => {
                    console.error("Speech Rec Error:", err.error || err);
                };
                recognition.onend = () => { if (isActive) recognition.start(); };
                
                recognitionRef.current = recognition;
                recognition.start();
            }

        } catch (err) {
            console.error("Failed to start voice system:", err);
        }
    };

    const stopSystem = () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        if (audioCtxRef.current) audioCtxRef.current.close();
        if (recognitionRef.current) {
            recognitionRef.current.onend = null;
            recognitionRef.current.stop();
        }
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
        }
        audioCtxRef.current = null;
        analyserRef.current = null;
        recognitionRef.current = null;
        setBars(new Array(BAR_COUNT).fill(4));
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', width: '100%', flexGrow: 1, pointerEvents: 'none', paddingRight: '20px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '40px', width: '100%' }}>
                {bars.map((h, i) => (
                    <div 
                        key={i} 
                        style={{ 
                            flex: 1,
                            maxWidth: '4px',
                            height: `${h}px`, 
                            background: isActive && h > 6 ? '#35f8ff' : 'rgba(255,255,255,0.15)',
                            borderRadius: '2px',
                            transition: 'height 0.08s ease, background 0.3s ease',
                            boxShadow: isActive && h > 15 ? '0 0 10px #35f8ff' : 'none'
                        }} 
                    />
                ))}
            </div>
            {isActive && (
                <div style={{ fontSize: '0.6rem', color: '#35f8ff', letterSpacing: '2px', fontWeight: 700, animation: 'pulse 2s infinite' }}>
                    TRANSMITTING LIVE
                </div>
            )}
        </div>
    );
};

export default VoiceVisualizer;
