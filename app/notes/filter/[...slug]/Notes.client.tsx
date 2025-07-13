"use client";

import { keepPreviousData, useQuery } from "@tanstack/react-query";
import css from "./NotesPage.module.css";
import { useState } from "react";
import { useDebounce } from "use-debounce";
import Loader from "@/app/loading";
import { fetchNotes } from "@/lib/api";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import NoteList from "@/components/NoteList/NoteList";
import NoteModal from "@/components/NoteModal/NoteModal";
import { FetchNotesValues } from "@/types/note";

interface NotesClientProps {
  initialQuery: string;
  initialPage: number;
  initialTag?: string;
  initialData: FetchNotesValues | undefined;
}

export default function NotesClient({
  initialQuery,
  initialPage,
  initialTag,
  initialData,
}: NotesClientProps) {
  const [query, setQuery] = useState<string>(initialQuery);
  const [currentPage, setCurrentPage] = useState<number>(initialPage);
  const [debounceQuery] = useDebounce(query, 500);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const { data, isLoading, isSuccess } = useQuery({
    queryKey: ["notes", debounceQuery, initialTag, currentPage],
    queryFn: () =>
      fetchNotes(
        debounceQuery || ``,
        currentPage,
        initialTag === `all` ? `` : initialTag
      ),
    placeholderData: keepPreviousData,
    refetchOnMount: false,
    initialData,
  });

  function toggleModal() {
    setIsModalOpen(!isModalOpen);
  }
  function closeModal() {
    setIsModalOpen(false);
  }

  const notesRequest = data?.notes ?? [];
  const totalPage = data?.totalPages ?? 1;

  function handleChange(newQuery: string) {
    setQuery(newQuery);
    setCurrentPage(1);
  }

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <SearchBox value={query} onChange={handleChange} />
        {totalPage > 1 && (
          <Pagination
            pageCount={totalPage}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={toggleModal}>
          Create note +
        </button>
      </div>

      {isLoading && <Loader />}
      {isSuccess && <NoteList notes={notesRequest} />}
      {isModalOpen && <NoteModal onClose={closeModal} />}
    </div>
  );
}
