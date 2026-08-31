# WebMCP Challenge Submission Draft

This draft is preparation material only. It is not an official submission and must be reviewed by the entrant for eligibility, final URLs, video, and factual accuracy.

## Project name

StockPulse — an agent-assisted stock watchlist

## One-line pitch

StockPulse turns a static market dashboard into a transparent human-and-agent workflow: inspect quotes, compare a watchlist, take one explicit local action, and verify the result.

## Problem

A person can read a market dashboard, but an agent normally has to infer page structure, labels, controls, and state from the rendered UI. That makes repeated watchlist inspection and comparison brittle. StockPulse exposes the app's intended operations directly as structured WebMCP tools while leaving the same dashboard fully usable by a person.

## Why WebMCP

WebMCP is not a separate chatbot layer in StockPulse. It gives the agent a reliable contract over the same state the person sees.

The current live workflow is:

1. inspect the visible watchlist;
2. fetch a bounded quote for one normalized symbol;
3. refresh and compare the current watchlist;
4. only after an explicit user request, add one symbol to the local watchlist;
5. read the watchlist again to verify the mutation.

Without WebMCP, an agent would need to guess through page controls and scrape rendered text. With WebMCP, the app defines the intended operations, schemas, limits, provenance, and error behavior directly.

## WebMCP tools

- `stockpulse_get_watchlist` — read the visible watchlist and loaded quote snapshots.
- `stockpulse_get_quote` — fetch one normalized A-share, Hong Kong, or US symbol.
- `stockpulse_compare_watchlist` — refresh and rank the watchlist by percentage movement.
- `stockpulse_add_to_watchlist` — perform one user-directed local change and require a follow-up readback.

All market-data results are labeled untrusted and potentially delayed. The project does not place trades, require credentials, or mutate a remote brokerage account.

## Human + agent collaboration

The person keeps control of consequential intent: the agent may inspect and compare freely, but the watchlist mutation is only performed after a direct user request. The workflow then verifies the result by reading state again. This makes the collaboration easy to explain in a short demo: **inspect -> compare -> confirm -> act -> verify**.

## Live project

- App: https://pop-yu.github.io/stock-pulse/
- Source: https://github.com/POP-YU/stock-pulse
- License: MIT

The live URL and all four WebMCP tools were verified on 2026-08-29 in a WebMCP-capable in-app browser. Re-verify the same flow on the exact final commit immediately before submission.

## Suggested demo sequence

Use `DEMO_RUNBOOK.md` as the recording script. Keep the final public YouTube video below three minutes with narration/audio and visibly prove:

- tool discovery/execution;
- structured watchlist and quote reads;
- useful comparison;
- explicit human-directed local mutation;
- read-back verification;
- public source/license and green checks for the submitted version.

## Known limitations

- Public quote data can be delayed, incomplete, or unavailable.
- The zero-backend quote path currently uses a JSONP-compatible provider boundary that executes provider JavaScript in-page; this is documented as a prototype security limitation.
- The project is educational/reference software and is not investment advice or trading infrastructure.
- Chrome/WebMCP preview compatibility should be re-tested on the exact judge path before submission.

## Evidence still required before submission

- Entrant-confirmed eligibility under the current official rules.
- A public YouTube demo with audio and duration below three minutes.
- Final CI/CodeQL and live-deployment verification bound to the exact frozen commit SHA.
- Final Devpost text and links pasted/reviewed by the entrant.

## Final review gate

Re-check the official rules at https://webmcp.devpost.com/rules immediately before submitting. The current deadline is September 3, 2026 at 1:00 PM Pacific Time. After the submission window closes, do not modify the submitted repository, live site, or Devpost entry during judging; continue development only in a separate copy/fork if needed.
