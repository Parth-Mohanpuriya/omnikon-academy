"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, ArrowLeft } from "lucide-react";
import type { GameState } from "@/lib/git-quest/types";
import { getLevelById, levels } from "@/lib/git-quest/levels";
import { getTotalXpForAllLevels } from "@/lib/git-quest/engine";
import { useGlassPointer } from "./useGlassPointer";

interface ProgressHeaderProps {
  state: GameState;
  onBackToMap: () => void;
}

export default function ProgressHeader({ state, onBackToMap }: ProgressHeaderProps) {
  const glass = useGlassPointer();
  const totalPossibleXp = getTotalXpForAllLevels();
  const progressPercent = totalPossibleXp > 0 ? (state.totalXp / totalPossibleXp) * 100 : 0;
  const currentLevel = state.currentLevelId ? getLevelById(state.currentLevelId) : null;
  const completedCount = state.completedLevelIds.length;

  return (
    <div className="gq-glass gq-glass-2 overflow-hidden" {...glass}>
      <div className="gq-glass-rim" />
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            {state.isLevelActive && (
              <button
                onClick={onBackToMap}
                className="text-gq-text-muted hover:text-gq-text transition-colors gq-focus-ring rounded"
                aria-label="Back to level map"
              >
                <ArrowLeft className="h-4 w-4" />
              </button>
            )}
            <div>
              <h2 className="text-sm font-bold text-gq-text">
                {currentLevel
                  ? `${currentLevel.number}. ${currentLevel.title}`
                  : "Git Quest"}
              </h2>
              {currentLevel && (
                <p className="text-[10px] text-gq-text-muted font-mono">
                  {currentLevel.subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-4">
            {state.badges.length > 0 && (
              <div className="flex items-center gap-1.5">
                <Trophy className="h-3.5 w-3.5 text-gq-staged" />
                <span className="text-[10px] font-mono font-bold text-gq-staged">
                  {state.badges.length}
                </span>
              </div>
            )}
            <div className="flex items-center gap-1.5">
              <Zap className="h-3.5 w-3.5 text-gq-committed" />
              <span className="text-xs font-mono font-bold text-gq-committed">
                {state.totalXp}
              </span>
              <span className="text-[9px] text-gq-text-muted font-mono">XP</span>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 w-full rounded-full overflow-hidden" style={{ backgroundColor: "rgba(10,15,26,0.6)" }}>
          <motion.div
            className="h-full rounded-full"
            style={{
              background:
                "linear-gradient(90deg, var(--gq-committed), var(--gq-branch-feature))",
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>

        <div className="flex justify-between mt-1.5">
          <span className="text-[9px] text-gq-text-muted font-mono">
            {completedCount}/{levels.length} levels
          </span>
          <span className="text-[9px] text-gq-text-muted font-mono">
            {Math.round(progressPercent)}%
          </span>
        </div>
      </div>
    </div>
  );
}
