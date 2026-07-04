"""Локальный запуск: python -m pitchdeck_server (порт из $PORT, по умолчанию 8000)."""

import os

import uvicorn

if __name__ == "__main__":
    uvicorn.run("pitchdeck_server.app:app", host="0.0.0.0", port=int(os.environ.get("PORT", 8000)))
