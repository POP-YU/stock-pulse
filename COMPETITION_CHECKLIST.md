# WebMCP Challenge Checklist

Last reviewed: 2026-08-28
Target repository: POP-YU/stock-pulse
Target branch: oss-readiness

> Deadline correction: the official Devpost rules currently list the submission deadline as **2026-09-03 13:00 PT**, not September 10. Treat September 3 as the hard submission gate. Rules and eligibility can change; re-check the official pages before submitting.

| Requirement | Current Status | Gap | Priority | Verification |
|---|---|---|---|---|
| Working live web app | PARTIAL | GitHub Pages is documented but pages deployment was not verified; publish and verify a live URL | P0 | Open deployed URL in Chrome/WebMCP and ChatGPT browser |
| WebMCP is a meaningful core capability | PARTIAL | Four tools are now registered statically; real browser discovery/execution remains unverified | P0 | document.modelContext.getTools() lists StockPulse tools; execute each in a browser |
| Agent workflow (understand -> inspect -> act -> verify) | PARTIAL | Add structured read tools and a safe watchlist workflow with verification | P0 | Run scripted demo and capture tool calls/results |
| Clear tool schemas and descriptions | VERIFIED (STATIC) | Schemas, bounds, structured results, and errors are covered by code/smoke checks; runtime validation remains open | P0 | Inspect registrations and invalid-input tests |
| Human + agent collaboration | PARTIAL | Mutating watchlist action must be explicit and visible; no silent destructive changes | P1 | Demo shows user-visible watchlist update and follow-up readback |
| Existing project expanded with WebMCP during submission period | VERIFIED (STATIC) | WebMCP commits are timestamped 2026-08-28 on oss-readiness, within the submission period | P0 | GitHub commit history on challenge branch |
| Public source repository with open-source license | VERIFIED | MIT license exists on branch; keep source/assets complete | P1 | License/file audit |
| README explains WebMCP value and implementation | VERIFIED (STATIC) | WebMCP purpose, four tools, setup, workflow, and limitations are documented | P0 | README review against rules |
| Demo video under 3 minutes with audio | UNVERIFIED | No verified public YouTube URL in repository | P0 | Play public YouTube link and record duration/audio |
| English submission materials | PARTIAL | Main README is Chinese/English mixed; provide concise English challenge summary | P1 | Manual review of Devpost fields |
| Browser compatibility | UNVERIFIED | Chrome WebMCP flag / origin isolation and ChatGPT browser need real-device testing | P0 | Chrome 149+ flag test plus ChatGPT in-app browser smoke test |
| Security and trust boundaries | PARTIAL | Tool outputs are bounded and marked untrusted; runtime injection/error behavior still needs browser evidence | P1 | Injection/error/oversized-output tests |
| Eligibility | UNVERIFIED | Rules currently exclude China/Hong Kong and other listed locations; entrant must verify residence/eligibility | P0 | Entrant checks Devpost rules and contest jurisdiction |
| Post-submission freeze | TODO | Do not change repo/live site/submission after submission window closes | P0 | Freeze checklist on September 3 |

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
