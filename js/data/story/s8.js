(function () {
  UM.reg([
    { id: 'v1', chapter: '終章・界膜', text: '你們正在穿越宇宙微波背景——一切可觀測光的出生地。儀器上的溫度讀數停在絕對零度以上二點七度，一百三十八億年前大爆炸的餘溫。穿過它之後，星光徹底消失了。窗外只剩均勻的、深不見底的黑。以及前方——一層薄薄的、微微起伏的光。像呼吸。像心跳。像繭的內壁。', auto: { label: '抵達界膜', goto: 'v2' } },
    { id: 'v2', chapter: '終章・界膜', text: '界膜在你面前展開，直徑無法測量。當燼火號靠近時，膜的表面泛起漣漪，浮現出影像：廣寒站的地球燈火、火星花房裡的白百合、歐羅巴冰下發光的水母、比鄰星晨昏線上的紫毯、逆熵之海的合唱、議會明滅的光纖——你的整段旅程在膜上倒帶重播，然後定格成一行問題。不是用文字。是用「意義」本身寫的：「攜帶什麼回去？」', auto: { label: '伸手觸碰控制界面', goto: 'v3' } },
    { id: 'v3', chapter: '終章・界膜', speaker: '', text: '你的指尖陷入光裡。界面亮起，浮出所有可能的答案。這一刻沒有導彈對峙，沒有最後通牒——只有一個物種的第一位信使，替所有人選擇如何回應宇宙。', choices: [
      { t: '返航。把一切帶回地球，回到人們身邊', sub: '家是最重的行李，也是最輕的答案', fx: { scores: { hope: 1 }, flags: { macro: 'return' } }, goto: 'v4' },
      { t: '向全人類廣播方舟座標與藍圖', sub: '需要：方舟藍圖', req: { items: { ark_blueprint: 1 } }, fx: { scores: { humanity: 2 }, flags: { macro: 'broadcast' } }, goto: 'v4' },
      { t: '公開先遣會真相，撕開十億年的收割', sub: '需要：完整證據或三條線索', req: { clues: 3 }, fx: { scores: { obsession: 1, hope: 1 }, flags: { macro: 'expose' } }, goto: 'v4' },
      { t: '釋放奇點珍珠／火種，點燃下一個宇宙', sub: '需要：珍珠或火種', req: { anyItems: [['pearl'], ['ember_seed']] }, fx: { scores: { obsession: 2 }, flags: { macro: 'rebirth' } }, goto: 'v4' },
      { t: '拒絕作答。轉身，把問題留給下一個文明', fx: { scores: { nihil: 2 }, flags: { macro: 'refuse' } }, goto: 'v4' }
    ]},
    { id: 'v4', chapter: '終章・尾聲', text: '決定已下。燼火號調轉船頭（或者沒有）。膜在你身後緩緩合攏，像一句說完的話。無論哪個宇宙，故事都在這裡換行。', auto: { label: '見證結局', goto: 'ENDINGS' } }
  ]);
})();
