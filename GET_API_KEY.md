# 如何獲取 Gemini API 金鑰

## 🔑 申請步驟

### 步驟 1：前往 Google AI Studio

1. 訪問：https://ai.google.dev/
2. 點擊右上角的 **"Get API key"** 或 **"Get started"**

### 步驟 2：登入 Google 帳號

- 使用您的 Google 帳號登入
- 如果沒有 Google 帳號，需要先註冊一個

### 步驟 3：創建 API 金鑰

1. 登入後，點擊 **"Create API Key"**
2. 選擇要使用的 Google Cloud 專案（或創建新專案）
3. 點擊 **"Create API key in new project"** 或選擇現有專案
4. 複製生成的 API 金鑰（格式類似：`AIzaSy...`）

### 步驟 4：保存 API 金鑰

⚠️ **重要**：請妥善保存您的 API 金鑰，它只會顯示一次！

## 🔐 在 GitHub 中設置 API 金鑰

### 步驟 1：前往 GitHub Repository Settings

1. 打開您的 GitHub Repository：https://github.com/liuyunyi0210-blip/Face-calculater
2. 點擊 **Settings** 標籤

### 步驟 2：添加 Secret

1. 在左側選單中找到 **Secrets and variables** → **Actions**
2. 點擊 **"New repository secret"**
3. 填寫：
   - **Name**: `GEMINI_API_KEY`（必須完全一致，大寫）
   - **Secret**: 貼上您剛才複製的 API 金鑰
4. 點擊 **"Add secret"**

### 步驟 3：驗證設置

1. 確認在 Secrets 列表中看到 `GEMINI_API_KEY`
2. 狀態應該顯示為已設置（不會顯示實際值，這是正常的）

## ✅ 完成後

設置完成後：

1. **推送代碼觸發部署**：
   ```bash
   git push origin main
   ```

2. **檢查部署**：
   - 前往 Repository → Actions
   - 查看最新的 workflow 執行
   - 確認構建成功

## 💡 提示

### API 金鑰安全

- ✅ **可以分享**：API 金鑰可以安全地存儲在 GitHub Secrets 中
- ❌ **不要提交**：不要將 API 金鑰直接寫在代碼中或提交到 Git
- 🔒 **已配置**：`.gitignore` 已設置忽略 `.env` 檔案

### 免費配額

Google Gemini API 提供免費配額：
- 通常每月有免費使用額度
- 適合個人專案和小型應用
- 查看配額：https://ai.google.dev/pricing

### 如果 API 金鑰無效

如果遇到錯誤：
1. 確認 API 金鑰格式正確（以 `AIzaSy` 開頭）
2. 確認已在 Google Cloud Console 啟用 Gemini API
3. 檢查 API 金鑰是否有使用限制

## 📞 需要幫助？

如果申請過程中遇到問題：
1. 檢查 Google 帳號是否正常
2. 確認已啟用 Gemini API（在 Google Cloud Console）
3. 查看 Google AI Studio 文檔：https://ai.google.dev/docs

