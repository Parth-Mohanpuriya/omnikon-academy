"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { GitState } from "@/lib/git-quest/types";
import { useGlassPointer } from "./useGlassPointer";

interface GitGraphProps {
  gitState: GitState;
}

const BRANCH_COLORS: Record<string, string> = {
  main: "var(--gq-branch-main)",
  feature: "var(--gq-branch-feature)",
};

function getBranchColor(branchName: string): string {
  if (BRANCH_COLORS[branchName]) return BRANCH_COLORS[branchName];
  const palette = ["var(--gq-branch-other)", "var(--gq-branch-feature)", "var(--gq-committed)"];
  let hash = 0;
  for (let i = 0; i < branchName.length; i++) {
    hash = branchName.charCodeAt(i) + ((hash << 5) - hash);
  }
  return palette[Math.abs(hash) % palette.length];
}

export default function GitGraph({ gitState }: GitGraphProps) {
  const { commits, branches, currentBranch, initialized } = gitState;
  const glass = useGlassPointer();

  if (!initialized) {
    return (
      <div className="gq-glass gq-glass-1 overflow-hidden" {...glass}>
        <div className="gq-glass-rim" />
        <div className="relative z-10 p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest">
              Commit Graph
            </span>
          </div>
          <div className="flex items-center justify-center h-24 text-xs text-gq-text-muted/60 font-mono">
            Initialize a repo to see the graph
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="gq-glass gq-glass-1 overflow-hidden" {...glass}>
      <div className="gq-glass-rim" />
      <div className="relative z-10 p-4">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest">
            Commit Graph
          </span>
          <div className="flex gap-1.5">
            {branches.map((b) => (
              <span
                key={b.name}
                className="text-[9px] font-mono px-2 py-0.5 rounded-full border"
                style={{
                  borderColor: `${getBranchColor(b.name)}30`,
                  backgroundColor: `${getBranchColor(b.name)}10`,
                  color: getBranchColor(b.name),
                }}
              >
                {b.name === currentBranch ? "● " : ""}
                {b.name}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-0" role="list" aria-label="Commit graph">
          <AnimatePresence>
            {[...commits].reverse().map((commit, idx) => {
              const branch = branches.find((b) => b.HEAD === commit.id);
              const isHead = branch?.name === currentBranch;
              const branchColor = getBranchColor(commit.branch);
              const nodeColor = isHead ? "var(--gq-committed)" : branchColor;
              const shortHash = commit.id.slice(0, 7);

              return (
                <motion.div
                  key={commit.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.06,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                  className="flex items-stretch gap-0"
                  role="listitem"
                >
                  {/* Graph column — node + connecting line */}
                  <div className="flex flex-col items-center w-8 flex-shrink-0">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 28,
                        delay: idx * 0.06 + 0.1,
                      }}
                      className="relative z-10 mt-1"
                    >
                      <div
                        className="w-3 h-3 rounded-full border-2"
                        style={{
                          backgroundColor: isHead ? nodeColor : "transparent",
                          borderColor: nodeColor,
                          boxShadow: isHead ? `0 0 8px ${nodeColor}60` : "none",
                        }}
                      />
                      {isHead && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: [1, 1.4, 1] }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className="absolute inset-0 rounded-full"
                          style={{ backgroundColor: `${nodeColor}20` }}
                        />
                      )}
                    </motion.div>

                    {idx < commits.length - 1 && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 24 }}
                        transition={{
                          duration: 0.3,
                          delay: idx * 0.06 + 0.15,
                          ease: "easeOut",
                        }}
                        className="w-px flex-1"
                        style={{ backgroundColor: `${branchColor}40` }}
                      />
                    )}
                  </div>

                  {/* Commit info */}
                  <div className="flex-1 min-w-0 py-1.5 pl-2 pr-1">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span
                        className="text-[10px] font-mono font-bold"
                        style={{ color: nodeColor }}
                      >
                        {shortHash}
                      </span>
                      {branch && (
                        <span
                          className="text-[8px] font-mono px-1.5 py-px rounded"
                          style={{
                            backgroundColor: `${getBranchColor(branch.name)}15`,
                            color: getBranchColor(branch.name),
                          }}
                        >
                          {branch.name}
                        </span>
                      )}
                      {isHead && (
                        <span className="text-[8px] font-mono px-1.5 py-px rounded bg-gq-committed/10 text-gq-committed">
                          HEAD
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-gq-text-secondary truncate leading-tight">
                      {commit.message}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>

          {commits.length === 0 && (
            <div className="flex items-center justify-center h-16 text-xs text-gq-text-muted/60 font-mono">
              No commits yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
