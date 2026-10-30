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
  return {
    unlock() { ac(); },
    isMuted() { return muted; },
    setMuted(m) { muted = m; localStorage.setItem('dmd-muted', m ? '1' : '0'); if (m && ctx) ctx.suspend(); },
    tick() { tone(900 + Math.random() * 200, 0.03, 'square', 0.04); },
    lever() { tone(180, 0.25, 'sawtooth', 0.06, 0, 60); },
    stop() { tone(220, 0.12, 'triangle', 0.12); },
    win() { [523, 659, 784, 1047, 784, 1047].forEach((f, i) => tone(f, 0.18, 'square', 0.07, i * 0.11)); },
    jackpot() { [523, 659, 784, 1047, 1319, 1568].forEach((f, i) => tone(f, 0.22, 'square', 0.07, i * 0.09)); },
    boing() { tone(300, 0.22, 'sine', 0.15, 0, 900); },
    buzz() { tone(110, 0.35, 'sawtooth', 0.09); tone(116, 0.35, 'sawtooth', 0.06); },
    yay() { [784, 988, 1175, 1568].forEach((f, i) => tone(f, 0.15, 'triangle', 0.12, i * 0.08)); }
  };
})();
