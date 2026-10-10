## Summary

<!-- A clear, concise description of what this PR does and why. -->

Closes # <!-- Link the issue this PR resolves, e.g.: Closes #42 -->

---

## GitFlow Compliance

- [ ] **Source branch** follows naming convention:
  - `feature/<name>` → targets `develop`
  - `bugfix/<name>` → targets `develop`
  - `hotfix/<name>` → targets `main` (then cherry-picked to `develop`)
  - `release/<version>` → targets `main`
- [ ] **All commit messages** follow [Conventional Commits](https://www.conventionalcommits.org/):
  - `feat(scope): description`
  - `fix(scope): description`
  - `chore(scope): description`
  - `docs(scope): description`

---

## Type of Change

- [ ] New Feature — non-breaking change adding functionality
- [ ] Bug Fix — non-breaking fix for incorrect behavior
- [ ] Breaking Change — fix or feature that changes existing behavior
- [ ] Performance — code change that improves performance
- [ ] Refactor — code change that neither fixes a bug nor adds a feature
- [ ] Documentation — docs-only changes
- [ ] CI/CD / Infrastructure — changes to workflows, build scripts, or deployment config
- [ ] Dependencies — updating or adding dependencies

---

## Testing Done

- [ ] `pnpm --filter cutx-storefront typecheck` (or `cd frontend && pnpm typecheck`) passes
- [ ] `pnpm --filter cutx-storefront build` (or `cd frontend && pnpm build`) passes
- [ ] Manually tested in browser at `http://localhost:5173` (EN + AR)
- [ ] Demo disclosures verified (checkout, contact, auth) if those areas changed

> **Note:** `lint` / `test` scripts are intentionally not configured yet; CI gates are typecheck + build only.

---

## Screenshots / Demo (if UI changes)

<!-- Drag & drop screenshots or a screen recording here -->

---

## Breaking Changes / Migration Notes

None

---

## Related Issues / PRs

<!-- Link related issues or PRs -->
