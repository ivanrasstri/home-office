"""Telegram — чтение публичных каналов через веб-превью t.me/s/<channel>.

Без Bot API и ключей: страница t.me/s/<channel> отдаёт последние посты в HTML.
Берём текст сообщений и фильтруем по ключевым словам. Ссылка ведёт на пост.
"""

from __future__ import annotations

import logging
from typing import Any

from bs4 import BeautifulSoup

from ..models import Job
from .base import clean, get, session

log = logging.getLogger("jobbot.sources.telegram")


def _fetch_channel(s, channel: str, terms: list[str]) -> list[Job]:
    url = f"https://t.me/s/{channel}"
    r = get(s, url)
    if r is None:
        return []
    soup = BeautifulSoup(r.text, "html.parser")
    jobs: list[Job] = []

    for wrap in soup.select(".tgme_widget_message_wrap"):
        text_el = wrap.select_one(".tgme_widget_message_text")
        if not text_el:
            continue
        text = clean(text_el.get_text(" ", strip=True))
        if not text:
            continue
        if terms and not any(t in text.lower() for t in terms):
            continue

        msg = wrap.select_one(".tgme_widget_message")
        post_url = msg.get("data-post") if msg else ""
        link = f"https://t.me/{post_url}" if post_url else url
        # Первая строка поста — как заголовок.
        first_line = text.split(".")[0][:120]
        jobs.append(
            Job(
                source="telegram",
                title=first_line or f"Пост из @{channel}",
                company=f"@{channel}",
                url=link,
                description=text[:1000],
                location="",
            )
        )
    return jobs


def fetch(profile: dict[str, Any], cfg: dict[str, Any]) -> list[Job]:
    s = session()
    channels = cfg.get("channels", []) or []
    kw = profile.get("keywords", {}) or {}
    terms = [w.lower() for w in (kw.get("strong", []) or [])]
    terms += [q.lower() for q in (profile.get("queries", []) or [])]

    jobs: dict[str, Job] = {}
    for ch in channels:
        for job in _fetch_channel(s, ch, terms):
            jobs[job.id] = job

    log.info("telegram: собрано %d релевантных постов", len(jobs))
    return list(jobs.values())
