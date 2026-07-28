"use client";

import { useEffect, useState } from "react";
import styles from "./ThemeToggle.module.css";

type Theme = "dark" | "light";

function applyTheme(theme: Theme) {
  document.documentElement.setAttribute("data-theme", theme);
  try {
    localStorage.setItem("fr13nds-theme", theme);
  } catch {
    /* ignore */
  }
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("fr13nds-theme") as Theme | null;
    const initial =
      stored === "light" || stored === "dark"
        ? stored
        : document.documentElement.getAttribute("data-theme") === "light"
          ? "light"
          : "dark";
    setTheme(initial);
    applyTheme(initial);
    setReady(true);
  }, []);

  function toggle() {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={theme === "dark" ? "Activar tema claro" : "Activar tema oscuro"}
      title={theme === "dark" ? "tema: claro" : "tema: oscuro"}
      suppressHydrationWarning
    >
      <span className={styles.icon} aria-hidden>
        {ready && theme === "dark" ? "☀" : "☾"}
      </span>
      <span className={styles.label}>
        {ready ? (theme === "dark" ? "light" : "dark") : "theme"}
      </span>
    </button>
  );
}
