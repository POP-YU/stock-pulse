import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';

const source = fs.readFileSync(path.join(process.cwd(), 'js/webmcp.js'), 'utf8');
const registrations = [];
const snapshot = {
  watchlist: ['sh600519'],
  quotes: [{ symbol: 'sh600519', name: 'Demo', changePct: 1.2, last: 100, change: 1 }],
};
const app = {
  getSnapshot: () => snapshot,
  fetchQuote: async (symbol) => ({ symbol: symbol === 'AAPL' ? 'usAAPL' : symbol, name: 'Demo', changePct: 1.2, last: 100, change: 1 }),
  refreshAndSnapshot: async () => snapshot,
  addToWatchlist: async (symbol) => ({ added: true, symbol, watchlist: [symbol], quote: null }),
};
const context = vm.createContext({
  console,
  window: { StockPulseApp: app },
  document: {
    readyState: 'complete',
    modelContext: {
      registerTool: async (definition) => {
        registrations.push(definition);
      },
    },
  },
});

vm.runInContext(source, context);
await new Promise((resolve) => setImmediate(resolve));

assert.deepEqual(
  registrations.map((tool) => tool.name).sort(),
  [
    'stockpulse_add_to_watchlist',
    'stockpulse_compare_watchlist',
    'stockpulse_get_quote',
    'stockpulse_get_watchlist',
  ],
);
const byName = Object.fromEntries(registrations.map((tool) => [tool.name, tool]));
assert.equal(byName.stockpulse_get_watchlist.annotations.readOnlyHint, true);
assert.equal(byName.stockpulse_add_to_watchlist.annotations.readOnlyHint, false);
assert.equal(byName.stockpulse_get_quote.inputSchema.required[0], 'symbol');

await assert.rejects(
  byName.stockpulse_get_quote.execute({ symbol: '' }),
  /symbol must be a non-empty code/,
);
await assert.rejects(
  byName.stockpulse_get_quote.execute({ symbol: 'x'.repeat(17) }),
  /no longer than 16/,
);
assert.equal((await byName.stockpulse_get_quote.execute({ symbol: 'AAPL' })).quote.symbol, 'usAAPL');
assert.equal((await byName.stockpulse_compare_watchlist.execute({})).count, 1);
assert.equal((await byName.stockpulse_add_to_watchlist.execute({ symbol: '00700' })).added, true);

console.log('WebMCP contract checks passed (4 tools, schema bounds, annotations, and error paths).');
