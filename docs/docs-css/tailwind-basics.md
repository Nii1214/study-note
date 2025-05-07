# Tailwind CSS 初心者ガイド

## 目次
1. [Tailwind CSSとは](#tailwind-cssとは)
2. [インストール方法](#インストール方法)
3. [基本的な使い方](#基本的な使い方)
4. [ユーティリティクラス](#ユーティリティクラス)
5. [レスポンシブデザイン](#レスポンシブデザイン)
6. [カスタマイズ](#カスタマイズ)
7. [ベストプラクティス](#ベストプラクティス)

## Tailwind CSSとは
Tailwind CSSは、ユーティリティファーストのCSSフレームワークです。従来のCSSフレームワークとは異なり、事前に定義されたコンポーネントを提供する代わりに、低レベルのユーティリティクラスを提供します。

主な特徴：
- ユーティリティファーストのアプローチ
- カスタマイズ性の高さ
- レスポンシブデザインの容易さ
- 小さなバンドルサイズ（本番環境）

## インストール方法

### npmを使用する場合
```bash
npm install -D tailwindcss
npx tailwindcss init
```

### 設定ファイルの作成
`tailwind.config.js`ファイルが作成されます。基本的な設定は以下のようになります：

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

### CSSファイルの設定
`src/index.css`に以下のコードを追加：

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

## 基本的な使い方

### 基本的なクラスの使用例
```html
<div class="flex items-center justify-center min-h-screen bg-gray-100">
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h1 class="text-2xl font-bold text-gray-800">こんにちは、Tailwind CSS！</h1>
    <p class="mt-2 text-gray-600">これは基本的な例です。</p>
  </div>
</div>
```

## ユーティリティクラス

### レイアウト
- `flex`: Flexboxレイアウト
- `grid`: Gridレイアウト
- `container`: コンテナ
- `p-4`: パディング
- `m-4`: マージン

### タイポグラフィ
- `text-sm`: 小さいテキスト
- `text-lg`: 大きいテキスト
- `font-bold`: 太字
- `text-center`: 中央揃え

### 色
- `text-blue-500`: 青色のテキスト
- `bg-gray-100`: 薄いグレーの背景
- `border-red-500`: 赤色のボーダー

### サイズ
- `w-full`: 幅100%
- `h-screen`: 画面の高さ
- `max-w-md`: 最大幅

## レスポンシブデザイン
Tailwind CSSでは、以下のブレークポイントがデフォルトで設定されています：

- `sm`: 640px以上
- `md`: 768px以上
- `lg`: 1024px以上
- `xl`: 1280px以上
- `2xl`: 1536px以上

使用例：
```html
<div class="w-full md:w-1/2 lg:w-1/3">
  <!-- モバイルでは幅100%、タブレットでは50%、デスクトップでは33% -->
</div>
```

## カスタマイズ

### テーマのカスタマイズ
`tailwind.config.js`で以下のように設定できます：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1fb6ff',
      },
      spacing: {
        '128': '32rem',
      },
      fontFamily: {
        sans: ['Graphik', 'sans-serif'],
      },
    },
  },
}
```

### カスタムクラスの作成
`@layer`ディレクティブを使用して、カスタムクラスを作成できます：

```css
@layer components {
  .btn-primary {
    @apply px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600;
  }
}
```

## ベストプラクティス

1. **クラスの整理**
   - 長いクラス名は複数行に分けて記述
   - 関連するクラスをグループ化

2. **再利用可能なコンポーネント**
   - 頻繁に使用するパターンはコンポーネント化
   - `@apply`ディレクティブを活用

3. **パフォーマンス**
   - 未使用のクラスを削除（PurgeCSS）
   - 適切なブレークポイントの使用

4. **メンテナンス性**
   - 一貫した命名規則の使用
   - コメントの活用

## 次のステップ
- Tailwind CSSの公式ドキュメントを参照
- コンポーネントライブラリの作成
- アニメーションの実装
- ダークモードの実装
- プラグインの活用 