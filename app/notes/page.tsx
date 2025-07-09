import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

export default async function Notes() {
  const response = await fetchNotes("", 1);

  return <NotesClient initialResponse={response} />;
}
