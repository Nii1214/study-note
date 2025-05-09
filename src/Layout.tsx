import { Navigate, Outlet, useNavigate } from 'react-router-dom';
import SideBar from './components/SideBar';
import { SearchModal } from './components/SearchModal';
import { useCurrentUserStore } from './modules/auth/current-user.state';
import { useNoteStore } from './modules/notes/note.state';
import { useEffect, useState } from 'react';
import { noteRepository } from './modules/notes/notes.repository';
import { Note } from './modules/notes/note.entity';

const Layout = () => {
    const navigate = useNavigate();
    const { currentUser } = useCurrentUserStore();
    const noteStore = useNoteStore();
    const [isLoading,setIsLoading] = useState(false);
    const [isShowModal,setIsShowModal] = useState(false);
    const [searchResult,setSearchResult] = useState<Note[]>([]);


    useEffect(()=> {
      fetchNotes();
    },[])

    const fetchNotes = async () => {
      setIsLoading(true);
      const notes = await noteRepository.find(currentUser!.id);
      console.log("Fetched notes:", notes);
      if(notes == null) return;
      noteStore.set(notes);
      setIsLoading(false);
    };

    const searchNotes = async (keyword: string) => {
      const notes = await noteRepository.findByKeyWord(currentUser!.id, keyword);
      if (notes == null) return;
      noteStore.set(notes);
      setSearchResult(notes);
    };

    const moveToDetail = (noteId: number) => {
      navigate(`/notes/${noteId}`);
      setIsShowModal(false);
    }
    if(currentUser == null) return <Navigate replace to = "/signin" />


  return (
    <div className="h-full flex dark:bg-[#1e1e1e] dark:text-white">
      {!isLoading && (
        <SideBar onSearchButtonClicked={() => setIsShowModal(true)} 
      />)}
      <main className="flex-1 h-full overflow-y-auto">
        <Outlet />
        <SearchModal
          isOpen={isShowModal}
          notes={searchResult}
          onItemSelect={moveToDetail}
          onKeywordChanged={searchNotes}
          onClose={() => setIsShowModal(false)}
        />
      </main>
    </div>
  );
};

export default Layout;
