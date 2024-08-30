import Form from "../../components/Form";
import { Tag, NoteData } from "../../types";

export type CreateProps = {
  handleSubmit: (noteData: NoteData) => void;
  createTag: (tag: Tag) => void;
  availableTags: Tag[]; // Doğru yazım
} & Partial<NoteData>;

const Create = ({ handleSubmit, createTag, availableTags }: CreateProps) => {
  return (
    <div className="container py-5">
      <h2>Yeni Not Oluştur</h2>
      <Form
        handleSubmit={handleSubmit}
        createTag={createTag}
        availableTags={availableTags} // Burada da doğru yazım
      />
    </div>
  );
};

export default Create;
