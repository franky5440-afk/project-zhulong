(function () {
  UM.reg([
    { id: 'cm_pre', chapter: '第九章・緘默議會', hub: true, text: '銀河系的最外圍，恆星稀薄如塵。導航圖上這裡標註著「無特徵暗暈」，但你的行李不這麼認為——奇點珍珠（如果你帶著它）每隔幾小時就朝同一個方向發出一次溫暖的脈衝；熵印（如果你帶著它）則安靜得像一隻閉上的眼睛。兩者指向相同：暗物質的深處，有東西在等人類敲門。途中雷達還標記了一處異常的人類訊號源——TRAPPIST-1 方向，距離四十光年。以蜃樓核心的速度，繞路一趟並不遙遠。', choices: [
      { t: '支線：偏航拜訪「新火種」前哨（TRAPPIST-1e）', sub: '需要蜃樓核心・消耗燃料 10', req: { flags: ['tech_warp'], noflags: ['trap_done'], res: { fuel: 10 } }, cost: { res: { fuel: 10 } }, goto: 'TRAVEL:trappist' },
      { t: '深入暗暈，循線前往緘默議會', goto: 'TRAVEL:redgiant' },
      { t: '支線：調查紅巨星殘骸場的未知信標', sub: '消耗燃料 5', req: { noflags: ['red_beacon'] }, fx: {}, goto: 'red_beacon1' }
    ]},
    { id: 'arr_red', chapter: '第九章・緘默議會', text: '途中你們掠過一片紅巨星殘骸場。上百艘陌生飛船凍結在膨脹的氣體裡，朝向一致——全部朝向銀河系外。黑匣子斷續的譯文只有一句：「界膜不是出口，是產道。不要獨自前往。」你們不是第一批走向邊界的文明，也不會是最後一批。', auto: { label: '繼續深入暗暈', goto: 'cm1' }, fx: { flags: { clue_fleet: 1 }, scores: { obsession: 1 }, xp: 15 } },
    { id: 'cm1', chapter: '第九章・緘默議會', text: '沒有港口，沒有燈光。當燼火號穿過最後一層暗物質潮汐時，空間忽然「厚」了起來——億萬條暗物質纖維在此交織成一個直徑數萬公里的節點，形狀像一枚巨大的、半透明的神經元。節點外懸浮著各時代的來訪者：晶體飛船、等離子體環、甚至一座冰封的城市。全都沉默著，全都完好。', auto: { label: '請求入內', goto: 'cm2' } },
    { id: 'red_beacon1', chapter: '第九章・緘默議會', text: '信標懸浮在紅巨星膨脹的光球層邊緣，不屬於任何已知文明的設計。它發出的不是無線電，而是引力波脈衝——編碼著一張三維星圖，標記著數萬個「安全港」座標，全都在界膜之外。掃描顯示：信標已運行了兩億年，還在持續廣播。', choices: [
      { t: '下載完整星圖數據', fx: { items: { membrane_map: 1 }, scores: { obsession: 1, hope: 1 }, xp: 20 }, goto: 'red_beacon2' },
      { t: '部署中繼器，擴大廣播範圍', req: { items: { comm_booster: 1 } }, fx: { flags: { red_beacon: 1 }, scores: { humanity: 1 }, xp: 15 }, goto: 'red_beacon2' },
      { t: '「這可能是陷阱。」標記座標後離開', fx: { scores: { nihil: 1 }, xp: 8 }, goto: 'red_beacon2' }
    ]},
    { id: 'red_beacon2', chapter: '第九章・緘默議會', text: '離開時，信標的脈衝頻率忽然改變了一下——像是注意到了你。ARIA 報告：「偵測到返向數據包。內容只有兩個詞：歡迎。等待。」你不知道這是善意，還是更精密的陷阱。但至少，宇宙不再完全沉默了。', auto: { label: '繼續深入暗暈', goto: 'cm_pre' }, fx: { flags: { red_beacon: 1 } } }
  ]);
})();
