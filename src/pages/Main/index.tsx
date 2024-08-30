import { Stack, Button, Form, Row, Col } from "react-bootstrap";
import { Note, Tag } from "../../types";
import { Link } from "react-router-dom";
import ReactSelect from "react-select";
import NoteCard from "../../components/Card";
import { useState } from "react";

type Props = {
  availableTags: Tag[];
  notes: Note[];
};

const Main = ({ availableTags, notes }: Props) => {
  const [title, setTitle] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);

  /*
 *1- Not basligi 1. inputla arastirilan metni icermelidir. Eger aranan metin bos ise kosul saglanir. Aksi taktirde note'un basliginin kucuk harfe cevrilmis hali aratilan metnin kucuk harfe cevrilmis halini iceriyorsa kosul saglanir.  
note) =>
      title == "" || note.title.toLowerCase().includes(title.toLowerCase())

 * 2- 2. input ile secilen etiketler notun icerisinde etiketlerle birebir eslenmelidir. Secilen etiket dizisindeki her etiket icin note'a ait etiketler arasinda eslesme kontrol edilir.
 */

  const filtered = notes.filter(
    (note) =>
      note.title.toLowerCase().includes(title.toLowerCase()) &&
      selectedTags.every((s_tag) =>
        note.tags.some((noteTag) => noteTag.value == s_tag.value)
      )
  );
  return (
    <div className="container py-5">
      {/* Ust Kisim */}
      <Stack direction="horizontal" className="justify-content-between">
        <h1> Notlar</h1>

        <Link to="/new">
          <Button>Olustur </Button>
        </Link>
      </Stack>

      {/* Form Alani */}
      <Form className="mt-4">
        <Row>
          <Col>
            <Form.Group>
              <Form.Label>Basliga Gore Ara</Form.Label>
              <Form.Control
                onChange={(e) => setTitle(e.target.value)}
                className="shadow"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label>Etikete Gore Ara</Form.Label>
              <ReactSelect
                options={availableTags}
                className="text-black"
                isMulti
                onChange={(tags) => setSelectedTags(tags as Tag[])}
              />
            </Form.Group>
          </Col>
        </Row>
      </Form>

      {/* NOT Listesi */}
      <Row xs={1} sm={2} lg={3} xl={4} className="g-3 mt-4">
        {filtered.map((note) => (
          <Col>
            <NoteCard note={note} key={note.id} />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Main;
