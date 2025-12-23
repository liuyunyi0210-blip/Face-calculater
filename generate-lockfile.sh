#!/bin/bash
# 生成 package-lock.json 的腳本

echo "正在生成 package-lock.json..."

# 檢查 Node.js 是否安裝
if ! command -v node &> /dev/null; then
    echo "錯誤: 未找到 Node.js"
    echo "請先安裝 Node.js 18+ 後再執行此腳本"
    exit 1
fi

# 檢查 npm 是否安裝
if ! command -v npm &> /dev/null; then
    echo "錯誤: 未找到 npm"
    exit 1
fi

# 安裝依賴並生成 package-lock.json
npm install

echo "✅ package-lock.json 已生成！"
echo "請執行: git add package-lock.json && git commit -m '添加 package-lock.json' && git push"

