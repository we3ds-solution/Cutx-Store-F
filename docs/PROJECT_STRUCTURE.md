# Project Structure — Cut X Egypt

Reflects `develop` after the Cut X rebrand (frontend-only demo storefront).

```
Cutx-Store-F/
├── frontend/                 # React 19 + Vite storefront (primary app)
│   ├── public/images/        # Brand, product, category, banner assets
│   ├── src/
│   │   ├── components/       # UI, layout, product-card, auth-modal, …
│   │   ├── contexts/         # Lang (EN/AR), Theme, Auth, Cart
│   │   ├── hooks/
│   │   ├── lib/              # data.ts catalog, reviews, utils, useSEO
│   │   ├── pages/            # Home, Shop, Product, Checkout, Success, …
│   │   ├── App.tsx           # Routes (Home eager; others lazy)
│   │   └── index.css         # Tailwind v4 + brand tokens
│   ├── package.json          # name: cutx-storefront
│   └── vite.config.ts
├── docs/
│   ├── CUTX-BRAND-RESEARCH.md
│   ├── CUTX-CATALOG.md
│   ├── CUTX-REFACTOR-AUDIT.md
│   ├── SETUP.md
│   └── PROJECT_STRUCTURE.md
├── .github/workflows/        # ci.yml, gitflow-enforce, security, labeler, …
├── package.json              # root packageManager: pnpm@9.15.0
└── README.md
```

## Notes

- **No `backend/` directory** in this repository. README and older Clothing Shop docs that claimed Express/PostgreSQL/Stripe were corrected.
- Data is static TypeScript (`frontend/src/lib/data.ts`); cart/auth live in browser storage.
- CI quality gates: Frontend typecheck + build. Lint/test scripts are not defined yet (documented in SETUP + README).

## Related

- Clone URL: `https://github.com/we3ds-solution/Cutx-Store-F.git`
- Default integration branch: `develop`
- Production branch: `main`
