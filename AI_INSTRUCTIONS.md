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
- `docs/coding-guide.md` — coding conventions and sub-agent workflow; always follow these

## Workflow
`.ai-workflow` lists the active workflows for this project, one per line. Each entry maps to `docs/workflows/<name>.md`.

Example `.ai-workflow`:
```
github
npm-publish
```

**If `.ai-workflow` is missing or every line is `unknown`:**
- Ask the user: *"Which workflows does this project use? (e.g. github, npm-publish, gitlab)"*
- Write the answers to `.ai-workflow`, one per line
- Do not proceed with any code management action until this is resolved

**When to read workflow files:**
- Do NOT read workflow files on session start or during normal coding
- ONLY read when you are about to perform a code management action
- Read only the workflow(s) relevant to the current action:

| Action | Read this workflow |
|--------|-------------------|
| commit / push / PR / branch | the VCS workflow (e.g. `github`, `gitlab`) |
| publish to a package registry | the publish workflow (e.g. `npm-publish`) |
| release (tag + publish) | both VCS and publish workflows |

If multiple workflows apply to the current action, read all of them.

## Instructions
1. Read ONLY the file for the current stage above.
2. Do not read other stage files unless explicitly asked.
3. After completing work, append a summary to `CHANGELOG.md`.
4. When the stage changes, update `.ai-stage` on the current branch.
5. Before any code management action:
   a. Update `CHANGELOG.md` first — include it in the same commit.
   b. Check `.ai-workflow`, read the relevant `docs/workflows/*.md`, and follow it exactly.

## First-Time Setup (AI tools other than Claude Code)
If your tool uses a dedicated instructions file (e.g. `.cursorrules` for Cursor,
`.github/copilot-instructions.md` for Copilot, `.windsurfrules` for Windsurf),
add the following line to that file so it points here:

    @AI_INSTRUCTIONS.md

or if `@import` is not supported, add:

    See AI_INSTRUCTIONS.md for all instructions.
