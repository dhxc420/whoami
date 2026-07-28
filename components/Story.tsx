"use client";

import { BrandName } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import styles from "./Story.module.css";

export default function Story() {
  const { t } = useLang();

  const timeline = [
    {
      year: "2025",
      title: t("story.t1.title"),
      body: t("story.t1.body"),
    },
    {
      year: "2026",
      title: t("story.t2.title"),
      body: t("story.t2.body"),
    },
    {
      year: "JUL 2026",
      title: t("story.t3.title"),
      body: t("story.t3.body"),
      live: true,
    },
  ];

  return (
    <section id="story" className="section">
      <div className="container reveal-on-scroll">
        <div className="section-label">
          <span className="num">01</span>
          <span>{t("story.label")}</span>
        </div>

        <h2 className="section-title">{t("story.title")}</h2>
        <p className="section-kana">{t("story.hint")}</p>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className="section-lead">
              <BrandName /> {t("story.lead")}
            </p>
            <p className={styles.quote}>
              <span className={styles.prompt}>root@fr13nds:~$</span>{" "}
              {t("story.quote")}
            </p>
          </div>

          <ol className={styles.timeline}>
            {timeline.map((item) => (
              <li key={item.year} className={styles.item}>
                <span className={styles.year}>[{item.year}]</span>
                <div>
                  <h3 className={styles.itemTitle}>
                    {item.title}
                    {item.live ? (
                      <span className={styles.live}> [LIVE]</span>
                    ) : null}
                  </h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
