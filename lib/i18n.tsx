"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

export type Lang = "es" | "en";

const dict = {
  es: {
    "nav.story": "origen",
    "nav.specs": "token",
    "nav.protocol": "protocol",
    "nav.world": "world",
    "nav.community": "comunidad",
    "nav.media": "media",
    "nav.menu": "menu",
    "nav.close": "cerrar",
    "nav.aria": "Principal",
    "hero.eyebrow": "WORLD CHAIN · HUMANOS VERIFICADOS",
    "hero.lead":
      "No es solo un token. Es una red de amigos reales — humanos verificados, cero bots.",
    "hero.buy": "Compra",
    "hero.telegram": "Telegram",
    "hero.live": "LIVE ON WORLD CHAIN",
    "hero.copied": "COPIADO ✓",
    "hero.contract": "CONTRATO",
    "hero.copyTitle": "Copiar contrato",
    "hero.onchain": "ON-CHAIN",
    "hero.chain": "RED",
    "hero.supply": "SUPPLY",
    "hero.decimals": "DECIMALS",
    "hero.holders": "HOLDERS",
    "hero.price": "PRICE",
    "hero.mcap": "MCAP (WLD)",
    "hero.explorer": "explorer",

    "story.label": "origen",
    "story.title": "De la red, con identidad",
    "story.hint": "whoami --friends",
    "story.lead":
      "nació como un llamado a lo real: amigos, no cuentas fantasma. En un mundo de algoritmos y bots, el protocolo apuesta por humanos verificados y comunidad on-chain.",
    "story.quote":
      "fr13nds es el nombre. $WHOAMI es el token. Red de confianza — amigos, no bots.",
    "story.t1.title": "El origen",
    "story.t1.body":
      "Nace fr13nds: una red de amigos reales en un internet lleno de bots.",
    "story.t2.title": "La visión",
    "story.t2.body":
      "Se define el protocolo: token comunitario sobre World Chain, verificado por humanos.",
    "story.t3.title": "El lanzamiento",
    "story.t3.body":
      "$WHOAMI vive en World Chain, lanzado en Ani Launchpad. Humanos reales. Cero bots.",

    "specs.label": "token",
    "specs.title": "Ficha técnica",
    "specs.hint": "contrato · world chain · erc-20",
    "specs.contractLabel": "CONTRATO ERC-20",
    "specs.copy": "copiar",
    "specs.copied": "copiado ✓",
    "specs.buy": "comprar",
    "specs.symbol": "SÍMBOLO",
    "specs.name": "NOMBRE",
    "specs.chain": "RED",
    "specs.std": "ESTÁNDAR",
    "specs.launch": "LANZAMIENTO",
    "specs.status": "ESTADO",
    "specs.funcs": "# qué hace el protocolo",
    "specs.f1.title": "Red de amigos",
    "specs.f1.body":
      "El núcleo es la comunidad. Decisiones impulsadas por holders reales.",
    "specs.f2.title": "Transparencia on-chain",
    "specs.f2.body": "Contrato verificable en World Chain. Sin cajas negras.",
    "specs.f3.title": "Integración World",
    "specs.f3.body":
      "Nativo en World App / Ani Launchpad para humanos verificados.",
    "specs.f4.title": "Cero bots",
    "specs.f4.body":
      "Diseñado para personas reales. La identidad humana es la raíz.",

    "protocol.label": "protocol",
    "protocol.title": "Genesis protocol",
    "protocol.hint": "6 capas · world chain build",
    "protocol.tag": "> red de amigos · asset descentralizado · cadena global",
    "protocol.manifesto":
      "es el nombre. $WHOAMI es el token. Una red de amigos.",
    "protocol.l1.title": "Security ring",
    "protocol.l1.body": "Capa de protección del protocolo y la comunidad.",
    "protocol.l2.title": "Gobernanza",
    "protocol.l2.body":
      "Decisiones impulsadas por amigos, transparentes y on-chain.",
    "protocol.l3.title": "Friends core",
    "protocol.l3.body": "El corazón de fr13nds. Impulsado por personas reales.",
    "protocol.l4.title": "World interface",
    "protocol.l4.body":
      "Integración nativa con World Chain y humanos verificados.",
    "protocol.l5.title": "Treasury",
    "protocol.l5.body":
      "Gestión transparente de fondos para crecer el ecosistema.",
    "protocol.l6.title": "Human verify",
    "protocol.l6.body": "Construido sobre World ID. Humanos reales. Cero bots.",

    "world.label": "world",
    "world.title": "Humanos reales. Cero bots.",
    "world.hint": "auth · world id · any wallet",
    "world.p1.title": "World Chain",
    "world.p1.body":
      "vive en World Chain: la red para humanos verificados y adopción global.",
    "world.p2.title": "World ID",
    "world.p2.body": "Verificación humana. Comunidad real. Cero bots.",
    "world.p3.title": "Cualquier wallet",
    "world.p3.body":
      "Compatible con World App y wallets del ecosistema. Tu llave, tu token.",

    "community.label": "comunidad",
    "community.title": "La comunidad es el protocolo",
    "community.hint": "compra · telegram · verifica",
    "community.lead":
      "Únete a la red. Compra $WHOAMI en Ani Launchpad. Habla con los",
    "community.leadAfter": "en Telegram.",
    "community.buy": "Compra",
    "community.slogan": "WE DON'T FOLLOW. WE VERIFY.",
    "community.sloganSub": "EL FUTURO ES DE LOS AMIGOS",

    "media.label": "media",
    "media.title": "Media oficial",
    "media.hint": "assets · wallpapers · badge",
    "media.lead":
      "Arte de marca para tu pantalla y perfiles. Descarga y úsalo libremente en la comunidad.",
    "media.download": "Descargar",
    "media.w1.title": "WE VERIFY",
    "media.w1.meta": "1080×1920 · PNG · mobile",
    "media.w2.title": "AUDIT MODE",
    "media.w2.meta": "1080×1920 · PNG · mobile",
    "media.w3.title": "F13NDS BADGE",
    "media.w3.meta": "square · PNG · avatar / badge",

    "footer.copy": "EOF · © 2026 fr13nds · $WHOAMI · community fan page",
    "mobile.buy": "Compra",
    "mobile.aria": "Compra rápida",
    "lang.toEs": "Cambiar a español",
    "lang.toEn": "Switch to English",
  },
  en: {
    "nav.story": "origin",
    "nav.specs": "token",
    "nav.protocol": "protocol",
    "nav.world": "world",
    "nav.community": "community",
    "nav.media": "media",
    "nav.menu": "menu",
    "nav.close": "close",
    "nav.aria": "Main",
    "hero.eyebrow": "WORLD CHAIN · VERIFIED HUMANS",
    "hero.lead":
      "Not just a token. A network of real friends — verified humans, zero bots.",
    "hero.buy": "Buy",
    "hero.telegram": "Telegram",
    "hero.live": "LIVE ON WORLD CHAIN",
    "hero.copied": "COPIED ✓",
    "hero.contract": "CONTRACT",
    "hero.copyTitle": "Copy contract",
    "hero.onchain": "ON-CHAIN",
    "hero.chain": "CHAIN",
    "hero.supply": "SUPPLY",
    "hero.decimals": "DECIMALS",
    "hero.holders": "HOLDERS",
    "hero.price": "PRICE",
    "hero.mcap": "MCAP (WLD)",
    "hero.explorer": "explorer",

    "story.label": "origin",
    "story.title": "From the net, with identity",
    "story.hint": "whoami --friends",
    "story.lead":
      "was born as a call to the real: friends, not ghost accounts. In a world of algorithms and bots, the protocol bets on verified humans and on-chain community.",
    "story.quote":
      "fr13nds is the name. $WHOAMI is the token. A trust network — friends, not bots.",
    "story.t1.title": "The origin",
    "story.t1.body":
      "fr13nds begins: a network of real friends in an internet full of bots.",
    "story.t2.title": "The vision",
    "story.t2.body":
      "The protocol is defined: a community token on World Chain, verified by humans.",
    "story.t3.title": "The launch",
    "story.t3.body":
      "$WHOAMI lives on World Chain, launched on Ani Launchpad. Real humans. Zero bots.",

    "specs.label": "token",
    "specs.title": "Tech specs",
    "specs.hint": "contract · world chain · erc-20",
    "specs.contractLabel": "ERC-20 CONTRACT",
    "specs.copy": "copy",
    "specs.copied": "copied ✓",
    "specs.buy": "buy",
    "specs.symbol": "SYMBOL",
    "specs.name": "NAME",
    "specs.chain": "CHAIN",
    "specs.std": "STANDARD",
    "specs.launch": "LAUNCH",
    "specs.status": "STATUS",
    "specs.funcs": "# what the protocol does",
    "specs.f1.title": "Friends network",
    "specs.f1.body":
      "Community is the core. Decisions driven by real holders.",
    "specs.f2.title": "On-chain transparency",
    "specs.f2.body": "Verifiable contract on World Chain. No black boxes.",
    "specs.f3.title": "World integration",
    "specs.f3.body":
      "Native to World App / Ani Launchpad for verified humans.",
    "specs.f4.title": "Zero bots",
    "specs.f4.body":
      "Built for real people. Human identity is the root.",

    "protocol.label": "protocol",
    "protocol.title": "Genesis protocol",
    "protocol.hint": "6 layers · world chain build",
    "protocol.tag": "> friends network · decentralized asset · global chain",
    "protocol.manifesto":
      "is the name. $WHOAMI is the token. A network of friends.",
    "protocol.l1.title": "Security ring",
    "protocol.l1.body": "Protection layer for the protocol and community.",
    "protocol.l2.title": "Governance",
    "protocol.l2.body":
      "Friend-driven decisions, transparent and on-chain.",
    "protocol.l3.title": "Friends core",
    "protocol.l3.body": "The heart of fr13nds. Powered by real people.",
    "protocol.l4.title": "World interface",
    "protocol.l4.body":
      "Native integration with World Chain and verified humans.",
    "protocol.l5.title": "Treasury",
    "protocol.l5.body":
      "Transparent fund management to grow the ecosystem.",
    "protocol.l6.title": "Human verify",
    "protocol.l6.body": "Built on World ID. Real humans. Zero bots.",

    "world.label": "world",
    "world.title": "Real humans. Zero bots.",
    "world.hint": "auth · world id · any wallet",
    "world.p1.title": "World Chain",
    "world.p1.body":
      "lives on World Chain: the network for verified humans and global adoption.",
    "world.p2.title": "World ID",
    "world.p2.body": "Human verification. Real community. Zero bots.",
    "world.p3.title": "Any wallet",
    "world.p3.body":
      "Works with World App and ecosystem wallets. Your key, your token.",

    "community.label": "community",
    "community.title": "The community is the protocol",
    "community.hint": "buy · telegram · verify",
    "community.lead":
      "Join the network. Buy $WHOAMI on Ani Launchpad. Talk with the",
    "community.leadAfter": "on Telegram.",
    "community.buy": "Buy",
    "community.slogan": "WE DON'T FOLLOW. WE VERIFY.",
    "community.sloganSub": "THE FUTURE BELONGS TO FRIENDS",

    "media.label": "media",
    "media.title": "Official media",
    "media.hint": "assets · wallpapers · badge",
    "media.lead":
      "Brand art for lock screens and profiles. Download freely for the community.",
    "media.download": "Download",
    "media.w1.title": "WE VERIFY",
    "media.w1.meta": "1080×1920 · PNG · mobile",
    "media.w2.title": "AUDIT MODE",
    "media.w2.meta": "1080×1920 · PNG · mobile",
    "media.w3.title": "F13NDS BADGE",
    "media.w3.meta": "square · PNG · avatar / badge",

    "footer.copy": "EOF · © 2026 fr13nds · $WHOAMI · community fan page",
    "mobile.buy": "Buy",
    "mobile.aria": "Quick buy",
    "lang.toEs": "Cambiar a español",
    "lang.toEn": "Switch to English",
  },
} as const;

export type DictKey = keyof (typeof dict)["es"];

type LangContextValue = {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggle: () => void;
  t: (key: DictKey) => string;
};

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("es");

  useEffect(() => {
    try {
      const stored = localStorage.getItem("fr13nds-lang");
      if (stored === "es" || stored === "en") {
        setLangState(stored);
        document.documentElement.lang = stored;
        return;
      }
    } catch {
      /* ignore */
    }
    document.documentElement.lang = "es";
  }, []);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem("fr13nds-lang", next);
    } catch {
      /* ignore */
    }
  }, []);

  const toggle = useCallback(() => {
    setLang(lang === "es" ? "en" : "es");
  }, [lang, setLang]);

  const t = useCallback(
    (key: DictKey) => dict[lang][key] ?? dict.es[key] ?? key,
    [lang],
  );

  const value = useMemo(
    () => ({ lang, setLang, toggle, t }),
    [lang, setLang, toggle, t],
  );

  return (
    <LangContext.Provider value={value}>{children}</LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
