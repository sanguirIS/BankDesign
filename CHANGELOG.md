# Changelog

All notable changes to **BankDesign** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Sections follow the convention `## [<version>] - <YYYY-MM-DD>` (versions only,
no `v` prefix). The [release workflow](.github/workflows/release.yml) parses
this file to generate GitHub Release notes.

## [Unreleased]

### Added

- GitHub Actions workflows: CI (lint + typecheck + build) on every pull request across Node 20/22/24 with stale-run cancellation, and a release pipeline that builds the static export on `v*` tags (failing unless the tag has a matching `CHANGELOG.md` entry), auto-deploying it to Netlify and GitHub Pages.
- `accountId` field on transactions, so each account detail page shows its own recent transactions.
- Project documentation: `CONTRIBUTING.md`, `RELEASES.md`, `CHANGELOG.md`, and GPL-3.0 `LICENSE`.

### Changed

- TypeScript checking is enforced during `npm run build` (`typescript.ignoreBuildErrors` removed).

### Fixed

- `params` is now awaited in the account detail route, fixing the Next.js 15 "sync dynamic APIs" runtime error.
- Profile avatar on the Settings page uses `next/image` instead of a raw `<img>`.

## [1.0.0] - 2026-08-09

### Added

- **Dashboard** — balance overview cards, weekly activity chart, expense statistics, recent transactions, budget tracker, and card transaction tabs.
- **Accounts** — accounts overview page and per-account detail pages with balance history charts and account-scoped recent transactions.
- **Transactions** — full explorer with search, category and type filters, sorting (date/amount/name), and a transaction details dialog.
- **Budget** — category budgets with progress indicators.
- **Settings** — profile, appearance (dark mode toggle with theme persistence), notifications, security, payment methods, and help sections.
- **UI foundation** — shadcn/ui component set on Radix primitives with Tailwind CSS, fully responsive, light and dark themes.
- **Infrastructure** — Next.js 15 static export (`output: "export"`), ESLint configured (`next/core-web-vitals` + `next/typescript`), Netlify config included.

### Notes

- Data is static mock data located in `src/data/` — swap with a real API/backend for production use.

[1.0.0]: https://github.com/sanguirIS/BankDesign/releases/tag/v1.0.0
