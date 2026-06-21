"""Скоринг вакансий под профиль соискателя.

Без LLM — быстрый детерминированный балл 0..100 на основе ключевых слов,
локации и формата работы. Используется, чтобы отобрать топ-вакансии,
для которых уже стоит звать Claude (генерация письма / адаптация резюме).
"""

from __future__ import annotations

from typing import Any

from .models import Job


def _contains_any(text: str, words: list[str]) -> list[str]:
    text = text.lower()
    return [w for w in words if w.lower() in text]


def score_job(job: Job, profile: dict[str, Any]) -> Job:
    """Проставить job.score (0..100) и job.score_reasons."""
    keywords = profile.get("keywords", {}) or {}
    strong = keywords.get("strong", []) or []
    nice = keywords.get("nice", []) or []
    exclude = profile.get("exclude", []) or []
    loc = profile.get("location", {}) or {}

    title = (job.title or "").lower()
    body = job.haystack()

    reasons: list[str] = []
    score = 0

    # Стоп-слова в названии — сразу выбраковка.
    bad = _contains_any(title, exclude)
    if bad:
        job.score = 0
        job.score_reasons = [f"стоп-слово в названии: {', '.join(bad)}"]
        return job

    # Сильные ключевые слова: в названии весят больше, чем в описании.
    strong_in_title = _contains_any(title, strong)
    strong_in_body = [w for w in _contains_any(body, strong) if w.lower() not in title]
    score += min(len(strong_in_title) * 20, 50)
    score += min(len(strong_in_body) * 6, 18)
    if strong_in_title:
        reasons.append(f"совпадение в названии: {', '.join(strong_in_title)}")
    if strong_in_body:
        reasons.append(f"совпадение в описании: {', '.join(strong_in_body)}")

    # Дополнительные ключевые слова.
    nice_hits = _contains_any(body, nice)
    score += min(len(nice_hits) * 4, 20)
    if nice_hits:
        reasons.append(f"доп. сигналы: {', '.join(nice_hits[:6])}")

    # Локация / удалёнка.
    city = str(loc.get("city", "")).lower()
    country = str(loc.get("country", "")).lower()
    remote_ok = bool(loc.get("remote_ok"))
    loc_text = f"{job.location} {body}".lower()
    if city and city in loc_text:
        score += 12
        reasons.append(f"локация: {loc.get('city')}")
    elif country and country in loc_text:
        score += 8
        reasons.append(f"страна: {loc.get('country')}")
    if remote_ok and any(w in loc_text for w in ("remote", "удал", "удалён", "anywhere")):
        score += 8
        reasons.append("удалёнка")

    job.score = max(0, min(score, 100))
    job.score_reasons = reasons
    return job


def score_all(jobs: list[Job], profile: dict[str, Any]) -> list[Job]:
    return [score_job(j, profile) for j in jobs]
