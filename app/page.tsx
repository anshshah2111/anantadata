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
            A voice-first walking companion for overworked adults who feel
            stuck inside. Open the app, meet Echo, and rediscover your city.
          </p>

          <p className="text-sm text-gray-500 mb-10">
            Not a fitness app. Not a meditation app. A friend on a walk.
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
              Try the demo &rarr;
            </Link>
            <a
              href="#echo"
              className="px-8 py-4 bg-white/5 text-white text-lg font-medium rounded-full border border-white/10 hover:bg-white/10 hover:border-amber-400/30 transition-all"
            >
              Meet Echo
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
              You know you should go outside.
              <br />
              <span className="text-gray-500">You just... don&apos;t.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-4">
              You have a job, a long to-do list, and not enough time. You
              haven&apos;t seen friends in person in over a month. You tried
              Strava, Peloton, ClassPass &mdash; bounced off all of them
              because they felt like another item on the to-do list.
            </p>
            <p className="text-gray-400 leading-relaxed">
              The dominant feeling is flatness. Not clinical, but real. You
              don&apos;t want a fitness app. You want a reason to go outside
              that feels like play.
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
              { num: "8h+", label: "average daily screen time" },
              { num: "60%", label: "bounce off fitness apps in 30 days" },
              { num: "0", label: "apps that put a friend in your ear on a walk" },
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
              desc: "Real conversational AI via Groq + Llama 3.3 70B. Echo speaks out loud through your phone speaker while you walk.",
              tag: "Non-negotiable",
            },
            {
              emoji: "\uD83C\uDF0D",
              title: "Living Heat Map",
              desc: "Streets you discover clear from fog. Streets you walk again deepen from cool greens to warm golds.",
              tag: "Non-negotiable",
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
              desc: "Real-time position tracking with 30-second tile debounce. Watch the map come alive beneath your feet.",
              tag: "Tier 1",
            },
            {
              emoji: "\uD83D\uDD25",
              title: "Walk Streaks",
              desc: "Come back tomorrow. Your map remembers, your streak grows, Echo saved a thought for you.",
              tag: "Tier 1",
            },
            {
              emoji: "\uD83D\uDCF1",
              title: "60-Second Onboarding",
              desc: "Three swipeable screens. No signup, no login, no password. Anonymous ID and you\u2019re walking in a minute.",
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

      {/* ================= A DAY IN THE LIFE ================= */}
      <section className="relative px-6 py-28">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/[0.02] to-transparent pointer-events-none" />
        <div className="relative max-w-3xl mx-auto">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
              A Day in the Life
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold leading-tight mb-4">
              Morning to night,
              <br />
              <span className="text-gray-500">one gentle moment.</span>
            </h2>
            <p className="text-gray-400 leading-relaxed max-w-xl mx-auto">
              Roam doesn&apos;t ask for 30 minutes of your day. It asks for a{" "}
              <span className="text-white">yes</span> when the light is getting
              low.
            </p>
          </motion.div>

          {/* Vertical timeline */}
          <div className="relative space-y-0">
            {/* Connecting line */}
            <div
              className="absolute left-6 top-6 bottom-6 w-px bg-gradient-to-b from-transparent via-amber-500/20 to-transparent"
              aria-hidden
            />

            {[
              {
                time: "8:00 AM",
                icon: "\u2600\ufe0f", // ☀️
                title: "Wake up",
                desc: "Same four walls. Phone first, then coffee. You already know how today goes.",
              },
              {
                time: "12:30 PM",
                icon: "\ud83d\udcbb", // 💻
                title: "Meetings, Slack, lunch at the desk",
                desc: "The window is right there. You don't look at it.",
              },
              {
                time: "4:45 PM",
                icon: "\ud83c\udf2b\ufe0f", // 🌫️
                title: "Flat",
                desc: "Not sad. Not mad. Just flat. Couldn't tell you why.",
              },
              {
                time: "5:30 PM",
                icon: "\ud83d\udfe0", // 🟠
                title: "Echo says hi",
                desc: "\u201cHey. Glad you\u2019re out here. Where are we headed today, or are we just walking?\u201d",
                highlight: true,
              },
              {
                time: "5:52 PM",
                icon: "\ud83d\udc9b", // 💛
                title: "A street you\u2019ve never walked",
                desc: "Echo: \u201cOh \u2014 new street for us. What made you turn here?\u201d The fog lifts.",
              },
              {
                time: "6:15 PM",
                icon: "\ud83d\uddfa\ufe0f", // 🗺️
                title: "Back home",
                desc: "12 new tiles. Streak ticks to 1. Echo: \u201cGood walk. Same time tomorrow?\u201d",
              },
              {
                time: "10:30 PM",
                icon: "\ud83c\udf19", // 🌙
                title: "Bed",
                desc: "You open the app, look at the little glowing line on your map. Tomorrow\u2019s already there.",
              },
            ].map((step, i) => (
              <motion.div
                key={step.time}
                initial={{ y: 15 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                className="relative flex gap-5 pb-8 last:pb-0"
              >
                {/* Icon bubble */}
                <div
                  className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 text-xl bg-[#0a0a0a] ${
                    step.highlight
                      ? "border-2 border-amber-400/50 shadow-md shadow-amber-500/20"
                      : "border border-white/10"
                  }`}
                >
                  {step.icon}
                </div>

                {/* Card */}
                <div
                  className={`flex-1 rounded-xl p-4 sm:p-5 ${
                    step.highlight
                      ? "bg-gradient-to-br from-amber-500/[0.08] to-transparent border border-amber-500/20"
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
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mt-10 text-sm italic"
          >
            Two minutes of reason. One tap to say yes. That&apos;s the whole
            thing.
          </motion.p>
        </div>
      </section>

      {/* ================= WHO THIS IS FOR (ICP) ================= */}
      <section className="px-6 py-24 border-y border-white/[0.04] bg-white/[0.015]">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
          >
            <div className="text-xs uppercase tracking-[0.2em] text-amber-400 mb-4">
              Who This Is For
            </div>
            <blockquote className="text-xl sm:text-2xl text-gray-200 italic leading-snug border-l-2 border-amber-500/40 pl-5">
              Jordan, 28 to 34. Working individual buried in adulting.
              Hasn&apos;t seen friends in person in over a month. Knows they
              &ldquo;should&rdquo; exercise but every app feels like another
              chore. The dominant feeling is flatness &mdash; not clinical, but
              real.
            </blockquote>
          </motion.div>

          <motion.ul
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="space-y-3"
          >
            {[
              "Full-time knowledge worker, hybrid or remote. To-do list never ends.",
              "Lives in a city, alone or with a partner. Delivery apps for everything.",
              "Tried Strava, Peloton, ClassPass. Bounced off all of them.",
              "Doesn\u2019t want a fitness app. Wants a reason to go outside that feels like play.",
              "Wants a friend who happens to also get them out the door.",
            ].map((line, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 flex-shrink-0" />
                <span className="text-sm text-gray-400 leading-relaxed">
                  {line}
                </span>
              </li>
            ))}
          </motion.ul>
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
              desc: "Sub-second conversational AI from Groq + Llama 3.3 70B. Real personality. Real dialogue. Not a chatbot reading a script.",
            },
            {
              title: "Loneliness is at all-time highs",
              desc: "The Surgeon General called it an epidemic. Remote work flattened daily routines. People are inside more than ever.",
            },
            {
              title: "The gap in the market",
              desc: "Strava is for athletes. Replika is for romance. AllTrails is for hikers. Nobody put a real conversational companion in your ear while you walk your own block.",
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
            Roam is for the people who would go outside more if they had a
            reason. Echo is that reason. The city is waiting.
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
