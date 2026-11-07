# Олег Михайлович (Telegram-бот: вакансии, дизайнер, видео LTX-2.5) — образ для своего сервера.
# Запуск: deploy/install.sh (или docker compose up -d --build с готовым .env рядом).
FROM python:3.12-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PIP_NO_CACHE_DIR=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    JOBBOT_DATA_DIR=/data

WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Битый коммит не должен уронить работающего бота: при синтаксической ошибке или ошибке
# импорта сборка падает, а старый контейнер продолжает работать.
RUN python -m compileall -q jobbot designer figma_export pitchdeck_server \
 && python -c "import jobbot.telegram_bot, designer.ltx, designer.studio, designer.twentyfirst"

RUN useradd --create-home --uid 10001 bot \
 && mkdir -p /data /app/reports /app/applications \
 && chown -R bot:bot /data /app/reports /app/applications
USER bot

CMD ["python", "-m", "jobbot.telegram_bot"]
