# Cut X Egypt — Catalog Notes

All 10 listings are **draft/demo records** (`isDemo: true`). Nothing here is presented as a confirmed Cut X product, price, or stock figure.

## Why demo records

No official price list, size chart, inventory, lab report, or product photography was publicly available at research time (see `CUTX-BRAND-RESEARCH.md`: Instagram/Facebook login-walled, `cutx-egy.com` unreachable). Per the brief, the grid is filled with clearly-identified drafts instead of invented "real" data or unrelated fashion stock.

## Products (prices = EGP drafts, stock = 0/unconfirmed, ratings disabled)

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

`frontend/public/images/products/*.svg` — garment-matched **illustrated previews** drawn per product type (tee, hoodie, long-sleeve, pants, zip jacket, duty jacket, overshirt, gloves, arm sleeves, gaiter + tee back view). Each is visibly tagged `ILLUSTRATED PREVIEW · PHOTO COMING SOON` inside the artwork: honest stylized drawings, never fake photos. **Exception: `everyday-protective-tee-photo.jpg` is a real product photo supplied by the brand side** (black tee with chest print) and is used as that product's primary image; its listing otherwise stays `isDemo` until price/stock are confirmed. Category tiles, banners and OG remain branded graphic tiles. No hotlinks; no stock photo misrepresented as a Cut X product. Regenerate illustrations with `node scripts/gen-product-art.mjs`.

## Real product photos (supplied by the brand side, 2026-10-10)

All 10 catalog products now use real supplied photos as primary images (each visually verified against its listing; chest prints like SPRTX/PROTEK/ARMOUR GRIP/TEKSHIELD are product-line marks shown as-is with no claims attached). Filenames use clean slugs under `frontend/public/images/products/` (the original `tisher.jpg` typo file was identical to the tee photo and removed). Each product keeps its matching SVG illustration as a secondary gallery image. Default color variant (`colors[0]`) matches the photographed colorway (hoodie → Charcoal, track jacket → Navy, duty jacket → Olive, overshirt → Charcoal).

## Commerce defaults (configurable, NOT official policy)

- `DEMO_FREE_SHIPPING_THRESHOLD = 2000` EGP, `DEMO_SHIPPING_FEE = 60` EGP (`frontend/src/lib/data.ts`).
- No tax line (no verified tax handling). Checkout is demo-only: no backend, no payment provider.

## Going live checklist

1. Replace SVGs with official product photography (keep slugs or add redirects).
2. Confirm names, descriptions, sizes, colors, prices (EGP), and stock per SKU.
3. Set `isDemo: false` per verified product; add real reviews/ratings.
4. Connect payment + shipping providers; rewrite Privacy/Terms/Checkout accordingly.
5. Publish real contact details, address, policies; update JSON-LD + `index.html`.
