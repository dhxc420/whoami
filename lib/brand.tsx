export const LINKS = {
  telegram: "https://t.me/Fr13nds_wld",
  launchpad:
    "https://world.org/mini-app?app_id=app_4593f73390a9843503ec096086b43612&path=/launchpad/token/0xd68C57A9e5B8C81859ADfFa29c40F58323eD8cBb",
  worldscan:
    "https://worldscan.org/token/0xd68C57A9e5B8C81859ADfFa29c40F58323eD8cBb",
  contract: "0xd68C57A9e5B8C81859ADfFa29c40F58323eD8cBb",
} as const;

/** On-chain ticker */
export const TICKER = "WHOAMI";
export const TICKER_SYMBOL = "$WHOAMI";

/** Project / brand name */
export const PROJECT_NAME = "fr13nds";

export function BrandName({ className = "" }: { className?: string }) {
  return (
    <span className={`brand-mark ${className}`}>
      fr<span className="thirteen">13</span>nds
    </span>
  );
}
