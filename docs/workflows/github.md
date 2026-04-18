# GitHub Workflow

## Branch Naming
- **All changes to `main` must go through a PR — no exceptions**
- Never commit directly to `main`
- `feature/<short-description>` — new functionality
- `fix/<short-description>` — bug fixes
- `chore/<short-description>` — version bumps, config changes, dependency updates

---

## PR Flow

```bash
# 1. Create and switch to a branch
git checkout -b feature/<short-description>

# 2. Make changes, commit, and push
git add <files>
git commit -m "feat: describe the change"
git push -u origin feature/<short-description>

# 3. Create a pull request
gh pr create \
  --title "feat: describe the change" \
  --body "$(cat <<'EOF'
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

---

## Release Flow

### Automated (Recommended)
If a `scripts/release.sh` exists in the project:

```bash
# Bumps version via PR, tags commit, creates GitHub release
./scripts/release.sh <patch|minor|major>

# Then publish to registry if applicable (e.g. npm)
npm publish
```

### Manual
```bash
# 1. Ensure you are on main with a clean working tree
git checkout main && git pull origin main

# 2. Bump version (no commit yet)
npm version patch --no-git-tag-version   # or minor / major

# 3. Create a release branch, commit, push, and open a PR
git checkout -b release/v<version>
git add package.json
git commit -m "chore: bump version to <version>"
git push -u origin release/v<version>

gh pr create \
  --title "chore: release v<version>" \
  --body "Version bump to v<version>." \
  --base main

# 4. Merge the PR
gh pr merge release/v<version> --squash --delete-branch

# 5. Pull merged commit, tag it, and push the tag
git checkout main && git pull origin main
git tag v<version>
git push origin v<version>

# 6. Create a GitHub release
gh release create v<version> \
  --title "v<version>" \
  --generate-notes

# 7. Publish to registry if applicable
npm publish
```

---

## Quick Reference

```bash
# List open PRs
gh pr list

# View PR status and checks
gh pr view
gh pr checks

# Merge current branch's PR
gh pr merge --squash --delete-branch

# List releases
gh release list

# View a release
gh release view v<version>

# Delete a release (e.g. to redo)
gh release delete v<version>
```
