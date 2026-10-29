// Viewer frame for a concept page: toolbar (gallery, prev/next, device size) + the fake game scene
// behind the HUD. The page puts its HUD inside <div id="stage">.
(() => {
  const CONCEPTS = [
    ['01-candy', 'Карамельный симулятор'],
    ['02-tactical', 'Полевой планшет сапёра'],
    ['03-brutal', 'Стикер-брутализм'],
    ['04-pixel', 'Пиксель-аркада'],
    ['05-holo', 'Голо-стекло'],
    ['06-mobile', 'Мобильная гача'],
    ['07-notebook', 'Тетрадка в клетку'],
    ['08-minimal', 'Минимал Про'],
    ['09-pirate', 'Пиратская таверна'],
    ['10-comic', 'Комикс БУМ!'],
  ];
  const DEVICES = { pc: [1280, 720, 'ПК 16:9'], phone: [844, 390, 'Телефон'], tablet: [1024, 768, 'Планшет'] };

  const file = location.pathname.split('/').pop().replace('.html', '');
  const idx = Math.max(0, CONCEPTS.findIndex((c) => c[0] === file));
  const stage = document.getElementById('stage');

  const scene = document.createElement('div');
  scene.className = 'scene';
  scene.innerHTML = `
    <div class="sky"></div><div class="sun"></div>
    <div class="far f1"></div><div class="far f2"></div><div class="far f3"></div>
    <div class="sea"></div>
    <div class="land"><div class="field"></div></div>
    <div class="house"><i></i></div><div class="shop-hut"><i></i></div>
    <div class="zombie"></div>
    <div class="hero"><b></b><i></i><u></u></div>`;
  stage.prepend(scene);

  const bar = document.createElement('div');
  bar.className = 'viewer-bar';
  const prev = CONCEPTS[(idx + CONCEPTS.length - 1) % CONCEPTS.length];
  const next = CONCEPTS[(idx + 1) % CONCEPTS.length];
  bar.innerHTML = `
    <a href="index.html" class="vb-btn">◀ Галерея</a>
    <a href="${prev[0]}.html" class="vb-btn" title="${prev[1]}">‹</a>
    <span class="vb-title">${String(idx + 1).padStart(2, '0')} / ${CONCEPTS.length} · ${CONCEPTS[idx][1]}</span>
    <a href="${next[0]}.html" class="vb-btn" title="${next[1]}">›</a>
    <span class="vb-gap"></span>
    ${Object.keys(DEVICES).map((d) => `<button class="vb-btn vb-dev" data-dev="${d}">${DEVICES[d][2]}</button>`).join('')}`;
  const embed = location.search.includes('embed');
  if (!embed) document.body.prepend(bar);

  let dev = 'pc';
  try { if (!embed) dev = localStorage.getItem('bl-ui-device') || 'pc'; } catch (e) {}
  if (!DEVICES[dev]) dev = 'pc';

  function fit() {
    const [w, h] = DEVICES[dev];
    stage.style.width = w + 'px';
    stage.style.height = h + 'px';
    stage.dataset.device = dev;
    const s = embed ? Math.min(innerWidth / w, innerHeight / h) : Math.min((innerWidth - 16) / w, (innerHeight - 60) / h, 1.6);
    if (embed) stage.style.top = '50%';
    stage.style.transform = `translate(-50%, -50%) scale(${s})`;
    bar.querySelectorAll('.vb-dev').forEach((b) => b.classList.toggle('on', b.dataset.dev === dev));
  }
  bar.addEventListener('click', (e) => {
    const b = e.target.closest('.vb-dev');
    if (!b) return;
    dev = b.dataset.dev;
    try { localStorage.setItem('bl-ui-device', dev); } catch (err) {}
    fit();
  });
  addEventListener('resize', fit);
  fit();
})();
