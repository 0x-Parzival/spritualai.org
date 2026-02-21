import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;

export interface Product {
    headline: string;
    salesScript: string;
    description: string;
    category: string;
    confidence: number;
    price: string;
}

/**
 * Generates a hyper-personalized greeting based on MBTI.
 */
export async function generateGreeting(mbti: string, userName: string = "User"): Promise<string> {
    const fallback = `Hey ${userName}, as an ${mbti}, you're wired differently — and that’s your superpower. Your architecture is designed for depth and precision. Let's unlock your next version.`;

    if (!model) return fallback;

    try {
        const prompt = `System: You are an ultra-premium AI brand consultant for SpiritualAI.store. 
    Task: Write a hyper-personalized greeting for a user with MBTI type [${mbti}].
    Tone: Visionary, Revolutionary, Emotionally intelligent, Ultra-premium.
    Length: Short, impactful (3-4 sentences).
    
    Structure:
    "Hey ${userName}, as an ${mbti}, you're wired differently — and that’s your superpower."
    Follow with:
    - Core strengths
    - Core internal conflict
    - Hidden frustration
    - Untapped advantage
    
    Make them feel: Seen, Understood, Emotionally validated. 
    Avoid generic language. Make it intimate and trillion-dollar global quality.
    
    Output ONLY the greeting text.`;

        const result = await model.generateContent(prompt);
        return result.response.text() || fallback;
    } catch (error) {
        console.error("Error generating greeting:", error);
        return fallback;
    }
}

/**
 * Generates buying behavior intelligence.
 */
export async function generateBehaviorIntel(mbti: string): Promise<string> {
    const fallback = `Decoding behavior for ${mbti}: Intuitive decision-making paired with a drive for meaningful transformation.`;

    if (!model) return fallback;

    try {
        const prompt = `System: You are a behavioral psychologist for SpiritualAI.store.
    Task: Analyze the buying behavior of an [${mbti}] using the HEART framework and psychological modeling.
    Tone: Predictive, Insightful, Ultra-premium.
    
    Incorporate:
    - Motivations & Pain points
    - Desire & Avoidance triggers
    - Speed preference & Risk tolerance
    - HEART metrics (Happiness, Engagement, Adoption, Retention, Task Success)
    
    Example: "As an ENFP, you don’t buy products. You buy possibility. But if onboarding feels rigid, you disappear."
    
    Output ONLY the analysis text.`;

        const result = await model.generateContent(prompt);
        return result.response.text() || fallback;
    } catch (error) {
        console.error("Error generating behavior intel:", error);
        return fallback;
    }
}

/**
 * Generates hyper-personalized products based on MBTI and survey answer.
 */
export async function generateProducts(mbti: string, aspiration: string, currentStep: number = 1): Promise<Product[]> {
    if (!model) return [];

    try {
        const prompt = `System: You are the Lead Architect for SpiritualAI.store Product Engine.
    Task: Generate 3 hyper-personalized digital products for an [${mbti}] user chasing [${aspiration}].
    
    Product Filter:
    - Desperate problem
    - Willingness to pay
    - AI as superior solution
    - Speed advantage
    - Clear "how-to" mechanism
    
    Product Structure for EACH (Output as JSON array):
    {
        "headline": "Big promise. Speed-based. Outcome-focused.",
        "category": "e.g., AI Wealth Acceleration System",
        "confidence": 0.98, // Simulated AI confidence
        "price": "Dynamic starting point",
        "description": "Short summary for UI card",
        "salesScript": "Long-form sales structure (Markdown): Introduction, Real Cause, Solution Mechanism, Damaging Admission, Transition, Reveal, Offer, CTA+Scarcity, Bonuses, Guarantee."
    }
    
    Tone: Ultra-premium luxury consulting.
    Output ONLY valid JSON array of 3 products.`;

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        // Clean up markdown code blocks if present
        const jsonStr = text.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to generate or parse products JSON:", e);
        return [];
    }
}
