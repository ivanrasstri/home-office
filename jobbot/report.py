"""Формирование отчёта о найденных вакансиях (Markdown) и сохранение откликов."""

from __future__ import annotations

import re
from datetime import datetime, timezone
from pathlib import Path

from .config import APPLICATIONS_DIR, REPORTS_DIR
from .models import Job


def _slug(text: str, maxlen: int = 50) -> str:
    text = re.sub(r"[^\w\-]+", "-", text.lower(), flags=re.UNICODE).strip("-")
    return text[:maxlen] or "job"


def build_report(new_jobs: list[Job], total_found: int) -> str:
    """Markdown-отчёт: топ-вакансии с баллом, причинами и ссылкой."""
    today = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        f"# Подборка вакансий — {today}",
        "",
        f"Всего просмотрено: **{total_found}**. Новых подходящих: **{len(new_jobs)}**.",
        "",
        "> **Как откликнуться:** скопируй `ID` нужной вакансии и запусти workflow",
        "> **Actions → Apply to job → Run workflow**, вставив ID в поле `job_ids`",
        "> (можно несколько через запятую). Бот точечно подготовит письмо и",
        "> адаптированное резюме в папке `applications/`.",
        "",
    ]
    if not new_jobs:
        lines.append("_Новых подходящих вакансий с прошлого запуска не найдено._")
        return "\n".join(lines)

    for i, job in enumerate(new_jobs, 1):
        lines.append(f"## {i}. {job.title} — {job.company or '—'}  ·  {job.score}/100")
        meta = [job.source]
        if job.location:
            meta.append(job.location)
        if job.salary:
            meta.append(job.salary)
        lines.append(f"_{' · '.join(meta)}_")
        lines.append("")
        lines.append(f"- 🆔 `{job.id}`  ← вставь в Apply to job, чтобы откликнуться")
        if job.url:
            lines.append(f"- 🔗 {job.url}")
        if job.score_reasons:
            lines.append(f"- Почему подходит: {'; '.join(job.score_reasons)}")
        if job.description:
            snippet = job.description[:300]
            lines.append(f"- {snippet}{'…' if len(job.description) > 300 else ''}")
        lines.append("")
    return "\n".join(lines)


def save_report(content: str) -> Path:
    REPORTS_DIR.mkdir(parents=True, exist_ok=True)
    stamp = datetime.now(timezone.utc).strftime("%Y-%m-%d")
    path = REPORTS_DIR / f"{stamp}.md"
    path.write_text(content, encoding="utf-8")
    # Дублируем в latest.md для удобной ссылки.
    (REPORTS_DIR / "latest.md").write_text(content, encoding="utf-8")
    return path


def save_application(job: Job, cover_letter: str | None, resume: str | None) -> Path | None:
    """Сохранить отклик (письмо + адаптированное резюме) для одной вакансии."""
    if not cover_letter and not resume:
        return None
    APPLICATIONS_DIR.mkdir(parents=True, exist_ok=True)
    name = f"{_slug(job.company)}-{_slug(job.title)}-{job.id}.md"
    path = APPLICATIONS_DIR / name
    parts = [f"# Отклик: {job.title} — {job.company}", "", f"Ссылка: {job.url}", ""]
    if cover_letter:
        parts += ["## Сопроводительное письмо", "", cover_letter, ""]
    if resume:
        parts += ["## Адаптированное резюме", "", resume, ""]
    path.write_text("\n".join(parts), encoding="utf-8")
    return path
