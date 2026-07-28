"use client";

import { useLang } from "@/lib/i18n";
import styles from "./ThemeToggle.module.css";

export default function LangToggle() {
  const { lang, toggle, t } = useLang();
  const next = lang === "es" ? "en" : "es";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggle}
      aria-label={lang === "es" ? t("lang.toEn") : t("lang.toEs")}
      title={lang === "es" ? t("lang.toEn") : t("lang.toEs")}
    >
      <span className={styles.icon} aria-hidden>
        {lang === "es" ? "EN" : "ES"}
      </span>
      <span className={styles.label}>{next}</span>
    </button>
  );
}
