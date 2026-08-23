(function () {
  const BGS = [
    {
      id: 'scientist', job: '科學家', region: '亞洲', age: 50,
      desc: '你在上海天文台埋首了半生，是世上最懂邊界迴聲的人。同事說你固執，你說那叫嚴謹。這次遠征是你的論文，也是你的贖罪。',
      suggest: '沈硯 / 沈知微',
      skin: '#f0d2b4', hairM: 'salt', hairF: 'bun_salt', glasses: 'rect', trim: '#37d3c0',
      item: 'analyzer', scores: { hope: 2, obsession: 2 }, perk: 'bg_sci'
    },
    {
      id: 'astronaut', job: '太空人', region: '美國', age: 30,
      desc: '前戰鬥機飛行員，兩次空間站長期駐留紀錄保持人。你相信身體的直覺多過電腦的模擬，而你的心跳比發射倒數更沉穩。',
      suggest: '亞力士・萊德 / 艾莉・萊德',
      skin: '#e8b98d', hairM: 'buzz', hairF: 'braid', glasses: null, trim: '#ff8a3d',
      item: 'medkit', scores: { hope: 1, bond: 1 }, perk: 'bg_ast'
    },
    {
      id: 'writer', job: '作家', region: '亞洲', age: 40,
      desc: '你寫了九本沒沒無聞的小說，第十本叫《給宇宙的回信》。DSA 的心理評估官說：我們需要一個會替全人類措辭的人。',
      suggest: '紀行舟 / 紀藍',
      skin: '#f2d6ba', hairM: 'parted', hairF: 'long', glasses: null, trim: '#b07cff',
      item: 'journal', scores: { bond: 2, obsession: 1 }, perk: 'bg_wri'
    },
    {
      id: 'student', job: '大學生', region: '歐洲', age: 20,
      desc: '你用一篇被教授嘲笑的課堂報告解出了迴聲訊號的部分編碼。於是你休學了，行李箱裡裝著一台貼滿貼紙的舊掌上電腦。',
      suggest: '魯卡斯・莫羅 / 露西・莫羅',
      skin: '#f6dfc8', hairM: 'messy', hairF: 'bob', glasses: null, trim: '#5fd068',
      item: 'handheld', scores: { hope: 2, nihil: 1 }, perk: 'bg_stu'
    },
    {
      id: 'teacher', job: '退休教師', region: '歐洲', age: 60,
      desc: '你教了三十七年物理，退休那天收到 DSA 的信：「我們需要一個還記得如何對未知保持溫柔的人。」你把懷錶放進口袋，答應了他們。',
      suggest: '艾力亞斯・韋伯 / 瑪爾塔・韋伯',
      skin: '#f3dcc4', hairM: 'white_short', hairF: 'bun_white', glasses: 'round', trim: '#ffc857',
      item: 'watch', scores: { hope: 3, bond: 1 }, perk: 'bg_tea'
    }
  ];
  UM.DATA.BGS = BGS;
})();
