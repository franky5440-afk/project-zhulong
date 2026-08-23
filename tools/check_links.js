const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
global.window = global;
global.localStorage = undefined;
function load(rel) {
  const code = fs.readFileSync(path.join(root, rel), 'utf8');
  try { eval(code); } catch (e) { console.error('LOAD FAIL', rel, e.message); process.exit(1); }
}
load('js/core.js');
['js/data/lore.js', 'js/data/characters.js', 'js/data/items.js', 'js/data/phenomena.js', 'js/data/planets.js', 'js/data/endings.js',
  'js/data/story/s0.js', 'js/data/story/s1.js', 'js/data/story/s2.js', 'js/data/story/s3.js', 'js/data/story/s4.js',
  'js/data/story/s5.js', 'js/data/story/s6.js', 'js/data/story/s7.js', 'js/data/story/s7b.js', 'js/data/story/s8.js'
].forEach(load);
load('js/engine_a.js'); load('js/engine_b.js');

const Nodes = UM.Nodes;
const problems = [];
function ref(id) {
  if (id === '@next' || id === 'ENDINGS') return true;
  if (typeof id === 'string' && id.startsWith('TRAVEL:')) {
    const k = id.slice(7);
    if (!UM.DATA.TRAVELS[k]) problems.push('unknown travel ' + k);
    else if (!Nodes[UM.DATA.TRAVELS[k].arr]) problems.push('missing arrival ' + UM.DATA.TRAVELS[k].arr);
    return true;
  }
  return !!Nodes[id];
}
let nodeCount = 0;
for (const id in Nodes) {
  nodeCount++;
  const n = Nodes[id];
  const gos = [];
  (n.choices || []).forEach((c, i) => c.goto && gos.push([`choice${i}`, c.goto]));
  if (n.auto && n.auto.goto) gos.push(['auto', n.auto.goto]);
  if (n.bonus && n.bonus.goto) gos.push(['bonus', n.bonus.goto]);
  for (const [tag, g] of gos) {
    if (!ref(g)) problems.push(`${id} -> ${tag}: '${g}' 不存在`);
  }
}
for (const ev of UM.DATA.EVENTS) {
  const rootId = ev.id;
  if (!Nodes[rootId]) problems.push('event root missing: ' + ev.id);
}
for (const k in UM.DATA.TRAVELS) {
  if (!Nodes[UM.DATA.TRAVELS[k].arr]) problems.push('travel arr missing ' + UM.DATA.TRAVELS[k].arr);
}
for (const end of UM.DATA.ENDINGS) {
  if (typeof end.when !== 'function') problems.push('ending when not fn ' + end.key);
  if (!end.art || !end.title) problems.push('ending art/title missing ' + end.key);
}
console.log('節點總數:', nodeCount, '｜事件池:', UM.DATA.EVENTS.length, '｜航線:', Object.keys(UM.DATA.TRAVELS).length, '｜結局:', UM.DATA.ENDINGS.length);
if (problems.length) {
  console.log('發現問題:');
  problems.forEach(p => console.log(' -', p));
  process.exit(1);
} else {
  console.log('所有節點連結與資料引用完整。');
}
