"use client";

import { motion } from "framer-motion";
import { Trophy, Zap, ArrowLeft } from "lucide-react";
import type { GameState } from "@/lib/git-quest/types";
import { getTotalXpForAllLevels } from "@/lib/git-quest/engine";
import { getLevelById, levels } from "@/lib/git-quest/levels";

interface ProgressHeaderProps {
  state: GameState;
  onBackToMap: () => void;
}

export default function ProgressHeader({ state, onBackToMap }: ProgressHeaderProps) {
  const totalPossibleXp = getTotalXpForAllLevels();
  const progressPercent = totalPossibleXp > 0 ? (state.totalXp / totalPossibleXp) * 100 : 0;
  const currentLevel = state.currentLevelId ? getLevelById(state.currentLevelId) : null;
  const completedCount = state.completedLevelIds.length;

  return (
    <div className="rounded-xl border border-white/10 bg-[#08080a] p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          {state.isLevelActive && (
            <button
              onClick={onBackToMap}
              className="text-zinc-500 hover:text-white transition-colors"
              aria-label="Back to level map"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
          )}
          <div>
            <h2 className="text-sm font-bold text-white">
              {currentLevel ? `${currentLevel.number}. ${currentLevel.title}` : "Git Quest"}
            </h2>
            {currentLevel && (
              <p className="text-[10px] text-zinc-500">{currentLevel.subtitle}</p>
            )}
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Badges */}
          {state.badges.length > 0 && (
            <div className="flex items-center gap-1">
              <Trophy className="h-3.5 w-3.5 text-yellow-500" />
              <span className="text-[10px] font-mono text-yellow-500">
                {state.badges.length}
              </span>
            </div>
          )}

          {/* XP */}
          <div className="flex items-center gap-1.5">
            <Zap className="h-3.5 w-3.5 text-terminal-green" />
            <span className="text-xs font-mono font-bold text-terminal-green">
              {state.totalXp}
            </span>
            <span className="text-[9px] text-zinc-600">XP</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 w-full rounded-full bg-zinc-900 border border-white/5 overflow-hidden">
        <motion.div
          className="h-full rounded-full bg-gradient-to-r from-terminal-green to-emerald-400"
          initial={{ width: 0 }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>

      <div className="flex justify-between mt-1.5">
        <span className="text-[9px] text-zinc-600">
          {completedCount}/{levels.length} levels
        </span>
        <span className="text-[9px] text-zinc-600">
          {Math.round(progressPercent)}%
        </span>
      </div>
    </div>
  );
}
