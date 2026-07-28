"use client";

import { BrandName } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import styles from "./WorldChain.module.css";

export default function WorldChain() {
  const { t } = useLang();

  const pillars = [
    {
      title: t("world.p1.title"),
      body: (
        <>
          <BrandName /> {t("world.p1.body")}
        </>
      ),
    },
    { title: t("world.p2.title"), body: t("world.p2.body") },
    { title: t("world.p3.title"), body: t("world.p3.body") },
  ];

  return (
    <section id="world" className="section">
      <div className="container reveal-on-scroll">
        <div className="section-label">
          <span className="num">04</span>
          <span>{t("world.label")}</span>
        </div>

        <h2 className="section-title">{t("world.title")}</h2>
        <p className="section-kana">{t("world.hint")}</p>

        <div className={styles.grid}>
          {pillars.map((p) => (
            <article key={p.title} className={styles.card}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>

        <p className={styles.ticker}>
          &gt; WLD_CHAIN · WORLD_ID · EVERY_WALLET_LEAVES_A_TRACE
        </p>
      </div>
    </section>
  );
}
