export interface Note {
  id: number;
  title: string;
  content: string;
  tag: Tag;
  createdAt: string;
  updatedAt: string;
}

export interface NoteFormData {
  title: string;
  content: string;
  tag: Tag;
}

export type Tag = "Todo" | "Work" | "Personal" | "Meeting" | "Shopping";

export type Category = {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

export interface FetchNotesValues {
  notes: Note[];
  totalPages: number;
}
