"use client";

import { useEffect, useState } from "react";
import { LINKS, TICKER_SYMBOL } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import styles from "./MobileCta.module.css";

export default function MobileCta() {
  const { t } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.75);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <div className={styles.bar} role="region" aria-label={t("mobile.aria")}>
      <a
        className={`btn btn-primary ${styles.buy}`}
        href={LINKS.launchpad}
        target="_blank"
        rel="noopener noreferrer"
      >
        {t("mobile.buy")} {TICKER_SYMBOL} <span className="arrow">↗</span>
      </a>
      <a
        className={`btn ${styles.tg}`}
        href={LINKS.telegram}
        target="_blank"
        rel="noopener noreferrer"
      >
        TG
      </a>
    </div>
  );
}
