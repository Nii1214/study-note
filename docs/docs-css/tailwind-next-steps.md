# Tailwind CSS 次のステップガイド

## 目次
1. [コンポーネントライブラリの作成](#コンポーネントライブラリの作成)
2. [アニメーションの実装](#アニメーションの実装)
3. [ダークモードの実装](#ダークモードの実装)
4. [プラグインの活用](#プラグインの活用)
5. [パフォーマンス最適化](#パフォーマンス最適化)

## コンポーネントライブラリの作成

### 基本的なコンポーネントの作成
```jsx
// components/Button.jsx
export function Button({ children, variant = 'primary', ...props }) {
  const baseClasses = 'px-4 py-2 rounded-lg font-medium transition-colors';
  const variants = {
    primary: 'bg-blue-500 text-white hover:bg-blue-600',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    danger: 'bg-red-500 text-white hover:bg-red-600'
  };

  return (
    <button
      className={`${baseClasses} ${variants[variant]}`}
      {...props}
    >
      {children}
    </button>
  );
}
```

### カードコンポーネントの例
```jsx
// components/Card.jsx
export function Card({ title, children, ...props }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden" {...props}>
      {title && (
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}
```

## アニメーションの実装

### 基本的なアニメーション
Tailwind CSSの`transition`クラスを使用した基本的なアニメーション：

```html
<button class="transition-all duration-300 ease-in-out hover:scale-110">
  ホバーで拡大
</button>
```

### カスタムアニメーション
`tailwind.config.js`でカスタムアニメーションを定義：

```javascript
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        }
      },
      animation: {
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-in': 'slide-in 0.5s ease-out',
      }
    }
  }
}
```

使用例：
```html
<div class="animate-fade-in">
  フェードインする要素
</div>
```

## ダークモードの実装

### 設定方法
`tailwind.config.js`でダークモードを有効化：

```javascript
module.exports = {
  darkMode: 'class', // 'media'または'class'
  // ...
}
```

### ダークモードの使用例
```html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 class="text-2xl font-bold">ダークモード対応のタイトル</h1>
  <p class="text-gray-600 dark:text-gray-300">
    ダークモード対応のテキスト
  </p>
</div>
```

### ダークモードの切り替え
```javascript
// ダークモードの切り替え関数
function toggleDarkMode() {
  document.documentElement.classList.toggle('dark');
}
```

## プラグインの活用

### よく使用されるプラグイン

1. **@tailwindcss/forms**
```bash
npm install -D @tailwindcss/forms
```

設定：
```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
```

2. **@tailwindcss/typography**
```bash
npm install -D @tailwindcss/typography
```

設定：
```javascript
// tailwind.config.js
module.exports = {
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
```

使用例：
```html
<article class="prose lg:prose-xl">
  <h1>タイポグラフィプラグインの例</h1>
  <p>美しく整形されたテキスト...</p>
</article>
```

## パフォーマンス最適化

### 1. PurgeCSSの設定
`tailwind.config.js`で最適化：

```javascript
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './public/index.html',
  ],
  // 本番環境でのみ有効化
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.{js,jsx,ts,tsx}',
      './public/index.html',
    ],
  },
}
```

### 2. クラスの最適化
```jsx
// 最適化前
<div className="p-4 m-2 bg-white rounded shadow hover:shadow-lg transition-shadow">
  {/* ... */}
</div>

// 最適化後（@applyを使用）
<div className="card">
  {/* ... */}
</div>

// styles.css
@layer components {
  .card {
    @apply p-4 m-2 bg-white rounded shadow hover:shadow-lg transition-shadow;
  }
}
```

### 3. 画像の最適化
```html
<img
  class="w-full h-64 object-cover"
  loading="lazy"
  src="image.jpg"
  alt="最適化された画像"
/>
```

## 実践的なテクニック

### 1. カスタムユーティリティの作成
```css
@layer utilities {
  .text-shadow {
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .text-gradient {
    @apply bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500;
  }
}
```

### 2. コンポーネントのバリエーション
```jsx
const variants = {
  size: {
    sm: 'text-sm px-2 py-1',
    md: 'text-base px-4 py-2',
    lg: 'text-lg px-6 py-3',
  },
  color: {
    primary: 'bg-blue-500 text-white',
    secondary: 'bg-gray-200 text-gray-800',
  }
};
```

### 3. レスポンシブデザインの高度な実装
```html
<div class="
  grid
  grid-cols-1
  sm:grid-cols-2
  md:grid-cols-3
  lg:grid-cols-4
  gap-4
  p-4
">
  <!-- グリッドアイテム -->
</div>
```

## 次のステップのためのリソース
- [Tailwind CSS公式ドキュメント](https://tailwindcss.com/docs)
- [Tailwind UI](https://tailwindui.com/)
- [Tailwind CSS GitHub](https://github.com/tailwindlabs/tailwindcss)
- [Tailwind CSS Playground](https://play.tailwindcss.com/) 