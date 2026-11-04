"""CLI дизайнера.

  python -m designer list [запрос] [--theme dark|light]   каталог стилей
  python -m designer show linear                          карточка стиля
  python -m designer suggest "бриф" [-n 3]                какие стили подходят
  python -m designer make "бриф" [--kind deck] [--style linear] [--polish]
  python -m designer gallery [--out dist/gallery.html]    HTML-галерея всех стилей
  python -m designer sync                                 обновить библиотеку из апстрима

Для suggest/make нужен ANTHROPIC_API_KEY. С API_KEY_21ST дизайнер подтягивает
референс компонента с 21st.dev (лендинги и экраны интерфейса).
"""

from __future__ import annotations

import argparse
import logging
import shutil
import subprocess
import sys
import tempfile
from datetime import datetime
from pathlib import Path

from . import catalog, gallery, studio, twentyfirst

ROOT = Path(__file__).resolve().parent.parent
RESUME = ROOT / "resume" / "resume.md"


def cmd_list(a: argparse.Namespace) -> int:
    styles = catalog.search(a.query, limit=100) if a.query else catalog.load()
    if a.theme:
        styles = [s for s in styles if s.theme == a.theme]
    for s in styles:
        print(f"{s.slug:16} {s.theme:5}  {s.name} — {s.tagline[:90]}")
    print(f"\n{len(styles)} стилей. Подробно: python -m designer show <slug>")
    return 0


def cmd_show(a: argparse.Namespace) -> int:
    s = catalog.get(a.style)
    if not s:
        print(f"Стиль «{a.style}» не найден. Список: python -m designer list", file=sys.stderr)
        return 1
    print(f"{s.name}  [{s.slug}]  · {s.category} · тема: {s.theme}")
    print(s.tagline)
    print(f"фон {s.canvas} · текст {s.ink} · акцент {s.accent}")
    print("палитра:", " ".join(s.palette))
    print("шрифты:", ", ".join(s.fonts) or "—")
    print("DESIGN.md:", s.path.relative_to(ROOT))
    return 0


def cmd_suggest(a: argparse.Namespace) -> int:
    d = studio.Designer()
    for s, why in d.suggest_styles(a.brief, n=a.n):
        print(f"{s.slug:16} {s.name} — {why}")
    return 0


def cmd_make(a: argparse.Namespace) -> int:
    d = studio.Designer(model=a.model)
    if not d.enabled:
        print("Нужен ANTHROPIC_API_KEY.", file=sys.stderr)
        return 2
    kind = a.kind or studio.guess_kind(a.brief)
    if a.style:
        style = catalog.get(a.style)
        if not style:
            print(f"Стиль «{a.style}» не найден. Список: python -m designer list", file=sys.stderr)
            return 1
        why = "задан вручную"
    else:
        style, why = d.pick_style(a.brief)
    print(f"Формат: {studio.KINDS[kind].title} · стиль: {style.name} ({why})", flush=True)

    extra = ""
    if a.source:
        extra = Path(a.source).read_text(encoding="utf-8")
    elif kind == "resume" and RESUME.exists():
        extra = RESUME.read_text(encoding="utf-8")

    refs, used = ("", []) if a.no_21st else twentyfirst.references_for(a.brief, kind)
    if used:
        print("Референс с 21st.dev:", "; ".join(used), flush=True)

    html = d.make(a.brief, kind, style, extra=extra, polish=a.polish, references=refs)
    out = Path(a.out)
    out.mkdir(parents=True, exist_ok=True)
    name = f"{datetime.now():%Y%m%d-%H%M}-{kind}-{style.slug}-{studio.slugify(a.brief, 30)}.html"
    path = out / name
    path.write_text(html, encoding="utf-8")
    print(f"Готово: {path}")
    return 0


def cmd_gallery(a: argparse.Namespace) -> int:
    out = Path(a.out)
    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(gallery.render(fragment=a.fragment), encoding="utf-8")
    print(f"Галерея: {out}")
    return 0


def cmd_sync(a: argparse.Namespace) -> int:
    """Подтянуть свежие DESIGN.md из VoltAgent/awesome-design-md и пересобрать индекс."""
    with tempfile.TemporaryDirectory() as tmp:
        subprocess.run(["git", "clone", "--depth", "1", catalog.UPSTREAM, tmp], check=True)
        src = Path(tmp) / "design-md"
        n = 0
        for d in sorted(p for p in src.iterdir() if (p / "DESIGN.md").exists()):
            dst = catalog.LIB_DIR / d.name
            dst.mkdir(parents=True, exist_ok=True)
            shutil.copy2(d / "DESIGN.md", dst / "DESIGN.md")
            n += 1
        shutil.copy2(Path(tmp) / "README.md", catalog.LIB_DIR / "UPSTREAM_README.md")
        shutil.copy2(Path(tmp) / "LICENSE", catalog.LIB_DIR / "LICENSE")
    styles = catalog.build_catalog()
    print(f"Обновлено {n} DESIGN.md, в индексе {len(styles)} стилей.")
    return 0


def main(argv: list[str] | None = None) -> int:
    logging.basicConfig(level=logging.INFO, format="%(levelname)s %(name)s: %(message)s")
    p = argparse.ArgumentParser(prog="python -m designer", description="Дизайнер на DESIGN.md + Claude")
    sub = p.add_subparsers(dest="cmd", required=True)

    s = sub.add_parser("list", help="каталог стилей")
    s.add_argument("query", nargs="?", default="")
    s.add_argument("--theme", choices=["dark", "light"])
    s.set_defaults(fn=cmd_list)

    s = sub.add_parser("show", help="карточка стиля")
    s.add_argument("style")
    s.set_defaults(fn=cmd_show)

    s = sub.add_parser("suggest", help="подобрать стили под бриф")
    s.add_argument("brief")
    s.add_argument("-n", type=int, default=3)
    s.set_defaults(fn=cmd_suggest)

    s = sub.add_parser("make", help="сделать дизайн по брифу")
    s.add_argument("brief")
    s.add_argument("--kind", choices=list(studio.KINDS))
    s.add_argument("--style", help="slug стиля; без него Claude подберёт сам")
    s.add_argument("--polish", action="store_true", help="второй проход арт-директора")
    s.add_argument("--source", help="файл с фактами (резюме, тезисы, цифры)")
    s.add_argument("--no-21st", action="store_true", help="не брать референсы с 21st.dev")
    s.add_argument("--model", help="модель Claude (по умолчанию DESIGNER_MODEL или claude-opus-5-5)")
    s.add_argument("--out", default="dist")
    s.set_defaults(fn=cmd_make)

    s = sub.add_parser("gallery", help="HTML-галерея стилей")
    s.add_argument("--out", default="dist/gallery.html")
    s.add_argument("--fragment", action="store_true", help="без <html>/<head> (для Artifact)")
    s.set_defaults(fn=cmd_gallery)

    s = sub.add_parser("sync", help="обновить библиотеку из апстрима")
    s.set_defaults(fn=cmd_sync)

    a = p.parse_args(argv)
    return a.fn(a)


if __name__ == "__main__":
    raise SystemExit(main())
