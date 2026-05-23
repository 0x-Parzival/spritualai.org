'use client';

import React from 'react';
import styles from './ConsciousnessBlueprint.module.css';

interface BlueprintData {
  header: {
    architecture: string;
    patternName: string;
    urgencyPercent: number;
    loc: number;
    csn: string;
  };
  meta: {
    frequencyEstimate: string;
    coreShadowPattern: string;
    rootBelief: string;
    dharmaPhase: string;
    identifiedProblem: string;
  };
  vedicOverview: {
    lagnaAndMoon: string;
    currentDasha: string;
    saturnStatus: string;
  };
  validation: string;
  realCause: string;
  patternLoop: {
    trigger: string;
    copingMechanism: string;
    humanCost: string;
  };
  frequencyDoorway: string;
  teaching: string;
  witnessQuestion: string;
  scriptureOfTheSelf: string;
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
}

interface Props {
  report: BlueprintData;
  products: Product[];
  csn: string;
}

const PRODUCT_ICONS: Record<string, string> = {
  consciousness_blueprint: '◈',
  perfectionism_blueprint: '◇',
  shadow_work_journal: '◉',
  feeling_body_audio: '◎',
  boundaries_guide: '▣',
  abundance_audio: '◈',
  advanced_shadow: '⬡',
};

export default function ConsciousnessBlueprint({ report, products, csn }: Props) {
  const {
    header,
    meta,
    vedicOverview,
    validation,
    realCause,
    patternLoop,
    frequencyDoorway,
    teaching,
    witnessQuestion,
    scriptureOfTheSelf,
  } = report;

  return (
    <div className={styles.root}>

      {/* ── SECTION 1: IDENTITY SEAL ── */}
      <section className={styles.seal}>
        <div className={styles.badge}>Consciousness Blueprint</div>
        <div className={styles.csn}>{csn}</div>
        <h1 className={styles.identity}>{header.patternName}</h1>
        <div className={styles.mbtiRow}>
          <span className={`${styles.chip} ${styles.chipMbti}`}>{header.architecture}</span>
          <span className={`${styles.chip} ${styles.chipHawkins}`}>Hawkins {header.loc}</span>
          <span className={`${styles.chip} ${styles.chipDharma}`}>{meta.dharmaPhase}</span>
        </div>
        <div className={styles.urgency}>
          <span className={styles.bodyMuted}>Pattern urgency: {header.urgencyPercent}%</span>
          <div className={styles.urgencyBar}>
            <div className={styles.urgencyFill} style={{ width: `${header.urgencyPercent}%` }} />
          </div>
        </div>
      </section>

      {/* ── SECTION 2: THE MIRROR ── */}
      <div className={styles.mirror}>
        <p className={styles.mirrorText}>{validation}</p>
      </div>

      {/* ── SECTION 3: PSYCHIC MAP ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Psychic Map</div>
        <h2 className={styles.sectionTitle}>How your mind is wired</h2>
        <div className={styles.psychicGrid}>
          <div className={styles.mapCard}>
            <div className={styles.mapLabel}>Frequency</div>
            <div className={styles.mapValue}>{meta.frequencyEstimate}</div>
          </div>
          <div className={styles.mapCard}>
            <div className={styles.mapLabel}>Shadow Pattern</div>
            <div className={styles.mapValue}>{meta.coreShadowPattern}</div>
          </div>
          <div className={styles.mapCard}>
            <div className={styles.mapLabel}>Root Belief</div>
            <div className={styles.mapValue}>{meta.rootBelief}</div>
          </div>
          <div className={styles.mapCard}>
            <div className={styles.mapLabel}>Dharma Phase</div>
            <div className={styles.mapValue}>{meta.dharmaPhase}</div>
          </div>
        </div>
        <p className={styles.body}>{realCause}</p>
      </section>

      {/* ── SECTION 4: VEDIC BLUEPRINT ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Vedic Blueprint</div>
        <h2 className={styles.sectionTitle}>Your cosmic coordinates</h2>
        <div className={styles.vedicCard}>
          <div className={styles.psychicGrid}>
            <div>
              <div className={styles.mapLabel}>Lagna & Moon</div>
              <div className={styles.mapValue}>{vedicOverview.lagnaAndMoon}</div>
            </div>
            <div>
              <div className={styles.mapLabel}>Current Dasha</div>
              <div className={styles.mapValue}>{vedicOverview.currentDasha}</div>
            </div>
          </div>
          <p className={styles.bodyMuted} style={{ marginTop: 16 }}>{vedicOverview.saturnStatus}</p>
        </div>
      </section>

      {/* ── SECTION 5: COMPLEX ANALYSIS ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Complex Analysis</div>
        <h2 className={styles.sectionTitle}>The mechanism beneath the pattern</h2>
        <div className={styles.complexCard}>
          <div className={styles.complexLabel}>Jungian Complex</div>
          <p className={styles.body}>{meta.coreShadowPattern} — this complex believes it is keeping you safe. It is actually keeping you small.</p>
        </div>
        <p className={styles.body}>{teaching}</p>
      </section>

      {/* ── SECTION 6: PATTERN LOOP ── */}
      <section className={styles.section}>
        <div className={styles.sectionLabel}>Pattern Loop</div>
        <h2 className={styles.sectionTitle}>The cycle, named</h2>
        <div className={styles.loopGrid}>
          <div className={styles.loopCard}>
            <div className={styles.loopIcon}>⚡</div>
            <div className={styles.loopTitle}>Trigger</div>
            <div className={styles.loopText}>{patternLoop.trigger}</div>
          </div>
          <div className={styles.loopCard}>
            <div className={styles.loopIcon}>🔄</div>
            <div className={styles.loopTitle}>Coping Mechanism</div>
            <div className={styles.loopText}>{patternLoop.copingMechanism}</div>
          </div>
          <div className={styles.loopCard}>
            <div className={styles.loopIcon}>💔</div>
            <div className={styles.loopTitle}>Human Cost</div>
            <div className={styles.loopText}>{patternLoop.humanCost}</div>
          </div>
        </div>
      </section>

      {/* ── SECTION 7: FREQUENCY DOORWAY ── */}
      <div className={styles.doorway}>
        <div className={styles.sectionLabel}>Frequency Doorway</div>
        <p className={styles.doorwayText}>{frequencyDoorway}</p>
        <p className={styles.doorwaySub}>This is the precise next step. Not a general principle — a specific instruction for your architecture.</p>
      </div>

      {/* ── SECTION 8: SCRIPTURE OF THE SELF ── */}
      <div className={styles.scripture}>
        <div className={styles.scriptureLabel}>Scripture of the Self</div>
        <p className={styles.scriptureText}>{scriptureOfTheSelf}</p>
      </div>

      {/* ── SECTION 9: WITNESS QUESTION ── */}
      <div className={styles.witness}>
        <div className={styles.witnessLabel}>Witness Question</div>
        <p className={styles.witnessText}>{witnessQuestion}</p>
        <p className={styles.bodyMuted} style={{ marginTop: 20 }}>This question is not answered here. It lives in you now.</p>
      </div>

      {/* ── SECTION 10: RECOMMENDED PRODUCTS ── */}
      <section className={styles.productsSection}>
        <div className={styles.productsHeader}>
          <h2 className={styles.productsTitle}>Your Pattern Dissolution Kit</h2>
          <p className={styles.productsSub}>Three tools calibrated to your specific architecture — not a general catalogue.</p>
        </div>

        {products && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className={styles.productCard}>
              <div className={styles.productIcon}>
                {PRODUCT_ICONS[product.id] || '◈'}
              </div>
              <div className={styles.productInfo}>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productHeadline}>{product.headline}</p>
                <p className={styles.productWhy}>{product.whyYou}</p>
                <div className={styles.productFormats}>
                  {product.formats.map((f) => (
                    <span key={f} className={styles.chip} style={{ fontSize: '0.7rem', padding: '3px 10px', marginRight: 6 }}>
                      {f}
                    </span>
                  ))}
                </div>
                <div className={styles.productPriceRow}>
                  <span className={styles.productOldPrice}>${product.originalPrice}</span>
                  <span className={styles.productPrice}>${product.price}</span>
                </div>
                <p className={styles.bodyMuted} style={{ fontSize: '0.8rem', marginTop: 6 }}>{product.urgencyLine}</p>
                <button className={styles.productCta}>{product.ctaText} →</button>
              </div>
            </div>
          ))
        ) : (
          <div className={styles.productCard}>
            <div className={styles.productIcon}>◈</div>
            <div className={styles.productInfo}>
              <h3 className={styles.productName}>The Complete Consciousness Blueprint</h3>
              <p className={styles.productHeadline}>Your complete transformation system — all patterns, all paths.</p>
              <p className={styles.productWhy}>Built for your specific architecture: {header.architecture} with {header.patternName}.</p>
              <div className={styles.productPriceRow}>
                <span className={styles.productOldPrice}>$197</span>
                <span className={styles.productPrice}>$97</span>
              </div>
              <button className={styles.productCta}>Get My Blueprint →</button>
            </div>
          </div>
        )}
      </section>

      {/* ── SHARE BAR ── */}
      <div className={styles.shareBar}>
        <span className={styles.shareLabel}>Share your blueprint:</span>
        <button className={styles.shareBtn} title="Copy link">⧉</button>
        <button className={styles.shareBtn} title="Twitter">𝕏</button>
        <button className={styles.shareBtn} title="WhatsApp">✉</button>
      </div>

      {/* ── FOOTER ── */}
      <div style={{ textAlign: 'center', padding: '40px 24px 60px' }}>
        <p className={styles.bodyMuted} style={{ fontSize: '0.75rem' }}>
          {csn} · Spiritual AI · Consciousness Blueprint
        </p>
      </div>
    </div>
  );
}
