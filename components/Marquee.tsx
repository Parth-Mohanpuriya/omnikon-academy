"use client";

import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "BUILD. LEARN. INNOVATE.",
  "100% OPEN SOURCE FIRST",
  "REACT 19 SERVER COMPONENTS",
  "GO MICROSERVICES & gRPC",
  "DOCKER & KUBERNETES DEPLOYED",
  "GLOWING NEON BENTO GRIDS",
  "SYSTEM ARCHITECTURE MASTERED",
  "ACTIVE DEVELOPER COHORT 2026",
];

export default function Marquee() {
  // Double the items to make the infinite loop look seamless
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden border-y border-red-500/10 bg-[#060606] py-3.5 flex items-center">
      {/* Subtle glows on the sides for a fading effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-12 text-xs font-mono font-bold tracking-widest text-red-500/80"
        animate={{
          x: [0, -1000],
        }}
        transition={{
          ease: "linear",
          duration: 35,
          repeat: Infinity,
        }}
      >
        {duplicatedItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-4">
            <span>{item}</span>
            <span className="text-zinc-700 select-none">✦</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
