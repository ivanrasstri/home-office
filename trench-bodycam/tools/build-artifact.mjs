// Однофайловая страница для публикации: скрипт игры встроен, ассеты рядом в assets/
import fs from 'node:fs';
const html = fs.readFileSync('index.html', 'utf8');
const game = fs.readFileSync('dist/game.js', 'utf8').replace(/<\/script/gi, '<\\/script');
const title = html.match(/<title>[\s\S]*?<\/title>/)[0];
const links = (html.match(/<link [^>]*>/g) || []).join('\n');
const style = html.match(/<style>[\s\S]*?<\/style>/)[0];
let body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
body = body.replace('<script src="dist/game.js"></script>', () => '<script>window.TRENCH_B64 = true;</script>\n<script>\n' + game + '\n</script>');
fs.writeFileSync('dist/artifact.html', [title, links, style, body].join('\n'));
// карта файлов для публикации: webp как есть, .glb/.hdr — base64-текстом
const files = {};
fs.mkdirSync('dist/b64/models', { recursive: true }); fs.mkdirSync('dist/b64/hdri', { recursive: true });
for (const f of fs.readdirSync('assets/tex')) files[`assets/tex/${f}`] = `trench-bodycam/assets/tex/${f}`;
for (const dir of ['models', 'hdri']) for (const f of fs.readdirSync(`assets/${dir}`)) {
  if (f === 'ladder.glb') continue;
  const out = `dist/b64/${dir}/${f}.txt`;
  fs.writeFileSync(out, fs.readFileSync(`assets/${dir}/${f}`).toString('base64'));
  files[`assets/${dir}/${f}.txt`] = `trench-bodycam/${out}`;
}
fs.writeFileSync('dist/artifact-files.json', JSON.stringify(files));
console.log('dist/artifact.html', (fs.statSync('dist/artifact.html').size / 1e6).toFixed(2), 'MB;', Object.keys(files).length, 'файлов ассетов');
