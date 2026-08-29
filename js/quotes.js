(() => {
  'use strict';

  const SCRIPT_TIMEOUT_MS = 10_000;

  function normalizeSymbol(raw) {
    const value = String(raw || '').trim();
    if (!value) return null;

    const compact = value.replace(/\s+/g, '');
    const lower = compact.toLowerCase();

    if (/^(sh|sz)\d{6}$/.test(lower)) return lower;
    if (/^hk\d{5}$/.test(lower)) return lower;
    if (/^us[a-z][a-z0-9.\-]{0,9}$/.test(lower)) {
      return `us${compact.slice(2).toUpperCase()}`;
    }

    if (/^\d{6}$/.test(compact)) {
      if (/^(5|6|9)/.test(compact)) return `sh${compact}`;
      return `sz${compact}`;
    }

    if (/^\d{5}$/.test(compact)) {
      return `hk${compact}`;
    }

    if (/^[A-Za-z][A-Za-z0-9.\-]{0,9}$/.test(compact)) {
      return `us${compact.toUpperCase()}`;
    }

    return null;
  }

  function parseNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function parseQuote(symbol, raw) {
    if (typeof raw !== 'string' || !raw.includes('~')) return null;
    const fields = raw.split('~');
    if (fields.length < 10) return null;

    const last = parseNumber(fields[3]);
    const prevClose = parseNumber(fields[4]);
    const open = parseNumber(fields[5]);
    const volume = parseNumber(fields[6]);
    const change = parseNumber(fields[31]);
    const changePct = parseNumber(fields[32]);
    const high = parseNumber(fields[33]);
    const low = parseNumber(fields[34]);
    const amount = parseNumber(fields[37]);
    const turnover = parseNumber(fields[38]);
    const pe = parseNumber(fields[39]);
    const pb = parseNumber(fields[46]);

    return {
      symbol,
      name: fields[1] || symbol,
      code: fields[2] || symbol.replace(/^(sh|sz|hk|us)/i, ''),
      last,
      prevClose,
      open,
      high,
      low,
      volume,
      amount,
      turnover,
      pe,
      pb,
      change: change ?? (last !== null && prevClose !== null ? last - prevClose : null),
      changePct:
        changePct ??
        (last !== null && prevClose
          ? ((last - prevClose) / prevClose) * 100
          : null),
      time: fields[30] || '',
      market: symbol.startsWith('hk')
        ? 'HK'
        : symbol.startsWith('us')
          ? 'US'
          : 'CN',
    };
  }

  function loadQuoteScript(symbols) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = window.setTimeout(() => {
        script.remove();
        reject(new Error('Quote request timed out'));
      }, SCRIPT_TIMEOUT_MS);

      script.charset = 'gbk';
      script.async = true;
      script.src = window.StockPulseConfig.quoteEndpoint(symbols);

      script.onload = () => {
        window.clearTimeout(timer);
        script.remove();
        resolve();
      };

      script.onerror = () => {
        window.clearTimeout(timer);
        script.remove();
        reject(new Error('Quote request failed'));
      };

      document.head.appendChild(script);
    });
  }

  async function fetchQuotes(symbols) {
    const normalized = [...new Set(symbols.map(normalizeSymbol).filter(Boolean))];
    if (normalized.length === 0) return [];

    await loadQuoteScript(normalized);

    return normalized.map((symbol) => {
      const variableName = `v_${symbol.replace(/[^A-Za-z0-9_]/g, '')}`;
      const raw = window[variableName];
      try {
        delete window[variableName];
      } catch {
        window[variableName] = undefined;
      }
      return parseQuote(symbol, raw);
    }).filter(Boolean);
  }

  window.StockPulseQuotes = Object.freeze({
    normalizeSymbol,
    fetchQuotes,
  });
})();
