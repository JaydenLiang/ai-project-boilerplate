# Architecture

## Stack
<!-- Language, runtime, key dependencies -->

## Directory Structure
```
/
```

## Git Workflow
- Every new feature or bug fix must be developed on a dedicated branch — never commit directly to `main`
- Branch naming:
  - `feature/<short-description>` — for new functionality
  - `fix/<short-description>` — for bug fixes
- Steps:
  1. `git checkout -b feature/<short-description>` (or `fix/`)
  2. Implement and commit changes on the branch
  3. Open a PR / merge into `main`
  4. Delete the branch after merge

## Key Conventions
<!-- Naming, file organization, patterns to follow -->
-

## Commands
```bash
# Install
# Build
# Run
# Lint
```

## Module Responsibilities
<!-- One line per module/file explaining its role -->

## Data Flow
<!-- How data moves through the system (can be ASCII diagram) -->

## Constraints & Off-Limits
<!-- Things AI must NOT change or touch -->
-

## Next Step
When implementation is stable and ready for tests, update `.ai-stage` to `TESTING` on this branch.
