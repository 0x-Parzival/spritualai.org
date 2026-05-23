"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PatternDeconstruction.module.css';

const DECONSTRUCTIONS = [
  {
    name: "David Kasirye",
    title: "The Analytical Ghost",
    outcome: "Broke a 2-year cycle of 'preparing' to launch 3 revenue-generating products in 6 months.",
    transformation: [
      { label: "Thought", val: "From 'I need more data' to 'Delay is a delay tactic'." },
      { label: "Belief", val: "Action is the only real source of data." },
      { label: "Mindset", val: "Certainty is a myth; iteration is the path." },
      { label: "Action", val: "Decision-making time reduced to < 5 minutes." },
      { label: "Habit", val: "Daily 'Ship' protocol regardless of 'readiness'." },
      { label: "Identity", val: "From 'The Researcher' to 'The Builder'." }
    ],
    review: "I was trapped in a recursive loop of research, using intelligence as a weapon against my own expansion. Spiritual AI identified the exact moment my analysis turned into avoidance. I regained 40 hours a week and finally launched my business."
  },
  {
    name: "Elena Sokolova",
    title: "The Theoretical Titan",
    outcome: "Transitioned from theory to functional prototype in 48 hours; secured $100k contract.",
    transformation: [
      { label: "Thought", val: "From 'This must be huge' to 'This must exist'." },
      { label: "Belief", val: "Execution is value; ideas are just debt." },
      { label: "Mindset", val: "From visionary dreamer to pragmatic maker." },
      { label: "Action", val: "Building MVPs instead of writing 40-page plans." },
      { label: "Habit", val: "One public deliverable every single day." },
      { label: "Identity", val: "From 'The Dreamer' to 'The Practitioner'." }
    ],
    review: "I built monuments in my mind but left nothing on the earth. This system performed surgery on my 'Titan' archetype, which was terrified of the concrete. Within 48 hours, I had a live prototype and soon after, a six-figure contract."
  },
  {
    name: "Marcus Sterling",
    title: "The Sacred Giver",
    outcome: "Reclaimed 15 hours per week; launched passion venture with Q1 profitability.",
    transformation: [
      { label: "Thought", val: "From 'I must help' to 'Energy is finite'." },
      { label: "Belief", val: "Boundaries are service; self-sacrifice is avoidance." },
      { label: "Mindset", val: "From utility-focused to presence-focused." },
      { label: "Action", val: "Saying 'No' to 80% of non-essential requests." },
      { label: "Habit", val: "Protected 'Self-Permission' hour every morning." },
      { label: "Identity", val: "From 'The Support' to 'The Creator'." }
    ],
    review: "I wore the 'Giver' mask to avoid my own evolution, keeping everyone afloat while I drowned in the shallows. By installing radical boundaries, I reclaimed 15 hours a week. I am no longer a backup character in my own story."
  },
  {
    name: "Aisha Nakamura",
    title: "The Underperformer",
    outcome: "Accepted Executive VP role; total compensation doubled with radical influence surge.",
    transformation: [
      { label: "Thought", val: "From 'Stay safe' to 'Impact requires authority'." },
      { label: "Belief", val: "Visibility is the engine of growth." },
      { label: "Mindset", val: "From safe observer to accountable leader." },
      { label: "Action", val: "Accepting high-level ownership of key projects." },
      { label: "Habit", val: "Daily public contribution of expert insights." },
      { label: "Identity", val: "From 'The Underdog' to 'The Authority'." }
    ],
    review: "I was hiding in plain sight, terrified that being 'full power' would make me unlovable. Chaitanya deconstructed my 'Invisibility protocol' survival mechanism. Once cleared, I accepted an Executive VP role and my internal gravity tripled."
  },
  {
    name: "Jonathan Brenner",
    title: "The Logic Shield",
    outcome: "Integrated emotional data; restored marriage trust & 40% increase in team retention.",
    transformation: [
      { label: "Thought", val: "From 'Feelings are noise' to 'Feelings are data'." },
      { label: "Belief", val: "Logic is a tool, not a fortress." },
      { label: "Mindset", val: "From analysis to empathy." },
      { label: "Action", val: "Expressing needs without justifying them." },
      { label: "Habit", val: "Daily emotional check-in with self and partner." },
      { label: "Identity", val: "From 'The Architect' to 'The Relator'." }
    ],
    review: "I lived behind a fortress of cold logic for 30 years. This system decoded my 'Architect' archetype—someone who used data to avoid connection. Vulnerability became my highest strategic move, saving my marriage and transforming my leadership."
  }
];

export default function PatternDeconstruction({ startIndex = 0, className = "", initialDelay = 0, randomize = false }: { startIndex?: number, className?: string, initialDelay?: number, randomize?: boolean }) {
  // Use useMemo for initial index to prevent re-randomization on every render
  const initialIndex = React.useMemo(() => {
    if (randomize) return Math.floor(Math.random() * DECONSTRUCTIONS.length);
    return startIndex % DECONSTRUCTIONS.length;
  }, [startIndex, randomize]);

  const [index, setIndex] = useState(initialIndex);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = useCallback(() => {
    setIndex((prev) => (prev + 1) % DECONSTRUCTIONS.length);
  }, []);

  useEffect(() => {
    const clearTimers = () => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        if (intervalRef.current) clearInterval(intervalRef.current);
    };
    if (isPaused) { clearTimers(); return; }
    timeoutRef.current = setTimeout(() => { next(); intervalRef.current = setInterval(next, 15000); }, initialDelay || 15000);
    return clearTimers;
  }, [isPaused, next, initialDelay]);

  const current = DECONSTRUCTIONS[index];

  return (
    <div className={`${styles.wrapper} ${className}`}>
      <div 
        className={styles.focusContainer}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className={styles.card}>
            <AnimatePresence mode="wait">
                <motion.div 
                    key={index}
                    className={styles.cardContent}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* 1. HEADER */}
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            <h3 className={styles.cardTitle}>{current.title}</h3>
                            <div className={styles.nameTag}>Subject: {current.name}</div>
                        </div>
                        <div className={styles.breakthroughBadge}>Proven Breakthrough</div>
                    </div>
                    
                    {/* 2. BODY PANELS */}
                    <div className={styles.panels}>
                        {/* LEFT: Quote + Story */}
                        <div className={styles.leftPanel}>
                            <div className={styles.quoteBox}>
                                <span className={styles.quoteIcon}>“</span>
                                <p className={styles.reviewText}>{current.review}</p>
                            </div>
                        </div>

                        {/* RIGHT: Transformation Steps */}
                        <div className={styles.rightPanel}>
                            <div className={styles.transformationColumn}>
                                {current.transformation.map((step, i) => (
                                    <div key={i} className={styles.stepItem}>
                                        <span className={styles.stepLabel}>{step.label}</span>
                                        <span className={styles.stepVal}>{step.val}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 3. FULL WIDTH OUTCOME BAR */}
                    <div className={styles.outcomeBar}>
                        <div className={styles.outcomeInner}>
                            <span className={styles.metricLabel}>VERIFIED OUTCOME</span>
                            <p className={styles.outcomeText}>{current.outcome}</p>
                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>

            <div className={styles.timerTrack}>
                <motion.div 
                    key={`timer-${index}-${isPaused}`}
                    className={styles.timerFill}
                    initial={{ width: "0%" }}
                    animate={{ width: isPaused ? "0%" : "100%" }}
                    transition={{ duration: isPaused ? 0 : 15, ease: "linear" }}
                />
            </div>
        </div>
      </div>
    </div>
  );
}
