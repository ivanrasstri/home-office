// Необязательный приватный контент (арты из книги правил, музыка). В публичном репозитории его нет:
// игра работает и без него, просто без иллюстраций и с генеративной музыкой.
import { LORE } from './lore-data.js';
import { FACTIONS } from './config.js';
import { $ } from './util.js';

export const CONTENT = { base: (window.TRENCH_PRIVATE_BASE || 'assets-private/'), art: new Set(), music: null };

export async function loadContent() {
  try {
    const m = await fetch(CONTENT.base + 'manifest.json');
    if (!m.ok) return;
    const man = await m.json();
    CONTENT.music = man.music || null;
    if (man.art) { const r = await fetch(CONTENT.base + 'art/catalog.json'); if (r.ok) for (const c of await r.json()) CONTENT.art.add(c.id); }
  } catch (e) { /* приватной папки нет — это нормально */ }
}
export const artUrl = (id) => (id && CONTENT.art.has(id) ? `${CONTENT.base}art/${id}.webp` : null);
export const musicUrl = () => (CONTENT.music ? CONTENT.base + CONTENT.music : null);

// ------------------------------------------------------------ фоны и подсказки
export function pick(list, salt = 0) { return list[(Math.floor(Math.random() * list.length) + salt) % list.length]; }
export function applyMenuArt() {
  const id = (LORE.art.menu_bg || []).find((a) => CONTENT.art.has(a));
  const url = artUrl(id);
  if (url) document.documentElement.style.setProperty('--menu-art', `url("${url}")`);
}
export function setLoadingArt() {
  const ids = (LORE.art.loading || []).filter((a) => CONTENT.art.has(a));
  const tip = pick(LORE.loading_tips);
  const art = (tip.art && CONTENT.art.has(tip.art)) ? tip.art : (ids.length ? pick(ids) : null);
  const el = $('load-art');
  if (el) { el.style.backgroundImage = art ? `url("${artUrl(art)}")` : 'none'; el.classList.toggle('has-art', !!art); }
  const t = $('load-tip'); if (t) t.textContent = tip.text;
}
export function tipText() { return pick(LORE.loading_tips).text; }

// ------------------------------------------------------------ архив (кодекс)
const GROUPS = [['foes', 'Противник в игре'], ['world', 'Мир'], ['faithful', 'Верные'], ['heretic', 'Еретики'], ['other', 'Прочие силы'], ['arms', 'Арсенал']];
// карточки врагов из ростера: что это за отряд по книге и как с ним воевать
const FOE_ART = { trooper: 'p043_81', wretched: 'p006_20', fiend: 'p111_126', castigator: 'p021_38', sniper: 'p008_25', yeoman: 'p148_136', veteran: 'p148_136' };
const AI_RU = { shooter: 'стрелок', rusher: 'рукопашник', heavy: 'тяжёлое оружие', sniper: 'снайпер', bomber: 'смертник' };
function foeEntries() {
  const out = [];
  for (const [side, label] of [['loyal', 'против Верных'], ['heretic', 'против Еретиков']]) {
    for (const [key, u] of Object.entries(FACTIONS[side].units)) {
      const armour = u.armour ? `броня ${String(u.armour).replace('-', '−')}` : 'без брони';
      out.push({ id: 'foe_' + key, group: 'foes', title: u.name, art: FOE_ART[key] || '', source_pages: u.pages,
        text: `${u.desc}\n\nВ игре: ${AI_RU[u.ai] || u.ai}, ${armour}, ${label}.` });
    }
  }
  return out;
}
export function buildCodex() {
  const list = $('codex-list'); if (!list) return;
  list.innerHTML = '';
  if (!LORE.codex.some((c) => c.group === 'foes')) LORE.codex.push(...foeEntries());
  for (const [g, title] of GROUPS) {
    const items = LORE.codex.filter((c) => c.group === g);
    if (!items.length) continue;
    const h = document.createElement('div'); h.className = 'cx-group'; h.textContent = title; list.append(h);
    for (const c of items) {
      const b = document.createElement('button');
      b.type = 'button'; b.className = 'cx-item'; b.textContent = c.title; b.dataset.id = c.id;
      b.addEventListener('click', () => showEntry(c.id));
      list.append(b);
    }
  }
  showEntry(LORE.codex.find((c) => c.group === 'world').id);
}
function showEntry(id) {
  const c = LORE.codex.find((x) => x.id === id); if (!c) return;
  for (const b of document.querySelectorAll('.cx-item')) b.classList.toggle('on', b.dataset.id === id);
  $('cx-title').textContent = c.title;
  $('cx-text').textContent = c.text;
  $('cx-src').textContent = c.source_pages ? `Книга правил, стр. ${c.source_pages}` : '';
  const url = artUrl(c.art);
  const img = $('cx-art');
  img.hidden = !url;
  if (url) { img.src = url; img.alt = c.title; }
}
