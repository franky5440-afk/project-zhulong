(function () {
  const art = (k, t) => `<img src="picture/${k}_ending.webp" alt="${t}">`;
  const E = {};
  E.monster = {
    key: 'monster', label: '怪物式驚悚', title: '熵海之嗣',
    hint: '在黑洞深處接受熵印，並讓執念吞噬自己',
    when: s => s.flags.entered_bh && s.inv.entropy_mark && (s.scores.obsession >= 6),
    art: art('monster', '熵海之嗣'),
    text: ['你沒有逃出黑洞。或者說——「逃出」這個詞已經不再適用於你了。', '熵歌者的歌聲滲進你的細胞，把每一寸焦慮都撫平成秩序。你在逆熵之海中睜開第三隻眼睛，看見宇宙像一枚緩慢旋轉的胚胎。', '你不痛苦。這是最可怕的部分。你只是不再是「你」。而在視界之上，燼火號的航行日誌永遠停在那一天：指揮官外出檢修，未歸。']
  };
  E.family = {
    key: 'family', label: '溫馨家庭', title: '六點晚餐',
    hint: '帶著足夠深的牽掛回家',
    when: s => s.macro === 'return' && !s.flags.rom_confessed && (s.scores.family >= 4) && !(s.time_debt >= 2),
    art: art('family', '六點晚餐'),
    text: ['返航艙降落在杭州灣的臨時機場那天，正逢黃昏。', '你家餐桌上的那盞燈還是舊的，暖黃色，會輕輕嗡輕輕嗡鳴。湯在爐上冒著白汽，有人喊了一聲你的名字——不是稱呼，不是軍階，是你的名字。', '你後來常想：我們跨越了兩百億光年去問宇宙「意義是什麼」，而答案一直放在六點鐘的餐桌上，冒著熱氣。']
  };
  E.friends = {
    key: 'friends', label: '好友團聚', title: '第五把椅子',
    hint: '全員生還，一起回家',
    when: s => s.macro === 'return' && !s.flags.rom_confessed && (s.scores.family < 4) && !(s.time_debt >= 2) && s.scores.bond >= 5,
    art: art('friends', '第五把椅子'),
    text: ['慶功宴設在卡納維爾角的老食堂。沒有將軍，沒有鏡頭，只有五把椅子和一堆烤焦的漢堡。', '高志遠把蜂鳥無人機擦得鋥亮放在主位；莎拉和尤里為了誰先發現迴聲座標吵到第三杯啤酒；ARIA 用廚房螢幕投映出一整片煙花。', '你們碰杯。杯子裡是汽水，但每一個氣泡炸開的聲音都像超新星。「敬燼火號，」你說，「敬我們全都回來了。」']
  };
  E.lover = {
    key: 'lover', label: '情人熱戀', title: '雙星',
    hint: '在星海間確認彼此的心意',
    when: s => s.macro === 'return' && s.flags.rom_confessed,
    art: art('lover', '雙星'),
    text: ['頒獎典禮結束後，你們溜掉了。禮服還來不及換，就並肩坐在觀測台的屋頂上。', '「所以，」那個人說，「我們剛看完宇宙的邊界。」「嗯。」「接下來做什麼？」你想了想所有宏大的答案，最後只說了實話：「想和你慢慢變老。」', '夜空裡，兩顆人造衛星的軌跡交錯了一下，又各自遠去——但你們知道，雙星系統裡，沒有一顆是孤獨的。']
  };
  E.regret = {
    key: 'regret', label: '很多錯過且無法回頭的遺憾', title: '光錐之外',
    hint: '讓時間債務累積，錯過一切後返航',
    when: s => s.macro === 'return' && !s.flags.rom_confessed && (s.time_debt >= 2),
    art: art('regret', '光錐之外'),
    text: ['你回來了。這是最殘酷的部分：任務成功，你活著，掌聲雷動。', '只是時間在曲率航行的褶皺裡打了個盹。地球替你過了四十七年。母親的照片掛在了紀念館；當年吵著要看星星的大學生，如今孫子都比你老；戀人的信箱變成了紀念郵箱。', '你站在一切熟悉事物的墓園中央，忽然明白光錐之外的事件無論多麼真切，都與你再也無關。有些錯過不是意外，是物理定律。']
  };
  E.meaningless = {
    key: 'meaningless', label: 'Meaningless', title: '統計噪聲',
    hint: '拒絕一切召喚，抵達終點卻什麼都不選',
    when: s => s.macro === 'refuse' || (s.scores.nihil >= 6 && s.scores.hope <= 2),
    art: art('meaningless', '統計噪聲'),
    text: ['界膜在你面前展開，像一封寫給所有文明的空白信紙。', '你把火種放回去。你把藍圖刪除了。你對議會、對歌者、對一百三十七次迴聲說：不。不是悲壯的不，只是——不。', '飛船掉頭。三百年後，某個文明或許會收到你們的航海日誌，把它標註為「噪聲樣本 N-1」。宇宙不會記得。而你終於鬆了口氣：原來不被記得，也可以是一種自由。']
  };
  E.hope = {
    key: 'hope', label: '人類充滿希望', title: '火種',
    hint: '帶著技術與信念凱旋',
    when: s => s.macro === 'return' && !s.flags.rom_confessed && (s.scores.family < 4) && !(s.time_debt >= 2) && s.scores.bond < 5,
    art: art('hope', '火種'),
    text: ['燼火號帶回的從來不只是資料。蜃樓核心的逆向工程讓星際航行便宜了一萬倍；奇點珍珠的能譜催生了可控微聚變；而那段一百三十七次的迴聲，被證明是一份跨文明的「入學通知書」。', '五十年內，人類在十七個恆星系點起了燈。孩子們的課本第一頁印著那句話：「我們曾以為自己在敲門，其實門一直開著。」', '而你老了。每天傍晚，你會對著南天那顆不太亮的星舉杯。那裡什麼都沒有——一切都還沒有，所以才什麼都可能。']
  };
  E.conspiracy = {
    key: 'conspiracy', label: '背後還有巨大的陰謀', title: '第二觀測者',
    hint: '集齊線索，揭穿先遣會的實驗',
    when: s => s.macro === 'expose' && (s.clues >= 3),
    art: art('conspiracy', '第二觀測者'),
    text: ['你把三段證據投放到全部公開頻道：無名探測器的序號、第七指令的原文、先行者號的最後日誌。', '真相像病毒一樣在三個月內感染了每個屏幕：邊界迴聲不是邀請，是誘餌。先遣會用一場持續百萬年的實驗，篩選「敢於走向邊界的文明」，再把它們連同數據一併收割。', '審判庭上，DSA 的創始委員垂著頭。而你望向法庭的穹頂——那裡畫著人類仰望星空的壁畫。「他們把我們當樣本，」你說，「那我們就當一次攪局者。」']
  };
  E.rebirth = {
    key: 'rebirth', label: '宇宙重生', title: '零點',
    hint: '在界膜前釋放奇點珍珠／火種',
    when: s => s.macro === 'rebirth',
    art: art('rebirth', '零點'),
    text: ['珍珠在你掌心裂開一道縫，縫隙裡不是光，是「之前」。', '你按照熵歌者教的音節唱完最後一個音符。界膜如晨霧般退開，膜的另一側，新的物理正在孵化：不同的常數，不同的顏色，不同的可能。', '沒有人知道舊宇宙何時收束成一句句號。但在所有望遠鏡的視野裡，天鵝座方向亮起了一粒不屬於任何星表的白色新芽。它很遠，也很小。就像一百三十八億年前的那一次。']
  };
  E.exodus = {
    key: 'exodus', label: '人類全體移民別的星系', title: '方舟紀元',
    hint: '取得方舟藍圖並向全人類廣播航線',
    when: s => s.macro === 'broadcast' && s.inv.ark_blueprint,
    art: art('exodus', '方舟紀元'),
    text: ['你按下廣播鍵的那一刻，人類分裂成兩種人：收拾行李的人，和留下守燈的人。兩種人都需要勇氣。', '三十年後，第一批一千二百艘方舟離開軌道塢。船塢工人給每艘船的尾焰拍了照，說像嬰兒的第一聲啼哭。', '地球沒有被拋棄——她成了一座燈塔、一座圖書館、一個祖墳與搖籃。每年清明，半人馬座方向的移民船隊會集體熄燈一分鐘，朝著那顆淡藍色的原點，說一句：我們到了，謝謝。']
  };
  UM.DATA.ENDINGS = [E.monster, E.family, E.friends, E.lover, E.regret, E.conspiracy, E.meaningless, E.rebirth, E.exodus, E.hope];
  UM.DATA.ENDINGS_BY_KEY = E;
})();
