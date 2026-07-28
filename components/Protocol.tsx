import { BrandName } from "@/lib/brand";
import styles from "./Protocol.module.css";

const LAYERS = [
  {
    id: "0x01",
    tag: "sec",
    title: "SECURITY_RING",
    body: "Capa de protección que resguarda el protocolo y a la comunidad.",
  },
  {
    id: "0x02",
    tag: "gov",
    title: "DAO_LAYER",
    body: "Decisiones impulsadas por amigos, transparentes y on-chain.",
  },
  {
    id: "0x03",
    tag: "core",
    title: "FRIENDS_CORE",
    body: "El corazón de fr13nds. Impulsado por personas reales.",
  },
  {
    id: "0x04",
    tag: "ifc",
    title: "WORLD_IFACE",
    body: "Integración nativa con World Chain y humanos verificados.",
  },
  {
    id: "0x05",
    tag: "vault",
    title: "TREASURY_VAULT",
    body: "Gestión transparente de fondos para crecer el ecosistema.",
  },
  {
    id: "0x06",
    tag: "id",
    title: "HUMAN_VERIFY",
    body: "Construido sobre World ID. Humanos reales. Cero bots.",
  },
];

export default function Protocol() {
  return (
    <section id="protocol" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">03</span>
          <span>./boot --protocol genesis</span>
        </div>

        <h2 className="section-title">genesis_protocol</h2>
        <p className="section-kana">stack dump · 6 layers</p>

        <div className={styles.panel}>
          <div className={styles.panelHead}>
            <div>
              <p className="mono-sm">SESSION fr13nds-01 // AUDIT_MODE: ON</p>
              <p className={styles.edition}>WORLD_CHAIN_BUILD</p>
            </div>
            <div className={styles.badges}>
              <span>[OK] WLD_CHAIN</span>
              <span>[OK] WORLD_ID</span>
            </div>
          </div>

          <p className={styles.tag}>
            &gt; DECENTRALIZED_FRIENDS_ASSET · GLOBAL_CHAIN
          </p>

          <div className={styles.layers}>
            {LAYERS.map((layer) => (
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
              <p className={styles.spaced}>friends_protocol.exe</p>
            </div>
            <p className={styles.manifesto}>
              FROM_NET → CHAIN — <BrandName /> es el nombre. $WHOAMI es el
              token. Una red de amigos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
