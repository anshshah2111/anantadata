"use client";

import { useEffect, useState } from "react";
import EchoBlob from "./EchoBlob";
import JordanFlipbook from "./JordanFlipbook";

/* ---------- Shared slide wrapper ---------- */

export function Slide({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`pitch-slide slide-enter ${className}`}>{children}</div>
  );
}

/* ============================================================ */
/*  Slide 1 — COVER                                               */
/* ============================================================ */

export function CoverSlide() {
  return (
    <Slide>
      {/* Soft EchoBlob glow behind text */}
      <div className="absolute inset-0 flex items-center justify-end pr-[8%] pointer-events-none opacity-60">
        <div className="relative" style={{ width: 420, height: 420 }}>
          <div className="blob-ring" style={{ inset: -20 }} />
          <div className="blob-ring blob-ring-2" style={{ inset: -50 }} />
          <div className="blob-ring blob-ring-3" style={{ inset: -80 }} />
          <div className="absolute inset-0 flex items-center justify-center">
            <EchoBlob state="idle" size={280} />
          </div>
        </div>
      </div>

      {/* Content — left-aligned */}
      <div className="relative z-10 w-full max-w-5xl flex flex-col items-start text-left px-[5%]">
        <h1
          className="text-[clamp(5rem,14vw,14rem)] font-black leading-[0.9] tracking-tight bg-gradient-to-br from-amber-100 via-amber-200 to-amber-400 bg-clip-text text-transparent"
          style={{ fontFamily: "var(--font-geist-sans), system-ui, sans-serif" }}
        >
          Roam
        </h1>

        <div
          className="mt-8 text-amber-300 font-bold text-[clamp(1rem,2vw,1.5rem)] tracking-wide"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          A Social Walking Trend
        </div>

        <p
          className="mt-4 text-amber-200/70 text-[clamp(0.9rem,1.3vw,1.125rem)] max-w-2xl leading-relaxed"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          voice companion for those who need a friend in their ear and a group
          heat map for those who want to explore with theirs.
        </p>

        <div
          className="mt-20 text-amber-400/90 text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          Ansh &amp; Vinod
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================ */
/*  Slide 2 — PROBLEM (with flipbook)                             */
/* ============================================================ */

export function ProblemSlide() {
  return (
    <Slide>
      <div className="relative z-10 w-full max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Text */}
        <div className="text-left px-4">
          <h2 className="text-[clamp(2.5rem,6vw,5rem)] font-light leading-[1.05] text-white">
            You said you'd go outside today.
          </h2>
          <p className="mt-6 text-[clamp(2rem,5vw,4rem)] font-extralight text-amber-300 italic">
            You didn't.
          </p>
          <div
            className="mt-10 text-xs md:text-sm text-gray-500 tracking-wide"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            73% lonely · 60% quit fitness apps · 4 months to make a friend
          </div>
        </div>

        {/* Flipbook */}
        <div className="aspect-square w-full max-w-md mx-auto">
          <JordanFlipbook autoplay />
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================ */
/*  Slide 3 — INSIGHT (quotes + evidence polaroids)               */
/* ============================================================ */

// Evidence photo filenames — append to this list as user drops files
// in /public/evidence/. Missing files degrade silently (just won't render).
const EVIDENCE_PHOTOS: { src: string; tilt: number; top: string; left: string; size: number }[] = [
  { src: "interview-1.jpg", tilt: -6, top: "8%", left: "5%", size: 180 },
  { src: "interview-2.jpg", tilt: 5, top: "14%", left: "78%", size: 200 },
  { src: "reddit.png", tilt: -3, top: "68%", left: "10%", size: 220 },
  { src: "signups.png", tilt: 7, top: "72%", left: "74%", size: 190 },
  { src: "interview-3.jpg", tilt: -8, top: "42%", left: "2%", size: 170 },
];

const QUOTES = [
  "Haven't been outside for a non-errand reason in two weeks.",
  "Downloaded Strava three times. Deleted it three times.",
  "If someone just said hey, let's go — I'd go.",
];

export function InsightSlide() {
  const basePath = "/anantadata";
  return (
    <Slide>
      {/* Polaroid evidence collage (background, faded) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {EVIDENCE_PHOTOS.map((p, i) => (
          <div
            key={i}
            className="polaroid"
            style={{
              top: p.top,
              left: p.left,
              width: p.size,
              ["--tilt" as string]: `${p.tilt}deg`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${basePath}/evidence/${p.src}`}
              alt=""
              width={p.size - 12}
              height={p.size - 12}
              style={{ width: p.size - 12, height: p.size - 12, objectFit: "cover" }}
              onError={(e) => {
                (e.currentTarget.parentElement as HTMLElement).style.display = "none";
              }}
            />
          </div>
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10 w-full max-w-4xl text-center">
        <div
          className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-10"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          Then we talked to people.
        </div>

        <div className="flex flex-col gap-8">
          {QUOTES.map((q, i) => (
            <blockquote
              key={i}
              className="quote-stagger text-[clamp(1.1rem,2.2vw,1.75rem)] font-light text-white/90 leading-snug"
              style={{
                ["--quote-delay" as string]: `${0.2 + i * 0.4}s`,
                fontFamily: "var(--font-geist-mono), ui-monospace, monospace",
              }}
            >
              <span className="text-amber-400 mr-1">&ldquo;</span>
              {q}
              <span className="text-amber-400 ml-1">&rdquo;</span>
            </blockquote>
          ))}
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================ */
/*  Slide 4 — SOLUTION (embedded live demo)                       */
/* ============================================================ */

export function SolutionSlide() {
  const basePath = "/anantadata";
  return (
    <Slide>
      <div className="relative z-10 w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Text left */}
        <div className="text-left px-4">
          <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] bg-gradient-to-br from-amber-100 to-amber-400 bg-clip-text text-transparent">
            Roam.
          </h2>
          <p className="mt-8 text-[clamp(1.25rem,2.5vw,2rem)] font-light text-white/90 leading-snug">
            A friend in your ear. A map that glows where you've been.
          </p>
          <div
            className="mt-10 text-sm text-amber-300/80 tracking-wide"
            style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
          >
            Echo. Heat map. Together.
          </div>
        </div>

        {/* Phone-frame embedded demo */}
        <div className="flex justify-center">
          <div
            className="relative rounded-[2.5rem] border-2 border-white/20 bg-black shadow-[0_0_60px_rgba(244,162,97,0.15)] overflow-hidden"
            style={{ width: 320, height: 640 }}
          >
            {/* Notch */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-b-xl z-10" />
            <iframe
              src={`${basePath}/demo/?autoplay=1&persona=jordan`}
              title="Live Roam demo"
              className="w-full h-full border-0"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================ */
/*  Slide 5 — VISION                                              */
/* ============================================================ */

export function VisionSlide() {
  return (
    <Slide>
      <div className="relative z-10 w-full max-w-5xl text-center">
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-light leading-[1.0] text-white">
          Every city.
        </h2>
        <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[1.0] bg-gradient-to-br from-amber-200 to-amber-500 bg-clip-text text-transparent mt-2">
          A living map.
        </h2>
        <p className="mt-12 text-[clamp(1rem,2vw,1.5rem)] font-light text-white/70 max-w-3xl mx-auto">
          Shaped by the people who actually walk it.
        </p>

        <div
          className="mt-24 flex items-center justify-center gap-4 text-amber-300/70 text-sm tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
        >
          <span>roam</span>
          <span className="w-12 h-px bg-amber-300/40" />
          <span>put your shoes on</span>
        </div>
      </div>
    </Slide>
  );
}

/* ============================================================ */
/*  Deck shell — navigation, dots, progress                       */
/* ============================================================ */

const SLIDES = [CoverSlide, ProblemSlide, InsightSlide, SolutionSlide, VisionSlide];

export default function PitchDeck() {
  const [i, setI] = useState(0);

  const next = () => setI((n) => Math.min(n + 1, SLIDES.length - 1));
  const prev = () => setI((n) => Math.max(n - 1, 0));

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
        e.preventDefault();
        next();
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        e.preventDefault();
        prev();
      } else if (e.key === "f" || e.key === "F") {
        if (!document.fullscreenElement) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      } else if (e.key === "Escape") {
        // nothing — fullscreen exit is automatic
      } else if (e.key >= "1" && e.key <= "9") {
        const idx = parseInt(e.key) - 1;
        if (idx < SLIDES.length) setI(idx);
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  const Current = SLIDES[i];

  return (
    <div
      className="pitch-root"
      onClick={next}
      onContextMenu={(e) => {
        e.preventDefault();
        prev();
      }}
    >
      {/* Re-mount on slide change so slide-enter animation replays */}
      <Current key={i} />

      {/* Slide dots */}
      <div className="absolute right-6 top-1/2 -translate-y-1/2 flex flex-col gap-3 z-40">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.stopPropagation();
              setI(idx);
            }}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === i
                ? "bg-amber-400 scale-150"
                : "bg-white/20 hover:bg-white/40"
            }`}
            aria-label={`Slide ${idx + 1}`}
          />
        ))}
      </div>

      {/* Bottom hint */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 text-xs text-white/30 tracking-[0.2em] uppercase z-40 pointer-events-none"
        style={{ fontFamily: "var(--font-geist-mono), ui-monospace, monospace" }}
      >
        {i + 1} / {SLIDES.length} · ← → to navigate · f for fullscreen
      </div>
    </div>
  );
}
