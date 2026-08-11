# Security Policy

StockPulse is a static browser application, but security issues can still matter—especially issues involving injected scripts, unsafe external data handling, malicious links, repository automation, or accidental credential exposure.

## Supported versions

The current `main` branch is the supported development line. Security fixes are applied there first. Versioned support will be documented once tagged releases are published.

## Reporting a vulnerability

Please **do not open a public issue containing exploit details, secrets, private tokens, or a working proof of concept for a sensitive vulnerability**.

Preferred reporting path:

1. Use GitHub's **Private vulnerability reporting / Security advisory** feature for this repository when available.
2. If that feature is unavailable, contact the maintainer through the public GitHub profile at `https://github.com/POP-YU` and ask for a private reporting channel without including sensitive details in the first message.

Please include, when possible:

- affected file or behavior;
- impact and realistic attack scenario;
- reproduction steps;
- browser/environment details;
- suggested mitigation, if known.

## Response goals

This is a small maintainer-led project. The target process is:

- acknowledge a valid private report within 7 days;
- assess severity and scope;
- prepare a fix before public disclosure when practical;
- document the fix in the changelog or release notes.

These are maintenance goals, not a commercial SLA.

## Scope notes

StockPulse consumes public third-party market-data endpoints. Availability, accuracy, rate limits, CORS behavior, and upstream response formats are outside this project's control. Provider outages or inaccurate financial data are generally reliability/data-quality issues rather than security vulnerabilities unless they expose a concrete security impact in StockPulse.

## Secrets

StockPulse should not require API keys or credentials in normal use. Any secret committed to the repository should be treated as compromised and rotated immediately.
