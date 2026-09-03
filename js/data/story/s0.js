(function () {
  UM.reg([
    { id: 'p01', chapter: '序章', speaker: '', text: '西元 2049 年。南極深空陣列截獲的「邊界迴聲」已重複播放了八年，一百三十七次，一次不差。人類動員了整個星球的工業，在月球背面建起船塢，造出一艘以神話命名的飛船——燼火號。而你，是它最後一位確認的乘員。', auto: { label: '前往發射簡報', goto: 'p02' } },
    { id: 'p02', chapter: '序章', speaker: 'DSA 招募官', text: '「歡迎加入燭龍計畫。出發前請選擇你在船上擔任的職務——別緊張，這不是考試，是讓宇宙知道該用什麼姿勢接待你。」', choices: [
      { t: '科學組・首席研究員', sub: '好奇心是你的推進劑', fx: { flags: { role_sci: 1 }, scores: { obsession: 1 }, xp: 5 }, goto: 'p03' },
      { t: '工程組・系統工程師', sub: '你負責讓所有人活著', fx: { flags: { role_eng: 1 }, scores: { hope: 1 }, xp: 5 }, goto: 'p03' },
      { t: '通訊組・深空通訊長', sub: '你是全人類的耳朵與嗓音', fx: { flags: { role_com: 1 }, scores: { bond: 1 }, xp: 5 }, goto: 'p03' }
    ]},
    { id: 'p03', chapter: '序章', text: '發射前三日，卡納維爾角。燼火號像一枚插在海邊的白蠟燭。你有三位未來共處多年的同伴——趁還能呼吸地球的空氣，去認識他們吧。', choices: [
      { t: '找醫官莎拉・科爾曼聊聊', fx: {}, goto: 'p03a' },
      { t: '拜訪領航員尤里・安東諾夫', fx: {}, goto: 'p03b' },
      { t: '去機庫找工程師高志遠', fx: {}, goto: 'p03c' },
      { t: '去見 DSA 心理評估官林醫生', fx: {}, goto: 'p03d' },
      { t: '直接前往發射塔', fx: {}, goto: 'p04' }
    ]},
    { id: 'p03a', chapter: '序章', speaker: '莎拉・科爾曼', text: '莎拉正在給一箱試管貼標籤，頭也不抬：「坐。緊張的人我見多了，手心出汗、話變多、或者反常地安靜——你是哪種？」她終於抬眼笑了，「放心，我的職責是把你們全部活著帶回來。包括你自己，別搞錯優先順序。」', choices: [
      { t: '「妳看起來比我還緊張。」', fx: { flags: { met_sarah: 1 }, scores: { bond: 1 } }, goto: 'p03z' },
      { t: '「如果我在深空裡瘋了，妳會怎麼做？」', fx: { flags: { met_sarah: 1, rom_sarah: 1 } }, goto: 'p03z' }
    ]},
    { id: 'p03b', chapter: '序章', speaker: '尤里・安東諾夫', text: '尤里把腳翹在導航台上，正用紙牌搭一座歪歪扭扭的金字塔。「領航員的迷信：出發前必須親手搭一次『太陽系』。塌了就延期，沒塌就準時。」金字塔晃了晃，穩住了。他朝你眨眼：「看，宇宙今天心情不錯。」', choices: [
      { t: '幫他把最後一張牌放上去', fx: { flags: { met_yuri: 1 }, scores: { hope: 1 } }, goto: 'p03z' },
      { t: '「如果導航電腦全滅呢？」', fx: { flags: { met_yuri: 1 } }, goto: 'p03z' }
    ]},
    { id: 'p03c', chapter: '序章', speaker: '高志遠', text: '機庫深處傳來敲擊聲。高志遠半個身子埋進引擎短艙，聲音悶悶的：「別碰那根藍管！……哦，是你。」他爬出來，滿手油污，「主引擎是化學火箭，老實但慢。真正的心臟是這台——祝融芯核熱引擎的原型機，冷卻迴路一直鬧脾氣。到了廣寒站還得再調。到時候來幫我？」', choices: [
      { t: '「算我一個。」', fx: { flags: { met_gao: 1, gao_hint: 1 } }, goto: 'p03z' },
      { t: '「你確定這玩意兒不會把我們炸上天？」', fx: { flags: { met_gao: 1, gao_hint: 1 }, scores: { obsession: 1 } }, goto: 'p03z' }
    ]},
    { id: 'p03d', chapter: '序章', speaker: '林醫生・DSA 心理評估官', text: '林醫生的辦公室沒有窗戶，只有全息投影的松林。「最後一次評估，」她把筆記本合上，「不測智商，不測壓力。只問一個問題：當你看著那個洞——邊界、迴聲、未知——你覺得它在看你嗎？」', choices: [
      { t: '「它在看。而且它在等。」', fx: { flags: { met_lin: 1 }, scores: { obsession: 2 } }, goto: 'p03z' },
      { t: '「它不看人。它只是存在。」', fx: { flags: { met_lin: 1 }, scores: { nihil: 1 } }, goto: 'p03z' },
      { t: '「我不知道。但我希望它在看——這樣我就不孤單了。」', fx: { flags: { met_lin: 1 }, scores: { hope: 1, bond: 1 } }, goto: 'p03z' }
    ]},
    { id: 'p03z', chapter: '序章', text: '海風吹過發射場，遠處的燼火號在暮色裡亮起航行燈。無論明天如何，今夜的你們還只是五個普通人。', auto: { label: '返回準備區', goto: 'p03' } },
    { id: 'p04', chapter: '序章', speaker: '', text: '發射前夜，你獨自站在塔架下。頭頂是銀河，腳下是四十億年演化出的、唯一會仰望的物種。有人問過你為什麼要去的，對吧？你當時怎麼答的？', choices: [
      { t: '「因為門開了，而人是會走路的問號。」', fx: { scores: { hope: 2 }, xp: 5 }, goto: 'p05' },
      { t: '「因為再不出發，我們就只能在照片裡認識宇宙。」', fx: { scores: { hope: 1 }, xp: 5 }, goto: 'p05' },
      { t: '「說實話，我也不知道。也許就是想看看盡頭長什麼樣。」', fx: { scores: { nihil: 1, obsession: 1 }, xp: 5 }, goto: 'p05' },
      { t: '「林醫生問我：當你盯著深淵，深淵在不在盯著你？我答：我在盯著它，這就夠了。」', req: { flags: ['met_lin'] }, fx: { scores: { obsession: 1, hope: 1 }, xp: 5 }, goto: 'p05' }
    ]},
    { id: 'p05', chapter: '序章', speaker: '', text: 'T-10、9、8……點火。轟鳴不是聲音，是一隻手按住你的胸口往天上推。雲層被撕開，藍色星球在你腳下彎成一道弧。三分鐘後，引擎熄火，世界突然安靜——你失重了。人類歷史也跟著你一起，輕輕飄了起來。', auto: { label: '前往月球轉運站', goto: 'TRAVEL:moon' } },

    { id: 'arr_moon', chapter: '第一章・天梯與廣寒站', text: '兩天後，燼火號滑入環月軌道。月球背面的陰影裡，廣寒站的太陽翼如一排銀色荷葉展開。這是人類最遠的前哨，也是你此行最後一口「家鄉的空氣」。', auto: { label: '對接', goto: 'h_moon' } },
    { id: 'h_moon', chapter: '第一章・天梯與廣寒站', hub: true, text: '廣寒站環廊，重力只有地球六分之一。窗外的地球懸在黑絲絨上，藍得不像話。接下來的日子，你可以自由安排——但火星的發射窗口不等人。', choices: [
      { t: '參觀「回望廳」紀念館', fx: {}, goto: 'h_moon_mu' },
      { t: '幫高志遠調試祝融芯引擎', req: { flags: ['gao_hint'], noflags: ['tech_ntp'] }, fx: {}, goto: 'gq1' },
      { t: '和莎拉在醫療艙值班一夜', fx: {}, goto: 'st1' },
      { t: '申請一通與地球的私人通訊', fx: {}, goto: 'ec1' },
      { t: '領取補給品', req: { noflags: ['sup_moon'] }, fx: {}, goto: 'sp1' },
      { t: '在月面漫步一圈', req: { noflags: ['moon_walk'] }, fx: {}, goto: 'moon_walk1' },
      { t: '參觀月球背面射電陣列', req: { noflags: ['moon_array'] }, fx: {}, goto: 'moon_array1' },
      { t: '啟程：核熱快航前往火星', sub: '需要祝融芯・消耗燃料', req: { flags: ['tech_ntp'], res: { fuel: 25 } }, cost: { res: { fuel: 25 } }, goto: 'TRAVEL:mars' },
      { t: '啟程：化學推進＋低溫休眠（慢）', sub: '省燃料，但你會睡過八個月', req: { noflags: [] }, fx: { time: 1, flags: { slow_route: 1 }, res: { fuel: -10 } }, goto: 'TRAVEL:mars' }
    ]},
    { id: 'h_moon_mu', chapter: '第一章・天梯與廣寒站', text: '回望廳裡陳列著人類航天史的殘骸與榮光：阿波羅的濾毒罐、聯盟的降落傘、禮炮站的鎢外殼。牆上刻著一行字：「他們出發時，都只帶了信念和數學。」', auto: { label: '繼續', goto: 'h_moon' }, fx: { scores: { hope: 1 }, xp: 6 } },
    { id: 'st1', chapter: '第一章・天梯與廣寒站', speaker: '莎拉', text: '值班室裡只有監護儀的滴滴聲。莎拉遞給你一杯浮著茶包的水球。「說說吧，」她說，「你最怕的不是死。死亡我治不了，但我治得了恐懼。」', choices: [
      { t: '「我怕的不是死，是被遺忘。」', fx: { flags: { met_sarah: 1, rom_sarah: 1 }, scores: { bond: 2 } }, goto: 'st2' },
      { t: '「我怕大家回不去。」', fx: { flags: { met_sarah: 1 }, scores: { bond: 1, hope: 1 } }, goto: 'st2' }
    ]},
    { id: 'st2', chapter: '第一章・天梯與廣寒站', speaker: '莎拉', text: '莎拉沉默了一會兒，從抽屜摸出一包鎮靜茶塞給你：「醫囑：想家的時候喝。副作用是想家想得更厲害。」她笑著補了一句，「但那也算病嗎？」', auto: { label: '回到環廊', goto: 'h_moon' }, fx: { items: { tea: 1 } } },
    { id: 'ec1', chapter: '第一章・天梯與廣寒站', speaker: '', text: '私人通訊艙只有一平米。延遲一秒多，但螢幕亮起的瞬間，光年的謊言就被拆穿了——家就在那裡，近得你能看清對方的黑眼圈。你們聊了什麼不重要。重要的是掛斷之後，你發現自己在笑。', auto: { label: '回到環廊', goto: 'h_moon' }, fx: { scores: { family: 1 }, res: { morale: 12 }, flags: { fam1: 1 } } },
    { id: 'sp1', chapter: '第一章・天梯與廣寒站', speaker: '補給官', text: '補給官推來一隻儲物箱：「深空署的規矩，出太陽系前，把胃先餵成太空人的胃。」', auto: { label: '收下補給', goto: 'h_moon' }, fx: { items: { ration: 2, repair: 1, fuelcell: 1, nutrient_paste: 2, oxygen_can: 1 }, flags: { sup_moon: 1 } } },
    { id: 'moon_walk1', chapter: '第一章・天梯與廣寒站', text: '你穿上輕量化月面服，踏出氣閘。腳下的塵土沒有風吹走，會永遠保留你的腳印——直到下一次隕石雨，或是下一個來的人。地球在頭頂掛著，藍得讓人想哭。你拍了張照，發給家裡：「我在月球上，想你們。」', choices: [
      { t: '撿一塊月岩帶走', fx: { items: { moon_rock: 1 }, scores: { hope: 1 }, xp: 8 }, goto: 'h_moon' },
      { t: '只留下腳印，什麼都不帶', fx: { scores: { nihil: 1 }, res: { morale: 5 }, xp: 5 }, goto: 'h_moon' }
    ]},
    { id: 'moon_array1', chapter: '第一章・天梯與廣寒站', speaker: '陣列技師', text: '月球背面的射電陣列是太陽系最安靜的聽眾——地球的電波噪音被月球本體擋住了。技師指著波形圖：「這就是八年前的第一聲迴聲。頻率、相位、編碼……完美得不像自然現象。」', choices: [
      { t: '申請一份原始數據副本', fx: { items: { first_signal: 1 }, scores: { obsession: 1 }, xp: 10 }, goto: 'h_moon' },
      { t: '聽完就好，不帶走數據', fx: { scores: { hope: 1 }, res: { morale: 8 }, xp: 6 }, goto: 'h_moon' }
    ]},,

    { id: 'gq1', chapter: '第一章・天梯與廣寒站', speaker: '高志遠', text: '引擎艙裡瀰漫著冷卻液的甜腥味。高志遠拍了拍祝融芯的外殼：「毛病在二次循環泵，溫度一過閾值就罷工。我有三個方案，都不完美——你來挑，出了事咱倆一起背。」', choices: [
      { t: '用分析儀做流體建模，找出共振點', req: { items: { analyzer: 1 } }, fx: { flags: { gao_good: 1 } }, goto: 'gq2' },
      { t: '土辦法：加裝備用泵，笨但保險', fx: { flags: { gao_safe: 1 } }, goto: 'gq2' },
      { t: '「信你的直覺，你比電腦懂它。」', fx: { flags: { gao_trust: 1 }, scores: { bond: 1 } }, goto: 'gq2' }
    ]},
    { id: 'gq2', chapter: '第一章・天梯與廣寒站', speaker: '高志遠', text: '四十八小時後，引擎重新點火測試。尾焰在真空裡無聲地綻開，橙紫色的，像一朵倒著開的花。「成了！」高志遠摘下頭盔擦汗，「祝融芯正式服役。火星，七天航程，人類第一次用核火焰取暖。」', auto: { label: '安裝完成', goto: 'h_moon' }, fx: { flags: { tech_ntp: 1 }, items: { ntp_core: 1, grav_mapper: 1 }, xp: 20, res: { morale: 10 } } },

    { id: 'sys_low_fuel', chapter: '系統警告', speaker: 'ARIA・船載AI', text: '「指揮官，燃料儲量低於安全閾值。建議就近補給，否則我將不得不開始學習如何划船。」', choices: [
      { t: '使用氘燃料棒', req: { items: { fuelcell: 1 } }, cost: { items: { fuelcell: 1 } }, fx: { res: { fuel: 30 } }, goto: '@next' },
      { t: '節流模式硬撐（全船限電）', fx: { res: { morale: -10, fuel: 15 } }, goto: '@next' }
    ]},
    { id: 'sys_low_hull', chapter: '系統警告', speaker: 'ARIA・船載AI', text: '「船體完整度告急。我已封鎖三號走廊——順便一提，那裡現在可以看星星了，免費景觀，含漏氣風險。」', choices: [
      { t: '使用奈米補漏膠', req: { items: { repair: 1 } }, cost: { items: { repair: 1 } }, fx: { res: { hull: 25 } }, goto: '@next' },
      { t: '讓蜂鳥出去焊縫', req: { items: { drone: 1 } }, fx: { res: { hull: 15 } }, goto: '@next' },
      { t: '帶傷航行（士氣受挫）', fx: { res: { morale: -12, hull: 10 } }, goto: '@next' }
    ]},
    { id: 'sys_low_morale', chapter: '系統警告', speaker: 'ARIA・船載AI', text: '「心理評估：全船情緒指數下滑。人類學稱之為『深空倦怠』，我稱之為『需要一頓好飯』。數據支援後者。」', choices: [
      { t: '開一頓豐盛的合成餐會', req: { items: { ration: 1 } }, cost: { items: { ration: 1 } }, fx: { res: { morale: 14 } }, goto: '@next' },
      { t: '放映地球電影夜', fx: { res: { morale: 8 } }, goto: '@next' },
      { t: '強制作息，熬過去', fx: { res: { morale: -4 }, xp: 5 }, goto: '@next' }
    ]}
  ]);
})();
