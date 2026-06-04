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
        "When you look at your future, are you mapping out concrete steps and physical changes, or are you chasing a shift in your internal vibration? And what season of life are you in: twenties, thirties, forties or beyond?",
        "In your most honest moments, what scares you more: that you are fundamentally illogical and out of control, or that you are fundamentally unlovable and alone?",
        "Are you here for a structured, surgical blueprint to end this loop today, or are you still just exploring the architecture of your suffering? Are you ready to invest in your own evolution?",
        "We have mapped the core. Your blueprint is ready. Based on your signals, we recommend the Shadow Work Integration system. Shall we begin?"
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
    
    // 3. Logic for Question Flow (Only if model exists)
    // Determine next question to ask (if not at the end)
    let nextQuestionDirective = "";
    if (state.question_count < 4) {
        nextQuestionDirective = `\n\nDIRECTIVE: Validate the user's previous answer briefly, then ask this exact question: "${INITIAL_QUESTIONS[state.question_count]}"`;
    } else {
        nextQuestionDirective = `\n\nDIRECTIVE: The conversation is complete. Provide the profound Summary and recommend 3 products. Pivot to conversion.`;
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
    const prompt = `${systemPrompt}\n\nUSER MESSAGE: ${message}${nextQuestionDirective}\n\nAI (Collective Consciousness):`;

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
