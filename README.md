# 📝 Study Note - Notion風ノートアプリ

個人開発の学習用プロジェクトとして、NotionライクなノートアプリをReactで構築しました。  
認証やデータ管理には Supabase を使用し、軽量でモダンな技術を意識して設計しています。

---

## 🚀 使用技術（Tech Stack）

### 🔷 フロントエンド

- **React** v19.0.0  
- **React DOM** v19.0.0  
- **React Router DOM** v7.5.0  
- **Jotai** v2.12.2（グローバルステート管理）  
- **Tailwind CSS** v3.4.17  
- **tailwindcss-animate** v1.0.7（アニメーション対応）  
- **clsx** / **class-variance-authority**（クラス名の動的管理）  
- **lucide-react**（アイコン）  
- **cmdk**（コマンドパレット UI）  
- **react-textarea-autosize**（自動リサイズテキストエリア）

### 🛠️ バックエンド・認証

- **Supabase JS** v2.49.4  
  - 認証（Email/Password）
  - データベース操作（ノートの保存など）

### 💻 開発ツール・その他

- **TypeScript** v5.7.2  
- **Vite** v6.2.0（高速ビルドツール）  
- **ESLint** + **typescript-eslint**（コード品質管理）  
- **PostCSS / Autoprefixer**（CSS最適化）

---

## 📂 ディレクトリ構成
