import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-mono",
});

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
    <html lang="es" className={mono.variable} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInit }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
