"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Circle } from "lucide-react";
import type { TerminalLine } from "@/lib/git-quest/types";
import { useGlassPointer } from "./useGlassPointer";

interface GameTerminalProps {
  history: TerminalLine[];
  onExecute: (command: string) => void;
  allowedCommands: string[];
  isActive: boolean;
  currentBranch?: string;
  initialized?: boolean;
}

const COMMON_PREFIXES = [
  "git init",
  "git status",
  "git add",
  "git add .",
  "git commit -m",
  "git log",
  "git branch",
  "git checkout",
  "git merge",
  "git push",
  "git remote add origin",
  "git rm --cached",
  "gh pr create",
  "gh pr merge",
  "gh workflow run",
  "gh run list",
  "gh run watch",
  "mkdir",
  "echo",
  "touch",
];

export default function GameTerminal({
  history,
  onExecute,
  allowedCommands,
  isActive,
  currentBranch = "main",
  initialized = false,
}: GameTerminalProps) {
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const glass = useGlassPointer();

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    if (isActive && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isActive]);

  const getSuggestions = useCallback(
    (value: string) => {
      if (!value) return [];
      const lower = value.toLowerCase();
      const all = [...new Set([...COMMON_PREFIXES, ...allowedCommands])];
      return all
        .filter(
          (cmd) =>
            cmd.toLowerCase().startsWith(lower) ||
            cmd.toLowerCase().includes(lower)
        )
        .slice(0, 5);
    },
    [allowedCommands]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions[selectedSuggestion]) {
        const suggestion = filteredSuggestions[selectedSuggestion];
        setInput(
          suggestion + (suggestion.startsWith("git commit -m") ? ' ""' : "")
        );
        setShowSuggestions(false);
        return;
      }

      if (input.trim()) {
        setCmdHistory((prev) => [...prev, input]);
        setHistoryIdx(-1);
        onExecute(input);
        setInput("");
        setShowSuggestions(false);
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (showSuggestions) {
        setSelectedSuggestion((prev) =>
          prev > 0 ? prev - 1 : filteredSuggestions.length - 1
        );
      } else if (cmdHistory.length > 0) {
        const newIdx =
          historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
        setHistoryIdx(newIdx);
        setInput(cmdHistory[cmdHistory.length - 1 - newIdx] ?? "");
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (showSuggestions) {
        setSelectedSuggestion((prev) =>
          prev < filteredSuggestions.length - 1 ? prev + 1 : 0
        );
      } else {
        const newIdx = historyIdx > 0 ? historyIdx - 1 : -1;
        setHistoryIdx(newIdx);
        setInput(newIdx >= 0 ? cmdHistory[cmdHistory.length - 1 - newIdx] : "");
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions[selectedSuggestion]) {
        setInput(filteredSuggestions[selectedSuggestion]);
        setShowSuggestions(false);
      }
    } else if (e.key === "Escape") {
      setShowSuggestions(false);
    } else if (e.key === "l" && e.ctrlKey) {
      e.preventDefault();
      onExecute("clear");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setInput(val);
    if (val.length > 0) {
      const sugs = getSuggestions(val);
      setFilteredSuggestions(sugs);
      setShowSuggestions(sugs.length > 0);
      setSelectedSuggestion(0);
    } else {
      setShowSuggestions(false);
    }
  };

  const getLineStyles = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-gq-text font-semibold font-mono";
      case "success":
        return "text-gq-committed font-mono";
      case "error":
        return "text-gq-conflict/80 font-mono";
      case "hint":
        return "text-gq-staged font-mono";
      case "system":
        return "text-gq-text font-bold font-mono tracking-wide";
      default:
        return "text-gq-text-secondary font-mono";
    }
  };

  return (
    <div
      className="gq-glass gq-glass-2 gq-glass-focus-within overflow-hidden"
      {...glass}
    >
      <div className="gq-glass-rim" />

      {/* Content layer — sits above all glass layers */}
      <div className="relative z-10" onClick={() => inputRef.current?.focus()}>
        {/* Header bar — diegetic git state */}
        <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-2.5">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-mono font-bold text-gq-text-secondary uppercase tracking-widest">
              Terminal
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <GitBranch className="h-3 w-3 text-gq-text-muted" />
              <span className="text-[10px] font-mono text-gq-text-secondary">
                {currentBranch}
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Circle
                className={`h-2 w-2 ${
                  initialized
                    ? "fill-gq-committed text-gq-committed"
                    : "fill-gq-text-muted text-gq-text-muted"
                }`}
              />
              <span className="text-[10px] font-mono text-gq-text-muted">
                {initialized ? "repo" : "no repo"}
              </span>
            </div>
          </div>
        </div>

        {/* Terminal output */}
        <div
          ref={scrollRef}
          className="h-80 overflow-y-auto p-4 text-xs leading-relaxed"
          role="log"
          aria-live="polite"
          aria-label="Terminal output"
        >
          {history.map((line, i) => (
            <motion.div
              key={line.id}
              initial={{ opacity: 0, x: -3 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.12, delay: Math.min(i * 0.02, 0.2) }}
              className={`${getLineStyles(line.type)} whitespace-pre-wrap break-all`}
            >
              {line.text}
            </motion.div>
          ))}

          {/* Input line */}
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-gq-committed select-none font-mono font-bold">
              $
            </span>
            <div className="relative flex-1">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={handleChange}
                onKeyDown={handleKeyDown}
                disabled={!isActive}
                className="w-full bg-transparent text-gq-text text-xs font-mono outline-none caret-gq-committed placeholder-gq-text-muted/50 gq-focus-ring"
                placeholder={isActive ? "Type a command..." : ""}
                aria-label="Terminal command input"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            {isActive && (
              <span className="terminal-cursor text-gq-committed" />
            )}
          </div>
        </div>

        {/* Autocomplete */}
        <AnimatePresence>
          {showSuggestions && filteredSuggestions.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.12 }}
              className="border-t border-white/[0.06] p-1"
              role="listbox"
              aria-label="Command suggestions"
            >
              {filteredSuggestions.map((sug, i) => (
                <button
                  key={sug}
                  onClick={() => {
                    setInput(
                      sug + (sug.startsWith("git commit -m") ? ' ""' : "")
                    );
                    setShowSuggestions(false);
                    inputRef.current?.focus();
                  }}
                  className={`w-full text-left px-3 py-1.5 text-xs font-mono rounded ${
                    i === selectedSuggestion
                      ? "bg-gq-committed/10 text-gq-committed"
                      : "text-gq-text-secondary hover:bg-white/[0.04]"
                  }`}
                  role="option"
                  aria-selected={i === selectedSuggestion}
                >
                  {sug}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
