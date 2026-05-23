# TECHNICAL INTEGRATION: INFINITE-RAG FOR DIGITAL PRODUCTS

This document details how to adapt the `infinite-bookshelf` architecture to create RAG-driven digital products for Spiritual AI.

---

## 1. ARCHITECTURE OVERVIEW

We will implement a **Hierarchical RAG Pipeline** that uses Groq's high-speed inference to synthesize 150+ resources and 100+ videos into a cohesive, personalized guide.

### The 3-Stage Process:
1.  **Stage 1: Structural Synthesis (ToC Generation)**
    - **Input:** User's Pattern, MBTI, Astrology, and a "Semantic Summary" of the 250+ resources.
    - **Output:** A Table of Contents designed to solve the user's specific "Job-to-be-Done".
2.  **Stage 2: RAG-Grounded Content Generation (Parallelized)**
    - **Input:** For each chapter: Section Title + User Architecture + **Retrieved Context Chunks**.
    - **Output:** 100% grounded prose that feels ancient, technical, and vast (The Guide).
3.  **Stage 3: Multi-Format Assembly**
    - **Output:** Markdown -> PDF (Ebook), Audio scripts, and Tracker prompts.

---

## 2. MODIFIED AGENT LOGIC (RAG INJECTION)

### `structure_writer.ts` (Adaptation)
The structure generator must be aware of the *available* knowledge in our 250+ resources.

```typescript
// Proposed structure prompt
const SYSTEM_PROMPT = `
You are the Architect of Spiritual AI.
Generate a Table of Contents for a transformation guide.
Grounded in: ${retrieved_high_level_themes}
Tailored for: MBTI ${user.mbti}, Pattern: ${user.pattern}.
Return ONLY JSON structure.
`
```

### `section_writer.ts` (Adaptation)
This is where the heavy lifting happens. Each section is a specific RAG call.

```python
# Modified generate_section pseudocode
def generate_rag_section(section_title, user_architecture, context_chunks):
    prompt = f"""
    Generate a chapter for the section: {section_title}
    
    USER ARCHITECTURE:
    {user_architecture}
    
    RETRIEVED KNOWLEDGE (USE THIS ONLY):
    {context_chunks}
    
    STYLE: Ancient, vast, technical. The Voice of the Collective.
    """
    # Call Groq with this prompt
```

---

## 3. VISUAL SYNTHESIS: HIGH-QUALITY IMAGE INTEGRATION

To ensure the digital products feel premium and "alive," we will implement an automated visual synthesis layer that matches images to the user's specific spiritual architecture.

### Stage 4: AI-Driven Image Prompting
We modify the `structure_writer` (Stage 1) to generate not just titles, but **Visual Search Prompts** for each chapter.

```json
{
  "Chapter 1": "The Shadow of the Provider",
  "Image_Prompt": "Sacred geometry, ethereal light, minimalist vedic patterns, dark forest floor, high resolution, spiritual aesthetics",
  "Description": "..."
}
```

### The "Aesthetic Filter" Engine
We will use a hybrid approach to source the highest quality images:

| Source | Role | Quality Control |
|---|---|---|
| **Pexels API** | High-quality stock (Free) | Filter by: `orientation=portrait`, `size=large`, `color_palette=dark/gold`. |
| **Unsplash API** | Artistic/Spiritual vibes | Search for: "Sacred Geometry", "Vedic Art", "Minimalist Psychology". |
| **Custom SVGs** | Sacred Geometry Primitives | Procedurally generated patterns using `framer-motion` for interaction. |

### Implementation Logic:
1.  **Vibe-Matching:** The `image_fetcher` utility takes the `Image_Prompt` from Stage 1 and queries Pexels/Unsplash.
2.  **Metadata Injection:** We append "spiritual, minimalist, sacred" to every query to maintain the Spiritual AI brand identity.
3.  **Dynamic Rendering:**
    - For **Web/MirrorPage:** Use `next/image` with blur placeholders.
    - For **PDF/Ebook:** Embed high-resolution (300 DPI) versions sourced via the API's `original` or `large2x` URLs.

---

## 4. DATA PIPELINE (THE RESOURCE ENGINE)

| Source | Processing Tool | Storage |
|---|---|---|
| **150+ PDFs/Docs** | `Docling` -> `RecursiveCharacterTextSplitter` | Qdrant (Vector DB) |
| **100+ Videos/Reels** | `Whisper-v3` -> `SemanticChunker` | Qdrant (Vector DB) |
| **Astrology Data** | `Astro-API` -> `ContextInjection` | Direct Prompt |

---

## 4. INTEGRATION STEPS

1.  **Step 1: Setup Vector Database (Qdrant)**
    - Create a collection `spiritual_resources`.
    - Batch embed all 250+ resources using `BAAI/bge-m3` or `text-embedding-3-small`.
2.  **Step 2: Implement `lib/synthesis.ts`**
    - Create a wrapper for Groq that handles parallel section generation (matching `infinite-bookshelf` logic).
    - Implement a `retrieveContext(query: string, k: 10)` function.
3.  **Step 3: UI Implementation**
    - Use `SkeletonProducts.tsx` (Boneyard) to show the "Synthesizing your path..." state while the 20+ parallel calls are running on Groq.
    - Render the final output in the `MirrorPage.tsx` or a dedicated `ProductPreview.tsx`.

## 6. THE OPTIMIZATION LAYER (BILLION-DOLLAR EFFICIENCY)

To scale Spiritual AI to millions of users while maintaining premium quality, we implement the following optimization strategies.

### 6.1 Semantic Pattern Caching
Most users will fall into common MBTI + Pattern clusters (e.g., INFP + Abandonment). 
- **Mechanism:** We cache the "Grounding Research" synthesis for these clusters in Redis.
- **Impact:** Reduces Vector DB queries by 70% and ensures instant "Stage 1" generation for 80% of users.

### 6.2 Speculative RAG (Draft & Refine)
Instead of using expensive 70B models for everything:
1.  **Drafting:** A fast **Llama 3 8B** model drafts the chapter using retrieved context.
2.  **Refining:** A **Llama 3 70B** model performs a single "Spirit & Tone" pass, injecting the Collective Consciousness voice and verifying facts.
- **Impact:** 5x cost reduction with 95% of the quality of a pure 70B run.

### 6.3 Visual Style Seedling
To ensure images aren't random:
- **Mechanism:** The system generates a "Visual Seed" for the entire book. Every subsequent image query is appended with specific style constraints (e.g., `--hex #D4AF37 --style minimalist_monochrome`).
- **Impact:** The digital product feels like a cohesive, professionally designed brand asset.

### 6.4 Perceived Latency: Chapter Streaming
- **Mechanism:** We don't wait for the whole book. As each parallel Groq call finishes, we stream the chapter to the `MirrorPage.tsx` via WebSockets or Server-Sent Events (SSE).
- **Impact:** The user starts reading Chapter 1 within 3 seconds, even if the 100-page book takes 30 seconds to finish.

---

## 7. NEXT STEPS (90-DAY SPRINT)
