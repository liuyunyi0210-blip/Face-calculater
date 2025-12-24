# 修復 API 金鑰設定錯誤

## 🔍 問題診斷

如果出現 "API 金鑰設定錯誤，請檢查環境變數配置"，請按以下步驟檢查：

### 步驟 1：確認 GitHub Secrets 設置

1. 前往：https://github.com/liuyunyi0210-blip/Face-calculater/settings/secrets/actions
2. 確認 `GEMINI_API_KEY` 存在
3. 如果不存在，點擊 "New repository secret" 添加：
   - **Name**: `GEMINI_API_KEY`
   - **Secret**: 您的 API 金鑰（`AIzaSyDVgxCIQ8xAssv8NpRrnarCt-HWJ010raM`）

### 步驟 2：檢查構建日誌

1. 前往：https://github.com/liuyunyi0210-blip/Face-calculater/actions
2. 點擊最新的 workflow
3. 展開 "Build project" 步驟
4. 查看是否有：
   - ✅ "GEMINI_API_KEY 已設置（長度: XX）" = 正確
   - ❌ "GEMINI_API_KEY 環境變數未設置！" = 需要檢查 Secrets

### 步驟 3：重新部署

如果 Secrets 設置正確但仍有問題：

1. **觸發重新部署**：
   ```bash
   git commit --allow-empty -m "觸發重新部署"
   git push origin main
   ```

2. **或手動觸發**：
   - 前往 Actions
   - 點擊 "Run workflow"
   - 選擇 main 分支
   - 點擊 "Run workflow"

## ✅ 已完成的修復

### 1. 添加構建時驗證
- 在構建步驟中檢查環境變數是否存在
- 如果不存在，構建會失敗並顯示明確錯誤

### 2. 改進環境變數讀取
- 優先從 `process.env` 讀取（GitHub Actions 設置的）
- 然後從 `.env` 檔案讀取（本地開發）
- 添加調試信息幫助排查

### 3. 改進錯誤訊息
- 更清楚的錯誤提示
- 提供具體的解決步驟

## 🔧 常見問題

### 問題 1：Secrets 已設置但構建失敗

**可能原因**：
- Secret 名稱不正確（必須是 `GEMINI_API_KEY`）
- Secret 值為空

**解決方案**：
1. 刪除舊的 Secret
2. 重新創建，確保名稱和值都正確
3. 重新部署

### 問題 2：構建成功但網站仍顯示錯誤

**可能原因**：
- 環境變數在構建時未正確注入
- 需要清除瀏覽器快取

**解決方案**：
1. 檢查構建日誌，確認環境變數已設置
2. 清除瀏覽器快取或使用無痕模式
3. 等待幾分鐘讓 CDN 更新

### 問題 3：本地可以但部署後不行

**可能原因**：
- 本地有 `.env.local` 檔案
- 但 GitHub Secrets 未設置

**解決方案**：
- 確保 GitHub Secrets 中已設置 `GEMINI_API_KEY`

## 📋 檢查清單

部署前確認：
- [ ] GitHub Secrets 中有 `GEMINI_API_KEY`
- [ ] Secret 名稱完全一致（大小寫敏感）
- [ ] Secret 值正確（API 金鑰有效）
- [ ] 已推送代碼觸發部署

部署後確認：
- [ ] 構建日誌顯示 "GEMINI_API_KEY 已設置"
- [ ] 構建成功完成
- [ ] 網站可以訪問
- [ ] 功能正常運作

## 🚀 快速修復步驟

1. **確認 Secrets**：
   - 前往 Settings → Secrets → Actions
   - 確認 `GEMINI_API_KEY` 存在

2. **重新部署**：
   ```bash
   git push origin main
   ```

3. **檢查構建日誌**：
   - 前往 Actions
   - 查看構建日誌
   - 確認環境變數已設置

4. **測試網站**：
   - 訪問網站
   - 嘗試上傳圖片
   - 查看是否還有錯誤

## ⚠️ 重要提醒

- Secret 名稱必須完全一致：`GEMINI_API_KEY`（全大寫）
- API 金鑰必須有效（可以在 Google AI Studio 測試）
- 設置 Secret 後需要重新部署才會生效

