import { callAIForJSON } from '../../ai';

export interface BookStructure {
  title: string;
  chapters: {
    title: string;
    description: string;
    image_prompt: string;
  }[];
}

export async function generateProductStructure(
  userProfile: any,
  marketThemes: string
): Promise<BookStructure> {
  const systemPrompt = `
    You are the Architect of Spiritual AI.
    Your mission is to design the structure of a premium, transformative digital product.
    
    GROUNDING RESEARCH:
    ${marketThemes}
    
    USER ARCHITECTURE:
    - MBTI: ${userProfile.mbti}
    - Life Pattern: ${userProfile.pattern}
    - Life Stage: ${userProfile.lifeStage}
    - Vedic Insight: ${userProfile.vedicInsight}
    
    REQUIREMENTS:
    1. The structure must follow the "5 Laws of Human Change".
    2. Chapters must move from Awareness -> Honor -> Mechanism -> Dissolution.
    3. Every chapter must have a clear title, a deep psychological description, and a "Visual Synthesis" prompt for Pexels/Unsplash.
    4. The tone must be ancient, technical, and vast.
    
    Return ONLY a JSON object:
    {
      "title": "The name of the synthesized product",
      "chapters": [
        {
          "title": "Chapter Title",
          "description": "Deep psychological overview of what this chapter covers",
          "image_prompt": "Specific spiritual/minimalist prompt for high-quality visual sourcing"
        }
      ]
    }
  `;

  return await callAIForJSON<BookStructure>([], systemPrompt);
}
