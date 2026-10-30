/* Jednoduché zvuky cez WebAudio, žiadne súbory. */
window.Sound = (function () {
  let ctx = null;
  let muted = localStorage.getItem('dmd-muted') === '1';
  function ac() {
    if (muted) return null;
    if (!ctx) {
      const C = window.AudioContext || window.webkitAudioContext;
      if (!C) return null;
      ctx = new C();
    }
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }
  function tone(freq, dur, type, vol, when, slideTo) {
    const c = ac(); if (!c) return;
    const t = c.currentTime + (when || 0);
    const o = c.createOscillator(), g = c.createGain();
    o.type = type || 'square';
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(vol || 0.08, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(c.destination);
    o.start(t); o.stop(t + dur + 0.02);
  }

  /* ---------- Hip-hopový beat (vlastný, G-funk štýl, 92 BPM, 4 takty ≈ 10,4 s v slučke) ---------- */
  const BPM = 92, STEP = 60 / BPM / 4, SWING = 0.028;
  const mtof = (m) => 440 * Math.pow(2, (m - 69) / 12);
  // 4 takty × 16 šestnástin. Všetko vlastné, žiadna známa melódia.
  const KICK  = [[0, 7, 10], [0, 3, 8, 10], [0, 7, 10, 13], [0, 3, 8, 11, 14]];
  const SNARE = [4, 12];
  const BASS = [ // [krok, midi, dĺžka v krokoch]
    [[0, 43, 3], [3, 43, 2], [6, 50, 2], [10, 43, 3], [14, 46, 2]],   // Gm
    [[0, 39, 3], [3, 39, 2], [6, 46, 2], [10, 39, 3], [14, 41, 2]],   // Eb
    [[0, 36, 3], [3, 36, 2], [6, 43, 2], [10, 36, 3], [14, 39, 2]],   // Cm
    [[0, 38, 3], [3, 38, 2], [6, 45, 2], [8, 42, 2], [10, 38, 4]]     // D
  ];
  const PAD = [[55, 58, 62], [51, 55, 58], [48, 51, 55], [50, 54, 57]];
  const LEAD = [ // vysoký „kvíliaci" syntezátor s glissandom
    [[0, 86, 6], [8, 84, 2], [10, 82, 6]],
    [[0, 79, 10], [12, 77, 2], [14, 79, 2]],
    [[0, 82, 4], [4, 84, 4], [8, 86, 8]],
    [[0, 81, 6], [6, 79, 2], [8, 78, 4], [12, 79, 4]]
  ];
  let beat = null;      // { master, timer, next, step, lastLead }
  let beatWanted = false;
  let noiseBuf = null;

  function noise(c) {
    if (!noiseBuf) {
      noiseBuf = c.createBuffer(1, c.sampleRate * 1, c.sampleRate);
      const d = noiseBuf.getChannelData(0);
      for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    }
    const s = c.createBufferSource(); s.buffer = noiseBuf; return s;
  }
  function env(g, t, peak, a, d) {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  }
  function kick(c, out, t) {
    const o = c.createOscillator(), g = c.createGain();
    o.type = 'sine';
    o.frequency.setValueAtTime(140, t); o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    env(g, t, 1.0, 0.003, 0.38);
    o.connect(g).connect(out); o.start(t); o.stop(t + 0.45);
  }
  function snare(c, out, t) {
    const n = noise(c), bp = c.createBiquadFilter(), g = c.createGain();
    bp.type = 'bandpass'; bp.frequency.value = 1900; bp.Q.value = 0.7;
    env(g, t, 0.55, 0.002, 0.2);
    n.connect(bp).connect(g).connect(out); n.start(t); n.stop(t + 0.25);
    // clap: pár rýchlych úderov
    [0, 0.012, 0.024].forEach((dt) => {
      const n2 = noise(c), hp = c.createBiquadFilter(), g2 = c.createGain();
      hp.type = 'highpass'; hp.frequency.value = 1200;
      env(g2, t + dt, 0.3, 0.001, 0.05);
      n2.connect(hp).connect(g2).connect(out); n2.start(t + dt); n2.stop(t + dt + 0.08);
    });
    const o = c.createOscillator(), g3 = c.createGain();
    o.type = 'triangle'; o.frequency.setValueAtTime(220, t); o.frequency.exponentialRampToValueAtTime(160, t + 0.08);
    env(g3, t, 0.25, 0.002, 0.08);
    o.connect(g3).connect(out); o.start(t); o.stop(t + 0.12);
  }
  function hat(c, out, t, vol, open) {
    const n = noise(c), hp = c.createBiquadFilter(), g = c.createGain();
    hp.type = 'highpass'; hp.frequency.value = 7500;
    env(g, t, vol, 0.001, open ? 0.28 : 0.04);
    n.connect(hp).connect(g).connect(out); n.start(t); n.stop(t + (open ? 0.32 : 0.07));
  }
  function bass(c, out, t, midi, dur) {
    const o = c.createOscillator(), o2 = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain();
    o.type = 'sine'; o2.type = 'triangle';
    o.frequency.setValueAtTime(mtof(midi) * 0.985, t); o.frequency.linearRampToValueAtTime(mtof(midi), t + 0.04);
    o2.frequency.setValueAtTime(mtof(midi), t);
    lp.type = 'lowpass'; lp.frequency.value = 520;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.5, t + 0.01);
    g.gain.setTargetAtTime(0.0001, t + dur * 0.85, 0.05);
    o.connect(lp); o2.connect(lp); lp.connect(g).connect(out);
    o.start(t); o2.start(t); o.stop(t + dur + 0.3); o2.stop(t + dur + 0.3);
  }
  function pad(c, out, t, notes, dur) {
    notes.forEach((m) => {
      const o = c.createOscillator(), lp = c.createBiquadFilter(), g = c.createGain();
      o.type = 'sawtooth'; o.frequency.value = mtof(m); o.detune.value = (Math.random() - 0.5) * 12;
      lp.type = 'lowpass'; lp.frequency.value = 900;
      g.gain.setValueAtTime(0.0001, t);
      g.gain.linearRampToValueAtTime(0.035, t + 0.25);
      g.gain.setValueAtTime(0.035, t + dur - 0.3);
      g.gain.linearRampToValueAtTime(0.0001, t + dur);
      o.connect(lp).connect(g).connect(out); o.start(t); o.stop(t + dur + 0.05);
    });
  }
  function lead(c, out, t, midi, dur, fromMidi) {
    const o = c.createOscillator(), lfo = c.createOscillator(), lfoG = c.createGain(), g = c.createGain(), lp = c.createBiquadFilter();
    o.type = 'sine';
    const f = mtof(midi), f0 = fromMidi ? mtof(fromMidi) : f * 0.94;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(f, t + 0.09);          // portamento = „kvílenie"
    lfo.frequency.value = 5.6; lfoG.gain.setValueAtTime(0, t);
    lfoG.gain.linearRampToValueAtTime(f * 0.012, t + Math.min(0.4, dur * 0.6));  // vibrato sa rozbehne
    lfo.connect(lfoG).connect(o.frequency);
    lp.type = 'lowpass'; lp.frequency.value = 3200;
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(0.13, t + 0.03);
    g.gain.setValueAtTime(0.13, t + dur * 0.8);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur + 0.06);
    o.connect(lp).connect(g).connect(out);
    o.start(t); lfo.start(t); o.stop(t + dur + 0.1); lfo.stop(t + dur + 0.1);
  }
  function scheduleStep(c, out, s, t) {
    const bar = Math.floor(s / 16) % 4, st = s % 16;
    if (KICK[bar].includes(st)) kick(c, out, t);
    if (SNARE.includes(st)) snare(c, out, t);
    if (st % 2 === 0) hat(c, out, t, st % 4 === 2 ? 0.16 : 0.1, bar === 3 && st === 14);
    else if (st === 7 || st === 15) hat(c, out, t, 0.05);
    BASS[bar].forEach(([k, m, l]) => { if (k === st) bass(c, out, t, m, l * STEP); });
    if (st === 0) pad(c, out, t, PAD[bar], 16 * STEP);
    LEAD[bar].forEach(([k, m, l]) => { if (k === st) { lead(c, out, t, m, l * STEP, beat.lastLead); beat.lastLead = m; } });
  }
  function runScheduler() {
    if (!beat || !ctx) return;
    const c = ctx;
    while (beat.next < c.currentTime + 0.15) {
      const swing = beat.step % 2 ? SWING : 0;
      scheduleStep(c, beat.master, beat.step, beat.next + swing);
      beat.next += STEP; beat.step++;
    }
  }
  function beatStart() {
    beatWanted = true;
    const c = ac(); if (!c || beat) return;
    const master = c.createGain(), comp = c.createDynamicsCompressor();
    master.gain.value = 0.55;
    master.connect(comp).connect(c.destination);
    beat = { master, comp, next: c.currentTime + 0.12, step: 0, lastLead: null, timer: 0 };
    runScheduler();
    beat.timer = setInterval(runScheduler, 25);
  }
  function beatStop() {
    beatWanted = false;
    if (!beat) return;
    const b = beat; beat = null;
    clearInterval(b.timer);
    if (ctx) {
      const t = ctx.currentTime;
      try { b.master.gain.cancelScheduledValues(t); b.master.gain.setValueAtTime(b.master.gain.value, t); b.master.gain.linearRampToValueAtTime(0, t + 0.15); } catch (e) {}
      setTimeout(() => { try { b.master.disconnect(); b.comp.disconnect(); } catch (e) {} }, 400);
    }
  }
  function scratch() {
    const c = ac(); if (!c) return;
    const t = c.currentTime;
    [0, 0.14].forEach((dt, i) => {
      const n = noise(c), bp = c.createBiquadFilter(), g = c.createGain();
      bp.type = 'bandpass'; bp.Q.value = 4;
      bp.frequency.setValueAtTime(i ? 2400 : 500, t + dt);
      bp.frequency.exponentialRampToValueAtTime(i ? 500 : 2600, t + dt + 0.12);
      env(g, t + dt, 0.5, 0.01, 0.12);
      n.connect(bp).connect(g).connect(c.destination); n.start(t + dt); n.stop(t + dt + 0.16);
    });
  }

  return {
    unlock() { ac(); },
    isMuted() { return muted; },
    setMuted(m) {
      muted = m; localStorage.setItem('dmd-muted', m ? '1' : '0');
      if (m && ctx) ctx.suspend();
      if (!m && beatWanted) { if (beat) ac(); else beatStart(); }
    },
    tick() { tone(900 + Math.random() * 200, 0.03, 'square', 0.04); },
    lever() { tone(180, 0.25, 'sawtooth', 0.06, 0, 60); },
    stop() { tone(220, 0.12, 'triangle', 0.12); },
    win() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.18, 'square', 0.07, i * 0.11)); },
    jackpot() { [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, 0.22, 'square', 0.07, i * 0.09)); },
    boing() { tone(300, 0.22, 'sine', 0.15, 0, 900); },
    buzz() { tone(110, 0.35, 'sawtooth', 0.09); tone(116, 0.35, 'sawtooth', 0.06); },
    yay() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.15, 'triangle', 0.12, i * 0.08)); },
    scratch, beatStart, beatStop,
    beatPlaying() { return !!beat; },
    beatLoopSeconds: 64 * STEP
  };
})();
