# GitHub Pages 部署修復

## 問題說明

網站已成功構建，但打開 https://liuyunyi0210-blip.github.io/Face-calculater/ 顯示空白頁面。

## 原因分析

1. **缺少 base 路徑配置**：GitHub Pages 需要設置正確的 base 路徑（`/Face-calculater/`）
2. **缺少實際部署步驟**：GitHub Actions 只上傳了構建產物，沒有部署到 GitHub Pages

## ✅ 已完成的修復

### 1. 添加 base 路徑配置
在 `vite.config.ts` 中添加：
```typescript
const base = process.env.GITHUB_PAGES === 'true' ? '/Face-calculater/' : '/';
```

### 2. 添加 GitHub Pages 部署步驟
在 `.github/workflows/deploy.yml` 中添加：
```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  if: github.ref == 'refs/heads/main'
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist
```

### 3. 添加必要權限
添加 `permissions: contents: write` 以允許部署

## 🚀 下一步操作

### 1. 推送變更
```bash
git push origin main
```

### 2. 檢查 GitHub Pages 設定
1. 前往 GitHub Repository → Settings → Pages
2. 確認 Source 設定為：
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` (會自動創建)
   - **Folder**: `/ (root)`

### 3. 等待部署完成
- GitHub Actions 會自動執行
- 部署完成後，網站會在幾分鐘內更新
- 可以查看 Actions 標籤頁確認部署狀態

## 🔍 驗證部署

部署成功後，訪問：
- https://liuyunyi0210-blip.github.io/Face-calculater/

應該能看到完整的應用程式界面。

## ⚠️ 重要提醒

1. **環境變數**：確保已在 GitHub Secrets 中設置 `GEMINI_API_KEY`
2. **首次部署**：可能需要等待 5-10 分鐘
3. **快取清除**：如果還是空白，嘗試清除瀏覽器快取或使用無痕模式

## 📝 如果仍有問題

1. 檢查 GitHub Actions 日誌是否有錯誤
2. 確認 `gh-pages` 分支已創建
3. 確認 GitHub Pages 設定正確
4. 檢查瀏覽器主控台是否有錯誤訊息

