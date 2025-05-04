# React 次のステップガイド

## 目次
1. [React Router](#react-router)
2. [状態管理（Redux/Context API）](#状態管理reduxcontext-api)
3. [高度なReact Hooks](#高度なreact-hooks)
4. [テスト（Jest/React Testing Library）](#テストjestreact-testing-library)
5. [パフォーマンス最適化](#パフォーマンス最適化)

## React Router
React Routerは、Reactアプリケーションでルーティングを実装するためのライブラリです。

### 基本的な使い方
```jsx
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">ホーム</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
```

### 動的ルーティング
```jsx
<Route path="/users/:id" element={<UserProfile />} />

// UserProfileコンポーネント内で
import { useParams } from 'react-router-dom';

function UserProfile() {
  const { id } = useParams();
  return <div>ユーザーID: {id}</div>;
}
```

## 状態管理（Redux/Context API）

### Context API
```jsx
// ThemeContext.js
import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

// 使用例
function App() {
  return (
    <ThemeProvider>
      <ThemedButton />
    </ThemeProvider>
  );
}

function ThemedButton() {
  const { theme, setTheme } = useTheme();
  return (
    <button onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>
      テーマ切り替え
    </button>
  );
}
```

### Reduxの基本
```jsx
// store.js
import { createStore } from 'redux';

const initialState = { count: 0 };

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: state.count - 1 };
    default:
      return state;
  }
}

const store = createStore(reducer);

// コンポーネントでの使用
import { useSelector, useDispatch } from 'react-redux';

function Counter() {
  const count = useSelector(state => state.count);
  const dispatch = useDispatch();

  return (
    <div>
      <p>カウント: {count}</p>
      <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
    </div>
  );
}
```

## 高度なReact Hooks

### useCallback
```jsx
import { useCallback } from 'react';

function ParentComponent() {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    setCount(count + 1);
  }, [count]);

  return <ChildComponent onClick={handleClick} />;
}
```

### useMemo
```jsx
import { useMemo } from 'react';

function ExpensiveComponent({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);

  return <div>{sortedItems.map(item => <div key={item.id}>{item.value}</div>)}</div>;
}
```

### カスタムフック
```jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value);
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue];
}

// 使用例
function App() {
  const [name, setName] = useLocalStorage('name', '');
  return <input value={name} onChange={e => setName(e.target.value)} />;
}
```

## テスト（Jest/React Testing Library）

### Jestの基本
```javascript
// sum.test.js
test('1 + 2 = 3', () => {
  expect(1 + 2).toBe(3);
});
```

### React Testing Library
```jsx
import { render, screen, fireEvent } from '@testing-library/react';

test('ボタンクリックでカウントが増える', () => {
  render(<Counter />);
  
  const button = screen.getByText('カウントアップ');
  fireEvent.click(button);
  
  expect(screen.getByText('現在のカウント: 1')).toBeInTheDocument();
});
```

## パフォーマンス最適化

### React.memo
```jsx
const MemoizedComponent = React.memo(function MyComponent({ prop }) {
  return <div>{prop}</div>;
});
```

### useMemoとuseCallbackの活用
```jsx
function ParentComponent({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]);

  const handleItemClick = useCallback((itemId) => {
    console.log('アイテムがクリックされました:', itemId);
  }, []);

  return (
    <div>
      {sortedItems.map(item => (
        <MemoizedItem
          key={item.id}
          item={item}
          onClick={handleItemClick}
        />
      ))}
    </div>
  );
}
```

### コード分割
```jsx
// 動的インポート
const LazyComponent = React.lazy(() => import('./LazyComponent'));

function App() {
  return (
    <Suspense fallback={<div>読み込み中...</div>}>
      <LazyComponent />
    </Suspense>
  );
}
```

## ベストプラクティス
1. コンポーネントの分割と再利用性を考慮する
2. 適切な状態管理の選択（Context API vs Redux）
3. パフォーマンス最適化のためのメモ化
4. テストカバレッジの確保
5. エラーハンドリングの実装

## 次のステップ
- TypeScriptとの統合
- サーバーサイドレンダリング（Next.js）
- 状態管理の高度なパターン
- アニメーションとトランジション
- アクセシビリティの実装 