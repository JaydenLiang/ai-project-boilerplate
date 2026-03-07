#!/usr/bin/env bash
# Release script: bumps version, creates git tag, publishes GitHub release
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

# Bump version in package.json and get new version
NEW_VERSION=$(npm version "$BUMP" --no-git-tag-version | tr -d 'v')
echo "Bumping to v${NEW_VERSION}..."

# Commit version bump
git add package.json
git commit -m "chore: bump version to ${NEW_VERSION}"

# Create and push tag
git tag "v${NEW_VERSION}"
git push origin main --tags

# Create GitHub release with auto-generated notes
gh release create "v${NEW_VERSION}" \
  --title "v${NEW_VERSION}" \
  --generate-notes

echo ""
echo "Released v${NEW_VERSION}. Publish to npm with: npm publish"
