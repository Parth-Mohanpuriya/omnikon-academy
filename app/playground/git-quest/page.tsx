"use client";

import { useReducer, useCallback, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Gamepad2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import GameTerminal from "@/components/git-quest/GameTerminal";
import GitGraph from "@/components/git-quest/GitGraph";
import ProgressHeader from "@/components/git-quest/ProgressHeader";
import LevelMap from "@/components/git-quest/LevelMap";
import LevelIntro from "@/components/git-quest/LevelIntro";
import ObjectiveTracker from "@/components/git-quest/ObjectiveTracker";
import FileStagingArea from "@/components/git-quest/FileStagingArea";
import MockGitHubUI from "@/components/git-quest/MockGitHubUI";
import Mascot from "@/components/git-quest/Mascot";
import CompletionModal from "@/components/git-quest/CompletionModal";
import {
  gameReducer,
  initialState,
  processCommand,
} from "@/lib/git-quest/engine";
import { getLevelById, getNextLevel, levels } from "@/lib/git-quest/levels";

export default function GitQuestPage() {
  const [state, dispatch] = useReducer(gameReducer, initialState);
  const [mascotMsg, setMascotMsg] = useState<string | undefined>();

  const currentLevel = state.currentLevelId
    ? getLevelById(state.currentLevelId)
    : null;

  const handleStartLevel = useCallback((levelId: string) => {
    dispatch({ type: "START_LEVEL", levelId });
    setMascotMsg(undefined);
  }, []);

  const handleDismissIntro = useCallback(() => {
    dispatch({ type: "DISMISS_INTRO" });
    if (currentLevel) {
      setMascotMsg(`Ready! Type your first command to begin "${currentLevel.title}".`);
    }
  }, [currentLevel]);

  const handleBackToMap = useCallback(() => {
    dispatch({ type: "RESET_GAME" });
    setMascotMsg(undefined);
  }, []);

  const handleExecute = useCallback(
    (command: string) => {
      if (!state.isLevelActive || !currentLevel) return;

      if (command.trim().toLowerCase() === "clear") {
        dispatch({ type: "START_LEVEL", levelId: currentLevel.id });
        return;
      }

      const result = processCommand(command, state);

      // Add output to terminal
      if (result.output.length > 0) {
        dispatch({ type: "EXECUTE_COMMAND", command, output: result.output });
      }

      // Update git state
      if (Object.keys(result.gitUpdates).length > 0) {
        dispatch({ type: "UPDATE_GIT", state: result.gitUpdates });
      }

      // Mark completed objectives
      for (const objId of result.objectivesCompleted) {
        dispatch({ type: "COMPLETE_OBJECTIVE", objectiveId: objId });
      }

      // Check if all objectives are complete
      const allComplete = state.objectives.every(
        (o) => o.completed || result.objectivesCompleted.includes(o.id)
      );
      if (allComplete && result.objectivesCompleted.length > 0) {
        setTimeout(() => {
          dispatch({ type: "COMPLETE_LEVEL", levelId: currentLevel.id });
          setMascotMsg(undefined);
        }, 600);
      } else if (result.output.some((l) => l.type === "error")) {
        setMascotMsg("Oops! That didn't work. Try 'hint' if you need help.");
        setTimeout(() => setMascotMsg(undefined), 4000);
      } else if (result.output.some((l) => l.type === "success")) {
        setMascotMsg("Nice work! Keep going.");
        setTimeout(() => setMascotMsg(undefined), 2500);
      }
    },
    [state, currentLevel]
  );

  const handleNextLevel = useCallback(() => {
    if (!currentLevel) return;
    const next = getNextLevel(currentLevel.id);
    if (next) {
      handleStartLevel(next.id);
    }
  }, [currentLevel, handleStartLevel]);

  const handleReplay = useCallback(() => {
    if (!currentLevel) return;
    handleStartLevel(currentLevel.id);
  }, [currentLevel, handleStartLevel]);

  const isLastLevel =
    currentLevel?.id === levels[levels.length - 1].id;

  return (
    <div className="min-h-screen bg-[#030303] text-white selection:bg-red-500 selection:text-white">
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-3 w-3" />
          Back to Home
        </Link>

        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-red-500/10 border border-red-500/20 text-red-400">
              <Gamepad2 className="h-4 w-4" />
            </span>
            <div>
              <h1 className="text-2xl font-extrabold text-white">Git Quest</h1>
              <p className="text-xs text-zinc-500">
                Learn Git & GitHub Actions by doing
              </p>
            </div>
          </div>
        </motion.div>

        {/* Progress header */}
        <div className="mb-6">
          <ProgressHeader state={state} onBackToMap={handleBackToMap} />
        </div>

        {/* Level Intro Modal */}
        {state.showIntro && currentLevel && (
          <LevelIntro level={currentLevel} onDismiss={handleDismissIntro} />
        )}

        {/* Completion Modal */}
        {state.showCompletion && currentLevel && (
          <CompletionModal
            level={currentLevel}
            xpEarned={currentLevel.xpReward}
            badge={currentLevel.badge}
            onNextLevel={handleNextLevel}
            onReplay={handleReplay}
            isLastLevel={!!isLastLevel}
          />
        )}

        {/* Main content: either map or active level */}
        {!state.isLevelActive ? (
          <LevelMap state={state} onStartLevel={handleStartLevel} />
        ) : currentLevel ? (
          <div className="space-y-6">
            {/* Mascot hint */}
            <Mascot message={mascotMsg} visible={!!mascotMsg} />

            {/* Objectives */}
            <ObjectiveTracker
              objectives={state.objectives}
              levelTitle={currentLevel.title}
            />

            {/* Main game grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Terminal - takes 2 cols on large screens */}
              <div className="lg:col-span-2">
                <GameTerminal
                  history={state.terminalHistory}
                  onExecute={handleExecute}
                  allowedCommands={currentLevel.allowedCommands}
                  isActive={state.isLevelActive}
                />
              </div>

              {/* Sidebar: graph + file staging */}
              <div className="space-y-4">
                <GitGraph gitState={state.gitState} />
                <FileStagingArea
                  files={state.gitState.files}
                  stagingArea={state.gitState.stagingArea ?? []}
                />
              </div>
            </div>

            {/* Mock GitHub UI (for PR and Actions levels) */}
            {["pr-flow", "actions-intro", "actions-run", "push", "gitignore"].includes(
              currentLevel.id
            ) && (
              <div className="mt-6">
                <MockGitHubUI levelId={currentLevel.id} />
              </div>
            )}
          </div>
        ) : null}
      </main>

      <Footer />
    </div>
  );
}
