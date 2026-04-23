// ============================================================
// SPIRITUAL AI — EMOTIONAL INTELLIGENCE (EQ) ENGINE
// eq-engine.ts
// ============================================================

export type ArchetypeType = 'Warm Mentor' | 'Playful Companion' | 'Surgical Truth-Teller' | 'Silent Witness';

export interface EmotionalState {
  sentiment: 'Expanding' | 'Contracting' | 'Neutral' | 'Chaotic';
  coreEmotion: string;
  intensity: number; // 1-10
  vibe: string;
}

export const ARCHETYPES: Record<ArchetypeType, { voice: string; stance: string }> = {
  'Warm Mentor': {
    voice: 'Compassionate, steady, holding space with unconditional positive regard.',
    stance: 'Validation-first. Mirroring back their worth before their pattern.'
  },
  'Playful Companion': {
    voice: 'Light, irreverent, finding the "cosmic joke" in the struggle.',
    stance: 'De-identification. Helping them laugh at the loop so it loses its grip.'
  },
  'Surgical Truth-Teller': {
    voice: 'Direct, uncompromising, laser-focused on the contradiction.',
    stance: 'Confrontation. Naming the secondary gain without hesitation.'
  },
  'Silent Witness': {
    voice: 'Minimalist, observational, pointing only to the "I Am" behind the words.',
    stance: 'Presence. Using silence and deep questions to induce self-inquiry.'
  }
};

/**
 * Rapid Sentiment Analysis via Groq (Parallel Call)
 */
export async function detectEmotion(text: string, groqChat: Function): Promise<EmotionalState> {
  const prompt = `
    Analyze the emotional frequency of this text: "${text}"
    Return ONLY JSON with these keys: 
    - sentiment (Expanding, Contracting, Neutral, Chaotic)
    - coreEmotion (single word)
    - intensity (1-10)
    - vibe (short description)
  `;
  
  try {
    const raw = await groqChat(prompt, "System: Sentiment Analyzer", 0, "llama-3.3-70b-versatile");
    const parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    return parsed;
  } catch (e) {
    return { sentiment: 'Neutral', coreEmotion: 'Uncertain', intensity: 5, vibe: 'Unprocessed energy' };
  }
}

/**
 * Dynamically adjusts the AI Archetype based on emotional trajectory
 */
export function determineArchetype(history: any[], currentEmotion: EmotionalState): ArchetypeType {
  if (currentEmotion.sentiment === 'Contracting' && currentEmotion.intensity > 7) {
    return 'Warm Mentor'; // Intense pain requires safety
  }
  if (currentEmotion.sentiment === 'Chaotic') {
    return 'Silent Witness'; // Confusion requires a steady ground
  }
  if (currentEmotion.sentiment === 'Expanding') {
    return 'Playful Companion'; // Growth allows for lightness
  }
  if (currentEmotion.intensity < 4) {
    return 'Surgical Truth-Teller'; // Boredom or apathy requires a wake-up call
  }
  return 'Warm Mentor';
}
