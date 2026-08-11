"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Bot } from "lucide-react";
import { useGlassPointer } from "./useGlassPointer";

interface MascotProps {
  message?: string;
}

export default function Mascot({ message }: MascotProps) {
  const glass = useGlassPointer();

  return (
    <div className="flex items-end gap-2">
      <div className="h-8 w-8 rounded-full bg-gq-surface border border-white/[0.06] flex items-center justify-center flex-shrink-0">
        <Bot className="h-4 w-4 text-gq-committed" />
      </div>

      <AnimatePresence mode="wait">
        {message && (
          <motion.div
            key={message}
            initial={{ opacity: 0, y: 6, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="gq-glass gq-glass-3 max-w-[260px] overflow-hidden"
            {...glass}
          >
            <div className="gq-glass-rim" />
            <div className="relative z-10 px-3.5 py-2.5">
              <p className="text-xs text-gq-text-secondary leading-relaxed">{message}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
