import { Outlet, Navigate, useParams } from "react-router-dom";
import { Note } from "../../types";

type Prop = {
  notes: Note[];
};

const Layout = ({ notes }: Prop) => {
  //url'den parametreyi al
  const { id } = useParams();
  //butun notlarin arasinda id'si paramla eslesen notun verilerini al
  const found = notes.find((n) => n.id == id);
  //note bulunmazsa anasayfaya yonlendir.
  if (!found) return <Navigate to="/" replace />;
  //alt route'un bilesenini ekrana bas ve note verilerini gonder
  return <Outlet context={found} />;
};

export default Layout;
