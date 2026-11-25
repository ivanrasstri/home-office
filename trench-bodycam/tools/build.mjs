// Сборка: src/main.js -> dist/game.js (один файл, без модулей — запускается откуда угодно)
import * as esbuild from 'esbuild';
import fs from 'node:fs';
// манифест приватной папки (арты книги правил, музыка): игра узнаёт, что есть, без лишних 404
if (fs.existsSync('assets-private')) {
  const mus = fs.existsSync('assets-private/music') ? fs.readdirSync('assets-private/music').filter((f) => /\.(mp3|ogg|m4a|wav)$/i.test(f)) : [];
  fs.writeFileSync('assets-private/manifest.json', JSON.stringify({ art: fs.existsSync('assets-private/art/catalog.json'), music: mus.length ? 'music/' + mus[0] : null }));
}
const watch = process.argv.includes('--watch');
const opts = { entryPoints: ['src/main.js'], bundle: true, format: 'iife', minify: !watch, sourcemap: watch, target: ['es2020'], outfile: 'dist/game.js', logLevel: 'info', legalComments: 'none' };
if (watch) { const ctx = await esbuild.context(opts); await ctx.watch(); } else await esbuild.build(opts);
