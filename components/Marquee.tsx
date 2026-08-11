"use client";

import { motion } from "framer-motion";

const MARQUEE_ITEMS = [
  "Build. Learn. Innovate.",
  "100% Open Source First",
  "React 19 Server Components",
  "Go Microservices & gRPC",
  "Docker & Kubernetes Deployed",
  "System Architecture Mastered",
  "Active Developer Cohort 2026",
  "Student-Driven Platform",
];

export default function Marquee() {
  // Double the items to make the infinite loop look seamless
  const duplicatedItems = [...MARQUEE_ITEMS, ...MARQUEE_ITEMS];

  return (
    <div className="relative w-full overflow-hidden border-y border-white/5 bg-[#060606] py-3.5 flex items-center">
      {/* Subtle glows on the sides for a fading effect */}
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030303] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030303] to-transparent z-10 pointer-events-none" />

      <motion.div
        className="flex whitespace-nowrap gap-12 text-xs tracking-widest text-zinc-500"
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
            <span className="text-zinc-700 select-none">&#x2726;</span>
          </div>
        ))}
      </motion.div>
    </div>
  );
}
