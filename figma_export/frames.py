from __future__ import annotations

from dataclasses import dataclass


@dataclass
class Frame:
    node_id: str
    name: str
    width: float
    height: float


class FramesError(RuntimeError):
    pass


def _pages(document: dict) -> list[dict]:
    return [c for c in document.get("children", []) if c.get("type") == "CANVAS"]


def pick_page(file_json: dict, page_name: str | None) -> dict:
    pages = _pages(file_json["document"])
    if not pages:
        raise FramesError("В файле нет ни одной страницы (canvas).")
    if page_name is None:
        return pages[0]
    for p in pages:
        if p["name"] == page_name:
            return p
    available = ", ".join(p["name"] for p in pages)
    raise FramesError(f"Страница «{page_name}» не найдена. Доступные страницы: {available}")


def list_frames(page: dict, order: str = "position") -> list[Frame]:
    frames = []
    for node in page.get("children", []):
        if node.get("type") not in ("FRAME", "COMPONENT", "COMPONENT_SET"):
            continue
        box = node.get("absoluteBoundingBox") or {}
        frames.append(
            Frame(
                node_id=node["id"],
                name=node.get("name", node["id"]),
                width=box.get("width", 0) or 0,
                height=box.get("height", 0) or 0,
            )
        )
    if not frames:
        raise FramesError(f"На странице «{page.get('name')}» не найдено ни одного фрейма (слайда).")

    if order == "name":
        frames.sort(key=lambda f: f.name)
    elif order == "position":
        boxes = {n["id"]: n.get("absoluteBoundingBox") or {} for n in page.get("children", [])}

        def key(f: Frame):
            box = boxes.get(f.node_id, {})
            y = box.get("y", 0) or 0
            x = box.get("x", 0) or 0
            return (round(y / 50.0), x)  # группируем в «ряды» по Y, затем слева направо

        frames.sort(key=key)
    # order == "none" -> оставляем порядок, как в Figma
    return frames
