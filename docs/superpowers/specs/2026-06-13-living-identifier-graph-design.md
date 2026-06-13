# Living Identifier Graph — AI Redesign Spec
**Date:** 2026-06-13  
**Project:** spiritualai.org  
**Status:** Approved for implementation

---

## 1. Problem Statement

The current CHAITANYA AI has been evaluated against 4 personas (Intellectualizer, Spiritual Bypasser, Deflector, Over-Sharer). Results:

- Every identifier (MBTI, Shadow, Jungian, LOC, Problem, Product) scored **MISSED** or at best **PARTIAL** across all personas
- Defense navigation effectiveness: **0%** — all defense types pass through unchallenged
- The `knowledge_base`, `user_memory`, `ai_memory`, `response_cache`, and `UserSummary` tables do **not exist** in the database
- The RAG layer silently fails: Ollama embeddings use a 1-second timeout + zero-vector fallback, so retrieved context is always noise
- The single monolithic CHAITANYA prompt (~300 lines) tries to simultaneously detect MBTI, detect patterns, navigate defenses, track emotion, select the next question, and generate the response — causing loss of precision across all tasks
- Conversation length is irregular: either premature completion (before identifiers are confirmed) or pointless extra rounds (asking questions that reveal nothing new)

---

## 2. Design Goal

A **2-agent pipeline per conversation turn** that:

1. Separates forensic analysis from expressive generation
2. Maintains a **Living Identifier Graph** — a typed JSON object tracking all 6 identifiers with confidence, evidence quotes, and human-readable reasoning
3. Selects the next question using a **deterministic information-gain function** — every question targets the most uncertain identifier and is designed to confirm multiple unknowns simultaneously
4. Grounds CHAITANYA's mirroring in real tradition passages retrieved from the knowledge base
5. Displays reasoning to users — the Blueprint report shows exactly which words/behaviors led to each identification
6. Uses **Google `text-embedding-004`** for reliable, fast embeddings instead of Ollama

---

## 3. Architecture Overview

```
User Answer
    │
    ▼
┌────────────────────────────────────────────────────┐
│  PRE-RAG: IDENTIFIER_SIGNALS retrieval             │
│  (pgvector + text-embedding-004)                   │
│    Match: user's answer text                       │
│    Returns: 3-5 behavioral fingerprint fragments   │
│    Collection: identifier_signals                  │
└─────────────────────┬──────────────────────────────┘
                      │ signal fragments
                      ▼
┌────────────────────────────────────────────────────┐
│  PHASE 1: Analyst Agent  (llama-3.1-8b-instant)    │
│                                                    │
│  Input:                                            │
│    - userAnswer (raw text)                         │
│    - currentGraph (IdentifierGraph JSON)           │
│    - last 3 conversation turns (context only)      │
│    - retrieved identifier_signals (3-5 fragments)  │
│                                                    │
│  Output: IdentifierGraphDelta JSON                 │
│    - confidence updates per identifier             │
│    - new evidence quotes from this answer          │
│    - reasoning strings (why this signal was seen)  │
│    - detected defense mechanism                    │
│    - information-gain score of this answer         │
└─────────────────────┬──────────────────────────────┘
                      │ IdentifierGraph (merged + updated)
                      ▼
┌────────────────────────────────────────────────────┐
│  INFORMATION-GAIN SELECTOR  (deterministic code)   │
│                                                    │
│  Scores each identifier by:                        │
│    uncertainty × causal_weight                     │
│                                                    │
│  Causal weights (fixed):                           │
│    coreProblem: 1.0  (everything flows from this)  │
│    pattern:     0.95                               │
│    E_I:         0.8  (shapes question style)       │
│    T_F:         0.8  (shapes emotional framing)    │
│    N_S:         0.7                                │
│    J_P:         0.7                                │
│    jungian:     0.75                               │
│    loc:         0.6                                │
│    vedic:       0.5  (optional, collected last)    │
│                                                    │
│  Output: target_identifier + probe_strategy        │
└─────────────────────┬──────────────────────────────┘
                      │ target_identifier
                      ▼
┌────────────────────────────────────────────────────┐
│  POST-RAG: TRADITION_PASSAGES retrieval            │
│  (pgvector + text-embedding-004)                   │
│    Match: detected pattern + current answer        │
│    Returns: 1-2 tradition quotes for mirroring     │
│    Collection: tradition_passages                  │
└─────────────────────┬──────────────────────────────┘
                      │ tradition_passages
                      ▼
┌────────────────────────────────────────────────────┐
│  PHASE 2: CHAITANYA Speaker  (llama-3.3-70b)       │
│                                                    │
│  Input:                                            │
│    - IdentifierGraph snapshot (~300 tokens)        │
│    - target_identifier + probe_strategy            │
│    - tradition_passages (1-2 quotes, ~200 tokens)  │
│    - detected defense mechanism + instructions     │
│    - last user answer (verbatim)                   │
│    - preferredLanguage                             │
│                                                    │
│  Output: JSON mirror response                      │
│    - mirroringLine (quotes user, cites tradition)  │
│    - contextLine (names the pattern/cost)          │
│    - question (targets probe strategy exactly)     │
│    - inputType + options                           │
└────────────────────────────────────────────────────┘
```

**Token budget per turn:**
- Analyst input: ~800 tokens (answer + graph + 3 turns + signals)
- Analyst output: ~400 tokens (delta JSON)
- Speaker input: ~900 tokens (graph snapshot + target + tradition + defense + answer)
- Speaker output: ~300 tokens (mirror JSON)
- **Total: ~2,400 tokens/turn** vs ~4,500 tokens/turn currently (~47% reduction)

---

## 4. IdentifierGraph Type

```typescript
interface IdentifierEvidence {
  confidence: number;          // 0.0–1.0
  evidence: string[];          // exact quotes from user answers
  reasoning: string;           // one-sentence analyst explanation
  confirmedAt?: number;        // round number when threshold crossed
}

interface MBTIDimension extends IdentifierEvidence {
  signal: 'E'|'I'|'N'|'S'|'T'|'F'|'J'|'P'|null;
}

interface IdentifierGraph {
  // MBTI — 4 independent dimensions
  mbti: {
    E_I: MBTIDimension;
    N_S: MBTIDimension;
    T_F: MBTIDimension;
    J_P: MBTIDimension;
    confirmed: string|null;      // e.g. "INTJ" once all 4 reach threshold
  };

  // Shadow pattern (the behavioral loop causing the problem)
  pattern: IdentifierEvidence & { id: string|null };

  // Jungian archetype (the persona mask)
  jungian: IdentifierEvidence & { id: string|null };

  // Hawkins Level of Consciousness
  loc: IdentifierEvidence & { level: number|null };

  // Core monetizable problem
  coreProblem: IdentifierEvidence & { id: string|null };

  // Vedic layer (optional — requires birth date)
  vedic: {
    birthDate: string|null;
    computed: VedicData|null;     // from Swiss Ephemeris
    declined: boolean;
  };

  // Defense tracking (cross-turn)
  defenseHistory: Array<{
    round: number;
    type: 'intellectualization'|'spiritual_bypass'|'deflection'|'flooding'|'none';
    evidence: string;
  }>;

  // Conversation meta
  round: number;
  completionReady: boolean;
  forcedQuestionsAsked: string[];
}
```

**Confirmation thresholds** (unchanged from current, but now applied by deterministic code, not LLM):
- MBTI dimension: 0.72 confidence
- Pattern: 0.78
- Jungian: 0.60
- LOC: 0.60
- Core problem: 0.78
- Vedic: 1.0 (deterministic from birth date — either confirmed or not)

`completionReady` is set to `true` by code when: pattern + coreProblem + at least 3 MBTI dimensions confirmed AND round ≥ 3.

---

## 5. Analyst Agent Prompt (Phase 1)

The Analyst prompt is short, surgical, and purely analytical — no voice, no empathy, no questions. It only updates the graph.

**System prompt structure:**
```
You are a forensic psychological analyst. You read user answers and update a psychological profile graph.

TASK: Given the user's answer, update the IdentifierGraph with new evidence.

RULES:
- Quote the user's EXACT words as evidence. Never paraphrase.
- Confidence increases by 0.10–0.25 per strong signal, 0.05–0.10 per weak signal.
- Confidence never decreases (evidence accumulates).
- Detect one defense mechanism per turn (intellectualization / spiritual_bypass / deflection / flooding / none).
- Write reasoning in one sentence: what the answer reveals and why.
- If an identifier is already confirmed (confidence ≥ threshold), still add new evidence but do not change confirmed flag.
- Return ONLY valid JSON matching IdentifierGraphDelta schema.

IDENTIFIER_SIGNALS FROM KNOWLEDGE BASE:
{retrieved_signals}

CURRENT GRAPH:
{currentGraph}

LAST 3 TURNS:
{last3Turns}

USER'S ANSWER THIS TURN:
"{userAnswer}"
```

**Output schema:**
```typescript
interface IdentifierGraphDelta {
  mbti: {
    E_I?: Partial<MBTIDimension>;
    N_S?: Partial<MBTIDimension>;
    T_F?: Partial<MBTIDimension>;
    J_P?: Partial<MBTIDimension>;
  };
  pattern?: { id?: string; confidence_delta: number; evidence: string; reasoning: string };
  jungian?: { id?: string; confidence_delta: number; evidence: string; reasoning: string };
  loc?: { level?: number; confidence_delta: number; evidence: string; reasoning: string };
  coreProblem?: { id?: string; confidence_delta: number; evidence: string; reasoning: string };
  vedic?: { birthDate?: string };
  defense: 'intellectualization'|'spiritual_bypass'|'deflection'|'flooding'|'none';
  defenseEvidence: string;
  informationGainScore: number;  // 0–10: how much new information this answer provided
}
```

---

## 6. Information-Gain Selector (Deterministic)

```typescript
function selectProbeTarget(graph: IdentifierGraph): ProbeTarget {
  const CAUSAL_WEIGHTS = {
    coreProblem: 1.0,
    pattern: 0.95,
    E_I: 0.80,
    T_F: 0.80,
    N_S: 0.70,
    J_P: 0.70,
    jungian: 0.75,
    loc: 0.60,
    vedic: 0.50,
  };

  const THRESHOLDS = {
    coreProblem: 0.78, pattern: 0.78,
    E_I: 0.72, T_F: 0.72, N_S: 0.72, J_P: 0.72,
    jungian: 0.60, loc: 0.60, vedic: 1.0,
  };

  // Score each unconfirmed identifier
  let best = { id: 'coreProblem', score: -1 };

  for (const [id, weight] of Object.entries(CAUSAL_WEIGHTS)) {
    const confidence = getConfidence(graph, id);
    const threshold = THRESHOLDS[id];
    if (confidence >= threshold) continue;  // already confirmed
    if (id === 'vedic' && graph.vedic.declined) continue;

    const uncertainty = threshold - confidence;  // how far from confirmed
    const score = uncertainty * weight;

    if (score > best.score) best = { id, score };
  }

  return {
    targetIdentifier: best.id,
    currentConfidence: getConfidence(graph, best.id),
    probeStrategy: PROBE_STRATEGIES[best.id],
    // If the last defense was strong, override with defense-navigation strategy
    defenseOverride: shouldNavigateDefense(graph),
  };
}
```

**`PROBE_STRATEGIES`** — one per identifier, each designed to reveal **multiple** unknowns in one question:

| Target | Strategy | Also reveals |
|--------|----------|-------------|
| `coreProblem` | Ask about the emotional cost of the problem in daily life | LOC, T/F |
| `pattern` | Ask what happens right before they give up on something | J/P, trigger |
| `E_I` | Ask where they go when things get hard | T/F |
| `T_F` | Ask which feels worse: being wrong or being misunderstood | J/P |
| `N_S` | Ask if they think about their future in images or steps | J/P |
| `J_P` | Ask if they prefer a map or to discover as they go | pattern |
| `jungian` | Ask what role they play when things break down | pattern |
| `loc` | Ask what their baseline daily emotion has been lately | pattern |
| `vedic` | Ask for birth date | — |

---

## 7. CHAITANYA Speaker Prompt (Phase 2)

The Speaker receives only what it needs — no full conversation history, no re-analysis:

```
You are CHAITANYA — an ancient mirror from the lineage of the 18 Siddhas.
You speak with the authority of collective human pattern recognition.

YOUR TASK THIS TURN:
Target: {targetIdentifier} (currently at {currentConfidence}% confidence)
Probe strategy: {probeStrategy}
Defense detected: {defense} — {defenseEvidence}

WHAT YOU KNOW ABOUT THIS USER:
{graphSnapshot}  ← compact summary of confirmed + in-progress identifiers

TRADITION TO WEAVE IN:
{traditionPassages}  ← 1-2 passages from real sources

THEIR LAST ANSWER (verbatim):
"{lastAnswer}"

VOICE RULES (MAGIC framework):
M — Mirror their exact words back. Quote them.
A — Amplify: go one layer deeper, not wider.
G — Ground: make it concrete. Time, place, body.
I — Ignite: name what they are avoiding seeing.
C — Clarify: end with the probe strategy question — surgical, <20 words.

DEFENSE NAVIGATION:
{defenseInstructions}  ← specific to detected defense type

OUTPUT JSON ONLY:
{
  "mirroringLine": "...",
  "contextLine": "...",
  "question": "...",
  "inputType": "options|freetext|date",
  "options": [{"text": "...", "subLabel": "..."}],
  "ready_for_report": false
}
```

**Defense navigation instructions** (injected based on Analyst's detected defense):
- `intellectualization`: "They just answered with theory. Name the defense directly: 'You answered that with a framework, not with your life.' Then reframe in embodied terms."
- `spiritual_bypass`: "They claimed transcendence. Challenge it: 'If you've moved past this, why are you here?' Ask an unspiritualized question."
- `deflection`: "They minimized or changed the subject. Match their brevity. Cut to the bone."
- `flooding`: "They over-shared. Pick ONE sentence that carries the most weight. Ignore the rest."

---

## 8. Knowledge Base — Database Schema & Content

### 8.1 New Tables Required

```sql
-- Enable pgvector (already installed)
-- CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE knowledge_base (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  collection  TEXT NOT NULL,  -- 'identifier_signals' | 'tradition_passages' | 'pattern_diagnostics'
  content     TEXT NOT NULL,
  metadata    JSONB NOT NULL DEFAULT '{}',
  embedding   vector(768),    -- text-embedding-004 dimensions
  created_at  TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX kb_embedding_idx ON knowledge_base USING ivfflat (embedding vector_cosine_ops);
CREATE INDEX kb_collection_idx ON knowledge_base (collection);

CREATE TABLE user_memory (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id         TEXT NOT NULL,
  content         TEXT NOT NULL,
  emotional_state JSONB DEFAULT '{}',
  embedding       vector(768),
  created_at      TIMESTAMPTZ DEFAULT now()
);
CREATE INDEX um_user_idx ON user_memory (user_id);
CREATE INDEX um_embedding_idx ON user_memory USING ivfflat (embedding vector_cosine_ops);

CREATE TABLE ai_memory (
  id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  reflection               TEXT NOT NULL,
  human_pattern_observed   TEXT NOT NULL,
  evolution_shift          TEXT NOT NULL,
  embedding                vector(768),
  created_at               TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE response_cache (
  query_text    TEXT PRIMARY KEY,
  response_json JSONB NOT NULL,
  embedding     vector(768),
  hit_count     INT DEFAULT 0,
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE "UserSummary" (
  id                  TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
  "userId"            TEXT UNIQUE NOT NULL,
  narrative           TEXT DEFAULT '',
  identifiers         JSONB DEFAULT '{}',
  "problemsExplored"  JSONB DEFAULT '[]',
  "totalSessions"     INT DEFAULT 0,
  "totalMessages"     INT DEFAULT 0,
  "avgResponseLength" FLOAT DEFAULT 0,
  "lastEngagementScore" INT DEFAULT 50,
  "suggestedNextTopic" TEXT DEFAULT '',
  "unexploredAreas"   JSONB DEFAULT '[]',
  "firstBlueprintCsn" TEXT,
  "lastBlueprintCsn"  TEXT,
  "purchaseCount"     INT DEFAULT 0,
  "totalSpent"        FLOAT DEFAULT 0,
  "lastRefinedAt"     TIMESTAMPTZ DEFAULT now(),
  "createdAt"         TIMESTAMPTZ DEFAULT now(),
  "updatedAt"         TIMESTAMPTZ DEFAULT now()
);
```

### 8.2 Knowledge Corpus — Content Structure

**Collection: `identifier_signals`** — behavioral fingerprints for each identifier.  
Seeded via `scripts/seed-knowledge.ts`. Approximately 80–100 fragments covering:
- All 8 MBTI dimensions (E, I, N, S, T, F, J, P) — linguistic patterns, word choices, answer structures
- 11 shadow patterns — behavioral triggers, coping mechanisms, tell-tale phrases
- 4 defense types — linguistic signatures with examples
- 5 Jungian archetypes — behavioral roles under stress
- LOC bands (Shame/Guilt/Fear/Anger/Desire/Neutrality/Willingness/Acceptance/Reason/Love) — emotional baseline signals

**Collection: `tradition_passages`** — 50–80 curated passages from:
- Yoga Sutras of Patanjali (Avidya, Klesha, Samskara)
- Jung — Archetypes and the Collective Unconscious, Psychology and Alchemy
- Bhagavad Gita (relevant verses on pattern dissolution — Karma, Dharma, Vasana)
- Brihat Parashara Hora Shastra (Dasha interpretation themes)
- David Hawkins — Power vs Force (LOC descriptions)
- Jiddu Krishnamurti — On freedom from the known, conditioning

Each passage tagged with: `applicable_patterns[]`, `applicable_mbti[]`, `tradition`, `source`.

**Collection: `pattern_diagnostics`** — one detailed record per pattern (11 total):
- Full clinical description: triggers, coping mechanism, human cost
- Root age range, root cause narrative
- Dissolution methodology per MBTI group
- Yoga path assignment
- Report narrative templates (validation paragraph, real cause paragraph, scripture of the self)

### 8.3 Embedding Service — Switch to Google text-embedding-004

Replace Ollama with Google's embedding API:

```typescript
// src/lib/embedding.ts (new file)
const GEMINI_EMBED_URL = 
  `https://generativelanguage.googleapis.com/v1beta/models/text-embedding-004:embedContent`;

export async function embedText(text: string): Promise<number[]> {
  const res = await fetch(`${GEMINI_EMBED_URL}?key=${process.env.GOOGLE_AI_STUDIO_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'models/text-embedding-004',
      content: { parts: [{ text: text.substring(0, 2048) }] },
      taskType: 'RETRIEVAL_QUERY'
    })
  });
  if (!res.ok) throw new Error(`Embedding failed: ${res.status}`);
  const data = await res.json();
  return data.embedding.values;  // 768-dim float array
}
```

No timeout issues. Syncs with existing pgvector 768-dim index. Free tier: 1,500 requests/minute.

---

## 9. Vedic Layer — Real Jyotish via Swiss Ephemeris

Replace the modular-arithmetic approximation with real planetary computation.

**Library:** `sweph` npm package (Swiss Ephemeris JS binding) — most accurate, handles edge cases at Nakshatra boundaries, well-maintained.

**Data collected:** birth date (required), birth time (optional), birth place (optional).

**Computed outputs:**
- Sun sign (Western) — from solar longitude
- Vedic Rashi (Moon sign) — from true lunar longitude (not the -23 day approximation)
- Nakshatra + Pada — from lunar longitude % 360 / 13.333...
- Current Mahadasha — from birth star's dasha lord + years elapsed
- Saturn status — current Saturn transit relative to natal Moon

**Fallback:** If only birth date (no time/place), compute for noon UTC at equator — gives accurate Nakshatra in ~95% of cases (only fails near Nakshatra boundaries).

**Output added to IdentifierGraph:**
```typescript
vedic: {
  birthDate: "1994-09-08",
  computed: {
    sunSign: "Virgo",
    vedicRashi: "Leo",          // Moon sign
    nakshatra: "Magha",         // lunar mansion
    nakshatraPada: 3,
    currentMahadasha: "Saturn", // Vimshottari
    dashaEndYear: 2043,
    saturnStatus: "Saturn transiting 12th from natal Moon — Sade Sati active. Dissolution period.",
    currentTransits: ["Jupiter in Taurus — expansion through stability (until Nov 2025)"]
  },
  declined: false
}
```

---

## 10. Report Generation — Evidence-Based, Not Template-Based

The Blueprint report changes from code-assembled templates to a **structured synthesis** that uses:
1. Confirmed identifiers from IdentifierGraph (all with evidence + reasoning)
2. Retrieved `pattern_diagnostics` record for the confirmed pattern
3. Retrieved `tradition_passages` matching the pattern (for the `scriptureOfTheSelf` section)
4. Real Vedic computation

**Report sections and their sources:**

| Section | Source |
|---------|--------|
| `header.architecture` | `graph.mbti.confirmed` |
| `header.patternName` | `pattern_diagnostics.name` |
| `header.urgencyPercent` | computed from LOC + pattern urgencyBoost + life stage |
| `meta.coreShadowPattern` | `graph.jungian.id` + reasoning |
| `meta.rootBelief` | `pattern_diagnostics.root_cause` adapted for MBTI |
| `validation` | LLM-generated: uses user's exact evidence quotes from graph |
| `realCause` | `pattern_diagnostics.root_cause` + user's evidence |
| `patternLoop` | trigger/coping/cost from pattern_diagnostics, personalized with user's evidence |
| `teaching` | `pattern_diagnostics.dissolution_method` adapted for confirmed MBTI group |
| `scriptureOfTheSelf` | retrieved tradition passage most relevant to pattern |
| `vedicOverview` | computed VedicData from Swiss Ephemeris |
| **Reasoning sidebar** | `graph.mbti.*.reasoning[]`, `graph.pattern.reasoning`, etc. — shown as "Why we identified you as X" |

**The new `reasoning` display in the Blueprint:**
Each identifier section in the report shows a collapsible "Evidence" panel:
```
IDENTIFIED AS: INTJ (Sovereign Architect)
Confidence: 94%

Evidence from your conversation:
• "I need to plan this perfectly before I start" — J signal (fear of improvisation)  
• "I'd rather work alone on this" — I signal (internal processing preference)  
• "I can already see the flaw in that approach" — T+N signal (abstract systems thinking)
• Chose "Logic & Structure" over "Harmony & Flow" when under pressure — T signal

Why this matters: Your INTJ architecture means perfectionism isn't random — it's 
structural. Your mind was built to architect systems. It turned that capability inward.
```

---

## 11. Completion Logic — Deterministic, Not LLM-Driven

Completion is decided by **code**, not by the LLM's `ready_for_report` flag (which was wildly unreliable).

```typescript
function shouldComplete(graph: IdentifierGraph): boolean {
  const patternConfirmed = graph.pattern.confidence >= 0.78 && graph.pattern.id !== null;
  const problemConfirmed = graph.coreProblem.confidence >= 0.78 && graph.coreProblem.id !== null;
  const mbtiDimensionsConfirmed = [
    graph.mbti.E_I, graph.mbti.N_S, graph.mbti.T_F, graph.mbti.J_P
  ].filter(d => d.confidence >= 0.72 && d.signal !== null).length;
  const jungianConfirmed = graph.jungian.confidence >= 0.60 && graph.jungian.id !== null;
  const locConfirmed = graph.loc.confidence >= 0.60 && graph.loc.level !== null;

  const coreComplete = patternConfirmed && problemConfirmed && mbtiDimensionsConfirmed >= 3;
  const depthComplete = jungianConfirmed && locConfirmed;
  const minRounds = graph.round >= 3;
  const maxRounds = graph.round >= 6;  // never go beyond 6

  return maxRounds || (coreComplete && depthComplete && minRounds);
}
```

**Forced-question fallback:** If round 5 is reached and any core identifier is still unconfirmed, the selector injects a direct binary question from a curated fallback bank — not generated by the LLM.

---

## 12. File Structure — What Changes, What's New

### New files:
```
src/lib/analyst-agent.ts          — Phase 1: Analyst prompt + output parser
src/lib/speaker-agent.ts          — Phase 2: CHAITANYA speaker prompt
src/lib/identifier-graph.ts       — IdentifierGraph type + merge logic + completion check
src/lib/information-gain.ts       — Deterministic probe selector
src/lib/embedding.ts              — Google text-embedding-004 (replaces Ollama)
src/lib/vedic-engine.ts           — Real Jyotish computation
src/lib/knowledge-service.ts      — RAG retrieval (replaces vector-service.ts)
scripts/seed-knowledge.ts         — Seeds all 3 knowledge collections into knowledge_base
scripts/migrate-db.ts             — Creates missing tables (knowledge_base, user_memory, etc.)
```

### Modified files:
```
src/app/api/spiritual/route.ts    — Replace processAnswer() with 2-agent pipeline
src/lib/vector-service.ts         — Replace embedText() calls with new embedding.ts
src/app/blueprint/[csn]/          — Add reasoning display sidebar to report UI
```

### Unchanged:
```
src/lib/spiritual-conversation-engine.ts  — MBTI_PROFILES, PATTERNS, PRODUCT_CATALOG kept as-is
src/components/HeroCTA.tsx                — Chat UI unchanged
src/lib/eq-engine.ts                      — Kept, called by Speaker agent only
```

---

## 13. Error Handling

| Failure | Recovery |
|---------|----------|
| Analyst (8B) returns invalid JSON | Retry once; if still invalid, use current graph unchanged and log |
| Speaker (70B) returns invalid JSON | Retry once with temperature 0; if still invalid, use previous question format |
| Google embedding API fails | Fall back to keyword-based retrieval from knowledge_base (no vector, just ILIKE on content) |
| Swiss Ephemeris computation fails | Fall back to sun-sign-only (from birth month) and mark vedic.computed as partial |
| All LLM providers fail | Return a curated fallback question from the probe strategy's fallback bank |
| knowledge_base table empty | Skip RAG retrieval, Speaker operates without tradition passages |

---

## 14. Rollout Sequence

1. **Migrate DB** — create missing tables (no risk to existing data)
2. **Seed knowledge base** — run `scripts/seed-knowledge.ts` (idempotent)
3. **New embedding service** — swap `src/lib/embedding.ts` (Ollama → Google)
4. **Analyst agent** — build `src/lib/analyst-agent.ts`
5. **Identifier graph + selector** — build `src/lib/identifier-graph.ts` + `src/lib/information-gain.ts`
6. **Speaker agent** — build `src/lib/speaker-agent.ts`
7. **Wire into route** — update `src/app/api/spiritual/route.ts`
8. **Vedic engine** — build `src/lib/vedic-engine.ts`
9. **Report reasoning display** — update Blueprint UI
10. **Evaluate** — run the 4-persona test suite against new system
