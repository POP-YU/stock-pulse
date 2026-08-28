(() => {
  'use strict';

  const config = window.StockPulseConfig;
  const quotesApi = window.StockPulseQuotes;
  const klineApi = window.StockPulseKline;
  const ui = window.StockPulseUI;

  const state = {
    watchlist: loadWatchlist(),
    quotes: new Map(),
    selectedSymbol: null,
    greenUp: loadColorScheme(),
    refreshTimer: null,
    chartCleanup: null,
    loading: false,
    refreshGeneration: 0,
  };

  function loadWatchlist() {
    try {
      const saved = JSON.parse(localStorage.getItem(config.storageKey) || 'null');
      if (Array.isArray(saved)) {
        const normalized = [...new Set(saved.map(quotesApi.normalizeSymbol).filter(Boolean))];
        if (normalized.length > 0) return normalized.slice(0, 24);
      }
    } catch {
      // Ignore malformed local storage.
    }
    return [...config.defaultWatchlist];
  }

  function saveWatchlist() {
    try {
      localStorage.setItem(config.storageKey, JSON.stringify(state.watchlist));
    } catch {
      // Private browsing/storage restrictions should not break the app.
    }
  }

  function loadColorScheme() {
    try {
      return localStorage.getItem(config.colorSchemeKey) === '1';
    } catch {
      return false;
    }
  }

  function saveColorScheme() {
    try {
      localStorage.setItem(config.colorSchemeKey, state.greenUp ? '1' : '0');
    } catch {
      // Non-critical preference.
    }
  }

  function showSkeleton(show) {
    const skeleton = document.querySelector('#loading-skeleton');
    if (skeleton) skeleton.hidden = !show;
  }

  function updateEmptyState() {
    const empty = document.querySelector('#empty-state');
    if (empty) empty.hidden = state.watchlist.length > 0;
  }

  async function refreshQuotes({ force = false } = {}) {
    if (state.loading && !force) {
      return { ok: false, skipped: true, stale: false, error: 'A refresh is already in progress' };
    }

    const generation = ++state.refreshGeneration;
    state.loading = true;
    ui.setStatus('连接行情中…', 'loading');
    ui.setError('');
    showSkeleton(state.quotes.size === 0);

    try {
      const results = await quotesApi.fetchQuotes(state.watchlist);
      if (generation !== state.refreshGeneration) {
        return { ok: false, skipped: false, stale: true, error: 'A newer refresh superseded this result' };
      }

      state.quotes = new Map(results.map((quote) => [quote.symbol, quote]));
      ui.renderWatchlist(document.querySelector('#watchlist'), results, state.greenUp);
      updateEmptyState();

      const now = new Date();
      document.querySelector('#quote-time').textContent = `更新 ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}`;
      ui.setStatus(results.length ? '行情已连接' : '暂无行情', results.length ? 'ok' : 'warning');

      if (state.selectedSymbol && state.quotes.has(state.selectedSymbol)) {
        ui.renderDetail(state.quotes.get(state.selectedSymbol), state.greenUp);
      }

      return { ok: true, skipped: false, stale: false, quotes: results };
    } catch (error) {
      console.error(error);
      if (generation === state.refreshGeneration) {
        ui.setStatus('行情连接失败', 'error');
        ui.setError('行情数据拉取失败，请检查网络后重试。');
      }
      return {
        ok: false,
        skipped: false,
        stale: generation !== state.refreshGeneration,
        error: 'Quote refresh failed',
      };
    } finally {
      if (generation === state.refreshGeneration) {
        state.loading = false;
        showSkeleton(false);
      }
    }
  }

  async function openDetail(symbol, days = 120) {
    const quote = state.quotes.get(symbol);
    if (!quote) return;

    state.selectedSymbol = symbol;
    const panel = document.querySelector('#detail-panel');
    panel.hidden = false;
    ui.renderDetail(quote, state.greenUp);
    panel.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start',
    });

    const chart = document.querySelector('#kline-chart');
    chart.innerHTML = '<div class="chart-empty">加载 K 线…</div>';
    document.querySelector('#chart-time').textContent = '—';

    try {
      const rows = await klineApi.fetchKline(symbol, days);
      state.chartCleanup?.();
      state.chartCleanup = klineApi.renderKline(chart, rows, { greenUp: state.greenUp });
      document.querySelector('#chart-time').textContent = rows.at(-1)?.date || '—';
    } catch (error) {
      console.error(error);
      state.chartCleanup?.();
      state.chartCleanup = null;
      chart.innerHTML = '<div class="chart-empty">K 线数据暂时不可用</div>';
    }
  }

  function addSymbol() {
    const input = document.querySelector('#search-input');
    const hint = document.querySelector('#search-hint');
    const symbol = quotesApi.normalizeSymbol(input.value);

    if (!symbol) {
      hint.textContent = '请输入有效代码，例如 600519 / 00700 / AAPL';
      hint.hidden = false;
      return;
    }

    if (!state.watchlist.includes(symbol)) {
      state.watchlist.push(symbol);
      state.watchlist = state.watchlist.slice(-24);
      saveWatchlist();
    }

    input.value = '';
    hint.hidden = true;
    refreshQuotes({ force: true }).then(() => openDetail(symbol)).catch(console.error);
  }

  function bindEvents() {
    const input = document.querySelector('#search-input');
    document.querySelector('#search-add').addEventListener('click', addSymbol);
    input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') addSymbol();
    });
    input.addEventListener('input', () => {
      document.querySelector('#search-hint').hidden = true;
    });

    document.querySelector('#watchlist').addEventListener('click', (event) => {
      const card = event.target.closest('.quote-card');
      if (card) openDetail(card.dataset.symbol);
    });
    document.querySelector('#watchlist').addEventListener('keydown', (event) => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      const card = event.target.closest('.quote-card');
      if (!card) return;
      event.preventDefault();
      openDetail(card.dataset.symbol);
    });

    document.querySelector('#detail-close').addEventListener('click', () => {
      state.selectedSymbol = null;
      state.chartCleanup?.();
      state.chartCleanup = null;
      document.querySelector('#detail-panel').hidden = true;
    });

    document.querySelector('#retry-btn').addEventListener('click', () => refreshQuotes({ force: true }));

    const toggle = document.querySelector('#color-scheme-toggle');
    toggle.checked = state.greenUp;
    toggle.addEventListener('change', () => {
      state.greenUp = toggle.checked;
      saveColorScheme();
      ui.renderWatchlist(document.querySelector('#watchlist'), [...state.quotes.values()], state.greenUp);
      if (state.selectedSymbol && state.quotes.has(state.selectedSymbol)) {
        ui.renderDetail(state.quotes.get(state.selectedSymbol), state.greenUp);
        const activeRange = document.querySelector('.range-btn.active');
        openDetail(state.selectedSymbol, Number(activeRange?.dataset.days) || 120);
      }
    });

    document.querySelector('.kline-range').addEventListener('click', (event) => {
      const button = event.target.closest('.range-btn');
      if (!button || !state.selectedSymbol) return;
      document.querySelectorAll('.range-btn').forEach((node) => node.classList.remove('active'));
      button.classList.add('active');
      openDetail(state.selectedSymbol, Number(button.dataset.days) || 120);
    });

    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) refreshQuotes();
    });
  }

  function start() {
    bindEvents();
    updateEmptyState();
    refreshQuotes();
    state.refreshTimer = window.setInterval(refreshQuotes, config.refreshIntervalMs);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }

  function getSnapshot() {
    return {
      watchlist: [...state.watchlist],
      quotes: [...state.quotes.values()],
    };
  }

  async function fetchQuote(rawSymbol) {
    const symbol = quotesApi.normalizeSymbol(rawSymbol);
    if (!symbol) throw new Error('Invalid symbol');
    const [quote] = await quotesApi.fetchQuotes([symbol]);
    if (!quote) throw new Error('No quote data was returned for that symbol');
    return quote;
  }

  async function refreshAndSnapshot() {
    const refresh = await refreshQuotes({ force: true });
    return { ...getSnapshot(), refresh };
  }

  async function addToWatchlist(rawSymbol) {
    const symbol = quotesApi.normalizeSymbol(rawSymbol);
    if (!symbol) throw new Error('Invalid symbol');
    const alreadyPresent = state.watchlist.includes(symbol);
    if (!alreadyPresent) {
      state.watchlist = [...state.watchlist, symbol].slice(-24);
      saveWatchlist();
    }
    const refresh = await refreshQuotes({ force: true });
    return {
      ok: refresh.ok,
      stale: refresh.stale,
      error: refresh.error || null,
      added: !alreadyPresent,
      symbol,
      watchlist: [...state.watchlist],
      quote: state.quotes.get(symbol) || null,
    };
  }

  window.StockPulseApp = Object.freeze({
    getSnapshot,
    fetchQuote,
    refreshAndSnapshot,
    addToWatchlist,
  });

})();
