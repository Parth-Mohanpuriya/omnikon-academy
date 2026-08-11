"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Trophy, Zap, ArrowRight, RotateCcw } from "lucide-react";
import type { Level, Badge } from "@/lib/git-quest/types";

interface CompletionModalProps {
  level: Level;
  xpEarned: number;
  badge?: Badge;
  onNextLevel: () => void;
  onReplay: () => void;
  isLastLevel: boolean;
}

export default function CompletionModal({
  level,
  xpEarned,
  badge,
  onNextLevel,
  onReplay,
  isLastLevel,
}: CompletionModalProps) {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-gq-base/80 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Level complete"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.97 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-md rounded-xl border border-gq-committed/20 bg-gq-surface p-8 shadow-2xl relative overflow-hidden"
        >
          {/* Top accent */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gq-committed/60 to-transparent" />

          <div className="relative text-center space-y-6">
            {/* Trophy — one orchestrated entrance */}
            <motion.div
              initial={{ scale: 0, rotate: -15 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
                delay: 0.15,
              }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gq-committed/10 border border-gq-committed/20"
            >
              <Trophy className="h-8 w-8 text-gq-committed" />
            </motion.div>

            {/* Text — staggered, not competing */}
            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
                className="text-2xl font-extrabold text-gq-text"
              >
                Mission Complete
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className="text-sm text-gq-text-secondary"
              >
                {level.completionMessage}
              </motion.p>
            </div>

            {/* XP earned */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.45 }}
              className="inline-flex items-center gap-2 rounded-full border border-gq-committed/20 bg-gq-committed/10 px-5 py-2"
            >
              <Zap className="h-4 w-4 text-gq-committed" />
              <span className="text-lg font-bold font-mono text-gq-committed">
                +{xpEarned} XP
              </span>
            </motion.div>

            {/* Badge — shown only if earned */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="inline-flex items-center gap-3 rounded-lg border border-gq-border bg-gq-base px-4 py-3"
              >
                <span className="text-xl">{badge.icon}</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-gq-text">{badge.name}</p>
                  <p className="text-[10px] text-gq-text-muted">{badge.description}</p>
                </div>
              </motion.div>
            )}

            {/* Actions — clear, not competing */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.65 }}
              className="flex gap-3 pt-2"
            >
              <button
                onClick={onReplay}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-gq-border bg-gq-base hover:bg-gq-surface-raised py-3 text-xs text-gq-text-secondary font-mono font-medium transition-colors gq-focus-ring"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Replay
              </button>
              {!isLastLevel && (
                <button
                  onClick={onNextLevel}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold text-gq-base font-mono transition-all hover:brightness-110 gq-focus-ring"
                  style={{ background: "var(--gq-committed)" }}
                >
                  Next Level
                  <ArrowRight className="h-3.5 w-3.5" />
                </button>
              )}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
