# Current State of Spiritual AI Project

## Overview
- **Project**: Spiritual AI Homepage Conversion
- **Goal**: Transform the homepage from a museum (1600vh) to a **300vh conversion machine** aligned with first-principles transformation.
- **Current Status**: Simplified homepage structure implemented. Interruption scripts file created.

---

## Key Changes Made

### 1. Homepage Restructure
- **Removed**: Non-critical elements (museum layers, decorative images, scroll-based animations).
- **Kept**: Core conversion elements (Starfield, Lotus, HeroTitle, CTA, AI Chatbot, Post-Conversation Report).
- **New Structure**: 3 viewports (100vh each) for **hook → conversation → mirror** flow.

### 2. Simplified State Management
- **Removed**: Scroll/mouse event handlers (no longer needed for 300vh structure).
- **Added**: `mbtiType` and `conversationComplete` states to track user flow.

### 3. Interruption Scripts
- **File Created**: `/src/data/interruption-scripts.json`
- **Content**: Architecture-specific interruption techniques for all 16 MBTI types.
- **Example for INFP**:
  ```json
  "activationScript": "When you feel [emotion], tell yourself: 'This is a story. What’s the ending I want?'"
  ```

### 4. Helper Functions (Pending)
- **To Add**: `getInterruptionScript`, `getPatternForType`, `getStrengthForType`, `getGrowthEdgeForType`
- **Purpose**: Fetch data from `interruption-scripts.json` for dynamic content.

---

## Next Steps
1. **Add Helper Functions**: Connect `interruption-scripts.json` to the homepage.
2. **AI Chatbot Integration**: Ensure page 2 uses `mbtiType` and logs activations.
3. **Mobile Optimization**: Update `MobileHome` to match the 3-viewport structure.
4. **Validation**: Test the conversion flow (hook → conversation → mirror).

---

## Technical Details

### Current Homepage Structure
```tsx
<main style={{ minHeight: '300vh' }}>  // 3 viewports
  {/* VIEWPORT 1: HOOK (100vh) */}
  {/* VIEWPORT 2: CONVERSATION (100vh) */}
  {/* VIEWPORT 3: MIRROR (100vh) */}
</main>
```

### Interruption Scripts Example
```json
{
  "INFP": {
    "activationScript": "When you feel [emotion], tell yourself: 'This is a story. What’s the ending I want?'",
    "successScript": "Beautiful! That story shift is where transformation begins.",
    "failureScript": "This story is still running. Let’s rewrite it: 'What’s a happier ending?'",
    "pattern": "Story-based emotional suppression.",
    "strength": "Empathic storytelling.",
    "growthEdge": "Balancing idealism with pragmatism."
  }
}
```

---

## How to Resume
1. **Run the Site**: Already started on `localhost:3000`.
2. **Add Helper Functions**: Paste the following into `/src/app/page.tsx`:
   ```tsx
   // Helper functions for interruption scripts
   function getInterruptionScript(type: string): string {
     const scripts = require('/src/data/interruption-scripts.json');
     return scripts[type]?.activationScript || "Describe your pattern activation.";
   }

   // Helper functions for report data
   function getPatternForType(type: string): string {
     const scripts = require('/src/data/interruption-scripts.json');
     return scripts[type]?.pattern || "Unconscious pattern.";
   }

   function getStrengthForType(type: string): string {
     const scripts = require('/src/data/interruption-scripts.json');
     return scripts[type]?.strength || "Unique cognitive strength.";
   }

   function getGrowthEdgeForType(type: string): string {
     const scripts = require('/src/data/interruption-scripts.json');
     return scripts[type]?.growthEdge || "Growth opportunity.";
   }
   ```

3. **Test the Flow**:
   - Open `http://localhost:3000`
   - Click "Discover the architecture of your mind"
   - Verify the AI chatbot loads with the correct interruption script.

---

## Localhost Access
- **URL**: `http://localhost:3000`
- **Port**: 3000 (default for Next.js)
- **Output Logs**: `/tmp/claude-1000/-home-parzival/9d9a9ad2-4b34-8d39-5c307c8cc257/tasks/bv1k9oa6k.output`

---

## Notes
- The site is running in the background. Use `Ctrl+C` to stop it when done.
- All changes are saved in `/home/parzival/spritualai.org`.
- Resume by running `npm run dev` again or continuing from this state.