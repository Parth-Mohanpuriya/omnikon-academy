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
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
        onClick={onDismiss}
        role="dialog"
        aria-modal="true"
        aria-label={`Level ${level.number}: ${level.title}`}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 30 }}
          className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#08080a] p-8 shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between mb-6">
            <div className="space-y-1">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Level {level.number} — {level.difficulty.replace("-", " ")}
              </span>
              <h2 className="text-2xl font-extrabold text-white">
                {level.title}
              </h2>
              <p className="text-sm text-zinc-400">{level.subtitle}</p>
            </div>
            <button
              onClick={onDismiss}
              className="text-zinc-500 hover:text-white transition-colors p-1"
              aria-label="Dismiss intro"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Story */}
          <div className="rounded-xl border border-white/5 bg-[#0a0a0c] p-5 mb-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-2 w-2 rounded-full bg-terminal-green animate-pulse" />
              <span className="text-[10px] font-mono text-terminal-green uppercase tracking-widest">
                Mission Brief
              </span>
            </div>
            <p className="text-sm text-zinc-300 leading-relaxed">
              {level.storyIntro}
            </p>
          </div>

          {/* Objective */}
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                Objective
              </span>
            </div>
            <p className="text-sm font-bold text-white">{level.objective}</p>
          </div>

          {/* XP reward */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-zinc-500">REWARD</span>
              <span className="text-sm font-mono font-bold text-terminal-green">
                +{level.xpReward} XP
              </span>
            </div>
            {level.badge && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono text-zinc-500">BADGE</span>
                <span className="text-sm">
                  {level.badge.icon}
                </span>
                <span className="text-[10px] text-zinc-400">
                  {level.badge.name}
                </span>
              </div>
            )}
          </div>

          {/* Start button */}
          <button
            onClick={onDismiss}
            className="glow-btn-green w-full flex items-center justify-center gap-2 rounded-lg py-3 text-sm font-bold text-white"
            style={{
              background: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
              boxShadow: "0 0 15px rgba(16, 185, 129, 0.15)",
              border: "1px solid rgba(16, 185, 129, 0.4)",
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
