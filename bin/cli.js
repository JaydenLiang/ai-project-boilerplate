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

async function checkForUpdate() {
  const latest = await fetchLatestVersion();
  if (latest && compareVersions(latest, CURRENT_VERSION) > 0) {
    console.log(`\n  Update available: ${CURRENT_VERSION} → ${latest}`);
    console.log(`  Run to update:    npm install -g ai-project-boilerplate\n`);
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

async function main() {
  const args = process.argv.slice(2);

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

  const projectLocation = args[1];
  if (!projectLocation) {
    console.log(`Usage: ai-project init <project-location>`);
    process.exit(0);
  }

  const dest = path.resolve(process.cwd(), projectLocation);

  if (fs.existsSync(dest)) {
    // Existing project: Create .ai-project-refining from template
    const refiningTemplateFile = path.join(__dirname, "../.ai-project-refining-template");
    const refiningFile = path.join(dest, '.ai-project-refining');
    const template = fs.readFileSync(refiningTemplateFile, "utf8");
    fs.writeFileSync(refiningFile, template);
    console.log(`\nDetected existing project: ${projectLocation}`);
    console.log(`Created .ai-project-refining with migration guidance.`);
    console.log(`\nNext: Review .ai-project-refining and update your project accordingly.`);
  } else {
    // New project: Copy template
    const templateDir = path.join(__dirname, "../template");
    fs.mkdirSync(dest, { recursive: true });
    copyTemplate(templateDir, dest);

    // Replace placeholder in README
    const readmePath = path.join(dest, "README.md");
    const readme = fs.readFileSync(readmePath, "utf8");
    const projectName = path.basename(dest);
    fs.writeFileSync(readmePath, readme.replace("__PROJECT_NAME__", projectName));

    // Create .ai-stage
    fs.writeFileSync(path.join(dest, '.ai-stage'), 'PLANNING');

    console.log(`\nCreated AI-collaborated project: ${projectName}`);
    console.log(`\nFiles created:`);
    console.log(`  AI_INSTRUCTIONS.md   — AI router (source of truth)`);
    console.log(`  CLAUDE.md            — Claude Code entry`);
    console.log(`  .ai-stage            — current stage (PLANNING)`);
    console.log(`  CHANGELOG.md`);
    console.log(`  README.md`);
    console.log(`  docs/planning.md`);
    console.log(`  docs/architecture.md`);
    console.log(`  docs/testing.md`);
    console.log(`  docs/deployment.md`);
    console.log(`\nNext: cd ${projectName} && fill in docs/planning.md`);
  }
}

main();
