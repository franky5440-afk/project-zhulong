(function () {
  const E = [];
  function ev(id, era, w, once) { E.push({ id, era, w: w || 2, once: !!once }); }
  function n(id, o) { o.id = id; E.push(o); }
  ev('ev_micro1', 'early', 3);
  n('ev_micro1', { chapter:'航程', speaker: '', text: '警報聲撕開了安靜的值班室。雷達上，數十個亮點正以每秒七十公里的速度逼近——一場無名的微隕石群，宇宙裡最普通的伏擊。', fx: {}, choices: [
    { t: '手動操舵，貼著彈幕縫隙穿過去', sub: '風險與浪漫各半', req: {}, goto: 'ev_micro_a' },
    { t: '放出蜂鳥引開大塊碎片', sub: '需要：維修無人機', req: { items: { drone: 1 } }, goto: 'ev_micro_b' },
    { t: '關閉引擎，縮小訊號硬扛', sub: '穩，但船體會吃幾下', goto: 'ev_micro_c' }
  ]});
  n('ev_micro_a', { chapter:'航程', text: '你把雙手放上操縱桿。三秒、兩秒——側移！船身擦過一片翻滾的碎石，像鯨魚游出鯊群。', auto: { label:'繼續', goto:'@next' } });
  n('ev_micro_b', { chapter:'航程', text: '蜂鳥哼著它永遠跑調的電子音飛了出去。碎片追著它打轉，而燼火號從缺口溜走。回艙後你拍拍它的外殼：「記你一功。」', auto: { label:'繼續', goto:'@next' }, fx: { xp: 8 } });
  n('ev_micro_c', { chapter:'航程', text: '撞擊聲一記接一記，像有人在棺材板上敲門。船體發出呻吟，但撐住了。', auto: { label:'繼續', goto:'@next' }, fx: { res: { hull: -14 } } });

  ev('ev_solar1', 'early', 2);
  n('ev_solar1', { chapter:'航程', text: '太陽打了個噴嚏。X 級閃焰的帶電粒子流將在四十分鐘後掃過航道，高能輻射會烤焦暴露在艙外的任何電路。', choices: [
    { t: '全員撤入風暴屏蔽艙，讓設備聽天由命', goto: '@next', fx: { res: { hull: -6, morale: -4 } } },
    { t: '穿艙外服出去搶修天線遮蔽板', sub: '危險，但值得', req: { res: { morale: 10 } }, goto: 'ev_solar_b' }
  ]});
  n('ev_solar_b', { chapter:'航程', text: '你和工程師在粒子雨落地前完成了遮蔽板。回到氣閘時，劑量計響得像聖誕樹，但你們笑得像兩個偷渡成功的少年。高志遠拍了拍你腰間的磁力安全索：「這條繩子，今天替你省了一條命。」', auto: { label:'繼續', goto:'@next' }, fx: { items: { tether: 1 }, xp: 12, scores: { bond: 1 } } });

  ev('ev_ghost1', 'early', 2, true);
  n('ev_ghost1', { chapter:'航程', text: '深夜頻道裡傳來一段雜訊。你反覆聽了七遍，終於確認那不是幻覺：雜訊深處，有人在用你的名字，輕輕地數數。「……四……五……」', choices: [
    { t: '錄下來，明天交給科學組分析', fx: { scores: { obsession: 1 } }, goto: '@next' },
    { t: '刪掉。有些東西不該被聽見', fx: { res: { morale: -5 } }, goto: '@next' }
  ]});

  ev('ev_shower1', ['early','mid'], 2, true);
  n('ev_shower1', { chapter:'航程', text: '今晚穿越一片彗星殘骸帶，細碎冰晶在舷窗外燒成漫天流星。有人把燈調暗，把配給咖啡倒進同一隻杯子裡傳著喝。這一刻，飛船不是機器，是一個家。', choices: [
    { t: '說說各自地球上最想念的聲音', fx: { res: { morale: 14 }, scores: { bond: 1 } }, goto: '@next' },
    { t: '保持安靜，讓流星自己說完', fx: { res: { morale: 8 } }, goto: '@next' }
  ]});

  ev('ev_debris1', 'mid', 3, true);
  n('ev_debris1', { chapter:'航程', text: '導航雷達捕捉到一個不規則物體懸浮在星際空間——這裡離最近的恆星也有兩光年。它有太陽能板，有天线，還有一枚印著人類手掌紋路的徽章。', choices: [
    { t: '靠近掃描', fx: { xp: 10 }, goto: 'ev_debris_a' },
    { t: '拍照存證，繞開它', fx: { res: { morale: -3 } }, goto: '@next' }
  ]});
  n('ev_debris_a', { chapter:'航程', text: '那是半截探測器。工藝是人類的，序號卻不存在於任何資料庫。你撬下了它的晶片。晶片邊緣刻著一行小字，像是給下一個找到它的人：「他們也在數你的心跳。」', auto: { label:'收下晶片', goto:'@next' }, fx: { items: { probe_chip: 1 }, scores: { obsession: 1 } } });

  ev('ev_pulsar1', 'mid', 2);
  n('ev_pulsar1', { chapter:'航程', text: '前方出現一座「宇宙燈塔」：脈衝星以毫秒精度掃射電波，週期比原子鐘還準。領航員提議用它校準航向——但貼得太近，輻射會洗掉半船電子設備。', choices: [
    { t: '貼近校準，賺取精確座標', goto: 'ev_pulsar_a' },
    { t: '遠距離估算就好', goto: '@next', fx: { res: { fuel: -6 } } }
  ]});
  n('ev_pulsar_a', { chapter:'航程', text: '燼火號貼著死亡半徑掠過。螢幕上的數字跳動如心跳，最後定格成一組完美的修正值。你們用一座燈塔照亮了下一步。', auto: { label:'繼續', goto:'@next' }, fx: { xp: 15, res: { fuel: 8 } } });

  ev('ev_orphan1', 'mid', 2, true);
  n('ev_orphan1', { chapter:'航程', text: '雷達陰影裡滑過一顆流浪行星——沒有恆星的孤兒，表面凍結著永夜，內核卻靠放射性餘溫維持著一片液態海。它已經獨自漂流了四十億年，還會再漂流四百億年。', choices: [
    { t: '為它拍一張照，命名為「孤舟」', fx: { scores: { hope: 1 }, xp: 8 }, goto: '@next' },
    { t: '什麼也不做。有些孤獨不必被打擾', fx: { scores: { nihil: 1 } }, goto: '@next' }
  ]});

  ev('ev_quarrel1', 'mid', 2, true);
  n('ev_quarrel1', { chapter:'航程', text: '餐艙裡爆發了爭執。關於誰多用了氧燭、關於家書、關於一句口誤。密閉空間把小石子放大成山。', choices: [
    { t: '當和事佬，陪他們聊到凌晨', fx: { res: { morale: 10 }, scores: { bond: 1 } }, goto: '@next' },
    { t: '假裝沒聽見，你需要省下自己的力氣', fx: { res: { morale: -8 } }, goto: '@next' }
  ]});

  ev('ev_cold1', 'late', 3);
  n('ev_cold1', { chapter:'航程', text: '加熱系統按計畫進入低功率模式，艙內降到攝氏九度。呼出的氣凝成白霧。寒冷本身不致命，致命的是寒冷提醒你的事：這裡沒有一寸地方是為人類準備的。', choices: [
    { t: '泡一壺莎拉的鎮靜茶，全員分杯', req: { items: { tea: 1 } }, cost: { items: { tea: 1 } }, fx: { res: { morale: 16 } }, goto: '@next' },
    { t: '裹緊毯子，背誦家的地址入睡', fx: { res: { morale: -6 } }, goto: '@next' }
  ]});

  ev('ev_timedrift1', 'late', 3);
  n('ev_timedrift1', { chapter:'航程', text: '你開始做同一個夢：地球上的日曆嘩嘩翻動，翻到你停不下來的地方。相對論不在課本裡，在你的骨頭裡——你睡一年，外面過十年，而你答應過要回來的。', choices: [
    { t: '在日誌裡寫信給「未來的他們」', fx: { scores: { hope: 1 }, time: 1 }, goto: '@next' },
    { t: '停止計算時差。不知道，就不存在', fx: { time: 2, scores: { nihil: 1 } }, goto: '@next' }
  ]});

  ev('ev_echo21', ['late'], 2, true);
  n('ev_echo21', { chapter:'航程', text: '通訊陣列在無訊號狀態下自己醒了。喇叭裡播放的不是雜訊——是邊界迴聲，但它這次只重複一個詞，用一百三十七種語言：你的名字。', choices: [
    { t: '回應它', fx: { scores: { obsession: 2 }, xp: 10 }, goto: 'ev_echo2a' },
    { t: '拔掉電源，當作從未發生', fx: { res: { morale: -6 } }, goto: '@next' }
  ]});
  n('ev_echo2a', { chapter:'航程', text: '你對著麥克風念出自己的名字。迴聲停了一秒——然後換了一個詞：「快到了。」此後它再也沒有出現。你告訴自己那是巧合。你告訴自己了很多遍。', auto: { label:'繼續', goto:'@next' } });

  ev('ev_cmb1', 'void', 3, true);
  n('ev_cmb1', { chapter:'航程', text: '船外，星光開始出現統一的红移偏斜——你正在接近宇宙微波背景的「牆」，一切可觀測光線的出生地。這裡的光比太陽老一百三十八億歲。', choices: [
    { t: '召集全員看一眼。值得', fx: { scores: { hope: 2 }, res: { morale: 10 } }, goto: '@next' },
    { t: '計算它的熵產率。美是給詩人的', fx: { scores: { obsession: 1 }, xp: 12 }, goto: '@next' }
  ]});

  ev('ev_entsong1', 'void', 4, true);
  n('ev_entsong1', { chapter:'航程', text: '所有儀器同時安靜下來。然後你聽見歌聲——不是透過耳朵，是透過時間。每個音符都比你先抵達。熵歌者在附近，隔著不知什麼，唱著不知什麼。', choices: [
    { t: '跟著旋律呼吸', fx: { scores: { obsession: 1, hope: 1 } }, goto: '@next' },
    { t: '戴上耳塞，專注掌舵', fx: { res: { morale: -4 } }, goto: '@next' }
  ]});

  UM.DATA.EVENTS = E.filter(e => e.era);
  UM.reg(E.filter(e => !e.era));
})();
