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

export const FACTIONS = {
  loyal: {
    unit: 'НАТЕЛЬНАЯ КАМЕРА 07', squad: 'ПИЛИГРИМЫ ОКОПОВ · НОВЫЙ АНТИОХ',
    intro: 'Держите окоп', introSub: 'Ад идёт волнами. Рассвет не обещан.',
    sleeve: [0.30, 0.28, 0.20], glove: [0.16, 0.11, 0.08],
    rusher: { model: 'ghoul', name: 'Гуль', hp: 120, speed: 4.6, dmg: 20 },
    shooter: { model: 'legion', name: 'Легионер', hp: 90, speed: 2.4, dmg: 24 },
  },
  heretic: {
    unit: 'НАТЕЛЬНАЯ КАМЕРА 13', squad: 'ЛЕГИОН ЕРЕТИКОВ · ЛЕТУЧИЙ ОТРЯД',
    intro: 'Возьмите окоп', introSub: 'Антиох шлёт своих фанатиков. Пусть идут.',
    sleeve: [0.08, 0.07, 0.07], glove: [0.05, 0.04, 0.04],
    rusher: { model: 'penitent', name: 'Кающийся', hp: 150, speed: 4.0, dmg: 22 },
    shooter: { model: 'antioch', name: 'Стрелок Антиоха', hp: 90, speed: 2.4, dmg: 24 },
  },
};
