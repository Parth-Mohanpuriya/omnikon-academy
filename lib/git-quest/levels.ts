import type { Level, Badge } from "./types";

export const badges: Record<string, Badge> = {
  "repo-init": {
    id: "repo-init",
    name: "Repo Initiator",
    icon: "🚀",
    description: "Created your first Git repository",
  },
  "first-commit": {
    id: "first-commit",
    name: "Commit Master",
    icon: "💾",
    description: "Made your first commit",
  },
  "brancher": {
    id: "brancher",
    name: "Branch Wizard",
    icon: "🌿",
    description: "Created and switched branches",
  },
  "merger": {
    id: "merger",
    name: "Merge Hero",
    icon: "🔀",
    description: "Resolved a merge conflict",
  },
  "pusher": {
    id: "pusher",
    name: "Cloud Pusher",
    icon: "☁️",
    description: "Pushed code to a remote repository",
  },
  "pr-pro": {
    id: "pr-pro",
    name: "PR Pro",
    icon: "🔃",
    description: "Created and merged a Pull Request",
  },
  "ci-wizard": {
    id: "ci-wizard",
    name: "CI Wizard",
    icon: "⚡",
    description: "Built and ran a GitHub Actions workflow",
  },
};

export const levels: Level[] = [
  // ─── TIER 1: LOCAL BASICS ───────────────────────────────────
  {
    id: "init",
    number: 1,
    title: "Genesis",
    subtitle: "Initialize your first repo",
    difficulty: "beginner",
    storyIntro:
      "A blank folder stares back at you. No version control. No history. Time to change that.",
    objective: "Turn this folder into a Git repository",
    hints: [
      "The command to start a new repo is: git init",
      "Just type: git init",
    ],
    initialGitState: {
      initialized: false,
      files: [
        { name: "index.html", content: "<!DOCTYPE html>...", status: "untracked" },
        { name: "style.css", content: "body { margin: 0; }", status: "untracked" },
      ],
    },
    allowedCommands: ["git init"],
    objectives: [
      { id: "init-1", description: "Run git init to create a repository", commandPattern: ["git init"] },
    ],
    xpReward: 100,
    badge: badges["repo-init"],
    completionMessage: "Repository initialized! 🎉",
  },
  {
    id: "status",
    number: 2,
    title: "Recon",
    subtitle: "Check what's going on",
    difficulty: "beginner",
    storyIntro:
      "Your repo exists, but what's the state of things? Time to take a look around.",
    objective: "Check the status of your repository",
    hints: [
      "To see what's happening in your repo: git status",
      "Just type: git status",
    ],
    initialGitState: {
      initialized: true,
      files: [
        { name: "index.html", content: "<!DOCTYPE html>...", status: "untracked" },
        { name: "style.css", content: "body { margin: 0; }", status: "untracked" },
      ],
    },
    allowedCommands: ["git status", "git init"],
    objectives: [
      { id: "status-1", description: "Run git status to see untracked files", commandPattern: ["git status"] },
    ],
    xpReward: 100,
    completionMessage: "You can see your untracked files now! 👀",
  },
  {
    id: "add",
    number: 3,
    title: "Stage Dive",
    subtitle: "Add files to the staging area",
    difficulty: "beginner",
    storyIntro:
      "Untracked files are floating in the void. Let's pull them onto the stage.",
    objective: "Stage your files for the next commit",
    hints: [
      "To stage all files: git add .",
      "To stage a specific file: git add index.html",
      "Try: git add .",
    ],
    initialGitState: {
      initialized: true,
      files: [
        { name: "index.html", content: "<!DOCTYPE html>...", status: "untracked" },
        { name: "style.css", content: "body { margin: 0; }", status: "untracked" },
      ],
    },
    allowedCommands: ["git add .", "git add index.html", "git add style.css", "git status", "git init"],
    objectives: [
      { id: "add-1", description: "Stage at least one file", commandPattern: ["git add .", "git add *"] },
    ],
    xpReward: 150,
    completionMessage: "Files staged and ready! 📦",
  },
  {
    id: "commit",
    number: 4,
    title: "Time Stamp",
    subtitle: "Create your first commit",
    difficulty: "beginner",
    storyIntro:
      "Files are staged. Now it's time to freeze this moment in history.",
    objective: "Commit your staged files with a message",
    hints: [
      "To commit with a message: git commit -m \"your message\"",
      "Try: git commit -m \"initial commit\"",
    ],
    initialGitState: {
      initialized: true,
      files: [
        { name: "index.html", content: "<!DOCTYPE html>...", status: "staged" },
        { name: "style.css", content: "body { margin: 0; }", status: "staged" },
      ],
      stagingArea: [
        { name: "index.html", content: "<!DOCTYPE html>...", status: "staged" },
        { name: "style.css", content: "body { margin: 0; }", status: "staged" },
      ],
    },
    allowedCommands: [
      "git commit -m",
      "git status",
      "git add .",
      "git add index.html",
      "git add style.css",
    ],
    objectives: [
      {
        id: "commit-1",
        description: "Create a commit with a message",
        commandPattern: ["git commit -m"],
      },
    ],
    xpReward: 200,
    badge: badges["first-commit"],
    completionMessage: "First commit! Your history begins! 💾",
  },
  {
    id: "log",
    number: 5,
    title: "History Book",
    subtitle: "Read your commit log",
    difficulty: "beginner",
    storyIntro:
      "You've made a commit. But can you see it? Time to check the log.",
    objective: "View your commit history",
    hints: [
      "To see commit history: git log",
      "Just type: git log",
    ],
    initialGitState: {
      initialized: true,
      files: [{ name: "index.html", content: "<!DOCTYPE html>...", status: "committed" }],
      commits: [
        {
          id: "c1",
          message: "initial commit",
          timestamp: Date.now() - 60000,
          parentId: null,
          branch: "main",
        },
      ],
      branches: [{ name: "main", HEAD: "c1" }],
      currentBranch: "main",
    },
    allowedCommands: ["git log", "git status", "git init", "git add .", "git commit -m"],
    objectives: [
      { id: "log-1", description: "View the commit log", commandPattern: ["git log"] },
    ],
    xpReward: 100,
    completionMessage: "You can see your commit history! 📜",
  },

  // ─── TIER 2: REMOTES & BRANCHES ────────────────────────────
  {
    id: "branch",
    number: 6,
    title: "Fork in the Road",
    subtitle: "Create and switch branches",
    difficulty: "beginner-intermediate",
    storyIntro:
      "Your main branch is solid. But what if you want to experiment without breaking things?",
    objective: "Create a new branch and switch to it",
    hints: [
      "Create a branch: git branch feature",
      "Switch to it: git checkout feature",
      "Or both at once: git checkout -b feature",
    ],
    initialGitState: {
      initialized: true,
      files: [{ name: "app.js", content: "console.log('hello');", status: "committed" }],
      commits: [
        { id: "c1", message: "initial commit", timestamp: Date.now() - 120000, parentId: null, branch: "main" },
      ],
      branches: [{ name: "main", HEAD: "c1" }],
      currentBranch: "main",
    },
    allowedCommands: [
      "git branch",
      "git branch feature",
      "git checkout feature",
      "git checkout -b feature",
      "git switch feature",
      "git switch -c feature",
      "git checkout main",
      "git switch main",
      "git status",
      "git log",
    ],
    objectives: [
      {
        id: "branch-1",
        description: "Create a new branch named 'feature'",
        commandPattern: ["git branch feature", "git checkout -b feature", "git switch -c feature"],
      },
      {
        id: "branch-2",
        description: "Switch to the new branch",
        commandPattern: ["git checkout feature", "git switch feature"],
      },
    ],
    xpReward: 200,
    badge: badges["brancher"],
    completionMessage: "Branch created and checked out! 🌿",
  },
  {
    id: "merge",
    number: 7,
    title: "Merge Masters",
    subtitle: "Merge branches and resolve conflicts",
    difficulty: "beginner-intermediate",
    storyIntro:
      "Your feature branch is done. Time to bring it back to main. But wait... there's a conflict!",
    objective: "Merge your feature branch into main",
    hints: [
      "First switch to main: git checkout main",
      "Then merge: git merge feature",
      "If there's a conflict, edit the file to fix it, then: git add . && git commit",
    ],
    initialGitState: {
      initialized: true,
      files: [
        { name: "app.js", content: "console.log('hello');", status: "committed" },
      ],
      commits: [
        { id: "c1", message: "initial commit", timestamp: Date.now() - 240000, parentId: null, branch: "main" },
        { id: "c2", message: "add feature code", timestamp: Date.now() - 120000, parentId: "c1", branch: "feature" },
      ],
      branches: [
        { name: "main", HEAD: "c1" },
        { name: "feature", HEAD: "c2" },
      ],
      currentBranch: "feature",
    },
    allowedCommands: [
      "git checkout main",
      "git switch main",
      "git merge feature",
      "git add .",
      "git commit -m",
      "git status",
      "git log",
      "git branch",
    ],
    objectives: [
      {
        id: "merge-1",
        description: "Switch to the main branch",
        commandPattern: ["git checkout main", "git switch main"],
      },
      {
        id: "merge-2",
        description: "Merge the feature branch",
        commandPattern: ["git merge feature"],
      },
    ],
    xpReward: 300,
    badge: badges["merger"],
    completionMessage: "Branches merged! Conflict resolved! 🔀",
  },
  {
    id: "push",
    number: 8,
    title: "Launch Sequence",
    subtitle: "Push to a remote repository",
    difficulty: "beginner-intermediate",
    storyIntro:
      "Your code is safe locally. But what if your laptop explodes? Time to push to the cloud.",
    objective: "Add a remote and push your code",
    hints: [
      "Add a remote: git remote add origin https://github.com/user/repo.git",
      "Push to it: git push -u origin main",
    ],
    initialGitState: {
      initialized: true,
      files: [{ name: "app.js", content: "console.log('hello');", status: "committed" }],
      commits: [
        { id: "c1", message: "initial commit", timestamp: Date.now() - 120000, parentId: null, branch: "main" },
      ],
      branches: [{ name: "main", HEAD: "c1" }],
      currentBranch: "main",
    },
    allowedCommands: [
      "git remote add origin",
      "git push -u origin main",
      "git push origin main",
      "git push",
      "git status",
      "git log",
    ],
    objectives: [
      {
        id: "push-1",
        description: "Add a remote origin",
        commandPattern: ["git remote add origin"],
      },
      {
        id: "push-2",
        description: "Push your code to the remote",
        commandPattern: ["git push"],
      },
    ],
    xpReward: 250,
    badge: badges["pusher"],
    completionMessage: "Code is in the cloud! ☁️",
  },

  // ─── TIER 3: GITHUB FLOW ────────────────────────────────────
  {
    id: "pr-flow",
    number: 9,
    title: "Pull Request Pro",
    subtitle: "Create and merge a Pull Request",
    difficulty: "intermediate",
    storyIntro:
      "You've pushed a feature branch. Now it's time for the GitHub flow — open a PR, get it reviewed, and merge.",
    objective: "Open a Pull Request and merge it",
    hints: [
      "Create a branch: git checkout -b feature",
      "Make changes, commit, push: git push -u origin feature",
      "Then use: gh pr create",
      "Merge with: gh pr merge --merge",
    ],
    initialGitState: {
      initialized: true,
      files: [{ name: "app.js", content: "console.log('hello');", status: "committed" }],
      commits: [
        { id: "c1", message: "initial commit", timestamp: Date.now() - 300000, parentId: null, branch: "main" },
      ],
      branches: [{ name: "main", HEAD: "c1" }],
      currentBranch: "main",
      hasRemote: true,
      remoteUrl: "https://github.com/user/awesome-project.git",
    },
    allowedCommands: [
      "git checkout -b",
      "git switch -c",
      "git add .",
      "git commit -m",
      "git push",
      "git push -u origin",
      "gh pr create",
      "gh pr merge",
      "gh pr merge --merge",
      "git status",
      "git log",
      "git checkout main",
      "git switch main",
    ],
    objectives: [
      {
        id: "pr-1",
        description: "Create a feature branch",
        commandPattern: ["git checkout -b", "git switch -c"],
      },
      {
        id: "pr-2",
        description: "Commit and push changes",
        commandPattern: ["git push"],
      },
      {
        id: "pr-3",
        description: "Create a Pull Request",
        commandPattern: ["gh pr create"],
      },
      {
        id: "pr-4",
        description: "Merge the Pull Request",
        commandPattern: ["gh pr merge"],
      },
    ],
    xpReward: 400,
    badge: badges["pr-pro"],
    completionMessage: "PR created, reviewed, and merged! 🔄",
  },
  {
    id: "gitignore",
    number: 10,
    title: "Shadow Guard",
    subtitle: "Protect secrets with .gitignore",
    difficulty: "intermediate",
    storyIntro:
      "Wait — you just committed your .env file with API keys?! Quick, add a .gitignore before anyone sees.",
    objective: "Create a .gitignore and untrack sensitive files",
    hints: [
      "Create .gitignore: echo 'node_modules' > .gitignore",
      "Or use: touch .gitignore then add content",
      "To untrack a file: git rm --cached .env",
      "Commit the change: git commit -m \"add .gitignore\"",
    ],
    initialGitState: {
      initialized: true,
      files: [
        { name: "app.js", content: "console.log('hello');", status: "committed" },
        { name: ".env", content: "API_KEY=secret123", status: "committed" },
        { name: "node_modules/", content: "...", status: "untracked" },
      ],
      commits: [
        { id: "c1", message: "initial commit", timestamp: Date.now() - 200000, parentId: null, branch: "main" },
        { id: "c2", message: "add env file (oops)", timestamp: Date.now() - 100000, parentId: "c1", branch: "main" },
      ],
      branches: [{ name: "main", HEAD: "c2" }],
      currentBranch: "main",
    },
    allowedCommands: [
      "echo",
      "touch",
      "git rm --cached",
      "git add .gitignore",
      "git add .",
      "git commit -m",
      "git status",
      "git log",
    ],
    objectives: [
      {
        id: "gi-1",
        description: "Create a .gitignore file",
        commandPattern: ["echo", "touch"],
      },
      {
        id: "gi-2",
        description: "Untrack the .env file",
        commandPattern: ["git rm --cached"],
      },
      {
        id: "gi-3",
        description: "Commit the .gitignore",
        commandPattern: ["git commit -m"],
      },
    ],
    xpReward: 300,
    completionMessage: "Secrets protected! 🛡️",
  },

  // ─── TIER 4: GITHUB ACTIONS ─────────────────────────────────
  {
    id: "actions-intro",
    number: 11,
    title: "Automation Station",
    subtitle: "Write your first GitHub Actions workflow",
    difficulty: "advanced",
    storyIntro:
      "Manual testing is so last century. Time to automate — write a GitHub Actions workflow that runs on every push.",
    objective: "Create a CI workflow file",
    hints: [
      "Create the workflow directory: mkdir -p .github/workflows",
      "Create the workflow file with: echo 'name: CI' > .github/workflows/ci.yml",
      "Or write a full workflow YAML using the editor",
    ],
    initialGitState: {
      initialized: true,
      files: [
        { name: "app.js", content: "console.log('hello');", status: "committed" },
        { name: "package.json", content: '{"name": "my-app", "scripts": {"test": "echo OK"}}', status: "committed" },
      ],
      commits: [
        { id: "c1", message: "initial commit", timestamp: Date.now() - 300000, parentId: null, branch: "main" },
      ],
      branches: [{ name: "main", HEAD: "c1" }],
      currentBranch: "main",
      hasRemote: true,
      remoteUrl: "https://github.com/user/awesome-project.git",
    },
    allowedCommands: [
      "mkdir",
      "echo",
      "touch",
      "git add .github/workflows/ci.yml",
      "git add .",
      "git commit -m",
      "git status",
      "git log",
      "git push",
    ],
    objectives: [
      {
        id: "ci-1",
        description: "Create the workflow directory",
        commandPattern: ["mkdir"],
      },
      {
        id: "ci-2",
        description: "Create a CI workflow file",
        commandPattern: ["echo", "touch"],
      },
      {
        id: "ci-3",
        description: "Commit and push the workflow",
        commandPattern: ["git commit -m"],
      },
    ],
    xpReward: 400,
    badge: badges["ci-wizard"],
    completionMessage: "CI pipeline created! Watch it run! ⚡",
  },
  {
    id: "actions-run",
    number: 12,
    title: "Pipeline Run",
    subtitle: "Watch your CI pipeline execute",
    difficulty: "advanced",
    storyIntro:
      "Your workflow is pushed. GitHub Actions is picking it up. Watch the pipeline run step by step.",
    objective: "Trigger and monitor a CI workflow run",
    hints: [
      "Push to trigger: git push origin main",
      "Or manually trigger: gh workflow run ci.yml",
      "Check status: gh run list",
      "Watch logs: gh run watch",
    ],
    initialGitState: {
      initialized: true,
      files: [
        { name: "app.js", content: "console.log('hello');", status: "committed" },
        { name: ".github/workflows/ci.yml", content: "name: CI\non: push\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - run: npm install\n      - run: npm test", status: "committed" },
      ],
      commits: [
        { id: "c1", message: "initial commit", timestamp: Date.now() - 400000, parentId: null, branch: "main" },
        { id: "c2", message: "add CI workflow", timestamp: Date.now() - 200000, parentId: "c1", branch: "main" },
      ],
      branches: [{ name: "main", HEAD: "c2" }],
      currentBranch: "main",
      hasRemote: true,
      remoteUrl: "https://github.com/user/awesome-project.git",
    },
    allowedCommands: [
      "git push origin main",
      "git push",
      "gh workflow run",
      "gh run list",
      "gh run watch",
      "gh run status",
      "git status",
      "git log",
    ],
    objectives: [
      {
        id: "run-1",
        description: "Trigger a workflow run",
        commandPattern: ["git push", "gh workflow run"],
      },
      {
        id: "run-2",
        description: "Check the run status",
        commandPattern: ["gh run list", "gh run status", "gh run watch"],
      },
    ],
    xpReward: 500,
    completionMessage: "Pipeline passed! You're a CI/CD pro! 🏆",
  },
];

export function getLevelById(id: string): Level | undefined {
  return levels.find((l) => l.id === id);
}

export function getNextLevel(currentId: string): Level | undefined {
  const idx = levels.findIndex((l) => l.id === currentId);
  return idx >= 0 && idx < levels.length - 1 ? levels[idx + 1] : undefined;
}

export function getLevelsByDifficulty(difficulty: Level["difficulty"]): Level[] {
  return levels.filter((l) => l.difficulty === difficulty);
}
