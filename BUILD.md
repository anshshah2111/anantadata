# Roam — Current Build Status

> A voice-first walking companion. Echo walks with you. Your city slowly uncovers as a map of every walk you've ever taken together.
>
> Built for the **UW iStartup Launch Sprint 2026**.

---

## Live URLs

- **Landing page:** https://anshshah2111.github.io/anantadata/
- **Interactive demo:** https://anshshah2111.github.io/anantadata/demo/
- **Repo:** https://github.com/anshshah2111/anantadata

---

## Tech Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 16.2.2 (App Router) |
| Language | TypeScript 5 |
| UI | React 19.2.4 |
| Styling | Tailwind CSS 4 |
| Animation | Framer Motion 12 + custom CSS keyframes |
| Maps | MapLibre GL 5 (free CartoDB Dark Matter tiles, no token) |
| Geo math | Turf.js 7 |
| State (app) | Zustand 5 |
| Voice (app) | Web Speech API |
| AI (app) | Anthropic SDK / Groq fallback |
| Hosting | GitHub Pages (static export to `docs/`) |

Build command: `next build` with `output: "export"`, `basePath: "/anantadata"`, `trailingSlash: true`. Output goes to `out/`, copied to `docs/` for Pages.

---

## File Structure

```
anantadata/
├── app/
│   ├── layout.tsx           # Root layout, fonts, metadata
│   ├── page.tsx             # Landing page (~965 lines, 12 sections)
│   ├── globals.css          # Tailwind + custom keyframes
│   ├── favicon.ico
│   └── demo/
│       └── page.tsx         # Full-screen interactive demo (~404 lines)
├── components/
│   ├── EchoBlob.tsx         # Animated SVG blob mascot (4 states)
│   ├── FogMap.tsx           # MapLibre fog-of-war heat map
│   ├── MapDemo.tsx          # Inline 3-walk auto-playing demo
│   ├── OnboardingFlow.tsx   # 3-screen onboarding (for /app)
│   ├── SessionSummary.tsx   # Post-walk summary (for /app)
│   └── VoiceController.tsx  # Web Speech API wrapper (for /app)
├── lib/
│   ├── tiles.ts             # Slippy map tile math (zoom 16, ~100m)
│   ├── geo.ts               # Distance/duration helpers
│   ├── storage.ts           # localStorage persistence
│   ├── anon-id.ts           # Anonymous user ID
│   ├── echo-prompt.ts       # Claude system prompt
│   └── echo-fallback.ts     # Pre-scripted Echo responses
├── types/
│   └── speech.d.ts          # Web Speech API type stubs
├── docs/                    # Built static export (deployed to Pages)
├── route.ts                 # Standalone Echo API route (not used in build)
├── next.config.ts           # output: export, basePath, trailingSlash
└── package.json
```

---

## Routes

| Route | File | Purpose |
|---|---|---|
| `/` | `app/page.tsx` | Marketing landing page (12 sections) |
| `/demo` | `app/demo/page.tsx` | Full-screen interactive UW walk demo |

The actual product app (walking screen, voice controller, session summary) lives in `components/` but is **not yet wired to a route** — this is sprint scaffolding for after the launch.

---

## Landing page sections (`app/page.tsx`)

| # | Section | Lines | Content |
|---|---|---|---|
| 1 | **NAV** | 13–42 | Gradient "Roam" text logo, anchor links (Echo / Features / The Map / Why Now), "Watch demo" CTA → `/demo` |
| 2 | **HERO** | 43–132 | EchoBlob with 3 pulsing rings, UW iStartup badge, "Roam" gradient headline, tagline, two CTAs (`Try the demo →` and `Meet Echo` anchor), scroll hint, fog-grid background, radial amber glows |
| 3 | **PROBLEM** | 133–191 | "You know you should go outside. You just... don't." 4 stat cards (73% lonely / 8h+ screens / 60% bounce / 0 apps) |
| 4 | **MEET ECHO** | 192–305 | Description + conversation demo card (5 messages of Echo dialogue) + 8 Echo's Rules (4 ✗ / 4 ✓) |
| 5 | **CORE FEATURES** | 306–389 | 6 feature cards with emoji icons and tier tags (Echo Voice, Heat Map, Animated Body, GPS, Streaks, 60s Onboarding) |
| 6 | **THE HEAT MAP** | 390–414 | "Your city remembers where you've been" header + inline `<MapDemo />` 3-walk animation |
| 7 | **HOW IT WORKS** | 415–473 | 4 numbered steps from "open the app" to "end the walk" |
| 8 | **MEET JORDAN + DAY IN THE LIFE** | 474–827 | Crayon-sketch SVG portrait of Jordan + ICP quote + 8-step vertical timeline of Jordan's Tuesday with curving organic vine connector + sequential CSS reveal animation |
| 9 | **WHY NOW** | 828–875 | 3 cards: Voice AI got good / Loneliness epidemic / Gap in market |
| 10 | **BUILT WITH** | 876–912 | Tech stack pills (Next.js, TypeScript, Tailwind, Zustand, MapLibre, Web Speech, Groq, Ollama, Anthropic) |
| 11 | **FINAL CTA** | 913–950 | EchoBlob, "Put your shoes on" headline, primary `Try the demo →` + secondary `View on GitHub` |
| 12 | **FOOTER** | 951–965 | Gradient "Roam" wordmark + UW sprint attribution |

### Design system

| Token | Value |
|---|---|
| Background | `#0a0a0a` |
| Primary text | `#ffffff` |
| Secondary text | `#9ca3af` (gray-400) |
| Muted text | `#6b7280` (gray-500) |
| Accent (amber) | `#f59e0b` → `#fbbf24` (Tailwind amber-500/400) |
| Accent (orange) | `#f97316` → `#ea580c` (orange-500/600) |
| Blob gradient | `#F4C77D` → `#F4A261` → `#E07640` |
| Sketch lines | `#e8e4dc` (warm cream) |
| Card bg | `rgba(255,255,255,0.03)` |
| Card border | `rgba(255,255,255,0.06)` |
| Glass bg | `rgba(255,255,255,0.08)` + `backdrop-blur-md` |
| Font stack | `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica Neue, Arial` |

### Custom CSS (`app/globals.css`)

- `.fog-grid` — 40px repeating grid background, amber-tinted at 8% opacity
- `.blob-ring` + `.blob-ring-2` + `.blob-ring-3` — 3 concentric pulse rings (`@keyframes ring-pulse`)
- `.scroll-arrow` — bouncing chevron (`@keyframes scroll-bob`)
- `.day-step` — sequential reveal animation (`@keyframes day-step-reveal`, fade + slide-up, staggered via `--reveal-delay` CSS var)
- `prefers-reduced-motion` fallback for the day-step reveal

---

## Interactive `/demo` page (`app/demo/page.tsx`)

Full-screen experience with two columns on desktop, stacked on mobile:

### Left column — Map
- `<FogMap />` centered on UW Seattle (`-122.299, 47.655`, zoom 15)
- Play button overlay until user clicks "Start the walk"
- Progress bar across the bottom (1px high, amber)
- "UW Seattle Campus" label top-left
- Replay button bottom-left after completion

### Right column — Echo sidebar
- `<EchoBlob />` with state-driven animation (idle / speaking / listening / thinking)
- State indicator text ("Echo is talking…", etc)
- Echo message bubble (italic, amber tint)
- Scrolling chat history (Echo bubbles vs user bubbles)
- Visual mic button (decorative)

### Walk script
- **41 GPS points** along a real UW route: Red Square → Suzzallo → Allen → Drumheller → Rainier Vista → IMA → loop back
- **8 conversation beats** at steps 0, 6, 12, 17, 22, 28, 34, 39
- **4 simulated user responses** at steps 0, 12, 22, 34
- **1300ms per step** → ~53 second walk duration (originally was 36s, extended per user request)
- Heat map updates on every step using `latLngToTileId()`

---

## Reusable components

### `<EchoBlob state size className />` (`components/EchoBlob.tsx`)
SVG-based animated mascot with 4 states:
- `idle` — gentle 3s breathing scale
- `speaking` — 0.6s rapid pulsing
- `listening` — 1.5s compression
- `thinking` — 2s rotation + slight scale

Uses an SVG `feGaussianBlur + feColorMatrix` "gooey" filter, radial gradient (`#F4C77D → #F4A261 → #E07640`), and 2 orbiting secondary blobs for organic feel. Glow shadow intensity changes with state.

### `<FogMap heatMap currentPosition walkPath center zoom interactive className />` (`components/FogMap.tsx`)
MapLibre GL component with:
- **Dark base** — CartoDB Dark Matter raster tiles
- **Fog overlay** — `#0a0a0a` at 85% opacity covering the world
- **Holes** — revealed tiles cut transparent windows in the fog (GeoJSON polygon with inner rings)
- **Heat coloring** — visit count drives an interpolated color expression: lavender → teal → green → golden → amber (1 → 20+ visits)
- **Walk path** — golden polyline along the user's route
- **Position marker** — glowing amber dot

### `<MapDemo />` (`components/MapDemo.tsx`)
Self-contained inline demo with 3 pre-defined walks (The Quad, Rainier Vista, The Ave). Features:
- Auto-plays each walk's path with a glowing amber marker following the route
- Progressive tile reveal on the same MapLibre fog-of-war
- Camera flies to start of each walk, gently pans during animation
- Echo speech bubbles with each walk's message
- Step indicators, live tile + distance stats
- Replay + Try-it-yourself CTAs at the end
- **Mobile-fixed**: height is `min(480px, calc(100vw * 0.66))` (no `vh` units to avoid URL bar reflow), `touchAction: pan-y` so vertical scroll passes through, `pointer-events-none` on the canvas

---

## Recent build history

| PR | Title | What it shipped |
|---|---|---|
| #1 | Add interactive map demo showcasing fog-of-war | Original `MapDemo.tsx` with 3 walks on UW campus |
| #2 | Deploy map demo to GitHub Pages | Restructured to App Router (`app/`, `components/`, `lib/`), set up static export to `docs/` |
| #3 | Add /demo route and Watch demo buttons | Imported `/demo` route from SearchNextDoor zip; added "Watch demo" buttons |
| #4 | Restore rich landing page content | Restored the 12-section landing page from the old static HTML (Problem, Echo, Features, ICP, Why Now, Tech Stack) |
| #5 | Fix scrolling, restore logo, remove broken /app links | Removed `overflow:hidden` from html/body; restored gradient-text logo; pointed all `/app` links to `/demo` |
| #6 | Fix broken Pages deployment (404) | Fixed nested `docs/out/` issue; added `trailingSlash: true` |
| #7 | Fix black/invisible page on mobile | Removed `opacity:0` from all `motion.*` initial states (was leaving content invisible when mobile JS animations didn't fire) |
| #8 | Fix MapDemo mobile + add Day in the Life flowchart | Replaced `60vh` with width-based height; added `touch-action: pan-y`; added 7-step vertical day timeline |
| #9 | Merge Day in the Life with Jordan ICP + sequential reveal | Combined into single "Meet Jordan" section; added CSS `@keyframes day-step-reveal` with staggered delays |
| #10 | Add Jordan crayon-sketch portrait + organic vine timeline | Inline SVG portrait of Jordan slumped at laptop (sketchy filter); replaced straight gradient line with curving vine SVG |

---

## Known follow-ups / not yet done

- **No `/app` route yet.** The actual product app screens (`OnboardingFlow`, `VoiceController`, `SessionSummary`) exist as components but aren't wired up. All "Try it" CTAs currently point to `/demo`.
- **No `/api/echo` endpoint** in the static export. `route.ts` exists at the root but isn't picked up by Next.js since the app uses `output: export` (no API routes).
- **Real walk experience uses localStorage only** — no backend, no auth, no sync.
- **Voice (`VoiceController.tsx`) uses Web Speech API** which has spotty mobile Safari support.
- **`<MapDemo />` is duplicated with `<FogMap />`** — they share the same fog-of-war pattern but `MapDemo` reimplements it inline. Could be refactored to use `FogMap` if we want to dedupe.
- **MapDemo's `interactive: false`** — desktop users can't pan/zoom the inline preview map. Intentional for now (it's a demo, not exploration).

---

## Local dev

```bash
npm install
npm run dev          # localhost:3000
npm run build        # next build with static export
```

After build, copy `out/` contents into `docs/` and commit:

```bash
rm -rf docs && mkdir docs && cp -a out/. docs/ && touch docs/.nojekyll
```

(GitHub Pages settings: source = `main` branch, `/docs` folder.)

---

*Generated as a snapshot of the build at the time of the request.*
