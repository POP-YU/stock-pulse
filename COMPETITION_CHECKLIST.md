# WebMCP Challenge Checklist

Last reviewed: 2026-08-29
Target repository: POP-YU/stock-pulse
Target branch: main

> Deadline correction: the official Devpost rules currently list the submission deadline as **2026-09-03 13:00 PT**, not September 10. Treat September 3 as the hard submission gate. Rules and eligibility can change; re-check the official pages before submitting.

| Requirement | Current Status | Gap | Priority | Verification |
|---|---|---|---|---|
| Working live web app | VERIFIED | GitHub Pages deployment is live at https://pop-yu.github.io/stock-pulse/ | P0 | Pages workflow run 33224515336; live URL opened and rendered |
| WebMCP is a meaningful core capability | VERIFIED (LIVE) | Four tools were discovered and executed on the deployed URL; Chrome-specific compatibility remains open | P0 | Live document.modelContext discovery and tool calls |
| Agent workflow (understand -> inspect -> act -> verify) | VERIFIED (LIVE) | Live flow completed: read watchlist -> quote -> compare -> explicit add -> readback | P0 | Live tool results captured on 2026-08-29 |
| Clear tool schemas and descriptions | VERIFIED (STATIC + LIVE) | Runtime invalid-input matrix still represented by contract tests; no schema drift observed live | P0 | CI contract test plus live tool discovery |
| Human + agent collaboration | VERIFIED (LIVE) | Add action is explicit, local-only, and followed by readback verification | P1 | Live add of MSFT returned ok: true, then watchlist readback contained usMSFT |
| Existing project expanded with WebMCP during submission period | VERIFIED | WebMCP commits remain timestamped within the submission period | P0 | GitHub commit history and merged PR |
| Public source repository with open-source license | VERIFIED | MIT license exists on main | P1 | License/file audit |
| README explains WebMCP value and implementation | VERIFIED (STATIC) | Keep final English Devpost copy consistent with README | P0 | README review against rules |
| Demo video under 3 minutes with audio | UNVERIFIED | No verified public YouTube URL in repository | P0 | Play public YouTube link and record duration/audio |
| English submission materials | VERIFIED (DRAFT) | Entrant must paste/review final Devpost fields | P1 | SUBMISSION_DRAFT.md exists on main |
| Browser compatibility | PARTIAL | Deployed URL works in Codex in-app browser WebMCP; Chrome 149+ flag and other browser paths remain untested | P0 | Repeat the same flow in the required submission browser |
| Security and trust boundaries | PARTIAL / HIGH RISK | WebMCP outputs are bounded and marked untrusted, but quote JSONP executes provider JavaScript in-page; hardened proxy/isolation is not implemented | P1 | Security review, CSP/proxy plan, injection/error/oversized-output tests |
| Eligibility | UNVERIFIED | Rules currently exclude China/Hong Kong and other listed locations; entrant must verify residence/eligibility | P0 | Entrant checks Devpost rules and contest jurisdiction |
| Post-submission freeze | TODO | Do not change repo/live site/submission after submission window closes | P0 | Freeze checklist on September 3 |

## Runtime evidence

- Pages workflow run: https://github.com/POP-YU/stock-pulse/actions/runs/33224515336
- Deployed URL: https://pop-yu.github.io/stock-pulse/
- Live tools discovered: stockpulse_get_watchlist, stockpulse_get_quote, stockpulse_compare_watchlist, stockpulse_add_to_watchlist
- Live add/readback: MSFT -> usMSFT
- Evidence date: 2026-08-29

## Official references

- OpenAI challenge overview: https://openai.com/webmcp-challenge/
- Devpost rules: https://webmcp.devpost.com/rules
- WebMCP draft specification: https://webmachinelearning.github.io/webmcp/
- Chrome WebMCP overview: https://developer.chrome.com/docs/ai/webmcp
- Chrome imperative API: https://developer.chrome.com/docs/ai/webmcp/imperative-api
- Chrome declarative API: https://developer.chrome.com/docs/ai/webmcp/declarative-api
- Chrome WebMCP best practices: https://developer.chrome.com/docs/ai/webmcp/best-practices
- Chrome secure tools guidance: https://developer.chrome.com/docs/ai/webmcp/secure-tools

## Priority interpretation

- P0: blocks a valid submission, a credible live demo, or meaningful WebMCP proof.
- P1: materially affects judge confidence, usability, or reproducibility.
- P2: polish after P0/P1 evidence is complete.
