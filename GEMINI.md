# spiritual-ai-website (spritualai.org) Context

## Tech Stack
- **Framework:** Next.js 16.1.4 (Turbopack enabled)
- **Library:** React 19.2.0
- **Styling:** Tailwind CSS 4, PostCSS
- **Animations/3D:** Three.js, @react-three/fiber, Framer Motion, GSAP, Anime.js, Vanta.js
- **Database/Auth:** Supabase (@supabase/ssr, @supabase/js)
- **AI:** @google/generative-ai
- **Language:** TypeScript 5

## Development Workflow
- **Node Version:** 20.9.0 (per `.nvmrc`) or higher. Current: 22.22.0.
- **Port:** 3000 (Default)
- **Environment Variables:** Managed in `.env.local`

## Core Commands
- `npm run dev`: Start development server on port 3000.
- `npm run build`: Production build.
- `npm run lint`: ESLint check.

## Project Structure Notes
- `/src`: Application source code.
- `/public`: Static assets.
- `/supabase`: Supabase configuration and migrations.
- `/lotusgod_content`: Project-specific content assets.
- `next.config.ts`: Custom rewrites for `/cosmic-compass` and `/MBTI` SPA routes.

## AI Guidelines
- Prefer using `@` for explicit file references (e.g., `@src/app/page.tsx`).
- Use `/memory add` to persist discovered facts about the system or external APIs.
- Enable `--checkpointing` when performing significant refactoring.
