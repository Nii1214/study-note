# React 用語集と構文解説

## 目次
1. [基本的な用語](#基本的な用語)
2. [フック関連](#フック関連)
3. [構文と記法](#構文と記法)
4. [コンポーネント関連](#コンポーネント関連)
5. [状態管理関連](#状態管理関連)
6. [ライフサイクル関連](#ライフサイクル関連)

## 基本的な用語

### JSX
```jsx
const element = <h1>Hello, world!</h1>;
```
- JavaScriptの拡張構文
- HTMLライクなコードをJavaScript内に記述できる
- 実際には`React.createElement()`に変換される

### コンポーネント
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
- UIの独立した再利用可能な部品
- 関数コンポーネントとクラスコンポーネントがある
- 単一の責任を持つように設計する

### プロップス（props）
```jsx
<Welcome name="太郎" age={20} />
```
- コンポーネント間でデータを渡すための仕組み
- 親から子コンポーネントにデータを渡す
- 読み取り専用（イミュータブル）

### ステート（state）
```jsx
const [count, setCount] = useState(0);
```
- コンポーネントの内部状態
- 変更可能（ミュータブル）
- 変更すると再レンダリングが発生

## フック関連

### useState
```jsx
const [state, setState] = useState(initialState);
```
- 関数コンポーネントで状態を管理するためのフック
- `state`: 現在の状態値
- `setState`: 状態を更新する関数
- `initialState`: 初期値

### useEffect
```jsx
useEffect(() => {
  // 副作用の処理
  return () => {
    // クリーンアップ処理
  };
}, [dependencies]);
```
- 副作用（データ取得、購読、手動DOM操作など）を実行するフック
- 第1引数: 実行する関数
- 第2引数: 依存配列（空配列の場合はマウント時のみ実行）

### useCallback
```jsx
const memoizedCallback = useCallback(
  () => {
    doSomething(a, b);
  },
  [a, b],
);
```
- 関数をメモ化するフック
- 不要な再レンダリングを防ぐ
- 依存配列の値が変更された時のみ新しい関数を作成

### useMemo
```jsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
```
- 値をメモ化するフック
- 重い計算結果をキャッシュ
- 依存配列の値が変更された時のみ再計算

## 構文と記法

### アロー関数（=>）
```jsx
const handleClick = () => {
  console.log('クリックされました');
};

// 単一式の場合は中括弧とreturnを省略可能
const double = (x) => x * 2;
```
- 関数を簡潔に記述できる構文
- `this`のバインドが不要
- コールバック関数としてよく使用

### 分割代入
```jsx
const [count, setCount] = useState(0);
const { name, age } = props;
```
- 配列やオブジェクトから値を取り出す構文
- useStateの戻り値を分解する際によく使用
- プロップスから値を取り出す際にも使用

### スプレッド演算子（...）
```jsx
const newArray = [...oldArray, newItem];
const newObject = { ...oldObject, newProperty: value };
```
- 配列やオブジェクトを展開する演算子
- 配列のコピーや結合に使用
- オブジェクトのマージに使用

### テンプレートリテラル
```jsx
const name = '太郎';
const greeting = `こんにちは、${name}さん`;
```
- 文字列内に変数を埋め込める構文
- バッククォート（`）で囲む
- `${}`で変数や式を埋め込む

## コンポーネント関連

### 関数コンポーネント
```jsx
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```
- 関数として定義されるコンポーネント
- フックを使用可能
- シンプルで理解しやすい

### クラスコンポーネント
```jsx
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```
- クラスとして定義されるコンポーネント
- ライフサイクルメソッドを使用可能
- より複雑な状態管理が可能

### 高階コンポーネント（HOC）
```jsx
function withLogging(WrappedComponent) {
  return function(props) {
    console.log('レンダリング:', WrappedComponent.name);
    return <WrappedComponent {...props} />;
  };
}
```
- コンポーネントを受け取り、新しいコンポーネントを返す関数
- 共通の機能を追加するために使用
- コンポーネントの再利用性を高める

## 状態管理関連

### prev（前の状態）
```jsx
setCount(prevCount => prevCount + 1);
```
- 状態更新関数のコールバックで使用
- 前の状態値を参照できる
- 非同期更新時に正確な値を取得できる

### イミュータブル（不変）
```jsx
// ❌ 間違った例
state.items.push(newItem);

// ✅ 正しい例
setItems([...items, newItem]);
```
- 状態を直接変更せず、新しい値を作成する考え方
- 予測可能な状態管理が可能
- パフォーマンス最適化に役立つ

### コンテキスト（Context）
```jsx
const ThemeContext = React.createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      <ThemedButton />
    </ThemeContext.Provider>
  );
}
```
- コンポーネントツリー全体でデータを共有する仕組み
- プロップスのバケツリレーを避けられる
- テーマや認証情報などの共有に使用

## ライフサイクル関連

### マウント
```jsx
useEffect(() => {
  // コンポーネントがマウントされた時に実行
  console.log('マウントされました');
  
  return () => {
    // アンマウント時に実行
    console.log('アンマウントされました');
  };
}, []);
```
- コンポーネントがDOMに追加されること
- 初期化処理を行うタイミング
- リソースの確保を行う

### アンマウント
```jsx
useEffect(() => {
  const subscription = data.subscribe();
  
  return () => {
    subscription.unsubscribe(); // アンマウント時に実行
  };
}, []);
```
- コンポーネントがDOMから削除されること
- クリーンアップ処理を行うタイミング
- リソースの解放を行う

### 再レンダリング
```jsx
function Component() {
  const [count, setCount] = useState(0);
  
  // countが変更されると再レンダリングが発生
  return <div>{count}</div>;
}
```
- コンポーネントが再描画されること
- ステートやプロップスの変更で発生
- パフォーマンスに影響する

## よく使われる略語
- HOC: Higher-Order Component（高階コンポーネント）
- HOF: Higher-Order Function（高階関数）
- DOM: Document Object Model
- JSX: JavaScript XML
- SPA: Single Page Application
- SSR: Server-Side Rendering
- CSR: Client-Side Rendering 