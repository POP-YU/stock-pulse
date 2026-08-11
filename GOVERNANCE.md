# Governance

StockPulse uses a lightweight maintainer-led governance model appropriate for an early-stage open-source project.

## Decision making

The maintainer is responsible for project direction, release quality, repository administration, security response, and final merge decisions. Community feedback is encouraged through issues and pull requests, and technical decisions should be explained in the relevant discussion when tradeoffs are non-obvious.

For routine changes, consensus in the issue or pull request is preferred. When consensus is not possible, the maintainer makes the final decision based on project scope, security, maintainability, accessibility, and long-term simplicity.

## Project principles

Changes should generally preserve these principles:

1. **Low operational complexity** — keep the project runnable as static files.
2. **Readable code** — favor straightforward browser JavaScript over unnecessary abstraction.
3. **No required secrets** — normal use should not require API keys or user credentials.
4. **Graceful failure** — external data-provider failures should not crash the application.
5. **Transparent limitations** — market-data accuracy and availability must not be overstated.
6. **Contributor accessibility** — documentation and issue templates should make it easy to understand how to help.

## Maintainer responsibilities

Maintainers are expected to:

- triage new issues and pull requests;
- review changes for correctness and scope;
- keep CI and security automation healthy;
- maintain release notes and changelog entries;
- respond to sensitive security reports privately;
- periodically review roadmap priorities and stale documentation.

Current maintainers are listed in [MAINTAINERS.md](MAINTAINERS.md).

## Becoming a maintainer

As the contributor community grows, sustained contributors may be invited to take on additional responsibility. Signals include consistent high-quality contributions, constructive review, reliable issue triage, security awareness, and alignment with project principles.

Any future maintainer additions or role changes should be recorded in `MAINTAINERS.md` through a normal pull request so the project history remains auditable.
