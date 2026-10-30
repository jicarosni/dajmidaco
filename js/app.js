(function () {
  'use strict';
  const P = window.PRIZES;
  const $ = (id) => document.getElementById(id);
  const strip = $('strip'), reel = $('reel'), spinBtn = $('spinBtn'), lever = $('lever'), result = $('result');
  const overlay = $('overlay'), card = $('card'), yesBtn = $('yesBtn'), noBtn = $('noBtn'), taunt = $('taunt');
  const askBtns = $('askBtns'), done = $('done'), doneText = $('doneText'), againBtn = $('againBtn');
  const histList = $('historyList'), muteBtn = $('muteBtn');
  const reduced = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  // preload obrázkov
  P.forEach(p => { const i = new Image(); i.src = p.img; });

  const rnd = (n) => {
    if (window.crypto && crypto.getRandomValues) { const a = new Uint32Array(1); crypto.getRandomValues(a); return a[0] % n; }
    return Math.floor(Math.random() * n);
  };

  function tileHTML(p) {
    return '<div class="tile' + (p.big ? ' big' : '') + '"><img src="' + p.img + '" alt="" draggable="false"><span>' + p.name + '</span></div>';
  }

  // ---------- Valec ----------
  let tileH = 0, offset = 0, spinning = false, current = null, lastIdx = -1;
  let seq = [];                 // poradie výhier na páse

  function buildStrip(targetIdx, count) {
    seq = [];
    // náhodný pás, ktorý nekončí dvomi rovnakými vedľa seba
    for (let i = 0; i < count; i++) {
      let k; do { k = rnd(P.length); } while (seq.length && k === seq[seq.length - 1]);
      seq.push(k);
    }
    return seq;
  }
  function render(keepTop) {
    strip.innerHTML = seq.map(i => tileHTML(P[i])).join('');
    measure();
  }
  function measure() {
    const t = strip.querySelector('.tile');
    tileH = t ? t.getBoundingClientRect().height : 120;
  }
  function setY(y) { strip.style.transform = 'translate3d(0,' + (-y) + 'px,0)'; }
  // index v strede okna = pozícia / tileH + 1 (okno ukazuje 3 dlaždice)
  function centerY(i) { return (i - 1) * tileH; }

  // úvodný pás
  buildStrip(0, 3 + P.length); render(); setY(centerY(1));
  let restIndex = 1;
  window.addEventListener('resize', () => { if (!spinning) { measure(); setY(centerY(restIndex)); } });

  function easeOutQuint(t) { return 1 - Math.pow(1 - t, 5); }
  function easeOutBackish(t) { // mierny prekmit na konci
    const c1 = 0.9, c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  }

  function spin() {
    if (spinning) return;
    Sound.unlock();
    spinning = true;
    spinBtn.disabled = true; lever.classList.add('pulled');
    setTimeout(() => lever.classList.remove('pulled'), 500);
    Sound.lever();
    result.classList.remove('win');
    result.textContent = 'Točí sa… držme palce! 🤞';
    document.body.classList.add('is-spinning');

    // zachovaj momentálne viditeľné 3 dlaždice navrchu, aby to neskákalo
    const keep = [seq[restIndex - 1], seq[restIndex], seq[restIndex + 1]];
    let target; do { target = rnd(P.length); } while (P.length > 1 && target === lastIdx && rnd(3) > 0);
    lastIdx = target;
    const loops = reduced ? 8 : 34 + rnd(12);
    const rest = buildStrip(0, loops);
    seq = keep.concat(rest);
    const stopAt = seq.length;            // index výhry
    seq.push(target, (target + 1 + rnd(P.length - 1)) % P.length);
    // sused nad výhrou nemá byť rovnaký
    if (seq[stopAt - 1] === target) seq[stopAt - 1] = (target + 3) % P.length;
    render();
    setY(centerY(1));
    const from = centerY(1), to = centerY(stopAt);
    const dur = reduced ? 900 : 4200 + rnd(1200);
    const t0 = performance.now();
    let lastTick = Math.floor(from / tileH);

    function frame(now) {
      const t = Math.min(1, (now - t0) / dur);
      // 0–92 %: hlavné spomaľovanie, posledných 8 %: jemný prekmit späť
      let e;
      if (t < 0.9) e = easeOutQuint(t / 0.9) * 1.004;
      else e = 1.004 - 0.004 * easeOutBackish((t - 0.9) / 0.1);
      const y = from + (to - from) * e;
      setY(y);
      const v = Math.abs((to - from) * (1 - t));
      reel.style.setProperty('--blur', Math.min(6, v / tileH / 6).toFixed(2) + 'px');
      const tick = Math.floor((y + tileH / 2) / tileH);
      if (tick !== lastTick) { lastTick = tick; Sound.tick(); }
      if (t < 1) requestAnimationFrame(frame);
      else finish(stopAt);
    }
    requestAnimationFrame(frame);
  }

  function finish(i) {
    setY(centerY(i));
    reel.style.setProperty('--blur', '0px');
    restIndex = i;
    spinning = false;
    document.body.classList.remove('is-spinning');
    current = P[seq[i]];
    Sound.stop();
    const tiles = strip.querySelectorAll('.tile');
    tiles[i] && tiles[i].classList.add('hit');
    result.classList.add('win');
    result.innerHTML = '🎉 Vyhral si: <b>' + current.name + '</b><small>' + current.sub + '</small>';
    const r = reel.getBoundingClientRect();
    Confetti.burst(current.big ? 220 : 120, r.left + r.width / 2, r.top + r.height / 2);
    if (current.big) { Confetti.rain(30); Sound.jackpot(); } else Sound.win();
    addHistory(current, null);
    setTimeout(openAsk, reduced ? 300 : 1300);
  }

  // ---------- Dialóg „Stenly, dám ti dačo?" ----------
  let dodgesLeft = 0, answered = false, lastDodge = 0;
  const lines = ['Ups! Skoro! 😜', 'Ha, netrafil si! 😂', 'Príliš pomalý, Stenly! 🐌', 'Ešte raz, ešte raz! 🙈', 'Kam ideš? Tu som! 👋', 'Čo si myslel? 😏'];
  const noLines = ['Ako nie?! 😤', 'Čo, nechceš? No tak ešte raz! 🙄', 'Nie sa neberie! 😠', 'Zlá odpoveď, Stenly! ❌'];

  function openAsk() {
    answered = false;
    dodgesLeft = 2 + rnd(2);                          // 2 alebo 3 úteky
    card.dataset.dodges = dodgesLeft;
    $('askImg').src = current.img; $('askImg').alt = current.name;
    $('askPrize').textContent = current.name;
    taunt.innerHTML = '&nbsp;';
    askBtns.hidden = false; done.hidden = true;
    resetYes();
    overlay.hidden = false;
    requestAnimationFrame(() => overlay.classList.add('show'));
    setTimeout(() => noBtn.focus({ preventScroll: true }), 50);
  }
  function closeAsk() {
    overlay.classList.remove('show');
    resetYes();
    setTimeout(() => { overlay.hidden = true; }, 200);
  }
  function resetYes() {
    yesBtn.classList.remove('runaway', 'tamed');
    yesBtn.style.left = yesBtn.style.top = '';
    if (yesBtn.parentNode !== askBtns) askBtns.insertBefore(yesBtn, noBtn);
  }

  function dodge(px, py) {
    if (answered || dodgesLeft <= 0) return false;
    const now = performance.now();
    if (now - lastDodge < 120) return true;           // proti dvojitému spusteniu (touch + pointer)
    lastDodge = now;
    dodgesLeft--;
    card.dataset.dodges = dodgesLeft;
    const vw = (window.visualViewport ? visualViewport.width : innerWidth);
    const vh = (window.visualViewport ? visualViewport.height : innerHeight);
    const b = yesBtn.getBoundingClientRect();
    const bw = b.width, bh = b.height, m = 14;
    if (yesBtn.parentNode !== document.body) {
      // vytiahni tlačidlo do <body>, aby position:fixed fungovalo voči oknu
      yesBtn.style.left = b.left + 'px'; yesBtn.style.top = b.top + 'px';
      yesBtn.classList.add('runaway');
      document.body.appendChild(yesBtn);
      void yesBtn.offsetWidth;
    }
    const cx0 = b.left + bw / 2, cy0 = b.top + bh / 2;
    let x, y, tries = 0, best = null, bestD = -1;
    do {
      x = m + Math.random() * Math.max(1, vw - bw - 2 * m);
      y = m + Math.random() * Math.max(1, vh - bh - 2 * m);
      const dx = x + bw / 2 - (px == null ? cx0 : px), dy = y + bh / 2 - (py == null ? cy0 : py);
      const d = Math.hypot(dx, dy);
      if (d > bestD) { bestD = d; best = [x, y]; }
      tries++;
    } while (tries < 12);
    yesBtn.style.left = best[0] + 'px'; yesBtn.style.top = best[1] + 'px';
    Sound.boing();
    if (dodgesLeft > 0) {
      taunt.textContent = lines[rnd(lines.length)];
    } else {
      taunt.textContent = 'No dobre, dobre… už ťa nechám kliknúť. 🙄';
      yesBtn.classList.add('tamed');
    }
    return true;
  }

  // Desktop: myš sa priblíži / vojde na tlačidlo
  yesBtn.addEventListener('pointerenter', (e) => { if (e.pointerType === 'mouse') dodge(e.clientX, e.clientY); });
  document.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse' || overlay.hidden || dodgesLeft <= 0 || answered) return;
    const b = yesBtn.getBoundingClientRect();
    const dx = Math.max(b.left - e.clientX, 0, e.clientX - b.right);
    const dy = Math.max(b.top - e.clientY, 0, e.clientY - b.bottom);
    if (Math.hypot(dx, dy) < 26) dodge(e.clientX, e.clientY);
  });
  // Mobil: dotyk – tlačidlo ujde skôr, ako sa stihne kliknúť
  yesBtn.addEventListener('touchstart', (e) => {
    const recent = performance.now() - lastDodge < 400;   // pointerdown už mohol uskočiť
    if ((dodgesLeft > 0 || recent) && !answered) {
      e.preventDefault();
      if (!recent) { const t = e.touches[0]; dodge(t.clientX, t.clientY); }
    }
  }, { passive: false });
  yesBtn.addEventListener('pointerdown', (e) => {
    if (e.pointerType !== 'mouse' && dodgesLeft > 0 && !answered) { e.preventDefault(); dodge(e.clientX, e.clientY); }
  });
  // Klik (aj klávesnica): ak ešte má utekať, utečie
  yesBtn.addEventListener('click', (e) => {
    if (dodgesLeft > 0) { e.preventDefault(); dodge(); return; }
    if (answered) return;
    if (performance.now() - lastDodge < 400) return;      // klik z toho istého ťuknutia, ktorým ušlo
    answered = true;
    Sound.yay();
    resetYes();
    askBtns.hidden = true; done.hidden = false;
    taunt.textContent = 'Konečne! 😎';
    doneText.innerHTML = 'Hotovo, Stenly! Výhra je tvoja:<br><b>' + current.name + '</b>';
    Confetti.burst(200); Confetti.rain(25);
    markHistory('ano');
    result.innerHTML = '✅ Stenly prijal: <b>' + current.name + '</b><small>Daj si ešte jedno kolo!</small>';
    setTimeout(() => againBtn.focus({ preventScroll: true }), 50);
  });

  noBtn.addEventListener('click', () => {
    if (answered) return;
    answered = true;
    Sound.buzz();
    taunt.textContent = noLines[rnd(noLines.length)] + ' Točíme znova!';
    card.classList.remove('shake'); void card.offsetWidth; card.classList.add('shake');
    if (navigator.vibrate) navigator.vibrate([80, 40, 80]);
    markHistory('nie');
    setTimeout(() => { card.classList.remove('shake'); closeAsk(); spinBtn.disabled = false; setTimeout(spin, 250); }, 1500);
  });

  againBtn.addEventListener('click', () => { closeAsk(); spinBtn.disabled = false; setTimeout(spin, 220); });
  overlay.addEventListener('keydown', (e) => { if (e.key === 'Escape') { e.preventDefault(); noBtn.click(); } });

  // ---------- História ----------
  const HKEY = 'dmd-history';
  let hist = [];
  try { hist = JSON.parse(localStorage.getItem(HKEY) || '[]'); } catch (e) { hist = []; }
  function saveHist() { try { localStorage.setItem(HKEY, JSON.stringify(hist.slice(0, 10))); } catch (e) {} }
  function addHistory(p, ans) { hist.unshift({ id: p.id, t: Date.now(), a: ans }); hist = hist.slice(0, 10); saveHist(); drawHist(); }
  function markHistory(a) { if (hist[0]) hist[0].a = a; saveHist(); drawHist(); }
  function drawHist() {
    if (!hist.length) { histList.innerHTML = '<li class="empty">Zatiaľ nič. Ako u nás na úrade.</li>'; return; }
    histList.innerHTML = hist.map(h => {
      const p = P.find(x => x.id === h.id); if (!p) return '';
      const d = new Date(h.t);
      const tm = d.toLocaleTimeString('sk-SK', { hour: '2-digit', minute: '2-digit' });
      const badge = h.a === 'ano' ? '<em class="ok">prijal ✅</em>' : h.a === 'nie' ? '<em class="ko">odmietol ❌</em>' : '<em>čaká…</em>';
      return '<li><img src="' + p.img + '" alt=""><span><b>' + p.name + '</b>' + badge + '</span><time>' + tm + '</time></li>';
    }).join('');
  }
  $('clearHistory').addEventListener('click', () => { hist = []; saveHist(); drawHist(); });
  drawHist();

  // ---------- Ovládanie ----------
  spinBtn.addEventListener('click', spin);
  lever.addEventListener('click', spin);
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space' && overlay.hidden && document.activeElement === document.body) { e.preventDefault(); spin(); }
  });
  function drawMute() { const m = Sound.isMuted(); muteBtn.textContent = m ? '🔇' : '🔊'; muteBtn.setAttribute('aria-pressed', m ? 'true' : 'false'); muteBtn.title = m ? 'Zapnúť zvuk' : 'Stlmiť zvuk'; }
  muteBtn.addEventListener('click', () => { Sound.setMuted(!Sound.isMuted()); drawMute(); });
  drawMute();

  // žiarovky okolo automatu
  const bulbs = document.querySelector('.bulbs');
  bulbs.innerHTML = Array.from({ length: 22 }, (_, i) => '<i style="--i:' + i + '"></i>').join('');

  // pre testy
  window.__dmd = { get dodgesLeft() { return dodgesLeft; }, get current() { return current; }, get spinning() { return spinning; } };
})();
