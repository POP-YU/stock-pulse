# Release Process

StockPulse uses a lightweight release process intended to leave a clear maintenance history without adding unnecessary tooling.

## Versioning

Tagged releases should use semantic versioning where practical:

- **PATCH**: bug fixes, parser hardening, accessibility fixes, documentation corrections with user impact.
- **MINOR**: backward-compatible features or meaningful UI/data capabilities.
- **MAJOR**: breaking changes to usage, architecture, hosting model, or public extension contracts.

Before the project reaches `1.0.0`, minor versions may contain larger structural changes, but release notes should call them out clearly.

## Release checklist

1. Review open high-priority bugs and security reports.
2. Confirm CI and CodeQL are healthy on `main`.
3. Test representative A-share, Hong Kong, and US symbols in a current browser.
4. Verify the GitHub Pages demo loads and local assets resolve.
5. Confirm no credentials, tokens, private URLs, or personal data are included.
6. Move completed entries from `[Unreleased]` in `CHANGELOG.md` into a versioned section with the release date.
7. Create an annotated/tagged GitHub release such as `v0.1.0`.
8. Write release notes focused on user-visible changes, reliability, security, and known limitations.
9. After release, verify the published demo again.

## Suggested first release

The first tagged release should be `v0.1.0` after the OSS-maintenance baseline is merged and the GitHub Pages demo is confirmed working.

## Hotfixes

For urgent security or severe regression fixes:

1. prepare the smallest safe fix;
2. run CI/security checks;
3. merge to `main`;
4. publish a patch release when a versioned release line exists;
5. document the issue without exposing sensitive exploit details prematurely.
