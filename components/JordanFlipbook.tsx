"use client";

import { useEffect, useState } from "react";

/**
 * Hand-drawn stop-motion flipbook of Jordan's flat day.
 * 12 SVG frames swap at ~150ms each (6-7 fps) for a stop-motion chalk feel.
 * Respects prefers-reduced-motion — freezes on the slump frame.
 */

const FRAME_MS = 160;
const FRAME_COUNT = 12;

const STROKE = "rgba(245, 230, 200, 0.85)"; // warm chalk
const AMBER = "#F4A261";
const MUTED = "rgba(245, 230, 200, 0.35)";

type FrameProps = { children: React.ReactNode; caption: string };
const Frame = ({ children, caption }: FrameProps) => (
  <svg
    viewBox="0 0 400 400"
    className="w-full h-full"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    stroke={STROKE}
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Caption top-left, small */}
    <text
      x="20"
      y="32"
      fontFamily="monospace"
      fontSize="14"
      fill={MUTED}
      stroke="none"
      letterSpacing="1"
    >
      {caption}
    </text>
    {children}
  </svg>
);

// Helper for a rough "chalk" wiggle path
const SquiggleLines = ({ x, y }: { x: number; y: number }) => (
  <g stroke={MUTED} strokeWidth="1.5">
    <path d={`M${x} ${y} l10 -6 l-10 -6 l10 -6`} />
    <path d={`M${x + 20} ${y - 4} l8 -5 l-8 -5`} opacity="0.6" />
  </g>
);

// ---------- Frame 1: Alarm in bed ----------
const Frame1 = () => (
  <Frame caption="6:45 am">
    {/* bed base */}
    <path d="M70 280 L330 280 L330 310 L70 310 Z" />
    {/* pillow */}
    <path d="M90 255 Q120 245 180 255 L180 280 L90 280 Z" />
    {/* blanket lump (jordan) */}
    <path d="M130 265 Q200 230 310 265 L310 280 L130 280 Z" />
    {/* head peeking */}
    <circle cx="150" cy="260" r="14" />
    <path d="M144 262 l3 -1" strokeWidth="1.8" />
    <path d="M155 262 l3 -1" strokeWidth="1.8" />
    {/* alarm clock */}
    <rect x="40" y="230" width="40" height="30" rx="3" />
    <circle cx="50" cy="228" r="5" />
    <circle cx="70" cy="228" r="5" />
    <text x="60" y="250" textAnchor="middle" fontFamily="monospace" fontSize="12" fill={AMBER} stroke="none">6:45</text>
    {/* sound squiggles */}
    <path d="M25 225 l-8 -5 M25 235 l-10 0 M25 245 l-8 5" stroke={AMBER} strokeWidth="1.8" />
  </Frame>
);

// ---------- Frame 2: Sits up, phone in hand ----------
const Frame2 = () => (
  <Frame caption="6:47 am">
    <path d="M70 310 L330 310 L330 340 L70 340 Z" />
    {/* jordan sitting, head */}
    <circle cx="200" cy="180" r="22" />
    {/* neck + torso */}
    <path d="M200 202 L200 260" />
    <path d="M170 220 L230 220" />
    <path d="M170 220 L165 270 L235 270 L230 220" />
    {/* arm holding phone */}
    <path d="M230 230 L255 220 L255 200" />
    {/* phone */}
    <rect x="245" y="180" width="22" height="32" rx="3" fill={AMBER} fillOpacity="0.15" stroke={AMBER} />
    {/* phone glow on face */}
    <ellipse cx="215" cy="182" rx="18" ry="10" stroke="none" fill={AMBER} fillOpacity="0.08" />
    {/* eyes (dots) */}
    <circle cx="193" cy="178" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="207" cy="178" r="1.5" fill={STROKE} stroke="none" />
  </Frame>
);

// ---------- Frame 3: At the desk, sitting down ----------
const Frame3 = () => (
  <Frame caption="9:10 am">
    {/* floor */}
    <path d="M30 330 L370 330" />
    {/* desk */}
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M100 290 L100 330 M300 290 L300 330" />
    {/* chair */}
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    {/* jordan hunched */}
    <circle cx="190" cy="230" r="18" />
    <circle cx="184" cy="228" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="196" cy="228" r="1.5" fill={STROKE} stroke="none" />
    <path d="M190 248 L195 278" /> {/* curved hunched neck */}
    <path d="M170 270 Q195 262 220 272 L215 280 L180 280 Z" />
    {/* laptop */}
    <rect x="165" y="265" width="70" height="18" rx="2" />
  </Frame>
);

// ---------- Frame 4: Laptop opens, screen glow ----------
const Frame4 = () => (
  <Frame caption="9:12 am">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    {/* chair */}
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    {/* jordan */}
    <circle cx="190" cy="230" r="18" />
    <circle cx="184" cy="228" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="196" cy="228" r="1.5" fill={STROKE} stroke="none" />
    <path d="M190 248 L195 278" />
    <path d="M170 270 Q195 262 220 272 L215 280 L180 280 Z" />
    {/* laptop OPEN */}
    <path d="M165 280 L170 255 L240 255 L235 280 Z" fill={AMBER} fillOpacity="0.2" stroke={AMBER} />
    {/* screen glow on face */}
    <ellipse cx="195" cy="235" rx="30" ry="18" stroke="none" fill={AMBER} fillOpacity="0.1" />
  </Frame>
);

// ---------- Frame 5: Typing (shoulders rounded) ----------
const Frame5 = () => (
  <Frame caption="10:30 am">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    <circle cx="190" cy="232" r="18" />
    <circle cx="184" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="196" cy="230" r="1.5" fill={STROKE} stroke="none" />
    {/* more rounded shoulders */}
    <path d="M162 275 Q195 258 228 276 L222 282 L172 282 Z" />
    <path d="M165 280 L170 258 L240 258 L235 280 Z" fill={AMBER} fillOpacity="0.28" stroke={AMBER} />
    {/* typing hands */}
    <path d="M185 280 L182 288" strokeWidth="1.8" />
    <path d="M205 280 L208 288" strokeWidth="1.8" />
    {/* window in background with sun */}
    <rect x="40" y="80" width="60" height="90" strokeWidth="1.5" opacity="0.5" />
    <line x1="70" y1="80" x2="70" y2="170" strokeWidth="1" opacity="0.4" />
    <line x1="40" y1="125" x2="100" y2="125" strokeWidth="1" opacity="0.4" />
    <circle cx="70" cy="115" r="10" stroke={AMBER} strokeWidth="1.5" opacity="0.7" />
  </Frame>
);

// ---------- Frame 6: Window shows bright sun — Jordan doesn't look ----------
const Frame6 = () => (
  <Frame caption="11:30 am">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    <circle cx="190" cy="232" r="18" />
    <circle cx="184" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="196" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <path d="M162 275 Q195 258 228 276 L222 282 L172 282 Z" />
    <path d="M165 280 L170 258 L240 258 L235 280 Z" fill={AMBER} fillOpacity="0.3" stroke={AMBER} />
    {/* bright window */}
    <rect x="40" y="80" width="60" height="90" stroke={AMBER} strokeWidth="2" />
    <line x1="70" y1="80" x2="70" y2="170" stroke={AMBER} strokeWidth="1.2" />
    <line x1="40" y1="125" x2="100" y2="125" stroke={AMBER} strokeWidth="1.2" />
    <circle cx="70" cy="115" r="14" stroke={AMBER} strokeWidth="2" fill={AMBER} fillOpacity="0.2" />
    {/* sun rays */}
    <path d="M70 95 L70 88 M70 142 L70 148 M50 115 L44 115 M90 115 L96 115" stroke={AMBER} strokeWidth="1.5" />
  </Frame>
);

// ---------- Frame 7: Noon — delivery lunch at desk ----------
const Frame7 = () => (
  <Frame caption="12:32 pm">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    <circle cx="190" cy="232" r="18" />
    <circle cx="184" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="196" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <path d="M162 275 Q195 258 228 276 L222 282 L172 282 Z" />
    {/* laptop closed a bit for the takeout box */}
    <path d="M165 280 L170 262 L240 262 L235 280 Z" fill={AMBER} fillOpacity="0.2" stroke={AMBER} />
    {/* takeout box */}
    <rect x="250" y="268" width="28" height="16" strokeWidth="1.8" />
    <line x1="264" y1="268" x2="264" y2="284" strokeWidth="1.2" />
    {/* steam */}
    <path d="M256 264 q1 -4 -1 -6 q-1 -3 1 -5" strokeWidth="1.4" opacity="0.6" />
    <path d="M270 264 q1 -4 -1 -6 q-1 -3 1 -5" strokeWidth="1.4" opacity="0.6" />
    {/* window (still bright) */}
    <rect x="40" y="80" width="60" height="90" stroke={AMBER} strokeOpacity="0.7" strokeWidth="1.5" />
    <circle cx="70" cy="115" r="12" stroke={AMBER} strokeOpacity="0.5" />
  </Frame>
);

// ---------- Frame 8: Afternoon — light shifts amber ----------
const Frame8 = () => (
  <Frame caption="3:45 pm">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    <circle cx="190" cy="232" r="18" />
    <circle cx="184" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="196" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <path d="M162 275 Q195 258 228 276 L222 282 L172 282 Z" />
    <path d="M165 280 L170 258 L240 258 L235 280 Z" fill={AMBER} fillOpacity="0.35" stroke={AMBER} />
    {/* golden hour window */}
    <rect x="40" y="80" width="60" height="90" stroke={AMBER} strokeWidth="2" fill={AMBER} fillOpacity="0.15" />
    <line x1="70" y1="80" x2="70" y2="170" stroke={AMBER} strokeWidth="1.2" />
    <line x1="40" y1="125" x2="100" y2="125" stroke={AMBER} strokeWidth="1.2" />
    {/* ambient amber wash */}
    <rect x="0" y="0" width="400" height="400" fill={AMBER} fillOpacity="0.04" stroke="none" />
  </Frame>
);

// ---------- Frame 9: Clock shows 5:30 PM ----------
const Frame9 = () => (
  <Frame caption="5:30 pm">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    <circle cx="190" cy="232" r="18" />
    <circle cx="184" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="196" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <path d="M162 275 Q195 258 228 276 L222 282 L172 282 Z" />
    <path d="M165 280 L170 258 L240 258 L235 280 Z" fill={AMBER} fillOpacity="0.35" stroke={AMBER} />
    {/* wall clock big */}
    <circle cx="330" cy="130" r="32" strokeWidth="2.2" />
    <line x1="330" y1="130" x2="330" y2="108" strokeWidth="2" stroke={AMBER} />
    <line x1="330" y1="130" x2="350" y2="142" strokeWidth="2" stroke={AMBER} />
    <circle cx="330" cy="130" r="2" fill={AMBER} stroke="none" />
    {/* dim window */}
    <rect x="40" y="80" width="60" height="90" stroke={STROKE} strokeOpacity="0.4" strokeWidth="1.5" />
  </Frame>
);

// ---------- Frame 10: Jordan glances at window, looks away ----------
const Frame10 = () => (
  <Frame caption="5:32 pm">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    {/* head tilted slightly toward window */}
    <ellipse cx="188" cy="232" rx="18" ry="17" />
    {/* side-glance eyes */}
    <circle cx="180" cy="230" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="194" cy="230" r="1.5" fill={STROKE} stroke="none" />
    {/* small frown */}
    <path d="M184 242 Q190 240 196 242" strokeWidth="1.5" />
    <path d="M162 275 Q195 258 228 276 L222 282 L172 282 Z" />
    <path d="M165 280 L170 258 L240 258 L235 280 Z" fill={AMBER} fillOpacity="0.32" stroke={AMBER} />
    {/* window fading */}
    <rect x="40" y="80" width="60" height="90" stroke={AMBER} strokeOpacity="0.5" strokeWidth="1.5" />
    <line x1="70" y1="80" x2="70" y2="170" stroke={AMBER} strokeOpacity="0.3" />
    {/* dotted "glance" line */}
    <path d="M175 230 L100 125" strokeDasharray="3 4" strokeOpacity="0.3" />
  </Frame>
);

// ---------- Frame 11: Slump — head down ----------
const Frame11 = () => (
  <Frame caption="5:34 pm — flat">
    <path d="M30 330 L370 330" />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" />
    <path d="M150 330 L150 260 L220 260 L220 330" strokeWidth="1.8" />
    {/* head DOWN on desk */}
    <ellipse cx="200" cy="270" rx="22" ry="12" />
    <circle cx="193" cy="270" r="1.5" fill={STROKE} stroke="none" />
    <circle cx="207" cy="270" r="1.5" fill={STROKE} stroke="none" />
    <path d="M195 276 Q200 278 205 276" strokeWidth="1.3" opacity="0.6" />
    {/* arms splayed */}
    <path d="M178 282 L150 285" />
    <path d="M222 282 L250 285" />
    <path d="M162 285 Q195 275 228 285 L222 290 L172 290 Z" />
    {/* laptop pushed aside, dim */}
    <path d="M150 280 L155 260 L195 260 L190 280 Z" stroke={MUTED} fill="none" />
    {/* dark window */}
    <rect x="40" y="80" width="60" height="90" stroke={MUTED} strokeWidth="1.3" />
  </Frame>
);

// ---------- Frame 12: Dark — only screen glow, Jordan silhouette ----------
const Frame12 = () => (
  <Frame caption="7:20 pm">
    <path d="M30 330 L370 330" stroke={MUTED} />
    <path d="M90 280 L310 280 L310 290 L90 290 Z" stroke={MUTED} />
    {/* silhouette */}
    <circle cx="190" cy="232" r="18" stroke={MUTED} />
    <path d="M162 275 Q195 258 228 276 L222 282 L172 282 Z" stroke={MUTED} />
    {/* only the screen glows */}
    <path d="M165 280 L170 258 L240 258 L235 280 Z" fill={AMBER} fillOpacity="0.45" stroke={AMBER} />
    <ellipse cx="200" cy="235" rx="42" ry="20" stroke="none" fill={AMBER} fillOpacity="0.08" />
    {/* everything else near-invisible */}
  </Frame>
);

const FRAMES = [
  Frame1,
  Frame2,
  Frame3,
  Frame4,
  Frame5,
  Frame6,
  Frame7,
  Frame8,
  Frame9,
  Frame10,
  Frame11,
  Frame12,
];

export default function JordanFlipbook({
  autoplay = true,
}: {
  autoplay?: boolean;
}) {
  const [frame, setFrame] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!autoplay || reducedMotion) return;
    const id = setInterval(() => {
      setFrame((f) => (f + 1) % FRAME_COUNT);
    }, FRAME_MS);
    return () => clearInterval(id);
  }, [autoplay, reducedMotion]);

  // Reduced motion: freeze on slump (frame 10, index 10)
  const visibleFrame = reducedMotion ? 10 : frame;

  return (
    <div className="flipbook-stage">
      {FRAMES.map((FrameComp, i) => (
        <div
          key={i}
          className={`flipbook-frame ${i === visibleFrame ? "active" : ""}`}
        >
          <FrameComp />
        </div>
      ))}
    </div>
  );
}
