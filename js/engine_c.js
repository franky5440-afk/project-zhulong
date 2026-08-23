(function () {
  const E = UM.Engine;
  function pushHistory(node) {
    const s = UM.state;
    s.history.push({ ch: node.chapter || '', t: (node.speaker ? node.speaker + '：' : '') + node.text, at: Math.round(s.playSec) });
    if (s.history.length > 4000) s.history.splice(0, s.history.length - 4000);
  }
  function enter(id) {
    const s = UM.state;
    if (id === 'ENDINGS') { E.evaluateEndings(); return; }
    if (typeof id === 'string' && id.indexOf('TRAVEL:') === 0) { E.startTravel(id.slice(7)); return; }
    const node = UM.Nodes[id];
    if (!node) { console.error('missing node', id); return; }
    s.node = id;
    s.steps++;
    if (node.fx) E.applyFx(node.fx);
    pushHistory(node);
    E.sysCheck();
  }
  E.enter = enter;
  E.go = function (id) { enter(id); UM.onChange && UM.onChange(); };
  E.start = function () { E.go('p01'); };
  E.currentChoices = function () {
    const s = UM.state, node = UM.Nodes[s.node];
    if (!node || s.ended) return [];
    let list = node.choices
      ? node.choices.map((c, i) => ({ i, c }))
      : (node.auto ? [{ i: -1, c: { t: node.auto.label || '繼續', goto: node.auto.goto } }] : []);
    if (node.bonus) {
      if (!(s.node in s.bonusSeen)) s.bonusSeen[s.node] = Math.random() < E.intuition();
    }
    const out = list.map(({ i, c }) => ({ idx: i, choice: c, enabled: E.checkReq(c.req) && E.affordable(c.cost) }));
    if (node.bonus && s.bonusSeen[s.node] && (!node.bonus.minLevel || s.level >= node.bonus.minLevel)) {
      out.push({ idx: 'bonus', choice: { t: node.bonus.t, sub: '直覺閃現', goto: node.bonus.goto, fx: Object.assign({}, node.bonus.fx), bonus: true }, enabled: true });
    }
    return out;
  };
  function resolveGoto(g) {
    if (!g || g === '@next') {
      const q = UM.state.queue;
      return q.length ? q.shift() : null;
    }
    return g;
  }
  function noteChoice(t) {
    const h = UM.state.history[UM.state.history.length - 1];
    if (h) h.taken = t;
  }
  E.choose = function (idx) {
    const s = UM.state, node = UM.Nodes[s.node];
    if (!node || s.ended) return;
    let g;
    if (idx === -1) {
      g = resolveGoto(node.auto && node.auto.goto);
    } else {
      const c = idx === 'bonus' ? node.bonus : node.choices[idx];
      if (!c) return;
      if (idx !== 'bonus' && (!E.checkReq(c.req) || !E.affordable(c.cost))) return;
      if (idx !== 'bonus' && c.cost) {
        E.applyFx({
          items: c.cost.items ? Object.fromEntries(Object.entries(c.cost.items).map(([k, v]) => [k, -v])) : undefined,
          res: c.cost.res
        });
      }
      E.applyFx(idx === 'bonus' ? c.fx : c.fx);
      noteChoice(c.t);
      g = resolveGoto(c.goto);
    }
    if (g) enter(g);
    UM.onChange && UM.onChange();
  };
  E.evaluateEndings = function () {
    const s = UM.state;
    s.macro = s.flags.macro || s.macro;
    let key = null;
    for (const end of UM.DATA.ENDINGS) { if (end.when(s)) { key = end.key; break; } }
    if (!key) key = 'meaningless';
    s.ended = key;
    const end = UM.DATA.ENDINGS_BY_KEY[key];
    UM.onEnding && UM.onEnding(end);
    UM.onChange && UM.onChange();
  };
})();
