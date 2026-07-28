import { BrandName } from "@/lib/brand";
import styles from "./WorldChain.module.css";

const PILLARS = [
  {
    title: "world_chain",
    body: (
      <>
        <BrandName /> vive en World Chain: la red diseñada para humanos
        verificados y adopción global. Integración nativa con el ecosistema
        World.
      </>
    ),
  },
  {
    title: "world_id_verify",
    body: "Red de verificación humana construida sobre World ID. Humanos verificados, comunidad real. Cero bots.",
  },
  {
    title: "any_wallet",
    body: "Compatible con World App y cualquier wallet del ecosistema. Tu llave, tu token, tus amigos.",
  },
];

export default function WorldChain() {
  return (
    <section id="world" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">04</span>
          <span>nmap -p human_net</span>
        </div>

        <h2 className="section-title">humans_only. zero_bots</h2>
        <p className="section-kana">auth layer · world id</p>

        <div className={styles.grid}>
          {PILLARS.map((p) => (
            <article key={p.title} className={styles.card}>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
            </article>
          ))}
        </div>

        <p className={styles.ticker}>
          &gt; WLD_CHAIN · WORLD_ID · STATUS:WATCHING · EVERY_WALLET_LEAVES_A_TRACE
        </p>
      </div>
    </section>
  );
}
