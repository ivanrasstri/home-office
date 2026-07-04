from __future__ import annotations

import time

import requests

API_BASE = "https://api.figma.com/v1"


class FigmaError(RuntimeError):
    pass


class FigmaClient:
    def __init__(self, token: str):
        if not token:
            raise FigmaError(
                "Нужен Figma access token (--token или переменная FIGMA_TOKEN). "
                "Получить: https://www.figma.com/developers/api#access-tokens"
            )
        self._session = requests.Session()
        self._session.headers["X-Figma-Token"] = token

    def get_file(self, file_key: str, depth: int = 2) -> dict:
        r = self._session.get(
            f"{API_BASE}/files/{file_key}", params={"depth": depth}, timeout=60
        )
        if r.status_code != 200:
            raise FigmaError(f"Не удалось получить файл {file_key}: {r.status_code} {r.text}")
        return r.json()

    def get_images(
        self, file_key: str, node_ids: list[str], fmt: str = "png", scale: float = 2.0
    ) -> dict[str, str]:
        """Рендерит узлы в картинки и возвращает {node_id: url}. Ретраит узлы,
        для которых Figma ещё не успела отрендерить URL (значение None)."""
        images: dict[str, str | None] = {}
        pending = list(node_ids)
        for attempt in range(5):
            if not pending:
                break
            r = self._session.get(
                f"{API_BASE}/images/{file_key}",
                params={"ids": ",".join(pending), "format": fmt, "scale": scale},
                timeout=120,
            )
            if r.status_code != 200:
                raise FigmaError(f"Не удалось отрендерить картинки: {r.status_code} {r.text}")
            data = r.json()
            if data.get("err"):
                raise FigmaError(f"Figma вернула ошибку рендера: {data['err']}")
            images.update(data.get("images", {}))
            pending = [nid for nid, url in images.items() if not url]
            if pending:
                time.sleep(2 * (attempt + 1))

        missing = [nid for nid, url in images.items() if not url]
        if missing:
            raise FigmaError(f"Не удалось отрендерить узлы: {', '.join(missing)}")
        return {nid: url for nid, url in images.items() if url}

    def download(self, url: str) -> bytes:
        r = self._session.get(url, timeout=120)
        if r.status_code != 200:
            raise FigmaError(f"Не удалось скачать {url}: {r.status_code}")
        return r.content
