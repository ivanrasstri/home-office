// Собирает однофайловую версию для публикации (three.js с CDN, game.js внутри).
// node build-artifact.js  ->  dist/artifact.html
const fs = require('fs');
const path = require('path');
const dir = __dirname;
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
const game = fs.readFileSync(path.join(dir, 'game.js'), 'utf8');
const title = html.match(/<title>[\s\S]*?<\/title>/)[0];
const links = (html.match(/<link [^>]*>/g) || []).join('\n');
const style = html.match(/<style>[\s\S]*?<\/style>/)[0];
let body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
body = body
  .replace('<script src="vendor/three.min.js"></script>', '<script src="https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.min.js"></script>')
  .replace('<script src="game.js"></script>', () => '<script>\n' + game + '\n</script>');
fs.mkdirSync(path.join(dir, 'dist'), { recursive: true });
fs.writeFileSync(path.join(dir, 'dist', 'artifact.html'), [title, links, style, body].join('\n'));
console.log('dist/artifact.html', fs.statSync(path.join(dir, 'dist', 'artifact.html')).size, 'bytes');
