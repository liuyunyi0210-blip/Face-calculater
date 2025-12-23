# 快速上線指南

## 🚀 5 分鐘快速部署（Vercel）

### 步驟 1：準備 GitHub 專案
```bash
# 確保所有變更已提交
git add .
git commit -m "準備部署"
git push origin main
```

### 步驟 2：部署到 Vercel

1. 前往 [vercel.com](https://vercel.com)
2. 點擊 **"New Project"**
3. 選擇您的 GitHub 專案
4. 在 **Environment Variables** 中添加：
   - Key: `GEMINI_API_KEY`
   - Value: 您的 Gemini API 金鑰
5. 點擊 **"Deploy"**

完成！您的網站將在幾分鐘內上線。

---

## 📋 其他部署方式

### Netlify 部署
1. 前往 [netlify.com](https://www.netlify.com)
2. 點擊 **"Add new site"** → **"Import an existing project"**
3. 選擇 GitHub 專案
4. 在 **Environment variables** 中添加 `GEMINI_API_KEY`
5. 點擊 **"Deploy site"**

### 本地測試生產版本
```bash
npm run build
npm run preview
```

---

## ⚠️ 重要提醒

1. **API 金鑰安全**：確保 `GEMINI_API_KEY` 只在部署平台的環境變數中設定，不要提交到 Git
2. **測試功能**：部署後務必測試圖片上傳和 AI 辨識功能
3. **配額檢查**：確認 Gemini API 有足夠的使用配額

---

詳細說明請參考 [README.md](./README.md) 和 [DEPLOYMENT.md](./DEPLOYMENT.md)

