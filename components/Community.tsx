import { BrandName, LINKS, TICKER_SYMBOL } from "@/lib/brand";
import styles from "./Community.module.css";

export default function Community() {
  return (
    <section id="community" className="section">
      <div className="container">
        <div className="section-label">
          <span className="num">05</span>
          <span>comunidad</span>
        </div>

        <h2 className="section-title">La comunidad es el protocolo</h2>
        <p className="section-kana">compra · telegram · verifica</p>

        <p className="section-lead">
          Únete a la red. Compra {TICKER_SYMBOL} en Ani Launchpad. Habla con
          los <BrandName /> en Telegram.
        </p>

        <div className={`${styles.actions} btn-row`}>
          <a
            className="btn btn-primary"
            href={LINKS.launchpad}
            target="_blank"
            rel="noopener noreferrer"
          >
            Compra {TICKER_SYMBOL} <span className="arrow">↗</span>
          </a>
          <a
            className="btn"
            href={LINKS.telegram}
            target="_blank"
            rel="noopener noreferrer"
          >
            Telegram · @Fr13nds_wld <span className="arrow">↗</span>
          </a>
        </div>

        <p className={styles.slogan}>
          WE DON&apos;T FOLLOW. WE VERIFY.
          <span>EL FUTURO ES DE LOS AMIGOS</span>
        </p>
      </div>
    </section>
  );
}
