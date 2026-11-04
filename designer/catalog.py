"""Каталог стилей: 80+ DESIGN.md из VoltAgent/awesome-design-md.

Каждый стиль — папка `designer/library/<slug>/DESIGN.md`: дизайн-система,
разобранная с реального сайта (палитра, типографика, сетка, компоненты,
do's & don'ts). Индекс `library/catalog.json` собирается командой
`python -m designer sync` (или `build_catalog()`), чтобы бот мог выбирать стиль,
не читая 3 МБ markdown целиком.
"""

from __future__ import annotations

import json
import re
from collections import Counter
from dataclasses import asdict, dataclass, field
from pathlib import Path

import yaml

LIB_DIR = Path(__file__).resolve().parent / "library"
CATALOG_PATH = LIB_DIR / "catalog.json"
UPSTREAM = "https://github.com/VoltAgent/awesome-design-md.git"

# Перевод категорий апстрима — для бота и галереи.
CATEGORY_RU = {
    "AI & LLM Platforms": "AI и LLM",
    "Developer Tools & IDEs": "Инструменты разработчика",
    "Backend, Database & DevOps": "Бэкенд и DevOps",
    "Productivity & SaaS": "Продуктивность и SaaS",
    "Design & Creative Tools": "Дизайн и креатив",
    "Fintech & Crypto": "Финтех и крипта",
    "E-commerce & Retail": "E-commerce и ритейл",
    "Media & Consumer Tech": "Медиа и потребительская техника",
    "Automotive": "Авто",
    "Retro Web · DESIGN.md Nostalgia": "Ретро-веб",
}

_HEX = re.compile(r"#[0-9a-fA-F]{6}\b")
_ITEM = re.compile(r"^- \[\*\*(.+?)\*\*\]\(https://getdesign\.md/([^/]+)/design-md\)\s*-\s*(.+)$")


@dataclass
class Style:
    slug: str
    name: str
    category: str
    tagline: str
    theme: str  # "dark" | "light"
    palette: list[str] = field(default_factory=list)
    fonts: list[str] = field(default_factory=list)
    canvas: str = "#FFFFFF"  # основной фон
    ink: str = "#111111"  # основной текст
    accent: str = "#3355FF"  # главный акцент (CTA)

    @property
    def path(self) -> Path:
        return LIB_DIR / self.slug / "DESIGN.md"

    def design_md(self) -> str:
        return self.path.read_text(encoding="utf-8")

    def short(self) -> str:
        return f"{self.slug} — {self.name} [{self.theme}]: {self.tagline}"


# --------------------------------------------------------------------------- #
# Сборка индекса
# --------------------------------------------------------------------------- #
def _frontmatter(text: str) -> dict:
    if not text.startswith("---"):
        return {}
    end = text.find("\n---", 3)
    if end == -1:
        return {}
    raw = text[3:end]
    try:
        data = yaml.safe_load(raw)
        return data if isinstance(data, dict) else {}
    except yaml.YAMLError:
        pass
    # Битый YAML (обычно неэкранированное «: » в description) — читаем
    # верхнеуровневые блоки по отдельности и берём те, что парсятся.
    out: dict = {}
    for block in re.split(r"\n(?=[A-Za-z][\w-]*:)", raw.strip("\n")):
        try:
            part = yaml.safe_load(block)
        except yaml.YAMLError:
            continue
        if isinstance(part, dict):
            out.update(part)
    return out


_GENERIC_FONTS = {
    "sans-serif", "serif", "monospace", "system-ui", "ui-sans-serif", "ui-serif",
    "ui-monospace", "-apple-system", "blinkmacsystemfont", "cursive", "inherit",
}


def _family(spec: str) -> str | None:
    """'"SoDoSans", Helvetica, sans-serif' → 'SoDoSans'."""
    first = spec.split(",")[0].strip().strip("'\"` ").strip()
    if not first or first.lower() in _GENERIC_FONTS or len(first) > 40:
        return None
    return first


def _fonts_from_prose(text: str) -> list[str]:
    """Шрифты из раздела «### Font Family» у DESIGN.md без frontmatter."""
    m = re.search(r"^#{2,4} [^\n]*(?:Font Famil|Typeface)[^\n]*\n(.*?)(?=^#{1,4} )", text, re.M | re.S | re.I)
    if not m:
        return []
    fonts: list[str] = []
    for line in m.group(1).splitlines():
        line = line.strip()
        b = re.match(r"^-?\s*\*\*([^*]+)\*\*(:?)\s*(.*)$", line)
        name = None
        if b and (b.group(2) or b.group(1).endswith(":")):  # «- **Display**: `Universal Sans`»
            tick = re.search(r"`([^`]+)`", b.group(3))
            name = _family(tick.group(1)) if tick else None
        elif b and re.match(r"^(\(|—|-|–|is\b)", b.group(3)):  # «- **Manuka** (Klim) …»
            name = _family(b.group(1))
        if name and name not in fonts:
            fonts.append(name)
    return fonts


def _rgb(hex_color: str) -> tuple[float, float, float]:
    h = hex_color.lstrip("#")
    return tuple(int(h[i : i + 2], 16) / 255 for i in (0, 2, 4))  # type: ignore[return-value]


def _luminance(hex_color: str) -> float:
    """Относительная яркость по WCAG (0 — чёрный, 1 — белый)."""

    def lin(c: float) -> float:
        return c / 12.92 if c <= 0.03928 else ((c + 0.055) / 1.055) ** 2.4

    r, g, b = (lin(c) for c in _rgb(hex_color))
    return 0.2126 * r + 0.7152 * g + 0.0722 * b


def contrast(a: str, b: str) -> float:
    la, lb = sorted((_luminance(a), _luminance(b)), reverse=True)
    return (la + 0.05) / (lb + 0.05)


def _saturation(hex_color: str) -> float:
    mx, mn = max(_rgb(hex_color)), min(_rgb(hex_color))
    return 0.0 if mx == 0 else (mx - mn) / mx


_CANVAS_KEYS = ("canvas", "background", "bg", "surface", "page")
_INK_KEYS = ("ink", "text", "foreground", "on-canvas", "on-background", "body")
_ACCENT_KEYS = ("primary", "accent", "brand", "cta")


def _key_color(colors: dict[str, str], keys: tuple[str, ...]) -> str | None:
    for want in keys:  # сначала точное имя, потом префикс (canvas-dark, primary-500…)
        if want in colors:
            return colors[want]
    for want in keys:
        for k, v in colors.items():
            if k.startswith(want):
                return v
    return None


def _analyze(text: str, tagline: str) -> dict:
    """Тема, опорные цвета (фон/текст/акцент), палитра и шрифты из DESIGN.md."""
    fm = _frontmatter(text)
    colors: dict[str, str] = {}
    for key, val in (fm.get("colors") or {}).items():
        if isinstance(val, str) and _HEX.fullmatch(val.strip()):
            colors[str(key).lower()] = val.strip().upper()
    if colors:
        found = list(dict.fromkeys(colors.values()))
    else:  # без frontmatter — самые частые HEX в тексте
        found = [c for c, _ in Counter(m.upper() for m in _HEX.findall(text)).most_common(12)]
    if not found:
        found = ["#FFFFFF", "#111111"]

    canvas = _key_color(colors, _CANVAS_KEYS)
    if canvas:
        theme = "dark" if _luminance(canvas) < 0.2 else "light"
    else:
        blob = (tagline + " " + text[:4000]).lower()
        dark = sum(blob.count(w) for w in ("dark", "black canvas", "near-black", "void", "night", "cinema-black"))
        light = sum(blob.count(w) for w in ("white canvas", "light", "cream", "paper", "white space"))
        theme = "dark" if dark > light else "light"
        by_lum = sorted(found, key=_luminance)
        canvas = by_lum[0] if theme == "dark" else by_lum[-1]
        # В топе частых цветов может не оказаться фона — подставляем нейтральный.
        if theme == "dark" and _luminance(canvas) > 0.05:
            canvas = "#0B0B0C"
        if theme == "light" and _luminance(canvas) < 0.7:
            canvas = "#FFFFFF"

    ink = _key_color(colors, _INK_KEYS)
    if not ink or contrast(ink, canvas) < 4.5:
        ink = max(found + ["#FFFFFF", "#111111"], key=lambda c: contrast(c, canvas))

    accent = _key_color(colors, _ACCENT_KEYS)
    # Акцент живёт на кнопках, поэтому контраста с фоном ему нужно немного.
    if not accent or _saturation(accent) < 0.2 or contrast(accent, canvas) < 1.2:
        vivid = [c for c in found if _saturation(c) >= 0.2 and contrast(c, canvas) >= 1.2]
        accent = vivid[0] if vivid else ink

    palette = list(dict.fromkeys([canvas, ink, accent] + found))[:8]

    fonts: list[str] = []
    for spec in (fm.get("typography") or {}).values():
        fam = _family(str(spec.get("fontFamily", ""))) if isinstance(spec, dict) else None
        if fam and fam not in fonts:
            fonts.append(fam)
    if not fonts:
        fonts = _fonts_from_prose(text)

    return {
        "theme": theme,
        "palette": palette,
        "fonts": fonts[:3],
        "canvas": canvas,
        "ink": ink,
        "accent": accent,
    }


def build_catalog() -> list[Style]:
    """Пересобрать catalog.json из UPSTREAM_README.md + папок library/."""
    readme = (LIB_DIR / "UPSTREAM_README.md").read_text(encoding="utf-8")
    meta: dict[str, tuple[str, str, str]] = {}
    category = ""
    for line in readme.splitlines():
        if line.startswith("### "):
            category = line[4:].strip()
            continue
        m = _ITEM.match(line.strip())
        if m and category in CATEGORY_RU:
            name, slug, desc = m.groups()
            meta[slug] = (name, CATEGORY_RU[category], desc.strip())

    # В апстрим-README есть не все папки — дописываем руками.
    meta.setdefault("slack", ("Slack", CATEGORY_RU["Productivity & SaaS"], ""))

    styles: list[Style] = []
    for d in sorted(p for p in LIB_DIR.iterdir() if (p / "DESIGN.md").exists()):
        slug = d.name
        name, cat, tagline = meta.get(slug, (slug.title(), "Другое", ""))
        text = (d / "DESIGN.md").read_text(encoding="utf-8")
        if not tagline:
            fm = _frontmatter(text)
            tagline = str(fm.get("description", ""))[:200]
        styles.append(Style(slug=slug, name=name, category=cat, tagline=tagline, **_analyze(text, tagline)))

    CATALOG_PATH.write_text(
        json.dumps([asdict(s) for s in styles], ensure_ascii=False, indent=1),
        encoding="utf-8",
    )
    return styles


# --------------------------------------------------------------------------- #
# Чтение и поиск
# --------------------------------------------------------------------------- #
_cache: list[Style] | None = None


def load() -> list[Style]:
    global _cache
    if _cache is None:
        if not CATALOG_PATH.exists():
            _cache = build_catalog()
        else:
            raw = json.loads(CATALOG_PATH.read_text(encoding="utf-8"))
            _cache = [Style(**r) for r in raw]
    return _cache


def _norm(s: str) -> str:
    return re.sub(r"[^a-z0-9а-яё]", "", s.lower())


def get(query: str) -> Style | None:
    """Стиль по slug/имени, нестрого: 'linear', 'Linear', 'linear.app', 'bmw m'."""
    q = _norm(query)
    if not q:
        return None
    styles = load()
    for s in styles:
        if q in (_norm(s.slug), _norm(s.name)):
            return s
    for s in styles:
        if _norm(s.slug).startswith(q) or _norm(s.name).startswith(q):
            return s
    return None


# Русские подсказки → английские слова из описаний стилей.
_RU_HINTS = {
    "тёмн": "dark", "темн": "dark", "чёрн": "black", "черн": "black",
    "светл": "white", "бел": "white", "минимал": "minimal", "премиум": "premium",
    "люкс": "luxury", "роскош": "luxury", "игрив": "playful", "дружелюб": "friendly",
    "редакц": "editorial", "журнал": "magazine", "кино": "cinematic",
    "градиент": "gradient", "фото": "photography", "ретро": "retro",
    "зелён": "green", "зелен": "green", "фиолет": "purple", "красн": "red",
    "синий": "blue", "син": "blue", "жёлт": "yellow", "желт": "yellow",
    "оранж": "orange", "строг": "enterprise", "банк": "banking", "финанс": "finance",
    "крипт": "crypto", "авто": "automotive", "машин": "automotive",
    "музык": "music", "студи": "creative", "креатив": "creative", "агентств": "agency",
    "тёпл": "warm", "тепл": "warm", "техн": "technical", "разработ": "developer",
}


def search(query: str, limit: int = 8) -> list[Style]:
    """Простой поиск по словам (для фолбэка без Claude и для /styles)."""
    q = query.lower()
    words = set(re.findall(r"[a-zа-яё0-9]+", q))
    for ru, en in _RU_HINTS.items():
        if ru in q:
            words.add(en)
    scored = []
    for s in load():
        hay = f"{s.slug} {s.name} {s.category} {s.tagline} {s.theme}".lower()
        score = sum(2 if w in s.slug or w in s.name.lower() else 1 for w in words if len(w) > 2 and w in hay)
        if score:
            scored.append((score, s))
    scored.sort(key=lambda t: -t[0])
    return [s for _, s in scored[:limit]]
