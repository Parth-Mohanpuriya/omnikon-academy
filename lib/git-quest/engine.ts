import type { GameState, GameAction, GitState, TerminalLine } from "./types";
import { executeCommand, type CommandResult } from "./commands";
import { levels, getLevelById } from "./levels";

const initialGitState: GitState = {
  initialized: false,
  files: [],
  stagingArea: [],
  commits: [],
  branches: [{ name: "main", HEAD: "" }],
  currentBranch: "main",
  remoteUrl: null,
  hasRemote: false,
};

export const initialState: GameState = {
  currentLevelId: null,
  completedLevelIds: [],
  totalXp: 0,
  badges: [],
  gitState: { ...initialGitState },
  terminalHistory: [],
  objectives: [],
  showIntro: false,
  showCompletion: false,
  isLevelActive: false,
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case "START_LEVEL": {
      const level = getLevelById(action.levelId);
      if (!level) return state;

      return {
        ...state,
        currentLevelId: level.id,
        isLevelActive: true,
        showIntro: true,
        showCompletion: false,
        gitState: { ...initialGitState, ...level.initialGitState },
        terminalHistory: [
          {
            id: `sys-${Date.now()}`,
            type: "system",
            text: `═══ ${level.title} ═══`,
          },
          {
            id: `obj-${Date.now()}`,
            type: "hint",
            text: `Objective: ${level.objective}`,
          },
          {
            id: `hint-${Date.now()}`,
            type: "output",
            text: "Type commands below. Need help? Type 'hint'",
          },
        ],
        objectives: level.objectives.map((o) => ({ ...o, completed: false })),
      };
    }

    case "DISMISS_INTRO":
      return { ...state, showIntro: false };

    case "DISMISS_COMPLETION":
      return { ...state, showCompletion: false };

    case "EXECUTE_COMMAND": {
      const { command, output } = action;
      const newHistory = [
        ...state.terminalHistory,
        {
          id: `cmd-${Date.now()}`,
          type: "input" as const,
          text: `$ ${command}`,
        },
        ...output,
      ];
      return { ...state, terminalHistory: newHistory };
    }

    case "UPDATE_GIT":
      return {
        ...state,
        gitState: { ...state.gitState, ...action.state },
      };

    case "COMPLETE_OBJECTIVE": {
      const newObjectives = state.objectives.map((o) =>
        o.id === action.objectiveId ? { ...o, completed: true } : o
      );
      return { ...state, objectives: newObjectives };
    }

    case "COMPLETE_LEVEL": {
      const level = getLevelById(action.levelId);
      if (!level) return state;

      const alreadyCompleted = state.completedLevelIds.includes(level.id);
      const xpGain = alreadyCompleted ? 0 : level.xpReward;
      const newBadges = level.badge && !state.badges.find((b) => b.id === level.badge!.id)
        ? [...state.badges, level.badge]
        : state.badges;

      return {
        ...state,
        completedLevelIds: [...state.completedLevelIds, level.id],
        totalXp: state.totalXp + xpGain,
        badges: newBadges,
        isLevelActive: false,
        showCompletion: true,
        terminalHistory: [
          ...state.terminalHistory,
          {
            id: `done-${Date.now()}`,
            type: "success",
            text: `✓ ${level.completionMessage}`,
          },
          {
            id: `xp-${Date.now()}`,
            type: "success",
            text: `+${xpGain} XP earned!`,
          },
        ],
      };
    }

    case "ADD_TERMINAL_LINES":
      return {
        ...state,
        terminalHistory: [...state.terminalHistory, ...action.lines],
      };

    case "RESET_GAME":
      return { ...initialState };

    default:
      return state;
  }
}

export function processCommand(
  command: string,
  state: GameState
): { output: TerminalLine[]; gitUpdates: Partial<GitState>; objectivesCompleted: string[] } {
  const trimmed = command.trim().toLowerCase();

  if (trimmed === "hint") {
    const level = state.currentLevelId ? getLevelById(state.currentLevelId) : null;
    const incompleteObj = state.objectives.find((o) => !o.completed);
    if (level && incompleteObj) {
      const hintIdx = state.terminalHistory.filter(
        (l) => l.type === "hint" && l.text.startsWith("💡")
      ).length;
      const hint = level.hints[hintIdx] ?? level.hints[level.hints.length - 1];
      return {
        output: [{ id: `h-${Date.now()}`, type: "hint", text: `💡 ${hint}` }],
        gitUpdates: {},
        objectivesCompleted: [],
      };
    }
    return {
      output: [{ id: `h-${Date.now()}`, type: "hint", text: "💡 You're doing great! Keep going!" }],
      gitUpdates: {},
      objectivesCompleted: [],
    };
  }

  if (trimmed === "clear") {
    return { output: [], gitUpdates: {}, objectivesCompleted: [] };
  }

  const result: CommandResult = executeCommand(command, state.gitState);
  const objectivesCompleted: string[] = [];

  state.objectives.forEach((o) => {
    if (o.completed) return;
    const matches = o.commandPattern.some((pattern) =>
      trimmed.includes(pattern.toLowerCase())
    );
    if (matches) {
      objectivesCompleted.push(o.id);
    }
  });

  return {
    output: result.output,
    gitUpdates: result.newState,
    objectivesCompleted,
  };
}

export function getXpForLevel(levelId: string): number {
  return getLevelById(levelId)?.xpReward ?? 0;
}

export function getTotalXpForAllLevels(): number {
  return levels.reduce((sum, l) => sum + l.xpReward, 0);
}
