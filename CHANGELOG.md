# Changelog

<!-- AI: append a new entry after each work session. Do not edit previous entries. -->
<!-- Format: ## YYYY-MM-DD [Stage] — brief summary, then bullet points -->

## 2026-03-07 [CODING] — Update AI_INSTRUCTIONS.md and .gitignore
- Added step to update CHANGELOG.md before any code management action (step 5a)
- Added `ai-project-integration-plan/` to .gitignore

## 2026-03-07 [CODING] — Fix bin path in package.json (v1.1.2)
- Fixed `bin` entry path from `./bin/cli.js` to `bin/cli.js` to comply with npm requirements
- Ensures `ai-project` CLI command is correctly registered after installation

## 2026-03-07 [CODING] — CLI refactor with init command and custom naming
- Refactored CLI command structure from `ai-project <project-name>` to `ai-project init <project-location>`
- Added support for existing projects: generates `.ai-project-refining` file with AI migration guidance
- Added `-n <project-name>` flag for custom project naming in README.md
- Externalized migration guidance to `.ai-project-refining-template` file for decoupled CLI logic
- Auto-creates `.ai-stage` file set to "PLANNING" for new projects
- Updated documentation in README.md and docs/architecture.md

## 2026-03-07 [CODING] — Initial release
- Implemented CLI with version check against npm registry
- Template includes AI_INSTRUCTIONS.md, CLAUDE.md, .ai-stage, CHANGELOG.md, README.md, docs/*
- Published to GitHub: JaydenLiang/ai-project-boilerplate
