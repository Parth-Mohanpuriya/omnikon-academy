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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        role="dialog"
        aria-modal="true"
        aria-label="Level complete"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-md rounded-2xl border border-terminal-green/20 bg-[#08080a] p-8 shadow-2xl"
        >
          {/* Confetti-like glow */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-terminal-green/5 to-transparent pointer-events-none" />

          <div className="relative text-center space-y-6">
            {/* Trophy */}
            <motion.div
              initial={{ scale: 0, rotate: -20 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
              className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-terminal-green/10 border border-terminal-green/20"
            >
              <Trophy className="h-8 w-8 text-terminal-green" />
            </motion.div>

            <div className="space-y-2">
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl font-extrabold text-white"
              >
                Mission Complete!
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-sm text-zinc-400"
              >
                {level.completionMessage}
              </motion.p>
            </div>

            {/* XP earned */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-terminal-green/20 bg-terminal-green/10 px-4 py-2"
            >
              <Zap className="h-4 w-4 text-terminal-green" />
              <span className="text-lg font-bold font-mono text-terminal-green">
                +{xpEarned} XP
              </span>
            </motion.div>

            {/* Badge */}
            {badge && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-4 py-2"
              >
                <span className="text-xl">{badge.icon}</span>
                <div className="text-left">
                  <p className="text-xs font-bold text-white">{badge.name}</p>
                  <p className="text-[10px] text-zinc-500">{badge.description}</p>
                </div>
              </motion.div>
            )}

            {/* Actions */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="flex gap-3 pt-2"
            >
              <button
                onClick={onReplay}
                className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#0e0e11] hover:bg-white/5 py-3 text-xs text-zinc-300 font-medium transition-colors"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                Replay
              </button>
              {!isLastLevel && (
                <button
                  onClick={onNextLevel}
                  className="flex-1 flex items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold text-white transition-colors"
                  style={{
                    background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
                    boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)",
                    border: "1px solid rgba(16, 185, 129, 0.4)",
                  }}
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
