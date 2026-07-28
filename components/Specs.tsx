"use client";

import { BrandName, LINKS, TICKER, TICKER_SYMBOL } from "@/lib/brand";
import styles from "./Specs.module.css";

const SPECS = [
  { label: "SYMBOL", value: TICKER_SYMBOL, hint: "ticker" },
  { label: "NAME", value: "fr13nds", hint: "project" },
  { label: "CHAIN", value: "WORLD CHAIN", hint: "network" },
  { label: "STD", value: "ERC-20", hint: "token_type" },
  { label: "LAUNCH", value: "JUL 2026", hint: "ani_launchpad" },
  { label: "STATUS", value: "LIVE", hint: "mainnet" },
];

const FUNCS = [
  {
    id: "fn_01",
    title: "friends_network()",
    body: "El núcleo es la comunidad. Decisiones y cultura impulsadas por holders reales.",
  },
  {
    id: "fn_02",
    title: "onchain_audit()",
    body: "Contrato verificable en World Chain. Sin cajas negras, sin promesas vacías.",
  },
  {
    id: "fn_03",
    title: "world_bridge()",
    body: "Nativo en World App / Ani Launchpad para humanos verificados.",
  },
  {
    id: "fn_04",
    title: "zero_bots()",
    body: "Diseñado para personas reales. La identidad humana es la raíz del protocolo.",
  },
];

export default function Specs() {
  async function copyContract() {
    try {
      await navigator.clipboard.writeText(LINKS.contract);
    } catch {
      /* ignore */
    }
  }

  return (
    <section id="specs" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">02</span>
          <span>./inspect --token {TICKER}</span>
        </div>

        <h2 className="section-title">tech_spec</h2>
        <p className="section-kana">hex dump · contract surface</p>

        <div className={styles.contractBox}>
          <div>
            <p className="mono-sm">
              &gt; CONTRACT · ERC-20 · {TICKER} · WORLD_CHAIN
            </p>
            <code className={styles.address}>{LINKS.contract}</code>
          </div>
          <div className="btn-row">
            <button type="button" className="btn" onClick={copyContract}>
              copy_addr
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
              launchpad <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.specGrid}>
          {SPECS.map((s) => (
            <article key={s.label} className={styles.spec}>
              <p className="mono-sm">{s.label}</p>
              <p className={styles.specValue}>
                {s.label === "NAME" ? <BrandName /> : s.value}
              </p>
              <p className={styles.specHint}>#{s.hint}</p>
            </article>
          ))}
        </div>

        <p className={styles.funcsLabel}>
          # exports — {TICKER} · fr13nds runtime
        </p>
        <div className={styles.funcGrid}>
          {FUNCS.map((f) => (
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
