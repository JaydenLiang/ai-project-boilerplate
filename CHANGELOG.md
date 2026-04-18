# Changelog

<!-- AI: append a new entry after each work session. Do not edit previous entries. -->
<!-- Format: ## YYYY-MM-DD [Stage] — brief summary, then bullet points -->

## 2026-04-18 [CODING] — Add sub-agents, coding guide, and dev-lessons workflow
- Added three Claude sub-agents: code-writer, code-reviewer, lessons-collector to template/agents/
- Added docs/coding-guide.md and docs/sub-agents.md
- Updated docs/workflows/github.md to use --no-ff merge strategy
- Updated AI_INSTRUCTIONS.md to reference docs/coding-guide.md as always-available
- Updated .gitignore for dev-lessons local files
- CLI: prompt user during init whether to install sub-agents into .claude/agents/

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
