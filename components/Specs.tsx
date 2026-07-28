"use client";

import { useState } from "react";
import { BrandName, LINKS, TICKER, TICKER_SYMBOL } from "@/lib/brand";
import styles from "./Specs.module.css";

const SPECS = [
  { label: "SÍMBOLO", value: TICKER_SYMBOL, hint: "ticker" },
  { label: "NOMBRE", value: "fr13nds", hint: "proyecto" },
  { label: "RED", value: "WORLD CHAIN", hint: "network" },
  { label: "ESTÁNDAR", value: "ERC-20", hint: "token" },
  { label: "LANZAMIENTO", value: "JUL 2026", hint: "ani launchpad" },
  { label: "ESTADO", value: "LIVE", hint: "mainnet" },
];

const FUNCS = [
  {
    id: "01",
    title: "Red de amigos",
    body: "El núcleo es la comunidad. Decisiones impulsadas por holders reales.",
  },
  {
    id: "02",
    title: "Transparencia on-chain",
    body: "Contrato verificable en World Chain. Sin cajas negras.",
  },
  {
    id: "03",
    title: "Integración World",
    body: "Nativo en World App / Ani Launchpad para humanos verificados.",
  },
  {
    id: "04",
    title: "Cero bots",
    body: "Diseñado para personas reales. La identidad humana es la raíz.",
  },
];

export default function Specs() {
  const [copied, setCopied] = useState(false);

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
      <div className="container">
        <div className="section-label">
          <span className="num">02</span>
          <span>token · {TICKER}</span>
        </div>

        <h2 className="section-title">Ficha técnica</h2>
        <p className="section-kana">contrato · world chain · erc-20</p>

        <div className={styles.contractBox}>
          <div>
            <p className="mono-sm">CONTRATO ERC-20 · {TICKER} · WORLD CHAIN</p>
            <code className={styles.address}>{LINKS.contract}</code>
          </div>
          <div className="btn-row">
            <button type="button" className="btn" onClick={copyContract}>
              {copied ? "copiado ✓" : "copiar"}
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
              comprar <span className="arrow">↗</span>
            </a>
          </div>
        </div>

        <div className={styles.specGrid}>
          {SPECS.map((s) => (
            <article key={s.label} className={styles.spec}>
              <p className="mono-sm">{s.label}</p>
              <p className={styles.specValue}>
                {s.label === "NOMBRE" ? <BrandName /> : s.value}
              </p>
              <p className={styles.specHint}>#{s.hint}</p>
            </article>
          ))}
        </div>

        <p className={styles.funcsLabel}># qué hace el protocolo</p>
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
