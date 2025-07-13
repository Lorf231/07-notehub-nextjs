"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import css from "./not-found.module.css";
import Link from "next/link";

const NotFound = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 3000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist. You`ll go to the
        home page in few seconds or you can push the button!
      </p>
      <Link href="/">Go back home</Link>
    </div>
  );
};

export default NotFound;
