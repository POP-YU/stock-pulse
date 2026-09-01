# WebMCP Challenge Checklist

Last reviewed: 2026-09-01
Target repository: POP-YU/stock-pulse
Target branch: main
Target submission SHA: `92e7e5a4e0fd3bde4bba968e37a4de214182e382`

> The official Devpost rules currently list the submission deadline as **2026-09-03 13:00 PT**. Re-check rules and eligibility before submitting. After the deadline, the challenge FAQ says not to modify the submitted repo, live site, or Devpost entry during judging.

| Requirement | Current Status | Gap | Priority | Verification |
|---|---|---|---|---|
| Working live web app | VERIFIED | GitHub Pages deployment is live at https://pop-yu.github.io/stock-pulse/ | P0 | Pages workflow succeeded on target SHA; re-open once immediately before submit |
| WebMCP is a meaningful core capability | VERIFIED (LIVE) | Four tools were discovered and executed on the deployed URL; Chrome-specific compatibility remains open | P0 | Live `document.modelContext` discovery and tool calls |
| Agent workflow (understand -> inspect -> act -> verify) | VERIFIED (LIVE) | Live flow completed: read watchlist -> quote -> compare -> explicit add -> readback | P0 | Live tool results captured on 2026-08-29 |
| Clear tool schemas and descriptions | VERIFIED (STATIC + LIVE) | Keep final runtime behavior aligned with contract tests | P0 | CI contract test plus live tool discovery |
| Human + agent collaboration | VERIFIED (LIVE) | Add action is explicit, local-only, and followed by readback verification | P1 | Live add of MSFT returned ok: true, then watchlist readback contained usMSFT |
| Existing project expanded with WebMCP during submission period | VERIFIED | WebMCP commits are timestamped within the submission period | P0 | GitHub commit history and merged PR #1 |
| Public source repository with open-source license | VERIFIED | MIT license exists on main | P1 | License/file audit |
| README explains WebMCP value and implementation | VERIFIED (STATIC) | Keep final Devpost copy consistent with README | P0 | README review against rules |
| Demo video under 3 minutes with audio | UNVERIFIED | No verified public YouTube URL in repository | P0 | `DEMO_RUNBOOK.md`; final public video must be played and checked |
| English submission materials | VERIFIED (DRAFT) | Entrant must paste/review final Devpost fields | P1 | `SUBMISSION_DRAFT.md` |
| Browser compatibility | PARTIAL | Deployed URL works in a WebMCP-capable in-app browser; Chrome preview path remains unverified | P0 | Repeat exact workflow in final judge/browser path |
| Final-submit CI/CodeQL | VERIFIED ON TARGET SHA | CI/Pages/CodeQL evidence is now bound to `92e7e5a4...`; keep this SHA frozen unless a new change is intentionally accepted and fully re-verified | P0 | GitHub Actions: Pages success on 2026-08-31; scheduled CodeQL success on 2026-08-31 |
| Security and trust boundaries | PARTIAL / HIGH RISK | WebMCP outputs are bounded and marked untrusted, but quote JSONP executes provider JavaScript in-page; hardened proxy/isolation is not implemented | P1 | Security docs + tests; avoid risky architecture rewrite near freeze |
| Eligibility | UNVERIFIED | Entrant must verify residence/eligibility under current rules; Devpost currently excludes several jurisdictions including China | P0 | Entrant checks Devpost rules and contest jurisdiction |
| Post-submission freeze | TODO | Do not change repo/live site/submission after submission window closes | P0 | Freeze checklist on September 3 |

## Runtime evidence

- Deployed URL: https://pop-yu.github.io/stock-pulse/
- Target submission SHA: `92e7e5a4e0fd3bde4bba968e37a4de214182e382`
- Live tools discovered: `stockpulse_get_watchlist`, `stockpulse_get_quote`, `stockpulse_compare_watchlist`, `stockpulse_add_to_watchlist`
- Live add/readback: MSFT -> usMSFT
- Live WebMCP evidence date: 2026-08-29
- GitHub Pages on target SHA: success, 2026-08-31
- CodeQL on target SHA: success, 2026-08-31

## Current repository-head status

As of the 2026-09-01 review, `main` still points to `92e7e5a4e0fd3bde4bba968e37a4de214182e382`. No newer commits have landed since the final submission-prep documentation merge. This makes the repository a good candidate for a submission freeze. Avoid nonessential changes from here forward; any accepted code or dependency change creates a new SHA that must repeat CI, CodeQL, Pages, and live WebMCP verification.

## Final P0 sequence

1. Confirm entrant eligibility under current official rules.
2. Re-run the full WebMCP flow on the exact intended final version in the judge/browser path.
3. Keep `92e7e5a4...` as the frozen SHA unless there is a compelling reason to change it; if changed, repeat CI + CodeQL + Pages + live-flow verification.
4. Record and publish the narrated YouTube demo under 3 minutes using `DEMO_RUNBOOK.md`.
5. Confirm video, live URL, source URL, and license are all publicly accessible.
6. Paste/review the final Devpost submission.
7. Freeze the submitted version after the deadline.

## Official references

- OpenAI challenge overview: https://openai.com/webmcp-challenge/
- Devpost rules: https://webmcp.devpost.com/rules
- Devpost resources/FAQ: https://webmcp.devpost.com/resources
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
