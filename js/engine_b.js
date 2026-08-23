(function () {
  const E = UM.Engine;
  function rnd(n) { return Math.floor(Math.random() * n); }
  function pick(arr) { return arr[rnd(arr.length)]; }
  E.checkReq = function (req) {
    const s = UM.state;
    if (!req) return true;
    if (req.flags) for (const f of req.flags) if (!s.flags[f]) return false;
    if (req.noflags) for (const f of req.noflags) if (s.flags[f]) return false;
    if (req.items) for (const id in req.items) if ((s.inv[id] || 0) < req.items[id]) return false;
    if (req.levelMin && s.level < req.levelMin) return false;
    if (req.res) for (const k in req.res) if ((s.res[k] || 0) < req.res[k]) return false;
    if (req.clues && s.clues < req.clues) return false;
    if (req.anyItems) {
      const ok = req.anyItems.some(list => list.every(id => (s.inv[id] || 0) > 0));
      if (!ok) return false;
    }
    return true;
  };
  E.affordable = function (cost) {
    const s = UM.state;
    if (!cost) return true;
    if (cost.items) for (const id in cost.items) if ((s.inv[id] || 0) < cost.items[id]) return false;
    if (cost.res) for (const k in cost.res) if ((s.res[k] || 0) + cost.res[k] < 0) return false;
    return true;
  };
  E.applyFx = function (fx) {
    if (!fx || !UM.state) return;
    const s = UM.state, before = s.level;
    if (fx.xp) s.xp += fx.xp;
    if (fx.time) s.time_debt += fx.time;
    if (fx.res) for (const k in fx.res) s.res[k] = Math.max(0, Math.min(100, (s.res[k] || 0) + fx.res[k]));
    if (fx.scores) for (const k in fx.scores) s.scores[k] = Math.max(0, (s.scores[k] || 0) + fx.scores[k]);
    if (fx.items) for (const id in fx.items) {
      const d = fx.items[id];
      if (d > 0) s.inv[id] = (s.inv[id] || 0) + d;
      else if (d < 0) s.inv[id] = Math.max(0, (s.inv[id] || 0) + d);
    }
    if (fx.flags) for (const k in fx.flags) s.flags[k] = fx.flags[k];
    s.level = E.levelOf(s.xp);
    s.clues = E.countClues();
    s.leveledUp = s.level > before;
  };
  E.useItem = function (id) {
    const s = UM.state, it = UM.DATA.ITEMS[id];
    if (!it || !it.usable || !(s.inv[id] > 0)) return null;
    s.inv[id]--;
    E.applyFx(it.useFx);
    return it.useText || '';
  };
  function poolEvents(era, count) {
    const s = UM.state;
    const cands = UM.DATA.EVENTS.filter(ev => ev.era === era || (Array.isArray(ev.era) && ev.era.includes(era)));
    let avail = cands.filter(ev => !(ev.once && s.usedEvents[ev.id]));
    if (avail.length < count) avail = cands.slice();
    const chosen = [];
    const bag = [];
    avail.forEach(ev => { for (let i = 0; i < ev.w; i++) bag.push(ev.id); });
    while (chosen.length < count && bag.length) {
      const id = pick(bag);
      chosen.push(id);
      for (let i = bag.length - 1; i >= 0; i--) if (bag[i] === id) bag.splice(i, 1);
      s.usedEvents[id] = (s.usedEvents[id] || 0) + 1;
      if (avail.every(ev => chosen.includes(ev.id))) break;
    }
    return chosen;
  }
  E.startTravel = function (key) {
    const t = UM.DATA.TRAVELS[key];
    const s = UM.state;
    s.location = t.name;
    const evs = poolEvents(t.era, t.ev);
    s.queue = evs.map(id => UM.Nodes[id].id).concat([t.arr]);
    E.enter(s.queue.shift());
  };
  E.sysCheck = function () {
    const s = UM.state;
    if ((s.steps - (s.lastSysStep || 0)) < 8) return;
    if (!s.queue.length) return;
    const low = s.res.fuel < 15 ? 'sys_low_fuel' : s.res.hull < 15 ? 'sys_low_hull' : s.res.morale < 15 ? 'sys_low_morale' : null;
    if (low && !s.queue.includes(low)) { s.queue.unshift(low); s.lastSysStep = s.steps; }
  };
  UM.EngineInternals = { rnd, pick, poolEvents };
})();
