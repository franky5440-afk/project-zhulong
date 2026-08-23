# HANDOFF — 下一個 session 交接

寫於 2026-08-23。前一個 session 完成了整個遊戲的建構與三輪重大 bug 修復；使用者回報「還有一些 bug」但尚未說明細節，連線不穩提前結束。

## 第一件事：問使用者要 bug 清單

使用者明確說「還有一些 bug，開新 session 再繼續」，**但沒有給細節**。開場先請對方提供：
- 具體操作步驟與現象
- 若畫面底部出現紅色「系統錯「系統錯誤：…」橫幅，把文字貼上（`index.html` 已內建全域錯誤攔截）

不要自行猜測亂修。

## 專案現況

遊戲完整可玩：創角（5 背景×性別、SVG 頭像、自取名）→ 十章主線（150+ 節點）→ 支線星球 → 資源/升級/行囊/存檔/日誌 → 十結局＋圖鑑 → NG+ 輪迴繼承。核心邏輯經多策略模擬驗證；UI 經真實座標點擊探測驗證。

## 本輪已修復（詳見 README「已修復的重大 bug 紀錄」與 AGENTS.md「踩過的坑」）

1. 隱形 `#overlay` 攔截全頁真實點擊（CSS display 覆蓋 hidden 屬性）
2. `UM.UI.panelShell` 命名空間錯置 → 讀檔面板靜默失敗
3. `bindFabs()` 從未被呼叫 → 六顆側邊按鈕全死
4. 任務入口旗標名不一致造成無限重複（sail/moon/europa/lake 等）
5. 場景切換殘留過期選項按鈕

## 疑似薄弱區（未深驗，優先排查候選）

1. **NG+ 輪迴流程**只做過引擎層測試：結局畫面「攜帶狀態開啟新一輪」→ 創角頁 carry-note 顯示 → 啟動後等級/道具繼承 → `btn-start` 文字還原，這條鏈沒跑過 `ui_probe.py`。
2. **結局圖鑑**從標題頁開啟的視覺呈現未實際看過（SVG 漸層 id 已唯一化）。
3. **存檔匯出/匯入**只在 headless 下各跑通一次；實瀏覽器下載/挑檔流程未驗。
4. **窄版/手機響應式**完全沒驗證過。
5. **數值平衡**沒調過：燃料消耗、XP 曲線、事件池權重，20 小時目標需要真人實玩校準。
6. 打字機點擊跳過、Enter/空白鍵推進、數字鍵選項——只做過合成事件測試。

## 必跑驗證套組（任何修改後）

```bash
node tools/check_links.js
node test/engine_test.js
python3 tools/ui_probe.py          # 真實座標點擊，改 CSS/HTML 後必跑
```

## 環境注意

- 使用者自己的服務在 **8765 埠**（`venv/bin/python app.py`），絕不可殺；本專案用 8923，佔用時先 `ss -ltnp | grep <port>` 查 pid 是誰的。
- 測試用的背景 http.server 記得收掉，否則使用者下次啟動會撞 `Address already in use`（已發生過一次）。
- 使用者機器是 2012 年 iMac，避免重量級方案。

## 除錯方法速記

- 真實點擊問題一律用 `elementFromPoint(x,y)` 座標命中驗證，程式化 `.click()` 不算數（原因見 AGENTS.md 坑 1）。
- headless 探測模板直接抄 `tools/ui_probe.py`：注入 harness → dump-dom → 正則取 `#__probe` 內容。
- rAF 在 dump-dom 模式不觸發；視窗預設 800×600，記得 `--window-size=1440,1000` + `scrollIntoView`。
- 引擎純邏輯無 DOM，可直接在 node 裡 shim `window` 後載入模擬（見 `test/engine_test.js` 開頭的 load 序列）。

## 檔案地圖

```
index.html                 入口（含全域錯誤橫幅、notranslate）
css/style.css              基礎＋標題＋創角
css/game_a.css             HUD＋舞台＋文本＋選項
css/game_b.css             遮罩／面板／圖鑑／結局（[hidden] 保命條款在開頭）
js/core.js                 UM 命名空間、UM.reg
js/portrait.js             參數化 SVG 頭像
js/engine_a.js             狀態、升級、直覺機率、線索計數
js/engine_b.js             req/cost/fx、事件池、travel 佇列、資源警告注入
js/engine_c.js             enter/choose/currentChoices/結局求值
js/save.js                 localStorage 三槽＋自動＋匯出入＋結局圖鑑 meta
js/ui_a.js                 星空 canvas、螢幕切換、打字機、toast、面板骨架
js/ui_b.js                 HUD 渲染、choices 渲染、六面板內容
js/ui_c.js                 創角、結局畫面、圖鑑、讀檔選單
js/main.js                 boot、全域 callback、鍵盤、playtime
js/data/lore|characters|items|phenomena|planets|endings.js
js/data/story/s0..s8*.js   主線節點（UM.reg）
tools/check_links.js       靜態連結檢查
tools/ui_probe.py          真實點擊探測（本輪新增）
tools/smoke.html           瀏覽器煙霧測試頁（相對路徑 ../js）
test/engine_test.js        無頭策略模擬
```
