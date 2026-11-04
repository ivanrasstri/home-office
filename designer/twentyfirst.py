"""21st.dev (MCP): референсы UI-компонентов для дизайнера.

21st.dev — каталог React/shadcn-компонентов. Ходим в его MCP-сервер напрямую
(JSON-RPC поверх HTTP), без отдельного SDK.

Тариф free: поиск, темы и логотипы бесплатны; код компонента (get_component) —
2 штуки в день. Поэтому на один дизайн берём максимум один компонент
(DESIGNER_21ST_RETRIEVALS, по умолчанию 1) и только если квота ещё есть.

Ключ — переменная окружения API_KEY_21ST (так её называет сам 21st.dev).
"""

from __future__ import annotations

import json
import logging
import os
import re
from typing import Any

import requests

log = logging.getLogger("designer.21st")

URL = "https://21st.dev/api/mcp"
PROTOCOL = "2025-06-18"
MAX_CODE_CHARS = 14000

# Что искать на 21st под формат: первое совпадение паттерна в брифе, иначе дефолт.
# Для форматов без интерактивных секций (деки, письма, баннеры) референсы не нужны.
QUERIES: dict[str, tuple[list[tuple[str, str]], str]] = {
    "landing": (
        [
            (r"цен|тариф|pricing|подписк|стоимост", "pricing section"),
            (r"отзыв|testimonial", "testimonials section"),
            (r"faq|вопрос", "faq accordion"),
            (r"кейс|портфолио|работы|portfolio", "portfolio gallery"),
        ],
        "hero section",
    ),
    "ui": (
        [
            (r"таблиц|table|crm|список|реестр", "data table"),
            (r"график|chart|аналитик|метрик|kpi", "analytics dashboard"),
            (r"чат|сообщени|inbox|chat", "chat interface"),
        ],
        "dashboard layout",
    ),
}


def pick_query(brief: str, kind: str) -> str | None:
    rules = QUERIES.get(kind)
    if not rules:
        return None
    patterns, default = rules
    low = brief.lower()
    for pattern, query in patterns:
        if re.search(pattern, low):
            return query
    return default


class TwentyFirst:
    """Минимальный MCP-клиент: initialize → tools/call, ответы JSON или SSE."""

    def __init__(self, api_key: str | None = None, timeout: float = 40) -> None:
        self.api_key = api_key if api_key is not None else os.environ.get("API_KEY_21ST", "")
        self.timeout = timeout
        self._session_id: str | None = None
        self._ready = False
        self._id = 0
        self._http = requests.Session()

    @property
    def enabled(self) -> bool:
        return bool(self.api_key)

    # -- транспорт ----------------------------------------------------------- #
    def _post(self, payload: dict[str, Any]) -> dict[str, Any]:
        headers = {
            "x-api-key": self.api_key,
            "Content-Type": "application/json",
            "Accept": "application/json, text/event-stream",
            "MCP-Protocol-Version": PROTOCOL,
        }
        if self._session_id:
            headers["Mcp-Session-Id"] = self._session_id
        r = self._http.post(URL, json=payload, headers=headers, timeout=self.timeout)
        r.raise_for_status()
        self._session_id = r.headers.get("Mcp-Session-Id") or self._session_id
        if "id" not in payload or not r.content:  # уведомление — ответа нет
            return {}
        if r.headers.get("Content-Type", "").startswith("text/event-stream"):
            for line in reversed(r.text.splitlines()):
                if line.startswith("data:"):
                    data = json.loads(line[5:].strip())
                    if data.get("id") == payload["id"]:
                        return data
            return {}
        return r.json()

    def _rpc(self, method: str, params: dict[str, Any]) -> dict[str, Any]:
        if not self._ready:
            self._ready = True
            self._id += 1
            self._post({
                "jsonrpc": "2.0", "id": self._id, "method": "initialize",
                "params": {
                    "protocolVersion": PROTOCOL, "capabilities": {},
                    "clientInfo": {"name": "home-office-designer", "version": "1.0"},
                },
            })
            self._post({"jsonrpc": "2.0", "method": "notifications/initialized"})
        self._id += 1
        data = self._post({"jsonrpc": "2.0", "id": self._id, "method": method, "params": params})
        if "error" in data:
            raise RuntimeError(f"21st.dev: {data['error'].get('message', data['error'])}")
        return data.get("result", {})

    def call(self, tool: str, args: dict[str, Any] | None = None) -> dict[str, Any]:
        res = self._rpc("tools/call", {"name": tool, "arguments": args or {}})
        if res.get("isError"):
            raise RuntimeError(f"21st.dev {tool}: {_text(res)[:300]}")
        return res

    # -- инструменты --------------------------------------------------------- #
    def usage(self) -> dict[str, Any]:
        return self.call("get_usage").get("structuredContent") or {}

    def search(self, query: str, type_: str = "component", limit: int = 5) -> list[dict[str, Any]]:
        res = self.call("search", {"query": query, "type": type_, "limit": limit})
        return (res.get("structuredContent") or {}).get("results") or []

    def component(self, demo_id: int) -> str | None:
        """Код компонента или None (пейволл / не найден). Тратит дневную квоту."""
        res = self.call("get_component", {"id": demo_id})
        sc = res.get("structuredContent") or {}
        if sc.get("locked") or sc.get("found") is False:
            return None
        return _text(res) or None

    def can_retrieve(self) -> bool:
        u = self.usage()
        return u.get("tier") not in (None, "free") or (u.get("freeRetrievalsRemaining") or 0) > 0


def _text(result: dict[str, Any]) -> str:
    return "\n".join(c.get("text", "") for c in result.get("content", []) if c.get("type") == "text")


def references_for(
    brief: str, kind: str, client: TwentyFirst | None = None, retrievals: int | None = None
) -> tuple[str, list[str]]:
    """Блок референсов для промпта + список того, что взяли (для отчёта человеку).

    Без ключа, для «нереференсных» форматов или при любой ошибке 21st —
    возвращает ("", []): дизайн просто делается без референса.
    """
    client = client or TwentyFirst()
    query = pick_query(brief, kind)
    if not client.enabled or not query:
        return "", []
    if retrievals is None:
        retrievals = int(os.environ.get("DESIGNER_21ST_RETRIEVALS", "1"))
    try:
        results = [r for r in client.search(query, "component", 4) if r.get("id")]
        if not results:
            return "", []
        lines = [f"Search «{query}» on 21st.dev — top matches:"]
        lines += [
            f"- {r.get('name', '?')} by {r.get('author', '?')}"
            + (f": {r['description']}" if r.get("description") else "")
            for r in results
        ]
        used: list[str] = []
        if retrievals > 0 and client.can_retrieve():
            top = results[0]
            code = client.component(int(top["id"]))
            if code:
                lines.append(
                    f"\nReference implementation of «{top.get('name')}» (React + Tailwind):\n"
                    f"```tsx\n{code[:MAX_CODE_CHARS]}\n```"
                )
                used.append(f"{top.get('name')} — @{top.get('author')} (21st.dev)")
        return "\n".join(lines), used
    except (requests.RequestException, RuntimeError, ValueError) as e:
        log.warning("21st.dev недоступен, делаю без референса: %s", e)
        return "", []
