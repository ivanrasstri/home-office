@echo off
rem Запуск игры локально: нужен Node.js или Python 3
cd /d "%~dp0"
start "" http://localhost:8080/
where node >nul 2>nul && (node tools\serve.mjs 8080) || (python -m http.server 8080)
