# Changelog

All notable changes to **BankDesign** are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Sections follow the convention `## [<version>] - <YYYY-MM-DD>` (versions only,
no `v` prefix). The [release workflow](.github/workflows/release.yml) parses
this file to generate GitHub Release notes.

## [1.0.1](https://github.com/sanguirIS/BankDesign/compare/v1.0.0...v1.0.1) (2026-09-25)


### Bug Fixes

* **security:** rewrite SECURITY.md and remediate the issues it documents ([#2](https://github.com/sanguirIS/BankDesign/issues/2)) ([a87793b](https://github.com/sanguirIS/BankDesign/commit/a87793bf4997e348b86a50d1ece8f6977bc8a4b7))

## [Unreleased]

### Added

- GitHub Actions workflows: CI (lint + typecheck + build) on every pull request across Node 20/22/24 with stale-run cancellation, and a release pipeline that builds the static export on `v*` tags (failing unless the tag has a matching `CHANGELOG.md` entry), auto-deploying it to Netlify and GitHub Pages.
- `accountId` field on transactions, so each account detail page shows its own recent transactions.
- Project documentation: `CONTRIBUTING.md`, `RELEASES.md`, `CHANGELOG.md`, and GPL-3.0 `LICENSE`.
- `SECURITY.md`: a real security policy — supported versions, private vulnerability reporting, response-time targets, in/out of scope, safe harbour, security model, hardening in place, and documented known limitations (replaces the unedited GitHub placeholder).
- `.github/dependabot.yml`: weekly dependency updates for the `bun` and `github-actions` ecosystems (the `bun` ecosystem so `bun.lock` is updated alongside `package.json`).
- Security response headers for the Netlify deployment in `netlify.toml` — Content Security Policy, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, HSTS and `Cross-Origin-Opener-Policy`.
- Security notice in the issue templates directing vulnerability reports to the private reporting channel instead of public issues.
- "Security Releases" process in `RELEASES.md`, and a security reporting section plus project security conventions in `CONTRIBUTING.md`.

### Changed

- TypeScript checking is enforced during `npm run build` (`typescript.ignoreBuildErrors` removed).
- ESLint is no longer skipped during builds (`eslint.ignoreDuringBuilds` was `true`, so `npm run build` silently ignored lint errors while the README claimed it lints) — lint errors now fail the build, matching CI.
- Netlify builds use Node 22 instead of end-of-life Node 18, matching the CI matrix.
- CI now declares least-privilege `permissions: contents: read` and checks out without persisting credentials; `release-please` documentation recommends a fine-grained PAT instead of a classic `repo`-scoped token.
- GitHub Actions are pinned to full commit SHAs (tags are mutable), and the archived `google-github-actions/release-please-action` was replaced with the maintained `googleapis/release-please-action`; Dependabot keeps the pins and majors current.

### Fixed

- `params` is now awaited in the account detail route, fixing the Next.js 15 "sync dynamic APIs" runtime error.
- Profile avatar on the Settings page uses `next/image` instead of a raw `<img>`.
- Removed shell-injection vectors in `.github/workflows/release.yml`: tag and repository names are passed to `run:` scripts through `env:` instead of being interpolated as `${{ ... }}` (git ref names may contain quotes, `$`, `;` and backticks).

### Security

- Upgraded `next` from 15.2.0 to 15.5.26, clearing all 34 advisories affecting the 15.2.0 release line — including 4 critical ones: unauthenticated RCE in the Image Optimization API (GHSA-2xp9-vwfh-vxw4), unauthenticated RCE on Windows-hosted servers (CVE-2026-75604), RCE in the React flight protocol (GHSA-9qr9-h5gf-34mp) and the middleware authorization bypass (CVE-2025-29927) — plus 12 high-severity SSRF, cache-poisoning, middleware-bypass and DoS issues.
- Refreshed the dependency tree in `bun.lock` (`bun install` keeps previously resolved versions for unchanged ranges, so the lockfile was regenerated) and bumped the toolchain (`eslint` 9.39.5, `eslint-config-next` 15.5.26, `postcss` 8.5.28, `tailwindcss` 3.4.19, `typescript` 5.9.3). The lockfile now resolves to zero packages with known advisories — previously flagged: `postcss`, `nanoid`, `minimatch`, `brace-expansion`, `picomatch`, `flatted`, `js-yaml`, `ajv`, `postcss-selector-parser` and `sharp` (libheif/libvips).
- Added `SameSite=Lax` to the `sidebar_state` UI-preference cookie.

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
