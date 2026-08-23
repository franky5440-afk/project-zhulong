(function () {
  const cv = () => document.getElementById('stars');
  let ctx = null, stars = [], W = 0, H = 0, warp = 0;
  function initStars() {
    const c = cv();
    ctx = c.getContext('2d');
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 160; i++) stars.push(mkStar(true));
    requestAnimationFrame(tick);
  }
  function mkStar(rand) {
    return { x: Math.random() * W, y: Math.random() * H, z: Math.random() * 3 + 0.4, tw: Math.random() * Math.PI * 2 };
  }
  function resize() {
    W = cv().width = innerWidth;
    H = cv().height = innerHeight;
  }
  function tick() {
    ctx.fillStyle = '#04050d';
    ctx.fillRect(0, 0, W, H);
    for (const s of stars) {
      s.tw += 0.02;
      const sp = (warp > 0 ? s.z * 14 : s.z * 0.35);
      s.x -= sp;
      if (s.x < -4) { s.x = W + 4; s.y = Math.random() * H; }
      const a = 0.35 + 0.5 * Math.abs(Math.sin(s.tw));
      if (warp > 0) {
        ctx.strokeStyle = `rgba(160,190,255,${a})`;
        ctx.lineWidth = s.z * 0.9;
        ctx.beginPath(); ctx.moveTo(s.x, s.y); ctx.lineTo(s.x + s.z * 26, s.y); ctx.stroke();
      } else {
        ctx.fillStyle = `rgba(210,225,255,${a})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.z * 0.9, 0, 7); ctx.fill();
      }
    }
    if (warp > 0) warp--;
    requestAnimationFrame(tick);
  }
  function setWarp(frames) { warp = frames || 90; }
  function showScreen(id) {
    document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
    document.getElementById(id).classList.add('active');
  }
  function typeText(el, text, speed, done) {
    el.textContent = '';
    let i = 0;
    clearInterval(el._tw);
    if (!speed) { el.textContent = text; done && done(); return; }
    el._tw = setInterval(() => {
      i += 1;
      el.textContent = text.slice(0, i);
      if (i >= text.length) { clearInterval(el._tw); done && done(); }
    }, speed);
    el.onclick = () => { clearInterval(el._tw); el.textContent = text; done && done(); };
  }
  function toast(msg, cls) {
    const t = document.getElementById('toast');
    t.textContent = msg;
    t.className = 'show ' + (cls || '');
    setTimeout(() => { t.className = ''; }, 2600);
  }
  function openPanel(html) {
    const ov = document.getElementById('overlay'), card = document.getElementById('panel-card');
    card.innerHTML = html;
    ov.hidden = false;
    requestAnimationFrame(() => ov.classList.add('open'));
  }
  function closePanel() {
    const ov = document.getElementById('overlay');
    ov.classList.remove('open');
    setTimeout(() => { ov.hidden = true; }, 220);
  }
  function fmtTime(sec) {
    const h = Math.floor(sec / 3600), m = Math.floor(sec % 3600 / 60);
    return `${h} 小時 ${m} 分`;
  }
  function resLabel(k) { return { fuel: '燃料', hull: '船體', morale: '士氣' }[k] || k; }
  function scoreLabel(k) { return { hope: '希望', bond: '羈絆', obsession: '執念', nihil: '虛無', humanity: '人性', family: '牽掛' }[k] || k; }
  UM.UI = { initStars, setWarp, showScreen, typeText, toast, openPanel, closePanel, fmtTime, resLabel, scoreLabel };
})();
