"use client";

import { useEffect, useRef } from "react";
import styles from "./MatrixBg.module.css";

/** Half-width katakana + digits — classic Matrix glyph set */
const GLYPHS =
  "ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝﾞﾟ0123456789:･.=*+-<>|_";

type Theme = "dark" | "light";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function randGlyph(): string {
  return GLYPHS[(Math.random() * GLYPHS.length) | 0]!;
}

export default function MatrixBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let theme = readTheme();
    let cols = 0;
    let fontSize = 16;
    let drops: number[] = [];
    let speeds: number[] = [];
    let last = 0;

    const palette = () =>
      theme === "light"
        ? {
            clear: "#f4f2ed",
            fade: "rgba(244, 242, 237, 0.12)",
            head: "rgba(20, 80, 50, 0.95)",
            mid: "rgba(22, 122, 63, 0.55)",
            tail: "rgba(22, 122, 63, 0.22)",
          }
        : {
            clear: "#020304",
            fade: "rgba(0, 0, 0, 0.06)",
            head: "#d4ffe4",
            mid: "#00ff41",
            tail: "rgba(0, 180, 50, 0.55)",
          };

    const paintBase = () => {
      const p = palette();
      ctx.fillStyle = p.clear;
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      fontSize = w < 640 ? 14 : w < 1100 ? 16 : 18;
      cols = Math.max(12, Math.floor(w / fontSize));
      const nextDrops = new Array<number>(cols);
      const nextSpeeds = new Array<number>(cols);
      for (let i = 0; i < cols; i++) {
        nextDrops[i] =
          i < drops.length ? drops[i]! : Math.random() * (h / fontSize);
        nextSpeeds[i] =
          i < speeds.length ? speeds[i]! : 0.35 + Math.random() * 0.9;
      }
      drops = nextDrops;
      speeds = nextSpeeds;
      ctx.font = `${fontSize}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";
      paintBase();
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);

      if (document.hidden) {
        last = now;
        return;
      }

      // ~48fps — closer to classic rain feel
      if (now - last < 20) return;
      last = now;

      const p = palette();
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = p.fade;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const row = drops[i]!;
        const y = row * fontSize;

        // trail glyph (dimmer)
        if (y > fontSize * 2) {
          ctx.fillStyle = p.tail;
          ctx.fillText(randGlyph(), x, y - fontSize * 2);
        }
        if (y > fontSize) {
          ctx.fillStyle = p.mid;
          ctx.fillText(randGlyph(), x, y - fontSize);
        }

        // bright head — classic white-green tip
        ctx.fillStyle = p.head;
        ctx.fillText(randGlyph(), x, y);

        if (y > h && Math.random() > 0.975) {
          drops[i] = 0;
          speeds[i] = 0.35 + Math.random() * 0.9;
        } else {
          drops[i]! += speeds[i]!;
        }
      }
    };

    const onTheme = () => {
      theme = readTheme();
      paintBase();
    };

    const onVisibility = () => {
      if (!document.hidden) last = performance.now();
    };

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      if (motionMq.matches) {
        running = false;
        cancelAnimationFrame(raf);
        paintBase();
      } else if (!running) {
        running = true;
        last = 0;
        raf = requestAnimationFrame(draw);
      }
    };

    resize();
    raf = requestAnimationFrame(draw);

    window.addEventListener("resize", resize, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    motionMq.addEventListener("change", onMotion);

    const mo = new MutationObserver(onTheme);
    mo.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
      motionMq.removeEventListener("change", onMotion);
      mo.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={styles.canvas}
      aria-hidden
      tabIndex={-1}
    />
  );
}
