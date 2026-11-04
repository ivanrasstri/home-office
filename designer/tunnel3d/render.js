// node render.js config.json out.png  — рендер кадра сцены тоннеля в headless Chromium
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
(async () => {
  const [cfgPath, outPath] = process.argv.slice(2);
  const cfgs = JSON.parse(fs.readFileSync(cfgPath, 'utf8'));
  const root = __dirname;
  const browser = await chromium.launch({ args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
  page.on('console', m => { if (m.type() === 'error') console.error('console:', m.text()); });
  page.on('pageerror', e => console.error('pageerror:', e.message));
  await page.route('http://tunnel.local/**', route => {
    const rel = decodeURIComponent(new URL(route.request().url()).pathname).replace(/^\//, '');
    const file = path.join(root, rel);
    const type = file.endsWith('.js') ? 'text/javascript' : file.endsWith('.json') ? 'application/json' : 'text/html';
    route.fulfill({ path: file, contentType: type });
  });
  await page.goto('http://tunnel.local/' + (process.env.SCENE || 'scene.html'));
  await page.waitForFunction(() => window.ready === true, null, { timeout: 60000 });
  const list = Array.isArray(cfgs) ? cfgs : [cfgs];
  for (let i = 0; i < list.length; i++) {
    const url = await page.evaluate(c => window.renderFrame(c), list[i]);
    const out = list.length > 1 ? outPath.replace(/(\.\w+)$/, `_${String(i).padStart(3, '0')}$1`) : outPath;
    fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
  }
  await browser.close();
})().catch(e => { console.error(e); process.exit(1); });
