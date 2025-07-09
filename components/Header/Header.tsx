import Link from "next/link";
import css from "./Header.module.css";

export default function Header() {
  return (
    <header className={css.navigation}>
      <Link href="/">NoteHub</Link>
      <nav>
        <ul className={css.navigation}>
          <li>
            <Link href={"/"}>Home</Link>
          </li>
          <li>
            <Link href={"/notes"}>Notes</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
