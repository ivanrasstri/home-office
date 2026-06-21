"""Хранилище уже виденных вакансий (дедупликация между запусками).

Простой JSON-файл data/seen.json, который коммитится обратно в репозиторий
GitHub Actions. Этого достаточно для персонального бота и не требует БД.
"""

from __future__ import annotations

import json
from datetime import datetime, timezone
from pathlib import Path
from typing import Any

from .config import DATA_DIR
from .models import Job

SEEN_PATH = DATA_DIR / "seen.json"
SHORTLIST_PATH = DATA_DIR / "shortlist.json"

# Сколько вакансий держать в shortlist (полные данные для отклика по ID).
SHORTLIST_MAX = 300


def _now() -> str:
    return datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M:%SZ")


def load_seen() -> dict[str, Any]:
    if not SEEN_PATH.exists():
        return {}
    try:
        return json.loads(SEEN_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def save_seen(seen: dict[str, Any]) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    SEEN_PATH.write_text(
        json.dumps(seen, ensure_ascii=False, indent=2, sort_keys=True),
        encoding="utf-8",
    )


def filter_new(jobs: list[Job], seen: dict[str, Any]) -> list[Job]:
    """Вернуть только те вакансии, которых ещё нет в seen."""
    return [j for j in jobs if j.id not in seen]


def mark_seen(jobs: list[Job], seen: dict[str, Any]) -> None:
    """Записать вакансии в seen с минимумом метаданных."""
    ts = _now()
    for j in jobs:
        seen[j.id] = {
            "title": j.title,
            "company": j.company,
            "url": j.url,
            "source": j.source,
            "score": j.score,
            "first_seen": ts,
        }


def load_shortlist() -> dict[str, Any]:
    """Полные данные вакансий из подборки (id -> dict), для отклика по ID."""
    if not SHORTLIST_PATH.exists():
        return {}
    try:
        return json.loads(SHORTLIST_PATH.read_text(encoding="utf-8"))
    except (json.JSONDecodeError, OSError):
        return {}


def save_shortlist(jobs: list[Job]) -> None:
    """Добавить вакансии в shortlist (с полным описанием) и подрезать до лимита.

    Храним полные данные, чтобы фаза «отклик по ID» не зависела от повторного
    запроса к источнику. Новые записи идут в начало; старые вытесняются.
    """
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    existing = load_shortlist()
    ts = _now()
    # Собираем заново, чтобы новые оказались первыми и обновили старые записи.
    merged: dict[str, Any] = {}
    for j in jobs:
        d = j.to_dict()
        d["shortlisted_at"] = ts
        merged[j.id] = d
    for jid, data in existing.items():
        merged.setdefault(jid, data)
    # Подрезаем до SHORTLIST_MAX (сохраняем порядок: сначала свежие).
    trimmed = dict(list(merged.items())[:SHORTLIST_MAX])
    SHORTLIST_PATH.write_text(
        json.dumps(trimmed, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
