# ✅ x64 (AMD64) 環境でビルドするように明示
FROM --platform=linux/amd64 node:20-slim

# 作業ディレクトリ作成
WORKDIR /app

# 依存関係インストール用に package.json と package-lock.json をコピー
COPY package*.json ./

RUN npm install

# ソースコードをコピー
COPY . .

# ✅ useLightningcss を無効化する（設定ファイルも確認）
ENV NODE_ENV=production

# Next.js のビルド
RUN npm run build

# ポート指定（App Runner は 8080 をリッスン）
ENV PORT 8080

# Next.js を 8080 ポートで起動
EXPOSE 8080
CMD ["npm", "start"]
