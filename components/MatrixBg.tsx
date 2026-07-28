"use client";

import { useEffect, useRef } from "react";
import styles from "./MatrixBg.module.css";

const GLYPHS =
  "アイウエオカキクケコｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ01<>$/WHOAMI#*_fr13nds";

type Theme = "dark" | "light";

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light"
    ? "light"
    : "dark";
}

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

export default function MatrixBg() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || prefersReducedMotion()) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let running = true;
    let theme = readTheme();
    let cols = 0;
    let fontSize = 14;
    let drops: number[] = [];
    let speeds: number[] = [];
    let last = 0;

    const colors = () =>
      theme === "light"
        ? {
            fade: "rgba(244, 242, 237, 0.14)",
            head: "rgba(12, 90, 70, 0.9)",
            trail: "rgba(22, 122, 63, 0.45)",
            accent: "rgba(196, 14, 14, 0.35)",
          }
        : {
            fade: "rgba(2, 3, 4, 0.08)",
            head: "rgba(180, 255, 210, 0.95)",
            trail: "rgba(57, 255, 138, 0.42)",
            accent: "rgba(255, 30, 30, 0.45)",
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

      fontSize = w < 640 ? 13 : 15;
      cols = Math.max(8, Math.floor(w / fontSize));
      const nextDrops = new Array<number>(cols);
      const nextSpeeds = new Array<number>(cols);
      for (let i = 0; i < cols; i++) {
        nextDrops[i] = i < drops.length ? drops[i]! : Math.random() * -40;
        nextSpeeds[i] = i < speeds.length ? speeds[i]! : 0.55 + Math.random() * 0.85;
      }
      drops = nextDrops;
      speeds = nextSpeeds;
      ctx.font = `600 ${fontSize}px "JetBrains Mono", "Courier New", monospace`;
      ctx.textBaseline = "top";
    };

    const draw = (now: number) => {
      if (!running) return;
      raf = requestAnimationFrame(draw);

      if (document.hidden) {
        last = now;
        return;
      }

      // ~28fps — smooth enough, lighter on battery
      if (now - last < 36) return;
      last = now;

      const c = colors();
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = c.fade;
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < cols; i++) {
        const x = i * fontSize;
        const y = drops[i]! * fontSize;
        const ch = GLYPHS[(Math.random() * GLYPHS.length) | 0]!;
        const isAccent = i % 17 === 0 && (drops[i]! | 0) % 9 === 0;

        ctx.fillStyle = isAccent ? c.accent : c.head;
        ctx.fillText(ch, x, y);

        // soft trail glyph one step above
        if (y > fontSize) {
          ctx.fillStyle = c.trail;
          ctx.fillText(
            GLYPHS[(Math.random() * GLYPHS.length) | 0]!,
            x,
            y - fontSize,
          );
        }

        if (y > h && Math.random() > 0.975) {
          drops[i] = Math.random() * -20;
          speeds[i] = 0.55 + Math.random() * 0.85;
        } else {
          drops[i]! += speeds[i]!;
        }
      }
    };

    const onTheme = () => {
      theme = readTheme();
      // soft clear so fade color switches cleanly
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    };

    const onVisibility = () => {
      if (!document.hidden) last = performance.now();
    };

    const motionMq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onMotion = () => {
      if (motionMq.matches) {
        running = false;
        cancelAnimationFrame(raf);
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
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
