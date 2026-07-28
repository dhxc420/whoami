"use client";

import { BrandName } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import styles from "./Protocol.module.css";

export default function Protocol() {
  const { t } = useLang();

  const layers = [
    { id: "01", tag: "sec", title: t("protocol.l1.title"), body: t("protocol.l1.body") },
    { id: "02", tag: "gov", title: t("protocol.l2.title"), body: t("protocol.l2.body") },
    { id: "03", tag: "core", title: t("protocol.l3.title"), body: t("protocol.l3.body") },
    { id: "04", tag: "ifc", title: t("protocol.l4.title"), body: t("protocol.l4.body") },
    { id: "05", tag: "vault", title: t("protocol.l5.title"), body: t("protocol.l5.body") },
    { id: "06", tag: "id", title: t("protocol.l6.title"), body: t("protocol.l6.body") },
  ];

  return (
    <section id="protocol" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">03</span>
          <span>{t("protocol.label")}</span>
        </div>

        <h2 className="section-title">{t("protocol.title")}</h2>
        <p className="section-kana">{t("protocol.hint")}</p>

        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <p className="mono-sm">SESSION fr13nds · AUDIT_MODE: ON</p>
              <p className={styles.edition}>WORLD CHAIN BUILD</p>
            </div>
            <div className={styles.badges}>
              <span>[OK] WLD_CHAIN</span>
              <span>[OK] WORLD_ID</span>
            </div>
          </div>

          <p className={styles.tag}>{t("protocol.tag")}</p>

          <div className={styles.layers}>
            {layers.map((layer) => (
              <article key={layer.id} className={styles.layer}>
                <span className={styles.layerId}>{layer.id}</span>
                <div>
                  <p className={styles.kana}>#{layer.tag}</p>
                  <h3>{layer.title}</h3>
                  <p className={styles.body}>{layer.body}</p>
                </div>
              </article>
            ))}
          </div>

          <div className={styles.footer}>
            <div>
              <p className={styles.year}>
                <BrandName /> / 2026
              </p>
              <p className={styles.spaced}>friends_protocol</p>
            </div>
            <p className={styles.manifesto}>
              <BrandName /> {t("protocol.manifesto")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
