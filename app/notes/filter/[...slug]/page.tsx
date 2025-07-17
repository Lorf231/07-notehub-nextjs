import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{ slug: string[] }>;
};

const NotesByCategory = async ({ params }: Props) => {
  const { slug } = await params;
  const category = slug[0] === "all" ? undefined : slug[0];
  const data = await fetchNotes("", 1, category);

  return (
    <div>
      <NotesClient initialData={data} tag={category} />
    </div>
  );
};

export default NotesByCategory;
