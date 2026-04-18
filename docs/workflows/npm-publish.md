# npm Publish Workflow

## Prerequisites
- Logged in to npm: `npm whoami` (if not, run `npm login`)
- `NODE_AUTH_TOKEN` set in CI environment for automated publishing

## When to Use
Read this file only when you are about to publish a new version to the npm registry.

---

## Publish Flow

```bash
# 1. Ensure you are on main with the correct version in package.json
git checkout main && git pull origin main
node -e "console.log(require('./package.json').version)"

# 2. Dry-run to verify package contents
npm publish --dry-run

# 3. Publish with the default 'latest' tag
npm publish

# 4. Verify the published version
npm view <package-name> version
```

### Publishing a Pre-release
```bash
# Publish under a dist-tag (e.g. beta, next) — does NOT affect 'latest'
npm publish --tag beta

# Verify
npm view <package-name> dist-tags
```

---

## Version Bump
Version bumps must happen before publishing, via the VCS workflow (e.g. a PR merging a `release/vX.Y.Z` branch). Do not bump the version manually outside of that flow.

---

## Quick Reference

```bash
# Check who you are logged in as
npm whoami

# List all published versions
npm view <package-name> versions --json

# Deprecate a version
npm deprecate <package-name>@<version> "<reason>"

# Unpublish within 72 hours (use sparingly)
npm unpublish <package-name>@<version>
```
