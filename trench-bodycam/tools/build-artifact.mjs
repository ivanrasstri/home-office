// Однофайловая страница для публикации: скрипт игры встроен, ассеты рядом в assets/
import fs from 'node:fs';
const html = fs.readFileSync('index.html', 'utf8');
const game = fs.readFileSync('dist/game.js', 'utf8').replace(/<\/script/gi, '<\\/script');
const title = html.match(/<title>[\s\S]*?<\/title>/)[0];
const links = (html.match(/<link [^>]*>/g) || []).join('\n');
const style = html.match(/<style>[\s\S]*?<\/style>/)[0];
let body = html.match(/<body>([\s\S]*?)<\/body>/)[1];
body = body.replace('<script src="dist/game.js"></script>', () => '<script>\n' + game + '\n</script>');
fs.writeFileSync('dist/artifact.html', [title, links, style, body].join('\n'));
const files = [];
for (const dir of ['assets/tex', 'assets/models', 'assets/hdri']) for (const f of fs.readdirSync(dir)) files.push(`${dir}/${f}`);
fs.writeFileSync('dist/artifact-files.json', JSON.stringify(files, null, 1));
console.log('dist/artifact.html', (fs.statSync('dist/artifact.html').size / 1e6).toFixed(2), 'MB;', files.length, 'файлов ассетов');
