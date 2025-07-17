// import { Tag } from '@/types/note';
import Link from "next/link";
import css from "./SidebarNotes.module.css";

const NotesSidebar = async () => {
  const tags = ["All", "Todo", "Work", "Personal", "Meeting", "Shopping"];

  return (
    <ul className={css.menuList}>
      {tags.map((tag) => (
        <li key={tag} className={css.menuItem}>
          <Link
            href={`/notes/filter/${tag === "All" ? "all" : tag}`}
            className={css.menuLink}
          >
            {tag}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default NotesSidebar;
