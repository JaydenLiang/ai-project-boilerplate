# Testing

## Test Commands
```bash
# Manual smoke test
node bin/cli.js test-project
ls test-project/

# Cleanup
rm -rf test-project/
```

## Coverage Requirements
- Template copy produces all expected files
- __PROJECT_NAME__ replaced correctly in README.md
- Version check: outdated / up-to-date / unreachable npm scenarios

## Test Structure
- No test framework currently; manual smoke tests only

## What to Test
- All template files are copied including dotfiles (`.ai-stage`)
- Existing directory is rejected with error
- `--version` flag prints version and exits

## What NOT to Test
- npm registry availability (external)

## Known Issues / Flaky Tests
-

## Next Step
When all critical paths are covered and tests pass, update `.ai-stage` to `DEPLOY` on this branch.
