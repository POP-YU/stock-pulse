# Support

StockPulse is a community open-source project, not a commercial market-data or trading service.

## Where to ask

- **Bug:** use the bug-report issue template and include browser, operating system, stock code/ticker, expected behavior, and what happened instead.
- **Feature idea:** use the feature-request template and explain the use case before proposing a specific implementation.
- **General project question:** open a GitHub issue if the answer would be useful to future contributors or users.
- **Security issue:** do not use a public issue; follow [SECURITY.md](SECURITY.md).

## Before opening an issue

Please check that:

1. you are testing the current `main` branch or the latest published release;
2. the problem is reproducible after a refresh;
3. your browser can reach the public market-data endpoints used by the project;
4. no private API keys, cookies, VPN credentials, or personal brokerage information are included in logs or screenshots.

## Upstream data problems

StockPulse depends on public third-party market-data endpoints. Temporary outages, delayed prices, changed response formats, CORS restrictions, and regional network filtering can affect the dashboard. Reports are still useful, but the project cannot guarantee upstream availability or accuracy.

## Response expectations

The project is maintained on a best-effort basis. Maintainers prioritize security issues, regressions, reproducible data-parser failures, accessibility problems, and changes that improve reliability for many users.
