"use client";

import { BrandName, LINKS } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import styles from "./Footer.module.css";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer id="footer" className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div>
          <p className={styles.logo}>
            <BrandName />
          </p>
          <p className={styles.sub}>FRIENDS_PROTOCOL · $WHOAMI · WORLD_CHAIN</p>
        </div>
        <div className={styles.links}>
          <a href={LINKS.launchpad} target="_blank" rel="noopener noreferrer">
            Ani Launchpad
          </a>
          <a href={LINKS.telegram} target="_blank" rel="noopener noreferrer">
            Telegram
          </a>
          <a href={LINKS.worldscan} target="_blank" rel="noopener noreferrer">
            Worldscan
          </a>
        </div>
      </div>
      <div className={`container ${styles.copy}`}>
        <span>{t("footer.copy")}</span>
      </div>
    </footer>
  );
}
