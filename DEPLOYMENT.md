# 部署檢查清單

在部署專案之前，請確認以下項目已完成：

## ✅ 前置準備

- [ ] 已申請 Google Gemini API 金鑰
  - 前往 [Google AI Studio](https://ai.google.dev/) 申請
  - 確認 API 金鑰有效且有足夠配額

- [ ] 已安裝 Node.js 18+ 和 npm
  ```bash
  node --version  # 應顯示 v18.x.x 或更高版本
  npm --version
  ```

- [ ] 專案依賴已安裝
  ```bash
  npm install
  ```

- [ ] 本地測試通過
  ```bash
  npm run dev
  # 在瀏覽器中測試功能是否正常
  ```

## 🔐 環境變數設定

### 本地開發
- [ ] 已建立 `.env.local` 檔案
- [ ] 已設定 `GEMINI_API_KEY` 環境變數
- [ ] `.env.local` 已在 `.gitignore` 中（避免提交到 Git）

### 生產環境（根據選擇的平台）

#### Vercel
- [ ] 已在 Vercel 專案設定中添加環境變數 `GEMINI_API_KEY`
- [ ] 確認環境變數在 Production、Preview、Development 環境都已設定

#### Netlify
- [ ] 已在 Netlify Site settings → Environment variables 中添加 `GEMINI_API_KEY`
- [ ] 確認環境變數已套用到所有部署環境

#### GitHub Pages / GitHub Actions
- [ ] 已在 GitHub Repository → Settings → Secrets and variables → Actions 中添加 `GEMINI_API_KEY`
- [ ] 確認 Secret 名稱正確為 `GEMINI_API_KEY`

## 📦 建置測試

- [ ] 生產建置成功
  ```bash
  npm run build
  ```
  確認 `dist` 資料夾已生成且無錯誤

- [ ] 預覽生產版本
  ```bash
  npm run preview
  ```
  在瀏覽器中測試功能是否正常

## 🚀 部署步驟

### 選擇部署平台並完成對應步驟：

#### Vercel
- [ ] 已將專案推送到 GitHub
- [ ] 已在 Vercel 匯入專案
- [ ] 已確認建置設定正確（自動偵測 Vite）
- [ ] 已設定環境變數
- [ ] 已點擊 Deploy
- [ ] 已測試部署後的網站功能

#### Netlify
- [ ] 已將專案推送到 GitHub
- [ ] 已在 Netlify 匯入專案
- [ ] 已確認 `netlify.toml` 配置正確
- [ ] 已設定環境變數
- [ ] 已點擊 Deploy site
- [ ] 已測試部署後的網站功能

#### GitHub Pages
- [ ] 已設定 GitHub Actions Secret
- [ ] 已在 Repository Settings → Pages 啟用 GitHub Actions
- [ ] 已推送程式碼到 main/master 分支觸發部署
- [ ] 已確認部署成功
- [ ] 已測試部署後的網站功能

## 🔍 部署後檢查

- [ ] 網站可以正常訪問
- [ ] 圖片上傳功能正常
- [ ] AI 辨識功能正常運作
- [ ] 錯誤訊息正確顯示
- [ ] 響應式設計在手機/平板/桌面都正常
- [ ] 瀏覽器主控台無錯誤訊息
- [ ] API 金鑰未暴露在前端程式碼中（檢查 Network 請求）

## 🐛 常見問題排查

### API 金鑰錯誤
- 確認環境變數名稱正確：`GEMINI_API_KEY`
- 確認環境變數已在部署平台正確設定
- 確認 API 金鑰有效且有配額

### 建置失敗
- 確認 Node.js 版本 >= 18
- 清除快取：`rm -rf node_modules package-lock.json && npm install`
- 檢查建置日誌中的錯誤訊息

### 部署後功能異常
- 檢查瀏覽器主控台的錯誤訊息
- 確認環境變數已正確設定
- 確認 API 金鑰沒有配額限制
- 檢查網路連線是否正常

## 📝 後續維護

- [ ] 已設定監控和錯誤追蹤（可選）
- [ ] 已備份環境變數設定
- [ ] 已記錄部署流程供未來參考
- [ ] 已設定自動部署（如使用 GitHub Actions）

---

**完成所有檢查項目後，您的專案應該已經成功上線！** 🎉

如有問題，請參考 [README.md](./README.md) 或建立 GitHub Issue。

