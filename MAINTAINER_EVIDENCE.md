# Maintainer Evidence

This document supports the Codex for Open Source application. It records verifiable maintenance work without overstating adoption, downloads, or community size.

## Maintainer role

POP-YU is the primary maintainer of this repository and owns the project direction, code changes, releases, security boundary decisions, and issue/PR workflow.

## What is maintained

StockPulse is a public, open-source, zero-build market dashboard for A-shares, Hong Kong, and US equities. The project is intentionally dependency-light so that a reviewer or contributor can run it from a static host without credentials or a backend.

## Ongoing maintenance responsibilities

- Review and merge focused changes through GitHub pull requests.
- Keep JavaScript syntax, smoke checks, WebMCP contract checks, and CodeQL green.
- Maintain GitHub Pages deployment and verify the public URL after changes.
- Document external data-provider assumptions, delayed-data behavior, and the JSONP trust boundary.
- Preserve accessibility, keyboard operation, responsive behavior, and graceful network failure.
- Maintain contributor, security, governance, support, release, and incident guidance.

## Evidence links

- Public repository: https://github.com/POP-YU/stock-pulse
- Live project: https://pop-yu.github.io/stock-pulse/
- CI workflow: https://github.com/POP-YU/stock-pulse/actions/workflows/ci.yml
- CodeQL workflow: https://github.com/POP-YU/stock-pulse/actions/workflows/codeql.yml
- Pages deployment workflow: https://github.com/POP-YU/stock-pulse/actions/workflows/deploy-pages.yml
- WebMCP implementation: https://github.com/POP-YU/stock-pulse/blob/main/js/webmcp.js
- Competition and runtime checklist: https://github.com/POP-YU/stock-pulse/blob/main/COMPETITION_CHECKLIST.md

## Why this work benefits from Codex

The repository has a real maintainer loop rather than a one-off demo: changes need regression checks, security review, deployment verification, and documentation. Codex can reduce the cost of reviewing small pull requests, triaging malformed external-data cases, checking WebMCP contracts, and maintaining release-quality documentation while keeping final decisions with the maintainer.

## Evidence boundary

This file does not claim a specific number of stars, downloads, users, or downstream dependents. Those numbers should only be entered in an application when they can be verified directly from GitHub or another authoritative analytics source.
