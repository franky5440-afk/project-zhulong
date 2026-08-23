(function () {
  UM.reg([
    { id: 'arr_mars', chapter: '第二章・烏托邦平原', text: '七天的核熱航程後，火星佔滿了整面舷窗。鏽紅色的荒原上，烏托邦平原城的玻璃穹頂像一串露水。下降途中，氣象雷達忽然炸出一片深紅：沙暴，正對著著陸區。', auto: { label: '進入降落流程', goto: 'm_storm' } },
    { id: 'm_storm', chapter: '第二章・烏托邦平原', speaker: '管制中心', text: '「燼火號注意，三號溫室在沙暴中失壓！裡面還有一個孩子——殖民隊的孩子，去搶救他實驗日誌的。」風速每秒四十米，能見度趨近於零。', choices: [
      { t: '親自駕駛救援艇穿暴', sub: '你是全船操舵最好的', fx: {}, goto: 'm_storm_a' },
      { t: '放出蜂鳥引導無人救援車', req: { items: { drone: 1 } }, fx: {}, goto: 'm_storm_b' },
      { t: '等沙暴眼過境再行動', fx: {}, goto: 'm_storm_c' }
    ]},
    { id: 'm_storm_a', chapter: '第二章・烏托邦平原', text: '你在橙紅色的混沌裡飛了十九分鐘，儀表盤被砂礫打得劈啪作響。當救援艇的探照燈照到溫室裂口時，你聽見自己的心跳蓋過了風暴。——孩子活著。整座殖民地都在歡呼。', auto: { label: '返回母艦', goto: 'h_mars' }, fx: { res: { hull: -8 }, scores: { humanity: 2, bond: 1 }, xp: 18 } },
    { id: 'm_storm_b', chapter: '第二章・烏托邦平原', text: '蜂鳥頂著風把信標釘在溫室屋頂，救援車順著信標摸到了孩子。事後它趴在機庫充電，翅膀上全是刮痕，電子音都跑調了。「英雄也會累的，」高志遠說，「給牠加兩天假。」', auto: { label: '返回母艦', goto: 'h_mars' }, fx: { scores: { humanity: 1 }, xp: 12 } },
    { id: 'm_storm_c', chapter: '第二章・烏托邦平原', text: '四小時後沙暴減弱，救援隊找到了孩子——他躲在培養槽後面，用實驗室的營養液撐了下來，還順手記錄了完整的氣壓曲線。你鬆了一口氣，又有一點說不出的空落。', auto: { label: '返回母艦', goto: 'h_mars' }, fx: { res: { morale: -6 }, scores: { obsession: 1 }, xp: 6 } },

    { id: 'h_mars', chapter: '第二章・烏托邦平原', hub: true, text: '烏托邦平原城，人口一萬七千。穹頂外的世界屬於鐵氧化物，穹頂內屬於人類：學校、酒吧、以及一座種滿地球植物的「綠洲花房」。發射窗口前，你可以走走。', choices: [
      { t: '拜訪老科學家秦朗', req: { noflags: ['met_qin'] }, fx: {}, goto: 'qn1' },
      { t: '參觀綠洲花房', req: { noflags: ['saw_lily'] }, fx: {}, goto: 'mc_garden' },
      { t: '申請通訊日，和家人好好聊聊', req: { noflags: ['fam2'] }, fx: {}, goto: 'ec2' },
      { t: '在城中休整一日', req: { noflags: ['rest_mars'] }, fx: {}, goto: 'mc_rest' },
      { t: '補給與加油', req: { noflags: ['sup_mars'] }, fx: {}, goto: 'sp_mars' },
      { t: '啟程：小行星帶・穀神星', req: { res: { fuel: 20 } }, cost: { res: { fuel: 20 } }, goto: 'TRAVEL:belt' }
    ]},

    { id: 'mc_garden', chapter: '第二章・烏托邦平原', text: '花房裡潮濕而安靜，番茄藤爬上人工光架。角落裡，一株細瘦的植物開著白花——植物學家方蕾蹲在旁邊，眼睛紅紅的：「第一株在外星開花的地球植物。我叫它火星百合。」她剪下一枝放進你手心，「帶去邊界吧。讓宇宙看看，我們出門也會帶花的。」', auto: { label: '收下百合', goto: 'h_mars' }, fx: { items: { lily: 1 }, scores: { hope: 1, family: 1 }, flags: { saw_lily: 1 }, xp: 10 } },

    { id: 'qn1', chapter: '第二章・烏托邦平原', speaker: '秦朗', text: '秦朗七十四歲，是迴聲訊號最早的解讀者之一，如今在殖民地的中學教物理。他的宿舍堆滿紙質筆記——這裡禁止的東西。「年輕人，」他壓低聲音，「你知道嗎，DSA 在對外公開之前三年就收到迴聲了。三年。他們用來做什麼，檔案裡一個字都不剩。」', choices: [
      { t: '「您有證據嗎？」', fx: { flags: { met_qin: 1, clue_qin: 1 }, scores: { obsession: 1 } }, goto: 'qn2' },
      { t: '「為什麼要告訴我這些？」', fx: { flags: { met_qin: 1, clue_qin: 1 } }, goto: 'qn2' }
    ]},
    { id: 'qn2', chapter: '第二章・烏托邦平原', speaker: '秦朗', text: '老人從一本《普通物理》的挖空書芯裡取出一枚數據晶片：「我的備份，斷斷續續。他們刪得掉伺服器，刪不掉我這顆腦袋。」他把晶片按在你掌心，「到了土星軌道，你會需要它的。相信我。」', auto: { label: '離開', goto: 'h_mars' }, fx: { items: { directive7: 1, part_b: 1 }, xp: 14 } },

    { id: 'ec2', chapter: '第二章・烏托邦平原', text: '火星的通訊延遲長達十幾分鐘，聊天變成了朗讀。你念你的航行，家人念家裡的瑣事：誰病了、誰結婚了、院子裡的樹開花了。掛斷後很久，你還盯著螢幕上自己的倒影。原來「想念」是有重量的，而且真空裡一點都不會衰減。', auto: { label: '回到環廊', goto: 'h_mars' }, fx: { scores: { family: 1 }, res: { morale: 14 }, flags: { fam2: 1 } } },
    { id: 'mc_rest', chapter: '第二章・烏托邦平原', text: '你在殖民地的低重力泳池泡了一下午，和陌生人聊了毫無意義的天。奇蹟般地，那正是靈魂需要的東西。', auto: { label: '回到環廊', goto: 'h_mars' }, fx: { res: { morale: 18 }, flags: { rest_mars: 1 } } },
    { id: 'sp_mars', chapter: '第二章・烏托邦平原', speaker: '補給站', text: '殖民地的聚變燃料廠為燼火號加滿了氘。「火星造價，」站長拍著管線驕傲地說，「比地球運來便宜六成。告訴外頭的人：我們不是前哨，我們是新省。」', auto: { label: '完成補給', goto: 'h_mars' }, fx: { res: { fuel: 100, hull: 100 }, items: { ration: 1, part_a: 1 }, flags: { sup_mars: 1 } } }
  ]);
})();
