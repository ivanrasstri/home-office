"""Загрузка конфигов (profile.yaml, sources.yaml) и переменных окружения."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import yaml

# Корень проекта = на уровень выше пакета jobbot/.
ROOT = Path(__file__).resolve().parent.parent
CONFIG_DIR = ROOT / "config"
RESUME_PATH = ROOT / "resume" / "resume.md"

# Каталог состояния (seen.json, shortlist.json и т.п.). На Railway можно
# примонтировать Volume и указать JOBBOT_DATA_DIR=/data, чтобы данные не терялись
# между перезапусками контейнера.
DATA_DIR = Path(os.environ.get("JOBBOT_DATA_DIR") or (ROOT / "data"))
REPORTS_DIR = ROOT / "reports"
APPLICATIONS_DIR = ROOT / "applications"


def _load_yaml(path: Path) -> dict[str, Any]:
    if not path.exists():
        raise FileNotFoundError(f"Не найден конфиг: {path}")
    with path.open(encoding="utf-8") as f:
        return yaml.safe_load(f) or {}


def load_profile() -> dict[str, Any]:
    return _load_yaml(CONFIG_DIR / "profile.yaml")


def load_sources() -> dict[str, Any]:
    return _load_yaml(CONFIG_DIR / "sources.yaml")


def load_resume() -> str:
    if not RESUME_PATH.exists():
        return ""
    return RESUME_PATH.read_text(encoding="utf-8")


def env(name: str, default: str = "") -> str:
    return os.environ.get(name, default)


def settings() -> dict[str, Any]:
    """Параметры запуска из переменных окружения (с дефолтами)."""
    return {
        "anthropic_api_key": env("ANTHROPIC_API_KEY"),
        "model": env("JOBBOT_MODEL", "claude-opus-4-8"),
        "top_n": int(env("JOBBOT_TOP_N", "5")),
        "min_score": int(env("JOBBOT_MIN_SCORE", "25")),
    }
