"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MascotProps {
  message?: string;
  visible: boolean;
  state?: "idle" | "thinking" | "celebrating";
}

export default function Mascot({ message, visible, state = "idle" }: MascotProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-start gap-3"
        >
          {/* Mascot icon — personality through motion */}
          <motion.div
            animate={
              state === "thinking"
                ? { rotate: [0, -5, 5, -5, 0], transition: { duration: 0.5, repeat: Infinity } }
                : state === "celebrating"
                ? { y: [0, -6, 0], scale: [1, 1.1, 1], transition: { duration: 0.4, repeat: 2 } }
                : { y: [0, -2, 0], transition: { duration: 2, repeat: Infinity, ease: "easeInOut" } }
            }
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-gq-committed/10 border border-gq-committed/20 flex items-center justify-center"
          >
            <span className="text-sm font-mono font-bold text-gq-committed select-none">
              &gt;$_
            </span>
          </motion.div>

          {/* Speech bubble — uses sans font, clearly coaching */}
          {message && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="relative rounded-lg border border-gq-border bg-gq-surface px-3.5 py-2.5 max-w-xs"
            >
              {/* Tail */}
              <div className="absolute left-0 top-3 -translate-x-1 w-2 h-2 rotate-45 border-l border-b border-gq-border bg-gq-surface" />
              <p className="text-xs text-gq-text-secondary leading-relaxed font-sans relative z-10">
                {message}
              </p>
            </motion.div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
