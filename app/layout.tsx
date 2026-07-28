import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "fr13nds · $WHOAMI — Community Token on World Chain",
  description:
    "fr13nds is the name. $WHOAMI is the token on World Chain. Real humans. Zero bots. Built for friends.",
  openGraph: {
    title: "fr13nds · $WHOAMI",
    description: "Community token on World Chain — Ani Launchpad",
    images: ["/hero.png"],
  },
};

const themeInit = `(function(){try{var t=localStorage.getItem('fr13nds-theme');if(t==='light'||t==='dark'){document.documentElement.setAttribute('data-theme',t);}else{document.documentElement.setAttribute('data-theme','dark');}}catch(e){document.documentElement.setAttribute('data-theme','dark');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
