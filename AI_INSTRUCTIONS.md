# AI Instructions — AI Router

## Current Stage
Read `.ai-stage` for the current stage value.

## Stage → Document Map
| Stage | Read This File | Purpose |
|-------|---------------|---------|
| PLANNING | `docs/planning.md` | Goals, requirements, decisions |
| CODING | `docs/architecture.md` | Structure, conventions, commands |
| TESTING | `docs/testing.md` | Test strategy, commands, coverage rules |
| DEPLOY | `docs/deployment.md` | Env vars, deploy steps, rollback |

## Always-Available
- `CHANGELOG.md` — append completed work after each session

## Instructions
1. Read ONLY the file for the current stage above.
2. Do not read other stage files unless explicitly asked.
3. After completing work, append a summary to `CHANGELOG.md`.
4. When the stage changes, update `.ai-stage` on the current branch.

## First-Time Setup (AI tools other than Claude Code)
If your tool uses a dedicated instructions file (e.g. `.cursorrules` for Cursor,
`.github/copilot-instructions.md` for Copilot, `.windsurfrules` for Windsurf),
add the following line to that file so it points here:

    @AI_INSTRUCTIONS.md

or if `@import` is not supported, add:

    See AI_INSTRUCTIONS.md for all instructions.
