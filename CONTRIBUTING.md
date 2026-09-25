# Contributing to BankDesign

First off, thank you for taking the time to contribute! 🎉

BankDesign is an open-source project licensed under the [GPL-3.0](LICENSE). This guide explains how you can help — reporting bugs, suggesting features, improving docs, or writing code.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Ways to Contribute](#ways-to-contribute)
- [Getting Started](#getting-started)
- [Project Conventions](#project-conventions)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Release Process](#release-process)

## Code of Conduct

Be respectful and constructive. Harassment and discriminatory behavior are not tolerated. If you see a violation, please report it by opening an issue or contacting the maintainers.

## Ways to Contribute

### Reporting Bugs

1. Search the [issues](https://github.com/sanguirIS/BankDesign/issues) to avoid duplicates.
2. Click **New Issue** and pick the [Bug report template](.github/ISSUE_TEMPLATE/bug_report.yml) — the form guides you through everything we need:
   - A clear, descriptive title.
   - Steps to reproduce.
   - Expected vs. actual behavior.
   - Severity, browser, OS, and Node version.
   - Screenshots if the issue is visual (light and dark mode for UI issues).

### Reporting Security Vulnerabilities

**Never report a vulnerability in a public issue or pull request.** Use GitHub's
[private vulnerability reporting](https://github.com/sanguirIS/BankDesign/security/advisories/new)
and follow [SECURITY.md](SECURITY.md) — it documents what to include, the
supported versions, our response times, scope, and safe-harbour terms. If you
accidentally post details publicly, tell the maintainers so we can react.

### Suggesting Features

Click **New Issue** and use the [Feature request template](.github/ISSUE_TEMPLATE/feature_request.yml), describing the problem you're solving and a rough idea of the solution. Feature requests are discussed before implementation — please don't open a PR for a large feature without prior discussion.

### Improving Docs

Documentation fixes (README, this file, comments) are always welcome and are a great first contribution.

## Getting Started

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/<your-username>/BankDesign.git
cd BankDesign

# 3. Add the upstream remote
git remote add upstream https://github.com/sanguirIS/BankDesign.git

# 4. Install dependencies
npm install

# 5. Create a feature branch
git checkout -b feat/your-feature-name

# 6. Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your changes live.

## Project Conventions

Please follow the existing patterns so reviews go smoothly:

- **TypeScript (strict)** — the project is fully type-safe. New code must compile under `npx tsc --noEmit` with no errors.
- **Components** — feature components live in `src/components/`; reusable primitives belong in `src/components/ui/` (shadcn/ui style, Radix-based).
- **Data** — mock/static data lives in `src/data/` (e.g. `transactionData.ts`). Don't hardcode lists inside components.
- **Pages** — one folder per route in `src/app/`. Keep pages thin; move logic into components.
- **Client components** — add `"use client"` only when the component needs hooks or event handlers (project conventions).
- **Dark mode** — always style both themes using Tailwind `dark:` variants. Test your changes in both modes.
- **Styling** — use existing Tailwind utility classes and the `cn()` helper from `@/lib/utils`; avoid inline `style` where possible.
- **Hooks** — reuse existing hooks (`useMediaQuery`, `use-mobile`, `useTheme`) instead of reimplementing them.
- **Security** — review [SECURITY.md](SECURITY.md) before touching dependencies, build config, CI workflows, or anything that renders external HTML. Concretely: never commit secrets or `.env` files, never inject untrusted strings into `dangerouslySetInnerHTML` (or a `href`/`src`), never interpolate `${{ github.* }}` values inside a workflow `run:` script (pass them via `env:`), keep the `bun.lock` change with your `package.json` change, and don't disable the lint/type/build gates.

### Before Submitting

Make sure your changes pass:

```bash
npm run lint         # ESLint — no warnings or errors
npx tsc --noEmit     # TypeScript — no errors
npm run build        # Full production build (type-checks during build)
```

## Commit Guidelines

Use [Conventional Commits](https://www.conventionalcommits.org/) so the history stays readable and release notes can be generated:

```
feat: add monthly spending insights
fix: scope account transactions to the selected account
docs: update deployment section
refactor: extract chart axis into a shared component
style: align button focus states
chore: bump dependency versions
```

Keep commits focused — one logical change per commit, and write commit messages in the imperative mood.

## Pull Request Process

1. Make sure your branch is up to date: `git fetch upstream && git rebase upstream/main`.
2. Keep the PR small and focused on one concern. Large changes are harder to review — split them if needed.
3. Fill out the PR description:
   - What changed and why.
   - Screenshots (or screen recordings) for UI changes — both light and dark mode.
   - Any relevant issue numbers (e.g. `Closes #12`).
4. Verify the [quality checks](#before-submitting) pass locally.
5. A maintainer will review your PR. Address feedback with additional commits (or an interactive rebase); once approved, the PR will be squashed and merged.

## Release Process

Releases are automated with [release-please](https://github.com/googleapis/release-please) and follow [Semantic Versioning](https://semver.org/):

1. Merge changes to `main` using [Conventional Commits](#commit-guidelines) — release-please derives the next version and changelog from these.
2. The [release-please workflow](.github/workflows/release-please.yml) opens a **release PR** (version bump + generated `CHANGELOG.md`).
3. **Merge the release PR** — release-please tags the merge commit (`vX.Y.Z`).
4. The tag triggers the [Release workflow](.github/workflows/release.yml), which builds the static export, extracts the matching [CHANGELOG.md](CHANGELOG.md) entry as the release notes, publishes a GitHub Release with the site archive attached, and deploys the site to Netlify (if secrets are configured) and GitHub Pages. See [RELEASES.md](RELEASES.md#deployment-targets) for deployment setup.

> For the tag created by release-please to trigger the Release workflow, add a `RELEASE_PLEASE_TOKEN` to repository secrets — ideally a **fine-grained** PAT limited to this repository with `Contents: Read and write` and `Pull requests: Read and write` (a classic PAT with the broad `repo` scope also works, but grants much more than the workflow needs).

## Questions?

Open an issue or contact [@sanguirIS](https://github.com/sanguirIS). Thanks again for contributing! ❤️
