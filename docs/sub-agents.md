# Sub-Agents

All sub-agents live in `.claude/agents/` as Markdown files with YAML frontmatter. The frontmatter configures the agent; the Markdown body is its system prompt.

## Agent Index

| Agent | File | Model | Tools | Purpose |
| --- | --- | --- | --- | --- |
| `code-writer` | `.claude/agents/code-writer.md` | sonnet | Read, Write, Edit, Glob, Grep, Bash | Implements code changes and new features |
| `code-reviewer` | `.claude/agents/code-reviewer.md` | sonnet | Read, Glob, Grep, Write | Reviews code for bugs and over-engineering |
| `lessons-collector` | `.claude/agents/lessons-collector.md` | sonnet | Read, Write, Bash | Extracts reusable lessons, merges with Gist remote, syncs back to Gist |

## Agent File Format

```markdown
---
name: agent-name           # lowercase, hyphens only; matches filename
description: ...           # when Claude should delegate to this agent
tools: Read, Write, Bash   # comma-separated allowlist; omit to inherit all
model: sonnet              # sonnet | opus | haiku | inherit
---

System prompt goes here.
```

## Invocation

**Natural language** — Claude decides automatically:

```text
Use the code-reviewer agent to review my changes
```

**@-mention** — guaranteed invocation:

```text
@"code-reviewer (agent)" review MainFile.cs
```

## Typical Workflow

The main agent orchestrates a write → review loop, then collects lessons:

```text
main agent        →  creates task file:
                       .claude/tmp/task-<short-description>-<YYYYMMDD>.md

code-writer       →  reads task file, writes or edits code
                     writes impl lessons (if any) to:
                       .claude/tmp/lessons-<short-description>-<YYYYMMDD>.md

── review loop (repeats until APPROVED) ──────────────────────────────────────

code-reviewer     →  reviews code files + reads findings file
                     appends round results to:
                       .claude/tmp/review-<feature>-<YYYYMMDD>.md
                     appends review lessons (if any) to:
                       .claude/tmp/lessons-<short-description>-<YYYYMMDD>.md
                     returns: APPROVED or CHANGES REQUIRED

  if CHANGES REQUIRED:
main agent        →  writes a new task file with fixes needed
code-writer       →  fixes issues, appends impl lessons (if any)
                     (loop repeats from code-reviewer)

── after APPROVED ────────────────────────────────────────────────────────────

main agent        →  deletes task file

lessons-collector →  receives all temp file paths (lessons + review files)
                     syncs with Gist, merges, appends new lessons to:
                       docs/dev-lessons.md
                     uploads to Gist, deletes temp files
```

## Adding a New Agent

1. Create `.claude/agents/<agent-name>.md` with frontmatter + system prompt.
2. Add a row to the Agent Index table above.
3. Commit the file to version control.
