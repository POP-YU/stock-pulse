# StockPulse

Open-source, **zero-runtime-dependency** financial market dashboard for **A-shares, Hong Kong stocks, and US equities**. StockPulse runs entirely in the browser with vanilla JavaScript: no backend, no build step, no package install, and no API key required.

[![CI](https://github.com/POP-YU/stock-pulse/actions/workflows/ci.yml/badge.svg)](https://github.com/POP-YU/stock-pulse/actions/workflows/ci.yml)
[![CodeQL](https://github.com/POP-YU/stock-pulse/actions/workflows/codeql.yml/badge.svg)](https://github.com/POP-YU/stock-pulse/actions/workflows/codeql.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Maintained](https://img.shields.io/badge/status-active-brightgreen.svg)](MAINTAINERS.md)

> Project status: **early-stage and actively maintained**. The codebase is intentionally small so contributors can understand the full data flow without learning a framework or build system first.

## Why StockPulse

Many market dashboards require a backend, build toolchain, account, API key, or runtime CDN. StockPulse is a readable, self-contained reference implementation for fetching and visualizing cross-market quote data directly in the browser.

- **Zero setup**: static files only; no package install and no build step.
- **Zero runtime dependencies**: K-line and volume charts are rendered with the browser Canvas API.
- **Cross-market**: A-shares, Hong Kong, and US stocks in one watchlist.
- **Transparent architecture**: small JavaScript modules with a documented data flow.
- **Portable**: works on any static host, including GitHub Pages.
- **Educational by design**: useful for learning data ingestion, defensive parsing, state management, accessibility, and financial chart rendering.

## Features

- Real-time quote fields: last price, change, change %, open, previous close, high, low, volume, turnover, P/E, and P/B when supplied upstream.
- Daily candlestick and volume charts with 1M / 6M / 1Y ranges.
- Search by A-share code, HK code, or US ticker.
- Watchlist persistence via `localStorage`.
- China and international red/green color conventions.
- Mobile-responsive UI, keyboard-accessible stock cards, live status announcements, and `prefers-reduced-motion` support.
- No runtime CDN or third-party JavaScript dependency.

## Quick start

```bash
git clone https://github.com/POP-YU/stock-pulse.git
cd stock-pulse
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## GitHub Pages

This repository is ready for GitHub Pages because it is fully static and includes `.nojekyll`.

To publish it:

1. Open **Settings → Pages** in this repository.
2. Choose **Deploy from a branch**.
3. Select **`main`** and **`/ (root)`**.
4. Save.

The site will be available at `https://pop-yu.github.io/stock-pulse/` after GitHub finishes the first deployment.

## Data sources

- Real-time quotes: Tencent Finance `qt.gtimg.cn` public endpoint.
- Daily K-line data: Tencent Finance `web.ifzq.gtimg.cn`.

External market-data endpoints can change without notice. StockPulse treats data access as a replaceable boundary and fails gracefully when upstream data is unavailable or malformed.

## Architecture

```text
index.html
   |
   v
js/app.js  -------- user interaction / application state
   |  \
   |   +------ js/ui.js -------- DOM rendering and formatting
   |
   +---------- js/quotes.js ---- real-time quote retrieval / decoding
   |
   +---------- js/kline.js ----- K-line retrieval / native Canvas rendering
   |
   +---------- js/config.js ---- endpoints and defaults
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for design principles, trust boundaries, and contribution guidance.

## Project structure

```text
stock-pulse/
├── index.html
├── css/style.css
├── js/
│   ├── app.js
│   ├── config.js
│   ├── kline.js
│   ├── quotes.js
│   └── ui.js
├── tests/
│   └── smoke.mjs
├── docs/
│   ├── ARCHITECTURE.md
│   └── RELEASE.md
├── .github/
│   ├── ISSUE_TEMPLATE/
│   ├── workflows/
│   ├── CODEOWNERS
│   └── PULL_REQUEST_TEMPLATE.md
├── CONTRIBUTING.md
├── GOVERNANCE.md
├── MAINTAINERS.md
├── ROADMAP.md
├── SECURITY.md
├── SUPPORT.md
├── CHANGELOG.md
└── LICENSE
```


## WebMCP agent workflows

StockPulse exposes a small, composable WebMCP surface so an agent can inspect market data, compare the visible watchlist, and (only after an explicit user request) add a symbol to that watchlist. The dashboard remains fully usable by people without an agent; WebMCP adds a verifiable collaboration layer rather than a separate chatbot.

Registered tools:

- stockpulse_get_watchlist — read the visible watchlist and loaded quote snapshots.
- stockpulse_get_quote — fetch one bounded quote for an A-share, HK code, or US ticker.
- stockpulse_compare_watchlist — refresh and rank the current watchlist by percentage movement.
- stockpulse_add_to_watchlist — user-directed local watchlist update, followed by a required read-back verification.

Every tool has an explicit JSON schema, bounded inputs, structured results, and actionable errors. Quote and comparison results are marked as untrusted external data and include provenance/limitations. The mutating tool is intentionally explicit and does not place orders or change remote data.

### Try WebMCP locally

1. Use a WebMCP-capable Chrome preview (Chrome 149+), enable chrome://flags/#enable-webmcp-testing, and restart the browser.
2. Serve the repository over http://localhost or another secure context; do not open the file directly.
3. Open the StockPulse page, then use a compatible agent/tool inspector to discover stockpulse_* tools.
4. Demonstrate the workflow: get watchlist -> compare watchlist -> ask the user whether to add a symbol -> add -> get watchlist again.
5. If document.modelContext is unavailable, the dashboard still works and the page logs a clear capability message; this is expected on browsers without WebMCP.

The WebMCP implementation is in js/webmcp.js and the application bridge is in js/app.js. Browser execution evidence is tracked separately from static repository checks in COMPETITION_CHECKLIST.md.

## Contributing

Contributions are welcome. Good first contributions include documentation fixes, accessibility improvements, parser hardening, test coverage, and small UX changes.

Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Bug reports and feature requests have dedicated GitHub issue templates.

## Maintenance and releases

StockPulse uses a lightweight maintainer workflow:

- issues are triaged regularly;
- pull requests are expected to pass CI before merge;
- security reports follow [SECURITY.md](SECURITY.md);
- user-visible changes are recorded in [CHANGELOG.md](CHANGELOG.md);
- releases follow [docs/RELEASE.md](docs/RELEASE.md);
- current priorities are tracked in [ROADMAP.md](ROADMAP.md).

Maintainer responsibilities and decision-making are documented in [GOVERNANCE.md](GOVERNANCE.md) and [MAINTAINERS.md](MAINTAINERS.md).

## Security

Please do **not** publish sensitive vulnerability details in a public issue. Follow the private-reporting guidance in [SECURITY.md](SECURITY.md).

## Disclaimer

StockPulse is an educational and reference project. Market data can be delayed, incomplete, or unavailable. Nothing in this repository is investment advice. Verify information independently before making financial decisions.

## License

[MIT](LICENSE) © 2026 POP-YU.
