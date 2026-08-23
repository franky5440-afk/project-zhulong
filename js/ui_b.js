(function () {
  const U = UM.UI;
  function reqReason(c) {
    const s = UM.state;
    const parts = [];
    if (c.req && c.req.flags) for (const f of c.req.flags) if (!s.flags[f]) parts.push('需要特定條件');
    if (c.req && c.req.items) for (const id in c.req.items) if ((s.inv[id] || 0) < c.req.items[id]) parts.push('需要 ' + (UM.DATA.ITEMS[id] || {}).name);
    if (c.req && c.req.levelMin && s.level < c.req.levelMin) parts.push('等級不足');
    if (c.req && c.req.res) for (const k in c.req.res) if ((s.res[k] || 0) < c.req.res[k]) parts.push(U.resLabel(k) + '不足');
    if (c.cost) for (const k in (c.cost.res || {})) if ((s.res[k] || 0) + c.cost.res[k] < 0) parts.push(U.resLabel(k) + '不夠支付');
    return parts.join('、');
  }
  function renderHUD() {
    const s = UM.state, node = UM.Nodes[s.node] || {};
    document.getElementById('hud-ch').textContent = node.chapter || '';
    document.getElementById('hud-loc').textContent = s.location || '';
    for (const k of ['fuel', 'hull', 'morale']) {
      const bar = document.getElementById('bar-' + k);
      bar.style.width = s.res[k] + '%';
      bar.classList.toggle('low', s.res[k] < 25);
    }
    document.getElementById('hud-time').textContent = U.fmtTime(s.playSec);
    document.getElementById('hud-ng').textContent = s.ngPlus > 0 ? '輪迴 ' + s.ngPlus : '';
    const p = UM.Engine.xpProgress();
    document.getElementById('hud-lv').textContent = `Lv.${p.lv} ${UM.Engine.title(p.lv)}（直覺 ${Math.round(UM.Engine.intuition() * 100)}%）`;
    document.getElementById('hud-xpbar').style.width = (p.need ? Math.round(p.cur / p.need * 100) : 100) + '%';
  }
  function renderChoices() {
    const box = document.getElementById('choices');
    box.innerHTML = '';
    const nodeTag = UM.state.node;
    const list = UM.Engine.currentChoices();
    list.forEach((o, n) => {
      const b = document.createElement('button');
      b.className = 'choice-btn' + (o.choice.bonus ? ' bonus' : '') + (o.enabled ? '' : ' disabled');
      b.style.animationDelay = (n * 70) + 'ms';
      let costTag = '';
      if (o.choice.cost) {
        const bits = [];
        if (o.choice.cost.items) for (const id in o.choice.cost.items) bits.push(UM.DATA.ITEMS[id].name + '×' + o.choice.cost.items[id]);
        if (o.choice.cost.res) for (const k in o.choice.cost.res) bits.push('-' + U.resLabel(k));
        costTag = `<span class="cost">${bits.join(' ')}</span>`;
      }
      b.innerHTML = `<span class="t">${o.choice.t}</span>${costTag}${o.choice.sub ? `<span class="sub">${o.choice.sub}</span>` : ''}`;
      if (!o.enabled) {
        const why = reqReason(o.choice);
        if (why) { const w = document.createElement('span'); w.className = 'why'; w.textContent = why; b.appendChild(w); }
      } else {
        b.onclick = () => { if (UM.state.node === nodeTag && !UM.state.ended) UM.Engine.choose(o.idx); };
      }
      box.appendChild(b);
    });
  }
  function renderGame() {
    if (!UM.state || !document.getElementById('scr-game').classList.contains('active')) return;
    const node = UM.Nodes[UM.state.node];
    renderHUD();
    document.getElementById('side-portrait').innerHTML = UM.portrait(UM.state.char.bgIdx, UM.state.char.gender);
    const sp = document.getElementById('speaker');
    sp.textContent = node.speaker ? '◈ ' + node.speaker : '';
    sp.style.display = node.speaker ? '' : 'none';
    const speed = (UM.settings && UM.settings.fastText) ? 0 : 22;
    document.getElementById('choices').innerHTML = '';
    U.typeText(document.getElementById('story-text'), node.text || '', speed, renderChoices);
    if (String(UM.state.node).startsWith('ev_')) { U.setWarp(120); }
    if (UM.state.leveledUp) {
      U.toast(`升級！Lv.${UM.state.level} ${UM.Engine.title(UM.state.level)}——直覺閃現機率提升`, 'gold');
      UM.state.leveledUp = false;
    }
    document.getElementById('travel-tag').style.display = UM.state.queue.length ? '' : 'none';
    UM.Save.autosave();
  }
  function bindFabs() {
    const map = { 'fab-status': showStatus, 'fab-inv': showInventory, 'fab-log': showJournal, 'fab-map': showMap, 'fab-save': showSavePanel, 'fab-lore': showLore };
    for (const id in map) document.getElementById(id).onclick = () => map[id]();
  }
  function panelShell(title, inner) {
    return `<div class="panel-head"><h3>${title}</h3><button class="x" onclick="UM.UI.closePanel()">✕</button></div><div class="panel-body">${inner}</div>`;
  }
  function showStatus() {
    const s = UM.state, bg = UM.DATA.BGS[s.char.bgIdx];
    const rows = Object.keys(s.scores).map(k => {
      const v = Math.min(100, s.scores[k] * 8);
      return `<div class="score-row"><span>${U.scoreLabel(k)}</span><div class="mini-bar"><i style="width:${v}%"></i></div><b>${s.scores[k]}</b></div>`;
    }).join('');
    const invList = Object.keys(s.inv).filter(id => s.inv[id] > 0)
      .map(id => `<span class="tag">${UM.DATA.ITEMS[id].name} ×${s.inv[id]}</span>`).join('');
    U.openPanel(panelShell('艦長狀態', `
      <div class="status-grid">
        <div>${UM.portrait(s.char.bgIdx, s.char.gender)}</div>
        <dl>
          <dt>姓名</dt><dd>${s.char.name}</dd>
          <dt>背景</dt><dd>${s.char.age}歲${bg.region}${bg.job}（${s.char.gender === 'm' ? '男' : '女'}）</dd>
          <dt>職務</dt><dd>${{ role_sci: '科學組・首席研究員', role_eng: '工程組・系統工程師', role_com: '通訊組・深空通訊長' }[Object.keys(s.flags).find(f => f.startsWith('role_'))] || '見習乘員'}</dd>
          <dt>等級</dt><dd>Lv.${s.level} ${UM.Engine.title(s.level)}</dd>
          <dt>時間債</dt><dd>${s.time_debt} 段（錯過的地球歲月）</dd>
        </dl>
      </div>
      <h4>資源</h4>
      <div class="res-rows">
        ${['fuel', 'hull', 'morale'].map(k => `<div class="score-row"><span>${U.resLabel(k)}</span><div class="mini-bar"><i style="width:${s.res[k]}%"></i></div><b>${Math.round(s.res[k])}</b></div>`).join('')}
      </div>
      <h4>心緒傾向</h4>${rows}
      <h4>攜行物品（${invCount()} 種）</h4><div class="tags">${invList || '<i>空空如也</i>'}</div>
    `));
  }
  function invCount() { return Object.keys(UM.state.inv).filter(id => UM.state.inv[id] > 0).length; }
  function showInventory() {
    const s = UM.state;
    const items = Object.keys(s.inv).filter(id => s.inv[id] > 0).map(id => ({ it: UM.DATA.ITEMS[id], n: s.inv[id] })).filter(x => x.it);
    const html = items.map(({ it, n }) => `
      <div class="item-card">
        <div class="it-head"><b>${it.name}</b><span class="n">×${n}</span><span class="type t-${it.type}">${{ consumable: '消耗品', tool: '工具', key: '關鍵', relic: '遺物', part: '零件', clue: '線索', cursed: '詛咒' }[it.type] || ''}</span></div>
        <p>${it.desc}</p>
        ${it.usable ? `<button data-use="${it.id}" ${n < 1 ? 'disabled' : ''}>使用</button>` : ''}
      </div>`).join('');
    U.openPanel(panelShell('行囊', `<div class="items-grid">${html || '<i class="dim">目前沒有攜帶任何物品。</i>'}</div>`));
    document.querySelectorAll('[data-use]').forEach(btn => {
      btn.onclick = () => {
        const txt = UM.Engine.useItem(btn.dataset.use);
        if (txt !== null) { U.toast(txt, 'gold'); showInventory(); renderHUD(); }
      };
    });
  }
  function showJournal() {
    const h = UM.state.history.slice().reverse();
    let lastCh = '';
    const rows = h.map(e => {
      const chHead = e.ch !== lastCh ? `<div class="j-chap">${e.ch}</div>` : '';
      lastCh = e.ch;
      return `${chHead}<div class="j-entry"><div class="j-text">${e.t}</div>${e.taken ? `<div class="j-taken">▸ 你選擇了：${e.taken}</div>` : ''}</div>`;
    }).join('');
    U.openPanel(panelShell('航行日誌（歷程回顧）', `<div class="journal">${rows || '<i class="dim">旅程尚未開始。</i>'}</div>`));
  }
  function showMap() {
    const s = UM.state;
    const visited = [];
    for (const e of s.history) { const m = (e.ch || '').split('・')[1]; if (m && !visited.includes(m)) visited.push(m); }
    const all = Object.values(UM.DATA.TRAVELS).map(t => t.name.split('・')[1]).filter(Boolean);
    U.openPanel(panelShell('星圖與足跡', `
      <p class="dim">已踏足之地：</p><div class="tags">${visited.map(v => `<span class="tag on">${v}</span>`).join('') || '<i>—</i>'}</div>
      <p class="dim" style="margin-top:.6em">已知世界：</p><div class="tags">${all.map(v => `<span class="tag ${visited.includes(v) ? 'on' : ''}">${v}</span>`).join('')}</div>
      <p class="dim" style="margin-top:1em">航程進度：約 ${Math.min(100, Math.round((s.node || '').startsWith('v') ? 100 : (s.steps / 260) * 100))}%</p>
    `));
  }
  function showLore() {
    const L = UM.DATA.LORE;
    const rows = L.terms.map(t => `<details><summary>${t.k}</summary><p>${t.v}</p></details>`).join('');
    U.openPanel(panelShell('世界觀辭典', `<div class="lore">${rows}</div>`));
  }
  function showSavePanel() {
    let slotsHtml = '';
    for (let i = 1; i <= 3; i++) {
      const info = UM.Save.slotInfo(i);
      slotsHtml += `<div class="slot"><div class="slot-info">${info
        ? `${info.name}｜${info.chapter}｜${U.fmtTime(info.playSec)}｜${new Date(info.savedAt).toLocaleString()}`
        : '<i class="dim">空欄位</i>'}</div>
        <button data-save="${i}">存入</button>${info ? `<button data-load="${i}">讀取</button>` : ''}</div>`;
    }
    const auto = UM.Save.autoInfo();
    U.openPanel(panelShell('存檔', `
      <div class="slot auto"><div class="slot-info">${auto ? `自動存檔：${auto.name}｜${auto.chapter}｜${U.fmtTime(auto.playSec)}｜${new Date(auto.savedAt).toLocaleString()}` : '<i class="dim">尚無自動存檔</i>'}</div>
      ${auto ? '<button data-load="auto">讀取</button>' : ''}</div>
      ${slotsHtml}
      <div class="io-row">
        <button id="btn-export">匯出存檔檔案</button>
        <label class="filebtn">匯入存檔<input type="file" id="btn-import" accept=".json"></label>
      </div>`));
    document.querySelectorAll('[data-save]').forEach(b => b.onclick = () => { UM.Save.saveTo('um_slot_' + b.dataset.save); U.toast('已存入欄位 ' + b.dataset.save); showSavePanel(); });
    document.querySelectorAll('[data-load]').forEach(b => b.onclick = () => {
      const key = b.dataset.load === 'auto' ? 'um_auto' : 'um_slot_' + b.dataset.load;
      const d = UM.Save.loadFrom(key);
      if (d && UM.startGameFromState(d)) { U.closePanel(); U.toast('讀取完成'); }
      else U.toast('讀取失敗');
    });
    document.getElementById('btn-export').onclick = () => { UM.Save.exportFile(); U.toast('已匯出'); };
    document.getElementById('btn-import').onchange = ev => {
      const f = ev.target.files[0];
      if (!f) return;
      const r = new FileReader();
      r.onload = () => {
        if (UM.Save.importText(r.result) && UM.startGameFromState(UM.state)) { U.closePanel(); U.toast('匯入成功'); }
        else U.toast('匯入失敗：檔案格式錯誤');
      };
      r.readAsText(f);
    };
  }
  UM.Panels = { showStatus, showInventory, showJournal, showMap, showSavePanel, showLore, panelShell, renderGame, bindFabs };
})();
