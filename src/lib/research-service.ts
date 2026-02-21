import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" }); // Using available model name

export interface ResearchResult {
    product: string;
    preferences: string;
    researchData: string;
    report: string;
}

/**
 * Conducts automated research on a product based on user preferences.
 */
export async function conductResearch(product: string, preferences?: string): Promise<string> {
    const prompt = `Conduct a thorough and in-depth research on the web to learn about the best options for a ${product}. 
    The goal is to gather comprehensive information about the product or service, considering user preferences, to be used for creating a personalized buyer report. 
    REMINDER: The user is looking for a: ${product}. 
    They additionally specified that they care about: ${preferences || "No specific preferences"}.
    
    NOTE: If you have access to search tools, use them. If not, synthesize based on your internal knowledge base up to your knowledge cutoff.`;

    try {
        // In a real implementation with Tavily/Google Search, we would call it here.
        // For now, we rely on Gemini's internal knowledge or a mock search if configured.
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error conducting research:", error);
        return `Failed to conduct research for ${product}. Please ensure GEMINI_API_KEY is set.`;
    }
}

/**
 * Synthesizes a buyer report based on research results.
 */
export async function synthesizeReport(product: string, researchData: string, preferences?: string): Promise<string> {
    const prompt = `Using the research results from the product research below, generate a clear buyer report for the product ${product}, being sure to take into account the user preferences (${preferences || "No specific preferences"}) in the analysis. 
    Consider what factors are most relevant to compare options on for the specific product provided by the user and include each of these factors consistently in your report. 
    
    Product research: ${researchData}
    
    IMPORTANT NOTE: Start directly with the output, do not output any delimiters. Use professional markdown formatting.`;

    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        console.error("Error synthesizing report:", error);
        return `Failed to synthesize report for ${product}.`;
    }
}
