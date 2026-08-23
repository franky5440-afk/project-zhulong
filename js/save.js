(function () {
  const AUTO = 'um_auto', SLOT = i => 'um_slot_' + i, META = 'um_meta';
  function storage() { return (typeof localStorage !== 'undefined') ? localStorage : null; }
  const S = {};
  S.saveTo = function (key) {
    const st = storage();
    if (!st || !UM.state) return false;
    UM.state.savedAt = Date.now();
    try { st.setItem(key, JSON.stringify(UM.state)); return true; } catch (e) { return false; }
  };
  S.loadFrom = function (key) {
    const st = storage();
    if (!st) return null;
    try {
      const raw = st.getItem(key);
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) { return null; }
  };
  S.autosave = function () { return S.saveTo(AUTO); };
  S.slotInfo = function (i) {
    const d = S.loadFrom(SLOT(i));
    return d ? { name: d.char.name, job: d.char.job, chapter: (UM.Nodes[d.node] || {}).chapter || '', playSec: d.playSec, savedAt: d.savedAt, ngPlus: d.ngPlus } : null;
  };
  S.autoInfo = function () {
    const d = S.loadFrom(AUTO);
    return d ? { name: d.char.name, job: d.char.job, chapter: (UM.Nodes[d.node] || {}).chapter || '', playSec: d.playSec, savedAt: d.savedAt, ngPlus: d.ngPlus } : null;
  };
  S.exportFile = function () {
    const blob = new Blob([JSON.stringify(UM.state)], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'universe_mud_' + (UM.state.char.name || 'save') + '.json';
    a.click();
    setTimeout(() => URL.revokeObjectURL(a.href), 5000);
  };
  S.importText = function (text) {
    try {
      const data = JSON.parse(text);
      if (!data || !data.char) return false;
      UM.state = data;
      return true;
    } catch (e) { return false; }
  };
  S.meta = function () {
    const st = storage();
    let m = { unlocked: {} };
    if (st) { try { m = Object.assign(m, JSON.parse(st.getItem(META) || '{}')); } catch (e) {} }
    return m;
  };
  S.unlockEnding = function (key) {
    const st = storage();
    const m = S.meta();
    m.unlocked[key] = Date.now();
    if (st) st.setItem(META, JSON.stringify(m));
  };
  S.clearAll = function () {
    const st = storage();
    if (!st) return;
    st.removeItem(AUTO);
    for (let i = 1; i <= 3; i++) st.removeItem(SLOT(i));
  };
  UM.Save = S;
})();
