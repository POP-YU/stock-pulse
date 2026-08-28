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

- The preceding CI run passed; the latest run is re-triggered for the final head and must be rechecked before merge.
- Real browser discovery/execution, live deployment, and challenge eligibility remain UNVERIFIED.

### Remaining Risks

- App refresh calls can still overlap under timer/retry/agent activity; a later hardening pass should add cancellation or request generations.
- The mutating bridge is exposed to same-origin page scripts; keep the action explicit and avoid sensitive data in the page.

### Next Priority

- Verify the latest CI and CodeQL runs, then perform a Chrome WebMCP browser smoke test and publish/verify the live URL before the September 3 freeze.
