// Константы мира и настройки.
export const CELL = 2.0;          // ширина траншеи по дну, м
export const GW = 44, GH = 30;    // сетка участка фронта
export const WALL_H = 2.55;       // глубина окопа
export const CAM_H = 1.42;        // камера на груди
export const CAM_CROUCH = 0.92;
export const PR = 0.3;            // радиус игрока
export const MAG = 5;
export const FOV_HIP = 88, FOV_ADS = 66;

// Пресеты качества. scale — доля разрешения, остальное — тяжёлые эффекты.
export const QUALITY = {
  low:    { label: 'Низкое',  scale: 0.6,  terrainRes: 0.25,  msaa: 0, shadowSize: 512,  flareShadow: false, moonShadow: false, ao: false, volSteps: 10, lanterns: 3, rain: 2500, ssr: false, bloom: true },
  medium: { label: 'Среднее', scale: 0.8,  terrainRes: 0.18,  msaa: 0, shadowSize: 1024, flareShadow: false, moonShadow: true,  ao: true,  volSteps: 16, lanterns: 4, rain: 4000, ssr: true,  bloom: true },
  high:   { label: 'Высокое', scale: 1.0,  terrainRes: 0.14,  msaa: 4, shadowSize: 1024, flareShadow: true,  moonShadow: true,  ao: true,  volSteps: 24, lanterns: 6, rain: 6000, ssr: true,  bloom: true },
  ultra:  { label: 'Ультра',  scale: 1.0,  terrainRes: 0.11,  msaa: 4, shadowSize: 2048, flareShadow: true,  moonShadow: true,  ao: true,  volSteps: 32, lanterns: 6, rain: 9000, ssr: true,  bloom: true, hiDpi: true },
};

// ------------------------------------------------------------ правила книги для шутера
// Шанс попадания ИИ по ступеням кубиков (2d6, 7+): −2 → 17 %, −1 → 32 %, 0 → 58 %, +1 → 81 %, +2 → 91 % (стр. 15, 24–25).
export const DICE = { '-2': 0.17, '-1': 0.32, '0': 0.58, '1': 0.81, '2': 0.91 };
export const diceChance = (step) => DICE[String(Math.max(-2, Math.min(2, Math.round(step))))];
// Броня врагов заложена в запас hp по полосам (GAME_MAPPING §1.5): 0 — 60–90, −1 — 130–175, −2 — 180–230, −3 — 235–255.
// Потолок такой, чтобы выстрел в голову (крит) убивал всегда. IGNORE ARMOUR этот запас пробивает.
export const MAX_BLOOD = 6;      // маркеры крови (стр. 19)
export const INCH = 2.5;         // 1″ на столе ≈ 2,5 м в окопе

// Архетипы ИИ: shooter — держит дистанцию и стреляет; rusher — бежит в рукопашную;
// heavy — стреляет только с места (HEAVY) и долго перезаряжается (RELOAD); sniper — бьёт издалека после долгого прицеливания;
// bomber — смертник с зарядом мученика.
// ranged — ступень кубиков для стрельбы, armour — ступень брони, range — дальность оружия в метрах.
export const FACTIONS = {
  loyal: {
    unit: 'НАТЕЛЬНАЯ КАМЕРА 07', squad: 'ОКОПНЫЕ ПИЛИГРИМЫ · НОВЫЙ АНТИОХ',
    intro: 'Держите окоп', introSub: 'Легионы Ада идут с Ничьей земли. Рассвет не обещан.',
    sleeve: [0.30, 0.28, 0.20], glove: [0.16, 0.11, 0.08],
    weapon: { name: 'Винтовка со скользящим затвором', mag: 5, reserve: 40, dmg: 110, interval: 0.95, bolt: true, perRound: 0.42, spread: 0.032, kick: 0.054 },
    grenade: { name: 'Святая граната', count: 2, radius: 5, dmg: 130, fuse: 2.0, los: true, holy: true, color: [12, 9, 5] },
    raidRelic: 'Нечестивая реликвия Легиона',
    units: {
      trooper: { name: 'Еретик-пехотинец', model: 'legion', ai: 'shooter', hp: 90, armour: 0, speed: 2.4, dmg: 24, ranged: 0, range: 60, fireCd: [1.9, 3.0], aim: 1.0, pages: '26–27, 43, 71',
        desc: 'Рядовой Легионов Еретиков. Стреляет из винтовки со скользящим затвором, многие носят нечестивые талисманы. Брони нет: хватает одного попадания в корпус.' },
      wretched: { name: 'Отверженный', model: 'wretched', ai: 'rusher', hp: 70, armour: 0, speed: 4.3, dmg: 16, reach: 1.5, atkCd: 1.1, pages: '106, 131',
        desc: 'Раб Легионов в железной маске и цепях, с окопной дубинкой. Дешёвое мясо волны: идёт толпой и в элиту никогда не растёт.' },
      fiend: { name: 'Изверг в ярме', model: 'fiend', ai: 'rusher', hp: 140, armour: 0, speed: 4.8, dmg: 22, reach: 1.6, atkCd: 1.0, fear: true, demonic: true, pages: '106, 138',
        desc: 'Изверг из отрядов Двора Семиглавого Змея. Их держат в колючих намордниках; книга называет их злобными (Hateful) и способными к дальней атаке, но природу не раскрывает. В игре это допущение: демон-рукопашник со СТРАХОМ (штыком по нему труднее попасть), и святая граната жжёт его сильнее.' },
      gunner: { name: 'Пулемётчик Легиона', model: 'legion_gunner', ai: 'heavy', hp: 170, armour: -1, speed: 1.6, dmg: 14, ranged: 0, range: 90, burst: 3, burstGap: 0.13, reload: 3.6, aim: 0.7, scale: 1.06, pages: '72, 80, 155',
        desc: 'Пулемёт: очередь по три пули, но стрелять можно только с места (HEAVY), а после очереди долгая перезарядка (RELOAD). Это и есть ваше окно. Стандартная броня: в корпус нужно два попадания, в голову — одно.' },
      veteran: { name: 'Ветеран в броне Кобара', model: 'legion_veteran', ai: 'rusher', hp: 250, armour: -3, speed: 3.6, dmg: 30, reach: 1.9, atkCd: 1.5, cleave: true, tough: true, leader: true, scale: 1.12, pages: '128, 133',
        desc: 'Элита Легионов: броня Кобара (−3) и топор палача с двойным ударом (CLEAVE 2). Командир отряда: пока жив, отряд держит строй. В корпус нужно три попадания, и после них он ещё раз встаёт (TOUGH). Выстрел в голову убивает сразу.' },
    },
    // отряды волны: [стоимость, с какой волны, состав]
    squads: [
      { cost: 4, from: 1, units: ['trooper', 'trooper', 'trooper'] },
      { cost: 4, from: 1, units: ['wretched', 'wretched', 'wretched', 'wretched'] },
      { cost: 5, from: 2, units: ['fiend', 'wretched', 'wretched'] },
      { cost: 5, from: 2, units: ['fiend', 'fiend'] },
      { cost: 6, from: 3, units: ['gunner', 'trooper', 'trooper'] },
      { cost: 8, from: 4, units: ['veteran', 'wretched', 'wretched', 'trooper'] },
    ],
  },
  heretic: {
    unit: 'НАТЕЛЬНАЯ КАМЕРА 13', squad: 'ЛЕГИОНЫ ЕРЕТИКОВ · ЛЕТУЧИЙ ОТРЯД',
    intro: 'Возьмите окоп', introSub: 'Новый Антиох шлёт своих фанатиков. Пусть идут.',
    sleeve: [0.08, 0.07, 0.07], glove: [0.05, 0.04, 0.04],
    weapon: { name: 'Полуавтоматическая винтовка Марбаса', mag: 10, reserve: 40, dmg: 100, interval: 0.3, bolt: false, magReload: 2.3, spread: 0.036, kick: 0.032 },
    grenade: { name: 'Граната демонической ауры', count: 1, radius: 7.5, dmg: 80, fuse: 2.2, los: false, ignoreArmour: true, noDebris: true, color: [3, 10, 2.5] },
    raidRelic: 'Святая реликвия Нового Антиоха',
    units: {
      yeoman: { name: 'Йомен Нового Антиоха', model: 'antioch', ai: 'shooter', hp: 90, armour: 0, speed: 2.4, dmg: 24, ranged: 0, range: 60, fireCd: [1.9, 3.0], aim: 1.0, pages: '71, 116',
        desc: 'Рядовой пехотинец Княжества с винтовкой, рабочей лошадкой Великой войны. Брони нет: хватает одного попадания в корпус.' },
      castigator: { name: 'Бичеватель', model: 'castigator', ai: 'rusher', hp: 150, armour: -1, speed: 4.0, dmg: 22, reach: 1.9, atkCd: 0.9, pages: '13, 40, 48, 76',
        desc: 'Окопный пилигрим в железном шлеме с окулярами противогаза. Бич Церкви бьёт широкой дугой (+1 DICE), от него трудно уйти. Стандартная броня: в корпус нужно два попадания, в голову — одно.' },
      prisoner: { name: 'Церковный узник', model: 'prisoner', ai: 'bomber', hp: 60, armour: 0, speed: 4.6, dmg: 70, reach: 2.6, blast: 5, pages: '106, 142',
        desc: 'Смертник в цепях с устройством мученика на груди. Подбегает и взрывается. Убитый, он тоже может рвануть, задевая своих. Стреляйте издалека.' },
      shock: { name: 'Штурмовик', model: 'antioch_shock', ai: 'shooter', hp: 150, armour: -1, speed: 3.2, dmg: 12, ranged: 0, range: 40, burst: 4, burstGap: 0.08, fireCd: [1.2, 1.8], aim: 0.5, fireOnMove: true, leader: true, pages: '74, 139',
        desc: 'Штурмовые войска с пистолетом-пулемётом: короткие очереди (Quick Bursts), после стрельбы может сразу броситься в рукопашную (ASSAULT). В игре стреляет не останавливаясь — это допущение. Командир отряда. Стандартная броня.' },
      sniper: { name: 'Снайпер-священник', model: 'antioch_sniper', ai: 'sniper', hp: 80, armour: 0, speed: 1.8, dmg: 45, ranged: 1, range: 120, aim: 2.6, fireCd: [3.0, 4.0], critical: true, pages: '74, 140',
        desc: 'Священник с винтовкой, в прицел которой встроен реликварий. Целится долго, и блик оптики выдаёт его. Попадает чаще обычного (+1 DICE) и на любой дистанции, критует сильнее (CRITICAL).' },
      communicant: { name: 'Коммуникант', model: 'communicant', ai: 'heavy', hp: 230, armour: -2, speed: 1.6, dmg: 45, ranged: 0, range: 90, burst: 1, burstGap: 0, reload: 3.2, aim: 1.6, tough: true, critical: true, scale: 1.25, pages: '10, 70, 111',
        desc: 'Сверхъестественно сильный боец с противоматериальным ружьём (HEAVY, CRITICAL, IGNORE ARMOUR). Стреляет только с места, и попадание сбивает с ног. Броня −2: в корпус нужно три попадания, и он ещё раз встаёт (TOUGH). Выстрел в голову убивает сразу.' },
    },
    squads: [
      { cost: 4, from: 1, units: ['yeoman', 'yeoman', 'yeoman'] },
      { cost: 5, from: 1, units: ['castigator', 'castigator', 'prisoner'] },
      { cost: 5, from: 2, units: ['shock', 'shock', 'yeoman'] },
      { cost: 3, from: 2, units: ['prisoner', 'prisoner'] },
      { cost: 4, from: 3, units: ['sniper', 'yeoman'] },
      { cost: 8, from: 4, units: ['communicant', 'yeoman', 'yeoman', 'castigator'] },
    ],
  },
};

// ------------------------------------------------------------ задания
export const MISSIONS = {
  hold: { name: 'Удержать до рассвета', waves: 6, brief: 'Шесть атак до рассвета. Газ и обстрел — по ходу ночи.' },
  raid: { name: 'Ночной рейд', brief: 'Спрыгните во вражескую сапу, найдите реликвию в блиндаже и вернитесь. Фонарь выдаёт вас.' },
  endless: { name: 'Бесконечная ночь', brief: 'Волна за волной, пока не кончится плёнка.' },
};
