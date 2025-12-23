# 🚀 立即部署步驟

## 步驟 1：推送代碼

在終端機執行：

```bash
cd /Users/user/Documents/GitHub/Face-calculater
git push origin main
```

如果遇到認證問題，可能需要：
- 使用 GitHub CLI：`gh auth login`
- 或使用 SSH：確認您的遠端 URL 是 SSH 格式

## 步驟 2：確認 GitHub Pages 設定

**必須確認這個設定**：

👉 https://github.com/liuyunyi0210-blip/Face-calculater/settings/pages

在 **Source** 部分：
- ✅ 選擇：**"GitHub Actions"**
- ✅ 點擊 **Save**

## 步驟 3：監控部署

推送後，前往：

👉 https://github.com/liuyunyi0210-blip/Face-calculater/actions

查看最新的 workflow 執行：
- ✅ `build` job 應該會開始執行
- ✅ 如果成功，`deploy` job 會自動執行
- ✅ 兩個都顯示綠色勾勾 = 成功！

## 步驟 4：驗證網站

等待 2-5 分鐘後，訪問：

👉 https://liuyunyi0210-blip.github.io/Face-calculater/

應該能看到：
- ✅ 完整的應用程式界面
- ✅ 可以上傳圖片
- ✅ AI 辨識功能正常

## 📋 檢查清單

推送前確認：
- [x] API 金鑰已設定（`GEMINI_API_KEY`）
- [ ] GitHub Pages Source 設置為 "GitHub Actions"
- [ ] 代碼已推送

推送後確認：
- [ ] Actions workflow 執行中
- [ ] Build job 成功
- [ ] Deploy job 成功
- [ ] 網站可以訪問
- [ ] 頁面有內容

## ⚠️ 如果遇到問題

### 問題：推送失敗
**解決方案**：
- 確認已登入 GitHub
- 使用 GitHub Desktop 或網頁版 GitHub 推送

### 問題：Actions 沒有執行
**解決方案**：
- 確認已推送到 `main` 分支
- 確認 GitHub Actions 已啟用

### 問題：部署失敗
**解決方案**：
- 檢查 Actions 日誌中的錯誤訊息
- 確認 API 金鑰設定正確
- 確認 GitHub Pages Source 設置正確

## 🎯 成功標誌

當您看到：
- ✅ GitHub Actions 顯示部署成功
- ✅ 網站可以訪問且有內容
- ✅ 功能正常運作

**恭喜！部署成功！** 🎉

