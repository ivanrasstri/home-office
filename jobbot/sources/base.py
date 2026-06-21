"""Общие утилиты для источников: HTTP-сессия и безопасные запросы."""

from __future__ import annotations

import logging
from typing import Any

import requests

log = logging.getLogger("jobbot.sources")

# Один User-Agent на все источники — некоторые сайты блокируют пустой UA.
USER_AGENT = (
    "Mozilla/5.0 (compatible; job-search-bot/0.1; "
    "+https://github.com/ivanrasstri/home-office)"
)

DEFAULT_TIMEOUT = 20


def session() -> requests.Session:
    s = requests.Session()
    s.headers.update({"User-Agent": USER_AGENT, "Accept-Language": "ru,en;q=0.9"})
    return s


def get(s: requests.Session, url: str, **kwargs: Any) -> requests.Response | None:
    """GET с таймаутом и логированием ошибок. Возвращает None при сбое."""
    kwargs.setdefault("timeout", DEFAULT_TIMEOUT)
    try:
        r = s.get(url, **kwargs)
        r.raise_for_status()
        return r
    except requests.RequestException as e:
        log.warning("GET %s не удался: %s", url, e)
        return None


def clean(text: str | None) -> str:
    """Убрать HTML-теги и лишние пробелы из строки."""
    if not text:
        return ""
    import re

    text = re.sub(r"<[^>]+>", " ", text)
    text = re.sub(r"\s+", " ", text)
    return text.strip()
