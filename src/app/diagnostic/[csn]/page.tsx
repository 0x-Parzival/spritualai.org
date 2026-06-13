'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';

interface ReportData {
  header: {
    architecture: string;
    patternName: string;
    urgencyPercent: number;
    loc: number;
    csn?: string;
  };
  consciousnessIdentity?: string;
  mbti?: {
    name: string;
    archetype: string;
    rarity: string;
    spiritualPath: string;
  };
  meta?: {
    frequencyEstimate: string;
    coreShadowPattern: string;
    rootBelief: string;
    dharmaPhase: string;
    identifiedProblem: string;
    exchangeRounds?: number;
  };
  vedicOverview?: {
    lagnaAndMoon: string;
    currentDasha: string;
    saturnStatus: string;
  };
  validation?: string;
  realCause?: string;
  patternLoop?: {
    trigger: string;
    copingMechanism: string;
    humanCost: string;
    reset: string;
  };
  cosmicConfirmation?: string;
  costSection?: string;
  teaching?: string;
  witnessQuestion?: string;
  scriptureOfTheSelf?: string;
  mirror?: string;
  root?: string;
  path?: string;
}

interface Product {
  id: string;
  name: string;
  headline: string;
  whyYou: string;
  formats: string[];
  price: number;
  originalPrice: number;
  urgencyLine: string;
  ctaText: string;
  imageQuery?: string;
  patternMatch?: string;
}

const HAWKINS_LEVELS: Record<number, string> = {
  200: 'Courage — The threshold of empowerment',
  310: 'Neutrality — Flexibility and release',
  350: 'Willingness — Engagement and optimism',
  400: 'Acceptance — Forgiveness and peace',
  500: 'Love — Reverence and illumination',
  540: 'Joy — Serenity and completeness',
  600: 'Peace — Bliss and oneness',
  700: 'Enlightenment — Transcendence',
};

function getHawkinsDescription(level: number): string {
  const sorted = Object.keys(HAWKINS_LEVELS).map(Number).sort((a, b) => b - a);
  for (const threshold of sorted) {
    if (level >= threshold) return HAWKINS_LEVELS[threshold];
  }
  return 'Below Courage — Survival mode';
}

export default function DiagnosticReport() {
  const params = useParams();
  const router = useRouter();
  const { isSignedIn } = useUser();
  const csn = params?.csn as string;

  const [report, setReport] = useState<ReportData | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<string>('identity');
  const [showProducts, setShowProducts] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!csn) {
      setError('No CSN provided');
      setLoading(false);
      return;
    }

    async function fetchReport() {
      try {
        const res = await fetch(`/api/blockplain/fetch?csn=${encodeURIComponent(csn)}`);
        const data = await res.json();

        if (!data.success || !data.data) {
          // Try fetching from Blueprint table directly
          const res2 = await fetch(`/api/blockplain/verify/${csn}`);
          const data2 = await res2.json();
          if (data2.success && data2.data) {
            setReport(data2.data.reportData?.report || null);
            setProducts(data2.data.reportData?.products || []);
          } else {
            setError('Report not found. Your diagnostic may have expired.');
          }
        } else {
          setReport(data.data.report || null);
          setProducts(data.data.products || []);
        }
      } catch (err: any) {
        setError('Failed to load report: ' + err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchReport();
  }, [csn]);

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#030303',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
      }}>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          style={{
            width: '40px',
            height: '40px',
            border: '2px solid rgba(53, 248, 255, 0.2)',
            borderTop: '2px solid #35f8ff',
            borderRadius: '50%',
            marginBottom: '20px',
          }}
        />
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', letterSpacing: '2px', textTransform: 'uppercase' }}>
          Retrieving your Consciousness Diagnostic...
        </div>
      </div>
    );
  }

  if (error || !report) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#030303',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#fff',
        fontFamily: 'system-ui, sans-serif',
        padding: '20px',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🔮</div>
        <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1.2rem', marginBottom: '12px' }}>
          {error || 'Report Not Found'}
        </h1>
        <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.5)', maxWidth: '400px', lineHeight: 1.6, marginBottom: '24px' }}>
          {error
            ? 'We could not retrieve your diagnostic. Please try again or start a new session.'
            : 'Your Consciousness Diagnostic could not be located. It may not have been saved yet.'}
        </p>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '12px 32px',
            background: 'linear-gradient(135deg, #35f8ff, #0080ff)',
            color: '#0a0a1a',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.75rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Return Home
        </button>
      </div>
    );
  }

  const sections = [
    { id: 'identity', label: 'Identity', icon: '🧬' },
    { id: 'mirror', label: 'Mirror', icon: '🪞' },
    { id: 'pattern', label: 'Pattern Loop', icon: '🔄' },
    { id: 'cause', label: 'Root Cause', icon: '🌱' },
    { id: 'path', label: 'Your Path', icon: '🛤️' },
    { id: 'protocols', label: 'Protocols', icon: '📋' },
  ];

  return (
    <div style={{
      minHeight: '100vh',
      background: '#030303',
      color: '#fff',
      fontFamily: 'system-ui, sans-serif',
    }}>
      {/* Header */}
      <div style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: 'rgba(3,3,3,0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '16px 20px',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <div>
              <div style={{ fontSize: '0.65rem', color: 'rgba(255,255,255,0.4)', letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '4px' }}>
                Consciousness Diagnostic
              </div>
              <h1 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '1rem', fontWeight: 700, margin: 0 }}>
                {report.consciousnessIdentity || 'Your Blueprint'}
              </h1>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace', marginBottom: '2px' }}>
                {csn}
              </div>
              <div style={{ fontSize: '0.6rem', color: 'rgba(255,255,255,0.3)' }}>
                {report.header?.architecture} • {report.header?.patternName}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div style={{
            height: '3px',
            background: 'rgba(255,255,255,0.05)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}>
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: '100%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
              style={{
                height: '100%',
                background: 'linear-gradient(90deg, #35f8ff, #0080ff)',
                borderRadius: '2px',
              }}
            />
          </div>
        </div>
      </div>

      {/* Section Navigation */}
      <div style={{
        position: 'sticky',
        top: '73px',
        zIndex: 99,
        background: 'rgba(3,3,3,0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255,255,255,0.05)',
        padding: '8px 0',
        overflowX: 'auto',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', gap: '4px', padding: '0 20px' }}>
          {sections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setActiveSection(section.id);
                if (section.id === 'protocols') setShowProducts(true);
                contentRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              style={{
                padding: '6px 14px',
                background: activeSection === section.id ? 'rgba(53, 248, 255, 0.1)' : 'transparent',
                border: activeSection === section.id ? '1px solid rgba(53, 248, 255, 0.3)' : '1px solid rgba(255,255,255,0.05)',
                borderRadius: '20px',
                color: activeSection === section.id ? '#35f8ff' : 'rgba(255,255,255,0.5)',
                fontSize: '0.7rem',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              {section.icon} {section.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div ref={contentRef} style={{ maxWidth: '800px', margin: '0 auto', padding: '32px 20px 80px' }}>

        {/* Identity Section */}
        <AnimatePresence mode="wait">
          {activeSection === 'identity' && (
            <motion.div key="identity" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SectionTitle>Your Consciousness Identity</SectionTitle>

              <GlassCard>
                <Label>Architecture</Label>
                <Value>{report.header?.architecture}</Value>
                <Label>Pattern</Label>
                <Value>{report.header?.patternName}</Value>
                {report.mbti && (
                  <>
                    <Label>MBTI Type</Label>
                    <Value>{report.mbti.name} — {report.mbti.archetype}</Value>
                    <Label>Rarity</Label>
                    <Value>{report.mbti.rarity} of the population</Value>
                    <Label>Spiritual Path</Label>
                    <Value>{report.mbti.spiritualPath}</Value>
                  </>
                )}
              </GlassCard>

              {report.header?.loc && report.header.loc > 0 && (
                <GlassCard style={{ marginTop: '16px' }}>
                  <Label>Consciousness Level (Hawkins Scale)</Label>
                  <Value>{report.header.loc} — {getHawkinsDescription(report.header.loc)}</Value>
                  <div style={{
                    height: '6px',
                    background: 'linear-gradient(90deg, #ff3333, #ffcc00, #33ff77)',
                    borderRadius: '3px',
                    marginTop: '8px',
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute',
                      left: `${Math.min(100, (report.header.loc / 700) * 100)}%`,
                      top: '-4px',
                      width: '14px',
                      height: '14px',
                      background: '#fff',
                      borderRadius: '50%',
                      transform: 'translateX(-50%)',
                      boxShadow: '0 0 10px rgba(255,255,255,0.5)',
                    }} />
                  </div>
                </GlassCard>
              )}

              {report.vedicOverview && (
                <GlassCard style={{ marginTop: '16px' }}>
                  <Label>Vedic Overview</Label>
                  <Value>{report.vedicOverview.lagnaAndMoon}</Value>
                  <Value>{report.vedicOverview.currentDasha}</Value>
                  <Value>{report.vedicOverview.saturnStatus}</Value>
                </GlassCard>
              )}
            </motion.div>
          )}

          {activeSection === 'mirror' && (
            <motion.div key="mirror" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SectionTitle>The Mirror</SectionTitle>
              {report.validation && (
                <GlassCard>
                  <Label>Validation</Label>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)', margin: 0, fontStyle: 'italic' }}>
                    &ldquo;{report.validation}&rdquo;
                  </p>
                </GlassCard>
              )}
              {report.mirror && (
                <GlassCard style={{ marginTop: '16px' }}>
                  <Label>Reflection</Label>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {report.mirror}
                  </p>
                </GlassCard>
              )}
              {report.cosmicConfirmation && (
                <GlassCard style={{ marginTop: '16px' }}>
                  <Label>Cosmic Confirmation</Label>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {report.cosmicConfirmation}
                  </p>
                </GlassCard>
              )}
            </motion.div>
          )}

          {activeSection === 'pattern' && (
            <motion.div key="pattern" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SectionTitle>Your Pattern Loop</SectionTitle>
              {report.patternLoop && (
                <GlassCard>
                  <Label>Trigger</Label>
                  <Value>{report.patternLoop.trigger}</Value>
                  <Label>Coping Mechanism</Label>
                  <Value>{report.patternLoop.copingMechanism}</Value>
                  <Label>Human Cost</Label>
                  <Value style={{ color: '#ff6b6b' }}>{report.patternLoop.humanCost}</Value>
                  <Label>Reset Protocol</Label>
                  <Value style={{ color: '#35f8ff' }}>{report.patternLoop.reset}</Value>
                </GlassCard>
              )}
              {report.costSection && (
                <GlassCard style={{ marginTop: '16px' }}>
                  <Label>The Cost</Label>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {report.costSection}
                  </p>
                </GlassCard>
              )}
            </motion.div>
          )}

          {activeSection === 'cause' && (
            <motion.div key="cause" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SectionTitle>Root Cause</SectionTitle>
              {report.realCause && (
                <GlassCard>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                    {report.realCause}
                  </p>
                </GlassCard>
              )}
              {report.root && (
                <GlassCard style={{ marginTop: '16px' }}>
                  <Label>Core Root</Label>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {report.root}
                  </p>
                </GlassCard>
              )}
              {report.scriptureOfTheSelf && (
                <GlassCard style={{ marginTop: '16px', borderLeft: '3px solid #35f8ff' }}>
                  <Label>Scripture of the Self</Label>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.7)', margin: 0, fontStyle: 'italic' }}>
                    {report.scriptureOfTheSelf}
                  </p>
                </GlassCard>
              )}
            </motion.div>
          )}

          {activeSection === 'path' && (
            <motion.div key="path" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SectionTitle>Your Path Forward</SectionTitle>
              {report.teaching && (
                <GlassCard>
                  <Label>Teaching</Label>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.8, color: 'rgba(255,255,255,0.8)', margin: 0 }}>
                    {report.teaching}
                  </p>
                </GlassCard>
              )}
              {report.witnessQuestion && (
                <GlassCard style={{ marginTop: '16px', borderLeft: '3px solid #35f8ff' }}>
                  <Label>Witness Question</Label>
                  <p style={{ fontSize: '1rem', lineHeight: 1.6, color: '#35f8ff', margin: 0, fontWeight: 500 }}>
                    {report.witnessQuestion}
                  </p>
                </GlassCard>
              )}
              {report.path && (
                <GlassCard style={{ marginTop: '16px' }}>
                  <Label>Path</Label>
                  <p style={{ fontSize: '0.85rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
                    {report.path}
                  </p>
                </GlassCard>
              )}
            </motion.div>
          )}

          {activeSection === 'protocols' && (
            <motion.div key="protocols" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <SectionTitle>Your Personalized Protocols</SectionTitle>
              <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '24px', lineHeight: 1.6 }}>
                Based on your {report.header?.architecture} architecture and &ldquo;{report.header?.patternName}&rdquo; pattern,
                these protocols are designed specifically for your cognitive type.
              </p>
              {products.length > 0 ? (
                products.map((product, idx) => (
                  <GlassCard key={idx} style={{ marginBottom: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <h3 style={{ fontFamily: 'Orbitron, sans-serif', fontSize: '0.85rem', fontWeight: 700, margin: 0 }}>
                        {product.name}
                      </h3>
                      <div style={{ textAlign: 'right' }}>
                        <span style={{ fontSize: '1rem', fontWeight: 700, color: '#35f8ff' }}>${product.price}</span>
                        {product.originalPrice > product.price && (
                          <span style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.3)', textDecoration: 'line-through', marginLeft: '6px' }}>
                            ${product.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                    {product.headline && (
                      <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.6)', marginBottom: '8px', fontStyle: 'italic' }}>
                        {product.headline}
                      </p>
                    )}
                    <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: '12px' }}>
                      {product.whyYou}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
                      {product.formats.map((fmt, fi) => (
                        <span key={fi} style={{
                          padding: '3px 10px',
                          background: 'rgba(53, 248, 255, 0.08)',
                          border: '1px solid rgba(53, 248, 255, 0.2)',
                          borderRadius: '12px',
                          fontSize: '0.65rem',
                          color: '#35f8ff',
                        }}>
                          {fmt}
                        </span>
                      ))}
                    </div>
                    {product.urgencyLine && (
                      <p style={{ fontSize: '0.7rem', color: '#ff6b6b', marginTop: '12px', marginBottom: 0 }}>
                        {product.urgencyLine}
                      </p>
                    )}
                    <button style={{
                      marginTop: '16px',
                      padding: '10px 24px',
                      background: 'linear-gradient(135deg, #35f8ff, #0080ff)',
                      color: '#0a0a1a',
                      border: 'none',
                      borderRadius: '8px',
                      fontFamily: 'Orbitron, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 700,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      width: '100%',
                    }}>
                      {product.ctaText || 'Claim Your Protocol'}
                    </button>
                  </GlassCard>
                ))
              ) : (
                <GlassCard>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', margin: 0, textAlign: 'center', padding: '20px' }}>
                    No protocols available. Please complete your diagnostic first.
                  </p>
                </GlassCard>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'rgba(3,3,3,0.95)',
        backdropFilter: 'blur(20px)',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        padding: '12px 20px',
        display: 'flex',
        justifyContent: 'center',
        gap: '12px',
      }}>
        <button
          onClick={() => router.push('/')}
          style={{
            padding: '8px 20px',
            background: 'transparent',
            border: '1px solid rgba(255,255,255,0.15)',
            borderRadius: '8px',
            color: 'rgba(255,255,255,0.6)',
            fontSize: '0.7rem',
            cursor: 'pointer',
          }}
        >
          ← Back to Home
        </button>
        <button
          onClick={() => window.print()}
          style={{
            padding: '8px 20px',
            background: 'linear-gradient(135deg, #35f8ff, #0080ff)',
            color: '#0a0a1a',
            border: 'none',
            borderRadius: '8px',
            fontFamily: 'Orbitron, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            cursor: 'pointer',
          }}
        >
          Print Report
        </button>
      </div>
    </div>
  );
}

// ─── Shared Components ───

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 style={{
      fontFamily: 'Orbitron, sans-serif',
      fontSize: '1.1rem',
      fontWeight: 700,
      marginBottom: '20px',
      color: '#fff',
    }}>
      {children}
    </h2>
  );
}

function GlassCard({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.03)',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.05)',
      borderRadius: '16px',
      padding: '20px',
      ...style,
    }}>
      {children}
    </div>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <div style={{
      fontSize: '0.6rem',
      color: 'rgba(255,255,255,0.35)',
      letterSpacing: '2px',
      textTransform: 'uppercase',
      marginBottom: '4px',
      fontWeight: 600,
    }}>
      {children}
    </div>
  );
}

function Value({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: '0.9rem',
      color: 'rgba(255,255,255,0.85)',
      lineHeight: 1.6,
      marginBottom: '12px',
      ...style,
    }}>
      {children}
    </div>
  );
}
