import { BrandName } from "@/lib/brand";
import styles from "./WorldChain.module.css";

const PILLARS = [
  {
    title: "World Chain",
    body: (
      <>
        <BrandName /> vive en World Chain: la red para humanos verificados y
        adopción global.
      </>
    ),
  },
  {
    title: "World ID",
    body: "Verificación humana. Comunidad real. Cero bots.",
  },
  {
    title: "Cualquier wallet",
    body: "Compatible con World App y wallets del ecosistema. Tu llave, tu token.",
  },
];

export default function WorldChain() {
  return (
    <section id="world" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">04</span>
          <span>world</span>
        </div>

        <h2 className="section-title">Humanos reales. Cero bots.</h2>
        <p className="section-kana">auth · world id · any wallet</p>

        <div className={styles.grid}>
          {PILLARS.map((p) => (
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
