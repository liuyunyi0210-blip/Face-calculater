<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# AI 人臉統計網

一個使用 Google Gemini AI 進行人臉辨識與統計的網頁應用程式，可自動辨識團體照片中的人數並分類統計。

View your app in AI Studio: https://ai.studio/apps/drive/12OMhcxLHzkxBr89kC4zyTy0SbC26gVV2

## 功能特色

- 🤖 AI 自動人臉辨識與統計
- 📊 即時人數統計與分類（未來部、男子部、女子部、壯年部、婦人部）
- 🎯 精準的臉部座標標記
- ✏️ 手動修正部別分類
- 📱 響應式設計，支援各種裝置

## 本地開發

### 前置需求

- Node.js 18+ 
- npm 或 yarn
- Gemini API 金鑰（請到 [Google AI Studio](https://ai.google.dev/) 申請）

### 安裝步驟

1. **安裝依賴套件**
   ```bash
   npm install
   ```

2. **設定環境變數**
   
   建立 `.env.local` 檔案（或複製 `.env.example`）：
   ```bash
   GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

   應用程式將在 `http://localhost:3000` 啟動

4. **預覽生產版本**
   ```bash
   npm run build
   npm run preview
   ```

## 部署上線

本專案支援多種部署平台，選擇最適合您的方案：

### 方案一：Vercel 部署（推薦）

Vercel 提供最簡單快速的部署體驗，並自動處理環境變數。

#### 步驟：

1. **安裝 Vercel CLI**（可選）
   ```bash
   npm i -g vercel
   ```

2. **透過 GitHub 部署**
   - 將專案推送到 GitHub
   - 前往 [Vercel](https://vercel.com/)
   - 點擊 "New Project"
   - 匯入您的 GitHub 專案
   - 在環境變數設定中添加 `GEMINI_API_KEY`
   - 點擊 "Deploy"

3. **透過 CLI 部署**
   ```bash
   vercel
   ```
   首次部署會引導您設定環境變數

#### 環境變數設定：
在 Vercel 專案設定中，添加以下環境變數：
- `GEMINI_API_KEY`: 您的 Gemini API 金鑰

### 方案二：Netlify 部署

Netlify 同樣提供簡單的部署流程。

#### 步驟：

1. **透過 GitHub 部署**
   - 將專案推送到 GitHub
   - 前往 [Netlify](https://www.netlify.com/)
   - 點擊 "Add new site" → "Import an existing project"
   - 選擇您的 GitHub 專案
   - 建置設定會自動偵測（已包含 `netlify.toml`）
   - 在環境變數設定中添加 `GEMINI_API_KEY`
   - 點擊 "Deploy site"

2. **透過 CLI 部署**
   ```bash
   npm install -g netlify-cli
   netlify deploy --prod
   ```

#### 環境變數設定：
在 Netlify 專案設定 → Site settings → Environment variables 中添加：
- `GEMINI_API_KEY`: 您的 Gemini API 金鑰

### 方案三：GitHub Pages 部署

適合靜態網站部署，但需要額外設定。

#### 步驟：

1. **更新 `vite.config.ts`**（已包含 base 路徑設定）
   ```typescript
   base: '/your-repo-name/'
   ```

2. **設定 GitHub Actions**
   - 在 GitHub 專案設定 → Secrets and variables → Actions
   - 添加 `GEMINI_API_KEY` secret
   - 推送程式碼到 main/master 分支會自動觸發部署

3. **啟用 GitHub Pages**
   - 前往專案 Settings → Pages
   - Source 選擇 "GitHub Actions"

### 方案四：其他平台

#### Cloudflare Pages
```bash
npm run build
# 上傳 dist 資料夾到 Cloudflare Pages
```

#### AWS Amplify / Azure Static Web Apps
遵循各平台的靜態網站部署指南，確保設定 `GEMINI_API_KEY` 環境變數。

## 環境變數說明

| 變數名稱 | 說明 | 必填 |
|---------|------|------|
| `GEMINI_API_KEY` | Google Gemini API 金鑰 | ✅ |

## 專案結構

```
Face-calculater/
├── components/          # React 元件
│   ├── DetectionOverlay.tsx
│   └── Header.tsx
├── services/           # API 服務
│   └── geminiService.ts
├── App.tsx            # 主應用程式
├── index.tsx          # 入口檔案
├── types.ts           # TypeScript 類型定義
├── vite.config.ts     # Vite 配置
├── vercel.json        # Vercel 部署配置
├── netlify.toml       # Netlify 部署配置
└── .github/
    └── workflows/
        └── deploy.yml # GitHub Actions CI/CD
```

## 技術棧

- **前端框架**: React 19
- **建置工具**: Vite 6
- **AI 服務**: Google Gemini API
- **樣式**: Tailwind CSS
- **語言**: TypeScript

## 疑難排解

### 建置失敗
- 確認 Node.js 版本 >= 18
- 清除快取：`rm -rf node_modules package-lock.json && npm install`

### API 金鑰錯誤
- 確認環境變數名稱正確：`GEMINI_API_KEY`
- 確認 API 金鑰有效且有足夠配額
- 檢查部署平台的環境變數設定

### 部署後無法正常運作
- 確認環境變數已在部署平台正確設定
- 檢查瀏覽器主控台的錯誤訊息
- 確認 API 金鑰沒有暴露在前端程式碼中（應透過環境變數注入）

## 授權

本專案為私有專案。

## 聯絡資訊

如有問題或建議，請透過 GitHub Issues 聯繫。
