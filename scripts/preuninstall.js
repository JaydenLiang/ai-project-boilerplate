#!/usr/bin/env node
const fs = require("fs");
const path = require("path");
const os = require("os");

const prefsPath = path.join(os.homedir(), ".config", "ai-project", "prefs.json");
try {
  fs.rmSync(prefsPath, { force: true });
} catch {
  // silently ignore
}
