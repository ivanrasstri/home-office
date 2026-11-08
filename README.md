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
2. На Railway: **New Project → Deploy from GitHub repo** (этот репозиторий, нужная ветка).
   Railway соберёт образ по `Dockerfile` (Python 3.12, бот работает не от root) и запустит
   бота. В настройках сервиса включи перезапуск при падении (Restart policy → On failure).
3. **Variables:**
   - `TELEGRAM_BOT_TOKEN`;
   - `TELEGRAM_CHAT_ID` — твой chat_id, бот покажет его в ответ на `/start`, чтобы ботом не
     пользовался кто-то ещё;
   - `ANTHROPIC_API_KEY` — нужен для откликов и `/design`;
   - для `/video`: `LTXV_API_KEY` (платный LTX) или `HF_TOKEN` (бесплатное демо, до 5 с).
4. **Volume:** смонтируй в `/data`. Переменная `JOBBOT_DATA_DIR=/data` уже задана в образе,
   так что подписчики, дедуп и учёт трат переживают перезапуски.
5. Необязательно: `JOBBOT_AUTO_SEARCH=true`, `JOBBOT_DAILY_HOUR_UTC=6`.

Деплоить можно и из Claude: подключи коннектор Railway
(claude.ai/directory/connectors/railway). Тогда Claude сам создаёт сервис, задаёт переменные,
деплоит и смотрит логи. Токены лучше вписывать в Railway самому, не через чат.

> Заметка: профиль/резюме/источники (`config/*.yaml`, `resume/resume.md`) бот
> читает из репозитория. Поменял — сделай commit, Railway передеплоит.

### Свой сервер (VPS), 24/7

Одна команда на сервере. Подойдёт Ubuntu, Debian или другой Linux, хватит 1 ГБ RAM;
нужен root или sudo.

```bash
curl -fsSL https://raw.githubusercontent.com/ivanrasstri/home-office/claude/friendly-lovelace-74z514/deploy/install.sh | sudo bash -s -- --branch claude/friendly-lovelace-74z514
```

После слияния в `main` — та же команда с `main` в обоих местах. Без curl: `wget -qO-` вместо `curl -fsSL`.

Что делает скрипт:
- ставит git и Docker, если их нет;
- кладёт бота в `/opt/home-office`;
- спрашивает токены. Ввод скрыт, токены хранятся только на сервере, в `.env` с правами 600;
- собирает образ и запускает бота с автоперезапуском. Падения процесса и перезагрузки
  сервера ему не страшны.

Открытые порты не нужны: бот сам ходит в Telegram.

- **Автообновление.** Раз в 5 минут сервер проверяет ветку и пересобирает бота, если
  появился новый коммит. Если новая версия не собирается, например из-за синтаксической
  ошибки, работает прежняя, а битый коммит пропускается.
- **Данные** (подписчики, состояние, дедуп) лежат в томе Docker `home-office_bot-data`.
  Они переживают обновления и переустановку.
- **Граница доверия.** Автообновление меняет только код бота, а бот работает в контейнере
  без root и без доступа к серверу. Установщик и `docker-compose.yml` закреплены в
  `/usr/local/lib/home-office` и меняются только при повторном запуске установки.
- Профиль, резюме и источники бот читает из репозитория. Правь их коммитом — сервер
  подтянет сам. Ручные правки в `/opt/home-office` затрутся при обновлении.
- Если бот уже запущен где-то ещё (Railway, ноутбук), останови его там. Telegram не даёт
  двум копиям читать один токен; установщик предупредит о конфликте.

Управление:

```bash
home-office status      # что запущено, версия, ветка
home-office logs        # лог бота (Ctrl+C — выйти)
home-office config      # поменять токены, например добавить LTXV_API_KEY
home-office update      # обновиться сейчас, не дожидаясь 5 минут
home-office branch main # переключить ветку (в ней должен быть Dockerfile)
home-office stop        # остановить вместе с автообновлением; start — запустить
home-office uninstall   # убрать бота; данные и токены останутся
```

## Экспорт презентаций из Figma (PDF + PPTX)

Отдельный инструмент, не связанный с поиском работы: по ключу файла Figma
рендерит слайды (топ-уровневые фреймы на странице) и собирает из **одних и тех
же** картинок и PDF, и PPTX за один запуск — файлы гарантированно совпадают
между собой.

Локально:
```bash
export FIGMA_TOKEN=...   # https://www.figma.com/developers/api#access-tokens
python -m figma_export FILE_KEY --page "Slides" --out dist
# dist/FILE_KEY.pdf и dist/FILE_KEY.pptx
```

`FILE_KEY` — часть ссылки на файл: `figma.com/design/FILE_KEY/...` или
`figma.com/file/FILE_KEY/...`. Если `--page` не указан — берётся первая
страница файла.

В GitHub Actions: положи `FIGMA_TOKEN` в **Settings → Secrets and variables →
Actions → Secrets**, затем **Actions → Figma export (PDF + PPTX) → Run
workflow**, укажи `file_key` (и опционально `page`). Результат появится как
артефакт запуска (не коммитится в репозиторий).

**Вариант без токена и скрипта** — плагин Figma `figma-plugin/`: экспортирует
выделенные слайды прямо из интерфейса Figma (Plugins → Development → Import
plugin from manifest…). PDF — растровый рендер, а PPTX собирается из
настоящих элементов (текст, прямоугольники, эллипсы, линии), а не из
скриншотов слайдов целиком — картинкой становится только то, что нельзя
честно векторизовать (иконки, сложная графика, эффекты). Подробности и
сборка — `figma-plugin/README.md`.

Тот же плагин умеет и **публиковать презентацию в веб** — shareable-ссылка
на HTML-слайд-шоу и аналитика просмотров, без PowerPoint вообще (свой,
самостоятельно захостенный аналог веб-презентаций Hypermatic Pitchdeck).
За это отвечает сервис `pitchdeck_server/` — деплоится как второй Railway-
сервис в этом же проекте, см. `pitchdeck_server/README.md`.

## Дизайнер 🎨

Отдельный инструмент: по брифу собирает готовый HTML-макет (лендинг,
веб-презентацию, one-pager, резюме, пост/баннер, email-рассылку или экран
интерфейса) в стиле одной из **84 дизайн-систем**, разобранных с реальных сайтов
(Linear, Stripe, Apple, Spotify, Tesla…). Библиотека — `designer/library/`
([VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md), MIT):
у каждого стиля свой `DESIGN.md` с палитрой, типографикой, сеткой, компонентами
и правилами «можно/нельзя».

Как это работает:
1. Если стиль не назван, Claude предлагает три подходящих под бриф.
2. Claude получает полный `DESIGN.md` выбранного стиля и спецификацию формата и
   собирает один самодостаточный HTML. Бренд клиента берётся из брифа, у
   референса заимствуется только визуальный язык.
3. Для лендингов и экранов интерфейса дизайнер подтягивает референс компонента с
   **21st.dev** (если задан `API_KEY_21ST`): находит компонент под ключевую секцию
   и переносит его структуру, перекрашивая токенами стиля.
4. `--polish` — второй проход: арт-директор проверяет черновик по `DESIGN.md` и правит.

```bash
python -m designer gallery                       # dist/gallery.html — все стили с превью (без ключа)
python -m designer list "тёмный финтех"          # поиск по стилям
python -m designer show stripe                   # карточка стиля
python -m designer make "лендинг для студии моушн-дизайна" --style linear
python -m designer make "питчдек фестиваля" --kind deck --polish
python -m designer make "резюме" --kind resume   # факты берутся из resume/resume.md
python -m designer sync                          # подтянуть свежие DESIGN.md из апстрима
```

Где ещё работает:
- **Telegram** — `/design бриф`: бот предлагает три стиля кнопками и присылает HTML
  файлом. `/styles запрос` ищет по библиотеке. `/video` — ролик LTX-2.5, см. ниже.
- **GitHub Actions** — **Actions → Designer → Run workflow** (бриф, формат, стиль,
  polish), результат лежит в артефактах запуска.
- **Claude Code** — скилл `.claude/skills/designer`: «сделай лендинг в стиле Stripe»
  в сессии с этим репозиторием.

Переменные: `ANTHROPIC_API_KEY` (обязательно), `DESIGNER_MODEL` (по умолчанию
`claude-opus-5-5`), `DESIGNER_EFFORT` (по умолчанию `high`), `API_KEY_21ST`
(необязательно), `DESIGNER_21ST_RETRIEVALS` (сколько компонентов 21st брать на
дизайн, по умолчанию 1: на бесплатном тарифе их 2 в день).

### 21st.dev в Claude Code

В `.mcp.json` подключён MCP-сервер 21st.dev: поиск компонентов, тем и логотипов,
код компонентов. Ключ в репозиторий не кладётся: конфиг читает его из переменной
`API_KEY_21ST`.

- Локально: `export API_KEY_21ST=21st_sk_...` перед запуском `claude`. При первом
  запуске Claude Code спросит, доверять ли серверу из `.mcp.json`.
- В облачных сессиях Claude Code добавь `API_KEY_21ST` в переменные окружения
  (environment) на claude.ai.
- В GitHub Actions: секрет `API_KEY_21ST`.

В `.claude/settings.json` разрешены бесплатные инструменты только для чтения
(поиск, темы, логотипы, квота), а правка и удаление компонентов, тем, шаблонов и
профиля на 21st.dev запрещены. `get_component` спрашивает подтверждение, потому
что тратит дневную квоту.

## Видео: LTX-2.5 🎬

[LTX-2.5](https://ltx.io/model/ltx-2-5) от Lightricks генерирует видео сразу со звуком
из текста, из кадра (или пары кадров — первого и последнего) и из аудио. Подключено
через официальный LTX API (`designer/ltx.py`): задача ставится в очередь, клиент ждёт
готовности и сразу скачивает mp4, потому что ссылка на результат быстро протухает.

```bash
python -m designer video "Slow push-in through a neon tunnel, light strips streak past; low hum." --estimate
python -m designer video "The courier turns to camera and smiles; street noise." --image frame.png --res 720p
python -m designer video "..." --image A.png --last-frame B.png --duration 8 --model pro
python -m designer video "..." --audio track.mp3 --image cover.png      # клип под трек: до 20 с (fast 720p/1080p), иначе до 10 с
python -m designer video --job image-to-video/<id>                     # дозабрать готовое видео
python -m designer video --check                                       # проверить ключ, ничего не тратя
```

Если ролик сгенерировался, но не скачался (сеть, протухшая ссылка), id задачи есть в логе и
в тексте ошибки. Статус хранится 24 ч, видео забирается через `--job`, без повторной оплаты.

- Модели: `fast` — дешевле, на 720p/1080p при 24/25 fps до 20 с; `pro` — качественнее,
  6/8/10 с. Обе до 4K, пропорции 16:9, 9:16, 1:1, 3:2, 2:3.
- Цена за секунду: fast $0.09 (720p) / $0.13 (1080p) / $0.19 (1440p) / $0.30 (4K),
  pro $0.12 / $0.17 / $0.25 / $0.39. Ролик 6 с 1080p fast стоит $0.78. Оплата —
  предоплаченные кредиты на console.ltx.io. Бесплатного тарифа нет, попробовать можно
  в Playground консоли.
- `--estimate` показывает цену без запроса. `LTX_MAX_USD` — потолок цены одного ролика,
  по умолчанию $5. В боте есть ещё дневной лимит `LTX_DAILY_USD`, по умолчанию $20.

Где ещё работает:
- **Telegram** — `/video описание`. Чтобы оживить фото, пришли его с подписью
  `/video …` или ответь этой командой на фото. Настройки — словами в начале:
  `/video pro 9:16 8s dolly_in …`.
- **GitHub Actions** — **Actions → Video (LTX-2.5) → Run workflow**. Нужен секрет
  `LTXV_API_KEY`; mp4 лежит в артефактах запуска. Потолок цены можно задать переменной
  репозитория `LTX_MAX_USD`, по умолчанию $5. Кнопка запуска появляется, когда воркфлоу
  есть в ветке по умолчанию (`main`).
- **Claude Code** — скилл `.claude/skills/ltx-video`. Например, «оживи кадр 294,
  камера летит в тоннель». Скилл помнит правила промптов LTX и цены.
- **Документация LTX в Claude Code** — официальный MCP-сервер поиска по docs.ltx.io:

  ```bash
  claude mcp add --transport http ltx-docs https://docs.ltx.io/_mcp/server
  ```

Ключ: console.ltx.io → API Keys.
- Локально: `export LTXV_API_KEY=...`.
- GitHub: секрет `LTXV_API_KEY`.
- Railway: переменная `LTXV_API_KEY`.
- Облачные сессии Claude Code: секрет окружения для хоста `api.ltx.io`. Прокси сам
  подставит заголовок, а в `LTXV_API_KEY` достаточно любой заглушки.

**Бесплатно — открытые веса через официальное демо на Hugging Face.** Lightricks держат
LTX-2.5 в Space [`Lightricks/LTX-2.5`](https://huggingface.co/spaces/Lightricks/LTX-2.5)
на бесплатных видеокартах Hugging Face. Генератор умеет звать его сам:

```bash
python -m designer video "A paper boat drifts across a calm pond at sunrise; soft birdsong." --via space --duration 3
```

- Ограничения демо: 1–5 с (авто — до 15 с), кадр до 832x1472, звук всегда. Нет последнего
  кадра и аудио на входе.
- Квота дневная. Нужен токен Hugging Face: бесплатный аккаунт → Settings → Access Tokens,
  тип Read. Токен кладётся в переменную `HF_TOKEN` или в секрет облачного окружения для
  хоста `lightricks-ltx-2-5.hf.space`: заголовок `x-hf-authorization`, значение
  `Bearer <токен>`.
- С бесплатным аккаунтом выходит несколько коротких роликов в день, с HF PRO — в 8 раз больше.
- Кадр из `--image` уходит в публичный сервис, поэтому клиентские материалы туда — только
  с согласия.
- Без `--via` генератор сам выбирает: платный API, если есть `LTXV_API_KEY`, иначе демо.

**Веб-студия с паролем** (`studio/`) — страница в браузере для видео из текста или кадра.
Открывается с телефона или ноутбука. Считает Hugging Face (бесплатно, по `HF_TOKEN`) или
платный LTX API, поэтому серверу видеокарта не нужна: хватает Railway или любого маленького
VPS.
- Railway: сервис из этого репозитория, Dockerfile path `studio/Dockerfile`.
  - Переменные: `STUDIO_PASSWORD` (без него студия не запустится), `STUDIO_USER`,
    `HF_TOKEN`; по желанию `LTXV_API_KEY`.
  - Включи Serverless: без посетителей сервис засыпает, и простой ничего не стоит.
- Локально: `pip install -r studio/requirements.txt && STUDIO_PASSWORD=... python studio/app.py`.

**Аниматик из раскадровки.** `python -m designer animatic shots.yaml` собирает ролик из
кадров по шотам. Шоты описываются в YAML: кадры, длина, промпт, `engine: ai` или `local`,
формат — в начале `designer/animatic.py`.

```bash
python -m designer animatic shots.yaml                              # всё локально: наезды и переходы через ffmpeg
python -m designer animatic shots.yaml --engine ai --estimate       # сколько стоят ИИ-шоты
python -m designer animatic shots.yaml --engine ai --via api        # ИИ: переход от первого кадра к последнему
python -m designer animatic shots.yaml --engine ai --only burger    # перегенерировать один шот
```

- **Локально.** Медленный наезд и мягкие переходы между кадрами шота. Бесплатно, кадры
  никуда не уходят.
- **ИИ через платный API.** Каждая пара соседних кадров — клип от первого кадра к
  последнему, поэтому движение попадает точно в раскадровку.
- **ИИ через бесплатное демо.** Последнего кадра там нет: анимируется первый кадр по промпту.
- Текст, промокоды, QR и логотипы лучше оставлять `local`, чтобы они не поплыли.
- Готовые ИИ-клипы кэшируются, поэтому повторная сборка за них не платит.

Другие пути, если ни API, ни демо не подходят:
- fal.ai: `lightricks/ltx-2.5/...`, цены те же.
- Replicate: `lightricks/ltx-2.5-fast` — только fast, но дешевле.
- Свой GPU: открытые веса `Lightricks/LTX-2.5` на Hugging Face и шаблоны ComfyUI.
  Нужна NVIDIA от 32 ГБ VRAM. Лицензия бесплатна для компаний с выручкой до $10 млн в год.

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
figma_export/            # экспорт презентаций Figma в PDF + PPTX (не связано с ботом)
  client.py              # клиент Figma REST API (файл, рендер картинок)
  frames.py              # поиск и сортировка слайдов (фреймов) на странице
  build.py               # сборка PDF и PPTX из одних и тех же PNG
  __main__.py            # CLI: `python -m figma_export FILE_KEY`
figma-plugin/            # плагин Figma: экспорт PDF/PPTX + публикация в веб, см. его README
designer/                # дизайнер: бриф → HTML-макет в стиле одной из 84 дизайн-систем
  library/               # DESIGN.md всех стилей + catalog.json (индекс)
  catalog.py             # индекс стилей: тема, палитра, шрифты, поиск
  studio.py              # Claude: подбор стиля, генерация, polish-проход
  twentyfirst.py         # клиент MCP 21st.dev: референсы компонентов
  ltx.py                 # клиент LTX API: видео LTX-2.5 из текста, кадра или аудио
  gallery.py             # HTML-галерея всех стилей
  __main__.py            # CLI: list / show / suggest / make / gallery / sync / video
pitchdeck_server/        # веб-хостинг опубликованных презентаций (ссылка + аналитика)
  storage.py             # SQLite: презентации, просмотры, просмотры по слайдам
  render.py              # HTML-просмотрщик слайдов и дашборд аналитики
  app.py                 # FastAPI: /api/decks, /p/{id}, /p/{id}/analytics
Procfile                 # запуск воркера на Railway
Dockerfile               # образ бота для своего сервера
docker-compose.yml       # бот + том с данными, автоперезапуск
deploy/install.sh        # установка на сервер одной командой и команда home-office
studio/                  # веб-студия LTX-2.5 с паролем (Gradio): для Railway или маленького сервера
data/seen.json           # дедуп (генерируется)
data/shortlist.json      # полные данные подборки для отклика по ID (генерируется)
reports/                 # отчёты подборки (генерируются)
applications/            # отклики по выбранным вакансиям (генерируются)
```

## Замечания по источникам

- **LinkedIn / Indeed** не дают надёжного доступа без логина/официального API и
  активно блокируют запросы с серверных IP. LinkedIn включён как best-effort;
  Indeed не реализован осознанно (Cloudflare-защита делает его нестабильным).
  Самые надёжные источники здесь — **HeadHunter**, **RemoteOK**, **We Work Remotely**
  и **Telegram**.
