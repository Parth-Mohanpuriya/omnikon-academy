import type { GitState, GitCommit, GitFile, TerminalLine } from "./types";

let commitCounter = 100;

function generateCommitId(): string {
  commitCounter++;
  return `c${commitCounter}`;
}

export interface CommandResult {
  success: boolean;
  output: TerminalLine[];
  newState: Partial<GitState>;
}

function makeLine(type: TerminalLine["type"], text: string): TerminalLine {
  return { id: `line-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, type, text };
}

export function executeCommand(raw: string, state: GitState): CommandResult {
  const trimmed = raw.trim();
  const parts = trimmed.split(/\s+/);
  const cmd = parts[0];

  if (cmd === "git") return handleGit(parts, trimmed, state);
  if (cmd === "gh") return handleGh(parts, trimmed, state);
  if (cmd === "mkdir") return handleMkdir(parts, state);
  if (cmd === "echo") return handleEcho(parts, trimmed, state);
  if (cmd === "touch") return handleTouch(parts, state);

  return {
    success: false,
    output: [makeLine("error", `Command not found: ${cmd}`)],
    newState: {},
  };
}

function handleGit(
  parts: string[],
  raw: string,
  state: GitState
): CommandResult {
  const sub = parts[1];

  switch (sub) {
    case "init":
      return gitInit(state);
    case "status":
      return gitStatus(state);
    case "add":
      return gitAdd(parts.slice(2), state);
    case "commit":
      return gitCommit(parts.slice(2), raw, state);
    case "log":
      return gitLog(state);
    case "branch":
      return gitBranch(parts.slice(2), state);
    case "checkout":
      return gitCheckout(parts.slice(2), state);
    case "switch":
      return gitSwitch(parts.slice(2), state);
    case "merge":
      return gitMerge(parts.slice(2), state);
    case "push":
      return gitPush(parts.slice(2), state);
    case "remote":
      return gitRemote(parts.slice(2), state);
    case "clone":
      return gitClone(parts.slice(2), state);
    case "rm":
      return gitRm(parts.slice(2), state);
    default:
      return {
        success: false,
        output: [makeLine("error", `git: '${sub}' is not a git command.`)],
        newState: {},
      };
  }
}

function handleGh(
  parts: string[],
  raw: string,
  state: GitState
): CommandResult {
  const sub = parts[1];

  switch (sub) {
    case "pr":
      return ghPr(parts.slice(2), state);
    case "workflow":
      return ghWorkflow(parts.slice(2), state);
    case "run":
      return ghRun(parts.slice(2), state);
    default:
      return {
        success: false,
        output: [makeLine("error", `gh: '${sub}' is not a recognized command.`)],
        newState: {},
      };
  }
}

function handleMkdir(parts: string[], _state: GitState): CommandResult {
  const dir = parts[1];
  if (!dir) {
    return { success: false, output: [makeLine("error", "mkdir: missing operand")], newState: {} };
  }
  return {
    success: true,
    output: [makeLine("output", `Created directory: ${dir}`)],
    newState: {},
  };
}

function handleEcho(
  parts: string[],
  raw: string,
  state: GitState
): CommandResult {
  const content = raw.replace(/^echo\s+/, "").replace(/>\s*\S+$/, "").trim();
  const redirectMatch = raw.match(/>\s*(.+)$/);
  const filename = redirectMatch ? redirectMatch[1].trim() : null;

  if (filename) {
    const newFile: GitFile = { name: filename, content, status: "untracked" };
    return {
      success: true,
      output: [makeLine("output", `Created ${filename}`)],
      newState: { files: [...state.files, newFile] },
    };
  }

  return {
    success: true,
    output: [makeLine("output", content)],
    newState: {},
  };
}

function handleTouch(parts: string[], state: GitState): CommandResult {
  const filename = parts[1];
  if (!filename) {
    return { success: false, output: [makeLine("error", "touch: missing file operand")], newState: {} };
  }
  if (state.files.find((f) => f.name === filename)) {
    return { success: true, output: [makeLine("output", `${filename} already exists`)], newState: {} };
  }
  const newFile: GitFile = { name: filename, content: "", status: "untracked" };
  return {
    success: true,
    output: [makeLine("output", `Created ${filename}`)],
    newState: { files: [...state.files, newFile] },
  };
}

// ─── Git Sub-commands ────────────────────────────────────────

function gitInit(state: GitState): CommandResult {
  if (state.initialized) {
    return {
      success: true,
      output: [makeLine("hint", "Reinitialized existing Git repository")],
      newState: {},
    };
  }
  return {
    success: true,
    output: [makeLine("success", "Initialized empty Git repository in /repo/.git/")],
    newState: { initialized: true },
  };
}

function gitStatus(state: GitState): CommandResult {
  if (!state.initialized) {
    return { success: false, output: [makeLine("error", "fatal: not a git repository")], newState: {} };
  }

  const lines: TerminalLine[] = [
    makeLine("output", `On branch ${state.currentBranch}`),
  ];

  const untracked = state.files.filter((f) => f.status === "untracked");
  const staged = state.stagingArea ?? [];
  const modified = state.files.filter((f) => f.status === "modified");

  if (staged.length > 0) {
    lines.push(makeLine("success", "Changes to be committed:"));
    staged.forEach((f) => lines.push(makeLine("output", `  new file:   ${f.name}`)));
  }

  if (modified.length > 0) {
    lines.push(makeLine("output", "Changes not staged for commit:"));
    modified.forEach((f) => lines.push(makeLine("output", `  modified:   ${f.name}`)));
  }

  if (untracked.length > 0) {
    lines.push(makeLine("output", "Untracked files:"));
    untracked.forEach((f) => lines.push(makeLine("output", `  ${f.name}`)));
  }

  if (untracked.length === 0 && staged.length === 0 && modified.length === 0) {
    lines.push(makeLine("output", "nothing to commit, working tree clean"));
  }

  return { success: true, output: lines, newState: {} };
}

function gitAdd(args: string[], state: GitState): CommandResult {
  if (!state.initialized) {
    return { success: false, output: [makeLine("error", "fatal: not a git repository")], newState: {} };
  }

  const target = args.join(" ");
  let filesToStage: GitFile[] = [];

  if (target === "." || target === "*" || target === "-A") {
    filesToStage = state.files.filter(
      (f) => f.status === "untracked" || f.status === "modified"
    );
  } else {
    filesToStage = state.files.filter(
      (f) => f.name === target && (f.status === "untracked" || f.status === "modified")
    );
  }

  if (filesToStage.length === 0) {
    return {
      success: true,
      output: [makeLine("hint", "Nothing to add")],
      newState: {},
    };
  }

  const newFiles = state.files.map((f) =>
    filesToStage.find((s) => s.name === f.name) ? { ...f, status: "staged" as const } : f
  );

  const newStaging = [...(state.stagingArea ?? []), ...filesToStage];

  return {
    success: true,
    output: filesToStage.map((f) => makeLine("success", `Staged: ${f.name}`)),
    newState: { files: newFiles, stagingArea: newStaging },
  };
}

function gitCommit(
  args: string[],
  raw: string,
  state: GitState
): CommandResult {
  if (!state.initialized) {
    return { success: false, output: [makeLine("error", "fatal: not a git repository")], newState: {} };
  }

  const mFlagIdx = args.indexOf("-m");
  let message = "";
  if (mFlagIdx >= 0 && args[mFlagIdx + 1]) {
    message = args
      .slice(mFlagIdx + 1)
      .join(" ")
      .replace(/^["']|["']$/g, "");
  }

  if (!message) {
    return {
      success: false,
      output: [makeLine("error", "Aborting commit due to empty message.")],
      newState: {},
    };
  }

  const staged = state.stagingArea ?? [];
  if (staged.length === 0) {
    return {
      success: false,
      output: [makeLine("error", "nothing to commit")],
      newState: {},
    };
  }

  const parentId = state.commits.length > 0 ? state.commits[state.commits.length - 1].id : null;
  const newCommit: GitCommit = {
    id: generateCommitId(),
    message,
    timestamp: Date.now(),
    parentId,
    branch: state.currentBranch,
  };

  const newFiles = state.files.map((f) =>
    f.status === "staged" ? { ...f, status: "committed" as const } : f
  );

  return {
    success: true,
    output: [
      makeLine("success", `[${state.currentBranch} ${newCommit.id}] ${message}`),
      makeLine("output", `${staged.length} file${staged.length > 1 ? "s" : ""} changed`),
    ],
    newState: {
      commits: [...state.commits, newCommit],
      files: newFiles,
      stagingArea: [],
    },
  };
}

function gitLog(state: GitState): CommandResult {
  if (!state.initialized) {
    return { success: false, output: [makeLine("error", "fatal: not a git repository")], newState: {} };
  }

  if (state.commits.length === 0) {
    return { success: true, output: [makeLine("output", "No commits yet")], newState: {} };
  }

  const lines: TerminalLine[] = [];
  const commits = [...state.commits].reverse();
  for (const c of commits) {
    lines.push(makeLine("output", `commit ${c.id}`));
    lines.push(makeLine("output", `Author: You <you@omnikon.dev>`));
    lines.push(makeLine("output", `Date: ${new Date(c.timestamp).toLocaleString()}`));
    lines.push(makeLine("success", `    ${c.message}`));
    lines.push(makeLine("output", ""));
  }

  return { success: true, output: lines, newState: {} };
}

function gitBranch(args: string[], state: GitState): CommandResult {
  if (!state.initialized) {
    return { success: false, output: [makeLine("error", "fatal: not a git repository")], newState: {} };
  }

  if (args.length === 0) {
    const lines = state.branches.map((b) =>
      makeLine(
        b.name === state.currentBranch ? "success" : "output",
        `${b.name === state.currentBranch ? "* " : "  "}${b.name}`
      )
    );
    return { success: true, output: lines, newState: {} };
  }

  const name = args[0];
  if (state.branches.find((b) => b.name === name)) {
    return {
      success: false,
      output: [makeLine("error", `branch '${name}' already exists`)],
      newState: {},
    };
  }

  const headCommit = state.commits[state.commits.length - 1];
  return {
    success: true,
    output: [makeLine("success", `Created branch '${name}'`)],
    newState: {
      branches: [...state.branches, { name, HEAD: headCommit?.id ?? "" }],
    },
  };
}

function gitCheckout(args: string[], state: GitState): CommandResult {
  if (!state.initialized) {
    return { success: false, output: [makeLine("error", "fatal: not a git repository")], newState: {} };
  }

  const bFlag = args.indexOf("-b");
  if (bFlag >= 0) {
    const branchName = args[bFlag + 1];
    if (!branchName) {
      return { success: false, output: [makeLine("error", "branch name required")], newState: {} };
    }
    if (state.branches.find((b) => b.name === branchName)) {
      return { success: false, output: [makeLine("error", `branch '${branchName}' already exists`)], newState: {} };
    }
    const headCommit = state.commits[state.commits.length - 1];
    return {
      success: true,
      output: [
        makeLine("success", `Switched to a new branch '${branchName}'`),
      ],
      newState: {
        branches: [...state.branches, { name: branchName, HEAD: headCommit?.id ?? "" }],
        currentBranch: branchName,
      },
    };
  }

  const branchName = args.find((a) => !a.startsWith("-"));
  if (!branchName) {
    return { success: false, output: [makeLine("error", "branch name required")], newState: {} };
  }

  const branch = state.branches.find((b) => b.name === branchName);
  if (!branch) {
    return {
      success: false,
      output: [makeLine("error", `branch '${branchName}' not found`)],
      newState: {},
    };
  }

  return {
    success: true,
    output: [makeLine("success", `Switched to branch '${branchName}'`)],
    newState: { currentBranch: branchName },
  };
}

function gitSwitch(args: string[], state: GitState): CommandResult {
  const cFlag = args.indexOf("-c");
  if (cFlag >= 0) {
    return gitCheckout(["-b", args[cFlag + 1]], state);
  }
  return gitCheckout(args, state);
}

function gitMerge(args: string[], state: GitState): CommandResult {
  if (!state.initialized) {
    return { success: false, output: [makeLine("error", "fatal: not a git repository")], newState: {} };
  }

  const branchName = args.find((a) => !a.startsWith("-"));
  if (!branchName) {
    return { success: false, output: [makeLine("error", "branch name required")], newState: {} };
  }

  const branch = state.branches.find((b) => b.name === branchName);
  if (!branch) {
    return {
      success: false,
      output: [makeLine("error", `branch '${branchName}' not found`)],
      newState: {},
    };
  }

  if (branch.name === state.currentBranch) {
    return {
      success: false,
      output: [makeLine("error", "Cannot merge a branch into itself")],
      newState: {},
    };
  }

  const parentId = state.commits[state.commits.length - 1]?.id ?? null;
  const newCommit: GitCommit = {
    id: generateCommitId(),
    message: `Merge branch '${branchName}' into ${state.currentBranch}`,
    timestamp: Date.now(),
    parentId,
    branch: state.currentBranch,
  };

  return {
    success: true,
    output: [
      makeLine("success", `Merge made by 'ort' strategy.`),
      makeLine("output", ` 1 file changed, 10 insertions(+), 0 deletions(-)`),
    ],
    newState: {
      commits: [...state.commits, newCommit],
      branches: state.branches.map((b) =>
        b.name === state.currentBranch ? { ...b, HEAD: newCommit.id } : b
      ),
    },
  };
}

function gitPush(args: string[], state: GitState): CommandResult {
  if (!state.hasRemote) {
    return {
      success: false,
      output: [makeLine("error", "fatal: No remote configured.")],
      newState: {},
    };
  }

  return {
    success: true,
    output: [
      makeLine("output", `Enumerating objects: 1, done.`),
      makeLine("output", `Writing objects: 100% (1/1), 1.2 KiB | 1.2 MiB/s, done.`),
      makeLine("success", `To ${state.remoteUrl}`),
      makeLine("success", `   ${state.commits[state.commits.length - 2]?.id ?? "???"}..${state.commits[state.commits.length - 1]?.id ?? "???"}  ${state.currentBranch} -> ${state.currentBranch}`),
    ],
    newState: {},
  };
}

function gitRemote(args: string[], state: GitState): CommandResult {
  const sub = args[0];
  if (sub === "add") {
    const name = args[1];
    const url = args[2];
    if (!name || !url) {
      return {
        success: false,
        output: [makeLine("error", "usage: git remote add <name> <url>")],
        newState: {},
      };
    }
    return {
      success: true,
      output: [makeLine("success", `Added remote '${name}' → ${url}`)],
      newState: { remoteUrl: url, hasRemote: true },
    };
  }

  if (sub === "-v" || !sub) {
    if (state.remoteUrl) {
      return {
        success: true,
        output: [
          makeLine("output", `origin\t${state.remoteUrl} (fetch)`),
          makeLine("output", `origin\t${state.remoteUrl} (push)`),
        ],
        newState: {},
      };
    }
    return { success: true, output: [makeLine("output", "No remotes configured")], newState: {} };
  }

  return { success: false, output: [makeLine("error", `Unknown subcommand: ${sub}`)], newState: {} };
}

function gitClone(args: string[], _state: GitState): CommandResult {
  const url = args[0];
  if (!url) {
    return {
      success: false,
      output: [makeLine("error", "usage: git clone <url>")],
      newState: {},
    };
  }
  return {
    success: true,
    output: [
      makeLine("output", `Cloning into 'repo'...`),
      makeLine("success", `remote: Enumerating objects: 42, done.`),
      makeLine("output", `Receiving objects: 100% (42/42), 15.3 KiB | 5.1 MiB/s, done.`),
      makeLine("success", `Successfully cloned ${url}`),
    ],
    newState: { initialized: true, remoteUrl: url, hasRemote: true },
  };
}

function gitRm(args: string[], state: GitState): CommandResult {
  const cachedFlag = args.includes("--cached");
  const filename = args.find((a) => !a.startsWith("-") && a !== "rm");

  if (!filename) {
    return { success: false, output: [makeLine("error", "usage: git rm [--cached] <file>")], newState: {} };
  }

  if (cachedFlag) {
    const newFiles = state.files.map((f) =>
      f.name === filename ? { ...f, status: "untracked" as const } : f
    );
    return {
      success: true,
      output: [makeLine("success", `Untracked: ${filename} (removed from index)`)],
      newState: { files: newFiles },
    };
  }

  return {
    success: true,
    output: [makeLine("success", `Removed ${filename}`)],
    newState: { files: state.files.filter((f) => f.name !== filename) },
  };
}

// ─── GitHub CLI Sub-commands ──────────────────────────────────

function ghPr(args: string[], _state: GitState): CommandResult {
  const sub = args[0];

  if (sub === "create") {
    return {
      success: true,
      output: [
        makeLine("output", "Creating pull request..."),
        makeLine("success", "https://github.com/user/awesome-project/pull/1"),
        makeLine("output", ""),
        makeLine("success", "PR #1: feat: new feature → main"),
        makeLine("output", "Reviewers can now approve and merge."),
      ],
      newState: {},
    };
  }

  if (sub === "merge") {
    return {
      success: true,
      output: [
        makeLine("output", "Merging pull request #1..."),
        makeLine("success", "Pull request #1 merged!"),
        makeLine("output", "  ✓ All checks passed"),
        makeLine("output", "  ✓ Branch deleted"),
      ],
      newState: {},
    };
  }

  return {
    success: true,
    output: [makeLine("output", "Usage: gh pr create | gh pr merge")],
    newState: {},
  };
}

function ghWorkflow(args: string[], _state: GitState): CommandResult {
  const sub = args[0];

  if (sub === "run") {
    return {
      success: true,
      output: [
        makeLine("output", "Triggered workflow dispatch for ci.yml"),
        makeLine("success", "Run started: https://github.com/user/awesome-project/actions/runs/42"),
      ],
      newState: {},
    };
  }

  return {
    success: true,
    output: [makeLine("output", "Usage: gh workflow run <workflow-file>")],
    newState: {},
  };
}

function ghRun(args: string[], _state: GitState): CommandResult {
  const sub = args[0];

  if (sub === "list" || sub === "status") {
    return {
      success: true,
      output: [
        makeLine("output", "STATUS  TITLE        BRANCH  EVENT    ID"),
        makeLine("success", "✓       CI           main    push     42"),
        makeLine("output", ""),
        makeLine("output", "Total: 1 run"),
      ],
      newState: {},
    };
  }

  if (sub === "watch") {
    return {
      success: true,
      output: [
        makeLine("output", "Watching run 42 (CI)..."),
        makeLine("output", ""),
        makeLine("success", "  ✓ Set up job"),
        makeLine("success", "  ✓ Checkout repository"),
        makeLine("success", "  ✓ Setup Node.js"),
        makeLine("success", "  ✓ Install dependencies"),
        makeLine("success", "  ✓ Run tests"),
        makeLine("success", "  ✓ Build project"),
        makeLine("output", ""),
        makeLine("success", "Run 42 completed successfully! ✓"),
      ],
      newState: {},
    };
  }

  return {
    success: true,
    output: [makeLine("output", "Usage: gh run list | gh run watch | gh run status")],
    newState: {},
  };
}
