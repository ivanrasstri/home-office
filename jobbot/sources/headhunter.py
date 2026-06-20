"""HeadHunter (hh.ru) — официальный публичный REST API api.hh.ru.

Документация: https://api.hh.ru/openapi/redoc  (ключ не требуется для поиска).
"""

from __future__ import annotations

import logging
from typing import Any

from ..models import Job
from .base import clean, get, session

log = logging.getLogger("jobbot.sources.headhunter")
API = "https://api.hh.ru/vacancies"


def _salary(item: dict[str, Any]) -> str:
    s = item.get("salary")
    if not s:
        return ""
    lo, hi, cur = s.get("from"), s.get("to"), s.get("currency", "")
    parts = []
    if lo:
        parts.append(f"от {lo}")
    if hi:
        parts.append(f"до {hi}")
    return f"{' '.join(parts)} {cur}".strip()


def fetch(profile: dict[str, Any], cfg: dict[str, Any]) -> list[Job]:
    s = session()
    hh_cfg = profile.get("headhunter", {}) or {}
    area = hh_cfg.get("area")
    per_page = int(hh_cfg.get("per_page", 50))
    queries = profile.get("queries", []) or []

    jobs: dict[str, Job] = {}
    for query in queries:
        params: dict[str, Any] = {"text": query, "per_page": per_page, "page": 0}
        if area:
            params["area"] = area
        r = get(s, API, params=params)
        if r is None:
            continue
        try:
            data = r.json()
        except ValueError:
            log.warning("hh: невалидный JSON для запроса %r", query)
            continue

        for item in data.get("items", []):
            snippet = item.get("snippet", {}) or {}
            desc = " ".join(
                filter(None, [snippet.get("requirement"), snippet.get("responsibility")])
            )
            employer = (item.get("employer") or {}).get("name", "")
            area_name = (item.get("area") or {}).get("name", "")
            job = Job(
                source="headhunter",
                title=item.get("name", ""),
                company=employer,
                url=item.get("alternate_url", ""),
                description=clean(desc),
                location=area_name,
                salary=_salary(item),
                posted=item.get("published_at", ""),
            )
            jobs[job.id] = job  # дедуп между запросами

    log.info("hh: собрано %d вакансий", len(jobs))
    return list(jobs.values())
