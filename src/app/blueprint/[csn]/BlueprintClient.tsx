'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import styles from './blueprint-detail.module.css';
import { useCurrency } from '@/context/CurrencyContext';
import SpaceBackground from '@/components/SpaceBackground';

/* ── Types ── */
interface Product {
  id: string;
  name: string;
  whyYou: string;
  formats: string[];
  price: number;
  originalPrice: number;
  urgencyLine: string;
  ctaText: string;
  headline?: string;
  semanticSlug?: string;
  targetProblem?: string;
  tagline?: string;
  whatYouGet?: string[];
}

interface BlueprintData {
  csn: string;
  verifyCode: string;
  mbti: string;
  archetype: string;
  symbol: string;
  planeX: number;
  planeY: number;
  report: any;
  products: Product[];
  metadata: {
    patternName: string;
    gender: string;
    birthDate: string | null;
    hawkinsLevel: number;
    problem: string;
    shadow: string;
  };
  createdAt: string;
  isComplete: boolean;
}

interface Props {
  data: BlueprintData;
  csn: string;
}

/* ── Text Scramble Component ── */
function TextScramble({ phrases, className }: { phrases: string[]; className?: string }) {
  const elRef = useRef<HTMLSpanElement>(null);
  const frameRef = useRef(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const frameCount = useRef(0);
  const counterRef = useRef(0);

  const randomChar = () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZハッカー開発者プログラマー<>█'[Math.floor(Math.random() * 42)];

  const animate = useCallback(() => {
    const queue = queueRef.current;
    let output = '';
    let complete = 0;
    const frame = frameCount.current;

    for (let i = 0; i < queue.length; i++) {
      const { from, to, start, end, char } = queue[i];
      if (frame >= end) {
        complete++;
        output += to;
      } else if (frame >= start) {
        if (!char || Math.random() < 0.2) {
          queue[i].char = randomChar();
        }
        output += `<span class="${styles.dud}">${queue[i].char}</span>`;
      } else {
        output += from;
      }
    }

    if (elRef.current) {
      elRef.current.innerHTML = output;
    }

    if (complete === queue.length) return;

    frameCount.current++;
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  const next = useCallback((oldText: string) => {
    const newText = phrases[counterRef.current % phrases.length];
    const length = Math.max(oldText.length, newText.length);
    queueRef.current = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      queueRef.current.push({ from, to, start, end });
    }
    frameCount.current = 0;
    cancelAnimationFrame(frameRef.current);
    animate();
    counterRef.current++;
    
    setTimeout(() => next(newText), 3000);
  }, [phrases, animate]);

  useEffect(() => {
    const timer = setTimeout(() => next(''), 500);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [next]);

  return <span ref={elRef} className={className} />;
}

/* ── Share Button Component ── */
function ShareButtons({ csn, identity, mbti }: { csn: string; identity: string; mbti: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `My Consciousness Blueprint has been etched. I am "${identity}" (${mbti}). CSN: ${csn}. Discover yours at Spiritual AI.`;

  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = url;
      ta.style.position = 'fixed';
      ta.style.left = '-9999px';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '💬',
      href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    },
    {
      name: 'Instagram',
      icon: '📸',
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleCopy();
      },
    },
    {
      name: 'X',
      icon: '𝕏',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Copy Link',
      icon: copied ? '✓' : '🔗',
      href: '#',
      onClick: (e: React.MouseEvent) => {
        e.preventDefault();
        handleCopy();
      },
    },
  ];

  return (
    <div className={styles.shareSectionInCard}>
      <div className={styles.shareLabel}>Share Your Blueprint</div>
      <div className={styles.shareButtons}>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={styles.shareBtnMinimal}
            target={link.href !== '#' ? '_blank' : undefined}
            rel="noopener noreferrer"
            onClick={(e) => {
              if (link.onClick) {
                link.onClick(e);
              }
            }}
          >
            <span>{link.icon}</span>
            {link.name}
          </a>
        ))}
      </div>
    </div>
  );
}

/* ── Main Component ── */
export default function BlueprintClient({ data, csn }: Props) {
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSaving, setFeedbackSaving] = useState(false);
  const { convertPrice, currency, loading: currencyLoading } = useCurrency();

  const handleSubmitFeedback = async () => {
    if (!message.trim() || feedbackSaving) return;
    setFeedbackSaving(true);
    try {
      const res = await fetch('/api/blueprint/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ csn, message: message.trim() }),
      });
      if (res.ok) {
        setFeedbackSubmitted(true);
        setMessage('');
      }
    } catch (err) {
      console.error('Feedback submit error:', err);
    } finally {
      setFeedbackSaving(false);
    }
  };
  const [timeLeft, setTimeLeft] = useState(14 * 60 + 32);

  const { report, products, mbti, archetype, symbol } = data;
  const header = report?.header || {};
  const meta = report?.meta || {};
  const identity = report?.consciousnessIdentity || header.patternName || 'The Hidden Self';

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const createdAtDate = data.createdAt ? new Date(data.createdAt) : new Date();
  const formattedDate = createdAtDate.toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric',
  });

  const scramblePhrases = [
    identity,
    mbti,
    archetype,
    header.patternName || 'Pattern Detected',
  ].filter(Boolean);

  const FADE_UP = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1, y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
    }),
  };

  // Helper to format price with geo-currency
  const formatPrice = (priceUSD: number) => {
    if (currencyLoading) return `$${priceUSD}`;
    return convertPrice(priceUSD);
  };

  // Hyper-Mirror Insight Helpers
  const getInternalScript = () => {
    if (report?.internalScript) return report.internalScript;
    return `You have spent a lifetime convincing yourself that your worth is a variable tied to your output. You believe that if you just achieve "that one thing," the void will finally close. But the void is where your true self is hiding, terrified of being seen as ordinary.`;
  };

  const getMicroSymptoms = () => {
    if (report?.microSymptoms) return report.microSymptoms;
    return [
      "The compulsive need to apologize for things that aren't your fault.",
      "A secret feeling that you are an impostor even when you are winning.",
      "The mental loop of rehearsing conversations 10 times before they happen.",
      "The inability to relax unless every single task is marked 'complete'.",
      "A profound fear that if you stop running, the sadness will finally catch up."
    ];
  };

  const getCognitiveGap = () => {
    if (report?.cognitiveGap) return report.cognitiveGap;
    return "You've tried mindfulness, productivity hacks, and perhaps even therapy. They failed because they treated the symptoms of your stress, not the architecture of your pattern. You cannot 'think' your way out of a pattern that was installed before you knew how to think.";
  };


  return (
    <>
      <Head>
        <title>{`${identity} · ${mbti} | Spiritual AI`}</title>
        <meta name="description" content={`Consciousness Blueprint for ${mbti}. Pattern: ${identity}. CSN: ${csn}.`} />
        <meta property="og:title" content={`${identity} · ${mbti} | Spiritual AI`} />
        <meta property="og:description" content={`My Consciousness Blueprint has been etched. CSN: ${csn}.`} />
        <meta property="og:type" content="article" />
      </Head>

      {/* Background Effects */}
      <SpaceBackground />
      <div className={styles.scanlines} />
      <div className={styles.vignette} />

      <div className={styles.container}>
        {/* Consolidated Page Layout */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
          
          {/* ── SECTION 1: THE REPORT ── */}
          <section id="report-section">
            <div className={styles.twoColumn}>
              {/* ── LEFT: ID Card ── */}
              <motion.div
                className={styles.idCard}
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.idCardImage}>
                  <img
                    src={`https://api.dicebear.com/7.x/lorelei/svg?seed=${encodeURIComponent(identity)}&backgroundColor=0a0a1a&backgroundType=gradientLinear&backgroundRotation=180`}
                    alt="Consciousness Signature"
                    className={styles.premiumAvatar}
                  />
                  <div className={styles.idCardImageOverlay} />
                </div>
                <div className={styles.idCardContent}>
                  <div className={styles.idCardCSN}>VERIFIED CSN: {csn}</div>
                  <h2 className={styles.idCardTitle}>{identity}</h2>
                  <p className={styles.idCardSubtitle}>{mbti} · {archetype} {symbol}</p>

                  <div className={styles.idCardDivider} />

                  <div className={styles.idCardMeta}>
                    <div className={styles.idCardMetaItem}>
                      <span className={styles.idCardMetaLabel}>Cognitive Type</span>
                      <span className={styles.idCardMetaValue}>{mbti}</span>
                    </div>
                    <div className={styles.idCardMetaItem}>
                      <span className={styles.idCardMetaLabel}>Detected Pattern</span>
                      <span className={styles.idCardMetaValue}>{header.patternName || data.metadata?.patternName || 'Identified'}</span>
                    </div>
                    <div className={styles.idCardMetaItem}>
                      <span className={styles.idCardMetaLabel}>Shadow Core</span>
                      <span className={styles.idCardMetaValue}>{meta.coreShadowPattern || data.metadata?.shadow || 'Identified'}</span>
                    </div>
                    <div className={styles.idCardMetaItem}>
                      <span className={styles.idCardMetaLabel}>Current Phase</span>
                      <span className={styles.idCardMetaValue}>{meta.dharmaPhase || 'Active'}</span>
                    </div>
                  </div>

                  <div className={styles.urgencyBar}>
                    <div className={styles.urgencyFill} style={{ width: `${header.urgencyPercent || 75}%` }} />
                    <span className={styles.urgencyText}>DECODING STRENGTH: {header.urgencyPercent || 75}%</span>
                  </div>

                  <ShareButtons csn={csn} identity={identity} mbti={mbti} />
                </div>
              </motion.div>

              {/* ── RIGHT: Report Content ── */}
              <motion.div
                className={styles.reportContent}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.reportHeader}>
                  <h1 className={styles.reportTitle}>Consciousness Analysis</h1>
                  <p className={styles.reportDate}>{formattedDate} · Session Secure</p>
                </div>

                {/* Featured Archetype Image Restored */}
                <motion.div 
                  className={styles.featuredImageContainer}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  <img 
                    src={`https://api.dicebear.com/7.x/notionists/svg?seed=${encodeURIComponent(identity)}&backgroundColor=0a0a1a&gesture=wave,raisedHand,ok`} 
                    className={styles.featuredAvatar}
                    alt="Identified Archetype"
                  />
                  <div className={styles.featuredImageOverlay} />
                </motion.div>

                {/* Scrambling Identity */}
                <div className={styles.reportArticle} style={{ borderTop: 'none', marginTop: 0 }}>
                  <small className={styles.articleLabel}>CONSCIOUSNESS IDENTITY</small>
                  <div className={styles.textScramble}>
                    <TextScramble phrases={scramblePhrases} />
                  </div>
                </div>

                {/* Validation */}
                {report?.validation && (
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={FADE_UP}
                    custom={1}
                  >
                    <small className={styles.articleLabel}>STRENGTHS VALIDATION</small>
                    <h2 className={styles.articleTitle}>The Validation</h2>
                    <p className={styles.articleText}>&ldquo;{report.validation}&rdquo;</p>
                  </motion.div>
                )}

                {/* Exposure: Hidden Signs */}
                {report?.hiddenSigns && report.hiddenSigns.length > 0 && (
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={FADE_UP}
                    custom={1.5}
                  >
                    <small className={styles.articleLabel}>THINGS YOU NEVER TOLD US</small>
                    <h2 className={styles.articleTitle}>Signs This Pattern Controls You</h2>
                    <div className={styles.signsGrid}>
                      {report.hiddenSigns.map((sign: string, i: number) => (
                        <div key={i} className={styles.signItem}>
                          <span className={styles.checkmark}>✓</span>
                          <span>{sign}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Probability Engine */}
                {report?.probabilities && report.probabilities.length > 0 && (
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={FADE_UP}
                    custom={1.8}
                  >
                    <small className={styles.articleLabel}>PROBABILITY ENGINE</small>
                    <h2 className={styles.articleTitle}>Blueprint Predictions</h2>
                    <div className={styles.probabilityGrid}>
                      {report.probabilities.map((prob: any, i: number) => (
                        <div key={i} className={styles.probItem}>
                          <div className={styles.probHeader}>
                            <span className={styles.probLabel}>{prob.label}</span>
                            <span className={styles.probValue}>{prob.value}%</span>
                          </div>
                          <div className={styles.probTrack}>
                            <div className={styles.probFill} style={{ width: `${prob.value}%` }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Origin Analysis */}
                {report?.originAnalysis && (
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={FADE_UP}
                    custom={2}
                  >
                    <small className={styles.articleLabel}>ORIGIN ANALYSIS</small>
                    <h2 className={styles.articleTitle}>How This Was Installed</h2>
                    <p className={styles.articleText}>{report.originAnalysis}</p>
                  </motion.div>
                )}

                {/* Core Conflict */}
                {report?.coreConflict && (
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={FADE_UP}
                    custom={2.5}
                  >
                    <small className={styles.articleLabel}>PSYCHOLOGICAL TENSION</small>
                    <h2 className={styles.articleTitle}>Your Core Conflict</h2>
                    <p className={styles.articleText}>{report.coreConflict}</p>
                  </motion.div>
                )}

                {/* Future Cost */}
                {report?.futureCost && (
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    variants={FADE_UP}
                    custom={3}
                  >
                    <small className={styles.articleLabel}>COST CALCULATOR</small>
                    <h2 className={styles.articleTitle}>If This Continues...</h2>
                    <div className={styles.costGrid}>
                      <div className={styles.costItem}>
                        <div className={styles.costLabel}>IN 1 YEAR:</div>
                        <div className={styles.costValue}>{report.futureCost.oneYear}</div>
                      </div>
                      <div className={styles.costItem}>
                        <div className={styles.costLabel}>IN 5 YEARS:</div>
                        <div className={styles.costValue}>{report.futureCost.fiveYears}</div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* The Mirror */}
                <motion.div
                  className={styles.reportArticle}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  variants={FADE_UP}
                  custom={3.2}
                >
                  <small className={styles.articleLabel}>ROOT PATTERN ANALYSIS</small>
                  <h2 className={styles.articleTitle}>The Mirror</h2>
                  <p className={styles.articleText}>
                    {report?.realCause || report?.root || 'A pattern installed before conscious choice was possible. Your mind made a decision to survive your environment. That decision became automatic.'}
                  </p>
                </motion.div>

                {/* Transition: The Truth */}
                <motion.div
                  className={styles.truthSection}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={FADE_UP}
                  custom={4}
                >
                  <h2 className={styles.truthTitle}>The Truth</h2>
                  <p className={styles.truthText}>
                    You do not need more motivation. You do not need another productivity system. You do not need to become someone else.
                  </p>
                  <p className={styles.truthHighlight}>
                    You need to dissolve the pattern that convinced you your worth depends on performance.
                  </p>
                </motion.div>

                {/* Curiosity Gap: Locked Points */}
                <motion.div
                  className={styles.lockedSection}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={FADE_UP}
                  custom={4.5}
                >
                  <div className={styles.lockedHeader}>
                    <span className={styles.lockedIcon}>🔒</span>
                    <span>87 ADDITIONAL DATA POINTS REMAIN LOCKED</span>
                  </div>
                  <div className={styles.lockedGrid}>
                    <div>• Relationship blueprint</div>
                    <div>• Money psychology</div>
                    <div>• Purpose architecture</div>
                    <div>• Shadow triggers</div>
                    <div>• Self-sabotage map</div>
                    <div>• Fulfillment pathway</div>
                  </div>
                </motion.div>

                {/* Teaching */}
                {report?.teaching && (
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={FADE_UP}
                    custom={5}
                  >
                    <small className={styles.articleLabel}>DISSOLUTION PROTOCOL</small>
                    <h2 className={styles.articleTitle}>The Teaching</h2>
                    <p className={styles.articleText}>{report.teaching}</p>
                  </motion.div>
                )}

                <div className={styles.connectedFooter}>
                  Connected via S-NET-{data.planeX}{data.planeY} · Exclusive access window: {formatTime(timeLeft)} remaining
                </div>
              </motion.div>
            </div>
          </section>

          {/* ── SECTION 2: THE SOLUTIONS ── */}
          <section id="solutions-section">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className={styles.solutionsPage} style={{ maxWidth: '1200px', margin: '0 auto' }}>
                <div className={styles.solutionsHeader}>
                  <h2 className={styles.solutionsTitle}>Your Personalized Solutions</h2>
                  <p className={styles.solutionsSubtitle}>
                    Instruments specifically designed to dissolve your identified patterns.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {(products || []).map((product: any, i: number) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.15 }}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(53, 248, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '32px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#35f8ff', letterSpacing: '0.2em', marginBottom: '6px' }}>
                            INSTRUMENT {String(i + 1).padStart(2, '0')}
                          </div>
                          <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '4px', color: '#fff' }}>
                            {product.name}
                          </h3>
                          <p style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}>
                            {product.tagline}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>
                            {formatPrice(997)}
                          </div>
                          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.5rem', color: '#35f8ff', fontWeight: 700 }}>
                            {formatPrice(497)}
                          </div>
                        </div>
                      </div>

                      <div style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.6, borderLeft: '2px solid #35f8ff', paddingLeft: '20px' }}>
                        {product.targetProblem || "Designed specifically for people whose self-worth depends on achievement, approval, or external success."}
                      </div>

                      <div className={styles.productIncludes}>
                        <div style={{ color: '#35f8ff', fontSize: '0.7rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '1px' }}>INSIDE YOU'LL DISCOVER:</div>
                        <div className={styles.features}>
                          <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '8px' }}>The exact moment this pattern became your operating system</li>
                          <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '8px' }}>The hidden belief controlling your daily decisions</li>
                          <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '8px' }}>A 21-day nervous system rewiring sequence</li>
                          <li style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', marginBottom: '8px' }}>The pattern dissolution framework</li>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                        <a
                          href={`/blueprint/${encodeURIComponent(csn)}/product/${product.id}`}
                          style={{
                            padding: '16px 40px',
                            background: '#35f8ff',
                            color: '#000',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '0.8rem',
                            fontWeight: 800,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            boxShadow: '0 0 20px rgba(53, 248, 255, 0.4)',
                          }}
                        >
                          {product.ctaText || 'Get Access Now'}
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </section>

          {/* ── SECTION 3: FINAL FEEDBACK ── */}
          <section id="feedback-section" style={{ paddingBottom: '100px' }}>
            <motion.div
              className={styles.messageBox}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className={styles.messageBoxLabel}>
                💬 Anything else you want the AI to know about?
              </div>
              <textarea
                className={styles.messageBoxInput}
                placeholder="Share additional context, thoughts, or questions about your blueprint..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={3}
              />
              <button 
                onClick={handleSubmitFeedback}
                disabled={!message.trim() || feedbackSaving}
                style={{
                  marginTop: '16px',
                  padding: '12px 32px',
                  background: 'rgba(53, 248, 255, 0.1)',
                  border: '1px solid #35f8ff',
                  color: '#35f8ff',
                  borderRadius: '8px',
                  fontFamily: 'Orbitron, sans-serif',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  opacity: feedbackSubmitted ? 0.5 : 1
                }}
              >
                {feedbackSaving ? 'SAVING...' : (feedbackSubmitted ? 'FEEDBACK RECORDED ✓' : 'SAVE FEEDBACK')}
              </button>
            </motion.div>
          </section>

        </div>
      </div>
    </>
  );
}
