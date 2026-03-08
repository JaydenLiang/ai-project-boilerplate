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

## Workflow
Read `.ai-workflow` for the version control workflow in use (e.g. `github`, `gitlab`, `bitbucket`).

**If `.ai-workflow` does not exist or contains `unknown`:**
- Ask the user: *"Which version control workflow does this project use? (e.g. github, gitlab, bitbucket)"*
- Write the answer (lowercase, one word) to `.ai-workflow`
- Do not proceed with any commit/PR/release action until this is resolved

**When to read the workflow file:**
- ONLY when you are about to commit, push, open a PR, or create a release
- Do NOT read it on every session — only when a code management action is needed
- The workflow file to read is: `workflows/<value-in-.ai-workflow>.md`

## Instructions
1. Read ONLY the file for the current stage above.
2. Do not read other stage files unless explicitly asked.
3. After completing work, append a summary to `CHANGELOG.md`.
4. When the stage changes, update `.ai-stage` on the current branch.
5. Before any commit/PR/release: check `.ai-workflow`, read the corresponding `workflows/*.md`, and follow it exactly.

## First-Time Setup (AI tools other than Claude Code)
If your tool uses a dedicated instructions file (e.g. `.cursorrules` for Cursor,
`.github/copilot-instructions.md` for Copilot, `.windsurfrules` for Windsurf),
add the following line to that file so it points here:

    @AI_INSTRUCTIONS.md

or if `@import` is not supported, add:

    See AI_INSTRUCTIONS.md for all instructions.
