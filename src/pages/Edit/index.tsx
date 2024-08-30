import { useOutletContext } from "react-router-dom";
import Form from "../../components/Form";
import { Note, NoteData, Tag } from "../../types";

type Props = {
  handleSubmit: (id: string, updatedData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[];
};

const Edit = ({ handleSubmit, createTag, availableTags }: Props) => {
  const note = useOutletContext<Note>();

  return (
    <div className="container py-5">
      <h2> Notu Duzenle</h2>
      <Form
        availableTags={availableTags}
        createTag={createTag}
        handleSubmit={(updatedData) => handleSubmit(note.id, updatedData)}
        markdown={note.markdown}
        title={note.title}
        tags={note.tags}
      />
    </div>
  );
};

export default Edit;
