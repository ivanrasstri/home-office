// Сборка: src/main.js -> dist/game.js (один файл, без модулей — запускается откуда угодно)
import * as esbuild from 'esbuild';
const watch = process.argv.includes('--watch');
const opts = { entryPoints: ['src/main.js'], bundle: true, format: 'iife', minify: !watch, sourcemap: watch, target: ['es2020'], outfile: 'dist/game.js', logLevel: 'info', legalComments: 'none' };
if (watch) { const ctx = await esbuild.context(opts); await ctx.watch(); } else await esbuild.build(opts);
