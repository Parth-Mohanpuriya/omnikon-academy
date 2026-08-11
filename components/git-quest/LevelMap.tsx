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
    color: "var(--gq-committed)",
    icon: "📦",
  },
  "beginner-intermediate": {
    label: "Tier 2 — Remotes & Branches",
    color: "var(--gq-branch-feature)",
    icon: "🌿",
  },
  intermediate: {
    label: "Tier 3 — GitHub Flow",
    color: "var(--gq-staged)",
    icon: "🔀",
  },
  advanced: {
    label: "Tier 4 — CI/CD & Actions",
    color: "var(--gq-conflict)",
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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full border border-gq-border bg-gq-surface px-3 py-1"
        >
          <Sparkles className="h-3.5 w-3.5 text-gq-committed" />
          <span className="text-[10px] font-mono text-gq-text-secondary">
            {state.completedLevelIds.length}/{levels.length} MISSIONS COMPLETE
          </span>
        </motion.div>
        <h2 className="text-2xl font-extrabold text-gq-text">Quest Map</h2>
        <p className="text-xs text-gq-text-muted max-w-md mx-auto">
          Complete missions to earn XP and badges. Each tier unlocks new Git superpowers.
        </p>
      </div>

      {/* Tiers with connecting line motif */}
      {tierOrder.map((difficulty, tierIdx) => {
        const tierLevels = getLevelsByDifficulty(difficulty);
        const config = tierConfig[difficulty];
        if (tierLevels.length === 0) return null;

        return (
          <motion.div
            key={difficulty}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: tierIdx * 0.08 }}
          >
            {/* Tier header */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-sm">{config.icon}</span>
              <span
                className="text-[10px] font-mono font-bold uppercase tracking-widest"
                style={{ color: config.color }}
              >
                {config.label}
              </span>
              <div
                className="flex-1 h-px"
                style={{ backgroundColor: `${config.color}20` }}
              />
            </div>

            {/* Level cards — connected path */}
            <div className="relative ml-4">
              {/* Connecting line */}
              <div
                className="absolute left-[15px] top-0 bottom-0 w-px"
                style={{ backgroundColor: `${config.color}20` }}
              />

              <div className="space-y-3">
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
                    (idx === 0 ||
                      state.completedLevelIds.includes(tierLevels[idx - 1].id));

                  return (
                    <motion.button
                      key={level.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: tierIdx * 0.08 + idx * 0.04,
                        duration: 0.25,
                      }}
                      onClick={() => !isLocked && onStartLevel(level.id)}
                      disabled={isLocked}
                    className={`relative flex items-center gap-4 w-full text-left rounded-xl p-4 transition-all gq-focus-ring ${
                      isLocked
                        ? "opacity-40 cursor-not-allowed"
                        : isNext
                        ? "hover:bg-gq-surface-raised cursor-pointer"
                        : isCompleted
                        ? "hover:bg-gq-surface-raised cursor-pointer"
                        : "hover:bg-gq-surface-raised cursor-pointer"
                    }`}
                    style={
                      isNext
                        ? { boxShadow: `inset 0 0 0 1px ${config.color}30` }
                        : undefined
                    }
                      aria-label={`${isCompleted ? "Completed: " : isLocked ? "Locked: " : ""}Level ${level.number}: ${level.title}`}
                    >
                      {/* Node on the path line */}
                      <div className="relative z-10 flex-shrink-0">
                        <div
                          className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono border ${
                            isCompleted
                              ? ""
                              : isLocked
                              ? "border-gq-border bg-gq-base text-gq-text-muted"
                              : isNext
                              ? "border-current"
                              : "border-gq-border bg-gq-base text-gq-text-secondary"
                          }`}
                          style={
                            isCompleted
                              ? {
                                  backgroundColor: `${config.color}15`,
                                  borderColor: `${config.color}30`,
                                  color: config.color,
                                }
                              : isNext
                              ? {
                                  backgroundColor: `${config.color}10`,
                                  borderColor: `${config.color}40`,
                                  color: config.color,
                                  boxShadow: `0 0 12px ${config.color}15`,
                                }
                              : undefined
                          }
                        >
                          {isCompleted ? (
                            <Check className="h-4 w-4" />
                          ) : isLocked ? (
                            <Lock className="h-3.5 w-3.5" />
                          ) : (
                            level.number
                          )}
                        </div>
                      </div>

                      {/* Level info */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-bold text-gq-text">
                          {level.title}
                        </h3>
                        <p className="text-[10px] text-gq-text-muted font-mono">
                          {level.subtitle}
                        </p>
                      </div>

                      {/* XP + arrow */}
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-[9px] font-mono text-gq-text-muted">
                          +{level.xpReward} XP
                        </span>
                        {!isLocked && (
                          <ChevronRight
                            className="h-4 w-4"
                            style={{ color: isNext ? config.color : "var(--gq-text-muted)" }}
                          />
                        )}
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
