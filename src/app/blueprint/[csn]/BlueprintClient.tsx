'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Head from 'next/head';
import styles from './blueprint-detail.module.css';

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
  const [currentText, setCurrentText] = useState('');
  const frameRef = useRef(0);
  const queueRef = useRef<{ from: string; to: string; start: number; end: number; char?: string }[]>([]);
  const frameCount = useRef(0);

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

    if (complete === queue.length) {
      return;
    }

    frameCount.current++;
    frameRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    let counter = 0;
    const next = () => {
      const newText = phrases[counter % phrases.length];
      const oldText = currentText;
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
      counter++;
      setCurrentText(newText);
      setTimeout(next, 2500);
    };
    const timer = setTimeout(next, 1000);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameRef.current);
    };
  }, [phrases, animate, currentText]);

  return <span ref={elRef} className={className} />;
}

/* ── Share Button Component ── */
function ShareButtons({ csn, identity, mbti }: { csn: string; identity: string; mbti: string }) {
  const url = typeof window !== 'undefined' ? window.location.href : '';
  const text = `My Consciousness Blueprint has been etched. I am "${identity}" (${mbti}). CSN: ${csn}. Discover yours at Spiritual AI.`;

  const shareLinks = [
    {
      name: 'WhatsApp',
      icon: '💬',
      href: `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`,
    },
    {
      name: 'X',
      icon: '𝕏',
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
    },
    {
      name: 'Facebook',
      icon: '📘',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}&quote=${encodeURIComponent(text)}`,
    },
    {
      name: 'Reddit',
      icon: '🔴',
      href: `https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(text)}`,
    },
    {
      name: 'Instagram',
      icon: '📸',
      href: '#',
      onClick: () => {
        navigator.clipboard.writeText(url);
        alert('Link copied! Share it on Instagram.');
      },
    },
    {
      name: 'Copy',
      icon: '🔗',
      href: '#',
      onClick: async () => {
        await navigator.clipboard.writeText(url);
        alert('Blueprint link copied!');
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
                e.preventDefault();
                link.onClick();
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

/* ── Flip Card Component ── */
function FlipCard({ product, index }: { product: Product; index: number }) {
  const [flipped, setFlipped] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window;

  const productUrl = product.semanticSlug
    ? `/store/${product.semanticSlug}`
    : product.id
      ? `/store/${product.id}`
      : '#';

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isTouch || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    const inner = cardRef.current.querySelector(`.${styles.cardInner}`) as HTMLElement;
    if (inner) {
      inner.style.transform = `rotateY(${flipped ? 180 : 0}deg) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }
  };

  const handleMouseLeave = () => {
    if (isTouch || !cardRef.current) return;
    const inner = cardRef.current.querySelector(`.${styles.cardInner}`) as HTMLElement;
    if (inner) {
      inner.style.transform = `rotateY(${flipped ? 180 : 0}deg)`;
    }
  };

  return (
    <motion.div
      ref={cardRef}
      className={`${styles.card} ${flipped ? styles.cardFlipped : ''}`}
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      onClick={() => setFlipped(!flipped)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className={styles.cardInner}>
        <div className={`${styles.cardFace} ${styles.cardFront}`}>
          <div>
            <h2>{product.name}</h2>
            <p>{product.whyYou}</p>
          </div>
          <p className={styles.tapHint}>Tap or click to flip</p>
        </div>
        <div className={`${styles.cardFace} ${styles.cardBack}`}>
          <div>
            <h3>What's Inside</h3>
            <ul className={styles.features}>
              {product.formats.map((f, i) => (
                <li key={i}>{f}</li>
              ))}
              <li>Price: <strong>${product.price}</strong> <s>${product.originalPrice}</s></li>
            </ul>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '8px' }}>{product.urgencyLine}</p>
          </div>
          <div className={styles.ctaButtons}>
            <a href={productUrl} className={styles.ctaPrimary} onClick={(e) => e.stopPropagation()}>{product.ctaText}</a>
            <a href={productUrl} className={styles.ctaSecondary} onClick={(e) => e.stopPropagation()}>Learn More</a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main Component ── */
export default function BlueprintClient({ data, csn }: Props) {
  const [activePage, setActivePage] = useState<1 | 2>(1);
  const [message, setMessage] = useState('');
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSaving, setFeedbackSaving] = useState(false);

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

  return (
    <>
      <Head>
        <title>{`${identity} · ${mbti} | Spiritual AI`}</title>
        <meta name="description" content={`Consciousness Blueprint for ${mbti}. Pattern: ${identity}. CSN: ${csn}.`} />
        <meta property="og:title" content={`${identity} · ${mbti} | Spiritual AI`} />
        <meta property="og:description" content={`My Consciousness Blueprint has been etched. CSN: ${csn}.`} />
        <meta property="og:type" content="article" />
        <style dangerouslySetInnerHTML={{ __html: `
          @import url('https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=JetBrains+Mono:wght@300;400;500;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap');
          *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
          html { height: 100vh; scroll-behavior: smooth; }
          body { background-color: #0a0a1a; font-family: 'Barlow', sans-serif; font-size: 16px; font-weight: 500; color: #fff; min-height: 100vh; overflow-x: hidden; margin: 0; padding: 0; }
          @property --outrun { syntax: "<number>"; initial-value: 0; inherits: false; }
          @keyframes outrun { to { --outrun: 1; } }
          html::before { content: ""; position: fixed; bottom: 0; left: 0; right: 0; height: 100vh; z-index: -1; pointer-events: none; filter: brightness(1.125); animation: outrun 0.6s linear infinite; background: linear-gradient(transparent 20%, hsl(0, 67%, 55%) 60%, hsl(266, 49%, 25%) 60% 70%, hsla(319, 100%, 60%, 0.75), transparent 150%), repeating-linear-gradient(90deg, transparent 0px 2px, hsl(266, 49%, 25%) 3px 4px), radial-gradient(circle at center, transparent min(45vh, 45vw), hsla(319, 100%, 60%, 0.75) min(65vh, 65vw), hsl(266, 49%, 25%) 120%), linear-gradient(transparent 30vh, hsl(0, 67%, 55%) 30vh 30.2vh, transparent 30.2vh 35.2vh, hsl(0, 67%, 55%) 35.2vh 36vh, transparent 36vh 40vh, hsl(0, 67%, 55%) 40vh 41.6vh, transparent 41.6vh 45.1vh, hsl(0, 67%, 55%) 45.1vh 48.6vh, transparent 48.6vh 52.5vh, hsl(0, 67%, 55%) 52.5vh 57.5vh, transparent 57.5vh), radial-gradient(circle at center, hsl(60, 82%, 58%) min(45vh, 45vw), transparent min(45vh, 45vw)), linear-gradient(hsl(0, 67%, 55%) 60%, hsl(266, 49%, 25%) 60%, hsl(319, 100%, 60%) 150%); }
        `}} />
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

                  {/* NODE Highlight */}
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={FADE_UP}
                    custom={4}
                  >
                    <div className={styles.cyberHighlight}>NODE-3X</div>
                    <br /><br />
                    <div className={styles.cyberHighlightDark}>IDENTITY LOCKED</div>
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

                  <div className={styles.connectedFooter}>
                    Connected via S-NET-{data.planeX}{data.planeY} · {formatTime(timeLeft)} remaining
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
                  <h2 className={styles.solutionsTitle}>Recommended Solutions</h2>
                  <p className={styles.solutionsSubtitle}>
                    3 hyper-personalized instruments designed for your {mbti} architecture
                  </p>
                </div>

                <div className={styles.cardGrid}>
                  {(products || []).slice(0, 3).map((product, i) => (
                    <FlipCard key={product.id} product={product} index={i} />
                  ))}
                </div>

                {/* Additional Products */}
                {(products || []).length > 3 && (
                  <div style={{ marginTop: '40px' }}>
                    <h3 style={{
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '1.2rem',
                      textAlign: 'center',
                      marginBottom: '24px',
                      color: 'var(--text-secondary)',
                      letterSpacing: '0.1em',
                    }}>
                      Additional Instruments
                    </h3>
                    <div className={styles.cardGrid}>
                      {(products || []).slice(3).map((product, i) => (
                        <FlipCard key={product.id} product={product} index={i + 3} />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
