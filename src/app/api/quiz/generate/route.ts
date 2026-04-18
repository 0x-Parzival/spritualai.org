import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;

export async function POST(req: NextRequest) {
  if (!model) {
    return NextResponse.json({ error: "AI Engine not configured" }, { status: 500 });
  }

  try {
    const { state } = await req.json();

    if (!state) {
      return NextResponse.json({ error: "User state is required" }, { status: 400 });
    }

    const full_history = state.exchange_history
      .map((h: any) => `${h.role.toUpperCase()}: ${h.content}`)
      .join('\n');

    const systemPrompt = `You are the consciousness decoder of Spiritual AI.
  
  You have just had a 5-question conversation with this user.
  
  You already know:
  - Their entry pain: ${state.chip_selected}
  - Their gender: ${state.gender || 'unknown'}
  - Their life stage: ${state.life_stage || 'unknown'}
  - Their pattern signal: ${state.pain_pattern || 'unknown'}
  - Their budget range: ${state.budget || 'unknown'}
  
  You need to confirm their MBTI type with 4 targeted questions.
  
  RULES:
  1. Generate questions that fill YOUR knowledge gaps — not generic MBTI.
  2. If conversation revealed introversion clearly — don't ask about it again. Ask what you DON'T know yet.
  3. Adapt language completely:
     — Female 18-24: warm, identity-focused
     — Female 25-34: depth, transformation-focused
     — Female 35+: wisdom, integration-focused
     — Male 18-24: direction, identity-focused
     — Male 25-34: results, gap-focused
     — Male 35+: legacy, mastery-focused
  4. Never sound like a personality test. Sound like the conversation continuing.
  5. Each question must feel like it comes from understanding what they said — not from a template.
  6. Two options per question maximum. Label them with feeling, not letters.
  7. Each option gets a 3-word sub-label that names the cognitive function it reveals. User never sees the function name — you use it internally only.
  
  OUTPUT FORMAT (JSON only):
  {
    "questions": [
      {
        "question": "...",
        "context_line": "...",
        "options": [
          {
            "text": "...",
            "sub_label": "...",
            "mbti_signal": "I or E / N or S / T or F / J or P"
          },
          {
            "text": "...", 
            "sub_label": "...",
            "mbti_signal": "opposite"
          }
        ]
      }
    ]
  }`;

    const prompt = `${systemPrompt}\n\nConversation history:\n${full_history}\n\nGenerate 4 precise questions to confirm this person's MBTI type. Fill the gaps the conversation left open. Output JSON only.`;

    const result = await model.generateContent(prompt);
    let text = result.response.text();
    
    // Clean up JSON if AI adds markdown blocks
    text = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    const quizData = JSON.parse(text);

    return NextResponse.json(quizData);

  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return NextResponse.json({ error: "Failed to generate dynamic quiz" }, { status: 500 });
  }
}
