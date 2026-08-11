# Architecture

StockPulse is a static, browser-only application. The architecture deliberately avoids a framework, bundler, backend, database, required API credentials, and runtime JavaScript dependencies.

## Runtime flow

```text
Browser
  |
  +--> index.html
         |
         +--> css/style.css
         |
         +--> js/config.js
         +--> js/quotes.js ------> public quote endpoint
         +--> js/kline.js -------> public K-line endpoint + Canvas rendering
         +--> js/ui.js
         +--> js/app.js
```

The browser owns application state. The watchlist is persisted locally with `localStorage`; there is no server-side user account.

## Module boundaries

### `js/config.js`

Holds endpoint configuration and defaults. Provider-specific constants should stay here when practical rather than being scattered through UI code.

### `js/quotes.js`

Owns symbol normalization, real-time quote retrieval, and defensive parsing. This is a trust boundary because third-party responses can be malformed, delayed, or changed without notice. Parser changes should prefer validation and graceful fallback over assumptions that every field exists.

### `js/kline.js`

Owns historical K-line retrieval, normalization, and native Canvas rendering. Keeping chart rendering local removes a runtime chart-library dependency while preserving static hosting.

### `js/ui.js`

Owns DOM rendering, visual formatting, HTML escaping, and presentation helpers. It should not become the primary place for network access or persistent application state.

### `js/app.js`

Coordinates application state, events, data fetching, local preferences, refresh behavior, and UI updates. New features should avoid turning this file into a provider-specific parser.

## Design constraints

Contributions should preserve these constraints unless there is an explicit architectural decision to change them:

- static hosting must remain possible;
- normal use must not require secrets;
- the repository should remain understandable without a build step;
- runtime third-party JavaScript should be avoided unless its value clearly exceeds its maintenance/security cost;
- external provider failures must be treated as expected failure modes;
- financial-data precision/availability must not be overstated;
- user state should remain local unless a future feature explicitly and transparently introduces remote storage.

## Security boundaries

Inputs that deserve defensive handling include:

- search/ticker text entered by users;
- third-party quote and K-line payloads;
- URLs or strings rendered into the DOM;
- data persisted in `localStorage`;
- GitHub Actions workflow changes.

Avoid dynamic code execution (`eval`, `new Function`). When templating DOM content, untrusted strings must be escaped or assigned through `textContent` rather than injected raw.

## Data transport

The current public market-data endpoints are loaded through script requests because direct browser `fetch` access can be constrained by cross-origin policy. Provider responses are treated as untrusted input and normalized before the application uses them.

This is an upstream compatibility technique, not a guarantee that third-party endpoints will remain available. A future provider abstraction should isolate transport and response-shape changes behind small adapters.

## Testing strategy

The baseline CI intentionally uses built-in tooling so the project does not need a package manager merely to validate changes:

- Node syntax checks for first-party JavaScript;
- a smoke test that confirms critical files, DOM hooks, and local script references exist;
- CodeQL for static security analysis.

As pure functions are extracted from formatting and normalization logic, focused tests can be added without changing the runtime architecture.

## Future provider abstraction

If multiple data providers are added, prefer a small adapter contract that returns normalized quote/K-line objects. The UI and application layer should consume normalized data rather than provider-specific field positions. This keeps upstream changes localized and makes failure behavior testable.
