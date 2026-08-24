(function () {
  const U = UM.UI;
  UM.startRun = function () {
    UM.Engine.go('p01');
  };
  UM.startGameFromState = function (data) {
    try {
      if (!data || !data.char) return false;
      UM.state = data;
      UM.state.clues = countClues(UM.state);
      U.showScreen('scr-game');
      document.getElementById('btn-start').textContent = '啟程';
      render();
      return true;
    } catch (e) { console.error(e); return false; }
  };
  function countClues(s) {
    let n = 0;
    ['probe_chip', 'directive7', 'pioneer_logs', 'vanguard_chip'].forEach(id => { if (s.inv[id]) n++; });
    ['clue_qin', 'clue_dsa', 'clue_fleet', 'clue_warp'].forEach(f => { if (s.flags[f]) n++; });
    return n;
  }
  UM.onChange = function () { render(); };
  function render() {
    UM.Panels.renderGame();
  }
  UM.onEnding = function (end) { UM.Screens.showEndingScreen(end); };
  function boot() {
    document.getElementById('ver-tag').textContent = 'v' + UM.VERSION;
    U.initStars();
    UM.Screens.bindCreate();
    UM.Screens.refresh();
    UM.Panels.bindFabs();
    document.getElementById('overlay').addEventListener('click', e => {
      if (e.target.id === 'overlay') U.closePanel();
    });
    document.getElementById('btn-new').onclick = () => {
      UM.pendingCarry = null;
      document.getElementById('carry-note').style.display = 'none';
      document.getElementById('inp-name').value = '';
      document.getElementById('btn-start').textContent = '啟程';
      U.showScreen('scr-create');
      UM.Screens.refresh();
    };
    document.getElementById('btn-continue').onclick = () => UM.Screens.showContinueMenu();
    document.getElementById('btn-intro').onclick = () => UM.Panels.showIntro();
    document.getElementById('btn-gallery').onclick = () => UM.Screens.showGallery();
    document.getElementById('btn-lore').onclick = () => UM.Panels.showLore();
    document.getElementById('btn-back-title').onclick = () => U.showScreen('scr-title');
    setInterval(() => {
      if (UM.state && !UM.state.ended && document.getElementById('scr-game').classList.contains('active')) {
        UM.state.playSec += 1;
      }
    }, 1000);
    window.addEventListener('keydown', e => {
      if (!UM.state || UM.state.ended || !document.getElementById('scr-game').classList.contains('active')) return;
      if (e.key >= '1' && e.key <= '9') {
        const opts = UM.Engine.currentChoices();
        const i = parseInt(e.key, 10) - 1;
        if (opts[i] && opts[i].enabled) UM.Engine.choose(opts[i].idx);
      } else if (e.key === 'Enter' || e.key === ' ') {
        const node = UM.Nodes[UM.state.node];
        if (node && node.auto) UM.Engine.choose(-1);
      }
    });
    U.showScreen('scr-title');
  }
  document.addEventListener('DOMContentLoaded', boot);
})();
