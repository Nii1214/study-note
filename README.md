# 📝 Study Note - Notion風ノートアプリ（現在開発中）

個人開発の学習用プロジェクトとして、NotionライクなノートアプリをReactで構築しました。  
個人的にノートアプリを多用しているので、自分が欲しいと思う機能をつけたエンジニア向けに特化したノートアプリを作成しています。

---
## 📚元にした教材
>　[【実務レベルの開発を学びたい方へ】React + Typescriptで超本格的なNotionクローンを作ろう](https://www.udemy.com/course/react-notion-clone/?couponCode=25BBPMXPLOYCTRL)<br>講師：まさとらん（Masatolan）さん
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


## 📂 ディレクトリ構成


## 自分で追加した機能
- ダークモードの実装

## 今後実装したい機能
- コードの差分チェック機能
- ノートのバージョン管理機能
- コードブロック上でシンタックスハイライトを適応する
- スマホ・タブレット対応
## 現在抱えている課題
- BlockNoteで初期設定されているショートカットがブラウザの開発者モードを開くショートカット「command + alt + C」と競合している
