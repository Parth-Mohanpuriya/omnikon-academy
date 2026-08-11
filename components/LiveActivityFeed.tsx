"use client";

import { useEffect, useState } from "react";
import { mockActivities, Activity } from "@/lib/mock-data";
import { Terminal, GitPullRequest, GitCommit, CheckCircle, PlusCircle, Activity as ActivityIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>(mockActivities);

  // Simulate periodic new activities (appending/rotating them to look alive)
  useEffect(() => {
    const interval = setInterval(() => {
      setActivities((prev) => {
        // Rotate the array (put first at the end, or similar)
        const next = [...prev];
        const first = next.shift();
        if (first) {
          // Slightly randomize timestamp or action
          const updatedFirst = {
            ...first,
            id: `act-${Date.now()}`,
            time: "just now"
          };
          return [...next, updatedFirst];
        }
        return prev;
      });
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: Activity['type']) => {
    switch (type) {
      case "commit":
        return <GitCommit className="h-4 w-4 text-red-500" />;
      case "lesson":
        return <CheckCircle className="h-4 w-4 text-emerald-500" />;
      case "enroll":
        return <PlusCircle className="h-4 w-4 text-blue-500" />;
      default:
        return <GitPullRequest className="h-4 w-4 text-purple-500" />;
    }
  };

  return (
    <div className="w-full rounded-xl border border-white/5 bg-[#060606] shadow-xl overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0a0a0c] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <ActivityIcon className="h-4 w-4 text-zinc-500" />
          <span className="text-xs font-medium text-zinc-300 tracking-wider">LIVE FEED</span>
        </div>
        <div className="flex gap-1.5">
          <span className="h-2 w-2 rounded-full bg-zinc-800" />
          <span className="h-2 w-2 rounded-full bg-zinc-800" />
          <span className="h-2 w-2 rounded-full bg-emerald-500/80 animate-pulse" />
        </div>
      </div>

      {/* Activity List */}
      <div className="p-4 max-h-[360px] overflow-y-auto space-y-3.5 scrollbar-thin">
        <AnimatePresence initial={false}>
          {activities.map((act, index) => (
            <motion.div
              key={act.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="flex items-start justify-between gap-3 text-xs leading-relaxed border-b border-white/5 pb-3 last:border-0 last:pb-0 group"
            >
              <div className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 items-center justify-center rounded bg-white/5 border border-white/10 group-hover:border-white/10 transition-colors">
                  {getIcon(act.type)}
                </span>
                <div>
                  <span className="text-zinc-300 hover:underline cursor-pointer font-medium mr-1.5">
                    {act.username}
                  </span>
                  <span className="text-zinc-400">
                    {act.action}
                  </span>
                  <span className="text-white font-medium ml-1.5">
                    {act.target}
                  </span>
                </div>
              </div>
              <span className="text-zinc-600 whitespace-nowrap text-[10px]">
                {act.time}
              </span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
