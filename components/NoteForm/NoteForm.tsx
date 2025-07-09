import { Formik, Form, Field, ErrorMessage, type FormikHelpers } from "formik";
import css from "./NoteForm.module.css";
import * as Yup from "yup";
import { type NoteFormData } from "@/types/note";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { createNote } from "@/lib/api";

interface NoteFormProps {
  onClose: () => void;
}

const NoteFormSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too short title, min 3 symbols")
    .max(50, "Too long title, max 50 symbols")
    .required("Title is required"),
  content: Yup.string().max(500, "Too long content, max 500 symbols"),
  tag: Yup.string().oneOf(["Todo", "Work", "Personal", "Meeting", "Shopping"]),
});

export default function NoteForm({ onClose }: NoteFormProps) {
  const queryClient = useQueryClient();
  const addNewNote = useMutation({
    mutationFn: (newNoteData: NoteFormData) => createNote(newNoteData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Notes"] });
      onClose();
    },
  });
  const handleSubmit = (
    values: NoteFormData,
    actions: FormikHelpers<NoteFormData>
  ) => {
    addNewNote.mutate(values);
    actions.resetForm();
  };
  return (
    <Formik
      initialValues={{
        title: "",
        content: "",
        tag: "Todo",
      }}
      onSubmit={handleSubmit}
      validationSchema={NoteFormSchema}
    >
      <Form className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="title">Title</label>
          <Field id="title" type="text" name="title" className={css.input} />
          <ErrorMessage component="div" name="title" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="content">Content</label>
          <Field
            as="textarea"
            id="content"
            name="content"
            rows="8"
            className={css.textarea}
          />
          <ErrorMessage component="div" name="content" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="tag">Tag</label>
          <Field as="select" id="tag" name="tag" className={css.select}>
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage component="div" name="tag" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" onClick={onClose} className={css.cancelButton}>
            Cancel
          </button>
          <button type="submit" className={css.submitButton}>
            {addNewNote.isPending && !addNewNote.isSuccess
              ? `Creating note...`
              : `Create note`}
          </button>
        </div>
      </Form>
    </Formik>
  );
}
