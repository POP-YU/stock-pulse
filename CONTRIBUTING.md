# Contributing to StockPulse

Thanks for helping improve StockPulse. The project intentionally avoids a build system and large dependency graph, so changes should remain easy to read, review, and run locally.

## Before you start

For small fixes, open a pull request directly. For larger features or changes to data-provider behavior, open an issue first so the approach can be discussed before substantial work begins.

## Local development

```bash
git clone https://github.com/POP-YU/stock-pulse.git
cd stock-pulse
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## Run checks

StockPulse uses only built-in Node.js APIs for its smoke tests.

```bash
node --check js/config.js
node --check js/quotes.js
node --check js/kline.js
node --check js/ui.js
node --check js/app.js
node --check js/webmcp.js
node tests/smoke.mjs
node tests/webmcp-contract.mjs
```

The same checks run in GitHub Actions.

## Pull request expectations

Please keep each pull request focused on one coherent change. A good PR should:

- explain the user-visible or maintenance problem being solved;
- avoid unrelated formatting churn;
- preserve the no-build, dependency-light design unless there is a strong reason not to;
- update documentation when behavior or architecture changes;
- add or update checks when fixing a regression;
- avoid committing secrets, credentials, personal data, or proprietary market-data material;
- pass CI before merge.

## Commit messages

Concise conventional-style messages are encouraged, for example:

- `feat: add keyboard navigation for watchlist cards`
- `fix: handle malformed quote payloads`
- `docs: clarify GitHub Pages deployment`
- `test: cover missing local asset references`
- `chore: refresh maintenance documentation`

## Data providers

Quote providers are external services and may change without notice. Changes in `js/quotes.js`, `js/kline.js`, or endpoint configuration should:

1. fail gracefully when data is unavailable or malformed;
2. avoid embedding private credentials;
3. document assumptions about response formats;
4. preserve the educational/reference disclaimer;
5. avoid presenting data as guaranteed real-time or suitable for trading decisions.

## Accessibility and UX

When changing the interface, preserve keyboard usability, responsive layout, semantic labels, and reduced-motion behavior where applicable.

## Security

Do not report sensitive vulnerabilities in public issues. Follow [SECURITY.md](SECURITY.md).

## Review and merge

The maintainer may request revisions for correctness, scope, security, accessibility, documentation, or maintainability. Accepted changes are normally merged after CI passes.
