# Cut X Egypt — Refactor Audit

Date: 2026-10-10 · Scope: `frontend/` only (no backend exists in this tree).

## 1. Verified stack

- React 19.1, TypeScript ~5.9, Vite 7, Tailwind CSS v4 (`@theme inline` tokens in `frontend/src/index.css`).
- Routing: Wouter (`frontend/src/App.tsx`), base = `import.meta.env.BASE_URL`.
- UI: Radix/shadcn primitives, Framer Motion, React Query provider instantiated but unused for data.
- State: `CartContext` (localStorage), `LangContext` (EN/AR + RTL), `AuthContext` (in-memory only), `ThemeContext`.
- Data: static `frontend/src/lib/data.ts` (16 products) + `frontend/src/lib/reviews.ts` (46 static reviews). No API, no backend.
- Tooling: scripts are `dev`, `build` (`vite build`), `serve`, `typecheck` (`tsc --noEmit`). No lint/test scripts.
- Environment note: this workspace is a ZIP export, **not a git repo** (`git status` → "not a git repository"), and **pnpm is not installed** — `npm` + `npx tsc` were used instead. The `refactor/cutx-storefront` branch and Conventional Commits could therefore not be applied here; changes are delivered as working-tree files.

## 2. Architecture discrepancy (README vs reality) — confirmed

- README claims `backend/` (Express, Drizzle, PostgreSQL, Stripe) and a root pnpm workspace. **Verified: no `backend/` directory, no root `package.json`, no `pnpm-workspace.yaml`, no `api/` routes exist in this tree.** `frontend/src/api-client/` contains generated typed stubs only.
- `frontend/src/pages/checkout.tsx` POSTed to `/api/create-checkout-session`, which has no implementation → checkout could never succeed. Replaced with an explicit demo checkout (see §5).
- README updated to describe the real static-frontend architecture.

## 3. Pages, components, working features (pre-refactor)

- Routes: `/`, `/shop` (search, category pills, new-only filter, pagination 8/page), `/product/:slug` (gallery, variants, qty, reviews, related), `/checkout`, `/success`, `/about`, `/contact`, `/privacy`, `/terms`, 404.
- Working: cart drawer (add/merge/remove, localStorage persist), EN/AR toggle with `dir` switching, dark mode, responsive layouts, skeletons, toasts.
- Broken/misleading (fixed): checkout 404 → Stripe claim; `/success` generated a random order number on every render **and wiped the cart even on direct visits**; auth is a local-only `setTimeout` login with dead Profile/Orders menu items; newsletter/contact forms fake success with no disclosure; wishlist in-memory only; `formatPrice` hardcoded `en-US/USD` (Arabic users still saw `$`); stock displayed but never enforced; ratings/reviews entirely static; `og:locale:alternate ar_SA` (wrong market); fake US address/phone/email in Contact, Privacy, Terms, JSON-LD; SoHo/NY map embed; 40+ Unsplash fashion photos presented as products.

## 4. HAVEN references removed (all)

`LangContext` brand/tagline/mission/stats/mission-copy (EN+AR), `useSEO` titles, `index.html` title/meta/OG/Twitter/JSON-LD, `manifest.webmanifest`, `favicon.svg` (H mark → X mark), navbar/footer/auth-modal logos, `haven-cart`/`haven-cookies`/`sh-lang` storage keys (migrated, legacy keys cleaned), cookie-banner copy, all 16 HAVEN products + 46 reviews, all Unsplash URLs (grep-verified zero remaining), `hello@haven.style`, `+1 (555) 234-5678`, US addresses, Stripe claims, `ar_SA` → `ar_EG`.

## 5. Implementation plan (executed)

1. Local SVG brand/product/category/banner assets under `frontend/public/images/` (explicit placeholders, never fake photos).
2. New `types.ts` (`nameAr`, `descriptionAr`, `details`, `isDemo`, localized color names).
3. New 10-product demo catalog in EGP (`data.ts`), categories Daily/Athletic/Security/Accessories; ratings zeroed → ratings UI auto-hides; `reviews.ts` emptied (helpers kept).
4. Full EN/AR `LangContext` rewrite; `formatPrice` → EGP with `ar-EG`/`en-EG` locale from `document.lang`.
5. Cut X theme tokens (`--brand` safety red) + `.brand-x` / `.demo-strip` utilities in `index.css`.
6. Demo checkout (no payment, session-gated success page), EGP shipping constants, phone field, Egypt default.
7. About/Contact/Privacy/Terms rewritten with verified facts only; social links replace fake address/phone; map removed.
8. Docs + README. Verification below.

## 6. Verification commands (from `frontend/`)

## 7. First-load performance investigation (2026-10-10)

Complaint: very slow first page load. Measured with a script simulating a cold browser (recursive module fetch, concurrency 6).

- **Baseline (before): 87 modules / 4.36 MB on first paint** — `App.tsx` statically imported all 10 routes, so the browser transformed every page + all Radix/shadcn + framer-motion before painting.
- External blockers found and removed: remote Lottie JSONs (`lottie.host`, incl. one guaranteed-404 URL) + `@lottiefiles/react-lottie-player` dep (prod JS **1099 → 668 kB**), render-blocking Google Fonts (now async preload + print-swap), font weights trimmed 7 → 5 (300/800 unused).
- Fixes: `App.tsx` route-level `React.lazy` (Home eager, 9 routes lazy + dep-free CSS Suspense fallback); `vite.config.ts` explicit `optimizeDeps.include` (skips 2000+-module auto-crawl) + `server.warmup` for the home graph.
- **After: 68 modules / 3.80 MB first paint** (src files 47 → 32); prod main chunk **668 → 585 kB** (gzip 207 → 186 kB) plus 9 on-demand route chunks (2–48 kB).
- Environment caveat (honest): this machine serves tiny files at ~0.5 s each cold and needs ~10 s `optimizeDeps` per restart — dev-mode cold start is Vite-inherent here. Steady-state reloads are ~1–2 s; `npm run build` + `npm run serve` has none of these costs. If dev stays slow, exclude the project dir from Windows Defender real-time scanning.
- Follow-up pass: removed dead `src/api-client/` (generated stubs, zero importers) + `QueryClientProvider` + `@tanstack/react-query` dep → prod main chunk **585 → 560 kB** (gzip 186 → 178 kB), 2256 → 2211 modules. framer-motion is v12 (same codebase as the `motion` package), so a package swap would give no meaningful gain — skipped deliberately.
- Proof that the app itself is fast: production build served via `vite preview` loads **fully in ~90 ms** (4 files, 679 kB, localhost). Any remaining slowness is the dev transform pipeline, not the storefront.

```bash
npm install          # pnpm unavailable in this environment; package.json has no lockfile preference beyond pnpm-lock.yaml
npx tsc --noEmit     # typecheck (== pnpm typecheck)
npm run build        # vite build (== pnpm build)
```

Results (2026-10-10, Node v24.18.0, npm):
- `npm install`: ok (231 packages; PowerShell execution policy blocks `npm.ps1`, so `npm.cmd` was used).
- **Pre-existing gap found: the repo had no `tsconfig.json`, so `pnpm typecheck` could never run.** Added minimal `frontend/tsconfig.json` (strict, `@/*` alias) to make typecheck real.
- **Also missing: `src/vite-env.d.ts`** (`import.meta.env` had no types). Added the standard Vite reference file.
- `npx tsc --noEmit`: **passes, 0 errors** (one initial error for `import.meta.env`, fixed by `vite-env.d.ts`).
- `npm run build`: **passes** (2256 modules, ~60s). Only warning is the pre-existing >500kB chunk notice from the heavy UI deps, unrelated to this refactor.
- No lint/test scripts exist in `frontend/package.json`, so none could be run.
- Final sweep: `unsplash|haven.style|Stripe|ar_SA|SoHo|$50|T-Shirts|Jeans|Hoodies|Jackets` → **zero matches** in `src/`; `HAVEN` remains only in one legacy-migration code comment and `node_modules` (third-party). All 18 local SVG assets verified present in `dist/images/**`; `dist/index.html` carries the Cut X title.
- Browser/RTL spot-checks: not executable in this environment (no browser tooling); RTL/LTR rely on the pre-existing, preserved `document.dir` mechanism and `start/end` logical utilities, with Arabic copy reviewed inline.
