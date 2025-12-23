# 修復 "Load failed sending request" 錯誤

## 🔍 問題分析

錯誤 `exception TypeError: Load failed sending request` 通常表示：

1. **API 金鑰未正確注入**：環境變數在構建時可能沒有正確傳遞
2. **網絡請求失敗**：可能是 CORS 或網絡問題
3. **API 端點無法訪問**：Gemini API 請求失敗

## ✅ 已完成的修復

### 1. 改進 API 金鑰檢測
- 添加多種方式檢測 API 金鑰
- 添加詳細的錯誤日誌
- 更好的錯誤訊息

### 2. 改進錯誤處理
- 捕獲 "Load failed" 錯誤
- 提供更清晰的錯誤訊息
- 添加調試日誌

## 🚀 下一步操作

### 步驟 1：推送修復

```bash
git push origin main
```

### 步驟 2：確認 API 金鑰設定

1. 前往：https://github.com/liuyunyi0210-blip/Face-calculater/settings/secrets/actions
2. 確認 `GEMINI_API_KEY` 存在且正確

### 步驟 3：重新部署

推送後，GitHub Actions 會自動：
1. 重新構建專案
2. 注入 API 金鑰到構建中
3. 部署到 GitHub Pages

### 步驟 4：測試

部署完成後：
1. 訪問網站
2. 打開瀏覽器主控台（F12）
3. 嘗試上傳圖片
4. 查看是否有錯誤訊息

## 🔧 如果問題仍然存在

### 檢查項目：

1. **API 金鑰是否正確**
   - 確認 GitHub Secrets 中的 API 金鑰正確
   - 確認 API 金鑰有效（可以在 Google AI Studio 測試）

2. **構建日誌**
   - 前往 Actions → 查看最新的 workflow
   - 確認構建成功
   - 查看是否有警告訊息

3. **瀏覽器主控台**
   - 按 F12 → Console
   - 查看詳細錯誤訊息
   - 確認 API 金鑰是否被正確載入

4. **網絡請求**
   - 按 F12 → Network
   - 查看對 Gemini API 的請求
   - 確認請求是否成功

## 📋 調試步驟

如果問題持續：

1. **檢查構建產物**
   - 在 Actions 中查看構建日誌
   - 確認環境變數已正確設置

2. **測試 API 金鑰**
   - 前往 Google AI Studio
   - 測試 API 金鑰是否有效

3. **檢查 CORS**
   - 確認沒有 CORS 錯誤
   - Gemini API 應該支援跨域請求

## ⚠️ 重要提醒

- API 金鑰會在構建時注入到代碼中
- 這意味著 API 金鑰會暴露在客戶端代碼中
- 對於公開網站，建議使用代理服務器保護 API 金鑰
- 但對於 GitHub Pages，這是目前唯一的方式

## 🎯 預期結果

修復後，您應該：
- ✅ 不再看到 "Load failed" 錯誤
- ✅ API 請求成功
- ✅ AI 辨識功能正常運作

