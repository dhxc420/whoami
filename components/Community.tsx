"use client";

import { BrandName, LINKS, TICKER_SYMBOL } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import styles from "./Community.module.css";

export default function Community() {
  const { t } = useLang();

  return (
    <section id="community" className="section">
      <div className="container reveal-on-scroll">
        <div className="section-label">
          <span className="num">05</span>
          <span>{t("community.label")}</span>
        </div>

        <h2 className="section-title">{t("community.title")}</h2>
        <p className="section-kana">{t("community.hint")}</p>

        <p className="section-lead">
          {t("community.lead")} <BrandName /> {t("community.leadAfter")}
        </p>

        <div className={`${styles.actions} btn-row`}>
          <a
            className="btn btn-primary"
            href={LINKS.launchpad}
            target="_blank"
            rel="noopener noreferrer"
          >
            {t("community.buy")} {TICKER_SYMBOL}{" "}
            <span className="arrow">↗</span>
          </a>
          <a
            className="btn"
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram · @Fr13nds_wld <span className="arrow">↗</span>
          </a>
        </div>

        <p className={styles.slogan}>
          {t("community.slogan")}
          <span>{t("community.sloganSub")}</span>
        </p>
      </div>
    </section>
  );
}
