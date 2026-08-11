"use client";

import { motion } from "framer-motion";
import { Check, Lock, ChevronRight, Sparkles } from "lucide-react";
import { levels, getLevelsByDifficulty } from "@/lib/git-quest/levels";
import type { GameState } from "@/lib/git-quest/types";

interface LevelMapProps {
  state: GameState;
  onStartLevel: (levelId: string) => void;
}

const tierConfig = {
  beginner: {
    label: "Tier 1 — Local Basics",
    color: "text-emerald-400",
    border: "border-emerald-500/20",
    bg: "bg-emerald-500/5",
    glow: "shadow-emerald-500/5",
    icon: "📦",
  },
  "beginner-intermediate": {
    label: "Tier 2 — Remotes & Branches",
    color: "text-violet-400",
    border: "border-violet-500/20",
    bg: "bg-violet-500/5",
    glow: "shadow-violet-500/5",
    icon: "🌿",
  },
  intermediate: {
    label: "Tier 3 — GitHub Flow",
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
    glow: "shadow-amber-500/5",
    icon: "🔀",
  },
  advanced: {
    label: "Tier 4 — CI/CD & Actions",
    color: "text-red-400",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
    glow: "shadow-red-500/5",
    icon: "⚡",
  },
} as const;

const tierOrder: Array<keyof typeof tierConfig> = [
  "beginner",
  "beginner-intermediate",
  "intermediate",
  "advanced",
];

export default function LevelMap({ state, onStartLevel }: LevelMapProps) {
  return (
    <div className="space-y-6">
      <div className="text-center space-y-2 mb-8">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1"
        >
          <Sparkles className="h-3.5 w-3.5 text-terminal-green" />
          <span className="text-[10px] font-mono text-zinc-400">
            {state.completedLevelIds.length}/{levels.length} MISSIONS COMPLETE
          </span>
        </motion.div>
        <h2 className="text-2xl font-extrabold text-white">Quest Map</h2>
        <p className="text-xs text-zinc-400 max-w-md mx-auto">
          Complete missions to earn XP and badges. Each tier unlocks new Git superpowers.
        </p>
      </div>

      {tierOrder.map((difficulty, tierIdx) => {
        const tierLevels = getLevelsByDifficulty(difficulty);
        const config = tierConfig[difficulty];
        if (tierLevels.length === 0) return null;

        return (
          <motion.div
            key={difficulty}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tierIdx * 0.1 }}
          >
            <div className={`flex items-center gap-2 mb-3 ${config.color}`}>
              <span className="text-sm">{config.icon}</span>
              <span className="text-[10px] font-mono uppercase tracking-widest">
                {config.label}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tierLevels.map((level, idx) => {
                const isCompleted = state.completedLevelIds.includes(level.id);
                const prevLevel = tierLevels[idx - 1];
                const isLocked =
                  !isCompleted &&
                  prevLevel &&
                  !state.completedLevelIds.includes(prevLevel.id);
                const isNext =
                  !isCompleted &&
                  !isLocked &&
                  (idx === 0 || state.completedLevelIds.includes(tierLevels[idx - 1].id));

                return (
                  <motion.button
                    key={level.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: tierIdx * 0.1 + idx * 0.05 }}
                    onClick={() => !isLocked && onStartLevel(level.id)}
                    disabled={isLocked}
                    className={`glow-card rounded-xl p-4 text-left transition-all ${
                      isLocked
                        ? "opacity-40 cursor-not-allowed"
                        : isNext
                        ? "hover:border-terminal-green/30 cursor-pointer ring-1 ring-terminal-green/20"
                        : isCompleted
                        ? "border-emerald-500/20 cursor-pointer"
                        : "hover:border-white/10 cursor-pointer"
                    }`}
                    aria-label={`${isCompleted ? "Completed: " : isLocked ? "Locked: " : ""}Level ${level.number}: ${level.title}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                            isCompleted
                              ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                              : isLocked
                              ? "bg-zinc-800 text-zinc-600 border border-white/5"
                              : isNext
                              ? "bg-terminal-green/20 text-terminal-green border border-terminal-green/30 shadow-[0_0_12px_rgba(16,185,129,0.15)]"
                              : "bg-white/5 text-zinc-400 border border-white/10"
                          }`}
                        >
                          {isCompleted ? (
                            <Check className="h-4 w-4" />
                          ) : isLocked ? (
                            <Lock className="h-3.5 w-3.5" />
                          ) : (
                            level.number
                          )}
                        </div>
                        <div>
                          <h3 className="text-sm font-bold text-white">
                            {level.title}
                          </h3>
                          <p className="text-[10px] text-zinc-500">
                            {level.subtitle}
                          </p>
                        </div>
                      </div>

                      {!isLocked && (
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-mono text-zinc-600">
                            +{level.xpReward} XP
                          </span>
                          {(isNext || isCompleted) && (
                            <ChevronRight className="h-4 w-4 text-zinc-600" />
                          )}
                        </div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
