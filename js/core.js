(function () {
  window.UM = window.UM || {};
  UM.Nodes = {};
  UM.DATA = UM.DATA || {};
  UM.reg = function (list) {
    for (const n of list) {
      if (!n.id) throw new Error('node missing id: ' + JSON.stringify(n).slice(0, 80));
      if (UM.Nodes[n.id]) throw new Error('duplicate node id: ' + n.id);
      UM.Nodes[n.id] = n;
    }
  };
  UM.VERSION = '1.3.0';
  UM.SAVE_VERSION = 3;
})();
