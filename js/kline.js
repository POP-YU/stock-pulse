(() => {
  'use strict';

  const SCRIPT_TIMEOUT_MS = 10_000;

  function toNumber(value) {
    const number = Number(value);
    return Number.isFinite(number) ? number : null;
  }

  function normalizeRows(payload, symbol) {
    const data = payload?.data?.[symbol];
    if (!data) return [];

    const rows = data.qfqday || data.day || [];
    if (!Array.isArray(rows)) return [];

    return rows.map((row) => {
      if (!Array.isArray(row) || row.length < 6) return null;
      const [date, open, close, high, low, volume] = row;
      const parsed = {
        date: String(date),
        open: toNumber(open),
        close: toNumber(close),
        high: toNumber(high),
        low: toNumber(low),
        volume: toNumber(volume),
      };
      if ([parsed.open, parsed.close, parsed.high, parsed.low].some((value) => value === null)) {
        return null;
      }
      return parsed;
    }).filter(Boolean);
  }

  function loadKlineScript(symbol, days) {
    return new Promise((resolve, reject) => {
      const script = document.createElement('script');
      const timer = window.setTimeout(() => {
        script.remove();
        reject(new Error('K-line request timed out'));
      }, SCRIPT_TIMEOUT_MS);

      try {
        delete window.stockpulse_kline;
      } catch {
        window.stockpulse_kline = undefined;
      }

      script.async = true;
      script.src = window.StockPulseConfig.klineEndpoint(symbol, days);

      script.onload = () => {
        window.clearTimeout(timer);
        script.remove();
        const payload = window.stockpulse_kline;
        try {
          delete window.stockpulse_kline;
        } catch {
          window.stockpulse_kline = undefined;
        }
        if (!payload) {
          reject(new Error('K-line response was empty'));
          return;
        }
        resolve(payload);
      };

      script.onerror = () => {
        window.clearTimeout(timer);
        script.remove();
        reject(new Error('K-line request failed'));
      };

      document.head.appendChild(script);
    });
  }

  async function fetchKline(symbol, days = 120) {
    const normalized = window.StockPulseQuotes.normalizeSymbol(symbol);
    if (!normalized) throw new Error('Invalid symbol');
    const payload = await loadKlineScript(normalized, days);
    return normalizeRows(payload, normalized);
  }

  function renderKline(container, rows, { greenUp = false } = {}) {
    container.replaceChildren();

    if (!Array.isArray(rows) || rows.length === 0) {
      const empty = document.createElement('div');
      empty.className = 'chart-empty';
      empty.textContent = '暂无可用 K 线数据';
      container.appendChild(empty);
      return () => {};
    }

    const canvas = document.createElement('canvas');
    canvas.className = 'kline-canvas';
    canvas.setAttribute('role', 'img');
    canvas.setAttribute('aria-label', `日K线图，共 ${rows.length} 个交易日`);
    container.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    if (!ctx) return () => {};

    function draw() {
      const rect = container.getBoundingClientRect();
      const width = Math.max(320, Math.floor(rect.width || 320));
      const height = Math.max(280, Math.floor(rect.height || 320));
      const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);

      const styles = getComputedStyle(document.documentElement);
      const textColor = styles.getPropertyValue('--muted').trim() || '#64748b';
      const gridColor = styles.getPropertyValue('--border').trim() || '#e2e8f0';
      const upColor = greenUp ? '#16a34a' : '#dc2626';
      const downColor = greenUp ? '#dc2626' : '#16a34a';

      const padding = { top: 16, right: 14, bottom: 26, left: 54 };
      const volumeHeight = 64;
      const gap = 16;
      const priceBottom = height - padding.bottom - volumeHeight - gap;
      const plotWidth = width - padding.left - padding.right;
      const priceHeight = priceBottom - padding.top;

      const highs = rows.map((row) => row.high);
      const lows = rows.map((row) => row.low);
      let maxPrice = Math.max(...highs);
      let minPrice = Math.min(...lows);
      const spread = Math.max(maxPrice - minPrice, Math.abs(maxPrice) * 0.01, 1e-6);
      maxPrice += spread * 0.05;
      minPrice -= spread * 0.05;

      const maxVolume = Math.max(...rows.map((row) => row.volume || 0), 1);
      const stepX = plotWidth / rows.length;
      const bodyWidth = Math.max(1, Math.min(8, stepX * 0.64));
      const priceY = (value) =>
        padding.top + ((maxPrice - value) / (maxPrice - minPrice)) * priceHeight;

      ctx.strokeStyle = gridColor;
      ctx.lineWidth = 1;
      ctx.fillStyle = textColor;
      ctx.font = '12px system-ui, -apple-system, Segoe UI, sans-serif';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';

      for (let index = 0; index <= 4; index += 1) {
        const y = padding.top + (priceHeight / 4) * index;
        const value = maxPrice - ((maxPrice - minPrice) / 4) * index;
        ctx.beginPath();
        ctx.moveTo(padding.left, y);
        ctx.lineTo(width - padding.right, y);
        ctx.stroke();
        ctx.fillText(value.toFixed(value >= 100 ? 1 : 2), padding.left - 8, y);
      }

      rows.forEach((row, index) => {
        const x = padding.left + stepX * (index + 0.5);
        const up = row.close >= row.open;
        const candleColor = up ? upColor : downColor;

        ctx.strokeStyle = candleColor;
        ctx.fillStyle = candleColor;
        ctx.lineWidth = 1;

        ctx.beginPath();
        ctx.moveTo(x, priceY(row.high));
        ctx.lineTo(x, priceY(row.low));
        ctx.stroke();

        const openY = priceY(row.open);
        const closeY = priceY(row.close);
        const top = Math.min(openY, closeY);
        const bodyHeight = Math.max(1, Math.abs(closeY - openY));
        ctx.fillRect(x - bodyWidth / 2, top, bodyWidth, bodyHeight);

        const volume = row.volume || 0;
        const volumeAreaTop = height - padding.bottom - volumeHeight;
        const volumeBarHeight = (volume / maxVolume) * volumeHeight;
        ctx.globalAlpha = 0.55;
        ctx.fillRect(
          x - bodyWidth / 2,
          volumeAreaTop + volumeHeight - volumeBarHeight,
          bodyWidth,
          volumeBarHeight,
        );
        ctx.globalAlpha = 1;
      });

      const labelIndexes = [0, Math.floor((rows.length - 1) / 2), rows.length - 1];
      ctx.fillStyle = textColor;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'top';
      for (const index of labelIndexes) {
        const row = rows[index];
        const x = padding.left + stepX * (index + 0.5);
        ctx.fillText(row.date.slice(5), x, height - padding.bottom + 7);
      }
    }

    draw();
    const observer = new ResizeObserver(draw);
    observer.observe(container);
    return () => observer.disconnect();
  }

  window.StockPulseKline = Object.freeze({
    fetchKline,
    renderKline,
  });
})();
