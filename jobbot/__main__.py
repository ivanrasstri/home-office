"""Точка входа: python -m jobbot

Запускает полный цикл: сбор вакансий, скоринг, отчёт, подготовка откликов.
Пишет краткую сводку в stdout и (если доступно) в GitHub Actions summary.
"""

from __future__ import annotations

import logging
import os
import sys

from . import pipeline


def _write_github_summary(summary: dict) -> None:
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if not path:
        return
    lines = [
        "## 🔎 Job Search Bot",
        "",
        f"- Просмотрено вакансий: **{summary['total_found']}**",
        f"- Подходящих по баллу: **{summary['relevant']}**",
        f"- Новых с прошлого запуска: **{summary['new']}**",
        f"- Подготовлено откликов: **{summary['applications']}**",
        f"- Отчёт: `{summary['report']}`",
    ]
    try:
        with open(path, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
    except OSError:
        pass


def main() -> int:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    log = logging.getLogger("jobbot")

    try:
        summary = pipeline.run()
    except Exception as e:
        log.exception("Запуск упал: %s", e)
        return 1

    log.info(
        "Готово. Просмотрено=%d, подходящих=%d, новых=%d, откликов=%d",
        summary["total_found"],
        summary["relevant"],
        summary["new"],
        summary["applications"],
    )
    _write_github_summary(summary)
    return 0


if __name__ == "__main__":
    sys.exit(main())
