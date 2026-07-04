from __future__ import annotations

import os
from typing import Any, Optional

from fastapi import FastAPI, Header, HTTPException, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, JSONResponse
from pydantic import BaseModel

from . import storage

app = FastAPI(title="Pitchdeck web export")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def _startup() -> None:
    storage.init_db()


class SlideIn(BaseModel):
    name: Optional[str] = None
    width: float
    height: float
    elements: list[dict[str, Any]] = []


class PublishRequest(BaseModel):
    title: str = "Presentation"
    slides: list[SlideIn]


class TrackRequest(BaseModel):
    type: str
    slide_index: Optional[int] = None
    dwell_ms: Optional[int] = None
    referrer: Optional[str] = None


def _base_url(request: Request) -> str:
    override = os.environ.get("PITCHDECK_BASE_URL")
    return override.rstrip("/") if override else str(request.base_url).rstrip("/")


def _check_api_token(x_api_token: str | None) -> None:
    expected = os.environ.get("PITCHDECK_API_TOKEN")
    if not expected:
        raise HTTPException(500, "Сервер не настроен: не задан PITCHDECK_API_TOKEN.")
    if not x_api_token or x_api_token != expected:
        raise HTTPException(401, "Неверный или отсутствующий X-API-Token.")


@app.post("/api/decks")
def create_deck(
    body: PublishRequest,
    request: Request,
    x_api_token: str | None = Header(default=None),
) -> JSONResponse:
    _check_api_token(x_api_token)
    if not body.slides:
        raise HTTPException(400, "Нет слайдов для публикации.")

    slides = [s.model_dump() for s in body.slides]
    deck_id, owner_token = storage.create_deck(body.title, slides)

    base = _base_url(request)
    return JSONResponse(
        {
            "id": deck_id,
            "url": f"{base}/p/{deck_id}",
            "analytics_url": f"{base}/p/{deck_id}/analytics?token={owner_token}",
        }
    )


@app.get("/p/{deck_id}", response_class=HTMLResponse)
def view_deck(deck_id: str):
    from .render import render_viewer_html

    deck = storage.get_deck(deck_id)
    if deck is None:
        raise HTTPException(404, "Презентация не найдена.")
    return render_viewer_html(deck_id, deck)


@app.post("/api/decks/{deck_id}/track")
def track(deck_id: str, body: TrackRequest, request: Request):
    if storage.get_deck(deck_id) is None:
        raise HTTPException(404, "Презентация не найдена.")

    if body.type == "view":
        storage.record_view(deck_id, body.referrer, request.headers.get("user-agent"))
    elif body.type == "slide" and body.slide_index is not None:
        storage.record_slide_view(deck_id, body.slide_index, body.dwell_ms)
    return {"ok": True}


@app.get("/p/{deck_id}/analytics", response_class=HTMLResponse)
def analytics(deck_id: str, token: str = ""):
    from .render import render_analytics_html

    deck = storage.get_deck(deck_id)
    if deck is None:
        raise HTTPException(404, "Презентация не найдена.")
    if not storage.verify_owner_token(deck_id, token):
        raise HTTPException(403, "Неверный токен аналитики.")

    data = storage.get_analytics(deck_id)
    return render_analytics_html(deck_id, deck, data)


@app.get("/healthz")
def healthz():
    return {"ok": True}
