# Cut X Egypt — Catalog Notes

All 10 listings are **draft/demo records** (`isDemo: true`). Prices and names remain unconfirmed. Sample `stock: 25` enables cart/checkout walkthroughs only — still not real inventory or sales.

## Why demo records

No official price list, size chart, inventory, lab report, or product photography was publicly available at research time (see `CUTX-BRAND-RESEARCH.md`: Instagram/Facebook login-walled, `cutx-egy.com` unreachable). Per the brief, the grid is filled with clearly-identified drafts instead of invented "real" data or unrelated fashion stock.

## Products (prices = EGP drafts, sample demo stock (25) for walkthroughs; still isDemo, ratings disabled)

| ID | Slug | EN name | Category | Draft EGP |
|----|------|---------|----------|-----------|
| 1 | `everyday-protective-tee` | Cut X Everyday Protective Tee | Daily Essentials | 1,450 |
| 2 | `urban-protective-hoodie` | Cut X Urban Protective Hoodie | Daily Essentials | 2,400 |
| 3 | `training-long-sleeve` | Cut X Training Long-Sleeve | Athletic Protection | 1,650 |
| 4 | `compression-training-pants` | Cut X Compression Training Pants | Athletic Protection | 1,750 |
| 5 | `track-protective-jacket` | Cut X Track Protective Jacket | Athletic Protection | 2,600 |
| 6 | `duty-protective-jacket` | Cut X Duty Protective Jacket | Security & Workwear | 3,200 |
| 7 | `tactical-overshirt` | Cut X Tactical Overshirt | Security & Workwear | 2,100 |
| 8 | `protective-gloves` | Cut X Protective Gloves | Accessories | 650 |
| 9 | `protective-arm-sleeves` | Cut X Protective Arm Sleeves | Accessories | 550 |
| 10 | `protective-neck-gaiter` | Cut X Protective Neck Gaiter | Accessories | 450 |

Each product carries: stable id/slug, EN + natural AR name/description, tags, sizes, localized color names, honest `details` (fit/use/care only — **no protection ratings, no material specs, no certifications**), and `rating: 0, reviewCount: 0` so ratings UI stays hidden. `reviews.ts` is intentionally empty.

## Images

`frontend/public/images/products/*.svg` — garment-matched **illustrated previews** drawn per product type. Real brand-supplied photos are used as primary images where available; SVG illustrations remain secondary gallery images. No stock photo misrepresented as a Cut X product.

## Commerce defaults (configurable, NOT official policy)

- `DEMO_FREE_SHIPPING_THRESHOLD = 2000` EGP, `DEMO_SHIPPING_FEE = 60` EGP (`frontend/src/lib/data.ts`).
- No tax line (no verified tax handling).
- Checkout is **demo-only**: amber banner, session-only order ref (`cutx-demo-order`), no payment POST, no secrets in repo.

## Payment decision (portfolio demo)

| Option | Status |
|--------|--------|
| **Current** | Simulated order only — suitable for brand/portfolio demos |
| Recommended for Egypt go-live | **Paymob** (card + wallets) and/or **COD** with a real order backend |
| Explicitly out of scope here | Shopify Checkout, Stripe (no backend in this repo) |

Until a provider is chosen and a server (or hosted checkout) exists, client totals must never be treated as authoritative.

## Going live checklist

1. Replace SVGs with official product photography (keep slugs or add redirects).
2. Confirm names, descriptions, sizes, colors, prices (EGP), and stock per SKU with the brand.
3. Set `isDemo: false` **only** on verified products; add real reviews/ratings when they exist.
4. Connect payment + shipping providers; rewrite Privacy/Terms/Checkout; store secrets in env only.
5. Publish real contact details, address, policies; update JSON-LD + `index.html`.
6. Re-run `pnpm run test:catalog` after catalog edits.
