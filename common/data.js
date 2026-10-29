// Shared fake game state for the UI concepts. Every concept renders the same data its own way,
// so the styles can be compared fairly. Nothing here talks to Roblox.
window.BL = (() => {
  const CUR = {
    coins:    { name: 'Монеты',   icon: '🪙', color: '#ffc93c' },
    gems:     { name: 'Гемы',     icon: '💎', color: '#5ac8ff' },
    crypto:   { name: 'Крипта',   icon: '₿',  color: '#ffaa28' },
    minerals: { name: 'Минералы', icon: '⛏', color: '#be96ff' },
    robux:    { name: 'Robux',    icon: 'R$', color: '#2ecc71' },
  };

  const RARITY = {
    common:    { name: 'Обычный',      color: '#9aa4ad' },
    rare:      { name: 'Редкий',       color: '#3d9bff' },
    epic:      { name: 'Эпический',    color: '#b25cff' },
    legendary: { name: 'Легендарный',  color: '#ffb020' },
    mythic:    { name: 'Мифический',   color: '#ff3d6e' },
  };

  const CATS = {
    tools:   { name: 'Инструменты', icon: '✂️' },
    boats:   { name: 'Лодки',       icon: '🚤' },
    weapons: { name: 'Оружие',      icon: '🔫' },
    build:   { name: 'Стройка',     icon: '🏗️' },
  };

  // stats: speed = скорость разминирования / хода, power = урон / доход, range = дальность
  const ITEMS = [
    { id: 'cut1',  cat: 'tools', name: 'Ржавые кусачки',     icon: '✂️', price: 0,     cur: 'coins', rarity: 'common',    stats: { speed: 20, power: 10, range: 10 }, desc: 'Стартовые. Режут провода… иногда.' },
    { id: 'cut2',  cat: 'tools', name: 'Стальные кусачки',   icon: '✂️', price: 500,   cur: 'coins', rarity: 'common',    stats: { speed: 35, power: 20, range: 15 }, desc: 'Мины жёлтой зоны режутся на 30% быстрее.' },
    { id: 'det1',  cat: 'tools', name: 'Металлоискатель',    icon: '📡', price: 1200,  cur: 'coins', rarity: 'rare',      stats: { speed: 30, power: 15, range: 45 }, desc: 'Пищит рядом с миной. Радиус 12 м.' },
    { id: 'cut3',  cat: 'tools', name: 'Лазерный резак',     icon: '🔦', price: 4500,  cur: 'coins', rarity: 'epic',      stats: { speed: 60, power: 45, range: 25 }, desc: 'Оранжевая зона без страха.' },
    { id: 'drone', cat: 'tools', name: 'Дрон-сапёр',         icon: '🛸', price: 15000, cur: 'coins', rarity: 'epic',      stats: { speed: 50, power: 40, range: 70 }, desc: 'Сам разминирует ближние мины, пока вы на базе.' },
    { id: 'cut4',  cat: 'tools', name: 'Плазменный нож',     icon: '⚡', price: 120,   cur: 'gems',  rarity: 'legendary', stats: { speed: 90, power: 80, range: 30 }, desc: 'Красные мины за 2 секунды.' },
    { id: 'raft',  cat: 'boats', name: 'Надувная лодка',     icon: '🛶', price: 0,     cur: 'coins', rarity: 'common',    stats: { speed: 25, power: 10, range: 20 }, desc: 'Тонет от одного выстрела. Но бесплатно.' },
    { id: 'motor', cat: 'boats', name: 'Моторный катер',     icon: '🚤', price: 800,   cur: 'coins', rarity: 'rare',      stats: { speed: 45, power: 25, range: 40 }, desc: 'Прочность 200. Доплывёт до соседа.' },
    { id: 'jet',   cat: 'boats', name: 'Гидроцикл',          icon: '🛥️', price: 6500,  cur: 'coins', rarity: 'epic',      stats: { speed: 75, power: 30, range: 55 }, desc: 'Самый быстрый путь к Острову сокровищ.' },
    { id: 'shark', cat: 'boats', name: 'Катер «Акула»',      icon: '🦈', price: 399,   cur: 'robux', rarity: 'mythic',    stats: { speed: 100, power: 90, range: 80 }, desc: 'Боевой катер с пушкой. Прочность 800.' },
    { id: 'sling', cat: 'weapons', name: 'Рогатка',          icon: '🪃', price: 0,     cur: 'coins', rarity: 'common',    stats: { speed: 40, power: 10, range: 35 }, desc: 'Против зомби-застройщиков сойдёт.' },
    { id: 'water', cat: 'weapons', name: 'Водомёт',          icon: '🔫', price: 2000,  cur: 'coins', rarity: 'rare',      stats: { speed: 60, power: 30, range: 40 }, desc: 'Сбивает с лодки. Перезарядка 3 с.' },
    { id: 'cannon', cat: 'weapons', name: 'Бортовая пушка',  icon: '💣', price: 12000, cur: 'coins', rarity: 'epic',      stats: { speed: 25, power: 85, range: 75 }, desc: 'Ставится на катер. Топит с двух залпов.' },
    { id: 'harp',  cat: 'weapons', name: 'Крипто-гарпун',    icon: '🔱', price: 3.5,   cur: 'crypto', rarity: 'legendary', stats: { speed: 55, power: 70, range: 90 }, desc: 'Техно-оружие. Притягивает чужую лодку.' },
    { id: 'house', cat: 'build', name: 'Домик',              icon: '🏠', price: 1000,  cur: 'coins', rarity: 'common',    stats: { speed: 0, power: 20, range: 0 }, desc: '+20 монет в минуту.' },
    { id: 'bridge', cat: 'build', name: 'Ремонт моста',      icon: '🌉', price: 1000,  cur: 'coins', rarity: 'rare',      stats: { speed: 0, power: 0, range: 100 }, desc: 'Открывает Заброшенный сектор: петы, верфь, портал.' },
    { id: 'farm',  cat: 'build', name: 'Майнинг-ферма',      icon: '🖥️', price: 8000,  cur: 'coins', rarity: 'epic',      stats: { speed: 0, power: 60, range: 0 }, desc: 'Даёт крипту. Её крадут в рейдах!' },
    { id: 'car',   cat: 'build', name: 'Спорткар',           icon: '🏎️', price: 20000, cur: 'coins', rarity: 'epic',      stats: { speed: 0, power: 40, range: 0 }, desc: 'Статус. Видно с соседних островов.' },
    { id: 'casino', cat: 'build', name: 'Казино',            icon: '🎰', price: 75000, cur: 'coins', rarity: 'legendary', stats: { speed: 0, power: 90, range: 0 }, desc: 'Крутите на базе. +500 монет/мин.' },
    { id: 'hole',  cat: 'build', name: 'Чёрная дыра',        icon: '🕳️', price: 1000000, cur: 'coins', rarity: 'mythic', stats: { speed: 0, power: 100, range: 0 }, desc: 'Засасывает всё. Эндгейм первого мира.' },
  ];

  const PETS = {
    cat:   { name: 'Котик-сапёр',      icon: '🐱', rarity: 'common',    mult: 1.1 },
    frog:  { name: 'Жаба-минёр',       icon: '🐸', rarity: 'common',    mult: 1.15 },
    dog:   { name: 'Пёс-нюхач',        icon: '🐶', rarity: 'rare',      mult: 1.3 },
    owl:   { name: 'Сова-радар',       icon: '🦉', rarity: 'rare',      mult: 1.4 },
    fox:   { name: 'Огненный лис',     icon: '🦊', rarity: 'epic',      mult: 1.8 },
    croc:  { name: 'Бронекрок',        icon: '🐊', rarity: 'epic',      mult: 2 },
    drag:  { name: 'Дракоша TNT',      icon: '🐲', rarity: 'legendary', mult: 3 },
    cyber: { name: 'Кибер-пёс',        icon: '🤖', rarity: 'legendary', mult: 3.5 },
    boss:  { name: 'Золотой дрон-босс', icon: '👾', rarity: 'mythic',   mult: 5 },
  };

  const EGGS = [
    { id: 'egg1', name: 'Обычное яйцо',  icon: '🥚', price: 1000, cur: 'coins', pool: { cat: 45, frog: 30, dog: 15, owl: 8, fox: 2 } },
    { id: 'egg2', name: 'Минное яйцо',   icon: '💣', price: 25,   cur: 'gems',  pool: { dog: 35, owl: 30, fox: 20, croc: 12, drag: 3 } },
    { id: 'egg3', name: 'Кибер-яйцо',    icon: '🧬', price: 99,   cur: 'robux', pool: { fox: 40, croc: 35, cyber: 20, boss: 5 } },
  ];

  const DONATE = [
    { id: 'pk1', kind: 'pack', name: 'Горсть монет',   icon: '🪙', give: { coins: 10000 },   price: 49 },
    { id: 'pk2', kind: 'pack', name: 'Мешок монет',    icon: '💰', give: { coins: 60000 },   price: 199, tag: 'Популярно' },
    { id: 'pk3', kind: 'pack', name: 'Сундук Зины',    icon: '🧰', give: { coins: 250000, gems: 50 }, price: 499, tag: '+25%' },
    { id: 'pk4', kind: 'pack', name: 'Хранилище',      icon: '🏦', give: { coins: 1500000, gems: 300 }, price: 1499, tag: 'Выгодно' },
    { id: 'gp1', kind: 'pass', name: 'x2 Монеты навсегда', icon: '✖️', price: 149, desc: 'Все монеты с мин удваиваются.' },
    { id: 'gp2', kind: 'pass', name: 'VIP-зона',       icon: '👑', price: 299, desc: 'Золотой ник, VIP-причал, +10% удачи в яйцах.' },
    { id: 'gp3', kind: 'pass', name: 'Авто-дрон',      icon: '🛸', price: 249, desc: 'Дрон разминирует, пока вы AFK.' },
    { id: 'gp4', kind: 'pass', name: 'Большой рюкзак', icon: '🎒', price: 99,  desc: '+20 слотов для сокровищ.' },
    { id: 'bs1', kind: 'boost', name: 'x10 доход · 15 мин', icon: '🚀', price: 79, desc: 'Ракетный буст на всё.' },
    { id: 'bs2', kind: 'boost', name: 'Сброс слоя мин', icon: '🧨', price: 25, desc: 'Мгновенно отключить следующий слой.' },
  ];

  const STATS = [
    { id: 'coins', name: 'Монеты' },
    { id: 'mines', name: 'Разминировано' },
    { id: 'kills', name: 'Зомби убито' },
    { id: 'gems',  name: 'Гемы' },
  ];
  const NAMES = ['MineLord_X', 'ZinaFan2012', 'BoomKid228', 'СапёрПро', 'KrabikRU', 'NoobMaster', 'Вы', 'TNT_Masha', 'IslandKing', 'ZombieSlayer', 'Pixel_Petya', 'Kusachki'];
  const RANKS = {};
  STATS.forEach((s, k) => {
    let v = [9e6, 2e5, 8e4, 4000][k];
    RANKS[s.id] = NAMES.map((n, i) => ({ name: n, value: Math.round(v * Math.pow(0.72, i) * (1 + ((i * 7 + k) % 5) / 40)), me: n === 'Вы' }));
  });

  const ZONES = [
    { name: 'Зелёная',  color: '#3ecf5a', reward: 25 },
    { name: 'Жёлтая',   color: '#ffd23c', reward: 120 },
    { name: 'Оранжевая', color: '#ff8a2a', reward: 600 },
    { name: 'Красная',  color: '#ff3b3b', reward: 3000 },
  ];

  const QUESTS = [
    { id: 'q1', text: 'Разминируй 10 мин', done: 7, need: 10, reward: '500 🪙' },
    { id: 'q2', text: 'Убей 5 зомби-застройщиков', done: 5, need: 5, reward: '5 💎' },
    { id: 'q3', text: 'Доплыви до Острова сокровищ', done: 0, need: 1, reward: '🗝️ Ключ' },
  ];

  const S = {
    coins: 12450, gems: 37, crypto: 4.25, minerals: 860, robux: 1250,
    kills: 128, mines: 342, rank: 7, zone: 1, pve: true, income: 340,
    owned: new Set(['cut1', 'raft', 'sling', 'cut2']),
    equipped: { tools: 'cut2', boats: 'raft', weapons: 'sling' },
    passes: new Set(),
    pets: [{ uid: 1, key: 'cat', eq: true }, { uid: 2, key: 'dog', eq: true }, { uid: 3, key: 'frog', eq: false }],
    petSlots: 3,
    treasureAt: Date.now() + 272000,
    raidAt: Date.now() + 41000,
  };
  let uid = 10;

  const subs = [];
  const emit = (what) => subs.forEach((f) => f(what || 'state'));

  function fmt(n) {
    if (n == null) return '0';
    if (!Number.isInteger(n)) return n.toFixed(2);
    if (n >= 1e9) return (n / 1e9).toFixed(n >= 1e10 ? 0 : 1).replace('.0', '') + 'B';
    if (n >= 1e6) return (n / 1e6).toFixed(n >= 1e7 ? 0 : 1).replace('.0', '') + 'M';
    if (n >= 1e4) return (n / 1e3).toFixed(n >= 1e5 ? 0 : 1).replace('.0', '') + 'K';
    return n.toLocaleString('ru-RU');
  }
  const full = (n) => (Number.isInteger(n) ? n.toLocaleString('ru-RU') : n.toFixed(2));
  const price = (o) => (o.price === 0 ? 'Бесплатно' : (o.cur === 'robux' ? 'R$ ' + full(o.price) : CUR[o.cur].icon + ' ' + full(o.price)));
  const mmss = (ms) => { const s = Math.max(0, Math.round(ms / 1000)); return Math.floor(s / 60) + ':' + String(s % 60).padStart(2, '0'); };
  const item = (id) => ITEMS.find((i) => i.id === id);
  const byCat = (cat) => ITEMS.filter((i) => i.cat === cat);
  const canAfford = (o) => S[o.cur] >= o.price;
  const petMult = () => S.pets.filter((p) => p.eq).reduce((m, p) => m * PETS[p.key].mult, 1);

  // Returns { ok, msg, equipped? }. Owned items get equipped instead.
  function buy(id) {
    const it = item(id);
    if (!it) return { ok: false, msg: 'Нет такого товара' };
    if (S.owned.has(id)) {
      if (it.cat === 'build') return { ok: false, msg: 'Уже построено' };
      S.equipped[it.cat] = id; emit('equip');
      return { ok: true, equipped: true, msg: it.name + ' — в руках' };
    }
    if (!canAfford(it)) return { ok: false, msg: 'Не хватает: ' + CUR[it.cur].name.toLowerCase() };
    S[it.cur] = +(S[it.cur] - it.price).toFixed(2);
    S.owned.add(id);
    if (it.cat !== 'build') S.equipped[it.cat] = id;
    if (it.cat === 'build') S.income += it.stats.power * 3;
    emit('buy');
    return { ok: true, msg: 'Куплено: ' + it.name };
  }

  function roll(pool) {
    const total = Object.values(pool).reduce((a, b) => a + b, 0);
    let r = Math.random() * total;
    for (const k in pool) { r -= pool[k]; if (r <= 0) return k; }
    return Object.keys(pool)[0];
  }
  // Returns { ok, msg, pets: [{uid,key,...PETS[key]}] }
  function hatch(eggId, count = 1) {
    const egg = EGGS.find((e) => e.id === eggId);
    const cost = egg.price * count;
    if (S[egg.cur] < cost) return { ok: false, msg: 'Не хватает: ' + CUR[egg.cur].name.toLowerCase() };
    S[egg.cur] -= cost;
    const got = [];
    for (let i = 0; i < count; i++) {
      const key = roll(egg.pool);
      const p = { uid: ++uid, key, eq: false };
      S.pets.push(p);
      got.push(Object.assign({ uid: p.uid, key }, PETS[key]));
    }
    emit('hatch');
    return { ok: true, pets: got };
  }
  function togglePet(u) {
    const p = S.pets.find((x) => x.uid === u);
    if (!p) return { ok: false };
    if (!p.eq && S.pets.filter((x) => x.eq).length >= S.petSlots) return { ok: false, msg: 'Все слоты заняты (' + S.petSlots + ')' };
    p.eq = !p.eq; emit('pets');
    return { ok: true };
  }

  // Robux purchases are simulated: the fake balance goes down and the reward is granted.
  function donate(id) {
    const d = DONATE.find((x) => x.id === id);
    if (d.kind === 'pass' && S.passes.has(id)) return { ok: false, msg: 'Уже куплено' };
    if (S.robux < d.price) return { ok: false, msg: 'Не хватает Robux (демо)' };
    S.robux -= d.price;
    if (d.give) for (const k in d.give) S[k] += d.give[k];
    if (d.kind === 'pass') S.passes.add(id);
    emit('donate');
    return { ok: true, msg: d.name + ' — получено!' };
  }

  function earn(n, cur = 'coins') { S[cur] += n; if (cur === 'coins') S.mines++; emit('earn'); }
  function togglePvE() { S.pve = !S.pve; emit('pve'); return S.pve; }

  // Defuse mini-game: n wire colours, left order and shuffled right order.
  const WIRE_COLORS = ['#ff3b3b', '#3d9bff', '#ffd23c', '#3ecf5a', '#c85cff', '#ff8a2a'];
  function wires(n = 4) {
    const left = WIRE_COLORS.slice(0, n);
    const right = left.slice().sort(() => Math.random() - 0.5);
    return { left, right };
  }

  setInterval(() => {
    const now = Date.now();
    if (S.treasureAt < now) S.treasureAt = now + 300000;
    if (S.raidAt < now) S.raidAt = now + 90000;
    emit('tick');
  }, 1000);

  return {
    S, CUR, RARITY, CATS, ITEMS, PETS, EGGS, DONATE, STATS, RANKS, ZONES, QUESTS,
    fmt, full, price, mmss, item, byCat, canAfford, petMult, buy, hatch, togglePet, donate, earn, togglePvE, wires,
    on: (f) => subs.push(f),
  };
})();
