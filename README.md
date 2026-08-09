# BankDesign

BankDesign is a modern banking dashboard built with Next.js and TypeScript. It ships with a polished, fully responsive UI — account overviews, a transaction explorer with search/filter/sort, budgeting, spending analytics, and a rich settings area — ready to use as a foundation for real banking and fintech products.

![Screenshot](https://github.com/user-attachments/assets/45fa8ca2-4d8d-4841-bf89-608dcf3d2b26)

[![CI](https://github.com/sanguirIS/BankDesign/actions/workflows/ci.yml/badge.svg)](https://github.com/sanguirIS/BankDesign/actions/workflows/ci.yml)

---

## ✨ Features

- ⚡ **Fast by default** — Next.js 15 App Router with static export
- 🔒 **Type-safe** — Strict TypeScript across the entire codebase
- 🎨 **Polished UI** — shadcn/ui components on Radix UI primitives, Tailwind CSS
- 🌙 **Dark mode** — Full light/dark theme with a live toggle (persisted)
- 🏦 **Accounts** — Overview cards and per-account detail pages with balance history charts and account-specific transactions
- 💸 **Transactions** — Searchable, filterable (category/type), sortable list with a details dialog
- 📊 **Analytics** — Weekly activity and expense statistics charts
- 🎯 **Budget tracking** — Category budgets with live progress
- 💳 **Cards** — Bank card UI with transactions tabs
- 🔔 **Notifications** — Dropdown with recent alerts
- 📱 **Responsive** — Desktop and mobile layouts with a collapsible sidebar
- 🌐 **Deploy anywhere** — Static export to `build/`, ready for Netlify, Vercel, or any static host

## 🧰 Tech Stack

| Layer        | Technology                                                        |
| ------------ | ----------------------------------------------------------------- |
| Framework    | [Next.js 15](https://nextjs.org) (App Router, static export)      |
| Language     | [TypeScript](https://www.typescriptlang.org) (strict)             |
| UI           | [Tailwind CSS](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), [Radix UI](https://www.radix-ui.com) |
| Icons        | [lucide-react](https://lucide.dev)                                |
| Charts       | Custom SVG components (no heavy chart library)                    |
| Package mgr  | bun (`bun.lock` is the canonical lockfile)                        |

## 🚀 Getting Started

### Prerequisites

- **Node.js 18.18+** (Node 20 or 22 recommended)
- npm, yarn, pnpm, or bun

### Installation

```bash
git clone https://github.com/sanguirIS/BankDesign.git
cd BankDesign
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the dev server hot-reloads on every change.

### Production build

```bash
npm run build        # type-checks, lints, and exports a static site to build/
npm run start        # serve the exported site locally
```

### Quality checks

```bash
npm run lint         # ESLint (next/core-web-vitals + next/typescript)
npx tsc --noEmit     # TypeScript type-check
```

> The `next.config.mjs` runs type checking during `npm run build`, so CI failures are caught before deploy.

## 📁 Project Structure

```
src/
├── app/                 # Pages & routing (App Router)
│   ├── page.tsx         # Dashboard
│   ├── accounts/        # Accounts overview + /accounts/[id] detail
│   ├── transactions/    # Transaction explorer
│   ├── budget/          # Budget tracking
│   └── settings/        # Profile, appearance, notifications, security, payment, help
├── components/
│   ├── ui/              # shadcn/ui primitives (button, card, dialog, …)
│   └── *.tsx            # Feature components (charts, cards, sidebar, …)
├── contexts/            # React contexts (e.g. ThemeContext)
├── data/                # Mock data (accounts, transactions, budget, notifications)
├── hooks/               # Shared hooks (useMediaQuery, use-mobile)
└── lib/                 # Utilities (cn)
```

## 🌐 Deployment

The app is configured for **static export** (`output: "export"`, `distDir: "build"`):

- **Netlify** — a `netlify.toml` is included; set the build command to `npm run build` (or `bun run build`) and publish directory to `build`.
- **Vercel** — import the repo; Vercel auto-detects Next.js. No extra config needed.

## 🤝 Contributing

Contributions of all kinds are welcome — bug reports, docs, and pull requests. Please read [CONTRIBUTING.md](CONTRIBUTING.md) first.

## 📦 Releases

See [RELEASES.md](RELEASES.md) for the release process and [CHANGELOG.md](CHANGELOG.md) for the full version history.

## 📄 License

This project is licensed under the **GNU General Public License v3.0**. See the [LICENSE](LICENSE) file for details.

## 📬 Contact

For questions or support, open an issue or reach out to [@sanguirIS](https://github.com/sanguirIS).
