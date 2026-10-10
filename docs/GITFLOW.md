# GitFlow — Cut X Egypt storefront

Branching rules for **we3ds-solution/Cutx-Store-F** (frontend-only demo app).

## Branches

| Branch | Role |
|--------|------|
| `main` | Production (Vercel production + release workflow) |
| `develop` | Integration / next release |
| `feature/*` | New work → PR to **develop** |
| `bugfix/*` | Fixes → PR to **develop** |
| `docs/*` / `chore/*` / `refactor/*` | Docs, CI, cleanup → PR to **develop** |
| `hotfix/*` | Production emergency → PR to **main**, then merge/cherry-pick to **develop** |
| `release/*` | Release prep → **main** (and back to develop) |

```
main  ←  hotfix/* , release/*
  ↑
develop  ←  feature/* , bugfix/* , docs/* , chore/*
```

**Note:** Infra-only hotfixes (e.g. CI workflows) may land on `main` first so production Actions update immediately; always sync **develop** afterward.

## Naming examples

```
feature/shop-pagination-i18n
bugfix/cart-stock-guard
chore/ci-perf-and-cleanup
docs/development-guidelines
hotfix/audit-transitive-vulns
release/2.3.0
```

## Daily flow

```bash
git checkout develop && git pull
git checkout -b feature/my-change
# … commit with Conventional Commits …
git push -u origin feature/my-change
# Open PR → develop
```

### Conventional Commits (required on PR title)

```
feat(scope): …
fix(scope): …
docs(scope): …
chore(scope): …
ci(scope): …
```

Types accepted by CI: `feat|fix|docs|style|refactor|perf|test|chore|ci|build|revert`.

## CI gates

On `pull_request` / push to `main` and `develop`:

1. **GitFlow** — branch name + PR title convention  
2. **Frontend** — `pnpm install --frozen-lockfile`, `typecheck`, `build`  
3. Labels / CodeQL as configured  

There is **no** lint/test script yet; typecheck + build are the merge gates.

On push to **main**: semantic-release may tag and publish GitHub Release notes (not an npm package).

## Hotfix

```bash
git checkout main && git pull
git checkout -b hotfix/short-name
# fix → PR → main → merge
git checkout develop && git pull
git merge main   # or cherry-pick
git push origin develop
```

## Merge style

- Prefer **squash** for feature PRs (clean history on develop/main).  
- Keep `frontend/pnpm-lock.yaml` in the same commit as dependency changes.

## Protection (recommended)

- Require PR + passing checks on `main` and `develop`  
- No direct pushes to `main`  
- CODEOWNERS review when available  

## More detail

Long-form Git recipes (rebase, conflict resolution, semver tags) are standard GitFlow; keep this file aligned with **Cut X** targets and CI reality rather than the old Clothing Shop / backend monorepo.

See also: [DEVELOPMENT.md](./DEVELOPMENT.md), [SETUP.md](./SETUP.md).
