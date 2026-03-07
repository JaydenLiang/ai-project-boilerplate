# ai-project-boilerplate

CLI to scaffold AI-collaborated projects with stage-based AI instruction files.

## Install

```bash
npm install -g ai-project-boilerplate
```

## Usage

```bash
ai-project init <project-location>
```

Creates a new directory or refines an existing project for AI collaboration with the following structure:

```
<project-location>/
  AI_INSTRUCTIONS.md   — AI router (source of truth for all AI tools)
  CLAUDE.md            — Claude Code entry (@imports AI_INSTRUCTIONS.md)
  .ai-stage            — current stage, tracked per branch
  CHANGELOG.md
  README.md
  docs/
    planning.md        — PLANNING stage
    architecture.md    — CODING stage
    testing.md         — TESTING stage
    deployment.md      — DEPLOY stage
```

## How it works

Each AI session, the AI reads only `AI_INSTRUCTIONS.md` + the one doc for the current stage.
Stage is stored in `.ai-stage` (one line) so it travels with the branch and causes minimal merge conflicts.

### Stages

| Stage | Doc | Purpose |
|-------|-----|---------|
| PLANNING | `docs/planning.md` | Goals, requirements, decisions |
| CODING | `docs/architecture.md` | Structure, conventions, commands |
| TESTING | `docs/testing.md` | Test strategy, coverage rules |
| DEPLOY | `docs/deployment.md` | Env vars, deploy steps, rollback |

### Updating the stage

```bash
echo "CODING" > .ai-stage
git add .ai-stage && git commit -m "chore: advance stage to CODING"
```

## Version check

Every invocation checks npm for a newer version and prints an upgrade prompt if one exists.

## License

MIT
