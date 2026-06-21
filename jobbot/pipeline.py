"""Оркестрация в две фазы (human-in-the-loop):

Фаза 1 — collect: собрать -> оценить -> отсеять виденные -> отчёт + shortlist.
Фаза 2 — apply:   по выбранным ID готовит отклик (письмо + адаптация резюме).

Низкоуровневые функции (gather_new, apply_one) переиспользуются и CLI,
и Telegram-ботом.
"""

from __future__ import annotations

import logging
from typing import Any

from . import config, report, store
from .ai import AIClient
from .models import Job
from .scoring import score_all
from .sources import REGISTRY

log = logging.getLogger("jobbot.pipeline")


def collect(profile: dict, sources_cfg: dict) -> list[Job]:
    """Опросить все включённые источники. Сбой одного не ломает остальные."""
    all_jobs: dict[str, Job] = {}
    for name, fetch in REGISTRY.items():
        cfg = sources_cfg.get(name, {}) or {}
        if not cfg.get("enabled", False):
            continue
        try:
            jobs = fetch(profile, cfg)
        except Exception as e:  # источник не должен ронять весь запуск
            log.warning("Источник %s упал: %s", name, e)
            continue
        for job in jobs:
            all_jobs.setdefault(job.id, job)  # дедуп между источниками
    log.info("Всего собрано уникальных вакансий: %d", len(all_jobs))
    return list(all_jobs.values())


def gather_new() -> tuple[list[Job], int]:
    """Собрать, оценить, отсеять виденные. Вернуть (новые_вакансии, всего_просмотрено).

    Сохраняет shortlist и помечает виденные — общая логика для CLI и Telegram.
    """
    profile = config.load_profile()
    sources_cfg = config.load_sources()
    cfg = config.settings()

    jobs = collect(profile, sources_cfg)
    total_found = len(jobs)
    jobs = score_all(jobs, profile)

    seen = store.load_seen()
    relevant = [j for j in jobs if j.score >= cfg["min_score"]]
    fresh = store.filter_new(relevant, seen)
    fresh.sort(key=lambda j: j.score, reverse=True)

    store.save_shortlist(fresh)
    store.mark_seen(fresh, seen)
    store.save_seen(seen)
    return fresh, total_found


def run_collect() -> dict:
    """Фаза 1 (CLI): подборка + markdown-отчёт."""
    fresh, total_found = gather_new()
    content = report.build_report(fresh, total_found)
    report_path = report.save_report(content)
    return {"total_found": total_found, "new": len(fresh), "report": str(report_path)}


def _job_from_data(data: dict[str, Any]) -> Job:
    return Job(
        source=data.get("source", ""),
        title=data.get("title", ""),
        company=data.get("company", ""),
        url=data.get("url", ""),
        description=data.get("description", ""),
        location=data.get("location", ""),
        salary=data.get("salary", ""),
    )


def apply_context() -> tuple[dict, str, AIClient]:
    """Подготовить профиль, резюме и клиента Claude один раз (для серии откликов)."""
    profile = config.load_profile()
    resume = config.load_resume()
    cfg = config.settings()
    ai = AIClient(cfg["anthropic_api_key"], cfg["model"])
    return profile, resume, ai


def apply_one(job_id: str, ctx: tuple[dict, str, AIClient] | None = None) -> dict:
    """Подготовить отклик по одной вакансии (по ID из shortlist).

    Возвращает: {id, job, letter, resume, path, error}. error=None при успехе.
    """
    profile, resume, ai = ctx or apply_context()
    if not resume:
        return {"id": job_id, "error": "Пустое резюме (resume/resume.md)."}
    if not ai.enabled:
        return {"id": job_id, "error": "Не задан ANTHROPIC_API_KEY."}

    data = store.load_shortlist().get(job_id)
    if not data:
        return {"id": job_id, "error": f"ID {job_id} не найден в подборке."}

    job = _job_from_data(data)
    letter = ai.cover_letter(job, profile, resume)
    tailored = ai.tailor_resume(job, profile, resume)
    path = report.save_application(job, letter, tailored)
    return {
        "id": job_id,
        "job": job,
        "letter": letter,
        "resume": tailored,
        "path": str(path) if path else None,
        "error": None,
    }


def run_apply(ids: list[str]) -> dict:
    """Фаза 2 (CLI): подготовить отклики для списка ID."""
    ctx = apply_context()
    written: list[str] = []
    missing: list[str] = []
    paths: list[str] = []
    for jid in ids:
        res = apply_one(jid, ctx)
        if res.get("error") or not res.get("path"):
            missing.append(jid)
            if res.get("error"):
                log.warning("%s: %s", jid, res["error"])
            continue
        written.append(jid)
        paths.append(res["path"])
        log.info("Отклик готов: %s", res["path"])
    return {"requested": len(ids), "written": len(written), "missing": missing, "paths": paths}
