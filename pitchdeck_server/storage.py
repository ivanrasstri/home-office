from __future__ import annotations

import json
import os
import secrets
import sqlite3
from contextlib import contextmanager
from datetime import datetime, timezone
from pathlib import Path
from typing import Any, Iterator


def _data_dir() -> Path:
    # Не "data/" — тот каталог джоб-бот коммитит обратно в репозиторий
    # (`git add data/` в job-search.yml), а презентации туда попадать не должны.
    d = Path(os.environ.get("PITCHDECK_DATA_DIR", "pitchdeck_data"))
    d.mkdir(parents=True, exist_ok=True)
    return d


def _db_path() -> Path:
    return _data_dir() / "pitchdeck.db"


@contextmanager
def _connect() -> Iterator[sqlite3.Connection]:
    conn = sqlite3.connect(_db_path())
    conn.row_factory = sqlite3.Row
    try:
        yield conn
        conn.commit()
    finally:
        conn.close()


def init_db() -> None:
    with _connect() as conn:
        conn.executescript(
            """
            CREATE TABLE IF NOT EXISTS decks (
                id TEXT PRIMARY KEY,
                title TEXT NOT NULL,
                owner_token TEXT NOT NULL,
                data TEXT NOT NULL,
                created_at TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS deck_views (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                deck_id TEXT NOT NULL,
                ts TEXT NOT NULL,
                referrer TEXT,
                user_agent TEXT
            );
            CREATE TABLE IF NOT EXISTS slide_views (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                deck_id TEXT NOT NULL,
                slide_index INTEGER NOT NULL,
                dwell_ms INTEGER,
                ts TEXT NOT NULL
            );
            CREATE INDEX IF NOT EXISTS idx_deck_views_deck ON deck_views(deck_id);
            CREATE INDEX IF NOT EXISTS idx_slide_views_deck ON slide_views(deck_id);
            """
        )


def _now() -> str:
    return datetime.now(timezone.utc).isoformat()


def create_deck(title: str, slides: list[dict[str, Any]]) -> tuple[str, str]:
    deck_id = secrets.token_urlsafe(8)
    owner_token = secrets.token_urlsafe(24)
    with _connect() as conn:
        conn.execute(
            "INSERT INTO decks (id, title, owner_token, data, created_at) VALUES (?, ?, ?, ?, ?)",
            (deck_id, title, owner_token, json.dumps({"slides": slides}), _now()),
        )
    return deck_id, owner_token


def get_deck(deck_id: str) -> dict[str, Any] | None:
    with _connect() as conn:
        row = conn.execute("SELECT * FROM decks WHERE id = ?", (deck_id,)).fetchone()
    if row is None:
        return None
    return {
        "id": row["id"],
        "title": row["title"],
        "owner_token": row["owner_token"],
        "slides": json.loads(row["data"])["slides"],
        "created_at": row["created_at"],
    }


def verify_owner_token(deck_id: str, token: str) -> bool:
    with _connect() as conn:
        row = conn.execute("SELECT owner_token FROM decks WHERE id = ?", (deck_id,)).fetchone()
    return row is not None and secrets.compare_digest(row["owner_token"], token)


def record_view(deck_id: str, referrer: str | None, user_agent: str | None) -> None:
    with _connect() as conn:
        conn.execute(
            "INSERT INTO deck_views (deck_id, ts, referrer, user_agent) VALUES (?, ?, ?, ?)",
            (deck_id, _now(), referrer, user_agent),
        )


def record_slide_view(deck_id: str, slide_index: int, dwell_ms: int | None) -> None:
    with _connect() as conn:
        conn.execute(
            "INSERT INTO slide_views (deck_id, slide_index, dwell_ms, ts) VALUES (?, ?, ?, ?)",
            (deck_id, slide_index, dwell_ms, _now()),
        )


def get_analytics(deck_id: str) -> dict[str, Any]:
    with _connect() as conn:
        total_views = conn.execute(
            "SELECT COUNT(*) AS n FROM deck_views WHERE deck_id = ?", (deck_id,)
        ).fetchone()["n"]

        by_day = conn.execute(
            """
            SELECT substr(ts, 1, 10) AS day, COUNT(*) AS n
            FROM deck_views WHERE deck_id = ?
            GROUP BY day ORDER BY day
            """,
            (deck_id,),
        ).fetchall()

        by_slide = conn.execute(
            """
            SELECT slide_index,
                   COUNT(*) AS views,
                   AVG(dwell_ms) AS avg_dwell_ms
            FROM slide_views WHERE deck_id = ?
            GROUP BY slide_index ORDER BY slide_index
            """,
            (deck_id,),
        ).fetchall()

    return {
        "total_views": total_views,
        "views_by_day": [{"day": r["day"], "views": r["n"]} for r in by_day],
        "slides": [
            {
                "index": r["slide_index"],
                "views": r["views"],
                "avg_dwell_ms": round(r["avg_dwell_ms"]) if r["avg_dwell_ms"] is not None else None,
            }
            for r in by_slide
        ],
    }
