/**
 * Central AI Utility for Spiritual AI.
 * Uses Groq API (llama-3.3-70b-versatile) for high-speed synthesis.
 */

const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = 'llama-3.3-70b-versatile';

export async function callAI(messages: any[], systemPrompt: string, temperature = 0.6): Promise<string> {
  try {
    if (!GROQ_API_KEY) {
      console.warn("GROQ_API_KEY is not defined. AI calls will fail.");
    }

    const payload = {
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature,
      max_tokens: 2000
    };

    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Groq API Error: ${res.status} ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    return data.choices[0]?.message?.content || "";
  } catch (error) {
    console.error("callAI Error:", error);
    throw error;
  }
}

export async function callAIForJSON<T>(messages: any[], systemPrompt: string, temperature = 0.4): Promise<T> {
  try {
    if (!GROQ_API_KEY) {
      console.warn("GROQ_API_KEY is not defined. AI calls will fail.");
    }

    const payload = {
      model: DEFAULT_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        ...messages
      ],
      temperature,
      max_tokens: 2000,
      response_format: { type: 'json_object' }
    };

    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify(payload)
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Groq API Error (JSON): ${res.status} ${JSON.stringify(errorData)}`);
    }

    const data = await res.json();
    const content = data.choices[0]?.message?.content;

    return JSON.parse(content) as T;
  } catch (error) {
    console.error("callAIForJSON Error:", error);
    throw error;
  }
}
