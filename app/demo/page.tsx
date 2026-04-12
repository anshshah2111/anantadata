"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import EchoBlob from "@/components/EchoBlob";
import type { EchoState } from "@/components/EchoBlob";
import { latLngToTileId } from "@/lib/tiles";
import { PERSONAS, JORDAN, KOBE } from "@/lib/demo-personas";
import type { DemoPersona, GroupMember } from "@/lib/demo-personas";
import { mergeHeatMaps } from "@/lib/group-heat";

const FogMap = dynamic(() => import("@/components/FogMap"), {
  ssr: false,
  loading: () => <div className="w-full h-full bg-[#0a0a0a]" />,
});
const Leaderboard = dynamic(() => import("@/components/Leaderboard"), {
  ssr: false,
});

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export default function DemoPage() {
  const [persona, setPersona] = useState<DemoPersona>(JORDAN);
  const isGroup = persona.id === "kobe" && !!persona.groupMembers;
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  /* ---------- Solo walk state (Jordan) ---------- */
  const [step, setStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [echoState, setEchoState] = useState<EchoState>("idle");
  const [echoMessage, setEchoMessage] = useState("");
  const [heatMap, setHeatMap] = useState<Record<string, number>>({});
  const [walkPath, setWalkPath] = useState<[number, number][]>([]);
  const [currentPos, setCurrentPos] = useState<[number, number] | null>(null);
  const [chatHistory, setChatHistory] = useState<
    { sender: "echo" | "user"; text: string }[]
  >([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  /* ---------- Group walk state (Kobe) ---------- */
  const [groupPhase, setGroupPhase] = useState<
    "ready" | "walking" | "between" | "done"
  >("ready");
  const [currentMemberId, setCurrentMemberId] = useState<string | null>(null);
  const [individualMaps, setIndividualMaps] = useState<
    Record<string, Record<string, number>>
  >({});
  const [groupMap, setGroupMap] = useState<Record<string, number>>({});
  const groupAbortRef = useRef(false);

  /* ---------- Feature notification pills ---------- */
  const [activeNotification, setActiveNotification] = useState<{
    icon: string;
    text: string;
    color: string;
  } | null>(null);
  const notifTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showNotification = useCallback(
    (icon: string, text: string, color = "#F4A261", durationMs = 3500) => {
      if (notifTimeout.current) clearTimeout(notifTimeout.current);
      setActiveNotification({ icon, text, color });
      notifTimeout.current = setTimeout(
        () => setActiveNotification(null),
        durationMs
      );
    },
    []
  );

  /* ---------- Shared helpers ---------- */

  const clearInterval_ = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const resetAll = useCallback(() => {
    clearInterval_();
    groupAbortRef.current = true;
    setStep(0);
    setIsPlaying(false);
    setEchoState("idle");
    setEchoMessage("");
    setHeatMap({});
    setWalkPath([]);
    setCurrentPos(null);
    setChatHistory([]);
    setGroupPhase("ready");
    setCurrentMemberId(null);
    setIndividualMaps({});
    setGroupMap({});
    // Allow new walks after a tick
    setTimeout(() => {
      groupAbortRef.current = false;
    }, 50);
  }, [clearInterval_]);

  const switchPersona = useCallback(
    (p: DemoPersona) => {
      resetAll();
      setPersona(p);
    },
    [resetAll]
  );

  /* ---------- Solo walk logic (Jordan) ---------- */

  const advanceSoloStep = useCallback(() => {
    const route = persona.route;
    const beats = persona.conversationBeats;
    const responses = persona.userResponses;

    setStep((prev) => {
      const next = prev + 1;
      if (next >= route.length) {
        setIsPlaying(false);
        clearInterval_();
        return prev;
      }

      const pos = route[next];
      setCurrentPos(pos);
      setWalkPath((p) => [...p, pos]);

      const tileId = latLngToTileId(pos[0], pos[1]);
      setHeatMap((h) => ({ ...h, [tileId]: (h[tileId] || 0) + 1 }));

      const beat = beats.find((b) => b.triggerStep === next);
      if (beat) {
        setEchoState(beat.echoState);
        setEchoMessage(beat.message);
        setChatHistory((h) => [...h, { sender: "echo", text: beat.message }]);

        // Feature notification pills based on message content
        const msg = beat.message.toLowerCase();
        if (msg.includes("remind") || msg.includes("errand") || msg.includes("milk") || msg.includes("coffee beans")) {
=======
<<<<<<< HEAD
        if (msg.includes("remind") || msg.includes("errand") || msg.includes("milk") || msg.includes("coffee beans")) {
          showNotification("\uD83D\uDED2", "Errand queued", "#F4A261");
          setActiveFeature("Errands");
        } else if (msg.includes("note") || msg.includes("saved") || msg.includes("remembering")) {
          showNotification("\uD83D\uDCDD", "Note saved", "#7B68EE");
          setActiveFeature("Notes");
        } else if (msg.includes("luna") || msg.includes("dog")) {
          showNotification("\uD83D\uDC15", "Dog walk mode", "#52B788");
          setActiveFeature("Dog walk");
        } else if (msg.includes("priya") || msg.includes("marcus") || msg.includes("group") || msg.includes("overlap")) {
          showNotification("\uD83C\uDFC6", "Leaderboard updated", "#00B4D8");
          setActiveFeature("Leaderboard");
        } else if (msg.includes("new street") || msg.includes("new tile") || msg.includes("never")) {
          showNotification("\uD83C\uDF1F", "New area discovered", "#F4A261");
          setActiveFeature("Heat map");
        }
<<<<<<< HEAD
=======
=======
        if (msg.includes("remind") || msg.includes("errand") || msg.includes("milk") || msg.includes("coffee beans"))
>>>>>>> origin/main
          showNotification("\uD83D\uDED2", "Errand queued", "#F4A261");
          setActiveFeature("Errands");
        } else if (msg.includes("note") || msg.includes("saved") || msg.includes("remembering")) {
          showNotification("\uD83D\uDCDD", "Note saved", "#7B68EE");
          setActiveFeature("Notes");
        } else if (msg.includes("luna") || msg.includes("dog")) {
          showNotification("\uD83D\uDC15", "Dog walk mode", "#52B788");
          setActiveFeature("Dog walk");
        } else if (msg.includes("priya") || msg.includes("marcus") || msg.includes("group") || msg.includes("overlap")) {
          showNotification("\uD83C\uDFC6", "Leaderboard updated", "#00B4D8");
          setActiveFeature("Leaderboard");
        } else if (msg.includes("new street") || msg.includes("new tile") || msg.includes("never")) {
          showNotification("\uD83C\uDF1F", "New area discovered", "#F4A261");
<<<<<<< HEAD
          setActiveFeature("Heat map");
        }

=======
>>>>>>> origin/main
>>>>>>> origin/main
>>>>>>> origin/main

        const userResp = responses[next];
        if (userResp) {
          setTimeout(() => {
            setChatHistory((h) => [...h, { sender: "user", text: userResp }]);
            setEchoState("listening");
            setTimeout(() => setEchoState("idle"), 1500);
          }, beat.duration - 500);
        } else {
          setTimeout(() => {
            setEchoState("idle");
            setEchoMessage("");
          }, beat.duration);
        }
      }

      return next;
    });
  }, [persona, clearInterval_]);

  const startSoloDemo = useCallback(() => {
    resetAll();
    setTimeout(() => {
      const route = persona.route;
      setWalkPath([route[0]]);
      setCurrentPos(route[0]);
      setIsPlaying(true);
      const tileId = latLngToTileId(route[0][0], route[0][1]);
      setHeatMap({ [tileId]: 1 });
      intervalRef.current = setInterval(
        advanceSoloStep,
        persona.stepIntervalMs
      );
    }, 60);
  }, [persona, advanceSoloStep, resetAll]);

  /* ---------- Group walk logic (Kobe) ---------- */

  const runMemberWalk = useCallback(
    (
      member: GroupMember,
      existingMaps: Record<string, Record<string, number>>
    ): Promise<Record<string, Record<string, number>>> => {
      return new Promise((resolve) => {
        const memberMap: Record<string, number> = {};
        let memberStep = 0;

        setCurrentMemberId(member.id);
        setGroupPhase("walking");
        setWalkPath([member.route[0]]);
        setCurrentPos(member.route[0]);

        // Initial tile
        const firstTile = latLngToTileId(
          member.route[0][0],
          member.route[0][1]
        );
        memberMap[firstTile] = 1;

        const iv = setInterval(() => {
          if (groupAbortRef.current) {
            clearInterval(iv);
            resolve(existingMaps);
            return;
          }

          memberStep++;
          if (memberStep >= member.route.length) {
            clearInterval(iv);
            const updatedMaps = {
              ...existingMaps,
              [member.id]: memberMap,
            };
            const merged = mergeHeatMaps(Object.values(updatedMaps));
            setHeatMap(merged);
            setGroupMap(merged);
            setIndividualMaps(updatedMaps);
            resolve(updatedMaps);
            return;
          }

          const pos = member.route[memberStep];
          setCurrentPos(pos);
          setWalkPath((p) => [...p, pos]);

          const tileId = latLngToTileId(pos[0], pos[1]);
          memberMap[tileId] = (memberMap[tileId] || 0) + 1;

          // Update running maps
          const running = { ...existingMaps, [member.id]: { ...memberMap } };
          const merged = mergeHeatMaps(Object.values(running));
          setHeatMap(merged);
          setGroupMap(merged);
          setIndividualMaps(running);

          // Check beats
          const beat = member.beats.find((b) => b.triggerStep === memberStep);
          if (beat) {
            setEchoState(beat.echoState);
            setEchoMessage(beat.message);
            setChatHistory((h) => [
              ...h,
              { sender: "echo", text: beat.message },
            ]);
            // Feature notification
            const msg = beat.message.toLowerCase();
            if (msg.includes("overlap") || msg.includes("triple"))
              showNotification("\uD83C\uDFC6", "Leaderboard updated", "#00B4D8");
            else if (msg.includes("tile") || msg.includes("light"))
              showNotification("\uD83C\uDF1F", "New tiles revealed", "#F4A261");
            setTimeout(() => {
              setEchoState("idle");
              setEchoMessage("");
            }, beat.duration);
          }
        }, persona.stepIntervalMs);
      });
    },
    [persona.stepIntervalMs]
  );

  const startGroupDemo = useCallback(async () => {
    resetAll();
    const members = persona.groupMembers;
    if (!members) return;

    await new Promise((r) => setTimeout(r, 100)); // let reset settle
    groupAbortRef.current = false;

    let maps: Record<string, Record<string, number>> = {};

    for (let i = 0; i < members.length; i++) {
      if (groupAbortRef.current) break;

      // Between-member pause
      if (i > 0) {
        setGroupPhase("between");
        setWalkPath([]);
        setCurrentPos(null);
        setEchoMessage(
          `Up next: ${members[i].name} \u2014 ${members[i].tagline}`
        );
        setEchoState("speaking");
        setChatHistory((h) => [
          ...h,
          {
            sender: "echo",
            text: `Up next: ${members[i].name} \u2014 ${members[i].tagline}`,
          },
        ]);
        await new Promise((r) => setTimeout(r, 2000));
        if (groupAbortRef.current) break;
        setEchoState("idle");
        setEchoMessage("");
      }

      maps = await runMemberWalk(members[i], maps);
    }

    if (!groupAbortRef.current) {
      setGroupPhase("done");
      setCurrentMemberId(null);
      setEchoMessage("The group covered it. Look at that heat map glow.");
      setEchoState("speaking");
      setChatHistory((h) => [
        ...h,
        {
          sender: "echo",
          text: "The group covered it. Look at that heat map glow.",
        },
      ]);
      setTimeout(() => {
        setEchoState("idle");
      }, 4000);
    }
  }, [persona, resetAll, runMemberWalk]);

  /* ---------- Cleanup ---------- */
  useEffect(() => {
    return () => {
      clearInterval_();
      groupAbortRef.current = true;
    };
  }, [clearInterval_]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatHistory]);

  /* ---------- Auto-traverse features during walk ---------- */
  const featureTraverseRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Start auto-cycling features when walk begins
  useEffect(() => {
    const walkActive = isPlaying || (isGroup && groupPhase === "walking");
    if (walkActive && persona.features.length > 0) {
      let idx = 0;
      setActiveFeature(persona.features[0].label);
      featureTraverseRef.current = setInterval(() => {
        idx = (idx + 1) % persona.features.length;
        setActiveFeature(persona.features[idx].label);
      }, 7000);
    }
    return () => {
      if (featureTraverseRef.current) {
        clearInterval(featureTraverseRef.current);
        featureTraverseRef.current = null;
      }
    };
  }, [isPlaying, isGroup, groupPhase, persona.features]);

  // Show all features at end of walk
  useEffect(() => {
    const walkDone = (!isPlaying && step > 0 && !isGroup) || (isGroup && groupPhase === "done");
    if (walkDone) {
      if (featureTraverseRef.current) {
        clearInterval(featureTraverseRef.current);
        featureTraverseRef.current = null;
      }
      setActiveFeature(null);
    }
  }, [isPlaying, step, isGroup, groupPhase]);

  /* ---------- Derived ---------- */
  const progress =
    persona.route.length > 0
      ? Math.round((step / (persona.route.length - 1)) * 100)
      : 0;
  const isDone =
    isGroup
      ? groupPhase === "done"
      : !isPlaying && step > 0;
  const isReady =
    isGroup
      ? groupPhase === "ready"
      : !isPlaying && step === 0;
  const locationLabel =
    persona.id === "jordan" ? "UW Seattle Campus" : "Capitol Hill, Seattle";

  /* ---------- Render ---------- */
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Header */}
      <div className="px-6 pt-5 pb-3 flex items-center justify-between">
        <Link
          href="/"
          className="text-lg font-bold tracking-wide bg-gradient-to-br from-white to-amber-300 bg-clip-text text-transparent"
        >
          Roam
          <span className="text-gray-600 text-sm font-normal ml-2">
            / Interactive Demo
          </span>
        </Link>
        <Link
          href="/"
          className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
        >
          &larr; Back to site
        </Link>
      </div>

      {/* Persona picker */}
      <div className="px-6 pb-4 flex items-center gap-3">
        {PERSONAS.map((p) => (
          <button
            key={p.id}
            onClick={() => switchPersona(p)}
            className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${
              persona.id === p.id
                ? "bg-amber-500/15 text-amber-400 border border-amber-500/30"
                : "bg-white/[0.03] text-gray-400 border border-white/[0.06] hover:border-white/[0.12]"
            }`}
          >
            <span className="font-semibold">{p.name}</span>
            <span className="text-gray-500 ml-1.5">&mdash; {p.tagline}</span>
          </button>
        ))}
      </div>

<<<<<<< HEAD
      {/* Feature showcase — cycles on top of the feature bar area */}
=======
<<<<<<< HEAD
=======
<<<<<<< HEAD
>>>>>>> origin/main
      {/* Interactive feature bar + expandable previews */}
>>>>>>> origin/main
      <div className="px-6 pb-3">
        {/* Progress dots showing which feature is active */}
        <div className="flex items-center gap-2 mb-2">
          {persona.features.map((f, i) => (
            <button
              key={f.label}
              onClick={() => setActiveFeature(activeFeature === f.label ? null : f.label)}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                activeFeature === f.label
                  ? "bg-amber-500/20 border border-amber-500/40 text-amber-300 scale-105"
                  : "bg-white/[0.04] border border-white/[0.08] text-gray-400 hover:border-white/20"
              }`}
            >
              <span>{f.icon}</span>
              <span className="hidden sm:inline">{f.label}</span>
            </button>
          ))}
        </div>

<<<<<<< HEAD
        {/* Auto-expanding feature card */}
        {activeFeature && (
          <motion.div
            key={activeFeature}
            initial={{ y: 10 }}
            animate={{ y: 0 }}
            className="bg-white/[0.04] border border-amber-500/20 rounded-xl p-4 mb-2 shadow-lg shadow-amber-500/5"
          >
            {/* Echo explaining the feature */}
            <div className="flex items-start gap-3 mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex-shrink-0 flex items-center justify-center">
                <span className="text-xs font-bold text-black">E</span>
              </div>
              <div className="flex-1">
                <div className="text-xs text-amber-400 mb-0.5">Echo explains</div>
                <div className="text-sm text-gray-300 italic">
                  {activeFeature === "Group map" && "\u201cSee where your friends have been. Each person\u2019s walks add to the shared map \u2014 tiles deepen as more people visit.\u201d"}
                  {activeFeature === "Leaderboard" && "\u201cWho discovered the most new tiles this week? Friendly competition that makes you want to go one block further.\u201d"}
                  {activeFeature === "Dog walk" && "\u201cLuna knows the route. I know the tiles. Together we\u2019ll find 2 new ones if you go one block further.\u201d"}
                  {activeFeature === "Errands" && "\u201cYou mentioned coffee beans. Olive Way Roasters is 2 blocks east \u2014 I\u2019ll remind you when we pass it.\u201d"}
                  {activeFeature === "Notes" && "\u201cYou said something worth remembering. I saved it with the location. You can review your walk thoughts later.\u201d"}
                  {activeFeature === "History" && "\u201cThis week: 4 walks, 52 tiles, 3.2 miles. Your map is growing like a neural network. Echo saved 2 notes along the way.\u201d"}
                  {activeFeature === "Voice companion" && "\u201cI\u2019m not a coach. I\u2019m not a therapist. I\u2019m the friend who says \u2018hey, let\u2019s go\u2019 and asks what you ate today.\u201d"}
                  {activeFeature === "Heat map" && "\u201cEvery step you take clears the fog. Walk the same street twice and it glows warmer. Over a month, your city looks like a constellation.\u201d"}
                  {activeFeature === "Walk streaks" && "\u201cDay 4. You showed up again. I saved a thought for you from yesterday \u2014 want to hear it while we walk?\u201d"}
                </div>
              </div>
            </div>

            {/* Feature-specific visual mockup */}
            <div className="bg-[#0a0a0a]/60 rounded-lg p-3">
=======
        {/* Feature preview panels */}
<<<<<<< HEAD
        {activeFeature && (
          <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 mb-3">
=======
        <AnimatePresence>
          {activeFeature && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              className="overflow-hidden"
            >
              <div className="bg-white/[0.03] border border-white/[0.08] rounded-xl p-4 mb-3">
>>>>>>> origin/main
>>>>>>> origin/main
                {activeFeature === "Group map" && (
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🗺️</div>
                    <div>
                      <div className="text-sm font-semibold mb-1">Shared Group Heat Map</div>
                      <div className="text-xs text-gray-400 mb-2">3 members exploring Capitol Hill. Tiles deepen as more people visit the same areas.</div>
                      <div className="flex gap-3">
                        <span className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full bg-[#F4A261]"></span>Kobe — 18 tiles</span>
                        <span className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full bg-[#7B68EE]"></span>Priya — 15 tiles</span>
                        <span className="flex items-center gap-1.5 text-[11px]"><span className="w-2 h-2 rounded-full bg-[#00B4D8]"></span>Marcus — 12 tiles</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === "Leaderboard" && (
                  <div>
                    <div className="text-sm font-semibold mb-2">🏆 Group Leaderboard</div>
                    <div className="space-y-1.5">
                      {[
                        { name: "Kobe", tiles: 18, unique: 6, color: "#F4A261" },
                        { name: "Priya", tiles: 15, unique: 4, color: "#7B68EE" },
                        { name: "Marcus", tiles: 12, unique: 3, color: "#00B4D8" },
                      ].map((m, i) => (
                        <div key={m.name} className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-1.5">
                          <span className="text-xs text-gray-500 w-4">{i + 1}</span>
                          <span className="w-5 h-5 rounded-full text-[10px] font-bold text-black flex items-center justify-center" style={{ backgroundColor: m.color }}>{m.name[0]}</span>
                          <span className="text-xs flex-1">{m.name}</span>
                          <span className="text-xs font-mono" style={{ color: m.color }}>{m.tiles}</span>
                          <span className="text-[10px] text-gray-500">{m.unique} unique</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                {activeFeature === "Dog walk" && (
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🐕</div>
                    <div>
                      <div className="text-sm font-semibold mb-1">Dog Walk Mode</div>
                      <div className="text-xs text-gray-400 mb-2">Echo tracks Luna&apos;s usual route and suggests new tiles along the way.</div>
                      <div className="bg-white/[0.04] rounded-lg px-3 py-2 text-xs">
                        <div className="text-amber-400 mb-1">Luna&apos;s route today</div>
                        <div className="text-gray-400">12 tiles covered · 2 new tiles if you go 1 block further</div>
                        <div className="text-gray-500 mt-1">☀️ Weather: 62°F, perfect for Luna</div>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === "Errands" && (
                  <div>
                    <div className="text-sm font-semibold mb-2">🛒 Errand Assistant</div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2 bg-amber-500/5 border border-amber-500/15 rounded-lg px-3 py-2">
                        <span className="text-amber-400 text-sm">☐</span>
                        <div className="flex-1">
                          <div className="text-xs font-medium">Coffee beans</div>
                          <div className="text-[10px] text-gray-500">Olive Way Roasters — 2 blocks east · on your route</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 bg-white/[0.03] rounded-lg px-3 py-2">
                        <span className="text-green-400 text-sm">✓</span>
                        <div className="flex-1">
                          <div className="text-xs font-medium text-gray-500 line-through">Milk</div>
                          <div className="text-[10px] text-gray-500">Fred Meyer — completed yesterday</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === "Notes" && (
                  <div>
                    <div className="text-sm font-semibold mb-2">📝 Walk Notes</div>
                    <div className="space-y-1.5">
                      <div className="bg-violet-500/5 border border-violet-500/15 rounded-lg px-3 py-2">
                        <div className="text-xs text-violet-300">&ldquo;The skyline from Cal Anderson at sunset &mdash; need to come back with a camera.&rdquo;</div>
                        <div className="text-[10px] text-gray-500 mt-1">Saved Tue 5:52 PM · Cal Anderson Park</div>
                      </div>
                      <div className="bg-violet-500/5 border border-violet-500/15 rounded-lg px-3 py-2">
                        <div className="text-xs text-violet-300">&ldquo;Try the ramen place on Broadway that Priya mentioned.&rdquo;</div>
                        <div className="text-[10px] text-gray-500 mt-1">Saved Wed 6:10 PM · Broadway &amp; John</div>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === "History" && (
                  <div>
                    <div className="text-sm font-semibold mb-2">📊 Walk History</div>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {[
                        { label: "This week", value: "4 walks" },
                        { label: "Tiles", value: "52" },
                        { label: "Distance", value: "3.2 mi" },
                        { label: "Streak", value: "4 days" },
                      ].map((s) => (
                        <div key={s.label} className="bg-white/[0.04] rounded-lg p-2 text-center">
                          <div className="text-sm font-mono text-amber-400">{s.value}</div>
                          <div className="text-[10px] text-gray-500">{s.label}</div>
                        </div>
                      ))}
                    </div>
                    <div className="text-[11px] text-gray-500">
                      📝 2 notes saved · 🛒 1 errand completed · 🐕 2 dog walks
                    </div>
                  </div>
                )}
                {activeFeature === "Voice companion" && (
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🗣️</div>
                    <div>
                      <div className="text-sm font-semibold mb-1">Echo Voice Companion</div>
                      <div className="text-xs text-gray-400 mb-2">Echo speaks out loud while you walk. Warm, curious, never coaches. Asks about your day, notices new streets, remembers what you said.</div>
                      <div className="bg-white/[0.04] rounded-lg px-3 py-2 text-xs italic text-amber-200/70">
                        &ldquo;Hey. Glad you&apos;re out here. Where are we headed today?&rdquo;
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === "Heat map" && (
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🌍</div>
                    <div>
                      <div className="text-sm font-semibold mb-1">Living Heat Map</div>
                      <div className="text-xs text-gray-400 mb-2">New streets clear from fog. Walked-again streets deepen from cool lavender to warm gold. Your map is a portrait of your life outside.</div>
                      <div className="flex gap-2 mt-1">
                        {["#7B68EE", "#00B4D8", "#52B788", "#F4A261", "#E76F51"].map((c) => (
                          <div key={c} className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: c }}></div>
                          </div>
                        ))}
                        <span className="text-[10px] text-gray-500 ml-1">cold → hot (by visits)</span>
                      </div>
                    </div>
                  </div>
                )}
                {activeFeature === "Walk streaks" && (
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">🔥</div>
                    <div>
                      <div className="text-sm font-semibold mb-1">Walk Streaks</div>
                      <div className="text-xs text-gray-400 mb-2">Walk today. Walk tomorrow. Your streak grows. Echo saves a thought for you between walks.</div>
                      <div className="flex gap-1">
                        {["Mon", "Tue", "Wed", "Thu"].map((d) => (
                          <div key={d} className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-[10px] text-amber-300">{d}</div>
                        ))}
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[10px] text-gray-500">Fri</div>
                        <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/10 flex items-center justify-center text-[10px] text-gray-500">Sat</div>
                      </div>
                    </div>
                  </div>
                )}
<<<<<<< HEAD
            </div>
          </motion.div>
        )}
=======
<<<<<<< HEAD
          </div>
        )}

=======
              </div>
            </motion.div>
          )}
        </AnimatePresence>
=======
      {/* Feature bar */}
      <div className="px-6 pb-3 flex flex-wrap items-center gap-2">
        {persona.features.map((f) => (
          <span
            key={f.label}
            className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/[0.04] border border-white/[0.08] rounded-full text-xs text-gray-400"
          >
            <span>{f.icon}</span>
            {f.label}
          </span>
        ))}
>>>>>>> origin/main
>>>>>>> origin/main
>>>>>>> origin/main
      </div>

      {/* Main demo area */}
      <div className="px-4 pb-8">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr,380px] gap-4 min-h-[500px] lg:h-[calc(100vh-140px)]">
          {/* Map */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] min-h-[400px]">
            <FogMap
              key={persona.id}
              heatMap={heatMap}
              currentPosition={currentPos}
              walkPath={walkPath}
              center={persona.mapCenter}
              zoom={persona.mapZoom}
              interactive={true}
            />

            {/* Play button overlay */}
            {isReady && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isGroup ? startGroupDemo : startSoloDemo}
                  className="flex flex-col items-center gap-4"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-500 flex items-center justify-center shadow-lg shadow-amber-500/30">
                    <svg
                      className="w-8 h-8 text-black ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-white font-medium text-lg">
                    {isGroup ? "Start the group walk" : "Start the walk"}
                  </span>
                  <span className="text-gray-400 text-sm max-w-xs text-center">
                    {persona.description}
                  </span>
                </motion.button>
              </div>
            )}

            {/* Replay button */}
            {isDone && (
              <div className="absolute bottom-4 left-4 z-10">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={isGroup ? startGroupDemo : startSoloDemo}
                  className="px-4 py-2 bg-amber-500 text-black text-sm font-medium rounded-full"
                >
                  Replay
                </motion.button>
              </div>
            )}

            {/* Progress bar (solo mode) */}
            {!isGroup && isPlaying && (
              <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-white/10">
                <motion.div
                  className="h-full bg-amber-500"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            )}

            {/* Floating feature notification pill */}
            <AnimatePresence>
              {activeNotification && (
                <motion.div
                  initial={{ y: -20, scale: 0.8 }}
                  animate={{ y: 0, scale: 1 }}
                  exit={{ y: -20, scale: 0.8 }}
                  className="absolute top-4 right-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-md border shadow-lg"
                  style={{
                    backgroundColor: `${activeNotification.color}15`,
                    borderColor: `${activeNotification.color}40`,
                    boxShadow: `0 4px 20px ${activeNotification.color}25`,
                  }}
                >
                  <span className="text-lg">{activeNotification.icon}</span>
                  <span
                    className="text-sm font-medium"
                    style={{ color: activeNotification.color }}
                  >
                    {activeNotification.text}
                  </span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Location label */}
            <div className="absolute top-4 left-4 z-10 bg-black/60 backdrop-blur-sm rounded-full px-3 py-1.5 text-xs text-gray-300 flex items-center gap-2">
              {isGroup && currentMemberId && (
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    backgroundColor:
                      persona.groupMembers?.find(
                        (m) => m.id === currentMemberId
                      )?.color || "#F4A261",
                  }}
                />
              )}
              {locationLabel}
            </div>
          </div>

          {/* Right sidebar: Chat (Jordan) or Leaderboard (Kobe) */}
          {isGroup ? (
            <Leaderboard
              members={
                persona.groupMembers?.map((m) => ({
                  id: m.id,
                  name: m.name,
                  tagline: m.tagline,
                  color: m.color,
                })) || []
              }
              currentMemberId={currentMemberId}
              individualMaps={individualMaps}
              groupMap={groupMap}
              echoState={echoState}
              echoMessage={echoMessage}
              walkPhase={groupPhase}
            />
          ) : (
            <div className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden">
              {/* Echo blob area */}
              <div className="flex flex-col items-center pt-8 pb-4 border-b border-white/[0.06]">
                <EchoBlob state={echoState} size={90} />
                <div className="mt-3 text-sm text-gray-500">
                  {echoState === "speaking"
                    ? "Echo is talking\u2026"
                    : echoState === "listening"
                      ? "Echo is listening\u2026"
                      : echoState === "thinking"
                        ? "Echo is thinking\u2026"
                        : "Echo is with you"}
                </div>
              </div>

              {/* Echo message bubble */}
              <AnimatePresence>
                {echoMessage && (
                  <motion.div
                    initial={{ y: 5 }}
                    animate={{ y: 0 }}
                    exit={{ y: -5 }}
                    className="px-4 py-3 bg-amber-500/5 border-b border-white/[0.06]"
                  >
                    <p className="text-amber-200/80 text-sm text-center italic">
                      &ldquo;{echoMessage}&rdquo;
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Chat history */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-[200px]">
                {chatHistory.length === 0 && (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-gray-600 text-sm text-center">
                      {isPlaying
                        ? "Echo will start talking soon\u2026"
                        : "Press play to start the demo walk"}
                    </p>
                  </div>
                )}
                {chatHistory.map((msg, i) => (
                  <motion.div
                    key={i}
                    initial={{ y: 8 }}
                    animate={{ y: 0 }}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-sm ${
                        msg.sender === "echo"
                          ? "bg-white/[0.06] text-gray-200 rounded-bl-sm"
                          : "bg-amber-500/20 text-amber-100 rounded-br-sm"
                      }`}
                    >
                      {msg.text}
                    </div>
                  </motion.div>
                ))}
                <div ref={chatEndRef} />
              </div>

              {/* Mic button (visual only) */}
              <div className="p-4 border-t border-white/[0.06] flex justify-center">
                <div className="w-12 h-12 rounded-full bg-white/[0.06] flex items-center justify-center text-gray-500">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
                    />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
