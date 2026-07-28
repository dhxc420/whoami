"use client";

import { useState } from "react";
import { BrandName, LINKS, TICKER, TICKER_SYMBOL } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import styles from "./Specs.module.css";

export default function Specs() {
  const { t } = useLang();
  const [copied, setCopied] = useState(false);

  const specs = [
    { label: t("specs.symbol"), value: TICKER_SYMBOL, hint: "ticker" },
    { label: t("specs.name"), value: "fr13nds", hint: "project", brand: true },
    { label: t("specs.chain"), value: "WORLD CHAIN", hint: "480" },
    { label: t("specs.std"), value: "ERC-20", hint: "18 decimals" },
    { label: t("hero.supply"), value: "300M", hint: "total supply" },
    { label: t("specs.status"), value: "LIVE", hint: "mainnet" },
  ];

  const funcs = [
    { id: "01", title: t("specs.f1.title"), body: t("specs.f1.body") },
    { id: "02", title: t("specs.f2.title"), body: t("specs.f2.body") },
    { id: "03", title: t("specs.f3.title"), body: t("specs.f3.body") },
    { id: "04", title: t("specs.f4.title"), body: t("specs.f4.body") },
  ];

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(LINKS.contract);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="specs" className="section">
      <div className="container reveal-on-scroll">
        <div className="section-label">
          <span className="num">02</span>
          <span>
            {t("specs.label")} · {TICKER}
          </span>
        </div>

        <h2 className="section-title">{t("specs.title")}</h2>
        <p className="section-kana">{t("specs.hint")}</p>

        <div className={styles.contractBox}>
          <div>
            <p className="mono-sm">
              {t("specs.contractLabel")} · {TICKER} · WORLD CHAIN
            </p>
            <code className={styles.address}>{LINKS.contract}</code>
          </div>
          <div className="btn-row">
            <button type="button" className="btn" onClick={copyContract}>
              {copied ? t("specs.copied") : t("specs.copy")}
            </button>
            <a
              className="btn"
              href={LINKS.worldscan}
              target="_blank"
              rel="noopener noreferrer"
            >
              worldscan <span className="arrow">↗</span>
            </a>
            <a
              className="btn btn-primary"
              href={LINKS.launchpad}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("specs.buy")} <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.specGrid}>
          {specs.map((s) => (
            <article key={s.label} className={styles.spec}>
              <p className="mono-sm">{s.label}</p>
              <p className={styles.specValue}>
                {s.brand ? <BrandName /> : s.value}
              </p>
              <p className={styles.specHint}>#{s.hint}</p>
            </article>
          ))}
        </div>

        <p className={styles.funcsLabel}>{t("specs.funcs")}</p>
        <div className={styles.funcGrid}>
          {funcs.map((f) => (
            <article key={f.id} className={styles.func}>
              <p className={styles.funcId}>{f.id}</p>
              <h3>{f.title}</h3>
              <p>{f.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
