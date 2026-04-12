"use client";

import { motion } from "framer-motion";
import EchoBlob from "@/components/EchoBlob";
import type { EchoState } from "@/components/EchoBlob";
import { uniqueTilesFor, percentOfGroup } from "@/lib/group-heat";

interface Member {
  id: string;
  name: string;
  tagline: string;
  color: string;
}

interface LeaderboardProps {
  members: Member[];
  currentMemberId: string | null;
  individualMaps: Record<string, Record<string, number>>;
  groupMap: Record<string, number>;
  echoState: EchoState;
  echoMessage: string;
  walkPhase: "ready" | "walking" | "between" | "done";
}

export default function Leaderboard({
  members,
  currentMemberId,
  individualMaps,
  groupMap,
  echoState,
  echoMessage,
  walkPhase,
}: LeaderboardProps) {
  const groupTotal = Object.keys(groupMap).length;
  const otherMapsFor = (id: string) =>
    members.filter((m) => m.id !== id).map((m) => individualMaps[m.id] || {});

  // Sort by tile count descending
  const sorted = [...members].sort(
    (a, b) =>
      Object.keys(individualMaps[b.id] || {}).length -
      Object.keys(individualMaps[a.id] || {}).length
  );

  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.06] bg-white/[0.02] overflow-hidden h-full">
      {/* Echo blob header */}
      <div className="flex flex-col items-center pt-6 pb-3 border-b border-white/[0.06]">
        <EchoBlob state={echoState} size={70} />
        <div className="mt-2 text-xs text-gray-500">
          {echoState === "speaking"
            ? "Echo is talking\u2026"
            : walkPhase === "done"
              ? "Walk complete"
              : "Echo is with the group"}
        </div>
      </div>

      {/* Echo message */}
      {echoMessage && (
        <motion.div
          initial={{ y: 5 }}
          animate={{ y: 0 }}
          className="px-4 py-2.5 bg-amber-500/5 border-b border-white/[0.06]"
        >
          <p className="text-amber-200/80 text-xs text-center italic">
            &ldquo;{echoMessage}&rdquo;
          </p>
        </motion.div>
      )}

      {/* Group stats */}
      <div className="px-4 py-3 border-b border-white/[0.06] flex items-center justify-between">
        <span className="text-xs text-gray-500">Group coverage</span>
        <span className="text-sm font-mono text-amber-400">
          {groupTotal} tiles
        </span>
      </div>

      {/* Leaderboard */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {sorted.map((member, rank) => {
          const tiles = Object.keys(individualMaps[member.id] || {}).length;
          const pct = percentOfGroup(
            individualMaps[member.id] || {},
            groupMap
          );
          const unique = uniqueTilesFor(
            individualMaps[member.id] || {},
            otherMapsFor(member.id)
          );
          const isActive = member.id === currentMemberId;

          return (
            <motion.div
              key={member.id}
              initial={{ y: 8 }}
              animate={{ y: 0 }}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors ${
                isActive
                  ? "bg-white/[0.06] border border-white/[0.08]"
                  : "bg-white/[0.02]"
              }`}
            >
              {/* Rank */}
              <span className="text-xs text-gray-600 w-4 text-center font-mono">
                {rank + 1}
              </span>

              {/* Avatar dot */}
              <div className="relative">
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-black"
                  style={{ backgroundColor: member.color }}
                >
                  {member.name[0]}
                </div>
                {isActive && (
                  <div
                    className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full border-2 border-[#0a0a0a] animate-pulse"
                    style={{ backgroundColor: member.color }}
                  />
                )}
              </div>

              {/* Name + tagline */}
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium truncate">
                  {member.name}
                </div>
                <div className="text-[10px] text-gray-500 truncate">
                  {member.tagline}
                </div>
              </div>

              {/* Stats */}
              <div className="text-right flex-shrink-0">
                <div className="text-sm font-mono" style={{ color: member.color }}>
                  {tiles}
                </div>
                <div className="text-[10px] text-gray-500">
                  {pct}% &middot; {unique} unique
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Status bar */}
      <div className="p-3 border-t border-white/[0.06] text-center">
        {walkPhase === "ready" && (
          <div className="text-xs text-gray-500">
            Press play to start the group walk
          </div>
        )}
        {walkPhase === "walking" && (
          <div className="flex items-center justify-center gap-2">
            <div
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                backgroundColor:
                  members.find((m) => m.id === currentMemberId)?.color ||
                  "#F4A261",
              }}
            />
            <span className="text-xs text-gray-400">
              {members.find((m) => m.id === currentMemberId)?.name} is
              walking&hellip;
            </span>
          </div>
        )}
        {walkPhase === "between" && (
          <div className="text-xs text-gray-400">Next walker starting&hellip;</div>
        )}
        {walkPhase === "done" && (
          <div className="text-xs text-amber-400/80">
            {members.length} friends &middot; {groupTotal} tiles explored
          </div>
        )}
      </div>
    </div>
  );
}
