"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { BrandName, LINKS, TICKER_SYMBOL } from "@/lib/brand";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./Hero.module.css";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = mediaRef.current;
    const layer = layerRef.current;
    const hero = heroRef.current;
    if (!media || !layer || !hero) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    let scrollY = 0;
    let mouseX = 0;
    let mouseY = 0;
    let currentX = 0;
    let currentY = 0;
    let currentScroll = 0;

    const isDesktop = () => window.matchMedia("(min-width: 769px)").matches;

    const tick = () => {
      currentScroll += (scrollY - currentScroll) * 0.08;
      currentX += (mouseX - currentX) * 0.06;
      currentY += (mouseY - currentY) * 0.06;

      const scrollShift = currentScroll * 0.35;
      const mx = isDesktop() ? currentX * 18 : 0;
      const my = isDesktop() ? currentY * 12 : 0;

      media.style.transform = `translate3d(0, ${scrollShift}px, 0)`;
      layer.style.transform = `translate3d(${mx}px, ${my + scrollShift * 0.15}px, 0) scale(1.12)`;

      raf = requestAnimationFrame(tick);
    };

    const onScroll = () => {
      const rect = hero.getBoundingClientRect();
      // How far we've scrolled through the hero
      scrollY = Math.max(0, -rect.top);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDesktop()) return;
      const rect = hero.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mouseX = x;
      mouseY = y;
    };

    const onLeave = () => {
      mouseX = 0;
      mouseY = 0;
    };

    onScroll();
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });
    hero.addEventListener("pointermove", onMove);
    hero.addEventListener("pointerleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      hero.removeEventListener("pointermove", onMove);
      hero.removeEventListener("pointerleave", onLeave);
      media.style.transform = "";
      layer.style.transform = "";
    };
  }, []);

  async function copyContract() {
    try {
      await navigator.clipboard.writeText(LINKS.contract);
    } catch {
      /* ignore */
    }
  }

  return (
    <header ref={heroRef} className={styles.hero}>
      <div ref={mediaRef} className={styles.media}>
        <div ref={layerRef} className={styles.parallaxLayer}>
          <Image
            src="/hero-desktop.png"
            alt="fr13nds — desktop hero"
            fill
            priority
            sizes="100vw"
            className={`${styles.image} ${styles.imageDesktop}`}
          />
          <Image
            src="/hero.png"
            alt="fr13nds — masked figure"
            fill
            priority
            sizes="100vw"
            className={`${styles.image} ${styles.imageMobile}`}
          />
        </div>
        <div className={styles.vignette} aria-hidden />
        <div className={styles.binary} aria-hidden>
          <span>01001110 01000100 01010011</span>
          <span>11100100 01000110 01010010</span>
          <span>00110001 00110011 01000110</span>
        </div>
      </div>

      <nav className={styles.nav}>
        <a href="#top" className={styles.logo}>
          <BrandName />
        </a>
        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            <a href="#story">01</a>
            <a href="#specs">02</a>
            <a href="#protocol">03</a>
            <a href="#world">04</a>
            <a href="#community">05</a>
          </div>
          <ThemeToggle />
        </div>
      </nav>

      <div className={`container ${styles.content}`}>
        <p className={`${styles.eyebrow} reveal`}>
          DECENTRALIZED FRIENDS ASSET /// WORLD CHAIN
        </p>

        <h1 className={`${styles.title} reveal reveal-delay-1`}>
          <BrandName />
        </h1>

        <p className={`${styles.tagline} reveal reveal-delay-2`}>
          FRIENDS PROTOCOL
          <span className={styles.sep}>·</span>
          友達ネットワーク
        </p>

        <p className={`${styles.lead} reveal reveal-delay-3`}>
          No estamos construyendo solo un token. Estamos construyendo una red
          de amigos reales — humanos verificados, cero bots, una sola
          identidad.
        </p>

        <div className={`${styles.actions} btn-row reveal reveal-delay-4`}>
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
            Telegram <span className="arrow">↗</span>
          </a>
        </div>

        <div className={`${styles.meta} reveal reveal-delay-4`}>
          <div className={styles.status}>
            <span className={styles.dot} aria-hidden />
            ESTADO · LIVE
            <span className={styles.cursor} aria-hidden>
              _
            </span>
          </div>
          <div className={styles.metaRow}>
            <span>WORLD CHAIN // JULIO 2026</span>
            <button
              type="button"
              className={styles.contract}
              onClick={copyContract}
              title="Copiar contrato"
            >
              CONTRATO {shortAddress(LINKS.contract)} ⧉
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
