# Security Policy

BankDesign is an open-source, client-side **demo** banking dashboard (Next.js
static export). It ships mock data only — there is no backend, no authentication
and no real user data — but we still take vulnerabilities in the code, the build
pipeline and the deployment configuration seriously. Thank you for helping keep
the project and its users safe.

## Supported Versions

Security fixes are developed on `main` and released as patch versions of the
current minor line (`vX.Y.Z` tags — see [RELEASES.md](RELEASES.md)).

| Version | Supported          | Notes                                                 |
| ------- | ------------------ | ----------------------------------------------------- |
| 1.0.x   | :white_check_mark: | Current release line — security fixes land here      |
| < 1.0   | :x:                | Pre-1.0 development snapshots — no security support  |

Only the **latest released version** is patched. Because the app is deployed as a
static export, there is nothing to "hot-patch" server-side: please upgrade to the
newest release (or rebuild from `main`) to pick up a fix.

## Reporting a Vulnerability

**Please do not report security vulnerabilities through public GitHub issues,
discussions, or pull requests.**

Use **GitHub Private Vulnerability Reporting** — open the
[Security tab](https://github.com/sanguirIS/BankDesign/security) and click
**Report a vulnerability** (direct link:
<https://github.com/sanguirIS/BankDesign/security/advisories/new>). This creates a
private advisory visible only to you and the maintainers, and gives us a private
channel to coordinate a fix and a CVE.

If you cannot use GitHub, open a **minimal** public issue asking for a private
contact channel. Do not include vulnerability details, proof-of-concept code, or
affected-URL information in that issue.

### What to include

A good report lets us reproduce and triage quickly:

- Affected version, tag, or commit (e.g. `v1.0.0`, or the `main` commit SHA).
- Where it applies: source code, build/CI configuration, or a deployment target
  (Netlify / GitHub Pages).
- A description of the issue and its **impact** (what an attacker can do).
- Reproduction steps or a minimal proof of concept.
- Any suggested fix or mitigation you already have in mind.
- Whether you would like to be credited in the advisory, and under what name.

### What to expect

| Stage                                        | Target                              |
| -------------------------------------------- | ----------------------------------- |
| Acknowledgement of your report               | within 3 business days             |
| Initial triage (severity + impact confirmed) | within 7 business days             |
| Fix or mitigation for **critical/high**      | within 30 days of triage           |
| Fix for **moderate/low**                     | next scheduled release             |
| Public advisory + credit (coordinated)       | after a fixed release is published |

We follow coordinated disclosure: we will keep you updated on progress, agree a
disclosure date with you (90 days is our default), and publish a GitHub Security
Advisory — and request a CVE where warranted — once a fix is available. If we
cannot reproduce a report or decide it is out of scope, we will tell you why and
close the advisory with an explanation.

### Safe harbour

We will not pursue or support legal action against researchers who, in good
faith: only test against systems and accounts they own or are authorised to test;
do not access, modify, or exfiltrate other people's data; do not degrade or
interrupt service (no DoS, spam, or resource exhaustion); and report findings
privately under this policy with reasonable time to fix before public disclosure.
Please avoid privacy violations, destructive testing, and attacks on third-party
hosting providers or their infrastructure.

## Scope

### In scope

- **Application source** in `src/` — XSS, unsafe HTML injection, open redirects,
  client-side injection, prototype pollution, or unsafe handling of URL/route
  parameters.
- **Configuration** in this repository — `next.config.mjs`, `netlify.toml`,
  `package.json`, ESLint/TypeScript config — including weaknesses such as missing
  security headers or weakened build gates.
- **CI/CD workflows** in `.github/workflows/` — script/expression injection,
  over-privileged tokens, secret leakage, unsafe pull-request handling.
- **Dependencies** — a known-vulnerable dependency **that is reachable in this
  application and is actually exploitable** in it, including build-time
  dependencies that could compromise a published artifact.
- **Supply chain** — typosquatting, dependency confusion, or a compromised
  package published in the project's name.

### Out of scope

- **The mock data.** Everything in `src/data/` is fictional (accounts,
  transactions, cards, budgets, notifications). Fabricated account numbers or
  "PII" are not a finding.
- **Missing product features.** This is a demo: there is no authentication,
  session management, password reset, MFA, or payment processing. "The dashboard
  is accessible without logging in" is by design, not a vulnerability.
  **Do not deploy this project as-is to handle real banking data** — see
  [Security model](#security-model) below.
- **Dependency advisories that are unreachable.** Findings that only affect
  dev-only tooling (linters, test runners, local build helpers) or code paths the
  app never executes are triaged and tracked like ordinary dependency updates,
  not treated as security incidents. We still fix them — see
  [Dependency policy](#dependency-policy).
- **Host-managed behaviour.** TLS configuration, CDN/DDoS protection and the
  hosting platform itself (Netlify, GitHub Pages) are the providers'
  responsibility. GitHub Pages cannot serve custom response headers; that is a
  platform limitation, not a project vulnerability.
- **Social engineering**, physical attacks, spam, and reports generated purely by
  automated scanners without a demonstrated impact.

## Security model

Understanding the intended deployment helps separate features from bugs:

- The app is a **static, client-side export** (`output: "export"`) of mock data.
  There is no server, no API, no database, and no server-side request handling.
- There is **no authentication or authorisation layer** and no cookies are used
  for sessions. The only client-side storage is `localStorage` for the light/dark
  theme preference and a first-party `sidebar_state` UI-preference cookie.
- User input exists only in **demo forms** on the settings page; nothing is
  transmitted or persisted anywhere.
- Because the dashboard renders no untrusted HTML and has no user-generated
  content pipeline, the realistic attack surface is dependency compromise, build
  integrity, and deployment misconfiguration — which is what this policy focuses
  on.

## Hardening in place

- **Dependency review** — `bun.lock` is committed and CI installs with
  `bun install --frozen-lockfile`, so builds reproduce exactly the reviewed
  dependency tree. Dependabot (`.github/dependabot.yml`) opens update PRs for
  the `bun` and `github-actions` ecosystems (the `bun` ecosystem keeps
  `bun.lock` and `package.json` in sync so `--frozen-lockfile` keeps passing);
  every update goes through the CI quality gate.
- **Response headers (Netlify)** — `netlify.toml` sets a Content Security Policy,
  `X-Content-Type-Options`, `X-Frame-Options` / `frame-ancestors`,
  `Referrer-Policy`, `Permissions-Policy` and HSTS for the Netlify deployment.
- **Build gates** — CI runs ESLint, `tsc --noEmit` and a production build on Node
  20/22/24, and the build itself fails on lint and type errors.
- **Least privilege in CI** — workflow tokens are scoped to the minimum
  permissions each job needs, untrusted pull-request code runs without persisted
  credentials, no workflow has access to repository secrets on pull requests,
  and third-party actions are pinned to full commit SHAs (`Dependabot` keeps the
  pins current).
- **Secrets** — deployment tokens (`NETLIFY_AUTH_TOKEN`, `NETLIFY_SITE_ID`,
  `RELEASE_PLEASE_TOKEN`) live only in repository secrets, are never written to
  the repository, and are not available to workflows triggered by forked pull
  requests. Use fine-grained tokens with the smallest scope that works and rotate
  them periodically.

## Known limitations

These are accepted, documented risks rather than unreported vulnerabilities.
Reports about them are welcome, but will be triaged as improvements:

1. **Third-party avatar.** The demo profile picture is hot-linked from
   `https://github.com/shadcn.png` (redirecting to `avatars.githubusercontent.com`),
   so loading the dashboard makes a request to GitHub that reveals the visitor's
   IP address and referrer to that third party. Bundling the avatar with the
   site would remove that request; the CSP allow-lists only these two hosts.
2. **`'unsafe-inline'` in the CSP.** Next.js' statically exported HTML contains
   inline bootstrap scripts and inline styles, so the recommended CSP cannot drop
   `'unsafe-inline'` without a nonce/hash setup that requires a server. The policy
   still blocks external script/style origins, framing, plugins, and base-tag and
   form hijacking.
3. **GitHub Pages deployment.** Headers configured in `netlify.toml` do not apply
   to the GitHub Pages site, which ignores custom response headers. Prefer the
   Netlify deployment when header-level controls matter.
4. **Google Fonts at build time.** `next/font/google` downloads and self-hosts the
   Inter font during the build, so the build requires outbound network access to
   `fonts.googleapis.com`; offline/air-gapped builds fail. The font is *served*
   locally, so visitors make no Google request.

## Dependency policy

1. Keep `next`, `react`, and build tooling on versions without known advisories.
2. Prefer upgrading to a patched release over editing a lockfile by hand.
3. When a patched release is not yet available, record the exception in the pull
   request and, if the package is reachable at runtime, document it here.
4. Re-audit before every release: install from the frozen lockfile and run a
   dependency audit, then triage anything new before tagging.
5. Rotate and re-scope CI tokens when maintainers change, and remove secrets that
   are no longer used.

## Acknowledgements

We are grateful to the researchers who report issues responsibly. Unless a
reporter asks to stay anonymous, we credit them in the published GitHub Security
Advisory and, where a CVE is issued, in the CVE record.

## Related documents

- [CONTRIBUTING.md](CONTRIBUTING.md) — contribution and review process
- [RELEASES.md](RELEASES.md) — versioning, and how security fixes are released
- [CHANGELOG.md](CHANGELOG.md) — release history, including security fixes
