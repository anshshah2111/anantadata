# Roam Website — Event Reference

Every user interaction, lifecycle event, and background behaviour across the site.

---

## Home Page (`/`)

### Navigation
| Trigger | Effect |
|---|---|
| Click nav links (`#echo`, `#features`, `#groups`, `#map`, `#why`) | Browser scrolls to section |
| Click "Watch demo" in nav | Navigate to `/demo` |
| Click "Watch the demo" hero CTA | Navigate to `/demo` |
| Click "See group mode" hero CTA | Scroll to `#groups` section |
| Click "Watch Kobe's group walk" | Navigate to `/demo` |

### Early Access Form
| Trigger | Effect |
|---|---|
| Enter email + click "Get early access" | POST to Formspree (`mzdypoyr`); shows "You're on the list" success state |
| Toggle interest checkboxes | CSS highlights selected tags; values sent with form submission |

**Form payload:**
```
{ email: string, interest: string[] }
// interest values: "Solo walks", "Group exploration", "Dog walks", "New to a city"
```

### Scroll Animations
Framer Motion `whileInView` triggers fade/slide animations as sections enter the viewport. No state changes.

---

## Demo Page (`/demo`)

### Persona Picker
| Trigger | Effect |
|---|---|
| Click "Jordan" or "Kobe" persona button | `switchPersona()` — clears all walk state (step, heatMap, walkPath, currentPos, chatHistory, groupPhase) and sets new persona |

### Walk Playback
| Trigger | Effect |
|---|---|
| Click play button (solo — Jordan) | `startSoloDemo()` — resets state, starts interval advancing position every ~200 ms via `advanceSoloStep()` |
| Click play button (group — Kobe) | `startGroupDemo()` — runs each member's walk in sequence via `runMemberWalk()`, merging individual tile maps into the group map |
| Click "Replay" after walk ends | Same as play — restarts the demo from the beginning |

**What `advanceSoloStep()` does each tick:**
- Updates `currentPos` along the route
- Extends `walkPath`
- Reveals a tile (`heatMap`)
- Triggers Echo conversation beats at matching route steps
- Sets `echoState` / `echoMessage`
- Appends to `chatHistory`
- Fires feature notification toasts

**Group walk phases:** `ready → walking → between → done`

### Feature Pills
| Trigger | Effect |
|---|---|
| Click a feature pill (e.g. "Heat map", "Leaderboard") | Toggles `activeFeature`; shows/hides explanation card below |
| Walk starts (automated) | Cycles through `persona.features` every 7 s, auto-activating each pill |
| Walk ends | Clears cycling interval; sets `activeFeature = null` |

### Feature Notification Toasts
Fired automatically during `advanceSoloStep()` by matching Echo message text:

| Match in Echo message | Toast shown |
|---|---|
| "remind" / "errand" / "milk" / "coffee beans" | Errand reminder |
| "note" / "saved" / "remembering" | Notes saved |
| "luna" / "dog" | Dog walk |
| "priya" / "marcus" / "group" / "overlap" | Leaderboard / friends |
| "new street" / "new tile" / "never" | Discovery |

Toasts auto-clear after 3 500 ms.

---

## Onboarding Flow

| Trigger | Effect |
|---|---|
| Click "Next" on screen 0 or 1 | `setStep(step + 1)` — advance to next screen |
| Click "Allow location" (screen 2) | `navigator.geolocation.getCurrentPosition({ enableHighAccuracy: true })` then `onComplete()` |
| Click "Skip for now" (screen 2) | `onComplete()` immediately |

Both location outcomes call `onComplete()` — onboarding proceeds regardless of permission result.

---

## Voice Controller

### Speech Recognition
| Trigger | Effect |
|---|---|
| `startListening()` called | `recognition.start()`; state → `"listening"` |
| User finishes speaking | `recognition.onresult` fires; transcript captured; state → `"thinking"`; `fetchEchoResponse("freeform", transcript)` called |
| Recognition error | state → `"idle"` |
| `stopListening()` called | `recognition.stop()`; state → `"idle"` |

### Echo API Call (`fetchEchoResponse`)
**Request** — `POST /api/echo`:
```
{ history: [{ role, content }, ...], intent: "opener"|"discovery"|"checkin"|"closer"|"freeform" }
```
**On success:** appends assistant message to history; calls `speakText(text)`.

### Text-to-Speech (`speakText`)
| Event | Effect |
|---|---|
| `speakText(text)` called | Cancels any ongoing speech; creates `SpeechSynthesisUtterance` (rate 0.95, pitch 1.0); tries voices: Samantha → Google US English → Aria → Natural |
| Speech starts | state → `"speaking"` |
| Speech ends | state → `"idle"` |

---

## Echo Blob

State-driven animation only — no user interaction:

| State | Animation |
|---|---|
| `idle` | Gentle pulse, 3 s loop |
| `listening` | Slow breathing, 1.5 s |
| `thinking` | Subtle wobble + rotate, 2 s |
| `speaking` | Fast pulsing, 0.6 s |

---

## Fog Map

All events are data-driven from parent props:

| Prop change | Effect |
|---|---|
| Component mounts | Creates MapLibre map; adds fog, revealed, heat, and walk-path layers |
| `heatMap` updates | `updateLayers()` — punches holes in fog for revealed tiles; recolours heat overlay by visit count |
| `currentPosition` updates | Creates/moves marker; `map.easeTo()` to new position over 500 ms |
| `walkPath` updates | Updates walk-path GeoJSON source (amber line, 0.8 opacity) |

---

## Map Demo (Landing Page Section)

| Trigger | Effect |
|---|---|
| Click "Start Demo" | `startAnimation(0)` — flies map to walk start point; begins `requestAnimationFrame` loop |
| Animation loop (per frame) | Interpolates position; moves marker; reveals tiles; updates spotlight glow; pans camera every 40 frames |
| Walk reaches 100% progress | `phase → "done"`; zooms out; flies to overview after 600 ms |
| Click "Next Walk" | Increments walk index; removes marker; `startAnimation(nextIdx)` |
| Click "Replay" | Cancels animation; clears fog/trail/state; flies back to centre; `phase → "ready"` |

---

## Leaderboard (Group Mode)

No user interaction — entirely props-driven:

| Prop change | Effect |
|---|---|
| `individualMaps` / `groupMap` update | Sorts members by tile count; calculates unique tiles; updates bar widths |
| `currentMemberId` changes | Highlights active member row with pulsing dot |
| `walkPhase` changes | Shows status: "Press play" / active member name / "Next walker starting…" / "{N} friends · {N} tiles" |
| `echoState` / `echoMessage` | Updates EchoBlob state and status text |

---

## Session Summary

| Trigger | Effect |
|---|---|
| Component mounts | Staggered fade-in of stat cards (0.3 s, 0.5 s, 0.7 s, 0.9 s delays) |
| Click "Done" | `onDone()` callback fires; returns to main page/menu |

Displays: distance (`formatDistance`), duration (`formatDuration`), tiles revealed, streak (if > 0).

---

## Pitch Slides (`/pitch`)

### Keyboard
| Key | Effect |
|---|---|
| → / Space / Page Down | Next slide |
| ← / Page Up | Previous slide |
| `F` | Toggle fullscreen |
| `1`–`9` | Jump to slide (0-indexed) |

### Mouse
| Trigger | Effect |
|---|---|
| Left click anywhere | Next slide |
| Right click anywhere | Previous slide |
| Click dot indicator | Jump to that slide |

### Automated
| Event | Effect |
|---|---|
| Slide index changes | Slide remounts with key; CSS slide-enter animation replays |
| Problem slide loads | `<JordanFlipbook autoplay>` cycles 12 frames every 160 ms |
| Solution slide loads | Embeds `/demo/?autoplay=1&persona=jordan` in iframe |

---

## Local Storage

All keys are namespaced with `anonId` (a `crypto.randomUUID()` generated once and persisted).

| Key | Read by | Written by | Value |
|---|---|---|---|
| `roam_anon_id` | `getAnonId()` | `getAnonId()` on first call | UUID string |
| `roam_heat_map_{id}` | `getHeatMap()` | `setHeatMap()`, `mergeWalkIntoHeatMap()` | `{ tileId: visitCount }` |
| `roam_walks_{id}` | `getWalks()` | `saveWalk()` | `WalkRecord[]` |
| `roam_streak_{id}` | `getStreak()` | `incrementStreak()` | integer |
| `roam_last_walk_date_{id}` | `incrementStreak()` | `incrementStreak()` | date string |
| `roam_onboarding_done` | `isOnboardingDone()` | `markOnboardingDone()` | `"true"` |

**Walk record shape:**
```
{
  id: string,
  startedAt: ISO string,
  endedAt: ISO string,
  distanceMeters: number,
  durationSeconds: number,
  tileVisits: { tileId: count },
  path: [lat, lng][]
}
```

**Streak logic:** walked today → no change; walked yesterday → increment; gap > 1 day → reset to 1.

---

## Tile System (`lib/tiles.ts`)

| Function | Called when | Effect |
|---|---|---|
| `latLngToTileId(lat, lng)` | Position changes during walk | Returns `"16/x/y"` string identifying the map tile |
| `tileIdToBounds(tileId)` | `updateLayers()` in FogMap | Returns GeoJSON polygon ring used to punch fog holes and render heat overlay |

Zoom level is fixed at 16 (≈ 600 m × 600 m tiles at mid-latitudes).

---

## No Analytics / Telemetry

There is no analytics or event-tracking code in the current codebase. No events are sent to any third-party service beyond the Formspree form submission.
