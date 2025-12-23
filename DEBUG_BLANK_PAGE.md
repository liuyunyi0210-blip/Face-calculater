# 空白頁面問題排查指南

## 可能的原因和解決方案

### 1. 檢查 GitHub Pages 設定

1. 前往 Repository → Settings → Pages
2. 確認設定：
   - **Source**: `Deploy from a branch`
   - **Branch**: `gh-pages` (不是 main)
   - **Folder**: `/ (root)`

### 2. 檢查部署狀態

1. 前往 Repository → Actions
2. 查看最新的 workflow 執行結果
3. 確認：
   - ✅ Build 步驟成功
   - ✅ Deploy 步驟成功
   - ✅ 沒有錯誤訊息

### 3. 檢查構建產物

部署成功後，檢查 `gh-pages` 分支：
1. 切換到 `gh-pages` 分支
2. 確認有以下檔案：
   - `index.html`
   - `assets/` 資料夾（包含 JS 和 CSS）

### 4. 檢查瀏覽器主控台

打開網站後，按 F12 打開開發者工具：
1. 查看 **Console** 標籤是否有錯誤
2. 查看 **Network** 標籤：
   - 確認 JS/CSS 檔案有載入
   - 檢查是否有 404 錯誤
   - 確認資源路徑是否正確（應該是 `/Face-calculater/assets/...`）

### 5. 常見問題

#### 問題 A：資源路徑錯誤（404）
**症狀**：Network 標籤顯示 JS/CSS 檔案 404

**解決方案**：
- 確認 `vite.config.ts` 中 `base: '/Face-calculater/'` 已設置
- 確認構建時 `GITHUB_PAGES=true` 環境變數已設置

#### 問題 B：CORS 錯誤
**症狀**：Console 顯示 CORS 相關錯誤

**解決方案**：
- 這是正常的，GitHub Pages 不支援 CORS
- 確認所有資源都使用相對路徑或正確的 base 路徑

#### 問題 C：JavaScript 未執行
**症狀**：頁面載入但沒有內容

**解決方案**：
- 檢查 `index.html` 中是否有正確的 script 標籤
- Vite 構建後會自動注入，不需要手動添加

### 6. 手動驗證步驟

1. **檢查構建產物**：
   ```bash
   npm run build
   # 檢查 dist/index.html 中的資源路徑
   ```

2. **本地預覽**：
   ```bash
   npm run preview
   # 訪問 http://localhost:4173/Face-calculater/
   # 確認是否正常顯示
   ```

3. **檢查實際部署的檔案**：
   - 訪問：https://liuyunyi0210-blip.github.io/Face-calculater/index.html
   - 查看頁面原始碼（右鍵 → 查看頁面原始碼）
   - 確認 script 標籤的路徑是否正確

### 7. 強制重新部署

如果以上都正常但仍顯示空白：

1. **清除 GitHub Pages 快取**：
   - 前往 Settings → Pages
   - 點擊 "Save" 重新部署

2. **重新觸發部署**：
   ```bash
   git commit --allow-empty -m "觸發重新部署"
   git push origin main
   ```

3. **清除瀏覽器快取**：
   - 使用無痕模式訪問
   - 或清除瀏覽器快取

### 8. 檢查清單

- [ ] GitHub Pages 設定正確（gh-pages 分支）
- [ ] GitHub Actions 部署成功
- [ ] `gh-pages` 分支有 `index.html` 和 `assets/` 資料夾
- [ ] 瀏覽器主控台無錯誤
- [ ] Network 標籤顯示資源正常載入
- [ ] `vite.config.ts` 中 base 路徑正確
- [ ] 構建時設置了 `GITHUB_PAGES=true`

## 如果問題仍然存在

請提供以下資訊：
1. 瀏覽器主控台的錯誤訊息
2. Network 標籤的載入狀態
3. GitHub Actions 的執行日誌
4. `gh-pages` 分支的檔案結構

