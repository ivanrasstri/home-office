"""Галерея стилей: один HTML-файл с превью всех DESIGN.md (без Claude, бесплатно).

Каждая карточка показывает стиль его же цветами (фон / текст / акцент), палитру,
шрифты и готовую команду для генерации. Поиск, фильтр по теме и категориям.

    python -m designer gallery            → dist/gallery.html
"""

from __future__ import annotations

import html
from collections import OrderedDict

from . import catalog
from .catalog import Style, contrast

UPSTREAM_URL = "https://github.com/VoltAgent/awesome-design-md"


def _on(color: str) -> str:
    """Цвет текста поверх color: чёрный или белый — что контрастнее."""
    return "#FFFFFF" if contrast(color, "#FFFFFF") >= contrast(color, "#0A0A0A") else "#0A0A0A"


def _accent_for_specimen(s: Style) -> str:
    # Если акцент совпадает с фоном/текстом, кнопка в превью рисуется цветом текста.
    if s.accent in (s.canvas,) or contrast(s.accent, s.canvas) < 1.15:
        return s.ink
    return s.accent


def _card(s: Style) -> str:
    e = html.escape
    acc = _accent_for_specimen(s)
    swatches = "".join(
        f'<li style="background:{c}" title="{c}"><span class="sr">{c}</span></li>' for c in s.palette
    )
    fonts = " · ".join(e(f) for f in s.fonts[:2]) or "шрифт не указан"
    theme_ru = "тёмная" if s.theme == "dark" else "светлая"
    hay = " ".join([s.slug, s.name, s.category, s.tagline, theme_ru, " ".join(s.fonts)]).lower()
    cmd = f'python -m designer make "бриф" --style {s.slug}'
    return f"""
<article class="card" data-theme-kind="{s.theme}" data-cat="{e(s.category)}" data-hay="{e(hay)}">
  <div class="specimen" style="background:{s.canvas};color:{s.ink}">
    <span class="sp-aa" aria-hidden="true">Aa</span>
    <span class="sp-head">Новый проект</span>
    <span class="sp-btn" style="background:{acc};color:{_on(acc)}">Начать</span>
  </div>
  <ul class="swatches" aria-label="Палитра">{swatches}</ul>
  <div class="meta">
    <div class="title-row">
      <h3>{e(s.name)}</h3>
      <span class="kind kind-{s.theme}">{theme_ru}</span>
    </div>
    <p class="tagline">{e(s.tagline) or "&nbsp;"}</p>
    <p class="fonts">{fonts}</p>
    <div class="cmd-row">
      <code class="slug">{e(s.slug)}</code>
      <button type="button" class="copy" data-cmd="{e(cmd)}" aria-label="Скопировать команду для стиля {e(s.name)}">Скопировать команду</button>
    </div>
  </div>
</article>"""


CSS = """
/* Layout: каталог-образцовник — шапка, липкая панель фильтров, сетка «чипов»
   по категориям; хром нейтральный, чтобы цвет несли сами стили. */
:root {
  --bg: #EDEFF3;
  --surface: #FFFFFF;
  --ink: #151821;
  --muted: #586074;
  --line: #D3D8E2;
  --accent: #2C43C4;
  --on-accent: #FFFFFF;
  --focus: #2C43C4;
  --font-display: "Unbounded", "Arial Black", system-ui, sans-serif;
  --font-body: "Golos Text", "Segoe UI", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", ui-monospace, "SFMono-Regular", Menlo, monospace;
}
@media (prefers-color-scheme: dark) {
  :root:not([data-theme="light"]) {
    --bg: #0E1015; --surface: #161922; --ink: #E7E9F0; --muted: #98A0B3;
    --line: #2A303C; --accent: #93A2FF; --on-accent: #0E1015; --focus: #93A2FF;
    color-scheme: dark;
  }
}
:root[data-theme="dark"] {
  --bg: #0E1015; --surface: #161922; --ink: #E7E9F0; --muted: #98A0B3;
  --line: #2A303C; --accent: #93A2FF; --on-accent: #0E1015; --focus: #93A2FF;
  color-scheme: dark;
}
* { box-sizing: border-box; }
body {
  background: var(--bg); color: var(--ink);
  font-family: var(--font-body); font-size: 15px; line-height: 1.5;
}
body::before {
  content: ""; position: fixed; inset: 0 0 auto; height: env(safe-area-inset-top, 0px);
  z-index: 10; background: var(--bg);
}
.wrap {
  max-width: 1280px; margin: 0 auto;
  padding-left: max(16px, env(safe-area-inset-left, 0px));
  padding-right: max(16px, env(safe-area-inset-right, 0px));
}
header.top { padding-block: 40px 20px; display: grid; gap: 14px; }
h1 {
  font-family: var(--font-display); font-weight: 700; margin: 0;
  font-size: clamp(28px, 5vw, 48px); line-height: 1.05; letter-spacing: -0.02em;
  text-wrap: balance;
}
.lede { margin: 0; max-width: 62ch; color: var(--muted); font-size: 16px; }
.stats { display: flex; flex-wrap: wrap; gap: 8px 22px; margin: 4px 0 0; padding: 0; list-style: none; }
.stats li { display: flex; align-items: baseline; gap: 6px; color: var(--muted); }
.stats b {
  font-family: var(--font-display); font-weight: 500; font-size: 20px; color: var(--ink);
  font-variant-numeric: tabular-nums;
}
.toolbar {
  position: sticky; top: env(safe-area-inset-top, 0px); z-index: 5;
  background: color-mix(in srgb, var(--bg) 92%, transparent);
  backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--line);
}
.toolbar .wrap { padding-block: 12px; display: grid; gap: 10px; }
.row1 { display: flex; flex-wrap: wrap; gap: 10px; align-items: center; }
.search {
  flex: 1 1 260px; min-width: 0; height: 40px; padding: 0 14px;
  font: inherit; color: var(--ink); background: var(--surface);
  border: 1px solid var(--line); border-radius: 8px;
}
.search::placeholder { color: var(--muted); }
.seg { display: inline-flex; border: 1px solid var(--line); border-radius: 8px; overflow: hidden; background: var(--surface); }
.seg button {
  font: inherit; font-size: 14px; color: var(--muted); background: transparent;
  border: 0; padding: 0 14px; height: 38px; cursor: pointer;
}
.seg button + button { border-left: 1px solid var(--line); }
.seg button[aria-pressed="true"] { background: var(--ink); color: var(--bg); }
.cats { display: flex; flex-wrap: wrap; gap: 6px; }
.cats button {
  font: inherit; font-size: 13px; color: var(--ink); background: transparent;
  border: 1px solid var(--line); border-radius: 6px; padding: 4px 10px; cursor: pointer;
}
.cats button[aria-pressed="true"] { background: var(--accent); border-color: var(--accent); color: var(--on-accent); }
.count { color: var(--muted); font-size: 13px; font-variant-numeric: tabular-nums; }
main { padding-block: 8px 48px; display: grid; gap: 36px; }
section.group { display: grid; gap: 14px; }
section.group h2 {
  margin: 0; display: flex; align-items: baseline; gap: 10px;
  font-family: var(--font-display); font-weight: 500; font-size: 18px; letter-spacing: -0.01em;
  padding-top: 18px; border-top: 1px solid var(--line);
}
section.group h2 span { font-family: var(--font-body); font-size: 13px; color: var(--muted); font-weight: 400; }
.grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 16px; }
.card {
  min-width: 0; display: grid; grid-template-rows: auto auto 1fr;
  background: var(--surface); border: 1px solid var(--line); border-radius: 10px; overflow: hidden;
}
.specimen {
  position: relative; height: 136px; padding: 16px; display: grid;
  grid-template-columns: 1fr auto; grid-template-rows: 1fr auto; gap: 8px;
}
.sp-aa { font-family: var(--font-display); font-weight: 700; font-size: 44px; line-height: 1; letter-spacing: -0.03em; }
.sp-head { grid-column: 1; grid-row: 2; align-self: end; font-weight: 600; font-size: 15px; }
.sp-btn {
  grid-column: 2; grid-row: 2; align-self: end; font-size: 12px; font-weight: 600;
  padding: 6px 12px; border-radius: 4px;
}
.swatches { display: flex; margin: 0; padding: 0; list-style: none; height: 18px; border-block: 1px solid var(--line); }
.swatches li { flex: 1; }
.meta { padding: 14px 16px 16px; display: grid; gap: 8px; align-content: start; min-width: 0; }
.title-row { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
h3 { margin: 0; font-size: 17px; font-weight: 600; letter-spacing: -0.01em; }
.kind { font-size: 12px; color: var(--muted); white-space: nowrap; }
.kind::before {
  content: ""; display: inline-block; width: 8px; height: 8px; margin-right: 6px;
  border-radius: 50%; border: 1px solid var(--muted); vertical-align: 0;
}
.kind-dark::before { background: var(--ink); border-color: var(--ink); }
.tagline {
  margin: 0; color: var(--muted); font-size: 13.5px; line-height: 1.45;
  display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden;
}
.fonts { margin: 0; font-size: 12.5px; color: var(--ink); overflow-wrap: anywhere; }
.cmd-row { display: flex; align-items: center; justify-content: space-between; gap: 8px; margin-top: 4px; }
.slug { font-family: var(--font-mono); font-size: 12.5px; color: var(--ink); overflow-wrap: anywhere; min-width: 0; }
.copy {
  font: inherit; font-size: 12.5px; color: var(--accent); background: transparent;
  border: 1px solid var(--line); border-radius: 6px; padding: 4px 9px; cursor: pointer; white-space: nowrap;
}
.copy.done { color: var(--on-accent); background: var(--accent); border-color: var(--accent); }
.empty { padding: 40px 0; color: var(--muted); display: grid; gap: 12px; justify-items: start; }
.empty button {
  font: inherit; color: var(--on-accent); background: var(--accent); border: 0;
  border-radius: 8px; padding: 8px 14px; cursor: pointer;
}
.howto { border-top: 1px solid var(--line); padding-block: 28px 8px; display: grid; gap: 16px; }
.howto h2 { margin: 0; font-family: var(--font-display); font-weight: 500; font-size: 18px; }
.ways { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px; }
.way { min-width: 0; display: grid; gap: 6px; align-content: start; }
.way h3 { font-size: 15px; }
.way p { margin: 0; color: var(--muted); font-size: 14px; }
.way pre {
  margin: 0; overflow-x: auto; font-family: var(--font-mono); font-size: 12.5px;
  background: var(--surface); border: 1px solid var(--line); border-radius: 8px; padding: 10px 12px;
}
footer { padding-block: 24px 40px; color: var(--muted); font-size: 13px; }
footer a { color: var(--accent); }
button:focus-visible, .search:focus-visible, a:focus-visible { outline: 2px solid var(--focus); outline-offset: 2px; }
.sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
@media (hover: hover) and (prefers-reduced-motion: no-preference) {
  .card { transition: transform .18s ease, box-shadow .18s ease; }
  .card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px -12px rgba(10, 14, 30, .35); }
}
"""

JS = """
(() => {
  const q = document.getElementById('q');
  const cards = [...document.querySelectorAll('.card')];
  const groups = [...document.querySelectorAll('section.group')];
  const count = document.getElementById('count');
  const empty = document.getElementById('empty');
  const total = cards.length;
  let kind = 'all', cat = 'all';
  const hints = {
    'тёмн':'dark','темн':'dark','светл':'light','бел':'white','чёрн':'black','черн':'black',
    'минимал':'minimal','премиум':'premium','люкс':'luxury','игрив':'playful','редакц':'editorial',
    'журнал':'magazine','кино':'cinematic','градиент':'gradient','фото':'photography','ретро':'retro',
    'зелён':'green','зелен':'green','фиолет':'purple','красн':'red','син':'blue','жёлт':'yellow',
    'желт':'yellow','оранж':'orange','тёпл':'warm','тепл':'warm','банк':'bank','крипт':'crypto'
  };
  function terms(text) {
    const words = text.toLowerCase().split(/\\s+/).filter(Boolean);
    return words.map(w => {
      const alt = Object.keys(hints).find(k => w.startsWith(k));
      return alt ? [w, hints[alt]] : [w];
    });
  }
  function apply() {
    const t = terms(q.value);
    let shown = 0;
    cards.forEach(c => {
      const hay = c.dataset.hay;
      const ok = (kind === 'all' || c.dataset.themeKind === kind)
        && (cat === 'all' || c.dataset.cat === cat)
        && t.every(alts => alts.some(a => hay.includes(a)));
      c.hidden = !ok;
      if (ok) shown++;
    });
    groups.forEach(g => {
      const n = g.querySelectorAll('.card:not([hidden])').length;
      g.hidden = n === 0;
      g.querySelector('h2 span').textContent = n;
    });
    count.textContent = shown === total ? `Все ${total} стилей` : `Показано ${shown} из ${total}`;
    empty.hidden = shown !== 0;
    empty.querySelector('[data-q]').textContent = q.value.trim() ? `по запросу «${q.value.trim()}»` : 'с такими фильтрами';
  }
  function press(container, attr, value) {
    container.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset[attr] === value)));
  }
  document.getElementById('seg').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    kind = b.dataset.kind; press(e.currentTarget, 'kind', kind); apply();
  });
  document.getElementById('cats').addEventListener('click', e => {
    const b = e.target.closest('button'); if (!b) return;
    cat = b.dataset.cat; press(e.currentTarget, 'cat', cat); apply();
  });
  q.addEventListener('input', apply);
  document.getElementById('reset').addEventListener('click', () => {
    q.value = ''; kind = 'all'; cat = 'all';
    press(document.getElementById('seg'), 'kind', 'all');
    press(document.getElementById('cats'), 'cat', 'all');
    apply(); q.focus();
  });
  document.addEventListener('click', e => {
    const b = e.target.closest('.copy'); if (!b) return;
    const text = b.dataset.cmd;
    const done = () => {
      b.classList.add('done'); b.textContent = 'Скопировано';
      setTimeout(() => { b.classList.remove('done'); b.textContent = 'Скопировать команду'; }, 1600);
    };
    const fallback = () => {
      const code = b.parentElement.querySelector('.slug');
      code.textContent = text;
      const r = document.createRange(); r.selectNodeContents(code);
      const s = getSelection(); s.removeAllRanges(); s.addRange(r);
      b.textContent = 'Выделено, нажми ⌘C';
    };
    try {
      navigator.clipboard.writeText(text).then(done, fallback);
    } catch (err) { fallback(); }
  });
  apply();
})();
"""


def render(fragment: bool = False) -> str:
    """HTML галереи. fragment=True — без <!doctype>/<html> (для публикации как Artifact)."""
    styles = catalog.load()
    e = html.escape
    by_cat: "OrderedDict[str, list[Style]]" = OrderedDict()
    order = list(catalog.CATEGORY_RU.values()) + ["Другое"]
    for cat in order:
        items = [s for s in styles if s.category == cat]
        if items:
            by_cat[cat] = sorted(items, key=lambda s: s.name.lower())
    n_dark = sum(s.theme == "dark" for s in styles)

    cat_buttons = '<button type="button" data-cat="all" aria-pressed="true">Все</button>' + "".join(
        f'<button type="button" data-cat="{e(c)}" aria-pressed="false">{e(c)}</button>' for c in by_cat
    )
    sections = "".join(
        f'<section class="group" data-cat="{e(c)}"><h2>{e(c)} <span>{len(items)}</span></h2>'
        f'<div class="grid">{"".join(_card(s) for s in items)}</div></section>'
        for c, items in by_cat.items()
    )

    head = f"""<title>Библиотека стилей</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&family=JetBrains+Mono:wght@400;500&family=Unbounded:wght@500;700&display=swap">
<style>{CSS}</style>
"""
    content = f"""
<header class="top wrap">
  <h1>Библиотека стилей</h1>
  <p class="lede">Дизайн-системы, разобранные с реальных сайтов: палитра, типографика, сетка и компоненты.
  Выбери стиль, и дизайнер соберёт по нему лендинг, веб-презентацию, резюме, баннер или письмо.</p>
  <ul class="stats">
    <li><b>{len(styles)}</b> стилей</li>
    <li><b>{n_dark}</b> тёмных</li>
    <li><b>{len(styles) - n_dark}</b> светлых</li>
    <li><b>{len(by_cat)}</b> категорий</li>
  </ul>
</header>

<div class="toolbar">
  <div class="wrap">
    <div class="row1">
      <input id="q" class="search" type="search" placeholder="Поиск: тёмный, премиум, финтех, serif…" aria-label="Поиск по стилям" autocomplete="off">
      <div class="seg" id="seg" role="group" aria-label="Тема">
        <button type="button" data-kind="all" aria-pressed="true">Все</button>
        <button type="button" data-kind="dark" aria-pressed="false">Тёмные</button>
        <button type="button" data-kind="light" aria-pressed="false">Светлые</button>
      </div>
      <span class="count" id="count" aria-live="polite"></span>
    </div>
    <div class="cats" id="cats" role="group" aria-label="Категории">{cat_buttons}</div>
  </div>
</div>

<main class="wrap">
  {sections}
  <div class="empty" id="empty" hidden>
    <p>Ничего не нашлось <span data-q></span>. Попробуй другое слово или сбрось фильтры.</p>
    <button type="button" id="reset">Сбросить фильтры</button>
  </div>

  <section class="howto" aria-labelledby="howto-h">
    <h2 id="howto-h">Как заказать дизайн</h2>
    <div class="ways">
      <div class="way">
        <h3>В Telegram</h3>
        <p>Напиши боту бриф. Он предложит три стиля на выбор, а готовый HTML пришлёт файлом.</p>
        <pre>/design лендинг для студии моушн-дизайна</pre>
      </div>
      <div class="way">
        <h3>Из терминала</h3>
        <p>Стиль можно не указывать: Claude подберёт его под бриф.</p>
        <pre>python -m designer make "питчдек для фестиваля" --kind deck --style spotify</pre>
      </div>
      <div class="way">
        <h3>В GitHub Actions</h3>
        <p>Actions → Designer → Run workflow. Файл появится в артефактах запуска.</p>
        <pre>brief, kind, style, polish</pre>
      </div>
    </div>
  </section>
</main>

<footer class="wrap">
  Стили взяты из <a href="{UPSTREAM_URL}" target="_blank" rel="noopener">VoltAgent/awesome-design-md</a> (MIT).
  Это разборы дизайн-языка, без логотипов и товарных знаков: дизайнер заимствует только визуальные правила.
</footer>
<script>{JS}</script>
"""
    if fragment:
        return head + content
    return (
        '<!doctype html>\n<html lang="ru">\n<head>\n<meta charset="utf-8">\n'
        '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
        f"{head}</head>\n<body>\n{content}\n</body>\n</html>\n"
    )
