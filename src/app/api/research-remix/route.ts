import { NextRequest, NextResponse } from "next/server";
import { conductResearch, synthesizeReport } from "@/lib/research-service";

export async function POST(req: NextRequest) {
    try {
        const { product, preferences } = await req.json();

        if (!product) {
            return NextResponse.json({ error: "Product is required" }, { status: 400 });
        }

        // 1. Conduct Research
        const researchData = await conductResearch(product, preferences);

        // 2. Synthesize Report
        const report = await synthesizeReport(product, researchData, preferences);

        return NextResponse.json({
            product,
            preferences,
            researchData,
            report
        });
    } catch (error) {
        console.error("API Error in research-remix:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
