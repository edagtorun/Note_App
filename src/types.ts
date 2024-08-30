//formdan alinan note verisinin tipi
export type NoteData = {
  title: string;
  tags: Tag[];
  markdown: string;
};

//state'e kaydedilecek note'un tipi
export type Note = {
  id: string;
} & NoteData;

export type Tag = {
  label: string;
  value: string;
};
