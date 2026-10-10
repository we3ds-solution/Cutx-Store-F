# Setup Guide — Cut X Egypt Demo Storefront

This guide sets up the **Cut X Egypt** demo storefront for local development.

> **Repo:** [we3ds-solution/Cutx-Store-F](https://github.com/we3ds-solution/Cutx-Store-F)  
> **Stack:** React 19 + Vite 7 + TypeScript + Tailwind CSS v4 (frontend only — no backend in this tree)

## Prerequisites

- **Node.js** ≥ 18 (24 recommended)
- **pnpm** ≥ 9 (preferred) or npm
- **Git**

## Installation

```bash
git clone https://github.com/we3ds-solution/Cutx-Store-F.git
cd Cutx-Store-F/frontend
pnpm install   # or: npm install
pnpm dev       # http://localhost:5173
```

## Commands (`frontend/`)

| Command | Purpose |
|---------|---------|
| `pnpm dev` | Vite dev server |
| `pnpm typecheck` | TypeScript check (`tsc --noEmit`) |
| `pnpm build` | Production build → `frontend/dist` |
| `pnpm serve` | Preview the build |

**Lint and unit tests:** intentionally not configured yet. Quality gates in CI are typecheck + production build. See issue tracking if/when ESLint + Vitest are added.

## Configuration

No required env vars for the static demo. Optional Vite placeholders used only if present:

```env
# frontend/.env.local (optional)
VITE_API_URL=/api
```

Checkout does **not** call a payment API; success is session-gated and demo-only.

## Documentation

- [`README.md`](../README.md) — overview and quick start
- [`docs/CUTX-CATALOG.md`](CUTX-CATALOG.md) — demo catalog + go-live checklist
- [`docs/CUTX-BRAND-RESEARCH.md`](CUTX-BRAND-RESEARCH.md) — verified brand facts
- [`docs/CUTX-REFACTOR-AUDIT.md`](CUTX-REFACTOR-AUDIT.md) — rebrand audit
- [`docs/PROJECT_STRUCTURE.md`](PROJECT_STRUCTURE.md) — tree overview

## License

MIT — see [`LICENSE`](../LICENSE).
