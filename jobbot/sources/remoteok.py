"""RemoteOK — публичный JSON API (только удалённые вакансии, на английском).

https://remoteok.com/api  — первый элемент массива это юридическая пометка,
её пропускаем. Фильтруем по ключевым словам из профиля на нашей стороне.
"""

from __future__ import annotations

import logging
from typing import Any

from ..models import Job
from .base import clean, get, session

log = logging.getLogger("jobbot.sources.remoteok")
API = "https://remoteok.com/api"


def fetch(profile: dict[str, Any], cfg: dict[str, Any]) -> list[Job]:
    s = session()
    r = get(s, API)
    if r is None:
        return []
    try:
        data = r.json()
    except ValueError:
        log.warning("remoteok: невалидный JSON")
        return []

    # Слова, по которым считаем вакансию релевантной (из strong + queries).
    kw = profile.get("keywords", {}) or {}
    terms = [w.lower() for w in (kw.get("strong", []) or [])]
    terms += [q.lower() for q in (profile.get("queries", []) or [])]

    jobs: list[Job] = []
    for item in data:
        if not isinstance(item, dict) or "position" not in item:
            continue  # пропускаем юр.пометку и мусор
        title = item.get("position", "")
        tags = " ".join(item.get("tags", []) or [])
        desc = clean(item.get("description", ""))
        blob = f"{title} {tags} {desc}".lower()
        if terms and not any(t in blob for t in terms):
            continue
        jobs.append(
            Job(
                source="remoteok",
                title=title,
                company=item.get("company", ""),
                url=item.get("url", ""),
                description=desc[:800],
                location=item.get("location", "Remote"),
                salary=item.get("salary", "") or "",
                posted=item.get("date", ""),
            )
        )

    log.info("remoteok: собрано %d релевантных вакансий", len(jobs))
    return jobs
