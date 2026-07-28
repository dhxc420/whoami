import { BrandName } from "@/lib/brand";
import styles from "./Story.module.css";

const TIMELINE = [
  {
    year: "2025",
    title: "El origen",
    body: "Nace fr13nds: una red de amigos reales en un internet lleno de bots.",
  },
  {
    year: "2026",
    title: "La visión",
    body: "Se define el protocolo: token comunitario sobre World Chain, verificado por humanos.",
  },
  {
    year: "JUL 2026",
    title: "El lanzamiento",
    body: "$WHOAMI vive en World Chain, lanzado en Ani Launchpad. Humanos reales. Cero bots.",
    live: true,
  },
];

export default function Story() {
  return (
    <section id="story" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">01</span>
          <span>origen</span>
        </div>

        <h2 className="section-title">De la red, con identidad</h2>
        <p className="section-kana">whoami --friends</p>

        <div className={styles.grid}>
          <div className={styles.copy}>
            <p className="section-lead">
              <BrandName /> nació como un llamado a lo real: amigos, no
              cuentas fantasma. En un mundo de algoritmos y bots, el protocolo
              apuesta por humanos verificados y comunidad on-chain.
            </p>
            <p className={styles.quote}>
              <span className={styles.prompt}>root@fr13nds:~$</span>{" "}
              fr13nds es el nombre. $WHOAMI es el token. Red de confianza —
              amigos, no bots.
            </p>
          </div>

          <ol className={styles.timeline}>
            {TIMELINE.map((item) => (
              <li key={item.year} className={styles.item}>
                <span className={styles.year}>[{item.year}]</span>
                <div>
                  <h3 className={styles.itemTitle}>
                    {item.title}
                    {item.live ? (
                      <span className={styles.live}> [LIVE]</span>
                    ) : null}
                  </h3>
                  <p>{item.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
