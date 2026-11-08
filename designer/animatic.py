"""Аниматик из раскадровки: кадры → ролик (локально через ffmpeg или с ИИ-анимацией LTX-2.5).

Описание ролика — YAML:

    frames: storyboard/          # каталог с кадрами (291.png …), путь относительно YAML
    size: 1920x1080
    fps: 25
    shots:
      - id: bag
        frames: [291, 292]       # один кадр — оживить его; два и больше — переходы между соседними
        seconds: 2.5             # сколько шот длится в ролике
        engine: ai               # ai — LTX; local — только ffmpeg (текст, QR, логотипы не плывут)
        prompt: "The camera pushes in toward the logo on the bag..."
        camera: dolly_in         # необязательно
        gen_seconds: 3           # длина генерации в бесплатном демо (по умолч. = длине шота, не меньше 2 с)
        backend: wan             # чем анимировать: ltx (по умолч., со звуком) или wan (переход кадр→кадр бесплатно)

    python -m designer animatic shots.yaml                  # всё локально: бесплатно, кадры никуда не уходят
    python -m designer animatic shots.yaml --engine ai      # шоты engine: ai — через LTX (--via api|space|auto)
    python -m designer animatic shots.yaml --engine ai --only bag,flowers   # ИИ только эти, в этом порядке

Готовые ИИ-клипы кэшируются в <out>/animatic-cache: повторная сборка за них не платит. В платном API
каждый переход — отдельный клип с первым и последним кадром (точно попадает в раскадровку). В
бесплатном демо Hugging Face последнего кадра нет: анимируется первый кадр по промпту.
"""

from __future__ import annotations

import hashlib
import json
import logging
import shutil
import subprocess
import tempfile
from dataclasses import dataclass, field
from pathlib import Path

import yaml

from . import ltx, ltx_space, wan_space

log = logging.getLogger("designer.animatic")


class AnimaticError(RuntimeError):
    pass


@dataclass
class Shot:
    id: str
    frames: list[Path]
    seconds: float
    engine: str = "local"
    prompt: str = ""
    camera: str | None = None
    zoom: float = 0.04
    gen_seconds: float | None = None
    backend: str = "ltx"  # ltx — LTX-2.5 (API или демо); wan — Wan 2.2 в бесплатном демо, с последним кадром
    inputs: list[Path] | None = None  # кадры после очистки краёв — их видит модель; ключ кэша — по исходным


@dataclass
class Plan:
    shots: list[Shot]
    width: int = 1920
    height: int = 1080
    fps: int = 25
    source: Path = field(default_factory=Path)


def load(path: str | Path) -> Plan:
    path = Path(path)
    try:
        data = yaml.safe_load(path.read_text(encoding="utf-8")) or {}
    except (OSError, yaml.YAMLError) as e:
        raise AnimaticError(f"Не читается {path}: {e}") from e
    base = (path.parent / str(data.get("frames", "."))).resolve()
    w, h = (int(x) for x in str(data.get("size", "1920x1080")).lower().split("x"))
    shots = []
    for i, s in enumerate(data.get("shots") or [], 1):
        names = s.get("frames") or []
        if not names:
            raise AnimaticError(f"Шот {s.get('id', i)}: нет кадров")
        frames = []
        for n in names:
            f = base / (str(n) if Path(str(n)).suffix else f"{n}.png")
            if not f.is_file():
                raise AnimaticError(f"Шот {s.get('id', i)}: нет файла {f}")
            frames.append(f)
        engine = str(s.get("engine", "local"))
        backend = str(s.get("backend", "ltx"))
        if backend not in ("ltx", "wan"):
            raise AnimaticError(f"Шот {s.get('id', i)}: backend — ltx или wan")
        if engine not in ("local", "ai"):
            raise AnimaticError(f"Шот {s.get('id', i)}: engine — local или ai")
        shots.append(Shot(id=str(s.get("id", i)), frames=frames, seconds=float(s.get("seconds", 2)),
                          engine=engine, prompt=str(s.get("prompt", "")).strip(), camera=s.get("camera"),
                          zoom=float(s.get("zoom", 0.04)),
                          gen_seconds=float(s["gen_seconds"]) if s.get("gen_seconds") else None,
                          backend=backend))
    if not shots:
        raise AnimaticError(f"В {path} нет шотов")
    return Plan(shots=shots, width=w, height=h, fps=int(data.get("fps", 25)), source=path)


# -- ffmpeg ------------------------------------------------------------------
def _ffmpeg(*args: str) -> None:
    if not shutil.which("ffmpeg"):
        raise AnimaticError("Нужен ffmpeg (apt install ffmpeg)")
    r = subprocess.run(["ffmpeg", "-v", "error", "-y", *args], capture_output=True, text=True)
    if r.returncode != 0:
        raise AnimaticError(f"ffmpeg: {r.stderr.strip()[-800:]}")


def duration(path: Path) -> float:
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", str(path)],
                       capture_output=True, text=True)
    try:
        return float(r.stdout.strip())
    except ValueError as e:
        raise AnimaticError(f"Не читается длина {path}: {r.stderr.strip()}") from e


def _encode(w: int, h: int, fps: int) -> list[str]:
    return ["-c:v", "libx264", "-preset", "medium", "-crf", "18", "-pix_fmt", "yuv420p", "-r", str(fps), "-an"]


def local_clip(frames: list[Path], seconds: float, out: Path, w: int, h: int, fps: int, zoom: float = 0.04) -> Path:
    """Без ИИ: медленный наезд на каждый кадр и мягкие переходы между кадрами шота."""
    n = len(frames)
    fade = min(0.5, seconds / (2 * n)) if n > 1 else 0.0
    seg = (seconds + fade * (n - 1)) / n  # длина куска на кадр с учётом наложения переходов
    total = max(2, round(seconds * fps))
    args: list[str] = []
    chains = []
    for i, f in enumerate(frames):
        args += ["-framerate", str(fps), "-loop", "1", "-t", f"{seg:.3f}", "-i", str(f)]
        start = round(i * (seg - fade) * fps)  # наезд сквозной на весь шот: в переходе кадры совпадают по масштабу
        chains.append(
            f"[{i}:v]scale={w * 2}:{h * 2}:force_original_aspect_ratio=increase,crop={w * 2}:{h * 2},"
            f"zoompan=z='1+{zoom}*({start}+on)/{total}':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=1:"
            f"s={w}x{h}:fps={fps},setsar=1,format=yuv420p[v{i}]"
        )
    last = "v0"
    for i in range(1, n):
        chains.append(f"[{last}][v{i}]xfade=transition=fade:duration={fade:.3f}:offset={i * (seg - fade):.3f}[x{i}]")
        last = f"x{i}"
    _ffmpeg(*args, "-filter_complex", ";".join(chains), "-map", f"[{last}]", "-t", f"{seconds:.3f}",
            *_encode(w, h, fps), str(out))
    return out


def retime(src: Path, seconds: float, out: Path, w: int, h: int, fps: int) -> Path:
    """Подогнать ИИ-клип под длину шота (ускорить или замедлить), размер и fps ролика; звук убрать."""
    factor = seconds / duration(src)
    _ffmpeg("-i", str(src), "-vf",
            f"setpts={factor:.5f}*PTS,fps={fps},scale={w}:{h}:force_original_aspect_ratio=increase,"
            f"crop={w}:{h},setsar=1,format=yuv420p",
            "-t", f"{seconds:.3f}", *_encode(w, h, fps), str(out))
    return out


def concat(clips: list[Path], out: Path, music: Path | None = None) -> Path:
    """Склейка шотов встык (все уже одного размера и fps); музыка — по длине ролика с затуханием в конце."""
    with tempfile.NamedTemporaryFile("w", suffix=".txt", delete=False) as lst:
        for c in clips:
            lst.write(f"file '{c.resolve()}'\n")
    try:
        if not music:
            _ffmpeg("-f", "concat", "-safe", "0", "-i", lst.name, "-c", "copy", str(out))
            return out
        total = sum(duration(c) for c in clips)
        _ffmpeg("-f", "concat", "-safe", "0", "-i", lst.name, "-i", str(music), "-map", "0:v", "-map", "1:a",
                "-c:v", "copy", "-af", f"afade=t=out:st={max(0.0, total - 1.0):.2f}:d=1", "-c:a", "aac",
                "-t", f"{total:.3f}", str(out))
        return out
    finally:
        Path(lst.name).unlink(missing_ok=True)


def clean_edges(src: Path, dst_dir: Path, max_lines: int = 8) -> Path:
    """Убрать тёмные служебные линии по краям кадра (рамки из раскладки раскадровки): модель приняла бы их
    за часть сцены. Линии заменяются соседней строкой или столбцом картинки; чистый кадр возвращается как есть."""
    from PIL import Image, ImageStat

    im = Image.open(src).convert("RGB")
    w, h = im.size

    def mean(box: tuple[int, int, int, int]) -> float:
        return sum(ImageStat.Stat(im.crop(box)).mean) / 3

    sides = {
        "top": lambda i: (0, i, w, i + 1), "bottom": lambda i: (0, h - 1 - i, w, h - i),
        "left": lambda i: (i, 0, i + 1, h), "right": lambda i: (w - 1 - i, 0, w - i, h),
    }
    dark = {}
    for side, box in sides.items():
        n = 0
        while n < max_lines and mean(box(n)) < 25:
            n += 1
        if 0 < n < max_lines and mean(box(n)) > 40:  # тёмная полоса у края, а дальше обычная картинка
            dark[side] = n
    if not dark:
        return src
    for side, n in dark.items():
        strip = im.crop(sides[side](n))
        for i in range(n):
            im.paste(strip, sides[side](i)[:2])
    dst_dir.mkdir(parents=True, exist_ok=True)
    out = dst_dir / f"{src.stem}-{_key(src)}.png"
    if not out.exists():
        im.save(out)
    log.info("%s: убраны тёмные линии по краям (%s)", src.name, ", ".join(f"{k} {v}px" for k, v in dark.items()))
    return out


# -- ИИ ----------------------------------------------------------------------
def _key(*parts: object) -> str:
    h = hashlib.sha1()
    for p in parts:
        h.update(p.read_bytes() if isinstance(p, Path) else json.dumps(p, ensure_ascii=False).encode())
    return h.hexdigest()[:12]


def ai_steps(shot: Shot) -> list[tuple[Path, Path | None]]:
    """Переходы шота: пары соседних кадров; один кадр — оживить его самого."""
    return list(zip(shot.frames, shot.frames[1:], strict=False)) or [(shot.frames[0], None)]


def _wan_seconds(shot: Shot) -> float:
    part = shot.seconds / len(ai_steps(shot))
    return wan_space.clamp_seconds(shot.gen_seconds or max(2.0, part))


def estimate(plan: Plan, via: str, model: str, res: str) -> tuple[float, int]:
    """Цена LTX-шотов в платном API ($) и число генераций (вместе с Wan)."""
    runs = sum(len(ai_steps(s)) for s in plan.shots if s.engine == "ai")
    ltx_runs = sum(len(ai_steps(s)) for s in plan.shots if s.engine == "ai" and s.backend == "ltx")
    if via != "api":
        return 0.0, runs
    return round(ltx_runs * ltx.estimate(model, res, 6), 2), runs  # в API минимум 6 с на клип


def wan_quota(plan: Plan) -> int:
    """Сколько квоты ZeroGPU запросят Wan-шоты (из 300 в день у бесплатного аккаунта)."""
    return sum(wan_space.quota_seconds(_wan_seconds(s)) * len(ai_steps(s))
               for s in plan.shots if s.engine == "ai" and s.backend == "wan")


def _raw_path(shot: Shot, k: int, first: Path, last: Path | None, cache: Path, via: str, model: str, res: str) -> Path:
    if shot.backend == "wan":  # у Wan свой ключ кэша: демо, промпт, камера, оба кадра, длина
        space = wan_space.spaces_for(bool(last))[0]
        key = _key("wan", space, shot.prompt, shot.camera, first, last or "", _wan_seconds(shot), wan_space.STEPS)
        return cache / f"{shot.id}-{k}-wan-{key}.mp4"
    use_last = last if via == "api" else None  # в бесплатном демо LTX последнего кадра нет
    return cache / f"{shot.id}-{k}-{via}-{_key(via, model, res, shot.prompt, shot.camera, first, use_last or '')}.mp4"


def _cached(shot: Shot, cache: Path, via: str, model: str, res: str) -> bool:
    return all(_raw_path(shot, k, f, last, cache, via, model, res).exists()
               for k, (f, last) in enumerate(ai_steps(shot)))


def generate_raw(shot: Shot, cache: Path, via: str, model: str, res: str) -> list[Path]:
    """Сгенерировать (или взять из кэша) сырые ИИ-клипы шота — по одному на переход."""
    steps = ai_steps(shot)
    part = shot.seconds / len(steps)
    clean = dict(zip(shot.frames, shot.inputs or shot.frames, strict=True))
    raws = []
    for k, (src_first, src_last) in enumerate(steps):
        raw = _raw_path(shot, k, src_first, src_last, cache, via, model, res)
        first, last = clean[src_first], clean[src_last] if src_last else None
        if not raw.exists():
            log.info("ИИ-шот %s, переход %d/%d (%s) …", shot.id, k + 1, len(steps),
                     "wan" if shot.backend == "wan" else via)
            tmp = raw.with_name(raw.name + ".tmp.mp4")
            if shot.backend == "wan":
                wan_space.generate(tmp, shot.prompt, image=str(first), last_frame=str(last) if last else None,
                                   duration=_wan_seconds(shot), camera=shot.camera)
            elif via == "api":
                ltx.LTX().generate(tmp, shot.prompt, image=str(first), last_frame=str(last) if last else None,
                                   model=model, duration=6, res=res, fps=24, sound=False, camera=shot.camera)
            else:
                secs = shot.gen_seconds or max(2.0, part)  # короче — экономнее квота
                ltx_space.generate(tmp, shot.prompt, image=str(first), res=res,
                                   duration=min(ltx_space.MAX_SECONDS, secs), camera=shot.camera)
            tmp.replace(raw)
        else:
            log.info("ИИ-шот %s, переход %d/%d — из кэша", shot.id, k + 1, len(steps))
        raws.append(raw)
    return raws


def ai_clip(shot: Shot, plan: Plan, cache: Path, via: str, model: str, res: str, work: Path) -> Path:
    raws = generate_raw(shot, cache, via, model, res)
    part = shot.seconds / len(raws)
    pieces = [retime(raw, part, work / f"{shot.id}-{k}.mp4", plan.width, plan.height, plan.fps)
              for k, raw in enumerate(raws)]
    if len(pieces) == 1:
        return pieces[0]
    return concat(pieces, work / f"{shot.id}.mp4")


def build(plan: Plan, out: Path, engine: str = "local", via: str = "auto", model: str = "ltx-2-5-fast",
          res: str = "1920x1080", only: list[str] | set[str] | None = None, music: Path | None = None,
          pending: list[str] | None = None) -> Path:
    """Собрать ролик. engine=local — все шоты через ffmpeg; engine=ai — шоты engine: ai через LTX.

    Если ИИ-шот не вышел (кончилась квота, сеть), он собирается локально, а его id попадает в pending:
    следующий запуск возьмёт готовое из кэша и догенерирует только недостающее.
    """
    if via == "auto":
        via = "api" if ltx.LTX().enabled else "space"
    cache = out.parent / "animatic-cache"
    cache.mkdir(parents=True, exist_ok=True)
    for s in plan.shots:
        s.inputs = [clean_edges(f, cache / "frames") for f in s.frames]
    order = list(only) if only else []
    pending = pending if pending is not None else []
    quota_out = False
    if engine == "ai" and order:  # сначала ИИ в заданном порядке: важное — пока есть квота
        byid = {s.id: s for s in plan.shots}
        for sid in order:
            s = byid.get(sid)
            if not s or s.engine != "ai" or _cached(s, cache, via, model, res):
                continue
            if quota_out:
                pending.append(sid)
                continue
            try:
                generate_raw(s, cache, via, model, res)
            except ltx.LTXError as e:
                quota_out = "квот" in str(e).lower()
                log.warning("ИИ-шот %s не вышел (%s) — пока будет локально", sid, str(e)[:200])
                pending.append(sid)
    with tempfile.TemporaryDirectory() as tmp:
        work = Path(tmp)
        clips = []
        for i, s in enumerate(plan.shots, 1):
            cached = engine == "ai" and s.engine == "ai" and _cached(s, cache, via, model, res)
            use_ai = cached or (engine == "ai" and s.engine == "ai" and not order)  # с --only генерация уже была выше
            log.info("[%d/%d] %s · %.1f с · %s", i, len(plan.shots), s.id, s.seconds, f"ИИ ({via})" if use_ai else "локально")
            if use_ai:
                try:
                    if quota_out and not cached:
                        raise ltx.LTXError("квота на сегодня уже кончилась")
                    clips.append(ai_clip(s, plan, cache, via, model, res, work))
                    continue
                except ltx.LTXError as e:
                    quota_out = quota_out or "квот" in str(e).lower()
                    log.warning("ИИ-шот %s не вышел (%s) — пока собираю его локально", s.id, str(e)[:200])
                    pending.append(s.id)
            clips.append(local_clip(s.inputs or s.frames, s.seconds, work / f"{i:02d}-{s.id}.mp4", plan.width,
                                    plan.height, plan.fps, s.zoom))
        out.parent.mkdir(parents=True, exist_ok=True)
        return concat(clips, out, music)
