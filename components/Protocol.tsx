import { BrandName } from "@/lib/brand";
import styles from "./Protocol.module.css";

const LAYERS = [
  {
    id: "01",
    tag: "sec",
    title: "Security ring",
    body: "Capa de protección del protocolo y la comunidad.",
  },
  {
    id: "02",
    tag: "gov",
    title: "Gobernanza",
    body: "Decisiones impulsadas por amigos, transparentes y on-chain.",
  },
  {
    id: "03",
    tag: "core",
    title: "Friends core",
    body: "El corazón de fr13nds. Impulsado por personas reales.",
  },
  {
    id: "04",
    tag: "ifc",
    title: "World interface",
    body: "Integración nativa con World Chain y humanos verificados.",
  },
  {
    id: "05",
    tag: "vault",
    title: "Treasury",
    body: "Gestión transparente de fondos para crecer el ecosistema.",
  },
  {
    id: "06",
    tag: "id",
    title: "Human verify",
    body: "Construido sobre World ID. Humanos reales. Cero bots.",
  },
];

export default function Protocol() {
  return (
    <section id="protocol" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">03</span>
          <span>protocol</span>
        </div>

        <h2 className="section-title">Genesis protocol</h2>
        <p className="section-kana">6 capas · world chain build</p>

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

          <p className={styles.tag}>
            &gt; red de amigos · asset descentralizado · cadena global
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
              <p className={styles.spaced}>friends_protocol</p>
            </div>
            <p className={styles.manifesto}>
              <BrandName /> es el nombre. $WHOAMI es el token. Una red de
              amigos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
