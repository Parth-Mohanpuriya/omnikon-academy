"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Play } from "lucide-react";
import type { Level } from "@/lib/git-quest/types";

interface LevelIntroProps {
  level: Level;
  onDismiss: () => void;
}

export default function LevelIntro({ level, onDismiss }: LevelIntroProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gq-base/80 backdrop-blur-sm p-4"
        onClick={onDismiss}
        role="dialog"
        aria-modal="true"
        aria-label={`Level ${level.number}: ${level.title}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-lg rounded-xl border border-gq-border bg-gq-surface p-8 shadow-2xl relative overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Subtle top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gq-committed/40 to-transparent" />

          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest">
                Level {level.number} — {level.difficulty.replace("-", " ")}
              </span>
              <h2 className="text-2xl font-extrabold text-gq-text">
                {level.title}
              </h2>
              <p className="text-sm text-gq-text-secondary">{level.subtitle}</p>
            </div>
            <button
              onClick={onDismiss}
              className="text-gq-text-muted hover:text-gq-text transition-colors p-1 gq-focus-ring rounded"
              aria-label="Dismiss intro"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Story */}
          <div className="gq-panel-raised p-5 mb-6">
            <div className="flex items-center gap-2 mb-2.5">
              <div className="gq-dot gq-dot-committed" />
              <span className="text-[10px] font-mono text-gq-committed uppercase tracking-widest font-bold">
                Mission Brief
              </span>
            </div>
            <p className="text-sm text-gq-text-secondary leading-relaxed">
              {level.storyIntro}
            </p>
          </div>

          {/* Objective */}
          <div className="mb-6">
            <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest block mb-1.5">
              Objective
            </span>
            <p className="text-sm font-bold text-gq-text">{level.objective}</p>
          </div>

          {/* Reward */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gq-text-muted">REWARD</span>
              <span className="text-sm font-mono font-bold text-gq-committed">
                +{level.xpReward} XP
              </span>
            </div>
            {level.badge && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-gq-text-muted">BADGE</span>
                <span className="text-sm">{level.badge.icon}</span>
                <span className="text-[10px] text-gq-text-secondary font-mono">
                  {level.badge.name}
                </span>
              </div>
            )}
          </div>

          {/* Start button */}
          <button
            onClick={onDismiss}
            className="w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-gq-base font-mono gq-focus-ring transition-all hover:brightness-110"
            style={{
              background: "var(--gq-committed)",
            }}
          >
            <Play className="h-4 w-4" />
            Start Mission
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
