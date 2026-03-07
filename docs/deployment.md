# Deployment

## Environment Variables
| Variable | Required | Description |
|----------|----------|-------------|
| NODE_AUTH_TOKEN | Yes (CI) | npm publish auth token |

## Deploy Steps
```bash
# 1. Bump version in package.json
# 2. Commit and push
# 3. Publish to npm
npm publish
```

## Rollback
```bash
# Unpublish within 72 hours
npm unpublish ai-project-boilerplate@<version>
```

## Environments
| Env | URL / Target | Notes |
|-----|-------------|-------|
| npm | https://www.npmjs.com/package/ai-project-boilerplate | public registry |
| github | JaydenLiang/ai-project-boilerplate | source of truth |

## Post-Deploy Checks
- `npm install -g ai-project-boilerplate` installs cleanly
- `ai-project test-output` generates correct files

## Known Risks
- npm package name must not conflict with existing packages
