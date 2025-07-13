import { fetchNotes } from "@/lib/api";
import NotesClient from "./Notes.client";

interface NotesProps {
  params: Promise<{ slug: string[] }>;
}

export const revalidate = 60;

export default async function Notes({ params }: NotesProps) {
  const initialQuery = "";
  const initialPage = 1;
  const { slug } = await params;
  const tag = slug[0] === "all" ? undefined : slug[0];
  const data = await fetchNotes(initialQuery, initialPage, tag);

  return (
    <NotesClient
      initialQuery={initialQuery}
      initialPage={initialPage}
      initialTag={tag}
      initialData={data}
    />
  );
}
