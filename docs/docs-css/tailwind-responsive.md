# Tailwind CSS レスポンシブデザイン実装ガイド

## 目次
1. [レスポンシブデザインの基本](#レスポンシブデザインの基本)
2. [ブレークポイントの理解](#ブレークポイントの理解)
3. [モバイルファーストの実装](#モバイルファーストの実装)
4. [ナビゲーションの実装](#ナビゲーションの実装)
5. [グリッドレイアウト](#グリッドレイアウト)
6. [画像のレスポンシブ対応](#画像のレスポンシブ対応)
7. [実践的な例](#実践的な例)

## レスポンシブデザインの基本

### ビューポートの設定
```html
<meta name="viewport" content="width=device-width, initial-scale=1.0">
```

### 基本的なメディアクエリ
Tailwind CSSのデフォルトのブレークポイント：
- `sm`: 640px以上
- `md`: 768px以上
- `lg`: 1024px以上
- `xl`: 1280px以上
- `2xl`: 1536px以上

## ブレークポイントの理解

### カスタムブレークポイントの設定
```javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'tablet': '640px',
      'laptop': '1024px',
      'desktop': '1280px',
    },
  }
}
```

### ブレークポイントの使用例
```html
<div class="
  w-full          <!-- モバイル: 幅100% -->
  tablet:w-1/2    <!-- タブレット: 幅50% -->
  laptop:w-1/3    <!-- ラップトップ: 幅33% -->
  desktop:w-1/4   <!-- デスクトップ: 幅25% -->
">
```

## モバイルファーストの実装

### 基本的なアプローチ
```html
<!-- モバイルファーストの例 -->
<div class="
  p-4           <!-- モバイル: パディング16px -->
  md:p-6        <!-- タブレット以上: パディング24px -->
  lg:p-8        <!-- デスクトップ以上: パディング32px -->
">
  <h1 class="
    text-xl      <!-- モバイル: 小さいフォント -->
    md:text-2xl  <!-- タブレット以上: 大きいフォント -->
    lg:text-3xl  <!-- デスクトップ以上: さらに大きいフォント -->
  ">
    タイトル
  </h1>
</div>
```

## ナビゲーションの実装

### ハンバーガーメニューの実装
```jsx
// components/Navbar.jsx
import { useState } from 'react';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* ロゴ */}
          <div className="flex-shrink-0 flex items-center">
            <img className="h-8 w-auto" src="/logo.svg" alt="Logo" />
          </div>

          {/* デスクトップメニュー */}
          <div className="hidden md:flex items-center space-x-4">
            <a href="#" className="text-gray-700 hover:text-gray-900">ホーム</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">サービス</a>
            <a href="#" className="text-gray-700 hover:text-gray-900">お問い合わせ</a>
          </div>

          {/* ハンバーガーメニューボタン */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">メニューを開く</span>
              {/* ハンバーガーアイコン */}
              <svg
                className={`${isOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              {/* 閉じるアイコン */}
              <svg
                className={`${isOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* モバイルメニュー */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">ホーム</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">サービス</a>
          <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">お問い合わせ</a>
        </div>
      </div>
    </nav>
  );
}
```

### ドロップダウンメニューの実装
```jsx
// components/Dropdown.jsx
import { useState } from 'react';

export function Dropdown() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:text-gray-900"
      >
        <span>メニュー</span>
        <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1">
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">オプション1</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">オプション2</a>
            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">オプション3</a>
          </div>
        </div>
      )}
    </div>
  );
}
```

## グリッドレイアウト

### 基本的なグリッド
```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-4 rounded-lg shadow">アイテム1</div>
  <div class="bg-white p-4 rounded-lg shadow">アイテム2</div>
  <div class="bg-white p-4 rounded-lg shadow">アイテム3</div>
</div>
```

### カードグリッド
```html
<div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
  <div class="bg-white rounded-lg shadow-md overflow-hidden">
    <img src="image.jpg" alt="カード画像" class="w-full h-48 object-cover" />
    <div class="p-4">
      <h3 class="text-lg font-semibold">カードタイトル</h3>
      <p class="text-gray-600 mt-2">カードの説明文がここに入ります。</p>
    </div>
  </div>
  <!-- 他のカード -->
</div>
```

## 画像のレスポンシブ対応

### 基本的な画像対応
```html
<img
  src="image.jpg"
  alt="レスポンシブ画像"
  class="w-full h-auto object-cover"
/>
```

### アスペクト比を維持した画像
```html
<div class="relative w-full" style="padding-bottom: 56.25%;">
  <img
    src="image.jpg"
    alt="16:9の画像"
    class="absolute inset-0 w-full h-full object-cover"
  />
</div>
```

## 実践的な例

### レスポンシブなヒーローセクション
```html
<div class="relative bg-gray-900 text-white">
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
    <div class="text-center">
      <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold">
        メインタイトル
      </h1>
      <p class="mt-6 text-xl md:text-2xl text-gray-300">
        サブタイトルや説明文がここに入ります。
      </p>
      <div class="mt-10 flex flex-col sm:flex-row justify-center gap-4">
        <button class="px-8 py-3 bg-blue-600 rounded-lg hover:bg-blue-700">
          プライマリーボタン
        </button>
        <button class="px-8 py-3 bg-gray-700 rounded-lg hover:bg-gray-600">
          セカンダリーボタン
        </button>
      </div>
    </div>
  </div>
</div>
```

### レスポンシブなフォーム
```html
<form class="max-w-lg mx-auto p-6">
  <div class="space-y-6">
    <div>
      <label class="block text-sm font-medium text-gray-700">
        お名前
      </label>
      <input
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">
        メールアドレス
      </label>
      <input
        type="email"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>
    <div>
      <label class="block text-sm font-medium text-gray-700">
        メッセージ
      </label>
      <textarea
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      ></textarea>
    </div>
    <div class="flex justify-end">
      <button
        type="submit"
        class="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
      >
        送信
      </button>
    </div>
  </div>
</form>
```

## ベストプラクティス

1. **モバイルファーストの原則**
   - モバイルのデザインを最初に作成
   - ブレークポイントで拡張していく

2. **パフォーマンスの考慮**
   - 画像の最適化
   - 不要なアニメーションの制限
   - 遅延読み込みの活用

3. **アクセシビリティ**
   - 適切なコントラスト比
   - タッチターゲットのサイズ
   - キーボードナビゲーション

4. **テスト**
   - 複数のデバイスでのテスト
   - 異なるブラウザでのテスト
   - 実機でのテスト 