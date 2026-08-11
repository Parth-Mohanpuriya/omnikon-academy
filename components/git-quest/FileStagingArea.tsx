"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GitFile } from "@/lib/git-quest/types";

interface FileStagingAreaProps {
  files: GitFile[];
  stagingArea: GitFile[];
}

export default function FileStagingArea({ files, stagingArea }: FileStagingAreaProps) {
  const untracked = files.filter((f) => f.status === "untracked");
  const staged = stagingArea.length > 0 ? stagingArea : files.filter((f) => f.status === "staged");
  const committed = files.filter((f) => f.status === "committed");

  return (
    <div className="rounded-xl border border-white/10 bg-[#08080a] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Working Directory
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Working directory */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-zinc-500 uppercase">
            Workspace
          </span>
          <div className="rounded-lg border border-white/5 bg-[#0a0a0c] p-2 min-h-[48px]">
            <AnimatePresence>
              {untracked.map((file) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  className="text-[10px] font-mono text-zinc-400 py-0.5"
                >
                  📄 {file.name}
                </motion.div>
              ))}
              {committed.map((file) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.4 }}
                  className="text-[10px] font-mono text-zinc-600 py-0.5"
                >
                  ✓ {file.name}
                </motion.div>
              ))}
            </AnimatePresence>
            {untracked.length === 0 && committed.length === 0 && (
              <span className="text-[9px] text-zinc-700">Empty</span>
            )}
          </div>
        </div>

        {/* Staging area */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-amber-500 uppercase">
            Staging Area
          </span>
          <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-2 min-h-[48px]">
            <AnimatePresence>
              {staged.map((file) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-[10px] font-mono text-amber-400 py-0.5"
                >
                  📦 {file.name}
                </motion.div>
              ))}
            </AnimatePresence>
            {staged.length === 0 && (
              <span className="text-[9px] text-amber-500/30">No staged files</span>
            )}
          </div>
        </div>

        {/* Repository */}
        <div className="space-y-1.5">
          <span className="text-[9px] font-mono text-terminal-green uppercase">
            Repository
          </span>
          <div className="rounded-lg border border-terminal-green/20 bg-terminal-green/5 p-2 min-h-[48px]">
            <AnimatePresence>
              {committed.map((file) => (
                <motion.div
                  key={file.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-[10px] font-mono text-terminal-green py-0.5"
                >
                  💾 {file.name}
                </motion.div>
              ))}
            </AnimatePresence>
            {committed.length === 0 && (
              <span className="text-[9px] text-terminal-green/30">No commits yet</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
