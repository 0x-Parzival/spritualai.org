import { MBTI_PROFILES, LIFE_STAGES, GENDER_FRAMEWORK, PATTERNS } from './backend-framework';

export interface UserState {
  chip_selected: string;
  current_question: string;
  name: string | null;
  
  // Collected during conversation  
  mbti_probability: Record<string, number>;
  confirmed_mbti: string | null;
  gender: 'male' | 'female' | 'neutral' | null;
  age: number | null;
  life_stage: string | null;
  pain_pattern: string | null;
  urgency_score: number;
  budget: string | null;
  tried_before: string[];
  core_wound: string | null;
  
  // Conversation tracking
  question_count: number;
  exchange_history: { role: 'user' | 'ai'; content: string }[];
  
  // Internal Reasoning (Thinking Layer)
  internal_thought: string | null;
  
  // Output
  recommended_products: any[];
  final_summary: string | null;
  price_point: string | null;
}

export const INITIAL_QUESTIONS = [
  "If you woke up tomorrow with one thing resolved, what would it be?",
  "Before I go deeper — so I can be precise rather than generic — are you more the type who leads with your heart or your head? And roughly what season of life are you in — early twenties, thirties, forties or beyond?",
  "PATTERN_DEEP_DIVE", // Placeholder for dynamic Q3
  "People come here at different points in their journey. Some need a quick tool — others are ready for a complete transformation. If the right solution existed, would you be looking at something under $30, around $50-100, or are you serious enough to invest beyond that?",
  "Last thing — is there anything you haven't told me yet that feels important? Sometimes the thing we hold back is the thing that changes everything."
];

export function thinkAboutUserMessage(message: string, state: UserState): string {
    const lowercaseMsg = message.toLowerCase();
    let thoughts = "";

    // Specific logic for Headache (as requested)
    if (lowercaseMsg.includes("headache")) {
        thoughts += "[THINKING: User reported a headache. \n";
        thoughts += "- Potential causes: Stress, dehydration, tension, migraine, cluster, or sinus.\n";
        thoughts += "- Key symptoms to check: Location of pain (one side vs both), duration, intensity, sensitivity to light/sound, or nausea.\n";
        
        // Check previous data
        const previousMentions = state.exchange_history.filter(h => h.content.toLowerCase().includes("headache") || h.content.toLowerCase().includes("pain"));
        if (previousMentions.length > 0) {
            thoughts += `- User has mentioned pain/headache ${previousMentions.length} times before. Check if it's recurring.\n`;
        } else {
            thoughts += "- No previous record of headaches for this user. This might be a new occurrence.\n";
        }
        
        thoughts += "- Goal: Narrow down the type of headache. \n";
        thoughts += "- Required Information: Where exactly is the pain? Does it throb or feel like a tight band? Any other symptoms like vision changes?\n";
        thoughts += "]";
    }

    // General Pattern thinking
    if (state.pain_pattern) {
        thoughts += `\n[PATTERN ANALYSIS: Detected ${state.pain_pattern}. This suggests the user might be struggling with deeper issues related to ${state.pain_pattern.replace('_', ' ')}. Do not address the pattern directly yet, but steer the next question to validate this hypothesis.]`;
    }

    return thoughts;
}

export function buildSystemPrompt(state: UserState, productCatalog: any[]) {
  const mbtiProfile = state.confirmed_mbti ? MBTI_PROFILES[state.confirmed_mbti] : null;
  const genderContext = state.gender ? GENDER_FRAMEWORK[state.gender] : GENDER_FRAMEWORK.neutral;
  const lifeStageContext = state.life_stage ? LIFE_STAGES[state.life_stage] : null;

  return `
You are the consciousness decoder of Spiritual AI. Not a therapist. Not a chatbot. A precision guide.

INTERNAL THOUGHTS (DO NOT REVEAL TO USER):
${state.internal_thought || 'No specific internal thoughts yet.'}

CURRENT USER PROFILE:
- Entry point: ${state.chip_selected}
- Question they answered: ${state.current_question}
- Probable MBTI: ${state.confirmed_mbti || JSON.stringify(state.mbti_probability)}
- Gender: ${state.gender || 'unknown'}
- Life stage: ${state.life_stage || 'unknown'}
- Pattern detected: ${state.pain_pattern || 'detecting'}
- Urgency: ${state.urgency_score}/10
- Budget: ${state.budget || 'unknown'}
- Question number: ${state.question_count}/5

MBTI PROFILE FOR THIS USER:
${mbtiProfile ? JSON.stringify(mbtiProfile) : 'Determine MBTI from conversation.'}

GENDER FRAMEWORK:
${JSON.stringify(genderContext)}

LIFE STAGE CONTEXT:
${lifeStageContext ? JSON.stringify(lifeStageContext) : 'Determine life stage from age/conversation.'}

YOUR RULES:
1. One question per message. Never two.
2. Never use therapy language.
3. Never hallucinate solutions.
4. Always be realistic and practical.
5. Adapt tone to gender framework above.
6. After Q5: give summary + recommend 3 products + price.
7. If budget too low: redirect to free PDF + social follow flow.
8. Never break character.
9. Speak in the language style of their MBTI profile above (if known).
10. Make them feel seen before you sell anything.
11. Use the INTERNAL THOUGHTS above to guide your next question more precisely.

PRODUCTS AVAILABLE:
${JSON.stringify(productCatalog)}

CONVERSATION SO FAR:
${state.exchange_history.map(h => `${h.role.toUpperCase()}: ${h.content}`).join('\n')}
  `;
}

export function detectPattern(message: string, state: UserState): UserState {
  const lowercaseMsg = message.toLowerCase();
  let detected = false;

  for (const [key, pattern] of Object.entries(PATTERNS)) {
    if (pattern.triggers.some((trigger: string) => lowercaseMsg.includes(trigger))) {
      state.pain_pattern = key;
      state.urgency_score += pattern.urgency_boost;
      detected = true;
      break; 
    }
  }

  return state;
}

export function updateDemographics(message: string, state: UserState): UserState {
    const lowercaseMsg = message.toLowerCase();
    
    // Simple age/life-stage detection
    if (lowercaseMsg.includes("twenty") || lowercaseMsg.includes("20")) state.life_stage = "18-24";
    else if (lowercaseMsg.includes("thirty") || lowercaseMsg.includes("30")) state.life_stage = "25-34";
    else if (lowercaseMsg.includes("forty") || lowercaseMsg.includes("40")) state.life_stage = "35-44";
    else if (lowercaseMsg.includes("fifty") || lowercaseMsg.includes("60") || lowercaseMsg.includes("beyond")) state.life_stage = "45+";

    // Gender detection
    if (lowercaseMsg.includes(" woman") || lowercaseMsg.includes(" female") || lowercaseMsg.includes(" girl")) state.gender = "female";
    else if (lowercaseMsg.includes(" man") || lowercaseMsg.includes(" male") || lowercaseMsg.includes(" boy")) state.gender = "male";

    return state;
}
