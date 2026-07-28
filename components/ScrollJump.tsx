"use client";

import { useEffect, useState } from "react";
import styles from "./ScrollJump.module.css";

export default function ScrollJump() {
  const [showTop, setShowTop] = useState(false);
  const [showBottom, setShowBottom] = useState(true);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      const vh = window.innerHeight;
      const docH = document.documentElement.scrollHeight;
      setShowTop(y > vh * 0.45);
      setShowBottom(y + vh < docH - 160);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const goTop = () => {
    document.getElementById("top")?.scrollIntoView({ behavior: "smooth" });
  };

  const goBottom = () => {
    document.getElementById("footer")?.scrollIntoView({ behavior: "smooth" });
  };

  if (!showTop && !showBottom) return null;

  return (
    <div className={styles.stack} role="navigation" aria-label="Page jump">
      {showTop ? (
        <button
          type="button"
          className={styles.btn}
          onClick={goTop}
          aria-label="Go to top"
          title="Top"
        >
          ↑
        </button>
      ) : null}
      {showBottom ? (
        <button
          type="button"
          className={styles.btn}
          onClick={goBottom}
          aria-label="Go to footer"
          title="End"
        >
          ↓
        </button>
      ) : null}
    </div>
  );
}
