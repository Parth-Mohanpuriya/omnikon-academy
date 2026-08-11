"use client";

import { motion } from "framer-motion";
import { Check, Circle } from "lucide-react";
import type { Objective } from "@/lib/git-quest/types";

interface ObjectiveTrackerProps {
  objectives: Objective[];
  levelTitle: string;
}

export default function ObjectiveTracker({ objectives, levelTitle }: ObjectiveTrackerProps) {
  return (
    <div className="rounded-xl border border-white/10 bg-[#08080a] p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
          Objectives
        </span>
      </div>

      <div className="space-y-2" role="list" aria-label={`${levelTitle} objectives`}>
        {objectives.map((obj, idx) => (
          <motion.div
            key={obj.id}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`flex items-start gap-2.5 p-2 rounded-lg transition-colors ${
              obj.completed ? "bg-terminal-green/5" : ""
            }`}
            role="listitem"
          >
            {obj.completed ? (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 500 }}
                className="mt-0.5 h-4 w-4 rounded-full bg-terminal-green/20 flex items-center justify-center flex-shrink-0"
              >
                <Check className="h-3 w-3 text-terminal-green" />
              </motion.div>
            ) : (
              <Circle className="mt-0.5 h-4 w-4 text-zinc-600 flex-shrink-0" />
            )}

            <div className="flex-1 min-w-0">
              <p
                className={`text-xs ${
                  obj.completed ? "text-terminal-green line-through" : "text-zinc-300"
                }`}
              >
                {obj.description}
              </p>
              <p className="text-[9px] text-zinc-600 font-mono mt-0.5">
                {obj.commandPattern[0]}
              </p>
            </div>

            {obj.completed && (
              <motion.span
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-[9px] text-terminal-green font-mono"
              >
                DONE
              </motion.span>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
