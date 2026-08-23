(function () {
  const U = UM.UI;
  let sel = { bgIdx: 0, gender: 'm' };
  function initCreate() {
    const list = document.getElementById('bg-list');
    list.innerHTML = '';
    UM.DATA.BGS.forEach((bg, i) => {
      const card = document.createElement('div');
      card.className = 'bg-card' + (i === sel.bgIdx ? ' sel' : '');
      card.innerHTML = `<b>${bg.job}</b><span class="meta">${bg.age} 歲・${bg.region}・${sel.gender === 'm' ? '男' : '女'}</span><p>${bg.desc}</p>`;
      card.onclick = () => { sel.bgIdx = i; refresh(); };
      list.appendChild(card);
    });
  }
  function refresh() {
    initCreate();
    document.getElementById('cv-portrait').innerHTML = UM.portrait(sel.bgIdx, sel.gender);
    const bg = UM.DATA.BGS[sel.bgIdx];
    const parts = bg.suggest.split(' / ');
    const nm = document.getElementById('inp-name');
    nm.placeholder = sel.gender === 'm' ? parts[0] : (parts[1] || parts[0]);
    document.getElementById('perk-line').textContent = `起始攜帶：${UM.DATA.ITEMS[bg.item].name}`;
  }
  function bindCreate() {
    document.querySelectorAll('#g-toggle button').forEach(b => {
      b.onclick = () => {
        sel.gender = b.dataset.g;
        document.querySelectorAll('#g-toggle button').forEach(x => x.classList.toggle('on', x === b));
        refresh();
      };
    });
    document.getElementById('btn-start').onclick = () => {
      const name = document.getElementById('inp-name').value.trim() || document.getElementById('inp-name').placeholder;
      const carry = UM.pendingCarry || null;
      UM.Engine.newGame({ bgIdx: sel.bgIdx, gender: sel.gender, name, job: UM.DATA.BGS[sel.bgIdx].job }, carry);
      UM.pendingCarry = null;
      document.getElementById('carry-note').style.display = 'none';
      document.getElementById('btn-start').textContent = '啟程';
      U.showScreen('scr-game');
      UM.startRun();
    };
  }
  function showEndingScreen(end) {
    UM.Save.unlockEnding(end.key);
    const s = UM.state;
    const ov = document.createElement('div');
    ov.id = 'ending-screen';
    ov.innerHTML = `
      <div class="end-art">${end.art}</div>
      <div class="end-tag">${end.label}</div>
      <h2 class="end-title">《${end.title}》</h2>
      <div class="end-text">${end.text.map(p => `<p>${p}</p>`).join('')}</div>
      <div class="end-stats dim">指揮官 ${s.char.name}｜Lv.${s.level}${s.ngPlus ? '｜輪迴 ' + s.ngPlus : ''}｜航行 ${U.fmtTime(s.playSec)}</div>
      <div class="end-btns">
        <button id="ngplus">攜帶狀態與道具，開啟新一輪</button>
        <button id="end-gallery">結局圖鑑</button>
        <button id="end-title">返回標題</button>
      </div>`;
    document.body.appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('show'));
    ov.querySelector('#ngplus').onclick = () => {
      const carry = { level: s.level, xp: s.xp, inv: Object.assign({}, s.inv), res: Object.assign({}, s.res), ngPlus: s.ngPlus || 0 };
      ov.remove();
      U.showScreen('scr-create');
      UM.pendingCarry = carry;
      document.getElementById('carry-note').style.display = '';
      document.getElementById('btn-start').textContent = '啟程（輪迴）';
    };
    ov.querySelector('#end-gallery').onclick = () => { ov.remove(); showGallery(); };
    ov.querySelector('#end-title').onclick = () => { ov.remove(); location.reload(); };
  }
  function showGallery() {
    const m = UM.Save.meta();
    const cards = UM.DATA.ENDINGS.map(e => {
      const got = m.unlocked[e.key];
      return `<div class="gal-card ${got ? '' : 'locked'}">
        ${got ? e.art : `<div class="gal-q">？</div>`}
        <div class="gal-name">${got ? `《${e.title}》` : '未解鎖'}</div>
        <div class="gal-hint">${e.label}<br>${e.hint}</div>
      </div>`;
    }).join('');
    U.openPanel(`<div class="panel-head"><h3>結局圖鑑（${Object.keys(m.unlocked).length}/10）</h3><button class="x" onclick="UM.UI.closePanel()">✕</button></div><div class="panel-body"><div class="gal-grid">${cards}</div></div>`);
  }
  function showContinueMenu() {
    const auto = UM.Save.autoInfo();
    let slots = '';
    for (let i = 1; i <= 3; i++) {
      const info = UM.Save.slotInfo(i);
      if (info) slots += `<button data-load="${i}">欄位${i}：${info.name}｜${info.chapter}</button>`;
    }
    U.openPanel(UM.Panels.panelShell('讀取存檔', `
      ${auto ? `<button data-load="auto">自動存檔：${auto.name}｜${auto.chapter}</button>` : '<i class="dim">尚無自動存檔</i>'}
      ${slots || ''}
      <label class="filebtn" style="margin-top:.8em;display:inline-block">匯入存檔<input type="file" id="title-import" accept=".json"></label>
    `));
    document.querySelectorAll('[data-load]').forEach(b => b.onclick = () => {
      const key = b.dataset.load === 'auto' ? 'um_auto' : 'um_slot_' + b.dataset.load;
      const d = UM.Save.loadFrom(key);
      if (d && UM.startGameFromState(d)) { U.closePanel(); } else U.toast('讀取失敗');
    });
    document.getElementById('title-import').onchange = ev => {
      const f = ev.target.files[0]; if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        if (UM.Save.importText(r.result) && UM.startGameFromState(UM.state)) U.closePanel(); else U.toast('匯入失敗');
      };
      r.readAsText(f);
    };
  }
  UM.Screens = { initCreate, refresh, bindCreate, showEndingScreen, showGallery, showContinueMenu, getSel: () => sel };
})();
