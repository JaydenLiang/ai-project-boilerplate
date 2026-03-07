# Planning

## Project Goal
A global npm CLI that scaffolds AI-collaborated projects with stage-based AI instruction files, supporting Claude Code, Cursor, Copilot, and Windsurf.

## Problem Statement
Every AI-collaborated project needs the same set of instruction files. Setting them up manually is repetitive and inconsistent across projects.

## Non-Goals
- Not a full project generator (no src code, no framework scaffolding)
- Not opinionated about programming language or stack

## Requirements
### Must Have
- `ai-project <name>` creates a directory with all boilerplate files
- Version check against npm registry on every invocation
- Upgrade prompt with exact command when newer version exists

### Nice to Have
- `--version` flag
- Colorized output

## Key Decisions
| Decision | Chosen | Reason |
|----------|--------|--------|
| Version source | npm registry | Authoritative, no extra GitHub API auth needed |
| Stage storage | `.ai-stage` file | One line, branch-safe, minimal merge conflict |
| AI router | `AI_INSTRUCTIONS.md` | Tool-agnostic; each tool's config file points to it |

## Next Step
When requirements are finalized, update `.ai-stage` to `CODING` on this branch.
