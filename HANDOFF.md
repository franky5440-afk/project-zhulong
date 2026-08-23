# HANDOFF — 下一個 session 交接

寫於 2026-08-23 深夜。本輪完成 bug 修復、版本號系統、webp 頭像、首頁背景、**GitHub Pages 公開部署**。使用者表示「接下來的 bug 要等有人試玩到結局才會知道」。

## 專案現況

- **已公開上線**：https://franky5440-afk.github.io/project-zhulong/（v1.2.0）
- Repo：`franky5440-afk/project-zhulong`（public，main 分支根目錄 = Pages 來源，push 即自動部署，約 1 分鐘生效）
- **universe_mud/ 已是獨立 git repo**（本輪 `git init`）。注意：它以前不是 repo、上層 home repo 也沒追蹤它；不要把兩者混淆。
- Repo 內含 `AGENTS.md`、`HANDOFF.md` 開發文件，公開可見；使用者未表示介意，別主動刪。

## 下一輪第一件事

問使用者有沒有玩家回報（紅色「系統錯誤：…」橫幅文字、操作步驟、裝置/瀏覽器）。**線上站無法注入 ui_probe 的 harness**（探測靠改寫 index.html），線上問題只能靠回報描述＋本機重現。

沒有回報就照下面薄弱區順序主動驗證。

## 薄弱區（優先驗證順序）

1. **NG+ 輪迴全鏈 ui_probe**：結局畫面「攜帶狀態開啟新一輪」→ 創角 carry-note → 啟動繼承 → `btn-start` 文字還原。只做過引擎層模擬，UI 鏈沒跑過真實點擊。
2. **結局圖鑑視覺**：從標題頁開啟的實際渲染沒人看過（SVG 漸層 id 唯一化後）。
3. **存檔匯出/匯入**：headless 各跑通一次；實瀏覽器下載/挑檔未驗。
4. **窄版/手機響應式**：完全沒驗。本輪新增 `.title-bg` 與 `img.portrait-svg`，小螢幕下圓形裁切、create-grid 單欄折行要實看（headless 可用 `--window-size=390,844` 截圖）。
5. **鍵盤操作**：打字機點擊跳過、Enter/空白推進、數字鍵選項——只做過合成事件測試。
6. **數值平衡**：燃料/XP/事件池權重沒調過。現在有真人玩家，等回報校準，不要閉門亂調。

## 本輪新增機制速記

- **版本號**：`UM.VERSION`（`js/core.js` 單一來源）→ boot 注入首頁右下 `#ver-tag`。規則：bug 修 patch／新內容 minor／大改版 major。**每次修改後必 bump**（詳見 AGENTS.md）。
- **頭像**：`UM.portrait()` 先查 `PIC` 表（`js/portrait.js` 開頭）→ 有圖回傳 `<img class="portrait-svg">`，無圖 fallback 原 SVG。10 張 webp 已全接入，命名 `{id}_male|female.webp`，新增頭像 = 檔案丟 `picture/` + PIC 表加一行。
- **`img.portrait-svg`** 用 `aspect-ratio:1/1 + object-fit:cover`（style.css），混合 1:1 與 2:3 素材都能正確圓形裁切。
- **首頁背景**：`#scr-title` 內 `.title-bg`（`picture/spaceship.webp`，opacity .55 + 上下漸層暗化）。調亮度時記得文字可讀性，截圖確認。
- 頭像/首頁專用探測腳本模板：`/tmp/opencode/portrait_probe.py`（暫存區可能被清，必要時照 `tools/ui_probe.py` 的注入法重寫：真實座標 `elementFromPoint` + dump `#__probe`）。

## 必跑驗證套組（任何修改後）

```bash
node tools/check_links.js
node test/engine_test.js
python3 tools/ui_probe.py          # 改 CSS/HTML 後必跑
```

三者全綠 + bump 版本號 + push，才算完成。

## 環境注意

- 使用者自己的服務在 **8765 埠**，絕不可殺；本專案慣用 8923，ui_probe 預設 8977，本輪探測用過 8979。
- 測試用背景 http.server 記得收掉（已發生過撞埠事故）。本輪收尾時已確認 8923/8977/8979 無殘留。
- push 前跑機密掃描（`git ls-files` + grep，見全域 AGENTS.md）；本輪部署前掃過一次 CLEAN。
- headless 探測：rAF 在 dump-dom 模式不觸發；視窗預設 800×600，量座標前 `--window-size=1440,1000` + `scrollIntoView`。
- 使用者機器是 2012 年 iMac，避免重量級方案。

## 除錯方法速記（不變）

- 真實點擊一律 `elementFromPoint(x,y)` 驗證，程式化 `.click()` 不算數（AGENTS.md 坑 1）。
- 探測後重建的 DOM 清單（如 `.bg-card`）要重新 query，舊參考是 detached、座標全零（本輪踩過）。
- 引擎純邏輯無 DOM，node 裡 shim `window` 即可模擬（見 `test/engine_test.js` 開頭）。
- `index.html` 全域錯誤橫幅會把例外紅字浮在畫面底部，請使用者回報該文字即可定位。
