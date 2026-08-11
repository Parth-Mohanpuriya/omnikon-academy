export type Difficulty = "beginner" | "beginner-intermediate" | "intermediate" | "advanced";

export interface GitFile {
  name: string;
  content: string;
  status: "untracked" | "staged" | "committed" | "modified";
}

export interface GitCommit {
  id: string;
  message: string;
  timestamp: number;
  parentId: string | null;
  branch: string;
}

export interface GitBranch {
  name: string;
  HEAD: string;
}

export interface GitState {
  initialized: boolean;
  files: GitFile[];
  stagingArea: GitFile[];
  commits: GitCommit[];
  branches: GitBranch[];
  currentBranch: string;
  remoteUrl: string | null;
  hasRemote: boolean;
}

export interface CommandDef {
  name: string;
  aliases?: string[];
  description: string;
  usage: string;
  validate?: (args: string, state: GitState) => boolean;
}

export interface Objective {
  id: string;
  description: string;
  commandPattern: string[];
  completed: boolean;
}

export interface Level {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  difficulty: Difficulty;
  storyIntro: string;
  objective: string;
  hints: string[];
  initialGitState: Partial<GitState>;
  allowedCommands: string[];
  objectives: Omit<Objective, "completed">[];
  xpReward: number;
  badge?: Badge;
  completionMessage: string;
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
}

export interface TerminalLine {
  id: string;
  type: "input" | "output" | "success" | "error" | "hint" | "system";
  text: string;
}

export interface GameState {
  currentLevelId: string | null;
  completedLevelIds: string[];
  totalXp: number;
  badges: Badge[];
  gitState: GitState;
  terminalHistory: TerminalLine[];
  objectives: Objective[];
  showIntro: boolean;
  showCompletion: boolean;
  isLevelActive: boolean;
}

export type GameAction =
  | { type: "START_LEVEL"; levelId: string }
  | { type: "COMPLETE_OBJECTIVE"; objectiveId: string }
  | { type: "COMPLETE_LEVEL"; levelId: string }
  | { type: "EXECUTE_COMMAND"; command: string; output: TerminalLine[] }
  | { type: "UPDATE_GIT"; state: Partial<GitState> }
  | { type: "DISMISS_INTRO" }
  | { type: "DISMISS_COMPLETION" }
  | { type: "RESET_GAME" }
  | { type: "ADD_TERMINAL_LINES"; lines: TerminalLine[] };
