# React 初心者ガイド

## 目次
1. [Reactとは](#reactとは)
2. [コンポーネント](#コンポーネント)
3. [JSX](#jsx)
4. [ステート管理](#ステート管理)
5. [プロップス](#プロップス)
6. [ライフサイクル](#ライフサイクル)
7. [イベント処理](#イベント処理)
8. [条件付きレンダリング](#条件付きレンダリング)
9. [リストとキー](#リストとキー)
10. [フォーム処理](#フォーム処理)

## Reactとは
Reactは、ユーザーインターフェースを構築するためのJavaScriptライブラリです。Facebookによって開発され、現在はオープンソースとして公開されています。

主な特徴：
- コンポーネントベースのアーキテクチャ
- 仮想DOMによる効率的な更新
- 宣言的なUIプログラミング
- 豊富なエコシステム

## コンポーネント
Reactアプリケーションは、コンポーネントと呼ばれる独立した再利用可能な部品で構成されています。

### 関数コンポーネント
```jsx
function Welcome(props) {
  return <h1>こんにちは, {props.name}</h1>;
}
```

### クラスコンポーネント
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>こんにちは, {this.props.name}</h1>;
  }
}
```

## JSX
JSXは、JavaScriptの拡張構文で、HTMLライクなコードをJavaScript内に記述できます。

```jsx
const element = <h1>こんにちは、世界！</h1>;
```

## ステート管理
### useState
`useState`は、関数コンポーネントで状態を管理するためのフックです。

```jsx
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>現在のカウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        カウントアップ
      </button>
    </div>
  );
}
```

### useEffect
`useEffect`は、副作用（データの取得、購読の設定、手動でのDOMの変更など）を実行するためのフックです。

```jsx
import { useState, useEffect } from 'react';

function Example() {
  const [data, setData] = useState(null);

  useEffect(() => {
    // コンポーネントがマウントされた時に実行
    fetchData();
    
    // クリーンアップ関数
    return () => {
      // コンポーネントがアンマウントされる時に実行
    };
  }, []); // 依存配列が空の場合、マウント時のみ実行

  return <div>{data}</div>;
}
```

## プロップス
プロップスは、親コンポーネントから子コンポーネントにデータを渡すための仕組みです。

```jsx
function ParentComponent() {
  return <ChildComponent name="太郎" age={20} />;
}

function ChildComponent(props) {
  return (
    <div>
      <p>名前: {props.name}</p>
      <p>年齢: {props.age}</p>
    </div>
  );
}
```

## イベント処理
Reactでのイベント処理は、キャメルケースで記述します。

```jsx
function Button() {
  const handleClick = (event) => {
    console.log('クリックされました！');
  };

  return <button onClick={handleClick}>クリック</button>;
}
```

## 条件付きレンダリング
条件に応じて異なるコンテンツを表示できます。

```jsx
function Greeting({ isLoggedIn }) {
  if (isLoggedIn) {
    return <h1>ようこそ！</h1>;
  }
  return <h1>ログインしてください</h1>;
}
```

## リストとキー
リストをレンダリングする際は、各要素に一意のキーを指定する必要があります。

```jsx
function NumberList({ numbers }) {
  return (
    <ul>
      {numbers.map((number) => (
        <li key={number.toString()}>
          {number}
        </li>
      ))}
    </ul>
  );
}
```

## フォーム処理
Reactでのフォーム処理は、制御されたコンポーネントを使用します。

```jsx
function NameForm() {
  const [name, setName] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('送信された名前: ' + name);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        名前:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <button type="submit">送信</button>
    </form>
  );
}
```

## ベストプラクティス
1. コンポーネントは単一の責任を持つようにする
2. ステートは必要最小限に保つ
3. プロップスは不変（イミュータブル）として扱う
4. キーは一意で安定した値を使用する
5. パフォーマンスを考慮したコンポーネント設計を行う

## 次のステップ
- React Router: ルーティング
- Redux/Context API: 状態管理
- React Hooks: より高度なフックの使用
- テスト: JestとReact Testing Library
- パフォーマンス最適化 