"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GitPullRequest, CheckCircle, Clock, Play, Loader2 } from "lucide-react";

interface MockGitHubUIProps {
  levelId: string;
}

function MockRepoView() {
  return (
    <div className="rounded-xl border border-white/10 bg-[#08080a] overflow-hidden">
      {/* Repo header */}
      <div className="border-b border-white/5 bg-[#0a0a0c] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-zinc-400">user</span>
          <span className="text-zinc-600">/</span>
          <span className="text-xs font-bold text-white">awesome-project</span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-white/5 text-zinc-500 border border-white/10">
            public
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-white/5 px-4">
        {["Code", "Issues", "Pull requests", "Actions"].map((tab) => (
          <span
            key={tab}
            className={`text-[10px] px-3 py-2 border-b-2 ${
              tab === "Code"
                ? "border-red-500 text-white"
                : "border-transparent text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* File list */}
      <div className="p-3 space-y-1 font-mono text-[10px]">
        {[
          { name: ".github/", icon: "📁", color: "text-zinc-400" },
          { name: "app.js", icon: "📄", color: "text-zinc-300" },
          { name: "package.json", icon: "📦", color: "text-zinc-300" },
          { name: ".gitignore", icon: "📄", color: "text-emerald-400" },
        ].map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5"
          >
            <span>{file.icon}</span>
            <span className={file.color}>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockPRView() {
  return (
    <div className="rounded-xl border border-red-500/20 bg-[#08080a] overflow-hidden">
      {/* PR Header */}
      <div className="border-b border-white/5 bg-[#0a0a0c] px-4 py-3">
        <div className="flex items-center gap-2">
          <GitPullRequest className="h-4 w-4 text-emerald-400" />
          <span className="text-xs font-bold text-white">
            feat: add new feature
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
            MERGED
          </span>
        </div>
        <p className="text-[10px] text-zinc-500 mt-1">
          #1 merged 3 commits into main from feature
        </p>
      </div>

      {/* Diff summary */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4 text-[10px]">
          <span className="text-emerald-400">+42 additions</span>
          <span className="text-red-400">-8 deletions</span>
          <span className="text-zinc-500">3 files changed</span>
        </div>

        <div className="rounded-lg border border-white/5 bg-[#09090b] p-3 font-mono text-[10px] space-y-1">
          <div className="flex items-center gap-2 text-zinc-500">
            <span>@@ -1,5 +1,12 @@</span>
          </div>
          <div className="text-emerald-400">+  import &#123; useState &#125; from &apos;react&apos;;</div>
          <div className="text-emerald-400">+  import &#123; motion &#125; from &apos;framer-motion&apos;;</div>
          <div className="text-red-400">-  const x = 0;</div>
          <div className="text-white">   function App() &#123;</div>
          <div className="text-emerald-400">+    return &lt;div&gt;Hello&lt;/div&gt;</div>
          <div className="text-white">   &#125;</div>
        </div>

        {/* Review status */}
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-emerald-400" />
          <span className="text-[10px] text-emerald-400">2 approvals</span>
          <Clock className="h-4 w-4 text-zinc-500 ml-2" />
          <span className="text-[10px] text-zinc-500">All checks passed</span>
        </div>
      </div>
    </div>
  );
}

function MockActionsView({ isRunning }: { isRunning: boolean }) {
  const steps = [
    { name: "Set up job", status: isRunning ? "done" : "pending", time: "2s" },
    { name: "Checkout repository", status: isRunning ? "done" : "pending", time: "1s" },
    { name: "Setup Node.js", status: isRunning ? "done" : "pending", time: "8s" },
    { name: "Install dependencies", status: isRunning ? "done" : "pending", time: "15s" },
    { name: "Run tests", status: isRunning ? "done" : "pending", time: "23s" },
    { name: "Build project", status: isRunning ? "done" : "pending", time: "12s" },
  ];

  return (
    <div className="rounded-xl border border-white/10 bg-[#08080a] overflow-hidden">
      {/* Actions header */}
      <div className="border-b border-white/5 bg-[#0a0a0c] px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-terminal-green" />
            <span className="text-xs font-bold text-white">
              CI — Workflow Run #42
            </span>
          </div>
          {isRunning ? (
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-amber-400">
              <Loader2 className="h-3 w-3 animate-spin" />
              RUNNING
            </span>
          ) : (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              SUCCESS
            </span>
          )}
        </div>
      </div>

      {/* Steps */}
      <div className="p-3 space-y-1">
        <AnimatePresence>
          {steps.map((step, idx) => (
            <motion.div
              key={step.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.15 }}
              className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-white/5 font-mono text-[10px]"
            >
              <div className="flex items-center gap-2">
                {step.status === "done" ? (
                  <CheckCircle className="h-3.5 w-3.5 text-terminal-green" />
                ) : step.status === "running" ? (
                  <Loader2 className="h-3.5 w-3.5 text-amber-400 animate-spin" />
                ) : (
                  <Clock className="h-3.5 w-3.5 text-zinc-600" />
                )}
                <span
                  className={
                    step.status === "done"
                      ? "text-zinc-300"
                      : step.status === "running"
                      ? "text-amber-400"
                      : "text-zinc-500"
                  }
                >
                  {step.name}
                </span>
              </div>
              <span className="text-zinc-600">{step.time}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function MockGitHubUI({ levelId }: MockGitHubUIProps) {
  switch (levelId) {
    case "pr-flow":
      return <MockPRView />;
    case "actions-intro":
    case "actions-run":
      return <MockActionsView isRunning={levelId === "actions-run"} />;
    case "push":
    case "gitignore":
      return <MockRepoView />;
    default:
      return null;
  }
}
