"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import { BrandName, LINKS, TICKER_SYMBOL } from "@/lib/brand";
import { useLang } from "@/lib/i18n";
import { useOnChainInfo } from "@/lib/onchain";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";
import styles from "./Hero.module.css";

function shortAddress(addr: string) {
  return `${addr.slice(0, 6)}…${addr.slice(-4)}`;
}

export default function Hero() {
  const { t } = useLang();
  const onchain = useOnChainInfo();
  const heroRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const nav = useMemo(
    () => [
      { href: "#story", label: t("nav.story") },
      { href: "#specs", label: t("nav.specs") },
      { href: "#protocol", label: t("nav.protocol") },
      { href: "#world", label: t("nav.world") },
      { href: "#community", label: t("nav.community") },
    ],
    [t],
  );

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
      scrollY = Math.max(0, -rect.top);
    };

    const onMove = (e: PointerEvent) => {
      if (!isDesktop()) return;
      const rect = hero.getBoundingClientRect();
      mouseX = (e.clientX - rect.left) / rect.width - 0.5;
      mouseY = (e.clientY - rect.top) / rect.height - 0.5;
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
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
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

      <nav className={styles.nav} aria-label={t("nav.aria")}>
        <a href="#top" className={styles.logo}>
          <BrandName />
        </a>
        <div className={styles.navRight}>
          <div className={styles.navLinks}>
            {nav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <LangToggle />
          <ThemeToggle />
          <button
            type="button"
            className={styles.menuBtn}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("nav.close") : t("nav.menu")}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? t("nav.close") : t("nav.menu")}
          </button>
        </div>
      </nav>

      {menuOpen ? (
        <div id="mobile-nav" className={styles.mobileNav}>
          {nav.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            href={LINKS.launchpad}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary"
            onClick={() => setMenuOpen(false)}
          >
            {t("hero.buy")} {TICKER_SYMBOL}
          </a>
        </div>
      ) : null}

      <div className={`container ${styles.content}`}>
        <div className={styles.copyBlock}>
          <p className={`${styles.eyebrow} reveal`}>{t("hero.eyebrow")}</p>

          <h1 className={`${styles.title} reveal reveal-delay-1`}>
            <span className={styles.glitch} data-text="fr13nds">
              <span className={styles.glitchMain}>
                <BrandName />
              </span>
            </span>
          </h1>

          <p className={`${styles.tagline} reveal reveal-delay-2`}>
            {TICKER_SYMBOL}
            <span className={styles.sep}>·</span>
            FRIENDS PROTOCOL
          </p>

          <p className={`${styles.lead} reveal reveal-delay-3`}>
            {t("hero.lead")}
          </p>
        </div>

        <div className={`${styles.ctaPanel} reveal reveal-delay-4`}>
          <div className={styles.onchain}>
            <p className={styles.onchainLabel}>
              <span className={styles.liveDot} aria-hidden />
              {t("hero.onchain")}
              {onchain.loading ? " …" : null}
            </p>
            <div className={styles.onchainGrid}>
              <div>
                <span>{t("hero.chain")}</span>
                <strong>
                  {onchain.chain}
                  <em>/{onchain.chainId}</em>
                </strong>
              </div>
              <div>
                <span>{t("hero.price")}</span>
                <strong title={onchain.priceUsd?.toString()}>{onchain.price}</strong>
              </div>
              <div>
                <span>{t("hero.mcap")}</span>
                <strong title={onchain.marketCapUsd?.toString()}>
                  {onchain.marketCap}
                </strong>
              </div>
              <div>
                <span>{t("hero.supply")}</span>
                <strong title={onchain.supplyRaw}>{onchain.supply}</strong>
              </div>
              <div>
                <span>{t("hero.holders")}</span>
                <strong>{onchain.holders}</strong>
              </div>
              <div>
                <span>TICKER</span>
                <strong>${onchain.symbol}</strong>
              </div>
            </div>
            <a
              className={styles.explorer}
              href={LINKS.worldscan}
              target="_blank"
              rel="noopener noreferrer"
            >
              Worldscan {t("hero.explorer")} ↗
            </a>
          </div>

          <div className={`${styles.actions} btn-row`}>
            <a
              className="btn btn-primary"
              href={LINKS.launchpad}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("hero.buy")} {TICKER_SYMBOL}{" "}
              <span className="arrow">↗</span>
            </a>
            <a
              className="btn"
              href={LINKS.telegram}
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("hero.telegram")} <span className="arrow">↗</span>
            </a>
          </div>

          <div className={styles.meta}>
            <div className={styles.status}>
              <span className={styles.liveDot} aria-hidden />
              {t("hero.live")}
              <span className={styles.cursor} aria-hidden>
                _
              </span>
            </div>
            <div className={styles.metaRow}>
              <span>JUL 2026</span>
              <button
                type="button"
                className={styles.contract}
                onClick={copyContract}
                title={t("hero.copyTitle")}
              >
                {copied
                  ? t("hero.copied")
                  : `${t("hero.contract")} ${shortAddress(LINKS.contract)} ⧉`}
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
