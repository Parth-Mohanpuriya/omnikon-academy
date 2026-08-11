"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, GitPullRequest } from "lucide-react";
import type { GitFile } from "@/lib/git-quest/types";
import { useGlassPointer } from "./useGlassPointer";

interface MockGitHubUIProps {
  currentBranch: string;
  stagedFiles: GitFile[];
  committedFiles: GitFile[];
}

export default function MockGitHubUI({
  currentBranch,
  stagedFiles,
  committedFiles,
}: MockGitHubUIProps) {
  const glass = useGlassPointer();
  const changedFiles = [...stagedFiles, ...committedFiles];

  return (
    <div className="gq-glass gq-glass-1 overflow-hidden" {...glass}>
      <div className="gq-glass-rim" />
      <div className="relative z-10 p-4">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest">
            GitHub
          </span>
        </div>

        {/* Branch indicator */}
        <div className="gq-glass gq-glass-1 rounded-lg p-2.5 mb-3 overflow-hidden" {...glass}>
          <div className="gq-glass-rim" />
          <div className="relative z-10 flex items-center gap-2">
            <GitBranch className="h-3.5 w-3.5 text-gq-branch-feature" />
            <span className="text-xs font-mono font-bold text-gq-text">
              {currentBranch}
            </span>
            <span className="text-[9px] text-gq-text-muted font-mono ml-auto">
              active
            </span>
          </div>
        </div>

        {/* Changed files */}
        {changedFiles.length > 0 && (
          <div className="gq-glass gq-glass-1 rounded-lg overflow-hidden" {...glass}>
            <div className="gq-glass-rim" />
            <div className="relative z-10">
              <div className="px-3 py-2 border-b border-white/[0.04]">
                <span className="text-[9px] font-mono text-gq-text-muted">
                  {changedFiles.length} changed file{changedFiles.length !== 1 && "s"}
                </span>
              </div>
              <div className="divide-y divide-white/[0.03]">
                <AnimatePresence mode="popLayout">
                  {changedFiles.slice(0, 6).map((file) => (
                    <motion.div
                      key={file.name}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="px-3 py-1.5 flex items-center gap-2"
                    >
                      <div
                        className={`w-1.5 h-1.5 rounded-full ${
                          file.status === "staged"
                            ? "bg-gq-staged"
                            : file.status === "committed"
                              ? "bg-gq-committed"
                              : "bg-gq-text-muted"
                        }`}
                      />
                      <span className="text-[10px] font-mono text-gq-text-secondary truncate">
                        {file.name}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
                {changedFiles.length > 6 && (
                  <div className="px-3 py-1.5">
                    <span className="text-[9px] text-gq-text-muted font-mono">
                      +{changedFiles.length - 6} more
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* PR hint */}
        <div className="mt-3 flex items-center gap-2 text-gq-text-muted/40">
          <GitPullRequest className="h-3 w-3" />
          <span className="text-[9px] font-mono">
            Open a pull request when ready
          </span>
        </div>
      </div>
    </div>
  );
}
