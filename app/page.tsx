"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import EchoBlob from "@/components/EchoBlob";

const MapDemo = dynamic(() => import("@/components/MapDemo"), { ssr: false });

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-y-auto overflow-x-hidden">
      {/* ================= NAV ================= */}
      <nav className="fixed top-0 left-0 right-0 z-50 px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/5">
        <Link
          href="/"
          className="text-xl font-bold tracking-wide bg-gradient-to-br from-white to-amber-300 bg-clip-text text-transparent"
        >
          Roam
        </Link>
        <div className="hidden md:flex items-center gap-7 text-sm text-gray-400">
          <a href="#echo" className="hover:text-amber-400 transition-colors">
            Echo
          </a>
          <a href="#features" className="hover:text-amber-400 transition-colors">
            Features
          </a>
          <a href="#groups" className="hover:text-amber-400 transition-colors">
            Groups
          </a>
          <a href="#map" className="hover:text-amber-400 transition-colors">
            The Map
          </a>
          <a href="#why" className="hover:text-amber-400 transition-colors">
            Why Now
          </a>
        </div>
        <Link
          href="/demo"
          className="px-5 py-2 bg-amber-500 text-black text-sm font-semibold rounded-full hover:bg-amber-400 transition-colors"
        >
          Watch demo
        </Link>
      </nav>

      {/* ================= HERO ================= */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-24 pb-20 overflow-hidden">
        {/* Fog grid backdrop */}
        <div className="fog-grid absolute inset-0 pointer-events-none" />

        {/* Radial glows */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-amber-500/5 blur-[120px]" />
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-t from-amber-500/5 to-transparent blur-[80px]" />
        </div>

        <motion.div
          initial={{ y: 30 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 flex flex-col items-center text-center max-w-3xl"
        >
          {/* Blob + rings */}
          <motion.div
            initial={{ scale: 0.6 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.3, type: "spring", damping: 15 }}
            className="relative mb-8"
            style={{ width: 180, height: 180 }}
          >
            <div className="blob-ring" style={{ inset: -20 }} />
            <div className="blob-ring blob-ring-2" style={{ inset: -40 }} />
            <div className="blob-ring blob-ring-3" style={{ inset: -60 }} />
            <div className="absolute inset-0 flex items-center justify-center">
              <EchoBlob state="idle" size={160} />
            </div>
          </motion.div>

          {/* UW badge */}
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4 }}
            className="mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/15 text-xs text-amber-400 tracking-wider"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
            UW iStartup Launch Sprint 2026
          </motion.div>

          {/* Headline */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl font-bold leading-[1.05] tracking-tight mb-4 bg-gradient-to-br from-white via-amber-100 to-amber-400 bg-clip-text text-transparent">
            Roam
          </h1>

          {/* Tagline */}
          <p className="text-lg sm:text-xl text-gray-400 max-w-xl mb-3 leading-relaxed">
            The social walking app. A voice companion for introverts who need a
            friend in their ear &mdash; and a group heat map for extroverts who
            want to explore with theirs.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            Not a fitness app. Not a meditation app. A new way to know your city.
          </p>

          {/* CTA row */}
          <motion.div
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-col sm:flex-row items-center gap-4"
          >
            <Link
              href="/demo"
              className="px-8 py-4 bg-amber-500 text-black text-lg font-semibold rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-400 hover:shadow-amber-400/30 transition-all"
            >
              Watch the demo &rarr;
            </Link>
            <a
              href="#groups"
              className="px-8 py-4 bg-white/5 text-white text-lg font-medium rounded-full border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all"
            >
              See group mode
            </a>
          </motion.div>
          <span className="mt-4 text-sm text-gray-500">
            No account needed. No download.
          </span>
        </motion.div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <div className="scroll-arrow" />
        </div>
      </section>

      {/* ================= PROBLEM ================= */}
      <section className="relative px-6 py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/[0.015] to-transparent pointer-events-none" />
        <div className="relative max-w-5xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
              The Problem
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
              Alone indoors.
              <br />
              <span className="text-gray-500">
                New in town, nobody to roam with.
              </span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              Maybe you&apos;re stuck at a desk, haven&apos;t left the apartment in
              days. Maybe you just moved to a new city and don&apos;t know anyone
              yet. Either way: screens won, the door stayed closed, and every
              fitness app felt like another chore.
            </p>
            <p className="text-gray-400 leading-relaxed">
              Roam is for both. A voice in your ear when you&apos;re solo, and
              a shared heat map when your friends want to explore together.
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="grid grid-cols-2 gap-4"
          >
            {[
              { num: "73%", label: "of adults feel lonely regularly" },
              { num: "1 in 5", label: "Americans move cities every 5 years" },
              { num: "4 mo.", label: "avg. time to form a social circle in a new city" },
              { num: "0", label: "apps that put a friend in your ear AND a group on your map" },
            ].map((s) => (
              <div
                key={s.num}
                className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-5 text-center"
              >
                <div className="text-3xl font-bold bg-gradient-to-br from-amber-300 to-orange-500 bg-clip-text text-transparent">
                  {s.num}
                </div>
                <div className="text-xs text-gray-500 mt-1.5 leading-snug">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ================= MEET ECHO ================= */}
      <section id="echo" className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
            Meet Echo
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-6">
            A friend in your ear,
            <br />
            <span className="text-gray-500">not a coach on your back.</span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Echo is a warm, curious voice that walks with you. It asks about
            your day, notices when you turn down a new street, and never once
            says &ldquo;great job.&rdquo; Echo is not a wellness app. Echo is a
            friend on a walk. The walk is the point.
          </p>
        </motion.div>

        {/* Conversation demo card */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="max-w-xl mx-auto bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 sm:p-8"
        >
          <div className="flex items-center gap-3 pb-4 mb-4 border-b border-white/[0.06]">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-300 to-orange-500 shadow-lg shadow-amber-500/20" />
            <div>
              <div className="text-sm font-semibold">Echo</div>
              <div className="text-xs text-gray-500">Walking with you</div>
            </div>
          </div>
          <div className="space-y-3">
            {[
              {
                from: "echo",
                text: "Hey. Glad you're out here. What are we walking toward today, or are we just walking?",
              },
              { from: "user", text: "Just walking. Long day." },
              {
                from: "echo",
                text: "Long days deserve aimless walks. What did you eat today?",
              },
              { from: "user", text: "Honestly? Just coffee and a granola bar." },
              {
                from: "echo",
                text: "Mm. There's a taco place two blocks that way. Just saying.",
              },
            ].map((msg, i) => (
              <div
                key={i}
                className={`flex ${
                  msg.from === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-snug ${
                    msg.from === "echo"
                      ? "bg-white/[0.05] border border-white/[0.06] text-gray-200 rounded-bl-sm"
                      : "bg-amber-500/10 border border-amber-500/20 text-amber-100 rounded-br-sm"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Echo's Rules */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto mt-16"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4 text-center">
            Echo&apos;s Rules
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { ok: false, text: "Never mentions exercise, fitness, or steps" },
              { ok: true, text: "Asks about concrete things — what you ate, where you turned" },
              { ok: false, text: "Never says \u201cgood for you\u201d or \u201cgreat job\u201d" },
              { ok: true, text: "Short sentences. 5 to 15 words. Made for sidewalks" },
              { ok: false, text: "Never gives unsolicited advice or sounds like therapy" },
              { ok: true, text: "Warm, curious, low-energy in a good way. Like a real friend" },
              { ok: false, text: "Never mentions being an AI or anything technical" },
              { ok: true, text: "Dry humor sometimes. Observations, not jokes" },
            ].map((rule, i) => (
              <div
                key={i}
                className="flex items-start gap-2 text-sm text-gray-400 leading-snug"
              >
                <span
                  className={`flex-shrink-0 font-bold text-base leading-none mt-0.5 ${
                    rule.ok ? "text-amber-400" : "text-orange-500"
                  }`}
                >
                  {rule.ok ? "\u2713" : "\u2717"}
                </span>
                {rule.text}
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= CORE FEATURES ================= */}
      <section id="features" className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
            Core Features
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
            Everything that ships.
            <br />
            <span className="text-gray-500">Nothing that doesn&apos;t.</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
            Two non-negotiables and a tight feature set. Every feature exists
            to make one 80-second pitch video work.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {[
            {
              emoji: "\uD83D\uDDE3\uFE0F",
              title: "Echo Voice Companion",
              desc: "Real conversational AI. Echo speaks out loud through your phone speaker while you walk. A friend, not a coach.",
              tag: "Non-negotiable",
            },
            {
              emoji: "\uD83C\uDF0D",
              title: "Living Heat Map",
              desc: "Streets you discover clear from fog. Streets you walk again deepen from cool greens to warm golds. Your city, remembered.",
              tag: "Non-negotiable",
            },
            {
              emoji: "\uD83D\uDC65",
              title: "Group Heat Map",
              desc: "Explore with friends. See who walked where. Tiles deepen as more people visit. A shared portrait of your group\u2019s city.",
              tag: "Non-negotiable",
            },
            {
              emoji: "\uD83C\uDFC6",
              title: "Social Leaderboard",
              desc: "Who discovered the most new tiles? Who found the hidden park? Friendly competition that makes you want to go further.",
              tag: "Tier 1",
            },
            {
              emoji: "\uD83D\uDFE0",
              title: "Echo\u2019s Animated Body",
              desc: "A breathing, morphing blob on screen. When you talk, it leans in. When Echo speaks, it pulses with warmth.",
              tag: "Tier 1",
            },
            {
              emoji: "\uD83D\uDCCD",
              title: "Live GPS Walk Tracking",
              desc: "Real-time position tracking. Watch the map come alive beneath your feet as you walk.",
              tag: "Tier 1",
            },
            {
              emoji: "\uD83D\uDD25",
              title: "Walk Streaks",
              desc: "Come back tomorrow. Your map remembers, your streak grows, Echo saved a thought for you.",
              tag: "Tier 1",
            },
            {
              emoji: "\uD83D\uDCDD",
              title: "Echo Notes",
              desc: "Say something worth remembering while you walk. Echo captures it. Review your thoughts later, organized by walk.",
              tag: "Coming next",
            },
            {
              emoji: "\uD83D\uDED2",
              title: "Errand Assistant",
              desc: "\u201cRemind me to grab milk.\u201d Echo knows the route. It\u2019ll remind you when you pass the store.",
              tag: "Coming next",
            },
            {
              emoji: "\uD83D\uDCF1",
              title: "60-Second Onboarding",
              desc: "No signup, no login, no password. Scan a code to join a group, or walk solo in under a minute.",
              tag: "Tier 1",
            },
          ].map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:border-amber-500/20 hover:bg-white/[0.04] transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/15 flex items-center justify-center text-2xl mb-4">
                {f.emoji}
              </div>
              <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed mb-4">
                {f.desc}
              </p>
              <span className="inline-block text-[10px] uppercase tracking-wider text-amber-400/70 bg-amber-500/5 border border-amber-500/10 px-2.5 py-1 rounded-full">
                {f.tag}
              </span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= GROUPS ================= */}
      <section
        id="groups"
        className="px-6 py-24 border-y border-white/[0.04] bg-white/[0.015]"
      >
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
              Group Exploration
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
              Roam together,
              <br />
              <span className="text-gray-500">not alone.</span>
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto leading-relaxed">
              Scan a code. Join a group. Every walk you take adds to the
              shared heat map. See where your friends have been, discover what
              they found, and fill in the tiles they missed.
            </p>
          </motion.div>

          <div className="grid sm:grid-cols-3 gap-6">
            {[
              {
                icon: "\uD83D\uDDFA\uFE0F",
                title: "Shared Heat Map",
                desc: "One map, many walkers. Tiles deepen from lavender to gold as more people visit. Hotspots glow where everyone congregates.",
              },
              {
                icon: "\u2B50",
                title: "Unique Tile Credit",
                desc: "Discovered a street nobody else has walked? It\u2019s yours. The leaderboard tracks who found what first.",
              },
              {
                icon: "\uD83D\uDD25",
                title: "Group Streaks",
                desc: "As long as one person in the group walks today, the streak lives. Social accountability without the guilt.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ y: 20 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gradient-to-br from-amber-500/[0.06] to-transparent border border-amber-500/15 rounded-2xl p-7"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-10"
          >
            <Link
              href="/demo"
              className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-black text-sm font-semibold rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
              Watch Kobe&apos;s group walk
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ================= THE HEAT MAP (inline demo) ================= */}
      <div id="map">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto px-6 pt-20"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
            The Heat Map
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-5">
            Your city remembers
            <br />
            <span className="text-gray-500">where you&apos;ve been.</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            This isn&apos;t a step counter with a map skin. New streets reveal.
            Repeated streets deepen. Over 30 days, golden routes radiate from
            your home like veins of a leaf.
          </p>
        </motion.div>
        <MapDemo />
      </div>

      {/* ================= HOW IT WORKS ================= */}
      <section className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
            How It Works
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Sixty seconds to your first walk.
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              n: "01",
              title: "Open the app",
              desc: "No signup. No login wall. Echo is already there, breathing softly in the lower third of a fog-covered map.",
            },
            {
              n: "02",
              title: "Tap \u201cLet\u2019s go\u201d",
              desc: "Echo\u2019s blob lights up and speaks: \u201cHey. Glad you\u2019re out here.\u201d The map starts tracking.",
            },
            {
              n: "03",
              title: "Walk and talk",
              desc: "Talk to Echo or just walk. Discover new streets. The fog clears behind you.",
            },
            {
              n: "04",
              title: "End the walk",
              desc: "Distance, time, before/after map. Echo says: \u201cGood walk. Same time tomorrow?\u201d Streak ticks to 1.",
            },
          ].map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="relative"
            >
              <div className="w-10 h-10 rounded-full bg-amber-500/10 border border-amber-500/25 flex items-center justify-center text-amber-400 text-sm font-bold mb-4">
                {step.n}
              </div>
              <h3 className="text-base font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                {step.desc}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= MEET JORDAN + A DAY IN THE LIFE ================= */}
      <section className="relative px-6 py-28 border-y border-white/[0.04] bg-white/[0.015]">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.025] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          {/* Header: Meet Jordan */}
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
              A Day in the Life
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-8">
              Meet Jordan.
            </h2>

            {/* Jordan crayon-sketch portrait */}
            <div className="mx-auto mb-8 w-44 h-52 sm:w-52 sm:h-60 relative">
              <svg
                viewBox="0 0 280 320"
                className="w-full h-full"
                aria-label="Sketch of Jordan slumped at a laptop"
              >
                <defs>
                  {/* Sketchy wobble filter for hand-drawn feel */}
                  <filter id="jordan-sketch" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence
                      type="fractalNoise"
                      baseFrequency="0.025"
                      numOctaves="3"
                      seed="5"
                    />
                    <feDisplacementMap in="SourceGraphic" scale="1.4" />
                  </filter>

                  {/* Soft amber screen glow */}
                  <radialGradient id="screen-glow" cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor="#f4a261" stopOpacity="0.45" />
                    <stop offset="100%" stopColor="#f4a261" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Behind-screen ambient glow */}
                <ellipse
                  cx="140"
                  cy="265"
                  rx="80"
                  ry="22"
                  fill="url(#screen-glow)"
                />

                {/* All sketchy white strokes */}
                <g
                  stroke="#e8e4dc"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#jordan-sketch)"
                  opacity="0.85"
                >
                  {/* Hooded head — slightly tilted down */}
                  <path
                    d="M105 80
                       C 95 72, 92 55, 105 45
                       C 122 30, 168 30, 182 50
                       C 192 62, 188 80, 178 88
                       L 178 130
                       C 178 142, 105 142, 105 130 Z"
                  />

                  {/* Hood inner edge / hairline */}
                  <path d="M115 92 Q 142 102, 168 92" />

                  {/* Tired eyes — closed crescents looking down */}
                  <path d="M120 108 q 7 4, 14 0" />
                  <path d="M152 108 q 7 4, 14 0" />

                  {/* Small neutral mouth */}
                  <path d="M132 124 q 10 -1, 18 0" />

                  {/* Neck */}
                  <line x1="128" y1="142" x2="128" y2="158" />
                  <line x1="158" y1="142" x2="158" y2="158" />

                  {/* Slumped hoodie body */}
                  <path
                    d="M65 185
                       Q 105 158, 142 158
                       Q 178 158, 220 185
                       L 232 280
                       Q 142 298, 56 280 Z"
                  />

                  {/* Arms wrapping toward laptop */}
                  <path d="M68 188 Q 80 235, 110 258" />
                  <path d="M218 188 Q 206 235, 178 258" />

                  {/* Hood drawstrings */}
                  <line x1="130" y1="148" x2="128" y2="175" />
                  <line x1="156" y1="148" x2="158" y2="175" />

                  {/* Laptop trapezoid (perspective view from front) */}
                  <path d="M85 258 L 200 258 L 215 295 L 70 295 Z" />
                  <path d="M97 268 L 188 268 L 198 290 L 88 290 Z" />

                  {/* Floor shadow line */}
                  <line
                    x1="40"
                    y1="305"
                    x2="245"
                    y2="305"
                    strokeDasharray="3 6"
                    opacity="0.4"
                  />
                </g>

                {/* Crisp screen fill (in front of sketchy lines for clarity) */}
                <path
                  d="M97 268 L 188 268 L 198 290 L 88 290 Z"
                  fill="#f4a261"
                  opacity="0.22"
                />
              </svg>
            </div>

            <blockquote className="text-lg sm:text-xl text-gray-300 italic leading-snug max-w-2xl mx-auto mb-6 px-4">
              &ldquo;Jordan, 29. Knowledge worker. Hybrid, mostly remote. Lives
              with a partner but mostly alone in front of a laptop. Hasn&apos;t
              seen friends in person in three weeks. Tried Strava, Peloton,
              ClassPass &mdash; bounced off all of them. The dominant feeling
              is flatness.&rdquo;
            </blockquote>
            <p className="text-gray-500 text-sm">
              This is Jordan&apos;s Tuesday &mdash; growing like a tree, hour
              by hour.
            </p>
          </motion.div>

          {/* Vertical timeline with organic vine connector */}
          <div className="relative mt-12">
            {/* Organic vine SVG running down the left side */}
            <svg
              className="absolute left-3 top-6 w-12 pointer-events-none"
              style={{ height: "calc(100% - 48px)" }}
              viewBox="0 0 50 1000"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient
                  id="vine-gradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="0" stopColor="rgba(251, 191, 36, 0)" />
                  <stop offset="0.08" stopColor="rgba(251, 191, 36, 0.5)" />
                  <stop offset="0.5" stopColor="rgba(251, 191, 36, 0.7)" />
                  <stop offset="0.92" stopColor="rgba(251, 191, 36, 0.5)" />
                  <stop offset="1" stopColor="rgba(251, 191, 36, 0)" />
                </linearGradient>
                <filter id="vine-sketch">
                  <feTurbulence
                    type="fractalNoise"
                    baseFrequency="0.015"
                    numOctaves="2"
                    seed="3"
                  />
                  <feDisplacementMap in="SourceGraphic" scale="1.5" />
                </filter>
              </defs>

              {/* Main organic vine — curving like a growing branch */}
              <path
                d="M25 0
                   C 35 80, 15 150, 25 230
                   C 35 310, 15 400, 25 500
                   C 35 600, 15 700, 25 800
                   C 35 880, 25 950, 25 1000"
                stroke="url(#vine-gradient)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                filter="url(#vine-sketch)"
              />

              {/* Small branching tendrils at intervals */}
              <g
                stroke="rgba(251, 191, 36, 0.18)"
                strokeWidth="1"
                fill="none"
                strokeLinecap="round"
                filter="url(#vine-sketch)"
              >
                <path d="M28 80 q 12 -8, 20 -22" />
                <path d="M22 200 q -12 -8, -18 -22" />
                <path d="M28 320 q 12 -8, 20 -20" />
                <path d="M22 460 q -12 -10, -16 -24" />
                <path d="M28 600 q 14 -8, 22 -18" />
                <path d="M22 740 q -10 -10, -14 -24" />
                <path d="M28 870 q 12 -8, 18 -20" />
              </g>

              {/* Small leaf shapes scattered along */}
              <g fill="rgba(251, 191, 36, 0.25)">
                <ellipse
                  cx="48"
                  cy="55"
                  rx="3.5"
                  ry="2"
                  transform="rotate(-30 48 55)"
                />
                <ellipse
                  cx="2"
                  cy="180"
                  rx="3.5"
                  ry="2"
                  transform="rotate(30 2 180)"
                />
                <ellipse
                  cx="48"
                  cy="305"
                  rx="3.5"
                  ry="2"
                  transform="rotate(-30 48 305)"
                />
                <ellipse
                  cx="2"
                  cy="440"
                  rx="3.5"
                  ry="2"
                  transform="rotate(30 2 440)"
                />
                <ellipse
                  cx="48"
                  cy="585"
                  rx="3.5"
                  ry="2"
                  transform="rotate(-30 48 585)"
                />
              </g>
            </svg>

            {[
              {
                time: "8:00 AM",
                icon: "\u2600\ufe0f",
                title: "Wake up alone-ish",
                desc: "Same four walls. Phone first, then coffee. Partner already in a meeting. Jordan already knows how today goes.",
              },
              {
                time: "9:30 AM",
                icon: "\ud83d\udcbb",
                title: "Stand-up. Camera off.",
                desc: "Hybrid. Mostly remote. The to-do list never ends. Jordan answers in Slack emojis.",
              },
              {
                time: "12:30 PM",
                icon: "\ud83c\udf5c",
                title: "Delivery lunch at the desk",
                desc: "Third time this week. Window\u2019s right there. Jordan doesn\u2019t look at it.",
              },
              {
                time: "4:45 PM",
                icon: "\ud83c\udf2b\ufe0f",
                title: "The flat feeling",
                desc: "Not sad. Not mad. Just flat. Jordan couldn\u2019t tell you why if you asked.",
              },
              {
                time: "5:30 PM",
                icon: "\ud83d\udfe0",
                title: "Echo says hi",
                desc: "\u201cHey. Glad you\u2019re out here. Where are we headed today, or are we just walking?\u201d One tap. Warm voice. Jordan puts shoes on.",
                highlight: true,
              },
              {
                time: "5:52 PM",
                icon: "\ud83d\udc9b",
                title: "A street Jordan has never walked",
                desc: "Echo: \u201cOh \u2014 new street for us. What made you turn here?\u201d The fog lifts. Jordan laughs for the first time today.",
              },
              {
                time: "6:15 PM",
                icon: "\ud83d\uddfa\ufe0f",
                title: "Back home",
                desc: "12 new tiles on the map. Streak ticks to 1. Echo: \u201cGood walk. Same time tomorrow?\u201d",
              },
              {
                time: "10:30 PM",
                icon: "\ud83c\udf19",
                title: "Bed",
                desc: "Jordan opens the app one more time, looks at the small glowing line on the map. Tomorrow\u2019s already there.",
              },
            ].map((step, i) => (
              <div
                key={step.time}
                className="day-step relative flex gap-4 sm:gap-5 pb-8 last:pb-0"
                style={
                  { "--reveal-delay": `${i * 0.12}s` } as React.CSSProperties
                }
              >
                {/* Icon bubble */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl bg-[#0a0a0a] ${
                    step.highlight
                      ? "border-2 border-amber-400/60 shadow-lg shadow-amber-500/25"
                      : "border border-white/10"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Card */}
                <div
                  className={`flex-1 rounded-xl p-4 sm:p-5 ${
                    step.highlight
                      ? "bg-gradient-to-br from-amber-500/[0.1] to-transparent border border-amber-500/25"
                      : "bg-white/[0.02] border border-white/[0.05]"
                  }`}
                >
                  <div
                    className={`text-[11px] font-mono tracking-wider mb-1.5 ${
                      step.highlight ? "text-amber-400" : "text-amber-400/50"
                    }`}
                  >
                    {step.time}
                  </div>
                  <div className="text-base sm:text-lg font-semibold mb-1.5">
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mt-12 text-sm italic"
          >
            Two minutes of reason. One tap to say yes. That&apos;s the whole
            thing.
          </motion.p>
        </div>
      </section>

      {/* ================= MEET KOBE ================= */}
      <section className="relative px-6 py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-violet-400 mb-4">
              The Other Side
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-8">
              Meet Kobe.
            </h2>

            {/* Kobe sketch portrait — standing with phone + map, looking outward */}
            <div className="mx-auto mb-8 w-44 h-52 sm:w-52 sm:h-60 relative">
              <svg
                viewBox="0 0 280 320"
                className="w-full h-full"
                aria-label="Sketch of Kobe standing with a phone, looking outward"
              >
                <defs>
                  <filter id="kobe-sketch" x="-20%" y="-20%" width="140%" height="140%">
                    <feTurbulence type="fractalNoise" baseFrequency="0.025" numOctaves="3" seed="9" />
                    <feDisplacementMap in="SourceGraphic" scale="1.4" />
                  </filter>
                  <radialGradient id="kobe-glow" cx="50%" cy="80%" r="50%">
                    <stop offset="0%" stopColor="#7B68EE" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#7B68EE" stopOpacity="0" />
                  </radialGradient>
                </defs>

                {/* Map glow from phone */}
                <ellipse cx="200" cy="190" rx="55" ry="20" fill="url(#kobe-glow)" />

                <g
                  stroke="#e8e4dc"
                  strokeWidth="1.5"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  filter="url(#kobe-sketch)"
                  opacity="0.85"
                >
                  {/* Head — upright, looking forward */}
                  <circle cx="140" cy="55" r="30" />

                  {/* Hair / cap */}
                  <path d="M112 50 C 112 30, 170 30, 170 50" />

                  {/* Eyes — open, looking outward */}
                  <circle cx="128" cy="52" r="2.5" />
                  <circle cx="152" cy="52" r="2.5" />

                  {/* Small smile */}
                  <path d="M133 66 q 7 5, 14 0" />

                  {/* Neck */}
                  <line x1="135" y1="85" x2="135" y2="100" />
                  <line x1="148" y1="85" x2="148" y2="100" />

                  {/* Body — upright, slightly turned */}
                  <path d="M90 120 Q 140 100, 190 120 L 195 260 Q 140 275, 85 260 Z" />

                  {/* Jacket collar */}
                  <path d="M115 108 L 140 120 L 165 108" />

                  {/* Left arm — at side */}
                  <path d="M90 130 Q 75 180, 80 235" />

                  {/* Right arm — holding phone out */}
                  <path d="M190 130 Q 205 160, 210 180" />

                  {/* Phone */}
                  <rect x="195" y="172" width="28" height="45" rx="3" />

                  {/* Legs */}
                  <line x1="120" y1="260" x2="115" y2="310" />
                  <line x1="160" y1="260" x2="165" y2="310" />

                  {/* Ground */}
                  <line x1="60" y1="312" x2="225" y2="312" strokeDasharray="3 6" opacity="0.4" />
                </g>

                {/* Phone screen — tiny map glow */}
                <rect x="198" y="178" width="22" height="34" fill="#7B68EE" opacity="0.2" rx="1" />
              </svg>
            </div>

            <blockquote className="text-lg sm:text-xl text-gray-300 italic leading-snug max-w-2xl mx-auto mb-6 px-4">
              &ldquo;Kobe, 24. Just moved to Seattle for his first job. Knows 3
              people. Wants to explore the city but doesn&apos;t want to feel
              like a tourist. Has coworkers who&apos;d explore with him if
              someone just picked the route.&rdquo;
            </blockquote>
            <p className="text-gray-500 text-sm">
              This is Kobe&apos;s first week.
            </p>
          </motion.div>

          {/* Kobe's day timeline */}
          <div className="relative mt-12">
            <svg
              className="absolute left-3 top-6 w-12 pointer-events-none"
              style={{ height: "calc(100% - 48px)" }}
              viewBox="0 0 50 1000"
              preserveAspectRatio="none"
              aria-hidden
            >
              <defs>
                <linearGradient id="vine-kobe" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0" stopColor="rgba(123, 104, 238, 0)" />
                  <stop offset="0.08" stopColor="rgba(123, 104, 238, 0.5)" />
                  <stop offset="0.5" stopColor="rgba(123, 104, 238, 0.7)" />
                  <stop offset="0.92" stopColor="rgba(123, 104, 238, 0.5)" />
                  <stop offset="1" stopColor="rgba(123, 104, 238, 0)" />
                </linearGradient>
              </defs>
              <path
                d="M25 0 C 35 80, 15 150, 25 230 C 35 310, 15 400, 25 500 C 35 600, 15 700, 25 800 C 35 880, 25 950, 25 1000"
                stroke="url(#vine-kobe)"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>

            {[
              {
                time: "Mon 9 AM",
                icon: "\uD83D\uDCE6",
                title: "Lands in Seattle",
                desc: "Apartment is empty. Suitcase and a laptop. Kobe opens Google Maps \u2014 everything looks the same.",
              },
              {
                time: "Mon 6 PM",
                icon: "\uD83D\uDCF1",
                title: "Downloads Roam",
                desc: "Coworker Priya sends the group code. Kobe scans it \u2014 three names appear on a shared map. Zero tiles.",
              },
              {
                time: "Tue 5:30 PM",
                icon: "\uD83D\uDFE0",
                title: "First walk with Echo",
                desc: "Echo: \u201cFirst week in Capitol Hill! Let\u2019s see what\u2019s out here.\u201d Kobe walks Volunteer Park to Cal Anderson. 18 tiles.",
                highlight: true,
              },
              {
                time: "Wed",
                icon: "\uD83D\uDC9C",
                title: "Priya walked Broadway",
                desc: "Kobe opens the app \u2014 Priya\u2019s tiles overlap his at Cal Anderson. The park glows warmer. She found a coffee shop he missed.",
              },
              {
                time: "Thu",
                icon: "\uD83D\uDCA7",
                title: "Marcus fills in Pike/Pine",
                desc: "Triple overlap at the corridor. The leaderboard updates: Kobe 18, Priya 15, Marcus 12. Kobe\u2019s winning \u2014 for now.",
              },
              {
                time: "Fri 6 PM",
                icon: "\uD83C\uDF1F",
                title: "The group heat map glows",
                desc: "45 tiles between three people in one week. The map looks like a constellation. Kobe knows Capitol Hill now \u2014 not like a tourist.",
              },
            ].map((step, i) => (
              <div
                key={step.time}
                className="day-step relative flex gap-4 sm:gap-5 pb-8 last:pb-0"
                style={
                  { "--reveal-delay": `${i * 0.12}s` } as React.CSSProperties
                }
              >
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl bg-[#0a0a0a] ${
                    step.highlight
                      ? "border-2 border-violet-400/60 shadow-lg shadow-violet-500/25"
                      : "border border-white/10"
                  }`}
                >
                  {step.icon}
                </div>
                <div
                  className={`flex-1 rounded-xl p-4 sm:p-5 ${
                    step.highlight
                      ? "bg-gradient-to-br from-violet-500/[0.1] to-transparent border border-violet-500/25"
                      : "bg-white/[0.02] border border-white/[0.05]"
                  }`}
                >
                  <div
                    className={`text-[11px] font-mono tracking-wider mb-1.5 ${
                      step.highlight ? "text-violet-400" : "text-violet-400/50"
                    }`}
                  >
                    {step.time}
                  </div>
                  <div className="text-base sm:text-lg font-semibold mb-1.5">
                    {step.title}
                  </div>
                  <div className="text-sm text-gray-400 leading-relaxed">
                    {step.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <motion.p
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mt-12 text-sm italic"
          >
            One app. Two stories. Same city, different reasons to walk it.
          </motion.p>
        </div>
      </section>

      {/* ================= WHY NOW ================= */}
      <section id="why" className="px-6 py-24 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
            Why Now
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold leading-tight">
            Three things that didn&apos;t exist
            <br />
            <span className="text-gray-500">two years ago.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              title: "Voice AI got good",
              desc: "Sub-second conversational AI. Real personality. Real dialogue. Not a chatbot reading a script \u2014 a friend who notices things.",
            },
            {
              title: "Loneliness + urban mobility",
              desc: "The Surgeon General called loneliness an epidemic. Meanwhile, 1 in 5 Americans move cities and need 4 months just to form a social circle. Both problems, one app.",
            },
            {
              title: "Nothing like this exists",
              desc: "Strava is for athletes. Replika is for romance. AllTrails is for hikers. Nobody built a social walking app with a voice friend AND a shared heat map for your crew.",
            },
          ].map((w, i) => (
            <motion.div
              key={w.title}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 text-center"
            >
              <h4 className="text-base font-semibold mb-3">{w.title}</h4>
              <p className="text-sm text-gray-400 leading-relaxed">{w.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ================= BUILT WITH ================= */}
      <section className="px-6 py-20 max-w-5xl mx-auto">
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
            Built With
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold mb-6">
            The tech stack.
          </h3>
          <div className="flex flex-wrap justify-center gap-2">
            {[
              "Next.js 16",
              "TypeScript",
              "Tailwind CSS",
              "Zustand",
              "MapLibre GL",
              "Framer Motion",
              "Web Speech API",
              "Groq (Llama 3.3 70B)",
              "Ollama (local fallback)",
            ].map((t) => (
              <span
                key={t}
                className="px-4 py-1.5 text-sm text-gray-400 bg-white/[0.03] border border-white/[0.06] rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ================= FINAL CTA ================= */}
      <section className="relative px-6 py-32 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full bg-amber-500/10 blur-[120px]" />
        </div>
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true }}
          className="relative max-w-2xl mx-auto"
        >
          <EchoBlob state="idle" size={100} className="mx-auto mb-8" />
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            Put your shoes on.
          </h2>
          <p className="text-lg text-gray-400 mb-10 leading-relaxed">
            Whether you&apos;re Jordan who needs a reason to leave, or Kobe
            who just landed in a new city &mdash; Echo walks with you, and
            the map remembers. The city is waiting.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/demo"
              className="px-10 py-4 bg-amber-500 text-black text-lg font-semibold rounded-full shadow-lg shadow-amber-500/20 hover:bg-amber-400 transition-all"
            >
              Try the demo &rarr;
            </Link>
            <a
              href="https://github.com/anshshah2111/anantadata"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-4 bg-white/5 text-white text-lg font-medium rounded-full border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all"
            >
              View on GitHub
            </a>
          </div>
        </motion.div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="px-6 py-10 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="text-base font-bold tracking-wide bg-gradient-to-br from-white to-amber-300 bg-clip-text text-transparent">
            Roam
          </span>
          <p className="text-xs text-gray-600 text-center">
            A voice-first walking companion. Made for the UW iStartup Launch
            Sprint 2026.
          </p>
        </div>
      </footer>
    </div>
  );
}
