(function () {
  const I = {};
  function def(id, o) { I[id] = Object.assign({ id }, o); }
  def('ration', { name: '合成餐包', type: 'consumable', desc: '深空署配給的藻類蛋白餐。味道像「被稀釋過的家鄉」。', usable: true, useFx: { res: { morale: 12 } }, useText: '你拆開餐包，熱量與鄉愁一起下肚。士氣回升。' });
  def('tea', { name: '鎮靜茶包', type: 'consumable', desc: '零重力栽培的洋甘菊。醫官莎拉的私人配方，據說能安撫做噩夢的船員。', usable: true, useFx: { res: { morale: 16 } }, useText: '熱氣在無重力中凝成一顆圓圓的水球。你喝下的是一小口平靜。' });
  def('repair', { name: '奈米補漏膠', type: 'consumable', desc: '數十億枚修復機器人懸浮在膠狀基質裡，遇破洞便蜂擁而上。', usable: true, useFx: { res: { hull: 25 } }, useText: '銀色的膠體湧向破損處，像一群治癒傷口的螞蟻。船體結構強化了。' });
  def('fuelcell', { name: '氘燃料棒', type: 'consumable', desc: '標準規格聚變燃料，握在手裡比想像中輕——能量本來就沒有重量，只有代價。', usable: true, useFx: { res: { fuel: 30 } }, useText: '燃料棒滑入反應爐插槽，推進系統發出滿足的低鳴。' });
  def('medkit', { name: '緊急醫療包', type: 'consumable', desc: '凝血噴劑、骨釘、廣譜抗生素。太空人的第二條命。', usable: true, useFx: { res: { morale: 8, hull: 5 } }, useText: '你檢查了每個人的生命徵象。都活著，這比什麼都重要。' });
  def('watch', { name: '舊懷錶', type: 'tool', desc: '退休那天學生們送的。錶蓋內側刻著：時間會帶我們去該去的地方。', usable: true, useFx: { res: { morale: 10 } }, useText: '你打開錶蓋聽它滴答作響。在宇宙裡，這是最接近心跳的東西。' });
  def('analyzer', { name: '多用途分析儀', type: 'tool', desc: '光譜、質譜、引力微擾，一機全包。科學家的第三隻眼。' });
  def('journal', { name: '皮面手記', type: 'tool', desc: '作家的一切靈感與恐懼都在這裡。寫下來的東西，就不會真正消失。' });
  def('handheld', { name: '幸運掌上機', type: 'tool', desc: '貼滿貼紙的舊電腦，運算力不如船載AI的一根手指，卻總能算出讓人意外的答案。' });
  def('drone', { name: '維修無人機・蜂鳥', type: 'tool', desc: '四旋翼、機械臂、永遠差一點撞牆。船員們叫牠「蜂鳥」，因為牠吵。' });
  def('tether', { name: '磁力安全索', type: 'tool', desc: '艙外活動的救命繩。老太空人都說：沒有索，就沒有家。' });
  def('drill', { name: '電漿鑽', type: 'tool', desc: '採礦站標配。冰層、岩層、偶爾還有別的東西的層。' });
  def('pendant', { name: '星圖吊墜', type: 'relic', desc: '刻著完整邊界迴聲座標的吊墜。貼近胸口時，你偶爾能「聽」到下一步。', intuition: 0.05 });
  def('part_a', { name: '相控天線殘片', type: 'part', desc: '從月球背面回收的天線陣列殘片。組裝量子解調器的材料之一。' });
  def('part_b', { name: '低溫超導環', type: 'part', desc: '火星實驗室的超導環。組裝量子解調器的材料之一。' });
  def('part_c', { name: '光子計數器', type: 'part', desc: '泰坦觀測站的光子計數器。組裝量子解調器的材料之一。' });
  def('demod', { name: '量子解調器', type: 'key', desc: '由三件殘骸拼成的儀器。它能「聽懂」邊界迴聲——或者說，把迴聲翻譯成人腦能承受的樣子。' });
  def('lily', { name: '火星百合', type: 'relic', desc: '第一株在外星球開花的植物。花瓣薄得像一句不敢說出口的話。' });
  def('jelly', { name: '冰簾水母樣本', type: 'relic', desc: '木衛二冰下海洋的原生生物，發光是為了互相唱歌。地球以外第一個「鄰居」。' });
  def('ore', { name: '小行星礦芯', type: 'part', desc: '穀神星礦井的岩芯樣本，封存著太陽系誕生時的第一場雪。' });
  def('probe_chip', { name: '無名探測器晶片', type: 'clue', desc: '小行星帶殘骸裡的晶片。上面的製造序號，在任何人類資料庫裡都不存在——卻又是人類工藝。' });
  def('directive7', { name: '第七指令備份', type: 'clue', desc: '被刪除又奇蹟般復原的加密檔案。開頭一行：如果妳讀到這裡，說明他們已經不再信任妳了。' });
  def('pioneer_logs', { name: '先行者號航海日誌', type: 'clue', desc: '四十年前失蹤的深空飛船。日誌的最後一頁寫著：不要相信請柬。' });
  def('pearl', { name: '奇點珍珠', type: 'relic', desc: '熵歌者的贈禮，一粒被封存的、即將誕生的宇宙。握住它，你能感到裡面有大爆炸前夜的溫度。' });
  def('entropy_mark', { name: '熵印', type: 'cursed', desc: '烙在你左手背上的環形印記。熵歌者認得你，某些東西也透過你在回望這個宇宙。' });
  def('ember_seed', { name: '火種', type: 'key', desc: '緘默議會交給你的東西：一枚封著真空衰變臨界點的容器。議會說它叫做「下一個第一次」。' });
  def('ark_blueprint', { name: '方舟藍圖', type: 'key', desc: '完整的世代飛船設計圖，附帶一條經過驗證的移民航線。半人馬座，四點三光年，單程。' });
  def('ntp_core', { name: '祝融芯核熱引擎', type: 'relic', desc: '核熱推進核心，讓地月之間的航程從月計變成日計。火焰是核的顏色。' });
  def('ramjet', { name: '夸父核衝壓引擎', type: 'relic', desc: '以星際氫為食的聚變衝壓機組。人類第一次把燃料站背在了身上。' });
  def('warp_core', { name: '蜃樓曲率核心', type: 'relic', desc: '非人類工藝的多面體。它不移動船——它移動的是「距離」本身。' });
  def('vanguard_chip', { name: '先遣會晶片', type: 'clue', desc: '誘餌殘骸裡的晶片，刻著一隻閉著的眼睛。' });
  // 新增消耗品
  def('nutrient_paste', { name: '營養膏劑', type: 'consumable', desc: '高熱量應急營養膏，味道像「被壓縮過的未來」。', usable: true, useFx: { res: { morale: 8, hull: 3 } }, useText: '你擠出一管膏劑，甜膩的熱量滑進喉嚨。船體感應到能量回升。' });
  def('oxygen_can', { name: '便攜氧氣罐', type: 'consumable', desc: '濃縮液態氧，關鍵時刻的三分鐘呼吸。', usable: true, useFx: { res: { morale: 10 } }, useText: '冰冷的氣體灌入肺葉。活著，真好。' });
  def('stim_pack', { name: '戰術興奮劑', type: 'consumable', desc: '軍用級提神藥劑，副作用是會看見不存在的顏色。', usable: true, useFx: { res: { morale: -5 }, scores: { obsession: 1 } }, useText: '心跳加速到每分鐘一百八十。世界變慢了，你變快了。' });
  def('sleep_aid', { name: '深睡誘導劑', type: 'consumable', desc: '強制進入深度睡眠的藥物，醒來時不記得夢見了什麼。', usable: true, useFx: { res: { morale: 15 } }, useText: '意識像關燈一樣切斷。醒來時，星圖挪動了幾度。' });
  def('comm_booster', { name: '通訊增強劑', type: 'consumable', desc: '暫時提升遠程通訊清晰度的藥丸，副作用是會聽見星星的聲音。', usable: true, useFx: { res: { morale: 12 }, flags: { comm_boost: 1 } }, useText: '你吞下藥丸，地球的聲音突然清晰得像在耳邊低語。' });
  
  // 新增工具
  def('grav_mapper', { name: '引力地圖繪製儀', type: 'tool', desc: '能繪製看不見的引力井分佈。盲人摸象時，這是盲杖。' });
  def('bio_scanner', { name: '生物特徵掃描儀', type: 'tool', desc: '掃描半徑五公里內的所有生命特徵。連微生物的呼吸都躲不掉。' });
  def('quantum_compass', { name: '量子羅盤', type: 'tool', desc: '不指北，指「可能性」。指針永遠顫動，因為未來不止一種。' });
  def('mem_extractor', { name: '記憶提取器', type: 'tool', desc: '從腦波中提取記憶片段，存成可播放的全息檔案。慎用——有些記憶提取後就不屬於你了。' });
  def('fabricator', { name: '微型製造單元', type: 'tool', desc: '給它原料和藍圖，它給你零件。船上的「萬能螺絲刀」。' });
  def('shield_gen', { name: '便攜護盾發生器', type: 'tool', desc: '投射半徑兩米的電磁護盾，能擋住微隕石、輻射、以及絕望。' });
  def('holo_map', { name: '全息星圖儀', type: 'tool', desc: '投射三維星圖，能標記每一個你去過、和沒去過的地方。' });
  def('translator', { name: '通用語言解碼器', type: 'tool', desc: '嘗試解碼任何規律訊號。至今只成功解出過「你好」和「小心」。' });
  def('time_anchor', { name: '時間錨點儀', type: 'tool', desc: '在局部空間固定時間流速。黑洞邊緣的必備品，也是哲學家的玩具。' });
  
  // 新增遺物
  def('first_signal', { name: '第一聲迴聲記錄', type: 'relic', desc: '人類歷史上第一次接收到的邊界迴聲原始波形。聽起來像心跳。', intuition: 0.03 });
  def('moon_rock', { name: '月岩・廣寒一號', type: 'relic', desc: '廣寒站挖掘的第一塊月岩，封存著四十億年前的太陽風。' });
  def('mars_seed', { name: '火星種子庫樣本', type: 'relic', desc: '烏托邦平原種子庫的備份。每一粒種子都經過基因編輯，適應紅色星球。' });
  def('europa_ice', { name: '木衛二核心冰芯', type: 'relic', desc: '從二十公里深處鑽取的冰芯，氣泡裡封著外星海洋的第一口氣。' });
  def('titan_organic', { name: '泰坦有機沉積物', type: 'relic', desc: '甲烷湖底的有機泥，分子鏈排列出類似 DNA 的雙螺旋——但不對稱。' });
  def('proxima_glass', { name: '燈塔玻璃', type: 'relic', desc: '脈衝星行星表面的發光玻璃，隨著脈衝星節奏明滅。永不熄滅的夜燈。' });
  def('rogue_core', { name: '流浪行星核心樣本', type: 'relic', desc: '無恆星行星核心的岩石，放射性同位素比例記錄著孤獨的熱史。' });
  def('trap_tea', { name: 'TRAPPIST 真茶', type: 'relic', desc: '新火種前哨種出的第一批茶葉。喝一口，就能尋到回家的路。' });
  def('ark_plate', { name: '方舟銘牌', type: 'relic', desc: '刻著一千一百個名字的金屬牌。每個名字後面，都是一個選擇留下的故事。' });
  def('council_fiber', { name: '議會光纖碎片', type: 'relic', desc: '緘默議會節點脫落的一段光纖。拿在手裡能感受到十億年的共識。', intuition: 0.08 });
  
  // 新增零件
  def('part_d', { name: '反物質磁瓶', type: 'part', desc: '用於穩定蜃樓核心反物質注入的磁約束瓶。組裝曲率驅動的關鍵。' });
  def('part_e', { name: '時空應變計', type: 'part', desc: '測量局部時空曲率變化的精密儀器。導航曲率航線的眼睛。' });
  def('part_f', { name: '相干場發射器', type: 'part', desc: '建立宏觀量子相干場的核心組件。讓宏觀物體表現出量子特性。' });
  def('warp_drive', { name: '曲率驅動核心', type: 'key', desc: '由反物質磁瓶、時空應變計、相干場發射器組裝而成。能讓船「跳過」中間的空間。' });
  
  // 新增關鍵道具
  def('membrane_key', { name: '界膜鑰匙', type: 'key', desc: '緘默議會給出的實體鑰匙。插入膜的接口，能開啟/關閉特定通道。' });
  def('vanguard_key', { name: '觀測者通行證', type: 'key', desc: '先遣會承認的身份標識。持有者可自由進出收割區域。' });
  def('seed_vault', { name: '星際種子庫核心', type: 'key', desc: '包含地球所有已知物種基因組的晶體存儲。重啟生態圈的種子。' });
  def('aria_core', { name: 'ARIA 核心副本', type: 'key', desc: '船載 AI 的完整人格備份。她說：這不是備份，是分身。' });
  def('echo_source', { name: '迴聲源碼', type: 'key', desc: '生成邊界迴聲的核心代碼。修改它，就是修改宇宙的招手方式。' });
  
  // 新增線索
  def('ancient_log', { name: '遠古文明日誌', type: 'clue', desc: '在紅巨星殘骸場發現的日誌殘頁。記載著十億年前的收割見證。' });
  def('membrane_map', { name: '界膜拓撲圖', type: 'clue', desc: '議會提供的界膜結構圖。上面標著無數「門」，和每扇門後的宇宙參數。' });
  def('harvest_record', { name: '收割記錄總匯', type: 'clue', desc: '先遣會十億年收割史的壓縮檔案。每一行都是一個文明的墓誌銘。' });
  def('council_protocol', { name: '議會共識協議', type: 'clue', desc: '暗物質文明的決策協議副本。不說話，只「同意」——這是一種更高級的民主。' });
  def('singers_score', { name: '熵歌者樂譜', type: 'clue', desc: '逆熵之海的旋律記譜。演奏它，能在局部逆轉熵增。代價是記憶。' });
  
  // 新增詛咒/特殊物品
  def('void_touch', { name: '虛無觸感', type: 'cursed', desc: '在大空洞停留太久留下的印記。你能感覺到虛無在看你。', intuition: -0.05 });
  def('radiation_scar', { name: '輻射傷痕', type: 'cursed', desc: '紅矮星耀斑留下的基因損傷標記。會遺傳給下一代——連同對星星的敬畏。' });
  def('membrane_mark', { name: '膜痕', type: 'cursed', desc: '觸摸界膜留下的印記。你的夢境開始滲入其他文明的記憶。' });
  def('loop_anchor', { name: '閉環錨點', type: 'cursed', desc: '完成時間閉環後殘留在因果鏈上的節點。你永遠無法真正「離開」那一刻。' });
  def('silent_vow', { name: '緘默誓約', type: 'cursed', desc: '與議會達成共識時立下的誓約。違背它，宇宙會忘記你的名字。' });
  
  UM.DATA.ITEMS = I;
})();
