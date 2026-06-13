"use client";

import React, { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './PatternDeconstruction.module.css';

const DECONSTRUCTIONS = [
  {
    name: "David Kasirye",
    title: "The Analytical Ghost",
    photo: "/images/people/david.jpg",
    problem: "Two years 'preparing' to launch. Endless research, zero income.",
    product: {
      name: "The Embodiment Protocol",
      format: "Personalized Ebook + AI Guide",
      price: "$219"
    },
    solved: [
      "Cut decision time from weeks to under 5 minutes",
      "Installed a daily 'Ship' protocol regardless of readiness",
      "Rewired identity from 'The Researcher' to 'The Builder'"
    ],
    outcome: "Broke a 2-year cycle of 'preparing' to launch 3 revenue-generating products in 6 months.",
    review: "Spiritual AI identified the exact moment my analysis turned into avoidance. I regained 40 hours a week and finally launched my business."
  },
  {
    name: "Elena Sokolova",
    title: "The Theoretical Titan",
    photo: "/images/people/elena.jpg",
    problem: "A vision that could change everything — trapped entirely in theory.",
    product: {
      name: "The Launch Catalyst",
      format: "Personalized Ebook + Audiobook",
      price: "$189"
    },
    solved: [
      "Replaced 40-page plans with 48-hour working prototypes",
      "One public deliverable shipped every single day",
      "From 'The Dreamer' to 'The Practitioner'"
    ],
    outcome: "Went from pure theory to a functional prototype in 48 hours; secured a $100k contract.",
    review: "I built monuments in my mind but left nothing on the earth. Within 48 hours of my protocol, I had a live prototype — and soon after, a six-figure contract."
  },
  {
    name: "Marcus Sterling",
    title: "The Sacred Giver",
    photo: "/images/people/marcus.jpg",
    problem: "Everyone's lifeline — drowning in everyone else's needs.",
    product: {
      name: "The Boundary Engine",
      format: "Personalized AI Guide",
      price: "$249"
    },
    solved: [
      "Said no to 80% of non-essential requests without guilt",
      "Protected a 'Self-Permission' hour every morning",
      "From 'The Support' to 'The Creator'"
    ],
    outcome: "Reclaimed 15 hours per week; launched a passion venture with Q1 profitability.",
    review: "I wore the 'Giver' mask to avoid my own evolution. The Boundary Engine gave me back 15 hours a week. I am no longer a backup character in my own story."
  },
  {
    name: "Aisha Nakamura",
    title: "The Underperformer",
    photo: "/images/people/aisha.jpg",
    problem: "Elite skills, running at 20% — staying safely invisible.",
    product: {
      name: "The Full Velocity Path",
      format: "Personalized Ebook + AI Guide",
      price: "$199"
    },
    solved: [
      "Took visible ownership of high-stakes projects",
      "Daily public contribution of expert insights",
      "From 'The Underdog' to 'The Authority'"
    ],
    outcome: "Accepted an Executive VP role; total compensation doubled.",
    review: "I was hiding in plain sight, terrified that being 'full power' would make me unlovable. Once my invisibility pattern cleared, I accepted an Executive VP role."
  },
  {
    name: "Jonathan Brenner",
    title: "The Logic Shield",
    photo: "/images/people/jonathan.jpg",
    problem: "30 years behind a fortress of logic — marriage and team paying the price.",
    product: {
      name: "The Feeling Body",
      format: "Personalized Audiobook + AI System",
      price: "$229"
    },
    solved: [
      "Treated feelings as data instead of noise",
      "Daily emotional check-in with self and partner",
      "From 'The Architect' to 'The Relator'"
    ],
    outcome: "Restored marriage trust; team retention up 40%.",
    review: "I lived behind cold logic for 30 years, using data to avoid connection. Vulnerability became my highest strategic move — it saved my marriage."
  }
];

const ROTATE_MS = 15000;

export default function PatternDeconstruction({ startIndex = 0, className = "", initialDelay = 0, randomize = false }: { startIndex?: number, className?: string, initialDelay?: number, randomize?: boolean }) {
  // All instances rotate in lockstep off the wall clock, each shifted by
  // startIndex — so side-by-side cards never show the same person.
  const computeIndex = useCallback(
    () => (startIndex + Math.floor(Date.now() / ROTATE_MS)) % DECONSTRUCTIONS.length,
    [startIndex]
  );

  const [index, setIndex] = useState(computeIndex);
  const [isPaused, setIsPaused] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPaused) return;
    const tick = () => {
      setIndex(computeIndex());
      timeoutRef.current = setTimeout(tick, ROTATE_MS - (Date.now() % ROTATE_MS) + 50);
    };
    setIndex(computeIndex());
    timeoutRef.current = setTimeout(tick, ROTATE_MS - (Date.now() % ROTATE_MS) + 50);
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, [isPaused, computeIndex]);

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
                    {/* 1. HEADER — person identity */}
                    <div className={styles.header}>
                        <div className={styles.headerLeft}>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img className={styles.avatar} src={current.photo} alt={current.name} width={52} height={52} loading="lazy" />
                            <div className={styles.identity}>
                                <div className={styles.personName}>{current.name}</div>
                                <div className={styles.verifiedTag}>
                                    <svg viewBox="0 0 24 24" width="11" height="11" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12" /></svg>
                                    Verified Purchase
                                </div>
                            </div>
                        </div>
                        <div className={styles.archetypeTag}>{current.title}</div>
                    </div>

                    {/* 2. BODY PANELS */}
                    <div className={styles.panels}>
                        {/* LEFT: Problem + Quote */}
                        <div className={styles.leftPanel}>
                            <div className={styles.panelLabel}>The Problem</div>
                            <p className={styles.problemText}>{current.problem}</p>
                            <div className={styles.quoteBox}>
                                <span className={styles.quoteIcon} aria-hidden="true">“</span>
                                <p className={styles.reviewText}>{current.review}</p>
                            </div>
                        </div>

                        {/* RIGHT: Product purchased + how it solved it */}
                        <div className={styles.rightPanel}>
                            <div className={styles.productBox}>
                                <div className={styles.panelLabel}>Their Protocol</div>
                                <div className={styles.productName}>{current.product.name}</div>
                                <div className={styles.productMeta}>
                                    <span className={styles.productFormat}>{current.product.format}</span>
                                    <span className={styles.productPrice}>{current.product.price}</span>
                                </div>
                            </div>
                            <div className={styles.panelLabel} style={{ marginTop: '14px' }}>How It Solved It</div>
                            <ul className={styles.solvedList}>
                                {current.solved.map((line, i) => (
                                    <li key={i} className={styles.solvedItem}>{line}</li>
                                ))}
                            </ul>
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
