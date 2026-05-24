const GROQ_API_KEY = process.env.GROQ_API_KEY;
const GROQ_URL = 'https://api.groq.com/openai/v1/chat/completions';
const DEFAULT_MODEL = "llama-3.3-70b-versatile";

/**
 * Calls the Groq AI API with a system prompt and message history.
 */
export async function callAI(history: any[], systemPrompt: string): Promise<string> {
  if (!GROQ_API_KEY) {
    console.warn("GROQ_API_KEY is not defined. AI calls will fail.");
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history
  ];

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        temperature: 0.7
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Groq API error (${res.status}): ${errorData.error?.message || res.statusText}`);
    }

    const data = await res.json();
    return data.choices[0].message.content;
  } catch (error: any) {
    console.error("AI Call Error:", error);
    throw error;
  }
}

/**
 * Calls the Groq AI API and expects a JSON response.
 */
export async function callAIForJSON<T>(history: any[], systemPrompt: string): Promise<T> {
  if (!GROQ_API_KEY) {
    console.warn("GROQ_API_KEY is not defined. AI calls will fail.");
  }

  const messages = [
    { role: 'system', content: systemPrompt },
    ...history
  ];

  try {
    const res = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: DEFAULT_MODEL,
        messages,
        response_format: { type: 'json_object' },
        temperature: 0.3
      })
    });

    if (!res.ok) {
      const errorData = await res.json().catch(() => ({}));
      throw new Error(`Groq API error (${res.status}): ${errorData.error?.message || res.statusText}`);
    }

    const data = await res.json();
    const content = data.choices[0].message.content;

    try {
      return JSON.parse(content) as T;
    } catch (parseError) {
      // Clean up common AI markdown artifacts
      const cleaned = content.replace(/```json\s?|```/g, '').trim();
      return JSON.parse(cleaned) as T;
    }
  } catch (error: any) {
    console.error("AI JSON Call Error:", error);
    throw error;
  }
}
