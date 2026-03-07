#!/usr/bin/env bash
# Release script: bumps version via PR, creates git tag, publishes GitHub release
# Usage: ./scripts/release.sh <patch|minor|major>
set -euo pipefail

BUMP="${1:-patch}"

if [[ "$BUMP" != "patch" && "$BUMP" != "minor" && "$BUMP" != "major" ]]; then
  echo "Usage: $0 <patch|minor|major>"
  exit 1
fi

# Ensure on main and clean
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [[ "$BRANCH" != "main" ]]; then
  echo "Error: must be on main branch (currently on '$BRANCH')"
  exit 1
fi

if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "Error: working tree is not clean. Commit or stash changes first."
  exit 1
fi

# Pull latest
git pull origin main

# Bump version in package.json (no commit yet)
NEW_VERSION=$(npm version "$BUMP" --no-git-tag-version | tr -d 'v')
echo "Bumping to v${NEW_VERSION}..."

# Create a release branch, commit version bump, push, open PR, merge, delete branch
RELEASE_BRANCH="release/v${NEW_VERSION}"
git checkout -b "$RELEASE_BRANCH"
git add package.json
git commit -m "chore: bump version to ${NEW_VERSION}"
git push -u origin "$RELEASE_BRANCH"

echo "Creating PR for version bump..."
gh pr create \
  --title "chore: release v${NEW_VERSION}" \
  --body "Automated version bump to \`${NEW_VERSION}\` via release script." \
  --base main \
  --head "$RELEASE_BRANCH"

echo "Merging release PR..."
gh pr merge "$RELEASE_BRANCH" --squash --delete-branch

# Switch back to main and pull the merged commit
git checkout main
git pull origin main

# Tag the merge commit and push
git tag "v${NEW_VERSION}"
git push origin "v${NEW_VERSION}"

# Create GitHub release with auto-generated notes
gh release create "v${NEW_VERSION}" \
  --title "v${NEW_VERSION}" \
  --generate-notes

echo ""
echo "Released v${NEW_VERSION}. Publish to npm with: npm publish"
