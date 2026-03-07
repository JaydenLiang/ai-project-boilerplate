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
### PR Flow
```bash
# 1. Create and switch to branch
git checkout -b feature/<short-description>

# 2. Implement, commit changes, then push
git push -u origin feature/<short-description>

# 3. Create PR
gh pr create --title "<title>" --body "$(cat <<'EOF'
## Summary
- <bullet points>

## Test plan
- [ ] <manual test steps>
EOF
)"

# 4. Check CI status
gh pr checks

# 5. Merge and delete branch after approval
gh pr merge --squash --delete-branch
```

### Release Flow
```bash
# Bump version, tag, and create GitHub release
./scripts/release.sh <patch|minor|major>
```

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
