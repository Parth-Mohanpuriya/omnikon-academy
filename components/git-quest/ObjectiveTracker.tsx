"use client";

import { motion } from "framer-motion";
import { CheckCircle2, Circle } from "lucide-react";
import type { Objective } from "@/lib/git-quest/types";

interface ObjectiveTrackerProps {
  objectives: Objective[];
  levelTitle: string;
}

export default function ObjectiveTracker({ objectives, levelTitle }: ObjectiveTrackerProps) {
  const completedCount = objectives.filter((o) => o.completed).length;

  return (
    <div className="gq-panel p-4">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[10px] font-mono text-gq-text-muted uppercase tracking-widest">
          Objectives
        </span>
        <span className="text-[9px] font-mono text-gq-text-muted">
          {completedCount}/{objectives.length}
        </span>
      </div>

      <div className="space-y-1.5" role="list" aria-label={`${levelTitle} objectives`}>
        {objectives.map((obj, idx) => (
          <motion.div
            key={obj.id}
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.08, duration: 0.2 }}
            className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
              obj.completed ? "bg-gq-committed/5" : ""
            }`}
            role="listitem"
          >
            {obj.completed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500, damping: 25 }}
                className="mt-0.5 flex-shrink-0"
              >
                <CheckCircle2 className="h-4 w-4 text-gq-committed" />
              </motion.div>
            ) : (
              <Circle className="mt-0.5 h-4 w-4 text-gq-text-muted/40 flex-shrink-0" />
            )}

            <div className="flex-1 min-w-0">
              <p
                className={`text-xs leading-relaxed ${
                  obj.completed
                    ? "text-gq-committed line-through decoration-gq-committed/30"
                    : "text-gq-text"
                }`}
              >
                {obj.description}
              </p>
              <p className="text-[9px] text-gq-text-muted font-mono mt-0.5">
                {obj.commandPattern[0]}
              </p>
            </div>

            {obj.completed && (
              <motion.span
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[8px] text-gq-committed font-mono font-bold uppercase tracking-wider flex-shrink-0 mt-0.5"
              >
                Done
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
