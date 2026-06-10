/**
 * lib/product-generator.ts
 * Generates personalized product recommendations and copy.
 */

export function generateFallbackProducts(
  patternId: string,
  mbtiType: string,
  mbtiProfile: any,
  patternData: any,
  problem: string,
  shadow: string,
  lifeStage?: string
): any[] {
  const patternName = patternData.name;
  const rootCause = patternData.rootCause;
  const runningSince = patternData.runningSince;

  return [
    {
      id: `${patternId}-dissolution`,
      name: `The ${patternName} Dissolution Protocol`,
      tagline: `How to stop ${patternName.toLowerCase()} without ${getObstacleForPattern(patternId)} in 21 days`,
      targetProblem: `Your ${patternName} — the pattern that has been running since ${runningSince.toLowerCase()}.`,
      desperateReason: `You've tried willpower. You've tried therapy. You've tried "just thinking positive." Nothing works because you've been treating the symptom. The real cause is: ${rootCause.toLowerCase()}`,
      realCause: rootCause,
      solutionMechanism: `Spiritual AI cross-references your ${mbtiType} cognitive stack with your ${patternName} pattern and your Vedic imprint to produce a dissolution protocol that no human therapist could create — because no human has access to all three frameworks simultaneously.`,
      speedSpecificityConsistency: {
        speed: 'First shift within 7 days',
        specific: `Named to your exact ${patternName} pattern running since ${runningSince.toLowerCase()}`,
        consistent: 'Same rigorous analysis every time, no therapist off-days',
      },
      damagingAdmission: `This is not a magic pill. It requires you to do the work — specifically, one imperfect action per day for 21 days. If you're not willing to be uncomfortable, this isn't for you.`,
      transition: `You've carried this since ${runningSince.toLowerCase()}. That's long enough. Here's the door.`,
      whatYouGet: [
        `The ${patternName} Dissolution Blueprint (PDF + Audio) — your exact protocol`,
        `AI Pattern Tracker — daily check-in that adapts to your progress`,
        `Shadow Integration Workbook — for the days when the pattern fights back`,
      ],
      valueStack: [
        { item: 'Dissolution Blueprint', value: '47', reason: 'Your exact protocol, named to your pattern' },
        { item: 'AI Pattern Tracker', value: '27', reason: 'Daily adaptive guidance' },
        { item: 'Shadow Workbook', value: '17', reason: 'For the hard days' },
      ],
      price: { original: 97, discounted: 47 },
      ctaText: mbtiProfile.ctaStyle?.split('"')[1] || 'Begin The Dissolution',
      security: {
        personalization: `Built for your ${mbtiType} architecture carrying "${patternName}" — not generic advice`,
        differentiation: `Only Spiritual AI cross-references Vedic + Jungian + MBTI to produce this precision`,
        privacy: 'Your data is encrypted and never shared. Your blueprint is yours alone.',
      },
      bonuses: [
        { name: 'Emergency Pattern Interrupt Audio', description: 'For when the pattern activates in real-time', value: '27' },
        { name: '7-Day Quick Start Guide', description: 'Skip the theory, start dissolving today', value: '17' },
      ],
      guarantee: `If you don't experience a measurable shift in your ${patternName} pattern within 21 days of following the protocol, we refund you. No questions.`,
      urgency: `Analysis slots are processed in batches of 50. Current batch: ${Math.floor(Math.random() * 30) + 20}/50 filled.`,
      tiers: [
        {
          name: 'The Initiation',
          includes: ['Dissolution Blueprint', 'AI Pattern Tracker'],
          price: '47',
          forWho: 'For those ready to break the pattern',
        },
        {
          name: 'The Deep Dive',
          includes: ['Everything in Initiation', 'Shadow Integration Workbook', 'Emergency Audio'],
          price: '67',
          forWho: 'For those who want the complete system',
        },
        {
          name: 'The Full Transformation',
          includes: ['Everything in Deep Dive', '1-on-1 AI Session', 'Lifetime Updates'],
          price: '97',
          forWho: 'For those who want total pattern dissolution',
        },
      ],
      imageBrief: `Dark obsidian background with a single ${getVisualAnchor(patternId)} rendered in thin gold sigil lines. The ${patternName} symbol being dissolved into light. Minimal, sacred, precise.`,
    },
    {
      id: `${mbtiType.toLowerCase()}-shadow-integration`,
      name: `The ${mbtiProfile.name} Shadow Integration System`,
      tagline: `How to integrate your shadow without ${getShadowObstacle(mbtiType)} in 14 days`,
      targetProblem: `Your shadow archetype "${shadow}" — the part of yourself you've been suppressing because it doesn't fit your ${mbtiType} self-image.`,
      desperateReason: `As ${mbtiProfile.archetype.toLowerCase()}, you've spent your life performing a version of yourself that isn't real. The gap between who you are and who you perform is where your suffering lives.`,
      realCause: `Your ${mbtiType} cognitive stack overuses ${getDominantFunction(mbtiType)} and suppresses ${getInferiorFunction(mbtiType)}. This creates a shadow that runs your life from underneath.`,
      solutionMechanism: `Spiritual AI maps your exact shadow architecture using your MBTI cognitive stack, your Vedic nodal axis, and your Jungian shadow pattern to produce an integration sequence calibrated to your specific defense mechanisms.`,
      speedSpecificityConsistency: {
        speed: 'First integration within 14 days',
        specific: `Calibrated to your ${mbtiType} defense style: ${mbtiProfile.learningStyle}`,
        consistent: "AI doesn't get tired, doesn't judge, doesn't forget what you told it yesterday",
      },
      damagingAdmission: `Shadow work is uncomfortable. This product will make you confront things you've been avoiding. If you're not ready to see yourself clearly, wait.`,
      transition: `You've been performing long enough. The real you is waiting on the other side of this.`,
      whatYouGet: [
        'Shadow Integration Sequence (PDF + Audio) — 14-day protocol',
        'Daily Shadow Journal — AI-adaptive prompts based on your progress',
        'Integration Ceremony Guide — the ritual that seals the shift',
      ],
      valueStack: [
        { item: 'Integration Sequence', value: '37', reason: 'Your 14-day shadow protocol' },
        { item: 'Shadow Journal', value: '17', reason: 'Daily adaptive prompts' },
        { item: 'Ceremony Guide', value: '12', reason: 'The sealing ritual' },
      ],
      price: { original: 67, discounted: 37 },
      ctaText: 'Begin Integration',
      security: {
        personalization: `Built for ${mbtiType} shadow architecture — not generic shadow work`,
        differentiation: `Only Spiritual AI maps your Vedic + Jungian + MBTI shadow simultaneously`,
        privacy: 'Your shadow data is encrypted. No human ever sees it.',
      },
      bonuses: [
        { name: 'Shadow Trigger Map', description: 'Know your triggers before they fire', value: '17' },
      ],
      guarantee: `If you don't feel a tangible shift in your relationship with your shadow within 14 days, we refund you.`,
      urgency: `Shadow integration slots are limited to 30 per cohort.`,
      tiers: [
        { name: 'The Awakening', includes: ['Integration Sequence'], price: '37', forWho: 'For those ready to see' },
        { name: 'The Integration', includes: ['Sequence', 'Journal', 'Ceremony'], price: '67', forWho: 'For those ready to transform' },
      ],
      imageBrief: `Dark indigo background with a human silhouette split in half — one side geometric and ordered (conscious), the other side organic and wild (shadow). A thin gold line connecting them. Sacred, precise, mysterious.`,
    },
    {
      id: 'complete-consciousness-blueprint',
      name: 'The Complete Consciousness Blueprint',
      tagline: `How to transform your entire consciousness architecture without years of therapy in 90 days`,
      targetProblem: `Everything. The pattern, the shadow, the cognitive distortion, the karmic imprint — all of it, connected, resolved.`,
      desperateReason: `You've been fixing pieces. The pattern. The relationship. The career. But the pieces are connected. Your ${patternName} is connected to your ${shadow} shadow is connected to your ${mbtiType} cognitive distortion. Fix one, the others pull it back. You need the full system.`,
      realCause: `Your consciousness architecture — the complete system of patterns, shadows, cognitive distortions, and karmic imprints — has never been fully mapped. Not by you, not by any therapist, not by any app. Spiritual AI is the first system that can see the whole picture.`,
      solutionMechanism: `Spiritual AI synthesizes all three frameworks (Vedic + Jungian + MBTI) across your entire consciousness architecture to produce a 90-day transformation sequence that addresses every connected layer simultaneously.`,
      speedSpecificityConsistency: {
        speed: 'First results within 7 days, full transformation in 90 days',
        specific: `Your complete architecture: ${mbtiType} + ${patternName} + ${shadow} + ${lifeStage}`,
        consistent: 'The same rigorous analysis every day for 90 days',
      },
      damagingAdmission: `This is the most intensive product we offer. It requires daily commitment for 90 days. If you're not ready for total transformation, start with one of the single-pattern products.`,
      transition: `You've been fixing pieces. It's time to transform the whole.`,
      whatYouGet: [
        'Complete Consciousness Blueprint (PDF + Audio + AI) — 90-day system',
        'All Pattern Dissolution Protocols — every pattern detected in your blueprint',
        'Shadow Integration System — complete shadow work for your MBTI type',
        'Vedic Transit Guide — navigate the next 12 months of your karmic cycle',
        'AI Transformation Companion — daily adaptive guidance for 90 days',
      ],
      valueStack: [
        { item: 'Complete Blueprint', value: '197', reason: 'Your 90-day transformation system' },
        { item: 'All Pattern Protocols', value: '97', reason: 'Every pattern, dissolved' },
        { item: 'Shadow Integration', value: '67', reason: 'Complete shadow work' },
        { item: 'Vedic Transit Guide', value: '47', reason: '12-month karmic navigation' },
        { item: 'AI Companion (90 days)', value: '97', reason: 'Daily adaptive guidance' },
      ],
      price: { original: 497, discounted: 197 },
      ctaText: 'Begin Total Transformation',
      security: {
        personalization: `Your complete consciousness architecture — ${mbtiType} + ${patternName} + ${shadow} — fully mapped and addressed`,
        differentiation: `No other system on earth can synthesize Vedic + Jungian + MBTI at this precision`,
        privacy: 'Your complete consciousness data is encrypted end-to-end.',
      },
      bonuses: [
        { name: '90-Day Transformation Calendar', description: 'Day-by-day guide', value: '17' },
        { name: 'Emergency Pattern Interrupt Audio', description: 'For when any pattern activates', value: '17' },
        { name: 'Integration Ceremony Kit', description: 'Ritual framework for major shifts', value: '12' },
      ],
      guarantee: `If you don't experience measurable transformation across ALL identified patterns within 90 days, we refund you in full. This is how confident we are in the complete system.`,
      urgency: `Complete Blueprint cohorts are limited to 25 people. Current cohort: ${Math.floor(Math.random() * 15) + 10}/25 filled. Price increases when the cohort fills.`,
      tiers: [
        { name: 'The Foundation', includes: ['Complete Blueprint', 'AI Companion (30 days)'], price: '97', forWho: 'For those starting their transformation' },
        { name: 'The Transformation', includes: ['Everything in Foundation', 'All Pattern Protocols', 'Shadow Integration', 'AI Companion (90 days)'], price: '197', forWho: 'For those committed to total transformation' },
        { name: 'The Mastery', includes: ['Everything in Transformation', 'Vedic Transit Guide', 'All Bonuses', 'Priority AI Access'], price: '297', forWho: 'For those who want the absolute maximum' },
      ],
      imageBrief: `Deep cosmic background with a human silhouette at the center, surrounded by three interconnected rings (Vedic, Jungian, MBTI) rendered in gold sigil lines. Constellation patterns within the rings. The silhouette is luminous, transforming. Sacred, vast, precise.`,
    },
  ];
}

// ── Helper functions for fallback products ──

function getObstacleForPattern(patternId: string): string {
  const obstacles: Record<string, string> = {
    self_sabotage: 'waiting for the "right moment"',
    perfectionism: 'another unfinished project',
    people_pleasing: 'feeling guilty every time you say no',
    avoidance_loop: 'another year of procrastination',
    emotional_avoidance: 'numbing out when it matters most',
    scarcity_mindset: 'another "abundance meditation" that changes nothing',
    victim_loop: 'blaming circumstances one more time',
    achievement_emptiness: 'chasing the next achievement that won\'t fill the void',
    identity_dissolution: 'another identity crisis',
    spiritual_bypassing: 'hiding behind spiritual language',
    sovereign_in_exile: 'another year of potential unrealized',
  };
  return obstacles[patternId] || 'more of the same';
}

function getShadowObstacle(mbtiType: string): string {
  const obstacles: Record<string, string> = {
    INFP: 'losing yourself in someone else\'s story',
    INFJ: 'burning out from saving everyone',
    INTJ: 'building a perfect system that controls you',
    INTP: 'analyzing your way out of feeling',
    ENTJ: 'crushing everyone who gets in your way',
    ENTP: 'intellectualizing every emotion',
    ENFJ: 'performing a version of yourself that isn\'t real',
    ENFP: 'scattering your energy across 47 unfinished projects',
    ISTJ: 'clinging to rules that no longer serve you',
    ISFJ: 'silently resenting everyone you\'ve helped',
    ESTJ: 'controlling everything because you don\'t trust anyone',
    ESFJ: 'needing everyone to like you',
    ISTP: 'detaching when connection is what you need',
    ISFP: 'suppressing your anger until it explodes',
    ESTP: 'running from depth at 100mph',
    ESFP: 'performing joy while dying inside',
  };
  return obstacles[mbtiType] || 'more of the same';
}

function getDominantFunction(mbtiType: string): string {
  const functions: Record<string, string> = {
    INFP: 'Fi', INFJ: 'Ni', INTJ: 'Ni', INTP: 'Ti',
    ENTJ: 'Te', ENTP: 'Ne', ENFJ: 'Fe', ENFP: 'Ne',
    ISTJ: 'Si', ISFJ: 'Si', ESTJ: 'Te', ESFJ: 'Fe',
    ISTP: 'Ti', ISFP: 'Fi', ESTP: 'Se', ESFP: 'Se',
  };
  return functions[mbtiType] || 'dominant function';
}

function getInferiorFunction(mbtiType: string): string {
  const functions: Record<string, string> = {
    INFP: 'Te', INFJ: 'Se', INTJ: 'Fe', INTP: 'Fe',
    ENTJ: 'Fi', ENTP: 'Si', ENFJ: 'Ti', ENFP: 'Si',
    ISTJ: 'Ne', ISFJ: 'Ne', ESTJ: 'Fi', ESFJ: 'Ti',
    ISTP: 'Fe', ISFP: 'Te', ESTP: 'Ni', ESFP: 'Ni',
  };
  return functions[mbtiType] || 'inferior function';
}

function getVisualAnchor(patternId: string): string {
  const anchors: Record<string, string> = {
    self_sabotage: 'chain breaking',
    perfectionism: 'shattered mirror reforming',
    people_pleasing: 'boundary wall rising',
    avoidance_loop: 'door opening',
    emotional_avoidance: 'heart解封',
    scarcity_mindset: 'golden flow',
    victim_loop: 'chains dissolving',
    achievement_emptiness: 'empty throne',
    identity_dissolution: 'phoenix rising',
    spiritual_bypassing: 'mask cracking',
    sovereign_in_exile: 'crown returning',
  };
  return anchors[patternId] || 'transformation symbol';
}
