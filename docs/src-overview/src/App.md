# App.tsx の解説

## 概要
`App.tsx`はReactアプリケーションのメインコンポーネントで、アプリケーション全体のルーティングと基本的な設定を管理しています。

## 主要な機能

### 1. ルーティング設定
- `react-router-dom`を使用して、アプリケーションのページ遷移を管理
- 主なルート:
  - `/`: ホームページ
  - `/notes/:id`: ノート詳細ページ
  - `/signin`: サインインページ
  - `/signup`: サインアップページ

### 2. ダークモード機能
- ユーザーの端末設定に基づいて自動的にダークモードを適用
- 端末のテーマ設定が変更された場合に自動的に更新
- `dark`クラスを使用してスタイルを切り替え

### 3. 認証状態の管理
- アプリケーション起動時に現在のユーザーセッションを取得
- ローディング状態の管理
- 認証状態に基づいた画面表示の制御

## 主要なコンポーネントとフック

### 使用している主要なフック
- `useState`: コンポーネントの状態管理
- `useEffect`: 副作用の管理（ダークモード設定、セッション取得など）

### 主要な状態変数
- `isLoading`: ローディング状態
- `isDarkMode`: ダークモードの有効/無効
- `currentUserStore`: 現在のユーザー情報

## レイアウト構造
```jsx
<BrowserRouter>
  <div className="h-full dark:bg-[#1e1e1e] dark:text-white">
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<Home/>}/>
        <Route path="notes/:id" element={<NoteDetail/>}/>
      </Route>
      <Route path="signin" element={<Signin/>} />
      <Route path="signup" element={<Signup/>} />
    </Routes>
  </div>
</BrowserRouter>
```

## 注意点
- ローディング中は「読み込み中」と表示
- ダークモードの切り替えは`document.documentElement.classList`を使用
- セッション管理は`authRepository`と`currentUserStore`を使用
