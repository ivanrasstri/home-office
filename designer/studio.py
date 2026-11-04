"""Студия: бриф → стиль из каталога → готовый HTML через Claude.

Пайплайн:
  1. pick_style — если стиль не задан, Claude выбирает его из каталога под бриф
     (без ключа — простой поиск по словам).
  2. make — Claude получает полный DESIGN.md выбранного стиля + спецификацию
     формата (лендинг, веб-презентация, резюме, баннер, письмо…) и собирает
     один самодостаточный HTML-файл.
  3. polish (по желанию) — второй проход: арт-директор разбирает черновик по
     чек-листу DESIGN.md и возвращает исправленную версию.
"""

from __future__ import annotations

import json
import logging
import os
import re
from dataclasses import dataclass

from . import catalog
from .catalog import Style

log = logging.getLogger("designer.studio")

DEFAULT_MODEL = "claude-opus-5-5"
# Модели, у которых есть серверный фолбэк при отказе (refusal) — включаем его.
_FALLBACK_MODELS = {"claude-opus-5-5", "claude-opus-5", "claude-fable-5-1", "claude-sonnet-5-5"}
_FALLBACK_BETA = "server-side-fallback-2026-07-01"


# --------------------------------------------------------------------------- #
# Форматы
# --------------------------------------------------------------------------- #
@dataclass(frozen=True)
class Kind:
    key: str
    title: str
    spec: str


KINDS: dict[str, Kind] = {
    k.key: k
    for k in [
        Kind(
            "landing",
            "Лендинг",
            "A complete marketing landing page: sticky nav, hero with a strong headline "
            "and primary CTA, 4–7 content sections (value props, features/process, "
            "social proof or numbers, pricing or offer if relevant, FAQ if relevant), "
            "final CTA band, footer. Fully responsive (mobile ≤ 480px, tablet, desktop).",
        ),
        Kind(
            "deck",
            "Веб-презентация",
            "A web slide deck in ONE html file: 8–14 slides, each exactly 16:9 "
            "(1920×1080 design canvas scaled to fit the viewport with CSS transform, "
            "letterboxed). Navigation: ←/→, Space, PageUp/PageDown, click; a slim "
            "progress bar and slide counter; 'F' toggles fullscreen. Include "
            "@media print with @page { size: 1920px 1080px; margin: 0 } so every slide "
            "prints to its own PDF page. Slide types to vary: title, agenda, big "
            "statement, numbers/KPIs, 2–3 column content, process/timeline, "
            "quote, team/cases, closing CTA with contacts. One idea per slide, large "
            "type, generous whitespace.",
        ),
        Kind(
            "onepager",
            "One-pager",
            "A one-page brief / sales one-pager: A4 portrait layout on screen that "
            "prints cleanly to a single A4 page (@page size A4, margins handled), "
            "with headline, short intro, 3–5 key blocks, numbers, and contact block.",
        ),
        Kind(
            "resume",
            "Резюме",
            "A designer-grade CV/resume page: name and role header, short summary, "
            "experience timeline with achievements, skills, tools, education, "
            "contacts. Screen-friendly AND print-friendly (@page A4, 1–2 pages, no "
            "dark backgrounds in print — switch to light print palette via @media "
            "print). Use ONLY facts given in the brief/resume, never invent.",
        ),
        Kind(
            "post",
            "Пост/баннер",
            "A set of 3 social media visuals rendered as HTML artboards stacked "
            "vertically with labels: 1080×1080 (square post), 1080×1350 (portrait "
            "post), 1080×1920 (story). Each artboard is a fixed-size element; "
            "big typography, one message, brand accent; no external images.",
        ),
        Kind(
            "email",
            "Email-рассылка",
            "An HTML email newsletter: table-based 600px layout with inline styles "
            "only (email-client safe), no JS, no external CSS, web-safe font stacks "
            "with the style's font as first choice, bulletproof buttons, preheader "
            "text, footer with unsubscribe placeholder.",
        ),
        Kind(
            "ui",
            "Экран интерфейса",
            "A high-fidelity product UI screen (dashboard / app view) as described in "
            "the brief: app chrome (sidebar or top bar), realistic sample data, "
            "tables/cards/charts drawn with inline SVG, states (hover, active, "
            "selected). Desktop-first at 1440px, gracefully reflows on mobile.",
        ),
    ]
}

KIND_ALIASES = {
    "лендинг": "landing", "сайт": "landing", "landing": "landing", "page": "landing",
    "презентация": "deck", "презентацию": "deck", "питч": "deck", "питчдек": "deck",
    "слайды": "deck", "deck": "deck", "slides": "deck",
    "ванпейджер": "onepager", "onepager": "onepager", "one-pager": "onepager",
    "резюме": "resume", "cv": "resume", "resume": "resume",
    "пост": "post", "баннер": "post", "сторис": "post", "post": "post", "banner": "post",
    "письмо": "email", "рассылка": "email", "рассылку": "email", "email": "email",
    "интерфейс": "ui", "дашборд": "ui", "экран": "ui", "ui": "ui", "dashboard": "ui",
}


def guess_kind(text: str, default: str = "landing") -> str:
    low = text.lower()
    for word, key in KIND_ALIASES.items():
        if re.search(rf"(?<![a-zа-яё]){re.escape(word)}", low):
            return key
    return default


# --------------------------------------------------------------------------- #
# Промпты
# --------------------------------------------------------------------------- #
SYSTEM = """You are a world-class art director and front-end designer. You turn a brief \
into a finished, production-quality, single-file HTML design that looks like it was \
shipped by a top studio — not a template, not a wireframe.

You are given a DESIGN.md: a design system analysed from a real product's website. \
Treat it as the law for visual language: use its exact color tokens and their roles, \
its type scale (sizes, weights, line-heights, letter-spacing), spacing rhythm, radii, \
elevation, component recipes and Do's & Don'ts. Reproduce the *feel* precisely.

Hard rules:
- Output ONE complete HTML document (<!doctype html> … </html>) and nothing else. \
All CSS inline in <style>; JS only if the format needs it, inline. No build step.
- Define the DESIGN.md tokens as CSS custom properties on :root and use them everywhere.
- Fonts: proprietary fonts are not available. Pick the closest match from Google Fonts \
(load via <link>) and keep the DESIGN.md fallback stack.
- No external images. Build visuals with CSS (gradients, shapes, grids), inline SVG \
(icons, illustrations, charts, product-UI mockups). Make them rich and intentional.
- This is the CLIENT's brand, not the reference brand: never use the reference \
company's name, logo, wordmark, product names or slogans. Borrow the design language only.
- Content comes from the brief. Write sharp, specific, human copy in the brief's \
language (Russian brief → Russian copy). If facts are missing, write plausible but \
clearly generic copy; never invent personal facts for a resume.
- Accessibility: semantic HTML, WCAG AA contrast, visible focus states, \
prefers-reduced-motion respected. Subtle, purposeful motion only.
- Responsive with no horizontal scroll at 360px unless the format is fixed-size.
- Do not fall back on house-style habits the DESIGN.md does not prescribe: cream or \
off-white backgrounds, serif display with italic accent words, terracotta/amber accents, \
numbered "01/02/03" section labels, monospace eyebrow labels, pill-shaped buttons, \
purple-on-dark gradients. Use any of these only when the DESIGN.md itself calls for it.
"""

PICK_SYSTEM = (
    "You are an art director choosing visual design languages for a brief. From the "
    "catalog, pick the {n} best-fitting styles for the brief's audience, tone and "
    "industry, best first, and make them clearly different from each other (e.g. one "
    "dark, one light, one bold). Reply with JSON only: "
    "[{{\"slug\": \"...\", \"why\": \"one short sentence in Russian\"}}, ...]"
)

POLISH_SYSTEM = SYSTEM + """
You are now doing the art-director review pass on a draft. Silently audit it against \
the DESIGN.md (tokens, type scale, spacing, components, Do's & Don'ts), the format spec \
and the hard rules; check hierarchy, rhythm, alignment, contrast, copy quality, \
responsiveness and broken markup. Then return the improved, complete HTML document \
only — no commentary.
"""


# --------------------------------------------------------------------------- #
# Клиент
# --------------------------------------------------------------------------- #
class Designer:
    def __init__(self, api_key: str | None = None, model: str | None = None) -> None:
        self.api_key = api_key if api_key is not None else os.environ.get("ANTHROPIC_API_KEY", "")
        self.model = (
            model
            or os.environ.get("DESIGNER_MODEL")
            or os.environ.get("JOBBOT_MODEL")
            or DEFAULT_MODEL
        )
        # Глубина размышлений при генерации; у Opus 5.5 по умолчанию medium — для дизайна мало.
        self.effort = os.environ.get("DESIGNER_EFFORT", "high")
        self._client = None
        if self.api_key:
            import anthropic

            self._client = anthropic.Anthropic(api_key=self.api_key)

    @property
    def enabled(self) -> bool:
        return self._client is not None

    def _ask(self, system: str, user: str, max_tokens: int, effort: str = "") -> str:
        if not self._client:
            raise RuntimeError("Нужен ANTHROPIC_API_KEY, чтобы дизайнер мог работать.")
        kwargs: dict = {
            "model": self.model,
            "max_tokens": max_tokens,
            "thinking": {"type": "adaptive"},
            "system": system,
            "messages": [{"role": "user", "content": user}],
        }
        if effort:
            kwargs["output_config"] = {"effort": effort}
        api = self._client.messages
        if self.model in _FALLBACK_MODELS:
            # Если классификатор безопасности ложно сработает на бриф, запрос сам
            # переедет на подходящую модель, а не вернёт пустой ответ.
            api = self._client.beta.messages
            kwargs.update(betas=[_FALLBACK_BETA], fallbacks="default")
        # Стрим: большие HTML-ответы иначе упираются в таймаут HTTP-запроса.
        with api.stream(**kwargs) as stream:
            msg = stream.get_final_message()
        if msg.stop_reason == "refusal":
            raise RuntimeError("Модель отказалась выполнять этот бриф — переформулируй его.")
        if msg.stop_reason == "max_tokens":
            log.warning("Ответ упёрся в max_tokens — HTML может быть обрезан.")
        return "".join(b.text for b in msg.content if getattr(b, "type", "") == "text")

    # -- 1. выбор стиля ------------------------------------------------------ #
    def suggest_styles(self, brief: str, n: int = 3) -> list[tuple[Style, str]]:
        """Топ-n стилей под бриф с объяснением (Claude; без ключа — поиск по словам)."""
        styles = catalog.load()
        if not self.enabled:
            found = catalog.search(brief, limit=n) or [catalog.get("linear") or styles[0]]
            return [(s, "подобрал по ключевым словам") for s in found]
        listing = "\n".join(s.short() for s in styles)
        raw = self._ask(
            PICK_SYSTEM.format(n=n), f"Catalog:\n{listing}\n\nBrief:\n{brief}", 4000, effort="low"
        )
        m = re.search(r"\[.*\]", raw, re.S)
        try:
            items = json.loads(m.group(0)) if m else []
        except json.JSONDecodeError:
            items = []
        out: list[tuple[Style, str]] = []
        for it in items if isinstance(items, list) else []:
            s = catalog.get(str(it.get("slug", ""))) if isinstance(it, dict) else None
            if s and all(s.slug != o.slug for o, _ in out):
                out.append((s, str(it.get("why", "")).strip()))
        if not out:
            out = [(s, "подобрал по ключевым словам") for s in (catalog.search(brief, n) or styles[:1])]
        return out[:n]

    def pick_style(self, brief: str) -> tuple[Style, str]:
        return self.suggest_styles(brief, n=1)[0]

    # -- 2. генерация -------------------------------------------------------- #
    def make(
        self,
        brief: str,
        kind: str,
        style: Style,
        extra: str = "",
        polish: bool = False,
        references: str = "",
    ) -> str:
        k = KINDS.get(kind) or KINDS["landing"]
        user = (
            f"# DESIGN.md — reference design system ({style.name})\n\n{style.design_md()}\n\n"
            f"# Format: {k.title} ({k.key})\n{k.spec}\n\n"
            f"# Brief\n{brief}\n"
        )
        if extra:
            user += f"\n# Source material (use these facts)\n{extra}\n"
        if references:
            user += (
                "\n# Component references from 21st.dev\n"
                "Use for structure and interaction ideas only. Port what helps into vanilla "
                "HTML/CSS/JS and restyle it completely with the DESIGN.md tokens: do not carry "
                "over their colors, fonts, copy or Tailwind classes.\n\n"
                f"{references}\n"
            )
        user += "\nReturn the complete HTML document now."
        html = extract_html(self._ask(SYSTEM, user, 64000, effort=self.effort))
        if polish:
            draft = (
                f"# DESIGN.md ({style.name})\n\n{style.design_md()}\n\n"
                f"# Format: {k.title}\n{k.spec}\n\n# Brief\n{brief}\n\n"
                f"# Draft to review and improve\n```html\n{html}\n```"
            )
            html = extract_html(self._ask(POLISH_SYSTEM, draft, 64000, effort=self.effort)) or html
        return html


def extract_html(text: str) -> str:
    """Достать HTML из ответа (с ```html-обёрткой или без)."""
    m = re.search(r"```(?:html)?\s*(<!doctype.*?</html>)\s*```", text, re.S | re.I)
    if m:
        return m.group(1).strip()
    m = re.search(r"<!doctype.*</html>", text, re.S | re.I)
    if m:
        return m.group(0).strip()
    m = re.search(r"<html.*</html>", text, re.S | re.I)
    return ("<!doctype html>\n" + m.group(0)).strip() if m else text.strip()


def slugify(text: str, limit: int = 40) -> str:
    s = re.sub(r"[^a-zA-Z0-9а-яА-ЯёЁ]+", "-", text.lower()).strip("-")
    return (s[:limit].rstrip("-")) or "design"
