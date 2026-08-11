(() => {
  'use strict';

  const DEFAULT_WATCHLIST = ['sh600519', 'hk00700', 'usAAPL'];

  window.StockPulseConfig = Object.freeze({
    defaultWatchlist: DEFAULT_WATCHLIST,
    quoteEndpoint(symbols) {
      return `https://qt.gtimg.cn/q=${symbols.join(',')}`;
    },
    klineEndpoint(symbol, days) {
      const safeDays = Math.max(30, Math.min(500, Number(days) || 120));
      return `https://web.ifzq.gtimg.cn/appstock/app/fqkline/get?_var=stockpulse_kline&param=${encodeURIComponent(symbol)},day,,,${safeDays},qfq`;
    },
    refreshIntervalMs: 15_000,
    storageKey: 'stockpulse.watchlist.v1',
    colorSchemeKey: 'stockpulse.greenUp.v1',
  });
})();
