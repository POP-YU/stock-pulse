# Judge Review

First review: 2026-08-28
Repository: POP-YU/stock-pulse
Review basis: official Devpost judging dimensions, inspected branch oss-readiness, and verified repository metadata. This is an internal assessment, not an official score.

## Review 1 — before WebMCP integration

The initial baseline scored WebMCP Leverage 1/10, Execution 5/10, Potential Impact 4/10, and Creativity & Ambition 3/10. The central blocker was that removing WebMCP would have changed nothing.

## Review 2 — after static WebMCP integration

| Dimension | Current score | Evidence and remaining deduction | Highest-value next actions |
|---|---:|---|---|
| WebMCP Leverage | 5/10 | Four single-purpose tools now use document.modelContext.registerTool with explicit schemas, bounded inputs, read-only/untrusted annotations, and a visible add-and-read-back workflow. Real browser discovery/execution is still unverified. | 1. Run tools in Chrome/WebMCP or ChatGPT browser. 2. Capture the compare -> explicit add -> read-back flow. 3. Keep output and error evidence. |
| Execution | 6/10 | Existing PR adds a coherent zero-dependency app, graceful failure paths, smoke tests, CI, CodeQL, and maintainer docs. Static WebMCP checks and CI passed; live deployment and browser evidence remain open. | 1. Verify a live URL. 2. Finish CodeQL and record result. 3. Add runtime negative-path evidence. |
| Potential Impact | 5/10 | Cross-market, no-key static hosting is approachable, and the agent can now perform a useful watchlist comparison without placing trades. Audience, freshness limits, and provenance are explicit. | 1. Show a concrete time-saving user story. 2. Add a concise English challenge narrative. 3. Avoid implying investment advice. |
| Creativity & Ambition | 4/10 | Agent-assisted market triage is more distinctive than a plain dashboard, while keeping the implementation disciplined. It needs a memorable but truthful demo to score higher. | 1. Produce an under-three-minute narrated demo. 2. Emphasize human confirmation on state changes. 3. Compare against showcased WebMCP apps for clarity, not feature count. |

## Overall

Current internal estimate: **5/10 before runtime/live evidence**. This is not an official score or a placement guarantee. Eligibility, live URL, timestamped changes, demo video, and the September 3 submission freeze remain gating risks.

## Review rules for the next pass

- Do not award credit for tool registration until a real browser executes the tool.
- Separate repository/static evidence from live-runtime evidence.
- Re-score after live discovery, demo capture, and deployment verification.
- Record disagreements or unverified assumptions explicitly.
