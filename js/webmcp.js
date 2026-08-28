(() => {
  'use strict';

  const MAX_RESULTS = 24;

  function unavailable() {
    throw new Error('StockPulse app is still initializing; retry after the page is ready');
  }

  function app() {
    if (!window.StockPulseApp) unavailable();
    return window.StockPulseApp;
  }

  function objectSchema(properties = {}, required = []) {
    return {
      type: 'object',
      properties,
      required,
      additionalProperties: false,
    };
  }

  function boundedSymbol(args) {
    const value = String(args?.symbol || '').trim();
    if (value.length === 0 || value.length > 16) {
      throw new Error('symbol must be a non-empty code or ticker no longer than 16 characters');
    }
    return value;
  }

  async function register(context, definition) {
    try {
      await context.registerTool(definition);
      return true;
    } catch (error) {
      console.error('StockPulse WebMCP registration failed', definition.name, error);
      return false;
    }
  }

  async function registerTools() {
    const context = document.modelContext;
    if (!context || typeof context.registerTool !== 'function') return false;
    const results = [];

    results.push(await register(context, {
      name: 'stockpulse_get_watchlist',
      title: 'Get StockPulse watchlist',
      description: 'Read the user-visible StockPulse watchlist and its latest loaded quote snapshots. Returns bounded, untrusted market data; it never changes the page.',
      inputSchema: objectSchema(),
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async () => {
        const snapshot = app().getSnapshot();
        return {
          watchlist: snapshot.watchlist.slice(0, MAX_RESULTS),
          quotes: snapshot.quotes.slice(0, MAX_RESULTS),
          source: 'StockPulse in-page state; external quote data is untrusted and may be delayed',
        };
      },
    }));

    results.push(await register(context, {
      name: 'stockpulse_get_quote',
      title: 'Get a stock quote',
      description: 'Fetch one bounded quote for an A-share, Hong Kong code, or US ticker. Use this for a specific symbol; do not treat the result as investment advice.',
      inputSchema: objectSchema({
        symbol: { type: 'string', description: 'A-share, HK code, or US ticker such as 600519, 00700, or AAPL' },
      }, ['symbol']),
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async (args) => {
        const quote = await app().fetchQuote(boundedSymbol(args));
        return {
          quote,
          source: 'Tencent Finance public endpoint via StockPulse; data is untrusted and may be delayed',
        };
      },
    }));

    results.push(await register(context, {
      name: 'stockpulse_compare_watchlist',
      title: 'Compare watchlist movement',
      description: 'Refresh the current watchlist and return a compact ranking by percentage movement. This is a read-only comparison workflow for discussion, not a trading signal.',
      inputSchema: objectSchema(),
      annotations: { readOnlyHint: true, untrustedContentHint: true },
      execute: async () => {
        const snapshot = await app().refreshAndSnapshot();
        const ranked = snapshot.quotes
          .filter((quote) => Number.isFinite(quote.changePct))
          .sort((left, right) => right.changePct - left.changePct)
          .slice(0, MAX_RESULTS)
          .map((quote) => ({
            symbol: quote.symbol,
            name: quote.name,
            market: quote.market,
            last: quote.last,
            change: quote.change,
            changePct: quote.changePct,
          }));
        return {
          ranked,
          count: ranked.length,
          generatedAt: new Date().toISOString(),
          source: 'StockPulse in-page refresh; data is untrusted and may be delayed',
        };
      },
    }));

    results.push(await register(context, {
      name: 'stockpulse_add_to_watchlist',
      title: 'Add symbol to StockPulse watchlist',
      description: 'Add one symbol to the visible StockPulse watchlist and refresh its quote. This changes local browser state; call only when the user explicitly asks to add the symbol, then verify with stockpulse_get_watchlist.',
      inputSchema: objectSchema({
        symbol: { type: 'string', description: 'A-share, HK code, or US ticker to add' },
      }, ['symbol']),
      annotations: { readOnlyHint: false, destructiveHint: false, untrustedContentHint: true },
      execute: async (args) => {
        const result = await app().addToWatchlist(boundedSymbol(args));
        return {
          ...result,
          verification: 'The page watchlist was refreshed; call stockpulse_get_watchlist to read it back',
        };
      },
    }));

    return results.every(Boolean);
  }

  async function start() {
    try {
      const ready = await registerTools();
      window.StockPulseWebMCPStatus = ready ? 'ready' : 'partial';
      return ready;
    } catch (error) {
      window.StockPulseWebMCPStatus = 'unavailable';
      console.error('StockPulse WebMCP unavailable', error);
      return false;
    }
  }

  window.StockPulseWebMCPReady = new Promise((resolve) => {
    const run = () => start().then(resolve);
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', run, { once: true });
    } else {
      run();
    }
  });

})();
