// Собирает src/ui.ts (+ pdf-lib, pptxgenjs) в один бандл и встраивает его
// прямо в HTML, потому что Figma не разрешает плагину грузить внешние <script src>.
const esbuild = require("esbuild");
const fs = require("fs");
const path = require("path");

const root = path.join(__dirname, "..");

const result = esbuild.buildSync({
  entryPoints: [path.join(root, "src/ui.ts")],
  bundle: true,
  write: false,
  format: "iife",
  target: "es2017",
});

const bundle = result.outputFiles[0].text;
const template = fs.readFileSync(path.join(root, "src/ui.template.html"), "utf8");
const html = template.replace("<!-- BUNDLE -->", `<script>\n${bundle}\n</script>`);

fs.writeFileSync(path.join(root, "ui.html"), html);
console.log("ui.html собран:", (html.length / 1024).toFixed(1), "KB");
