// ============================================================
// SPIRITUAL AI — CONVERSATION ENGINE
// conversationEngine.ts  (used by SpiritualConversation.tsx)
// ============================================================

// ============================================================
// TYPES
// ============================================================

export interface UserState {
  chipSelected: string;
  firstAnswer: string;
  isPassiveUser?: boolean;
  name?: string;

  // Demographics (collected naturally)
  gender: 'male' | 'female' | 'unknown';
  ageRange: '15-21' | '22-28' | '28-35' | '35-42' | '42-50' | '50+' | 'unknown';
  lifeStage: string;
  birthDate?: string;
  birthTime?: string;
  birthPlace?: string;

  // Astrology Data (computed)
  astrology?: {
    sunSign: string;
    vedicRashi: string;
    nakshatra: string;
    currentMahadasha: string;
    majorTransits: string[];
  };

  // MBTI inference
  mbtiSignals: {
    E_I: { signal: 'E' | 'I' | null; confidence: number };
    N_S: { signal: 'N' | 'S' | null; confidence: number };
    T_F: { signal: 'T' | 'F' | null; confidence: number };
    J_P: { signal: 'J' | 'P' | null; confidence: number };
  };
  confirmedMBTI: string | null;

  // Pattern detection
  detectedPattern: string | null;
  patternConfidence: number;
  unconsciousPatterns: string[];
  triggerWords: string[];

  // Problem Worth
  problemWorth?: {
    totalHoursLost: number;
    financialCost: number;
    urgencyMultiplier: number;
    tier: string;
    suggestedPriceRange: string;
  };

  // Budget
  budget: 'low' | 'mid' | 'high' | 'unknown';

  // Conversation
  questionCount: number;
  exchangeHistory: Array<{ role: 'ai' | 'user'; content: string }>;
  finalShare: string | null;

  // New Tracking Metrics
  tracking: {
    responseTimeMillis: number[];
    wordChoice: { emotional: number; analytical: number };
    topicShifts: number;
    energyLevel: 'expanding' | 'contracting' | 'neutral';
    lastMessageTimestamp?: number;
    engagementScore: number; // 0 to 100
    isFatigued: boolean;
    sessionStartTime: number;
  };

  // Session Config
  sessionConfig: {
    targetQuestions: number;
    maxQuestions: number;
    pacingMode: 'deep' | 'rapid' | 'concluding';
  };

  // Output
  report: ConsciousnessReport | null;
  recommendedProducts: Product[];
}

export interface GeneratedQuestion {
  question: string;
  contextLine: string;
  options: Array<{
    text: string;
    subLabel: string;
    mbtiSignal: string;
    patternSignal: string;
  }>;
  allowFreeText: boolean;
  mbtiDimension: string;
}

export interface ConsciousnessReport {
  [key: string]: any;
  header: {
    architecture: string;
    patternName: string;
    urgencyPercent: number;
    sunSign: string;
    nakshatra: string;
  };
  mirror: string;
  root: string;
  loop: {
    trigger: string;
    copingMechanism: string;
    cost: string;
    reset: string;
  };
  cosmicConfirmation: string;
  costSection: string;
  path: string;
  products: Array<{
    name: string;
    forWhom: string;
    exactWords: string;
    mechanism: string;
    format: string;
    price: number;
    ctaText: string;
  }>;
}

export interface Product {
  id: string;
  name: string;
  headline: string;
  whyYou: string;
  formats: string[];
  price: number;
  originalPrice: number;
  urgencyLine: string;
  ctaText: string;
  imageQuery: string;
  patternMatch: string;
}

// ============================================================
// MBTI PROFILES
// ============================================================

export const MBTI_PROFILES: Record<string, {
  name: string;
  archetype: string;
  rarity: string;
  corePattern: string;
  learningStyle: string;
  buyingPattern: string;
  languageTone: string;
  spiritualPath: string;
  ctaStyle: string;
  designMode: 'study' | 'journey' | 'action' | 'explorer';
}> = {
  INFP: {
    name: 'The Idealist-Healer',
    archetype: 'The one who feels everything — and hides it perfectly.',
    rarity: '4.4%',
    corePattern: 'People Pleasing / Identity Confusion',
    learningStyle: 'Story → Meaning → Application',
    buyingPattern: 'Needs values alignment. Connects then buys.',
    languageTone: 'gentle, poetic, meaningful',
    spiritualPath: 'Bhakti Yoga',
    ctaStyle: 'invitation. "Begin Your Return"',
    designMode: 'journey',
  },
  INFJ: {
    name: 'The Rare Oracle',
    archetype: 'The one who understands everyone — and is understood by no one.',
    rarity: '1.5%',
    corePattern: 'Invisible Martyrdom / Savior Complex',
    learningStyle: 'Meaning → Pattern → Integration',
    buyingPattern: 'Needs to feel seen at a soul level.',
    languageTone: 'profound, sacred, seen',
    spiritualPath: 'Bhakti Yoga',
    ctaStyle: 'sacred invitation. "Fulfill Your Purpose"',
    designMode: 'journey',
  },
  INTJ: {
    name: 'The Sovereign Architect',
    archetype: 'The one who builds perfect systems — except for themselves.',
    rarity: '2.1%',
    corePattern: 'Perfectionism / Control Addiction',
    learningStyle: 'Systems first, then details',
    buyingPattern: 'ROI and proof first, then decides fast.',
    languageTone: 'Direct, strategic, precise',
    spiritualPath: 'Jnana Yoga',
    ctaStyle: 'logical conclusion. "Get Your Competitive Edge"',
    designMode: 'study',
  },
  INTP: {
    name: 'The Logician',
    archetype: 'The Abstract Architect',
    rarity: '3.3%',
    corePattern: 'Existential Analysis Paralysis',
    learningStyle: 'Logic first, then application',
    buyingPattern: 'Needs internal consistency and deep logic.',
    languageTone: 'Analytical, curious, objective',
    spiritualPath: 'Jnana Yoga',
    ctaStyle: 'structural solution. "Decode the System"',
    designMode: 'study',
  },
  ENTJ: {
    name: 'The Commander',
    archetype: 'The Strategic Leader',
    rarity: '1.8%',
    corePattern: 'Efficiency Addiction',
    learningStyle: 'Goal → Strategy → Execution',
    buyingPattern: 'Invests in leverage and power.',
    languageTone: 'Decisive, authoritative, future-oriented',
    spiritualPath: 'Jnana Yoga',
    ctaStyle: 'power move. "Claim Your Leverage"',
    designMode: 'study',
  },
  ENTP: {
    name: 'The Debater',
    archetype: 'The Visionary Disruptor',
    rarity: '3.2%',
    corePattern: 'Novelty Addiction / Chaos Loop',
    learningStyle: 'Angles → Experimentation → Discovery',
    buyingPattern: 'Buys the future and novel connections.',
    languageTone: 'Provocative, quick, intellectual',
    spiritualPath: 'Raja Yoga',
    ctaStyle: 'innovation. "Disrupt Your Pattern"',
    designMode: 'explorer',
  },
  ENFJ: {
    name: 'The Protagonist',
    archetype: 'The Inspiring Guide',
    rarity: '2.5%',
    corePattern: 'Validation Search',
    learningStyle: 'Connection → Meaning → Impact',
    buyingPattern: 'Needs to see collective transformation.',
    languageTone: 'Charismatic, empathetic, idealistic',
    spiritualPath: 'Bhakti Yoga',
    ctaStyle: 'impact. "Lead Your Own Life"',
    designMode: 'journey',
  },
  ENFP: {
    name: 'The Explorer',
    archetype: 'The Creative Catalyst',
    rarity: '8.1%',
    corePattern: 'Possibility Paralysis / Shiny Object Syndrome',
    learningStyle: 'Multiple angles → Playful experimentation',
    buyingPattern: 'Curiosity driven, needs novelty.',
    languageTone: 'Dynamic, playful, surprising',
    spiritualPath: 'Bhakti Yoga',
    ctaStyle: 'discovery. "Explore Your Potential"',
    designMode: 'explorer',
  },
  ISTJ: {
    name: 'The Sentinel',
    archetype: 'The Guardian of Order',
    rarity: '11.6%',
    corePattern: 'Rigid Survivalism',
    learningStyle: 'Detailed structure → Proven method',
    buyingPattern: 'Needs reliability and history.',
    languageTone: 'Reliable, grounded, methodical',
    spiritualPath: 'Karma Yoga',
    ctaStyle: 'proven path. "Activate the Protocol"',
    designMode: 'action',
  },
  ISFJ: {
    name: 'The Protector',
    archetype: 'The Quiet Supporter',
    rarity: '13.8%',
    corePattern: 'Self-Sacrifice Loop',
    learningStyle: 'Relatability → Practical Application',
    buyingPattern: 'Protects loved ones and peace.',
    languageTone: 'Warm, supportive, detailed',
    spiritualPath: 'Bhakti Yoga',
    ctaStyle: 'gentle support. "Protect Your Peace"',
    designMode: 'journey',
  },
  ESTJ: {
    name: 'The Executive',
    archetype: 'The Tradition Keeper',
    rarity: '8.7%',
    corePattern: 'Control Rigidness',
    learningStyle: 'Standard → Process → Verification',
    buyingPattern: 'Invests in authority and proven systems.',
    languageTone: 'Direct, factual, organized',
    spiritualPath: 'Karma Yoga',
    ctaStyle: 'structure. "Take Command"',
    designMode: 'action',
  },
  ESFJ: {
    name: 'The Consul',
    archetype: 'The Community Pillar',
    rarity: '12.3%',
    corePattern: 'Harmony Obsession',
    learningStyle: 'Group Context → Relatability → Action',
    buyingPattern: 'Follows social proof and community.',
    languageTone: 'Friendly, practical, social',
    spiritualPath: 'Karma Yoga',
    ctaStyle: 'connection. "Belong To Yourself"',
    designMode: 'action',
  },
  ISTP: {
    name: 'The Virtuoso',
    archetype: 'The Tactical Mechanic',
    rarity: '5.4%',
    corePattern: 'Detached Observation Loop',
    learningStyle: 'Trial → Feedback → Optimization',
    buyingPattern: 'Practical tools that work now.',
    languageTone: 'Concise, logical, hands-on',
    spiritualPath: 'Karma Yoga',
    ctaStyle: 'tactical. "Fix the System"',
    designMode: 'action',
  },
  ISFP: {
    name: 'The Adventurer',
    archetype: 'The Authentic Artist',
    rarity: '8.8%',
    corePattern: 'Internal Dissonance Loop',
    learningStyle: 'Aesthetic → Emotion → Experience',
    buyingPattern: 'Visual appeal and resonance.',
    languageTone: 'Sensory, creative, quiet',
    spiritualPath: 'Bhakti Yoga',
    ctaStyle: 'expression. "Live Your Truth"',
    designMode: 'journey',
  },
  ESTP: {
    name: 'The Entrepreneur',
    archetype: 'The Tactical Doer',
    rarity: '4.3%',
    corePattern: 'Stimulation Addiction / Surface Living',
    learningStyle: 'Example → Quick action → Results',
    buyingPattern: 'Impulse driven by speed.',
    languageTone: 'Bold, energetic, results-driven',
    spiritualPath: 'Karma Yoga',
    ctaStyle: 'speed. "Get Started In 5 Minutes"',
    designMode: 'action',
  },
  ESFP: {
    name: 'The Entertainer',
    archetype: 'The Vibrant Performer',
    rarity: '8.5%',
    corePattern: 'Avoidance of Depth',
    learningStyle: 'Flash → Action → Fun',
    buyingPattern: 'Impulsive based on excitement.',
    languageTone: 'Energetic, sensory, spontaneous',
    spiritualPath: 'Karma Yoga',
    ctaStyle: 'vibrancy. "Feel Alive Now"',
    designMode: 'action',
  },
};

// ============================================================
// PATTERNS
// ============================================================

export const PATTERNS: Record<string, {
  name: string;
  triggers: string[];
  product: string;
  path: string;
  societyAngle: string;
  urgencyBoost: number;
  rootCause: string;
  runningSince: string;
}> = {
  victim_loop: {
    name: "Victim Loop",
    triggers: ["always happens to me", "nothing works", "why me", "unfair", "stuck forever"],
    product: "shadow_work_journal",
    path: "Karma Yoga track",
    societyAngle: "Break the loop, join those who did.",
    urgencyBoost: 3,
    rootCause: "External locus of control installed before choice was possible.",
    runningSince: "Likely age 8–14",
  },
  perfectionism: {
    name: "Perfectionism",
    triggers: ["not good enough", "scared to start", "never finish", "never ready", "must be perfect"],
    product: "perfectionism_blueprint",
    path: "Jnana Yoga track",
    societyAngle: "Done is sacred. Perfect is the enemy of free.",
    urgencyBoost: 2,
    rootCause: "Standards weaponized inward as self-sabotage.",
    runningSince: "Likely age 10–15",
  },
  emotional_avoidance: {
    name: "Emotional Avoidance",
    triggers: ["don't know why I feel", "can't explain it", "just numb", "disconnected", "fine"],
    product: "feeling_body_audio",
    path: "Bhakti Yoga track",
    societyAngle: "Feel to heal. Your depth is your power.",
    urgencyBoost: 2,
    rootCause: "Emotional shutdown as survival response to early overwhelm.",
    runningSince: "Likely age 6–12",
  },
  people_pleasing: {
    name: "People Pleasing",
    triggers: ["everyone else", "let them down", "their needs", "can't say no", "sorry"],
    product: "boundaries_guide",
    path: "Karma Yoga track",
    societyAngle: "Your 'no' is the border of your soul.",
    urgencyBoost: 1,
    rootCause: "Unmet need for authentic expression installed as conditional love.",
    runningSince: "Likely age 7–13",
  },
  scarcity_mindset: {
    name: "Scarcity Mindset",
    triggers: ["can't afford", "never enough", "what's the point", "losing", "lack"],
    product: "abundance_audio",
    path: "Jnana Yoga track",
    societyAngle: "From lack to legacy. Change the frequency.",
    urgencyBoost: 2,
    rootCause: "Scarcity identity formed during formative resource experiences.",
    runningSince: "Likely age 10–18",
  },
  spiritual_bypassing: {
    name: "Spiritual Bypassing",
    triggers: ["already meditate", "know all this", "tried everything", "still stuck", "higher vibration"],
    product: "advanced_shadow",
    path: "Integration Track",
    societyAngle: "The only way out is through. No more hiding in the light.",
    urgencyBoost: 4,
    rootCause: "Using spiritual practice as sophisticated avoidance of direct pattern work.",
    runningSince: "Likely age 18–28",
  }
};

// ============================================================
// PRODUCT CATALOG
// ============================================================

export const PRODUCT_CATALOG: Record<string, Product> = {
  shadow_work_journal: {
    id: 'shadow_work_journal',
    name: 'The Shadow Work Journal',
    headline: 'Break the pattern you\'ve been carrying for years.',
    whyYou: 'Built for the exact pattern running beneath your surface.',
    formats: ['ebook', 'audiobook', 'ai_chatbot'],
    price: 47,
    originalPrice: 97,
    urgencyLine: 'Downloaded by 247 people with your pattern this week.',
    ctaText: 'Begin The Break',
    imageQuery: 'shadow light transformation lotus dark',
    patternMatch: 'victim_loop',
  },
  perfectionism_blueprint: {
    id: 'perfectionism_blueprint',
    name: 'The Perfectionism Dissolution Blueprint',
    headline: 'From paralysis to precision in 21 days.',
    whyYou: 'A systematic framework for the architecture behind your perfectionism.',
    formats: ['ebook', 'audiobook', 'mini_app'],
    price: 67,
    originalPrice: 127,
    urgencyLine: '89 people with your cognitive profile started this week.',
    ctaText: 'Start The System',
    imageQuery: 'mountain clarity precision architecture minimal',
    patternMatch: 'perfectionism',
  },
  feeling_body_audio: {
    id: 'feeling_body_audio',
    name: 'The Feeling Body Reconnection',
    headline: 'Reconnect with what numbness has been protecting.',
    whyYou: 'Designed for minds that process by going around emotions.',
    formats: ['audiobook', 'guided_meditation', 'ai_chatbot'],
    price: 37,
    originalPrice: 77,
    urgencyLine: '134 people started reconnecting this month.',
    ctaText: 'Begin Reconnection',
    imageQuery: 'ocean waves feeling depth healing water',
    patternMatch: 'emotional_avoidance',
  },
  boundaries_guide: {
    id: 'boundaries_guide',
    name: 'The Authentic Boundaries System',
    headline: 'Stop disappearing. Start existing fully.',
    whyYou: 'For those who learned that love was conditional.',
    formats: ['ebook', 'audiobook', 'workbook'],
    price: 47,
    originalPrice: 97,
    urgencyLine: '312 people stopped people-pleasing with this system.',
    ctaText: 'Reclaim Your Space',
    imageQuery: 'butterfly freedom identity authentic transformation',
    patternMatch: 'people_pleasing',
  },
  abundance_audio: {
    id: 'abundance_audio',
    name: 'The Abundance Consciousness Rewire',
    headline: 'Change what your mind believes about what you deserve.',
    whyYou: 'For scarcity that lives below the surface.',
    formats: ['audiobook', 'meditation_series', 'ai_chatbot'],
    price: 37,
    originalPrice: 67,
    urgencyLine: '178 people rewired their abundance frequency.',
    ctaText: 'Begin The Rewire',
    imageQuery: 'abundance light golden expansion consciousness',
    patternMatch: 'scarcity_mindset',
  },
  advanced_shadow: {
    id: 'advanced_shadow',
    name: 'The Advanced Shadow Integration System',
    headline: 'For those who already know — and are still stuck.',
    whyYou: 'Built for spiritually intelligent people bypassing the real work.',
    formats: ['ebook', 'audiobook', 'ai_chatbot'],
    price: 97,
    originalPrice: 197,
    urgencyLine: 'For serious practitioners only.',
    ctaText: 'Begin Integration',
    imageQuery: 'ancient wisdom sacred geometry integration depth',
    patternMatch: 'spiritual_bypassing',
  },
  consciousness_blueprint: {
    id: 'consciousness_blueprint',
    name: 'The Complete Consciousness Blueprint',
    headline: 'Your complete transformation system — all patterns, all paths.',
    whyYou: 'The full suite for your specific architecture.',
    formats: ['ebook', 'audiobook', 'ai_chatbot', 'mini_app'],
    price: 97,
    originalPrice: 197,
    urgencyLine: 'Complete system. Limited founding member pricing.',
    ctaText: 'Get My Blueprint',
    imageQuery: 'consciousness stars universe transformation complete',
    patternMatch: 'all',
  },
};

// ============================================================
// DETECTORS
// ============================================================

export function detectPattern(text: string): { pattern: string; confidence: number; triggerWords: string[] } {
  const lower = text.toLowerCase();
  let bestPattern = "victim_loop"; // fallback
  let maxMatches = 0;
  let foundTriggers: string[] = [];

  for (const [key, data] of Object.entries(PATTERNS)) {
    const matches = data.triggers.filter((t: string) => lower.includes(t));
    if (matches.length > maxMatches) {
      maxMatches = matches.length;
      bestPattern = key;
      foundTriggers = matches;
    }
  }

  return {
    pattern: bestPattern,
    confidence: Math.min(maxMatches * 0.35, 1.0),
    triggerWords: foundTriggers
  };
}

export function analyzeWordChoice(text: string): { emotional: number; analytical: number } {
  if (!text) return { emotional: 0, analytical: 0 };
  const lower = text.toLowerCase();
  const emotionalKeywords = ['feel', 'hurt', 'sad', 'happy', 'love', 'pain', 'heart', 'soul', 'empty', 'lonely', 'anxiety', 'fear', 'joy'];
  const analyticalKeywords = ['think', 'logic', 'reason', 'why', 'how', 'mechanism', 'system', 'structure', 'analyze', 'process', 'data', 'fact'];
  const emotional = emotionalKeywords.filter(w => lower.includes(w)).length;
  const analytical = analyticalKeywords.filter(w => lower.includes(w)).length;
  return { emotional, analytical };
}

export function detectEnergyLevel(text: string, prevText?: string): 'expanding' | 'contracting' | 'neutral' {
  const currentLen = text.length;
  const prevLen = prevText?.length || 0;
  if (currentLen > prevLen + 20) return 'expanding';
  if (currentLen < prevLen - 20 && prevLen > 0) return 'contracting';
  return 'neutral';
}

export function isTopicShift(text: string, prevText?: string): boolean {
  if (!prevText) return false;
  const currentWords = new Set(text.toLowerCase().split(/\s+/).filter(w => w.length > 4));
  const prevWords = new Set(prevText.toLowerCase().split(/\s+/).filter(w => w.length > 4));
  let overlap = 0;
  currentWords.forEach(w => { if (prevWords.has(w)) overlap++; });
  return overlap === 0 && currentWords.size > 0;
}

export function detectMBTISignals(text: string): Partial<UserState['mbtiSignals']> {
  const lower = text.toLowerCase();
  const signals: Partial<UserState['mbtiSignals']> = {};

  const eSignals = ['everyone', 'people', 'friends', 'social', 'talk to', 'share', 'group'];
  const iSignals = ['alone', 'myself', 'quiet', 'private', 'recharge', 'solitude', 'space'];
  const eScore = eSignals.filter(s => lower.includes(s)).length;
  const iScore = iSignals.filter(s => lower.includes(s)).length;
  if (eScore > iScore) signals.E_I = { signal: 'E', confidence: Math.min(eScore * 0.3, 1) };
  else if (iScore > eScore) signals.E_I = { signal: 'I', confidence: Math.min(iScore * 0.3, 1) };

  const nSignals = ['meaning', 'pattern', 'why', 'future', 'possible', 'imagine', 'deeper'];
  const sSignals = ['practical', 'real', 'facts', 'actual', 'concrete', 'specific', 'now'];
  const nScore = nSignals.filter(s => lower.includes(s)).length;
  const sScore = sSignals.filter(s => lower.includes(s)).length;
  if (nScore > sScore) signals.N_S = { signal: 'N', confidence: Math.min(nScore * 0.3, 1) };
  else if (sScore > nScore) signals.N_S = { signal: 'S', confidence: Math.min(sScore * 0.3, 1) };

  const tSignals = ['logic', 'reason', 'think', 'analyze', 'data', 'efficient', 'objective'];
  const fSignals = ['feel', 'heart', 'care', 'hurt', 'emotion', 'values', 'connection'];
  const tScore = tSignals.filter(s => lower.includes(s)).length;
  const fScore = fSignals.filter(s => lower.includes(s)).length;
  if (tScore > fScore) signals.T_F = { signal: 'T', confidence: Math.min(tScore * 0.3, 1) };
  else if (fScore > tScore) signals.T_F = { signal: 'F', confidence: Math.min(fScore * 0.3, 1) };

  const jSignals = ['plan', 'schedule', 'decide', 'finish', 'structure', 'organized', 'control'];
  const pSignals = ['flexible', 'open', 'spontaneous', 'options', 'adapt', 'freedom'];
  const jScore = jSignals.filter(s => lower.includes(s)).length;
  const pScore = pSignals.filter(s => lower.includes(s)).length;
  if (jScore > pScore) signals.J_P = { signal: 'J', confidence: Math.min(jScore * 0.3, 1) };
  else if (pScore > jScore) signals.J_P = { signal: 'P', confidence: Math.min(pScore * 0.3, 1) };

  return signals;
}

export function computeMBTI(signals: UserState['mbtiSignals']): { type: string; confidence: number } {
  const e_i = signals.E_I?.signal || 'I';
  const n_s = signals.N_S?.signal || 'N';
  const t_f = signals.T_F?.signal || 'F';
  const j_p = signals.J_P?.signal || 'P';
  const avgConfidence = (
    (signals.E_I?.confidence || 0.5) +
    (signals.N_S?.confidence || 0.5) +
    (signals.T_F?.confidence || 0.5) +
    (signals.J_P?.confidence || 0.5)
  ) / 4;
  return { type: `${e_i}${n_s}${t_f}${j_p}`, confidence: avgConfidence };
}

export function recommendProducts(pattern: string | null, mbtiType: string, budget: string, gender: string): Product[] {
  const products: Product[] = [];
  const pat = PATTERNS[pattern || 'victim_loop'] || PATTERNS['victim_loop'];
  
  const primary = PRODUCT_CATALOG[pat.product];
  if (primary) products.push(adaptProductToUser(primary, mbtiType, gender));
  
  products.push(adaptProductToUser(PRODUCT_CATALOG.consciousness_blueprint, mbtiType, gender));
  
  if (budget === 'high') {
    products.push(adaptProductToUser(PRODUCT_CATALOG.advanced_shadow, mbtiType, gender));
  } else {
    products.push(adaptProductToUser(PRODUCT_CATALOG.feeling_body_audio, mbtiType, gender));
  }
  return products.slice(0, 3);
}

function adaptProductToUser(product: Product, mbtiType: string, gender: string): Product {
  const profile = MBTI_PROFILES[mbtiType] || MBTI_PROFILES['INFP'];
  return {
    ...product,
    whyYou: `Because you're ${profile.name} — and process through ${profile.learningStyle}.`,
    ctaText: profile.ctaStyle.split('"')[1] || product.ctaText,
  };
}

export function getLifeStage(ageRange: string): string {
  const stages: Record<string, string> = {
    '18-24': 'The Awakening — Identity Formation',
    '25-34': 'The Crucible — Purpose and Direction',
    '35-44': 'The Reckoning — Meaning and Legacy',
    '45+': 'The Integration — Peace and Wholeness',
    'unknown': 'The Journey',
  };
  return stages[ageRange] || 'The Journey';
}

export function createInitialUserState(chip: string): UserState {
  return {
    chipSelected: chip,
    firstAnswer: '',
    gender: 'unknown',
    ageRange: 'unknown',
    lifeStage: 'The Journey',
    mbtiSignals: {
      E_I: { signal: null, confidence: 0 },
      N_S: { signal: null, confidence: 0 },
      T_F: { signal: null, confidence: 0 },
      J_P: { signal: null, confidence: 0 },
    },
    confirmedMBTI: null,
    detectedPattern: null,
    patternConfidence: 0,
    unconsciousPatterns: [],
    triggerWords: [],
    budget: 'unknown',
    questionCount: 0,
    exchangeHistory: [],
    finalShare: null,
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
    sessionConfig: {
      targetQuestions: 5,
      maxQuestions: 8,
      pacingMode: 'deep',
    },
    report: null,
    recommendedProducts: [],
  };
}

// ============================================================
// VEDIC & LIFE PHASE HELPERS
// ============================================================

export function getLifeStageData(age: number): { 
  name: string; 
  phase: string; 
  multiplier: number; 
  struggle: string;
  question: string;
} {
  if (age >= 15 && age <= 21) return { 
    name: 'THE AWAKENING', phase: 'Identity formation', multiplier: 1.2, 
    struggle: 'Belonging vs individuation', question: 'Who am I?' 
  };
  if (age >= 22 && age <= 28) return { 
    name: 'THE CRUCIBLE', phase: 'Testing the self in the world', multiplier: 1.4, 
    struggle: 'Ambition vs authenticity', question: 'Do I belong here?' 
  };
  if (age >= 28 && age <= 35) return { 
    name: 'THE RECKONING', phase: 'Saturn return (age 29-30)', multiplier: 1.8, 
    struggle: 'Who I am vs who I thought I\'d be', question: 'Is this really my life?' 
  };
  if (age >= 35 && age <= 42) return { 
    name: 'THE INTEGRATION', phase: 'Mid-life approach', multiplier: 1.5, 
    struggle: 'Achievement vs meaning', question: 'What actually matters?' 
  };
  if (age >= 42 && age <= 50) return { 
    name: 'THE CROSSROADS', phase: 'Uranus opposition (age 42-44)', multiplier: 1.6, 
    struggle: 'Legacy vs liberation', question: 'Who have I become?' 
  };
  if (age >= 50) return { 
    name: 'THE HARVEST', phase: 'Wisdom years', multiplier: 1.3, 
    struggle: 'Acceptance vs regret', question: 'What did it all mean?' 
  };
  return { 
    name: 'THE JOURNEY', phase: 'Discovery', multiplier: 1.0, 
    struggle: 'Growth', question: 'Where am I going?' 
  };
}

export function computeVedicData(dob: string): UserState['astrology'] {
  const date = new Date(dob);
  if (isNaN(date.getTime())) return undefined;

  const month = date.getMonth() + 1;
  const day = date.getDate();

  // Simple Sun Sign
  let sunSign = '';
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) sunSign = 'Aries';
  else if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) sunSign = 'Taurus';
  else if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) sunSign = 'Gemini';
  else if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) sunSign = 'Cancer';
  else if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) sunSign = 'Leo';
  else if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) sunSign = 'Virgo';
  else if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) sunSign = 'Libra';
  else if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) sunSign = 'Scorpio';
  else if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) sunSign = 'Sagittarius';
  else if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) sunSign = 'Capricorn';
  else if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) sunSign = 'Aquarius';
  else if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) sunSign = 'Pisces';

  // Vedic Rashi (Moon Sign — approx 23 days behind)
  const vedicDate = new Date(date);
  vedicDate.setDate(vedicDate.getDate() - 23);
  const vMonth = vedicDate.getMonth() + 1;
  const vDay = vedicDate.getDate();
  
  let vedicRashi = '';
  if ((vMonth === 3 && vDay >= 21) || (vMonth === 4 && vDay <= 19)) vedicRashi = 'Aries';
  else if ((vMonth === 4 && vDay >= 20) || (vMonth === 5 && vDay <= 20)) vedicRashi = 'Taurus';
  else if ((vMonth === 5 && vDay >= 21) || (vMonth === 6 && vDay <= 20)) vedicRashi = 'Gemini';
  else if ((vMonth === 6 && vDay >= 21) || (vMonth === 7 && vDay <= 22)) vedicRashi = 'Cancer';
  else if ((vMonth === 7 && vDay >= 23) || (vMonth === 8 && vDay <= 22)) vedicRashi = 'Leo';
  else if ((vMonth === 8 && vDay >= 23) || (vMonth === 9 && vDay <= 22)) vedicRashi = 'Virgo';
  else if ((vMonth === 9 && vDay >= 23) || (vMonth === 10 && vDay <= 22)) vedicRashi = 'Libra';
  else if ((vMonth === 10 && vDay >= 23) || (vMonth === 11 && vDay <= 21)) vedicRashi = 'Scorpio';
  else if ((vMonth === 11 && vDay >= 22) || (vMonth === 12 && vDay <= 21)) vedicRashi = 'Sagittarius';
  else if ((vMonth === 12 && vDay >= 22) || (vMonth === 1 && vDay <= 19)) vedicRashi = 'Capricorn';
  else if ((vMonth === 1 && vDay >= 20) || (vMonth === 2 && vDay <= 18)) vedicRashi = 'Aquarius';
  else if ((vMonth === 2 && vDay >= 19) || (vMonth === 3 && vDay <= 20)) vedicRashi = 'Pisces';

  // Placeholder for Nakshatra and Dasha
  const nakshatras = ['Ashwini', 'Bharani', 'Krittika', 'Rohini', 'Mrigashira', 'Ardra', 'Punarvasu', 'Pushya', 'Ashlesha', 'Magha', 'Purva Phalguni', 'Uttara Phalguni', 'Hasta', 'Chitra', 'Swati', 'Vishakha', 'Anuradha', 'Jyeshtha', 'Mula', 'Purva Ashadha', 'Uttara Ashadha', 'Shravana', 'Dhanishtha', 'Shatabhisha', 'Purva Bhadrapada', 'Uttara Bhadrapada', 'Revati'];
  const nakshatra = nakshatras[(vMonth * 2 + (vDay > 15 ? 1 : 0)) % 27];

  const dashas = ['Ketu', 'Venus', 'Sun', 'Moon', 'Mars', 'Rahu', 'Jupiter', 'Saturn', 'Mercury'];
  const age = new Date().getFullYear() - date.getFullYear();
  const currentMahadasha = dashas[Math.floor(age / 13) % 9]; // Rough estimate

  return {
    sunSign,
    vedicRashi,
    nakshatra,
    currentMahadasha,
    majorTransits: ['Saturn in Aquarius', 'Jupiter in Taurus'],
  };
}

export function calculateProblemWorth(years: number, weeklyHours: number, age: number): UserState['problemWorth'] {
  const totalHoursLost = years * 52 * weeklyHours;
  const financialCost = totalHoursLost * 15;
  const multiplier = getLifeStageData(age).multiplier;
  const finalWorth = financialCost * multiplier;

  let tier = 'low';
  let suggestedPriceRange = '$17-47';
  if (multiplier >= 1.5) { tier = 'high'; suggestedPriceRange = '$97-197'; }
  else if (multiplier >= 1.3) { tier = 'mid'; suggestedPriceRange = '$47-97'; }
  
  if (multiplier >= 1.8) { tier = 'critical'; suggestedPriceRange = '$197-297'; }

  return {
    totalHoursLost,
    financialCost,
    urgencyMultiplier: multiplier,
    tier,
    suggestedPriceRange
  };
}
