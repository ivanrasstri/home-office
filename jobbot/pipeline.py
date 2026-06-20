"""Оркестрация в две фазы (human-in-the-loop):

Фаза 1 — collect: собрать -> оценить -> отсеять виденные -> отчёт + shortlist.
         Никакого Claude: бот только предлагает подборку.
Фаза 2 — apply:   по выбранным ID готовит отклик (письмо + адаптация резюме).
         Запускается вручную, когда ты «соглашаешься» откликнуться.
"""

from __future__ import annotations

import logging

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


def run_collect() -> dict:
    """Фаза 1: подборка вакансий без генерации откликов."""
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

    # Отчёт с ID каждой вакансии (по нему ты потом запустишь отклик).
    content = report.build_report(fresh, total_found)
    report_path = report.save_report(content)

    # Сохраняем полные данные для фазы 2 и помечаем как виденные.
    store.save_shortlist(fresh)
    store.mark_seen(fresh, seen)
    store.save_seen(seen)

    return {
        "total_found": total_found,
        "relevant": len(relevant),
        "new": len(fresh),
        "report": str(report_path),
    }


def run_apply(ids: list[str]) -> dict:
    """Фаза 2: подготовить отклик для конкретных вакансий по ID."""
    profile = config.load_profile()
    resume = config.load_resume()
    cfg = config.settings()

    if not resume:
        log.warning("Пустое резюме (resume/resume.md) — отклик не сделать.")
        return {"requested": len(ids), "written": 0, "missing": ids}

    ai = AIClient(cfg["anthropic_api_key"], cfg["model"])
    if not ai.enabled:
        log.warning("ANTHROPIC_API_KEY не задан — отклик не сделать.")
        return {"requested": len(ids), "written": 0, "missing": ids}

    shortlist = store.load_shortlist()
    written: list[str] = []
    missing: list[str] = []
    paths: list[str] = []

    for jid in ids:
        data = shortlist.get(jid)
        if not data:
            log.warning("ID %s не найден в shortlist — пропуск.", jid)
            missing.append(jid)
            continue
        job = Job(
            source=data.get("source", ""),
            title=data.get("title", ""),
            company=data.get("company", ""),
            url=data.get("url", ""),
            description=data.get("description", ""),
            location=data.get("location", ""),
            salary=data.get("salary", ""),
        )
        letter = ai.cover_letter(job, profile, resume)
        tailored = ai.tailor_resume(job, profile, resume)
        path = report.save_application(job, letter, tailored)
        if path:
            written.append(jid)
            paths.append(str(path))
            log.info("Отклик готов: %s", path)
        else:
            missing.append(jid)

    return {
        "requested": len(ids),
        "written": len(written),
        "missing": missing,
        "paths": paths,
    }
