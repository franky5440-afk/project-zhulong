# universe_mud 專案工作規範

繼承全域規範（繁體中文回覆、先動手再解釋、高危操作先詢問等）。以下為本專案追加規則。

## 架構鐵律

- 純前端、零依賴、無打包：所有 JS 是傳統 script 全域命名空間 `UM`，載入順序寫死在 `index.html`，新增檔案必須插對位置（core → data → engine_a/b/c → save → ui_a/b/c → main）。
- **引擎與 UI 嚴格分離**：`engine_*.js` 禁止出現任何 `document` / DOM 引用；`ui_*.js` 不寫遊戲邏輯判定。這是 `test/engine_test.js` 能無頭跑通的前提。
- 所有劇情節點用 `UM.reg([...])` 註冊，id 全域唯一；改內容前後都要跑 `node tools/check_links.js`。

## 已經踩過的坑（勿重蹈）

1. **禁止只靠 `.click()` 驗證 UI**。程式化 click 不經過瀏覽器命中測試，曾讓「隱形全螢幕遮罩吃掉所有真實點擊」的 bug 連過三輪測試。凡涉及可點擊性，必須用 `tools/ui_probe.py`（`elementFromPoint` 真實座標命中）驗證。
2. **`[hidden]` 屬性會被作者 CSS 的 display 覆蓋**。`game_b.css` 開頭的 `[hidden]{display:none!important}` 是保命條款，刪除前先想清楚。
3. **遮罩類元素用 pointer-events 控制可否點擊**（見 `#overlay` / `#overlay.open`），不要依賴關閉動畫的時序。
4. **旗標名稱一致性**：選項 `req.noflags` 與效果 `fx.flags` 必須逐字相同（曾發生 `sail_done` vs `tech_sail` 導致任務可無限重複）。新增可重複入口一律配對檢查。
5. **`goto:'@next'` 只允許出現在航行佇列內的事件節點**。主線直接鏈的每個節點必須寫明確去向，否則玩家會卡死在空佇列。
6. 支線星球必須自閉環：出口寫明確返回樞紐（如 `ac_hub`、`cm_pre`），並設完成旗標 + 入口 `noflags` 防重複。
7. 結局判定照 `UM.DATA.ENDINGS` 陣列順序短路求值，調整條件前先看清優先級；十個結局的 when() 條件互斥性靠 `test/engine_test.js` 守護。

## 修改後的最小驗證套組

```bash
node tools/check_links.js      # 節點連結與資料引用
node test/engine_test.js       # 多策略模擬通關＋結局判定
python3 tools/ui_probe.py      # 真實座標點擊：創角→推進→六面板
```

三者全綠才算完成。改 CSS/HTML 後至少要跑第三項。

## 版本號

- 每次修改後必須更新 `UM.VERSION`（`js/core.js`，單一來源），首頁右下角 `#ver-tag` 自動顯示。
- 語意化：bug 修復進 patch、新內容／功能進 minor、大改版或存檔不相容進 major。

## 環境備忘

- 使用者自己的服務跑在 8765 埠（`venv/bin/python app.py`），**不可殺**；本專案慣用 8923，遇到佔用先查 pid 是誰的。
- headless Chrome 探測注意：rAF 在 dump-dom 模式不觸發（別 await requestAnimationFrame）；預設視窗 800×600，量測按鈕座標前先 `--window-size=1440,1000` 或 `scrollIntoView`。
- 使用者機器為 2012 年 iMac，避免重量級方案。

## 除錯資產

- `index.html` 內建全域錯誤橫幅：任何未捕捉例外會以紅字浮現在使用者畫面底部，請使用者回報該文字即可定位。
- `tools/ui_probe.py [port] [steps]`：無頭真實點擊探測，輸出每步命中元素與面板開合狀態。
