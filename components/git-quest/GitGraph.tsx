"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GitState } from "@/lib/git-quest/types";

interface GitGraphProps {
  gitState: GitState;
}

export default function GitGraph({ gitState }: GitGraphProps) {
  const { commits, branches, currentBranch } = gitState;

  if (!gitState.initialized) {
    return (
      <div className="rounded-xl border border-white/10 bg-[#08080a] p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
            Git Graph
          </span>
        </div>
        <div className="flex items-center justify-center h-24 text-xs text-zinc-600">
          Initialize a repo to see the graph
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-white/10 bg-[#08080a] p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Git Graph
        </span>
        <div className="flex gap-1.5">
          {branches.map((b) => (
            <span
              key={b.name}
              className={`text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                b.name === currentBranch
                  ? "border-terminal-green/30 bg-terminal-green/10 text-terminal-green"
                  : "border-white/10 bg-white/5 text-zinc-500"
              }`}
            >
              {b.name === currentBranch ? "● " : ""}{b.name}
            </span>
          ))}
        </div>
      </div>

      <div className="space-y-1" role="list" aria-label="Commit graph">
        <AnimatePresence>
          {[...commits].reverse().map((commit, idx) => {
            const branch = branches.find((b) => b.HEAD === commit.id);
            const isHead = branch?.name === currentBranch;
            return (
              <motion.div
                key={commit.id}
                initial={{ opacity: 0, x: -12, height: 0 }}
                animate={{ opacity: 1, x: 0, height: "auto" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className="flex items-center gap-3 py-1.5"
                role="listitem"
              >
                {/* Graph node */}
                <div className="flex flex-col items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 500, damping: 25, delay: idx * 0.08 }}
                    className={`w-3 h-3 rounded-full border-2 ${
                      isHead
                        ? "bg-terminal-green border-terminal-green/50 shadow-[0_0_8px_rgba(16,185,129,0.4)]"
                        : "bg-violet-500/80 border-violet-400/30"
                    }`}
                  />
                  {idx < commits.length - 1 && (
                    <motion.div
                      initial={{ height: 0 }}
                      animate={{ height: 16 }}
                      transition={{ duration: 0.3, delay: idx * 0.08 + 0.2 }}
                      className={`w-px ${
                        isHead ? "bg-terminal-green/30" : "bg-violet-500/30"
                      }`}
                    />
                  )}
                </div>

                {/* Commit info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-zinc-600">
                      {commit.id}
                    </span>
                    {branch && (
                      <span className={`text-[8px] font-mono px-1.5 py-0.5 rounded ${
                        branch.name === currentBranch
                          ? "bg-terminal-green/10 text-terminal-green"
                          : "bg-violet-500/10 text-violet-400"
                      }`}>
                        {branch.name}
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-zinc-300 truncate">
                    {commit.message}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {commits.length === 0 && (
          <div className="flex items-center justify-center h-16 text-xs text-zinc-600">
            No commits yet
          </div>
        )}
      </div>
    </div>
  );
}
