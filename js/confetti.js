/* Mini konfety na canvase. */
window.Confetti = (function () {
  const cv = document.getElementById('confetti');
  const cx = cv.getContext('2d');
  let parts = [], raf = 0, W = 0, H = 0, dpr = 1;
  const colors = ['#ff2bd6', '#ffe14d', '#00f0ff', '#39ff14', '#ff6b00', '#ffffff', '#8a5cff'];
  function size() {
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth; H = window.innerHeight;
    cv.width = W * dpr; cv.height = H * dpr;
    cv.style.width = W + 'px'; cv.style.height = H + 'px';
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  window.addEventListener('resize', size); size();
  function burst(n, x, y) {
    x = x == null ? W / 2 : x; y = y == null ? H / 3 : y;
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2, s = 4 + Math.random() * 9;
      parts.push({ x, y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 6, w: 6 + Math.random() * 6, h: 8 + Math.random() * 8,
        r: Math.random() * 6, vr: (Math.random() - 0.5) * 0.4, c: colors[(Math.random() * colors.length) | 0], life: 0 });
    }
    if (!raf) raf = requestAnimationFrame(step);
  }
  function rain(n) { for (let i = 0; i < n; i++) setTimeout(() => burst(6, Math.random() * W, -10), i * 25); }
  function step() {
    cx.clearRect(0, 0, W, H);
    parts = parts.filter(p => p.y < H + 30 && p.life < 400);
    for (const p of parts) {
      p.life++; p.vy += 0.25; p.vx *= 0.99; p.vy *= 0.99;
      p.x += p.vx + Math.sin(p.life / 10) * 0.6; p.y += p.vy; p.r += p.vr;
      cx.save(); cx.translate(p.x, p.y); cx.rotate(p.r);
      cx.fillStyle = p.c; cx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h * Math.abs(Math.cos(p.life / 8)) + 1);
      cx.restore();
    }
    raf = parts.length ? requestAnimationFrame(step) : 0;
    if (!raf) cx.clearRect(0, 0, W, H);
  }
  return { burst, rain };
})();
