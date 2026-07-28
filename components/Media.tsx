"use client";

import Image from "next/image";
import { useLang } from "@/lib/i18n";
import styles from "./Media.module.css";

const ASSETS = [
  {
    id: "01",
    src: "/wallpapers/fr13nds-verify.png",
    file: "fr13nds-verify.png",
    titleKey: "media.w1.title" as const,
    metaKey: "media.w1.meta" as const,
    fit: "contain" as const,
    ratio: "portrait" as const,
  },
  {
    id: "02",
    src: "/wallpapers/fr13nds-audit.png",
    file: "fr13nds-audit.png",
    titleKey: "media.w2.title" as const,
    metaKey: "media.w2.meta" as const,
    fit: "cover" as const,
    ratio: "portrait" as const,
  },
  {
    id: "03",
    src: "/wallpapers/fr13nds-badge.png",
    file: "fr13nds-badge.png",
    titleKey: "media.w3.title" as const,
    metaKey: "media.w3.meta" as const,
    fit: "contain" as const,
    ratio: "square" as const,
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
          {ASSETS.map((asset) => (
            <article key={asset.id} className={styles.item}>
              <div
                className={`${styles.frame} ${
                  asset.ratio === "square" ? styles.frameSquare : ""
                }`}
              >
                <Image
                  src={asset.src}
                  alt={t(asset.titleKey)}
                  fill
                  sizes="(max-width: 800px) 100vw, 33vw"
                  className={`${styles.image} ${
                    asset.fit === "contain" ? styles.imageContain : ""
                  }`}
                />
              </div>
              <div className={styles.meta}>
                <div>
                  <p className={styles.id}>IMG_{asset.id}</p>
                  <h3 className={styles.name}>{t(asset.titleKey)}</h3>
                  <p className={styles.spec}>{t(asset.metaKey)}</p>
                </div>
                <a
                  className={`btn ${styles.download}`}
                  href={asset.src}
                  download={asset.file}
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
