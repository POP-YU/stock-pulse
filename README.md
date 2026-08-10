# StockPulse

Open-source, dependency-light stock market dashboard. Real-time quotes for **A-shares (CN), Hong Kong and US stocks** with daily candlestick charts — built with vanilla JavaScript, no build step, deploy to GitHub Pages in one click.

![data-source](https://img.shields.io/badge/data-Tencent%20Finance-0f766e)

## Features

- Real-time quotes: last price, change, change %, open/prev close/high/low, volume, turnover, P/E, P/B
- Daily candlestick + volume chart (forward-adjusted), ranges: 1M / 6M / 1Y
- Search & add any stock by full code (`sh600519`), plain digits (`600519`), HK code (`00700`), or US ticker (`AAPL`)
- Watchlist persisted in `localStorage`
- CN (red-up/green-down) and international (green-up/red-down) color schemes — toggle in the header
- Pure static site: no framework, no build, no backend, no API key
- Mobile responsive, respects `prefers-reduced-motion`

## Demo

Deploy to GitHub Pages:

1. Fork or push this repo to GitHub
2. Repo → **Settings → Pages → Deploy from branch → `master` → `/ (root)` → Save**
3. Open `https://<your-username>.github.io/stock-pulse/`

Or run locally:

```bash
# any static file server works
python3 -m http.server 8080
# then open http://localhost:8080
```

## Data Source

- Real-time quotes: Tencent Finance `qt.gtimg.cn` (public endpoint, no key required)
- Daily K-line (forward-adjusted): Tencent Finance `web.ifzq.gtimg.cn`
- ECharts 5 (bundled locally under `js/vendor/` — zero runtime CDN dependency)

Data is for **educational and reference purposes only** — quotes may be delayed; verify before making any decision. Trading involves risk.

## Project Structure

```
stock-pulse/
├── index.html          # single page shell
├── css/style.css       # light financial-grade theme
├── js/
│   ├── config.js       # endpoints & defaults
│   ├── quotes.js       # real-time quote fetch + GBK decode
│   ├── kline.js        # K-line fetch + ECharts render
│   ├── ui.js           # DOM rendering & formatters
│   ├── app.js          # state, events, data flow
│   └── vendor/         # echarts.min.js (bundled, no CDN)
├── LICENSE             # MIT
└── README.md
```

## Why StockPulse

- **No API key, no backend, no build, no CDN** — a fully self-contained static finance dashboard you can host anywhere (GitHub Pages, Cloudflare Pages, any CDN) and even run offline after data load
- **Cross-market in one grid** — A-shares, HK and US side by side with correct currency context
- **Educational** — clean, readable vanilla JS; a good starting point for learning stock-data fetching, GBK decoding, candlestick rendering with ECharts

## License

[MIT](LICENSE)
