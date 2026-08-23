const fs = require('fs');
const path = require('path');
const root = path.join(__dirname, '..');
global.window = global;
function load(rel) {
  eval(fs.readFileSync(path.join(root, rel), 'utf8'));
}
['js/core.js', 'js/data/lore.js', 'js/data/characters.js', 'js/data/items.js', 'js/data/phenomena.js',
  'js/data/planets.js', 'js/data/endings.js',
  'js/data/story/s0.js', 'js/data/story/s1.js', 'js/data/story/s2.js', 'js/data/story/s3.js',
  'js/data/story/s4.js', 'js/data/story/s5.js', 'js/data/story/s6.js', 'js/data/story/s7.js',
  'js/data/story/s7b.js', 'js/data/story/s8.js',
  'js/engine_a.js', 'js/engine_b.js', 'js/engine_c.js'
].forEach(load);

let endingSeen = null;
UM.onEnding = e => { endingSeen = e.key; };
let rngSeed = 42;
Math.random = () => { rngSeed = (rngSeed * 1103515245 + 12345) % 2147483648; return rngSeed / 2147483648; };

function run(label, kw) {
  rngSeed = label.length * 7919 + 13;
  UM.Engine.newGame({ bgIdx: 0, gender: 'm', name: '測試者', job: '科學家' }, null);
  UM.Engine.start();
  let steps = 0;
  const log = [];
  const seen = new Set();
  while (!UM.state.ended && steps < 8000) {
    const opts = UM.Engine.currentChoices().filter(o => o.enabled);
    if (!opts.length) { console.log('死路 @', UM.state.node); process.exit(1); }
    let best = opts[0], bestScore = -1;
    for (const o of opts) {
      let sc = 0;
      for (const k of kw) {
        if (k.startsWith('-')) { if (o.choice.t.includes(k.slice(1))) sc -= 60; }
        else if (o.choice.t.includes(k)) sc += 10;
      }
      if (o.idx === 'bonus') sc += 5;
      const key = UM.state.node + ':' + o.idx + ':' + o.choice.t.slice(0, 8);
      if (seen.has(key)) sc -= 100;
      if (sc > bestScore) { bestScore = sc; best = o; }
    }
    seen.add(UM.state.node + ':' + best.idx + ':' + best.choice.t.slice(0, 8));
    log.push(UM.state.node);
    UM.Engine.choose(best.idx);
    steps++;
  }
  if (!UM.state.ended) { console.log(label, '未在步數內結束'); process.exit(1); }
  console.log(`${label.padEnd(10)} 結局=${endingSeen.padEnd(12)} 步數=${String(steps).padStart(4)} Lv=${UM.state.level} 時間債=${UM.state.time_debt} 線索=${UM.state.clues}`);
  return endingSeen;
}

const results = {};
results.speedrun = run('speedrun', ['【絕不匹配】']);
results.family = run('family', ['-莎拉', '-ARIA', '-怕到底', '-心事', '通訊日', '花房', '火星百合', '麗姬亞', '銘牌', '返航。']);
results.friends = run('friends', ['-莎拉', '-去找ARIA', '-怕到底', '-心事', '-百合', '-銘牌', '-麗姬亞', '和事佬', '電影夜', '說說各自', '蜂鳥', '碰杯', '清醒', '返航。']);
results.romance = run('romance', ['莎拉', 'ARIA', '志遠', '喜歡', '晚飯', '返航。']);
results.monster = run('monster', ['視界', '切入', '熵印', '都收下', '跟著旋律', '回應它']);
results.rebirth = run('rebirth', ['珍珠', '武器', '釋放', '點燃']);
results.exodus = run('exodus', ['退路', '藍圖', '廣播']);
results.expose = run('expose', ['秦朗', '晶片', '殘骸', '日誌', '真相', '公開']);
results.meaningless = run('nihil', ['拒絕', '拒絕作答', '毫無意義', '停止計算']);
results.regret = run('regret', ['-莎拉', '-ARIA', '-怕到底', '-心事', '休眠', '化學推進', '繞行大空洞', '承認它', '停止計算', '返航。']);
results.hope = run('hope', ['-莎拉', '-ARIA', '-怕到底', '-心事', '-通訊日', '-百合', '-銘牌', '-麗姬亞', '-花房', '清醒', '穩妥', '保守航線', '遠端彈弓', '按時吃飯', '寫出來', '返航。']);
console.log('\n== 驗證 ==');
function chk(name, got, want) { console.log((got === want ? 'OK  ' : 'FAIL ') + name + ' → ' + got + (got === want ? '' : '（期望 ' + want + '）')); return got === want; }
let pass = true;
pass = chk('monster', results.monster, 'monster') && pass;
pass = chk('rebirth', results.rebirth, 'rebirth') && pass;
pass = chk('exodus', results.exodus, 'exodus') && pass;
pass = chk('conspiracy', results.expose, 'conspiracy') && pass;
pass = chk('meaningless', results.meaningless, 'meaningless') && pass;
pass = chk('family', results.family, 'family') && pass;
pass = chk('lover', results.romance, 'lover') && pass;
pass = chk('regret', results.regret, 'regret') && pass;
console.log(pass ? '\n主要結局路徑全部通過' : '\n有失敗項目');
const uniq = new Set(Object.values(results));
console.log('本次覆蓋結局數：', uniq.size);
