# Roadmap

StockPulse is intentionally small. The roadmap favors reliability, maintainability, and contributor accessibility over feature count.

## Now — stabilization

- [x] Publish the live GitHub Pages demo from `main` — verified at https://pop-yu.github.io/stock-pulse/.
- [ ] Establish the first tagged release (`v0.1.0`).
- [ ] Harden quote/K-line parsing against malformed or partial upstream responses.
- [ ] Expand smoke coverage for required local assets and critical DOM hooks.
- [ ] Improve keyboard accessibility and focus states where needed.
- [ ] Document known provider limitations and fallback behavior.

## Next — contributor-friendly improvements

- [ ] Add small unit-style tests for code/ticker normalization and formatting helpers.
- [ ] Improve loading/error states for partial market-data failures.
- [ ] Add optional provider abstraction so upstream endpoints can be replaced cleanly.
- [ ] Improve mobile detail-chart interactions.
- [ ] Add simple export/import for the local watchlist without requiring an account.

## Later — only if demand justifies the complexity

- [ ] Multiple quote-provider adapters.
- [ ] Additional markets or index instruments.
- [ ] Technical indicators as optional visualization modules.
- [ ] Localization beyond the current interface.
- [ ] A documented plugin boundary for community extensions.

## Non-goals

Unless the project's scope changes through maintainer discussion, StockPulse is **not** intended to become:

- a brokerage or trading client;
- an automated trading system;
- a portfolio custody/account platform;
- a source of guaranteed real-time market data;
- a service that requires users to upload brokerage credentials.

## How roadmap items move

Roadmap items are priorities, not promises. A change normally moves forward when it is useful, fits the project's low-complexity principles, has a clear maintenance story, and can be implemented without misrepresenting financial-data reliability.
