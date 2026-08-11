import fs from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const requiredFiles = [
  'index.html',
  'css/style.css',
  'js/config.js',
  'js/quotes.js',
  'js/kline.js',
  'js/ui.js',
  'js/app.js',
  'js/vendor/echarts.min.js',
  'LICENSE',
  'README.md',
];

const failures = [];

for (const relativePath of requiredFiles) {
  if (!fs.existsSync(path.join(root, relativePath))) {
    failures.push(`missing required file: ${relativePath}`);
  }
}

const indexPath = path.join(root, 'index.html');
if (fs.existsSync(indexPath)) {
  const html = fs.readFileSync(indexPath, 'utf8');

  const requiredDomIds = [
    'search-input',
    'search-add',
    'market-status',
    'watchlist',
    'detail-panel',
    'kline-chart',
  ];

  for (const id of requiredDomIds) {
    if (!html.includes(`id="${id}"`)) {
      failures.push(`index.html is missing critical DOM id: ${id}`);
    }
  }

  const requiredScripts = [
    'js/vendor/echarts.min.js',
    'js/config.js',
    'js/quotes.js',
    'js/kline.js',
    'js/ui.js',
    'js/app.js',
  ];

  for (const script of requiredScripts) {
    if (!html.includes(`src="${script}"`)) {
      failures.push(`index.html is missing script reference: ${script}`);
    }
  }

  if (!html.includes('css/style.css')) {
    failures.push('index.html is missing the main stylesheet reference');
  }
}

if (failures.length > 0) {
  console.error('StockPulse smoke checks failed:');
  for (const failure of failures) console.error(`- ${failure}`);
  process.exit(1);
}

console.log(`StockPulse smoke checks passed (${requiredFiles.length} required files verified).`);
