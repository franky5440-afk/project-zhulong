(function () {
  const LVL_TITLES = ['見習生', '領航員', '深空士', '遠征官', '星環爵士', '界域探索者', '星海老兵', '遠航詩人', '深空賢者', '界行者', '傳說', '燭龍'];
  function xpNeed(lv) { return Math.round(40 * Math.pow(lv, 1.45)); }
  const E = {};
  E.newGame = function (cfg, carry) {
    const prev = carry || null;
    const st = {
      v: UM.SAVE_VERSION,
      char: { bgIdx: cfg.bgIdx, gender: cfg.gender, name: cfg.name, job: cfg.job },
      level: 1, xp: 0,
      res: { fuel: 100, hull: 100, morale: 70 },
      inv: {}, flags: {}, scores: { hope: 0, bond: 0, obsession: 0, nihil: 0, humanity: 0, family: 0 },
      time_debt: 0, clues: 0,
      node: null, queue: [], usedEvents: {}, bonusSeen: {},
      history: [], steps: 0, playSec: 0, startedAt: Date.now(),
      macro: null, ended: null, ngPlus: prev ? (prev.ngPlus || 0) + 1 : 0,
      location: '地球'
    };
    if (prev) {
      st.level = prev.level; st.xp = prev.xp;
      st.inv = Object.assign({}, prev.inv);
      st.res = Object.assign({}, prev.res);
    } else {
      const bg = UM.DATA.BGS[cfg.bgIdx];
      st.inv[bg.item] = (st.inv[bg.item] || 0) + 1;
      for (const k in bg.scores) st.scores[k] += bg.scores[k];
    }
    UM.state = st;
    return st;
  };
  E.levelOf = function (xp) {
    let lv = 1;
    while (lv < LVL_TITLES.length && xp >= xpNeed(lv)) { xp -= xpNeed(lv); lv++; }
    return lv;
  };
  E.title = function (lv) { return LVL_TITLES[Math.min(lv - 1, LVL_TITLES.length - 1)]; };
  E.xpProgress = function () {
    let xp = UM.state.xp, lv = 1;
    while (lv < LVL_TITLES.length && xp >= xpNeed(lv)) { xp -= xpNeed(lv); lv++; }
    return { lv, cur: xp, need: lv >= LVL_TITLES.length ? 0 : xpNeed(lv) };
  };
  E.intuition = function () {
    let c = 0.15 + 0.05 * (UM.state.level - 1);
    if (UM.state.inv.pendant) c += UM.DATA.ITEMS.pendant.intuition;
    return Math.min(0.75, c);
  };
  E.countClues = function () {
    const s = UM.state;
    let n = 0;
    if (s.inv.probe_chip) n++;
    if (s.inv.directive7) n++;
    if (s.inv.pioneer_logs) n++;
    if (s.inv.vanguard_chip) n++;
    ['clue_qin', 'clue_dsa', 'clue_fleet', 'clue_warp'].forEach(f => { if (s.flags[f]) n++; });
    return n;
  };
  UM.Engine = E;
})();
