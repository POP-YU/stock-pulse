(() => {
  'use strict';

  function formatNumber(value, digits = 2) {
    if (!Number.isFinite(value)) return '—';
    return value.toLocaleString(undefined, {
      maximumFractionDigits: digits,
      minimumFractionDigits: digits,
    });
  }

  function formatCompact(value) {
    if (!Number.isFinite(value)) return '—';
    const abs = Math.abs(value);
    if (abs >= 1e9) return `${formatNumber(value / 1e9, 2)}B`;
    if (abs >= 1e6) return `${formatNumber(value / 1e6, 2)}M`;
    if (abs >= 1e4) return `${formatNumber(value / 1e4, 2)}万`;
    return Math.round(value).toLocaleString();
  }

  function movementClass(change, greenUp) {
    if (!Number.isFinite(change) || change === 0) return 'flat';
    const up = change > 0;
    if (greenUp) return up ? 'positive green-up' : 'negative green-up';
    return up ? 'positive' : 'negative';
  }

  function escapeHtml(value) {
    return String(value)
      .replaceAll('&', '&amp;')
      .replaceAll('<', '&lt;')
      .replaceAll('>', '&gt;')
      .replaceAll('"', '&quot;')
      .replaceAll("'", '&#039;');
  }

  function quoteCard(quote, greenUp) {
    const article = document.createElement('article');
    article.className = 'quote-card';
    article.dataset.symbol = quote.symbol;
    article.tabIndex = 0;
    article.setAttribute('role', 'button');
    article.setAttribute('aria-label', `查看 ${quote.name} ${quote.code} 详情`);

    const movement = movementClass(quote.change, greenUp);
    const pct = Number.isFinite(quote.changePct)
      ? `${quote.changePct >= 0 ? '+' : ''}${quote.changePct.toFixed(2)}%`
      : '—';
    const change = Number.isFinite(quote.change)
      ? `${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)}`
      : '—';

    article.innerHTML = `
      <div class="quote-card-head">
        <div>
          <h3>${escapeHtml(quote.name)}</h3>
          <p>${escapeHtml(quote.symbol.toUpperCase())} · ${escapeHtml(quote.market)}</p>
        </div>
        <span class="market-tag">${escapeHtml(quote.market)}</span>
      </div>
      <div class="quote-price ${movement}">${formatNumber(quote.last, quote.last >= 100 ? 2 : 3)}</div>
      <div class="quote-change ${movement}">
        <span>${change}</span>
        <span>${pct}</span>
      </div>
      <dl class="quote-mini">
        <div><dt>最高</dt><dd>${formatNumber(quote.high)}</dd></div>
        <div><dt>最低</dt><dd>${formatNumber(quote.low)}</dd></div>
        <div><dt>成交量</dt><dd>${formatCompact(quote.volume)}</dd></div>
      </dl>
    `;
    return article;
  }

  function renderWatchlist(container, quotes, greenUp) {
    container.querySelectorAll('.quote-card').forEach((node) => node.remove());
    for (const quote of quotes) {
      container.appendChild(quoteCard(quote, greenUp));
    }
  }

  function renderDetail(quote, greenUp) {
    document.querySelector('#detail-name').textContent = quote.name;
    document.querySelector('#detail-code').textContent = `${quote.symbol.toUpperCase()} · ${quote.market}`;
    document.querySelector('#detail-last').textContent = formatNumber(quote.last, quote.last >= 100 ? 2 : 3);

    const changeNode = document.querySelector('#detail-change');
    const movement = movementClass(quote.change, greenUp);
    changeNode.className = `detail-change ${movement}`;
    const change = Number.isFinite(quote.change)
      ? `${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)}`
      : '—';
    const pct = Number.isFinite(quote.changePct)
      ? `${quote.changePct >= 0 ? '+' : ''}${quote.changePct.toFixed(2)}%`
      : '—';
    changeNode.textContent = `${change}  ${pct}`;

    const lastNode = document.querySelector('#detail-last');
    lastNode.className = `detail-last ${movement}`;

    const values = {
      '#meta-open': formatNumber(quote.open),
      '#meta-prev': formatNumber(quote.prevClose),
      '#meta-high': formatNumber(quote.high),
      '#meta-low': formatNumber(quote.low),
      '#meta-volume': formatCompact(quote.volume),
      '#meta-amount': formatCompact(quote.amount),
      '#meta-pe': formatNumber(quote.pe),
      '#meta-pb': formatNumber(quote.pb),
    };

    for (const [selector, text] of Object.entries(values)) {
      document.querySelector(selector).textContent = text;
    }
  }

  function setStatus(text, state = 'ok') {
    const node = document.querySelector('#market-status');
    node.textContent = text;
    node.dataset.state = state;
  }

  function setError(message = '') {
    const banner = document.querySelector('#error-banner');
    if (!message) {
      banner.hidden = true;
      return;
    }
    banner.firstChild.textContent = `${message} `;
    banner.hidden = false;
  }

  window.StockPulseUI = Object.freeze({
    formatNumber,
    renderWatchlist,
    renderDetail,
    setStatus,
    setError,
  });
})();
