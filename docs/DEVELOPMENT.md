# Development Guidelines — Cut X Egypt

Guidelines for the **Cut X** demo storefront (`frontend/`). This is a **static React + Vite** app: no backend API, no database, no real payments.

## Stack (actual)

| Area | Choice |
|------|--------|
| UI | React 19, Vite 7, TypeScript, Tailwind CSS v4, Radix / shadcn-style components |
| Routing | Wouter |
| i18n | `LangContext` — EN + AR (RTL), EGP formatting |
| Data | Static catalog in `frontend/src/lib/data.ts` |
| Cart / wishlist / demo auth | Browser `localStorage` / session only |
| Deploy | Vercel (root directory: `frontend`) |

There is **no** Express, PostgreSQL, Drizzle, Stripe live mode, or React Query data layer in this repo.

## Local setup

```bash
cd frontend
pnpm install          # packageManager: pnpm@9.15.0
pnpm dev              # http://localhost:5173
pnpm typecheck
pnpm build
```

CI uses `pnpm install --frozen-lockfile`. Keep `pnpm-lock.yaml` committed and in sync with `package.json`.

## Project layout (high level)

```
frontend/src/
  pages/          # home, shop, product-detail, cart/checkout, contact, legal, …
  components/     # UI + feature components
  contexts/       # LangContext, cart, auth (demo)
  lib/data.ts     # Product catalog (isDemo, stock, EGP prices)
  index.css       # Brand tokens (--brand, etc.)
public/images/    # Local placeholders / brand assets
```

## Code style

### TypeScript

- Prefer explicit parameter and return types on exported functions.
- Avoid `any`; use `unknown` + narrowing or concrete interfaces.
- Catalog and UI models live near usage or in `lib/` — keep product fields aligned with `data.ts`.

### React

- Function components only.
- Shared copy and labels go through **`useLang()` / LangContext** — do not hardcode English strings in pages that must support AR.
- Demo honesty: checkout, contact, and auth must keep “demo only” messaging when behavior is simulated.

### Styling

- Tailwind utilities first; brand color via CSS variables in `index.css`.
- Prefer `cn()` / `clsx` + `tailwind-merge` for conditional classes.
- Respect `dir="rtl"` when the language is Arabic (layout, icons, text alignment).

### Components

Suggested order inside a file:

1. Imports  
2. Types  
3. Constants  
4. Component (state → derived → handlers → JSX)  
5. Export  

## Data & demo rules

- **Products:** edit `frontend/src/lib/data.ts` only (names EN/AR, prices EGP, stock, `isDemo`).
- **Stock:** UI must block add-to-cart when stock is 0; keep a few in-stock items so cart/checkout paths are demoable.
- **Checkout:** no network payment; session-only confirmation is intentional.
- **Images:** prefer assets under `frontend/public/`; external URLs should be intentional and documented.

## i18n checklist

When adding UI text:

1. Add keys under EN and AR in `LangContext` (or the project’s translation maps).
2. Use the translation helper in the component.
3. Verify shop filters, toasts, empty states, and legal pages in **both** languages.

## Scripts & quality gates

| Command | Role |
|---------|------|
| `pnpm typecheck` | Required in CI |
| `pnpm build` | Required in CI |
| lint / test | Not configured yet (documented intentional gap) |

## Git & PRs

- Branch from `develop` for features: `feature/…`, `bugfix/…`, `docs/…`, `chore/…`.
- Hotfixes for production: `hotfix/…` → `main`, then back-merge to `develop`.
- Conventional Commits in **PR title** and commits (enforced by GitFlow workflow).
- See [GITFLOW.md](./GITFLOW.md).

### PR checklist

- [ ] Typecheck / build green  
- [ ] No new hardcoded EN-only user strings (if UI changed)  
- [ ] Demo disclosures still accurate  
- [ ] Lockfile updated if dependencies changed  
- [ ] Docs touched if behavior or setup changed  

## Related docs

- [SETUP.md](./SETUP.md) — install & env  
- [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) — tree  
- [CUTX-CATALOG.md](./CUTX-CATALOG.md) — demo catalog  
- [CUTX-BRAND-RESEARCH.md](./CUTX-BRAND-RESEARCH.md) — brand facts  
- [CUTX-REFACTOR-AUDIT.md](./CUTX-REFACTOR-AUDIT.md) — rebrand log  

## Resources

- [React](https://react.dev/)  
- [Vite](https://vite.dev/)  
- [TypeScript](https://www.typescriptlang.org/)  
- [Tailwind CSS](https://tailwindcss.com/)  
- [Radix UI](https://www.radix-ui.com/)  
- [Wouter](https://github.com/molefrog/wouter)  
