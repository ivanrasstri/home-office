"""Источники вакансий. Каждый источник — функция fetch(profile, cfg) -> list[Job]."""

from __future__ import annotations

from typing import Any, Callable

from ..models import Job
from . import headhunter, remoteok, weworkremotely, telegram, linkedin

# Реестр: имя источника -> функция сбора.
REGISTRY: dict[str, Callable[[dict[str, Any], dict[str, Any]], list[Job]]] = {
    "headhunter": headhunter.fetch,
    "remoteok": remoteok.fetch,
    "weworkremotely": weworkremotely.fetch,
    "telegram": telegram.fetch,
    "linkedin": linkedin.fetch,
}
