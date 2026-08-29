# WebMCP Challenge Submission Draft

This draft is preparation material only. It is not an official submission and must be reviewed by the entrant for eligibility, final URLs, video, and factual accuracy.

## Project name

StockPulse — an agent-assisted stock watchlist

## One-line pitch

StockPulse turns a static market dashboard into a transparent human-and-agent workflow: inspect quotes, compare a watchlist, take one explicit local action, and verify the result.

## What WebMCP adds

The WebMCP layer exposes four bounded tools:

- `stockpulse_get_watchlist` — read the visible watchlist and loaded quote snapshots.
- `stockpulse_get_quote` — fetch one normalized A-share, Hong Kong, or US symbol.
- `stockpulse_compare_watchlist` — refresh and rank the watchlist by percentage movement.
- `stockpulse_add_to_watchlist` — perform one user-directed local change and require a follow-up readback.

All market-data results are labeled untrusted and potentially delayed. The project does not place trades, require credentials, or mutate a remote brokerage account.

## Suggested demo sequence (under 3 minutes)

1. Open the deployed StockPulse URL in a WebMCP-compatible Chrome build.
2. Show the dashboard and ask the agent to call `stockpulse_get_watchlist`.
3. Ask for one symbol with `stockpulse_get_quote`.
4. Ask the agent to compare the watchlist with `stockpulse_compare_watchlist`.
5. Explicitly ask to add one symbol; call `stockpulse_add_to_watchlist`.
6. Call `stockpulse_get_watchlist` again and point to the visible readback.
7. Briefly show the README, source repository, and green CI/CodeQL checks.
8. State the limitation: public quote data may be delayed, and JSONP is documented as a boundary-risk prototype choice.

## Evidence still required before submission

- A verified public live URL.
- A real browser capture showing tool discovery and execution.
- A public YouTube demo with audio and duration below three minutes.
- Final English Devpost text and links.
- Entrant-confirmed eligibility under the current official rules.

## Final review gate

Re-check the [official rules](https://webmcp.devpost.com/rules) immediately before submitting. After the submission window closes, do not change the repository, live site, or submission.
