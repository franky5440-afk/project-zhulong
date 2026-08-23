(function () {
  UM.reg([
    { id: 'arr_belt', chapter: '第三章・盤古井', text: '穀神星，小行星帶唯一的矮行星。人類在它的冰幔裡挖了一口豎井——礦工們叫它「盤古井」，因為開鑿那天有人說：我們是在給太陽系開天闢地。井口的環形礦站在微重力下緩緩自旋。', auto: { label: '靠泊盤古井', goto: 'h_belt' } },
    { id: 'h_belt', chapter: '第三章・盤古井', hub: true, text: '礦站的走廊裡飄著岩塵和速食麵的味道。三百名礦工輪班下井，把太陽系嬰兒期的岩石拖出來。這裡的規矩只有一條：誰都不問「值得嗎」。', choices: [
      { t: '領一把電漿鑽，跟班下井採礦', req: { noflags: ['mined'] }, fx: {}, goto: 'mine1' },
      { t: '調查外圍的無人探測器殘骸', req: { noflags: ['der_done'] }, fx: {}, goto: 'der1' },
      { t: '以物易物：用礦芯換補給', req: { items: { ore: 1 } }, cost: { items: { ore: 1 } }, fx: { items: { ration: 2, repair: 1, fuelcell: 1 } }, goto: 'h_belt' },
      { t: '繞道：木衛二冰下海洋（消耗燃料）', req: { noflags: ['europa_done'], res: { fuel: 15 } }, cost: { res: { fuel: 15 } }, goto: 'TRAVEL:jupiter' },
      { t: '啟程：木星引力彈弓', req: { res: { fuel: 10 } }, cost: { res: { fuel: 10 } }, goto: 'js1' }
    ]},
    { id: 'mine1', chapter: '第三章・盤古井', speaker: '礦工老周', text: '老周教你握鑽：「電漿鑽不聽力氣，聽心跳。你慌，它就歪。」冰幔深處安靜得能聽見自己的血流。鑽頭咬進四十億年的冰層時，你忽然明白所謂採礦，是替宇宙翻閱它自己的日記。', auto: { label: '收工', goto: 'h_belt' }, fx: { items: { drill: 1, ore: 2 }, xp: 14, res: { morale: 6 }, flags: { mined: 1 } } },
    { id: 'der1', chapter: '第三章・盤古井', text: '殘骸懸浮在礦區邊緣，半截探測器，太陽翼朝著太陽的方向——可它的軌道根本照不到多少陽光。工藝是人類的，序號卻查無此機。晶片角落刻著一行小字：「他們也在數你的心跳。」', auto: { label: '帶走晶片', goto: 'h_belt' }, fx: { items: { probe_chip: 1 }, scores: { obsession: 1 }, xp: 12, flags: { der_done: 1 } } },

    { id: 'arr_europa', chapter: '第三章・木衛二', text: '歐羅巴的冰殼在下方延伸到視野盡頭，裂隙裡滲出淡淡的水汽羽流。雷達顯示冰下二十公里處有一片鹹水海洋——比地球所有海洋加起來還多一倍的水，在永夜裡靜靜發燙。', auto: { label: '投放熱鑽探頭', goto: 'eu2' } },
    { id: 'eu2', chapter: '第三章・木衛二', text: '探測器破冰而入的那一刻，全船屏住了呼吸。探照燈照亮的海水中，成群的半透明生物緩緩起伏，傘蓋一開一合，每一次收縮都泛起藍白色的光。生物學家哭了。「牠們在發光通訊，」她說，「這片海已經唱了四十億年，我們是第一批觀眾。」', choices: [
      { t: '無干擾採集一枚脫落樣本', fx: {}, goto: 'eu3' },
      { t: '只錄影。別從牠們的家拿走任何東西', fx: {}, goto: 'eu4' }
    ]},
    { id: 'eu3', chapter: '第三章・木衛二', text: '樣本艙亮起幽幽藍光。你知道自己帶走的不只是生物檢體，是一張名片：「你好，我們來了。」', auto: { label: '回收探測器', goto: 'h_belt' }, fx: { flags: { europa_done: 1 }, items: { jelly: 1 }, scores: { hope: 1 }, xp: 20 } },
    { id: 'eu4', chapter: '第三章・木衛二', text: '你讓探測器空手而歸。臨走前，燼火號對著冰層播放了一段地球鯨歌。沒有回應——但你願意相信，某個深海裡的傘蓋，為此多開合了一次。', auto: { label: '啟程返航', goto: 'h_belt' }, fx: { flags: { europa_done: 1 }, scores: { humanity: 1 }, res: { morale: 10 }, xp: 14 }, bonus: { minLevel: 3, t: '✦ 直覺：調低功率，用被動聲吶再聽十分鐘', fx: { flags: { europa_secret: 1 }, xp: 15, scores: { obsession: 1 } }, goto: 'eu5' } },
    { id: 'eu5', chapter: '第三章・木衛二', text: '十分鐘後，被動陣列記錄到一段規律回波——不是生物，是幾何。冰殼深處有一個人工構造，沉默，古老，像一座沉睡的鐘。你把座標存進加密分區，沒告訴任何人。有些東西，知道的人越少越安全。', auto: { label: '啟程返航', goto: 'h_belt' }, fx: { flags: { europa_done: 1 } } },

    { id: 'js1', chapter: '第三章・木星', text: '木星佔滿天空的那一天，沒有人說話。大紅斑像一隻瞇起的眼睛，四百年的風暴在你眼前打轉。尤里把航向校到最後一位小數：「引力彈弓，先生女士們。我們要借這顆巨人的力氣甩自己去土星——別客氣，宇宙請客。」', choices: [
      { t: '貼近輻射帶，榨取最大加速', fx: {}, goto: 'js2' },
      { t: '保守航線，安全第一', fx: {}, goto: 'js3' }
    ]},
    { id: 'js2', chapter: '第三章・木星', text: '輻射警報響成了搖籃曲。燼火號以每秒二十一公里的速度掠過雲頂，獲得了計畫外的每秒三公里。莎拉事後給所有人做了全套檢查，然後宣布：「值。」', auto: { label: '設定航向：土星', goto: 'TRAVEL:titan' }, fx: { res: { fuel: 12 }, xp: 16 } },
    { id: 'js3', chapter: '第三章・木星', text: '你選了遠端彈弓。省下的劑量換來慢了九天的航期，以及一次完整的、無遮擋的木星日落。有時候，慢也是一種技術選擇。', auto: { label: '設定航向：土星', goto: 'TRAVEL:titan' }, fx: { res: { morale: 8 }, xp: 8 } }
  ]);
})();
