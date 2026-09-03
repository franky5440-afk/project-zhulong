(function () {
  const T = {};
  T.moon = { name: '月球・廣寒站', arr: 'arr_moon', era: 'early', ev: 1 };
  T.mars = { name: '火星・烏托邦平原', arr: 'arr_mars', era: 'early', ev: 2 };
  T.belt = { name: '穀神星・盤古井礦站', arr: 'arr_belt', era: 'early', ev: 2 };
  T.jupiter = { name: '木衛二・冰下之海', arr: 'arr_europa', era: 'early', ev: 1 };
  T.titan = { name: '土衛六・泰坦甲烷湖', arr: 'arr_titan', era: 'mid', ev: 1 };
  T.proxima = { name: '半人馬座α・比鄰星b', arr: 'arr_proxima', era: 'mid', ev: 2 };
  T.pulsar_pl = { name: '脈衝星行星・燈塔之眼', arr: 'pl_pulse_1', era: 'mid', ev: 1 };
  T.rogue = { name: '流浪行星・孤舟', arr: 'pl_rogue_1', era: 'mid', ev: 1 };
  T.trappist = { name: 'TRAPPIST-1e・新火種前哨', arr: 'pl_trap_1', era: 'late', ev: 1 };
  T.redgiant = { name: '紅巨星・方舟殘骸帶', arr: 'pl_red_1', era: 'late', ev: 0 };
  UM.DATA.TRAVELS = T;

  const P = [];
  function seq(prefix, arr) {
    arr.forEach((o, i) => { o.id = o.id || prefix + (i + 1); P.push(o); });
  }

  seq('pl_pulse_', [
    { text: '三顆岩石行星繞著那座「燈塔」狂奔——一顆毫秒脈衝星。最近的行星被輻射剝去了大氣，表面卻結晶出一層會發光的矽玻璃，隨電波掃射明滅，像整顆星球在眨眼。', choices: [
      { t: '降落採集發光玻璃標本', goto: 'pl_pulse_2' },
      { t: '遠觀即可。這裡的美有輻射劑量', fx: { scores: { hope: 1 } }, goto: 'ac_hub' },
      { t: '嘗試同步脈衝星節奏進行通訊', req: { items: { translator: 1 } }, goto: 'pl_pulse_comm' }
    ]},
    { text: '你帶回一塊「燈塔玻璃」。它在艙內持續發出微光，頻率與脈衝星完全同步。工程師用它做了一盞走廊夜燈，從此沒人再抱怨失眠。', auto: { label: '啟程返航', goto: 'ac_hub' }, fx: { items: { ore: 1, proxima_glass: 1 }, flags: { pulse_done: 1 }, xp: 14, res: { hull: -4 } } },
    { id: 'pl_pulse_comm', text: '你用解碼器嘗試與脈衝星「對話」——發送質數序列，等待回應。第十二次脈衝後，回應來了：不是質數，是一組座標。指向銀河系外的一片虛無。ARIA 分析道：「這不是自然現象。有人在用脈衝星當燈塔，指向界膜之外。」', auto: { label: '記錄座標', goto: 'pl_pulse_2' }, fx: { flags: { clue_fleet: 1 }, scores: { obsession: 1 }, xp: 20 } }
  ]);

  seq('pl_rogue_', [
    { text: '孤舟號流浪行星的冰殼裂縫中冒著地熱蒸汽。熱泉邊緣，化學合成菌落鋪成數公里寬的橙紅色地毯——沒有陽光的星球上，生命照樣找到了出路。', choices: [
      { t: '鑽取冰芯，研究這片無光生態', req: { items: { analyzer: 1 } }, goto: 'pl_rogue_2' },
      { t: '只留下足跡和敬畏', fx: { scores: { hope: 2 }, res: { morale: 8 } }, goto: 'ac_hub' },
      { t: '在熱泉邊建立一個永久觀測站', req: { items: { fabricator: 1 } }, goto: 'pl_rogue_station' }
    ]},
    { text: '冰芯封存了四十億年的代謝紀錄。分析儀吐出的曲線讓科學組沉默了很久：生命比想像中頑強得多。這個結論，後來救了很多人的信念。', auto: { label: '啟程返航', goto: 'ac_hub' }, fx: { items: { ore: 1, rogue_core: 1 }, flags: { rogue_done: 1 }, xp: 18, scores: { hope: 1 } } },
    { id: 'pl_rogue_station', text: '你們在熱泉邊組裝了一座自動化觀測站，動力來自地熱，數據直傳燼火號。它會在這顆流浪星球繼續漂流的億萬年間，記錄下每一次地質變化、每一代微生物的演化。高志遠在站體上刻了行字：「人類來過。我們看見了生命的固執。」', auto: { label: '啟程返航', goto: 'ac_hub' }, fx: { flags: { rogue_done: 1, rogue_station: 1 }, items: { ore: 1 }, scores: { hope: 2, humanity: 1 }, xp: 25, res: { morale: 12 } } }
  ]);

  seq('pl_trap_', [
    { text: 'TRAPPIST-1e 的晨霧裡立著一排風力機，葉片緩慢切割紅矮星的暗金色光線。這是「新火種」前哨——人類第一個恆星際殖民地，建成二十三年，人口一千一百人。他們看到燼火號時，全島的燈同時閃了三下。那是他們的歡呼方式。', choices: [
      { t: '降落，與殖民者共度一日', goto: 'pl_trap_2' },
      { t: '軌道互播影像就好，別驚擾他們的節奏', fx: { scores: { hope: 1 } }, goto: 'cm_pre' },
      { t: '協助他們修復老化的生命維繫系統', req: { items: { fabricator: 1, part_d: 1 } }, goto: 'pl_trap_repair' }
    ]},
    { text: '孩子們圍著你們要簽名，彷彿你們是傳說裡的人。村長請你們喝真正的、土壤裡長出來的茶。「地球還好嗎？」他問。你們對視一眼，誰都沒先開口。——臨走時，村長塞給你一枚金屬牌：「給還在路上的船。上面刻的是我們全部人的名字。」', choices: [
      { t: '收下銘牌', fx: { res: { morale: 20 }, scores: { hope: 2, bond: 1, family: 1 } }, goto: 'pl_trap_3' },
      { t: '婉拒：把它留給更需要紀念的人', fx: { res: { morale: 10 }, scores: { hope: 1, humanity: 1 } }, goto: 'pl_trap_3' }
    ]},
    { text: '升空時，全島又閃了三下燈。這一次，像是道別。你在日誌裡寫：原來「家」是可以複製的東西——只要你帶著足夠多的人。', auto: { label: '啟程返航', goto: 'cm_pre' }, fx: { flags: { trap_done: 1 }, xp: 16 } },
    { id: 'pl_trap_repair', text: '前哨的二氧化碳洗滌器已經運轉超負荷三年。你們用反物質磁瓶替換了核心磁約束場，用相干場發射器穩定了空氣循環泵的量子振盪。村長眼裡有淚光：「我們以為地球忘了我們。」你把一包地球茶葉留下，換走一包 TRAPPIST 真茶。', auto: { label: '啟程返航', goto: 'cm_pre' }, fx: { flags: { trap_done: 1 }, items: { trap_tea: 1, ark_plate: 1 }, scores: { humanity: 2, hope: 1, bond: 1 }, xp: 25, res: { morale: 20 } } }
  ]);

  seq('pl_red_', [
    { text: '紅巨星膨脹的外層大氣像燃燒的海洋。氣體流中漂著一片殘骸場——上百艘不同形制的飛船，四種以上完全陌生的工程哲學。它們朝同一個方向排列，像一支在撤退中凍結的艦隊。', choices: [
      { t: '搜尋仍可讀取的黑匣子', goto: 'pl_red_2' },
      { t: '為它們拍攝全景，記錄座標', fx: { xp: 10, scores: { nihil: 1 } }, goto: 'cm1' },
      { t: '嘗試喚醒一艘休眠中的陌生飛船', req: { items: { quantum_compass: 1 } }, goto: 'pl_red_wake' }
    ]},
    { text: '第七艘船的黑匣子還活著。翻譯矩陣拼出斷續的語句：「……界膜不是出口，是產道……不要獨自前往……我們回去是為了我們回去是為了帶更多人來……」錄音在此中斷。你和船員們久久沒有說話。', auto: { label: '繼續深入暗暈', goto: 'cm1' }, fx: { flags: { clue_fleet: 1 }, xp: 15, scores: { obsession: 1 } } },
    { id: 'pl_red_wake', text: '量子羅盤指向一艘晶體結構的飛船——它沒有引擎，整艘船就是一個巨大的量子態。你們的喚醒信號觸發了它的回應：一段完整的星際航線圖，從這裡直達界膜，繞過所有已知收割區。船體表面亮起文字：「第 137 號觀測者，歡迎回家。下一站：緘默議會。」', auto: { label: '繼續深入暗暈', goto: 'cm1' }, fx: { flags: { clue_fleet: 1, vanguard_route: 1 }, items: { vanguard_key: 1 }, scores: { obsession: 1, hope: 1 }, xp: 30 } }
  ]);

  UM.reg(P);
})();
