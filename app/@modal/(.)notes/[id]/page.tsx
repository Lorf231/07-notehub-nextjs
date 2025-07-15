import { fetchNoteById } from "@/lib/api";
import NotePreviewClient from "./NotePreview.client";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

type NotePreviewProps = {
  params: Promise<{ id: string }>;
};
const NotePreview = async ({ params }: NotePreviewProps) => {
  const queryClient = new QueryClient();
  const { id } = await params;
  const data = await fetchNoteById(Number(id));

  await queryClient.prefetchQuery({
    queryKey: ["note", data.id],
    queryFn: () => fetchNoteById(data.id),
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <NotePreviewClient />
      </HydrationBoundary>
    </div>
  );
};

export default NotePreview;
