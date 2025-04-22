# 📝 ノート作成コンポーネント（React + TypeScript）解説

このコンポーネントは、ユーザーが新しいノートを作成できるUIです。  

## ✅ 概要

- タイトルを入力してノートを作成

## 🔍 コード解説

### ステートと状態の取得

```tsx
const [title, setTitle] = useState('');
const { currentUser } = useCurrentUserStore();
const noteStore = useNoteStore();
title：ノートのタイトルを保持するstate
```

title：ノートのタイトルを保持するstate  
currentUser：現在ログイン中のユーザー  
noteStore：ノートの一覧を保持・更新するストア  
 

### ノート作成処理
```tsx
const createNote = async () => {
  const newNote = await noteRepository.create(currentUser!.id,{ title });
  noteStore.set([newNote]);
  setTitle('');
}
```

noteRepository.create()：Supabaseなどのバックエンドに新しいノートを保存

noteStore.set()：作成したノートを状態に追加

setTitle('')：入力欄をリセット

※ currentUser! は TypeScript の Non-null assertion（nullではないと明示）



