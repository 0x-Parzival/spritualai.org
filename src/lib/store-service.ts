const GROQ_API_KEY = process.env.GROQ_API_KEY || "";
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';

export interface Product {
    headline: string;
    salesScript: string;
    description: string;
    category: string;
    confidence: number;
    price: string;
}

/**
 * Shared Groq Helper
 */
async function groqChat(systemPrompt: string, userMessage: string, model = "llama-3.3-70b-versatile"): Promise<string> {
    if (!GROQ_API_KEY) return "";
    try {
        const res = await fetch(GROQ_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${GROQ_API_KEY}` },
            body: JSON.stringify({
                model,
                messages: [{ role: 'system', content: systemPrompt }, { role: 'user', content: userMessage }],
                temperature: 0.7,
                max_tokens: 1500,
                // JSON mode if appropriate, but for simple text greeting it might be overkill
                // Keeping it standard for more natural text unless it's products JSON
            }),
        });
        const data = await res.json();
        return data.choices[0]?.message?.content || "";
    } catch (err) {
        console.error("Groq Chat Error:", err);
        return "";
    }
}

/**
 * Generates a hyper-personalized greeting based on MBTI.
 */
export async function generateGreeting(mbti: string, userName: string = "User"): Promise<string> {
    const fallback = `Hey ${userName}. As an ${mbti}, you are wired for depth. Let's unlock your next version.`;

    try {
        const prompt = `System: You are an ultra-premium AI brand consultant for SpiritualAI.store. 
    Task: Write a hyper-personalized greeting for a user with MBTI type [${mbti}].
    Tone: Visionary, Revolutionary, Emotionally intelligent, Ultra-premium.
    Length: Very short, punchy (1-2 sentences).
    
    Structure:
    "Hey ${userName}. As an ${mbti}, you are wired for depth."
    Follow with one punchy line about their core advantage or path.
    
    Make them feel: Seen, Understood, Emotionally validated. 
    Avoid generic language. Make it intimate and trillion-dollar global quality.
    
    Output ONLY the greeting text.`;

        const response = await groqChat("You are an ultra-premium AI brand consultant.", prompt);
        return response || fallback;
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

        const response = await groqChat("You are a behavioral psychologist.", prompt);
        return response || fallback;
    } catch (error) {
        console.error("Error generating behavior intel:", error);
        return fallback;
    }
}

/**
 * Generates hyper-personalized products based on MBTI and survey answer.
 */
export async function generateProducts(mbti: string, aspiration: string, currentStep: number = 1): Promise<Product[]> {
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

        const response = await groqChat("You are a Lead Product Architect.", prompt);
        // Clean up markdown code blocks if present
        const jsonStr = response.replace(/```json|```/g, "").trim();
        return JSON.parse(jsonStr);
    } catch (e) {
        console.error("Failed to generate or parse products JSON:", e);
        return [];
    }
}
