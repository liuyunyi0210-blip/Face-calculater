# 修復 package-lock.json 錯誤

## 問題說明

GitHub Actions 報錯：`Dependencies lock file is not found`

這是因為專案缺少 `package-lock.json` 檔案。

## ✅ 解決方案（已自動修復）

我已經更新了 GitHub Actions 配置，現在它會：
- 如果有 `package-lock.json`，使用 `npm ci`（更快、更可靠）
- 如果沒有，自動使用 `npm install`（會生成鎖定檔案）

**您現在可以直接推送，GitHub Actions 會自動處理！**

## 📋 最佳實踐（可選）

雖然現在可以正常運作，但建議生成 `package-lock.json` 以確保依賴版本一致性：

### 方法 1：使用提供的腳本（推薦）

```bash
./generate-lockfile.sh
git add package-lock.json
git commit -m "添加 package-lock.json"
git push
```

### 方法 2：手動執行

```bash
npm install
git add package-lock.json
git commit -m "添加 package-lock.json"
git push
```

### 方法 3：讓 GitHub Actions 自動生成

1. 推送當前變更
2. GitHub Actions 會自動執行 `npm install` 並生成 `package-lock.json`
3. 在下一次推送時，`package-lock.json` 會被包含（如果它被生成在 artifacts 中）

## 🚀 立即部署

現在您可以：

1. **推送變更**（如果還沒推送）：
   ```bash
   git push origin main
   ```

2. **GitHub Actions 會自動執行**，不再報錯

3. **或者使用 Vercel/Netlify**（推薦，更簡單）：
   - 這些平台會自動處理依賴安裝
   - 不需要 package-lock.json

## 📝 注意事項

- `package-lock.json` 應該被提交到 Git（已在 .gitignore 中確認）
- 有鎖定檔案可以確保所有環境使用相同版本的依賴
- 如果使用 Vercel/Netlify，它們會自動處理，不需要手動生成

