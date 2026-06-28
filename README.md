# home-office — бот для поиска работы

Персональный бот, который ищет вакансии под твой профиль (продюсер креативной
студии / Senior Producer / Project Manager) и оценивает их. Работает в два этапа
с твоим подтверждением: сначала делает **подборку**, а отклик (сопроводительное
письмо + адаптированное резюме) готовит **только по тем вакансиям, которые ты сам
выбрал**. Запускается в **GitHub Actions** (свой сервер не нужен).

## Как это работает (две фазы)

**Фаза 1 — Подборка (по расписанию, без Claude):**
1. **Собирает вакансии**: HeadHunter (api.hh.ru), RemoteOK, We Work Remotely (RSS),
   Telegram (публичные каналы), LinkedIn (best-effort).
2. **Оценивает** каждую баллом 0–100 (ключевые слова, локация, формат).
3. **Отсеивает** уже виденные (дедуп `data/seen.json`) и слабые по баллу.
4. **Формирует отчёт** `reports/latest.md` со списком вакансий — у каждой есть `ID`.
5. Полные данные подборки кладёт в `data/shortlist.json` (для фазы 2).

**Фаза 2 — Отклик (вручную, когда ты согласился):**
1. Берёшь `ID` нужной вакансии из `reports/latest.md`.
2. Запускаешь **Actions → Apply to job → Run workflow**, вставляешь ID
   (можно несколько через запятую).
3. Бот точечно через Claude готовит письмо + адаптированное резюме →
   `applications/` (нужен `ANTHROPIC_API_KEY`).

Так Claude вызывается только по вакансиям, на которые ты реально откликаешься.

## Быстрый старт (локально)

```bash
pip install -r requirements.txt

# Фаза 1 — подборка (Claude не нужен):
python -m jobbot collect
# смотри reports/latest.md, выбери ID

# Фаза 2 — отклик по выбранным вакансиям (нужен ключ):
cp .env.example .env && set -a && . ./.env && set +a   # впиши ANTHROPIC_API_KEY
python -m jobbot apply --ids ID1,ID2
```

## Настройка под себя

- **`config/profile.yaml`** — главный файл. Роль, поисковые запросы, ключевые
  слова для скоринга, стоп-слова, локация, параметры hh. Держи его актуальным.
- **`config/sources.yaml`** — какие источники включены; список Telegram-каналов и
  RSS-лент We Work Remotely. Подставь свои каналы.
- **`resume/resume.md`** — твоё базовое резюме. На его основе Claude делает
  адаптированные версии. **Заполни реальными данными** — бот не выдумывает факты.

## Запуск в GitHub Actions

Два workflow:
- **Job Search Bot** (`job-search.yml`) — фаза 1, подборка. По будням в 06:00 UTC
  (~11:00 Ташкент) и вручную. Claude не нужен.
- **Apply to job** (`apply.yml`) — фаза 2, отклик. Только вручную: **Run workflow**,
  поле `job_ids` — ID из подборки через запятую.

Настройка:
1. Положи `ANTHROPIC_API_KEY` в **Settings → Secrets and variables → Actions → Secrets**
   (нужен только для фазы 2).
2. (Необязательно) переопредели `JOBBOT_MODEL`, `JOBBOT_MIN_SCORE` в **Variables**.
3. Расписание (`on: schedule`) активируется только на ветке по умолчанию (`main`).
   Пока работаешь в ветке `claude/job-search-bot-pt041v` — запускай оба workflow
   вручную (выбрав эту ветку) либо смёрджи в `main`.

Результаты бот коммитит обратно: подборку — `reports/latest.md` и `data/shortlist.json`,
отклики — папка `applications/`.

## Telegram-бот «Олег Михайлович» 🤝

Бот: **[@oleg_mihalych_bot](https://t.me/oleg_mihalych_bot)**

Самый удобный способ «клик и согласие»: бот (персона — **Олег Михайлович**, твой
личный кадровик «на твоей стороне») присылает подборку карточками с кнопкой
**✍️ Откликнуться** — жмёшь, и он точечно через Claude готовит письмо +
адаптированное резюме и присылает их прямо в чат.

Команды: `/search` — собрать свежую подборку, `/help` — помощь. Плюс авто-подборка
по будням (`JOBBOT_AUTO_SEARCH`).

Интерактивные кнопки требуют постоянно работающего процесса (long polling),
поэтому бот запускается как воркер (например, на Railway), а не в GitHub Actions.

### Запуск локально
```bash
pip install -r requirements.txt
export TELEGRAM_BOT_TOKEN=...   # токен от @BotFather
export ANTHROPIC_API_KEY=...    # для откликов
python -m jobbot.telegram_bot
# напиши боту /start, затем /search
```

### Деплой на Railway
1. Создай бота у **@BotFather**, получи `TELEGRAM_BOT_TOKEN`.
2. На Railway: **New Project → Deploy from GitHub repo** (этот репозиторий).
   Railway сам поставит зависимости из `requirements.txt` и запустит процесс
   `worker` из `Procfile` (`python -m jobbot.telegram_bot`).
3. **Variables:** `TELEGRAM_BOT_TOKEN`, `ANTHROPIC_API_KEY`, и (рекомендуется)
   `TELEGRAM_CHAT_ID` — твой chat_id (бот покажет его в ответ на `/start`), чтобы
   ботом не мог пользоваться кто-то ещё.
4. **Volume:** добавь Volume и смонтируй, например, в `/data`, затем поставь
   переменную `JOBBOT_DATA_DIR=/data` — так дедуп и подборка переживут перезапуски.
5. (Необязательно) `JOBBOT_AUTO_SEARCH=true`, `JOBBOT_DAILY_HOUR_UTC=6`.

> Заметка: профиль/резюме/источники (`config/*.yaml`, `resume/resume.md`) бот
> читает из репозитория. Поменял — сделай commit, Railway передеплоит.

## Структура

```
config/profile.yaml      # профиль соискателя (роль, ключевые слова, локация)
config/sources.yaml      # включённые источники
resume/resume.md         # базовое резюме
jobbot/                  # код бота
  sources/               # сборщики по источникам (hh, remoteok, wwr, telegram, linkedin)
  scoring.py             # балл соответствия
  ai.py                  # Claude: письма + адаптация резюме (фаза 2)
  pipeline.py            # оркестрация: gather_new / apply_one (общие для CLI и TG)
  __main__.py            # CLI: `collect` и `apply --ids`
  telegram_bot.py        # интерактивный Telegram-бот (кнопка «Откликнуться»)
Procfile                 # запуск воркера на Railway
data/seen.json           # дедуп (генерируется)
data/shortlist.json      # полные данные подборки для отклика по ID (генерируется)
reports/                 # отчёты подборки (генерируются)
applications/            # отклики по выбранным вакансиям (генерируются)
```

## Удалённая разработка (Claude Code on the web)

Репозиторий настроен для работы через **Claude Code on the web** — кодить можно
прямо в облаке, без локального окружения.

**SessionStart-хук** (`.claude/hooks/session-start.sh`) — при старте удалённой
сессии автоматически ставит зависимости из `requirements.txt` и прописывает
`PYTHONPATH`, чтобы сразу работали `python -m jobbot collect` / `apply`.
Зарегистрирован в `.claude/settings.json`. Локально (вне веб-сессии) хук ничего
не делает — проверяет `CLAUDE_CODE_REMOTE`.

**MCP** (`.mcp.json`) — подключает внешние инструменты к Claude.
Сейчас включён `fetch` (через `uvx mcp-server-fetch`): даёт Claude возможность
открывать веб-страницы — удобно при отладке сборщиков в `jobbot/sources/`.
Project-scoped сервер требует подтверждения при первом запуске сессии.

📖 Подробный мануал «что и зачем настроено» — в [`docs/REMOTE-DEV.md`](docs/REMOTE-DEV.md).

Добавить ещё серверы — допиши их в `.mcp.json` (формат и опции:
https://code.claude.com/docs/en/mcp). Пример удалённого HTTP-сервера с OAuth
(подтверждение через команду `/mcp`, секреты в файле не хранятся):

```json
{
  "mcpServers": {
    "fetch": { "command": "uvx", "args": ["mcp-server-fetch"] },
    "github": { "type": "http", "url": "https://api.githubcopilot.com/mcp/" }
  }
}
```

## Замечания по источникам

- **LinkedIn / Indeed** не дают надёжного доступа без логина/официального API и
  активно блокируют запросы с серверных IP. LinkedIn включён как best-effort;
  Indeed не реализован осознанно (Cloudflare-защита делает его нестабильным).
  Самые надёжные источники здесь — **HeadHunter**, **RemoteOK**, **We Work Remotely**
  и **Telegram**.
