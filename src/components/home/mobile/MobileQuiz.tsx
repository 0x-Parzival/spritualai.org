"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../MBTIQuiz.module.css';

interface Question {
  id: number;
  focus: string;
  text: string;
  options: {
    label: string;
    text: string;
    value: string;
  }[];
}

interface MobileQuizProps {
  onComplete: (mbti: string) => void;
}

const questions: Question[] = [
  {
    id: 1,
    focus: "E vs I",
    text: "After a long week, what sounds more like relief?",
    options: [
      { label: "A", text: "Going out to a social gathering to 'wake yourself up'", value: "E" },
      { label: "B", text: "Staying home, reading, or doing a solo hobby to 'decompress'", value: "I" },
    ]
  },
  {
    id: 2,
    focus: "S vs N",
    text: "When starting a new project, what do you need to hear first?",
    options: [
      { label: "A", text: "The specific steps, facts, and what needs to be done now", value: "S" },
      { label: "B", text: "The big picture goal and future possibilities", value: "N" },
    ]
  },
  {
    id: 3,
    focus: "T vs F",
    text: "When resolving conflict, which feels more 'right'?",
    options: [
      { label: "A", text: "Analyzing objectively and finding logical truth", value: "T" },
      { label: "B", text: "Considering feelings and finding harmony", value: "F" },
    ]
  },
  {
    id: 4,
    focus: "J vs P",
    text: "Saturday morning: which scenario makes you feel more at peace?",
    options: [
      { label: "A", text: "Having a clear plan with things to do", value: "J" },
      { label: "B", text: "A blank slate with no schedule", value: "P" },
    ]
  }
];

export default function MobileQuiz({ onComplete }: MobileQuizProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [result, setResult] = useState('');

  const handleSelect = (index: number) => {
    setSelected(index);
    const newAnswers = [...answers];
    newAnswers[currentStep] = questions[currentStep].options[index].value;
    setAnswers(newAnswers);

    setTimeout(() => {
      if (currentStep < questions.length - 1) {
        setCurrentStep(currentStep + 1);
        setSelected(null);
      } else {
        const finalResult = newAnswers.join('');
        setResult(finalResult);
        setShowResult(true);
        onComplete(finalResult);
      }
    }, 600);
  };

  const q = questions[currentStep];

  return (
    <div style={{
      minHeight: '100vh',
      padding: '100px 24px 160px',
      background: 'linear-gradient(180deg, #0d0d20 0%, #1a0a2e 50%, #0d0d20 100%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <AnimatePresence mode="wait">
        {!showResult ? (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
          >
            {/* Progress */}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '40px' }}>
              {questions.map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: answers[i] 
                      ? 'linear-gradient(135deg, #7c4dff, #35f8ff)'
                      : currentStep === i 
                        ? 'rgba(255,255,255,0.8)' 
                        : 'rgba(255,255,255,0.2)',
                    transition: 'all 0.3s ease',
                  }}
                />
              ))}
            </div>

            {/* Focus Label */}
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.7rem',
              color: '#b388ff',
              letterSpacing: '2px',
              marginBottom: '16px',
            }}>
              {q.focus}
            </div>

            {/* Question */}
            <h2 style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: 'clamp(1.1rem, 4vw, 1.5rem)',
              color: '#fff',
              marginBottom: '40px',
              lineHeight: 1.4,
            }}>
              {q.text}
            </h2>

            {/* Options */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {q.options.map((option, i) => (
                <motion.button
                  key={i}
                  onClick={() => selected === null && handleSelect(i)}
                  animate={selected === i ? { scale: 0.98, opacity: 0.7 } : { scale: 1, opacity: 1 }}
                  style={{
                    width: '100%',
                    padding: '20px',
                    background: selected === i
                      ? 'rgba(124, 77, 255, 0.3)'
                      : 'rgba(255,255,255,0.05)',
                    border: `2px solid ${selected === i ? '#7c4dff' : 'rgba(255,255,255,0.1)'}`,
                    borderRadius: '16px',
                    color: '#fff',
                    textAlign: 'left',
                    cursor: selected === null ? 'pointer' : 'default',
                    transition: 'all 0.3s ease',
                  }}
                >
                  <div style={{
                    fontFamily: 'Orbitron, sans-serif',
                    fontSize: '0.8rem',
                    color: '#b388ff',
                    marginBottom: '8px',
                  }}>
                    {option.label}
                  </div>
                  <div style={{
                    fontFamily: 'Inter, sans-serif',
                    fontSize: '0.95rem',
                    lineHeight: 1.5,
                  }}>
                    {option.text}
                  </div>
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ width: '100%', maxWidth: '400px', textAlign: 'center' }}
          >
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '0.8rem',
              color: 'rgba(255,255,255,0.6)',
              letterSpacing: '2px',
              marginBottom: '16px',
            }}>
              YOUR ARCHITECT TYPE
            </div>
            <div style={{
              fontFamily: 'Orbitron, sans-serif',
              fontSize: '4rem',
              fontWeight: 900,
              background: 'linear-gradient(135deg, #7c4dff, #35f8ff)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '24px',
            }}>
              {result}
            </div>
            <button
              onClick={() => {
                setShowResult(false);
                setCurrentStep(0);
                setAnswers([]);
                setSelected(null);
              }}
              className={styles.gradientFlowBtn}
              style={{ padding: '14px 32px', fontSize: '0.85rem' }}
            >
              RETRY QUIZ
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
