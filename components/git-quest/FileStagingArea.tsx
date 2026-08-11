"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import type { GitFile } from "@/lib/git-quest/types";

interface FileStagingAreaProps {
  files: GitFile[];
  stagingArea: GitFile[];
}

function FileCard({ file, color }: { file: GitFile; color: string }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9, x: 8 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      className="flex items-center gap-2 px-2.5 py-1.5 rounded border text-[10px] font-mono"
      style={{
        borderColor: `${color}25`,
        backgroundColor: `${color}08`,
        color,
      }}
    >
      <span className="opacity-60">
        {file.status === "untracked" && "○"}
        {file.status === "staged" && "◉"}
        {file.status === "committed" && "●"}
        {file.status === "modified" && "◐"}
      </span>
      <span className="truncate">{file.name}</span>
    </motion.div>
  );
}

export default function FileStagingArea({ files, stagingArea }: FileStagingAreaProps) {
  const untracked = files.filter((f) => f.status === "untracked");
  const staged =
    stagingArea.length > 0 ? stagingArea : files.filter((f) => f.status === "staged");
  const committed = files.filter((f) => f.status === "committed");

  const columns = [
    {
      label: "Workspace",
      items: untracked,
      color: "var(--gq-text-secondary)",
      emptyText: "No untracked files",
    },
    {
      label: "Staging",
      items: staged,
      color: "var(--gq-staged)",
      emptyText: "No staged files",
    },
    {
      label: "Repository",
      items: committed,
      color: "var(--gq-committed)",
      emptyText: "No commits yet",
    },
  ];

  return (
    <div className="gq-panel p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest">
          File State
        </span>
      </div>

      {/* Desktop: 3-column with arrows */}
      <div className="hidden sm:grid sm:grid-cols-5 gap-2 items-start">
        {columns.map((col, colIdx) => (
          <div key={col.label} className={`${colIdx < 2 ? "col-span-2" : "col-span-1"}`}>
            {/* Column header */}
            <div className="flex items-center gap-1.5 mb-2">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: col.color }}
              />
              <span
                className="text-[9px] font-mono font-bold uppercase tracking-wider"
                style={{ color: col.color }}
              >
                {col.label}
              </span>
            </div>

            {/* File cards */}
            <div
              className="rounded-lg border p-2 min-h-[52px] space-y-1.5"
              style={{
                borderColor: `${col.color}15`,
                backgroundColor: `${col.color}05`,
              }}
            >
              <AnimatePresence mode="popLayout">
                {col.items.map((file) => (
                  <FileCard
                    key={`${col.label}-${file.name}`}
                    file={file}
                    color={col.color}
                  />
                ))}
              </AnimatePresence>
              {col.items.length === 0 && (
                <span className="text-[9px] font-mono block text-center py-2" style={{ color: `${col.color}50` }}>
                  {col.emptyText}
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Directional arrows between columns */}
        <div className="col-span-5 flex justify-center gap-8 -mt-1">
          <div className="flex items-center gap-1 text-gq-text-muted/40">
            <ArrowRight className="h-3 w-3" />
            <span className="text-[8px] font-mono">add</span>
          </div>
          <div className="flex items-center gap-1 text-gq-text-muted/40">
            <ArrowRight className="h-3 w-3" />
            <span className="text-[8px] font-mono">commit</span>
          </div>
        </div>
      </div>

      {/* Mobile: stacked layout */}
      <div className="sm:hidden space-y-3">
        {columns.map((col) => (
          <div key={col.label}>
            <div className="flex items-center gap-1.5 mb-1.5">
              <div
                className="w-1.5 h-1.5 rounded-full"
                style={{ backgroundColor: col.color }}
              />
              <span
                className="text-[9px] font-mono font-bold uppercase tracking-wider"
                style={{ color: col.color }}
              >
                {col.label}
              </span>
              <span className="text-[9px] font-mono text-gq-text-muted">
                ({col.items.length})
              </span>
            </div>
            <div
              className="rounded-lg border p-2 min-h-[36px] flex flex-wrap gap-1.5"
              style={{
                borderColor: `${col.color}15`,
                backgroundColor: `${col.color}05`,
              }}
            >
              <AnimatePresence mode="popLayout">
                {col.items.map((file) => (
                  <FileCard
                    key={`${col.label}-${file.name}`}
                    file={file}
                    color={col.color}
                  />
                ))}
              </AnimatePresence>
              {col.items.length === 0 && (
                <span className="text-[9px] font-mono text-gq-text-muted/40 py-1">
                  {col.emptyText}
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
