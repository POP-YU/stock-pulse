# Judge Review

First review: 2026-08-28
Repository: POP-YU/stock-pulse
Review basis: official Devpost judging dimensions, inspected repository state, live WebMCP evidence recorded in the competition checklist, and current submission requirements. This is an internal assessment, not an official score or placement guarantee.

## Review 1 — before WebMCP integration

The initial baseline scored WebMCP Leverage 1/10, Execution 5/10, Potential Impact 4/10, and Creativity & Ambition 3/10. The central blocker was that removing WebMCP would have changed nothing.

## Review 2 — after static WebMCP integration

| Dimension | Score | Evidence and deduction |
|---|---:|---|
| WebMCP Leverage | 5/10 | Four bounded tools and a visible add/read-back workflow existed, but browser execution had not yet been proven. |
| Execution | 6/10 | Coherent static app, failure handling, tests, CI, CodeQL, and maintainer docs; live evidence remained open. |
| Potential Impact | 5/10 | Cross-market, no-key static hosting was approachable, but the user story was not yet demonstrated. |
| Creativity & Ambition | 4/10 | Agent-assisted market triage was more distinctive than a plain dashboard, but lacked a memorable live proof. |

## Review 3 — 2026-08-30, after live WebMCP and deployment evidence

| Dimension | Current score | Evidence and remaining deduction | Highest-value next actions |
|---|---:|---|---|
| WebMCP Leverage | 7/10 | The deployed app has four discoverable/executable tools covering inspect -> fetch -> compare -> explicit local mutation -> read-back verification. That is meaningfully better than UI guessing. The main deduction is that the workflow is still small and Chrome-specific compatibility is not independently recorded. | 1. Capture the complete workflow in the final video. 2. Repeat on the exact browser path judges will use. 3. Keep the mutation visibly human-directed. |
| Execution | 7/10 | Live Pages deployment, bounded schemas, error handling, contract tests, CI/CodeQL history, stale-response guards, and public OSS documentation create a credible implementation. The latest main head includes automated major-version GitHub Action bumps, so final-submit CI must be re-verified on the exact frozen SHA rather than inferred from earlier green runs. | 1. Verify CI/CodeQL on the exact final SHA. 2. Keep the live URL stable. 3. Do not add risky architecture changes close to freeze. |
| Potential Impact | 6/10 | The app gives a low-friction, no-account way to inspect cross-market watchlists and lets an agent perform repeatable triage while keeping state changes local and explicit. Impact is limited by public-data freshness, prototype JSONP trust boundaries, and the lack of brokerage/action execution by design. | 1. Tell a concrete time-saving user story in the video. 2. Frame it as market triage/education, not investment advice. |
| Creativity & Ambition | 5/10 | Human-controlled local mutation plus structured agent comparison is coherent and responsible, but a stock dashboard is a familiar category. The differentiation must come from the quality of the human-agent loop rather than feature count. | 1. Make the demo emphasize inspect -> compare -> confirm -> verify. 2. Avoid spending scarce time on generic visual polish that does not strengthen that loop. |

## Overall

Current internal estimate: **6.25/10 before final demo/submit evidence**.

The project is now credible enough to submit from a product/implementation perspective, but it is not yet submission-safe because three gates remain outside the codebase:

1. entrant eligibility must be confirmed under the current official rules;
2. the required public YouTube demo under 3 minutes with audio is not verified;
3. the exact final commit must have live deployment and CI/CodeQL verified immediately before freeze.

## Judge-facing thesis

The strongest truthful framing is:

> StockPulse gives an agent a structured way to inspect the same market state a person sees, compare that state without UI guessing, make only an explicitly requested local watchlist change, and verify the change through read-back.

Do not overclaim autonomous trading, real-time guarantees, security isolation, or investment outcomes.

## Review rules for the next pass

- Do not award credit for repository documentation unless the live demo proves the same behavior.
- Bind every final claim to the exact submitted commit and deployed version.
- Re-score only if the human-agent workflow, reliability, or judge evidence materially changes.
- After the submission deadline, freeze the submitted repo/live site/submission for the judging period as required by the challenge FAQ.
