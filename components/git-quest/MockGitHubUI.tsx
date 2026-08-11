"use client";

import { motion, AnimatePresence } from "framer-motion";
import { GitPullRequest, CheckCircle2, Clock, CircleDashed, Play, Loader2 } from "lucide-react";

interface MockGitHubUIProps {
  levelId: string;
}

function MockRepoView() {
  return (
    <div className="gq-panel overflow-hidden">
      {/* Repo header */}
      <div className="border-b border-gq-border bg-gq-base px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="text-xs text-gq-text-muted font-mono">user</span>
          <span className="text-gq-text-muted/40">/</span>
          <span className="text-xs font-bold text-gq-text font-mono">awesome-project</span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded border border-gq-border text-gq-text-muted">
            public
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-0 border-b border-gq-border px-4">
        {["Code", "Issues", "Pull requests", "Actions"].map((tab) => (
          <span
            key={tab}
            className={`text-[10px] px-3 py-2 border-b-2 font-mono ${
              tab === "Code"
                ? "border-gq-committed text-gq-text"
                : "border-transparent text-gq-text-muted hover:text-gq-text-secondary"
            }`}
          >
            {tab}
          </span>
        ))}
      </div>

      {/* File list */}
      <div className="p-3 space-y-1 font-mono text-[10px]">
        {[
          { name: ".github/", icon: "📁", color: "var(--gq-text-muted)" },
          { name: "app.js", icon: "📄", color: "var(--gq-text-secondary)" },
          { name: "package.json", icon: "📦", color: "var(--gq-text-secondary)" },
          { name: ".gitignore", icon: "📄", color: "var(--gq-committed)" },
        ].map((file) => (
          <div
            key={file.name}
            className="flex items-center gap-2 py-1.5 px-2 rounded hover:bg-gq-surface-raised transition-colors"
          >
            <span>{file.icon}</span>
            <span style={{ color: file.color }}>{file.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function MockPRView() {
  return (
    <div className="gq-panel overflow-hidden">
      {/* PR Header */}
      <div className="border-b border-gq-border bg-gq-base px-4 py-3">
        <div className="flex items-center gap-2 flex-wrap">
          <GitPullRequest className="h-4 w-4 text-gq-committed flex-shrink-0" />
          <span className="text-xs font-bold text-gq-text font-mono">
            feat: add new feature
          </span>
          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gq-committed/10 text-gq-committed border border-gq-committed/20">
            MERGED
          </span>
        </div>
        <p className="text-[10px] text-gq-text-muted mt-1 font-mono">
          #1 merged 3 commits into main from feature
        </p>
      </div>

      {/* Diff summary */}
      <div className="p-4 space-y-3">
        <div className="flex items-center gap-4 text-[10px] font-mono">
          <span className="text-gq-committed">+42 additions</span>
          <span className="text-gq-conflict">-8 deletions</span>
          <span className="text-gq-text-muted">3 files changed</span>
        </div>

        {/* Diff view — desaturated, not garish */}
        <div className="rounded-lg border border-gq-border bg-gq-base p-3 font-mono text-[10px] space-y-0.5">
          <div className="text-gq-text-muted pb-1 mb-1 border-b border-gq-border">
            @@ -1,5 +1,12 @@
          </div>
          <div className="bg-gq-committed/8 text-gq-committed/80 px-1 rounded">
            +&nbsp;import &#123; useState &#125; from &apos;react&apos;;
          </div>
          <div className="bg-gq-committed/8 text-gq-committed/80 px-1 rounded">
            +&nbsp;import &#123; motion &#125; from &apos;framer-motion&apos;;
          </div>
          <div className="bg-gq-conflict/8 text-gq-conflict/80 px-1 rounded">
            -&nbsp;const x = 0;
          </div>
          <div className="text-gq-text-secondary px-1">
            &nbsp;&nbsp;function App() &#123;
          </div>
          <div className="bg-gq-committed/8 text-gq-committed/80 px-1 rounded">
            +&nbsp;return &lt;div&gt;Hello&lt;/div&gt;
          </div>
          <div className="text-gq-text-secondary px-1">
            &nbsp;&nbsp;&#125;
          </div>
        </div>

        {/* Review status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-3.5 w-3.5 text-gq-committed" />
            <span className="text-[10px] text-gq-committed font-mono">2 approvals</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-gq-text-muted" />
            <span className="text-[10px] text-gq-text-muted font-mono">All checks passed</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MockActionsView({ isRunning }: { isRunning: boolean }) {
  const steps = [
    { name: "Set up job", time: "2s" },
    { name: "Checkout repository", time: "1s" },
    { name: "Setup Node.js", time: "8s" },
    { name: "Install dependencies", time: "15s" },
    { name: "Run tests", time: "23s" },
    { name: "Build project", time: "12s" },
  ];

  return (
    <div className="gq-panel overflow-hidden">
      {/* Actions header */}
      <div className="border-b border-gq-border bg-gq-base px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Play className="h-4 w-4 text-gq-committed" />
            <span className="text-xs font-bold text-gq-text font-mono">
              CI — Workflow Run #42
            </span>
          </div>
          {isRunning ? (
            <span className="flex items-center gap-1.5 text-[9px] font-mono text-gq-staged">
              <Loader2 className="h-3 w-3 animate-spin" />
              RUNNING
            </span>
          ) : (
            <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-gq-committed/10 text-gq-committed border border-gq-committed/20">
              SUCCESS
            </span>
          )}
        </div>
      </div>

      {/* Steps — consistent state pattern */}
      <div className="p-3 space-y-0.5">
        <AnimatePresence>
          {steps.map((step, idx) => {
            const isComplete = isRunning;
            return (
              <motion.div
                key={step.name}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.12, duration: 0.25 }}
                className="flex items-center justify-between px-3 py-2 rounded-lg hover:bg-gq-surface-raised transition-colors font-mono text-[10px]"
              >
                <div className="flex items-center gap-2.5">
                  {isComplete ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-gq-committed flex-shrink-0" />
                  ) : (
                    <CircleDashed className="h-3.5 w-3.5 text-gq-text-muted flex-shrink-0" />
                  )}
                  <span
                    className={
                      isComplete ? "text-gq-text" : "text-gq-text-muted"
                    }
                  >
                    {step.name}
                  </span>
                </div>
                <span className="text-gq-text-muted">{step.time}</span>
              </motion.div>
            );
          })}
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
