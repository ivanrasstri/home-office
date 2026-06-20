"""We Work Remotely — RSS-ленты категорий (только удалёнка, на английском).

RSS разбираем стандартной библиотекой (xml.etree), без сторонних зависимостей.
"""

from __future__ import annotations

import logging
import xml.etree.ElementTree as ET
from typing import Any

from ..models import Job
from .base import clean, get, session

log = logging.getLogger("jobbot.sources.weworkremotely")


def _parse_feed(xml_text: str) -> list[dict[str, str]]:
    """Вернуть список item'ов RSS как словари {title, link, description, pubDate}."""
    items: list[dict[str, str]] = []
    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError as e:
        log.warning("wwr: не удалось разобрать XML: %s", e)
        return items
    for item in root.iter("item"):
        items.append(
            {
                "title": (item.findtext("title") or "").strip(),
                "link": (item.findtext("link") or "").strip(),
                "description": item.findtext("description") or "",
                "pubDate": (item.findtext("pubDate") or "").strip(),
            }
        )
    return items


def fetch(profile: dict[str, Any], cfg: dict[str, Any]) -> list[Job]:
    s = session()
    feeds = cfg.get("feeds", []) or []
    kw = profile.get("keywords", {}) or {}
    terms = [w.lower() for w in (kw.get("strong", []) or [])]
    terms += [q.lower() for q in (profile.get("queries", []) or [])]

    jobs: dict[str, Job] = {}
    for feed_url in feeds:
        r = get(s, feed_url)
        if r is None:
            continue
        for entry in _parse_feed(r.text):
            title = entry["title"]  # обычно "Company: Position"
            company, position = "", title
            if ":" in title:
                company, position = (p.strip() for p in title.split(":", 1))
            desc = clean(entry["description"])
            blob = f"{title} {desc}".lower()
            if terms and not any(t in blob for t in terms):
                continue
            job = Job(
                source="weworkremotely",
                title=position,
                company=company,
                url=entry["link"],
                description=desc[:800],
                location="Remote",
                posted=entry["pubDate"],
            )
            jobs[job.id] = job

    log.info("wwr: собрано %d релевантных вакансий", len(jobs))
    return list(jobs.values())
