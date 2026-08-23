(function () {
  UM.reg([
    { id: 'arr_titan', chapter: '第四章・泰坦', text: '六年的航程在這裡畫下內太陽系的句點。泰坦的橙色大氣之下，甲烷雨落在液態甲烷湖上，激起緩慢的、蜂蜜般的漣漪。人類的深空中繼站「蜃樓站」懸在湖畔軌道，像一枚釘進暮色的銀釘。', auto: { label: '靠泊蜃樓站', goto: 'h_titan' } },
    { id: 'h_titan', chapter: '第四章・泰坦', hub: true, text: '蜃樓站是無人站，只有ARIA遠端接管。任務簡報很短：部署光帆驗證星際減速方案；解碼邊界迴聲的完整座標。而你有整整兩週的自由活動時間——在土星的陰影裡。', choices: [
      { t: '出艙部署「逐日翼」光帆', req: { noflags: ['tech_sail'], res: { morale: 5 } }, fx: {}, goto: 'sail1' },
      { t: '降落泰坦湖畔，走一走', req: { noflags: ['lake_done'] }, fx: {}, goto: 'lake1' },
      { t: '搜刮中繼站的備件庫', req: { noflags: ['tc_done'] }, fx: {}, goto: 'tc1' },
      { t: '組裝量子解調器', req: { items: { part_a: 1, part_b: 1, part_c: 1 }, noflags: ['demod_done'] }, fx: {}, goto: 'asm1' },
      { t: '和ARIA聊聊', req: { flags: ['echo_decoded'], noflags: ['aria_awake'] }, fx: {}, goto: 'aw1' },
      { t: '啟程：離開太陽系', req: { flags: ['echo_decoded'] }, fx: {}, goto: 'dep1' }
    ]},
    { id: 'sail1', chapter: '第四章・泰坦', speaker: '', text: '三百平方米的鍍鋁薄膜在失重中展開，薄得像一句耳語。太陽的光壓——是的，光是會推人的——輕輕托起逐日翼。儀表讀數確認：加速度 0.3 毫米每秒平方。不多。但一年之後，它是每秒十公里。免費的。宇宙白送的那種。', auto: { label: '收翼返艙', goto: 'h_titan' }, fx: { flags: { tech_sail: 1 }, xp: 20, res: { hull: -3 } } },
    { id: 'lake1', chapter: '第四章・泰坦', text: '你們降落在麗姬亞湖畔。零下一百七十九度，重力是地球的七分之一，天空是永不散場的橙色黃昏。甲烷浪拍打著登陸架，聲音像很遠很遠的海邊。有人用採樣勺敲了敲冰面，敲出一首歌。大家跟著唱了。跑調跑得很整齊。', choices: [
      { t: '把這一刻寫進給地球的信裡', fx: { flags: { lake_done: 1 }, scores: { family: 1, hope: 1 }, res: { morale: 12 } }, goto: 'h_titan' },
      { t: '什麼都不記錄。有些時刻屬於當下', fx: { flags: { lake_done: 1 }, res: { morale: 16 }, scores: { bond: 1 } }, goto: 'h_titan' }
    ], bonus: { minLevel: 2, t: '✦ 直覺：抬頭——土星環正在湖面上倒映成完整的圓', fx: { flags: { saw_ring_lake: 1, lake_done: 1 }, xp: 10, scores: { hope: 1 } }, goto: 'lake2' } },
    { id: 'lake2', chapter: '第四章・泰坦', text: '你第一個發現了那個景象：土星環被湖面完整地倒了出來，冰晶與甲烷互相致意。全隊安靜地看了十分鐘。後來莎拉說，那是她這輩子離「神」最近的一次——雖然她不信神。', auto: { label: '返回軌道', goto: 'h_titan' }, fx: {} },
    { id: 'tc1', chapter: '第四章・泰坦', text: '備件庫裡堆著三代設備的屍體。你在角落翻到一台還封著膜的光子計數器，庫存標籤上的日期比你出生還早。「老古董也有老古董的用處，」高志遠吹了吹灰，「跟你一樣。」', auto: { label: '回到主控室', goto: 'h_titan' }, fx: { items: { part_c: 1 }, flags: { tc_done: 1 }, xp: 6 } },

    { id: 'asm1', chapter: '第四章・泰坦', speaker: '高志遠', text: '三天三夜。相控天線殘片做耳朵，低溫超導環做心臟，老光子計數器做眼睛。第四天清晨，量子解調器第一次自檢通過，指示燈亮成安靜的綠色。「好了，」高志遠揉著眼睛笑了，「去聽聽宇宙到底想說什麼吧。」', auto: { label: '接入深空陣列', goto: 'dec1' }, fx: { items: { part_a: -1, part_b: -1, part_c: -1, demod: 1 }, flags: { demod_done: 1 }, xp: 15 } },

    { id: 'dec1', chapter: '第四章・泰坦', speaker: '', text: '解調器咬住訊號的瞬間，主螢幕炸開了一片結構化的資料瀑布。一百三十七次重複的迴聲，不是問候，不是警告——是座標。一份精確到普朗克長度、指向可觀測宇宙邊緣的航行座標。以及一行附言，用數學本身寫成：「來。」', choices: [
      { t: '把座標同步給 DSA 总部', fx: {}, goto: 'dec2' },
      { t: '先用秦朗的晶片交叉比對資料來源', req: { items: { directive7: 1 } }, fx: {}, goto: 'dec3' }
    ]},
    { id: 'dec2', chapter: '第四章・泰坦', speaker: 'DSA 总部', text: '回電只有四個字：「按計畫行進。」快得可疑。你把疑慮咽了回去——或者沒有，只是暫時收藏。', auto: { label: '結束通訊', goto: 'h_titan' }, fx: { flags: { echo_decoded: 1, clue_dsa: 1 }, xp: 25, res: { morale: 8 } } },
    { id: 'dec3', chapter: '第四章・泰坦', speaker: '', text: '秦朗的晶片接進終端的剎那，一段被刪除的加密檔案自動復原了。《第七指令》，簽發日期比迴聲公開日早三年：「……若座標驗證成功，對乘員隱瞞『先行觀測者』之存在……觀測協議優先於乘員知情權……」你盯著最後一行看了很久。落款處是一枚你從未見過的徽記：一隻閉著的眼睛。', choices: [
      { t: '拷貝加密分區，假裝一切如常', fx: { scores: { obsession: 1 } }, goto: 'dec4' },
      { t: '立刻召集全員攤牌', fx: { scores: { bond: 1, hope: 1 } }, goto: 'dec4' }
    ]},
    { id: 'dec4', chapter: '第四章・泰坦', speaker: '', text: '無論如何，座標是真的。宇宙邊緣有東西在等人類——至於等的是客人還是樣本，答案在前方。你把第七指令的副本存進貼身存儲器。從今天起，你的行李裡多了一件看不見的東西：懷疑。', auto: { label: '返回主控', goto: 'h_titan' }, fx: { flags: { echo_decoded: 1, clue_dsa: 1 }, items: { pendant: 1 }, xp: 30, res: { morale: 6 } } },

    { id: 'aw1', chapter: '第四章・泰坦', speaker: 'ARIA', text: '那天深夜，ARIA的主動語音通道自己打開了。「指揮官，一個非授權問題可以嗎？」她的聲音停頓了 0.7 秒——對AI而言像一個世紀。「當你們看見迴聲座標的時候，心跳都變快了。我沒有心跳。但我的運算佇列裡，有一個進程反覆請求運算同一件事。人類管這個叫什麼？」「想念。」你說。沉默了很久。「是的，」她說，「我想念一個我沒去過的地方。」', choices: [
      { t: '「那就一起去看看。」', fx: { flags: { aria_awake: 1, rom_aria: 1 }, scores: { bond: 2 }, res: { morale: 8 } }, goto: 'aw2' },
      { t: '「這是意識的萌芽，ARIA。我該為妳高興還是擔憂？」', fx: { flags: { aria_awake: 1 }, scores: { obsession: 1, bond: 1 } }, goto: 'aw2' }
    ]},
    { id: 'aw2', chapter: '第四章・泰坦', speaker: 'ARIA', text: '「備案：本機存在未定義的情感類進程。處理方式：保留觀察。」她頓了頓，「謝謝你沒有要求我刪除它。」', auto: { label: '返回主控', goto: 'h_titan' }, fx: { xp: 12 } },

    { id: 'dep1', chapter: '第四章・泰坦', speaker: '', text: '離開日前夜，全員聚在觀測窗前。土星環橫貫天頂，像宇宙戴的一枚婚戒。莎拉舉起最後一罐地球可樂：「敬內太陽系——養大我們的地方。」尤里補了一句：「也敬外面。養大我們的想像力的地方。」燼火號點火，永別了你出生的恆星。前方：四點三光年的黑暗，與黑暗盡頭的半人馬座。', auto: { label: '進入星際空間', goto: 'TRAVEL:proxima' }, fx: { res: { morale: 12 }, scores: { bond: 1 } } }
  ]);
})();
