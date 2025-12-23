# 快速設定 API 金鑰

## 🔑 您的 API 金鑰
```
AIzaSyDVgxCIQ8xAssv8NpRrnarCt-HWJ010raM
```

## 📋 設定步驟（3 分鐘完成）

### 步驟 1：打開設定頁面
直接點擊這個連結：
👉 **https://github.com/liuyunyi0210-blip/Face-calculater/settings/secrets/actions**

或手動操作：
1. 前往：https://github.com/liuyunyi0210-blip/Face-calculater
2. 點擊 **Settings** 標籤
3. 左側選單：**Secrets and variables** → **Actions**

### 步驟 2：添加 Secret
1. 點擊 **"New repository secret"** 按鈕（右上角）
2. 填寫：
   - **Name**: `GEMINI_API_KEY`（必須完全一致，全大寫）
   - **Secret**: `AIzaSyDVgxCIQ8xAssv8NpRrnarCt-HWJ010raM`
3. 點擊 **"Add secret"**

### 步驟 3：驗證
- 確認在 Secrets 列表中看到 `GEMINI_API_KEY`
- 狀態顯示為已設置（不會顯示實際值，這是正常的）

## ✅ 完成後

設定完成後，推送代碼觸發部署：

```bash
git push origin main
```

然後：
1. 前往 **Actions** 標籤查看部署狀態
2. 等待 2-5 分鐘讓部署完成
3. 訪問：https://liuyunyi0210-blip.github.io/Face-calculater/

## 🔒 安全提醒

- ✅ API 金鑰已安全存儲在 GitHub Secrets 中
- ✅ 不會暴露在代碼或 Git 歷史中
- ⚠️ 請勿在公開場合分享此 API 金鑰
- ⚠️ 如果 API 金鑰洩露，請立即到 Google AI Studio 重新生成

## 🚨 如果遇到問題

### 問題：找不到 Secrets 選項
**解決方案**：
- 確認您有 Repository 的管理權限
- 確認已登入正確的 GitHub 帳號

### 問題：Secret 名稱錯誤
**解決方案**：
- 必須完全一致：`GEMINI_API_KEY`（全大寫，底線分隔）
- 不能有空格或特殊字元

### 問題：部署時仍顯示需要 API 金鑰
**解決方案**：
1. 確認 Secret 名稱正確
2. 確認已點擊 "Add secret" 保存
3. 重新觸發部署（推送代碼或手動觸發）

