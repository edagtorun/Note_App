import { BrowserRouter, Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Detail from "./pages/Detail";
import Edit from "./pages/Edit";
import Main from "./pages/Main";

import { useLocalStorage } from "@uidotdev/usehooks";
import { Note, NoteData, Tag } from "./types";
import { v4 } from "uuid";
import Layout from "./components/Layout";

const App = () => {
  const [notes, setNotes] = useLocalStorage<Note[]>("notes", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("tags", []);

  //etiket olusturma
  const createTag = (tag: Tag): void => {
    setTags((prev) => [...prev, tag]);
  };
  //yeni etiket olusturma
  const createNote = (noteData: NoteData): void => {
    //formdan gelen veriye id ekle
    const newNote: Note = {
      id: v4(),
      ...noteData,
    };

    //state yeni notu ekle
    setNotes((prev) => [...prev, newNote]);
  };

  //note'u kaldir
  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
  };

  //notu guncelle
  const updateNote = (id: string, updatedData: NoteData) => {
    //amac, dizideki bir elemani guncellemek
    //diziyi donup yeni bir dizi olusturuyor.
    const updated = notes.map((note) => {
      if (note.id === id) {
        //eger eleman guncellenicek eleman ise guncel verileri yeni diziye ekle
        return { id, ...updatedData };
      } else {
        // degilse note'un verilerini yeni diziye ekle
        return note;
      }
    });

    //state'i guncelle
    setNotes(updated);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main notes={notes} availableTags={tags} />} />
        <Route
          path="/new"
          element={
            <Create
              handleSubmit={createNote}
              createTag={createTag}
              availableTags={tags}
            />
          }
        />

        <Route path="/note/:id" element={<Layout notes={notes} />}>
          <Route index element={<Detail deleteNote={deleteNote} />} />
          <Route
            path="edit"
            element={
              <Edit
                handleSubmit={updateNote}
                createTag={createTag}
                availableTags={tags}
              />
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
