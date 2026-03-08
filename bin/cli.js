#!/usr/bin/env node

const https = require("https");
const fs = require("fs");
const path = require("path");

const REPO = "JaydenLiang/ai-project-boilerplate";
const CURRENT_VERSION = require("../package.json").version;

function fetchLatestVersion() {
  return new Promise((resolve, reject) => {
    const url = `https://registry.npmjs.org/ai-project-boilerplate/latest`;
    https
      .get(url, { headers: { "User-Agent": "ai-project-boilerplate-cli" } }, (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            resolve(JSON.parse(data).version);
          } catch {
            resolve(null);
          }
        });
      })
      .on("error", () => resolve(null));
  });
}

function compareVersions(a, b) {
  const pa = a.split(".").map(Number);
  const pb = b.split(".").map(Number);
  for (let i = 0; i < 3; i++) {
    if (pa[i] > pb[i]) return 1;
    if (pa[i] < pb[i]) return -1;
  }
  return 0;
}

function getPrefsPath() {
  const os = require("os");
  return path.join(os.homedir(), ".config", "ai-project", "prefs.json");
}

function loadPrefs() {
  try {
    return JSON.parse(fs.readFileSync(getPrefsPath(), "utf8"));
  } catch {
    return {};
  }
}

function savePrefs(prefs) {
  const prefsPath = getPrefsPath();
  fs.mkdirSync(path.dirname(prefsPath), { recursive: true });
  fs.writeFileSync(prefsPath, JSON.stringify(prefs, null, 2));
}

function checkPackageManager() {
  const isPnpm = __filename.includes("pnpm");
  if (isPnpm) return;

  const prefs = loadPrefs();
  if (prefs.suppressPnpmWarning) return;

  const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
  const cyan   = (s) => `\x1b[36m${s}\x1b[0m`;
  const bold   = (s) => `\x1b[1m${s}\x1b[0m`;
  const dim    = (s) => `\x1b[2m${s}\x1b[0m`;

  const hasPnpm = (() => {
    try { require("child_process").execSync("pnpm --version", { stdio: "ignore" }); return true; } catch { return false; }
  })();

  const strip  = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");

  let lines;
  if (hasPnpm) {
    const cmd = bold(cyan("pnpm add -g ai-project-boilerplate"));
    lines = [
      `   ${bold(yellow("RECOMMENDED:"))} install via pnpm for best compatibility`,
      `   Run ${cmd}`,
      `   To suppress this warning: ${bold(cyan("ai-project --no-pnpm-warning"))}`,
    ];
  } else {
    const installCmd = bold(cyan("npm install -g pnpm"));
    const migrateCmd = bold(cyan("pnpm add -g ai-project-boilerplate"));
    lines = [
      `   ${bold(yellow("RECOMMENDED:"))} install via pnpm for best compatibility`,
      `   1. Install pnpm: ${installCmd}`,
      `   2. Then migrate: ${migrateCmd}`,
      `   To suppress this warning: ${bold(cyan("ai-project --no-pnpm-warning"))}`,
    ];
  }

  const width  = Math.max(...lines.map(l => strip(l).length)) + 2;
  const border = yellow("─".repeat(width));

  console.error(`\n${yellow("┌")}${border}${yellow("┐")}`);
  for (const line of lines) {
    console.error(`${yellow("│")} ${line.padEnd(line.length + width - strip(line).length - 1)}${yellow("│")}`);
  }
  console.error(`${yellow("└")}${border}${yellow("┘")}\n`);
}

async function checkForUpdate() {
  const latest = await fetchLatestVersion();
  if (latest && compareVersions(latest, CURRENT_VERSION) > 0) {
    const yellow = (s) => `\x1b[33m${s}\x1b[0m`;
    const cyan   = (s) => `\x1b[36m${s}\x1b[0m`;
    const bold   = (s) => `\x1b[1m${s}\x1b[0m`;
    const dim    = (s) => `\x1b[2m${s}\x1b[0m`;

    const strip  = (s) => s.replace(/\x1b\[[0-9;]*m/g, "");

    const isPnpm = __filename.includes("pnpm");
    const prefs  = loadPrefs();

    const updateCmd = (isPnpm || !prefs.suppressPnpmWarning)
      ? bold(cyan("pnpm add -g ai-project-boilerplate"))
      : bold(cyan("npm install -g ai-project-boilerplate"));

    const tag  = bold(yellow("UPDATE AVAILABLE"));
    const from = dim(CURRENT_VERSION);
    const to   = bold(cyan(latest));
    const url  = cyan(`https://github.com/${REPO}/releases/tag/v${latest}`);

    const lines = [
      `   ${tag}   ${from} → ${to}`,
      `   Run ${updateCmd} to update`,
      `   See what's changed: ${url}`,
    ];

    if (!isPnpm && !prefs.suppressPnpmWarning) {
      lines.push(`   To suppress pnpm suggestion: ${bold(cyan("ai-project --no-pnpm-warning"))}`);
    }

    const width  = Math.max(...lines.map(l => strip(l).length)) + 2;
    const border = yellow("─".repeat(width));

    console.error(`\n${yellow("┌")}${border}${yellow("┐")}`);
    for (const line of lines) {
      console.error(`${yellow("│")} ${line.padEnd(line.length + width - strip(line).length - 1)}${yellow("│")}`);
    }
    console.error(`${yellow("└")}${border}${yellow("┘")}\n`);
    return true;
  }
  return false;
}

function copyTemplate(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyTemplate(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function prompt(question) {
  const readline = require('readline');
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  return new Promise(resolve => rl.question(question, answer => { rl.close(); resolve(answer); }));
}

async function main() {
  const args = process.argv.slice(2);

  // Handle --no-pnpm-warning
  if (args[0] === '--no-pnpm-warning') {
    const prefs = loadPrefs();
    prefs.suppressPnpmWarning = true;
    savePrefs(prefs);
    console.log("pnpm warning suppressed. To re-enable, delete ~/.config/ai-project/prefs.json");
    process.exit(0);
  }

  // Check package manager preference
  checkPackageManager();

  // Always check for updates first
  await checkForUpdate();

  // Handle --version
  if (args[0] === '--version' || args[0] === '-v') {
    console.log(CURRENT_VERSION);
    process.exit(0);
  }

  // Validate command
  if (args.length === 0 || args[0] !== 'init') {
    console.log(`Usage: ai-project init <project-location>`);
    console.log(`       ai-project --version`);
    process.exit(0);
  }

  // Get project location (first argument after 'init')
  const projectLocation = args[1];
  if (!projectLocation) {
    console.log(`Usage: ai-project init <project-location>`);
    process.exit(0);
  }

  const dest = path.resolve(process.cwd(), projectLocation);
  const integrationDir = path.join(dest, 'ai-project-integration-plan');

  // Create dest if needed
  fs.mkdirSync(dest, { recursive: true });

  // Handle existing ai-project-integration-plan/
  if (fs.existsSync(integrationDir)) {
    const answer = await prompt('ai-project-integration-plan/ already exists. Overwrite? (y/N): ');
    if (answer.trim().toLowerCase() !== 'y') {
      console.log('Aborted.');
      process.exit(0);
    }
    fs.rmSync(integrationDir, { recursive: true, force: true });
  }

  // Create integration plan dir and copy template into it
  fs.mkdirSync(integrationDir, { recursive: true });
  const templateDir = path.join(__dirname, '../template');
  copyTemplate(templateDir, integrationDir);

  // Copy .ai-project-integration-instructions-template as .ai-project-integration-instructions
  const instructionsTemplatePath = path.join(__dirname, '../.ai-project-integration-instructions-template');
  const instructionsDestPath = path.join(integrationDir, '.ai-project-integration-instructions');
  fs.copyFileSync(instructionsTemplatePath, instructionsDestPath);

  console.log(`\nCreated: ai-project-integration-plan/`);

  // Offer to add to .gitignore
  const gitignorePath = path.join(dest, '.gitignore');
  const gitignoreEntry = 'ai-project-integration-plan/';
  const alreadyIgnored = fs.existsSync(gitignorePath) &&
    fs.readFileSync(gitignorePath, 'utf8').includes(gitignoreEntry);

  if (!alreadyIgnored) {
    const gitAnswer = await prompt(`Add ${gitignoreEntry} to .gitignore? (Y/n): `);
    if (gitAnswer.trim().toLowerCase() !== 'n') {
      fs.appendFileSync(gitignorePath, `\n${gitignoreEntry}\n`);
      console.log(`.gitignore updated.`);
    } else {
      console.log(`Reminder: add ${gitignoreEntry} to .gitignore manually.`);
    }
  }

  console.log(`\nNext: Ask your AI to read:`);
  console.log(`  ai-project-integration-plan/.ai-project-integration-instructions`);
  console.log(`\nYour AI will decide how to integrate the boilerplate into your project.`);
}

main();
