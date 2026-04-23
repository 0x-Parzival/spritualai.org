import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { 
  UserState, 
  buildSystemPrompt, 
  detectPattern, 
  updateDemographics,
  thinkAboutUserMessage,
  INITIAL_QUESTIONS 
} from "@/lib/conversation-engine";
import { productsData } from "@/data/products";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = GEMINI_API_KEY ? new GoogleGenerativeAI(GEMINI_API_KEY) : null;
const model = genAI ? genAI.getGenerativeModel({ model: "gemini-2.0-flash" }) : null;

export async function POST(req: NextRequest) {
  try {
    const { message, state: incomingState } = await req.json();

    if (!message || !incomingState) {
      return NextResponse.json({ error: "Message and state are required" }, { status: 400 });
    }

    let state: UserState = incomingState;
    state.exchange_history.push({ role: 'user', content: message });
    state.question_count += 1;

    // 1. Check for AI Model
    if (!model) {
      // Fallback logic so the user isn't stuck
      const fallbackQuestions = [
        "We hear you. That pattern is something many in the collective struggle with. Tell us, when did you first notice this loop starting to form?",
        "We are recognizing the thread. If you could change one thing about how you respond to this trigger, what would it be?",
        "The architecture of this moment is clear. Are you ready to see what lies beneath the surface of this resistance?",
        "We have mapped the core. Your blueprint is ready. Shall we proceed to the final revelation?"
      ];
      
      const aiResponse = fallbackQuestions[Math.min(state.question_count - 1, fallbackQuestions.length - 1)];
      state.exchange_history.push({ role: 'ai', content: aiResponse });
      state.current_question = aiResponse;

      return NextResponse.json({ 
        message: aiResponse,
        state: state
      });
    }

    // 2. Run Background Detection & Thinking Engines
    state = detectPattern(message, state);
    state = updateDemographics(message, state);
    state.internal_thought = thinkAboutUserMessage(message, state);
    
    // ... rest of the logic ...

    // 3. Logic for Question Flow (Only if model exists)
    // state.question_count += 1; // Removed duplicate increment
    
    // Determine next question to ask (if not at the end)
    let nextQuestion = "";
    if (state.question_count < 5) {
        nextQuestion = INITIAL_QUESTIONS[state.question_count];
        // If it's the dynamic Q3, we let the AI generate it based on patterns
        if (nextQuestion === "PATTERN_DEEP_DIVE") {
            nextQuestion = ""; // AI will generate this organically
        }
    }

    // 4. Build System Prompt
    // Prepare a simplified product catalog for the prompt to save tokens
    const productCatalog = Object.entries(productsData).map(([mbti, data]) => ({
        mbti,
        products: data.products.map(p => ({
            title: p.title,
            desc: p.script.product_description,
            price: p.script.price_discounted
        }))
    }));

    const systemPrompt = buildSystemPrompt(state, productCatalog);

    // 5. Generate AI Response
    const prompt = `${systemPrompt}\n\nUSER MESSAGE: ${message}\n\nAI (Remember: One question only. Stay in character. If question_count is 5, provide summary and products.):`;

    const result = await model.generateContent(prompt);
    const aiResponse = result.response.text();

    // 6. Update state with AI response
    state.exchange_history.push({ role: 'ai', content: aiResponse });
    state.current_question = aiResponse;

    return NextResponse.json({ 
      message: aiResponse,
      state: state
    });

  } catch (error) {
    console.error("Chat API Error:", error);
    return NextResponse.json({ error: "Failed to process chat" }, { status: 500 });
  }
}
