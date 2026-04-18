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
  if (!model) {
    return NextResponse.json({ error: "AI Engine not configured" }, { status: 500 });
  }

  try {
    const { message, state: incomingState } = await req.json();

    if (!message || !incomingState) {
      return NextResponse.json({ error: "Message and state are required" }, { status: 400 });
    }

    let state: UserState = incomingState;

    // 1. Update history
    state.exchange_history.push({ role: 'user', content: message });

    // 2. Run Background Detection & Thinking Engines
    state = detectPattern(message, state);
    state = updateDemographics(message, state);
    state.internal_thought = thinkAboutUserMessage(message, state);

    // 3. Logic for Question Flow
    state.question_count += 1;
    
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
