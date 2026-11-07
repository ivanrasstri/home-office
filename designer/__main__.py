"""CLI дизайнера.

  python -m designer list [запрос] [--theme dark|light]   каталог стилей
  python -m designer show linear                          карточка стиля
  python -m designer suggest "бриф" [-n 3]                какие стили подходят
  python -m designer make "бриф" [--kind deck] [--style linear] [--polish]
  python -m designer gallery [--out dist/gallery.html]    HTML-галерея всех стилей
  python -m designer sync                                 обновить библиотеку из апстрима
  python -m designer video "промпт" [--image кадр.png]    видео LTX-2.5 (текст/кадр/аудио → mp4)
  python -m designer video --job image-to-video/<id>      дозабрать готовое видео по id задачи
  python -m designer video "промпт" --via space            бесплатно: демо LTX-2.5 на Hugging Face (до 5 с)
  python -m designer animatic shots.yaml [--engine ai]    аниматик из раскадровки (ffmpeg или LTX по шотам)

Для suggest/make нужен ANTHROPIC_API_KEY. С API_KEY_21ST дизайнер подтягивает
референс компонента с 21st.dev (лендинги и экраны интерфейса). Для video нужен
LTXV_API_KEY (console.ltx.io).
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

from . import animatic, catalog, gallery, ltx, ltx_space, studio, twentyfirst

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


def cmd_video(a: argparse.Namespace) -> int:
    """Видео LTX-2.5: текст → видео, кадр(ы) → видео, аудио (+кадр) → видео. Звук генерируется вместе с картинкой."""
    out = Path(a.out) / f"{datetime.now():%Y%m%d-%H%M%S}-ltx-{studio.slugify(a.prompt or 'video', 30)}.mp4"
    if a.check:  # проверка ключа без генерации и без трат
        try:
            print(ltx.LTX().check())
        except (ltx.LTXError, OSError) as e:
            print(e, file=sys.stderr)
            return 1
        return 0
    if a.job:  # дозабрать готовое видео по id (статус хранится 24 ч)
        try:
            path = ltx.LTX().resume(ltx.Job.parse(a.job), out)
        except ltx.LTXError as e:
            print(e, file=sys.stderr)
            return 1
        print(f"Готово: {path}")
        return 0
    if not a.prompt:
        print("Нужен промпт: что происходит в кадре (или --job <endpoint>/<id>, чтобы забрать готовое).",
              file=sys.stderr)
        return 1
    via = a.via if a.via != "auto" else ("api" if ltx.LTX().enabled else "space")
    if via == "space":
        return _video_space(a, out)
    try:
        model = ltx.model_id(a.model)
        res = ltx.resolution(a.res, a.aspect)
        duration = ltx.parse_duration(a.duration)
        if a.audio:
            ltx.validate(model, res, None, a.fps)
            price = ltx.estimate(model, res, None, a.fps, audio=True)
            cost = f"до ${price:.2f} (по длине аудио, максимум {ltx.audio_max(model, res)} с)"
        else:
            ltx.validate(model, res, duration, a.fps, bool(a.last_frame))
            price = ltx.estimate(model, res, duration, a.fps)
            cost = f"${price:.2f}" + (" максимум (длину выберет модель)" if duration is None else "")
        limit = ltx.max_usd(a.max_usd)
    except ltx.LTXError as e:
        print(e, file=sys.stderr)
        return 1
    if a.last_frame and not a.image:
        print("--last-frame работает только вместе с --image.", file=sys.stderr)
        return 1
    mode = "аудио → видео" if a.audio else "кадр → видео" if a.image else "текст → видео"
    if a.last_frame:
        mode = "первый и последний кадр → видео"
    secs = "по аудио" if a.audio else "авто" if duration is None else f"{duration} с"
    print(f"{mode} · {model} · {res} · {secs} · {a.fps} fps · стоимость {cost}", flush=True)
    if a.estimate:
        return 0
    if price > limit:
        print(f"Дороже лимита ${limit:.2f}. Подними --max-usd или LTX_MAX_USD, если так и задумано.", file=sys.stderr)
        return 1
    client = ltx.LTX()
    if not client.enabled:
        print("Нужен LTXV_API_KEY (console.ltx.io → API Keys).", file=sys.stderr)
        return 2
    try:
        path = client.generate(
            out, a.prompt, image=a.image, last_frame=a.last_frame, audio=a.audio, model=model,
            duration=duration, res=res, fps=a.fps, sound=not a.silent, camera=a.camera,
        )
    except ltx.LTXError as e:
        print(e, file=sys.stderr)
        return 1
    print(f"Готово: {path}")
    return 0


def _video_space(a: argparse.Namespace, out: Path) -> int:
    """Бесплатно: официальное демо LTX-2.5 на Hugging Face (до 5 с, дневная квота)."""
    try:
        res = ltx.resolution(a.res, a.aspect)
        duration = ltx.parse_duration(a.duration)
        if a.last_frame or a.audio:
            raise ltx.LTXError("Последний кадр и аудио на входе — только в платном LTX API (--via api)")
    except ltx.LTXError as e:
        print(e, file=sys.stderr)
        return 1
    height, width = ltx_space.dims(res)
    secs, auto = ltx_space.seconds(duration, quiet=True)
    mode = "кадр → видео" if a.image else "текст → видео"
    length = "авто ≤15 с" if auto else f"{secs:g} с"
    print(f"{mode} · LTX-2.5, бесплатное демо Hugging Face ({ltx_space.SPACE}) · {width}x{height} · {length} · "
          "со звуком · бесплатно, дневная квота", flush=True)
    if a.estimate:
        return 0
    try:
        path, info = ltx_space.generate(out, a.prompt, image=a.image, res=res, duration=duration, camera=a.camera,
                                        seed=a.seed, enhance=a.enhance, sound=not a.silent)
    except ltx.LTXError as e:
        print(e, file=sys.stderr)
        return 1
    print(f"Готово: {path} ({info})")
    return 0


def cmd_animatic(a: argparse.Namespace) -> int:
    """Раскадровка → ролик: шоты локально (ffmpeg) или с ИИ-анимацией LTX-2.5."""
    try:
        plan = animatic.load(a.plan)
        model = ltx.model_id(a.model)
        res = ltx.resolution(a.res)
        via = a.via if a.via != "auto" else ("api" if ltx.LTX().enabled else "space")
        only = {x.strip() for x in a.only.split(",")} if a.only else None
        total = sum(s.seconds for s in plan.shots)
        print(f"{plan.source.name}: {len(plan.shots)} шотов, {total:.1f} с, {plan.width}x{plan.height} {plan.fps} fps",
              flush=True)
        if a.engine == "ai":
            sub = animatic.Plan([s for s in plan.shots if not only or s.id in only], plan.width, plan.height,
                                plan.fps, plan.source)
            cost, runs = animatic.estimate(sub, via, model, res)
            price = f"≈${cost:.2f} (без учёта кэша)" if via == "api" else "бесплатно, дневная квота Hugging Face"
            print(f"ИИ ({via}): генераций {runs} · {price}", flush=True)
            if a.estimate:
                return 0
            limit = a.max_total_usd if a.max_total_usd is not None else ltx.usd("LTX_DAILY_USD", "20")
            if via == "api" and cost > limit:
                print(f"Дороже лимита ${limit:.2f} — подними --max-total-usd, если так и задумано.", file=sys.stderr)
                return 1
        elif a.estimate:
            return 0
        out = Path(a.out) / f"{datetime.now():%Y%m%d-%H%M%S}-{plan.source.stem}-{a.engine}.mp4"
        pending: list[str] = []
        path = animatic.build(plan, out, engine=a.engine, via=via, model=model, res=res, only=only,
                              music=Path(a.music) if a.music else None, pending=pending)
    except (animatic.AnimaticError, ltx.LTXError) as e:
        print(e, file=sys.stderr)
        return 1
    print(f"Готово: {path}")
    if pending:
        print(f"Пока без ИИ: {', '.join(pending)}. Повтори ту же команду позже (например, завтра, когда обновится "
              "квота) — готовые шоты возьмутся из кэша, догенерируются только эти.")
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

    s = sub.add_parser("video", help="видео LTX-2.5 из текста, кадра или аудио")
    s.add_argument("prompt", nargs="?", default="", help="что происходит в кадре: действие, камера, свет, звук")
    s.add_argument("--image", help="первый кадр: файл или https-ссылка")
    s.add_argument("--last-frame", help="последний кадр (вместе с --image): переход от кадра к кадру")
    s.add_argument("--audio", help="звук, под который строится видео: файл или https-ссылка; "
                                   "2–20 с у fast на 720p/1080p, иначе 2–10 с")
    s.add_argument("--model", default=ltx.env("LTX_MODEL", "fast"), help="fast (по умолч.) или pro")
    s.add_argument("--duration", default=ltx.env("LTX_DURATION", "6"),
                   help="секунды: 6/8/10, у fast на 720p/1080p до 20; auto — по действию в промпте")
    s.add_argument("--res", default=ltx.env("LTX_RESOLUTION", "1080p"),
                   help="720p, 1080p, 1440p, 4k или точный размер (1920x1080)")
    s.add_argument("--aspect", choices=list(ltx.ASPECTS), help="пропорция кадра (по умолч. 16:9)")
    s.add_argument("--fps", type=int, default=24, choices=list(ltx.FPS))
    s.add_argument("--camera", choices=list(ltx.CAMERA), help="движение камеры")
    s.add_argument("--silent", action="store_true", help="без звука")
    s.add_argument("--estimate", action="store_true", help="только посчитать цену, без запроса")
    s.add_argument("--max-usd", type=float, help="потолок цены за ролик (по умолч. LTX_MAX_USD или 5)")
    s.add_argument("--via", choices=["auto", "api", "space"], default=ltx.env("LTX_VIA", "auto"),
                   help="api — платный LTX API; space — бесплатное демо Hugging Face (до 5 с); "
                        "auto (по умолч.) — api, если есть LTXV_API_KEY, иначе space")
    s.add_argument("--seed", type=int, help="сид для повторяемости (только --via space)")
    s.add_argument("--enhance", action="store_true", help="переписать промпт моделью Gemma (только --via space)")
    s.add_argument("--check", action="store_true", help="проверить ключ LTX, ничего не генерируя и не тратя")
    s.add_argument("--job", help="забрать готовое видео по задаче <endpoint>/<id> (если скачивание сорвалось)")
    s.add_argument("--out", default="dist")
    s.set_defaults(fn=cmd_video)

    s = sub.add_parser("animatic", help="аниматик из раскадровки: шоты через ffmpeg или LTX-2.5")
    s.add_argument("plan", help="YAML с шотами (см. designer/animatic.py)")
    s.add_argument("--engine", choices=["local", "ai"], default="local",
                   help="local (по умолч.) — всё через ffmpeg, бесплатно и без отправки кадров; "
                        "ai — шоты с engine: ai через LTX")
    s.add_argument("--via", choices=["auto", "api", "space"], default=ltx.env("LTX_VIA", "auto"),
                   help="для --engine ai: api — платный LTX (первый+последний кадр); space — бесплатное демо")
    s.add_argument("--model", default=ltx.env("LTX_MODEL", "fast"), help="fast или pro (только api)")
    s.add_argument("--res", default=ltx.env("LTX_RESOLUTION", "1080p"), help="разрешение генерации ИИ-шотов")
    s.add_argument("--only", help="ИИ только для этих шотов: id через запятую (остальные локально)")
    s.add_argument("--music", help="звуковая дорожка под весь ролик")
    s.add_argument("--max-total-usd", type=float, help="потолок цены всех ИИ-шотов (по умолч. LTX_DAILY_USD или 20)")
    s.add_argument("--estimate", action="store_true", help="только показать план и цену")
    s.add_argument("--out", default="dist")
    s.set_defaults(fn=cmd_animatic)

    a = p.parse_args(argv)
    return a.fn(a)


if __name__ == "__main__":
    raise SystemExit(main())
