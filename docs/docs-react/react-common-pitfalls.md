# React 初心者がつまづきやすいポイント

## 目次
1. [ステート管理の落とし穴](#ステート管理の落とし穴)
2. [レンダリングの仕組み](#レンダリングの仕組み)
3. [イベントハンドリング](#イベントハンドリング)
4. [コンポーネントのライフサイクル](#コンポーネントのライフサイクル)
5. [パフォーマンスの問題](#パフォーマンスの問題)
6. [よくあるエラーと解決方法](#よくあるエラーと解決方法)

## ステート管理の落とし穴

### 1. ステートの直接変更
```jsx
// ❌ 間違った例
const [items, setItems] = useState([1, 2, 3]);
items.push(4); // 直接変更してはいけない
setItems(items);

// ✅ 正しい例
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]); // 新しい配列を作成
```

### 2. 非同期処理でのステート更新
```jsx
// ❌ 間違った例
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(count + 1);
  setCount(count + 1); // 同じ値が使用される
};

// ✅ 正しい例
const [count, setCount] = useState(0);
const handleClick = () => {
  setCount(prevCount => prevCount + 1);
  setCount(prevCount => prevCount + 1); // 前の値を参照
};
```

### 3. 依存配列の指定ミス
```jsx
// ❌ 間違った例
useEffect(() => {
  fetchData();
}, []); // 依存配列が空だが、propsやstateを使用している

// ✅ 正しい例
useEffect(() => {
  fetchData();
}, [userId, page]); // 使用している値を依存配列に含める
```

## レンダリングの仕組み

### 1. 不要な再レンダリング
```jsx
// ❌ 間違った例
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = () => {
    setCount(count + 1);
  };

  return <ChildComponent onClick={handleClick} />;
}

// ✅ 正しい例
function ParentComponent() {
  const [count, setCount] = useState(0);
  
  const handleClick = useCallback(() => {
    setCount(prev => prev + 1);
  }, []);

  return <ChildComponent onClick={handleClick} />;
}
```

### 2. 条件付きレンダリングの落とし穴
```jsx
// ❌ 間違った例
{items.length && <List items={items} />} // itemsが空配列の場合、0がレンダリングされる

// ✅ 正しい例
{items.length > 0 && <List items={items} />}
```

## イベントハンドリング

### 1. イベントハンドラのバインド
```jsx
// ❌ 間違った例
class MyComponent extends React.Component {
  handleClick() {
    console.log(this); // undefined
  }
  
  render() {
    return <button onClick={this.handleClick}>クリック</button>;
  }
}

// ✅ 正しい例
class MyComponent extends React.Component {
  handleClick = () => {
    console.log(this); // 正しくバインドされる
  }
  
  render() {
    return <button onClick={this.handleClick}>クリック</button>;
  }
}
```

### 2. イベントの伝播
```jsx
// ❌ 間違った例
function handleClick(e) {
  e.stopPropagation(); // 親要素のイベントを止める
  // 処理
}

// ✅ 正しい例
function handleClick(e) {
  // 必要な場合のみstopPropagationを使用
  if (shouldStopPropagation) {
    e.stopPropagation();
  }
  // 処理
}
```

## コンポーネントのライフサイクル

### 1. クリーンアップの忘れ
```jsx
// ❌ 間違った例
useEffect(() => {
  const subscription = data.subscribe();
  // クリーンアップ関数を忘れている
}, []);

// ✅ 正しい例
useEffect(() => {
  const subscription = data.subscribe();
  return () => {
    subscription.unsubscribe(); // クリーンアップ
  };
}, []);
```

### 2. 無限ループ
```jsx
// ❌ 間違った例
useEffect(() => {
  setCount(count + 1); // ステート更新が再レンダリングを引き起こす
}, [count]); // 依存配列にcountを含めている

// ✅ 正しい例
useEffect(() => {
  // 必要な場合のみステートを更新
  if (shouldUpdate) {
    setCount(prev => prev + 1);
  }
}, [shouldUpdate]);
```

## パフォーマンスの問題

### 1. 大きなリストのレンダリング
```jsx
// ❌ 間違った例
function List({ items }) {
  return (
    <ul>
      {items.map(item => (
        <ListItem key={item.id} item={item} />
      ))}
    </ul>
  );
}

// ✅ 正しい例
import { VirtualList } from 'react-virtualized';

function List({ items }) {
  return (
    <VirtualList
      width={300}
      height={400}
      rowCount={items.length}
      rowHeight={50}
      rowRenderer={({ index }) => (
        <ListItem key={items[index].id} item={items[index]} />
      )}
    />
  );
}
```

### 2. 不要な再計算
```jsx
// ❌ 間違った例
function ExpensiveComponent({ items }) {
  const sortedItems = items.sort((a, b) => a.value - b.value);
  // 毎回ソートが実行される

  return <div>{sortedItems.map(item => <div key={item.id}>{item.value}</div>)}</div>;
}

// ✅ 正しい例
function ExpensiveComponent({ items }) {
  const sortedItems = useMemo(() => {
    return items.sort((a, b) => a.value - b.value);
  }, [items]); // itemsが変更された時のみ再計算

  return <div>{sortedItems.map(item => <div key={item.id}>{item.value}</div>)}</div>;
}
```

## よくあるエラーと解決方法

### 1. "Warning: Each child in a list should have a unique 'key' prop"
```jsx
// ❌ 間違った例
{items.map(item => <div>{item.name}</div>)}

// ✅ 正しい例
{items.map(item => <div key={item.id}>{item.name}</div>)}
```

### 2. "Warning: Can't perform a React state update on an unmounted component"
```jsx
// ❌ 間違った例
useEffect(() => {
  fetchData().then(data => {
    setData(data); // コンポーネントがアンマウントされている可能性がある
  });
}, []);

// ✅ 正しい例
useEffect(() => {
  let isMounted = true;
  
  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });
  
  return () => {
    isMounted = false;
  };
}, []);
```

### 3. "Warning: Invalid hook call"
```jsx
// ❌ 間違った例
if (condition) {
  const [state, setState] = useState(0); // 条件分岐内でフックを呼び出している
}

// ✅ 正しい例
const [state, setState] = useState(0);
if (condition) {
  // 条件分岐内でステートを使用
}
```

## デバッグのヒント
1. React Developer Toolsの活用
2. コンソールログの適切な使用
3. エラーバウンダリの実装
4. パフォーマンスプロファイリング
5. ステートの変更履歴の追跡

## ベストプラクティス
1. コンポーネントは小さく、単一の責任を持つようにする
2. ステートは必要最小限に保つ
3. パフォーマンス最適化は計測してから行う
4. エラーハンドリングを適切に実装する
5. テストを書いて動作を確認する 