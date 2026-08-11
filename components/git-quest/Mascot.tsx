"use client";

import { motion, AnimatePresence } from "framer-motion";

interface MascotProps {
  message?: string;
  visible: boolean;
}

export default function Mascot({ message, visible }: MascotProps) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 8, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
          className="flex items-start gap-3"
        >
          {/* Mascot: animated cursor */}
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="flex-shrink-0 w-8 h-8 rounded-lg bg-terminal-green/10 border border-terminal-green/20 flex items-center justify-center"
          >
            <span className="text-lg font-mono">&gt;$_</span>
          </motion.div>

          {message && (
            <div className="rounded-lg border border-white/10 bg-[#0a0a0c] px-3 py-2 max-w-xs">
              <p className="text-[11px] text-zinc-300 leading-relaxed">{message}</p>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
