"""Оркестрация: собрать -> оценить -> отсеять виденные -> отчёт -> отклики."""

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


def run() -> dict:
    """Главный цикл. Возвращает краткую сводку для логов/Action summary."""
    profile = config.load_profile()
    sources_cfg = config.load_sources()
    resume = config.load_resume()
    cfg = config.settings()

    # 1) Сбор
    jobs = collect(profile, sources_cfg)
    total_found = len(jobs)

    # 2) Скоринг
    jobs = score_all(jobs, profile)

    # 3) Отсев по минимальному баллу + по уже виденным
    seen = store.load_seen()
    relevant = [j for j in jobs if j.score >= cfg["min_score"]]
    fresh = store.filter_new(relevant, seen)
    fresh.sort(key=lambda j: j.score, reverse=True)

    # 4) Отчёт
    content = report.build_report(fresh, total_found)
    report_path = report.save_report(content)

    # 5) Отклики для топ-N (через Claude, если есть ключ)
    ai = AIClient(cfg["anthropic_api_key"], cfg["model"])
    apps_written = 0
    if ai.enabled and resume:
        for job in fresh[: cfg["top_n"]]:
            letter = ai.cover_letter(job, profile, resume)
            tailored = ai.tailor_resume(job, profile, resume)
            if report.save_application(job, letter, tailored):
                apps_written += 1
        log.info("Подготовлено откликов: %d", apps_written)

    # 6) Запомнить новые вакансии, чтобы не показывать их снова
    store.mark_seen(fresh, seen)
    store.save_seen(seen)

    return {
        "total_found": total_found,
        "relevant": len(relevant),
        "new": len(fresh),
        "applications": apps_written,
        "report": str(report_path),
    }
