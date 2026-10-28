"use client";

import { useRef, useState } from "react";

const BASE_PATH = "/anantadata";

/**
 * The founders' 2-minute demo, recorded during the UW iStartup Launch
 * Sprint (April 2026) and re-edited in October 2026. Captions are on by
 * default because most people start a video with the sound off.
 */
export default function WatchSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);

  const play = () => {
    const v = videoRef.current;
    if (!v) return;
    setStarted(true);
    v.play().catch(() => {
      /* autoplay policies can still refuse; native controls remain */
    });
  };

  return (
    <section id="watch" className="relative px-6 py-24 scroll-mt-20">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-10">
          <div className="text-xs tracking-[0.3em] uppercase text-amber-400/80 mb-4">
            Watch &middot; 2 minutes
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
            Meet the people building Roam
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Vinod and Ansh on why they built it, a walk through the product,
            and what real people said when they tried it.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl shadow-amber-500/10 aspect-video">
          <video
            ref={videoRef}
            className="w-full h-full"
            controls={started}
            playsInline
            preload="metadata"
            poster={`${BASE_PATH}/video/roam-demo-poster.jpg`}
            onPlay={() => setStarted(true)}
          >
            <source src={`${BASE_PATH}/video/roam-demo.mp4`} type="video/mp4" />
            <track
              kind="captions"
              src={`${BASE_PATH}/video/roam-demo.vtt`}
              srcLang="en"
              label="English"
              default
            />
          </video>

          {!started && (
            <button
              type="button"
              onClick={play}
              aria-label="Play the 2-minute Roam video"
              className="group absolute inset-0 flex items-end justify-center pb-5 sm:pb-8 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            >
              <span className="flex items-center gap-2 sm:gap-3 pl-4 pr-5 py-2.5 sm:pl-5 sm:pr-7 sm:py-4 rounded-full bg-amber-500 text-black font-semibold text-base sm:text-lg shadow-lg shadow-amber-500/30 group-hover:bg-amber-400 transition-colors">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  fill="currentColor"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
                Watch the story
                <span className="font-normal text-black/60">2:23</span>
              </span>
            </button>
          )}
        </div>

        <p className="mt-4 text-center text-xs text-gray-500">
          Recorded during the UW iStartup Launch Sprint, April 2026.
        </p>
      </div>
    </section>
  );
}
