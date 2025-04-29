import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import { Home } from './pages/Home';
import NoteDetail from './pages/NoteDetail';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import { useEffect, useState } from 'react';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { authRepository } from './modules/auth/auth.repository';

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const currentUserStore = useCurrentUserStore();

  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    // ユーザーの端末のテーマ設定を取得
    const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);

    // 端末のテーマ設定が変更されたときに再評価
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    // 変更を監視
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      // クリーンアップ: イベントリスナーの解除
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  // ダークモードのクラスを変更する
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  //セッションの取得
  useEffect(() => {
    setSession();
  },[]);

  const setSession = async () => {
    const currentUser = await authRepository.getCurrentUser();
    currentUserStore.set(currentUser);
    setIsLoading(false);
  };

  if(isLoading) return <p>読み込み中</p>;
  // if(isLoading) return <div/>;

  return (
    <BrowserRouter>
      <div className="h-full dark:bg-[#1e1e1e] dark:text-white">
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element= {<Home/>}/>
            <Route path="notes/:id" element={<NoteDetail/>}/>
          </Route>
          <Route path="signin" element={<Signin/>} />
          <Route path="signup" element={<Signup/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
