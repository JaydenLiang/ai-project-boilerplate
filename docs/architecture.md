# Architecture

## Stack
- Node.js (no dependencies, stdlib only)
- npm for distribution

## Directory Structure
```
bin/
  cli.js              — CLI entry point
template/
  AI_INSTRUCTIONS.md
  CLAUDE.md
  .ai-stage
  README.md
  CHANGELOG.md
  docs/
    planning.md
    architecture.md
    testing.md
    deployment.md
package.json
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

# 3. Create PR (auto-generates body from commits)
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
# Use the release script (handles versioning, tagging, and GitHub release)
./scripts/release.sh <patch|minor|major>
```

## Key Conventions
- No external dependencies; use Node.js `https`, `fs`, `path` only
- Template files are copied verbatim except README.md (`__PROJECT_NAME__` replaced)
- Version check is non-blocking: failure to reach npm silently skips the check

## Commands
```bash
# Install globally
npm install -g ai-project-boilerplate

# Run
ai-project init <project-location>
ai-project --version

# Local dev test
node bin/cli.js init <project-location>

# Publish
npm publish
```

## Module Responsibilities
- `bin/cli.js` — arg parsing, version check, template copy, README substitution

## Data Flow

### New Project
```
ai-project init <project-location>
  → <project-location> doesn't exist
    → create directory
    → copy template/ → <project-location>/
    → replace __PROJECT_NAME__ in README.md
    → create .ai-stage with "PLANNING"
    → print summary
```

### Existing Project
```
ai-project init <project-location>
  → <project-location> exists
    → create .ai-project-refining file with migration guidance
    → print success and next steps
```

### All Invocations
```
cli invoked
  → fetch npm registry for latest version
  → compare with package.json version
  → print upgrade prompt if outdated
```

## Constraints & Off-Limits
- Do not add external npm dependencies
- Do not modify template files without updating both template/ and this project's own docs

## Next Step
When implementation is stable and ready for tests, update `.ai-stage` to `TESTING` on this branch.
