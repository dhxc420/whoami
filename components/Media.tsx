"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import styles from "./Media.module.css";

const WALLPAPERS = [
  {
    id: "01",
    src: "/wallpapers/fr13nds-verify.png",
    file: "fr13nds-verify.png",
    titleKey: "media.w1.title" as const,
    metaKey: "media.w1.meta" as const,
  },
  {
    id: "02",
    src: "/wallpapers/fr13nds-audit.png",
    file: "fr13nds-audit.png",
    titleKey: "media.w2.title" as const,
    metaKey: "media.w2.meta" as const,
  },
];

export default function Media() {
  const { t } = useLang();

  return (
    <section id="media" className="section">
      <div className="container reveal-on-scroll">
        <div className="section-label">
          <span className="num">06</span>
          <span>{t("media.label")}</span>
        </div>

        <h2 className="section-title">{t("media.title")}</h2>
        <p className="section-kana">{t("media.hint")}</p>
        <p className="section-lead">{t("media.lead")}</p>

        <div className={styles.grid}>
          {WALLPAPERS.map((wp) => (
            <article key={wp.id} className={styles.item}>
              <div className={styles.frame}>
                <Image
                  src={wp.src}
                  alt={t(wp.titleKey)}
                  fill
                  sizes="(max-width: 800px) 100vw, 40vw"
                  className={styles.image}
                />
              </div>
              <div className={styles.meta}>
                <div>
                  <p className={styles.id}>WP_{wp.id}</p>
                  <h3 className={styles.name}>{t(wp.titleKey)}</h3>
                  <p className={styles.spec}>{t(wp.metaKey)}</p>
                </div>
                <a
                  className={`btn ${styles.download}`}
                  href={wp.src}
                  download={wp.file}
                >
                  {t("media.download")} <span className="arrow">↓</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
