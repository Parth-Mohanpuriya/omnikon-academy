"use client";

import { motion } from "framer-motion";
import { Lock, CheckCircle2 } from "lucide-react";
import { levels } from "@/lib/git-quest/levels";
import type { GameState } from "@/lib/git-quest/types";
import { useGlassPointer } from "./useGlassPointer";

interface LevelMapProps {
  state: GameState;
  onSelectLevel: (levelId: string) => void;
}

function getTier(levelNumber: number): number {
  if (levelNumber <= 3) return 1;
  if (levelNumber <= 6) return 2;
  if (levelNumber <= 9) return 3;
  return 4;
}

const tierNames: Record<number, string> = {
  1: "Foundations",
  2: "Branching",
  3: "Collaboration",
  4: "CI/CD Mastery",
};

export default function LevelMap({ state, onSelectLevel }: LevelMapProps) {
  const glass = useGlassPointer();

  const tiers = [1, 2, 3, 4].map((tierNum) => ({
    number: tierNum,
    name: tierNames[tierNum],
    levels: levels.filter((l) => getTier(l.number) === tierNum),
  }));

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-extrabold text-gq-text">Git Quest</h1>
        <p className="text-sm text-gq-text-secondary max-w-md mx-auto">
          Master Git & GitHub Actions through interactive missions. Learn by doing.
        </p>
      </div>

      {tiers.map((tier) => {
        const allPrevCompleted =
          tier.number === 1 ||
          tiers
            .filter((t) => t.number < tier.number)
            .every((t) =>
              t.levels.every((l) => state.completedLevelIds.includes(l.id))
            );

        return (
          <div key={tier.number}>
            <div className="flex items-center gap-3 mb-3">
              <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest">
                Tier {tier.number}
              </span>
              <span className="text-[10px] text-gq-text-muted">—</span>
              <span className="text-[10px] font-mono text-gq-text-secondary font-bold uppercase tracking-wider">
                {tier.name}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {tier.levels.map((level) => {
                const isCompleted = state.completedLevelIds.includes(level.id);
                const isUnlocked = allPrevCompleted;
                const isActive = state.currentLevelId === level.id;

                return (
                  <div
                    key={level.id}
                    className={`gq-glass gq-glass-1 overflow-hidden transition-all ${
                      isUnlocked
                        ? "hover:border-gq-committed/40 cursor-pointer"
                        : "opacity-40 cursor-not-allowed"
                    } ${isActive ? "border-gq-committed/40" : ""}`}
                    {...(isUnlocked ? glass : {})}
                  >
                    <div className="gq-glass-rim" />
                    <button
                      onClick={() => onSelectLevel(level.id)}
                      disabled={!isUnlocked}
                      className="relative z-10 w-full text-left p-4"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span className="text-[10px] font-mono text-gq-text-muted">
                          Level {level.number}
                        </span>
                        {isCompleted && (
                          <CheckCircle2 className="h-4 w-4 text-gq-committed flex-shrink-0" />
                        )}
                        {!isUnlocked && (
                          <Lock className="h-3.5 w-3.5 text-gq-text-muted/40 flex-shrink-0" />
                        )}
                      </div>
                      <h3 className="text-sm font-bold text-gq-text mb-0.5">
                        {level.title}
                      </h3>
                      <p className="text-[11px] text-gq-text-muted leading-snug">
                        {level.subtitle}
                      </p>
                      <div className="flex items-center gap-3 mt-2.5">
                        <span className="text-[9px] font-mono text-gq-committed">
                          +{level.xpReward} XP
                        </span>
                        <span className="text-[9px] font-mono text-gq-text-muted">
                          {level.difficulty.replace("-", " ")}
                        </span>
                      </div>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
