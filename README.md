# 燭龍計畫・宇宙邊界遠征（Universe MUD）

純前端、零依賴的網頁版文字 MUD。人類響應來自宇宙邊緣的「邊界迴聲」，駕駛深空飛船「燼火號」遠征界膜。

線上遊玩：https://franky5440-afk.github.io/project-zhulong/

## 啟動方式

```bash
cd /home/lintzuyang/freebuff_project/universe_mud
python3 -m http.server 8923
# 瀏覽器開啟 http://127.0.0.1:8923
```

也可直接用瀏覽器開啟 index.html（全本地相對路徑，支援 file://）。

## 玩法系統

- 推進科技隨任務解鎖：化學火箭 → 祝融芯核熱引擎 → 逐日翼光帆 → 夸父核衝壓引擎 → 蜃樓曲率核心
- 資源管理：燃料／船體／士氣；歸零會觸發緊急事件鏈
- 升級與直覺：等級提升「直覺閃現」出現機率（金色選項），帶來額外收穫或隱藏真相
- 行囊：隨時查閱，消耗品於對話選擇或面板使用後減少
- 存檔：自動存檔＋三個手動欄位＋JSON 匯出／匯入
- 歷程回顧：航行日誌逐章記錄所有劇情與你的每個選擇
- 10 種結局＋結局圖鑑（附示意圖）；通關後可攜帶等級、資源、道具開啟輪迴，走不同路線

## 開發工具

```bash
node tools/check_links.js      # 檢查全部節點連結與資料引用
node test/engine_test.js       # 無頭模擬九種策略通關，驗證結局判定
python3 tools/ui_probe.py      # headless Chrome 真實座標點擊探測（創角→推進→六面板）
# tools/smoke.html             # 瀏覽器端隨機遊走煙霧測試頁
```

三者全綠才算完成；改 CSS/HTML 後至少要跑 `ui_probe.py`。工作規範與踩坑紀錄見 `AGENTS.md`，交接事項見 `HANDOFF.md`。

## 已修復的重大 bug 紀錄（防重蹈）

1. **隱形遮罩吃掉所有真實點擊**：`#overlay{display:flex}` 作者樣式覆蓋了 `hidden` 屬性的預設行為，透明遮罩永遠攔截全頁滑鼠。已以 `[hidden]{display:none!important}` ＋ `pointer-events` 模式修復；自動化測試因此一律改用 `elementFromPoint` 座標命中驗證。
2. **面板函式掛錯命名空間**：`UM.UI.panelShell` 不存在導致「繼續航行／讀取存檔」靜默失敗。
3. **側邊面板按鈕未綁定**：`bindFabs()` 定義了卻沒人呼叫。
4. **任務入口旗標不一致**（如 `sail_done` vs `tech_sail`）造成可無限重複。
5. **場景切換殘留過期按鈕**：打字期間舊選項仍可點，已加節點標籤防護並即時清空。

## 目錄結構

```
index.html            入口
css/                  樣式（基礎／HUD／面板）
js/core.js            命名空間與節點註冊器
js/portrait.js        參數化 SVG 頭像產生器
js/engine_a/b/c.js    引擎：狀態成長／規則效果／流程流轉
js/save.js            存檔與結局圖鑑 meta
js/ui_a/b/c.js        UI：星空動畫、渲染、面板、創角與結局
js/main.js            啟動與輸入綁定
js/data/              世界觀、角色、道具、事件池、星球、結局
js/data/story/        主線章節 s0–s8（約 150 節點）
tools/ test/          檢查、探測與測試
AGENTS.md             本專案工作規範（必讀）
HANDOFF.md            session 交接文件
```

## 遊戲時間說明

主線單周目約 3–5 小時；加上支線星球、事件池變化、十結局收集與輪迴繼承，整體遊玩內容朝 20 小時設計。新增劇情只需在 js/data/story/ 增加節點檔即可，無需改引擎。
