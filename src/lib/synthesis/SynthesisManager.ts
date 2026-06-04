import { generateProductStructure, BookStructure } from './agents/structure';
import { generateProductChapter } from './agents/chapter';
import { fetchHighQualityImage } from './ImageProcessor';
import { callAI } from '../ai';
import { VectorDB } from './VectorDB';

export interface FinalProduct {
  title: string;
  visualSeed: string;
  chapters: {
    title: string;
    content: string;
    imageUrl: string;
  }[];
}

export class SynthesisManager {
  /**
   * Orchestrates the optimized, speculative synthesis of a premium digital product.
   */
  static async synthesize(userProfile: any): Promise<FinalProduct> {
    console.log('--- STARTING OPTIMIZED PRODUCT SYNTHESIS ---');

    // 1. Generate Visual Seed for the entire book (Consistency)
    const visualSeed = await callAI("Generate a 5-word visual aesthetic seed for a spiritual digital product based on MBTI " + userProfile.mbti);
    console.log(`Visual Seed: ${visualSeed}`);

    // 2. Retrieve Market Themes & Grounding Data from Vector DB
    const marketThemes = await VectorDB.getMarketThemes();
    
    // 3. Generate Structure (Stage 1 - The Brain)
    const structure: BookStructure = await generateProductStructure(userProfile, marketThemes);
    console.log(`Structure Generated: ${structure.title}`);

    // 4. Parallel Speculative Synthesis (Stage 2 - Muscle & Brain)
    const synthesisTasks = structure.chapters.map(async (ch) => {
      // a. Retrieve specific context chunks for this chapter
      const context = await VectorDB.retrieve(ch.title + " " + ch.description);

      // b. Speculative RAG: 8B Draft -> 70B Refine
      const content = await generateProductChapter(ch.title, ch.description, userProfile, context);

      // c. Visual Synthesis with Global Seed
      const imageUrl = await fetchHighQualityImage(`${visualSeed}, ${ch.image_prompt}`);

      return {
        title: ch.title,
        content,
        imageUrl
      };
    });

    const completedChapters = await Promise.all(synthesisTasks);

    return {
      title: structure.title,
      visualSeed,
      chapters: completedChapters
    };
  }
}
