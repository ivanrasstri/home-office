#!/bin/sh
# Запуск игры локально: нужен Node.js (или Python 3)
cd "$(dirname "$0")"
URL="http://localhost:8080/"
if command -v node >/dev/null 2>&1; then
  (sleep 1; (xdg-open "$URL" || open "$URL") >/dev/null 2>&1) &
  node tools/serve.mjs 8080
else
  (sleep 1; (xdg-open "$URL" || open "$URL") >/dev/null 2>&1) &
  python3 -m http.server 8080
fi
