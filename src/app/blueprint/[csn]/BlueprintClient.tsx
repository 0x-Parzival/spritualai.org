'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import styles from './blueprint-detail.module.css';
import { useCurrency } from '@/context/CurrencyContext';

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

/* ── Share Button Component (FIXED: proper clipboard, no alert) ── */
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
        // Since we can't deep link to Instagram stories with a URL directly, 
        // we copy the link and hint the user.
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
    <div className={styles.shareSection}>
      <div className={styles.shareLabel}>Share Your Blueprint</div>
      <div className={styles.shareButtons}>
        {shareLinks.map((link) => (
          <a
            key={link.name}
            href={link.href}
            className={styles.shareBtn}
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
  const [activePage, setActivePage] = useState<1 | 2>(1);
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
      <div className={styles.scanlines} />
      <div className={styles.vignette} />

      <div className={styles.container}>
        {/* Page Navigation */}
        <div className={styles.pageNav}>
          <button
            className={`${styles.pageTab} ${activePage === 1 ? styles.pageTabActive : ''}`}
            onClick={() => setActivePage(1)}
          >
            📋 Report
          </button>
          <button
            className={`${styles.pageTab} ${activePage === 2 ? styles.pageTabActive : ''}`}
            onClick={() => setActivePage(2)}
          >
            🎯 Solutions
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activePage === 1 && (
            <motion.div
              key="page1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.twoColumn}>
                {/* ── LEFT: ID Card ── */}
                <motion.div
                  className={styles.idCard}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className={styles.idCardImage}>
                    <img
                      src={`/images/mbti/${mbti.toLowerCase()}.svg`}
                      alt={`${mbti} archetype`}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/images/mbti/default.svg';
                      }}
                    />
                    <div className={styles.idCardImageOverlay} />
                  </div>
                  <div className={styles.idCardContent}>
                    <div className={styles.idCardCSN}>CSN: {csn}</div>
                    <h2 className={styles.idCardTitle}>{identity}</h2>
                    <p className={styles.idCardSubtitle}>{mbti} · {archetype} {symbol}</p>

                    <div className={styles.idCardDivider} />

                    <div className={styles.idCardMeta}>
                      <div className={styles.idCardMetaItem}>
                        <span className={styles.idCardMetaLabel}>Type</span>
                        <span className={styles.idCardMetaValue}>{mbti}</span>
                      </div>
                      <div className={styles.idCardMetaItem}>
                        <span className={styles.idCardMetaLabel}>Pattern</span>
                        <span className={styles.idCardMetaValue}>{header.patternName || data.metadata?.patternName || 'Identified'}</span>
                      </div>
                      <div className={styles.idCardMetaItem}>
                        <span className={styles.idCardMetaLabel}>Shadow</span>
                        <span className={styles.idCardMetaValue}>{meta.coreShadowPattern || data.metadata?.shadow || 'Identified'}</span>
                      </div>
                      <div className={styles.idCardMetaItem}>
                        <span className={styles.idCardMetaLabel}>Phase</span>
                        <span className={styles.idCardMetaValue}>{meta.dharmaPhase || 'Active'}</span>
                      </div>
                    </div>

                    <div className={styles.urgencyBar}>
                      <div className={styles.urgencyFill} style={{ width: `${header.urgencyPercent || 75}%` }} />
                      <span className={styles.urgencyText}>URGENCY: {header.urgencyPercent || 75}%</span>
                    </div>

                    <ShareButtons csn={csn} identity={identity} mbti={mbti} />
                  </div>
                </motion.div>

                {/* ── RIGHT: Report Content ── */}
                <motion.div
                  className={styles.reportContent}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  <div className={styles.reportHeader}>
                    <h1 className={styles.reportTitle}>Scan Results</h1>
                    <p className={styles.reportDate}>{formattedDate}</p>
                  </div>

                  {/* Scrambling Identity */}
                  <div className={styles.reportArticle}>
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
                      animate="visible"
                      variants={FADE_UP}
                      custom={1}
                    >
                      <small className={styles.articleLabel}>SCANNING ARTICLE</small>
                      <h2 className={styles.articleTitle}>The Validation</h2>
                      <p className={styles.articleText}>&ldquo;{report.validation}&rdquo;</p>
                    </motion.div>
                  )}

                  {/* The Mirror */}
                  <motion.div
                    className={styles.reportArticle}
                    initial="hidden"
                    animate="visible"
                    variants={FADE_UP}
                    custom={2}
                  >
                    <small className={styles.articleLabel}>SCANNING ARTICLE</small>
                    <h2 className={styles.articleTitle}>The Mirror</h2>
                    <p className={styles.articleText}>
                      {report?.realCause || report?.root || 'A pattern installed before conscious choice was possible. Your mind made a decision to survive your environment. That decision became automatic.'}
                    </p>
                  </motion.div>

                  {/* Pattern Loop */}
                  {(report?.patternLoop || report?.loop) && (
                    <motion.div
                      className={styles.reportArticle}
                      initial="hidden"
                      animate="visible"
                      variants={FADE_UP}
                      custom={3}
                    >
                      <small className={styles.articleLabel}>SCANNING ARTICLE</small>
                      <h2 className={styles.articleTitle}>The Pattern Loop</h2>
                      <p className={styles.articleText}>
                        <strong>Trigger:</strong> {(report.patternLoop || report.loop)?.trigger || 'New opportunity or challenge'}<br /><br />
                        <strong>Coping:</strong> {(report.patternLoop || report.loop)?.copingMechanism || 'Initial excitement followed by avoidance'}<br /><br />
                        <strong>Cost:</strong> {(report.patternLoop || report.loop)?.humanCost || 'Years of unfinished potential and growing self-doubt'}
                      </p>
                    </motion.div>
                  )}

                  {/* NODE Highlight — FIXED: explain what "IDENTITY LOCKED" means */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FADE_UP}
                    custom={4}
                  >
                    <div className={styles.cyberHighlight}>NODE-3X</div>
                    <br /><br />
                    <div className={styles.cyberHighlightDark}>IDENTITY LOCKED</div>
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginTop: '8px', fontFamily: 'JetBrains Mono, monospace' }}>
                      Your consciousness signature has been permanently etched into the Blockplain. This identity is unique to you — no other person on Earth shares this pattern.
                    </p>
                  </motion.div>

                  {/* Teaching */}
                  {report?.teaching && (
                    <motion.div
                      className={styles.reportArticle}
                      initial="hidden"
                      animate="visible"
                      variants={FADE_UP}
                      custom={5}
                    >
                      <small className={styles.articleLabel}>SCANNING ARTICLE</small>
                      <h2 className={styles.articleTitle}>The Teaching</h2>
                      <p className={styles.articleText}>{report.teaching}</p>
                    </motion.div>
                  )}

                  {/* Cosmic Confirmation */}
                  {report?.cosmicConfirmation && (
                    <motion.div
                      className={styles.reportArticle}
                      initial="hidden"
                      animate="visible"
                      variants={FADE_UP}
                      custom={6}
                    >
                      <small className={styles.articleLabel}>SCANNING ARTICLE</small>
                      <h2 className={styles.articleTitle}>Cosmic Confirmation</h2>
                      <p className={styles.articleText}>{report.cosmicConfirmation}</p>
                    </motion.div>
                  )}

                  {/* FIXED: Explain the countdown timer */}
                  <div className={styles.connectedFooter}>
                    Connected via S-NET-{data.planeX}{data.planeY} · Exclusive access window: {formatTime(timeLeft)} remaining
                    <br />
                    <span style={{ fontSize: '0.6rem', opacity: 0.6 }}>
                      Your personalized solutions are held in this reserved window. After this period, the instruments return to the general pool.
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* ── Message Box ── */}
              <motion.div
                className={styles.messageBox}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
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
              </motion.div>
            </motion.div>
          )}

          {activePage === 2 && (
            <motion.div
              key="page2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className={styles.solutionsPage}>
                <div className={styles.solutionsHeader}>
                  <h2 className={styles.solutionsTitle}>Your Personalized Solutions</h2>
                  <p className={styles.solutionsSubtitle}>
                    3 instruments generated from your {mbti} blueprint — each targeting a different layer of your consciousness architecture
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  {(products || []).map((product: any, i: number) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.15 }}
                      style={{
                        background: 'rgba(255,255,255,0.02)',
                        border: '1px solid rgba(53, 248, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '28px',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '16px',
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
                        <div>
                          <div style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '0.65rem', color: '#35f8ff', letterSpacing: '0.2em', marginBottom: '6px' }}>
                            INSTRUMENT {String(i + 1).padStart(2, '0')}
                          </div>
                          <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.1rem', fontWeight: 700, marginBottom: '4px' }}>
                            {product.name}
                          </h3>
                          <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', fontStyle: 'italic' }}>
                            {product.tagline}
                          </p>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through' }}>
                            {formatPrice(product.price?.original || product.originalPrice || 97)}
                          </div>
                          <div style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.3rem', color: '#35f8ff', fontWeight: 700 }}>
                            {formatPrice(product.price?.discounted || product.price || 67)}
                          </div>
                        </div>
                      </div>

                      <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)', lineHeight: 1.6 }}>
                        {product.targetProblem}
                      </p>

                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        {product.whatYouGet?.slice(0, 3).map((item: string, j: number) => (
                          <span key={j} style={{ fontSize: '0.7rem', padding: '4px 10px', background: 'rgba(53, 248, 255, 0.08)', borderRadius: '12px', color: 'rgba(255,255,255,0.6)' }}>
                            {item.split('—')[0].trim()}
                          </span>
                        ))}
                      </div>

                      <div style={{ display: 'flex', gap: '12px', marginTop: '4px' }}>
                        <a
                          href={`/blueprint/${encodeURIComponent(csn)}/product/${product.id}`}
                          style={{
                            display: 'inline-block',
                            padding: '12px 28px',
                            background: 'linear-gradient(135deg, #35f8ff 0%, #0080ff 100%)',
                            color: '#0a0a1a',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '0.75rem',
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            boxShadow: '0 4px 15px rgba(53, 248, 255, 0.25)',
                          }}
                        >
                          {product.ctaText}
                        </a>
                        <a
                          href={`/blueprint/${encodeURIComponent(csn)}/product/${product.id}`}
                          style={{
                            display: 'inline-block',
                            padding: '12px 20px',
                            background: 'transparent',
                            color: 'rgba(255,255,255,0.6)',
                            fontFamily: 'Orbitron, sans-serif',
                            fontSize: '0.7rem',
                            fontWeight: 500,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            borderRadius: '8px',
                            textDecoration: 'none',
                            border: '1px solid rgba(255,255,255,0.15)',
                          }}
                        >
                          View Details
                        </a>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
