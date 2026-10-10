# 🛡️ Cut X — Cut & Penetration Resistant Clothing Store

[![CI Pipeline](https://github.com/we3ds-solution/Cutx-Store-F/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/we3ds-solution/Cutx-Store-F/actions/workflows/ci.yml)
[![GitFlow Enforced](https://img.shields.io/badge/GitFlow-Enforced-blue.svg)](docs/GITFLOW.md)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

E-commerce storefront for **Cut X**, an Egyptian brand specializing in **cut and penetration resistant clothing** for daily use, athletes, security companies, and industrial safety.

Founded by **Ahmed Ashraf** and **Ali Abdullah**. Appeared on **Shark Tank Egypt** (CBC, January 2023).

---

## ✨ Brand Focus

- Cut & slash resistant garments
- Penetration resistant designs
- Everyday wearable protection
- Security & industrial applications
- Sports & personal protection
- Made for the Egyptian and regional market

---

## 🏗️ Monorepo Architecture

```
Cutx-Store-F/
├── backend/                 # Node.js & Express REST API
├── frontend/                # React 19 + Vite storefront
│   ├── public/              # Static assets & favicon
│   └── src/
│       ├── components/
│       ├── contexts/        # Lang (EN/AR), Theme, Auth, Cart
│       ├── lib/             # Product data & utilities
│       └── pages/
├── docs/                    # Branding, design system, setup
└── .github/                 # CI/CD & workflows
```

---

## ⚡ Quick Start

```bash
git clone https://github.com/we3ds-solution/Cutx-Store-F.git
cd Cutx-Store-F
pnpm install

# Frontend
cd frontend && pnpm dev

# Backend
cd ../backend && pnpm dev
```

---

## 🛒 Product Categories

| Category | Description |
|----------|-------------|
| Protective Tees | Lightweight daily & base-layer cut resistance |
| Protective Hoodies | Security-grade hoodies & zip layers |
| Protective Jackets | High-coverage jackets for security & industry |
| Protective Pants | Industrial work pants with reinforced zones |
| Sleeves & Accessories | Arm sleeves, neck protectors |

---

## 📱 Social & Contact

- **Facebook**: [Cut X](https://www.facebook.com/p/Cut-X-100088062586202/)
- **Instagram**: [@cutx_eg](https://www.instagram.com/cutx_eg/)
- **Location**: Cairo, Egypt

---

## 🛠️ Tech Stack

| Domain | Technologies |
|--------|--------------|
| Frontend | React 19, Vite, TypeScript, Tailwind CSS, Radix UI, Framer Motion |
| Backend | Node.js, Express, Drizzle ORM, PostgreSQL, Stripe |
| i18n | English + Arabic (RTL) |
| DevOps | GitHub Actions, Vercel, pnpm Workspaces |

---

## 📄 License

MIT License. See [`LICENSE`](LICENSE).
