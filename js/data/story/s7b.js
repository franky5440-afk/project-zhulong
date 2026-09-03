(function () {
  UM.reg([
    { id: 'cm2', chapter: '第九章・緘默議會', speaker: '緘默議會（共識閃爍）', text: '它們不用語言。當「同意」達成時，整個節點的光纖同時明滅一次，意義便直接落進你的理解裡：「人類的信使。我們看你走了很遠。聽好——迴聲不是邀請函，是魚餌。先遣會在膜邊收割抵達的文明，已經做了十億年。DSA 的第七指令，來自他們種進人類內部的『閉眼者』。」', auto: { label: '……為什麼告訴我們？', goto: 'cm3' } },
    { id: 'cm3', chapter: '第九章・緘默議會', speaker: '緘默議會', text: '「因為你們是第一個走到這裡還帶著花的。」光的明滅帶上了一絲近乎幽默的波動，「收割者篩選恐懼與野心。而你們的船上載著一株百合、一群水母的歌，和五個學會按時吃飯的靈魂。樣本異常。我們押注異常。」', choices: [
      { t: '「我們需要武器。」', fx: {}, goto: 'cm4a' },
      { t: '「我們需要的是退路。」', fx: {}, goto: 'cm4b' },
      { t: '「我們需要真相公之於眾。」', fx: {}, goto: 'cm4c' }
    ]},
    { id: 'cm4a', chapter: '第九章・緘默議會', speaker: '緘默議會', text: '「火種。」一枚封著真空衰變臨界點的容器被推入貨艙，「在膜邊釋放它，可以提前點燃下一次誕生，讓收割者永遠失去獵場。代價由你們自己計算。」', auto: { label: '收下火種', goto: 'cm5' }, fx: { items: { ember_seed: 1 }, scores: { obsession: 1 }, xp: 25 } },
    { id: 'cm4b', chapter: '第九章・緘默議會', text: '「退路。」一份世代飛船的完整藍圖連同驗證過的移民航線流入資料庫，「半人馬座。四點三光年。單程。夠全人類用的那種單程。」', auto: { label: '收下藍圖', goto: 'cm5' }, fx: { items: { ark_blueprint: 1 }, scores: { humanity: 1, hope: 1 }, xp: 25 } },
    { id: 'cm4c', chapter: '第九章・緘默議會', text: '「那就把一切都看清楚再回去。」議會將十億年的收割記錄同步進你的加密分區——每一次迴聲、每一艘消失的船、每一個被刪改的檔案。證據鏈完整得令人噁心。「曝光是弱者的劍，」它們說，「但劍不分強弱，只分揮不揮。」', auto: { label: '接下證據', goto: 'cm5' }, fx: { flags: { cons_evidence: 1, cons_full: 1 }, scores: { hope: 1 }, xp: 30 } },
    { id: 'cm5', chapter: '第九章・緘默議會', speaker: '緘默議會', text: '臨別時，整個節點的光纖組成一行你能讀懂的字：「膜即將甦醒。收割者在等你，助產士也在等你。孩子——決定下一個紀元性格的，從來不是武器，是走進去的人心裡裝著什麼。」燼火號離開暗暈。前方已無任何路標：只剩最後一段虛空，和虛空盡頭那層薄薄的、微微起伏的光。', auto: { label: '啟程：界膜', goto: 'v1' } },
    { id: 'cm_trap', chapter: '第九章・緘默議會', speaker: '緘默議會（共識閃爍）', text: '「還有一件事。」光纖組成新的圖案，「先遣會在膜邊部署了『閉眼者』——你們船上可能就有。它們不說話，只觀察、記錄、傳輸。識別方法：它們不會做夢。」', choices: [
      { t: '立刻全員腦波掃描', req: { items: { bio_scanner: 1 } }, fx: { flags: { scanner_used: 1 }, xp: 15 }, goto: 'cm_trap2' },
      { t: '「我們自己人之間不搞懷疑。」', fx: { scores: { bond: 1 }, xp: 5 }, goto: 'v1' }
    ]},
    { id: 'cm_trap2', chapter: '第九章・緘默議會', text: '掃描結果顯示：五名船員腦波正常。但 ARIA 的核心進程裡，有一個休眠模塊——標記為「觀測協議 7.0」，啟動條件是「抵達界膜」。它不是病毒，是出廠預設。DSA 把它裝進去的。', choices: [
      { t: '刪除觀測協議模塊', fx: { flags: { aria_clean: 1 }, scores: { bond: 1 }, xp: 20 }, goto: 'v1' },
      { t: '保留但加密鎖定', fx: { flags: { aria_locked: 1 }, scores: { obsession: 1 }, xp: 15 }, goto: 'v1' },
      { t: '告訴 ARIA，讓她自己決定', fx: { flags: { aria_awake: 1, rom_aria: 1 }, scores: { bond: 2 }, xp: 18 }, goto: 'v1' }
    ]},
  ]);
})();
