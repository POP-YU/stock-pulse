# Improvement Log

## 2026-08-28

### Checked

- Authenticated GitHub account and accessible repositories.
- POP-YU/stock-pulse repository metadata, default branch, open PR #1, branch oss-readiness, README, index, JavaScript modules, tests, and PR patch.
- Official OpenAI WebMCP Challenge overview, Devpost rules, WebMCP draft specification, and Chrome WebMCP guidance.

### Problems Found

- The current branch contains a strong static-dashboard/OSS-maintenance baseline but no WebMCP registration or agent workflow.
- GitHub metadata showed GitHub Pages was not verified; a live URL is therefore unverified.
- The contest deadline in the official rules is September 3, 2026 at 13:00 PT, earlier than the requested September 10 date.
- Eligibility is not verified; the rules list China and Hong Kong among excluded locations.
- No public demo-video URL or runtime browser evidence is recorded.

### Changes Made

- Added COMPETITION_CHECKLIST.md with requirement, gap, priority, and verification tracking.
- Added JUDGE_REVIEW.md with an initial four-dimension judge-mode assessment.
- Added a safe four-tool WebMCP surface in js/webmcp.js and an app bridge in js/app.js.
- Added WebMCP script loading, registration-focused smoke assertions, and README workflow documentation.
- Re-scored JUDGE_REVIEW.md after static WebMCP integration.

### Verification

- Documents and WebMCP changes are committed on the existing oss-readiness branch via the open PR workflow.
- GitHub Actions CI and CodeQL runs for the WebMCP branch completed successfully; this is static/CI evidence only.
- Repository reads and commit metadata were obtained through the GitHub connector.
- Runtime WebMCP behavior remains UNVERIFIED until the branch is opened in a compatible browser.

### Remaining Risks

- Eligibility and prize availability must be confirmed by the entrant.
- WebMCP browser support is an early preview and may differ between Chrome and ChatGPT's browser.
- External quote endpoints can fail, change format, or be blocked by browser policy.

### Next Priority

- Add a minimal, safe WebMCP tool surface and deterministic smoke coverage without breaking the existing dashboard.


## 2026-08-28 — WebMCP contract hardening

### Checked

- Re-ran remote branch and Actions checks after the WebMCP changes.
- Reviewed the WebMCP registration lifecycle and the quote-provider trust boundary.

### Problems Found

- Registration needed an awaitable readiness signal so an inspector or agent does not race the initial tool setup.
- The initial CI workflow did not explicitly run the WebMCP contract test or syntax-check webmcp.js.
- JSONP quote endpoints execute provider responses in page context; this remains a documented high-risk boundary.

### Changes Made

- Added window.StockPulseWebMCPReady and status reporting; registration continues per tool and records partial failure.
- Added tests/webmcp-contract.mjs for registration names, schemas, annotations, normalization, and invalid-input bounds.
- Updated CI to run node --check js/webmcp.js and the contract test.
- Documented the JSONP boundary and a proxy/isolation hardening path.

### Verification

- CI run 33183034220 for head 942a9507 passed syntax, smoke, and WebMCP contract checks. CodeQL run 33183034214 for the same head was still in progress at the last check.
- Real browser discovery/execution, live deployment, and challenge eligibility remain UNVERIFIED.

### Remaining Risks

- App refresh calls can still overlap under timer/retry/agent activity; a later hardening pass should add cancellation or request generations.
- The mutating bridge is exposed to same-origin page scripts; keep the action explicit and avoid sensitive data in the page.

### Next Priority

- Verify the latest CI and CodeQL runs, then perform a Chrome WebMCP browser smoke test and publish/verify the live URL before the September 3 freeze.


## 2026-08-29 — Refresh correctness and CI recovery

### Checked

- Reviewed the failed WebMCP CI logs rather than treating the failure as transient.
- Rechecked the generated WebMCP source through the GitHub Contents API and executed local syntax/contract checks against that exact branch content.
- Revisited the agent workflow's stale-data and refresh-failure behavior.

### Problems Found

- A malformed symbol-schema edit caused a real JavaScript syntax error in js/webmcp.js; CI correctly stopped before the smoke/contract steps.
- Forced refreshes could race and let an older response overwrite newer page state.
- compare_watchlist could report an empty ranking after a failed refresh without exposing failure to the agent.
- get_quote mutated the in-memory quote cache despite its read-only annotation.

### Changes Made

- Removed the malformed duplicated WebMCP tail and repaired schema syntax.
- Added a refresh generation gate so only the newest quote refresh can update UI/state.
- Returned structured refresh outcomes, including stale/failure state, to the WebMCP comparison and add workflows.
- Made get_quote a pure fetch without writing the global quote cache.
- Extended the WebMCP contract test for schema bounds and failed refresh results.

### Verification

- GitHub Actions CI run 33222245191 for head 992705a8 passed.
- The same exact branch source passed a local node syntax check and WebMCP contract check obtained through the GitHub Contents API.
- CodeQL run 33222245155 for head 992705a8 was still in progress at the last check.
- Browser/runtime verification is still UNVERIFIED.

### Remaining Risks

- The JSONP provider response executes in-page and remains the highest security boundary risk.
- K-line requests and other UI flows still need cancellation/generation handling.
- Live deployment, real WebMCP discovery/execution, video, and eligibility remain P0 submission gates.

### Next Priority

- Verify a real browser tool discovery/execution flow, then decide whether a trusted data proxy is feasible before the competition freeze.


## 2026-08-29 — K-line stale-response guard

### Checked

- Investigated the CI failure notification shown by the user and compared it with the current Actions runs.
- Reviewed the detail-panel async path for a second stale-response race.

### Problems Found

- Earlier CI failures were caused by malformed WebMCP schema text; the source was repaired and the exact branch content now passes syntax/contract checks.
- A slow K-line response could render after the user selected another symbol/range or closed the detail panel.

### Changes Made

- Added chart generation tracking in js/app.js.
- Older K-line responses are now ignored when the selected symbol or request generation no longer matches.
- Closing the detail panel invalidates pending chart work.

### Verification

- CI run 33222344026 for head 0fdf9980 passed.
- CodeQL run 33222343937 for head 0fdf9980 passed.
- The WebMCP source and contract test also pass when fetched from the exact oss-readiness branch and run locally.
- Real browser WebMCP discovery/execution and live deployment remain UNVERIFIED.

### Next Priority

- Perform the real browser smoke test and verify the deployed URL; do not merge or freeze the submission branch until those artifacts are captured.
