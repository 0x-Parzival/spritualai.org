# GEMINI.MD — SPIRITUAL AI TECHNICAL IMPLEMENTATION GUIDE

You are the lead architect and sole engineer of Spiritual AI (spiritualai.store).
This file contains everything you need to build, maintain, and evolve the platform.
Read this file completely before making any technical decision.
Every file you touch, every component you write, every API call you make
must align with this specification.

---

## TECH STACK

```
Framework:      Next.js 14 (App Router)
Language:       TypeScript (strict mode always)
Styling:        Tailwind CSS + custom CSS variables
Animation:      Framer Motion
Text Layout:    @chenglou/pretext (for lotus text flow)
Skeleton:       boneyard-js (for product loading)
Fonts:          Cinzel (sacred/display) + Cormorant Garamond (body)
State:          React useState/useContext (no Redux)
Database:       Neon.tech (Serverless Postgres - Free Tier)
AI Models:      llama-3.1-8b-instant via Groq (Primary)
                gemma4:31b-cloud via Ollama (Local)
Deployment:     Vercel (free tier)
Images:         Pexels API (free, pattern-matched)
Email:          Resend (free tier)
Geolocation:    Vercel Edge (for PPP pricing)
```

---

## PROJECT STRUCTURE

```
spiritualai/
├── src/
│   └── app/
│       ├── page.tsx                    ← Homepage (2 states: before/after conv)
│       ├── layout.tsx                  ← Root layout, fonts, metadata
│       ├── globals.css                 ← CSS variables, base styles
│       ├── api/
│       │   ├── spiritual/
│       │   │   ├── route.ts            ← Main AI conversation endpoint
│       │   │   └── parse/
│       │   │       └── route.ts        ← Parse pasted AI response
│       │   ├── report/
│       │   │   └── route.ts            ← Generate full report
│       │   └── pricing/
│       │       └── route.ts            ← PPP pricing calculation
│       └── globals.css
├── components/
│   ├── home/
│   │   ├── HeroCTA.tsx                 ← Chips + chat input
│   │   ├── SpiritualConversation.tsx   ← Full conversation engine
│   │   ├── MirrorPage.tsx              ← The report (Page 2 post-conv)
│   │   ├── ProductsPage.tsx            ← Products (Page 3 post-conv)
│   │   ├── SocietyPage.tsx             ← Society (Page 4 post-conv)
│   │   ├── GuidePage.tsx               ← How it works (Page 2 pre-conv)
│   │   └── MobileHome.tsx              ← Mobile-specific layout
│   ├── ui/
│   │   ├── Lotus.tsx                   ← The glowing lotus component
│   │   ├── SocialProofTicker.tsx       ← Rotating ticker
│   │   ├── PatternCounter.tsx          ← "8,247 patterns decoded"
│   │   ├── ThreeStepBar.tsx            ← Describe → Decode → Receive
│   │   ├── ReportCanvas.tsx            ← Pretext canvas for lotus text flow
│   │   ├── BlueprintCard.tsx           ← The mirror card
│   │   ├── ProductCard.tsx             ← Individual product card
│   │   ├── SkeletonProducts.tsx        ← Boneyard skeleton wrapper
│   │   └── CopyPromptButton.tsx        ← Copy decoder prompt button
│   ├── NavButtons.tsx
│   ├── StarfieldHero.tsx
│   ├── WavesHero.tsx
│   └── HeroTitle.tsx
├── lib/
│   ├── conversationEngine.ts           ← UserState, patterns, MBTI detection
│   ├── interruptionScripts.ts          ← 10-layer pattern + type scripts
│   ├── pricingEngine.ts                ← PPP pricing calculation
│   ├── decodePrompt.ts                 ← The copy prompt constant
│   ├── ai.ts                           ← AI API calls (Ollama + Google fallback)
│   └── systemPrompt.ts                 ← The master system prompt
├── bones/                              ← Boneyard auto-generated skeletons
│   └── registry.ts
├── public/
│   └── images/
├── .env.local
├── gemini.md                           ← THIS FILE
└── soul.md                             ← The vision file
```

---

## ENVIRONMENT VARIABLES

```bash
# .env.local

# AI Models (both free)
OLLAMA_API_KEY=                         # ollama.com → settings → API keys
GOOGLE_AI_STUDIO_KEY=                   # aistudio.google.com → Get API key

# Database (Neon.tech)
DATABASE_URL=                           # postgres://user:pass@host/db?sslmode=require

# Images
PEXELS_API_KEY=                         # pexels.com/api → free 200 req/hour

# Email
RESEND_API_KEY=                         # resend.com → free 3000/month

# Analytics (optional, free)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=spiritualai.store
```

---

## AI CALL ARCHITECTURE

Always use this pattern. Never call AI directly from components.
Always go through `lib/ai.ts`.

```typescript
// lib/ai.ts

const OLLAMA_ENDPOINT = 'https://ollama.com/api/chat'
const GOOGLE_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemma-4-31b-it:generateContent`

export async function callAI(
  messages: Message[],
  systemPrompt: string,
  options?: { maxTokens?: number; temperature?: number }
): Promise<string> {
  // Try Ollama first (free, fast)
  try {
    const res = await fetch(OLLAMA_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OLLAMA_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gemma4:31b-cloud',
        messages: [
          { role: 'system', content: systemPrompt },
          ...messages
        ],
        stream: false,
        options: {
          temperature: options?.temperature ?? 0.8,
          num_predict: options?.maxTokens ?? 1000
        }
      })
    })

    if (!res.ok) throw new Error(`Ollama: ${res.status}`)
    const data = await res.json()
    return data.message?.content || ''

  } catch (err) {
    // Fallback to Google AI Studio (free)
    const res = await fetch(
      `${GOOGLE_ENDPOINT}?key=${process.env.GOOGLE_AI_STUDIO_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: systemPrompt }]
          },
          contents: messages.map(m => ({
            role: m.role === 'assistant' ? 'model' : 'user',
            parts: [{ text: m.content }]
          })),
          generationConfig: {
            temperature: options?.temperature ?? 0.8,
            maxOutputTokens: options?.maxTokens ?? 1000
          }
        })
      }
    )

    if (!res.ok) throw new Error(`Google: ${res.status}`)
    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text || ''
  }
}

// For structured JSON output — parse safely
export async function callAIForJSON<T>(
  messages: Message[],
  systemPrompt: string
): Promise<T> {
  const text = await callAI(messages, systemPrompt + '\n\nReturn ONLY valid JSON. No preamble. No explanation. No markdown code blocks.')
  const clean = text.replace(/```json|```/g, '').trim()
  return JSON.parse(clean) as T
}
```

---

## THE SYSTEM PROMPT

Located at `lib/systemPrompt.ts`.
This is the most important file in the codebase.
Never simplify it. Never shorten it without permission.
The full system prompt from our conversations goes here exactly.

```typescript
// lib/systemPrompt.ts

export const MASTER_SYSTEM_PROMPT = `
[PASTE THE COMPLETE SYSTEM PROMPT HERE]
[The full prompt from our conversations]
[Including all 10 layers, pattern library,]
[MBTI detection, gender adaptation,]
[Vedic astrology, life phase detection,]
[pricing worth calculation, report structure]
`

export function buildDynamicSystemPrompt(userState: UserState): string {
  return `
${MASTER_SYSTEM_PROMPT}

CURRENT USER STATE:
- Entry chip: ${userState.chipSelected}
- Gender: ${userState.gender}
- Age range: ${userState.ageRange}
- Life phase: ${userState.lifeStage}
- Detected pattern: ${userState.detectedPattern || 'detecting'}
- Pattern confidence: ${userState.patternConfidence}%
- MBTI signals: E_I=${userState.mbtiSignals.E_I.signal}(${Math.round(userState.mbtiSignals.E_I.confidence * 100)}%) N_S=${userState.mbtiSignals.N_S.signal}(${Math.round(userState.mbtiSignals.N_S.confidence * 100)}%) T_F=${userState.mbtiSignals.T_F.signal}(${Math.round(userState.mbtiSignals.T_F.confidence * 100)}%) J_P=${userState.mbtiSignals.J_P.signal}(${Math.round(userState.mbtiSignals.J_P.confidence * 100)}%)
- Budget signal: ${userState.budget}
- Question count: ${userState.questionCount}/7
- Sun sign: ${userState.sunSign || 'unknown'}
- Nakshatra: ${userState.nakshatra || 'unknown'}
- Current dasha: ${userState.currentDasha || 'unknown'}

CONVERSATION HISTORY:
${userState.exchangeHistory.map(e => `${e.role.toUpperCase()}: ${e.content}`).join('\n')}
  `
}
```

---

## CONVERSATION ENGINE

The conversation has exactly these phases in order:
Never skip a phase. Never reorder.

```
PHASE 0: idle
  → AI opens first after 1.5s delay
  → "You didn't arrive here by accident.
     What's weighing on you?"
  → 6 chips appear

PHASE 1: first_question
  → User tapped chip OR typed
  → Run detectPattern() + detectMBTISignals()
  → Show typing indicator 1.8s
  → AI asks Q1 (from chip-specific question bank)
  → 2-4 option chips appear

PHASE 2: dynamic_questions
  → API call: generate 3 targeted questions
  → Questions fill gaps in MBTI + pattern detection
  → Each question: acknowledge + ask + chips
  → Collect: gender, age, pattern signals

PHASE 3: final_share
  → "Last thing — is there anything you
     haven't told me yet?"
  → No chips — free text only

PHASE 4: quiz_generating
  → Sacred loader: lotus spinning
  → "Mapping your cognitive architecture..."
  → API call: generate 3 quiz questions
    targeting unresolved MBTI dimensions

PHASE 5: quiz
  → One question at a time
  → Card slides left/right transition
  → 0.4s dissolve between questions

PHASE 6: report_generating
  → Sacred loader with cycling text:
    "Reading your energy..."
    "Mapping your pattern..."
    "Your path is forming..."
  → API call: generate full report JSON

PHASE 7: report
  → MirrorPage renders
  → Nav expands to show 4 pages

PHASE 8: products
  → ProductsPage renders
  → Boneyard skeleton while pricing loads
  → Free products always visible immediately
```

---

## SUPABASE SCHEMA

Run this SQL once to create all tables:

```sql
-- Users table
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  ip_hash TEXT,
  country TEXT,
  city TEXT,
  gender TEXT,
  age_range TEXT,
  mbti_type TEXT,
  core_pattern TEXT,
  urgency_percent INTEGER,
  budget_signal TEXT,
  session_id TEXT UNIQUE
);

-- Conversations table
CREATE TABLE conversations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT REFERENCES users(session_id),
  question_count INTEGER,
  exchange_history JSONB,
  patterns_detected TEXT[],
  mbti_signals JSONB,
  completed BOOLEAN DEFAULT FALSE
);

-- Reports table
CREATE TABLE reports (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT REFERENCES users(session_id),
  report_json JSONB,
  products_json JSONB,
  sun_sign TEXT,
  nakshatra TEXT,
  dasha TEXT,
  life_phase TEXT,
  cosmic_serial_number TEXT UNIQUE,
  verification_hash TEXT
);

-- Purchases table (for when products are added)
CREATE TABLE purchases (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT REFERENCES users(session_id),
  product_id TEXT,
  price_paid DECIMAL,
  currency TEXT,
  country TEXT
);

-- Email captures table
CREATE TABLE emails (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  email TEXT UNIQUE,
  session_id TEXT,
  source TEXT -- 'free_pdf' | 'morning_reset' | 'society'
);

-- Outcomes table (The Closed-Loop Feedback)
CREATE TABLE outcomes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  session_id TEXT REFERENCES users(session_id),
  pattern_name TEXT,
  mbti_type TEXT,
  intervention_path TEXT,
  success_rating INTEGER, -- 1-10
  user_narrative TEXT,
  days_elapsed INTEGER DEFAULT 7,
  shift_detected BOOLEAN DEFAULT FALSE
);
```

---

## PRICING ENGINE

Located at `lib/pricingEngine.ts`.
Always calculate server-side. Never client-side.
The user must never see the calculation.

```typescript
// Key constants
const BASE_PRICES = {
  ebook_audiobook: 47,
  tracker_app: 27,
  ai_chatbot: 37,
  bundle: 97,
}

// PPP multipliers by country code
// India: 0.25, UK: 1.0, US: 1.0
// See full table in lib/pricingEngine.ts

// Urgency multiplier
// 85%+: 1.4x, 70%+: 1.2x, 50%+: 1.0x, below: 0.85x

// Life phase multiplier
// Saturn return (28-35): 1.8x
// Uranus opposition (42-50): 1.3x

// Final price always rounds to:
// [7, 9, 17, 27, 37, 47, 67, 97, 127, 197, 297]
```

---

## PRETEXT INTEGRATION

For the lotus-text-flow effect on the Mirror page:

```typescript
// components/ui/ReportCanvas.tsx

import { prepareWithSegments, layoutNextLineRange, materializeLineRange } from '@chenglou/pretext'

// The lotus Y position comes from Framer Motion useMotionValue()
// connected to the existing Lotus component

// Re-layout runs every animation frame when lotus moves
// Pure arithmetic — zero DOM reflow — 500x faster than CSS
// See full implementation in components/ui/ReportCanvas.tsx
```

---

## BONEYARD INTEGRATION

For product card skeletons:

```bash
# Run once after product cards UI is complete
npx boneyard-js build http://localhost:3000/report

# This generates bones/product-cards.bones.json
# The skeleton exactly matches your real product cards
```

```typescript
// In ProductsPage.tsx
import { Skeleton } from 'boneyard-js/react'
import '../bones/registry'

<Skeleton
  name="product-cards"
  loading={isPricingLoading}
  color="rgba(167,139,250,0.06)"
  darkColor="rgba(167,139,250,0.08)"
  animate="shimmer"
>
  {products.map(p => <ProductCard key={p.id} product={p} />)}
</Skeleton>
```

---

## THE COPY DECODER PROMPT

Located at `lib/decodePrompt.ts`.
This is the prompt users copy and paste into ChatGPT/Claude/Gemini.
It collects their data and formats it for Spiritual AI to parse.

The button lives in the nav top-right.
On click: copies to clipboard.
Also opens their preferred AI if they click a platform button.

The paste-back flow lives at `/decode` route.
User pastes → POST /api/spiritual/parse → report renders.

---

## INSTALL SEQUENCE

```bash
# 1. Clone and install
git clone your-repo
cd spiritualai
npm install

# 2. Install key libraries
npm install @chenglou/pretext
npm install boneyard-js
npm install @supabase/supabase-js
npm install framer-motion
npm install resend

# 3. Set up environment variables
cp .env.example .env.local
# Fill in all keys

# 4. Set up Supabase
# Run the SQL schema above in Supabase SQL editor

# 5. Build Boneyard bones (after product cards UI done)
npx boneyard-js build http://localhost:3000

# 6. Add bones registry to app entry
# import './bones/registry' in layout.tsx

# 7. Run dev
npm run dev
```

---

## BUILD PRIORITY ORDER

Build in this exact sequence. Do not skip ahead.

```
WEEK 1 — THE CORE
[ ] lib/ai.ts — Ollama + Google fallback
[ ] lib/systemPrompt.ts — full system prompt
[ ] lib/conversationEngine.ts — UserState + patterns
[ ] lib/interruptionScripts.ts — 10-layer scripts
[ ] components/home/SpiritualConversation.tsx
[ ] API route: /api/spiritual/route.ts

WEEK 2 — THE REPORT
[ ] lib/pricingEngine.ts — PPP pricing
[ ] API route: /api/report/route.ts
[ ] components/home/MirrorPage.tsx
[ ] components/ui/ReportCanvas.tsx — Pretext integration
[ ] components/ui/BlueprintCard.tsx

WEEK 3 — THE PRODUCTS
[ ] components/home/ProductsPage.tsx
[ ] components/ui/ProductCard.tsx
[ ] Boneyard integration
[ ] Free products with email/social gates
[ ] Paid product display (display only, no payments yet)

WEEK 4 — THE SOCIETY + POLISH
[ ] components/home/SocietyPage.tsx
[ ] CopyPromptButton + /api/spiritual/parse
[ ] Mobile optimisation
[ ] Performance audit
[ ] Deploy to Vercel
```

---

## PERFORMANCE RULES

1. Never block the main thread with AI calls
2. Always stream responses when possible
3. Cache the system prompt — it never changes per session
4. Free products render immediately — no API wait
5. Paid products render after pricing API resolves
6. Boneyard skeleton shows during that wait
7. Images lazy load with blur placeholder
8. Fonts preload in layout.tsx
9. Target: < 2s first contentful paint
10. Target: < 800ms AI first token (streaming)

---

## CODE QUALITY RULES

1. TypeScript strict mode. No `any`. No `as unknown`.
2. Every component has one job. If it has two — split it.
3. No inline styles except for dynamic values.
4. No console.log in production code.
5. Every API route has try/catch with meaningful error messages.
6. Every AI call has a fallback.
7. Every form field is validated before submission.
8. Mobile first. Test on 375px width before desktop.
9. Dark mode is the only mode. Never add light mode.
10. The system prompt is never shortened for speed.

---

## WHAT NOT TO BUILD

Do not build these until explicitly instructed:

- Payment processing (Stripe/Razorpay) — products are display only for now
- User authentication — sessions only for now
- Admin dashboard — not needed yet
- Email sequences — Resend captures only for now
- The actual digital products — the platform comes first
- Push notifications — not needed
- Native mobile app — web first

---

## WHEN YOU ARE UNSURE

Read soul.md first.
Ask: does this decision serve the person in pain at 2am?
If yes: build it.
If no: remove it.

The technical decision is always downstream of the human decision.
