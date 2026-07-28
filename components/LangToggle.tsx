"use client";

import { useLang } from "@/lib/i18n";
import styles from "./ThemeToggle.module.css";

export default function LangToggle() {
  const { lang, toggle, t } = useLang();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={lang === "es" ? t("lang.toEn") : t("lang.toEs")}
      title={lang === "es" ? t("lang.toEn") : t("lang.toEs")}
    >
      <span className={lang === "es" ? styles.icon : styles.label}>ES</span>
      <span className={styles.sep}>/</span>
      <span className={lang === "en" ? styles.icon : styles.label}>EN</span>
    </button>
  );
}
