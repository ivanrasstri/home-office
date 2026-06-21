"""LinkedIn — гостевой поиск вакансий без логина (best-effort).

Используем публичный эндпоинт jobs-guest, который отдаёт HTML-список карточек.
ВАЖНО: LinkedIn активно ограничивает запросы с IP дата-центров (а GitHub Actions
именно такой), поэтому источник часто будет возвращать пусто или 429. Это ОК —
он сделан «мягким»: при любой ошибке просто возвращает [], не ломая остальной сбор.
Для надёжного LinkedIn нужен залогиненный доступ / официальный партнёрский API.
"""

from __future__ import annotations

import logging
from typing import Any

from bs4 import BeautifulSoup

from ..models import Job
from .base import clean, get, session

log = logging.getLogger("jobbot.sources.linkedin")
GUEST = "https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search"


def _fetch_query(s, query: str, location: str) -> list[Job]:
    params = {"keywords": query, "location": location, "start": 0}
    r = get(s, GUEST, params=params)
    if r is None:
        return []
    soup = BeautifulSoup(r.text, "html.parser")
    jobs: list[Job] = []
    for card in soup.select("li"):
        title_el = card.select_one(".base-search-card__title")
        company_el = card.select_one(".base-search-card__subtitle")
        link_el = card.select_one("a.base-card__full-link") or card.select_one("a")
        loc_el = card.select_one(".job-search-card__location")
        if not title_el or not link_el:
            continue
        jobs.append(
            Job(
                source="linkedin",
                title=clean(title_el.get_text()),
                company=clean(company_el.get_text()) if company_el else "",
                url=(link_el.get("href") or "").split("?")[0],
                location=clean(loc_el.get_text()) if loc_el else location,
            )
        )
    return jobs


def fetch(profile: dict[str, Any], cfg: dict[str, Any]) -> list[Job]:
    s = session()
    location = cfg.get("location", "") or profile.get("location", {}).get("country", "")
    queries = profile.get("queries", []) or []

    jobs: dict[str, Job] = {}
    for query in queries:
        try:
            for job in _fetch_query(s, query, location):
                if job.url:
                    jobs[job.id] = job
        except Exception as e:  # best-effort: не даём LinkedIn уронить запуск
            log.warning("linkedin: запрос %r не удался: %s", query, e)

    if not jobs:
        log.info("linkedin: ничего не собрано (вероятно, rate-limit — это ожидаемо)")
    else:
        log.info("linkedin: собрано %d вакансий", len(jobs))
    return list(jobs.values())
