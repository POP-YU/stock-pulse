# WebMCP Challenge Demo Runbook

Target: a public, narrated demo under 3 minutes that proves StockPulse works as a human-and-agent workflow, not just as a dashboard.

## Hard gates

Before recording, verify all of the following on the exact version that will be submitted:

- Live URL opens successfully.
- A WebMCP-capable browser discovers all four `stockpulse_*` tools.
- `stockpulse_get_watchlist` returns the visible watchlist.
- `stockpulse_get_quote` returns one normalized symbol with provenance/limitations.
- `stockpulse_compare_watchlist` refreshes and ranks the current watchlist.
- `stockpulse_add_to_watchlist` is only called after an explicit user instruction.
- A final `stockpulse_get_watchlist` call proves the local mutation through read-back.
- GitHub repository is public and the MIT license is visible.
- CI/CodeQL evidence shown in the recording is green for the submitted commit.

Do not record brokerage credentials, secrets, private tabs, notifications, or unrelated account information.

## Recommended 2:30–2:45 sequence

### 0:00–0:20 — Problem and product

Show the live StockPulse dashboard.

Narration: StockPulse is a zero-backend cross-market watchlist that becomes more useful when an agent can inspect the same market state through structured WebMCP tools instead of guessing through the UI.

### 0:20–0:55 — Agent reads structured state

Ask the agent to inspect the current watchlist. Execute `stockpulse_get_watchlist`.

Then ask for one symbol and execute `stockpulse_get_quote`.

Call out that the result is structured, bounded, and marks external market data as potentially delayed/untrusted.

### 0:55–1:30 — Agent performs useful analysis

Ask: “Compare the stocks already on my watchlist by percentage move and tell me what deserves attention.”

Execute `stockpulse_compare_watchlist`.

Point out that the agent is using the app’s own tool contract rather than scraping labels from the page.

### 1:30–2:05 — Human confirms a state change

Explicitly say: “Add MSFT to my local watchlist.”

Execute `stockpulse_add_to_watchlist`.

Immediately execute `stockpulse_get_watchlist` again and show both the tool result and the visible UI update.

Narration: the human chooses the mutation; the agent performs it; a second read verifies it.

### 2:05–2:35 — Implementation evidence

Show the public GitHub repository briefly:

- `js/webmcp.js`
- WebMCP contract tests
- MIT license
- current green CI/CodeQL status

Do not spend time scrolling through unrelated maintenance files.

### 2:35–2:50 — Close with the WebMCP value

Narration: Without WebMCP, an agent must infer controls and state from the rendered page. With these four tools, people keep control of local changes while the agent gets a reliable way to inspect, compare, act, and verify.

## Recording acceptance checklist

The final video must be:

- under 3 minutes;
- public on YouTube;
- narrated with audible audio;
- visibly show the project functioning;
- visibly or verbally explain how WebMCP is used;
- use the same live URL and repository version intended for submission.

## Final freeze procedure

Immediately before submission:

1. Re-check the official Devpost rules and eligibility.
2. Record the submitted Git commit SHA.
3. Re-run/verify CI and CodeQL for that SHA.
4. Re-run the live WebMCP workflow on the deployed URL.
5. Confirm the YouTube URL is public, plays without login, has audio, and is under 3 minutes.
6. Paste the final URLs into the Devpost submission.
7. After the submission window closes, do not modify the submitted repo, live site, or Devpost entry during judging. If development must continue, work from a separate fork/copy.
