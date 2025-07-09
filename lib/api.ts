import axios from "axios";
import type { Note, NoteFormData } from "../types/note";

interface NoteHubResponse {
  notes: Note[];
  totalPages: number;
}

interface NoteHubSearchParams {
  params: {
    search?: string;
    page: number;
    perPage: number;
  };
  headers: {
    authorization: string;
  };
}

const myToken = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
axios.defaults.baseURL = "https://notehub-public.goit.study/api";

export async function fetchNotes(
  query: string,
  page: number
): Promise<NoteHubResponse> {
  const noteHubSearchParams: NoteHubSearchParams = {
    params: {
      page,
      perPage: 12,
    },
    headers: {
      authorization: `Bearer ${myToken}`,
    },
  };
  if (query.trim() !== "") {
    noteHubSearchParams.params.search = query.trim();
  }
  const response = await axios.get<NoteHubResponse>(
    `/notes`,
    noteHubSearchParams
  );
  return response.data;
}

export async function removeNote(id: number): Promise<Note> {
  const response = await axios.delete<Note>(`/notes/${id}`, {
    headers: {
      authorization: `Bearer ${myToken}`,
    },
  });
  return response.data;
}

export async function createNote(note: NoteFormData): Promise<Note> {
  const response = await axios.post<Note>(`/notes`, note, {
    headers: {
      authorization: `Bearer ${myToken}`,
    },
  });
  return response.data;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await axios.get<Note>(`/notes/${id}`, {
    headers: {
      authorization: `Bearer ${myToken}`,
    },
  });
  return response.data;
}
