# Cut X Egypt — Demo Storefront

[![CI](https://github.com/we3ds-solution/Cutx-Store-F/actions/workflows/ci.yml/badge.svg)](https://github.com/we3ds-solution/Cutx-Store-F/actions/workflows/ci.yml)

Cut-resistant apparel for daily life, sport and duty. This is a **demo e-commerce storefront** for the Egyptian brand **Cut X** (`@cutx_eg`), built on the previous HAVEN clothing-shop codebase and fully rebranded, relocalized (EN/AR, EGP), and refactored.

> **Status: demo.** The catalog, prices (EGP), availability, shipping rates and checkout are clearly-marked drafts — **no payment is processed** and no real orders are placed. See [`docs/CUTX-CATALOG.md`](docs/CUTX-CATALOG.md).

## Brand background (verified)

- Cut and penetration resistant clothing for **daily use, athletes and security** — per the official Instagram bio ([@cutx_eg](https://www.instagram.com/cutx_eg/?hl=ar)).
- Featured on **Shark Tank Egypt (CBC)**. Official site `cutx-egy.com` was unreachable during research.
- Full findings, sources and uncertainties: [`docs/CUTX-BRAND-RESEARCH.md`](docs/CUTX-BRAND-RESEARCH.md).

## Actual stack

| Domain | Technologies |
|---|---|
| Frontend | React 19, Vite 7, TypeScript, Tailwind CSS v4, Radix/shadcn UI, Framer Motion, Wouter, React Query (provider only) |
| Data | Static TypeScript catalog (`frontend/src/lib/data.ts`) — **no backend, no database, no payment provider in this repo** |
| CI | GitHub Actions: `pnpm` install, typecheck, catalog integrity script, production build (Node 24) |

Checkout POSTs nowhere; the demo checkout records a **session-only** reference and shows an explicit demo banner.

## Quick start

Prerequisites: Node.js ≥ 18 (24 recommended). pnpm ≥ 9 if available, otherwise npm.

```bash
cd frontend
npm install        # or: pnpm install
npm run dev        # http://localhost:5173
```

## Commands (`frontend/`)

| Command | Purpose |
|---|---|
| `pnpm dev` / `npm run dev` | Vite dev server |
| `pnpm typecheck` | TypeScript check |
| `pnpm test:catalog` | Catalog integrity checks (no extra deps) |
| `pnpm build` | Production build → `frontend/dist` |
| `pnpm serve` | Preview the build |

Vitest/ESLint/Playwright are not wired yet — prefer adding them with a lockfile update when expanding coverage.

## Features

- EN/AR with correct `dir="rtl"/"ltr"`, Egyptian Arabic copy, EGP formatting (`ar-EG`/`en-EG`).
- Shop: Arabic-aware search, category filters, new-arrivals filter, pagination, localized empty states.
- Product pages: localized names/descriptions/colors, galleries, related items, demo labelling, reviews section hidden until real reviews exist.
- Cart drawer persisted to `cutx-cart` (legacy `haven-cart` migrated once); honest demo checkout with session-gated confirmation page.
- Cut X theming via centralized tokens (`--brand` safety red) in `frontend/src/index.css`; local SVG placeholder assets under `frontend/public/images/`.

## Go-live blockers

1. **Verified catalog** — replace draft SKUs (`isDemo: true`) with brand-confirmed prices, stock, photos (`docs/CUTX-CATALOG.md`).
2. **Real checkout** — COD/Paymob/hosted payment; never trust client totals; secrets only in env.

## Documentation

- [`docs/CUTX-REFACTOR-AUDIT.md`](docs/CUTX-REFACTOR-AUDIT.md) — audit, HAVEN removal log, verification.
- [`docs/CUTX-BRAND-RESEARCH.md`](docs/CUTX-BRAND-RESEARCH.md) — verified facts vs assumptions.
- [`docs/CUTX-CATALOG.md`](docs/CUTX-CATALOG.md) — demo catalog + go-live checklist.

## License

MIT — see [`LICENSE`](LICENSE).
