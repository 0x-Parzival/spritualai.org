import { NextRequest, NextResponse } from "next/server";
import { generateGreeting, generateBehaviorIntel, generateProducts } from "@/lib/store-service";

export async function POST(req: NextRequest) {
    try {
        const { step, mbti, userName, aspiration, currentProducts } = await req.json();

        if (!mbti) {
            return NextResponse.json({ error: "MBTI type is required" }, { status: 400 });
        }

        switch (step) {
            case "intro":
                const greeting = await generateGreeting(mbti, userName);
                const intel = await generateBehaviorIntel(mbti);
                return NextResponse.json({ greeting, behaviorIntel: intel });

            case "products":
                if (!aspiration) return NextResponse.json({ error: "Aspiration is required" }, { status: 400 });
                const products = await generateProducts(mbti, aspiration, 1);
                return NextResponse.json({ products });

            case "escalation":
                // Deeper personalization step
                if (!aspiration) return NextResponse.json({ error: "Context is required" }, { status: 400 });
                const deeperProducts = await generateProducts(mbti, aspiration, 2);
                return NextResponse.json({ products: deeperProducts });

            default:
                return NextResponse.json({ error: "Invalid step" }, { status: 400 });
        }
    } catch (error) {
        console.error("Store API Error:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
