# Architecture

## Stack
<!-- Language, runtime, key dependencies -->

## Directory Structure
```
/
```

## Git Workflow
- **All changes to `main` must go through a PR — no exceptions, including version bumps and chores**
- Every change must be developed on a dedicated branch — never commit directly to `main`
- Branch naming:
  - `feature/<short-description>` — for new functionality
  - `fix/<short-description>` — for bug fixes
  - `chore/<short-description>` — for version bumps, dependency updates, config changes
### PR Flow
1. Create a feature or fix branch and push to remote
2. Open a pull request targeting `main` (e.g. via `gh pr create` or your Git host's UI)
3. Check CI status (e.g. `gh pr checks`)
4. Merge and delete the branch after approval (e.g. `gh pr merge --squash --delete-branch`)

### Release Flow
1. Bump the version (follow your project's versioning convention)
2. Commit the version change and tag the commit (e.g. `vX.Y.Z`)
3. Push the tag to remote
4. Publish / deploy (e.g. create a release on your Git host, publish to a registry, deploy to an environment)

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
