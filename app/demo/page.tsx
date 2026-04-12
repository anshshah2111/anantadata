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
