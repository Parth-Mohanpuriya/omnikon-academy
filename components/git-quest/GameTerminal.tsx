"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { TerminalLine } from "@/lib/git-quest/types";

interface GameTerminalProps {
  history: TerminalLine[];
  onExecute: (command: string) => void;
  allowedCommands: string[];
  isActive: boolean;
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
}: GameTerminalProps) {
  const [input, setInput] = useState("");
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [filteredSuggestions, setFilteredSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      return all.filter(
        (cmd) =>
          cmd.toLowerCase().startsWith(lower) ||
          cmd.toLowerCase().includes(lower)
      ).slice(0, 6);
    },
    [allowedCommands]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (showSuggestions && filteredSuggestions[selectedSuggestion]) {
        const suggestion = filteredSuggestions[selectedSuggestion];
        setInput(suggestion + (suggestion.startsWith("git commit -m") ? ' ""' : ""));
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
        const newIdx = historyIdx < cmdHistory.length - 1 ? historyIdx + 1 : historyIdx;
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
        setInput(
          newIdx >= 0 ? cmdHistory[cmdHistory.length - 1 - newIdx] : ""
        );
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

  const getLineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":
        return "text-white font-bold";
      case "success":
        return "text-emerald-400";
      case "error":
        return "text-red-400";
      case "hint":
        return "text-amber-400";
      case "system":
        return "text-violet-400 font-bold";
      default:
        return "text-zinc-400";
    }
  };

  return (
    <div
      className="rounded-xl border border-white/10 bg-[#08080a] overflow-hidden font-mono"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between border-b border-white/5 bg-[#0a0a0c] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-red-500/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-500/80" />
          <span className="h-3 w-3 rounded-full bg-green-500/80" />
        </div>
        <span className="text-[10px] text-zinc-500">git-quest-terminal</span>
        <div className="w-12" />
      </div>

      {/* Terminal output */}
      <div
        ref={scrollRef}
        className="h-80 overflow-y-auto p-4 text-xs leading-relaxed"
        role="log"
        aria-live="polite"
        aria-label="Terminal output"
      >
        {history.map((line) => (
          <motion.div
            key={line.id}
            initial={{ opacity: 0, x: -4 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.15 }}
            className={`${getLineColor(line.type)} whitespace-pre-wrap break-all`}
          >
            {line.text}
          </motion.div>
        ))}

        {/* Input line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-terminal-green select-none">$</span>
          <div className="relative flex-1">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={handleChange}
              onKeyDown={handleKeyDown}
              disabled={!isActive}
              className="w-full bg-transparent text-white text-xs outline-none caret-terminal-green placeholder-zinc-600"
              placeholder={isActive ? "Type a command..." : ""}
              aria-label="Terminal command input"
              autoComplete="off"
              spellCheck={false}
            />
          </div>
          {isActive && <span className="terminal-cursor text-terminal-green" />}
        </div>
      </div>

      {/* Autocomplete suggestions */}
      {showSuggestions && filteredSuggestions.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="border-t border-white/5 bg-[#0c0c0e] p-1"
          role="listbox"
          aria-label="Command suggestions"
        >
          {filteredSuggestions.map((sug, i) => (
            <button
              key={sug}
              onClick={() => {
                setInput(sug + (sug.startsWith("git commit -m") ? ' ""' : ""));
                setShowSuggestions(false);
                inputRef.current?.focus();
              }}
              className={`w-full text-left px-3 py-1.5 text-xs rounded ${
                i === selectedSuggestion
                  ? "bg-white/10 text-white"
                  : "text-zinc-400 hover:bg-white/5"
              }`}
              role="option"
              aria-selected={i === selectedSuggestion}
            >
              {sug}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
}
