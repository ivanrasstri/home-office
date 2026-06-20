"""Модель данных вакансии — общий формат для всех источников."""

from __future__ import annotations

import hashlib
from dataclasses import dataclass, field, asdict
from typing import Any


@dataclass
class Job:
    """Одна вакансия в едином формате, независимо от источника."""

    source: str            # откуда: headhunter / remoteok / telegram / ...
    title: str             # название должности
    company: str           # компания (может быть пустой, напр. в Telegram)
    url: str               # ссылка на вакансию
    description: str = ""  # текст/требования (может быть обрезан источником)
    location: str = ""     # локация, как её отдал источник
    salary: str = ""       # зарплата строкой, если есть
    posted: str = ""       # дата публикации строкой, если есть

    # Заполняется на этапе скоринга.
    score: int = 0
    score_reasons: list[str] = field(default_factory=list)

    @property
    def id(self) -> str:
        """Стабильный идентификатор для дедупликации.

        Берём ссылку (она уникальна у источника); если её нет — хэш от
        источника + названия + компании.
        """
        basis = self.url.strip() or f"{self.source}|{self.title}|{self.company}"
        return hashlib.sha1(basis.encode("utf-8")).hexdigest()[:16]

    def haystack(self) -> str:
        """Текст для скоринга по ключевым словам (в нижнем регистре)."""
        return " ".join([self.title, self.company, self.description]).lower()

    def to_dict(self) -> dict[str, Any]:
        d = asdict(self)
        d["id"] = self.id
        return d
