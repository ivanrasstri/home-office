"""Точка входа.

  python -m jobbot              # фаза 1: подборка вакансий (по cron). Без Claude.
  python -m jobbot collect      # то же самое явно.
  python -m jobbot apply --ids ID1,ID2   # фаза 2: отклик по выбранным вакансиям.

Фаза 2 запускается вручную (когда ты «соглашаешься» откликнуться) и только тогда
зовёт Claude для генерации письма и адаптации резюме под конкретную вакансию.
"""

from __future__ import annotations

import argparse
import logging
import os
import sys

from . import pipeline


def _gh_summary(lines: list[str]) -> None:
    path = os.environ.get("GITHUB_STEP_SUMMARY")
    if not path:
        return
    try:
        with open(path, "a", encoding="utf-8") as f:
            f.write("\n".join(lines) + "\n")
    except OSError:
        pass


def _cmd_collect() -> int:
    log = logging.getLogger("jobbot")
    s = pipeline.run_collect()
    log.info(
        "Подборка готова. Просмотрено=%d, подходящих=%d, новых=%d",
        s["total_found"], s["relevant"], s["new"],
    )
    _gh_summary([
        "## 🔎 Job Search Bot — подборка",
        "",
        f"- Просмотрено вакансий: **{s['total_found']}**",
        f"- Подходящих по баллу: **{s['relevant']}**",
        f"- Новых с прошлого запуска: **{s['new']}**",
        f"- Отчёт: `{s['report']}`",
        "",
        "Чтобы откликнуться — возьми ID из отчёта и запусти **Apply to job**.",
    ])
    return 0


def _cmd_apply(ids_raw: str) -> int:
    log = logging.getLogger("jobbot")
    ids = [x.strip() for x in ids_raw.replace("\n", ",").split(",") if x.strip()]
    if not ids:
        log.error("Не переданы ID вакансий (--ids).")
        return 2
    s = pipeline.run_apply(ids)
    log.info("Отклики: запрошено=%d, подготовлено=%d", s["requested"], s["written"])
    summary = [
        "## ✍️ Job Search Bot — отклики",
        "",
        f"- Запрошено: **{s['requested']}**",
        f"- Подготовлено: **{s['written']}**",
    ]
    if s.get("missing"):
        summary.append(f"- Не найдены/пропущены ID: `{', '.join(s['missing'])}`")
    for p in s.get("paths", []):
        summary.append(f"- 📄 `{p}`")
    _gh_summary(summary)
    return 0


def main() -> int:
    logging.basicConfig(
        level=logging.INFO,
        format="%(asctime)s %(levelname)s %(name)s: %(message)s",
    )
    log = logging.getLogger("jobbot")

    parser = argparse.ArgumentParser(prog="jobbot")
    sub = parser.add_subparsers(dest="cmd")
    sub.add_parser("collect", help="Собрать подборку вакансий (фаза 1).")
    p_apply = sub.add_parser("apply", help="Подготовить отклик по ID (фаза 2).")
    p_apply.add_argument("--ids", required=True, help="ID вакансий через запятую.")
    args = parser.parse_args()

    try:
        if args.cmd == "apply":
            return _cmd_apply(args.ids)
        return _cmd_collect()  # collect — поведение по умолчанию
    except Exception as e:
        log.exception("Запуск упал: %s", e)
        return 1


if __name__ == "__main__":
    sys.exit(main())
