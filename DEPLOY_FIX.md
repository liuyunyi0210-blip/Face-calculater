# 自動部署修復說明

## 🔧 已完成的關鍵修復

### 1. 使用 GitHub 官方部署 Action
- ✅ 從 `peaceiris/actions-gh-pages` 改為 GitHub 官方的 `actions/deploy-pages`
- ✅ 更可靠且與 GitHub Pages 整合更好

### 2. 改進權限設定
- ✅ 添加完整的權限配置：
  ```yaml
  permissions:
    contents: read
    pages: write
    id-token: write
  ```

### 3. 分離構建和部署步驟
- ✅ 使用兩個獨立的 job：`build` 和 `deploy`
- ✅ 更好的錯誤追蹤和調試

### 4. 添加並發控制
- ✅ 防止多個部署同時執行造成衝突

## 🚀 部署步驟

### 步驟 1：推送變更
```bash
git push origin main
```

### 步驟 2：設置 GitHub Pages（重要！）

**必須手動設置一次**：

1. 前往 Repository → **Settings** → **Pages**
2. 在 **Source** 部分：
   - 選擇：**"GitHub Actions"**（不是 "Deploy from a branch"）
3. 點擊 **Save**

這會啟用 GitHub Actions 自動部署功能。

### 步驟 3：檢查部署狀態

1. 前往 Repository → **Actions**
2. 查看最新的 workflow 執行
3. 確認：
   - ✅ `build` job 成功
   - ✅ `deploy` job 成功
   - ✅ 沒有錯誤訊息

### 步驟 4：驗證網站

部署完成後（通常 2-5 分鐘），訪問：
- https://liuyunyi0210-blip.github.io/Face-calculater/

## ⚠️ 重要提醒

### 必須設置 GitHub Pages Source

**這是關鍵步驟**！如果沒有設置，部署不會生效：

1. Repository → Settings → Pages
2. Source 選擇：**"GitHub Actions"**
3. 點擊 Save

### 環境變數設置

確保已在 GitHub Secrets 中設置：
- Repository → Settings → Secrets and variables → Actions
- 添加 `GEMINI_API_KEY`

## 🔍 故障排查

### 問題：部署失敗，顯示權限錯誤

**解決方案**：
1. 確認 Repository → Settings → Actions → General
2. 在 "Workflow permissions" 部分：
   - 選擇 "Read and write permissions"
   - 勾選 "Allow GitHub Actions to create and approve pull requests"

### 問題：構建成功但網站還是空白

**檢查項目**：
1. 確認 GitHub Pages Source 設置為 "GitHub Actions"
2. 檢查 `gh-pages` 分支是否已創建（舊方式）
3. 如果使用舊方式，需要切換到新方式

### 問題：Actions 沒有執行

**解決方案**：
1. 確認已推送到 `main` 分支
2. 檢查 Repository → Settings → Actions → General
3. 確認 Actions 已啟用

## 📋 新舊配置對比

### 舊配置（可能不穩定）
- 使用 `peaceiris/actions-gh-pages`
- 部署到 `gh-pages` 分支
- Source 設置為 "Deploy from a branch"

### 新配置（推薦）
- 使用 GitHub 官方 `actions/deploy-pages`
- 直接部署到 GitHub Pages
- Source 設置為 "GitHub Actions"

## ✅ 驗證清單

部署前確認：
- [ ] 已推送最新代碼到 `main` 分支
- [ ] GitHub Pages Source 設置為 "GitHub Actions"
- [ ] `GEMINI_API_KEY` 已在 Secrets 中設置
- [ ] Actions 權限已啟用（Read and write）

部署後確認：
- [ ] Actions workflow 執行成功
- [ ] 網站可以訪問
- [ ] 頁面有內容（不是空白）
- [ ] 功能正常運作

