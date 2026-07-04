from __future__ import annotations

import json
from html import escape
from typing import Any


def _embed_json(data: Any) -> str:
    # </script> внутри JSON сломало бы страницу — экранируем слэш.
    return json.dumps(data, ensure_ascii=False).replace("</", "<\\/")


def render_viewer_html(deck_id: str, deck: dict[str, Any]) -> str:
    title = escape(deck["title"] or "Presentation")
    payload = _embed_json({"deckId": deck_id, "slides": deck["slides"]})

    return f"""<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>{title}</title>
<style>
  html, body {{ margin: 0; height: 100%; background: #1e1e1e; overflow: hidden; }}
  #stage {{ position: relative; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; }}
  #canvas {{ position: relative; background: #ffffff; box-shadow: 0 8px 40px rgba(0,0,0,.5); overflow: hidden; }}
  .el {{ position: absolute; box-sizing: border-box; }}
  .el.text {{ display: flex; white-space: pre-wrap; word-break: break-word; }}
  .el.image {{ object-fit: contain; }}
  #nav {{ position: fixed; bottom: 18px; left: 50%; transform: translateX(-50%);
          display: flex; align-items: center; gap: 14px; color: #ddd; font: 13px system-ui, sans-serif; }}
  #nav button {{ background: rgba(255,255,255,.12); color: #fff; border: none; width: 32px; height: 32px;
                 border-radius: 50%; cursor: pointer; font-size: 16px; }}
  #nav button:hover {{ background: rgba(255,255,255,.22); }}
  #nav button:disabled {{ opacity: .3; cursor: default; }}
</style>
</head>
<body>
  <div id="stage"><div id="canvas"></div></div>
  <div id="nav">
    <button id="prev" aria-label="Previous">‹</button>
    <span id="counter"></span>
    <button id="next" aria-label="Next">›</button>
  </div>
  <script id="deck-data" type="application/json">{payload}</script>
  <script>{_VIEWER_JS}</script>
</body>
</html>
"""


_VIEWER_JS = r"""
(function () {
  var deck = JSON.parse(document.getElementById('deck-data').textContent);
  var slides = deck.slides || [];
  var deckId = deck.deckId;
  var stage = document.getElementById('stage');
  var canvas = document.getElementById('canvas');
  var counter = document.getElementById('counter');
  var prevBtn = document.getElementById('prev');
  var nextBtn = document.getElementById('next');

  var index = 0;
  var enteredAt = performance.now();

  function track(body) {
    try {
      var blob = new Blob([JSON.stringify(body)], { type: 'application/json' });
      navigator.sendBeacon('/api/decks/' + deckId + '/track', blob);
    } catch (e) { /* best effort */ }
  }

  function fit() {
    var slide = slides[index];
    if (!slide) return;
    var scale = Math.min(stage.clientWidth / slide.width, stage.clientHeight / slide.height);
    canvas.style.transform = 'scale(' + scale + ')';
  }

  function colorStyle(hex, alpha) {
    if (!hex) return 'transparent';
    var a = alpha === undefined ? 1 : alpha;
    var r = parseInt(hex.substr(0, 2), 16), g = parseInt(hex.substr(2, 2), 16), b = parseInt(hex.substr(4, 2), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';
  }

  function renderElement(el) {
    var box = document.createElement('div');
    box.className = 'el ' + (el.kind === 'image' ? 'image-wrap' : el.kind);
    box.style.left = el.x + 'px';
    box.style.top = el.y + 'px';
    box.style.width = el.w + 'px';
    box.style.height = el.h + 'px';
    if (el.rotation) box.style.transform = 'rotate(' + el.rotation + 'deg)';

    if (el.kind === 'text') {
      box.style.alignItems = el.valign === 'middle' ? 'center' : el.valign === 'bottom' ? 'flex-end' : 'flex-start';
      box.style.justifyContent = el.align === 'center' ? 'center' : el.align === 'right' ? 'flex-end' : 'flex-start';
      box.style.textAlign = el.align || 'left';
      (el.runs || []).forEach(function (run) {
        var span = document.createElement('span');
        span.textContent = run.text;
        span.style.fontWeight = run.bold ? '700' : '400';
        span.style.fontStyle = run.italic ? 'italic' : 'normal';
        span.style.textDecoration = run.underline ? 'underline' : 'none';
        span.style.color = colorStyle(run.color, 1);
        span.style.fontSize = run.fontSize + 'pt';
        span.style.fontFamily = '"' + run.fontFace + '", system-ui, sans-serif';
        box.appendChild(span);
      });
      return box;
    }

    if (el.kind === 'shape') {
      box.style.backgroundColor = colorStyle(el.fillColor, el.fillAlpha);
      if (el.lineColor && el.lineWidth) {
        box.style.border = el.lineWidth + 'pt solid ' + colorStyle(el.lineColor, 1);
      }
      if (el.shape === 'ellipse') box.style.borderRadius = '50%';
      else if (el.shape === 'roundRect') box.style.borderRadius = '8px';
      return box;
    }

    // image
    var img = document.createElement('img');
    img.className = 'el image';
    img.style.left = el.x + 'px';
    img.style.top = el.y + 'px';
    img.style.width = el.w + 'px';
    img.style.height = el.h + 'px';
    if (el.rotation) img.style.transform = 'rotate(' + el.rotation + 'deg)';
    img.src = el.png;
    return img;
  }

  function render(newIndex) {
    var dwell = Math.round(performance.now() - enteredAt);
    if (slides[index]) track({ type: 'slide', slide_index: index, dwell_ms: dwell });

    index = Math.max(0, Math.min(slides.length - 1, newIndex));
    enteredAt = performance.now();

    var slide = slides[index];
    canvas.style.width = slide.width + 'px';
    canvas.style.height = slide.height + 'px';
    canvas.innerHTML = '';
    (slide.elements || []).forEach(function (el) { canvas.appendChild(renderElement(el)); });

    counter.textContent = (index + 1) + ' / ' + slides.length;
    prevBtn.disabled = index === 0;
    nextBtn.disabled = index === slides.length - 1;
    fit();
  }

  prevBtn.addEventListener('click', function () { render(index - 1); });
  nextBtn.addEventListener('click', function () { render(index + 1); });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === ' ') render(index + 1);
    if (e.key === 'ArrowLeft') render(index - 1);
  });
  stage.addEventListener('click', function (e) {
    var half = stage.clientWidth / 2;
    render(index + (e.clientX > half ? 1 : -1));
  });
  window.addEventListener('resize', fit);
  window.addEventListener('pagehide', function () {
    track({ type: 'slide', slide_index: index, dwell_ms: Math.round(performance.now() - enteredAt) });
  });

  track({ type: 'view', referrer: document.referrer });
  render(0);
})();
"""


def render_analytics_html(deck_id: str, deck: dict[str, Any], analytics: dict[str, Any]) -> str:
    title = escape(deck["title"] or "Presentation")
    rows = "".join(
        f"<tr><td>{s['index'] + 1}</td><td>{s['views']}</td>"
        f"<td>{(s['avg_dwell_ms'] / 1000):.1f} с</td></tr>"
        if s["avg_dwell_ms"] is not None
        else f"<tr><td>{s['index'] + 1}</td><td>{s['views']}</td><td>—</td></tr>"
        for s in analytics["slides"]
    )
    by_day_rows = "".join(f"<tr><td>{d['day']}</td><td>{d['views']}</td></tr>" for d in analytics["views_by_day"])

    return f"""<!doctype html>
<html lang="ru">
<head>
<meta charset="UTF-8" />
<title>Аналитика — {title}</title>
<style>
  body {{ font-family: system-ui, sans-serif; max-width: 720px; margin: 40px auto; padding: 0 16px; color: #1a1a1a; }}
  h1 {{ font-size: 20px; }}
  .stat {{ font-size: 40px; font-weight: 700; }}
  table {{ width: 100%; border-collapse: collapse; margin-top: 16px; }}
  th, td {{ text-align: left; padding: 6px 8px; border-bottom: 1px solid #eee; font-size: 14px; }}
  h2 {{ font-size: 15px; margin-top: 32px; }}
</style>
</head>
<body>
  <h1>{title}</h1>
  <div class="stat">{analytics['total_views']}</div>
  <div>всего просмотров</div>

  <h2>Просмотры по дням</h2>
  <table><thead><tr><th>Дата</th><th>Просмотров</th></tr></thead><tbody>{by_day_rows or '<tr><td colspan=2>Пока пусто</td></tr>'}</tbody></table>

  <h2>По слайдам</h2>
  <table><thead><tr><th>Слайд</th><th>Просмотров</th><th>Ср. время</th></tr></thead><tbody>{rows or '<tr><td colspan=3>Пока пусто</td></tr>'}</tbody></table>
</body>
</html>
"""
