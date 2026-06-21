"""Интеграция с Claude (Anthropic API): сопроводительные письма и адаптация резюме.

Используется официальный SDK anthropic. Если ключа нет — функции возвращают None,
и бот просто пропускает этап подготовки откликов (сбор/скоринг работают всегда).
"""

from __future__ import annotations

import logging
from typing import Any

from .models import Job

log = logging.getLogger("jobbot.ai")


class AIClient:
    """Тонкая обёртка над Anthropic для двух задач: письмо и адаптация резюме."""

    def __init__(self, api_key: str, model: str = "claude-opus-4-8") -> None:
        self.enabled = bool(api_key)
        self.model = model
        self._client = None
        if not self.enabled:
            log.info("ANTHROPIC_API_KEY не задан — генерация откликов отключена.")
            return
        try:
            import anthropic

            self._client = anthropic.Anthropic(api_key=api_key)
        except Exception as e:  # пакет не установлен / ошибка инициализации
            log.warning("Не удалось инициализировать Anthropic: %s", e)
            self.enabled = False

    def _complete(self, system: str, user: str, max_tokens: int = 2000) -> str | None:
        if not self.enabled or self._client is None:
            return None
        try:
            resp = self._client.messages.create(
                model=self.model,
                max_tokens=max_tokens,
                thinking={"type": "adaptive"},
                system=system,
                messages=[{"role": "user", "content": user}],
            )
        except Exception as e:
            log.warning("Запрос к Claude не удался: %s", e)
            return None
        # Берём первый текстовый блок (thinking-блоки пропускаем).
        for block in resp.content:
            if getattr(block, "type", None) == "text":
                return block.text
        return None

    def cover_letter(self, job: Job, profile: dict[str, Any], resume: str) -> str | None:
        """Сгенерировать сопроводительное письмо под конкретную вакансию."""
        system = (
            "Ты — карьерный ассистент. Пишешь короткие, конкретные и живые "
            "сопроводительные письма на русском языке от первого лица. Без воды, "
            "без канцелярита, без преувеличений. 150–220 слов. Опираешься на "
            "реальный опыт из резюме и на требования вакансии."
        )
        user = (
            f"Профиль соискателя:\n{profile.get('headline', '')}\n\n"
            f"Резюме:\n{resume}\n\n"
            f"Вакансия:\n"
            f"Должность: {job.title}\n"
            f"Компания: {job.company}\n"
            f"Локация: {job.location}\n"
            f"Описание/требования:\n{job.description}\n\n"
            "Напиши сопроводительное письмо под эту вакансию. Свяжи 2–3 пункта "
            "опыта соискателя с требованиями. В конце — вежливый призыв к разговору."
        )
        return self._complete(system, user, max_tokens=1200)

    def tailor_resume(self, job: Job, profile: dict[str, Any], resume: str) -> str | None:
        """Адаптировать базовое резюме под вакансию (акцент на нужные пункты)."""
        system = (
            "Ты — карьерный ассистент. Адаптируешь резюме под конкретную вакансию: "
            "переставляешь акценты, подбираешь формулировки и ключевые слова из "
            "описания вакансии, НО НЕ выдумываешь факты, которых нет в исходном "
            "резюме. Сохраняешь формат Markdown. Отвечаешь только резюме, без "
            "комментариев."
        )
        user = (
            f"Базовое резюме (Markdown):\n{resume}\n\n"
            f"Вакансия:\n"
            f"Должность: {job.title}\n"
            f"Компания: {job.company}\n"
            f"Описание/требования:\n{job.description}\n\n"
            "Верни адаптированную под эту вакансию версию резюме в Markdown. "
            "Усиль релевантные пункты и используй терминологию из вакансии, "
            "не добавляя несуществующего опыта."
        )
        return self._complete(system, user, max_tokens=2500)
